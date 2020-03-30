import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { formatExternalUrl } from '../../utils/urlUtil';

export default class AboutRealtor extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	renderWebsites(websites, l) {
		return (
			websites.map((option) => {
				return (option.url &&
					<div className="item other-details col-md-12 col-sm-12 col-xs-12 row">
						<div className="col-lg-3 col-md-3 col-xs-12 bold">{`${l(option.websiteURLType)}`}</div>
						<div className="col-lg-9 col-md-9 col-xs-12"><a href={formatExternalUrl(option.url)} rel="noopener noreferrer" target="_blank">{option.url}</a></div>
					</div>
				);
			})
		);
	}

	render() {

		const { details } = this.props;
		const { realtor } = details;
		const { l } = this.context.i18n;
		return (
			<div className="property-details__about row">
				{realtor.about &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12 row">
					<div className="col-lg-3 col-md-3 col-xs-12 bold">{`${l('SUMMARY')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-12">{realtor.about}</div>
				</div>
				}
				{realtor.websites && realtor.websites.length > 0 &&
					this.renderWebsites(realtor.websites,l)
				}
				{/* <span className="title"> {`${l('PROFESSIONINFOCOLLAPSIBLE')}`} </span>
				{realtor.realtorSince &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l('PROFESSIONALSINCE')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-6">{realtor.realtorSince}</div>
				</div>
				}
				{realtor.specialties && realtor.specialties.length > 0 &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l('SPECIALTIES')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-6">{flattenUtilities(realtor.specialties,l)}</div>
				</div>
				}
				{realtor.areasOfExpertise && realtor.areasOfExpertise.length > 0 &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l('EXPERTISE')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-6">{flattenSpecificatiions(realtor.areasOfExpertise)}</div>
				</div>
				}*/}
			</div>
		);
	}
}
