import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import TextComponent from './text';
import moment from 'moment';

/**
 * @description Renders a set of text inputs to display a date
 */

export default class TextDateCustomeComponent extends TextComponent {

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
		if(process.env.BROWSER) {
			this.DatePicker = require('react-date-picker').default;
		}
	}

	/*componentWillMount() {
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
	}*/

	componentDidMount(){
		console.log(document.querySelector('.react-date-picker__inputGroup__day'));
		document.querySelector('.react-date-picker__inputGroup__day').placeholder = 'dd';
		document.querySelector('.react-date-picker__inputGroup__month').placeholder = 'mm';
		document.querySelector('.react-date-picker__inputGroup__year').placeholder = 'yyyy'
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
		return dateValue;
	}

	handleChange = (newDate) => {
		let date = moment(newDate).format('MM/DD/YYYY');
		this.props.storeValue(this.props.id, this.updateStore(date));
	}

	renderWriteValue(value) {
		value = value && this.updateStore(value);
		const { l } = this.props;
		const { format } = this.props.data;
		const DatePicker = this.DatePicker || '';
		let componentArray = [
			<div key="inputContainer" className="schema__text__input__container">
				{ DatePicker && <DatePicker
					onChange={this.handleChange.bind(this)}
					value={value ? new Date(value) : ''}
					clearIcon = ''
				/> }
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


