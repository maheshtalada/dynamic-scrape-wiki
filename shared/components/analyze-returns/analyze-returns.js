import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import AnalyzeReturnsRequiredInfoBox from './analyze-returns-required-info';
import { buildQueryObject } from 'utils/searchUtil';
import ReactTooltip from 'react-tooltip';
import { getAbsoluteUrl } from 'utils/urlUtil';

export default class AnalyzeReturns extends Component {

	static propTypes = {
		listingId : PropTypes.string,
		showBtnText: PropTypes.bool,
		isValueAdd: PropTypes.bool,
		isRentPotentialRequired: PropTypes.bool,
		openLinkInNewTab: PropTypes.bool,
		btnClassName : PropTypes.string
	};

	static contextTypes = {
		i18n : PropTypes.object,
		pageContext : PropTypes.string,
		screenSize : PropTypes.number,
		router : PropTypes.object
	};

	static defaultProps = {
		showBtnText: true,
		openLinkInNewTab : false,
		btnClassName : 'btn btn-default'
	};

	constructor(props) {
		super(props);
		this.redirectToAnalyzeReturns = this.redirectToAnalyzeReturns.bind(this);
		this.onClickBtn = this.onClickBtn.bind(this);
		this.proceedWithAnalyze = this.proceedWithAnalyze.bind(this);
		this.onCloseInfoBox = this.onCloseInfoBox.bind(this);
		this.state = {
			isPopupRequired : props.isValueAdd || props.isRentPotentialRequired
		}
	}

	onClickBtn(e) {
		e.stopPropagation();
		const { isValueAdd, isRentPotentialRequired} = this.props;
		const { fixupValue, rentValue } = this.state;
		if((isValueAdd && fixupValue === undefined) || (isRentPotentialRequired && rentValue === undefined)) {
			this.setState({
				showPopup : true
			})
		} else {
			this.redirectToAnalyzeReturns();
		}
	}

	proceedWithAnalyze(info) {
		this.setState({
			fixupValue : info.fixupValue,
			rentValue : info.rentValue,
			showPopup: false
		},()=>{
			this.redirectToAnalyzeReturns();
		})
	}

	onCloseInfoBox(e) {
		e.stopPropagation();
		this.setState({
			showPopup: false
		})
	}

	redirectToAnalyzeReturns() {
		const { fixupValue, rentValue } = this.state;
		const { purchaseType } = this.props;
		this.context.router.push({
			pathname : `${this.props.listingUrl}/analyze-return`,
			query : buildQueryObject({
				fixupcost : fixupValue,
				rent : rentValue,
				purchasetype : (purchaseType !== 'leveraged') ? "" : "leveragedPurchase"
			})
		})
	}	

	renderButtonContent() {
		const { showBtnText } = this.props;
		const { l } = this.context.i18n;
		return (
			<Fragment>
				<i className="pe-7s-analyze-returns" data-tip={`${showBtnText ? '' : l('CALCULATERETURN')}`}/>
				{showBtnText && <span className="return-calculate-btn__text">{l('CALCULATERETURN')}</span>}
			</Fragment>
		);
	}

	render() {
		const { className, showBtnText, isValueAdd, isRentPotentialRequired, listingId, showInfoInOverlay, listingUrl, purchaseType, openLinkInNewTab, btnClassName } = this.props;
		const { i18n: {l}, pageContext } = this.context;
		const { showPopup } = this.state;
		return (
			<div className="analyze-returns-btn-wrap">
				<a data-tip={l('ANALYZERETURNSBUTTONTOOLTIP')} className={Cx("",btnClassName,className)} target={openLinkInNewTab ? '_blank': ''} href={getAbsoluteUrl(`${listingUrl}/analyze-return${(purchaseType !== 'leveraged') ? "" : "?purchasetype=leveragedPurchase"}`)}>
					{this.renderButtonContent()}
				</a>
				<ReactTooltip/>
				{ (isValueAdd || isRentPotentialRequired) &&
					<AnalyzeReturnsRequiredInfoBox show={showPopup}
													showInfoInOverlay={showInfoInOverlay}
													listingId={listingId}
												   onClose={this.onCloseInfoBox}
												   onClickAnalyze={this.proceedWithAnalyze}
												   isFixupRequired={isValueAdd}
												   isRentRequired={isRentPotentialRequired}/>
				}
			</div>
		)
	}
}
