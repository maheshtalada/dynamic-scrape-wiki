import React, { Component } from 'react';
import {modal} from 'react-redux-modal';
import loadable from '@loadable/component';
import Spinner from 'components/common/spinner/spinner';
import { REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL } from '../redux/actions/application';


const Login = loadable(() => import(/* webpackChunkName: 'quicksignup' */'components/login/login'),{
	LoadingComponent: Spinner,
});

export default class LoginBarrier extends Component {

	constructor(props) {
		super(props);
		this.redirectToLogin = this.redirectToLogin.bind(this);
		this.handleloginBarrierLink = this.handleloginBarrierLink.bind(this);
	}

	handleloginBarrierLink(route) {
		const { user } = this.props.user;
		if(user.isLogIn) {
			this.routeRedirect(route);
			return;
		}
		this.redirectToLogin('Log In',route);
	}

	routeRedirect(page) {
		this.context.router.push(page);
	}

	redirectToLogin(mode,linkAfterLogin) {
		let title = mode && mode.replace(/\s/g, '').toUpperCase();
		const { l } = this.context.i18n;
		this.updateRegisterLogin(linkAfterLogin);
		modal.add(Login,{
			title: l(title),
			size: 'custom login-modal',
			...this.props.user,
			dispatch:this.props.dispatch,
			hideTitleBar: false,
			hideCloseButton: false,
			changeMode: this.redirectToLogin,
			initial : true,
			screenSize : this.props.screenSize,
			location: this.props.location,
			mode
		});
	}

	updateRegisterLogin(link='') {
		const {pathname, search} = this.props.location;
		const url = link ? link : `${pathname}${search}`;
		this.props.dispatch(REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL({'registerLogin' : url}));
	}
}
