import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import ColumnDataGrid from '../../../common/data-grid/column-data-grid';

/**
 * @description renders data grid component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class DataGridComponent extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__data-grid']
	};

	static generateGridHeaders(labels) {
		let labelObject = {};
		labels.forEach((label)=>{
			labelObject[label] = {
				"label" : label
			}
		});

		return labelObject;
	}

	static renderDataItem(dataItem,key) {
		if(key && key.toLowerCase() === 'website') {
			return (
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block">
					<a target="_blank" rel="noopener noreferrer" href={`//${dataItem[key]}`}>{dataItem[key]}</a>
				</li>
			)
		}
		return (
			<li dangerouslySetInnerHTML={{__html: dataItem[key]}} className="data-grid__data-rows__row__data-list__item data-grid__data-item-block">
			</li>
		)
	}

	renderValue() {
		const { dataset }  = this.props.data;
		let componentArray = [
			<div key="dataGridContainer" className="schema__data-grid__container">
				<ColumnDataGrid
					data = {dataset.datasets}
					headers = {DataGridComponent.generateGridHeaders(dataset.labels)}
					renderCustomDataItem = {DataGridComponent.renderDataItem}
				/>
			</div>
		];
		return componentArray;
	}

}


