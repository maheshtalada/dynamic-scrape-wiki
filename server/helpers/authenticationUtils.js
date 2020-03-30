import BaseService from '../services/BaseService';
import queryString from 'query-string';
import moment from 'moment';
import btoa from 'btoa';
import { getRoleID } from '../../shared/utils/userUtilities';
//import Logger from '../../shared/utils/logger/logger';

// as we building server files
// adding instance path statically
//const logger = Logger.getInstance('middleware/authenticationUtils.js');

export async function authorizeAccount(payload) {
	const configUser = {
		method : 'get',
		endpoint : '/api/v1/users/account',
		dataPayload : {
			'access_token' : payload.access_token
		}
	};

	let requestDataAccount = Object.assign({},BaseService.defaultConfig,configUser);
	//logger.info("api.outh", "getting user account details",{ "requestData" : requestDataAccount});
	try {
		let clientAccount = await BaseService.fetchData(requestDataAccount);
		const fileid = clientAccount.id;
		clientAccount.role_id = getRoleID(clientAccount.roles);
		// add access token & send response
		const propshubStore = Object.assign({...clientAccount},
			{'refresh_token' : payload.refresh_token,
				'access_token' : payload.access_token,
				'expires_in' : payload.expires_in,
				'fileid': fileid,
				'created_time' : moment().unix()
			}
		);
		return Promise.resolve(propshubStore);
	} catch (e) {
		return Promise.reject({
			error : e,
			context : 'error caught while fetching user account data'
		});
	}
}

export async function validateRefreshToken(payload) {

	const configOuth = {
		method : 'post',
		endpoint : payload.path ,
		dataPayload : queryString.stringify(payload.body),
		headersPayload :{
			'Authorization': 'Basic ' + btoa('my-trusted-client' + ':' + 'secret'),
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	let requestDataOuth = Object.assign({},BaseService.defaultConfig,configOuth);
	try {
		const responseOuth = await BaseService.fetchData(requestDataOuth);
		return Promise.resolve(responseOuth);
	} catch (e) {
		return Promise.reject({
			error : e,
			context : 'error caught while refresh token'
		});
	}
};

export async function authorizationWithRefreshToken(payload) {

	try {
		const refreshTokenResponse = await validateRefreshToken(payload);
		try {
			const responseUserObject = await authorizeAccount(refreshTokenResponse);
			return Promise.resolve(responseUserObject);
		} catch (e) {
			return Promise.reject(e);
		}
	} catch (e) {
		return Promise.reject(e);
	}
};

/*module.exports = {
	authorizeAccount,
	validateRefreshToken,
	authorizationWithRefreshToken
}*/


