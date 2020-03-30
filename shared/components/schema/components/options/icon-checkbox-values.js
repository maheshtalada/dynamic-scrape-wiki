import React from 'react';
import PropTypes from 'prop-types';
import CheckboxComponent from './checkbox';

/**
 * @description Renders a icon version of the checkbox component
 */

export default class IconCheckboxValuesComponent extends CheckboxComponent {


	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__checkbox', 'schema__checkbox__icon']
	};

	static actionHandlers = {
		add(list, value) {
			list.push(value);
			return list.join(",");
		},

		delete(list, value) {
			return list.filter(e => e !== value).join(",");
		}
	}

	constructor(props) {
		super(props);
	}

	componentDidMount(){
		const cid = this.props.parent().conditionalId || '',
		{ value='' } = this.props.data;
		if(cid && value){
			this.generateConditionalValues(cid, value, 'add');
		}
	}

	generateConditionalValues(cid, value, action) {
		let values = this.props.getDataByID(cid) && this.props.getDataByID(cid).split(',') || [];
		const conditionalData = IconCheckboxValuesComponent.actionHandlers[action](values, value);
		this.props.storeValue(cid, conditionalData);


	}

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

	renderCheckbox(value, options) {
		let identifier = `${this.state.uniqueId}-${options.value}`,
			checkValue = this.getBoolean(value),
			className = this.getValueClassNames();
		return (
			<div className={className} aria-labelledby={`${this.state.uniqueId}__label`}>
				<div className="schema__checkbox__values__item">
					<input ref="input"
						   type="checkbox"
						   id={identifier}
						   name={identifier}
						   data-automation-selector={this.getDataId(`option_${options.value}`)}
						   key={`${this.state.uniqueId}_input`}
						   value={options.optionValue}
						   checked={value === options.optionValue ? true : false}
						   data-tealium-narrative ={options.label}
						   onChange={(e) => {
							this.onChange(e,options.optionValue);
						}}/>
					{
						this.renderCheckboxLabel(identifier, options)
					}

				</div>
			</div>
		);
	}

	onChange(e,value) {
		let checkValue='', action='';
		const cid = this.props.parent().conditionalId || '';
		if(e.currentTarget.checked) {
			checkValue = value;
			action = 'add';
		} else {
			checkValue='';
			action = 'delete';
		}

		cid && this.generateConditionalValues(cid, value, action);
		this.props.storeValue(this.props.id, String(checkValue));

	}
}


