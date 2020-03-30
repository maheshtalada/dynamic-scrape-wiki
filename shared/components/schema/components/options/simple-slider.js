import React from 'react';
import PropTypes from 'prop-types';

const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;

export default class SimpleSlider extends React.Component {

	static propTypes = {
		steps: PropTypes.number,
		onChange: PropTypes.func,
		percent: PropTypes.number
	};

	constructor(props) {
		super(props);

		this.state = {
			mouseX: 0
		};
		this.boundOnMouseMove = this.onMouseMove.bind(this);
		this.boundOnMouseUp = this.onMouseUp.bind(this);
	}

	onKeyDown(event) {

		if (event.keyCode === KEY_CODE_LEFT || event.keyCode === KEY_CODE_RIGHT) {
			this.jumpOneStep(event.keyCode === KEY_CODE_LEFT ? 'left' : 'right');
		}
	}

	onMouseMove(event) {
		let barWidth = this.refs.bar.getDOMNode().getBoundingClientRect().width,
			clientX = this.getClientX(event),
			xPos = (this.props.percent / 100) * barWidth,
			newXPos = xPos + (clientX - this.state.mouseX),
			newPercent = Math.min(100, Math.max(0, newXPos / barWidth * 100));
		this.setState({
			mouseX: clientX
		});
		this.props.onChange(newPercent);
	}

	onMouseDown(event) {
		this.setState({
			mouseX: this.getClientX(event)
		});
		this.addEvents();
		event.preventDefault();
	}

	onMouseUp() {
		this.removeEvents();
		let newPercent = this.snapPercent(this.props.percent);
		this.props.onChange(newPercent);
		this.refs.handle.getDOMNode().focus();
	}

	render() {
		let handleStyle = {
			left: `${this.props.percent}%`
		};
		let leftStyle = {
			width: `${this.props.percent}%`
		};
		let rightStyle = {
			left: `${this.props.percent}%`,
			width: `${100 - this.props.percent}%`
		};
		return (
			<div ref="bar" className="simple-slider__wrapper">
				<div className="simple-slider__left-side" style={leftStyle} onClick={this.jumpOneStep.bind(this,'left')} />
				<button ref="handle"
						style={handleStyle}
						onKeyDown={this.onKeyDown.bind(this)}
						onTouchStart={this.onMouseDown.bind(this)}
						onMouseDown={this.onMouseDown.bind(this)}
						className="simple-slider__handle"
						title="Drag to select value" />
				<div className="simple-slider__right-side" style={rightStyle} onClick={this.jumpOneStep.bind(this,'right')} />
			</div>
		);
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
		let percent = (1 / (this.props.steps || 100)) * 100;
		if (direction === 'left') {
			percent *= -1;
		}
		let newPercent = this.snapPercent(this.props.percent + percent);

		this.props.onChange(newPercent);
	}

	snapPercent(percent) {
		if (!this.props.steps) {
			return percent;
		}
		let step = percent / 100 * (this.props.steps - 1);
		return Math.min(100, Math.max(0, (step) / (this.props.steps - 1) * 100));
	}
}


