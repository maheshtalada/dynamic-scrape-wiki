import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { sprintf } from '../../../utils';
import { buildQueryObject } from '../../../utils/searchUtil';
import { SEND_EMAIL } from '../../../redux/actions/application';
import CaptchaComponent from 'components/common/captcha/captcha';

const SEND_EMAIL_TEXT = 'SENDEMAIL',
	  SENDING_EMAIL = 'SENDINGEMAIL',
	  EMAIL_SENT = 'EMAILSENT',
	  PROPERTY_EMAIL_MESSAGE = 'PROPERTYEMAILMESSAGE',
	  PERSON_EMAIL_MESSAGE = 'PERSONEMAILMESSAGE',
	  CONTACTED_PERSON = 'CONTACTEDPERSON',
	  ENTER_EMAIL_MESSAGE = 'ENTEREMAILMESSAGE';

const LABELS = {
	'EMAIL' : {
		'enterEmailMessage' : 'ENTEREMAILMESSAGE',
		'placeholder' : 'PROPERTYEMAILMESSAGE'
	},
	'RSVP' : {
		'enterEmailMessage' : 'ENTERRSVPMESSAGE',
		'placeholder' : 'PROPERTYEMAILMESSAGE'
	},
	'CHAT' : {
		'enterEmailMessage' : 'ENTEREMAILMESSAGE',
		'placeholder' : 'DEFAULTCHATMESSAGE'
	},
	'MAKEOFFER' : {
		'enterEmailMessage' : 'MAKEANOFFER',
		'placeholder': 'MAKEANOFFERPLACEHOLDER'
	}
};

class EmailModal extends Component {
	static contextTypes = {
		i18n: PropTypes.object
	};
	static PropTypes = {
		listingId : PropTypes.string,
		dispatch : PropTypes.func,
		contactedId : PropTypes.string,
		contactedName: PropTypes.string,
		actionType: PropTypes.string,
		contextType: PropTypes.string,
		openHouseDate: PropTypes.string,
		defaultMessage: PropTypes.string,
		articleId : PropTypes.string,
		questionId : PropTypes.string
	};

	static defaultProps = {
		contactedName: CONTACTED_PERSON,
		openHouseDate: '',
		listingId : '',
		articleId : '',
		questionId : '',
		actionType : 'EMAIL',
		onActionFinished : ()=>{}
	};

	constructor(props) {
		super(props);
		this.sendMail = this.sendMail.bind(this);
		this.state = {
			sendButtonText : SEND_EMAIL_TEXT
		};
	}

	componentWillReceiveProps(props) {
		const { status } = props.emailSentResponse;
		this.setState({
			sendButtonText : status === 'sending' ? SENDING_EMAIL : (status === 'success' ? EMAIL_SENT : SEND_EMAIL_TEXT)
		});
		if(status === 'success' && this.contactAddNotified === false) {
			this.contactAddNotified = true;
			this.props.onActionFinished && this.props.onActionFinished('email', true);
			this.props.removeModal();
		}
	}

	sendMail() {
		if(this.state.captchaValue != this.state.captchaText) {
			return this.setState({
				isCaptchaError : true
			});
		}

		const { listingId, contactedId, contactedName, actionType, contextType, questionId, articleId} = this.props;
		const messageText = this.refs.messageText.value;
		let dataPayload = buildQueryObject({
			message : messageText || '',
			userid : contactedId,
			action : actionType,
			contexttype : contextType,
			listingid : listingId,
			articleid : articleId,
			questionid : questionId
		});
		this.contactAddNotified = false;
		this.props.dispatch(SEND_EMAIL({
			dataPayload
		}));
	}

	render() {
		const { l } = this.context.i18n;
		const { sendButtonText, isCaptchaError = false } = this.state;
		const { listingId, contactedName, actionType, openHouseDate, defaultMessage, context } = this.props;
		//let defaultMsgText = defaultMessage || (!!listingId ? LABELS[actionType].propertyEmailMessage : LABELS[actionType].personEmailMessage);

		return (
			<div className="email-modal__content">
				<h1 className="email-modal__content__title">{sprintf(l(LABELS[actionType].enterEmailMessage),contactedName)}</h1>
				<textarea placeholder={l(LABELS[actionType].placeholder)} className="email-modal__content__msg-text" ref="messageText" rows="5" />
				<CaptchaComponent
					onChange = { value => this.setState({captchaValue : value})}
					onLoad ={ text => this.setState({captchaText : text})}
					error={isCaptchaError}/>
				<Button className="email-modal__content__send-email" onClick={this.sendMail} data-tag-category={`${context} Contact Actions`} data-tag-action="Click" data-tag-label="Send Email">{l(sendButtonText)}</Button>
			</div>
		);
	}

}

export default EmailModal;
