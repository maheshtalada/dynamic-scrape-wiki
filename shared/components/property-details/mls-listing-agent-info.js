import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RealtorInfo from 'components/property-details/realtor-info';
import BrokerageFirmInfo from './brokerage-firm-info';
import OfficeInfo from './office-info';
import METROSERVEDCONFIG from 'assets/static/metros-served-config';
import LeadRealtors from 'components/lead-realtors';
import { find as _find } from 'lodash';
const { areasServed } = METROSERVEDCONFIG;

export default class MLSListingAgentInfo extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { l } = this.context.i18n;
		const { disclaimer, mlsListing } = this.props.propertyListing;
		const metroServed = mlsListing ? _find(areasServed,{ mlsID : mlsListing.mlsId}) : '';
		const { dispatch, user, preferredProfessional , chatUserStatus, location, details, leadRealtors, leadRealtorsTitle, owner, isUserOwnerSame, referrerAgent} = this.props;

		return (
			<div className="mls-listing-agent-info">
				<div className="flex flex-column mls-listing-agent-info__wrap">
					<h4>{l('MLSLISTINGAGENT')}</h4>
					<div className="flex flex-justify-between mls-listing-agent-info__wrap__items">
						{this.props.owner && <RealtorInfo {...this.props}/>}

						{this.props.brokerageFirm && <BrokerageFirmInfo mlsListing={mlsListing} brokerageFirm={this.props.brokerageFirm} user={this.props.user}
									location={this.props.location}
									dispatch={this.props.dispatch}
									screenSize={this.props.screenSize}/>}
						{mlsListing && mlsListing.officeName && <OfficeInfo mlsListing={mlsListing} />}
					</div>
				</div>

				{ preferredProfessional && preferredProfessional.data && <div className="flex mls-info-wrap flex-column flex-justify-between">
					<h4>{l('INVESTMENTSPECIALISTS')}</h4>
					<div className="flex flex-justify-between mls-listing-agent-info__wrap__items">
						<LeadRealtors listingId={details.id}
									  title={leadRealtorsTitle}
									  stateCode={details.property && details.property.address.stateCode}
									  listingContactActions={details.allowedContactActions}
									  leadRealtors = {preferredProfessional && preferredProfessional.data}
									  referrerAgent = {referrerAgent}
									  dispatch={dispatch}
									  userObj={user}
									  details={details}
									  owner={owner}
									  isUserOwnerSame={isUserOwnerSame}
									  chatUserStatus={chatUserStatus}
									  location={location}/>
					</div>
				</div>}
				
				{mlsListing && <div className="mls-info-wrap flex flex-column flex-justify-between">
					<div>
						<h4>{l('MLSINFORMATION')}</h4>
						<div className="flex">
							<label>{l('MLSNUMBER')}</label>
							<a href={mlsListing.listingUrl} className="mls-link" rel="noopener noreferrer" target="_blank"><span>{mlsListing.mlsNumber}</span></a>
							<span>{`${mlsListing.mlsId} ${metroServed ? `(${metroServed.mlsAreaName})` : ''}`}</span>
						</div>
					</div>
					<span className="disclaimer">{disclaimer}</span>
				</div>}
			</div>
		)
	}
}
