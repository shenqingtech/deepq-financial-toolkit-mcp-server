import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {loadConfig} from './config-loader.mjs';
import {generateToolsFromConfig} from './open-api-processor.mjs';
import {startMcpServer} from '../src/mcp-server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DEFINITION_FILE_NAME = 'tools-manifest.json';
const TOOLS_DEFINITION_FILE_PATH = path.join(__dirname, '..', TOOLS_DEFINITION_FILE_NAME);

async function generate() {
    console.log('Starting tool generation process...');
    try {
        const config = await loadConfig();
        if (!config) {
            console.error('Error: Configuration file not found or is empty. Cannot generate tools.');
            process.exit(1);
        }
        const tools = await generateToolsFromConfig(config);
        const toolsJson = JSON.stringify(tools, null, 2);
        await fs.writeFile(TOOLS_DEFINITION_FILE_PATH, toolsJson);
        console.log(`\n✅ Success! Tool definitions have been saved to ${TOOLS_DEFINITION_FILE_PATH}`);
    } catch (error) {
        console.error('❌ Fatal error during tool generation:', error);
        process.exit(1);
    }
}

async function start() {
    console.log('Generating tools in-memory and starting server...');
    try {
        const config = await loadConfig();
        if (!config) {
            console.error('Error: Configuration file not found or is empty. Cannot start server.');
            process.exit(1);
        }
        const tools = await generateToolsFromConfig(config);
        if (tools.length === 0) {
            console.warn('Warning: No tools generated from config. Server will start in no-tool mode.');
        } else {
            console.log(`Generated ${tools.length} tool(s) in-memory.`);
        }
        await startMcpServer(tools);
    } catch (error) {
        console.error('❌ Fatal error during server startup:', error);
        process.exit(1);
    }
}

(async () => {
    const command = process.argv[2];
    switch (command) {
        case 'generate':
            await generate();
            break;
        case 'start':
            await start();
            break;
        default:
            console.error(`Error: Unknown command "${command}"\n`);
            console.log('Usage: node gen/cli-dev.js [command]\n');
            console.log('Available commands:');
            console.log('  start (default) - Regenerates tool definitions in-memory and starts the server.');
            console.log('  generate        - Generates and saves the tool definition file (tools-manifest.json).');
            process.exit(1);
    }
})();
