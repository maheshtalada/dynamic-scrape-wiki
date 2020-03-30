import React from 'react';
import PropTypes from 'prop-types';
import RadioComponent from './radio';

/**
 * @description Renders an even smaller width version of the radio component
 */

export default class RadioTinyComponent extends RadioComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__radio', 'schema__radio__tiny']
	};
}


