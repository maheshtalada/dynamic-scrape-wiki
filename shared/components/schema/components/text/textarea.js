import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';
import ReactDOM from 'react-dom';

/**
 * @description Renders a set of text inputs to display a date
 */

export default class TextAreaComponent extends TextComponent {

	static propTypes = {
		label: PropTypes.string,
		maxLength: PropTypes.number,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		maxLength: 1000,
		classNames: ['schema__text-area'],
		isDisplayTopLabel : true
	};

	constructor(props) {
		super(props);

		let maxCount = this.getValidationCount(props.validation, Number(props.maxLength));
		this.state = {
			count: maxCount,
			maxCount
		};
	}

	renderLabel(label) {
		const { l, isDisplayTopLabel } = this.props;
		if(!isDisplayTopLabel) {
			return null;
		}
		let className = this.getLabelClassNames();
		return (<label className={className} htmlFor={this.state.uniqueId}>{l(label)}{this.renderLabelInfo()}</label>);
	}

	renderWriteValue(value) {
		const { l } = this.props;
		let componentArray = [
			<Fragment key="inputContainer">
				<textarea id={this.state.uniqueId}
					ref="input"
					placeholder={this.getPlaceHolder()}
					value={value}
					key="input"
					maxLength={this.props.maxLength}
					onChange={this.onChange.bind(this)} />
				<span className="schema__text-area__char-count">{this.state.count} {l('CHARACTERS')}</span>
			</Fragment>
		];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}
		return (
			<div className={this.getValueClassNames()}>
				{componentArray}
			</div>
		);
	}

	onChange() {
		let currentLength = ReactDOM.findDOMNode(this.refs.input).value.length;

		this.setState({
			count: this.state.maxCount - currentLength
		});

		this.props.storeValue(this.props.id, ReactDOM.findDOMNode(this.refs.input).value);
	}

	getValidationCount(validations,maxLength) {
		let maxLenValidation = (validations || []).filter((rule) => {
			return (rule.type === 'max-length');
		})[0];

		return ((maxLenValidation || {}).value || maxLength) * 1;
	}

}


