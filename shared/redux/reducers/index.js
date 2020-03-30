import { combineReducers } from 'redux';
import schema from './schema';
/*import realtor from './realtor';
import properties from './properties';
import search from './search';
import user from './user';
import schema from './schema';
import userprofile from './userprofile';
import documents from './documents';*/
import chat from './chat';
import {reducer as modalReducer} from 'react-redux-modal';
import {responsiveStateReducer} from 'redux-responsive';
import application from './application';
// import { loadingBarReducer } from 'react-redux-loading-bar';
import ProgressLoader from './progress-loader';
/*import articles from './articles';*/

const rootReducer = combineReducers({
	/*realtor,
	properties,
	search,
	user,
	userprofile,
	schema,
	documents,*/
	schema,
	chat,
	modals: modalReducer,
	ProgressLoader,
	application,
	browser: responsiveStateReducer, // responsive state
	//articles
});

export default rootReducer;
