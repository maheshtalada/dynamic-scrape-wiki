import config from 'config';
import { getSessionData } from './sessionUtils';
//import Logger from '../../shared/utils/logger/logger';
const endpoints = config.get('endpoints');
const apiPrefix = config.get('api.prefix');
//const logger = Logger.getInstance('helpers/endpointbuilder.js');
//const DEFAULT_COUNTRY_CODE =
export default function buildEndpoint(endpointName, endpointParams = {}) {
	let endpointRegex = /\{[^\}]*}/g,
		endpointStr = config.get(`endpoints.${endpointName}`) || '',
		paramMatch,
		i,
		key;

	if (!endpointStr) {
		//logger.error('api.server', 'Endpoint not found', { endpointName});
		throw new Error('Endpoint not found: ' + endpointName);
	}

	paramMatch = endpointStr.match(endpointRegex);

	if (paramMatch && paramMatch.length) {
		for (i = 0; i < paramMatch.length; ++i) {
			key = paramMatch[i].replace(/\{|\}/g, '');
			if (!endpointParams[key]) {
				//logger.error('api.server', 'Endpoint Parameter not matched', { endpointName});
				throw new Error('Endpoint Parameter not matched');
			}
			endpointStr = endpointStr.replace('{' + key + '}', endpointParams[key]);
		}
	}

	return `${apiPrefix}${endpointStr}`;

}

export function getHeaderPayload(req, payload={}) {
	const sessionData = getSessionData(req);
	return {
		...payload,
		'countrycode': req.cookies.country || '',
		'clientip': req.headers.clientip || '',
		'sessionuserid': payload.sessionuserid ||  (sessionData && sessionData.id) || ''
	}
}
