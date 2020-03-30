import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';
import TextComponent from './text';


/**
 * @description Renders a currency version of the text component
 */

export default class TextHiddenComponent extends TextComponent {
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

	renderWriteValue(value) {
		let componentArray = [
			<div key="inputHiddenContainer" className="schema__text__hidden__container">
				<input id={this.state.uniqueId}
					   type="hidden"
					   ref="inputhidden"
					   name={this.props.id}
					   value={value}
					   key="input"
					   onChange={this.onChange.bind(this)}
				/>
			</div>
		];

		return componentArray;
	}

	onChange() {
		this.props.storeValue(this.props.id, ReactDOM.findDOMNode(this.refs.inputhidden).value);
	}
}
