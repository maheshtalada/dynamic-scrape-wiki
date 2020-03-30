import { createReducers } from './create-reducers';

const DEFAULT_STATE = {};

const documents = createReducers(DEFAULT_STATE, {

	REQUEST_UPLOAD_PROPERTY_IMAGES: (state, action) => (
		{
			...state,
			media_server_data:action.data
		}
	),

	REQUEST_GET_LISTING_MEDIA: (state, action) => (
		{
			...state,
			listing_media: action.data
		}
	),

	REQUEST_SAVE_PROPERTY_IMAGES: (state, action) => (
		{
			...state,
			save_response_data: action.data
		}
	),

	RESPONSE_ADD_DEFAULT_PROPERTY_IMAGES: (state, action) => (
		{
			...state,
			add_default_image_response_data: action.data
		}
	),

	RESPONSE_DELETE_PROPERTY_IMAGES: (state, action) => (
		{
			...state,
			delete_image_response_data: action.data
		}
	),

	RESPONSE_TENANT_UPLOAD_FILE : (state, action) => (
		{
			...state,
			tenant_upload_file: action.data
		}
	),

	RESPONSE_TENANT_UPLOAD_PHOTO : (state, action) => (
		{
			...state,
			tenant_upload_photo: action.data
		}
	)

});



export default documents;
