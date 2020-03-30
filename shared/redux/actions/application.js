import delay from 'lib/delay';
import ApplicationService from '../../services/application';

const ERROR_CODES = {
	401: REQUEST_UPDATE_UNAUTHERIZE_ERROR,
	500: REQUEST_UPDATE_SERVER_ERROR
};

function getErrorActionName(statusCode) {
	return ERROR_CODES[statusCode] || ''
}

export function REQUEST_GET_DEVICE(device) {
	return {
		type : 'REQUEST_GET_DEVICE',
		data : device
	};
}

export function REQUEST_OPEN_SITE_FEEDBACK(payload={}) {
	return {
		type : 'RESPONSE_OPEN_SITE_FEEDBACK',
		data : payload
	}
}

export function REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL(payload) {
	return {
		type : 'REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL',
		data : payload
	};
}

export function REQUEST_DATA_FROM_STORE(payload) {
	return async(dispatch,getState) => {
		dispatch({
			type: 'RESPONSE_DATA_FROM_STORE',
			data: {
				isFetching: true
			}
		});
		await delay(100);
		const data = getState()[payload.store][payload.lookupObject];
		try {
			dispatch({
				type: 'RESPONSE_DATA_FROM_STORE',
				data: Object.assign(data,{isFetching: false,isFetchedFromStore: true})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_DATA_FROM_STORE',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_UPDATE_UNAUTHERIZE_ERROR() {
	return (dispatch) => {
		const user = Object.assign({},{isLogIn: false}, {isFetching: false, isForceLogin : true, errorInfo : {
			description : 'SESSIONEXPIREPROMPT'
		}});

		dispatch({
			type: 'REQUEST_UPDATE_USER_STORE',
			data: user
		});
		dispatch({
			type : 'userRequested',
			data : Object.assign({},{chatModals : []})
		});
		dispatch({
			type : 'UPDATE_ERROR_STATE',
			data : {error : 'unauthorized'}
		})
	}
}

export function REQUEST_UPDATE_SERVER_ERROR() {
	return {
		type : 'UPDATE_ERROR_STATE',
		data : {error : 'servererror'}
	}
}

export function UPDATE_ERROR_STATE(payload) {
	return (dispatch) => {
		const errorActionName = getErrorActionName(payload.statusCode);
		if(errorActionName) {
			dispatch(errorActionName());
			return;
		}

		REQUEST_RESET_ERROR_STATE(payload);
	}
}

export function REQUEST_RESET_ERROR_STATE(payload) {
	return {
		type: 'UPDATE_ERROR_STATE',
		data: ''
	}
}

export function REQUEST_UPDATE_ERROR_RESPONSE(payload) {
	return (dispatch) => {
		dispatch({type: 'HIDE'});
		payload.action && dispatch(payload.action);
		dispatch(UPDATE_ERROR_STATE(payload.error));
	}

}

export function REQUEST_UPDATE_INVESTOR_WIZARD(payload) {
	return (dispatch, getState) => {
		const { investor_wizard } = getState().application;
		dispatch({
			type: 'REQUEST_UPDATE_INVESTOR_WIZARD',
			data : Object.assign({}, {...investor_wizard},{...payload})
		});
	}
}

export function REQUEST_GET_COMPANIES(payload) {
	return async(dispatch) => {
		const config = {
			endpoint: 'company.list.get.listcompanies',
			method: 'get',
			dataPayload : {
				processed : payload.query && payload.query.type || 'unprocessed'
			}
		};

		try {
			const response = await ApplicationService.fetchData(config);
			dispatch({
				type : 'RESPONSE_GET_COMPANIES',
				data : response.data
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_GET_COMPANIES',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_GET_PEOPLE(payload) {
	return async(dispatch) => {
		const config = {
			endpoint: 'people.list.get.listpeople',
			method: 'get',
			dataPayload : {
				processed : payload.query && payload.query.type || 'unprocessed'
			}
		};

		try {
			const response = await ApplicationService.fetchData(config);
			dispatch({
				type : 'RESPONSE_GET_PEOPLE',
				data : response.data
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_GET_PEOPLE',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_GET_COMPANY(payLoad) {
	return async(dispatch) => {
		const config = {
			endpoint: 'company.list.get.company',
			method: 'get',
			paramsPayload: payLoad.params
		};

		try {
			const response = await ApplicationService.fetchData(config);
			dispatch({
				type : 'RESPONSE_GET_COMPANY',
				data : response.data
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_GET_COMPANY',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_RUN_GRABBER(payLoad) {
	return async(dispatch) => {
		const config = {
			endpoint: 'company.list.get.rungrabber',
			method: 'get',
			dataPayload: payLoad.dataPayload,
			paramsPayload : payLoad.paramPayload
		};

		console.log(config);

		try {
			const response = await ApplicationService.fetchData(config);
			console.log(response);
			dispatch({
				type : 'RESPONSE_RUN_GRABBER',
				data : response.data
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_RUN_GRABBER',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_UPDATE_DATA_TABLE_STATE_CHANGES(payload) {
	return (dispatch) => {
		dispatch({
			type : 'RESPONSE_DATA_TABLE_STATE_CHANGES',
			data : payload
		});
	};
}

export function REQUEST_RESET_STORE_STATE(payload) {
	return (dispatch) => {
		dispatch({
			type : payload.type,
			data : {}
		});
	};
}



