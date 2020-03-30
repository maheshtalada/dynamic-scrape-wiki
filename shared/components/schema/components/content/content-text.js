import React from 'react';
import PropTypes from 'prop-types';
import ContentComponent from './content';
import Cx from 'classnames';

/**
 * @description Creates a labelless text display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ContentTextComponent extends ContentComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__content--text']
	};

	renderValue(value) {
		const { label, l } = this.props;
		let valueTooltip = this.renderTooltip();
		valueTooltip.unshift(value);
		return (
			<span className={Cx(this.getLabelToClass(label))} data-automation-selector={this.getDataId('value')}>{l(value)}</span>
		);

	}

}


