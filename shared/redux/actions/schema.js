import SchemaService from '../../services/schema';
import transformer from 'utils/form-data-transformer';
import uniqueId from 'utils/uniqueFormId';
import { REQUEST_UPDATE_ERROR_RESPONSE } from './application';
import { RECEIVE_USER_LOGIN_RESPONSE } from './user';
import { getPayLoad } from 'utils/actionUtils';

/*
	TODO :  write common function to handle actions
 */

export function REQUEST_ADD_COMPANY_PEOPLE(payload) {
	return async(dispatch) => {

		dispatch({
			type : 'RESPONSE_ADD_COMPANY_PEOPLE',
			data : {
				isFetching: true
			}
		});

		const config = {
			endpoint:'company.schema.post.people',
			method:'post',
			paramsPayload : payload.paramsPayload,
			dataPayload: transformer.transformPathsToObject(payload.dataPayload)
		};

		try {
			const response = await SchemaService.fetchData(config);
			dispatch({
				type : 'RESPONSE_ADD_COMPANY_PEOPLE',
				data : Object.assign(response.data,{isFetching: false})
			});

		}catch (e) {
			console.log(e);
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_ADD_COMPANY_PEOPLE',
					data : Object.assign(e,{isFetching: false})
				},
				error : e
			}));
		}

	};
}

