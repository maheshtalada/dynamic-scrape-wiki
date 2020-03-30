import UserService from '../../services/user';
import cookie from 'react-cookie';
import { REQUEST_UPDATE_ERROR_RESPONSE, UPDATE_ERROR_STATE } from './application';

const { cookies } = require('../../config').default;
const USER_UNVERIFIED = 'USER_UNVERIFIED',
	USER_EXIST = 'USER_EXIST',
	USER_NOT_FOUND = 'USER_NOT_FOUND',
	USER_AUTO_REGISTERED = 'USER_AUTO_REGISTERED',
	USER_ACCOUNT_LOCKED = 'USER_ACCOUNT_LOCKED',
	EMPTY_PASSWORD = 'EMPTY_PASSWORD',
	TOKEN_VIA_EMAIL_VERIFIED = 'VERIFIED',
	TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
	TOKEN_VIA_EMAIL_EXPIRED = 'TOKEN_EXPIRED',
	TOKEN_VIA_EMAIL_INVALID = 'INVALID_TOKEN';

/* move this code to utils */
function campaignPostLoginRedirects(query) {
	if(query.campaign_type === 'flyer'){
		return `/profile/flyer/template/${query.listing_id}`;
	} else {
		return '/profile';
	}
}

export function	REQUEST_USER_LOGIN(payload) {
	const { userStateNotReset } = payload;
	delete payload.userStateNotReset;
	return async(dispatch) => {
		try{
			if(!userStateNotReset) {
				dispatch({
					type: 'RESPONSE_USER_LOGIN',
					data: {isFetching: true, isForceLogin: false}
				});
			}
			// resetting change_password store to empty as required by 'change password' feature
			dispatch({
				type : 'RESPONSE_USER_PROFILE_CHANGE_PASSWORD',
				data : {}
			});
			// extract rememberflg is sent
			const rememberFlg = payload.remember ;
			delete payload.remember;
			const response = await UserService.clientLogin(payload);

			RECEIVE_USER_LOGIN_RESPONSE(
				dispatch ,
				Object.assign({},response.data,{isLogIn:true},{isFetching: false}),
				rememberFlg
			);

		} catch (e) {
			const { error_description } = e.error;
			if(error_description === USER_UNVERIFIED || error_description === USER_ACCOUNT_LOCKED) {
				const response = await UserService.callPOST(payload,'generateotp');
			}
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_USER_LOGIN',
					data : Object.assign({},e,{ userstatus : error_description},{isLogIn:false},{isFetching: false})
				},
				error : e
			}));
		}

	};
}

