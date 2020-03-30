import { createReducers } from './create-reducers';

const DEFAULT_STATE = {};

const userprofile = createReducers(DEFAULT_STATE, {

	RESPONSE_USER_LISTING: (state, action) => {
		return {
			...state,
			user_listing: action.data
		};
	},
	RESPONSE_USER_PROPERTIES: (state, action) => {
		return {
			...state,
			user_properties: action.data
		};
	},
	RESPONSE_USER_RETURNS: (state, action) => {
		return {
			...state,
			user_returns: action.data
		}
	},
	RESPONSE_DELETE_SAVED_RETURN: (state, action) => {
		return {
			...state,
			delete_saved_return: action.data
		}
	},
	RESPONSE_USER_COMPANY : (state, action) => {
		return {
			...state,
			user_company: action.data
		};
	},
	RESPONSE_USER_NOTIFICATIONS : (state, action) => {
		return {
			...state,
			user_notifications : action.data
		};
	},
	RESPONSE_REMOVE_USER_LISTING : (state, action) => {
		return {
			...state,
			listing_updated : action.data
		};
	},
	RESPONSE_UPLOAD_PROFILE_IMAGE : (state, action) => {
		return {
			...state,
			profile_image_upload : action.data
		};
	},
	RESPONSE_SAVE_PROFILE_IMAGE : (state, action) => {
		return {
			...state,
			profile_image_save : action.data
		};
	},
	RESPONSE_USER_ARTICLES : (state, action) => {
		return {
			...state,
			user_articles : action.data
		};
	},
	RESPONSE_USER_QUESTIONS : (state, action) => {
		return {
			...state,
			user_questions : action.data
		};
	},
	RESPONSE_USER_PROFILE_CHANGE_PASSWORD : (state, action) => {
		return {
			...state,
			user_change_password : action.data
		};
	},
	RESPONSE_DELETE_USER_PROFILE_PIC : (state, action) => {
		return {
			...state,
			delete_profile_pic : action.data
		};
	},
	RESPONSE_USER_SEARCHES : (state, action) => {
		return {
			...state,
			user_searches : action.data
		};
	},
	RESPONSE_DELETE_SAVED_SEARCH : (state, action) => {
		return {
			...state,
			delete_saved_search : action.data
		};
	},
	RESPONSE_DELETE_USER_LISTING : (state, action) => {
		return {
			...state,
			delete_user_listing : action.data
		};
	},
	RESPONSE_USER_WISHLIST : (state, action) => {
		return {
			...state,
			user_wishlist : action.data
		};
	},
	RESPONSE_DELETE_WISHLIST_ITEM : (state, action) => {
		return {
			...state,
			delete_wishlist_item : action.data
		};
	},
	RESPONSE_ADD_TO_MY_CONTACTS : (state, action) => {
		return {
			...state,
			response_add_to_my_contacts : action.data
		}
	},

	RESPONSE_IMPORT_CONTACTS : (state, action) => {
		return {
			...state,
			response_import_contacts : action.data
		}
	},

	RESPONSE_REMOVE_USER_PROPERTY : (state, action) => {
		return {
			...state,
			remove_property : action.data
		}
	},

	RESPONSE_SAVE_USER_MY_PROPERTIES : (state, action) => (
		{
			...state,
			save_properties : action.data
		}
	),

	RESPONSE_USER_APPLICATIONS : (state, action) => (
		{
			...state,
			user_applications : action.data
		}
	),

	RESPONSE_USER_PAYMENTS : (state, action) => (
		{
			...state,
			user_payments : action.data
		}
	),
});



export default userprofile;
