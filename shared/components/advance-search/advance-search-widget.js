import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationSearch from '../common/location-search/location-search';
import RangeSelect from '../common/range-select/range-select';
import { search_criteria } from '../../assets/static/advanced-search-criteria.json';
import search_config from '../../assets/static/advanced-search-config';
import MultiSelect from '../common/multi-select/multi-select';
import { find as _find, findIndex as _findIndex } from 'lodash';
import BaseSearch from '../../lib/BaseSearch';
import { getValueByLocale } from '../../utils/localeUtil';
import AdvanceMapSearch from './advance-map-search';
import { buildQueryObject, getRadiusFromMapViewport, getLocalityFromGeolocatedPlace, getRangeSelectOptions } from '../../utils/searchUtil';
import cookie from 'react-cookie';
import { options as search_options_config } from '../../assets/static/advance-search-options';
import Chip from '../common/chip/chip';
import { sprintf } from '../../utils';
import CheckboxList from '../common/checkbox-list/checkbox-list';
import RadioList from '../common/radio-list/radio-list';
import Select from '../common/select/select';
import Input from '../common/input/input';
import SelectBoxes from '../common/select-boxes/select-boxes';
import { MAP_VIEW, LIST_VIEW } from '../../utils/app-constants';


const MAX_PREFERRED_LOCATIONS = 5;
const MIN_RADIUS = 5;
const MAX_RADIUS = 100;
const DEFAULT_RADIUS = 5;
const RADIUS_STEP_VALUE = 10;
const PREFERRED_LOCATION_MODE = 'preferred_locations';
const MAP_DRAW_CIRCLE_MODE = 'map_draw_circle';
const MAP_DRAW_RECT_MODE = 'map_draw_rect';
const CONTENT_BROWSE_ITEMS = [
	{
		"key" : 'newsarticle'
	},
	{
		"key" : 'question'
	}
];
const COOKIE_SAVE_OPTIONS = { path: '/', maxAge: 1080000000, secure : window.__CONFIG__.cookies.isSecure };
const LOCATION_TAB = "location";
const MAP_TAB = "map";
const SEARCH_TABS = [
	{
		"label" : "PREFERREDLOCATIONS",
		"name" : LOCATION_TAB
	},
	{
		"label" : "CHOOSEONMAP",
		"name" : MAP_TAB
	}
];
const SEARCH_TABS_CONFIG = {
	[LOCATION_TAB] : {
		"usageInfo" : "LOCATIONPREFUSAGEINFO",
		"searchView" : LIST_VIEW
	},
	[MAP_TAB] : {
		"usageInfo" : "MAPSEARCHUSAGEINFO",
		"searchView" : MAP_VIEW
	}
};

const SEARCH_MODE_TABS_MAP = {
	[PREFERRED_LOCATION_MODE] : LOCATION_TAB,
	[MAP_DRAW_CIRCLE_MODE] : MAP_TAB,
	[MAP_DRAW_RECT_MODE] : MAP_TAB
};

