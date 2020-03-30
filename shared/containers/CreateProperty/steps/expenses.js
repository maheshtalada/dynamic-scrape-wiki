import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import AddNewExpense from './add-new-expense';
import { modal } from 'react-redux-modal';
import { connect } from 'react-redux';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data , Editors } from 'react-data-grid-addons';
import EmptyRowView from 'components/data-grid/empty-row';
import Spinner from 'components/common/spinner/spinner';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../../redux/actions/schema';
//import loadable from '@loadable/component';
//import Loader from 'components/common/page-loader/loader';
//const ReactDataGrid = loadable(() => import(/* webpackChunkName: 'ReactDataGrid' */'react-data-grid'),{ LoadingComponent: Loader});


class Expenses extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			isFetching : true
		};
		this.onNextClick = this.onNextClick.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
		this.onCloseModal= this.onCloseModal.bind(this);
		this.onAddNewIncomeModal = this.onAddNewIncomeModal.bind(this);

		this._columns = [
			{
				key: 'expenseDate',
				name: 'Expense Date',
				resizable: true,
				filterable: true,
				sortable: true
			},
			{
				key: 'expenseType',
				name: 'Expense Type',
				resizable: true,
				filterable: true,
				sortable: true
			},
			{
				key: 'description',
				name: 'Description',
				resizable: true,
				filterable: true,
				sortable: true,

			},
			{
				key: 'amount',
				name: 'Amount',
				resizable: true,
				filterable: true,
				sortable: true
			},
			{
				name: 'Actions',
				key: '$delete',
				getRowMetaData: (row) => row,
				formatter: ({ dependentValues }) => (
					<span>
						<a href="javascript:;" onClick={() => this.onDeleteRow(dependentValues , dependentValues.expenseId, 'expenseId')}>Delete</a> &nbsp;&nbsp;
						<a href="javascript:;" onClick={() => this.onEditRow(dependentValues, dependentValues.expenseId, 'expenseid')}>Edit</a>
        			</span>
				)
			}
		];
	}

	componentWillReceiveProps(props) {
		const { get_my_property_expense : {expenses, actionResponseId, isFetching} , save_schema_my_property_expense} = props;
		// prevent from stale state updates
		if(expenses && actionResponseId && actionResponseId !== this.state.actionResponseId ) {
			this.setState({rows : expenses, actionResponseId, isFetching })
		} else if (actionResponseId && actionResponseId !== this.state.actionResponseId) {
			this.setState({ actionResponseId, isFetching })
		}
	}

	onCloseModal() {
		this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
			method : 'get',
			endpoint : 'getpropertyexpense',
			actionType : 'RESPONSE_GET_MY_PROPERTY_EXPENSE',
			paramPayload : { id : this.props.location.query.id}
		}));
	}

	onAddNewIncomeModal() {
		modal.add(AddNewExpense,{
			size : 'add-income-modal',
			isAdd : true,
			endpoint : 'savepropertyexpense',
			paramPayload : { id : this.props.location.query.id},
			schemaGroup : 'addschema',
			dispatch : this.props.dispatch,
			onCloseModal : this.onCloseModal
		});
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
		if (filter.filterTerm) {
			newFilters[filter.column.key] = filter;
		} else {
			delete newFilters[filter.column.key];
		}

		this.setState({ filters: newFilters });
	};

	onClearFilters = () => {
		this.setState({ filters: {} });
	};

	handleAddRow = ({ newRowIndex }) => {
		const newRow = {
			value: newRowIndex,
			userStory: '',
			developer: '',
			epic: ''
		};

		let rows = this.state.rows.slice();
		rows.splice(0,0, newRow);
		//rows = update(rows, {$push: [newRow]});
		this.setState({ rows });
	};

	handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		let rows = this.state.rows.slice();

		for (let i = fromRow; i <= toRow; i++) {
			let rowToUpdate = rows[i];
			let updatedRow = update(rowToUpdate, {$merge: updated});
			rows[i] = updatedRow;
		}

		this.setState({ rows });
	};

	onDeleteRow = (row, id, idKey) => {
		const confirmResponse = confirm("Are you sure you want to delete this Expense Details");
		if (confirmResponse  === true) {
			let rows = this.state.rows.slice();
			rows = rows.filter(row => row[idKey] !== id)
			this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
				method : 'post',
				endpoint : 'deletepropertyexpense',
				actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_EXPENSE',
				paramPayload : { id : this.props.location.query.id , 'expenseid' : id},
			}));
			this.setState({ rows })
		} else {
			return;
		}
	}

	onEditRow = (row, id, idKey) => {
		modal.add(AddNewExpense,{
			size : 'add-income-modal',
			paramPayload : { id : this.props.location.query.id , [idKey] : id},
			rowData : { ...row,id},
			endpoint : 'updatepropertyexpense',
			schemaGroup : 'editschema',
			dispatch : this.props.dispatch,
			onCloseModal : this.onCloseModal
		});
	}

	render() {
		const { i18n : {l}} = this.context;
		const { value = '', isFetching } = this.state;
		const { stepConfig } = this.props;
		return (
			<div className="income-step wizard__step-container">
				<h3 className="wizard__question">{stepConfig.question}</h3>
				<div className="wizard__step-container__content-wrap">
					{ !frameworkGlobals.isServer  &&  <ReactDataGrid
						onGridSort={this.handleGridSort}
						enableCellAutoFocus={false}
						columns={this._columns}
						rowGetter={this.rowGetter}
						rowsCount={this.getSize()}
						emptyRowsView={()=>isFetching ? <Spinner /> : <EmptyRowView message={l("EXPENSESNOTADDED")}/>}
						toolbar={<Toolbar
							filterRowsButtonText={l('FILTERS')}
							enableFilter={true} 
							customToolbars={[
								<button type="button" className="btn btn-default" onClick={this.onAddNewIncomeModal}>{l('ADDEXPENSE')}</button>,
								<button type="button" className="btn btn-default" onClick={this.onAddNewIncomeModal}>{l('DOWNLOADIMPORTTEMPLATE')}</button>,
								<button type="button" className="btn btn-default" onClick={this.onAddNewIncomeModal}>{l('IMPORTDATA')}</button>
							]} />
						}
						onAddFilter={this.handleFilterChange}
						onClearFilters={this.onClearFilters}
						minHeight={300}
						onGridRowsUpdated={this.handleGridRowsUpdated} />}
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					backText={l('BACK')}
					navigatingSaveExitText = "SAVEANDEXIT"
					className="linear-navigation--light-theme"
					isNavigatingSaveExitRequired
					onNext={this.onNextClick}
					onBack={this.onBackClick}
					onNavigateSaveExit={this.props.onNavigateEnd}
				/>
			</div>
		);
	}

	onBackClick() {
		this.props.navigatePrevious({
			step : 'income',
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
	const { get_my_property_expense,
		save_schema_my_property_expense} = schema;
	return {
		get_my_property_expense,
		save_schema_my_property_expense
	};
};

export default connect(mapStateToProps)(connectDataFetchers(Expenses, [
	REQUEST_SCHEMA_MY_PROPERTY
], true, {
	method : 'get',
	endpoint : 'getpropertyexpense',
	actionType : 'RESPONSE_GET_MY_PROPERTY_EXPENSE',
	isGenerateParampayload : true,
	paramPayloadLookup : [{key : "id" , lookup : "query.id"}]
}));
