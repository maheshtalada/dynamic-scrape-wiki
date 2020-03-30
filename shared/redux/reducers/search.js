import { createReducers } from './create-reducers';

const DEFAULT_STATE = {
	property_search_results: {
		aggregations : [] ,
		data : [],
		total:0,
		currentPage:1
	},
	quick_search_check :{}
};

const search = createReducers(DEFAULT_STATE, {
	GET_TOP_REALTORS_PROPERTIES: (state, action) => (
		{
			...state,
			top_ten_realtor_properties: action.data
		}
	),

	RESPONSE_PROPERTY_SEARCH_RESULTS: (state,action) => (
		{
			...state,
			property_search_results:action.data
		}
	),

	RESPONSE_PROFESSION_SEARCH_RESULTS: (state,action) => (
		{
			...state,
			profession_search_results:action.data
		}
	),

	GET_QUICK_SEARCH_CHECK : (state,action) => (
		{
			...state,
			quick_search_check:action.data
		}
	),

	RESPONSE_SAVE_PROPERTY_SEARCH : (state, action) => (
		{
			...state,
			save_property_search : action.data
		}
	),

	RESPONSE_INVESTMENT_RECOMMENDATIONS : (state, action) => (
		{
			...state,
			investment_recommendations : action.data
		}
	)

});

export default search;
