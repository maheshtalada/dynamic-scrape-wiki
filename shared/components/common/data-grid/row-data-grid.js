import React  from 'react';
import DataGrid from './data-grid';

class RowDataGrid extends DataGrid {
	constructor(props) {
		super(props);
	}

	renderColumnHeaders() {
		return null;
	}

	renderColumnGridData() {
		return null;
	}
}

export default RowDataGrid;
