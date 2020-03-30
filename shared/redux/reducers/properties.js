import { createReducers } from './create-reducers';

const DEFAULT_STATE = { near_by_properties: {},properties_listing_data: {} };

const properties = createReducers(DEFAULT_STATE, {

	RESPONSE_PROPERTY_LISTING: (state, action) => (
		{
			...state,
			properties_listing_data : action.data
		}
	),

	RESPONSE_SIMILAR_PROPERTY_LISTINGS: (state, action) => (
		{
			...state,
			similar_listings : action.data
		}
	),

	RESPONSE_ADD_TO_WISHLIST: (state, action) => (
		{
			...state,
			add_to_wishlist : action.data
		}
	),

	RESPONSE_DEMOGRAPHICS_DATA: (state, action) => (
		{
			...state,
			demographics_data : action.data
		}
	),

	RESPONSE_ANALYZE_RETURNS_DATA: (state, action) => (
	{
		...state,
		analyze_returns_data : action.data
	}
	),

	RESPONSE_ANALYZE_RETURNS_ZESTIMATE: (state, action) => (
		{
			...state,
			analyze_returns_zestimate : action.data
		}
	),

	RESPONSE_SAVE_ANALYZE_RETURNS: (state, action) => (
		{
			...state,
			save_analyze_returns : action.data
		}
	),

	RESPONSE_MAKE_AN_OFFER:  (state, action) => (
		{
			...state,
			make_offer_response : action.data
		}
	),

	RESPONSE_PROPERTY_IMAGES: (state, action) => (
		{
			...state,
			property_images : action.data
		}
	),

	RESPONSE_GET_PROPERTY_PDF_TEMPLATE: (state, action) => (
		{
			...state,
			property_pdf_template : action.data
		}
	),

	RESPONSE_ADD_PROPERTY_PDF_TEMPLATE:(state, action) => (
		{
			...state,
			property_add_pdf_template : action.data
		}
	),

	RESPONSE_GET_PROPERTY_PDF:(state, action) => (
		{
			...state,
			property_pdf_data : action.data
		}
	),

	RESPONSE_LISTING_CONTACT_EMAIL:(state, action) => (
		{
			...state,
			listing_contact_email : action.data
		}
	)

});

export default properties;
