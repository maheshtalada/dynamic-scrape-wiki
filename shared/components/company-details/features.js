import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import {professionsIcons} from '../../assets/static/svg-icon-map.json';

export default class Features extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	/* TODO Following function is fallback for Icon management will come from mapping */

	getIconClass(option) {
		return professionsIcons[option] || "ribbon";
	}

	renderHighlights(options, l) {

		return options.map((item) => {
			return <li className={Cx('features-wrapper-item')}>{l(item)}</li>;
		});
	}

	renderHighlights(options) {

		return options.map((item) => {
			return <li className={Cx('features-wrapper-item')}>{item}</li>;
		});
	}

	renderAmenities(options, l) {
		return (
			<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 features-wrapper">
				{
					options.map((option) => {
						return (
							<li className="features-wrapper-item col-md-2 col-lg-2 col-sm-2 col-xs-4">
								<i className={`pe-7s-${this.getIconClass(option.toLowerCase())}`} />
								{l(option)}
							</li>);
					})
				}
			</ul>
		);
	}

	render() {
		const { details } = this.props;
		const company = details;

		const { l } = this.context.i18n;
		return (
			<div className="features">
				{ company.professionTypes && company.professionTypes.length > 0 &&
				<div className="property-amenities">
					{ this.renderAmenities(company.professionTypes, l) }
				</div>
				}
				{ company.areasOfExpertise && company.areasOfExpertise.length > 0 &&
					<div className="property-highlights col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<header className="header-wrapper">
							<span className="header-title">{`${l('EXPERTISE')}`}</span>
						</header>
						<ul className="col-lg-8 col-md-8 col-sm-8 features-wrapper">
							{ this.renderHighlights(company.areasOfExpertise) }
						</ul>
					</div>
				}

			</div>
		);
	}
}
