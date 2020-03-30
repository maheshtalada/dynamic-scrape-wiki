import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { formatExternalUrl } from '../../utils/urlUtil';

export default class AboutRealtor extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	renderWebsites(websites, l) {
		return (
			websites.map((option) => {
				return (option.url &&
					<div className="item other-details col-md-12 col-sm-12 col-xs-12">
						<div className="col-lg-3 col-md-3 col-xs-6 bold">{`${l(option.websiteURLType)}`}</div>
						<div className="col-lg-9 col-md-9 col-xs-6"><a href={formatExternalUrl(option.url)} rel="noopener noreferrer" target="_blank">{option.url}</a></div>
					</div>
				);
			})
		);
	}

	render() {

		const { details } = this.props;
		const company = details;
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
			</div>
		);
	}
}
