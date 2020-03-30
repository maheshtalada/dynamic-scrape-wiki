import React from 'react';
import PropTypes from 'prop-types';
import TextComponent from './text';

/**
 * @description Renders a set of text inputs to display a short date like MM/YYYY
 */

export default class TextDateCustomComponent extends TextComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__text-date-custom']
	};

	constructor(props) {
		super(props);
	}

	onChange() {
		let dateValue = [
			this.refs.inputMonth.getDOMNode().value,
			this.refs.inputYear.getDOMNode().value
		].join('/');
		this.props.storeValue(this.props.id, dateValue);
	}

	renderWriteValue(value) {
		const { l } = this.props;
		let splitDOB = value.split('/'),
			month = splitDOB[0] || '',
			year = splitDOB[1] || '';

		let componentArray = [
			<span key="inputContainer" className={this.getValueClassNames()}>
				<input ref="inputMonth" data-automation-selector={`${this.state.uniqueId}_MM`} className="schema--input schema--mobile-6 schema--width-6 schema--gutter" placeholder={l('MM')} aria-label="Month" value={month} key="inputMonth" data-tealium-narrative="inputMonth" onChange={this.onChange.bind(this)}/>
				<input ref="inputYear" data-automation-selector={`${this.state.uniqueId}_YYYY`} className="schema--input schema--mobile-6 schema--width-6" placeholder={l('YYYY')} aria-label="Year" value={year} key="inputYear" data-tealium-narrative="inputYear" onChange={this.onChange.bind(this)}/>
			</span>
		];
		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}
		return componentArray;
	}

}


