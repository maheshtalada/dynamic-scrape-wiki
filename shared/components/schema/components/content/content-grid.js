/* eslint-disable func */
import React from 'react';
import ContentComponent from './content';
import { flattenSpecificatiions, flattenUtilities } from '../../../../utils/propertyUtil';
import { localeNumberFormat, localeCurrency, formatDateUtil, addlocaleCurrencyCode, formatCurrency } from '../../../../utils/localeUtil';

/**
 * @description Creates a labelless text display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ContentGridComponent extends ContentComponent {

	static defaultProps = {
		classNames: ['schema__content', 'schema__content__grid']
	};

	static handlers = {

		flattenWithOutTranslations(value) {
			return flattenSpecificatiions(value);
		},

		flattenWithTranslations(value, l) {
			return flattenUtilities(value, l)
		},

		formatNumber(value) {
			return localeNumberFormat(value, this.localeCode)
		},

		formatCurrency(value) {
			return localeCurrency(value,'','', this.localeCode)
		},

		formatCurrencyUnit(value) {
			const toFix = this.handlerOptions && this.handlerOptions.precisions || 0;
			return addlocaleCurrencyCode(formatCurrency(value,toFix, this.localeCode), this.localeCode);
		},

		formatDate(value) {
			return formatDateUtil(Number(value), this.localeCode)
		},

		booleanToYesNo(value, l) {
			if(String(value) === 'true') {
				return l('YES');
			}
			return l('NO');
		}

	};

	static runHandler(value, l) {
		if(this.handler) {
			return ContentGridComponent.handlers[this.handler].call(this, value, l)
		}
		return value;
	}

	static runPostFix(value, l) {
		if(this.postFix) {
			return `${value} ${l(this.postFix)}`;
		}
		return value;
	}

	static runTranslation(value, l) {
		if(this.translationRequired) {
			return l(value);
		}
		return value;
	}

	generateValueReducer({ value, configOptions= undefined}) {
		const { l } = this.props;
		let generatedValue = value;
		if(!configOptions) {
			if(Array.isArray(value)) {
				return 	value.map(item=>(<span className="schema__content__grid__item">{l(item)}</span>))
			}
			return l(generatedValue);
		}

		if(configOptions.isExternalLink) {
			return (
				<a target="__blank" href={value}>{value}</a>
			)
		}

		if(!configOptions.localeCode) {
			configOptions['localeCode'] = this.props.country; // default to US
		}

		const reducerActions = [
			'runHandler',
			'runTranslation',
			'runPostFix'
		];

		reducerActions.forEach(handler => {
			generatedValue =  ContentGridComponent[handler].call(configOptions, generatedValue, l);
		});

		return generatedValue;
	}

	getValueClassNames(label) {
		if(label) {
			return "schema__content__grid__value col-lg-9 col-md-9 col-xs-6";
		}

		return "schema__content__grid__value";
	}

	renderValue(value) {
		const { label, l } = this.props;
		let valueTooltip = this.renderTooltip();
		valueTooltip.unshift(value);

		return (
			<div className="schema__content__grid row">
				{label &&<div className="col-lg-3 col-md-3 col-xs-6 schema__content__grid__label"  data-automation-selector={this.getDataId('label')}>
					{`${l(label)}${this.renderLabelInfo(true)}`}
				</div>}
				<div className={this.getValueClassNames(label)}  data-automation-selector={this.getDataId('value')}>
					{this.generateValueReducer(this.props.data)}
				</div>
			</div>
		);

	}

}



