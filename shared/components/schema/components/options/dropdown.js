import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import ReactDOM, { findDOMNode } from 'react-dom';

/**
 * @description Renders a dropdown component with a set of children
 * @prop data {array} Additional props for component
 */

export default class DropdownComponent extends DefaultComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array,
		disabled: PropTypes.bool
	};

	static defaultProps = {
		label: '',
		disabled: false,
		classNames: ['schema__options', 'schema__dropdown']
	};

	constructor(props) {
		super(props);
	}

	renderLabel(label) {
		const { l } = this.props;
		return this.props.writeMode ?
				(null)
				: super.renderLabel(l(label));
	}

	renderDropdown(value, options) {
		const { l } = this.props;
		if (!Array.isArray(options)) {
			// TEMPORARY
			console.error('Missing valid options', this.props);
			return null;
		}
		let stringValue = this.convertValueToString(value),
			labelClassName = this.getLabelClassNames(),
			className = this.getValueClassNames(),
			selectDefaultOptionText = this.props.label === '' ? l('SELECTOPTION') : l(this.props.label);

		return (
			<div className={className}>
				{this.renderExtraLabel(this.props.label)}
				<div className="schema__dropdown__wrapper">
					<label className={labelClassName} htmlFor={this.state.uniqueId} data-automation-selector={this.getDataId('label')}>{l(this.props.label)}{this.renderLabelInfo()}</label>
					<select value={stringValue}
							id={this.state.uniqueId}
							tabIndex={this.props.disabled ? -1 : 0}
							data-automation-selector={this.getDataId('value')}
							ref="input"
							data-tealium-narrative={this.props.label}
							onChange={this.onChange.bind(this)}>
						<option disabled value="">{selectDefaultOptionText}{this.renderLabelInfo(true)}</option>
						{options.map((optionsObject)=>{
							return (
								<option value={optionsObject.value} key={optionsObject.value}>
									{l(optionsObject.label)}
								</option>
							);
						})}
					</select>
					<i className="pe-7s-angle-down schema__dropdown__wrapper__caret" style={{ right : (this.props.data && this.props.data.tooltip) ? 30 : 8}} />
					{this.renderTooltip()}
				</div>
				{this.props.error &&
					<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>
				}
			</div>
		);
	}

	renderReadValue(value) {
		let label = (this.props.data.options.filter((option) =>{
			return option.value === value;
		})[0] || {}).label;

		if (typeof label === 'undefined') {
			console.error('VALUE NOT FOUND', this.props);
		}

		return super.renderValue(label);
	}

	renderValue(value) {
		let options = this.props.data.options;
		return this.props.writeMode? this.renderDropdown(value, options) : this.renderReadValue(value);
	}

	onChange() {
		this.props.storeValue(this.props.id, ReactDOM.findDOMNode(this.refs.input).value);
	}

}


