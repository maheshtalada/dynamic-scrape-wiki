import React from 'react';
import PropTypes from 'prop-types';
import kramed from 'kramed';

/**
 * @description Creates a labelless rich text  display component
 * @prop linkTargetBlank {boolean} boolean to check if links should open in a new tab
 */

export default class MarkdownWrapper extends React.Component {

	static propTypes = {
		linkTargetBlank: PropTypes.bool,
		value: PropTypes.string
	};

	static defaultProps = {
		linkTargetBlank: true
	};

	render() {
		// Disable linting warning for dangerouslySetInnerHTML as it's the only way to parse markdown
		/* eslint-disable */
		return (
			<div ref="markdown" dangerouslySetInnerHTML={this.createMarkup()}></div>
		);
		/* eslint-enable */
	}

	createMarkup() {
		return {__html: kramed(this.props.value)};
	}

}


