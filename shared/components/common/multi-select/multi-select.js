import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckboxList from '../checkbox-list/checkbox-list';
import { findDOMNode } from 'react-dom';
import Cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import { Scrollbars } from 'react-custom-scrollbars';
import { findIndex as _findIndex } from 'lodash';
import { replaceHyphenWithSpace } from '../../../utils/searchUtil';

export default class MultiSelect extends Component {

	static propTypes = {
		items : PropTypes.array,
		selectedValues : PropTypes.string,
		label : PropTypes.string,
		disable : PropTypes.bool,
		labelIcon : PropTypes.string,
		getContainerRef : PropTypes.func
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	static defaultProps = {
		selectedValues : '',
		disable : false,
		isTranslationRequired : true,
		getContainerRef : ()=>{},
		analyticsData : {}
	};

	static getUpdatedSelectedValues(selectedValues,items) {
		return selectedValues.filter(value => {
			return _findIndex(items.buckets,(item) => item.key === value) >= 0
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			selectedValues : props.selectedValues || [],
			showDropdown: false
		};
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.handleBodyClick = this.handleBodyClick.bind(this);
	}

	componentDidMount() {
		window.addEventListener('click',this.handleBodyClick);
	}

	componentWillUnmount() {
		window.removeEventListener('click',this.handleBodyClick);
	}

	toggleDropdown() {
		if(this.props.disable) {
			return;
		}
		this.setState({
			showDropdown : !this.state.showDropdown
		});
	}

	componentWillReceiveProps(props) {
		this.forceUpdate();
	}

	getDropdownClass(show) {
		if(show) {
			if(this.props.getContainerRef() && (this.refs.selectButton.getBoundingClientRect().bottom+this.refs.dropdown.clientHeight > this.props.getContainerRef().getBoundingClientRect().bottom)) {
				return 'show top';
			}
			return 'show bottom';
		}
		return '';
	}

	cityNameFormatter(val) {
		return replaceHyphenWithSpace(val);
	}

	render() {
		const { showDropdown } = this.state;
		const { label, selectedValues, className, tooltipInfo, items, disable, labelIcon, isTranslationRequired, legalInfo, displayFormatter, analyticsData } = this.props;
		const { l } = this.context.i18n;
		const updatedSelectedValues = MultiSelect.getUpdatedSelectedValues(selectedValues[items.name].split(','),items);
		const displayValues = updatedSelectedValues.map(val => {
			let formattedVal = val;
			formattedVal = isTranslationRequired ? l(val.toUpperCase()) : displayFormatter ? this[displayFormatter](val) : val.toLowerCase();

			return formattedVal
		}).join(',');
		return (
			<div className={Cx("multi-select",className)}>
				<div className="multi-select__label">
					{labelIcon && <i className={`pe-7s-${labelIcon}`}/>}
					{l(label.toUpperCase())}
					{tooltipInfo && <div data-for={`multi-select-tooltip-${label}`} data-tip = {l(tooltipInfo)} className="tooltip-popup-icon">
						<i className="pe-7s-info"/>
					</div>}
					<ReactTooltip id={`multi-select-tooltip-${label}`}/>
				</div>
				<div ref="dropdownWrap">
					<button ref="selectButton" data-tag-category={analyticsData.category} data-tag-action={analyticsData.action} data-tag-label={`${analyticsData.label} dropdown`} className={`btn btn-default multi-select__btn ${disable ? 'disabled' : ''}`}disabled={disable ? 'disabled' : ''} title={displayValues || l(label.toUpperCase())} onClick={this.toggleDropdown}>
						<div className="multi-select__btn__btn-value">{displayValues || l(label.toUpperCase())}</div>
						<i className={`pe-7s-angle-${showDropdown ? 'up' : 'down'}`}/>
					</button>
					{showDropdown && <div ref="dropdown" className={`multi-select__dropdown`}>
						{legalInfo && <a className="legal-info" target="_blank" rel="noopener noreferrer" href={legalInfo.siteUrl}><img src={legalInfo.imageUrl} alt={legalInfo.imageAlt}/></a>}
						<Scrollbars className="scrollbars" autoHeight={true} autoHeightMax={300}>
							<CheckboxList {...this.props}/>
						</Scrollbars>
					</div>}
				</div>
			</div>
		)
	}

	handleBodyClick(evt) {
		if(!findDOMNode(this.refs.dropdownWrap).contains(evt.target)) {
			this.setState({
				showDropdown: false
			});
		}
	}
}
