import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { specialtiesIcons } from '../../assets/static/svg-icon-map.json';

export default class Features extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	renderHighlights(options) {

		return options.map((item) => {
			return <li className={Cx('features-wrapper-item')}>{item}</li>;
		});
	}

	renderAmenities(options, l) {
		return (
			<ul className="features-wrapper">
				{
					options.map((option) => {
						return (
							<li className="features-wrapper-item">
								{/*<i className={`pe-7s-${this.getIconClass(option.toLowerCase())}`} />*/}
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
				{ company.specialties && company.specialties.length > 0 &&
				<div className="specialties">
					{ this.renderAmenities(company.specialties, l) }
				</div>
				}
				{ company.areasOfExpertise && company.areasOfExpertise.length > 0 &&
					<div className="property-highlights">
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

	/* TODO Following function is fallback for Icon management will come from mapping */

	getIconClass(option) {
		return specialtiesIcons[option] || "ribbon";
	}
}
