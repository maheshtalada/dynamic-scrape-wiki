import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { localeNumberFormat, handleLargeNumbers, getValueByLocale } from '../../../utils/localeUtil';
import { formatArea } from '../../../utils/searchUtil';
import ReactTooltip from 'react-tooltip';

class RangeSelect extends Component {
	static propTypes = {
		minValues : PropTypes.array,
		maxValues : PropTypes.array,
		onChange : PropTypes.func,
		uom : PropTypes.string,
		className : PropTypes.string,
		labelIcon : PropTypes.string,
		valueFormatter : PropTypes.func,
		isLastMaxValueOpen : PropTypes.bool,
		getContainerRef : PropTypes.func
	};

	static contextTypes = {
		i18n : PropTypes.object,
		country : PropTypes.string
	};

	static defaultProps = {
		minValues : [],
		maxValues : [],
		isLastMaxValueOpen : true,
		getContainerRef : ()=>{},
		analyticsData : {}
	};

	static areaFormatter(value,l,country,type) {
		const area = formatArea(value,l,country,'SQFT',1);
		return `${area.formattedValue} ${area.uom}${type === 'min' ? '+' : ''}`;
	};

	static percentFormatter(value,l,country,type) {
		return `${Math.round(value)}%${type === 'min' ? '+' : ''}`;
	};

	static priceFormatter(value,l,country,type) {
		const currencySymbol = getValueByLocale(country,'currencySymbol');
		return `${currencySymbol}${handleLargeNumbers(value,1)}${type === 'min' ? '+' : ''}`
	};

	static defaultFormatter(value,l,country,type) {
		return `${Math.round(value)}${type === 'min' ? '+' : ''}`
	}

