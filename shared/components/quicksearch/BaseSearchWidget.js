import React, {Component } from 'react';
import PropTypes from 'prop-types';
import {modal} from 'react-redux-modal';
import cookie from 'react-cookie';
import { find as _find, findIndex as _findIndex, isEmpty as _isEmpty } from 'lodash';
import { buildQueryObject, getPlaceTypeSearchParam, getStateCodeFromGooglePlace, pathToUrl, getSearchPageViewType } from '../../utils/searchUtil';
import { getAddressComponent } from '../../utils/placesAPIUtil';

import { flatOptions} from '../../assets/static/advance-search-options';
const {  DEFAULT_SEARCH_TYPE, FORLEASE, DEFAULT_SEARCH_METRO } = require('../../utils/app-constants').default;
const { areasServed } = require('../../assets/static/metros-served-config').default;


const INVESTCAT_SEARCH_TYPE = {
	"highcashflow" : "for-sale-caprate",
	"highcashoncash" : "for-sale-leveraged",
	"rentalunit": "for-sale-turnkey",
	"valueadded": "for-sale-fixup",
	"motivatedseller": "for-sale-motivated-seller",
	"ownerfinanced": "for-sale-owner-financed"
};

export default class BaseSearchWidget extends Component {

	static propTypes = {
		google: PropTypes.object,
		cityObj: PropTypes.object
	};

