import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import Cx from 'classnames';

/**
 * @description Renders a text input component
 */

export default class TextComponent extends DefaultComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__text'],
		isDisplayTopLabel : true
	};

	constructor(props) {
		super(props);
	}

	renderLabel(label) {
		const { l, isDisplayTopLabel } = this.props;
		if(!isDisplayTopLabel) {
			return null;
		}
		let className = this.getLabelClassNames();
		return this.props.writeMode ?
				(<label className={className} htmlFor={this.state.uniqueId}>{l(label)}{this.renderLabelInfo()}</label>)
				: (<span className={className}>{l(label)}{this.renderLabelInfo()}</span>);
	}

	renderWriteValue(value) {
		let componentArray = [
			<div key="inputTextContainer" className={Cx("schema__text__input__container",this.props.data.className)}>
				{/*{this.props.typePrefix && <span className="type-prefix">{this.props.typePrefix}</span>}*/}
				<input id={this.state.uniqueId}
				ref="input"
				placeholder={this.getPlaceHolder()}
				name={this.props.id}
				value={value}
				key="input"
				data-tealium-narrative ={this.props.label}
				onChange={this.onChange.bind(this)} />
				{this.renderTooltip()}
			</div>
		];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}

		return componentArray;
	}

	renderReadValue(value) {
		return super.renderValue(value);
	}

	renderValue(value) {
		let stringValue = this.convertValueToString(value);
		return super.renderValue(this.props.writeMode?
					this.renderWriteValue(stringValue)
					: this.renderReadValue(stringValue)
				);
	}

	render() {
		if (!this.props.writeMode && !this.hasValue()) {
			return null;
		}
		return super.render();
	}

	onChange() {
		this.props.data.changeableFields && this.props.data.changeableFields.map((field ,key) => {
			const value = field.fieldValue || field;
			const formulaType = field.formulaType || ''; 
			this.props.storeValue(`changeableFields.${value}`,true);
			if(formulaType) {
				this.props.storeValue(`changeableFields.${value}.formulaType`,formulaType);
			}
		});

		this.props.storeValue(this.props.id, this.refs.input.value);
	}
}


