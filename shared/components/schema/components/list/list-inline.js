import React from 'react';
import PropTypes from 'prop-types';
import ListComponent from '../default-component/default-list';

/**
 * @description Renders a small dropwdown list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListRowComponent extends ListComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list','schema__list-inline']
	};
}


