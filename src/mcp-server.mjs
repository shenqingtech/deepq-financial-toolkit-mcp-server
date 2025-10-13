import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {callApi} from './api-client.mjs';
import {z} from './open-api-processor.mjs';

function hydrateSchema(schemaDef) {
    if (!schemaDef || !schemaDef._def) {
        return schemaDef;
    }
    const {typeName} = schemaDef._def;
    let schemaInstance;
    switch (typeName) {
        case 'ZodString':
            schemaInstance = z.string();
            if (schemaDef._def.checks) {
                for (const check of schemaDef._def.checks) {
                    if (check.kind === 'min') schemaInstance = schemaInstance.min(check.value);
                    if (check.kind === 'max') schemaInstance = schemaInstance.max(check.value);
                }
            }
            break;
        case 'ZodNumber':
            schemaInstance = z.number();
            if (schemaDef._def.checks) {
                for (const check of schemaDef._def.checks) {
                    if (check.kind === 'int') schemaInstance = schemaInstance.int();
                    if (check.kind === 'min') schemaInstance = schemaInstance.min(check.value);
                    if (check.kind === 'max') schemaInstance = schemaInstance.max(check.value);
                }
            }
            break;
        case 'ZodBoolean':
            schemaInstance = z.boolean();
            break;
        case 'ZodEnum':
            schemaInstance = z.enum(schemaDef._def.values);
            break;
        case 'ZodArray':
            const itemSchema = hydrateSchema(schemaDef._def.type);
            schemaInstance = z.array(itemSchema);
            break;
        case 'ZodObject':
            const shape = {};
            for (const key in schemaDef.shape) {
                shape[key] = hydrateSchema(schemaDef.shape[key]);
            }
            schemaInstance = z.object(shape);
            break;
        case 'ZodOptional':
            const innerSchemaOptional = hydrateSchema(schemaDef._def.innerType);
            schemaInstance = innerSchemaOptional.optional();
            break;
        case 'ZodDefault':
            const innerSchemaDefault = hydrateSchema(schemaDef._def.innerType);
            schemaInstance = innerSchemaDefault.default(schemaDef._def.defaultValue);
            break;
        case 'ZodAny':
        default:
            schemaInstance = z.any();
            break;
    }

    if (schemaDef._def.description) {
        schemaInstance = schemaInstance.describe(schemaDef._def.description);
    }

    return schemaInstance;
}

function hydrateToolSchemas(toolDefinition) {
    const hydratedInputSchema = {};
    for (const key in toolDefinition.inputSchema) {
        hydratedInputSchema[key] = hydrateSchema(toolDefinition.inputSchema[key]);
    }

    const hydratedOutputSchema = {};
    for (const key in toolDefinition.outputSchema) {
        hydratedOutputSchema[key] = hydrateSchema(toolDefinition.outputSchema[key]);
    }

    return {
        ...toolDefinition,
        inputSchema: hydratedInputSchema,
        outputSchema: hydratedOutputSchema,
    };
}

export const startMcpServer = async (toolDefinitions) => {
    const server = new McpServer({
        name: 'openapi-gateway-server',
        version: '1.0.0'
    });

    const hydratedTools = toolDefinitions.map(hydrateToolSchemas);

    hydratedTools.forEach(({name, title, description, inputSchema, outputSchema, meta}) => {
        server.registerTool(
            name,
            {title, description, inputSchema, outputSchema},
            async (args) => {
                try {
                    const result = await callApi(meta, args);
                    return {
                        content: [{type: 'text', text: JSON.stringify(result, null, 2)}],
                        structuredContent: result,
                    };
                } catch (error) {
                    return {
                        content: [{type: 'text', text: `Error calling API: ${error.message}`}],
                        isError: true,
                    };
                }
            }
        );
    });
    try {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.log('MCP Server (stdio) started successfully, ready for requests.');
    } catch (error) {
        console.error('MCP Server failed to start:', error);
        process.exit(1);
    }
};
