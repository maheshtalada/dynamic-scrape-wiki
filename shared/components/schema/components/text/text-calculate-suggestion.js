import React from 'react';
import PropTypes from 'prop-types';
import CustomFormulaCalculatorText from '../custom/custom-formula-calculator-text';
import Cx from 'classnames';

const DISABLE = 'disable';
export default class TextCalculatorSuggestionComponent extends CustomFormulaCalculatorText {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__text', 'schema__text__suggestion'],
		isDisableRequired : false,
		isDisplayTopLabel : true
	};

	constructor(props) {
		super(props);
		this.canAutoUpdate = true;
		this.pristainValue = true;
		this.cherrySum = this.getCherrySum();
		if(props.data.value) {
			this.pristainState = true;
		}
		this.state = {
			hasFocus: false,
			value : props.data.value,
			suggestions : props.data.options,
			showDropDown : false
		};
		this._ignoreBlur = false;
		this.onInputChange = this.onInputChange.bind(this);
		this.hideDropDown = this.hideDropDown.bind(this);
		this.showDropdown = this.showDropdown.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
	}
	onInputChange(value) {
		this.canAutoUpdate = false;
		this.pristainValue = false;
		this.setState({ showDropDown : value === '' }, ()=> {
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
		this.canAutoUpdate = false;
		this.suggestionSelected = true;
		this.setState({
			showDropDown : false
		},()=>{
			this.props.storeValue(this.props.id, option.value);
		});
	}

	renderCustomData() {
		const { suggestions } = this.state;
		const { l } = this.props;
		return suggestions.map((option) => (
			<li className="pac-item"
				onMouseEnter={()=>{this.setIgnoreBlur(true)}}
				onMouseLeave={()=>{this.setIgnoreBlur(false)}}
				onClick={()=>this.onOptionSelect(option)}>
					{l(option.label)}
			</li>
		));
	}

	showDropdown() {
		this.setState({
			showDropDown : true
		})
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

	renderWriteValue(value) {
		const { showDropDown } = this.state;
		const { isDisableRequired } = this.props;

		let componentArray = [
			<div key="inputSuggestionContainer" className={Cx("schema__text__ajaxpopulate__container",this.props.data.className)}>
				<input id={this.state.uniqueId}
					   type="text"
					   ref="inputcalculatesuggestion"
					   placeholder={this.getPlaceHolder()}
					   name={this.props.id}
					   value={value}
					   onFocus={(!isDisableRequired && this.showDropdown) || (isDisableRequired && value && this.showDropdown)}
					   onBlur={this.onInputBlur}
					   onChange={(evt)=> this.onInputChange(evt.target.value)}
					   disabled={(isDisableRequired && !value && 'disabled') || ''}
				/>
				<i onClick={(!isDisableRequired && this.toggleDropdown) || (isDisableRequired && value && this.toggleDropdown)} className={Cx("schema__text__suggestion__dropdown-icon",showDropDown ? "pe-7s-angle-up" : "pe-7s-angle-down")} />
				{
					(showDropDown) && <div className="custom-auto-complete pac-container">
						<ul>
							{this.renderCustomData()}
						</ul>
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


