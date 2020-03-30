import React from 'react';
import PropTypes from 'prop-types';
import mapObject from '../../../../utils/mapObject';
import DefaultComponent from '../default-component/default-component';

/**
 * @description Renders a data table
 * @prop classNames {array} Additional classnames to be added to the component
 */


export default class DataComponent extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__data']
	};

	constructor(props) {
		super(props);
	}

	renderTableData(data) {
		let multiLevel = 1,
			keys = Object.keys(data),
			tableDataRows = [],
			keyCounter = 0;

		for (let i = 0; i < keys.length; ++i) {
			if (Array.isArray(data[keys[i]])) {
				multiLevel = Math.max(multiLevel, data[keys[i]].length);
			}
		}

		for (let i = 0; i < multiLevel; ++i) {
			tableDataRows.push(
				<tr key={i}>
					{mapObject(data, function(key) {
						let colValue = data[key];
						if (Array.isArray(colValue)) {
							colValue = colValue[i] || false;
						}
						return (<td key={keyCounter++}>{colValue || ''}</td>);
					})}
				</tr>
			);
		}
		return tableDataRows;
	}

	renderTable(dataObject) {
		let data = dataObject.value;
		let keyCounter = 0;
		if (!data) {
			return null;
		}
		return (
			<table>
				<thead>
					<tr key="headerKey">
						{mapObject(data, function(key) {
							return (<th key={keyCounter++}>{key}</th>);
						})}
					</tr>
				</thead>
				<tbody>
					{this.renderTableData(data)}
				</tbody>
			</table>
		);
	}

	renderValue() {
		let classNames = this.getValueClassNames();
		return (
			<div className={classNames}>
				{this.renderTable(this.props.data)}
			</div>
		);
	}

	hasValue() {
		return this.props.data && this.props.data.value && Object.keys(this.props.data.value).length;
	}

}


