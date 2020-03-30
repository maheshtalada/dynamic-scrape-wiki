import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/common/input/input';
import SingleSelectBoxes from 'components/common/single-select-boxes';
import CheckboxList from 'components/common/checkbox-list/checkbox-list';
import Metros from 'assets/static/metros-served-config';
import { getSearchPageViewType } from 'utils/searchUtil';
import {steps} from 'assets/static/help-me-invest-config';

export default class SearchByBudget extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	static getSelectedMetroGeoIds(props,metros) {
		return metros.map(metro => metro.key).join(',');
	}

	static getSelectedMarkets(metroGeoIds) {
		if(!metroGeoIds) {
			return {};
		}
		let markets = {};
		metroGeoIds.split(',').map(geoId => {
			markets[geoId] = true;
		});
		return markets;
	}

	static getMetroBuckets(areas) {
		return areas.sort((a, b)=>{
			if(a.label > b.label) {
				return 1;
			}

			if(b.label > a.label) {
				return -1
			}
			return 0

		}).map(area => ({label : area.label, key: area.metroGeoId}));
	}

	static getMarketSelectGeoId(evt,state) {
		let markets = {...state.markets};
		markets[evt.currentTarget.name] = evt.currentTarget.checked;
		return {
			markets : markets,
			metrogeoids : Object.keys(markets).filter(key => markets[key]).join(',')
		};
	}

	static getToggleAllGeoId(checkedAll,buckets) {
		let markets = {};
		let selectedGeoIds = '';
		let marketsCleared = true;
		if(checkedAll) {
			selectedGeoIds = buckets.join(',');
			markets = SearchByBudget.getSelectedMarkets(selectedGeoIds);
			marketsCleared = false;
		}

		return {
			markets : markets,
			metrogeoids : selectedGeoIds,
			marketsCleared
		};
	}

	constructor(props) {
		super(props);
		const metroBuckets = SearchByBudget.getMetroBuckets(Metros.areasServed);
		const selectedGeoIds = SearchByBudget.getSelectedMetroGeoIds(props,metroBuckets);
		this.state = {
			investment : '',
			purchaseType : 'cash',
			metros : {
				'name' : 'metrogeoids',
				'buckets' : metroBuckets
			},
			markets : SearchByBudget.getSelectedMarkets(selectedGeoIds),
			metrogeoids : selectedGeoIds
		};

		this.onMarketSelect = this.onMarketSelect.bind(this);
		this.onToggleAll = this.onToggleAll.bind(this);
		this.routeGuidedSearch = this.routeGuidedSearch.bind(this);
	}


	render() {
		const { i18n : {l}} = this.context;
		const { investment = '', purchaseType, metros,  metrogeoids, error = false} = this.state;

		return (
			<Fragment>
				<Fragment>
					<h3 className="wizard__question">{steps.investment.question}</h3>
					<div key="inputCurrencyContainer" className={`wizard__answer-options-container schema__text__currency__container ${error ? 'error-border' : ''}`}>
						<span className="input-prefix">$</span>
						<Input
							ref="placeInput"
							onChange={(value)=>this.onChange({investment :  value , error : false})}
							value={investment}
							required={true}
							autoFocus={true}
							type="number"
							classes="no-border quick-search-input">
						</Input>
					</div>
				</Fragment>
				<Fragment>
					<h3 className="wizard__question">{steps.type.question}</h3>
					<div className="wizard__answer-options-container">
						<SingleSelectBoxes
							className="wizard-radio-type-options"
							boxOptions={steps.type.boxoptions}
							selectedBox = {purchaseType}
							isAnyRequired={false}
							l={l}
							analyticsData={{}}
							onChange={(value)=>{this.onChange({purchaseType :  value})}}/>
					</div>
				</Fragment>
				<Fragment>
					<h3 className="wizard__question">{steps.market.question}</h3>
					<div className="wizard__answer-options-container">
						<CheckboxList className="checkbox-list"
									  items={metros}
									  itemCountToShow={12}
									  isTranslationRequired={false}
									  onToggleAll={this.onToggleAll}
									  selectedValues={{'metrogeoids': metrogeoids}}
									  onChange={this.onMarketSelect}/>
					</div>
				</Fragment>
				<div className="flex flex-justify-left help-me-invest__start-link-wrap">
					<button className="help-me-invest__start-link btn btn-primary flex flex-align-center flex-justify-between" data-tag-category="Guided Search" data-tag-action="Click" data-tag-label="Start" onClick={this.routeGuidedSearch}>
						{l('SEARCH')}
					</button>
				</div>
			</Fragment>
		)
	}

	routeGuidedSearch() {
		const { investment , purchaseType,   metrogeoids} = this.state;
		const { router, screenSize } = this.context;
		if(!investment){
			this.setState({
				error : true
			})
		} else {
			router.push({
				pathname : `/residential-investment-properties/for-sale/search/guided/recommend`,
				query : {
					amount : investment,
					purchasetype : purchaseType,
					metrogeoid : metrogeoids,
					investmentcategories : 'all',
					...getSearchPageViewType(screenSize, 'list')
				}
			});
		}

	}

	onChange(value) {
		this.setState(value);
	}

	onMarketSelect(evt) {
		this.setState(SearchByBudget.getMarketSelectGeoId(evt,this.state));
	}

	onToggleAll(checkedAll,facet,buckets) {
		this.setState(SearchByBudget.getToggleAllGeoId(checkedAll,buckets));
	}

}
