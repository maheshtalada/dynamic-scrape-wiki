import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {modal} from 'react-redux-modal';
import EmailModal from '../components/common/email-modal';
import PhoneDetails from '../components/common/phone-details';
import LoginBarrier from '../lib/LoginBarrier';

const stepsAfterLogin = {
	EMAIL : 'addEmailModal',
	PHONE : 'addPhoneModal',
	CHAT : 'openChatWindow'
};

export default class ContactBarHandlers extends LoginBarrier {

	static responseHandlers = {
		[stepsAfterLogin.EMAIL](data) {
			if(this.timeOutInterval) {
				clearTimeout(this.timeOutInterval);
			}
			this.timeOutInterval = setTimeout(()=>{
				this.addEmailModal(data);
			},400);
		},
		[stepsAfterLogin.PHONE](data) {
			if(this.timeOutInterval) {
				clearTimeout(this.timeOutInterval);
			}
			this.timeOutInterval = setTimeout(()=>{
				this.addPhoneDetailsModal(data);
			},400);
		},
		[stepsAfterLogin.CHAT]() {
			if(this.timeOutInterval) {
				clearTimeout(this.timeOutInterval);
			}
			this.timeOutInterval = setTimeout(()=>{
				this.setState({
					stepAfterLogin : ''
				},()=>{
					this.initChatFunctionality();
				});
			},400);
		}
	};

	constructor(props) {
		super(props);
		this.handleViewPhoneOption = this.handleViewPhoneOption.bind(this);
		this.handleEmailOption = this.handleEmailOption.bind(this);
		this.handleChatOption = this.handleChatOption.bind(this);
		this.onActionFinished = this.onActionFinished.bind(this);
		this.hideEmailNotif = this.hideEmailNotif.bind(this);
	}

	handleEmailOption(info) {
		const { user } = this.props.user;
		let nextStep = '';
		if(user.isLogIn) {
			this.addEmailModal(info);
		} else {
			nextStep = 'addEmailModal';
			this.redirectToLogin('Log In');
		}
		this.setState({
			contactActiontype : info.actionType,
			stepAfterLogin : nextStep
		});
	}

	addEmailModal(info) {
		const { l } = this.context.i18n;
		this.setState({
			stepAfterLogin: '',
			isShowEmailSentNotification: false
		}, ()=>{
			modal.add(EmailModal,{
				context : this.props.context,
				contactedId : info.personId,
				dispatch: this.props.dispatch,
				size: 'medium',
				contactedName: info.personName,
				actionType: info.actionType,
				contextType: info.contextType,
				defaultMessage: info.defaultMsg,
				onActionFinished: this.onActionFinished,
				listingId: info.listingId,
				openHouseDate: info.openHouseDate,
				articleId: info.articleId,
				questionId: info.questionId
			});
		});
	}

	onActionFinished(action, isShowSnackBar) {
		isShowSnackBar && modal.clear();
		this.props.onActionFinished(action);
		this.setState({
			isShowEmailSentNotification : isShowSnackBar
		});
	}

	hideEmailNotif() {
		this.setState({
			isShowEmailSentNotification : false
		});
	}

	handleViewPhoneOption(info) {
		const { user } = this.props.user;
		let nextStep = '';
		if(user.isLogIn) {
			this.addPhoneDetailsModal(info);
		} else {
			nextStep = 'addPhoneModal';
			this.redirectToLogin('Log In');
		}
		this.setState({
			contactActiontype : info.actionType,
			stepAfterLogin : nextStep
		});
	}

	addPhoneDetailsModal(info) {
		const { l } = this.context.i18n;
		this.setState({
			stepAfterLogin : ''
		}, ()=> {
			modal.add(PhoneDetails,{
				context : this.props.context,
				dispatch: this.props.dispatch,
				actionType: info.actionType,
				contactedId: info.personId,
				size: 'phone-view',
				title: l('CONTACTNUMBERS'),
				contextType: info.contextType,
				onActionFinished: this.onActionFinished,
				listingId: info.listingId,
				articleId: info.articleId,
				questionId: info.questionId
			});
		});
	}

	handleChatOption(chatModal) {
		const { user } = this.props.user;
		let nextStep = '';
		if(user.isLogIn) {
			this.initChatFunctionality(chatModal);
		} else {
			nextStep = 'openChatWindow';
			this.redirectToLogin('Log In');
		}
		this.setState({
			stepAfterLogin: nextStep
		});
	}

}
