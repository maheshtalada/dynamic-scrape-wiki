import React, { Fragment } from 'react';
import Wizard from 'lib/BaseWizard';
import NavigationBar from 'components/navigation-bar';
import {
	Details,
	PurchaseDetails,
	IncomeAndExpense,
	Review
} from './steps';
import Steps from './steps/steps-config.json';



class CreateProperty extends Wizard {

	static defaultProps = {
		'classNames' : ['wizard','create-property']
	};

	static getWizardNavigation(props,steps) {
		return Object.keys(steps).map( (step, key) => ({
			"label": steps[step].title,
			"steps": key+1,
			"link": steps[step].link || "",
			"canNavigate" : props[steps[step].isExistingPropCheck] !== undefined ?  props[steps[step].isExistingPropCheck] : (steps[step].canNavigate || false),
			"navigationSteps" : steps[step].navigationSteps || []
		}))
	}

	constructor(props,context) {
		super(props);
		const { l } = context.i18n;
		this.navigateNext = this.navigateNext.bind(this);
		this.navigatePrevious = this.navigatePrevious.bind(this);
		this.onNavigateEnd = this.onNavigateEnd.bind(this);
		this.defaultStep = 'details';
		this.state = {
			navigationMap : CreateProperty.getWizardNavigation({...props,isDetailsExisting : props.location && props.location.query.id !== undefined},Steps.steps),
			reverseTransition : false,
			step : props.params.step
		};
		this.steps = Steps;
		this.stepLayout = {
			'details' : Details,
			'purchase-details' : PurchaseDetails,
			'income-expense' : IncomeAndExpense,
			//'income' : Income,
			//'expenses' : Expenses,
			'review' : Review
		};
		this.breadcrumbs = [
			{
				url : '/profile/portfolio',
				name : l('MYPORTFOLIO')
			},
			{
				name : props.location.query.id ? l('EDITPROPERTY') : l('CREATEAPROPERTY')
			}
		];

		this.layouts = ['details', 'purchase-details', 'income-expense','review'];
	}

	componentWillReceiveProps(props) {
		let reverseTransition = false;
		if (this.layouts.indexOf(this.props.params.step) > this.layouts.indexOf(props.params.step)) {
			reverseTransition = true;
		}

		this.setState({
			reverseTransition,
			navigationMap : CreateProperty.getWizardNavigation({...props,isDetailsExisting : props.location.query.id !== undefined},Steps.steps)
		});
	}

	navigateNext(redirectPath) {
		const  { step , query } = redirectPath;
		this.context.router.push({
			pathname : `/profile/create-property/${step}`,
			query
		});
	}

	navigatePrevious({ step , query }) {
		this.setState({
			reverseTransition :true
		}, this.context.router.push({
			pathname : `/profile/create-property/${step}`,
			query
		}))
	}

	onNavigateEnd() {
		this.context.router.push({
			pathname : '/profile/portfolio'
		});
	}

	renderWizardNavigation() {
		const  { navigationMap } = this.state;
		const { params : { step  } } = this.props;
		const cstep = this.steps.steps[step || this.defaultStep];

		return (
			<div className="wizard__navigation">
				<NavigationBar steps={navigationMap} keyName="{id}" keyValue={this.props.location.query.id} currentIndex={cstep.index} currentStep={navigationMap[cstep.index]}/>
			</div>
		)
	}

	render() {
		const { params : {step}} = this.props;
		return (
			<div className="create-property-page profile-page__layout__profile-section">
				{/* <BreadCrumbs breadCrumbList={this.breadcrumbs}/> */}
				{super.render()}
				{/* <WizardHelp config={this.steps.steps[step || this.defaultStep]}/> */}
			</div>
		)
	}

}

export default CreateProperty;
