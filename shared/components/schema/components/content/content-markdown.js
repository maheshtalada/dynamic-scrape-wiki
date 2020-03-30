import React from 'react';
import ContentComponent from './content';
import MarkdownWrapper from '../default-component/markdown-wrapper';

/**
 * @description Creates a labelless rich text  display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ContentMarkdownComponent extends ContentComponent {

	static defaultProps = {
		classNames: ['schema__content', 'schema__content-markdown']
	};

	renderValue(value) {
		// return super.renderValue (
		// 	<MarkdownWrapper value={value}/>
		// );
		return <MarkdownWrapper value={value}/>
	}
}


