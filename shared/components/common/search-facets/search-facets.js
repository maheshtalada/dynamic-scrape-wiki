import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { find, findIndex, cloneDeep, has, sortBy, values } from 'lodash';
import Checkbox from 'components/common/checkbox/checkbox';
import CheckboxList from '../checkbox-list/checkbox-list';
import RadioList from '../radio-list/radio-list';
import uniqueId from '../../../utils/uniqueFormId';
import { getFacetRanges, getSliderValue, getPartialSearchAttribute,
	sortFacetsByOrder, getSelectedOptionIndex, washroomFacetOptionFormat, getRangeSelectOptions, numberOfDaysOptionsFormat, capRateFacetOptionFormat } from '../../../utils/searchUtil';
import { RangeSlider } from '../range-slider';
import { getValueByLocale } from '../../../utils/localeUtil';
import SearchByName from '../search-by-name/search-by-name';
import { Scrollbars } from 'react-custom-scrollbars';
import Switch from '../switch/switch';
import MultiSelect from '../multi-select/multi-select';
import Select from '../select/select';
import RangeSelect from '../range-select/range-select';
import SelectBoxes from '../select-boxes/select-boxes';
import SingleSelectBoxes from '../single-select-boxes';
import SliderScale from '../slider-scale/slider-scale';
import ModifyGuidedSearch from '../../modify-guided-search-criteria';
import APPCONSTANTS from '../../../utils/app-constants';


