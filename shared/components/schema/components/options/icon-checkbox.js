import React from 'react';
import PropTypes from 'prop-types';
import CheckboxComponent from './checkbox';

/**
 * @description Renders a icon version of the checkbox component
 */

export default class IconCheckboxComponent extends CheckboxComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__checkbox', 'schema__checkbox__icon']
	};

	renderCheckboxLabel(identifier, options = {}) {
		const { l } = this.props;
		return (
			<label htmlFor={identifier} key={`${identifier}_label`}>
				{
					options.icon &&
					<i className={`icon-propshub pe-7s-${options.icon}`} />
				}
				{l(options.label)}{this.renderLabelInfo()}
			</label>
		);
	}
}


