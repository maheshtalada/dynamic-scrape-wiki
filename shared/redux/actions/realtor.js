import RealtorService from '../../services/realtor';
import { REQUEST_UPDATE_ERROR_RESPONSE } from './application';

export function REQUEST_REALTOR_DETAILS(payload) {

	return async (dispatch) => {

		const config = {
			endpoint: 'realtor',
			method: 'get',
			paramsPayload: payload.params
		};

		try {
			const response = await RealtorService.fetchData(config);
			dispatch({
				type: 'RESPONSE_REALTOR_DETAILS',
				data: Object.assign(response.data, { isFetching: false })
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_REALTOR_DETAILS',
					data: Object.assign(e, { isFetching: false })
				},
				error: e
			}));
		}

	};
}

export function REQUEST_PROFESSIONAL_DETAILS(payload) {

	return async (dispatch) => {

		const config = {
			endpoint: 'professional',
			method: 'get',
			paramsPayload: payload.params
		};

		try {
			const response = await RealtorService.fetchData(config);
			dispatch({
				type: 'RESPONSE_PROFESSIONAL_DETAILS',
				data: Object.assign(response.data, { isFetching: false })
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_PROFESSIONAL_DETAILS',
					data: Object.assign(e, { isFetching: false })
				},
				error: e
			}));
		}

	};
}

export function REQUEST_COMPANY_DETAILS(payload) {

	return async (dispatch) => {

		const config = {
			endpoint: 'company',
			method: 'get',
			paramsPayload: payload.params
		};

		try {
			const response = await RealtorService.fetchData(config);
			dispatch({
				type: 'RESPONSE_COMPANY_DETAILS',
				data: Object.assign(response.data, { isFetching: false })
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_COMPANY_DETAILS',
					data: Object.assign(e, { isFetching: false })
				},
				error: e
			}));
		}

	};
}

export function REQUEST_BROKERAGEFIRM_DETAILS(payload) {

		return async(dispatch,getState) => {
			const { realtor } = getState();
			const config = {
				endpoint: 'brokeragefirm',
				method:'get',
				paramsPayload : payload.params,
				dataPayload : payload.dataPayload
			};

		try {
			let response = await RealtorService.fetchData(config);
			if (payload.dataPayload && payload.dataPayload.page > 1) {
				response.data.realtors.data = [...realtor.brokeragefirm.realtors.data, ...response.data.realtors.data]
			}
			dispatch({
				type: 'RESPONSE_BROKERAGEFIRM_DETAILS',
				data: Object.assign(response.data, { isFetching: false })
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_BROKERAGEFIRM_DETAILS',
					data: Object.assign(e, { isFetching: false })
				},
				error: e
			}));
		}

	};
}

export function REQUEST_OWNER_PROPERTY_LISTING(payload) {
	return async (dispatch, getState) => {
		const { realtor } = getState();
		let listingData = '';
		const config = {
			endpoint: 'ownerlistings',
			method: 'get',
			dataPayload: payload.dataPayload,
			paramsPayload: payload.paramsPayload
		};
		try {
			const response = await RealtorService.fetchData(config);
			// always append data into ownerlisting store for loadmore
			if (realtor.owner_listing_data && realtor.owner_listing_data.data.length) {
				listingData = realtor.owner_listing_data.data;
			} else if (realtor.realtor.propertyListings && realtor.realtor.propertyListings.data) {
				listingData = realtor.realtor.propertyListings.data;
			}
			const ownerListings = listingData.concat(response.data.data);
			delete response.data.data;
			dispatch({
				type: 'RESPONSE_OWNER_PROPERTY_LISTING',
				data: Object.assign(response.data, { data: ownerListings }, { isFetching: false })
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_OWNER_PROPERTY_LISTING',
					data: Object.assign(e, { isFetching: false })
				},
				error: e
			}));
		}
	};
}

export function REQUEST_BROKERAGE_FIRM_LISTINGS(payload) {
	return async (dispatch, getState) => {
		const { realtor } = getState();
		let listingData = '';
		const config = {
			endpoint: 'firmlistings',
			method: 'get',
			dataPayload: payload.dataPayload,
			paramsPayload: payload.paramsPayload
		};
		try {
			const response = await RealtorService.fetchData(config);
			// always append data into ownerlisting store for loadmore
			if (realtor.firm_listing_data && realtor.firm_listing_data.data.length) {
				listingData = realtor.firm_listing_data.data;
			} else if (realtor.brokeragefirm.recentListings && realtor.brokeragefirm.recentListings.data) {
				listingData = realtor.brokeragefirm.recentListings.data;
			}
			const recentListings = listingData.concat(response.data.data);
			delete response.data.data;
			dispatch({
				type: 'RESPONSE_BROKERAGE_FIRM_LISTINGS',
				data: Object.assign(response.data, { data: recentListings }, { isFetching: false })
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_BROKERAGE_FIRM_LISTINGS',
					data: Object.assign(e, { isFetching: false })
				},
				error: e
			}));
		}
	};
}


export function REQUEST_BROKERAGE_FIRM_CASH_FLOW_LISTINGS(payload) {
	return async (dispatch, getState) => {
		const { realtor } = getState();
		let listingData = '';
		const config = {
			endpoint: 'firmlistings',
			method: 'get',
			dataPayload: payload.dataPayload,
			paramsPayload: payload.paramsPayload
		};
		try {
			const response = await RealtorService.fetchData(config);
			// always append data into ownerlisting store for loadmore
			if (realtor.firm_cash_flow_listing_data && realtor.firm_cash_flow_listing_data.data.length) {
				listingData = realtor.firm_cash_flow_listing_data.data;
			} else if (realtor.brokeragefirm.cashFlowListings && realtor.brokeragefirm.cashFlowListings.data) {
				listingData = realtor.brokeragefirm.cashFlowListings.data;
			}
			const cashFlowListings = listingData.concat(response.data.data);
			delete response.data.data;
			dispatch({
				type: 'RESPONSE_BROKERAGE_FIRM_CASH_FLOW_LISTINGS',
				data: Object.assign(response.data, { data: cashFlowListings }, { isFetching: false })
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_BROKERAGE_FIRM_CASH_FLOW_LISTINGS',
					data: Object.assign(e, { isFetching: false })
				},
				error: e
			}));
		}
	};
}



