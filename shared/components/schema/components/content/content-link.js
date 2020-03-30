import React from 'react';
import PropTypes from 'prop-types';
import ContentComponent from './content';

/**
 * @description Creates a labelless text display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ContentLinkComponent extends ContentComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__content', 'schema__content__link']
	};

	onClick(e) {
		if (this.props.data.listenerType) {
			e.preventDefault();
			this.props.fireEvent(this.props.data.listenerType, this.props.data.listenerValues);
		}
	}

	renderValue(value) {
		let valueTooltip = this.renderTooltip();
		valueTooltip.unshift(
			<a
				href={this.props.data.link || ''}
				onClick={this.onClick.bind(this)}
				target={this.props.data.target || ''}
				title={this.props.data.title || ''}
			>
				{value}
			</a>
		);

		return super.renderValue(valueTooltip);
	}

}
