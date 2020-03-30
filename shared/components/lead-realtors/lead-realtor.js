import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImagePath } from '../../utils/propertyUtil';
import ContactBar from '../common/contact-bar/contact-bar';
import AddToContacts from '../../components/add-to-my-contacts';
import SocialShare from '../../components/common/social-share-buttons/social-share-buttons';
import { realtordetails } from '../../assets/static/social-share-options.json';
import { getAbsoluteUrl } from 'utils/urlUtil';

export default class LeadRealtor extends Component {
	constructor(props) {
		super(props);
	}

	static contextTypes = {
		i18n : PropTypes.object,
		screenSize : PropTypes.number,
		awsImagePath : PropTypes.string,
		assetsPath : PropTypes.string
	};

	render() {
		const { listingId, dispatch, userObj, chatUserStatus, location, listingContactActions, realtorInfo } = this.props;
		const {photo, contactactions, profileurl, name,id, profession} = realtorInfo;
		const { awsImagePath, i18n: {l}, screenSize, assetsPath } = this.context;
		const contactBarData = {
			personId: id,
			contextType: 'LISTING',
			personName: name,
			listingId: listingId
		};
		const allowedContactActions = contactactions ? contactactions.map(action => action.toUpperCase()) : [];
		const imagePath = photo ? getImagePath(awsImagePath,photo) : `${assetsPath}/images/noimages/noavatar.png`;
		const isUserRealtorSame = userObj && userObj.user && userObj.user.id === id;
		return (
			<div className="lead-realtor flex flex-column flex-justify-between flex-align-center">
			<div className="property-details__realtor-info">
				<div className="property-details__realtor-info__info-wrap">
					<div className="property-details__realtor-info__desc">
						<div>
						<span className="property-details__realtor-info__name">
							{profileurl ?
								<a href={getAbsoluteUrl(profileurl)} title={l('CLICKTOVIEWPROFILE')} target="_blank">{name}</a> :
								name
							}
						</span>
							<div className="lead-realtors__specialty-type">{l(profession.toUpperCase())}</div>
						</div>
						<div className="lead-realtors__contact-actions-wrap flex flex-align-center">
							<ContactBar
								contactOptions={allowedContactActions || listingContactActions || []}
								ownerDetails={realtorInfo}
								context="Lead Realtor"
								contactBarData = {contactBarData}
								dispatch={dispatch}
								canChat={chatUserStatus}
								user={userObj}
								location={location}
								showOnlyIcons
								disableContactOptions={isUserRealtorSame}
								chatDetails={{
									id: `${id}O${listingId}O${userObj.user.id}`,
									from: {
										id: userObj.user.id,
										name: userObj.user.name
									},
									user: {
										id: id,
										name: name
									},
									messages: []
								}}
							/>
							<AddToContacts contactId={id}
										   context="Lead Realtor"
										   iconOnly
										   user={userObj}
										   onAddSuccess={()=>{this.props.onShowSnackbar("CONTACTADDEDSUCCESS")}}
										   location={location} dispatch={dispatch}/>
							<SocialShare
								context="Lead Realtor"
								emailOptions={{
									shareType : 'PROFILE'
								}}
								location={location}
								user={userObj}
								profileId={id}
								title={name}
								shareUrl={getAbsoluteUrl(profileurl)}
								imagePath = {imagePath}
								options = {realtordetails}
								screenSize = {screenSize}
								dispatch = {dispatch}
								iconOnly
							/>
						</div>
					</div>
				</div>
			</div>
			</div>
		)
	}
}
