import ReactDOM, { findDOMNode } from 'react-dom';
import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Track from './Track';
import DefaultHandle from './Handle';
import Steps from './Steps';
import Marks from './Marks';
import addDOMEventListener from 'add-dom-event-listener';

function noop() {
}

function addEventListener(target, eventType, cb) {
	/* eslint camelcase: 2 */
	const callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
		ReactDOM.unstable_batchedUpdates(cb, e);
	} : cb;
	return addDOMEventListener(target, eventType, callback);
}

function isNotTouchEvent(e) {
	return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
}

function getTouchPosition(vertical, e) {
	return vertical ? e.touches[0].clientY : e.touches[0].pageX;
}

function getElementPostion(ele) {
	return ele.getBoundingClientRect();
}

function getMousePosition(vertical, e) {
	return vertical ? e.clientY : e.pageX;
}

function getHandleCenterPosition(vertical, handle) {
	const coords = handle.getBoundingClientRect();
	return vertical ?
	coords.top + (coords.height * 0.5) :
	coords.left + (coords.width * 0.5);
}

function pauseEvent(e) {
	e.stopPropagation();
	e.preventDefault();
}

class RangeSlider extends Component {
	constructor(props) {

		super(props);

		const { range, min, max, step } = props;
		const initialValue = range ? Array.apply(null, Array(range + 1)).map(() => min) : min;
		const defaultValue = ('defaultValue' in props ? props.defaultValue : initialValue);
		const value = (props.value !== undefined ? props.value : defaultValue);

		const bounds = (range ? value : [min, value]).map(v => this.trimAlignValue(v));

		let recent;
		if (range && bounds[0] === bounds[bounds.length - 1] && bounds[0] === max) {
			recent = 0;
		} else {
			recent = bounds.length - 1;
		}

		this.state = {
			handle: null,
			recent,
			bounds,
			tooltipsOffset : [] //
		};
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	componentWillReceiveProps(nextProps) {
		if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) {
			return;
		}

		const {bounds} = this.state;
		if (nextProps.range) {
			const value = nextProps.value || bounds;
			const nextBounds = value.map(v => this.trimAlignValue(v, nextProps));
			if (nextBounds.every((v, i) => v === bounds[i])) {
				return;
			}

			this.setState({bounds: nextBounds});
			if (bounds.some(v => this.isValueOutOfBounds(v, nextProps))) {
				this.props.onChange(nextBounds);
			}
		} else {
			const value = nextProps.value !== undefined ? nextProps.value : bounds[1];
			const nextValue = this.trimAlignValue(value, nextProps);
			if (nextValue === bounds[1] && bounds[0] === nextProps.min) {
				return;
			}

			this.setState({bounds: [nextProps.min, nextValue]});
			if (this.isValueOutOfBounds(bounds[1], nextProps)) {
				this.props.onChange(nextValue);
			}
		}
	}

	componentDidMount() {
		const tip1 = this.refs['handle-0'] && this.refs['handle-0'].refs['tooltip-0'].clientWidth || 0,
			tip2 = this.refs['handle-1'] && this.refs['handle-1'].refs['tooltip-1'].clientWidth || 0;
		this.setState({tooltipsOffset: [`-${tip1/2}px`,`-${tip2/2}px`]});
	}

	onChange(state) {
		const props = this.props;
		const isNotControlled = !('value' in props);
		const tip1 = this.refs['handle-0'] && this.refs['handle-0'].refs['tooltip-0'].clientWidth || 0,
			tip2 = this.refs['handle-1'] && this.refs['handle-1'].refs['tooltip-1'].clientWidth || 0;
		this.setState({tooltipsOffset: [`-${tip1/2}px`,`-${tip2/2}px`]});
		if (isNotControlled) {
			this.setState(Object.assign({},state,{tooltipsOffset: [`-${tip1/2}px`,`-${tip2/2}px`]}));
		} else if (state.handle !== undefined) {
			this.setState({ handle: state.handle ,tooltipsOffset: [`-${tip1/2}px`,`-${tip2/2}px`]});
		}

		const data = { ...this.state, ...state };
		const changedValue = props.range ? data.bounds : data.bounds[1];
		props.onChange(changedValue);
	}

	onMouseDown(e) {
		if (e.button !== 0) {
			return;
		}

		let position = getMousePosition(this.props.vertical, e);
		if (!this.isEventFromHandle(e)) {
			this.dragOffset = 0;
		} else {
			const handlePosition = getHandleCenterPosition(this.props.vertical, e.target);
			this.dragOffset = position - handlePosition;
			position = handlePosition;
		}

		this.onStart(position);
		this.addDocumentEvents('mouse');
		pauseEvent(e);
	}

