import React, {Component } from 'react';
import PropTypes from 'prop-types';


class Range extends Component {
	static propTypes = {
		start: PropTypes.number,
		stop: PropTypes.number,
		min: PropTypes.number,
		max: PropTypes.number
	};

	static defaultProps = {
		start: 20,
		stop: 60,
		min: 0,
		max: 100
	};

	constructor(props) {
		super(props);
		this.activate = false;
		this.startChange = this.startChange.bind(this);
		this.stopChange = this.stopChange.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.sliderClick = this.sliderClick.bind(this);
		this.state = {start: (props.start - props.min) / (props.max - props.min) * 100, stop: (props.stop - props.min) / (props.max -props.min) * 100};
	}

	startChange(event) {
		const {max, min} = this.props;
		this.setState({start: event.target.value / (max - min) * 100});
	}

	stopChange(event) {
		const {max, min} = this.props;
		this.setState({stop: event.target.value / (max - min) * 100});
	}

	onMouseDown(event) {
		this.activate = true;
	}

	onMouseUp(event) {
		this.activate = false;
	}

	onMouseMove(event) {
		if (this.activate) {
			this.sliderClick(event);
		}
	}

	sliderClick(event) {
		const {min, max} = this.props;
		const clickPos = event.pageX;
		const rangeCoords = this.refs.rangeHandle.getBoundingClientRect();
		const startCoords = this.refs.startHandle.getBoundingClientRect();
		const stopCoords = this.refs.stopHandle.getBoundingClientRect();
		const startPos = startCoords.left + startCoords.width * 0.5;
		const stopPos = stopCoords.left + stopCoords.width * 0.5;
		const {left, right, width} = rangeCoords;
		const newPos = Math.min(100, Math.max(0, Math.ceil((clickPos - left) / width * 100)));
		if (clickPos < startPos) {
			// move startHandle
			this.setState({start: newPos});
			return;
		}
		if (clickPos > stopPos) {
			// move stopHandle
			this.setState({stop: newPos});
			return;
		}
		if (clickPos - startPos > stopPos - clickPos) {
			// move stophandle
			this.setState({stop: newPos});
			return;
		} else {
			// move starthandle
			this.setState({start: newPos});
			return;
		}
	}

	render() {
		const {start, stop} = this.state;
		const {min, max} = this.props;
		return (
	        <div className="input-field">
	        	<div className="range-wrapper">
	        		<div className="range-input">
		        		<div className="col-md-3 col-sm-3">
		        			<input type="text" value={Math.ceil(min + start * (max - min) / 100)} onChange={this.startChange}/>
		        		</div>
		        		<div className="col-md-6 col-sm-6">
		        			<input type="text" value="Distance" readOnly/>
		        		</div>
		        		<div className="col-md-3 col-sm-3">
		        			<input type="text" value={Math.ceil(min + stop * (max - min) / 100)} onChange={this.stopChange}/>
	        			</div>
        			</div>
			        <div className="range-target range-ltr range-horizontal range-background" onMouseOut={this.onMouseUp} onMouseMove={this.onMouseMove} onClick={this.sliderClick} ref="rangeHandle">
			        	<div className="range-base">
			        		<div className="range-origin range-connect" style={{left: start + '%'}}>
			        			<div className="range-handle range-handle-lower">
			        				<div className="range-label" ref="startHandle" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
			        					<span>{start}</span>
		        					</div>
		    					</div>
							</div>
							<div className="range-origin range-background" style={{left: stop + '%'}}>
								<div className="range-handle range-handle-upper">
									<div className="range-label" ref="stopHandle" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
										<span>{stop}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    	);
	}
}

export default (Range);
