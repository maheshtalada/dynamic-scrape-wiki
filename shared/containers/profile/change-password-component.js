import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import Loader from '../../components/common/page-loader/loader';
import { Button } from '../../components/common/button';
import InputField from '../../components/common/input-field/input-field';
import { isEmpty } from 'lodash';
import { REQUEST_USER_LOGIN  } from '../../redux/actions/user';
import { USER_PROFILE_CHANGE_PASSWORD  } from '../../redux/actions/userprofile';


class ChangePasswordComponent extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			newPassword: '',
			oldPassword: '',
			confPassword: '',
			isSaving: false
		};
		this.onBlurNewPassword = this.onBlurNewPassword.bind(this);
		this.onSubmitPassword = this.onSubmitPassword.bind(this);
	}

	componentWillReceiveProps(props) {
		const { userPasswordChange, user } = props;
		const username = user.user.emailId || user.user.mobileNumber;
		const { newPassword, oldPassword, confPassword } = this.state;
		if(props) {
			if(!isEmpty(userPasswordChange)) {
				const passwordChangeSuccess = userPasswordChange.status === 'success';
				this.setState({
					passwordError : userPasswordChange.error && userPasswordChange.error.error_description,
					isSaving : userPasswordChange.isSaving,
					passwordSuccess : userPasswordChange.status === 'success',
					newPassword : passwordChangeSuccess ? '' : newPassword,
					oldPassword : passwordChangeSuccess ? '' : oldPassword,
					confPassword : passwordChangeSuccess ? '' : confPassword
				});
				if(passwordChangeSuccess) {
					const refreshKey = cookie.load('refreshkey') || ''
					this.props.dispatch(REQUEST_USER_LOGIN({
						grant_type: 'password',
						username : username,
						password : newPassword,
						userStateNotReset : true,
						remember : refreshKey ? true : false
					}));
				}
			}
		}
	}

	onChangePassword(key,val) {
		this.setState({
			[key] : val
		});
	}


	onBlurNewPassword(val) {
		const { l } = this.context.i18n;
		this.setState({
			passwordError : val.length < 6 ? `${l('MINLENGTH')} ${6}` : ''
		});
	}

	onSubmitPassword() {
		const { oldPassword, newPassword, confPassword } = this.state;
		if(!oldPassword || !newPassword || !confPassword) {
			return;
		}
		if(newPassword !== confPassword) {
			this.setState({
				passwordError : 'CONFIRMPASSWORDERROR'
			});
			return;
		}
		this.props.dispatch(USER_PROFILE_CHANGE_PASSWORD({
			dataPayload : {
				oldpassword : oldPassword,
				newpassword : newPassword,
				confnewpassword : confPassword
			}
		}));
	}

	render() {
		const { l } = this.context.i18n;
		const { passwordError, passwordSuccess, isSaving, oldPassword, newPassword, confPassword } = this.state;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__profile-wrapper">
					<div className="profile-page__layout__profile-section__profile-wrapper__header">
						<h1 className="profile-page__layout__profile-section__profile-wrapper__title">
							{l('CHANGEPASSWORD')}
						</h1>
					</div>
					{
						isSaving && <Loader/>
					}
					<div className="change-password-wrap">
						<InputField type="password" value={oldPassword} onChange={this.onChangePassword.bind(this,'oldPassword')} label={l('CURRENTPASSWORD')} required/>
						<InputField type="password" value={newPassword} onChange={this.onChangePassword.bind(this,'newPassword')} onBlur={this.onBlurNewPassword} label={l('NEWPASSWORD')} required/>
						<InputField type="password" value={confPassword} onChange={this.onChangePassword.bind(this,'confPassword')} label={l('CONFIRMPASSWORD')} required/>
						{passwordError && <div><span className="alert alert-warning">{l(passwordError)}</span></div> }
						{passwordSuccess && <div><span className="alert alert-success">{l('PASSWORDCHANGESUCCESS')}</span></div>}
						<Button btnClassName="btn-primary" onClick={this.onSubmitPassword}>{l('CHANGEPASSWORD')}</Button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userPasswordChange: userprofile.user_change_password
	};
};
export default connect(mapStateToProps)(ChangePasswordComponent);
