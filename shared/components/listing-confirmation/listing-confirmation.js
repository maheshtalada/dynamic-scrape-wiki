import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common/button';
import { connect } from 'react-redux';
import { Line, Circle} from '../common/svg-shapes';
import uniqueFormId from 'utils/uniqueFormId';
import { sprintf } from 'utils';
import appConstants from 'utils/app-constants';
import SiteConfig from '../../config.js';
import { REQUEST_LISTING_CONFIRMATION } from '../../redux/actions/schema';

const { pdfServer } = SiteConfig;
const STATUS_UNVERIFIED = 'UNVERIFIED';
const OTP_MODE = 'otp',
	CONFIRM_MODE = 'confirm',
	OTP_VERIFY_MODE = 'verify',
	OTP_RESEND_MODE = 'send',
	CONFIRM_STATUS = 'PENDING_APPROVAL',
	LISTING_STATUS = {
		PENDING_APPROVAL : {
			title : 'LISTINGPENDINGTITLE',
			descMsg : 'LISTINGPENDINGDESCRIPTION',
		},
		PENDING_CONTENT_APPROVAL : {
			title : 'LISTINGPENDINGCONTENTTITLE',
			descMsg : 'LISTINGPENDINGCONTENTDESCRIPTION',
		},
		DRAFT : {
			title: 'LISTINGCONFIRMATIONTITLE',
			descMsg: 'LISTINGCONFIRMATIONDESCRIPTION'
		},
		REJECTED : {
			title: 'LISTINGREJECTEDTITLE',
			descMsg: 'LISTINGREJECTEDDESCRIPTION'
		},
		CLOSED : {
			title: 'LISTINGCLOSEDTITLE',
			descMsg: 'LISTINGCLOSEDDESCRIPTION'
		}
	},
	PAGES = {
		LISTINGCOMPLETIONGROUP : '/profile/listing/property-listing/{id}',
		PROPERTYCOMPLETIONGROUP : '/profile/property/property-listing/{id}',
		ADDITIONALCOMPLETIONGROUP : '/profile/additional/property-listing/{id}',
		FINANCIALCOMPLETIONGROUP : '/profile/financial/property-listing/{id}',
		IMAGES : '/profile/media/property-listing/{id}'
	};

class ConfirmListing extends Component {

	static propTypes = {};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	static defaultProps = {};

	static getStatusMessage(status) {

		if(LISTING_STATUS[status]) {
			return LISTING_STATUS[status];
		}

		return {
			title: 'LISTINGACTIVETITLE',
			descMsg: 'LISTINGACTIVEDESCRIPTION'
		};

	}

	constructor(props) {
		super(props);
		this.state = {
			isError:false,
			username: props.user.emailId || props.user.mobileNumber,
			errorCode:'',
			mode: '',
			otpMode:'',
			otp:'',
			otpData : {},
			otpSubmitError: '',
			isConfirmEnable: props.owner.currentUserStatus !== STATUS_UNVERIFIED,
			isOTPVerified : false,
			isConfirmed : false,
			flyOutIndex: undefined
		};

	}


	componentWillReceiveProps(props) {
		if(props) {
			const { mode } = this.state;
			if(mode === CONFIRM_MODE) {
				this.handleStatusUpdateResponse(props.confirmation);
			}
		}
	}

	renderIndividualBars() {
		const { groups } = this.props.progress;
		const { l } = this.context.i18n;
		return groups && groups.map((group, index)=>{
			return (
				<div className={`bar bar-${index}`} onClick={()=>this.redirectTemplate(PAGES[group.name], this.props.details.id)}>
					<span className="bar-title">{l(group.name)}</span>
					<Line
						key={`bar-${index}-${uniqueFormId}`}
						strokeWidth="4"
						percent={Math.round(group.totalCompletion)}
						trailWidth="4"
						strokeLinecap="round"
						animationDuration="300"
						strokeColor="#739cc0"
						trailColor="#7cccf1"
					/>
				</div>
			);
		});

	}

	render() {
		const { details, user, progress } = this.props;
		const { l } = this.context.i18n;
		const titleMsg = ConfirmListing.getStatusMessage(details.status).title;
		const descMsg = ConfirmListing.getStatusMessage(details.status).descMsg;
		return (
			<div className="listing-confirmation">
				<div className="col-lg-7 col-md-7 listing-confirmation__wrapper-left">
					<div className="listing-confirmation__title mod-bottom">{l(titleMsg)}</div>
					<div className="listing-confirmation__description mod-bottom">{l(descMsg)}</div>
					<div className="listing-confirmation__actions">
						{ user && user.id && user.id === details.ownedByUserId && details.status === 'DRAFT' && <span className="actions">
									<Button className="" btnClassName="btn btn-primary" onClick={()=>this.onListingConfirmClick(details.id)}>
										{l('CONFIRM')}
									</Button>
								</span>}
						{ user && user.id && user.id === details.ownedByUserId && <span className="actions">
									<Button className="" btnClassName="btn btn-default" onClick={()=>this.redirectTemplate(PAGES.LISTINGCOMPLETIONGROUP, details.id)}>
										{l('EDIT')}
									</Button>
								</span>}
						{ user && user.id && user.id === details.ownedByUserId && <span className="actions">
								<a href={sprintf(appConstants.GENERATE_FLYER_LINK,details.id,frameworkGlobals.env)} target="_blank">
									<Button className="" btnClassName="btn btn-default">{l('GENERATEFLYER')}</Button>
								</a>
							</span>
						}
						{/*{user && user.id && user.id === details.ownedByUserId && <span className="actions">
								<a href={`${pdfServer.path}${sprintf(appConstants.GENERATE_REPORT_LINK,details.id)}`} target="_blank">
									<Button className="" btnClassName="btn btn-default">{l('GENERATEREPORT')}</Button>
								</a>
							</span>
						}*/}
					</div>
				</div>
				<div className="col-lg-5 col-md-5 listing-confirmation__wrapper-right">
					{ !frameworkGlobals.isServer && <div className="">
						<div className="loading-indicator radial-bars">
							<Circle key={`overall-progress-${uniqueFormId}`} strokeWidth="13" percent={Math.round(progress.totalCompletion)} trailWidth="13" animationDuration="500" strokeColor="#7cccf1" trailColor="#f9f9f9" />
						</div>
						<div className="line-bars individual-progress">
							<h3 className="progress-title">{l('PERCENTAGEOFCOMPLETION')}</h3>
							<div className="bars">
								{this.renderIndividualBars()}
							</div>
						</div>
					</div>
					}
				</div>

			</div>
		);
	}

	redirectTemplate(page, id) {
		page = page.replace('{id}', id);
		this.context.router.push({
			pathname : page
		});
	}

	onListingConfirmClick(id) {

		this.setState({ mode : CONFIRM_MODE}, ()=>{
			this.props.dispatch(REQUEST_LISTING_CONFIRMATION({
				data : {
					'status' : CONFIRM_STATUS
				},
				paramData : {
					'listingid' : id
				}
			}));
		});
	}

	handleStatusUpdateResponse(props) {
		if(props.isFetching) {
			this.setState({
				isConfirmed : false
			});
		}else if(props.status === 'success') {
			this.setState({
				isConfirmed : true
			} , () => {
				window.location = this.props.details.listingURL;
			});
			// TODO : later redirect to my listings page
			// this.context.router.push(this.props.listingurl);
			// for now reload same page

		}
	}
}

export default connect(({schema})=>(
	{
		'confirmation' : schema.listing_confirmation_status
	}
))(ConfirmListing);




