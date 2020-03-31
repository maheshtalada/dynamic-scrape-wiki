import React from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import CustomFormulaCalculatorText from '../custom/custom-formula-calculator-text';
import { Scrollbars } from 'react-custom-scrollbars';

/**
 * @description Renders a currency version of the text component
 */

export default class TextSuggestionComponent extends CustomFormulaCalculatorText {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__text', 'schema__text__suggestion'],
		isDisplayTopLabel : true
	};

	constructor(props) {
		super(props);
		console.log(props.data);
		this.state = {
			hasFocus: false,
			value : props.data.value,
			//suggestions : props.data.options,
			showDropDown : false
		};
		this._ignoreBlur = false;
		this.onInputChange = this.onInputChange.bind(this);
		this.hideDropDown = this.hideDropDown.bind(this);
		this.showDropdown = this.showDropdown.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	hideDropDown() {
		this.setState({
			showDropDown : false
		});
	}

	toggleDropdown() {
		this.setState({
			showDropDown : !this.state.showDropDown
		})
	}

	showDropdown() {
		this.setState({
			showDropDown : true
		})
	}

	onInputChange(value) {
		this.canAutoUpdate = false;
		this.pristainValue = false;
		this.setState({ showDropDown : value === '' }, ()=> {
			if(this.props.data.changeableFields) {
				this.props.data.changeableFields && this.props.data.changeableFields.map((field ,key) => {
					this.props.storeValue(`changeableFields.${field}`,true);
				});
				//this.props.storeValue(`trackFieldUpdate.${this.props.id}`, true); 
			}
			this.props.storeValue(this.props.id, value);
		});
	}

	setIgnoreBlur(flag) {
		this._ignoreBlur = flag;
	}

	onInputBlur() {
		this.canAutoUpdate = true;
		if(this._ignoreBlur) {
			return;
		}
		this.hideDropDown();
	}

	onOptionSelect(option) {
		this.canAutoUpdate = true;
		this.suggestionSelected = true;
		this.setState({
			value : option.value,
			showDropDown : false
		});
		this.props.storeValue(this.props.id, option.value);
		if(this.props.data.changeableFields) {
			this.props.data.changeableFields && this.props.data.changeableFields.map((field ,key) => {
				this.props.storeValue(`changeableFields.${field}`,true);
			});
		}
		if(this.props.dependentId) {
			this.props.storeValue(this.props.dependentId, option.dependentValue);
		}
	}

	renderCustomData() {
		const { l, data } = this.props;
		//const { suggestions } = this.state;
		if(!data.options) {
			return null;
		}
		return data.options.map((option) => (
			<li className="pac-item"
				onMouseEnter={()=>{this.setIgnoreBlur(true)}}
				onMouseLeave={()=>{this.setIgnoreBlur(false)}}
				onClick={()=>this.onOptionSelect(option)}>{l(option.label)}
			</li>
		));
	}

	renderWriteValue(value) {
		const { showDropDown } = this.state;

		let componentArray = [
			<div key="inputAjaxPopulateContainer" className={Cx("schema__text__ajaxpopulate__container",this.props.data.className)}>
				{this.props.typePostfix && <span className="type-postfix">{this.props.typePostfix}</span>}
				<input id={this.state.uniqueId}
					   type="text"
					   ref="inputcalculatesuggestion"
					   placeholder={this.getPlaceHolder()}
					   name={this.props.id}
					   value={value}
					   onFocus={this.showDropdown}
					   onBlur={this.onInputBlur}
					   onChange={(evt)=> this.onInputChange(evt.target.value)}
				/>
				<i onClick={this.toggleDropdown} className={Cx("schema__text__suggestion__dropdown-icon",showDropDown ? "pe-7s-angle-up" : "pe-7s-angle-down")} />
				{
					showDropDown && <div className="custom-auto-complete pac-container">
						<Scrollbars className="scrollbars" autoHeight={true} autoHeightMax={200}>
							<ul>
								{this.renderCustomData()}
							</ul>
						</Scrollbars>
					</div>
				}
			</div>
		];

		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}

		return componentArray;
	}

}


