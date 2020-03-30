import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';

/**
 * @description Renders a smaller width version of the text component
 */

export default class TextShortComponent extends TextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__text', 'schema__text__short' ]
	};
}


