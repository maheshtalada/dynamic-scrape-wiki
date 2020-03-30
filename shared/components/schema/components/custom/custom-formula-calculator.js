import React from 'react';
import TextReadComponent from '../text/text-readonly';
import { formulas } from '../../../../utils/analyze-returns-formulae';

export default class CustomFormulaCalculator extends TextReadComponent {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(props) {
		if(!formulas[props.data.formulaType]){
			return;
		}
		let calculatedValue = formulas[props.data.formulaType](props);
		//make sure value doesnt get number 0
		//prevent from infinite loop
		if(calculatedValue === 0) {
			calculatedValue = '0';
		}
		if((calculatedValue || props.data.value) && props.data.value !==  calculatedValue){
			props.storeValue(props.id, calculatedValue);
		}
	}

}





