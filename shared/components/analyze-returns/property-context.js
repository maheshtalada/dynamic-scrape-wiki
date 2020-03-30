import React, { Fragment } from 'react';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { getValueByLocale } from 'utils/localeUtil';
import { Link } from 'react-router';
import MainHeroPrimeInfo from 'components/property-details/main-hero-prime-info';

export default function PropertyContext(props) {
	const { propertyListing, l, country, zillowListingUrl } = props;
	return (
		<Fragment>
			<div className="property-details__address">
				<i className="pe-7s-preferred-location"/>
				<div className="flex flex-align-end property-details__address-wrap">
					{(propertyListing.property.discloseAddress !== false && getValueByLocale(country,'showFormattedAddress')) ?
						<address>
							<Link to={propertyListing.listingURL} target="_blank" className="property-details__address__line-one">
								{propertyListing.property.formattedAddress}
							</Link>
						</address> :
						<span>{l('ADDRESSUNDISCLOSED')}</span>
					}
					{
						zillowListingUrl &&
						<Link to={zillowListingUrl} target="_blank" className="cash-return-modal__property-details__details-link">Details on Zillow</Link>
					}

				</div>
			</div>
			<MainHeroPrimeInfo country={country} l={l} details={propertyListing} showBasicInfo={true}/>
		</Fragment>
	)
}
