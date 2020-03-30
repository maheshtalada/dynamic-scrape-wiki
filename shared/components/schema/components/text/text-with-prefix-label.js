import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';
import Cx from 'classnames';


/**
 * @description Renders a currency version of the text component
 */

export default class TextWithPrefixLabelComponent extends TextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__text', 'schema__text__prefix__label']
	};

	constructor(props) {
		super(props);

		this.state = {
			hasFocus: false
		};
	}

	renderWriteValue(value) {
		const { inputPrefix } = this.props;
		let componentArray = [
			<div key="inputTextPrefixLabelContainer" className={Cx("schema__text__input__container ",this.props.data.className)}>
				<span className="schema__text__prefix__label--text">{inputPrefix}</span>
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

}


