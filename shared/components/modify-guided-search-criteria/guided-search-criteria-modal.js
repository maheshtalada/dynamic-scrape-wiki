import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Metros from 'assets/static/metros-served-config';
import Market from '../../containers/InvestorWizard/steps/market';
import { steps as stepsConfig } from '../../containers/InvestorWizard/steps/steps-config.json';
import Input from 'components/common/input/input';
import SingleSelectBoxes from 'components/common/single-select-boxes';
import CheckboxList from 'components/common/checkbox-list/checkbox-list';

export default class GuidedSearchCriteriaModal extends Component {
    constructor(props) {
        super(props);
        const metroBuckets = Market.getMetroBuckets(Metros.areasServed);
		const selectedGeoIds = Market.getSelectedMetroGeoIds(props,metroBuckets);
        this.state = {
            amount : (props.amount && props.amount) || '',
            purchaseType :  props.purchaseType || 'cash',
            metros : {
				'name' : 'metrogeoids',
				'buckets' : metroBuckets
			},
			markets : Market.getSelectedMarkets(selectedGeoIds),
			metrogeoids : selectedGeoIds
        };
        this.onMarketSelect = this.onMarketSelect.bind(this);
		this.onToggleAll = this.onToggleAll.bind(this);
        this.onInvestmentChange = this.onInvestmentChange.bind(this);
        this.onPurchaseTypeChange = this.onPurchaseTypeChange.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }

    static contextTypes = {
        i18n : PropTypes.object,
        router : PropTypes.object
    }

    onMarketSelect(evt) {
		this.setState(Market.getMarketSelectGeoId(evt,this.state));
	}

	onToggleAll(checkedAll,facet,buckets) {
		this.setState(Market.getToggleAllGeoId(checkedAll,buckets));
    }
    
    onInvestmentChange(value) {
		this.setState({
            amount: value
        });
    }
    
    onPurchaseTypeChange(value) {
		this.setState({
            purchaseType : value
        });
    }
    
    onClickSearch() {
        const { amount, purchaseType, metrogeoids } = this.state;
        this.context.router.push({
			pathname : `/residential-investment-properties/for-sale/search/guided/recommend`,
			query : {
                amount,
                purchasetype : purchaseType,
                metrogeoid : metrogeoids,
                investmentcategories : 'all'
            }
        });
        this.props.removeModal();
    }

    render() {
        const { l } = this.context.i18n;
        const { amount, purchaseType, metros, metrogeoids } = this.state;
        return (
            <div className="guided-search-criteria-modal">
                <div className="guided-search-criteria-modal__input-field">
                    <label className="guided-search-criteria-modal__input-field__label" htmlFor="guided-search-criteria-investment">{stepsConfig['investment'].title}</label>
                    <div className="guided-search-criteria-modal__input-field__value">
                        <div key="inputCurrencyContainer" className="schema__text__currency__container">
                            <span className="input-prefix">$</span>
                            <Input
                                id="guided-search-criteria-investment"
                                placeholder={''}
                                onChange={this.onInvestmentChange}
                                value={amount}
                                type="number"
                                classes="no-border quick-search-input">
                            </Input>
                        </div>
                    </div>
                </div>
                <div className="guided-search-criteria-modal__input-field">
                    <label className="guided-search-criteria-modal__input-field__label">{stepsConfig['type'].title}</label>
                    <div className="guided-search-criteria-modal__input-field__value">
                        <SingleSelectBoxes
                            className="wizard-radio-type-options"
                            boxOptions={stepsConfig['type'].boxoptions}
                            selectedBox = {purchaseType}
                            isAnyRequired={false}
                            l={l}
                            analyticsData={{}}
                            onChange={this.onPurchaseTypeChange}/>
                    </div>
                </div>
                <div className="guided-search-criteria-modal__input-field">
                    <label className="guided-search-criteria-modal__input-field__label">{stepsConfig['market'].title}</label>
                    <div className="guided-search-criteria-modal__input-field__value">
                        <CheckboxList className="checkbox-list"
                            items={metros}
                            isTranslationRequired={false}
                            onToggleAll={this.onToggleAll}
                            selectedValues={{'metrogeoids': metrogeoids}}
                            onChange={this.onMarketSelect}/>
                    </div>
                </div>
                <div className="guided-search-criteria-modal__search-wrap flex flex-justify-center">
                    <button onClick={this.onClickSearch} data-tag-category='Guided Search Actions' data-tag-action='Click' data-tag-label='Guided Search' className="btn btn-primary">{l('SEARCH')}</button>
                </div>
            </div>
        )
    }
}