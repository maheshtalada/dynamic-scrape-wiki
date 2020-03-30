import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDateUtil } from '../../utils/localeUtil';
import { sprintf } from '../../utils';
import ContactBar from '../common/contact-bar/contact-bar';
import {modal} from 'react-redux-modal';
import SiteConfig from '../../config';

const { assetsPath } = SiteConfig;
const DETAIL_MSGS = {
	'byMe' : {
		'LISTING' : 'LISTINGNOTIFMSGBYME',
		'PROFILE' : 'PROFILENOTIFMSGBYME',
		'ARTICLE' : 'ARTICLENOTIFMSGBYME',
		'MYCONTACT' : 'MYCONTACTNOTIFMSGBYME'
	},
	'byOthers' : {
		'LISTING' : 'LISTINGNOTIFMSGBYOTHERS',
		'PROFILE' : 'PROFILENOTIFMSGBYOTHERS',
		'ARTICLE' : 'ARTICLENOTIFMSGBYOTHERS',
		'MYCONTACT' : 'MYCONTACTNOTIFMSGBYOTHERS'
	}
};

const NO_AVATAR_IMAGE_PATH = `${assetsPath}/images/noimages/noavatar.png`;

export default class ContactCard extends Component {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		contactInfo : PropTypes.object,
		user: PropTypes.object,
		dispatch: PropTypes.func
	};

	static contextTypes = {
		i18n : PropTypes.object,
		country : PropTypes.string,
		awsImagePath : PropTypes.string
	};

	componentDidMount() {
		const { userId : contactPersonId } = this.props.contactInfo;
		/*frameworkGlobals.emit('joinRoom', {
			room : `PDP:${contactPersonId}`
		});*/
	}

	renderNotification(contactInfo) {
		let detailMsg = '';
		const { l } = this.context.i18n;
		const { country } = this.context;

		const { isContacedByUser, contactContext, userName, contactedTime, context, contactMode } = contactInfo;
		const formattedDate = formatDateUtil(contactedTime,country,"DD/MM/YYYY");

		if(isContacedByUser) {
			detailMsg = DETAIL_MSGS.byMe[contactContext];
		} else {
			detailMsg = DETAIL_MSGS.byOthers[contactContext];
		}
		return (
			<span>{sprintf(l(detailMsg),userName,contactMode,formattedDate,context)}</span>
		);
	}

	notifyEmailSent() {
		modal.clear();
		this.props.onEmailSent();
	}

	hideEmailNotif() {
		this.props.onHideEmailNotif();
	}

	render() {
		const { contactInfo, user, chatUserStatus } = this.props;
		const { awsImagePath } = this.context;
		const profilePicSrc = contactInfo.userPhoto ? `${awsImagePath}/${contactInfo.userPhoto}` : NO_AVATAR_IMAGE_PATH;
		const { userContactActions : contactPersonActions,
				userName : contactPersonName,
				userId : contactPersonId } = contactInfo;
		const contactBarData = {
			personId: contactPersonId,
			contextType: 'MYCONTACT',
			personName: contactPersonName,
			defaultMsg: 'DEFAULTCHATMESSAGE'
		};
		return (
			<div className="contact-card">
				<div className="contact-card__info">
					<div className="contact-card__info__thumbnail-wrap">
						<img alt="profile image" src={profilePicSrc}/>
					</div>
					<div className="contact-card__info__name">
						{contactPersonName}
				 	</div>
				</div>
				<div className="contact-card__notification">
					{/*
						this.renderNotification(contactInfo)
					*/}
				</div>
				<div className="contact-card__contact-actions">
					<ContactBar
						contactOptions={contactPersonActions || []}
						contactBarData={contactBarData}
						dispatch = {this.props.dispatch}
						canChat = {chatUserStatus}
						user = {user}
						showOnlyIcons = {true}
						showOnlineIndicator = {false}
						checkUserLoggedIn={true}
						chatDetails={{
							id : `${contactPersonId}O${user.user.id}`,
							displayName : contactPersonName,
							from : {
								id: user.user.id,
								name : user.user.name
							},
							user : {
								id: contactPersonId,
								name : contactPersonName
							},
							messages : [],
							isLogin : true
						}}
					/>
				</div>
			</div>
		);
	}

}
