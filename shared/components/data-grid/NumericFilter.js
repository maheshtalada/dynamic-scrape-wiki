import React from 'react';
const { Filters : {NumericFilter}} = require('react-data-grid-addons');

export default class NumericFilterCustom extends NumericFilter {
	constructor(props) {
		super(props);
	}

	render() {
		let inputKey = 'header-filter-' + this.props.column.key;
		let columnStyle = {
			float: 'left',
			marginRight: 5,
			maxWidth: '80%'
		};
		let badgeStyle = {
			cursor: 'help'
		};

		let tooltipText = 'Input Methods: Range (x-y), Greater Then (>x), Less Then (<y)';

		return (
			<div>
				<div className="grid-filter-input-wrap">
					<input key={inputKey} type="text" placeholder="Ex. 100-200 or >200" className="form-control input-sm" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
					<i className="pe-7s-filter" />
				</div>
			</div>
		);
	}
}


