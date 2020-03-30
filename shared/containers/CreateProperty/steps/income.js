import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import AddNewIncome from './add-new-income';
import { modal } from 'react-redux-modal';
import { connect } from 'react-redux';
import { REQUEST_SCHEMA_MY_PROPERTY, REQUEST_SCHEMA_MY_PROPERTY, REQUEST_SCHEMA_MY_PROPERTY } from '../../../redux/actions/schema';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data , Editors } from 'react-data-grid-addons';
import EmptyRowView from 'components/data-grid/empty-row';
import Spinner from 'components/common/spinner/spinner';
//import Loader from 'components/common/page-loader/loader';
//import loadable from '@loadable/component';
//const ReactDataGrid = loadable(() => import(/* webpackChunkName: 'ReactDataGrid' */'react-data-grid'),{ LoadingComponent: Loader});

class Income extends Component {

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
		this.onDeleteRow = this.onDeleteRow.bind(this);
		this.onEditRow = this.onEditRow.bind(this);

		this._columns = [
			{
				key: 'startDate',
				name: 'Lease Start Date',
				resizable: true,
				filterable: true,
				sortable: true
			},
			{
				key: 'endDate',
				name: 'Lease End Date',
				resizable: true,
				filterable: true,
				sortable: true
			},
			{
				key: 'tenantName',
				name: 'Tenant Name',
				resizable: true,
				filterable: true,
				sortable: true,

			},
			{
				key: 'monthlyRent',
				name: 'Monthly Rent',
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
						<a href="javascript:;" onClick={() => this.onDeleteRow(dependentValues , dependentValues.leaseId, 'leaseId')}>Delete</a> &nbsp;&nbsp;
						<a href="javascript:;" onClick={() => this.onEditRow(dependentValues, dependentValues.leaseId, 'leaseid')}>Edit</a>
        			</span>
				)
			}
		];
	}

	componentWillReceiveProps(props) {
		const { get_my_property_income : {leases, actionResponseId, isFetching} } = props;
		// prevent from stale state updates
		if(leases && actionResponseId && actionResponseId !== this.state.actionResponseId ) {
			this.setState({rows : leases, actionResponseId, isFetching })
		} else if (actionResponseId && actionResponseId !== this.state.actionResponseId) {
			this.setState({ actionResponseId, isFetching })
		}
	}

	onCloseModal() {
		this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
			method : 'get',
			endpoint : 'getpropertylease',
			actionType : 'RESPONSE_GET_MY_PROPERTY_INCOME',
			paramPayload : { id : this.props.location.query.id}
		}));
	}
	
	onAddNewIncomeModal() {
		modal.add(AddNewIncome,{
			size : 'add-income-modal',
			isAdd : true,
			endpoint : 'savepropertyincome',
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

	onDeleteRow = (row, id, idKey) => {
		const confirmResponse = confirm("Are you sure you want to delete this Lease Details");
		if (confirmResponse  === true) {
			let rows = this.state.rows.slice();
			rows = rows.filter(row => row[idKey] !== id)
			this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
				method : 'post',
				endpoint : 'deletepropertyincome',
				actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_INCOME',
				paramPayload : { id : this.props.location.query.id , 'leaseid' : id},
			}));
			this.setState({ rows })
		} else {
			return;
		}
	}

	onEditRow = (row, id, idKey) => {
		modal.add(AddNewIncome,{
			size : 'add-income-modal',
			paramPayload : { id : this.props.location.query.id , [idKey] : id},
			rowData : { ...row,id},
			endpoint : 'updatepropertyincome',
			schemaGroup : 'editschema',
			dispatch : this.props.dispatch,
			onCloseModal : this.onCloseModal
		});
	}

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

	render() {
		const { i18n : {l}} = this.context;
		const { value = '', isFetching } = this.state;
		const { stepConfig } = this.props;
		return (
			<div className="income-step wizard__step-container">
				<div className="wizard__step-container__content-wrap">
					<h3 className="wizard__question">{stepConfig.question}</h3>
					{ !frameworkGlobals.isServer  &&  <ReactDataGrid
						onGridSort={this.handleGridSort}
						enableCellAutoFocus={false}
						columns={this._columns}
						rowGetter={this.rowGetter}
						rowsCount={this.getSize()}
						emptyRowsView={()=>isFetching ? <Spinner /> : <EmptyRowView message={l("INCOMENOTADDED")}/>}
						toolbar={
							<Toolbar
								filterRowsButtonText={<Fragment>
									<i className="pe-7s-filter"/>
									{l('FILTERS')}
								</Fragment>}
								enableFilter={true}
								customToolbars={[
									<button type="button" className="btn btn-default" onClick={this.onAddNewIncomeModal}><i className="pe-7s-plus"/>{l('ADDINCOME')}</button>,
									<button type="button" className="btn btn-default" onClick={this.onAddNewIncomeModal}><i className="pe-7s-download"/>{l('DOWNLOADIMPORTTEMPLATE')}</button>,
									<button type="button" className="btn btn-default" onClick={this.onAddNewIncomeModal}><i className="pe-7s-upload"/>{l('IMPORTDATA')}</button>
								]}
							/>
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
            step : 'purchase-details',
            query : {
				id : this.props.location.query.id
			}
        });
    }
    
	onNextClick() {
		this.props.navigateNext({
            step : 'expenses',
            query : {
				id : this.props.location.query.id
			}
        });
	}

}

const mapStateToProps = ({schema}) => {
	const { get_my_property_income } = schema;
	return {
		get_my_property_income
	};
};

export default connect(mapStateToProps)(connectDataFetchers(Income, [
	REQUEST_SCHEMA_MY_PROPERTY
], true, {
	method : 'get',
	endpoint : 'getpropertylease',
	actionType : 'RESPONSE_GET_MY_PROPERTY_INCOME',
	isGenerateParampayload : true,
	paramPayloadLookup : [{key : "id" , lookup : "query.id"}]
}));
