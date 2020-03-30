import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { flattenSpecificatiions, flattenUtilities } from '../../utils/propertyUtil';
import { formatExternalUrl } from '../../utils/urlUtil';

export default class AboutProfessional extends Component {

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
		const professional = details;
		console.log(details);
		const { l } = this.context.i18n;
		return (
			<div className="property-details__about row">
				{professional.about &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12 row">
					<div className="col-lg-3 col-md-3 col-xs-12 bold">{`${l('SUMMARY')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-12">{professional.about}</div>
				</div>
				}
				{professional.websites && professional.websites.length > 0 &&
				this.renderWebsites(professional.websites,l)
				}
				{/* <span className="title"> {`${l('PROFESSIONINFOCOLLAPSIBLE')}`} </span>
				{professional.professions && professional.professions.length > 0 &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l('PROFESSIONS')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-6">{flattenUtilities(professional.professions,l)}</div>
				</div>
				}
				{professional.areasOfExpertise && professional.areasOfExpertise.length > 0 &&
				<div className="item other-details col-md-12 col-sm-12 col-xs-12">
					<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l('EXPERTISE')}`}</div>
					<div className="col-lg-9 col-md-9 col-xs-6">{flattenSpecificatiions(professional.areasOfExpertise)}</div>
				</div>
				}*/}
			</div>
		);
	}
}
