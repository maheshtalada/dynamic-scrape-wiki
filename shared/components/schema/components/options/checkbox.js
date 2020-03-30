import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';

/**
 * @description renders an input checkbox.
 */

export default class CheckboxComponent extends DefaultComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__options', 'schema__checkbox']
	};

	constructor(props) {
		super(props);
	}

	renderLabel(label) {
		const { l } = this.props;
		if (!label) {
			return null;
		}
		let className = this.getLabelClassNames();
		return this.props.writeMode ?
			(<label className={className} id={`${this.state.uniqueId}__label`}>{l(label)}{this.renderLabelInfo()}</label>)
			: (<span className={className}>{l(label)}{this.renderLabelInfo()}</span>);
	}

	renderCheckboxLabel(identifier, options = {}) {
		const { l } = this.props;
		return (
			<label htmlFor={identifier} key={`${identifier}_label`}>
				{l(options.label)}
			</label>
		);
	}

	renderCheckbox(value, options) {
		let identifier = `${this.state.uniqueId}-${options.value}`,
			checkValue = this.getBoolean(value),
			className = this.getValueClassNames();
		return (
			<div className={className} aria-labelledby={`${this.state.uniqueId}__label`}>
				<div className="schema__checkbox__item">
					<input ref="input"
						type="checkbox"
						id={identifier}
						name={identifier}
						data-automation-selector={this.getDataId(`option_${options.value}`)}
						key={`${this.state.uniqueId}_input`}
						value={checkValue}
						checked={checkValue}
						data-tealium-narrative ={options.label}
						onChange={this.onChange.bind(this)}/>
					{
						this.renderCheckboxLabel(identifier, options)
					}

				</div>
			</div>
		);
	}

	renderReadValue(value) {
		return (this.props.data[value] || null);
	}

	renderValue(value) {
		let stringValue = value;
		let options = this.props.data;
		return this.props.writeMode ? this.renderCheckbox(stringValue, options) : this.renderReadValue(stringValue);
	}

	onChange(e) {
		this.props.storeValue(this.props.id, String(e.currentTarget.checked));
	}
}


