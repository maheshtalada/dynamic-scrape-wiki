import React from 'react';
import PropTypes from 'prop-types';
import RadioComponent from './radio';

/**
 * @description Renders a smallwer width version of the radio component
 */

export default class IconRadioComponent extends RadioComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__radio', 'schema__radio__icon']
	};


	renderRadioLabel(identifier, optionObject = {}) {
		const { l } = this.props;
		return (
			<label htmlFor={identifier} key={optionObject.value}>
				{
					optionObject.icon &&
					<i className={`icon-propshub pe-7s-${optionObject.icon}`} />
				}
				{l(optionObject.label)}{this.renderLabelInfo(false,false)}
			</label>
		);
	}
}


