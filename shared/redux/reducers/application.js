import { createReducers } from './create-reducers';

const DEFAULT_STATE = { device: null };

const application = createReducers(DEFAULT_STATE, {
	REQUEST_GET_DEVICE : (state, action) => (
		{
			...state,
			device : action.data
		}
	),

	RESPONSE_DATA_FROM_STORE : (state, action) => (
		{
			...state,
			response_data_from_store : action.data
		}
	),

	RESPONSE_OPEN_SITE_FEEDBACK : (state, action) => (
		{
			...state,
			open_site_feedback : action.data
		}
	),

	REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL : (state, action) => (
		{
			...state,
			...action.data
		}
	),

	RESPONSE_CONTACT_ACTIONS : (state, action) => (
		{
			...state,
			contact_details : action.data
		}
	),
	GET_EMAIL_RESPONSE : (state, action) => (
		{
			...state,
			email_sent_response : action.data
		}
	),
	RESPONSE_SHARE_VIA_EMAIL : (state, action) => (
		{
			...state,
			share_via_email_response : action.data
		}
	),
	RESPONSE_MAP_RANGE_LEGENDS : (state, action) => (
		{
			...state,
			map_range_legends_response : action.data
		}
	),
	RESPONSE_LEAD_REALTORS : (state, action) => (
		{
			...state,
			lead_realtors_response : action.data
		}
	),
	UPDATE_ERROR_STATE : (state, action) =>  (
		{
			...state,
			error_state : action.data
		}
	),
	REQUEST_UPDATE_INVESTOR_WIZARD : (state, action) => (
		{
			...state,
			investor_wizard : action.data
		}
	),
	REQUEST_UPDATE_PDF_WIZARD : (state, action) => (
		{
			...state,
			pdf_wizard : action.data
		}
	),
	RESPONSE_POPULAR_LISTINGS : (state, action) => (
		{
			...state,
			popular_listings : action.data
		}
	),
	RESPONSE_FILE_SHARE_VIA_EMAIL : (state, action) => (
		{
			...state,
			response_file_share_email : action.data
		}
	),
	RESPONSE_GET_COMPANIES : (state, action) => (
		{
			...state,
			response_companies : action.data
		}
	),
	RESPONSE_GET_PEOPLE : (state, action) => (
		{
			...state,
			response_people : action.data
		}
	),
	RESPONSE_GET_COMPANY : (state, action) => (
		{
			...state,
			response_company : action.data
		}
	),
	RESPONSE_RUN_GRABBER : (state, action) => (
		{
			...state,
			response_grabber : action.data
		}
	),
	RESPONSE_DATA_TABLE_STATE_CHANGES: (state, action) => (
		{
			...state,
			data_table : action.data
		}
	)

});


export default application;
