import React from 'react';
import PropTypes from 'prop-types';
import ContentComponent from '../content/content';

/**
 * @description Renders a footer for card
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default  class CardFooterComponent extends ContentComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__card__footer']
	};

}


