import axios from 'axios';
import cookie from 'react-cookie';
import SiteConfig from '../../shared/config.js';

const { endpoints : DEFAULT_ENDPOINTS , api } = SiteConfig;
class ApiBridge {

	constructor() {
		this.apiURL = this.getURL();
	}

	getURL() {
		return `${api.protocol}://${api.host}:${api.port}${api.prefix}`;
	}

	getNestedObject(obj, dotSeparatedKeys) {
		const pathArr = dotSeparatedKeys.split('.');
		return pathArr.reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : undefined), obj);
	};

	buildEndpoint(endpointName, endpointParams = {}, endpoints = DEFAULT_ENDPOINTS) {

		let endpointRegex = /\{[^\}]*}/g,
			endpointStr,
			paramMatch,
			i,
			key;
		endpointStr = this.getNestedObject(endpoints, endpointName);

		if (!endpointStr) {
			throw new Error('Endpoint not found: ' + endpointName);
		}
		paramMatch = endpointStr.match(endpointRegex);

		if (paramMatch && paramMatch.length) {
			for (i = 0; i < paramMatch.length; ++i) {
				key = paramMatch[i].replace(/\{|\}/g, '');
				if (!endpointParams[key]) {
					throw new Error('Endpoint Parameter not matched');
				}
				endpointStr = endpointStr.replace('{' + key + '}', endpointParams[key]);
			}
		}

		return endpointStr;

	}

	async restUrl(method, url, dataPayload, headerPayload = {}) {
		method = method.toUpperCase();
		const config = {
			method : method,
			url: url,
			headers : headerPayload
		};

		if(method === 'GET' ? config.params = dataPayload : config.data = dataPayload) {
			 //console.log(config);
		}

		try {
			const response = await axios(config);
			// TODO handle empty response , i.e if data is empty
			return Promise.resolve(response);
		} catch(error) {
			console.log(error)
			return Promise.reject(error);
		}
	}

	rest(method, endpointName, endpointParams, dataPayload, headerPayload = {},endpointBase) {
		// CSRF Token to send back to UI server
		/* ajaxPayload.headers = ajaxPayload.headers || {};*/
		/* if(frameworkGlobals.isServer) {
			headerPayload = frameworkGlobals.csrfToken;
		}*/
		// if(!frameworkGlobals.isServer) {
		endpointBase = 'path';
		// }
		const endpointStr = this.buildEndpoint(endpointName, endpointParams);
		let url = endpointBase === 'path' ? `${api.prefix}${endpointStr}` : `${this.apiURL}${endpointStr}`;
		if(frameworkGlobals.isServer) {
			const contextService = require('../../server/middleware/requestContext').default;
			url = `${contextService.get('request:hostname')}${url}`;
			headerPayload = Object.assign(headerPayload, {
				'Cookie': `sid=${contextService.get('request:cookie_sid')};country=${contextService.get('request:country')}`,
				'clientip' : contextService.get('request:visitorIP')
			});
		} else {
			const csrf= cookie.load('csrf-token', { path: '/'});
			headerPayload = Object.assign(headerPayload, {
				'clientip' : frameworkGlobals.visitorIP,
				'csrf-token' : csrf
			});
		}
		return this.restUrl(method, url, dataPayload, headerPayload);
	}

	postFile(endpointName, endpointParams, formData) {
		let ajaxPayload = {
			cache: false,
			contentType: false,
			processData: false
		};
		return this.post(endpointName, endpointParams, formData, headerPayload);
	}

	post(endpointName, endpointParams, payload, headerPayload = {},endpointBase) {
		return this.rest('post', endpointName, endpointParams, payload, headerPayload,endpointBase);
	}

	put(endpointName, endpointParams, payload, headerPayload = {},endpointBase) {
		headerPayload.headers = headerPayload.headers || {};
		headerPayload.headers['X-Http-Method-Overwrite'] = 'put';
		return this.rest('post', endpointName, endpointParams, payload, headerPayload,endpointBase);
	}

	patch(endpointName, endpointParams, payload, headerPayload = {},endpointBase) {
		headerPayload.headers = headerPayload.headers;
		headerPayload.headers['X-Http-Method-Overwrite'] = 'patch';
		return this.rest('post', endpointName, endpointParams, payload, headerPayload,endpointBase);
	}

	get(endpointName, endpointParams, payload, headerPayload = {},endpointBase) {
		return this.rest('get', endpointName, endpointParams, payload, headerPayload,endpointBase);
	}

	delete(endpointName, endpointParams, payload, headerPayload = {},endpointBase) {
		// headerPayload.headers = headerPayload.headers;
		// headerPayload.headers['X-Http-Method-Overwrite'] = 'delete';
		return this.rest('delete', endpointName, endpointParams, payload, headerPayload,endpointBase);
	}
}

export default new ApiBridge;
