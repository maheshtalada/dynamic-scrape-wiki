import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values, cloneDeep, sortBy, extend } from 'lodash';
import { Schema } from '../schema';
import ErrorBox from '../common/error-box/error-box';
import TermsConditions from '../common/terms-conditions/terms-conditions';
import scrollToElement from '../../utils/scrollToUtil';
import { getValueByLocale } from '../../utils/localeUtil';
import { Button } from '../common/button';
import { REQUEST_ADD_USER_REGISTRATION_SCHEMA } from '../../redux/actions/schema';


const ROLE_SPECIFIC_ENDPOINT = {
	"REAL_ESTATE_INVESTOR" : "savesignupschema",
	"REALTOR" : "savesignupschema",
	"LOAN_OFFICER" : "savesignupschema",
	"INSURANCE_AGENT" : "savesignupschema",
	"PROPERTY_MANAGER" : "savesignupschema",
	"INCORPORATION_ATTORNEY" : "savesignupschema"
};

export default class NewUserRegister extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string
	};

	constructor(props) {
		super(props);
		// const { schema_get_userregistration } = props;
		this.state = {
			hasErrors: false,
			forceValidation: false,
			modifiedValues: {},
			initialValues: {},
			isError:false,
			errorCode:'',
			isAgreeTerms : false,
			termsError : false,
			isNew : true,
			rememberFlg : true
		};

		this.onTermsSelect = this.onTermsSelect.bind(this);
		this.onChangeRememberMe = this.onChangeRememberMe.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props.user.error) {
			this.setState({
				isError : true,
				errorCode : user.error.errorDescription.replace('_',''),
			});
		}
	}


	onSchemaChange(changeObject, hasErrors) {
		const { schema } = this.props.user;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(schema.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	renderSchema() {
		const { i18n, country } = this.context;
		const { schema } = this.props.user;
		if (isEmpty(schema)) {
			return null;
		}
		let userRegistration = schema.schemas,
			referenceData = schema.referenceData,
			userRegistrationSchema = sortBy(values(userRegistration), (o)=> {
				return o.order;
			});
		return userRegistrationSchema.map((schemaData, index) => {
			return (
				<div className="schema-container-wrapper schema-border" id={`schema_${index}`}>
					<Schema
						l={i18n.l}
						country = {country}
						ref={`schema_${index}`}
						data={schemaData}
						writeMode={true}
						onChange={this.onSchemaChange.bind(this)}
						modifiedValues={this.state.modifiedValues}
						initialValues={this.state.initialValues}
						referenceData={referenceData}
					/>
				</div>
			);
		});

	}

	onSubmit() {
		let schemasAreValid = true,
			schemaLength = values(this.props.user.schema.schemas).length,
			schemaGroups = [];
		const { country } = this.context;
		const usernameAttr = getValueByLocale(country,'username') || 'emailId';

		for (let i = 0; i < schemaLength; ++i) {
			if (!this.refs[`schema_${i}`].checkSubmissionValid()) {
				schemaGroups.push(`schema_${i}`);
				schemasAreValid = false;
			}
		}
		if (schemasAreValid) {

			if(!this.state.isAgreeTerms) {
				this.setState({
					termsError  : !this.state.isAgreeTerms
				});
			} else {
				/*this.setState({
					username: this.state.modifiedValues[`user.${usernameAttr}`] || this.state.modifiedValues[`realtor.${usernameAttr}`] || this.state.modifiedValues[`professional.${usernameAttr}`],
					password: this.state.modifiedValues['user.password'] || this.state.modifiedValues['realtor.password'] || this.state.modifiedValues['professional.password']
				});*/
				const userRole = this.state.modifiedValues['user.registrationType'] || this.state.initialValues['user.registrationType'];
				this.setState({
					isFetching: true
				});
				this.props.dispatch(REQUEST_ADD_USER_REGISTRATION_SCHEMA({
					payload: extend({},this.state.initialValues,this.state.modifiedValues,{ endpoint : ROLE_SPECIFIC_ENDPOINT[userRole], rememberFlg : this.state.rememberFlg})
				}));
				this.props.onChange({
					username: this.state.modifiedValues[`user.${usernameAttr}`] || this.state.modifiedValues[`realtor.${usernameAttr}`] || this.state.modifiedValues[`professional.${usernameAttr}`],
					password: this.state.modifiedValues['user.password'] || this.state.modifiedValues['realtor.password'] || this.state.modifiedValues['professional.password']
				}, 'register')
			}

		} else {
			scrollToElement(`#${schemaGroups[0]}`);
			setTimeout(()=>{
				this.setState({
					termsError  : !this.state.isAgreeTerms
				});
			},200);
		}
	}

	onRegisterClick() {
		this.onSubmit();
	}

	onTermsSelect(checked) {
		this.setState({
			isAgreeTerms : checked,
			termsError  : !checked
		});
	}

	onChangeRememberMe(evt) {
		this.setState({
			rememberFlg : evt.target.checked
		});
	}


	render() {
		const { l } = this.context.i18n;
		const { isFetching, isError, errorCode, termsError, isAgreeTerms, rememberFlg} = this.state;
		const disable = isFetching ? 'disabled' : '';
		return (
				<div className="schema-forms register-screen col-md-12 col-sm-12  col-xs-12">
				{
					isError &&
					<ErrorBox l={l} errorCode={errorCode}/>
				}
				<div>
						{this.renderSchema()}
						<TermsConditions
							link = "/terms-conditions"
							linkText="TERMSCONDITIONS"
							termsTitle="TERMSCONDITIONSTITLE"
							onTermsSelect={this.onTermsSelect}
							isAgreeTerms = {isAgreeTerms}
							isError = {termsError}
						/>
						<div className="action-btn-wrap text-center">
							<Button className="toolbar-group save-search" disabled={disable} onClick={evt => this.onRegisterClick()} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label="Register">
								{l('REGISTER')}
							</Button>
							<Button className="toolbar-group save-search" onClick={() => this.props.onSubmit('onBackToLogin')} data-tag-category="Quick Signup" data-tag-action="Click" data-tag-label="Back To Login">
								{l('BACK')}
							</Button>
						</div>
					</div>
			</div>
		);

	}
}

