import {z} from 'zod';
import axios from 'axios';
import SwaggerParser from '@apidevtools/swagger-parser';
import micromatch from 'micromatch';
import _ from 'lodash';

function generateFallbackName(serviceName, method, path) {
    const cleanedServiceName = _.camelCase(serviceName);
    const cleanedPath = _.snakeCase(path);
    return `${cleanedServiceName}_${method}_${cleanedPath}`;
}

function removeUsingSuffix(input) {
    if (!input) {
        return input;
    }
    const usingIndex = input.indexOf("Using");
    return usingIndex !== -1 ? input.substring(0, usingIndex) : input;
}

export async function generateToolsFromConfig(config) {
    const allTools = [];
    const generatedToolsSummary = [];
    const apiConfigs = config.tool.openapi.config_list;

    console.log("[INFO] Starting OpenAPI tool generation process...");

    for (const apiConfig of apiConfigs) {
        if (!apiConfig.enabled) {
            console.log(`[SKIP] Skipping disabled configuration: ${apiConfig.name}`);
            continue;
        }
        try {
            console.log(`\n[INFO] Processing configuration: '${apiConfig.name}' from ${apiConfig.api_docs_url}`);

            if (apiConfig.authorization_env_key) {
                console.log(`[INFO]   => Authorization configured via env var '${apiConfig.authorization_env_key}'. It will be resolved at runtime.`);
            }

            console.log("[INFO]   => Fetching API documentation...");
            const {data: rawOpenApiDoc} = await axios.get(apiConfig.api_docs_url);
            console.log(`[SUCCESS]=> Successfully fetched API documentation for '${apiConfig.name}'.`);

            console.log("[INFO]   => Dereferencing and resolving $ref schemas...");
            const openApiDoc = await SwaggerParser.dereference(rawOpenApiDoc);
            console.log(`[SUCCESS]=> Successfully parsed API documentation for '${apiConfig.name}' (Version: ${openApiDoc.openapi || openApiDoc.swagger}).`);

            const serviceName = apiConfig.name || 'apiService';
            console.log(`[INFO]   => Generating tools for service: '${serviceName}'`);

            for (const path in openApiDoc.paths) {
                if (!isPathAllowed(path, apiConfig.path_whitelist, apiConfig.path_blacklist)) {
                    continue;
                }

                for (const method in openApiDoc.paths[path]) {
                    const allowedMethods = ['get', 'post', 'put', 'delete', 'patch'];
                    if (!allowedMethods.includes(method.toLowerCase())) {
                        continue;
                    }

                    const endpoint = openApiDoc.paths[path][method];
                    const httpMethod = method.toUpperCase();

                    console.log(`[INFO]     - Processing endpoint: ${httpMethod} ${path}`);

                    if (endpoint.deprecated) {
                        console.log(`[SKIP]     - Skipping deprecated endpoint: ${httpMethod} ${path}`);
                        continue;
                    }

                    let toolName;
                    const fallbackName = generateFallbackName(serviceName, method, path);
                    const existingToolNames = allTools.map(t => t.name);

                    if (endpoint.operationId) {
                        const preferredName = removeUsingSuffix(endpoint.operationId);
                        if (!existingToolNames.includes(preferredName)) {
                            toolName = preferredName;
                        } else {
                            toolName = endpoint.operationId;
                            console.warn(`[WARN]     - Tool name "${preferredName}" already exists. Using original operationId "${toolName}" to ensure uniqueness.`);
                        }
                    } else {
                        toolName = fallbackName;
                    }

                    const title = endpoint.summary || removeUsingSuffix(endpoint.operationId) || toolName;
                    const description = endpoint.summary || endpoint.description || `Calls the ${path} endpoint from the ${apiConfig.name} API.`;
                    const inputSchema = buildInputSchema(endpoint);
                    const outputSchema = buildOutputSchema(endpoint);

                    const toolDefinition = {
                        name: toolName,
                        title: title,
                        description: description,
                        inputSchema,
                        outputSchema,
                        meta: {
                            baseUrl: apiConfig.base_url,
                            path,
                            method: httpMethod,
                            authorizationEnvKey: apiConfig.authorization_env_key || null,
                        },
                    };

                    allTools.push(toolDefinition);
                    console.log(`[SUCCESS]  - Generated tool: ${toolDefinition.name}`);

                    generatedToolsSummary.push({
                        "Tool Name": toolDefinition.name,
                        "Title": toolDefinition.title,
                        "Source API": apiConfig.name,
                        "Method": toolDefinition.meta.method,
                        "Path": toolDefinition.meta.path,
                    });
                }
            }
        } catch (error) {
            console.error(`[ERROR] Failed to process configuration '${apiConfig.name}'. Details:`, error.message);
        }
    }

    console.log(`\n[SUCCESS] Tool generation process finished. Total tools generated: ${allTools.length}.`);

    if (generatedToolsSummary.length > 0) {
        console.log("\n--- Generated Tools Summary ---");
        console.table(generatedToolsSummary);
    }

    return allTools;
}

