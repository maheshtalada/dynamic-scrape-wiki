import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, values, extend } from 'lodash';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import { Schema } from 'components/schema';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import Spinner from 'components/common/spinner/spinner';
import Loader from 'components/common/page-loader/loader';
import transformer from 'utils/form-data-transformer';
import ErrorBox from 'components/common/error-box/error-box';
import PropertyInfoStrip from './property-info-strip';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../../redux/actions/schema';

class PurchaseDetails extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			modifiedValues: {},
			initialValues: {}
        };
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
		this.onSchemaChange = this.onSchemaChange.bind(this);
		this.onNavigateSaveExitClick = this.onNavigateSaveExitClick.bind(this);
	}
	
	componentWillReceiveProps(props) {
		// console.log(props.get_schema_my_property_details);
		this.setState({
			isFetching : props.get_schema_my_property_purchase_details.isFetching,
			propertyName : props.get_schema_my_property_purchase_details.name,
			schemas : props.get_schema_my_property_purchase_details.schema && props.get_schema_my_property_purchase_details.schema.schemas,
			referenceData : props.get_schema_my_property_purchase_details.schema && props.get_schema_my_property_purchase_details.schema.referenceData,
			isSaving : props.save_schema_my_property_purchase_details.isFetching
		});
		if(props.save_schema_my_property_purchase_details.status === 'success') {
			this.nextStep && typeof this[this.nextStep] === 'function' && this[this.nextStep](props);
		} else if(props.save_schema_my_property_purchase_details.error || props.save_schema_my_property_purchase_details.status === 'error') {
			const {errors} = props.save_schema_my_property_purchase_details.error;
			window.scrollTo(0,0);
			this.setState({
				isError: true,
				errorCode: (function(errors){
					return errors.map(err => <div style={{display:"block"}}>{err.field} {err.code}</div>)
				})(errors)
			});
		}
	}

    onSchemaChange(changeObject, hasErrors) {
        this.setState({
			changeObject,
			hasErrors
		});
		this.refs['schemaPurchaseDetails'] && this.refs['schemaPurchaseDetails'].rebuild();
	}
	
	saveSchema() {
		let schemasAreValid = true;
		if (!this.refs['schemaPurchaseDetails'].checkSubmissionValid()) {
			schemasAreValid = false;
		}
		if(schemasAreValid) {
			this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
				method : 'post',
				endpoint : 'savemypropertypurchasedetails',
				actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_PURCHASE_DETAILS',
				dataPayload: transformer.transformPathsToObject(extend({},this.state.initialValues,this.state.modifiedValues))
			}));
		}
	}

    renderSchema() {
		const { i18n, country } = this.context;
		const { schemas, referenceData } = this.state;
        return schemas.map((schemaData, index) => {
			return (
                <Schema
                    l={i18n.l}
                    country = {country}
                    ref='schemaPurchaseDetails'
                    data={schemaData}
                    writeMode={true}
                    updateonPropsChange={true}
                    onChange={this.onSchemaChange}
                    modifiedValues={this.state.modifiedValues}
                    initialValues={this.state.initialValues}
                    referenceData={referenceData}
                />
			);
		});
    }

	render() {
		const { i18n : {l}} = this.context;
		const { value = '', isFetching, schemas, isSaving, isError, errorCode, propertyName } = this.state;
		const { stepConfig } = this.props;
		console.log(errorCode);
		return (
			<div className="purchase-details-step wizard__step-container">
				<PropertyInfoStrip name={propertyName} l={l}/>
				<div className="wizard__step-container__content-wrap">
					{isSaving && <Loader />}
					{
						isError &&
						<ErrorBox l={l} errorCode=""><div>{errorCode}</div></ErrorBox>
					}
					<h3 className="wizard__question">{stepConfig.question}</h3>
					{(isFetching || !schemas) ? <Spinner /> : this.renderSchema()}
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					navigatingSaveExitText = "SAVEANDEXIT"
                    backText={l('PREVIOUS')}
					className="linear-navigation--light-theme"
					isSaveExitRequired={false}
					isNavigatingSaveExitRequired
					onNavigateSaveExit={this.onNavigateSaveExitClick}
                    onBack={this.onBackClick}
                    onNext={this.onNextClick}
				/>
			</div>
		);
	}
	
	onProceedToNextStep() {
		this.props.navigateNext({
			step : 'income-expense',
			query: {
				id : this.props.location.query.id
			}
		});
	}

	onExit() {
		this.props.onNavigateEnd();
	}
	
	onNavigateSaveExitClick() {
		this.nextStep = 'onExit';
		this.saveSchema();
	}
    
	onNextClick() {
		this.nextStep = 'onProceedToNextStep';
		this.saveSchema();
	}
    
	onBackClick() {
		this.props.navigatePrevious({
            step : 'details',
            query : {
				id : this.props.location.query.id
			}
        });
	}

}

const mapStateToProps = ({schema}) => {
	const { get_schema_my_property_purchase_details, save_schema_my_property_purchase_details } = schema;
	return {
		get_schema_my_property_purchase_details,
		save_schema_my_property_purchase_details
	};
};

export default connect(mapStateToProps)(connectDataFetchers(PurchaseDetails, [
	REQUEST_SCHEMA_MY_PROPERTY
], true, {
	method : 'get',
	endpoint : 'getmypropertypurchasedetails',
	actionType : 'RESPONSE_GET_SCHEMA_MY_PROPERTY_PURCHASE_DETAILS',
	isGenerateDataPayload : true,
	dataPayloadLookup : [{key : "mypropertyid" , lookup : "query.id"}]
}));
