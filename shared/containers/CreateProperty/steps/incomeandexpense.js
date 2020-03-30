import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import AddNewIncomeExpense from './add-new-income-expense';
import { modal } from 'react-redux-modal';
import { connect } from 'react-redux';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data , Editors, Filters } from 'react-data-grid-addons';
import EmptyRowView from 'components/data-grid/empty-row';
import Spinner from 'components/common/spinner/spinner';
import df from 'dateformat';
import SiteConfig from '../../../config';
import XLSX from 'xlsx';
import FilterableHeaderCell from 'components/data-grid/filterable-header-cell';
import { formatDateUtil } from 'utils/localeUtil';
import ConfirmModal from 'components/common/confirm-modal/confirm-modal';
import PortfolioTemplateImport from 'components/property-template-import/portfolio-template-import';
import Snackbar from 'components/common/snackbar/snackbar';
import { isEmpty as _isEmpty, findIndex as _findIndex, cloneDeep as _cloneDeep } from 'lodash';
import ReactDOM from 'react-dom';
import Checkbox from 'components/common/checkbox/checkbox';
import Loader from 'components/common/page-loader/loader';
import CheckboxFilter from 'components/data-grid/checkbox-filter';
import PropertyInfoStrip from './property-info-strip';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../../redux/actions/schema'
//import loadable from '@loadable/component';

const { assetsPath } = SiteConfig;
const GA_CATEGORY = 'Create Property';
//const ReactDataGrid = loadable(() => import(/* webpackChunkName: 'ReactDataGrid' */'react-data-grid'),{ LoadingComponent: Loader});
/*
 Simple HTML Table
 usage: <OutTable data={data} cols={cols} />
 data:Array<Array<any> >;
 cols:Array<{name:string, key:number|string}>;
 */

const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};

class OutTable extends Component {
	constructor(props) { super(props); };
	render() { return (
		<div className="table-responsive">
			<table className="table table-striped">
				<thead>
				<tr>{this.props.cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
				</thead>
				<tbody>
				{this.props.data.map((r,i) => <tr key={i}>
					{this.props.cols.map(c => <td key={c.key}>{ r[c.key] }</td>)}
				</tr>)}
				</tbody>
			</table>
		</div>
	); };
};

class IncomeAndExpense extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props,context) {
		super(props);
		this.state = {
			isFetching : true,
			rows: []
		};
		const { l } = context.i18n;
        this.onNextClick = this.onNextClick.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
		this.onCloseModal= this.onCloseModal.bind(this);
		this.onAddNewIncomeModal = this.onAddNewIncomeModal.bind(this);
		this.onDeleteRow = this.onDeleteRow.bind(this);
		this.onEditRow = this.onEditRow.bind(this);
		this.isFileDialogActive = false;
		this.labelFormatter = this.labelFormatter.bind(this);
		this.dateFormatter = this.dateFormatter.bind(this);
		this.actionsFormatter = this.actionsFormatter.bind(this);

