import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Messages from './statuscode.json';
import { find as __find } from 'lodash';
import Cx from 'classnames';
import { checkIfValidEmailId } from '../../utils/userUtilities';
import {
	REQUEST_GENERATE_OTP,
	REQUEST_VERIFY_OTP,
	REQUEST_SET_PASSWORD_VIA_EMAIL,
	REQUEST_USER_REGISTER_VERIFY_OTP,
	REQUEST_RESET_PASSWORD,
	REQUEST_USER_LOGIN,
	REQUEST_USER_LOOKUP
} from '../../redux/actions/user';
import  { UserScreen,
	OTPVerify,
	PasswordScreen,
	ResetPassword,
	NewUserRegister,
	WelcomeNotes,
	ActivateAccountSetPassword  } from '../quick-signup';

// screens
const SCREEN_LAYOUTS = {
	USER_SCREEN : UserScreen,
	OTP_SCREEN : OTPVerify,
	PASSWORD_SCREEN : PasswordScreen,
	RESET_SCREEN : ResetPassword,
	REGISTER_SCREEN : NewUserRegister,
	WELCOME_SCREEN : WelcomeNotes,
	ACTIVATE_ACCOUNT_SET_PASSWORD : ActivateAccountSetPassword
};



class Login extends Component {
	static propTypes = {
		mode: PropTypes.string,
		removeModal: PropTypes.func,
		isThirdPartyLogin: PropTypes.bool
	};

	static defaultProps = {
		//mode: loginMode,
		removeModal : ()=>{},
		isThirdPartyLogin: false
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	static getLayoutOption(screenStatus) {
		return __find(Messages, { 'status' : screenStatus });
	}

	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
		this.onActionSubmit = this.onActionSubmit.bind(this);
		this.onTermsSelect = this.onTermsSelect.bind(this);
		this.keyPress = this.keyPress.bind(this);
		const { userstatus, username, name, roleType } = props.user;
		this.state = {
			currentScreen : props.screen || 'USER_SCREEN',
			username : username,
			name,
			roleType,
			screenStatus : userstatus || 'DEFAULT_SCREEN',
			showEmailValidationError : false,
			loginContext : undefined
		};
	}

	componentWillReceiveProps(props) {
		const { userstatus = undefined, isFetching, lookupStatus = undefined, username, name, roleType } = props.user;
		const { screenStatus, loginContext } = this.state;
		if(props.user.isLogIn) {
			this.props.removeModal();
			if(props.unauthorizeErrorLogin) {
				window.location.reload();
			}
		}
		this.setState({
			currentStep : props.screen || 'USER_SCREEN',
			screenStatus : userstatus || screenStatus,
			loginContext : lookupStatus || loginContext,
			isFetching : isFetching,
			username : this.state.username || username,
			name,
			roleType
		});
	}

	componentDidMount() {
		document.addEventListener('keyup', this.keyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.keyPress);
	}

	keyPress(event) {
		if(event.keyCode === 13) {
			this.onActionSubmit();
		}
	}

	onForgotPassword() {
		const { username } = this.state;
		if(username) {
			this.setState({screenStatus : "FORGOT_PASSWORD"}, ()=>{
				this.props.dispatch(REQUEST_GENERATE_OTP({
					username : username
				}));
			})
		}
	}


	onBackToLogin() {
		this.setState({
			screenStatus : "DEFAULT_SCREEN"
		})
	}

	onVerifyOTP(stateObject={}) {
		const { username, otp } = this.state;
		if(username && otp) {
			this.props.dispatch(REQUEST_VERIFY_OTP({
				username : username,
				token : otp
			},stateObject));
		}
	}

	onRegisterVerifyOTP() {
		this.onReduxAction(REQUEST_USER_REGISTER_VERIFY_OTP,this.state.rememberFlg);
	}

	onResetPassword() {
		this.onReduxAction(REQUEST_RESET_PASSWORD,this.state.rememberFlg || true);
	}

	onSetPasswordViaEmail(actionObject,actionData) {
		this.props.dispatch(REQUEST_SET_PASSWORD_VIA_EMAIL({
			password : actionData.password,
			name : actionData.name,
			token : this.props.location.query.token,
			rememberFlg : actionData.rememberFlg
		}));
	}

	onReduxAction(action,rememberFlg) {
		const { username, otp, password } = this.state;
		if(username && otp) {
			this.props.dispatch(action({
				username : username,
				token : otp,
				password : password,
				rememberFlg
			}));
		}
	}

	onLogin() {
		const { username, password, rememberFlg = true } = this.state;

		if(username && password) {
			this.props.dispatch(REQUEST_USER_LOGIN({
				grant_type: 'password',
				username : username,
				password : password,
				remember : rememberFlg
			}));
		}
	}

	onGenerateOTP() {
		const { username } = this.state;
		if(username) {
			this.props.dispatch(REQUEST_GENERATE_OTP({
				username : username
			}));
		}
	}

	onIsUserExist() {
		const { username } = this.state;
		if(checkIfValidEmailId(username)) {
			this.props.dispatch(REQUEST_USER_LOOKUP({
				username : username
			}));
			this.setState({
				showEmailValidationError : false
			})
		} else {
			this.setState({
				showEmailValidationError : true
			})
		}
	}

	onInputChange(stateParam) {
		this.setState(stateParam);
	}

	onActionSubmit(action,actionData) {
		const {actionObject, screenStatus} = this.state;
		const layoutOption = action ? {action} : Login.getLayoutOption(screenStatus);
		if(typeof this[layoutOption.action] === 'function') {
			this[layoutOption.action](actionObject,actionData);
		}
	}

	onPreviousClick() {
		//this.setState()
	}

	getCurrentStep() {
		const  { currentScreen, screenStatus } = this.state;
		if(screenStatus) {
			const layoutOption = Login.getLayoutOption(screenStatus);
			return {
				componentConfig : layoutOption,
				component : SCREEN_LAYOUTS[layoutOption['screen']]};
		}

		return {
			component : SCREEN_LAYOUTS[currentScreen.data]
		};
	}

	render() {
		const componentData = this.getCurrentStep();
		const ComponentStep = componentData.component;
		const componentConfig = componentData.componentConfig;
		const { l } = this.context.i18n;
		return (
        	<div className={Cx("login-wrapper",this.props.className)}>
				{/*<WelcomeNotes l={l} note={componentConfig.welcome_note}/>*/}
				<ComponentStep
					l={l}
					{...this.props}
					{...this.state}
					{...componentConfig}
					onChange={this.onInputChange}
					onSubmit={this.onActionSubmit}
					onAgreeTerms={this.onTermsSelect}
				/>
			</div>
		);
	}

	onTermsSelect(checked) {
		this.setState({
			isAgreeTerms : checked
		});
	}

}

export default Login;

