import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Wizard from 'lib/BaseWizard';
import WizardHelp from 'components/wizard/wizard-help';
import {
	InitialInvestmenst,
	Market,
	PurchaseType,
	Categories
} from './steps';
import Steps from './steps/steps-config.json';
import { REQUEST_UPDATE_INVESTOR_WIZARD } from '../../redux/actions/application';


class InvestorWizard extends Wizard {

	static defaultProps = {
		'classNames' : ['wizard','investor-wizard']
	};

	constructor(props) {
		super(props);
		this.navigateNext = this.navigateNext.bind(this);
		this.navigatePrevious = this.navigatePrevious.bind(this);
		let navigationMap = Wizard.getWizardNavigation(Steps.steps);
		this.defaultStep = 'investment';
		this.state = {
			navigationMap,
			reverseTransition : false,
			step : props.params.step
		};
		this.steps = Steps;
		this.stepLayout = {
			'investment' :     InitialInvestmenst,
			'market' : Market,
			'type' : PurchaseType,
			'categories' : Categories
		};

		this.layouts = ['investment', 'type', 'market', 'categories']
	}

	componentWillReceiveProps(props) {
		let reverseTransition = false;
		if (this.layouts.indexOf(this.props.params.step) > this.layouts.indexOf(props.params.step)) {
			reverseTransition = true;
		}

		this.setState({
			reverseTransition
		});
	}

	navigateNext(payload, redirectPath) {
		const  { step , query } = redirectPath;
		this.props.dispatch(REQUEST_UPDATE_INVESTOR_WIZARD(payload));
		this.context.router.push({
			pathname : `/guided-search/${step}`,
			query
		});
	}

	navigatePrevious({ step , query }) {
		this.setState({
			reverseTransition :true
		}, this.context.router.push({
			pathname : `/guided-search/${step}`,
			query
		}))
	}

	render() {
		const { params : {step}} = this.props;
		return (
			<Fragment>
				{super.render()}
				<WizardHelp config={this.steps.steps[step || this.defaultStep]}/>
			</Fragment>
		)
	}

}

const mapStateToProps = ({application}) => {
	const { investor_wizard} = application;
	return {investor_wizard};
};

export default connect(mapStateToProps)(InvestorWizard)
