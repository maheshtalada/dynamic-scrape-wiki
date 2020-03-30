import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PaypalButtons from 'components/paypal-buttons/paypal-payment-buttons';
import { sprintf } from 'utils';
import TenantApplicationDetails from './tenant-application-details';

const PaymentPromptBox = ({ onPaymentApprove, amount, l, applicationFee, termsAndConditions  }) => {
    return (
        <div className="listing-confirmation">
            <div className="col-lg-7 col-md-7 col-xs-12 listing-confirmation__wrapper-left">
                <div className="listing-confirmation__title mod-bottom">{sprintf(l('TENANT_PAYMENT_PROMPT'),`$${applicationFee || amount}`)}</div>
                <div className="flex flex-align-end tenant-application-payment__paypal-button-wrap">
                    <PaypalButtons amount={applicationFee || amount} onPaymentApprove={onPaymentApprove}/>
                    {termsAndConditions && <div className="tenant-application-details__terms-conditions">*{termsAndConditions}</div>}
                </div>
            </div>
            {<div className="col-lg-5 col-md-5 col-xs-12 listing-confirmation__wrapper-right">
                <div className="listing-confirmation__description mod-bottom">{l('TENANT_PAYMENT_PROMPT_LINE_ONE')}</div>
                <div className="listing-confirmation__description mod-bottom">{l('TENANT_PAYMENT_PROMPT_LINE_TWO')}</div>
            </div>}
        </div>
    )
}

const ApplicationStatusBox = ({title, lineOne, lineTwo, isFailed, isSuccess, isWarning}) => {
    return (
        <div className="listing-confirmation">
            <div className="col-lg-7 col-md-7 col-xs-12 listing-confirmation__wrapper-left">
                <div className="listing-confirmation__title mod-bottom">{title}</div>
                {isFailed && <div className="payment-fail-icon">
                    <i className="pe-7s-close-2"/>
                </div>}
                {isSuccess && <div className="payment-success-icon">
                    <i className="pe-7s-check"/>
                </div>}
                {isWarning && <div className="payment-warning-icon">
                    <i className="pe-7s-attention"/>
                </div>}
            </div>
            <div className="col-lg-5 col-md-5 col-xs-12 listing-confirmation__wrapper-right">
                <div className="listing-confirmation__description mod-bottom">{lineOne}</div>
                <div className="listing-confirmation__description mod-bottom">{lineTwo}</div>
            </div>
        </div>
    )
}

const statusPrompts = {
    'PENDING_PAYMENT' : (props) => <PaymentPromptBox {...props}/>,
    'PENDING_REVIEW' : ({l}) => <ApplicationStatusBox title={l('TENANT_PENDING_APPROVAL_PROMPT')} isSuccess lineOne={l('TENANT_PENDING_APPROVAL_PROMPT_LINE_ONE')} lineTwo={l('TENANT_PENDING_APPROVAL_PROMPT_LINE_TWO')}/>,
    'PAYMENT_FAILED' : ({l}) => <ApplicationStatusBox title={l('TENANT_PAYMENT_FAILED_PROMPT')} isFailed lineOne={l('TENANT_PAYMENT_FAILED_PROMPT_LINE_ONE')} lineTwo={l('TENANT_PAYMENT_FAILED_PROMPT_LINE_TWO')}/>,
    'REJECTED' : ({l}) => <ApplicationStatusBox title={l('TENANT_REJECTED_PROMPT')} isFailed lineOne={l('TENANT_REJECTED_PROMPT_LINE_ONE')} lineTwo={l('TENANT_REJECTED_PROMPT_LINE_TWO')}/>,
    'APPROVED' : ({l}) => <ApplicationStatusBox title={l('TENANT_APPROVED_PROMPT')} isSuccess lineOne={l('TENANT_APPROVED_PROMPT_LINE_ONE')} lineTwo={l('TENANT_APPROVED_PROMPT_LINE_TWO')}/>,
    'DRAFT' : ({l}) => <ApplicationStatusBox title={l('TENANT_DRAFT_PROMPT')} isWarning lineOne={l('TENANT_DRAFT_PROMPT_LINE_ONE')} lineTwo={l('TENANT_DRAFT_PROMPT_LINE_TWO')}/>,
    'REQUIRE_MORE_INFO' : ({l,approvalComments}) => <ApplicationStatusBox title={l('REQUIRE_MORE_INFO')} isWarning lineOne={`${l('COMMENTS')}:`} lineTwo={approvalComments}/>
}

// 'DRAFT' : ({l}) => <ApplicationStatusBox title={l('TENANT_DRAFT_PROMPT')} isWarning lineOne={l('TENANT_DRAFT_PROMPT_LINE_ONE')} lineTwo={l('TENANT_DRAFT_PROMPT_LINE_TWO')}/>
export default class ApplicationPayment extends Component {

    static contextTypes = {
        i18n : PropTypes.object,
        country : PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { i18n : {l}, country } = this.context;
        const { user, details, saveApplication={}, applicationSetup={} } = this.props;
        const applicationStatus = saveApplication.applicationstatus || details.applicationStatus;
        return (
            <div className="tenant-application-payment">
                {statusPrompts[applicationStatus] && statusPrompts[applicationStatus]({
                    onPaymentApprove : this.props.onPaymentApprove,
                    amount : this.props.amount,
                    l,
                    approvalComments : details.approvalComments,
                    ...applicationSetup
                })}
                <TenantApplicationDetails details={details} />
            </div>
        )
    }
} 