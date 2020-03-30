import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import RealtorOnlineIndicator from '../common/realtor-online-indicator';
import { findDOMNode } from 'react-dom';

export default class ContactAgent extends Component {
	constructor(props) {
		super(props);
		this.onToggleShowHide  = this.onToggleShowHide.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.handleBodyClick = this.handleBodyClick.bind(this);
		this.state = {
			showPopup : false
		};
	}
	static contextTypes = {
		awsImagePath : PropTypes.string,
		i18n : PropTypes.string
	};

	componentWillReceiveProps(props) {
		this.forceUpdate();
	}

	componentDidMount() {
		window.addEventListener('click', this.handleBodyClick);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
	}

	onToggleShowHide() {
		this.setState({
			showPopup : !this.state.showPopup
		})
	}

	closePopup() {
		this.setState({
			showPopup: false
		})
	}

	render() {
		const {
			className,
			chatUserStatus,
			owner, children } = this.props;
		const {  showPopup } = this.state;
		const { l } = this.context.i18n;
		return (
			<div className={Cx('contact-agent-wrap',className)}>
				<button className="contact-agent-wrap__action-btn btn btn-sm btn-default" onClick={this.onToggleShowHide}>
					<i className="pe-7s-Phone-number"/>
					{l('CONTACTLISTINGAGENT')}
					<RealtorOnlineIndicator online={typeof chatUserStatus[owner.id] === 'undefined' ? owner.canChat : chatUserStatus[owner.id]}/>
				</button>
				{showPopup && <div ref={(el)=>{this.popup = el}} className="contact-agent-wrap__popup-box">
					<button className="contact-agent-wrap__close-popup" onClick={this.closePopup}>
						<i className="pe-7s-close-3"/>
					</button>
					{children}
				</div>
				}
			</div>
		)
	}

	handleBodyClick(evt) {
		if(!findDOMNode(this).contains(evt.target)) {
			this.closePopup();
		}
	}
}
