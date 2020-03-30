import React, { Fragment } from 'react';
import Wizard from 'lib/BaseWizard';
import NavigationBar from 'components/navigation-bar';
import { connect } from 'react-redux';
// import {
// 	ApplyStart,
// 	PersonalInfo,
// 	Income,
//     Residences,
//     Household,
//     Disclosures
// } from './steps';
import {
    ApplyStart,
	TenantConfirm,
	TenantDocuments
} from './steps';
import Steps from './steps/steps-config.json';

const STEP_COMPLETION_SEQUENCE = [
	{
		key : 'start',
		name : 'Start'
	},
	{
		key : 'personal-info',
		name : 'Personal'
	},
	{
		key : 'income',
		name : 'Income'
	},
	{
		key : 'residences',
		name : 'Residences'
	},
	{
		key : 'household',
		name : 'Household'
	},
	{
		key : 'disclosures',
		name : 'Disclosures'
	},
	{
		key : 'documents',
		name : 'DOCUMENTS'
	},
	{
		key : 'confirm',
		name : 'Confirm'
	}
];

class TenantApplication extends Wizard {

	static defaultProps = {
		'classNames' : ['tenant-application']
	};

	static getWizardNavigation(props,steps) {
		return Object.keys(steps).map( (step, key) => ({
			"label": steps[step].title,
			"steps": key+1,
			"link": props.params.id ? `${steps[step].linkPath}/${props.params.id}?listingid=${props.location.query.listingid}` : `${steps[step].linkPath}?listingid=${props.location.query.listingid}`,
			"canNavigate" : steps[step].checkCanNavigate ? (props.stepCompletionStatus && props.stepCompletionStatus[steps[step].checkCanNavigate]) : steps[step].canNavigate,
			"navigationSteps" : TenantApplication.getNavigationSteps(steps[step],props.stepCompletionStatus,STEP_COMPLETION_SEQUENCE)
		}))
	}

	static getNavigationSteps(stepConfig,stepCompletionStatus,stepSequence) {
		let navigationSteps = [];
		for(let i = 0; i < stepSequence.length; i++) {
			if(i !== stepConfig.index) {
				navigationSteps.push(i+1);
			}
			if(stepCompletionStatus && !stepCompletionStatus[stepSequence[i].name]) {
				break;
			}
		}
		return navigationSteps;
	}

	constructor(props,context) {
		super(props);
		const { l } = context.i18n;
		this.navigateNext = this.navigateNext.bind(this);
		this.navigatePrevious = this.navigatePrevious.bind(this);
		this.onNavigateEnd = this.onNavigateEnd.bind(this);
		this.defaultStep = 'start';
		this.state = {
			navigationMap : TenantApplication.getWizardNavigation(props,Steps.steps),
			reverseTransition : false,
			step : props.params.step
		};
		this.steps = Steps;
		this.stepLayout = {
			'start' : ApplyStart,
			'personal-info' : ApplyStart,
			'income' : ApplyStart,
            'residences' : ApplyStart,
            'household' : ApplyStart,
			'disclosures' : ApplyStart,
			'documents' : TenantDocuments,
            'confirm': TenantConfirm
		};

		this.layouts = ['start', 'personal-info', 'income', 'residences', 'household', 'disclosures','documents','confirm'];
	}

	componentWillReceiveProps(props) {
		let reverseTransition = false;
		if (this.layouts.indexOf(this.props.params.step) > this.layouts.indexOf(props.params.step)) {
			reverseTransition = true;
		}

		this.setState({
			reverseTransition,
			navigationMap : TenantApplication.getWizardNavigation({...props.get_schema_tenant_application,...props},Steps.steps)
		});
	}

	navigateNext(redirectPath) {
        const  { step , query, id } = redirectPath;
        const { params } = this.props;
		this.context.router.push({
			pathname : id ? `/profile/tenant-application/${step}/${id}` : `/profile/tenant-application/${step}`,
			query
		});
	}

	navigatePrevious({ step , query, id }) {
        const { params } = this.props;
		this.setState({
			reverseTransition :true
		}, this.context.router.push({
			pathname : id ? `/profile/tenant-application/${step}/${id}` : `/profile/tenant-application/${step}`,
			query
		}));
	}

	onNavigateEnd() {
		this.context.router.push({
			pathname : '/profile/applications'
		});
	}

	renderWizardNavigation() {
		const  { navigationMap } = this.state;
		const { params : { step  } } = this.props;
		const cstep = this.steps.steps[step || this.defaultStep];
		return (
			<div className="wizard__navigation">
				<NavigationBar steps={navigationMap} currentIndex={cstep.index} currentStep={navigationMap[cstep.index]}/>
			</div>
		)
	}

	render() {
		const { params : {step}} = this.props;
		return (
			<div className="tenant-application schema-listing-page profile-page__layout__profile-section">
				{super.render()}
				{/* <WizardHelp config={this.steps.steps[step || this.defaultStep]}/> */}
			</div>
		)
	}

}

const mapStateToProps = ({schema, documents}) => {
	const { get_schema_tenant_application, 
	save_schema_tenant_application} = schema;
	return {
		get_schema_tenant_application, 
		save_schema_tenant_application,
		tenant_upload_file: documents.tenant_upload_file,
		tenant_upload_photo: documents.tenant_upload_photo
	};
};

export default connect(mapStateToProps)(TenantApplication);
