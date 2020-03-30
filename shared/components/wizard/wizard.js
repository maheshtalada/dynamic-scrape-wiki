import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '../navigation-bar';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { cloneDeep } from 'lodash';
import WizardScreen from './wizard-screen';

export default class Wizard extends Component {

	static propTypes = {
		slides : PropTypes.array
	};

	static defaultProps = {
		slides : []
	};

	static getWidgetNavigation(slides) {
		return slides.map( (slide, key) => ({
			"label": slide.title,
			"steps": key+1,
			"link": "",
			"canNavigate" : false
		}))
	}

	constructor(props) {
		super(props);
		let navigationMap = Wizard.getWidgetNavigation(props.slides);
		navigationMap[0].activeStep = true;
		this.state = {
			navigationMap,
			currentStep : 0 //0 - based index
		};
		this.onNextClick = this.onNextClick.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
	}

	render() {
		const  { navigationMap, currentStep } = this.state;
		const { slides } = this.props;
		return (
			<div className="row flex-row wizard">
				<div className="col-xs-12 wizard__navigation">
					<NavigationBar steps={navigationMap} currentStep={navigationMap[currentStep]}/>
				</div>
				<TransitionGroup >
					<CSSTransition classNames="slide-left" timeout={{exit: 300}}>
						<WizardScreen
							screen={slides[currentStep]}
							curreentIndex={currentStep}
							onNextClick = {this.onNextClick}
							onBackClick = {this.onBackClick}
						/>
					</CSSTransition>
				</TransitionGroup>
			</div>
		);
	}

	onNextClick(index) {
		const { navigationMap } = this.state;
		delete navigationMap[index].activeStep;
		navigationMap[index+1].activeStep = true;
		this.setState({
			currentStep : (index+1),
			navigationMap
		})
	}

	onBackClick(index) {
		const { navigationMap } = this.state;
		delete navigationMap[index].activeStep;
		navigationMap[index - 1].activeStep = true;
		this.setState({
			currentStep : (index - 1),
			navigationMap
		})
	}
};
