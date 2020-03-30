import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import BasePageAction from 'lib/BasePageAction';
import Select from 'components/common/select/select';
import { sortBy as _sortBy, debounce } from 'lodash';

const MAX_FOOTER_OPTIONS_DISPLAY = 4;

export default class MobileFooterOptions extends BasePageAction {

	static propTypes = {
		isSearchRequired : PropTypes.bool
	};

	static defaultProps = {
		isSearchRequired : true
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	static getFooterOptions(options) {
		if(!options) {
			return;
		}

		if(options.length <= MAX_FOOTER_OPTIONS_DISPLAY) {
			return options;
		} else{
			return options.slice(0, MAX_FOOTER_OPTIONS_DISPLAY - 1);
		}
	}

	static getMoreOptions(options) {
		if(!options) {
			return;
		}
		return options.slice( MAX_FOOTER_OPTIONS_DISPLAY - 1 );
	}

	static isMoreOptions(options) {
		if(!options) {
			return;
		}
		if(options.length > MAX_FOOTER_OPTIONS_DISPLAY) {
			return true;
		}
		return false;
	}

	constructor(props) {
		super(props);
		const { options = null } = props;
		this.state = {
			showMoreOptions : false,
			showSearch : false,
			footerOptions : MobileFooterOptions.getFooterOptions(options),
			isMoreOptions : MobileFooterOptions.isMoreOptions(options),
			moreOptions :  options && options.length > MAX_FOOTER_OPTIONS_DISPLAY ? MobileFooterOptions.getMoreOptions(options) : null
		};
		this.toggleMoreOptions = this.toggleMoreOptions.bind(this);
		this.toggleSearch = this.toggleSearch.bind(this);
		this.hideFooter = this.hideFooter.bind(this);
		this.showFooter = debounce(this.showFooter,1000).bind(this);
		this.onTouchMovePage = this.onTouchMovePage.bind(this);
		this.prevPageYOffset = 0;
	}

	toggleMoreOptions() {
		this.setState({
			showMoreOptions : !this.state.showMoreOptions
		})
	}

	toggleSearch() {
		this.setState({
			showSearch : !this.state.showSearch
		})
	}

	componentDidMount() {
		// bind events that trigger hide footer on certain actions
		/*  events
				- scroll page
				- open hamburger menus
		*/
		window.addEventListener('touchmove' , this.onTouchMovePage)
		window.addEventListener('touchend' , this.showFooter)
	}

	componentWillUnmount() {
		//remove events
		window.removeEventListener('touchmove' , this.onTouchMovePage)
		window.removeEventListener('touchend' , this.showFooter)
	}

	onTouchMovePage(evt) {
		//bind events to hide footer on certain actions
		//const diff = window.pageYOffset - this.prevPageYOffset;
		/*if(this.prevPageYOffset &&  this.prevPageYOffset > window.pageYOffset) {
			this.prevPageYOffset =  window.pageYOffset;
			return;
		}

		this.prevPageYOffset =  window.pageYOffset;*/
		this.hideFooter(this.prevPageYOffset);
	}

	hideFooter() {
		const { toggleClass } = this.state;
		if(toggleClass !== "mobile-footer-options__close") {
			this.setState({
				toggleClass : 'mobile-footer-options__close'
			})
		}
	}

	showFooter() {
		const { toggleClass } = this.state;
		if(toggleClass !== "mobile-footer-options__open") {
			this.setState({
				toggleClass: 'mobile-footer-options__open'
			})
		}
	}

	renderMoreOptions(options) {
		return (
			<div className="mobile-footer-options__option">
				<Select
					key="page-actions-options"
					btnClassName="btn btn-default mobile-footer-options__option__more-btn"
					wrapperCls="mobile-footer-options__option__more-wrapper"
					btnLabel={"MORE"}
					options={_sortBy(options,option => option.order)}
					name="property-sort"
					iconClass="more-option-icon pe-7s-more"
					isButton = {true}
					inputClasses="no-border"
					onChange={this.onActionClick}
				/>
			</div>
		)
	}

	renderFooterOption(option, l) {

		if(option.component) {
			return (
				<div className="mobile-footer-options__option">
					{option.icon && <i className={Cx('option__icon',option.icon)} />}
					{option.component}
				</div>
			)
		}

		return(
			<div className="mobile-footer-options__option">
				<button className="btn btn-default mobile-footer-options__option__more-btn" onClick={()=>this.onActionClick(option.value, option)}>
					{option.icon && <i className={Cx('option__icon',option.icon)} />}
					<span>{l(option.name)}</span>
				</button>
			</div>
		)
	}

	renderFooterOptions(footerOptions, l) {
		return footerOptions.map(option => this.renderFooterOption(option, l))
	}

	render() {
		const { className, options } = this.props;
		const { i18n : {l}} = this.context;
		const { footerOptions, isMoreOptions, moreOptions, toggleClass } = this.state;
		return (
			<div className={Cx("mobile-footer-options",className, toggleClass)}>
				{footerOptions && this.renderFooterOptions(footerOptions, l)}
				{isMoreOptions && this.renderMoreOptions(moreOptions)}
			</div>
		)
	}
}
