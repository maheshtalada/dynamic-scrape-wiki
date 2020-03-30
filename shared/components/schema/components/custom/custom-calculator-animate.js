import React from 'react';
import PropTypes from 'prop-types';
import CustomFormulaCalculator from '../custom/custom-formula-calculator';
import Cx from 'classnames';
import { getValueByLocale, formatCurrency } from '../../../../utils/localeUtil';

export default class CustomCalculatorAnimate extends CustomFormulaCalculator {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__calculator-animate']
	};

	formatCurrency (value) {
		const { country } = this.props;
		const currencyFormat = getValueByLocale(country,'currencyFormat');
		const currencySymbol = getValueByLocale(country,'currencySymbol');
		return `${currencySymbol}${formatCurrency(value,1,currencyFormat)}`;
	};

	updateCaprateLabel() {
		const { data : {labelConfig}, getDataByID} = this.props;
		const value = getDataByID(labelConfig.dependentId);
		if(value < 100) {
			return labelConfig.options['CASHONCASH']
		} else {
			return labelConfig.options['CAPRATE']
		}
	}

	renderLabel() {
		return null;
	}

	renderWriteValue(value) {
		const { label, labelInfo, typePrefix, l, id, data, labelPostfix } = this.props;
		let labelConf ;
		if(data.configOptions && (value !== '0')) {
			value = this[data.configOptions.handler](value);
		}

		if(data.labelConfig) {
			labelConf = this[data.labelConfig.updateHandler]();
		} else {
			labelConf = { label, tooltip : data.tooltip}
		}
		const displayVal = ( value === 'NaN' || value === '' || value === 0 || value === '0') ? '-' : `${typePrefix ? l(typePrefix) : ''}${value}${labelInfo ? l(labelInfo) : ''}`;
		let componentArray = [
			<div key="" id={id} className={Cx(this.props.data.className)}>
				{ label && <div className="schema__calculator-animate__label">
					{l(labelConf.label)}
					{labelPostfix && <span className="schema__calculator-animate__label-postfix">{l(labelPostfix)}</span>}
					{this.renderTooltip(labelConf.tooltip)}
				</div>}
				{ data.formulaType && <div className="schema__calculator-animate__value">
					{displayVal}
				</div>}
			</div>
		];

		return componentArray;
	}

}





