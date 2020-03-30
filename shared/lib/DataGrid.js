import React , { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

export default class DataGrid extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	static getWizardNavigation(steps) {
		return Object.keys(steps).map( (step, key) => ({
			"label": steps[step].title,
			"steps": key+1,
			"link": steps[step].link || "",
			"canNavigate" : steps[step].canNavigate || false,
			"navigationSteps" : steps[step].navigationSteps || []
		}))
	}

	constructor(props) {
		super(props);
	}

	renderStep() {
		const { params : { step } } = this.props;
		const { reverseTransition } = this.state;
		const LayoutComponent = this.stepLayout[step || this.defaultStep];
		return (

			<TransitionGroup className="transition-group">
				<CSSTransition
					key={step}
					timeout={500}
					classNames={reverseTransition ? "wizard-transition-reverse" : "wizard-transition"}
				>
					<LayoutComponent
						key={step}
						{...this.props}
						{...this.state}
						stepConfig = {this.steps.steps[step || this.defaultStep]}
						onNavigateEnd = {this.onNavigateEnd}
						navigateNext={this.navigateNext}
						navigatePrevious={this.navigatePrevious}/>
				</CSSTransition>
			</TransitionGroup>


		)
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

	renderWizardHeader() {
		const { l } = this.context.i18n;
		return (
			<div className="wizard__header">
				{this.steps.pageTitle && <h1 className="wizard__title">{l(this.steps.pageTitle)}</h1>}
				{this.steps.pageDescription && <p className="wizard__description">{this.steps.pageDescription}</p>}
			</div>
		)
	}

	render() {
		return (
			<div className={Cx("wizard", this.props.classNames)}>
				{this.renderWizardHeader()}
				{this.renderWizardNavigation()}
				{/*<div className="wizard__contents-container">

				 </div>*/}
				{this.renderStep()}
			</div>
		);
	}

}
