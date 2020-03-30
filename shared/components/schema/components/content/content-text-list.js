import React from 'react';
import PropTypes from 'prop-types';
import ContentTextComponent from './content-text';
import Cx from 'classnames';

/**
 * @description Creates a labelless text display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ContentTextListComponent extends ContentTextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__content--text--list']
	};

	renderValue(value) {
		const { label, l } = this.props;
		let valueTooltip = this.renderTooltip();
		valueTooltip.unshift(value);
		return (
			<ul>
				{
					value.map(v => {
						return (
							<li>
								<span className={Cx(this.getLabelToClass(label))} data-automation-selector={this.getDataId('value')}>{l(v)}</span>
							</li>
						)
					})
				}
			</ul>
		);

	}
}


