import React from 'react';
import { Button } from '../common/button';
import InputField from '../common/input-field/input-field';
import { isDisable, isTermsAndCondtionsRequired, } from './util';
import TermsConditions from '../common/terms-conditions/terms-conditions';
import Spinner from '../common/spinner/spinner';
import Checkbox from '../common/checkbox/checkbox';

const ResetPassword = ({ loginContext, l , onChange, onSubmit, isFetching, screenTitle, password, user, onAgreeTerms, isAgreeTerms=false, isBackRequired=true, rememberFlg = true }) => {
	const isShowTerms = isTermsAndCondtionsRequired(loginContext);
	const disable = isDisable(isFetching,[password, (isShowTerms && !isAgreeTerms) ? '' : String(isAgreeTerms)]) ? 'disabled' : '';

	return (
		<div className="login-reset email-step col-md-12 col-sm-12  col-xs-12">
			<div className="lock-icon-wrapper">
				<p className="login-icon">
					<i className="pe-7s-unlock" />
				</p>
				<div className="text-center login-wrapper__screen-title">{l(screenTitle)}</div>
			</div>
			{ user.status === 'error' && user.error &&
			<div className="alert alert-warning">
				<div>{l(user.error.error_description || user.error.errorDescription)}</div>
			</div>
			}
			<div className="login-wrapper__inputs-wrap">
				<div className="col-md-12 col-sm-12 col-xs-12">
					<InputField autoFocus={true} placeholder="********" type="password" autoComplete="new-password" value="" onChange={value => onChange({password : value})} label={`${l('PASSWORD')}`} required />
					<Checkbox label={l('REMEMBERME')} name="Remember" id="Remember" checked={rememberFlg} onChange={(evt) => onChange( { rememberFlg : evt.target.checked })}/>
					{ isShowTerms && <TermsConditions
						link = "/terms-conditions"
						linkText="TERMSCONDITIONS"
						termsTitle="TERMSCONDITIONSTITLE"
						onTermsSelect={(checked)=>onAgreeTerms(checked)}
						isAgreeTerms = {isAgreeTerms}
					/>}
				</div>
				<div className="action-btn-wrap col-md-12 col-sm-12 col-xs-12">
					<Button className="toolbar-group save-search" disabled={disable} onClick={evt => onSubmit()} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label="Confirm Password">
						{l('CONFIRM')}
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

export default ResetPassword

