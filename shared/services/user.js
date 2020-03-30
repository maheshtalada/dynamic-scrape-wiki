import BaseService from './BaseService';
/*import 'babel-polyfill';*/

class UserService extends BaseService {

	clientLogin = async(dataPayload) => {
		const config = Object.assign({},BaseService.defaultConfig,{
			endpoint:'clientLogin',
			method:'post',
			dataPayload : dataPayload,
			endpointBase: 'path',
			headersPayload : {
				'Content-Type': 'application/json'
			}
		});
		return await this.fetchData(config);
	};

	userLookup = async(dataPayload) => {
		const config = Object.assign({},BaseService.defaultConfig,{
			endpoint:'userlookup',
			method:'post',
			dataPayload : dataPayload,
			endpointBase: 'path',
			headersPayload : {
				'Content-Type': 'application/json'
			}
		});
		return await this.fetchData(config);
	};

	getUserSession = async(payload, header) => {
		// endpoint, method, paramsPayload, dataPayload , headersPayload
		return new Promise((resolve, reject) => {
			payload.get(header, (err , replay) =>{
				console.log(replay);
				if(err) {
					reject({
						error : err,
						status : 'error'
					});
				} else {
					resolve({
						response : JSON.parse(replay)
					});
				}

			});

		});
	};

	clientLogout = async() => {
		const config = Object.assign({},BaseService.defaultConfig,{
			endpoint:'clientLogout',
			method:'get',
			endpointBase: 'path'
		});
		return await this.fetchData(config);
	};

	callPOST = async(dataPayload, endpoint) => {
		const config = Object.assign({},BaseService.defaultConfig,{
			endpoint:endpoint,
			method:'post',
			dataPayload: dataPayload,
			endpointBase: 'path'
		});

		return await this.fetchData(config);
	}

	callPOSTWithHeaders = async(dataPayload, endpoint,headersPayload) => {
		const config = Object.assign({},BaseService.defaultConfig,{
			endpoint:endpoint,
			method:'post',
			dataPayload: dataPayload,
			headersPayload: headersPayload,
			endpointBase: 'path'
		});

		return await this.fetchData(config);
	}

}

export default new UserService;