export function REQUEST_SCHEMA_PROPERTIES(payload) {

		return async(dispatch) => {

			dispatch({
				type : 'REQUEST_SCHEMA_PROPERTIES',
				data : {
					isFetching: true
				}
			});

			dispatch({
				type : 'REQUEST_ADD_LOCATION_SCHEMA',
				data : {}
			});

			const requestConfig = {
				endpoint:'locateproperty',
				method:'get',
				dataPayload: payload
			};


			try {
				const response = await SchemaService.fetchData(requestConfig);
				dispatch({
					type : 'REQUEST_SCHEMA_PROPERTIES',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'REQUEST_SCHEMA_PROPERTIES',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_BASIC_SCHEMA(payload) {
		const { visitorIP } = frameworkGlobals;

		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			//reset stores

			dispatch({
				type : 'REQUEST_GET_BASIC_SCHEMA',
				data : {
					'schema_get_basic': {
						isFetching: true
					},
					'schema_get_financial': {},
					'schema_get_overview': {},
					'schema_get_property':{},
					'schema_get_additional':{},
					'schema_save_basic' :{},
					'schema_save_overview' : {}
				}
			});

			const config = {
				endpoint:'getlocationschema',
				method:'get',
				dataPayload: payload.params,
				paramsPayload : {
					'ip' : visitorIP || '::1'
				}
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type: 'HIDE'
				});
				dispatch({
					type : 'RESPONSE_GET_BASIC_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_GET_BASIC_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_ADD_BASIC_SCHEMA(payload) {
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_ADD_BASIC_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'savelocationschema',
				method:'post',
				dataPayload: transformer.transformPathsToObject(payload)
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'RESPONSE_ADD_BASIC_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_BASIC_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_FINANCIAL_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_GET_FINANCIAL_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const requestConfig = {
				endpoint:'getfinancialschema',
				method:'get',
				paramsPayload: payload.params
			};

			try {
				const response = await SchemaService.fetchData(requestConfig);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_GET_FINANCIAL_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_GET_FINANCIAL_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_ADD_FINANCIAL_SCHEMA(payload) {
		return async(dispatch) => {

			dispatch({
				 type : 'RESPONSE_ADD_FINANCIAL_SCHEMA',
				 data : {
				 	isFetching: true
				 }
			 });

			const requestConfig = {
				endpoint:'savefinancialschema',
				method:'post',
				dataPayload: transformer.transformPathsToObject(payload.payload)
			};

			try {
				const response = await SchemaService.fetchData(requestConfig);
				dispatch({
					type : 'RESPONSE_ADD_FINANCIAL_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_FINANCIAL_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_OVERVIEW_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_GET_OVERVIEW_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const requestConfig = {
				endpoint:'getoverviewschema',
				method:'get',
				paramsPayload: payload.params
			};

			try {
				const response = await SchemaService.fetchData(requestConfig);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_GET_OVERVIEW_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_GET_OVERVIEW_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_ADD_OVERVIEW_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_ADD_OVERVIEW_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const requestConfig = {
				endpoint:'saveoverviewschema',
				method:'post',
				dataPayload: transformer.transformPathsToObject(payload.payload)
			};

			try {
				const response = await SchemaService.fetchData(requestConfig);
				dispatch({
					type : 'RESPONSE_ADD_OVERVIEW_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_OVERVIEW_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_ADDITIONAL_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_GET_ADDITIONAL_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'getadditionalschema',
				method:'get',
				paramsPayload: payload.params
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_GET_ADDITIONAL_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_GET_ADDITIONAL_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_ADD_ADDITIONAL_SCHEMA(payload) {
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_ADD_ADDITIONAL_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'saveadditionalschema',
				method:'post',
				dataPayload: transformer.transformPathsToObject(payload.payload)
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'RESPONSE_ADD_ADDITIONAL_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_ADDITIONAL_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_PROPERTY_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				 type : 'REQUEST_GET_PROPERTY_SCHEMA',
				 data : {
				 	isFetching: true
				 }
			 });

			const config = {
				endpoint:'getpropertyschema',
				method:'get',
				paramsPayload: payload.params
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'REQUEST_GET_PROPERTY_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'REQUEST_GET_PROPERTY_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_ADD_PROPERTY_SCHEMA(payload) {
		return async(dispatch) => {

			dispatch({
				 type : 'RESPONSE_ADD_PROPERTY_SCHEMA',
				 data : {
				 	isFetching: true
				 }
			 });

			const config = {
				endpoint:'savepropertyschema',
				method:'post',
				dataPayload: transformer.transformPathsToObject(payload.payload)
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'RESPONSE_ADD_PROPERTY_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_PROPERTY_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_BUILDINGDETAILS_SCHEMA(payload) {
		return async(dispatch) => {

			dispatch({
			 	type : 'REQUEST_ADD_LOCATION_SCHEMA',
			 	data : {
					 isFetching: true
			 	}
			});

			const config = {
				endpoint:'getpropertybuilding',
				method:'get',
				dataPayload: payload
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'REQUEST_GET_BUILDINGDETAILS_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'REQUEST_GET_BUILDINGDETAILS_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_USER_REGISTRATION_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'REQUEST_GET_USER_REGISTRATION_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'getsignupschema',
				method:'get',
				dataPayload: payload
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'REQUEST_GET_USER_REGISTRATION_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'REQUEST_GET_USER_REGISTRATION_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_ADD_USER_REGISTRATION_SCHEMA(payload) {
		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_ADD_USER_REGISTRATION_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint: payload.payload.endpoint,
				method:'post',
				dataPayload: transformer.transformPathsToObject(payload.payload)
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'RESPONSE_ADD_USER_REGISTRATION_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});
				RECEIVE_USER_LOGIN_RESPONSE(
					dispatch ,
					Object.assign(response.data,{ userstatus : 'USER_CREATED'},{isLogIn:false},{isFetching: false}),
					payload.payload.rememberFlg
				);
			}catch (e) {
				dispatch({
					type: 'RESPONSE_USER_LOGIN',
					data: Object.assign(e,{isLogIn:false},{isFetching: false})
				});
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_USER_REGISTRATION_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_COMPANY_REGISTRATION_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'REQUEST_GET_COMPANY_REGISTRATION_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'getcompanyregistrationschema',
				method:'get'
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'REQUEST_GET_COMPANY_REGISTRATION_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'REQUEST_GET_COMPANY_REGISTRATION_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_EDIT_COMPANY_SCHEMA(payload) {

		return async (dispatch) => {
			dispatch({
				type : 'RESPONSE_GET_EDIT_COMPANY_SCHEMA',
				data : {
					isFetching: true
				}
			});

			dispatch({
				type : 'RESPONSE_ADD_COMPANY_REGISTRATION_SCHEMA',
				data : undefined
			});

			const config = {
				endpoint:'getcompanyeditschema',
				method:'get',
				paramsPayload: payload.params
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type : 'RESPONSE_GET_EDIT_COMPANY_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_GET_EDIT_COMPANY_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_ADD_COMPANY_REGISTRATION_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_ADD_COMPANY_REGISTRATION_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'savecompanyschema',
				method:'post',
				paramsPayload: { 'companytype' : payload.companytype},
				dataPayload: transformer.transformPathsToObject(payload.payload)
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'RESPONSE_ADD_COMPANY_REGISTRATION_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_COMPANY_REGISTRATION_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_LISTING_CONFIRMATION(payload) {

		return async (dispatch) => {

			dispatch({
				type: 'RESPONSE_LISTING_CONFIRMATION',
				data: {isFetching: true}
			});
			const config = {
				endpoint:'listingconfirmation',
				method:'post',
				paramsPayload: payload.paramData,
				dataPayload: payload.data
			};

			try {

				const response = await SchemaService.fetchData(config);
				dispatch({
					type: 'RESPONSE_LISTING_CONFIRMATION',
					data: {
						isFetching: false,
						...response.data
					}
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_LISTING_CONFIRMATION',
						data : {
							isFetching: false,
							'error' : e.error && e.error.error_description || '',
							'status' : e.status
						}
					},
					error : e
				}));

			}
		};
	}

export function REQUEST_GET_ARTICLE_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_GET_ARTICLE_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'getarticleschema',
				method:'get'
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type : 'RESPONSE_GET_ARTICLE_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_GET_ARTICLE_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_GET_EDIT_ARTICLE_SCHEMA(payload) {

		return async(dispatch, getState) => {

			dispatch({
				type : 'RESPONSE_GET_EDIT_ARTICLE_SCHEMA',
				data : {
					isFetching: true
				}
			});

			dispatch({
				type : 'RESPONSE_ADD_ARTICLE_SCHEMA',
				data : undefined
			});

			const config = {
				endpoint:'getarticleeditschema',
				method:'get',
				paramsPayload: payload.params
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type : 'RESPONSE_GET_EDIT_ARTICLE_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_GET_EDIT_ARTICLE_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));

			}

		};
	}

export function REQUEST_ADD_ARTICLE_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_ADD_ARTICLE_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'savearticle',
				method:'post',
				dataPayload: transformer.transformPathsToObject(payload.dataPayload),
				paramsPayload : payload.paramsPayload

			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'RESPONSE_ADD_ARTICLE_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_ADD_ARTICLE_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_USER_PROFILE_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_USER_PROFILE_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint:'userprofileedit',
				method:'get',
				paramsPayload: payload.params
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type : 'RESPONSE_USER_PROFILE_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_USER_PROFILE_SCHEMA',
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function SAVE_USER_PROFILE_SCHEMA(payload) {
		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_SAVE_USER_PROFILE_SCHEMA',
				data : {
					isSaving : true
				}
			});

			dispatch({
				type : 'RESPONSE_USER_PROFILE_CHANGE_PASSWORD',
				data : {}
			});

			const config = {
				endpoint: 'userprofileedit',
				method: 'post',
				dataPayload: transformer.transformPathsToObject(payload.dataPayload)
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'RESPONSE_SAVE_USER_PROFILE_SCHEMA',
					data : Object.assign(response.data,{isSaving: false})
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_SAVE_USER_PROFILE_SCHEMA',
						data : Object.assign(e,{isSaving: false, isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_NOTIFICATION_PREFERENCES_SCHEMA(payload) {

		return async(dispatch) => {

			dispatch({
				type : 'RESPONSE_NOTIFICATION_PREFERENCES_SCHEMA',
				data : {
					isFetching: true
				}
			});

			const config = {
				endpoint: 'getnotificationpreferences',
				method: 'get',
				paramsPayload: payload.params
			};

			try {
				const response = await SchemaService.fetchData(config);

				dispatch({
					type : 'RESPONSE_NOTIFICATION_PREFERENCES_SCHEMA',
					data : Object.assign(response.data,{isFetching: false})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_NOTIFICATION_PREFERENCES_SCHEMA',
						data : Object.assign({},e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function SAVE_NOTIFICATION_PREFERENCES_SCHEMA(payload) {
		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_SAVE_NOTIFICATION_PREFERENCES_SCHEMA',
				data : {
					isSaving : true
				}
			});

			const config = {
				endpoint : 'getnotificationpreferences',
				method: 'post',
				dataPayload: transformer.transformPathsToObject(payload.dataPayload)
			};

			try {
				const response = await SchemaService.fetchData(config);
				dispatch({
					type : 'RESPONSE_SAVE_NOTIFICATION_PREFERENCES_SCHEMA',
					data : Object.assign(response.data,{isSaving: false})
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_SAVE_NOTIFICATION_PREFERENCES_SCHEMA',
						data : Object.assign(e,{ isSaving: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_GET_QUESTION_EDIT_SCHEMA(payload) {
		return async(dispatch) => {
			dispatch({
				type : 'RESPONSE_GET_QUESTION_SCHEMA',
				data : {
					isFetching : true
				}
			});

			const requestConfig = {
				endpoint : 'getquestioneditschema',
				method : 'get',
				paramsPayload : payload
			};

			try {
				const response = await SchemaService.fetchData(requestConfig);
				dispatch({
					type : 'RESPONSE_GET_QUESTION_SCHEMA',
					data : Object.assign(response.data,{ isFetching: false})
				});

			} catch (e) {

				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_GET_QUESTION_SCHEMA',
						data : Object.assign(e,{ isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_SCHEMA_MY_PROPERTY({ isGenerateParampayload =false, isGenerateDataPayload = false, paramPayloadLookup = '', dataPayloadLookup = '', query = '', actionType = '',endpoint = '', method= '', params = '', paramPayload='', dataPayload = '' , }) {
		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : actionType,
				data : {
					isFetching: true
				}
			});


			const requestConfig = {
				endpoint: endpoint,
				method: method,
				paramsPayload: isGenerateParampayload && getPayLoad(paramPayloadLookup, Object.assign({},{query,params}))  || paramPayload,
				dataPayload: isGenerateDataPayload && getPayLoad(dataPayloadLookup, Object.assign({},{query,params})) || dataPayload
			};

			try {
				const response = await SchemaService.fetchData(requestConfig);

				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : actionType,
					data : Object.assign(response.data,{isFetching: false, actionResponseId :uniqueId()})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : actionType,
						data : Object.assign(e,{isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function REQUEST_SCHEMA_TENANT_APPLICATION({ actionType = '',endpoint = '', method= '', params = '', paramPayload='', dataPayload = '' }) {
	return async(dispatch) => {

		dispatch({
			type: 'SHOW'
		});

		dispatch({
			type : actionType,
			data : {
				isFetching: true
			}
		});


		const requestConfig = {
			endpoint: endpoint,
			method: method,
			paramsPayload: paramPayload,
			dataPayload: dataPayload
		};

		try {
			const response = await SchemaService.fetchData(requestConfig);

			dispatch({
				type: 'HIDE'
			});

			dispatch({
				type : actionType,
				data : Object.assign(response.data,{isFetching: false, actionResponseId :uniqueId()})
			});

		}catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : actionType,
					data : Object.assign(e,{isFetching: false})
				},
				error : e
			}));
		}

	};
}
