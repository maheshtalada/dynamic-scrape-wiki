import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import Cx from 'classnames';
import { cloneDeep } from 'lodash';
import Snackbar from '../snackbar/snackbar';
import PageActions from 'components/page-actions/page-actions';

const EMAIL = 'EMAIL',
	TELEPHONE = 'TELEPHONE',
	CHAT = 'CHAT';

export default class ContactBar extends PageActions {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath: PropTypes.string,
		country: PropTypes.string
	};

	static PropTypes = {
		contactOptions: PropTypes.object.isRequired,
		ownerDetails: PropTypes.object,
		handleViewPhone: PropTypes.func,
		handleEmail : PropTypes.func,
		chatDetails : PropTypes.object,
		handleChat : PropTypes.func,
		disableContactOptions : PropTypes.bool,
		showOnlyIcons : PropTypes.bool,
		showOnlineIndicator : PropTypes.bool,
		checkUserLoggedIn : PropTypes.bool,
		context : PropTypes.string,
		onActionFinished : PropTypes.func
	};

	static defaultProps = {
		showOwner: true,
		contactOptions: [],
		ownerDetails: {},
		handleViewPhone: ()=>{},
		handleEmail: ()=>{},
		handleChat: ()=>{},
		disableContactOptions: false,
		showOnlyIcons: false,
		showOnlineIndicator: true,
		checkUserLoggedIn :  false,
		onActionFinished: ()=>{}
	};

	constructor(props) {
		super(props);

		this.onActionFinished = this.onActionFinished.bind(this);
		this.state = {
			openChatFunctionality : false,
			isShowEmailSentNotification: false
		};
	}

	onActionFinished(action) {
		this.props.onActionFinished(action);
	}

	isContactAvailable(contactOption) {
		const { contactOptions } = this.props;
		return contactOptions.indexOf(contactOption) > -1 ;
	}

	render() {
		const { l } = this.context.i18n;
		const pageContext = this.props.context ;
		const { ownerDetails, canChat, user, disableContactOptions, showOnlyIcons, showOnlineIndicator, checkUserLoggedIn, contactBarData} = this.props;
		const iscanChat = typeof canChat[ownerDetails.id] === 'undefined' ? ownerDetails.canChat : canChat[ownerDetails.id];
		const isShowAsOnline = iscanChat && ownerDetails.id !== user.user.id;
		const { isShowEmailSentNotification } = this.state;
		return (
			<div className="contact-bar">
				{<Snackbar active={isShowEmailSentNotification} onTimeout={this.hideEmailNotif}>
					{l('EMAILSENT')}
				</Snackbar>}
				<div className={Cx("contact-bar__actions flex flex-wrap",showOnlyIcons ? "only-icons" : "")}>
				{
					this.isContactAvailable(EMAIL) && <div className="contact-bar__email">
						<Button className="" btnClassName={`${disableContactOptions ? 'disabled' : ''} btn btn-default`}
								onClick={()=>this.onActionClick(
									'contactviaemail',
									{
										isLoginRequired : true,
										type : 'extraPayLoad',
										name : 'CONTACTVIAEMAIL',
										extraPayLoad: {
											context : pageContext,
											contactedId : contactBarData.personId, 
											contactedName: contactBarData.personName,
											 actionType: contactBarData.actionType, 
											contextType: contactBarData.contextType,
											 defaultMessage: contactBarData.defaultMsg || '', 
											onActionFinished: this.onActionFinished,
											 listingId: contactBarData.listingId, 
											openHouseDate: contactBarData.openHouseDate || '',
										}
									})
								}
								disabled={disableContactOptions ? 'disabled' : null}
								aria-label={l(EMAIL)} data-tag-category={`${pageContext} Contact Actions`} data-tag-action="Contact Action Click" data-tag-label={`${l('EMAIL')} ${pageContext}`}>
							<i className="pe-7s-email" data-for="contact-actions-tooltips" data-tip={showOnlyIcons ? l("EMAIL") : ""}/>
							{!showOnlyIcons && l(EMAIL)}
						</Button>
					</div>
				}
				{
					this.isContactAvailable(TELEPHONE) && <div className="contact-bar__phone">
						<Button className="" btnClassName={`${disableContactOptions ? 'disabled' : ''} btn btn-default`}
								onClick={()=>this.onActionClick(
									'viewphonedetails',
									{
										isLoginRequired : true,
										type : 'extraPayLoad',
										name : 'PHONEDETAILS',
										extraPayLoad: {
											context : pageContext,
											actionType: contactBarData.actionType,
											contactedId: contactBarData.personId,
											contextType: contactBarData.contextType,
											onActionFinished: this.onActionFinished,
											listingId: contactBarData.listingId,
											articleId: contactBarData.articleId,
											questionId: contactBarData.questionId
										}
									})
								}
								disabled={disableContactOptions ? 'disabled' : null}
								aria-label={l('PHONE')} data-tag-category={`${pageContext} Contact Actions`} data-tag-action="Contact Action Click" data-tag-label={`View ${pageContext} Phone Number`}>
							<i className="pe-7s-Phone-number" data-for="contact-actions-tooltips" data-tip={showOnlyIcons ? l("PHONE") : ""}/>
							{!showOnlyIcons && l('PHONE')}
						</Button>
					</div>
				}
				</div>
			</div>
		);
	}
}