class AdvanceSearchWidget extends Component {
	constructor(props) {
		super(props);
		// const cookieSearchMode = cookie.load('searchmode');
		// const cookiePreferredLocations = cookie.load('preferredlocations');
		// const cookieRadius = cookie.load('searchradius');
		this.mode = MAP_DRAW_CIRCLE_MODE;
		const locationquery = cookie.load('locationquery');
		const cookieLatLong = locationquery && locationquery.split(',');
		const locationpillname = cookie.load('locationpillname');
		this.state = {
			type : props.searchType,
			selectedCriteria : AdvanceSearchWidget.getSearchCriteriaObject(props),
			preferredLocations : (!props.isHomePage && locationquery) ? [{
				name : locationpillname,
				lat : cookieLatLong[0],
				long : cookieLatLong[1]
			}] : [],
			viewportRadiusValues : [],
			browseContent : 'newsarticle',
			selectedRadius : props.location.query.radius || '',
			tabToShow : MAP_TAB,
			recentCriteriaLoaded : false,
			mapLocation : cookieLatLong ? [cookieLatLong[0],cookieLatLong[1]] : [props.userLocation.lat,props.userLocation.lon]
		};
		this.onMultiSelectChange = this.onMultiSelectChange.bind(this);
		this.handleKeyEvent = this.handleKeyEvent.bind(this);
		this.onPlaceSelected = this.onPlaceSelected.bind(this);
		this.onRemovePlaceSelected = this.onRemovePlaceSelected.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
		this.onMapCircleDraw = this.onMapCircleDraw.bind(this);
		this.onMapRectDraw = this.onMapRectDraw.bind(this);
		this.onRangeSelectChange = this.onRangeSelectChange.bind(this);
		this.onChangeBrowseOption = this.onChangeBrowseOption.bind(this);
		this.onMultiSelectToggleAll = this.onMultiSelectToggleAll.bind(this);
		this.onClearAllClick = this.onClearAllClick.bind(this);
		this.onInputFieldChange = this.onInputFieldChange.bind(this);
		this.handleWindowClickEvent = this.handleWindowClickEvent.bind(this);
		this.onRadiusChange = this.onRadiusChange.bind(this);
		this.onLoadRecentlySearchedCriteria = this.onLoadRecentlySearchedCriteria.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				type : props.searchType,
				selectedCriteria : AdvanceSearchWidget.getSearchCriteriaObject(props),
				mapLocation : [props.userLocation.lat,props.userLocation.lon]
			});

		}
	};

	componentDidMount() {

		window.addEventListener('keyup',this.handleKeyEvent);
		window.addEventListener('click',this.handleWindowClickEvent);
	}

	componentWillUnmount() {
		window.removeEventListener('keyup',this.handleKeyEvent);
		window.removeEventListener('click',this.handleWindowClickEvent);
	}

	static propTypes = {
		userLocation : PropTypes.object
	};

	static defaultProps = {
		userLocation : {}
	};

	static contextTypes = {
		i18n : PropTypes.object,
		router : PropTypes.object,
		country : PropTypes.string,
		visitorCountry : PropTypes.string
	};

	static getUom(country,config) {
		if(config.data && config.data.localeKey) {
			return getValueByLocale(country,config.data.localeKey);
		}
		return (config.data && config.data.uom) || ''
	}

	static getLatLongs(places=[]) {
		if(!places.length) {
			return '';
		}
		return places.map(place => `${place.lat},${place.long}`).join(',');
	}

	static getCookieLatLong(cookieName) {
		const cookieLocation = cookie.load(cookieName);
		return cookieLocation && cookieLocation.split(',');
	}

	static getSearchOptionConfig(configs,type) {
		return _find(configs,{ value : type });
	}

	static getSearchCriteriaObject(props,cookieLoad=false) {
		let criteriaObj = {};
		if(cookieLoad) {
			const cookieSavedCriteria = cookie.load('selectedcriteria');
			criteriaObj = {
				[props.searchType] : Object.assign(BaseSearch.getFacetObject(search_config[props.searchType]),cookieSavedCriteria && cookieSavedCriteria[props.searchType] || {})
			}
		} else {
			criteriaObj = {
				[props.searchType] : BaseSearch.getFacetObject(search_config[props.searchType])
			}
		}
		return criteriaObj;
	}

	static makeRadiusOptions(minRadius,maxRadius,step) {
		let options = [];
		while(minRadius <= maxRadius) {
			options.push({ 'name' : minRadius, 'value' : minRadius });
			minRadius += step;
		}
		return options;
	}

	static checkIfSelectedCriteriaNotEmpty(selectedCriteria) {
		return Object.keys(selectedCriteria).some(key=>selectedCriteria[key] !== '');
	}

	getLocationQuery() {
		const { preferredLocations, selectedRadius } = this.state;
		const { userLocation } = this.props;
		const defaultLatLon = [userLocation.lat,userLocation.lon];
		let query = {};
		switch(this.mode) {
			case PREFERRED_LOCATION_MODE:
				const latLongs = AdvanceSearchWidget.getLatLongs(preferredLocations);
				if(!latLongs) {
					query = '';
					break;
				}
				query = {
					q : latLongs,
					radius : selectedRadius
				};
				cookie.save('searchmode',PREFERRED_LOCATION_MODE,COOKIE_SAVE_OPTIONS);
				cookie.save('preferredlocations',JSON.stringify(preferredLocations),COOKIE_SAVE_OPTIONS);
				break;
			case MAP_DRAW_CIRCLE_MODE:
				const mapLocation = AdvanceSearchWidget.getCookieLatLong('locationquery');
				query = {
					q : mapLocation.join(','),
					radius : cookie.load('mapradius')
				};
				break;
			case MAP_DRAW_RECT_MODE:
				query = {
					bound : cookie.load('mapbounds')
				};
				break;
			default:
				query = '';
		}
		return query;
	}

	handleKeyEvent(evt) {
		if(evt.keyCode === 27) {
			this.props.onClose();
		}
	}

	handleWindowClickEvent(evt) {
		const header = document.getElementById('app-header-content');
		if(header.contains(evt.target) || evt.target.id === 'app-header') {
			this.props.onClose();
		}
	}

	onLoadRecentlySearchedCriteria() {
		const cookieSearchMode = cookie.load('searchmode');
		const cookiePreferredLocations = cookie.load('preferredlocations');
		const cookieRadius = cookie.load('searchradius');
		this.mode = cookieSearchMode;
		this.setState({
			selectedCriteria : AdvanceSearchWidget.getSearchCriteriaObject(this.props,true),
			preferredLocations : cookieSearchMode === PREFERRED_LOCATION_MODE ? (cookiePreferredLocations || []) : [],
			selectedRadius : Number(cookieRadius) || DEFAULT_RADIUS,
			tabToShow : SEARCH_MODE_TABS_MAP[cookieSearchMode] || LOCATION_TAB,
			recentCriteriaLoaded : true,
			mapLocation : AdvanceSearchWidget.getCookieLatLong('maplocation') || this.state.mapLocation
		})
	}
	onRadiusChange(value) {
		this.setState({ selectedRadius : value});
		cookie.save('searchradius',value,COOKIE_SAVE_OPTIONS);
	}

	onSearchClick() {
		const { type, selectedCriteria, tabToShow } = this.state;
		const { optionsConfig } = this.props;
		const currentOption = AdvanceSearchWidget.getSearchOptionConfig(optionsConfig,type);
		const locationQuery = type === 'content' ? {} : this.getLocationQuery();
		if(!locationQuery) {
			this.setState({
				noLocationError: true
			});
			return;
		}
		this.context.router.push({
			pathname : `${currentOption.route}${type}`,
			query : buildQueryObject(Object.assign({},selectedCriteria[type],locationQuery)),
			state : {
				searchView : SEARCH_TABS_CONFIG[tabToShow].searchView
			}
		});
		this.props.onClose();
		cookie.save('selectedcriteria',JSON.stringify(selectedCriteria),COOKIE_SAVE_OPTIONS);
	}

	onClearAllClick() {
		const { type, selectedCriteria } = this.state;
		this.setState({
			selectedCriteria : {
				[type] : BaseSearch.getFacetObject(search_config[type])
			},
			preferredLocations : [],
			viewportRadiusValues : [],
			selectedRadius : DEFAULT_RADIUS
		},() => {
			cookie.save('selectedcriteria',JSON.stringify(selectedCriteria),COOKIE_SAVE_OPTIONS);
			cookie.save('preferredlocations','',COOKIE_SAVE_OPTIONS);
		});
	}

	onChangeBrowseOption(evt) {
		this.setState({
			browseContent : evt.currentTarget.value
		})
	}

	onInputFieldChange(criteriaName,value) {
		const { type } = this.state;
		this.setState({
			selectedCriteria : {
				[type] : Object.assign(this.state.selectedCriteria[type],{
					[criteriaName] : value
				})
			}
		});
	}

	onSelectChange(criteriaName,selectedValue) {
		const { type } = this.state;
		this.setState({
			selectedCriteria : {
				[type] : Object.assign(this.state.selectedCriteria[type],{
					[criteriaName] : selectedValue
				})
			}
		})
	}

	onMultiSelectChange(evt,criteriaName,nestedCriteriaName = undefined,nestedCriteriaValues) {
		const { type } = this.state;
		let selectedData = {
			[criteriaName] : BaseSearch.getModifiedSelectedTypes(evt.target.checked,this.state.selectedCriteria[type][criteriaName] || '',[evt.currentTarget.name])
		};
		if(nestedCriteriaName) {
			selectedData[nestedCriteriaName] = BaseSearch.getModifiedSelectedTypes(evt.target.checked,this.state.selectedCriteria[type][nestedCriteriaName] || '',nestedCriteriaValues || [''])
		}
		this.setState({
			selectedCriteria : {
				[type] : Object.assign(this.state.selectedCriteria[type], selectedData)
			}
		})
	}

	onMultiSelectToggleAll(checked,criteriaName,criteriaValues=[],nestedCriteriaName,nestedCriteriaValues=[]) {
		const { type } = this.state;
		let selectedData = {
			[criteriaName] : BaseSearch.getModifiedSelectedTypes(checked,this.state.selectedCriteria[type][criteriaName] || '',criteriaValues || [''])
		};
		if(nestedCriteriaName) {
			selectedData[nestedCriteriaName] = BaseSearch.getModifiedSelectedTypes(checked,this.state.selectedCriteria[type][nestedCriteriaName] || '',nestedCriteriaValues || ['']);
		}
		this.setState({
			selectedCriteria : {
				[type] : Object.assign(this.state.selectedCriteria[type], selectedData)
			}
		});
	}

	onRangeSelectChange(minValue,maxValue,criteria) {
		const { selectedCriteria, type } = this.state;
		const selectedPriceRange = selectedCriteria[type][criteria.name] && selectedCriteria[type][criteria.name].split('-');
		//minValue = minValue || criteria.minValues[0];
		this.setState({
			selectedCriteria : {
				[type] : Object.assign(this.state.selectedCriteria[type],{
					[criteria.name] : (minValue || maxValue) ? `${minValue}-${maxValue}` : ''
				})
			}
		});
	}

	onRadioListChange(evt,criteriaName) {
		const { type } = this.state;
		this.setState({
			selectedCriteria : {
				[type] : Object.assign(this.state.selectedCriteria[type],{
					[criteriaName] : evt.currentTarget.value
				})
			}
		});
	}

	renderCheckboxList(criteria) {
		const { selectedCriteria, type } = this.state;
		return (
			<div data-automation-selector={search_config[type][criteria.name].label} className="advance-search-widget__search-options__criteria-wrapper__criteria">
				<CheckboxList items={criteria}
							 title={search_config[type][criteria.name].label}
							 onChange={this.onMultiSelectChange}
							  onToggleAll={this.onMultiSelectToggleAll}
							  isShowMoreRequired={false}
							 selectedValues={{[criteria.name] : selectedCriteria[type][criteria.name]}}/>
			</div>
		)
	}

	renderRadioList(criteria) {
		const { selectedCriteria, type } = this.state;
		const { l } = this.context.i18n;
		return (
			<div data-automation-selector={search_config[type][criteria.name].label} className="advance-search-widget__search-options__criteria-wrapper__criteria">
				<RadioList items={criteria.buckets}
						   title={search_config[type][criteria.name].label}
						   isOptionALLRequired={search_config[type][criteria.name].data && search_config[type][criteria.name].data.isAllOptionRequired}
						   labelAppendValue={search_config[type][criteria.name].data && search_config[type][criteria.name].data.labelAppendValue}
						   onChange={(evt)=>{this.onRadioListChange(evt,criteria.name)}}
						   selectedVal={selectedCriteria[type][criteria.name]}
						   l={l}/>
			</div>
		)
	}

	renderRangeSelect(criteria) {
		const { country } = this.context;
		const { selectedCriteria, type } = this.state;
		const priceValues = selectedCriteria[type][criteria.name].split("-");
		const uom = search_config[type][criteria.name].dataHandler && AdvanceSearchWidget[search_config[type][criteria.name].dataHandler](country,search_config[type][criteria.name]);
		const rangeSelectData = search_config[type][criteria.name].data || {};
		const min = rangeSelectData.min;
		const max = rangeSelectData.max;
		const rangeOptions = getRangeSelectOptions(min,max,rangeSelectData.stepSize,rangeSelectData.stepsCount,priceValues[0],priceValues[1]);
		return (
			<div data-automation-selector={search_config[type][criteria.name].label} className="advance-search-widget__search-options__criteria-wrapper__criteria">
				<RangeSelect minValues={rangeOptions.minValues}
							 maxValues={rangeOptions.maxValues}
							 selectedMinValue={priceValues[0]}
							 selectedMaxValue={priceValues[1]}
							 valueFormatter = {rangeSelectData.valueFormatter}
							 onChange={(minValue,maxValue)=>this.onRangeSelectChange(minValue,maxValue,criteria)}
							 uom={uom}
							 tooltipInfo={search_config[type][criteria.name].data && search_config[type][criteria.name].data.tooltipInfo}
							 title={search_config[type][criteria.name].label}
							 labelIcon={search_config[type][criteria.name].labelIcon}/>
			</div>
		)
	}

	renderMultiSelect(criteria) {
		const { selectedCriteria, type } = this.state;
		return (
			<div data-automation-selector={search_config[type][criteria.name].label} className="advance-search-widget__search-options__criteria-wrapper__criteria">
				<MultiSelect items={criteria}
							 label={search_config[type][criteria.name].label}
							 onChange={this.onMultiSelectChange}
							 selectedValues={{[criteria.name] : selectedCriteria[type][criteria.name] || search_config[type][criteria.name].defaultValue || ''}}
							 isShowMoreRequired={false}
							 disable={search_config[type][criteria.name].disable}
							 tooltipInfo={search_config[type][criteria.name].data && search_config[type][criteria.name].data.tooltipInfo}
							 labelIcon={search_config[type][criteria.name].labelIcon}
							 onToggleAll={this.onMultiSelectToggleAll}/>
			</div>
		)
	}

	renderNestedMultiSelect(criteria) {
		const { selectedCriteria, type } = this.state;
		let selectedValues = {};
		selectedValues[criteria.name] =  selectedCriteria[type][criteria.name] || '';
		search_config[type][criteria.name].data.children.map(childKey => selectedValues[childKey] = selectedCriteria[type][childKey]||'');
		return (
			<div data-automation-selector={search_config[type][criteria.name].label} className="advance-search-widget__search-options__criteria-wrapper__criteria">
				<MultiSelect items={criteria}
							 label={search_config[type][criteria.name].label}
							 selectedValues={selectedValues}
							 onChange={this.onMultiSelectChange}
							 isShowMoreRequired={false}
							 tooltipInfo={search_config[type][criteria.name].data && search_config[type][criteria.name].data.tooltipInfo}
							 onToggleAll={this.onMultiSelectToggleAll}/>
			</div>
		)
	}

	renderSelectBoxes(criteria) {
		const { selectedCriteria, type } = this.state;
		const { l } = this.context.i18n;
		return (
			<div data-automation-selector={search_config[type][criteria.name].label} className="advance-search-widget__search-options__criteria-wrapper__criteria">
				<div className="select-boxes__label">
					{search_config[type][criteria.name].labelIcon && <i className={`pe-7s-${search_config[type][criteria.name].labelIcon}`}/>}
					{l(search_config[type][criteria.name].label)}
				</div>
				<SelectBoxes
					key={`${search_config[type][criteria.name].filterKey}${Math.random()}`}
					min={search_config[type][criteria.name].data.min}
					max={search_config[type][criteria.name].data.max}
					maxBoxes = {6}
					selectedBoxes = {selectedCriteria[type][criteria.name]}
					l={l}
					name = {search_config[type][criteria.name].label}
					onChange={(value)=>{this.onInputFieldChange(criteria.name,value)}}/>
			</div>
		)
	}

	renderInputField(criteria) {
		const { selectedCriteria, type } = this.state;
		return (
			<div data-automation-selector={search_config[type][criteria.name].label} className="advance-search-widget__search-options__criteria-wrapper__criteria">
				<Input label={search_config[type][criteria.name].label}
					   icon={search_config[type][criteria.name].labelIcon}
					   placeholder={search_config[type][criteria.name].placeholder}
					   onChange={(value)=>{this.onInputFieldChange(criteria.name,value)}}
					   value={selectedCriteria[type][criteria.name]}/>
			</div>
		)
	}

	renderSelect(criteria) {
		const { selectedCriteria, type } = this.state;
		const selectedOptionIndex = _findIndex(criteria.options,{ value : selectedCriteria[type][criteria.name]});
		const { l } = this.context.i18n;
		return (
			<div data-automation-selector={search_config[type][criteria.name].label} className="advance-search-widget__search-options__criteria-wrapper__criteria select-dropdown">
				<div className="select-dropdown__label">
					{search_config[type][criteria.name].labelIcon && <i className={`pe-7s-${search_config[type][criteria.name].labelIcon}`}/>}
					{l(search_config[type][criteria.name].label)}
				</div>
				<Select
					btnClassName={'btn btn-default'}
					options={criteria.options}
					selected={selectedOptionIndex >= 0 ? selectedOptionIndex : 0}
					inputClasses="no-border"
					onChange={(value)=>{this.onSelectChange(criteria.name,value)}}
				/>
			</div>
		)
	}

	onPlaceSelected(place) {
		const { preferredLocations, viewportRadiusValues } = this.state;
		this.mode = PREFERRED_LOCATION_MODE;
		const { country } = this.context;
		if(!place.name) {
			place.name = getLocalityFromGeolocatedPlace(place);
		}
		const location = {
			name : place.name,
			lat : place.geometry.location.lat(),
			long : place.geometry.location.lng()
		};
		const viewportRadius = getRadiusFromMapViewport(place.geometry.viewport,getValueByLocale(country,'earthRadius'));
		this.setState({
			preferredLocations : [...preferredLocations,location],
			viewportRadiusValues : [...viewportRadiusValues,viewportRadius],
			selectedRadius : Math.max(...viewportRadiusValues,viewportRadius),
			noLocationError : false
		});
	}

	onRemovePlaceSelected(index) {
		const { preferredLocations, viewportRadiusValues } = this.state;
		const modifiedViewportRadiusValues = [...viewportRadiusValues.slice(0,index),...viewportRadiusValues.slice(index+1)];
		this.setState({
			preferredLocations : [...preferredLocations.slice(0,index),...preferredLocations.slice(index+1)],
			viewportRadiusValues : modifiedViewportRadiusValues,
			selectedRadius : modifiedViewportRadiusValues.length ? Math.max(...modifiedViewportRadiusValues) : DEFAULT_RADIUS
		},()=>{
			if(!preferredLocations.length) {
				this.mode = '';
			}
		});
	}

	onMapCircleDraw(radius,lat,long,viewport) {
		const { country } = this.context;
		this.mode = MAP_DRAW_CIRCLE_MODE;
		radius = radius ? `${Math.ceil(radius/1000)}` : getRadiusFromMapViewport(viewport,getValueByLocale(country,'earthRadius'));
		this.mapCircle = {
			radius : radius,
			lat : lat,
			long : long
		};
		cookie.save('searchmode',MAP_DRAW_CIRCLE_MODE,COOKIE_SAVE_OPTIONS);
		cookie.save('locationquery',`${lat},${long}`,COOKIE_SAVE_OPTIONS);
		cookie.save('mapradius',radius,COOKIE_SAVE_OPTIONS);
	}

	onMapRectDraw(rectangle) {
		this.mode = MAP_DRAW_RECT_MODE;
		const bounds = `${rectangle.bounds.f.f},${rectangle.bounds.b.f},${rectangle.bounds.f.b},${rectangle.bounds.b.b}`;
		this.mapRectangle = {
			bounds : bounds
		};
		cookie.save('searchmode',MAP_DRAW_RECT_MODE,COOKIE_SAVE_OPTIONS);
		cookie.save('mapbounds',bounds,COOKIE_SAVE_OPTIONS);
	}

	renderCriteriaComponents(criteria,searchOptionConfig) {
		const { l } = this.context.i18n;
		const { type, selectedCriteria, recentCriteriaLoaded } = this.state;
		const cookieSearchMode = cookie.load('searchmode');
		return (
			<div id="search-criteria-wrapper" className="advance-search-widget__search-options__criteria-wrapper">
				{/* type === 'content' &&
					<div className="advance-search-widget__search-options__map-wrapper__location content-search">
						<p className="preferred-location-search__title">{l(searchOptionConfig.searchInputLabel)}</p>
						{this.renderSearchBar(searchOptionConfig)}
					</div>
				*/}
				{criteria.map(criteria => {
					return (<div className="advance-search-widget__search-options__criteria-wrapper__group">
						{criteria.map(groupedCriteria => {
							return search_config[type][groupedCriteria.name] &&
								typeof this[`render${search_config[type][groupedCriteria.name].component}`] === 'function' &&
								this[`render${search_config[type][groupedCriteria.name].component}`](groupedCriteria)
						})}
						{type === 'content' && this.renderCTAButtons("advance-search-widget__search-options__criteria-wrapper__criteria")}
					</div>)
				})}
				{/*!recentCriteriaLoaded && cookieSearchMode && <button onClick={this.onLoadRecentlySearchedCriteria} className="btn btn-primary">{l('LOADRECENTSEARCHCRITERIA')}</button>*/}
			</div>
		)
	}

	renderCTAButtons(wrapperClass) {
		const { selectedCriteria, type } = this.state;
		const { l } = this.context.i18n;
		return (
			<div className={wrapperClass}>
				<button className="btn btn-primary search-btn" onClick={this.onSearchClick}>{l('SEARCH')}</button>
				{AdvanceSearchWidget.checkIfSelectedCriteriaNotEmpty(selectedCriteria[type]) && <button className="btn btn-default clear-btn" onClick={this.onClearAllClick}>{l('CLEARALL')}</button>}
			</div>
		)
	}

	onTabChange(tabName) {
		this.setState({
			tabToShow: tabName
		})
	}

	renderSearchTabs() {
		const { l } = this.context.i18n;
		const { tabToShow } = this.state;
		return (
			<ul className="advance-search-widget__search-options__map-wrapper__search-tabs-wrap">
				{
					SEARCH_TABS.map((config) => {
						return (
							<li className={`advance-search-widget__search-options__map-wrapper__search-tabs-wrap__tab ${tabToShow === config.name ? 'selected': ''}`}>
								<button onClick={el=>this.onTabChange(config.name)}>{l(config.label)}</button>
							</li>
						)
					})
				}
			</ul>
		);
	}

	renderSearchBar(searchOptionConfig) {
		const { type, noLocationError } = this.state;
		const { screenSize } = this.props;
		const { l } = this.context.i18n;
		const searchQuery = cookie.load('locationname');
		return (
			<LocationSearch
				searchType={type}
				placeHolder={`${l(searchOptionConfig.searchboxplaceholder)}`}
				onPlaceSelect = {this.onPlaceSelected}
				onSearch = {this.onSearch}
				screenSize = {screenSize}
				urlSearchTerm = ""
				multipleLocations={true}
				noLocationError = {noLocationError}
			/>
		)
	}


	renderLocationSearch(searchOptionConfig) {
		const { preferredLocations, selectedRadius, tabToShow } = this.state;
		const { l } = this.context.i18n;
		const { country } = this.context;
		const radiusOptions = AdvanceSearchWidget.makeRadiusOptions(MIN_RADIUS,MAX_RADIUS,RADIUS_STEP_VALUE);
		const selectedIndex = _findIndex(radiusOptions,{ value : selectedRadius });
		const radiusUom = getValueByLocale(country,"searchRadiusUnits");
		return (
			<div className="preferred-location-search">
				<div className="preferred-location-search__search-bar">
					<div className="preferred-location-search__title">{sprintf(l(searchOptionConfig.searchInputLabel),MAX_PREFERRED_LOCATIONS)}</div>
					<div className="preferred-location-search__search-bar__search-wrap">
						{this.renderSearchBar(searchOptionConfig)}
						<Select
							btnClassName={'btn btn-default search-radius'}
							options={radiusOptions}
							selected={ selectedIndex >= 0 ? selectedIndex :  false}
							displayValue={selectedRadius || `${l('DISTANCE')} (${radiusUom})`}
							inputClasses="no-border"
							onChange={this.onRadiusChange}
						/>
						<button className="btn btn-primary choose-on-map" onClick={()=>{this.onTabChange(MAP_TAB)}}><i className="pe-7s-choose-on-map"/>{l('CHOOSEONMAP')}</button>
					</div>

					{/*<div className="preferred-location-search__search-bar__radius-wrap">
						<div className="preferred-location-search__title">{l('DISTANCE')} {`(${radiusUom})`}</div>

					</div>*/}
				</div>
				<div className="preferred-location-search__selected-locations">
					{ preferredLocations.length > 0 &&
					preferredLocations.map((location,index) => <Chip onClose={()=>{this.onRemovePlaceSelected(index)}}>{location.name}</Chip>)
					}
				</div>
			</div>
		)
	}

	render() {
		const { type, browseContent, tabToShow, mapLocation, selectedCriteria } = this.state;
		const { userLocation } = this.props;
		const { l } = this.context.i18n;
		const defaultMapLocation = mapLocation;
		const searchOptionConfig = AdvanceSearchWidget.getSearchOptionConfig(search_options_config,type);
		const searchCriteria = search_criteria[type].map((criteriaGroup) => criteriaGroup.filter(criteria => !criteria.hidden));
		return (
			<div className="advance-search-widget">
				{/*<h1 className="advance-search-widget__header">{l(searchOptionConfig.headerLabel)}</h1>*/}
				<button className="advance-search-widget__close" onClick={this.props.onClose}><i className="pe-7s-close-2"/></button>
				<div className="advance-search-widget__search-options">
					{ searchOptionConfig.isMapRequired &&
						<div className="advance-search-widget__search-options__map-area">
							{/*{this.renderSearchTabs()}*/}
							{ tabToShow === LOCATION_TAB &&
								<div className="advance-search-widget__search-options__map-wrapper__location">
									{this.renderLocationSearch(searchOptionConfig)}
								</div>
							}
							{tabToShow === MAP_TAB && <div className="advance-search-widget__search-options__map-wrapper">
								<div className="advance-search-widget__search-options__map-wrapper__map-use-info">{l(SEARCH_TABS_CONFIG[tabToShow].usageInfo)}</div>
								<AdvanceMapSearch onCircleDraw={this.onMapCircleDraw}
												  onClickPreferredLocations={()=>{this.onTabChange(LOCATION_TAB)}}
												  onRectangleDraw={this.onMapRectDraw}
												  renderCTAButtons={()=>{return this.renderCTAButtons("advance-search-widget__search-options__criteria-wrapper__search-btn-wrap")}}
												  renderCriteria={()=>{return this.renderCriteriaComponents(searchCriteria,searchOptionConfig)}}
												  lat={Number(defaultMapLocation[0])}
												  lon={Number(defaultMapLocation[1])}/>
							</div>}
						</div>
					}
					{tabToShow === LOCATION_TAB && this.renderCriteriaComponents(searchCriteria,searchOptionConfig)}
					{ type !== 'content' && tabToShow === LOCATION_TAB && this.renderCTAButtons("advance-search-widget__search-options__criteria-wrapper__search-btn-wrap")}
				</div>
			</div>
		)
	}
}


export default AdvanceSearchWidget;
