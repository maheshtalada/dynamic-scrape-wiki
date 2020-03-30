import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { specialtiesIcons } from '../../assets/static/svg-icon-map.json';
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
		return specialtiesIcons[option] || "ribbon";
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
		const { realtor } = details;

		const { l } = this.context.i18n;
		const areasOfExperties = realtor.areasOfExpertise || [];
		const specialties = realtor.specialties || [];
		const mergedSpecialties = [...specialties,...areasOfExperties];
		return (
			<div className="features">
				{ mergedSpecialties.length &&
				<div className="specialties">
					{ this.renderAmenities(mergedSpecialties, l) }
				</div>
				}
				{/* realtor.areasOfExpertise && realtor.areasOfExpertise.length > 0 &&
					<div className="property-highlights">
						<header className="header-wrapper">
							<span className="header-title">{`${l('EXPERTISE')}`}</span>
						</header>
						<ul className="col-lg-8 col-md-8 col-sm-8 features-wrapper">
							{ this.renderHighlights(realtor.areasOfExpertise) }
						</ul>
					</div>
				*/}

			</div>
		);
	}
}
