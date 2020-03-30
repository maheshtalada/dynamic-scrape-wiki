import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';
import Datetime from 'react-datetime';
import moment from 'moment';

/**
 * @description Renders a set of text inputs to display a short date like MM/YYYY
 */

export default class TextTimeComponent extends TextComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__text-time']
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if(this.props.data.value) {
			this.props.storeValue(this.props.id, this.props.data.value);
		}

	}

	handleChange = (newDate) => {
		this.props.storeValue(this.props.id, moment(newDate).format('h:mm a'));
	}

	renderLabel(label) {
		const { l } = this.props;
		let className = this.getLabelClassNames();
		return this.props.writeMode ?
			(<label className="schema__label schema__label--edit schema__label--valid" htmlFor={this.state.uniqueId}>{l(label)}{this.renderLabelInfo()}</label>)
			: (<span className={className}>{l(label)}{this.renderLabelInfo()}</span>);
	}

	renderWriteValue(value) {
		let componentArray = [
			<div key="inputContainer" className="schema__text__input__container">
				<Datetime
					viewMode="time"
					defaultValue={value}
					dateFormat={false}
					inputProps = {{'placeholder' : 'HH:MM' , id : this.state.uniqueId, readOnly: true}}
					closeOnSelect = {true}
					onChange={(newData)=>this.handleChange(newData)}
				/>
			</div>
		];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}
		return componentArray;
	}

}


