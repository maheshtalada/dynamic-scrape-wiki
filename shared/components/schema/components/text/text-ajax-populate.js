import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';

/**
 * @description Renders a currency version of the text component
 */

export default class TextAjaxPopulateComponent extends TextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__text', 'schema__text__ajax-populate']
	};

	constructor(props) {
		super(props);

		this.state = {
			hasFocus: false,
			value : props.data.name,
			xhr : '',
			ajaxData : [],
			showDropDown : false

		};

		this.onInputChange = this.onInputChange.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.hideDropDown = this.hideDropDown.bind(this);
		this.interval = '';
	}

	componentDidMount() {
		this.setState({
			xhr : new XMLHttpRequest()
		});
	}

	hideDropDown() {
		this.setState({
			showDropDown : false
		});
	}

	onInputChange(value) {
		this.interval && window.clearInterval(this.interval);
		this.setState({ value : value }, ()=> {
			this.props.storeValue(this.props.id, value);
			this.interval = value.length > 2 && setTimeout(this.fetchData,300);
		});
	}

	fetchData() {
		const { xhr, value } = this.state;
		const { data } = this.props;
		let _self = this;
		xhr.open('GET', `${data.url}?${data.param}=${value}`, true);
		xhr.send();

		xhr.onerror = function onErrordata() {
			console.log(data);
		};

		xhr.onload = function onSuccessdata() {
			const data = this.responseText ? JSON.parse(this.responseText) : [];
			_self.setState({
				ajaxData : data,
				showDropDown : true
			});
		};
	}

	onOptionSelect(option) {
		this.setState({
			value : option.name,
			showDropDown : false
		});
		this.props.storeValue(this.props.id, option.id);
	}

	renderCustomData() {
		const { ajaxData } = this.state;
		return ajaxData.map((option) => (
			<li className="pac-item" onClick={()=>this.onOptionSelect(option)}>{(option.name)}</li>
		));
	}

	renderWriteValue(value) {
		const { showDropDown } = this.state;
		let inputValue = '';
		if(this.state.value) {
			inputValue = this.state.value;
		}

		let componentArray = [
			<div key="inputAjaxPopulateContainer" className="schema__text__ajaxpopulate__container">
				<input id={this.state.uniqueId}
					   type="text"
					   ref="inputgoogleplace"
					   placeholder={this.getPlaceHolder()}
					   name={this.props.id}
					   value={inputValue}
					   onChange={(evt)=> this.onInputChange(evt.target.value)}
				/>
				{
					showDropDown && <div className="custom-auto-complete pac-container">
						<ul>
							{this.renderCustomData()}
						</ul>
					</div>
				}
			</div>
		];

		return componentArray;
	}

}


