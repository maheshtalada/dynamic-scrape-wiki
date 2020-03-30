import React from 'react';
import PropTypes from 'prop-types';
import CustomFormulaCalculator from '../custom/custom-formula-calculator';
import Cx from 'classnames';

export default class ContentCalculatorComponent extends CustomFormulaCalculator {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__content-calculator']
	};

	renderLabel() {
		return null;
	}

	renderWriteValue(value) {
		if(value === undefined || value === '' || value === '0' || value === 0) {
			value = '-';
		} else {
			value = (this.props.typePostfix || this.props.typePrefix) ? `${this.props.typePrefix || ''}${value} ${this.props.typePostfix || ''}`: value;
		}
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




