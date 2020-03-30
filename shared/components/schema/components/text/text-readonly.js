import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';
import Cx from 'classnames';


/**
 * @description Renders a currency version of the text component
 */

export default class TextReadComponent extends TextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__text'],
		isDisplayTopLabel : true
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

	renderWriteValue(value) {
		value = (this.props.typePostfix || this.props.typePrefix) ? `${this.props.typePrefix || ''} ${value} ${this.props.typePostfix || ''}`: value;
		let componentArray = [
			<div key="inputReadContainer" className={Cx("schema__text__input__container",this.props.data.className)}>
				<input id={this.state.uniqueId}
					   ref="input"
					   name={this.props.id}
					   placeholder={this.getPlaceHolder()}
					   value={value}
					   key="input"
					   readOnly />
				{this.renderTooltip()}
			</div>
		];

		return componentArray;
	}
}


