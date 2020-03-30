import { createReducers } from './create-reducers';

const DEFAULT_STATE = {
	loadingBar: 0
};

const ProgressLoader = createReducers(DEFAULT_STATE, {
	'SHOW': (state, action) => (
		{
			...state,
			loadingBar: 1
		}
	),

	'HIDE': (state,action) => (
		{
			...state,
			loadingBar: 0
		}
	)

});

export default ProgressLoader;
