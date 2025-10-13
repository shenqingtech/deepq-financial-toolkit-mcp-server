import axios from 'axios';
import {compile, match} from 'path-to-regexp';
import _ from 'lodash';

export async function callApi(toolMeta, args) {
    const {baseUrl, path, method, authorizationEnvKey} = toolMeta;

    const getPathParams = match(path, {decode: decodeURIComponent});
    const matchResult = getPathParams(path);
    const pathParamNames = matchResult ? Object.keys(matchResult.params) : [];

    const pathParams = _.pick(args, pathParamNames);
    const otherParams = _.omit(args, pathParamNames);

    const toPath = compile(path, {encode: encodeURIComponent});
    const fullPath = toPath(pathParams);

    const relativePath = fullPath.startsWith('/') ? fullPath.substring(1) : fullPath;
    const url = new URL(relativePath, baseUrl).href;

    const paramKey = ['GET', 'DELETE'].includes(method.toUpperCase()) ? 'params' : 'data';
    const headers = {};

    if (authorizationEnvKey) {
        const token = process.env[authorizationEnvKey];
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.error(`[WARN] Authorization key '${authorizationEnvKey}' is defined but not found in environment variables.`);
        }
    }

    const response = await axios({
        method,
        url,
        headers,
        [paramKey]: otherParams,
    });

    return response.data;
}
