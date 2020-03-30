import React from 'react';
import CustomFormulaCalculator from './custom-formula-calculator';
import Cx from 'classnames';
import { formulas } from '../../../../utils/analyze-returns-formulae';

export default class CustomFormulaCalculatorText extends CustomFormulaCalculator {

	static defaultProps = {
		classNames: ['schema__text'],
		isDisplayTopLabel : true
	};

	constructor(props, context) {
		super(props, context);
		this.canAutoUpdate = true;
		this.pristainValue = true;
		this.cherrySum = this.getCherrySum();
		this.onInputBlur = this.onInputBlur.bind(this);
		if(props.data.value) {
			this.pristainState = true;
		}
	}

	getCherrySum() {
		const { cherrypickids= undefined, cloneKey }  = this.props;
		if(cherrypickids) {
			const cherryValue= Object.values(cherrypickids)
				.map(key=> parseFloat(this.props.getDataByID(key.replace(/\*/, cloneKey)) || 0))
				.reduce((total, current)=> total+current);
			return cherryValue;
		}
		return 0;
	}

	updatePristainState() {
		if(!this.pristainValue) {
			return false;
		}

		if(this.pristainValue && this.cherrySum !== this.getCherrySum()) {
			this.pristainValue = false;
			return false;
		}

		return true;

	}

	isUpdateObservableField(props) {
		const { data = undefined } = props;

		if(String(props.getDataByID(`changeableFields.${props.id}`)) === 'true') {
			return true
		}

		if(!data.changeableFields) {
			return true;
		}
	}

	componentWillReceiveProps(props) {
		let calculatedValue = props.data.value;

		//check of the obeservables
		if(!this.isUpdateObservableField(props)){
			return;
		}

		if(props.data && props.data.formulaType) {
			const formulaType = props.getDataByID(`changeableFields.${props.id}.formulaType`) || props.data.formulaType;
			calculatedValue = formulas[formulaType](props);
		}
		//make sure value doesnt get number 0
		//prevent from infinite loop
		if(calculatedValue === 0) {
			calculatedValue = '0';
		}
		if((calculatedValue || props.data.value) && props.data.value !==  calculatedValue && this.canAutoUpdate){
			this.pristainState = this.updatePristainState();
			!this.pristainState && props.storeValue(props.id, calculatedValue);
			if(props.getDataByID(`changeableFields.${props.id}`) === true){
				props.storeValue(`changeableFields.${props.id}`,false)
			}
		}

		if(this.suggestionSelected) {
			this.canAutoUpdate = true;
			this.suggestionSelected = false;
		}
	}

	renderWriteValue(value) {
		let componentArray = [
			<div key="inputTextContainer" className={Cx("schema__text__input__container",this.props.data.className)}>
				{/*{this.props.typePrefix && <span className="type-prefix">{this.props.typePrefix}</span>}*/}
				{this.props.typePostfix && <span className="type-postfix">{this.props.typePostfix}</span>}
				<input id={this.state.uniqueId}
					   ref="input"
					   placeholder={this.getPlaceHolder()}
					   name={this.props.id}
					   value={value}
					   key="input"
					   type="number"
					   onBlur={this.onInputBlur}
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

	onChange() {
		this.canAutoUpdate = false;
		this.pristainValue = false;
		if(this.props.data.changeableFields) {
			this.props.data.changeableFields && this.props.data.changeableFields.map((field ,key) => {
				const value = field.fieldValue || field;
				const formulaType = field.formulaType || ''; 
				this.props.storeValue(`changeableFields.${value}`,true);
				if(formulaType) {
					this.props.storeValue(`changeableFields.${value}.formulaType`,formulaType);
				}
			});
		}
		this.props.storeValue(this.props.id, this.refs.input.value);
	}

	onInputBlur() {
		this.canAutoUpdate = true;
	}
}





