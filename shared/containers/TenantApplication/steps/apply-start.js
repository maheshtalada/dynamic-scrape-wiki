import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values, sortBy, extend } from 'lodash';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import { Schema } from 'components/schema';
import Spinner from 'components/common/spinner/spinner';
import Loader from 'components/common/page-loader/loader';
import transformer from 'utils/form-data-transformer';
import ScrollIntoView from 'scroll-into-view';
import ErrorBox from 'components/common/error-box/error-box';
import PropertyContext from 'components/analyze-returns/property-context';
import { REQUEST_SCHEMA_TENANT_APPLICATION } from '../../../redux/actions/schema';
import { REQUEST_RESET_STORE_STATE } from '../../../redux/actions/application';

class ApplyStart extends Component {

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
        this.resetResponseStore();
    }
    
    componentWillMount() {
        const { dispatch, stepConfig, location, params } = this.props;
        let payload = {
            listingid : location.query.listingid
        };
        if(params.id) {
            payload['applicationid'] = params.id;
        }
        dispatch(REQUEST_SCHEMA_TENANT_APPLICATION({
            method : 'get',
            endpoint : stepConfig.getEndpoint,
            actionType : 'RESPONSE_SCHEMA_TENANT_APPLICATION',
            dataPayload: payload
        }));
    }

	componentWillReceiveProps(props) {
		// console.log(props.get_schema_my_property_details);
		this.setState({
			isFetching : props.get_schema_tenant_application.isFetching,
            schemas : props.get_schema_tenant_application.schema && props.get_schema_tenant_application.schema.schemas,
            propertyListing : props.get_schema_tenant_application.propertyListing,
			referenceData : props.get_schema_tenant_application.schema && props.get_schema_tenant_application.schema.referenceData,
			isSaving : props.save_schema_tenant_application.isFetching
		});
		// console.log(props.save_schema_my_property_details);
		if(props.save_schema_tenant_application.status === 'success') {
			this.nextStep && typeof this[this.nextStep] === 'function' && this[this.nextStep](props);
		} else if(props.save_schema_tenant_application.error || props.save_schema_tenant_application.status === 'error') {
            window.scrollTo(0,0);
			this.setState({
				isError: true,
				errorCode: props.save_schema_tenant_application.error.error_description
			});
		}
	}

    onSchemaChange(changeObject, hasErrors) {
        const { schemas  } = this.state;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`tenantSchema_${i}`] && this.refs[`tenantSchema_${i}`].rebuild();
			}
		}
	}

	saveSchema() {
        const { schemas } = this.state;
        let schemasAreValid = true,
            schemaLength = values(schemas).length,
            schemaGroups = [];

        for (let i = 0; i < schemaLength; ++i) {
            if (!this.refs[`tenantSchema_${i}`].checkSubmissionValid()) {
                schemaGroups.push(`tenantSchema_${i}`);
                schemasAreValid = false;
            }
        }
		if(schemasAreValid) {
			this.props.dispatch(REQUEST_SCHEMA_TENANT_APPLICATION({
				method : 'post',
				endpoint : this.props.stepConfig.saveEndpoint,
				actionType : 'RESPONSE_SAVE_SCHEMA_TENANT_APPLICATION',
				dataPayload: transformer.transformPathsToObject(extend({},this.state.initialValues,this.state.modifiedValues))
			}));
		} else {
            ScrollIntoView(document.getElementById(schemaGroups[0]));
        }
	}
    
    renderSchema() {
		const { i18n, country } = this.context;
        const { schemas, referenceData } = this.state;
        const listSchema = sortBy(values(schemas), (o)=> {
            return o.order;
        });
        return (
            listSchema.map((schemaData,index) => {
                return (
                    <div id={`tenantSchema_${index}`}>
                        <Schema
                            key={`tenantSchema_${index}`}
                            l={i18n.l}
                            country = {country}
                            ref={`tenantSchema_${index}`}
                            data={schemaData}
                            writeMode={true}
                            updateonPropsChange={true}
                            onChange={this.onSchemaChange}
                            modifiedValues={this.state.modifiedValues}
                            initialValues={this.state.initialValues}
                            referenceData={referenceData}
                        />
			        </div>
                )
            })
		);
	}

	render() {
		const { i18n : {l}, screenSize, country} = this.context;
		const { value = '', isFetching, schemas, isSaving, initialValues, modifiedValues, isError, errorCode, propertyListing } = this.state;
		const { stepConfig } = this.props;
		return (
			<div className="tenant-application-start">
                {propertyListing && <PropertyContext l={l} country={country} propertyListing={propertyListing} />}
                <div className="tenant-application__scroll-content">
                    <h2 className="subheader-heading">{l(stepConfig.title)}</h2>
                    <div className="schema-forms">
                        <div className="tenant-application-start__schema-wrap">
                            {isSaving && <Loader />}
                            {
                                isError &&
                                <ErrorBox l={l} errorCode={errorCode}/>
                            }
                            {(isFetching || !schemas) ? <Spinner /> : this.renderSchema()}
                        </div>
                    </div>
                </div>
                <LinearNavigation
                    nextText={l('NEXT')}
                    backText={l('PREVIOUS')}
                    navigatingSaveExitText = "SAVEANDEXIT"
                    className="linear-navigation--light-theme"
                    isBackRequired={!!stepConfig.prev}
                    isNextRequired={!!stepConfig.next}
                    onBack={this.onBackClick}
                    onNext={this.onNextClick}
                    isNavigatingSaveExitRequired
                    onNavigateSaveExit={this.onNavigateSaveExitClick}
                />
			</div>
		);
    }
    
    resetResponseStore() {
        this.props.dispatch(REQUEST_RESET_STORE_STATE({
            type : 'RESPONSE_SAVE_SCHEMA_TENANT_APPLICATION'
        }));
    }

	onProceedToNextStep(props) {
		this.props.navigateNext({
            step : this.props.stepConfig.next,
            id : props.save_schema_tenant_application.applicationid || props.params.id,
			query: props.location.query
        });
        this.resetResponseStore();
    }

    onProceedToBack() {
        this.resetResponseStore();
        this.props.navigatePrevious({
            step : this.props.stepConfig.prev,
            id : this.props.save_schema_tenant_application.applicationid || this.props.params.id,
            query : this.props.location.query
        });
    }
    
    onBackClick() {
        // this.nextStep = 'onProceedToBack';
        // this.saveSchema();
        this.onProceedToBack();
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

}

export default ApplyStart;
