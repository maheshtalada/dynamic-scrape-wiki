import React from 'react';
import PropTypes from 'prop-types';
import CheckboxComponent from './checkbox';

/**
 * @description Renders a icon version of the checkbox component
 */

export default class ToggleCheckboxComponent extends CheckboxComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__checkbox', 'schema__checkbox__icon']
	};


	renderClasses(data) {
		const { value , openIcon, closeIcon } = data;
		return value && value === 'true' ? closeIcon : openIcon;
	}

	renderCheckboxLabel(identifier, options = {}) {
		const { l } = this.props;
		return (
			<label htmlFor={identifier} key={`${identifier}_label`}>
				{
					<i className={`icon-propshub ${ this.renderClasses(options)}`} />
				}
				{l(options.label)}
			</label>
		);
	}
}


