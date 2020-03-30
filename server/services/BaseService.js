import config from 'config';
import API from '../../shared/lib/ApiBridge';
import moment from 'moment';
const uuidv4 = require('uuid/v4');
//import Logger from '../../shared/utils/logger/logger';

// as we building server files
// adding instance path statically
//const logger = Logger.getInstance('service/BaseService.js');

const baseUrl = config.get('api.api-base');

export default class BaseService {

	static defaultConfig = {
		endpoint : '',
		method : '',
		dataPayload:{},
		headersPayload: {}
	};

	static fetchData({ endpoint, method, dataPayload , headersPayload}) {
		const reqID = uuidv4();
		//logger.info("api.server", "Api Request",{ reqID : reqID, endpoint, method , "requestetime" : moment().toISOString()});
		return new Promise((resolve, reject) => {
			 const url = `${baseUrl}${endpoint}`;
			API.restUrl(method,url,dataPayload,headersPayload).then(
				(response) => {
					//logger.info("api.server", "Api response : Success",{ reqID : reqID, endpoint, method , "responsetime" : moment().toISOString()});
					resolve({
						...response.data,
						status : 'success'
					});
				},
				(error) => {
					//logger.error("api.server", "Api response : Fail",{ reqID : reqID, endpoint, method, error: error.response.data});
					reject({
						error : error.response.data,
						status : 'error',
						statusCode : error.response.status,
						statusText: error.response.error
					});
				}
			);
		});
	}


}

