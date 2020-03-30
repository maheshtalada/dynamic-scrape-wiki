import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, handleLargeNumbers } from '../../../utils/localeUtil';


export default class Handle extends Component {
	constructor(props,ref) {
		super(props,ref);

		this.state = {
			isTooltipVisible: true
		};
	}

	renderHandleValue() {
		const { uom, type, value } = this.props;
		if(type === 'price') {
			return formatCurrency(value,1,uom);
		}
		if(type === 'area') {
			return handleLargeNumbers(value,1);
		}
		return (value && value % 1 !== 0) ? value.toFixed(2) : value;
	}

	render() {
		const {
			prefixCls,
			tooltipPrefixCls,
			className,
			tipTransitionName,
			tipFormatter,
			vertical,
			offset,
			value,
			dragging,
			noTip,
			toolTipOffset,
			handleKey,
			type
		} = this.props;

		const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
		const handle = (
			<div className={className} style={style}/>
		);

		if (noTip) {
			return handle;
		}

		const isTooltipVisible = dragging || this.state.isTooltipVisible;
		const toolTipStyle = Object.assign({},style,{'marginLeft' : toolTipOffset});
		return (
			<div className="rc-slider-ctr" style={{'position':'relative'}}>
				{handle}
				<div className="rc-slider-tooltip  rc-slider-tooltip-placement-top" style={toolTipStyle} ref={`tooltip-${handleKey}`}>
					<div className="rc-slider-tooltip-content">
						<div className="rc-slider-tooltip-arrow" />
						<div className="rc-slider-tooltip-inner">
							<span>{ this.renderHandleValue()}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


Handle.propTypes = {
	prefixCls: PropTypes.string,
	tooltipPrefixCls: PropTypes.string,
	className: PropTypes.string,
	vertical: PropTypes.bool,
	offset: PropTypes.number,
	tipTransitionName: PropTypes.string,
	tipFormatter: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	dragging: PropTypes.bool,
	noTip: PropTypes.bool
};
