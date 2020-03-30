import PropertyService from '../../services/properties';
import transformer from 'utils/form-data-transformer';
import { REQUEST_UPDATE_ERROR_RESPONSE } from './application';

export function REQUEST_PROPERTY_LISTING(payload) {

	return async(dispatch) => {
		const config = {
			endpoint: 'propertylisting',
			method:'get',
			paramsPayload : payload.params,
			dataPayload : Object.assign({},payload.query)
		};

		try {
			const response = await PropertyService.fetchData(config);
			dispatch({
				type : 'RESPONSE_PROPERTY_LISTING',
				data : Object.assign(response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_PROPERTY_LISTING',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}

	};
}

export function REQUEST_PROPERTY_IMAGES(payload) {

	return async(dispatch) => {

		dispatch({
			type : 'RESPONSE_PROPERTY_IMAGES',
			data : {isFetching: true}
		});

		const config = {
			endpoint: 'propertyimages',
			method:'get',
			paramsPayload : payload
		};

		try {
			const response = await PropertyService.fetchData(config);
			dispatch({
				type : 'RESPONSE_PROPERTY_IMAGES',
				data : Object.assign(response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_PROPERTY_IMAGES',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}

	};
}


export function REQUEST_GET_PROPERTY_PDF_TEMPLATE({ params , query }) {
	return async(dispatch, getState) => {
		const { user } = getState().user;

		dispatch({
			type : 'RESPONSE_GET_PROPERTY_PDF_TEMPLATE',
			data : {isFetching: true}
		});

		const config = {
			endpoint: user.isLogIn && 'pdf.customization.get.pdftemplatedataouth' || 'pdf.customization.get.pdftemplatedata',
			method:'get',
			paramsPayload : { id : params.id},
			headersPayload : { token : query.token}
		};

		if(user.isLogIn) {
			delete config.headersPayload
		}

		try {
			const response = await PropertyService.fetchData(config);
			dispatch({
				type : 'RESPONSE_GET_PROPERTY_PDF_TEMPLATE',
				data : Object.assign(response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_GET_PROPERTY_PDF_TEMPLATE',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}

	};
}


export function REQUEST_GET_PROPERTY_PDF({ params , query, locale, redis = false}) {
	return async(dispatch) => {
		const { sessionuserid = '' } = query;
		dispatch({
			type : 'RESPONSE_GET_PROPERTY_PDF',
			data : {isFetching: true}
		});


		const config = {
			endpoint: redis ? 'pdf.pdfdata.get.fromredis': 'pdf.pdfdata.get.fromserverdata',
			method:'get',
			paramsPayload : { id : params && params.id},
			dataPayload : { type :  (sessionuserid === `'campaign'` || sessionuserid === 'campaign') ? 'campaign' : 'generate'}
		};

		if(sessionuserid !== 'campaign'){
			config.headersPayload = { sessionuserid }
		}

		try {
			const response = await PropertyService.fetchData(config);
			dispatch({
				type : 'RESPONSE_GET_PROPERTY_PDF',
				data : Object.assign(response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_PROPERTY_PDF',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}

	};
}


export function REQUEST_ADD_PROPERTY_PDF_TEMPLATE_DATA(payload) {
	return async(dispatch, getState) => {
		const { user } = getState().user;
		dispatch({
			type : payload.actionType,
			data : {isFetching: true}
		});

		const config = {
			endpoint:  user.isLogIn && 'pdf.customization.post.pdftemplatedataouth' || 'pdf.customization.post.pdftemplatedata',
			method: 'post',
			paramsPayload : payload.paramsPayload,
			dataPayload : payload.dataPayload,
			headersPayload : payload.headersPayload
		};

		if(user.isLogIn) {
			delete config.headersPayload
		}

		try {
			const response = await PropertyService.fetchData(config);
			dispatch({
				type : payload.actionType,
				data : Object.assign(response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : payload.actionType,
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}

	};
}

export function REQUEST_SIMILAR_PROPERTY_LISTINGS(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_SIMILAR_PROPERTY_LISTINGS',
			data: {
				isFetching: true
			}
		});

		const config = {
			endpoint: 'similarlistings',
			method: 'get',
			paramsPayload: {
				id :payload.params.id
			}
		};

		const response = await PropertyService.fetchData(config);
		try {
			dispatch({
				type: 'RESPONSE_SIMILAR_PROPERTY_LISTINGS',
				data: Object.assign(response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_SIMILAR_PROPERTY_LISTINGS',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_ADD_TO_WISHLIST(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'SHOW'
		});
		dispatch({
			type: 'RESPONSE_ADD_TO_WISHLIST',
			data: {
				isSaving : true,
				id : payload.propertylistingids
			}
		});
		const config = {
			endpoint: 'addtowishlist',
			method: 'post',
			dataPayload: payload
		};
		try {
			const response = await PropertyService.fetchData(config);
			dispatch({
				type: 'HIDE'
			});
			dispatch({
				type: 'RESPONSE_ADD_TO_WISHLIST',
				data: Object.assign(response.data,{isSaving: false,id: payload.propertylistingids})
			});
		} catch(e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_ADD_TO_WISHLIST',
					data : {
						status : 'failed',
						isSaving: 'false',
						id: payload.propertylistingids
					}
				},
				error : e
			}));
		}
	};
}

export function REQUEST_DEMOGRAPHICS_DATA(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_DEMOGRAPHICS_DATA',
			data: {
				isFetching: true
			}
		});

		const config = {
			endpoint: 'getpropertydemographics',
			method: 'get',
			dataPayload: {
				'listingid' : payload.params.id
			}
		};

		const response = await PropertyService.fetchData(config);
		try {
			dispatch({
				type: 'RESPONSE_DEMOGRAPHICS_DATA',
				data: Object.assign(response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_DEMOGRAPHICS_DATA',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_ANALYZE_RETURNS_DATA(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_ANALYZE_RETURNS_DATA',
			data: {
				isFetching: true
			}
		});

		const config = {
			endpoint: 'getanalyzereturns',
			method: 'get',
			dataPayload: Object.assign({},payload.query),
			paramsPayload: {
				listingid : payload.params.id
			}
		};

		const response = await PropertyService.fetchData(config);
		try {
			dispatch({
				type: 'RESPONSE_ANALYZE_RETURNS_DATA',
				data: Object.assign(response.data,{isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_ANALYZE_RETURNS_DATA',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_ANALYZE_RETURNS_ZESTIMATE(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_ANALYZE_RETURNS_ZESTIMATE',
			data: {
				isFetching: true
			}
		});

		const config = {
			endpoint: 'getanalyzereturnszestimate',
			method: 'get',
			dataPayload: payload.dataPayload
		};

		const response = await PropertyService.fetchData(config);
		try {
			dispatch({
				type: 'RESPONSE_ANALYZE_RETURNS_ZESTIMATE',
				data: Object.assign(response.data,{isFetching: false, propertyNotFound : !response.data.zillowListingUrl})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_ANALYZE_RETURNS_ZESTIMATE',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

export function REQUEST_SAVE_ANALYZE_RETURNS(payload) {
	return async(dispatch) => {

		dispatch({
			type : 'RESPONSE_SAVE_ANALYZE_RETURNS',
			data : {
				isSaving: true
			}
		});

		const requestConfig = {
			endpoint:'saveanalyzereturns',
			method:'post',
			dataPayload: transformer.transformPathsToObject(payload.dataPayload),
			paramsPayload: payload.paramsPayload
		};
		try {
			const response = await PropertyService.fetchData(requestConfig);
			dispatch({
				type : 'RESPONSE_SAVE_ANALYZE_RETURNS',
				data : Object.assign(response.data,{isSaving: false})
			});

		}catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_SAVE_ANALYZE_RETURNS',
					data : Object.assign(e,{isSaving: false})
				},
				error : e
			}));
		}

	};
}

export function REQUEST_MAKE_AN_OFFER(payload) {
	return async(dispatch) => {
		dispatch({
			type : 'RESPONSE_MAKE_AN_OFFER',
			data : {
				isFetching : true
			}
		});

		const config = {
			endpoint: 'makeanoffer',
			method: 'post',
			dataPayload: payload
		};

		try {
			const response = await PropertyService.fetchData(config);
			dispatch({
				type : 'RESPONSE_MAKE_AN_OFFER',
				data : Object.assign({},response,{ isFetching : false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_MAKE_AN_OFFER',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	}
}

export function REQUEST_SEND_LISTING_CONTACT_EMAIL(payload) {
	return async(dispatch) => {
		dispatch({
			type : 'RESPONSE_LISTING_CONTACT_EMAIL',
			data : {
				status : 'sending'
			}
		});

		const config = {
			endpoint: 'email.contact.post.listingcontact',
			method: 'post',
			dataPayload: payload.dataPayload,
			paramsPayload: payload.paramsPayload
		};

		try {
			const response = await PropertyService.fetchData(config);
			dispatch({
				type : 'RESPONSE_LISTING_CONTACT_EMAIL',
				data : response.data
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action : {
					type : 'RESPONSE_LISTING_CONTACT_EMAIL',
					data : Object.assign(e, {isFetching: false})
				},
				error : e
			}));
		}
	};
}