	onMouseMove(e) {
		const position = getMousePosition(this.props.vertical, e);
		this.onMove(e, position - this.dragOffset);
	}

	onMove(e, position) {
		pauseEvent(e);
		const props = this.props;
		const state = this.state;

		let diffPosition = position - this.startPosition;
		diffPosition = this.props.vertical ? -diffPosition : diffPosition;
		const diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);

		const value = this.trimAlignValue(this.startValue + diffValue);
		const oldValue = state.bounds[state.handle];
		if (value === oldValue) {
			return;
		}

		const nextBounds = [...state.bounds];
		nextBounds[state.handle] = value;
		let nextHandle = state.handle;
		if (props.pushable !== false) {
			const originalValue = state.bounds[nextHandle];
			this.pushSurroundingHandles(nextBounds, nextHandle, originalValue);
		} else if (props.allowCross) {
			nextBounds.sort((a, b) => a - b);
			nextHandle = nextBounds.indexOf(value);
		}
		this.onChange({
			handle: nextHandle,
			bounds: nextBounds
		});
	}

	onStart(position) {

		const props = this.props;
		props.onBeforeChange(this.getValue());

		const value = this.calcValueByPos(position);
		this.startValue = value;
		this.startPosition = position;

		const state = this.state;
		const { bounds } = state;

		let valueNeedChanging = 1;
		if (this.props.range) {
			let closestBound = 0;
			for (let i = 1; i < bounds.length - 1; ++i) {
				if (value > bounds[i]) {
					closestBound = i;
				}
			}
			if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
				closestBound = closestBound + 1;
			}
			valueNeedChanging = closestBound;

			const isAtTheSamePoint = (bounds[closestBound + 1] === bounds[closestBound]);
			if (isAtTheSamePoint) {
				valueNeedChanging = state.recent;
			}

			if (isAtTheSamePoint && (value !== bounds[closestBound + 1])) {
				valueNeedChanging = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
			}
		}
		this.setState({
			handle: valueNeedChanging,
			recent: valueNeedChanging
		});

		const oldValue = state.bounds[valueNeedChanging];
		if (value === oldValue) {
			return;
		}

		const nextBounds = [...state.bounds];
		nextBounds[valueNeedChanging] = value;
		this.onChange({ bounds: nextBounds });
	}

	onTouchMove(e) {
		if (isNotTouchEvent(e)) {
			this.end('touch');
			return;
		}

		const position = getTouchPosition(this.props.vertical, e);
		this.onMove(e, position - this.dragOffset);
	}

	onTouchStart(e) {
		if (isNotTouchEvent(e)) {
			return;
		}

		let position = getTouchPosition(this.props.vertical, e);
		if (!this.isEventFromHandle(e)) {
			this.dragOffset = 0;
		} else {
			const handlePosition = getHandleCenterPosition(this.props.vertical, e.target);
			this.dragOffset = position - handlePosition;
			position = handlePosition;
		}
		this.onStart(position);
		this.addDocumentEvents('touch');
		pauseEvent(e);
	}

	/**
	 * Returns an array of possible slider points, taking into account both
	 * `marks` and `step`. The result is cached.
	 */
	getPoints() {
		const { marks, step, min, max } = this.props;
		const cache = this._getPointsCache;
		if (!cache || cache.marks !== marks || cache.step !== step) {
			const pointsObject = { ...marks };
			if (step !== null) {
				for (let point = min; point <= max; point += step) {
					pointsObject[point] = point;
				}
			}
			const points = Object.keys(pointsObject).map(parseFloat);
			points.sort((a, b) => a - b);
			this._getPointsCache = { marks, step, points };
		}
		return this._getPointsCache.points;
	}

	getPrecision(step) {
		const stepString = step.toString();
		let precision = 0;
		if (stepString.indexOf('.') >= 0) {
			precision = stepString.length - stepString.indexOf('.') - 1;
		}
		return precision;
	}

	getSliderLength() {
		const slider = this.refs.slider;
		if (!slider) {
			return 0;
		}

		return this.props.vertical ? slider.clientHeight : slider.clientWidth;
	}

	getSliderStart() {
		const slider = this.refs.slider;
		const rect = slider.getBoundingClientRect();

		return this.props.vertical ? rect.top : rect.left;
	}

	getValue() {
		const { bounds } = this.state;
		return this.props.range ? bounds : bounds[1];
	}

	addDocumentEvents(type) {
		if (type === 'touch') {
			// just work for chrome iOS Safari and Android Browser
			this.onTouchMoveListener =
				addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
			this.onTouchUpListener =
				addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
		} else if (type === 'mouse') {
			this.onMouseMoveListener =
				addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
			this.onMouseUpListener =
				addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
		}
	}

	calcOffset(value) {
		const { min, max } = this.props;
		const ratio = (value - min) / (max - min);
		return ratio * 100;
	}

	calcValue(offset) {
		const { vertical, min, max } = this.props;
		const ratio = Math.abs(offset / this.getSliderLength());
		const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
		return value;
	}

	calcValueByPos(position) {
		const pixelOffset = position - this.getSliderStart();
		const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
		return nextValue;
	}

	end(type) {
		this.removeEvents(type);
		this.props.onAfterChange(this.getValue());
		this.setState({ handle: null });
	}

	isEventFromHandle(e) {
		return this.state.bounds.some((x, i) => (
			this.refs[`handle-${i}`] &&
			e.target === findDOMNode(this.refs[`handle-${i}`])
		));
	}

	isValueOutOfBounds(value, props) {
		return value < props.min || value > props.max;
	}

	pushHandle(bounds, handle, direction, amount) {
		const originalValue = bounds[handle];
		let currentValue = bounds[handle];
		while (direction * (currentValue - originalValue) < amount) {
			if (!this.pushHandleOnePoint(bounds, handle, direction)) {
				// can't push handle enough to create the needed `amount` gap, so we
				// revert its position to the original value
				bounds[handle] = originalValue;
				return false;
			}
			currentValue = bounds[handle];
		}
		// the handle was pushed enough to create the needed `amount` gap
		return true;
	}

	pushHandleOnePoint(bounds, handle, direction) {
		const points = this.getPoints();
		const pointIndex = points.indexOf(bounds[handle]);
		const nextPointIndex = pointIndex + direction;
		if (nextPointIndex >= points.length || nextPointIndex < 0) {
			// reached the minimum or maximum available point, can't push anymore
			return false;
		}
		const nextHandle = handle + direction;
		const nextValue = points[nextPointIndex];
		const { pushable: threshold } = this.props;
		const diffToNext = direction * (bounds[nextHandle] - nextValue);
		if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
			// couldn't push next handle, so we won't push this one either
			return false;
		}
		// push the handle
		bounds[handle] = nextValue;
		return true;
	}

	pushSurroundingHandles(bounds, handle, originalValue) {
		const { pushable: threshold } = this.props;
		const value = bounds[handle];

		let direction = 0;
		if (bounds[handle + 1] - value < threshold) {
			direction = +1;
		} else if (value - bounds[handle - 1] < threshold) {
			direction = -1;
		}

		if (direction === 0) {
			return;
		}

		const nextHandle = handle + direction;
		const diffToNext = direction * (bounds[nextHandle] - value);
		if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
			// revert to original value if pushing is impossible
			bounds[handle] = originalValue;
		}
	}

	removeEvents(type) {
		if (type === 'touch') {
			this.onTouchMoveListener.remove();
			this.onTouchUpListener.remove();
		} else if (type === 'mouse') {
			this.onMouseMoveListener.remove();
			this.onMouseUpListener.remove();
		}
	}

	trimAlignValue(v, nextProps) {
		const state = this.state || {};
		const { handle, bounds } = state;
		const { marks, step, min, max, allowCross } = { ...this.props, ...(nextProps || {}) };

		let val = v;
		if (val <= min) {
			val = min;
		}
		if (val >= max) {
			val = max;
		}
		/* eslint-disable eqeqeq */
		if (!allowCross && handle != null && handle > 0 && val <= bounds[handle - 1]) {
			val = bounds[handle - 1];
		}
		if (!allowCross && handle != null && handle < bounds.length - 1 && val >= bounds[handle + 1]) {
			val = bounds[handle + 1];
		}
		/* eslint-enable eqeqeq */

		const points = Object.keys(marks).map(parseFloat);
		if (step !== null) {
			const closestStep = (((val - min) / step) * step) + min;
			points.push(closestStep);
		}

		const diffs = points.map((point) => Math.abs(val - point));
		const closestPoint = points[diffs.indexOf(Math.min.apply(Math, diffs))];

		return step !== null ? parseFloat(closestPoint.toFixed(this.getPrecision(step))) : closestPoint;
	}

	render() {
		const {
			handle,
			bounds,
			tooltipsOffset
		} = this.state;
		const {
			className,
			title,
			prefixCls,
			tooltipPrefixCls,
			disabled,
			vertical,
			dots,
			included,
			range,
			step,
			marks,
			max, min,
			tipTransitionName,
			tipFormatter,
			children,
			type,
			uom
		} = this.props;

		const customHandle = this.props.handle;

		const offsets = bounds.map(v => this.calcOffset(v));

		const handleClassName = `${prefixCls}-handle`;

		const handlesClassNames = bounds.map((v, i) => classNames({
			[handleClassName]: true,
			[`${handleClassName}-${i + 1}`]: true,
			[`${handleClassName}-lower`]: i === 0,
			[`${handleClassName}-upper`]: i === bounds.length - 1
		}));

		const isNoTip = (step === null) || (tipFormatter === null);

		const commonHandleProps = {
			prefixCls,
			tooltipPrefixCls,
			noTip: isNoTip,
			tipTransitionName,
			tipFormatter,
			vertical
		};

		const handles = bounds.map((v, i) => {
			return cloneElement(customHandle, {
				...commonHandleProps,
				className: handlesClassNames[i],
				value: v,
				offset: offsets[i],
				dragging: handle === i,
				key: i,
				toolTipOffset:tooltipsOffset[i],
				handleKey:i,
				ref: `handle-${i}`,
				type: type,
				uom: uom
			});
		});
		if (!range) {
			handles.shift();
		}

		const isIncluded = included || range;

		const tracks = [];
		for (let i = 1; i < bounds.length; ++i) {
			const trackClassName = classNames({
				[`${prefixCls}-track`]: true,
				[`${prefixCls}-track-${i}`]: true
			});
			tracks.push(
				<Track className={trackClassName} vertical={vertical} included={isIncluded}
					   offset={offsets[i - 1]} length={offsets[i] - offsets[i - 1]} key={i}
				/>
			);
		}

		const sliderClassName = classNames({
			[prefixCls]: true,
			[`${prefixCls}-with-marks`]: Object.keys(marks).length,
			[`${prefixCls}-disabled`]: disabled,
			[`${prefixCls}-vertical`]: this.props.vertical,
			[className]: !!className
		});
		const { l } = this.context.i18n;
		const uomLabel = uom ? `(${l(uom)})` : '';
		return (
			<div>
				<span className={`${prefixCls}-title`}>{l(title.toUpperCase())} {uomLabel}</span>
				<div ref="slider" className={sliderClassName}
					 onTouchStart={disabled ? noop : this.onTouchStart.bind(this)}
					 onMouseDown={disabled ? noop : this.onMouseDown.bind(this)}
				>
					{/* <div className={`${prefixCls}-min ${prefixCls}-indicators`}>{min}</div>
					<div className={`${prefixCls}-max ${prefixCls}-indicators`}>{max}</div>*/}
					<div className={`${prefixCls}-rail`} />
					{tracks}
					<Steps prefixCls={prefixCls} vertical = {vertical} marks={marks} dots={dots} step={step}
						   included={isIncluded} lowerBound={bounds[0]}
						   upperBound={bounds[bounds.length - 1]} max={max} min={min}
					/>
					{handles}
					<Marks className={`${prefixCls}-mark`} vertical = {vertical} marks={marks}
						   included={isIncluded} lowerBound={bounds[0]}
						   upperBound={bounds[bounds.length - 1]} max={max} min={min}
					/>
					{children}
				</div>
			</div>
		);
	}
}

RangeSlider.propTypes = {
	title: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	defaultValue: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.arrayOf(PropTypes.number)
	]),
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.arrayOf(PropTypes.number)
	]),
	marks:PropTypes.object,
	included: PropTypes.bool,
	className: PropTypes.string,
	prefixCls: PropTypes.string,
	tooltipPrefixCls: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.any,
	onBeforeChange: PropTypes.func,
	onChange: PropTypes.func,
	onAfterChange: PropTypes.func,
	handle: PropTypes.element,
	tipTransitionName: PropTypes.string,
	tipFormatter: PropTypes.func,
	dots: PropTypes.bool,
	range: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number
	]),
	vertical: PropTypes.bool,
	allowCross: PropTypes.bool,
	pushable: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number
	])
};

RangeSlider.defaultProps = {
	prefixCls: 'rc-slider',
	className: '',
	tipTransitionName: '',
	min: 0,
	max: 100,
	step: 1,
	marks: {},
	handle: <DefaultHandle />,
	onBeforeChange: noop,
	onChange: noop,
	onAfterChange: noop,
	tipFormatter: value => value,
	included: true,
	disabled: false,
	dots: false,
	range: false,
	vertical: false,
	allowCross: true,
	pushable: false,
	title:''
};

export default RangeSlider;