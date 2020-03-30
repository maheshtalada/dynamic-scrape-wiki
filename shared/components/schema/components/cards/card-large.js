import React from 'react';
import PropTypes from 'prop-types';
import CardComponent from './card';

/**
 * @description Renders a component with a list of children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CardLargeComponent extends CardComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__card__large']
	};

}
