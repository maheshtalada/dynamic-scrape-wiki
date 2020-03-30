import React from 'react';
import PropTypes from 'prop-types';
import CustomGroupElementsComponent from './custom-group-elements';

/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CustomMultiGroupElementsComponent extends CustomGroupElementsComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__group', 'schema__multi__group-elements']
	};

}


