import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CheckboxList from 'components/common/checkbox-list/checkbox-list';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import Metros from 'assets/static/metros-served-config';
import { getSearchPageViewType } from '../../../utils/searchUtil';

class Market extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	static getSelectedMetroGeoIds(props,metros) {
		const { investor_wizard = '' , location : {query} } = props;
		if(investor_wizard && investor_wizard.market && investor_wizard.market.marketsCleared) {
			return '';
		}
		return query.metrogeoid || (investor_wizard && investor_wizard.market && investor_wizard.market.metrogeoids) || metros.map(metro => metro.key).join(',');
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
			markets = Market.getSelectedMarkets(selectedGeoIds);
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
		this.onMarketSelect = this.onMarketSelect.bind(this);
		this.onToggleAll = this.onToggleAll.bind(this);
		const metroBuckets = Market.getMetroBuckets(Metros.areasServed);
		const selectedGeoIds = Market.getSelectedMetroGeoIds(props,metroBuckets);
		this.state = {
			metros : {
				'name' : 'metrogeoids',
				'buckets' : metroBuckets
			},
			markets : Market.getSelectedMarkets(selectedGeoIds),
			metrogeoids : selectedGeoIds
		};
	}

	onMarketSelect(evt) {
		this.setState(Market.getMarketSelectGeoId(evt,this.state));
	}

	onToggleAll(checkedAll,facet,buckets) {
		this.setState(Market.getToggleAllGeoId(checkedAll,buckets));
	}

	render() {
		const { i18n : {l}} = this.context;
		const { stepConfig } = this.props;
		const { metros, metrogeoids } = this.state;
		return (
			<div className="market-step wizard__step-container">
				<h3 className="wizard__question">{stepConfig.question}</h3>
				<div className="wizard__answer-options-container">
					<CheckboxList className="checkbox-list"
						items={metros}
						itemCountToShow={12}
						isTranslationRequired={false}
						onToggleAll={this.onToggleAll}
						selectedValues={{'metrogeoids': metrogeoids}}
						onChange={this.onMarketSelect}/>
				</div>
				<LinearNavigation
					nextBtnGATags={{
						'data-tag-category' : 'Guided Search Actions',
						'data-tag-action' : 'Click',
						'data-tag-label' : 'Guided Search'
					}}
					nextText={l('SEARCH')}
					backText={l('PREVIOUS')}
					className="linear-navigation--light-theme"
					isSaveExitRequired={false}
					isNavigatingSaveExitRequired={false}
					onNext={this.onNextClick.bind(this)}
					onBack={this.onBackClick.bind(this)}
				/>
			</div>
		);
	}

	onNextClick() {
		const { metrogeoids, marketsCleared } = this.state;
		const queryObj = Object.assign({...this.props.location.query},{ metrogeoid : metrogeoids, investmentcategories : 'all', ...getSearchPageViewType(this.context.screenSize, 'list')});
		if(!metrogeoids) {
			delete queryObj.metrogeoid
		}

		this.context.router.push({
			pathname : `/residential-investment-properties/for-sale/search/guided/recommend`,
			query : queryObj
		});
	}

	onBackClick() {
		this.props.navigatePrevious({
			step : 'type',
			query : this.props.location.query
		});
	}

}

export default Market;
