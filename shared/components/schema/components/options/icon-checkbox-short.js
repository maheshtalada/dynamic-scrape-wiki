import React from 'react';
import PropTypes from 'prop-types';
import IconCheckboxComponent from './icon-checkbox';

/**
 * @description Renders a icon version of the checkbox component
 */

export default class IconCheckboxShortComponent extends IconCheckboxComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__checkbox', 'schema__checkbox__icon', 'schema__checkbox__icon__short']
	};
}