	constructor(props) {
		super(props);
		this.state = {
			showMinValues : false,
			showMaxValues : false,
			minValue : props.selectedMinValue || '',
			maxValue : props.selectedMaxValue || '',
			minValues : props.minValues,
			maxValues : props.maxValues
		};
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onClickApply = this.onClickApply.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				minValue : props.selectedMinValue || '',
				maxValue : props.selectedMaxValue || '',
				minValues : props.minValues,
				maxValues : props.maxValues
			})
		}
	}

	ignoreInputBlur(flag) {
		this._ignoreBlur = flag;
	}

	onInputBlur(value,type) {
		if(this._ignoreBlur) {
			return;
		}
		if(value) {
			this.updateValues(value,type);
		}
		this.handleInputFocus();
	}

	onKeyUp(evt,value,type) {
		if(evt.keyCode === 13) {
			this.updateValues(value,type);
			this.handleInputFocus();
		}
	}

	onChange(value,type) {
		this.setState({
			'minValue' : type === 'min' ? this.getNumberValue(value) : this.state.minValue,
			'maxValue' : type === 'max' ? this.getNumberValue(value) : this.state.maxValue
		})
	}

	renderValue(val,type,isLastMaxValueAny) {
		const { l } = this.context.i18n;
		const { valueFormatter } = this.props;
		const { country } = this.context;
		if(isLastMaxValueAny) {
			return l('ANY');
		}
		return typeof RangeSelect[valueFormatter] === 'function' ?
			RangeSelect[valueFormatter](val,l,country,type,isLastMaxValueAny) :
			RangeSelect['defaultFormatter'](val,l,country,type,isLastMaxValueAny)
	}

	renderValues(values, type) {
		if(values.length == 0) return null;
		const { isLastMaxValueOpen, analyticsData } = this.props;
		return (
			values.map((val,index) => {
				const isLastMaxValueAny = type === 'max' && isLastMaxValueOpen  && index === values.length-1;
				return (
					<li key={index} data-tag-category={analyticsData.category}
					data-tag-action={analyticsData.action}
					data-tag-label={`${analyticsData.label} ${type} ${val}`} onClick={()=>this.onValueSelect(val,type,isLastMaxValueAny)}
						onMouseEnter={()=>{this.ignoreInputBlur(true)}}
						onMouseLeave={()=>{this.ignoreInputBlur(false)}}
						className={`range-select__select-wrap__value-items__item ${type}`}>
							{this.renderValue(val,type,isLastMaxValueAny)}
					</li>
				)
			})
		)
	}

	handleInputFocus(type) {
		this.setState({
			showMinValues : type === 'min',
			showMaxValues : type === 'max'
		});
	}

	getNumberValue(value) {
		return (value === 0 || !!value) ? Number(value.toString().replace(/[^0-9.]/g,'')) : '';
	}

	updateValues(value,type,cb,isLastMaxValueAny) {
		let numberValue = this.getNumberValue(value);
		const { minValue, maxValue, minValues, maxValues } = this.state;
		this.setState({
			minValue : type === 'min' ? numberValue : minValue,
			maxValue : type === 'max' ? numberValue : maxValue
		},()=>{
			typeof cb === 'function' && cb();
			const min = Number(this.state.minValue);
			const max = isLastMaxValueAny ? '' : this.state.maxValue;
			(type === 'min' || type === 'max') && this.props.onChange && this.props.onChange(min,max);
		});
	}

	onValueSelect(value,type,isLastMaxValueAny) {
		this.updateValues(Math.round(value),type,()=>{
			if(type === 'min') {
				this.state.maxValue === '' ? this.refs.maxInput.focus() : this.handleInputFocus();
				return;
			}
			this.state.minValue === '' ? this.refs.minInput.focus() : this.handleInputFocus();
		},isLastMaxValueAny);
		this.ignoreInputBlur(false);
	}

	onClickApply() {
		const { minValue, maxValue } = this.state;
		this.props.onClickApply(minValue,maxValue);
	}

	getDropdownClass(show,ref) {
		if(show) {
			if(this.props.getContainerRef() && (this.refs.parentWrap.getBoundingClientRect().bottom+this.refs[ref].clientHeight > this.props.getContainerRef().getBoundingClientRect().bottom)) {
				return 'show top';
			}
			return 'show bottom';
		}
		return '';
	}

	render() {
		const { showMinValues, showMaxValues, minValue, maxValue, minValues, maxValues } = this.state;
		const { className, uom, title, tooltipInfo, labelIcon, onClickApply, valueFormatter, onClear, analyticsData } = this.props;
		const { l } = this.context.i18n;
		const { country } = this.context;
		const uomText = uom ? `(${l(uom)})` : '';
		const label = l(title.toUpperCase());
		return (
			<div className={Cx('range-select',className)}>
				<div className="range-select__label flex flex-justify-between">
					<div>
						{labelIcon && <i className={`pe-7s-${labelIcon}`}/>}
						<label htmlFor={`${label}minInput`}>{`${label} ${uomText}`}</label>
						{tooltipInfo && <div data-for={`range-select-tooltip-${label}`} data-tip = {l(tooltipInfo)} className="tooltip-popup-icon">
							<i className="pe-7s-info"/>
						</div>}
					</div>
					{(minValue || maxValue) && onClear && <button className="search-by-name__clear btn btn-primary btn-xs" onClick={onClear}>{l('CLEAR')}</button>}
					<ReactTooltip id={`range-select-tooltip-${label}`}/>
				</div>
				<div ref="parentWrap" className="range-select__wrapper">
				<div className="range-select__select-wrap">
					<div className="range-select__select-wrap__input input-field">
						<input ref="minInput"
								id={`${label}minInput`}
							   placeholder={l('MINIMUM')}
							   type="text"
							   aria-label={`${label} minimum value`}
							   data-value={minValue}
							   data-tag-category={analyticsData.category}
							   data-tag-action="input change"
							   data-tag-label={`${analyticsData.label} range select min`}
							   value={localeNumberFormat(minValue,country)}
							   onKeyUp={(evt)=>{this.onKeyUp(evt,this.refs.minInput.value,'min')}}
							   onChange={(evt)=>{this.onChange(evt.target.value,'min')}}
							   onFocus={()=>{this.handleInputFocus('min')}}
							   onBlur={(evt)=>{this.onInputBlur(evt.target.value,'min')}}/>
						{/*<span className="range-select__select-wrap__input__uom">{l(uom)}</span>*/}
					</div>
					{showMinValues && <div ref="minDropdown" className={`range-select__select-wrap__value-items`}>
						<ul>
							{
								this.renderValues(minValues, 'min')
							}
						</ul>
					</div>}
				</div>
				<span className="range-select__separator"></span>
				<div className="range-select__select-wrap">
					<div className="range-select__select-wrap__input input-field">
						<input ref="maxInput"
								id={`${label}maxInput`}
								aria-label={`${label} maximum value`}
							   placeholder={l('MAXIMUM')}
							   type="text"
							   data-tag-category={analyticsData.category}
							   data-tag-action="input change"
							   data-tag-label={`${analyticsData.label} range select max`}
							   value={localeNumberFormat(maxValue,country)}
							   onChange={(evt)=>{this.onChange(evt.target.value,'max')}}
							   onKeyUp={(evt)=>{this.onKeyUp(evt,this.refs.maxInput.value,'max')}}
							   onFocus={()=>{this.handleInputFocus('max')}}
							   onBlur={(evt)=>{this.onInputBlur(evt.target.value,'max')}}/>
						{/*<span className="range-select__select-wrap__input__uom">{l(uom)}</span>*/}
					</div>
					{showMaxValues && <div ref="maxDropdown" className={`range-select__select-wrap__value-items`}>
						<ul>
							{
								this.renderValues(maxValues, 'max')
							}
						</ul>
					</div>}
				</div>
				</div>
				{(minValue || maxValue) && onClickApply && <div className="range-select__apply-btn">
					<button onClick={this.onClickApply}>
						<span>{l('APPLY')}</span>
					</button>
				</div>}
			</div>
		)
	}
}

export default RangeSelect
