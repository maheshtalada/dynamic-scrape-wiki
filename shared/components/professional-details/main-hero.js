import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flattenSpecificatiions, flattenUtilities, getYearDuration } from '../../utils/propertyUtil';
import AreasServed from '../common/realtor-info-components/areas-served';
import ContactBar from '../common/contact-bar/contact-bar';
import AddToContacts from 'components/add-to-my-contacts';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { realtordetails } from '../../assets/static/social-share-options.json';
import { getAbsoluteUrl } from 'utils/urlUtil';

export default class MainHero extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		assetsPath : PropTypes.string
	};

	renderAddToContactOption() {
		const { details } = this.props;
		/*  onAddSuccess={this.onAddContactSuccess}*/
		return (
			<AddToContacts contactId={details.id}
						   btnText="ADDTOCONTACTS"
						   btnClass="btn-default btn-sm btn"
						   user={this.props.user}
						   location={this.props.location} dispatch={this.props.dispatch}/>
		)
	}

	renderShareOption() {
		const { user, location, screenSize, dispatch } = this.props;
		const { details } = this.props;
		const { awsImagePath } = this.context;
		const imagePath = details.photo && `${awsImagePath}/${details.photo}`;
		const title = details.name;
		return (
			<SocialShare
				emailOptions={{
					shareType : 'PROFILE'
				}}
				location={location}
				user={user}
				profileId={details.id}
				shareUrl={ getAbsoluteUrl(details.profileURL) }
				title = {title}
				imagePath = {imagePath}
				options = {realtordetails}
				screenSize = {screenSize}
				dispatch = {dispatch}
			/>
		)
	}

	render() {

		const { details, contactBarData, isUserProfessionalSame, chatUserStatus, user, dispatch, location } = this.props;
		const professional = details;
		const { awsImagePath, i18n: {l}, assetsPath } = this.context;
		const photo = professional.photo ? `${awsImagePath}/${professional.photo.thumbnailUri}` : `${assetsPath}/images/noimages/noavatar.png`;
		return (
			<div className="row">
				<div className="realtor-details__avatar-wrap col-lg-3 col-md-3 col-sm-3">
					{/* <ImageCover
						imagePath=""
						source="bg" >
						<div className="cover-strap">

						</div>
					</ImageCover>*/}
					<div className="realtor-details__avatar-wrap__avatar">
						<img src={photo} alt={professional.name} />
					</div>
				</div>
				<div className="realtor-details__main-info col-lg-9 col-md-9 col-sm-9">
					<span className="title">{professional.name}</span>
					{professional.profession && <div className="profession-info">{l(professional.profession)}</div>}
					<div className="other-details">
						<AreasServed areas={professional.areasServed} className="bottom-buffer"/>
						<div className="row">
						{ professional.companyName &&
						<div className="item other-details col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('COMPANYNAME')}`}</div>
							<div className="col-lg-8 col-md-8 col-xs-6">{professional.companyName}</div>
						</div>
						}
						{/* professional.professions && professional.professions.length > 0 &&
						<div className="item other-details col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('PROFESSIONS')}`}</div>
							<div className="col-lg-8 col-md-8 col-xs-6"> {flattenUtilities(professional.professions,l)}</div>
						</div>
						*/}
						{ professional.professionalSince &&
						<div className="item other-details col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('YEARSOFEXPERIENCE')}`}</div>
							<div className="col-lg-8 col-md-8 col-xs-6"> {getYearDuration(professional.professionalSince)}</div>
						</div>
						}
						{ professional.license &&
						<div className="item other-details col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('LICENSE')}`}</div>
							<div className="col-lg-8 col-md-8 col-xs-6"> {l(professional.license)} {professional.licenseNumber && <span title={l('LICENSENUMBER')}>{`(${professional.licenseNumber})`}</span>}</div>
						</div>
						}
						</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 contact-share-options">
						<ContactBar
							contactOptions={professional && professional.allowedContactActions || []}
							ownerDetails={professional}
							contactBarData={contactBarData}
							disableContactOptions = {isUserProfessionalSame}
							dispatch = {dispatch}
							canChat = {chatUserStatus}
							user = {user}
							location = {location}
							chatDetails={{
								id : `${professional.id}O${user.user.id}`,
								displayName : 'Service Provider',
								from : {
									id: user.user.id,
									name : user.user.name
								},
								user : {
									id: professional.id,
									name : professional.name
								},
								messages : []
							}}
						/>
						{this.renderAddToContactOption()}
						{this.renderShareOption()}
					</div>
					{professional.status && <div className="realtor-status-slogan">{professional.status}</div>}
				</div>
				<script type="application/ld+json" nonce={frameworkGlobals.nonce} dangerouslySetInnerHTML={{__html : JSON.stringify({
					"@context": "http://schema.org",
					"@type": "Person",
					"name" : professional.name,
					"jobTitle" : l(professional.profession),
					"image": photo,
					"affiliation" : professional.companyName || '',
					"workLocation" : {
						"@type" : "Place",
						"address" : {
							"@type": "PostalAddress",
							"addressLocality": professional.areasServed && professional.areasServed[0].locality || '',
							"addressRegion": professional.areasServed && professional.areasServed[0].stateCode || '',
							"addressCountry": professional.areasServed && professional.areasServed[0].country || ''
						}
					},
					"url" : `https://www.propshub.com${professional.profileURL}`,
					"sameAs" : professional.websites && professional.websites[0].url || '',
					"nationality" : "USA"
				})}} />
			</div>
		);
	}
}
