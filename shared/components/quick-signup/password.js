import React  from 'react';
import { Button } from '../common/button';
import InputField from '../common/input-field/input-field';
import Spinner from '../common/spinner/spinner';
import Checkbox from '../common/checkbox/checkbox';
import { isDisable } from './util';

const PasswordScreen = ({ l , onChange, onSubmit, username, password, screenTitle, user, rememberFlg=true, isFetching, error_message, isBackRequired=true }) => {
	const disable = isDisable(isFetching,[username,password]) ? 'disabled' : '';
	return (
		<div className="login-screen col-md-12 col-sm-12  col-xs-12">
			<div className="lock-icon-wrapper">
				<p className="login-icon">
					<i className="pe-7s-unlock" />
				</p>

				<div className="text-center login-wrapper__screen-title">{l(screenTitle)}</div>
			</div>
			{ user.status === 'error' && user.error &&
			<div className="alert alert-warning">
				<div>{l(user.error.error_description||user.error.errorDescription)}</div>
			</div>
			}
			{ user.errorInfo &&
				<div className="alert alert-info">
					<div>{l(user.errorInfo.description)}</div>
				</div>
			}
			<div className="login-wrapper__inputs-wrap">
				<div className="col-md-12 col-sm-12 col-xs-12">
					<InputField placeholder="example@example.com" value={username} onChange={(value) => onChange({ username : value}) } label={`${l('EMAILID')}`} required/>
				</div>
				<div className="col-md-12 col-sm-12 col-xs-12">
					<InputField autoFocus={true} placeholder="********" type="password" value={password} onChange={(value) => onChange({ password : value})} label={`${l('PASSWORD')}`} required/>
				</div>
				<div className="col-md-12 col-sm-12 col-xs-12">
					<div className="col-md-5 col-sm-5 col-xs-12 no-padding-lr">
						<Checkbox label={l('REMEMBERME')} name="Remember" id="Remember" checked={rememberFlg} onChange={(evt) => onChange( { rememberFlg : evt.target.checked })}/>
					</div>
					<div className="col-md-7 col-sm-7 col-xs-12 no-padding-lr">
						<div className="btn-link btn-outline btn-forgotpassword">
							<button type="button" name="action" onClick={evt => onSubmit('onForgotPassword')} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label="Forgot Password">
								{l('FORGOTPASSWORD')}<i className="pe-7s-lock generic-icon-size" />
							</button>
						</div>
					</div>
				</div>
				<div className="action-btn-wrap text-center">
					<Button className="toolbar-group save-search" disabled={disable} onClick={evt => onSubmit()} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label="Login">
						{l('LOGIN')}
					</Button>
					{isBackRequired && <Button className="toolbar-group save-search" onClick={() => onSubmit('onBackToLogin')} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label="Back To Login">
						{l('BACK')}
					</Button>}
					{ isFetching ? <Spinner /> : '' }
				</div>
			</div>
		</div>
	);
};

export default PasswordScreen