export function	REQUEST_USER_LOOKUP(payload) {
	return async(dispatch) => {
		try{

			dispatch({
				type: 'RESPONSE_USER_LOOKUP',
				data: {isFetching: true, isForceLogin: false}
			});

			let response = await UserService.userLookup(payload);
			const { userstatus } = response.data;
			dispatch({
				type: 'RESPONSE_USER_LOOKUP',
				data: Object.assign({},response.data,{lookupStatus :userstatus, isLogIn:false,isFetching: false, isForceLogin: false})
			});

			if(userstatus === USER_AUTO_REGISTERED || userstatus === USER_ACCOUNT_LOCKED || userstatus === EMPTY_PASSWORD) {
				const response = await UserService.callPOST(payload,'generateotp');
			}

		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_USER_LOOKUP',
					data : Object.assign({},e,{isLogIn:false},{isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function	RECEIVE_USER_LOGIN_RESPONSE(dispatch, payload, flg) {

	if(flg && !frameworkGlobals.isServer) {
		cookie.save('refreshkey', payload.refresh_token, { path: '/', secure : cookies.isSecure});
	}
	dispatch({
		type: 'RESPONSE_USER_LOGIN',
		data: payload
	});
}

export function	REQUEST_GENERATE_NON_VERIFIED_OTP(payload) {

	return async (dispatch,getState) => {
		const { user } = getState().user;
		try {
			dispatch({
				type: 'RESPONSE_USER_LOGIN',
				data: {isFetching: true}
			});
			const response = await UserService.callPOST(payload,'generateotp');
			dispatch({
				type: 'RESPONSE_USER_LOGIN',
				data: Object.assign({},user, {isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_USER_LOGIN',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function	REQUEST_CHECK_USER_SESSION(payload) {
	// return with redis session payload
	const payloadData = Object.assign({},JSON.parse(payload));
	delete payloadData.access_token;
	return {
		type: 'RESPONSE_USER_LOGIN',
		data: Object.assign({}, payloadData, {isLogIn: true}, {isFetching: false})
	};
}

export function	REQUEST_USER_LOGOUT() {

	return async (dispatch) => {

		if(!frameworkGlobals.isServer) {
			cookie.remove("refreshkey", { path : '/'});
			localStorage.removeItem('chats');
		}
		try{
			const user = {
				'user' : Object.assign({},{isLogIn: false}, {isFetching: false})
			};
			dispatch({
				type: 'REQUEST_UPDATE_USER_STORE',
				data: user
			});
			dispatch({
				type : 'userRequested',
				data : Object.assign({},{chatModals : []})
			});
			const response = await UserService.clientLogout();

		} catch (e) {
			dispatch(UPDATE_ERROR_STATE(e));

		}
	};
}

export function	REQUEST_GENERATE_OTP(payload) {

	return async (dispatch,getState) => {
		try {
			dispatch({
				type: 'RESPONSE_USER_LOGIN',
				data: {isFetching: true}
			});
			const response = await UserService.callPOST(payload,'generateotp');
			dispatch({
				type: 'REQUEST_UPDATE_USER_STORE',
				data: Object.assign({},response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'REQUEST_UPDATE_USER_STORE',
					data : Object.assign({},{'error' : e.error.error_description,'status' : e.status},{isFetching: false})
				},
				error : e
			}));
		}
	};

}

export function	REQUEST_VERIFY_OTP(payload, stateObject) {
	return async (dispatch,getState) => {
		try {
			dispatch({
				type: 'RESPONSE_USER_LOGIN',
				data: {isFetching: true}
			});
			const response = await UserService.callPOST(payload,'verifyotp');

			dispatch({
				type: 'REQUEST_UPDATE_USER_STORE',
				data: Object.assign(response.data,{isFetching: false},stateObject)
			});

		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'REQUEST_UPDATE_USER_STORE',
					data: Object.assign(e,{isFetching: false})
				},
				error : e
			}));
		}
	};

}

export function	REQUEST_VERIFY_TOKEN_VIA_EMAIL(payload, stateObject) {
	return async (dispatch) => {
		const { query } = payload;
		try {
			dispatch({
				type: 'RESPONSE_USER_LOGIN',
				data: {isVerifyingToken: true}
			});
			let userData = {};
			const response = await UserService.callPOST({
				token : query.token
			},'verifyemailtoken');
			if(response.data) {

				const loginRedirectUrl = query.template && query.token ? `/profile/pdf/preview/${payload.id}?template=${query.template}` : '/profile';
				switch(response.data.message) {
					case TOKEN_VIA_EMAIL_VERIFIED:
						userData['userstatus'] = 'AUTO_VERIFIED_USER_RESET_PASSWORD';
						userData['modalSize'] = 'activate-account-login-modal';
						userData['name'] = response.data.name;
						userData['roleType'] = response.data.roleType;
						userData['modalTitle'] = 'ACCESSMYACCOUNT';
						userData['loginRedirectUrl'] = loginRedirectUrl;
						break;
					case TOKEN_NOT_FOUND:
						userData['userstatus'] = 'AUTO_VERIFIED_USER_EXIST';
						userData['username'] = response.data.username;
						userData['modalTitle'] = 'LOGIN';
						userData['loginRedirectUrl'] = campaignPostLoginRedirects(query);
						userData['errorInfo'] = {
							'description' : 'AUTO_VERIFIED_USER_PASSWORD_SET_DONE'
						};
						break;
					case TOKEN_VIA_EMAIL_INVALID:
						userData['status'] = 'error';
						userData['loginRedirectUrl'] = campaignPostLoginRedirects(query);
						userData['error'] = {
							'error_description' : 'AUTO_VERIFIED_USER_TOKEN_INVALID'
						};
						break;
					case TOKEN_VIA_EMAIL_EXPIRED:
						userData['userstatus'] = 'AUTO_VERIFIED_USER_VERIFY_OTP';
						//userData['loginRedirectUrl'] = loginRedirectUrl;
						userData['loginRedirectUrl'] = campaignPostLoginRedirects(query);
						userData['modalTitle'] = 'ACTIVATEYOURACCOUNT';
						userData['username'] = response.data.username;
				}
			}
			if(userData.loginRedirectUrl) {
				dispatch({
					type: 'REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL',
					data : {
						'registerLogin' : userData.loginRedirectUrl
					}
				});
			}
			dispatch({
				type: 'REQUEST_UPDATE_USER_STORE',
				data: Object.assign(response.data,{isVerifyingToken: false},stateObject,userData)
			});

		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'REQUEST_UPDATE_USER_STORE',
					data: Object.assign(e,{isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function	REQUEST_SET_PASSWORD_VIA_EMAIL(payload, stateObject) {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'RESPONSE_USER_LOGIN',
				data: {isFetching: true}
			});
			const response = await UserService.callPOST({
				token : payload.token,
				password : payload.password,
				name : payload.name
			},'setpasswordviaemail');
			if(response.data.username) {
				const loginResponse = await UserService.clientLogin({
					grant_type : 'password',
					username : response.data.username,
					password : payload.password
				});
				RECEIVE_USER_LOGIN_RESPONSE(
					dispatch ,
					Object.assign({},loginResponse.data,{isLogIn:true},{isFetching: false}),
					payload.rememberFlg
				);
			} else {
				dispatch({
					type: 'REQUEST_UPDATE_USER_STORE',
					data: Object.assign(response.data,{isFetching: false},stateObject)
				});
			}
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'REQUEST_UPDATE_USER_STORE',
					data: Object.assign(e,{isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function	REQUEST_RESET_PASSWORD(payload) {
	return async (dispatch, getState) => {

		try {
			dispatch({
				type: 'RESPONSE_USER_LOGIN',
				data: {isFetching: true}
			});
			const response = await UserService.callPOST(payload,'changepassword');
			RECEIVE_USER_LOGIN_RESPONSE(
				dispatch ,
				Object.assign({},response.data,{isLogIn:true},{isFetching: false}),
				payload.rememberFlg
			);
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type: 'REQUEST_UPDATE_USER_STORE',
					data: Object.assign({}, e,{isFetching: false})
				},
				error : e
			}));
		}
	};

}

export function	REQUEST_RESET_STATE() {

	return (dispatch) => {
		dispatch({
			type: 'REQUEST_UPDATE_USER_STORE',
			data: {isLogIn: false}
		});
	};


}

export function	REQUEST_USER_REGISTER_VERIFY_OTP(payload) {
	return async (dispatch, getState) => {
		const { register } = getState().user;
		try {
			dispatch({
				type: 'RESPONSE_USER_LOGIN',
				data: {isFetching: true, next:'otp', mode: payload.mode}
			});
			const response = await UserService.callPOST(payload,'verifyotp');
			RECEIVE_USER_LOGIN_RESPONSE(
				dispatch ,
				Object.assign({},response.data,{isLogIn:true,isFetching: false}),
				payload.rememberFlg
			);
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type: 'REQUEST_UPDATE_USER_STORE',
					data: Object.assign(e,{isFetching: false})
				},
				error : e
			}));
		}
	};
}



