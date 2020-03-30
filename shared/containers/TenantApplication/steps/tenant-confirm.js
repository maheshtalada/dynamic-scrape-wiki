import React , { Component } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import Spinner from 'components/common/spinner/spinner';
import Loader from 'components/common/page-loader/loader';
import ErrorBox from 'components/common/error-box/error-box';
import ApplicationPayment from '../application-payment';
import PropertyContext from 'components/analyze-returns/property-context';
import { REQUEST_SCHEMA_TENANT_APPLICATION } from '../../../redux/actions/schema';
import { REQUEST_RESET_STORE_STATE } from '../../../redux/actions/application';

const AMOUNT = 50;
class TenantConfirm extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {};
        this.onBackClick = this.onBackClick.bind(this);
        this.onPaymentApprove = this.onPaymentApprove.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onNavigateSaveExitClick = this.onNavigateSaveExitClick.bind(this);
        this.resetResponseStore();
    }
    
    componentWillMount() {
        const { dispatch, stepConfig, params } = this.props;
        dispatch(REQUEST_SCHEMA_TENANT_APPLICATION({
            method : 'post',
            endpoint : stepConfig.getEndpoint,
            actionType : 'RESPONSE_SCHEMA_TENANT_APPLICATION',
            paramPayload : {
                id : params.id
            }
        }));
    }

	componentWillReceiveProps(props) {
		this.setState({
			isFetching : props.get_schema_tenant_application.isFetching,
            details : props.get_schema_tenant_application.rentalApplication,
            propertyListing : props.get_schema_tenant_application.propertyListing,
            saveApplication : props.save_schema_tenant_application,
            applicationSetup : props.get_schema_tenant_application.rentalApplicationSetup, 
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

    onPaymentApprove(details,data) {
        let endpoint = 'tenantconfirmsave';

        if(details.status !== 'COMPLETED') {
            endpoint = 'tenantpaymentfailsave';  
        }

        this.props.dispatch(REQUEST_SCHEMA_TENANT_APPLICATION({
            method : 'post',
            endpoint : endpoint,
            actionType : 'RESPONSE_SAVE_SCHEMA_TENANT_APPLICATION',
            dataPayload : {
                paypalorderid : data.orderID
            },
            paramPayload : { 
                id : this.props.params.id
            }
        }));
    }

    renderDetails() {
        const { details, saveApplication, applicationSetup } = this.state;
        return (
            <ApplicationPayment applicationSetup={applicationSetup} saveApplication={saveApplication} {...this.props} onPaymentApprove={this.onPaymentApprove} amount={AMOUNT} details={details} />
        )
    }

	render() {
		const { i18n : {l}, screenSize, country} = this.context;
		const { value = '', isFetching, isSaving, isError, errorCode, details={}, propertyListing} = this.state;
		const { stepConfig } = this.props;
		return (
			<div className="tenant-application-start">
                {propertyListing && <PropertyContext l={l} country={country} propertyListing={propertyListing} />}
                <div className="tenant-application__scroll-content">
                    <div className="">
                        <h2 className="subheader-heading">{l(stepConfig.header || stepConfig.title)}</h2>
                    </div>
                    
                    <div className="tenant-application-start__schema-wrap">
                        {isSaving && <Loader />}
                        {
                            isError &&
                            <ErrorBox l={l} errorCode={errorCode}/>
                        }
                        {(isFetching || !details.id) ? <Spinner /> : this.renderDetails()}
                    </div>
                </div>
                <LinearNavigation
                    nextText={l('CONFIRM')}
                    backText={l('PREVIOUS')}
                    navigatingSaveExitText = "SAVEANDEXIT"
                    className="linear-navigation--light-theme"
                    isBackRequired={true}
                    isNextRequired={false}
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

    onProceedToBack() {
        this.resetResponseStore();
        this.props.navigatePrevious({
            step : this.props.stepConfig.prev,
            id : this.props.params.id,
            query : this.props.location.query
        });
    }
    
    onBackClick() {
        this.onProceedToBack();
	}

	onExit() {
		this.props.onNavigateEnd();
	}
	
	onNavigateSaveExitClick() {
        this.onExit();
	}
    
	onNextClick() {
        console.log('on click confirm');
	}

}

export default TenantConfirm;
