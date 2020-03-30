import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * NavigationBar
 * Description: progress bar used for the self service journey
 * Classes: navigation-bar--theme-light
 */

export default class NavigationBar extends Component {

	static propTypes = {
		steps: PropTypes.array,
		title: PropTypes.string,
		className: PropTypes.string,
		currentStep: PropTypes.object
	};

	static defaultProps = {
		map: {},
		className: '',
		currentIndex : false
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};


	renderStepElement(label, index ) {
		const { l } = this.context.i18n;
		return (
			<span className="navigation-bar__section-label">
				<span className="navigation-bar__section-number">{ index + 1} </span>
				<span className="navigation-bar__progress-line-pre" />
				{l(label)}
			</span>
		);
	}

	renderStep(step, index) {
		let sectionClass = 'navigation-bar__step';
		const { steps, currentStep, currentIndex, keyName, keyValue } = this.props;
		if (typeof step.activeStep !== 'undefined' || currentIndex === index) {
			sectionClass += ' active navigation-bar__step--active';
		}

		return (
			<li key={step.label}
				className={sectionClass}
				data-automation-selector={typeof step.activeStep !== 'undefined' ? 'navigation-bar-highlighted-step': ''}>
				{
					currentStep.canNavigate &&	currentStep.navigationSteps && (currentStep.navigationSteps).indexOf(step.steps) > -1 ?
							<Link to={step.link && step.link.replace(keyName, keyValue)}>
								{this.renderStepElement(step.label, index)}
							</Link>
						: this.renderStepElement(step.label, index)
				}
				{index !== steps.length-1 && <span className="navigation-bar__progress-line-post" />}
			</li>
		);
	}

	renderSteps() {
		if (!this.props.steps) {
			return null;
		}
		return (
			<ul>
				{this.props.steps.map(this.renderStep.bind(this))}
			</ul>
		);
	}

	render() {
		let className = `navigation-bar ${this.props.className}`;
		return (
			<div className={className}>
				{this.renderSteps()}
			</div>
		);
	}


}


