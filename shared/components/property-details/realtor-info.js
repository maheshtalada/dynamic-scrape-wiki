import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRoleName, getRoleID } from 'utils/userUtilities';
import { getImagePath, triggerListHubEvent } from 'utils/propertyUtil';
import ContactBar from '../common/contact-bar/contact-bar';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { realtordetails } from 'assets/static/social-share-options.json';
import Snackbar from 'components/common/snackbar/snackbar';
import AddToContacts from 'components/add-to-my-contacts';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';

const LINK_ROLE_ID = 100;
export default class RealtorInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.onShowSnackbar = this.onShowSnackbar.bind(this);
	}

	static defaultProps = {
		showRole: true
	};

	static contextTypes = {
		i18n: PropTypes.object,
		awsImagePath: PropTypes.string,
		assetsPath : PropTypes.string,
		screenSize : PropTypes.number
	};

	onContactBarAction(action) {

		// trigger listhub analytics
		//call listhub analytics
		
		if(action === 'email') {
			triggerListHubEvent('AGENT_EMAIL_SENT',this.props.details.mlsListing);
		} else {
			triggerListHubEvent('AGENT_PHONE_CALL',this.props.details.mlsListing);
		}
	}

	onShowSnackbar(msg) {
		this.setState({
			showSnackbar : true,
			snackbarMsg : msg
		})
	}

	render() {
		const { owner : {photo, allowedContactActions, roles, profileURL, name, status,id}, owner, details, dispatch, user, showRole, chatUserStatus={}, isUserOwnerSame, location, shareWrapperPosition='top' } = this.props;
		const thumbnailUri = photo && photo.thumbnailUri;
		const roleID = roles && getRoleID(roles) || '';
		const { awsImagePath, i18n: {l}, assetsPath, screenSize } = this.context;
		const contactBarData = {
			personId: id,
			contextType: 'LISTING',
			personName: name,
			listingId: details.id
		};
		const { showSnackbar, snackbarMsg } = this.state;
		return (
			<div className="lead-realtor">
			<Snackbar active={showSnackbar} onTimeout={()=>{this.setState({ showSnackbar : false})}}>
				{l(snackbarMsg)}
			</Snackbar>
			<div className="property-details__realtor-info">
				<div className="property-details__realtor-info__info-wrap">
					{/*thumbnailUri && <a href={getAbsoluteUrl(profileURL)} title={l('CLICKTOVIEWPROFILE')} target="_blank">
						<div className="property-details__realtor-info__avatar">
							<img src={getImagePath(awsImagePath,thumbnailUri)} alt={name} />
						</div>
					</a>*/}
					<div className="property-details__realtor-info__desc">
						<span className="property-details__realtor-info__name">
							{roleID > LINK_ROLE_ID ?
								<a href={getAbsoluteUrl(profileURL)} title={l('CLICKTOVIEWPROFILE')} target="_blank">{name.toLowerCase()}</a> :
								name
							}
							{/* {status && <span className="property-details__realtor-info__status"> - {status}</span>} */}
						</span>
						{showRole && <span className="property-details__realtor-info__type">{l(getRoleName(roles))}</span>}
					</div>
				</div>
				<div className="lead-realtors__contact-actions-wrap flex flex-align-center">
					<ContactBar
						context="Listing Agent"
						contactOptions={allowedContactActions || details.allowedContactActions || []}
						onActionFinished = {this.onContactBarAction.bind(this)}
						ownerDetails={owner}
						contactBarData = {contactBarData}
						dispatch={dispatch}
						canChat={chatUserStatus}
						user={user}
						location={location}
						showOnlyIcons
						disableContactOptions={isUserOwnerSame}
						chatDetails={{
							id: `${owner.id}O${details.id}O${user.user.id}`,
							displayName: details.property.name,
							from: {
								id: user.user.id,
								name: user.user.name
							},
							user: {
								id: owner.id,
								name: owner.name
							},
							messages: []
						}}
					/>
					<AddToContacts contactId={owner.id}
									context="Listing Agent"
									iconOnly
									user={user}
									onAddSuccess={()=>{this.onShowSnackbar("CONTACTADDEDSUCCESS")}}
									location={location} dispatch={dispatch}/>
					<SocialShare
								context="Listing Agent"
								emailOptions={{
									shareType : 'PROFILE'
								}}
								shareWrapperPosition={shareWrapperPosition}
								location={location}
								user={user}
								profileId={owner.id}
								title={owner.name}
								shareUrl={getAbsoluteUrl(profileURL)}
								imagePath = {thumbnailUri ? getImagePath(awsImagePath,thumbnailUri) : ''}
								options = {realtordetails}
								screenSize = {screenSize}
								dispatch = {dispatch}
								iconOnly
							/>
				</div>
			</div>
			</div>
		)
	}
}
