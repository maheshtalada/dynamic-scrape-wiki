import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common/button';
import { connect } from 'react-redux';
import PillsSuggestions from '../common/pills-suggestions/pills-suggestions';
import Cx from 'classnames';
import {find as _find} from 'lodash';
import Chip from '../common/chip/chip';
import AddNewContactForm from '../add-to-my-contacts/add-new-contact-form';
import { findDOMNode } from 'react-dom';
import Spinner from '../common/spinner/spinner';
import Snackbar from 'components/common/snackbar/snackbar';
import ReactDOM from 'react-dom';
import { REQUEST_USER_NOTIFICATIONS } from '../../redux/actions/userprofile';
import { REQUEST_SHARE_VIA_EMAIL } from '../../redux/actions/application';
import CaptchaComponent from 'components/common/captcha/captcha';

class ShareViaEmailModal extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			recipients : [],
			shareResponse : {}
		};
		this.addRecipient = this.addRecipient.bind(this);
		this.onClickSend = this.onClickSend.bind(this);
		this.onAddNewContact = this.onAddNewContact.bind(this);
		this.onClickAddNew = this.onClickAddNew.bind(this);
		this.handleBodyClick = this.handleBodyClick.bind(this);
		this.hideEmailNotification = this.hideEmailNotification.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			userContacts : props.userContacts,
			shareResponse : props.shareResponse
		});
		if(props.shareResponse.status === "success" && this.emailSentNotified === false) {
			this.emailSentNotified = true;
			this.onEmailShareSuccess();
		}
	}

	componentDidMount() {
		const { user, getModalCloseProp } = this.props;
		window.addEventListener('click', this.handleBodyClick);
		this.props.dispatch(REQUEST_USER_NOTIFICATIONS({
			query : {
				count : 20
			}
		}));
		getModalCloseProp && getModalCloseProp(this.props.removeModal);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
	}

	onEmailShareSuccess() {
		this.setState({
            isShowEmailSentNotification : true
        });
		this.props.onEmailShareSuccess && this.props.onEmailShareSuccess();
	}

	hideEmailNotification() {
		this.setState({
			isShowEmailSentNotification : false
		},()=>{
			this.props.removeModal();
		});
	}

	onAddNewContact(newContactInfo) {
		const { user } = this.props;
		const { userContacts, recipients } = this.state;
		const newUserId = newContactInfo.contactedUserId === user.id ? newContactInfo.contactedByUserId : newContactInfo.contactedUserId;
		const newUserName = newContactInfo.contactedUserName === user.name ? newContactInfo.contactedByUserName : newContactInfo.contactedUserName;
		const newUserObj = {
			userId : newUserId,
			userName : newUserName || 'new user'
		};
		this.setState({
			userContacts : {
				...userContacts,
				data : [...userContacts.data,newUserObj]
			},
			recipients : [...recipients,newUserObj],
			showAddNewContact : false
		})
	}

	addRecipient(name,index) {
		const { userContacts,recipients } = this.state;
		let modifiedRecipients = [...recipients];
		if(index >= 0) {
			const contactObj = _find(userContacts.data,{ userName : name});
			modifiedRecipients.push(contactObj);
		}
		this.setState({
			recipients : modifiedRecipients
		});
	}

	removeRecipient(index) {
		this.setState({
			recipients : this.state.recipients.filter((r,i) => {return i !== index})
		});
	}

	onClickAddNew() {
		this.setState({
			showAddNewContact : true
		})
	}

	onClickSend() {
		if(this.state.captchaValue != this.state.captchaText) {
			return this.setState({
				isCaptchaError : true
			});
		}
		const { listingId , profileId, shareUrl, emailOptions={}, context, onActionSend } = this.props;
		const { recipients } = this.state;
		const message = this.refs.textareaEl.value,
			userIds = recipients.map(item => item.userId);
		this.emailSentNotified = false;
		if(onActionSend) {
			this.setState({
				isExternalActionSending : true
			});
			onActionSend({
				message,
				userIds,
				...emailOptions
			});
			return;
		}
		this.props.dispatch(REQUEST_SHARE_VIA_EMAIL({
			dataPayload : {
				message,
				userids : userIds,
				listingid : listingId,
				userprofileid : profileId,
				link : emailOptions.link,
				articleid:emailOptions.articleid,
				sharetype : emailOptions.shareType,
				title : emailOptions.title,
				description : emailOptions.description,
				wishlistlistingids : emailOptions.listingIds
			}
		}));
	}

	render() {
		const { userContacts, recipients, showAddNewContact, shareResponse, isShowEmailSentNotification, isExternalActionSending, isCaptchaError = false } = this.state;
		const { l } = this.context.i18n;
		const { className, shareDisclaimer } = this.props;
		const contactSuggestions = userContacts && userContacts.data && userContacts.data.map(user => user.userName);
		return (
			<div className={Cx("email-modal__content share-via-email",className)}>
				{!frameworkGlobals.isServer && ReactDOM.createPortal(
					<Snackbar active={isShowEmailSentNotification} timeout={1000} onTimeout={this.hideEmailNotification}>
                    	{l('EMAILSENT')}
               	 	</Snackbar>,
					document.querySelector('body'),
				)}
				<div className="share-via-email__recipient-wrap">
					{/*<label htmlFor="share-email-id" className="share-via-email__recipient-wrap__label">{l('ADDRECIPIENT')}</label>*/}
					<div className="flex flex-align-center">
					{<PillsSuggestions id="share-email-id"
									  minQueryLength={1}
									  isFullPill = {false}
									  translator = {l}
									  isAddNewPill={false}
									  suggestions={contactSuggestions}
									   handleAddition={this.addRecipient}
									  placeholder={l("CHOOSEFROMEXISTINGCONTACTS")}/>}
						{/*<div>{l('OR')}</div>*/}
						<div ref={el => this.contactFormEl = el} className="share-via-email__add-new-prompt">
							<button className="btn btn-default" onClick={this.onClickAddNew}>{l('ADDNEWCONTACT')}</button>
							{showAddNewContact && <AddNewContactForm className="share-via-email__add-new-contact-form" successCallback={this.onAddNewContact} dispatch={this.props.dispatch}/>}
						</div>
					</div>
					{recipients.length > 0 && <div className="share-via-email__recipient-wrap__pills-wrap flex flex-align-start">
						<label>{l("SENDINGTO")} : </label>
						<div className="flex flex-wrap pills">
							{recipients.map((recipient,index) => {
								return (
									<Chip onClose={()=>{this.removeRecipient(index)}}>
										{recipient.userName || recipient.emailId}
									</Chip>
								)
							})}
						</div>
					</div>
					}
				</div>
				<textarea className="email-modal__content__msg-text" placeholder={l("DEFAULTCHATMESSAGE")} ref="textareaEl" rows="5"/>
				<CaptchaComponent
					onChange = { value => this.setState({captchaValue : value})}
					onLoad ={ text => this.setState({captchaText : text})}
					error={isCaptchaError}/>
				{shareDisclaimer && <div className="share-via-email__disclaimer">{shareDisclaimer}</div>}
				<Button data-tag-category='Share Actions' data-tag-action="Click" data-tag-label='Share' className="email-modal__content__send-email" disabled={recipients.length < 1} onClick={this.onClickSend}>{l('SEND')}</Button>
				{(shareResponse.isFetching || isExternalActionSending) && <Spinner />}
			</div>
		)
	}

	handleBodyClick(evt) {
		if(!findDOMNode(this.contactFormEl).contains(evt.target)) {
			if(this.state.showAddNewContact) {
				this.setState({
					showAddNewContact : false
				});
			}
		}
	}

}

const mapStateToProps = ({ application, userprofile }) => {
	return {
		shareResponse : application.share_via_email_response || {},
		userContacts : userprofile.user_notifications
	};
};

export default connect(mapStateToProps)(ShareViaEmailModal);

