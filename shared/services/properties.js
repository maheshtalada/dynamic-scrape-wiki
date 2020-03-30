import BaseService from './BaseService';
/*import 'babel-polyfill';*/

/*
 	Example with another way fo fecthing & manage results
 	promise implemented inside servie function
 	callAPI will be used from base
 	Test = async(ip) => {
 		//endpoint, method, paramsPayload, dataPayload , headersPayload
		 return new Promise((resolve, reject) => {
			 BaseService.callAPI('home','get',{},ip).then(
				 (response) => {
					 resolve({
						 data : response.data,
						 status : 'success'
					 });
				 },
				 (error) => {
					 reject({
						 error : error,
						 status : 'error'
					 });
				 }
			 );
 		});
 };
*/

class PropertyService extends BaseService {}

export default new PropertyService;
