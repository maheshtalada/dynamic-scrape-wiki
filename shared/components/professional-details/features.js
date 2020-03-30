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
		const professional = details;

		const { l } = this.context.i18n;
		return (
			<div className="features">
				{ professional.professions && professional.professions.length > 0 &&
				<div className="property-amenities">
					<header className="header-wrapper">
						<span className="header-title">{`${l('SPECIALTIES')}`}</span>
					</header>
					{ this.renderAmenities(professional.professions, l) }
				</div>
				}
				{ professional.areasOfExpertise && professional.areasOfExpertise.length > 0 &&
					<div className="property-highlights">
						<header className="header-wrapper">
							<span className="header-title">{`${l('EXPERTISE')}`}</span>
						</header>
						<ul className="col-lg-8 col-md-8 col-sm-8 features-wrapper">
							{ this.renderHighlights(professional.areasOfExpertise) }
						</ul>
					</div>
				}

			</div>
		);
	}
}
