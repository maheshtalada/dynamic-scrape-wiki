/*
 for react data grid
 module.exports = Grid;
 module.exports.Row = require('./Row');
 module.exports.Cell = Cell;
 module.exports.HeaderCell = require('./HeaderCell');
 module.exports.RowComparer = RowComparer;
 module.exports.EmptyChildRow = require('./EmptyChildRow');
 module.exports.editors = require('common/editors');
 module.exports.formatters = require('./formatters');
 module.exports.shapes = require('common/prop-shapes');
 module.exports._constants = require('common/constants');
 module.exports._helpers = require('./helpers');

 */

/*
 for react addons
 window.ReactDataGridPlugins = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, DraggableHeader, Filters, Utils};
 module.exports = {Editors, Formatters, Toolbar, Menu, Data, ToolsPanel, Draggable, DraggableHeader, Filters, Utils};
 */
let datagrid;
if (process.env.BROWSER) {
	const ReactDataGrid = require('./react-data-grid.min');
	require('./react-data-grid-addons.min');
	 datagrid ={
		ReactDataGrid,
		...window.ReactDataGridPlugins
	}
} else {
	 datagrid = {}
}

export default datagrid;
