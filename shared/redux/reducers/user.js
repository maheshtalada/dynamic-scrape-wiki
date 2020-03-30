import { createReducers } from './create-reducers';

const DEFAULT_STATE = {
	user:{
		isLogIn : false
	}

};

const user = createReducers(DEFAULT_STATE, {
	RESPONSE_USER_LOGIN : (state, action ) => (
		{
			...state,
			user: action.data
		}
	),

	RESPONSE_USER_LOOKUP : (state, action) => (
		{
			...state,
			user: action.data
		}
	),

	REQUEST_UPDATE_USER_STORE : (state, action) => (
		{
			...state,
			user: action.data
		}
	)
});



export default user;
