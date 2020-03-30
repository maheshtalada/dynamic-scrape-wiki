import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';

/**
 * @description Renders a currency version of the text component
 */

export default class TextCurrencyComponent extends TextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__text', 'schema__text__currency']
	};

	constructor(props) {
		super(props);

		this.state = {
			hasFocus: false
		};
	}

	componentDidMount() {
		this.props.storeValue(this.props.id, this.props.data.value);
	}

	onFocus() {
		this.setState({
			hasFocus: true
		});
	}

	onBlur() {
		this.setState({
			hasFocus: false
		});
	}

	renderWriteValue(value) {
		let componentArray = [
			<div key="inputCurrencyContainer" className="schema__text__currency__container">
				<span className="schema__text__currency__currency-symbol">$</span>
				<input id={this.state.uniqueId}
						onFocus={this.onFocus.bind(this)}
						onBlur={this.onBlur.bind(this)}
						ref="input"
						placeholder={this.getPlaceHolder()}
						name={this.props.id}
						value={value}
						key="input" data-tealium-narrative ={this.props.label} onChange={this.onChange.bind(this)}/>
			</div>
		];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}

		return componentArray;
	}
}