		this._columns = [
			{
				key: 'transactionDate',
				name: l('EXPENSEDATE'),
				resizable: true,
				filterable: true,
				sortable: true,
				width: 100,
				formatter: this.dateFormatter,
				filterRenderer : FilterableHeaderCell
			},
			{
				key: 'type',
				name: l('TYPE'),
				resizable: true,
				filterable: true,
				sortable: true,
				formatter: this.labelFormatter,
				isTranslateRequired : true,
				width: 140,
				filterRenderer : FilterableHeaderCell
			},
			{
				key: 'subType',
				name: l('SUBTYPE'),
				resizable: true,
				filterable: true,
				sortable: true,
				width: 120,
				filterRenderer : FilterableHeaderCell
			},
			{
				key: 'description',
				name: l('DESCRIPTION'),
				resizable: true,
				filterable: true,
				sortable: true,
				filterRenderer : FilterableHeaderCell
			},
			{
				key: 'amount',
				name: l('AMOUNT'),
				resizable: true,
				filterable: true,
				sortable: true,
				width: 160,
				filterRenderer: FilterableHeaderCell
			},
			{
				name: l('EXCLUDE'),
				key: 'isIncludedForComputation',
				getRowMetaData: (row) => row,
				filterable: false,
				filterRenderer : (props) => <CheckboxFilter l = {l} {...props}/>,
				formatter: this.excludeFormatter,
				width: 80
			},
			{
				name: l('ACTIONS'),
				key: '$delete',
				getRowMetaData: (row) => row,
				formatter: this.actionsFormatter,
				width: 80
			}
		];
	}

	componentDidMount() {
		this.enterCounter = 0;
		// Tried implementing addEventListener, but didn't work out
		document.body.onfocus = this.onFileDialogCancel;
		this.fileInputEl.addEventListener('change',(e) => {
			this.handleChange(e);
		});
		this.dataGrid && this.dataGrid.onToggleFilter();
	}

	componentWillReceiveProps(props) {
		const { get_my_property_cashflow : { cashFlows, actionResponseId, isFetching, name },
				save_schema_my_property_cashflow = {} } = props;
		const isRowSaved = save_schema_my_property_cashflow.status === 'success' && this.isSaveTriggered;
		// prevent from stale state updates
		if(cashFlows && actionResponseId && actionResponseId !== this.state.actionResponseId ) {
			const modifiedCashFlows = this.getModifiedCashflows(cashFlows);
			this.setState({ rows : modifiedCashFlows, actionResponseId, isFetching, propertyName: name })
		} else if (actionResponseId && actionResponseId !== this.state.actionResponseId) {
			this.setState({ actionResponseId, isFetching, propertyName: name })
		} else if (save_schema_my_property_cashflow.isFetching !== this.state.isSaving) {
			this.setState({
				isSaving : save_schema_my_property_cashflow.isFetching,
				propertyName: name
			});
		}
		if(isRowSaved) {
			this.isSaveTriggered = false;
			this.dataGrid.metricsUpdated();
		}
	}

	getModifiedCashflows(cashflows) {
		return cashflows.map(cashflow => {
			return {
				...cashflow,
				isIncludedForComputation : cashflow.isIncludedForComputation === false ? 'false' : 'true'
			}
		})
	}

	onCloseModal() {
		this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
			method : 'get',
			endpoint : 'getpropertycashflow',
			actionType : 'RESPONSE_GET_MY_PROPERTY_CASHFLOW',
			paramPayload : { id : this.props.location.query.id}
		}));
	}
	
	onAddNewIncomeModal() {
		const { l } = this.context.i18n;
		modal.add(AddNewIncomeExpense,{
			size : 'add-income-modal',
			isAdd : true,
			endpoint : 'savepropertycashflow',
			paramPayload : { id : this.props.location.query.id+''},
			schemaGroup : 'addschema',
			dispatch : this.props.dispatch,
			onCloseModal : this.onCloseModal,
			title : l('ADDTRANSACTION')
		});
	}

	dateFormatter({value}) {
		const { country } = this.context;
		return formatDateUtil(value,country,'DD/MM/YYYY');
	}

	actionsFormatter(props) {
		const { l } = this.context.i18n;
		const { dependentValues } = props;
		return (
			<span className="react-grid-actions">
				<a href="javascript:;" onClick={() => this.onDeleteRow(dependentValues , dependentValues.id, 'id')}><i className="pe-7s-trash" title={l('DELETE')}/></a>
				<a href="javascript:;" onClick={() => this.onEditRow(dependentValues, dependentValues.id, 'cashflowid')}><i className="pe-7s-note" title={l('EDIT')}/></a>
			</span>
		)
	}

	excludeFormatter = ({dependentValues, row}) => {
		const { l } = this.context.i18n;
		const isHidden = dependentValues.isIncludedForComputation === 'false';
		return (
			<div className={"income-step__row-hide-action-cell"}>
				<Checkbox name={dependentValues.id} id={dependentValues.id} checked={isHidden} onChange={this.onHandleExclude}/>
			</div>
		)
	}

	labelFormatter({value}) {
		const { l } = this.context.i18n;
		return l(value);
	}


	getRandomDate = (start, end) => {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
	};

	getRows = () => {
		return Data && Data.Selectors.getRows(this.state);
	};

	getSize = () => {
		return this.getRows().length;
	};

	rowGetter = (rowIdx) => {
		const rows = this.getRows();
		return rows[rowIdx];
	};

	handleGridSort = (sortColumn, sortDirection) => {
		this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
	};

	handleFilterChange = (filter) => {
		let newFilters = Object.assign({}, this.state.filters);
		if (filter.filterTerm || typeof filter.filterTerm === 'boolean') {
			newFilters[filter.column.key] = filter;
		} else {
			delete newFilters[filter.column.key];
		}

		this.setState({ filters: newFilters });
	};

	onHandleExclude = (evt) => {
		const { rows } = this.state;
		const rowId = evt.currentTarget.name;
		const rowIdx = _findIndex(rows,{ id : parseInt(rowId)});
		let newRows = _cloneDeep(rows);
		newRows[rowIdx]['isIncludedForComputation'] = evt.currentTarget.checked ? 'false' : 'true';
		this.setState({
			rows : newRows
		},() => {
			this.isSaveTriggered = true;
			this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
				method : 'post',
				endpoint : 'updatepropertycashflow',
				actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_CASHFLOW',
				paramPayload : { id : this.props.location.query.id+'' , ['cashflowid'] : rowId},
				dataPayload: newRows[rowIdx]
			}));
		});
	}

	onClickSave = (props) => {
		const { rows } = this.state;
		this.isSaveTriggered = true;
		this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
			method : 'post',
			endpoint : 'updatepropertycashflow',
			actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_CASHFLOW',
			paramPayload : { id : this.props.location.query.id+'' , ['cashflowid'] : props.row.id+''},
			dataPayload: props.row
		}));
	}

	onDeleteRow = (row, id, idKey) => {
		const { l } = this.context.i18n;
		// const confirmResponse = confirm("Are you sure you want to delete this transaction");
		modal.add(ConfirmModal,{
			size : 'phone-view',
			className : 'make-offer-modal',
			message : 'DELETETRANSACTIONCONFIRM',
			onAccept : () => {this.onDeleteRowConfirm(row,id,idKey)}
		});
	}

	onDeleteRowConfirm = (row,id,idKey) => {
		let rows = this.state.rows.slice();
		rows = rows.filter(row => row[idKey] !== id);
		this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
			method : 'post',
			endpoint : 'deletepropertycashflow',
			actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_CASHFLOW',
			paramPayload : { id : this.props.location.query.id , 'cashflowid' : id},
		}));
		this.setState({ rows })
	}

	onEditRow = (row, id, idKey) => {
		const { l } = this.context.i18n;
		modal.add(AddNewIncomeExpense,{
			size : 'add-income-modal',
			paramPayload : { id : this.props.location.query.id+'' , [idKey] : id+''},
			rowData : { ...row,id},
			endpoint : 'updatepropertycashflow',
			schemaGroup : 'editschema',
			dispatch : this.props.dispatch,
			onCloseModal : this.onCloseModal,
			title : l('EDITTRANSACTION')
		});
	}

	onClearFilters = () => {
		this.setState({ filters: {} });
	};

	handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		this.setState(state => {
		  const rows = state.rows.slice();
		  for (let i = fromRow; i <= toRow; i++) {
			rows[i] = { ...rows[i], ...updated };
		  }
		  return { rows };
		});
	};

	async handleFile(file/*:File*/) {
		/* Boilerplate to set up FileReader */
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = async (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array', cellDates: true});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1,blankrows: false});
			/* Update state */
			data.splice(0,1);
			const spliceData = ['transactionDate', 'type', 'subType', 'description', 'amount'];
			const genRows = data.map( row => {
				let rowObj = {};
				row.forEach((item , key ) => {
					if(key === 0) {
						rowObj[spliceData[key]] = df(new Date(item), "dd/mm/yyyy");
					} else {
						rowObj[spliceData[key]] = item;
					}
				});
				return rowObj;
			});
			await this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
				method : 'post',
				endpoint : 'savepropertycashflow',
				actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_CASHFLOW',
				paramPayload : { id : this.props.location.query.id},
				dataPayload: genRows
			}));
			await this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
					method : 'get',
					endpoint : 'getpropertycashflow',
					actionType : 'RESPONSE_GET_MY_PROPERTY_CASHFLOW',
					paramPayload : { id : this.props.location.query.id}
				}));
		};
		if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
	};

	handleChange(e) {
		const files = e.target.files;
		if(files && files[0]) this.handleFile(files[0]);
	};

	getCashFlows = (successMsg) => {
		this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
			method : 'get',
			endpoint : 'getpropertycashflow',
			actionType : 'RESPONSE_GET_MY_PROPERTY_CASHFLOW',
			paramPayload : { id : this.props.location.query.id}
		}));
		this.setState({
			showAck : true,
			ackMsg : successMsg
		});
	}

	hideAck = () => {
		this.setState({
			showAck : false
		});
	}

	onAddImportModal() {
		const { l } = this.context.i18n;
		const { get_my_property_cashflow } = this.props;
		const { propertyName } = this.state;
		modal.add(PortfolioTemplateImport,{
			size : 'custom',
			analyticsCategory : GA_CATEGORY,
			propertyId : this.props.location.query.id,
			propertyName,
			successCallback : this.getCashFlows,
			successMsg : 'TRANSACTIONIMPORTSUCCESS',
			description: 'Use this tool to import historical rental data for this property.',
			title : l('IMPORTINCOMEEXPENSE')
		});
	}

	render() {
		const { i18n : {l}} = this.context;
		const { value = '', isFetching, ackMsg, showAck, rows, filters, isSaving, propertyName } = this.state;
		const { stepConfig, get_my_property_cashflow } = this.props;
		const inputAttributes = {
			accept : ".xlsx,.xls",
			type: 'file',
			style: { display: 'none' },
			ref: el => this.fileInputEl = el // eslint-disable-line
		};
		const emptyViewMessage = !_isEmpty(filters) ? "FILTERNORESULTSFOUND" : "INCOMEEXPENSENOTADDED";
		return (
			<div className="income-step wizard__step-container">
				{!frameworkGlobals.isServer && ReactDOM.createPortal(
					<Snackbar active={showAck} timeout={1000} onTimeout={this.hideAck}>
						{ackMsg}
					</Snackbar>,
					document.querySelector('body'),
				)}
				{isSaving && <Loader />}
				<div className="wizard__step-container__content-wrap">
					{ !frameworkGlobals.isServer  &&  <ReactDataGrid
						ref={(datagrid) => this.dataGrid = datagrid}
						onGridSort={this.handleGridSort}
						enableCellSelect={false}
						columns={this._columns}
						rowGetter={this.rowGetter}
						rowsCount={this.getSize()}
						rowHeight={30}
                    	headerRowHeight={35}
						emptyRowsView={()=>isFetching ? <Spinner /> : <EmptyRowView message={l(emptyViewMessage)}/>}
						toolbar={
							<Toolbar>
								<button type="button" data-tag-category={GA_CATEGORY} data-tag-action='click' data-tag-label='Add Transaction' className="btn btn-default" onClick={this.onAddNewIncomeModal}><i className="pe-7s-plus"/>{l('ADD')}</button>
								<input {...inputAttributes} />
								<button data-tag-category={GA_CATEGORY} data-tag-action='click' data-tag-label='Import transaction data' type="button" className="btn btn-default" onClick={()=> {this.onAddImportModal()}}><i className="pe-7s-upload"/>{l('IMPORTDATA')}</button>
								<PropertyInfoStrip l={l} name={propertyName}/>
							</Toolbar>
						}
						headerFiltersHeight={30}
						onAddFilter={this.handleFilterChange}
						onClearFilters={this.onClearFilters}
						minHeight={400}
						onGridRowsUpdated={this.handleGridRowsUpdated} />}
				</div>

				{ this.state.data && <OutTable data={this.state.data} cols={this.state.cols} />}
				<LinearNavigation
                    nextText={l('NEXT')}
					backText={l('PREVIOUS')}
					navigatingSaveExitText = "EXIT"
					className="linear-navigation--light-theme"
					isNavigatingSaveExitRequired
                    onNext={this.onNextClick}
					onBack={this.onBackClick}
					onNavigateSaveExit={this.props.onNavigateEnd}
				/>
			</div>
		);
    }

	onSelectFileClick() {
		this.isFileDialogActive = true;
		this.fileInputEl.value = null;
		this.fileInputEl.click();
	}

    onBackClick() {
        this.props.navigatePrevious({
            step : 'purchase-details',
            query : {
				id : this.props.location.query.id
			}
        });
    }
    
	onNextClick() {
		this.props.navigateNext({
            step : 'review',
            query : {
				id : this.props.location.query.id
			}
        });
	}

}

const mapStateToProps = ({schema}) => {
	const { get_my_property_cashflow, save_schema_my_property_cashflow } = schema;
	return {
		get_my_property_cashflow,
		save_schema_my_property_cashflow
	};
};

export default connect(mapStateToProps)(connectDataFetchers(IncomeAndExpense, [
	REQUEST_SCHEMA_MY_PROPERTY
], true, {
	method : 'get',
	endpoint : 'getpropertycashflow',
	actionType : 'RESPONSE_GET_MY_PROPERTY_CASHFLOW',
	isGenerateParampayload : true,
	paramPayloadLookup : [{key : "id" , lookup : "query.id"}]
}));
