import React from 'react';
import { Button } from '../common/button';
import InputField from '../common/input-field/input-field';
import Spinner from '../common/spinner/spinner';
import { isDisable } from './util';

const UserScreen = ({ l, onChange, onSubmit, isFetching = undefined, username, user, screenTitle, error_message, showEmailValidationError }) => {
	const disable = isDisable(isFetching,[username]) ? 'disabled' : '';
	return (
		<div className="login-screen col-md-12 col-sm-12 col-xs-12">
			<div className="lock-icon-wrapper">
				<p className="login-icon">
					<i className="pe-7s-unlock" />
				</p>
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
			{showEmailValidationError &&
			<div className="alert alert-warning">
				<div>{l('EMAILINVALIDERROR')}</div>
			</div>
			}
			<div className="login-wrapper__inputs-wrap">
				<div className="col-md-12 col-sm-12 col-xs-12">
					<InputField placeholder="example@example.com" value={username} onChange={value => onChange({username : value})} label={`${l('EMAILID')}`} required autoFocus={true}/>
				</div>
				{/*<div className="col-md-12 col-sm-12 col-xs-12">
					<div className="col-md-5 col-sm-5 col-xs-12 no-padding-lr">
						{<Checkbox label={l('REMEMBERME')} name="Remember" id="Remember" checked={rememberFlg} onChange={(evt) => onChange( { rememberFlg : evt.target.checked } , action)}/>}
					</div>
					<div className="col-md-7 col-sm-7 col-xs-12 no-padding-lr">
						<div className="btn-link btn-outline btn-forgotpassword">
							<button type="button" name="action" onClick={evt => onSubmit('onForgotPassword')}>
								{l('FORGOTPASSWORD')}<i className="pe-7s-lock generic-icon-size" />
							</button>
						</div>
					</div>
				</div>*/}
				<div className="action-btn-wrap">
					<Button className="toolbar-group save-search" disabled={disable} onClick={() => onSubmit()} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label="Login Next">
						{ isFetching ? <Spinner /> : '' }
						{l('NEXT')}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UserScreen

