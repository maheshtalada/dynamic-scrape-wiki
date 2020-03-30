import API from '../lib/ApiBridge';
import BaseService from './BaseService';

const { mapServer, mapServerEndpoints }= require('../../shared/config.js').default;

class MapService extends BaseService {

	fetchData = async (config) => {

		const path = mapServer.path,
			dataPayload = config.dataPayload,
			method = config.method,
			headersPayload = config.headersPayload || {},
			endpointStr = API.buildEndpoint(config.endpoint,config.paramsPayload, mapServerEndpoints),
			url = `${path}${endpointStr}`;
		return new Promise((resolve, reject) => {
			API.restUrl(method,url,dataPayload,headersPayload).then(
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
	};
}

export default new MapService;
