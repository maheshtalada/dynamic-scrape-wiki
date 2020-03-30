import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CheckboxList from 'components/common/checkbox-list/checkbox-list';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import { REQUEST_UPDATE_INVESTOR_WIZARD } from '../../../redux/actions/application';

const PROPERTY_TAGS_PRIORITY = ["highcashflow","bestbuy","motivatedseller","rentalunit"];

const yesNoOptions = [
	{
		"label": "YES",
		"value": "yes"
	},
	{
		"label": "NO",
		"value": "no"
	}
];

class Categories extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	static isCategoriesSelected(props) {
		const { investor_wizard = ''} = props;
		if(investor_wizard && investor_wizard.categories && !investor_wizard.categories.showCategories) {
			return false;
		}
		return true;
	}

	static getSelectedCategories(props) {

		const { investor_wizard = '' , location : {query} } = props;
		if(investor_wizard && investor_wizard.categories && investor_wizard.categories.categoriesCleared) {
			return '';
		}
		return query.investmentcategories || (investor_wizard && investor_wizard.categories && investor_wizard.categories.investmentcategories) || PROPERTY_TAGS_PRIORITY.join(',');
	}

	static getSelectedCategoriesObject(categories) {
		if(!categories) {
			return {};
		}
		let categoriesObj = {};
		categories.split(',').map(category => {
			categoriesObj[category] = true;
		});
		return categoriesObj;
	}

	constructor(props, context) {
		super(props);
		this.onCategorySelect = this.onCategorySelect.bind(this);
		this.choiceChange = this.choiceChange.bind(this);
		this.onToggleAll = this.onToggleAll.bind(this);
		const { i18n : {l} } = context;
		const selectedCategories = Categories.getSelectedCategories(props);
		this.state = {
			showCategories : Categories.isCategoriesSelected(props),
			bindCategories : {
				'name' : 'investmentcategories',
				'buckets' : (()=>PROPERTY_TAGS_PRIORITY.map(tag => ({label : l(tag.toUpperCase()), key: tag})))()
			},
			categories : Categories.getSelectedCategoriesObject(selectedCategories),
			investmentcategories : selectedCategories
		};
	}

	onCategorySelect(evt,facet) {
		let categories = {...this.state.categories};
		categories[evt.currentTarget.name] = evt.currentTarget.checked;
		this.setState({
			categories : categories,
			investmentcategories : Object.keys(categories).filter(key => categories[key]).join(',')
		});
	}

	choiceChange(value) {
		this.setState({
			showCategories : value === 'yes'
		});
	}

	onToggleAll(checkedAll,facet,buckets) {
		let categories = {};
		let selectedCategories = '';
		let categoriesCleared = true;
		if(checkedAll) {
			selectedCategories = buckets.join(',');
			categories = Categories.getSelectedCategoriesObject(selectedCategories);
			categoriesCleared = false;
		}
		this.setState({
			categories : categories,
			investmentcategories : selectedCategories,
			categoriesCleared
		});
	}


	render() {
		const { i18n : {l}} = this.context;
		const { stepConfig } = this.props;
		const { bindCategories, investmentcategories, showCategories } = this.state;
		return (
			<div className="market-step wizard__step-container">
				<h3 className="wizard__question">{stepConfig.question}</h3>
				<div className="wizard__answer-options-container">
					{/*<SingleSelectBoxes
						className="wizard-radio-type-options"
						boxOptions={yesNoOptions}
						selectedBox = {showCategories ? 'yes' : 'no'}
						isAnyRequired={false}
						l={l}
						analyticsData={{}}
					onChange={this.choiceChange}/>*/}
					{showCategories && <CheckboxList className="checkbox-list"
													onToggleAll={this.onToggleAll}
												  items={bindCategories}
												  isTranslationRequired={false}
												  selectedValues={{investmentcategories}}
												  onChange={this.onCategorySelect}/>}
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
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
		const { investmentcategories, showCategories, categoriesCleared } = this.state;
		this.props.dispatch(REQUEST_UPDATE_INVESTOR_WIZARD(
			{ 'categories' :{ showCategories ,  investmentcategories, categoriesCleared}}
		));
		const queryObj = Object.assign({...this.props.location.query},{investmentcategories});
		if(!showCategories || !investmentcategories) {
			delete queryObj.investmentcategories
		}
		this.context.router.push({
			pathname : `/residential-investment-properties/for-sale/search/guided/recommend`,
			query : queryObj
		});
	}

	onBackClick() {
		this.props.navigatePrevious({
			step : 'market',
			query : this.props.location.query
		});
	}
}

export default Categories;
