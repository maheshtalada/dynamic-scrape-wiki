import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import InputField from '../common/input-field/input-field';
import { findDOMNode } from 'react-dom';
import { Button } from '../common/button';
import MobileOverlay from '../common/mobile-overlay/mobile-overlay';

export default class AnalyzeReturnsRequiredInfo extends Component {
	static propTypes = {

	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			show : props.show
		};
		this.handleBodyClick = this.handleBodyClick.bind(this);
		this.onClickAnalyze = this.onClickAnalyze.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			show: props.show
		})
	}

	componentDidMount() {
		window.addEventListener('click', this.handleBodyClick);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
	}

	onInputChange(key,val) {
		const regex = new RegExp("^(([0-9]{0,12}\\.[0-9]{1,4})|([0-9]{0,12})|(\\.[0-9]{1,4}))$");
		let invalid = false;
		if(!regex.test(val)) {
			invalid = true;
		}
		this.setState({
			[key]: val,
			isInvalidValue: invalid
		})
	}

	onClickAnalyze(e) {
		e.stopPropagation();
		const { fixupValue, rentValue } = this.state;
		this.props.onClickAnalyze({
			fixupValue,
			rentValue
		})
	}

	checkIfAnalyzeToEnable() {
		const { isInvalidValue, fixupValue, rentValue } = this.state;
		const { isFixupRequired, isRentRequired } = this.props;
		if(isInvalidValue) {
			return false;
		}
		if((isFixupRequired && !fixupValue) || (isRentRequired && !rentValue)) {
			return false;
		}
		return true;
	}

	renderInfoBox() {
		const { show, isInvalidValue, fixupValue, rentValue } = this.state;
		const { l } = this.context.i18n;
		const { isFixupRequired, isRentRequired, onClose,listingId } = this.props;
		const isEnableButton = this.checkIfAnalyzeToEnable();
		return (
			<div className={Cx("analyze-returns-popup",show ? 'show': 'hide')} onClick={e=>e.stopPropagation()}>
				<button aria-label="Close" className="analyze-returns-popup__close-btn" onClick={onClose}>
					<i className="pe-7s-close-3"/>
				</button>
				<h3>{l('ANALYZERETURNSREQUIREDINFOTITLE')}</h3>
				<div>
					{isFixupRequired && <div>
						<InputField id={`${listingId}-fixup-cost-analyze-returns`}placeholder={`${l('INITIALIMPROVEMENTCOST')} ($)`} required value={fixupValue} onChange={value => this.onInputChange("fixupValue",value)} label={`${l('INITIALIMPROVEMENTCOST')} ($)`}/>
					</div>}
					{isRentRequired && <div>
						<InputField id={`${listingId}-rent-potential-analyze-returns`} placeholder={`${l('MEDIANLEASEPRICEANALYSIS')} ($)`} required value={rentValue} onChange={value => this.onInputChange("rentValue",value)} label={`${l('MEDIANLEASEPRICEANALYSIS')} ($)`}/>
					</div>}
				</div>
				{isInvalidValue &&
				<div className="alert alert-warning">
					<div>{l('DECIMALUPTO4DIGIT')}</div>
				</div>
				}
				<div className="analyze-returns-popup__proceed-btn flex flex-justify-end">
					<Button disabled={!isEnableButton} onClick={this.onClickAnalyze}>{l('ANALYZE')}</Button>
				</div>
			</div>
		)
	}

	render() {
		const { showInfoInOverlay } = this.props;
		const { show } = this.state;
		return (
			(showInfoInOverlay && show) ? <MobileOverlay onCloseOverlay={()=>{
				this.setState({
					show : false
				})
			}}>
				{this.renderInfoBox()}
				</MobileOverlay> : this.renderInfoBox()
		)
	}

	handleBodyClick(evt) {
		if(!findDOMNode(this).contains(evt.target)) {
			this.props.onClose(evt);
		}
	}
}
