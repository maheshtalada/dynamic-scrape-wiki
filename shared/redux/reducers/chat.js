import { createReducers } from './create-reducers';
const { CHAT_MESSAGE_TYPES : messageTypes }  =  require('../../utils/app-constants').default;

const DEFAULT_STATE = {};

const chat = createReducers(DEFAULT_STATE, {
	[messageTypes.userRequested] : (state, action ) => (
		{
			...state,
			...action.data
		}
	),
	[messageTypes.recivesocketId] : (state, action ) => (
		{
			...state,
			...action.data
		}
	),
	[messageTypes.scrapeLog] : (state, action ) => (
		{
			...state,
			...action.data
		}
	)
});

export default chat;