const { REALTOR_SEARCH_TYPE } = APPCONSTANTS;
export default class SearchFacets extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country : PropTypes.string
	};

	/* add all other handlers down here */
	static formatHandlers = {
		keyCountOptions(buckets, l){
			return buckets.map(item => ({ name : `${l(item.key.toUpperCase())} (${item.count})` , value : item.key}))
		}

	};

	constructor(props) {
		super(props);
		this.onFacetChange = this.onFacetChange.bind(this);
		this.cashPurchaseCheck = this.cashPurchaseCheck.bind(this);
		this.leveragedPurchaseCheck = this.leveragedPurchaseCheck.bind(this);
		this.onClearAll = this.onClearAll.bind(this);
	}

	static isPurchaseTypeRouteRequired(propertyTagTabs,facets) {
		const tabs = propertyTagTabs || {};
		const firstTab = tabs.buckets && tabs.buckets[0].key;
		const tagFacet = facets["investmentcategories"];
		const caprateFacet = facets["caprate"];
		const cashoncashFacet = facets["cashoncashreturn"];
		if(caprateFacet || cashoncashFacet || tagFacet === "highcashflow" || tagFacet === "highcashoncash" || (tagFacet === "" && (firstTab === "highcashflow" || firstTab === "highcashoncash"))) {
			return true;
		}
	}

	onPurchaseTypeChange(value) {
		const { propertyTagTabs, facets, onUpdateState } = this.props;
		const tagFacet = facets["investmentcategories"];
		if(SearchFacets.isPurchaseTypeRouteRequired(propertyTagTabs,facets)) {
			onUpdateState('purchaseType',value,() => {
				this.onFacetChange('SearchPurchaseType',{
					"investmentcategories": (tagFacet === "highcashflow" || tagFacet === "highcashoncash") ? (value === "cash" ? "highcashflow": "highcashoncash") : tagFacet,
					"caprate": "",
					"cashoncashreturn": ""
				});
			});
		} else {
			onUpdateState('purchaseType',value);
		}
	}

	cashPurchaseCheck() {
		const { purchaseType } = this.props;
		if(purchaseType !== 'leveraged') {
			return true;
		}
		return false;
	}

	leveragedPurchaseCheck() {
		const { purchaseType } = this.props;
		if(purchaseType === 'leveraged') {
			return true;
		}
		return false;
	}

	onFacetChange(type, facet, value,isChecked,clear,siblings,nestedFacet,nestedValues) {
		this.props.onFacetChange(type, facet, value, isChecked,clear,siblings,nestedFacet,nestedValues);
	}

	onClearAll() {
		this.props.clearAllFilters();
	}

	isFacetExist(componentConfig,data) {
		if(componentConfig.isStaticComponent) {
			return true;
		}
		this.lastIndex = findIndex(data, { 'name' : componentConfig.filterKey});
		return this.lastIndex > -1;
	}

	daysOnMarketOptionsFormat(values,l,min,max) {
		return numberOfDaysOptionsFormat(values,l,min,max);
	}

	capRateFacetOptions(values,l,min,max) {
		return capRateFacetOptionFormat(values,min,max);
	}

	washroomFacetOptions(values,l,min,max) {
		return washroomFacetOptionFormat(values,min,max);
	}

	booleanOptionsFormat(values,l,min,max,buckets,filterName) {
		const trueOption = find(buckets,{ 'key' : 'true'}),
			falseOption = find(buckets, { 'key' : 'false'});
		return [
			{ 
				"name" : l('YES'),
				"value" : 'true',
				"key" : `${filterName}-true`,
				"isDisabled" : trueOption ? false : true
			},
			{ 
				"name" : l('NO'),
				"value" : 'false',
				"key" : `${filterName}-false`,
				"isDisabled" : falseOption ? false : true
			}
		]
	}

	renderRangeSlider(filterConfigData, country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const rangeSliderData = filterConfigData.data || {};
		const sliderStep = rangeSliderData.step || Number((aggregations[this.lastIndex].maximum-aggregations[this.lastIndex].minimum)/10);
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<RangeSlider key={`${filterConfigData.filterKey}${uniqueId()}`}
						 title={filterConfigData.label}
						 min={aggregations[this.lastIndex].minimum}
						 max={aggregations[this.lastIndex].maximum}
						 className="slider-wrapper"
						 range
						 step={sliderStep}
						 onAfterChange={(value)=>{
							 this.onFacetChange('RangeSlider',filterConfigData.filterKey, value.join('-'));
						 }}
						 defaultValue={getFacetRanges(facets[filterConfigData.filterKey],aggregations[this.lastIndex].minimum, aggregations[this.lastIndex].maximum)}
						 uom = {getValueByLocale(country,rangeSliderData.localeKey)}
						 type={rangeSliderData.type}/>
			</div>

		);
	}

	renderSelectBoxes(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const { l } = this.context.i18n;
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<div>
				<div className="title">{l(filterConfigData.label)}</div>
				<SelectBoxes
					key={`${filterConfigData.filterKey}${uniqueId()}`}
					min={aggregations[this.lastIndex].minimum}
					max={aggregations[this.lastIndex].maximum}
					maxBoxes = {filterConfigData.max}
					selectedBoxes = {facets[filterConfigData.filterKey]}
					l={l}
					analyticsData={filterConfigData.analyticsData}
					name = {filterConfigData.label}
					onChange={(value)=>{this.onFacetChange('SelectBoxes',filterConfigData.filterKey,value)}}/>
			</div>
			</div>
		)
	}

	renderSingleSelectBoxes(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const { l } = this.context.i18n;
		const options = this[filterConfigData.optionFormatter](filterConfigData.optionValues,l,aggregations[this.lastIndex].minimum,aggregations[this.lastIndex].maximum,aggregations[this.lastIndex].buckets,aggregations[this.lastIndex].name);
		const isToRender = typeof this[filterConfigData.conditionalRenderHandler] === 'function' ? this[filterConfigData.conditionalRenderHandler]() : true;
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
				{isToRender && <SingleSelectBoxes
					title={l(filterConfigData.label)}
					key={`${filterConfigData.filterKey}${uniqueId()}`}
					conditionalRenderHandler={filterConfigData.conditionalRenderHandler}
					boxOptions={options}
					selectedBox = {facets[filterConfigData.filterKey]}
					l={l}
					analyticsData={filterConfigData.analyticsData}
					onChange={(value)=>{this.onFacetChange('SelectBoxes',filterConfigData.filterKey,value)}}/>}
			</div>
		)
	}

	renderSearchPurchaseType(filterConfigData,country,filerColClasses) {
		const { aggregations, facets, location, purchaseType } = this.props;
		const { l } = this.context.i18n;
		const options = filterConfigData.options;
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
				<SingleSelectBoxes
					className="search-purchase-type-options"
					title={l(filterConfigData.label)}
					key={`${filterConfigData.filterKey}${uniqueId()}`}
					boxOptions={options}
					selectedBox = {purchaseType || 'cash'}
					l={l}
					isAnyRequired={filterConfigData.isAnyRequired}
					analyticsData={filterConfigData.analyticsData}
					onChange={(value)=>{
						this.onFacetChange('SearchPurchaseType',filterConfigData.filterKey, value);
					}}/>
			</div>
		)
	}

	renderModifyGuidedSearch(filterConfigData,country,filerColClasses) {
		const { l } = this.context.i18n;
		const { location } = this.props;
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes,"modify-guided-search")}>
				<ModifyGuidedSearch
					location={location}
					analyticsData={filterConfigData.analyticsData}
					key={`${filterConfigData.filterKey}${uniqueId()}`}
					/>
			</div>
		)
	}

	renderSlider(filterConfigData, country,filerColClasses) {
		const { facets } = this.props;
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<RangeSlider key={`${filterConfigData.filterKey}${uniqueId()}`}
						 title={filterConfigData.label}
						 min={filterConfigData.data.min}
						 max={filterConfigData.data.max}
						 step={filterConfigData.data.step}
						 defaultValue={getSliderValue(facets[filterConfigData.filterKey],filterConfigData.data.default)}
						 className="slider-wrapper"
						 uom={getValueByLocale(country,filterConfigData.data.uom)}
						 onAfterChange={(value)=>{
							 this.onFacetChange('Slider', filterConfigData.filterKey, value);
						 }}/>
			</div>
		);
	}

	renderSliderScale(filterConfigData, country,filerColClasses) {
		const { l } = this.context.i18n;
		const { facets } = this.props;
		const uom = getValueByLocale(country,filterConfigData.data.uom);
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<div>
				<div className="multi-select__label">{`${l(filterConfigData.label)} (${l(uom)})`}</div>
				<SliderScale key={`${filterConfigData.filterKey}${uniqueId()}`}
							 title={filterConfigData.label}
							 min={filterConfigData.data.min}
							 max={filterConfigData.data.max}
							 steps={filterConfigData.data.step}
							 minThreshold={filterConfigData.data.minthreshold}
							 maxLabelPostfix = "+"
							 defaultValue={getSliderValue(facets[filterConfigData.filterKey],filterConfigData.data.default)}
							 className="slider-wrapper"
							 uom={uom}
							 analyticsData={filterConfigData.analyticsData}
							 onChange={(value)=>{
								 this.onFacetChange('Slider', filterConfigData.filterKey, value);
							 }}/>
			</div>
			</div>
		);
	}

	renderNestedCheckboxList(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const { l } = this.context.i18n;
		let selectedValues = {};
		selectedValues[filterConfigData.filterKey] = facets[filterConfigData.filterKey] || '';
		filterConfigData.data.children.map(childKey => selectedValues[childKey] = facets[childKey] || '');

		return(
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<CheckboxList key={`${filterConfigData.filterKey}${uniqueId()}`}
						  facet={filterConfigData.filterKey}
						  title={filterConfigData.label}
						  className="checkbox-list"
						  items={aggregations[this.lastIndex]}
						  selectedValues={selectedValues}
						  onChange={(evt,facet,nestedFacet,nestedValues) => {
							  this.onFacetChange('NestedCheckboxList',facet,evt.currentTarget.name,evt.target.checked,'','',nestedFacet,nestedValues);
						  }}
						  onToggleAll={(checked,facet,facetValues,nestedFacet,nestedFacetValues)=>{
							  this.onFacetChange('NestedCheckboxList',facet,facetValues,checked,'',nestedFacet,nestedFacetValues);
						  }}
						  l={l}/>
			</div>
		);

	}

	renderCheckboxList(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const { l } = this.context.i18n;
		return(
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<Scrollbars className="scrollbars" autoHeight={true} autoHeightMax={400}>
				<CheckboxList key={`${filterConfigData.filterKey}${uniqueId()}`}
							  facet={filterConfigData.filterKey}
							  title={filterConfigData.label}
							  itemCountToShow={filterConfigData.itemCountToShow}
							  className="checkbox-list"
							  items={aggregations[this.lastIndex]}
							  isTranslationRequired={filterConfigData.isTranslationRequired}
							  selectedValues={{[filterConfigData.filterKey] : facets[filterConfigData.filterKey] || ''}}
							  onChange={(evt,facet,nestedFacet,nestedValues) => {
								  this.onFacetChange('CheckboxList',filterConfigData.filterKey,evt.currentTarget.name,evt.target.checked,'');
							  }}
							  onToggleAll={(checked,facet,facetValues,nestedFacet,nestedFacetValues)=>{
								  this.onFacetChange('CheckboxList',facet,facetValues,checked,'',nestedFacet,nestedFacetValues);
							  }}
							  l={l}/>
			</Scrollbars>
			</div>
		);

	}

	renderMultiSelect(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<MultiSelect key={`${filterConfigData.filterKey}${uniqueId()}`}
						 items={aggregations[this.lastIndex]}
						 label={filterConfigData.label}
						 onChange={(evt,facet) => {
							 this.onFacetChange('CheckboxList',filterConfigData.filterKey,evt.currentTarget.name,evt.target.checked,'');
						 }}
						 analyticsData={filterConfigData.analyticsData}
						 getContainerRef={()=>this.refs.filterContainer}
						 selectedValues={{[filterConfigData.filterKey] : facets[filterConfigData.filterKey] || ''}}
						 isShowMoreRequired={false}
						 isTranslationRequired={filterConfigData.isTranslationRequired}
						 legalInfo={filterConfigData.legalInfo}
						 displayFormatter={filterConfigData.data && filterConfigData.data.valueHandler}
						 onToggleAll={(checked,facet,facetValues,nestedFacet,nestedFacetValues)=>{
							 this.onFacetChange('CheckboxList',facet,facetValues,checked,'',nestedFacet,nestedFacetValues);
						 }}/>
			</div>
		)
	}

	renderRadioList(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const { l } = this.context.i18n;
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<RadioList key={`${filterConfigData.filterKey}${uniqueId()}`}
					   facet={filterConfigData.filterKey}
					   title={filterConfigData.label}
					   className="radio-list"
					   items={aggregations[this.lastIndex].buckets}
					   onChange={(evt)=>{
						   this.onFacetChange('RadioList',filterConfigData.filterKey,evt.currentTarget.value);
					   }}
					   selectedVal={facets[filterConfigData.filterKey] || 'all'}
					   l = {l}/>
			</div>
		);
	}

	renderSwitch(filterConfigData,country,filerColClasses) {
		const { facets } = this.props;
		const { l } = this.context.i18n;
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<div>
				<div className="title">{l(filterConfigData.label)}</div>
				<Switch
					key={`${filterConfigData.filterKey}${uniqueId()}`}
					checked={facets[filterConfigData.filterKey] ? true : false}
					id={`switch-${filterConfigData.filterKey}`}
					l={l}

					onChange={(evt)=>{this.onFacetChange('Switch',filterConfigData.filterKey,evt.target.checked)}}/>
			</div>
			</div>
		)
	}

	renderSelectDropdown(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const { l } = this.context.i18n;
		const options = SearchFacets.formatHandlers[filterConfigData.optionFormatter](aggregations[this.lastIndex].buckets,l);
		const selectedOptionIndex = getSelectedOptionIndex(options,facets[filterConfigData.filterKey]);
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<div>
			<div className="title">{l(filterConfigData.label)}</div>
			<Select
				key={`${filterConfigData.filterKey}${uniqueId()}`}
				options={options}
				btnClassName={'btn btn-default'}
				isTranslationRequired={false}
				onChange={(value)=>{
					this.onFacetChange('RangeSlider',filterConfigData.filterKey, value);
				}}
				selected={selectedOptionIndex >= 0 ? Number(selectedOptionIndex) : false}
			/>
			</div>
			</div>
		);
	}

	renderRangeSelect(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const rangeSelectData = filterConfigData.data || {};
		const min = rangeSelectData.min !== undefined ? rangeSelectData.min : aggregations[this.lastIndex].minimum;
		const max = rangeSelectData.max !== undefined ? rangeSelectData.max : aggregations[this.lastIndex].maximum;
		const selectedRangeValues = facets[filterConfigData.filterKey] ? facets[filterConfigData.filterKey].split("-") : [];
		const rangeOptions = getRangeSelectOptions(min,max,rangeSelectData.stepSize,rangeSelectData.stepsCount,selectedRangeValues[0],selectedRangeValues[1]);
		return (
			<div className={Cx(filerColClasses,filterConfigData.classes)}>
			<RangeSelect
				key={`${filterConfigData.filterKey}${uniqueId()}`}
				minValues={rangeOptions.minValues}
				maxValues={rangeOptions.maxValues}
				selectedMinValue={selectedRangeValues[0]}
				selectedMaxValue={selectedRangeValues[1]}
				uom = {getValueByLocale(country,rangeSelectData.localeKey)}
				valueFormatter = {rangeSelectData.valueFormatter}
				getContainerRef={()=>this.refs.filterContainer}
				analyticsData={filterConfigData.analyticsData}
				onClear={()=>{this.onFacetChange('RangeSlider',filterConfigData.filterKey,'')}}
				onChange={(minValue,maxValue)=>{
					//maxValue = maxValue > 0 ? maxValue : max;
					this.onFacetChange('RangeSlider',filterConfigData.filterKey, `${minValue}-${maxValue}`);
				}}
				title={filterConfigData.label}/>
			</div>
		)
	}

	renderWrapper(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const { l } = this.context.i18n;
		if(filterConfigData.children) {
			const childrenKeys = Object.keys(filterConfigData.children);
			return (
				<div className={Cx(filerColClasses,filterConfigData.classes)}>
					<div className="title">{l(filterConfigData.label)}</div>
					<div className="sub-components">
						{
							childrenKeys.map(childComponent => {
								return this.renderFacetComponent(filterConfigData.children[childComponent], aggregations, filerColClasses, country)
							})
						}
					</div>
				</div>
			)
		}

		return null;
	}

	renderCheckbox(filterConfigData,country,filerColClasses) {
		const { aggregations, facets } = this.props;
		const { l } = this.context.i18n;
		const  { label, analyticsData, filterKey } = filterConfigData;
		return (
			<Checkbox
				analyticsData={analyticsData}
				label={l(label)}
				name={filterKey}
				key={filterKey}
				id={filterKey}
				onChange={(evt)=>{
					this.onFacetChange('facetChange',filterConfigData.filterKey,evt.target.checked ? false : '');
				}}
				value = {facets[filterConfigData.filterKey] === 'false' ? true : ''}
				checked={facets[filterConfigData.filterKey] === 'false' ? true : ''}
			/>
		)
	}

	onSearchByName(value, searchkey) {
		this.props.onFacetChange('facetChange', searchkey, value);
	}

	onClearSearchByName(key) {
		this.props.onClearFacet('search', key);
	}

	renderFacetComponents(filterConfigData, aggregations, filerColClasses, country){
		return filterConfigData.map((filterComponent) => {
			return this.isFacetExist(filterComponent, aggregations) &&
				this.renderFacetComponent(filterComponent, filerColClasses, country);
		});
	}

	renderFacetComponent(filterConfigData, filerColClasses, country) {
		let Component = `render${filterConfigData.component}`;
		return typeof this[Component] === 'function' ?
			this[Component](filterConfigData, country, filerColClasses)
		: null;
	}

	render() {
		const { country, i18n : {l} } = this.context;
		const { aggregations, facets, facetsData, headerTitle, placeHolder, searchType, isClearAllRequired, clearAllFilters, mobileOverlay, listingCount } = this.props;
		let filerColClasses = 'search-tool-bar__filter-options';
		const nameSearchKey = getPartialSearchAttribute(searchType);
		const filterConfigData = sortFacetsByOrder(facetsData);

		return (
			<div ref="filterContainer" className="search-results-layout__filters_ctr">
				<div shadow={2} className={Cx('show','filter-card')}>
					<div className="search-tool-bar__filter-container">
						{mobileOverlay && 
						<div className="search-tool-bar__filter-container__mobile-options">
									<button className="btn btn-default" onClick={this.props.onCloseFilterOverlay}>{l("DONE")}</button>
									<div className="total-results">
										<span className="total-results__count">{listingCount}</span>{l('PROPERTIESFOUND')}
									</div>
									{ isClearAllRequired &&
										<button onClick = {this.onClearAll} className="btn btn-default">
											<span>{`${l('CLEARALL')}`}</span>
										</button>
									}
							</div>
							
						}
						{this.renderFacetComponents(filterConfigData, aggregations, filerColClasses, country)}
					</div>
				</div>
			</div>
		);
	}

}
