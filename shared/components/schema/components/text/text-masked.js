import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';
import Cx from 'classnames';
import MaskedInput from 'react-text-mask';

const MASKS = {
    'ssn' : [/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/],
    'phone-number' : [/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]
};

/**
 * @description Renders a masked version of the text component
 */

export default class TextMaskedComponent extends TextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__text']
	};

	constructor(props) {
		super(props);
    }

    getMaskValue(maskType) {
        return MASKS[maskType] || false;
    }

	renderWriteValue(value) {
        const mask = this.getMaskValue(this.props.maskType);
		let componentArray = [
			<div key="inputTextContainer" className={Cx("schema__text__input__container ",this.props.data.className)}>
                {/*{this.props.typePrefix && <span className="type-prefix">{this.props.typePrefix}</span>}*/}
                <MaskedInput id={this.state.uniqueId}
                keepCharPositions={true} 
                mask={mask}
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
    
    onChange(e) {
        const formattedValue = e.currentTarget.value && e.currentTarget.value.replace(/\D+/g, "");
		this.props.storeValue(this.props.id, formattedValue);
	}
}


