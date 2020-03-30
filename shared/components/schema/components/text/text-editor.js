import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';
import TextEditor from '../../../text-editor/text-editor';


/**
 * @description Renders a text input component
 */

export default class TextEditorComponent extends TextComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__text']
	};

	constructor(props) {
		super(props);
	}

	renderLabel() {
		return null;
	}

	renderWriteValue(value) {
		const { l } = this.props;
		let componentArray = [
			<div key="inputTextContainer" className="schema__text__input__editor__container">
				<TextEditor
					onChange={(text)=>{
						this.onChange(text);
					}}
					value = {value}
					placeholder={l(this.props.label)}
					imageServerPayload={this.props.data.payload || ''}
				/>
			</div>
		];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}

		return componentArray;
	}

	onChange(text) {
		this.props.storeValue(this.props.id, text);
	}
}


