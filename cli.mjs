#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {startMcpServer} from './src/mcp-server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DEFINITION_FILE_NAME = 'tools-manifest.json';
const TOOLS_DEFINITION_FILE_PATH = path.join(__dirname, TOOLS_DEFINITION_FILE_NAME);

async function serve() {
    console.error(`Starting MCP server from '${TOOLS_DEFINITION_FILE_NAME}'...`);
    try {
        const toolsJson = await fs.readFile(TOOLS_DEFINITION_FILE_PATH, 'utf-8');
        const tools = JSON.parse(toolsJson);
        if (tools.length === 0) {
            console.error('Warning: No tools found in the definition file. Server will start with no tools.');
        } else {
            console.error(`Loaded ${tools.length} tool(s) from ${TOOLS_DEFINITION_FILE_NAME}.`);
        }
        await startMcpServer(tools);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`❌ Error: Tool definition file '${TOOLS_DEFINITION_FILE_NAME}' not found.`);
            console.error("This package is intended to be used with a pre-generated tools-manifest.json file.");
        } else {
            console.error('❌ Fatal error during server startup:', error);
        }
        process.exit(1);
    }
}


(async () => {
    await serve();
})();
