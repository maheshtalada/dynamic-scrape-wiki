import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';

/**
 * @description Example component used to show how to use reference values for coupled components
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CustomTestComponent extends DefaultComponent {

	static propTypes = {
		referenceValues: PropTypes.array
	};

	constructor(props) {
		super(props);
	}

	renderValue(value) {
		return (
			<div>
				{this.props.referenceValues[0] * value}
			</div>
		);
	}
}


