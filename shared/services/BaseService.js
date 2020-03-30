import API from '../lib/ApiBridge';

export default class BaseService {

	static defaultConfig = {
		endpoint : '',
		method : '',
		paramsPayload: {},
		dataPayload:{},
		headersPayload:{},
		endpointBase: 'url'
	};


	fetchData(requestConfig) {
		const { endpoint, method, paramsPayload, dataPayload, headersPayload, endpointBase } = Object.assign({},BaseService.defaultConfig, requestConfig);
		return new Promise((resolve, reject) => {
			API[method].apply(API,[endpoint,paramsPayload,dataPayload,headersPayload,endpointBase]).then(
				(response) => {
					resolve({
						data : response.data,
						status : 'success'
					});
				},
				(error) => {
					reject({
						...error.response.data
					});
				}
			);
		});
	}

	static callAPI(endpoint, method, paramsPayload={}, dataPayload={} , headersPayload={},endpointBase='url') {
		return API[method].apply(API,[endpoint,paramsPayload,dataPayload,headersPayload,endpointBase]);
	}

}