function isPathAllowed(path, whitelist, blacklist) {
    const isWhitelisted = whitelist.length === 0 || micromatch.isMatch(path, whitelist);
    const isBlacklisted = blacklist.length > 0 && micromatch.isMatch(path, blacklist);
    return isWhitelisted && !isBlacklisted;
}

export function mapOpenApiTypeToZod(schema) {
    if (!schema) return z.any().describe("Undefined schema, falling back to z.any()");
    switch (schema.type) {
        case 'string':
            if (schema.enum) {
                if (schema.enum.length === 0) return z.string().describe('Warning: enum is defined but the list is empty.');
                const [first, ...rest] = schema.enum.map(String);
                return z.enum([first, ...rest]);
            }
            return z.string();
        case 'number':
        case 'integer':
            let numSchema = z.number();
            if (schema.type === 'integer') numSchema = numSchema.int();
            if (schema.minimum !== undefined) numSchema = numSchema.min(schema.minimum);
            if (schema.maximum !== undefined) numSchema = numSchema.max(schema.maximum);
            return numSchema;
        case 'boolean':
            return z.boolean();
        case 'array':
            const itemSchema = schema.items ? mapOpenApiTypeToZod(schema.items) : z.any();
            return z.array(itemSchema);
        case 'object':
            const shape = {};
            if (schema.properties) {
                for (const propName in schema.properties) {
                    shape[propName] = mapOpenApiTypeToZod(schema.properties[propName]);
                }
                return z.object(shape);
            }
            return z.record(z.string(), z.any());
        default:
            return z.any().describe(`Unsupported schema type: ${schema.type}`);
    }
}

function buildInputSchema(endpoint) {
    const schemaParts = {};

    if (endpoint.parameters && Array.isArray(endpoint.parameters)) {
        for (const param of endpoint.parameters) {
            if (param.in === 'body') continue;

            let zodType = mapOpenApiTypeToZod(param.schema || {type: param.type});
            if (param.description) {
                zodType = zodType.describe(param.description);
            }
            if (!param.required) {
                zodType = zodType.optional();
            }
            if (param.schema && param.schema.default !== undefined) {
                zodType = zodType.default(param.schema.default);
            }
            schemaParts[param.name] = zodType;
        }
    }

    const requestBody = endpoint.requestBody || endpoint.parameters?.find(p => p.in === 'body');
    if (requestBody && requestBody.content) {
        const jsonContentSchema = requestBody.content['application/json']?.schema;
        if (jsonContentSchema && jsonContentSchema.type === 'object' && jsonContentSchema.properties) {
            const requiredFields = new Set(jsonContentSchema.required || []);
            for (const [propName, propSchema] of Object.entries(jsonContentSchema.properties)) {
                if (schemaParts[propName]) continue;
                let zodType = mapOpenApiTypeToZod(propSchema);
                if (propSchema.description) {
                    zodType = zodType.describe(propSchema.description);
                }
                if (!requiredFields.has(propName)) {
                    zodType = zodType.optional();
                }
                if (propSchema.default !== undefined) {
                    zodType = zodType.default(propSchema.default);
                }
                schemaParts[propName] = zodType;
            }
        }
    } else if (requestBody && requestBody.schema) {
        const bodySchema = requestBody.schema;
        if (bodySchema && bodySchema.type === 'object' && bodySchema.properties) {
            const requiredFields = new Set(bodySchema.required || []);
            for (const [propName, propSchema] of Object.entries(bodySchema.properties)) {
                if (schemaParts[propName]) continue;
                let zodType = mapOpenApiTypeToZod(propSchema);

                if (propSchema.description) {
                    zodType = zodType.describe(propSchema.description);
                }
                if (!requiredFields.has(propName)) {
                    zodType = zodType.optional();
                }
                if (propSchema.default !== undefined) {
                    zodType = zodType.default(propSchema.default);
                }
                schemaParts[propName] = zodType;
            }
        }
    }

    return schemaParts;
}

function buildOutputSchema(endpoint = {}) {
    const {responses = {}} = endpoint;
    const successCode = Object.keys(responses).find(code => code === '200') ||
        Object.keys(responses).find(code => code === '201') ||
        Object.keys(responses).find(code => code.startsWith('2')) ||
        'default';
    const successResponse = responses[successCode];
    if (!successResponse) {
        return {};
    }
    let responseSchema = null;
    if (successResponse.content && successResponse.content['application/json']?.schema) {
        responseSchema = successResponse.content['application/json'].schema;
    } else if (successResponse.content && successResponse.content['*/*']?.schema) {
        responseSchema = successResponse.content['*/*'].schema;
    } else if (successResponse.schema) {
        responseSchema = successResponse.schema;
    }
    if (!responseSchema) {
        return {};
    }
    const zodSchema = mapOpenApiTypeToZod(responseSchema);
    if (zodSchema && zodSchema._def && zodSchema._def.typeName === 'ZodObject') {
        return zodSchema.shape;
    } else {
        return {
            output: zodSchema.describe(successResponse.description || 'The API response content.'),
        };
    }
}
