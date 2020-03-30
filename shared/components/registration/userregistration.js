import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, values, cloneDeep, sortBy, extend } from 'lodash';
import { Schema } from '../schema';
import Loader from '../common/page-loader/loader';
import LinearNavigation from '../common/linear-navigation/linear-navigation';
import ErrorBox from '../common/error-box/error-box';
import OTPVerify from '../otp-verify/otp-verify';
import TermsConditions from '../common/terms-conditions/terms-conditions';
import scrollToElement from '../../utils/scrollToUtil';
import { getValueByLocale } from '../../utils/localeUtil';
import { REQUEST_GET_USER_REGISTRATION_SCHEMA, REQUEST_ADD_USER_REGISTRATION_SCHEMA } from '../../redux/actions/schema';
import { REQUEST_USER_REGISTER_VERIFY_OTP, REQUEST_GENERATE_NON_VERIFIED_OTP } from '../../redux/actions/user';

const NEXT = 'next',
	FINISH = 'finish',
	OTP_MODE = 'otp',
	REGISTER_MODE = 'register',
	OTP_VERIFY_MODE = 'verify',
	OTP_RESEND_MODE = 'send';
class UserRegistration extends Component {

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
			mode: props.mode || REGISTER_MODE,
			otpmode:'',
			isAgreeTerms : false,
			termsError : false,
			otpData : {},
			isNew : true
		};

		this.onVerifyOTPClick = this.onVerifyOTPClick.bind(this);
		this.onResendOTPClick = this.onResendOTPClick.bind(this);
		this.onTermsSelect = this.onTermsSelect.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(REQUEST_GET_USER_REGISTRATION_SCHEMA({
			username : this.props.username
		}))
	}

	componentWillReceiveProps(props) {
		const { mode, isNew } = this.state;
		const { schema_get_userregistration={}, schema_save_user={} } = props;
		this.setState({
			schema_get_userregistration : schema_get_userregistration,
			mode : props.mode || REGISTER_MODE,
			isFetching: schema_get_userregistration.isFetching || schema_save_user.isFetching
		});
		if(this.props.location.state && this.props.location.state.key !== props.location.state.key) {
			this.setState({
				mode : REGISTER_MODE,
				isNew : true,
				modifiedValues : {}
			});
		}else if(mode === OTP_MODE) {
			this.validateOTPResponse(props);
		} else{
			!isNew && this.validateRegisterResponse(props);
		}
	}

	onSchemaChange(changeObject, hasErrors) {
		const {schema_get_userregistration} = this.state;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(schema_get_userregistration.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	renderSchema() {
		const { i18n, country } = this.context;
		const {schemaKey} = this.state;
		const { schema_get_userregistration } = this.state;
		if (isEmpty(schema_get_userregistration)) {
			return null;
		}
		let userRegistration = schema_get_userregistration.schemas,
			schemaInfo = schema_get_userregistration.schemaInfos,
			referenceData = schema_get_userregistration.referenceData,
			userRegistrationSchema = sortBy(values(userRegistration), (o)=> {
				return o.order;
			});
		return userRegistrationSchema.map((schemaData, index) => {
			return (
				<div className="schema-container-wrapper schema-border" id={`schema_${index}`}>
						<Schema
							l={i18n.l}
							country = {country}
							key={schemaKey}
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
			schemaLength = values(this.state.schema_get_userregistration.schemas).length,
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
				this.setState({
					username: this.state.modifiedValues[`user.${usernameAttr}`] || this.state.modifiedValues[`realtor.${usernameAttr}`] || this.state.modifiedValues[`professional.${usernameAttr}`],
					password: this.state.modifiedValues['user.password'] || this.state.modifiedValues['realtor.password'] || this.state.modifiedValues['professional.password'],
					isNew : false,
					isFetching : true
				});
				this.props.dispatch(REQUEST_ADD_USER_REGISTRATION_SCHEMA({
					payload: extend({},this.state.initialValues,this.state.modifiedValues)
				}));
			}

		} else {
			scrollToElement(`#${schemaGroups[0]}`);
			setTimeout(()=>{
				this.setState({
					termsError  : !this.state.isAgreeTerms
				});
			},500);
		}


	}

	onRegisterClick() {
		this.onSubmit();
	}

	onVerifyOTPClick( mode, otp) {
		const { username, password } = this.state;
		if(username !== '' && otp !== '') {
			this.props.dispatch(REQUEST_USER_REGISTER_VERIFY_OTP({
				username : username,
				token : otp,
				password : password,
				mode : 'register'
			}));
		}
		this.setState({ mode : OTP_MODE, otpmode : OTP_VERIFY_MODE});
	}

	onResendOTPClick() {
		const { username } = this.state;
		if(username !== '') {
			this.props.dispatch(REQUEST_GENERATE_NON_VERIFIED_OTP({
				username : username
			}));
		}
		this.setState({ mode : OTP_MODE, otpmode : OTP_RESEND_MODE});
	}

	onTermsSelect(checked) {
		this.setState({
			isAgreeTerms : checked,
			termsError  : !checked
		});
	}


	render() {
		const { l } = this.context.i18n;
		const { user } = this.props.user;
		const { isFetching, isError, errorCode, mode, otpmode, termsError, otpData, isAgreeTerms } = this.state;
		return (
			isFetching ? <Loader/> : <div className="schema-forms">
				{
					isError &&
					<ErrorBox l={l} errorCode={errorCode}/>
				}
				{
					mode === REGISTER_MODE && <div>
						{this.renderSchema()}
						<TermsConditions
							link = "/registration/terms-and-conditions"
							linkText="TERMSCONDITIONS"
							termsTitle="TERMSCONDITIONSTITLE"
							onTermsSelect={this.onTermsSelect}
							isAgreeTerms = {isAgreeTerms}
							isError = {termsError}
						/>
						{ !isFetching && <LinearNavigation
								nextText="REGISTER"
								nextCaret={false}
								isBackRequired={false}
								className="linear-navigation--light-theme"
								isSaveExitRequired={false}
								onNext={this.onRegisterClick.bind(this)}
							/>
						}
					</div>

				}
				{
					mode === OTP_MODE && <OTPVerify
						mode={REGISTER_MODE}
						otpmode={otpmode}
						data = {otpData}
						isFetching = {isFetching}
						onVerifyOTP= {this.onVerifyOTPClick}
						onResendOTP= {this.onResendOTPClick}
					/>
				}
			</div>
		);

	}

	validateOTPResponse(props) {
		const { otpmode, mode } = this.state;
		if(otpmode === OTP_VERIFY_MODE && !props.user.isFetching ) {
			// check OTP verification error
			console.log(props.user);
			if(props.user.register.otp.error) {
				this.setState({
					isFetching : props.user.isFetching,
					otpData : props.user.register.otp
				});
			} else {
				this.setState({isFetching : props.user.isFetching},()=>{
					if(props.registerRedirectUrl.indexOf('/register/') < 0 ) {
						this.context.router.push(props.registerRedirectUrl);
					} else {
						this.context.router.push('/');
					}
				});
			}
		}else {
			this.setState({isFetching : props.user.isFetching});
		}
	}

	validateRegisterResponse(props) {
		const { otpmode, mode } = this.state;
		if(props.schema_save_user && props.schema_save_user.error) {
			window.scrollTo(0, 0);
			this.setState({
				isError : true,
				errorCode : props.schema_save_user.error.errorDescription.replace('_',''),
			});
		} else if(props.schema_save_user && !props.schema_save_user.isFetching) {
			this.setState({
				isError : false,
				mode: OTP_MODE
			});
		}
	}

}

const mapStateToProps = ({schema}) => {
	const { schema_save_userregistration, schema_get_userregistration } = schema;

	return {
		'schema_save_user': schema_save_userregistration,
		'schema_get_userregistration': schema_get_userregistration
	};
};

export default connect(mapStateToProps)(UserRegistration);


