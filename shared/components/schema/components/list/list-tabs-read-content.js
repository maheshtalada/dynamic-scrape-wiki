import React from 'react';
import PropTypes from 'prop-types';
import ListTabs from './list-tabs';

/**
 * @description Renders radio icons list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListTabsReadContent extends ListTabs {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list','schema__list-tabs','schema__list-tabs__read-content']
	};

}


