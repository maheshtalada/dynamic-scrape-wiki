import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TenantApplicationDetails from 'containers/TenantApplication/tenant-application-details';
import SingleSelectBoxes from 'components/common/single-select-boxes';
import { connect } from 'react-redux';
import Spinner from 'components/common/spinner/spinner';
import { buildQueryObject } from 'utils/searchUtil';
import { REQUEST_RESET_STORE_STATE } from '../../redux/actions/application';
import { REQUEST_SCHEMA_TENANT_APPLICATION } from '../../redux/actions/schema';

const REVIEW_STATUS_OPTIONS = [
    {
        "label" : "APPROVED",
        "value" : "APPROVED"
    },
    {
        "label" : "REJECTED",
        "value" : "REJECTED"
    },
    {
        "label" : "REQUIRE_MORE_INFO",
        "value" : "REQUIRE_MORE_INFO"
    }
];
class ApplicationReview extends Component {
    
    static contextTypes = {
        i18n : PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedStatus : 'APPROVED'
        };
        this.props.dispatch(REQUEST_RESET_STORE_STATE({
            type : 'RESPONSE_TENANT_APPLICATION_REVIEW'
        }));
    }

    componentWillReceiveProps(props) {
		if(props && props.save_tenant_application_review) {
            if(props.save_tenant_application_review.status === 'success') {
                this.props.onConfirmReview();
                this.props.removeModal();
            }
            this.setState({
                isFetching : props.save_tenant_application_review.isFetching
            });
        }
    }

    onStatusChange = (value) => {
        this.setState({
            selectedStatus : value
        });
    }

    onCommentChange = () => {
        this.setState({
            showError : false
        })
    }

    onClickConfirm = () => {
        if(this.refs.commentsText && !this.refs.commentsText.value) {
            this.setState({
                showError : true
            });
        } else {
            this.props.dispatch(REQUEST_SCHEMA_TENANT_APPLICATION({
                endpoint : 'tenantapplicationreview',
                method : 'post',
                dataPayload : buildQueryObject({
                    id : this.props.id,
                    applicationStatus : this.state.selectedStatus,
                    approvalComments : this.refs.commentsText && this.refs.commentsText.value
                }),
                actionType : 'RESPONSE_TENANT_APPLICATION_REVIEW'
            }));
        }
    }

    render() {
        const { listingId, id } = this.props;
        const { selectedStatus, showError, isFetching } = this.state;
        const { i18n : { l }} = this.context;
        return (
            <div className="tenant-application-review">
                <h1 className="tenant-application-review__title">{l('REVIEWRENTALAPPLICATION')}</h1>
                <div className="listing-confirmation">
                    <SingleSelectBoxes
                        className="tenant-application-review__status-options"
                        boxOptions={REVIEW_STATUS_OPTIONS}
                        selectedBox = {selectedStatus}
                        isAnyRequired={false}
                        l={l}
                        analyticsData={{}}
                        onChange={this.onStatusChange}/>
                    {(selectedStatus === 'REJECTED' || selectedStatus === 'REQUIRE_MORE_INFO') && <textarea onChange={this.onCommentChange} autoFocus={true} placeholder={l('COMMENTS')} className={`tenant-application-review__comment-box ${showError ? 'show-error' : ''}`} ref="commentsText" rows="5" />}
                    {showError && <div className="alert alert-warning">{l('REVIEW_COMMENTS_REQUIRED')}</div>}
                    {isFetching && <Spinner />}
                    <div className="tenant-application-review__confirm-btn">
                        <button onClick={this.onClickConfirm} className="btn btn-primary btn-l">{l('CONFIRM')}</button>
                    </div>
                </div>
                <TenantApplicationDetails listingId={listingId} id={id}/>
            </div>
        )
    }
}

const mapStateToProps = ({schema}) => {
	const { save_tenant_application_review} = schema;
	return {
		save_tenant_application_review
	};
};

export default connect(mapStateToProps)(ApplicationReview);
