import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { flattenSpecificatiions, flattenUtilities } from '../../utils/propertyUtil';

export default class AboutCompany extends Component {

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
				return (
					<div className="item other-details col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l(option.websiteURLType)}`}</div>
						<div className="col-lg-9 col-md-9 col-xs-6"><a href={option.url} rel="noopener noreferrer" target="_blank">{option.url}</a></div>
					</div>
				);
			})
		);
	}

	render() {

		const { details } = this.props;
		const company = details;
		console.log(details);
		const { l } = this.context.i18n;
		return (
			<div className="property-details__about">
				{company.about &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l('SUMMARY')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-6">{company.about}</div>
				</div>
				}
				{company.websites && company.websites.length > 0 &&
				this.renderWebsites(company.websites,l)
				}
				{/* <span className="title"> {`${l('PROFESSIONINFOCOLLAPSIBLE')}`} </span>
				{company.professions && company.professions.length > 0 &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l('PROFESSIONS')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-6">{flattenUtilities(company.professions,l)}</div>
				</div>
				}
				{company.areasOfExpertise && company.areasOfExpertise.length > 0 &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l('EXPERTISE')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-6">{flattenSpecificatiions(company.areasOfExpertise)}</div>
				</div>
				}*/}
			</div>
		);

	}
}
