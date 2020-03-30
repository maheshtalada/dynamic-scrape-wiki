import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';
import TextComponent from './text';


/**
 * @description Renders a currency version of the text component
 */

export default class TextPasswordComponent extends TextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__text', 'schema__text__password']
	};

	constructor(props) {
		super(props);

		this.state = {
			hasFocus: false,
			type: 'password'
		};
	}

	renderWriteValue(value) {
		const { type } = this.state;
		const textShow = type === 'password' ? 'show' : 'hide';

		let componentArray = [
			<div key="inputPasswordContainer" className="schema__text__password__container">
				<input id={this.state.uniqueId}
					   type={type}
					   ref="inputpassword"
					   placeholder={this.getPlaceHolder()}
					   name={this.props.id}
					   value={value}
					   key="input"
					   autoComplete="new-password"
					   onChange={this.onChange.bind(this)}
				/>
				{ value.length > 0 && <span className="show-hide-control" onClick={()=> {
					this.setState({
						type: ( type === 'password' ? 'text' : 'password')
					});
				}
				}>{textShow}</span>}
			</div>
		];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}
		return componentArray;
	}

	onChange() {
		this.props.storeValue(this.props.id, ReactDOM.findDOMNode(this.refs.inputpassword).value);
	}
}


