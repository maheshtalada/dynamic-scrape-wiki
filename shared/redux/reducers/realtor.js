import { createReducers } from './create-reducers';

const DEFAULT_STATE = { top_ten_realtor: {},realtor: {} };

const realtor = createReducers(DEFAULT_STATE, {

	GET_TOP_TEN_REALTORS: (state, action) => (
		{
			...state,
			top_ten_realtor : action.data
		}
	),
	RESPONSE_REALTOR_DETAILS: (state, action) => (
		{
			...state,
			realtor : action.data
		}
	),
	RESPONSE_PROFESSIONAL_DETAILS: (state, action) => (
		{
			...state,
			professional : action.data
		}
	),
	RESPONSE_COMPANY_DETAILS: (state, action) => (
		{
			...state,
			company : action.data
		}
	),
	RESPONSE_BROKERAGEFIRM_DETAILS: (state, action) => (
		{
			...state,
			brokeragefirm : action.data
		}
	),
	RESPONSE_OWNER_PROPERTY_LISTING : (state, action) => (
		{
			...state,
			owner_listing_data : action.data
		}
	),
	RESPONSE_BROKERAGE_FIRM_LISTINGS : (state, action) => (
		{
			...state,
			firm_listing_data : action.data
		}
	),
	RESPONSE_BROKERAGE_FIRM_CASH_FLOW_LISTINGS : (state, action) => (
		{
			...state,
			firm_cash_flow_listing_data : action.data
		}
	)

});



export default realtor;
