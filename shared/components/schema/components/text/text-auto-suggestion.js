import React from 'react';
import TextComponent from './text';
import PillsSuggestions from 'components/common/pills-suggestions/pills-suggestions';
import Cx from 'classnames';

/**
 * @description Renders a text suggestion component with auto fill suggestions component
 */

export default class TextAutoSuggestionComponent extends TextComponent {

    static defaultProps = {
		label: '',
		classNames: ['schema__text','schema__text__auto-suggestion']
    };
    
	constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
	}

	renderWriteValue(value) {
        const { l } = this.props;
		let componentArray = [
			<div key="inputTextContainer" className={Cx("schema__text__input__container ",this.props.data.className)}>
                <PillsSuggestions id={this.state.uniqueId}
                    minQueryLength={1}
                    isFullPill = {false}
                    translator = {l}
                    isAddNewPill={false}
                    suggestions={this.suggestions}
                    handleAddition={this.onChange}
                    handleInputChange={this.onChange}
                    updateInputValue={true}
                    defaultInputValue={value}
                    placeholder={this.getPlaceHolder()}/>
				{this.renderTooltip()}
			</div>
		];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}

		return componentArray;
    }
    
    onChange(value) {
		this.props.storeValue(this.props.id, value);
	}

}
