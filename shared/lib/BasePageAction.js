import React, { Component } from 'react';
import LoginBarrier from 'lib/LoginBarrier';
import { REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL } from '../redux/actions/application';

export default class BasePageAction extends LoginBarrier {

	static isLoggedIn(user) {
		return user.isLogIn
	}

	static generateActionPayLoad(actionComponent, actionOption) {
		if(actionOption.isPostLoginSubmit) {
			return {
				actionSubmit : actionOption.isPostLoginSubmit
			}
		}
		if(!actionOption.type) {
			return { actionComponentPayLoad : {actionComponent , actionsModalTitle : actionOption.name }}
		}

		if(actionOption.type === 'extraPayLoad') {
			return {actionComponentPayLoad : {
				actionComponent,
				actionsModalTitle : actionOption.name,
				...actionOption.extraPayLoad
			}}
		}
	}

	constructor(props) {
		super(props);
		this.onActionClick = this.onActionClick.bind(this);
	}

	componentWillReceiveProps(newProps) {}

	onActionClick(value, optionObject) {
		const payLoad = BasePageAction.generateActionPayLoad(value,optionObject);
		// check if actions required login or not
		// if login require open login modal
		// and update action handler modal to be launched post login
		// if not open action modal
		if(payLoad.actionSubmit){
			this.isSubmitAction = true;
			this.submitAction = payLoad.actionSubmit;
		}
		const { user : { user } } = this.props;
		if(optionObject.isLoginRequired) {
			if(BasePageAction.isLoggedIn(user)){
				this.updateRegisterLogin(payLoad)
			} else {
				this.redirectToLogin('Log In',payLoad);
			}
		} else {
			this.updateRegisterLogin(payLoad)
		}
	}

	updateRegisterLogin(payLoad) {
		payLoad && this.props.dispatch(REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL(payLoad));
	}

}

