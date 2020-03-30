import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, values, cloneDeep, sortBy, extend } from 'lodash';
import { Schema } from '../schema';
import Loader from '../common/page-loader/loader';
import LinearNavigation from '../common/linear-navigation/linear-navigation';
import ErrorBox from '../common/error-box/error-box';
import TermsConditions from '../common/terms-conditions/terms-conditions';
import scrollToElement from '../../utils/scrollToUtil';
import { REQUEST_ADD_COMPANY_REGISTRATION_SCHEMA } from '../../redux/actions/schema';


const NEXT = 'next',
	FINISH = 'finish',
	REGISTER_MODE = 'register';
class companyRegistration extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		const { schema_get_companyregistration } = props;
		this.state = {
			hasErrors: false,
			forceValidation: false,
			modifiedValues: {},
			initialValues: {},
			isFetching: schema_get_companyregistration && schema_get_companyregistration.isFetching,
			isError:false,
			errorCode:'',
			mode: props.mode,
			isAgreeTerms: false,
			termsError: false
		};
		this.onTermsSelect = this.onTermsSelect.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props.schema_save_company && props.schema_save_company.error) {
			window.scrollTo(0, 0);
			this.setState({
				isError : true,
				errorCode : props.schema_save_company.error_description,
				isFetching : props.schema_save_company.isFetching
			});
		} else if(props.schema_save_company && !props.schema_save_company.isFetching) {
			this.setState({
				isError : false,
				isFetching : props.schema_save_company.isFetching
			});
			this.context.router.push({
				pathname:props.schema_save_company.URL
			});
		} else if(props.schema_save_company && props.schema_save_company.isFetching) {
			this.setState({
				isFetching : props.schema_save_company.isFetching
			});
		}
	}

	onSchemaChange(changeObject, hasErrors) {
		const { schema_get_companyregistration } = this.props;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(schema_get_companyregistration.schema.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	renderSchema() {
		const { i18n, country } = this.context;
		const { schema_get_companyregistration } = this.props;
		const { schema } = schema_get_companyregistration;
		if (isEmpty(schema)) {
			return null;
		}
		let companyRegistration = schema.schemas,
			schemaInfo = schema.schemaInfos,
			referenceData = schema.referenceData,
			companyRegistrationSchema = sortBy(values(companyRegistration), (o)=> {
				return o.order;
			});
		return companyRegistrationSchema.map((schemaData, index) => {
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
			schemaLength = values(this.props.schema_get_companyregistration.schema.schemas).length,
			schemaGroups = [];

		for (let i = 0; i < schemaLength; ++i) {
			if (!this.refs[`schema_${i}`].checkSubmissionValid()) {
				schemaGroups.push(`schema_${i}`);
				schemasAreValid = false;
			}
		}
		if (schemasAreValid) {
			if(!this.state.isAgreeTerms) {
				this.setState({
					termsError: !this.state.isAgreeTerms
				});
			} else {
				this.props.dispatch(REQUEST_ADD_COMPANY_REGISTRATION_SCHEMA({
					payload: extend({},this.state.initialValues,this.state.modifiedValues),
					'companytype' : this.props.schema_get_companyregistration.companytype
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

	onTermsSelect(checked) {
		this.setState({
			isAgreeTerms : checked,
			termsError  : !checked
		});
	}

	render() {
		const { l } = this.context.i18n;
		// const { company } = this.props;
		const { isError, errorCode, mode , termsError} = this.state;
		const { isFetching } = this.props.schema_get_companyregistration;
		return (
			<div className="schema-forms">
				{
					isFetching &&
					<Loader/>
				}
				{
					isError &&
					<ErrorBox l={l} errorCode={errorCode}/>
				}
				{
					<div>
						{this.renderSchema()}
						{ !isFetching && <TermsConditions
								link="/terms-conditions"
								linkText="TERMSCONDITIONS"
								termsTitle="TERMSCONDITIONSTITLE"
								onTermsSelect={this.onTermsSelect}
								isError={termsError}
							/>
						}
						{ !isFetching && <LinearNavigation
								nextText={mode === 'edit' ? 'SAVE' : 'REGISTER'}
								nextCaret={false}
								isBackRequired={false}
								className="linear-navigation--light-theme"
								isSaveExitRequired={false}
								onNext={this.onRegisterClick.bind(this)}
							/>
						}
					</div>
				}
			</div>
		);

	}

}

const mapStateToProps = ({schema}) => {
	const { schema_save_companyregistration } = schema;

	return {
		'schema_save_company': schema_save_companyregistration
	};
};

export default connect(mapStateToProps)(companyRegistration);


