import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { getImagePath, getSchemaAdditionalList } from 'utils/propertyUtil';
import { getAdditionalMicrodata } from 'utils/searchUtil';
import BrokerageFirmContactDetails from '../property-details/brokerage-firm-contact-details';
import UpdateFirmDetails from './update-firm-details';
import { formatExternalUrl } from 'utils/urlUtil';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { realtordetails } from 'assets/static/social-share-options.json';
import { getAbsoluteUrl } from 'utils/urlUtil';

export default class MainHero extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		assetsPath : PropTypes.string
	};


	constructor(props) {
		super(props);
	}

	renderShareOption() {
		const { details } = this.props;
		const { awsImagePath } = this.context;
		const title = details.brokerageFirm.name;
		const logo = details.brokerageFirm.logo ? getImagePath(awsImagePath,details.brokerageFirm.logo) : '';
		return (
			<SocialShare
				emailOptions={{
					shareType : 'PROFILE'
				}}
				shareUrl={getAbsoluteUrl(details.brokerageFirm.profileURL)}
				title = {title}
				shareWrapperPosition="top"
				options = {realtordetails}
				location={this.props.location}
				user={this.props.user}
				imagePath={logo}
				profileId={details.brokerageFirm.id}
				screenSize={this.props.screenSize}
				dispatch = {this.props.dispatch}
			/>
		)
	}

	render() {

		const { details } = this.props;
		const company = details.brokerageFirm;
		const {awsImagePath, i18n : {l}, assetsPath } = this.context;
		const logo = company.logo ? getImagePath(awsImagePath,company.logo) : '';
		const additionalProperties = getAdditionalMicrodata(getSchemaAdditionalList(company.specialties, l, 'Specialities'));
		const mainInfoClass = logo ? 'col-lg-9 col-md-9 col-sm-9' : 'col-lg-12 col-md-12 col-sm-12';
		return (
			<div className="row">
				{logo && <div className="brokeragefirm-details__avatar-wrap col-lg-3 col-md-3 col-sm-3">
					<div className="brokeragefirm-details__avatar-wrap__avatar">
						<img src={logo} alt={company.name} />
					</div>
				</div>}
				<div className={`realtor-details__main-info brokeragefirm-details__main-info ${mainInfoClass}`}>
					<div className="flex flex-justify-between">
						<span className="item title">{company.name.toLowerCase()}</span>
						<UpdateFirmDetails user={this.props.user}
										   location={this.props.location}
										   dispatch={this.props.dispatch}
										   screenSize={this.props.screenSize} brokerageFirm={company}/>
					</div>
					{company.websites && company.websites.length > 0 && <a className="font-bold" href={formatExternalUrl(company.websites[0].url)} rel="noopener noreferrer" target="_blank">{company.websites[0].url}</a>}
					<BrokerageFirmContactDetails brokerageFirm={company}/>
					<div className="search-bar-actions flex">
						{this.renderShareOption()}
					</div>
				</div>
				<script type="application/ld+json" nonce={frameworkGlobals.nonce} dangerouslySetInnerHTML={{__html : JSON.stringify({
					"@context": "http://schema.org",
					"@type": "RealEstateAgent ",
					"name" : company.name,
					"image": logo,
					"logo" : logo,
					"address": {
						"@type": "PostalAddress",
						"addressLocality": company.address && company.city || '',
						"addressRegion": company.address && company.stateCode || '',
						"postalCode": '',
						"streetAddress": company.address && (company.address.lineone || company.address.locality) || ''
					},
					"url" : `https://www.propshub.com${company.profileURL}`,
					"sameAs" : company.websites && company.websites[0] && company.websites[0].url || '',
					"additionalProperty" : additionalProperties
				})}} />
			</div>
		);
	}
}
