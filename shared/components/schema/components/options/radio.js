import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';

/**
 * @description renders an input radio group.
 */

export default class RadioComponent extends DefaultComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__options', 'schema__radio']
	};


	constructor(props) {
		super(props);
	}

	renderLabel(label) {
		const { l } = this.props;
		return super.renderLabel(this.props.writeMode ?
				(<label id={`${this.state.uniqueId}_label`}>{l(label)}</label>)
				: l(label)
			);
	}

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

	renderRadioGroup(value, options) {
		if (!Array.isArray(options)) {
			// TEMPORARY
			console.error('Missing valid options', this.props);
			return null;
		}
		let labelArray = options.map( (optionObject)=>{
			let identifier = `${this.state.uniqueId}_${optionObject.value}`;
			return (
				<div className="schema__radio__item" data-automation-selector={this.getDataId(`option_${optionObject.value}`)} key={`radio_item_${optionObject.value}`}>
					<input ref="input"
						type="radio"
						id={identifier}
						name={this.props.id}
						value={optionObject.value}
						checked={value === optionObject.value}
						key={`${optionObject.value}_input`}
						data-tealium-narrative ={identifier}
						onChange={this.onChange.bind(this)}/>
					{
						this.renderRadioLabel(identifier, optionObject)
					}
				</div>
			);
		});
		let radioGroup = (
			<div className={`schema__radio__group ${labelArray.length > 2 ? 'width-3' : ''}`} key="radio_group">
				{labelArray}
			</div>
		);
		let componentArray = labelArray.length > 1 ? [radioGroup] : [];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}

		return componentArray;
	}

	renderOption(value) {
		return (this.props.data.options[value] || null);
	}

	renderValue(value) {
		let stringValue = value;

		let className = this.getValueClassNames();
		let options = this.props.data.options;
		return (
			<span className={className} aria-labelledby={`${this.state.uniqueId}_label`}>
				{this.props.writeMode ?
					this.renderRadioGroup(stringValue, options)
					: this.renderOption(stringValue)}
			</span>
		);
	}

	onChange(e) {
		this.props.storeValue(this.props.id, e.currentTarget.value);
	}
}


