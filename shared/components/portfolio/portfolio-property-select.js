import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { findIndex as _findIndex } from 'lodash';
import { findDOMNode } from 'react-dom';
import ReactDataGrid from'react-data-grid';
import { Data } from 'react-data-grid-addons';
import FilterableHeaderCell from 'components/data-grid/filterable-header-cell';

class PortfolioPropertySelect extends Component {
	
	static propTypes = {
		data : PropTypes.array
	}

	static contextTypes = {
		i18n : PropTypes.object
	}

	static defaultProps = {
		data : []
	}

	constructor(props,context) {
		super(props);
		const { l } = context.i18n;
        this.state = {
			showProperties : false,
			data : props.data,
			selectedIds : PortfolioPropertySelect.getDefaultSelectedIds(props.data),
			appliedIds: [],
			actionResponseId : props.actionResponseId
		};
		this.onClickApply = this.onClickApply.bind(this);
		this._columns = PortfolioPropertySelect.getColumns(props.data,l);
		this.handleBodyClick = this.handleBodyClick.bind(this);
	}

	componentDidMount() {
		console.log(this.dataGrid);
		this.dataGrid.selectAllCheckbox.checked = true;
		window.addEventListener('click', this.handleBodyClick);
		this.dataGrid && this.state.data.length > 1 && this.dataGrid.onToggleFilter();
	}

	componentWillReceiveProps(props) {
		const { l } = this.context.i18n;
		this._columns = PortfolioPropertySelect.getColumns(props.data,l);
		const isNewResponse = props.actionResponseId !== this.state.actionResponseId;
		this.setState({
			data : props.data,
			actionResponseId : props.actionResponseId,
			selectedIds : isNewResponse ? PortfolioPropertySelect.getDefaultSelectedIds(props.data) : this.state.selectedIds,
			appliedIds: isNewResponse ? [] : this.state.appliedIds
		});
		if(isNewResponse) {
			this.dataGrid.selectAllCheckbox.checked = true;
		}
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
	}

	onClearFilters = () => {
		this.setState({ filters: {} });
	};

	onClickApply() {
		this.setState({
			showProperties: false,
			appliedIds : this.state.selectedIds
		},()=>{
			const selectedProperties = this.state.data.filter((val,i) => this.state.selectedIds.indexOf(val.id) >= 0);
			this.props.onSelected(selectedProperties.length > 0 ? selectedProperties : this.state.data);
		});
	}

	render() {
		const { showProperties, data, appliedIds } = this.state;
		const { l } = this.context.i18n;
		return (
			<div className="portfolio-property-select">
				<button className="btn flex flex-align-center btn-default btn-sm portfolio-property-select__select-btn" onClick={this.showProperties}>
					<i className="portfolio-property-select__select-btn__filter-icon pe-7s-filter" />
					{appliedIds.length > 0 ? `${l('SELECTEDPROPERTIES')} (${appliedIds.length})` : `${l('ALLPROPERTIES')} (${data.length})`}
					<i className="portfolio-property-select__select-btn__dropdown-icon pe-7s-angle-down" />
				</button>
				<div className={`portfolio-property-select__grid-table-wrap ${showProperties && 'show'}`}>
					<div className="portfolio-property-select__action-wrap">
						<a href="javascript:void(0)" data-tag-category='Analyze Portfolio' data-tag-action='click' data-tag-label='Apply property filter' className="apply-btn" onClick={this.onClickApply}>{l('APPLY')}</a>
						<a href="javascript:void(0)" className="close-btn" onClick={this.hideProperties}>{l('CLOSE')}</a>
					</div>
					<ReactDataGrid
							ref={(datagrid) => this.dataGrid = datagrid}
							enableCellAutoFocus={false}
							columns={this._columns}
							rowGetter={this.rowGetter}
							rowsCount={this.getSize()}
							rowHeight={30}
							headerRowHeight={35}
							
							rowSelection={{
								showCheckbox: true,
								enableShiftSelect: true,
								onRowsSelected: this.onRowsSelected,
								onRowsDeselected: this.onRowsDeselected,
								selectBy: {
								  keys : {
									  rowKey : 'id',
									  values : this.state.selectedIds
								  }
								}
							}}
							headerFiltersHeight={30}
							onAddFilter={this.handleFilterChange}
							onClearFilters={this.onClearFilters}
							minHeight={300}
							onGridRowsUpdated={this.handleGridRowsUpdated} />
				</div>
			</div>
		);
	}

	onRowsSelected = rows => {
		this.setState({
			selectedIds: this.state.selectedIds.concat(
			rows.map(r => r.row.id)
		  )
		});
	};

	onRowsDeselected = rows => {
		let rowIndexes = rows.map(r => r.row.id);
		this.setState({
			selectedIds: this.state.selectedIds.filter(
			i => rowIndexes.indexOf(i) === -1
		  )
		});
	};

	handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		let rows = this.state.rows.slice();

		for (let i = fromRow; i <= toRow; i++) {
			let rowToUpdate = rows[i];
			let updatedRow = update(rowToUpdate, {$merge: updated});
			rows[i] = updatedRow;
		}
		this.setState({ data : rows });
	};

	handleFilterChange = (filter) => {
		let newFilters = Object.assign({}, this.state.filters);
		if (filter.filterTerm) {
			newFilters[filter.column.key] = filter;
		} else {
			delete newFilters[filter.column.key];
		}

		this.setState({ filters: newFilters });
	};

	getRows = () => {
		return Data && Data.Selectors.getRows({rows : this.state.data, filters : this.state.filters});
	};

	getSize = () => {
		return this.getRows().length;
	};

	rowGetter = (rowIdx) => {
		const rows = this.getRows();
		return rows[rowIdx];
	};

	showProperties = () => {
		this.setState({
			showProperties : !this.state.showProperties
		});
	}

	hideProperties = () => {
		const { appliedIds, selectedIds } = this.state;
		this.setState({
			selectedIds : appliedIds.length ? appliedIds : selectedIds,
			showProperties : false
		});
	}

	static getDefaultSelectedIds(data) {
		return data.map(d => d.id);
	}

	static getColumns(data,l) {
		return [
			{
				key: 'name',
				name: l('PROPERTY'),
				filterable: data.length > 1,
				filterRenderer : FilterableHeaderCell
			}
		];
	}

	static getUpdatedSelectedIds(data=[],selectedIds=[]) {
		if(!selectedIds.length || !data.length) {
			return [];
		}
		return selectedIds.filter(sid => _findIndex(data,{ id : sid}) >= 0);
	}

	handleBodyClick(evt) {
		if(!findDOMNode(this).contains(evt.target)) {
			this.hideProperties();
		}
	}

}

export default PortfolioPropertySelect;
