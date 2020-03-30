import React  from 'react';
import DataGrid from './data-grid';

class ColumnDataGrid extends DataGrid {
	constructor(props) {
		super(props);
	}

	renderRowHeaders() {
		return null;
	}

	renderRowGridData() {
		return null;
	}

}

export default ColumnDataGrid;
