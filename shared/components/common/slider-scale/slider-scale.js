import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';

const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;

export default class SliderScale extends Component {

	static propTypes = {
		onChange : PropTypes.func,
		min : PropTypes.number,
		max : PropTypes.number

	};

	static defaultProps = {
		steps : 100,
		onChange : ()=>{},
		min : 0,
		max : 100,
		defaultValue : 0,
		minThreshold : 0,
		maxLabelPostfix :'',
		analyticsData : {}
	};

	constructor(props) {
		super(props);

		this.state = {
			percent: Math.min(props.max,this.props.defaultValue)
		};
		this.boundOnMouseMove = this.onMouseMove.bind(this);
		this.boundOnMouseUp = this.onMouseUp.bind(this);
		this.onChangePosition = this.onChangePosition.bind(this);
		this.diffRange = this.props.max - this.props.min;
		this.unitJump = 100/this.props.steps;
		this.unitSize = this.props.max / this.props.steps;
	}


	onKeyDown(event) {
		if (event.keyCode === KEY_CODE_LEFT || event.keyCode === KEY_CODE_RIGHT) {
			this.jumpOneStep(event.keyCode === KEY_CODE_LEFT ? 'left' : 'right');
		}
	}

	getScaleDimentions() {
		this.barEle = findDOMNode(this.refs.bar).getBoundingClientRect();
		return this.barEle;
	}

	calculateNewPercent(event) {
		let mouseX = this.barEle && this.barEle.left || this.getScaleDimentions().left,
			barWidth = this.barEle && this.barEle.width || this.getScaleDimentions().width,
			clientX = this.getClientX(event),
			newXPos = (((clientX - mouseX)/barWidth) * 100)/this.unitJump;
		return Math.min(this.props.max, Math.max(this.props.minThreshold,newXPos));
	}

	onMouseMove(event) {
		this.setState({
			percent : this.calculateNewPercent(event)
		});
	}

	onChangePosition(event) {
		const newPercent = this.calculateNewPercent(event);
		this.setState({
			percent : newPercent
		},()=>this.props.onChange(Math.floor(newPercent)));
	}

	onMouseDown(event) {
		findDOMNode(this.refs.handle).focus();
		this.addEvents();
		event.preventDefault();
	}

	onMouseUp() {
		this.removeEvents();
		findDOMNode(this.refs.handle).focus();
		this.props.onChange(Math.floor(this.state.percent));
	}

	calculateStepValue(percent) {
		return this.props.min   +  (this.diffRange * parseInt(percent))/this.props.steps;
	}

	getComputedTrack(stepNumber, interval=10) {
		const unit = stepNumber % interval;
		const defaultHeight = '5px';
		return {
			trackStyles : {
				left : `${stepNumber * this.unitJump}%`,
				height : unit === 0 && '13px' || unit === 5 && '8px' || defaultHeight
			},
			stepValue  : unit === 0 || unit === 10 ? this.calculateStepValue(stepNumber) : ''
		}
	}

	renderTrack() {
		let trackStepStyles = null;
		return (
			<div className="schema__scale-ruler__track__steps">
				{
					[...Array(this.props.steps+1)].map((x,i)=>{
						trackStepStyles = this.getComputedTrack(i);
						return <span className="schema__scale-ruler__track__step-start" key={`step-${i}`} style={trackStepStyles.trackStyles}><label>{trackStepStyles.stepValue}</label></span>
					})
				}
			</div>
		)
	}

	render() {
		const { maxLabelPostfix, analyticsData } = this.props;
		const { percent } = this.state;
		// 15px - half of handle size
		const handleStyles = {left : `calc(${percent*this.unitJump}% - 15px)`};
		const currentStepValue = this.calculateStepValue(percent);
		return (
			<div className="slider-scale schema__scale-ruler">
				<div className="schema__scale-ruler__wrapper">
					<div className="schema__scale-ruler__horizontal">
						<div className="schema__scale-ruler__track" ref="bar" data-tag-category={analyticsData.category}
									data-tag-action={analyticsData.action}
									data-tag-label={analyticsData.label} onTouchStart={this.onChangePosition.bind(this)}
							 onClick={this.onChangePosition.bind(this)}>
							{this.renderTrack()}
							<button ref="handle"
									style={handleStyles}
									onKeyDown={this.onKeyDown.bind(this)}
									onTouchStart={this.onMouseDown.bind(this)}
									onMouseDown={this.onMouseDown.bind(this)}
									className="simple-slider__handle"
									title="Drag to select value">{currentStepValue}</button>

						</div>
					</div>
				</div>
			</div>
		)
	}

	addEvents() {
		document.addEventListener('mousemove', this.boundOnMouseMove);
		document.addEventListener('mouseup', this.boundOnMouseUp);
		document.addEventListener('touchmove', this.boundOnMouseMove);
		document.addEventListener('touchend', this.boundOnMouseUp);
	}

	removeEvents() {
		document.removeEventListener('mousemove', this.boundOnMouseMove);
		document.removeEventListener('mouseup', this.boundOnMouseUp);
		document.removeEventListener('touchmove', this.boundOnMouseMove);
		document.removeEventListener('touchend', this.boundOnMouseUp);
	}

	getClientX(event) {
		return typeof event.clientX !== 'undefined' ? event.clientX : event.touches[0].clientX;
	}

	jumpOneStep(direction) {
		let percent = this.unitSize;
		if (direction === 'left') {
			percent *= -(parseInt(this.unitSize, 10));
		}
		let newPercent = this.snapPercent(this.state.percent + percent);
		this.setState({
			percent : newPercent
		},()=>this.props.onChange(Math.floor(newPercent)));

	}

	snapPercent(percent) {
		if (!this.props.steps) {
			return percent;
		}
		let step = percent / 100 * (this.props.steps - 1);
		return Math.min(this.props.max, Math.max(0, (step) / (this.props.steps - 1) * 100));
	}
}