	static defaultProps = {
		cityObj: {}

	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	static getSearchOption(options,type) {
		const searchOption = _find(options, { value : type});
		if(searchOption) {
			return searchOption;
		}
		return options[0];
	}

	static getTypeIndex(options,type) {
		const index = _findIndex(options, {value : type});
		if(index >= 0) {
			return index;
		}
		return 0;
	}

	static getSearchType(props) {
		if(props.location.query.investmentcategories && INVESTCAT_SEARCH_TYPE[props.location.query.investmentcategories]) {
			return INVESTCAT_SEARCH_TYPE[props.location.query.investmentcategories];
		}
		return props.searchType || props.params.type || DEFAULT_SEARCH_TYPE;
	}

	static isMapSearchOptionRequired(searchType) {
		return searchType !== FORLEASE;
	}

	static getState(cityObj, params) {
		if(_isEmpty(cityObj)) {
			return params.state || ''
		}
		return cityObj['address_components'] && getAddressComponent(cityObj['address_components'],'administrative_area_level_1', 'long_name').toLocaleLowerCase()
	}

	static getTerms(cityObj, params) {
		if(_isEmpty(cityObj)) {
			return params.term || 'bounds';
		}
		return cityObj['formatted_address'] && String(cityObj['formatted_address']).replace(/,/g,'').replace(/ /g,'-').toLocaleLowerCase()
	}

	static getLocationParam(paramLocation, defaultLocation, cityObj) {
		if(!_isEmpty(cityObj) || !paramLocation) {
			return defaultLocation
		}

		if(paramLocation) {
			return paramLocation;
		}

	}

	constructor(props) {
		super(props);
		this.onPlaceSelect = this.onPlaceSelect.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onToggleAdvanceSearch = this.onToggleAdvanceSearch.bind(this);
		this.onTypeChange = this.onTypeChange.bind(this);
		this.onClickMapSearch = this.onClickMapSearch.bind(this);
		this.placeAutoComplete = null;
		this.state = {
			cityObj:  props.location && props.location.state && props.location.state.criteria || props.cityObj,
			location:'',
			searchType: BaseSearchWidget.getSearchType(props),
			customData: [],
			hideCustom: true,
			stateCode : props.location && props.location.query.statecode,
			metroGeoId : props.location && props.location.query.metrogeoid
		};
		this.searchOptions = flatOptions.filter(option => !option.hidden);
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				customData : props.data,
				hideCustom:false,
				searchType: BaseSearchWidget.getSearchType(props),//this.state.searchType,
				location: props.location,
				stateCode : props.location && props.location.query.statecode,
				metroGeoId : props.location && props.location.query.metrogeoid
			});
		}
	}

	getSearchTerm(type, cityObj, queryString, radius='') {
		const query = !_isEmpty(cityObj) ? `${cityObj.geometry.location.lat()},${cityObj.geometry.location.lng()}` : queryString.q;
		if(type === 'content') {
			return buildQueryObject({
				q : frameworkGlobals.contentQuery,
				datatype : query && query.datatype
			});
		}
		if(query) {
			return {q : query, radius : radius || queryString.radius};
		}
		return '';
	}

	onToggleAdvanceSearch() {
		this.setState({
			openAdvanceSearch : !this.state.openAdvanceSearch
		})
	}

	onClickMapSearch(e,metroConfig) {
		const mapSearchMetro = metroConfig || _find(areasServed,{'name': DEFAULT_SEARCH_METRO});
		const { searchType } = this.state;
		const searchOption = BaseSearchWidget.getSearchOption(this.searchOptions,searchType);
		const query = `${mapSearchMetro.coordinates[1]},${mapSearchMetro.coordinates[0]}`;
		const params = {
			state : mapSearchMetro.stateName,
			metro : mapSearchMetro.flattenAddress,
			id : mapSearchMetro.metroID,
			maptype : searchOption.mapSearchType ? searchOption.mapSearchType : 'cash-purchase'
		};

		this.context.router.push({
			pathname: pathToUrl('/residential-investment-markets/{state}/{metro}/{maptype}/map/{id}', params)
		})
	}

	onSearch(locationBarSearchText, view='') {
		const { searchType,cityObj, radius } = this.state;
		const { location = '', params={} } = this.props;
		const { screenSize } = this.context;
		const option = BaseSearchWidget.getSearchOption(this.searchOptions,searchType);
		const locationParam = BaseSearchWidget.getLocationParam(params.location, option.defaultRoute, cityObj) ;
		let queryValue = this.getSearchTerm(searchType, cityObj, this.props.location.query, radius);
		const term = BaseSearchWidget.getTerms(cityObj, params);
		if( searchType !== 'content' && !locationBarSearchText && term !== 'bounds') {
			this.setState({
				noLocationError : true
			});
			return;
		}


		const routePath = option.route[locationParam];
		const placeTypeSearchParam = getPlaceTypeSearchParam(cityObj);
		queryValue = {...queryValue,...placeTypeSearchParam, statecode : (getStateCodeFromGooglePlace(cityObj) || this.state.stateCode || params.state || '').toLowerCase(), metrogeoid : this.state.metroGeoId || params.metrogeoid || ''};

		if(option.defaultQueryParam) {
			queryValue = {...queryValue,...option.defaultQueryParam, ...getSearchPageViewType(screenSize, view)};
		}

		queryValue = buildQueryObject(queryValue);
		
		const paramsObject = {
			type: option.value,
			state: BaseSearchWidget.getState(cityObj, params),
			term
		};
		
		this.context.router.push({
			pathname : pathToUrl(routePath, paramsObject),
			query : option.locqueryrequired.indexOf(locationParam) > -1 ? queryValue : option.defaultQueryParam ? option.defaultQueryParam : ''
		});
		this.props.closeWidget && this.props.closeWidget();
		this.props.onModalSearchClick && this.props.onModalSearchClick(cityObj.formatted_address || frameworkGlobals.location);
	}

	onPlaceSelect(place,radius, view) {
		// const location = place.geometry.location;
		const { country } = this.context;
		this.setState({
			cityObj : place,
			noLocationError: false,
			radius: radius,
			metroGeoId: ''
		},this.onSearch.bind(this,'placeSelect', view));
	}

	onTypeChange(value) {
		if(value === 'content') {
			frameworkGlobals.location =''
		} else {
			frameworkGlobals.location = cookie.load('locationname') || this.context.location;
		}

		this.setState({
			searchType : value
		});

		//TODO  update with the past search term , if not type placeholder
	}

	addModal() {
		const { l } = this.context.i18n;
		modal.add(SearchWidget, {
			title: l('SEARCH'),
			size: 'custom', // large, medium or small,
			closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideTitleBar: false,// (optional) Switch to true if do not want the default title bar and close button,
			hideCloseButton: false // (optional) if you don't wanna show the top right close button
		});
	}

}

