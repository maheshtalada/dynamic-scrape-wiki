import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WizardQuestion from './wizard-question';
import Slider from 'react-slick';
import LinearNavigation from '../../components/common/linear-navigation/linear-navigation';


/*
	display question
	display answer component
	help component -  attach slick component
 */
export default class WizardScreen extends Component {

	static propTypes = {
		onNextClick : PropTypes.func,
		onPreviousClick : PropTypes.func,
		onFinishClick : PropTypes.func,
		screen : PropTypes.object
	};

	static defaultProps = {
		onNext : () => {},
		onPrevious : () => {},
		onFinish : () => {},
		screen : {}
	};

	constructor(props) {
		super(props);
		this.onNextClick = this.onNextClick.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
	}

	render() {
		const { screen } = this.props;
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
			<div className="row flex-row wizard__screen">
				<WizardQuestion question={screen.question}/>
				<LinearNavigation
					nextText={screen.navigation.next && screen.navigation.next.title || 'NEXT'}
					backText="PREVIOUS"
					saveExitText="POSTONLINE"
					className="linear-navigation--light-theme"
					isSaveExitRequired={false}
					isBackRequired={screen.navigation.prev || false}
					isNavigatingSaveExitRequired={false}
					navigatingSaveExitText = "SAVEEXIT"
					onNext={this.onNextClick}
					onBack={this.onBackClick}
				/>

			</div>
		);
	}

	getSlideToRender() {

	}

	onNextClick() {
		this.props.onNextClick(this.props.curreentIndex);
	}

	onBackClick() {
		this.props.onBackClick(this.props.curreentIndex);
	}
};
