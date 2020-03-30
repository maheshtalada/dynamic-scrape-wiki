import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';
import TextComponent from './text';
import Datetime from 'react-datetime';
import moment from 'moment';
import uniqueFormId from '../../../../utils/uniqueFormId.js';
import { formatDateUtil } from 'utils/localeUtil';

/**
 * @description Renders a set of text inputs to display a date
 */

export default class TextDateComponent extends TextComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array,
		format : PropTypes.string
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__text-date'],
		format : 'MM/DD/YYYY'
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		this.setState({
			uniqueId: uniqueFormId()
		});
		this.props.data.value && this.updateStore(this.props.data.value);
	}

	onChange(ref, len='', nextRef='') {
		if( len && (ReactDOM.findDOMNode(this.refs[ref]).value).length === len) {
			this.refs[nextRef].focus();
		}

		let dateValue = [
			ReactDOM.findDOMNode(this.refs.inputDay).value,
			ReactDOM.findDOMNode(this.refs.inputMonth).value,
			ReactDOM.findDOMNode(this.refs.inputYear).value
		].join('/');
		this.props.storeValue(this.props.id, dateValue.replace('//',''));
	}

	renderLabel(label) {
		const { l } = this.props;
		let className = this.getLabelClassNames();
		return this.props.writeMode ?
			(<label className={className} htmlFor={this.state.uniqueId}>{l(label)}{this.renderLabelInfo()}</label>)
			: (<span className={className}>{l(label)}{this.renderLabelInfo()}</span>);
	}

	updateStore(date) {
		date = date.split(/[\/\-\.]/, 3);
		let month = parseInt(date[0]),
			day = parseInt(date[1]),
			year = parseInt(date[2]);

		let dateValue = [
			day,
			month,
			year
		].join('/');
		
		this.props.storeValue(this.props.id, dateValue.replace('//',''));
	}

	handleChange = (newDate) => {
		let date = moment(newDate).format('MM/DD/YYYY');
		this.updateStore(date);
	}

	renderWriteValue(value) {
		const { l } = this.props;
		const { country } = this.context;
		const { format } = this.props.data;
		value = value && formatDateUtil(value,country,'DD/MM/YYYY');
		let componentArray = [
			<div key="inputContainer" className="schema__text__input__container">
				<Datetime
					viewMode="days"
					defaultValue={value}
					value={value}
					timeFormat={false}
					dateFormat={format}
					inputProps = {{'placeholder' : this.getPlaceHolder(), 'id': this.state.uniqueId, readOnly: true}}
					closeOnSelect = {true}
					onChange={(newData)=>this.handleChange(newData)}
				/>
				{this.renderTooltip()}
			</div>
		];
		if (this.props.error) {
			let error = this.props.error;
			if(format === this.props.format) {
				let dateArr = this.props.error.split('###');
				if(dateArr[1]) {
					let date = dateArr[1].split(/[\/\-\.]/, 3),
					month = parseInt(date[1]),
					day = parseInt(date[0]),
					year = parseInt(date[2]);
					error = [dateArr[0],[
						month,
						day,
						year
					].join('/')].join('###');
				}
			}
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(error)}</div>);
		}
		return componentArray;
	}

}


