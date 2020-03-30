import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { extend, cloneDeep } from 'lodash';
import { Schema } from 'components/schema';
import transformer from 'utils/form-data-transformer';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import Spinner from 'components/common/spinner/spinner';
import {modal} from 'react-redux-modal';
import loadable from '@loadable/component';
import { REQUEST_VERIFY_TOKEN_VIA_EMAIL } from '../../../redux/actions/user';
import {REQUEST_ADD_PROPERTY_PDF_TEMPLATE_DATA } from '../../../redux/actions/properties';

const Login = loadable(() => import(/* webpackChunkName: 'quicksignup' */'../../../components/login/login'),{
	LoadingComponent: Spinner,
});


// import mockSchema from './contact-info-schema.json';

class PdfContactInfo extends Component {
    static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
        super(props);
		const sessionPdfData = window.sessionStorage && JSON.parse(sessionStorage.getItem(`pdfData-${props.params.id}`));
		this.state = {
			initialValues: {},
			modifiedValues : sessionPdfData && sessionPdfData.pdfContactInfo || {},
			schemas : props.property_pdf_template.schema && props.property_pdf_template.schema.schemas,
			referenceData : props.property_pdf_template.schema && props.property_pdf_template.schema.referenceData,
		};
    }

    componentWillReceiveProps(props) {
		if(props.property_pdf_template) {
			this.setState({
				schemas : props.property_pdf_template.schema && props.property_pdf_template.schema.schemas,
				referenceData : props.property_pdf_template.schema && props.property_pdf_template.schema.referenceData,
				isFetching : false
			});
		}
	}

	componentDidMount() {
		const { user = {}, location, params } = this.props;
		this.setState({
			isLoading : false
		});

		if(user && !user.user.isLogIn) {
			this.props.dispatch(REQUEST_VERIFY_TOKEN_VIA_EMAIL({
				query : location.query,
				...params,
				step : 'preview'
			}));
		}
	}

    onSchemaChange = (changeObject, hasErrors) => {
		this.setState({
			changeObject,
			hasErrors
		});
		this.refs['contactInfoSchema'] && this.refs['contactInfoSchema'].rebuild();
	}
    
    render() {
		const { i18n : {l}, country} = this.context;
		const { isFetching, schemas = '', referenceData, modifiedValues, initialValues, isNextClicked = '' } = this.state;
		const { stepConfig, user, dispatch, property_pdf_template } = this.props;

		return (
			<div className="contact-info-step wizard__step-container">
                <div className="flex flex-justify-between wizard__question-wrapper">
                    <h3 className="wizard__question">{stepConfig.question}</h3>
					{property_pdf_template.addressLineOne && <div className="pdf-wizard-page__listing-name"><i className="pe-7s-preferred-location"/> {property_pdf_template.addressLineOne}</div>}
                </div>
				<div className="wizard__answer-options-container">
				{ isFetching && <Spinner /> }
					{ schemas && <Schema
						key='contactInfoSchema'
						user={user}
						dispatch={dispatch}
						l={l}
						country = {country}
						ref={'contactInfoSchema'}
						data={schemas[0]}
						writeMode={true}
						updateonPropsChange={true}
						onChange={this.onSchemaChange}
						modifiedValues={modifiedValues}
						initialValues={initialValues}
						referenceData={referenceData}
					/>}
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					backText={l('PREVIOUS')}
					className="linear-navigation--light-theme"
					currentActiveLoader={isNextClicked ? 'next' : ''}
					isSaveExitRequired={false}
					isNavigatingSaveExitRequired={false}
					onNext={this.onNextClick.bind(this)}
					onBack={this.onBackClick.bind(this)}
				/>
			</div>
		);
	}

	addLoginModal(props) {
		const { l } = this.context.i18n;
		const { modalTitle, userstatus, modalSize } = props.user.user;
		modal.add(Login,{
			title: l(modalTitle || 'LOGINHEADING'),
			size: `custom login-modal ${modalSize || ''}`,
			...props,
			className : 'activate-account',
			heading : "FLYERACCOUNTACTIVATE",
		});
	}

	async onNextClick() {
        const { initialValues, modifiedValues } = this.state;
        const { user : {user}, location, params, dispatch } = this.props;
		/*const { stepConfig, onNavigateEnd } = this.props;
		let schemasAreValid = true;
		if (!this.refs['contactInfoSchema'].checkSubmissionValid()) {
			schemasAreValid = false;
		}
		if(schemasAreValid) {
			onNavigateEnd({pdfContactInfo : transformer.transformPathsToObject(extend({},initialValues,modifiedValues))});
		}*/
		this.setState({
			isNextClicked : true
		});
       	const payload = {
			actionType : 'RESPONSE_ADD_PROPERTY_PDF_TEMPLATE',
			endpoint: 'pdf.customization.post.pdftemplatedata',
			paramsPayload : {
				id : params.id,
				step : 'disclosure'
			},
			dataPayload : transformer.transformPathsToObject(extend({},initialValues,modifiedValues)),
			headersPayload : {
				token : location.query.token
			}
		};
		await dispatch(REQUEST_ADD_PROPERTY_PDF_TEMPLATE_DATA(payload));

		if(!user.isLogIn) {
			return this.addLoginModal(this.props);

		}

		// redirect to preview page
		this.props.onNavigateEnd();

	}

	onBackClick() {
		const { stepConfig } = this.props;
		const { initialValues, modifiedValues } = this.state;
		this.props.navigatePrevious({
			step : stepConfig.prev,
			query : this.props.location.query
		});
	}
}

export default PdfContactInfo;
