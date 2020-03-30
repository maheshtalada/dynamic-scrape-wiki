import React from 'react';
import { Button } from '../common/button';
import InputField from '../common/input-field/input-field';
import Spinner from '../common/spinner/spinner';
import { isDisable, getConditionalScreen, getDataTagLabel } from './util';

const OTPVerify = ({ l, onChange, onSubmit, isFetching, screenTitle, otp, user, screenStatus, error_message, message='', welcome_note={}, isBackRequired=true }) => {
	const dataLabel = getDataTagLabel(screenStatus);
	const disable = isDisable(isFetching,[otp]) ? 'disabled' : '';

	return (
		<div className="login-reset email-step col-md-12 col-sm-12  col-xs-12">
			<div className="lock-icon-wrapper">
				<p className="login-icon">
					<i className="pe-7s-unlock" />
				</p>
				<div className="text-center login-wrapper__screen-title">{l(screenTitle)}</div>
				<div className="application-description">
					<p>{l(welcome_note.line1)}</p>
				</div>
				{ user.status === 'error' && user.error &&
					<div className="alert alert-warning">
						<div>{l(user.error.error_description||user.error.errorDescription)}</div>
					</div>
				}
			</div>
			<div className="login-wrapper__inputs-wrap">
			<div className="col-md-12 col-sm-12 col-xs-12">
				<InputField autoFocus={true} placeholder="********" type="text" value="" onChange={value => onChange({otp : value, actionObject : getConditionalScreen(screenStatus)})} label={`${l('OTP')}`} required />
			</div>
			<div className="action-btn-wrap col-md-12 col-sm-12 col-xs-12">
				<Button className="toolbar-group save-search" disabled={disable} onClick={() => onSubmit()} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label={dataLabel}>
					{l('CONFIRM')}
				</Button>
				<Button className="toolbar-group save-search" disabled={isFetching ? 'disabled' : ''} onClick={() => onSubmit('onGenerateOTP')} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label="OTP Resend">
					{l('RESENDOTP')}
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

export default OTPVerify;

