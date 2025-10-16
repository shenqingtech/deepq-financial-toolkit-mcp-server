import {cosmiconfig} from 'cosmiconfig';
import {findUp} from 'find-up';
import path from 'path';
import {fileURLToPath} from 'url';

const projectRoot = path.dirname(await findUp('package.json', {
    cwd: path.dirname(fileURLToPath(import.meta.url))
}));

const searchPath = path.join(projectRoot, 'gen');

export const loadConfig = async () =>
    (await cosmiconfig('mcp-server').search(searchPath)).config;
