import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Wizard from 'lib/BaseWizard';
import NavigationBar from 'components/navigation-bar';
import WizardHelp from 'components/wizard/wizard-help';
import {
	Template,
	HeroImage,
	GalleryImages,
	Highlights,
	PdfContactInfo,
	Preview
} from './steps';
import Steps from './steps/steps-config.json';
import HandoutContemporarySteps from './steps/handout-contemp-steps-config.json';
import HandoutClassicSteps from './steps/handout-steps-config.json';
import FlyerSteps from './steps/flyer-steps-config.json';
import PostCardSteps from './steps/postcard-steps-config.json';
import SiteConfig from '../../config.js';
import Loader from 'components/common/page-loader/loader';
import { REQUEST_GET_PROPERTY_PDF_TEMPLATE, REQUEST_ADD_PROPERTY_PDF_TEMPLATE_DATA } from '../../redux/actions/properties';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';

const { pdfServer } = SiteConfig;
const STEPS_MAP = {
	'handout-contemporary' : {
		'steps': HandoutContemporarySteps,
		'layouts': ['template','galleryimages','highlights','contactinfo']
	},
	'handout-classic' : {
		'steps': HandoutClassicSteps,
		'layouts': ['template','heroimage','galleryimages','highlights','contactinfo']
	},
	'handout-verbose' : {
		'steps': FlyerSteps,
		'layouts': ['template','heroimage','highlights','contactinfo']
	}
	/*'postcard-classic' : {
		'steps': PostCardSteps,
		'layouts': ['template','galleryimages','highlights','contactinfo']
	}*/
};


class PDFWizard extends Wizard {

	static defaultProps = {
		'classNames' : ['wizard','pdf-wizard']
	};


	static getNavigatePath(isLoggedIn, pathStr) {
		if(isLoggedIn) {
			return `/profile${pathStr}`
		}
		return pathStr;
	}

	constructor(props,context) {
		super(props);
		const { l } = context.i18n;
		this.navigateNext = this.navigateNext.bind(this);
		this.navigatePrevious = this.navigatePrevious.bind(this);
		this.onNavigateEnd = this.onNavigateEnd.bind(this);
		this.steps = props.location.query.template ? STEPS_MAP[props.location.query.template].steps : Steps;
		let navigationMap = Wizard.getWizardNavigation(this.steps.steps);
		this.defaultStep = 'template';
		this.state = {
			navigationMap,
			reverseTransition : false,
			step : props.params.step
		};
		this.stepLayout = {
			'template' : Template,
			'heroimage' : HeroImage,
			'galleryimages' : GalleryImages,
			'highlights' : Highlights,
			'contactinfo' : PdfContactInfo
		};
		this.breadcrumbs = [
			{
				url : '/profile/listings',
				name : l('MYLISTINGS')
			},
			{
				name : props.params.id ? l('EDITPROPERTY') : l('CREATEAPROPERTY')
			}
		];
		this.layouts = props.location.query.template ? STEPS_MAP[props.location.query.template].layouts : ['template','heroimage'];
	}


	componentWillReceiveProps(props) {
		let reverseTransition = false;
		this.steps = props.location.query.template ? STEPS_MAP[props.location.query.template].steps : Steps;
		let navigationMap = Wizard.getWizardNavigation(this.steps.steps);
		this.layouts = props.location.query.template ? STEPS_MAP[props.location.query.template].layouts : ['template','heroimage'];
		if (this.layouts.indexOf(this.props.params.step) > this.layouts.indexOf(props.params.step)) {
			reverseTransition = true;
		}

		this.setState({
			reverseTransition,
			navigationMap
		});
	}

	async navigateNext(payload, redirectPath) {
		const  { step , query } = redirectPath;
		const { dispatch, user: { user},  params} = this.props;
		await dispatch(REQUEST_ADD_PROPERTY_PDF_TEMPLATE_DATA(payload));
		this.context.router.push({
			pathname : PDFWizard.getNavigatePath(user.isLogIn, `/flyer/${step}/${params.id}`),
			query
		});
	}

	navigatePrevious({ step , query }) {
		const { user: { user},  params} = this.props;
		this.setState({
			reverseTransition :true
		}, this.context.router.push({
			pathname : PDFWizard.getNavigatePath(user.isLogIn, `/flyer/${step}/${params.id}`),
			query
		}))
	}

	onNavigateEnd() {
		const { user: { user},  params, location : {query} } = this.props;
		this.context.router.push({
			pathname : PDFWizard.getNavigatePath(user.isLogIn, `/pdf/preview/${params.id}`),
			query : query
		});
	}

	renderWizardNavigation() {
		const  { navigationMap } = this.state;
		const { screenSize } = this.context;
		const { params : { step  } } = this.props;
		const cstep = this.steps.steps[step || this.defaultStep];
		return (step !== 'template' || screenSize < 2  ?
			<div className="wizard__navigation">
				<NavigationBar steps={navigationMap} currentIndex={cstep.index} currentStep={navigationMap[cstep.index]}/>
			</div> : null
		)
	}

	render() {
		const { params : {step}} = this.props;
		const { isSaving } = this.state;
		return (
			<div className="pdf-wizard-page profile-page__layout__profile-section">
				{super.render()}
				{isSaving && <Loader />}
				<WizardHelp config={this.steps.steps[step || this.defaultStep]}/>
			</div>
		)
	}

}


const mapStateToProps = ({properties}) => {
	const { property_pdf_template = '', property_add_pdf_template = '' } = properties;
	return { property_pdf_template, property_add_pdf_template };
};

export default connect(mapStateToProps)(
	connectDataFetchers(PDFWizard, [
		REQUEST_GET_PROPERTY_PDF_TEMPLATE
	], true)
);
