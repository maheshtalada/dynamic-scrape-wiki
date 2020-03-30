import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { flattenSpecificatiions, flattenUtilities, getImagePath, getYearDuration } from 'utils/propertyUtil';
import AreasServed from '../common/realtor-info-components/areas-served';
import ContactBar from 'components/common/contact-bar/contact-bar';
import AddToContacts from 'components/add-to-my-contacts';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { realtordetails } from 'assets/static/social-share-options.json';
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
		return (
			<AddToContacts contactId={details.realtor.id}
						   btnText="ADDTOCONTACTS"
						   btnClass="btn-default btn-sm btn"
						   user={this.props.user}
						   onAddSuccess={()=>{console.log("CONTACTADDEDSUCCESS")}}
						   location={this.props.location} dispatch={this.props.dispatch}/>
		)
	}

	renderShareOption() {
		const { details } = this.props;
		const title = details.name;
		const { awsImagePath } = this.context;
		const imagePath = details.realtor && details.realtor.photo && getImagePath(awsImagePath,details.realtor.photo.thumbnailUri);
		return (
			<SocialShare
				emailOptions={{
					shareType : 'PROFILE'
				}}
				shareWrapperPosition="top"
				location={this.props.location}
				user={this.props.user}
				profileId={details.realtor.id}
				shareUrl={ getAbsoluteUrl(details.realtor && details.realtor.profileURL) }
				title = {title}
				imagePath = {imagePath}
				options = {realtordetails}
				screenSize = {this.props.screenSize}
				dispatch = {this.props.dispatch}
			/>
		)
	}

	render() {

		const { details, dispatch, location, user, contactBarData, isUserRealtorSame, chatUserStatus } = this.props;
		const { realtor } = details;
		const {awsImagePath, i18n, assetsPath } = this.context;
		const { l } = i18n;
		const photo = realtor.photo ? getImagePath(awsImagePath,realtor.photo.thumbnailUri) : `${assetsPath}/images/noimages/noavatar.png`;
		const areasServed = realtor.areasServed || [];
		return (
			<div className="row">
				<div className="realtor-details__avatar-wrap col-lg-3 col-md-3 col-sm-3">
					<div className="realtor-details__avatar-wrap__avatar">
						<img src={photo} alt={realtor.name} />
					</div>
				</div>
				<div className="realtor-details__main-info col-lg-9 col-md-9 col-sm-9">
					<span className="item title">{realtor.name}</span>
					{realtor.roles && <div className="profession-info">{l(realtor.roles[0])}</div>}
					<div className="other-details">
						<AreasServed areas={areasServed} className="bottom-buffer"/>
						<div className="row">
						{/* realtor.brokerageFirm &&
							<div className="item other-details col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('BROKERAGEFIRM')}`}</div>
								<div className="col-lg-8 col-md-8 col-xs-6"> <a target="_blank" href={realtor.brokerageFirm.profileURL}>{realtor.brokerageFirm.name}</a></div>
							</div>
						*/}
						{/* realtor.specialties && realtor.specialties.length > 0 &&
							<div className="item other-details col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('SPECIALTIES')}`}</div>
								<div className="col-lg-8 col-md-8 col-xs-6"> {flattenUtilities(realtor.specialties,l)}</div>
							</div>
						*/}
						{ realtor.professionalSince &&
							<div className="item other-details col-md-12 col-sm-12 col-xs-12">
								<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('YEARSOFEXPERIENCE')}`}</div>
								<div className="col-lg-8 col-md-8 col-xs-6"> {getYearDuration(realtor.professionalSince)}</div>
							</div>
						}
						{ realtor.license &&
						<div className="item other-details col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('LICENSE')}`}</div>
							<div className="col-lg-8 col-md-8 col-xs-6"> {l(realtor.license)} {realtor.licenseNumber && <span title={l('LICENSENUMBER')}>{`(${realtor.licenseNumber})`}</span>}</div>
						</div>
						}
						</div>
					</div>
					<div className="col-lg-12 col-md-12 col-sm-12 contact-share-options">
						{ realtor && <ContactBar
							contactOptions={realtor && realtor.allowedContactActions || []}
							ownerDetails={realtor}
							contactBarData={contactBarData}
							disableContactOptions = {isUserRealtorSame}
							dispatch = {dispatch}
							canChat = {chatUserStatus}
							user = {user}
							location = {location}
							chatDetails={{
								id : `${realtor.id}O${user.user.id}`,
								displayName : 'realtor',
								from : {
									id: user.user.id,
									name : user.user.name
								},
								user : {
									id: realtor.id,
									name : realtor.name
								},
								messages : []
							}}
						/>}
						{this.renderAddToContactOption()}
						{this.renderShareOption()}
					</div>
					{realtor.status && <div className="realtor-status-slogan">{realtor.status}</div>}
				</div>
				<script type="application/ld+json" nonce={frameworkGlobals.nonce} dangerouslySetInnerHTML={{__html : JSON.stringify({
					"@context": "http://schema.org",
					"@type": "Person",
					"name" : realtor.name,
					"jobTitle" : l(realtor.roles[0]),
					"image": photo,
					"affiliation" : realtor.brokerageFirm && realtor.brokerageFirm.name || '',
					"workLocation" : {
						"@type" : "Place",
						"address" : {
							"@type": "PostalAddress",
							"addressLocality": areasServed[0] && areasServed[0].cityName || '',
							"addressRegion": areasServed[0] && areasServed[0].stateCode || '',
							"addressCountry": areasServed[0] && areasServed[0].country || ''
						}
					},
					"url" : `https://www.propshub.com${realtor.profileURL}`,
					"sameAs" : realtor.websites && realtor.websites[0] && realtor.websites[0].url || '',
					"nationality" : "USA"
				})}} />
			</div>
		);
	}
}
