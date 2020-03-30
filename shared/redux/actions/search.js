import clientConfig from '../../config';
import SearchService from '../../services/search';
import { extend } from 'lodash';
import { getDateSinceDays } from '../../utils/searchUtil';
import uniqueId from '../../utils/uniqueFormId';
import { REQUEST_UPDATE_ERROR_RESPONSE } from './application';

export function REQUEST_PROPERTY_SEARCH_RESULTS(payload) {
		return async(dispatch) => {
			if(frameworkGlobals.isServer) {
				dispatch({
					type: 'SHOW'
				});
				return;
			}
			const currentPage = Number(payload.query.page) || 1;
			let creationTimeParams = {};
			if(payload.query.creationtime) {
				const range = payload.query.creationtime.split("-");
				creationTimeParams = {
					creationtime : `${Number(range[0]) ? getDateSinceDays(Number(range[0])) : 0}-${Number(range[1]) ? getDateSinceDays((Number(range[1]))) : ''}`
				}
			}

			dispatch({
				type: 'SHOW'
			});

			const urlParams = {
					type:payload.params.type,
					location : payload.params.location,
					term : payload.params.term
				},
				dataPayload = Object.assign({},payload.query,creationTimeParams,{unit:clientConfig.distanceunit});

			const config = {
				endpoint: 'search',
				method:'get',
				dataPayload: dataPayload,
				paramsPayload : urlParams
			};

			try {
				const response = await SearchService.fetchData(config);

				dispatch({
					type: 'HIDE'
				});
				let aggregationsArr = response.data.aggregations || [];
				if(!payload.query.bound) {
					aggregationsArr.push({name:'radius',minimum:1,maximum:5},{name:'features'});
				}

				dispatch({
					type : 'RESPONSE_PROPERTY_SEARCH_RESULTS',
					data : Object.assign(
						{id :uniqueId() },
						{data: response.data.data},
						{aggregations : aggregationsArr},
						{total : response.data.total},
						{totalpage : response.data.totalpage},
						{metaData : response.data.metaData||{}},
						{currentPage: currentPage},
						{mapBounds : response.data.mapbound},
						{isFetching: false},
						{resulttab: response.data.resulttab},
						{searchType: payload.params.type})
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_PROPERTY_SEARCH_RESULTS',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_INVESTMENT_RECOMMENDATIONS(payload) {
		return async(dispatch) => {
			const config = {
				endpoint: 'getinvestmentrecommendations',
				method:'get',
				dataPayload: Object.assign({},{...payload.query})
			};

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_INVESTMENT_RECOMMENDATIONS',
				data : {isFetching: true}
			});

			try {
				const response = await SearchService.fetchData(config);
				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_INVESTMENT_RECOMMENDATIONS',
					data : Object.assign(response.data,{isFetching: false})
				});

			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_INVESTMENT_RECOMMENDATIONS',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function REQUEST_PROFESSION_SEARCH_RESULTS(payload) {
		return async(dispatch,state) => {
			const { profession_search_results } = state().search;
			const currentPage = Number(payload.query.page) || 1;
			// let pages =[];
			let data = {
				isFetching: true
			};
			//if search is happening for the same search type then only data should contain previous state info
			if(profession_search_results && profession_search_results.searchType === payload.params.type) {
				data = Object.assign({...profession_search_results},data);
			}
			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_PROFESSION_SEARCH_RESULTS',
				data
			});

			const urlParams = {
					type:payload.params.type
				},
				dataPayload = Object.assign({},payload.query,{unit:clientConfig.distanceunit});

			const endpoint = urlParams.type === 'content' ? 'contentsearch' : 'professionsearch';
			const config = Object.assign({},SearchService.defaultConfig,{
				endpoint: endpoint,
				method:'get',
				dataPayload: dataPayload,
				paramsPayload : urlParams
			});

			try {
				const response = await SearchService.fetchData(config);
				dispatch({
					type: 'HIDE'
				});
				let aggregationsArr = response.data.aggregations || [];
				if(!payload.query.bound && urlParams.type !== 'content') {
					aggregationsArr.push({name:'radius',minimum:1,maximum:5});
				}
				dispatch({
					type : 'RESPONSE_PROFESSION_SEARCH_RESULTS',
					data : Object.assign(
						{data: response.data.data},
						{aggregations : response.data.aggregations},
						{total : response.data.total},
						{totalpage : response.data.totalpage},
						{currentPage: currentPage},
						{isFetching: false},
						{searchType: payload.params.type})
				});

			}catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_PROFESSION_SEARCH_RESULTS',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}

		};
	}

export function GET_QUICK_SEARCH_CHECK(payload) {
		return async(dispatch,state) => {
			// since axios changing spaces into '+'
			// sending thru url

			const config = {
				endpoint: 'suggestions',
				method:'get',
				dataPayload: payload
			};

			try {
				const response = await SearchService.fetchData(config);
				dispatch({
					type : 'GET_QUICK_SEARCH_CHECK',
					data : response.data
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'GET_QUICK_SEARCH_CHECK',
						data : Object.assign(e, {isFetching: false})
					},
					error : e
				}));
			}
		};
	}

export function SAVE_PROPERTY_SEARCH(payload) {
		return async(dispatch) => {

			dispatch({
				type: 'SHOW'
			});

			dispatch({
				type : 'RESPONSE_SAVE_PROPERTY_SEARCH',
				data : {
					isSaving: true
				}
			});

			const config = {
				endpoint : 'savepropertysearch',
				method: 'post',
				dataPayload: payload
			};

			try {
				const response = await SearchService.fetchData(config);
				dispatch({
					type: 'HIDE'
				});

				dispatch({
					type : 'RESPONSE_SAVE_PROPERTY_SEARCH',
					data : Object.assign(response.data, { isSaving : false})
				});
			} catch (e) {
				dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
					action : {
						type : 'RESPONSE_SAVE_PROPERTY_SEARCH',
						data : Object.assign(e, { isSaving : false, status : 'fail'})
					},
					error : e
				}));
			}
		};
	}

