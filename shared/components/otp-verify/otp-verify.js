import React, {Component } from 'react';
import PropTypes from 'prop-types';
import InputField from '../common/input-field/input-field';
import { Button } from '../common/button';
import Spinner from '../common/spinner/spinner';

export const loginMode = 'Log In';
export const registerMode = 'register';
export const forgotMode = 'Forgot Password';
export const verifyOTP = 'Verify OTP';
export const resetpassword = 'Reset Password';
/* import statuscodes from './statuscode.json';*/


export default class OTPVerify extends Component {
	static propTypes = {
		mode: PropTypes.string,
		onVerifyOTP: PropTypes.func,
		onResendOTP: PropTypes.func,
		otpmode: PropTypes.string,
		isFetching: PropTypes.bool,
		data: PropTypes.object
	};

	static defaultProps = {
		mode: loginMode,
		onVerifyOTP: ()=>{},
		onResendOTP: ()=>{},
		isFetching: false,
		data: {}
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			mode: props.mode,
			otpmode : props.otpmode,
			isFetching : props.isFetching,
			otpSubmitError: false,
			otp: undefined
		};

		this.keyPress = this.keyPress.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			mode: nextProps.mode,
			otpmode : nextProps.otpmode,
			isFetching : nextProps.isFetching
		});
	}

	componentDidMount() {
		document.addEventListener('keydown', this.keyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.keyPress);
	}

	keyPress(event) {
		if(event.keyCode === 13) {
			const { mode, otp } = this.state;
			this.validateOTP(mode,otp);
			return;
		}
	}

	validateOTP(mode,otp) {
		if(otp && otp.trim()) {
			this.props.onVerifyOTP && this.props.onVerifyOTP(mode, otp);
		}else {
			this.setState({
				otpSubmitError: true
			});
		}
	}

	renderVerifyScreen() {
		const { l } = this.context.i18n;
		const { data } = this.props;
		// const { changeMode, removeModal,user, resetpassword, register } = this.props;
		const {mode, otp, otpmode, isFetching, otpSubmitError } = this.state;
		/* let otp;
		if( mode === forgotMode) {
			otp = resetpassword.otp;
		} else if (mode === registerMode) {
			otp = register.otp;
		} else {
			otp = '';
		}*/
		const disable = isFetching ? 'disabled' : '';

		return (
			<div className="otp-verify login-reset email-step col-md-12">
				{ data && data.error && !isFetching &&
					<div className="alert alert-warning">{data.error}</div>
				}

				{ otpSubmitError &&
					<div className="alert alert-warning">{l('ENTEROTP')}</div>
				}
				<div className="col-md-12 col-sm-12 col-xs-12">
					{
						mode !== registerMode && <p className="login-icon">
							<i className="pe-7s-unlock" />
						</p>
					}

					<div className="text-center bottom-buffer">{l('VERIFYOTP')}</div>
					<p className="text-center">{l('VERIFYOTPDESCRIPTION')}</p>
				</div>
				<div className="col-md-12 col-sm-12 col-xs-12 otp-verify__input">
					<InputField placeholder="********" type="password" value="" onChange={(value) => {
						this.setState({
							otp : value
						});
					}} label={`${l('OTP')}`} />
				</div>
				<div className="col-md-12 col-sm-12 col-xs-12" style={{textAlign: 'center'}}>
					<Button className="toolbar-group save-search" disabled={disable} onClick={() => {
						this.validateOTP(mode, this.state.otp);
					}}>
						{/* isFetching && otpmode === 'verify' ? <Spinner /> : '' */}
						{l('VERIFYOTP')}
					</Button>
					<Button className="toolbar-group save-search" disabled={disable} onClick={() => {
						this.props.onResendOTP(mode);
					}}>
						{/* isFetching && otpmode === 'send' ? <Spinner /> : '' */}
						{l('RESENDOTP')}
					</Button>
				</div>
			</div>
		);
	}

	render() {
		/* const {resetpassword , register,user } = this.props;
		const { next } = resetpassword;
		const {mode} = this.state;
		const { l } = this.context.i18n;
		let btnText = mode;
		if (mode === forgotMode) {
			btnText = l('RESENDOTP');
		}*/

		return (
			<div>
				{this.renderVerifyScreen()}
			</div>
		);
	}
}



