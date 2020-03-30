import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { FAButton, Button } from '../common/button';
import Cx from 'classnames';


const PropertyTypes = ( {classNames , propertyTypes }) => {
	// const { propertyTypes } = propertyTypes;
	return(
		<div className={Cx('property-types-wrapper',classNames)}>
			<span>Results found for the location : 90210 </span>
			<ul className="property-types-wrapper__items">
				{
					propertyTypes.map((item)=>{
						return <li>{`${item.type} (${item.count})`}</li>;
					})
				}
			</ul>

		</div>
	);

};


export default PropertyTypes;
/* export default class PropertyTypes extends Component {

	constructor(props) {
		super(props);
	}

	renderProperties() {
		const { propertyTypes } = this.state;

		return
	}

	render() {
		const { propertyTypes } = this.state;
			console.log(propertyTypes);
		return(
			<div className="property-types-buttons">
				<ul>
					<li></li>
				</ul>

			</div>
		)
	}
};
*/
