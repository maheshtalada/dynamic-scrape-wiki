import React, {Component } from 'react';
import PropTypes from 'prop-types';
import ImageCover from '../common/image-cover/image-cover';
import { flattenSpecificatiions, flattenUtilities } from '../../utils/propertyUtil';

export default class MainHero extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		assetsPath : PropTypes.string
	};

	renderAreas(areas) {
		return (
			<span>
				{areas.map(option => option.locality).join(', ')}
			</span>
		);
	}

	render() {

		const { details } = this.props;
		const company = details;
		const {awsImagePath, i18n : {l}, assetsPath } = this.context;

		return (
			<div className="row">
				<div className="property-details__main-gallery company-details__avatar-wrap col-lg-3 col-md-3 col-sm-3">
					{/* <ImageCover
						imagePath=""
						source="bg" >
						<div className="cover-strap">

						</div>
					</ImageCover>*/}
					<div className="company-details__avatar-wrap__avatar">
						<img src={company.photo ? `${awsImagePath}/${company.photo}` : `${assetsPath}/images/noimages/noavatar.png`} alt={company.name} />
					</div>
				</div>
				<div className="property-details__main-info company-details__main-info col-lg-9 col-md-9 col-sm-9">
					<span className="item title">{company.name}</span>
					<div className="other-details">
						{ company.areasServed && company.areasServed.length > 0 &&
						<div className="other-details bottom-buffer">
							{ this.renderAreas(company.areasServed) }
						</div>
						}
						{ company.professions && company.professions.length > 0 &&
						<div className="item other-details col-md-12 col-sm-12 col-xs-12">
							<div className="col-lg-4 col-md-4 col-xs-6 bold">{`${l('PROFESSIONS')}`}</div>
							<div className="col-lg-8 col-md-8 col-xs-6"> {flattenUtilities(company.professions,l)}</div>
						</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
