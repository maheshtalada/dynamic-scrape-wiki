import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { values as _values, sortBy as _sortBy } from 'lodash';
import { Button } from '../button';
import Paginate from '../../pagination';
import Cx from 'classnames';

class DataGrid extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		headers: PropTypes.object,
		actionsConfig: PropTypes.object,
		handleDataGridAction: PropTypes.func,
		pageCount: PropTypes.number,
		currentPage: PropTypes.number,
		handlePageClick: PropTypes.func,
		isPaginationRequired: PropTypes.bool,
		renderCustomColumnHeaders: PropTypes.func,
		renderCustomDataItem: PropTypes.func,
		renderCustomDataGridRow: PropTypes.func
	};

	static defaultProps = {
		headers: {},
		actionsConfig: {},
		handleDataGridAction: ()=>{},
		isPaginationRequired: false
	};
	static contextTypes = {
		i18n : PropTypes.object,
		screenSize : PropTypes.number
	};

	static getHeaderName(header,config) {
		return config.label || header;
	}

	renderColumnHeaders(headers) {
		const { l } = this.context.i18n;
		const headerKeys = Object.keys(headers);
		if(headerKeys.length > 0) {
			return (
				<ul className="data-grid__column-headers">
					{
						headerKeys.map((key)=> <li className={`data-grid__column-headers__header data-grid__data-item-block ${headers[key].class}`}>
							<div>{l(DataGrid.getHeaderName(key,headers[key]))}</div>
							{headers[key] && headers[key].labelPostfix && <span className="data-grid__row-headers__header__postfix">{` - ${l(headers[key].labelPostfix)}`}</span>}
						</li> )
					}
				</ul>
			);
		}
	}

	renderRowHeaders(rowHeaders) {
		let headers = [];
		headers = this.sortHeaders(rowHeaders);
		const { l } = this.context.i18n;
		return (
			<ul className="data-grid__row-headers">
				{
					headers.map((header) => <li className="data-grid__row-headers__header data-grid__data-item-block">
						{l(header.label)}
						{header.labelPostfix && <span className="data-grid__row-headers__header__postfix">{l(header.labelPostfix)}</span>}
					</li>)
				}
			</ul>
		);
	}

	sortHeaders(headers) {
		return _sortBy(headers, header => header.order);
	}

	onClickAction(dataItemId,cb) {
		this.props.handleDataGridAction(dataItemId,cb);
	}

	renderDataItem(dataItem,header) {
		const { actionsConfig } = this.props;
		const { l } = this.context.i18n;
		/*
			rendering dataItem content as dangerouslySetInnerHTML to handle HTML entities like '&#2716;'
		 	https://titobouzout.github.io/react/docs/jsx-gotchas.html#html-entities
		* */
		return (
			header !== 'actions' ?
				<li dangerouslySetInnerHTML={{__html: dataItem[header]}} className="data-grid__data-rows__row__data-list__item data-grid__data-item-block">
				</li> :
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block">
					{
						dataItem.actions.map(action => {
							let actionName = action.name.toLowerCase();
							return (
								action.flag &&
								<span className="data-grid__data-rows__row__data-list__item data-grid__data-item-block__action-item">
									<Button onClick={()=>{
										this.handleDataGridAction({id: dataItem.id,uri: action.uri},actionsConfig[actionName].callback);
									}} btnClassName="btn btn-outline">
										<i title={l(actionsConfig[actionName].label)} className={`pe-7s-${actionsConfig[actionName].icon}`} />
									</Button>
								</span>
							);
						})
					}
				</li>
		);
	}

	renderDataGridRow(dataItem,headers) {
		const { renderCustomDataItem } = this.props;
		const headerKeys = Object.keys(headers);
		const { screenSize, i18n : {l} } = this.context;
		return (
			<ul className="data-grid__data-rows__row__data-list">
				{screenSize > 2 ? headerKeys.map((key) => (typeof renderCustomDataItem === 'function' ?
					renderCustomDataItem(dataItem,key) :
					this.renderDataItem(dataItem,key))
				) :
				headerKeys.map((key)=>{
					return (
						<li className="data-grid__data-rows__row__data-list__data-item-with-header">
							<div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(DataGrid.getHeaderName(key,headers[key]))}</div>
							<div className="data-grid__data-rows__row__data-list__data-item-with-header__value">{typeof renderCustomDataItem === 'function' ?
								renderCustomDataItem(dataItem,key) :
								this.renderDataItem(dataItem,key)}
							</div>
						</li>
					)
				})
				}
			</ul>
		);
	}

	renderRowGridData(data,rowHeaders) {
		if (rowHeaders.length > 0) {
			return (
				<ul className="data-grid__data-rows">
					{rowHeaders.map(header =>
						<li className="data-grid__data-rows__row">
							{data[header.key]}
						</li>
					)}
				</ul>
			)
		}
	}

	renderColumnGridData(data,headers) {
		const { renderCustomDataGridRow } = this.props;
		return (
			<ul className="data-grid__data-rows">
				{data.map((dataItem,index) =>
					<li className="data-grid__data-rows__row">
						{
							typeof renderCustomDataGridRow === 'function' ?
								renderCustomDataGridRow(dataItem,index,headers) :
								this.renderDataGridRow(dataItem,headers)
						}
					</li>
				)}
			</ul>
		)
	}

	renderPagination() {
		const {handlePageClick,pageCount,currentPage} = this.props;
		const { screenSize } = this.context;
		return (
			<div className="data-grid__pagination-wrapper">
			<Paginate previousLabel={'previous'}
					  forcePage={currentPage-1}
					  nextLabel={'next'}
					  breakLabel={<a href="">...</a>}
					  breakClassName={'break-me'}
					  pageCount={pageCount}
					  marginPagesDisplayed={2}
					  pageRangeDisplayed={5}
					  onPageChange={handlePageClick}
					  containerClassName={'pagination'}
					  hidePageNumbers={screenSize === 1}
					  subContainerClassName={'pages pagination'}
					  activeClassName={'active'}
			  />
			</div>
		);
	}

	render() {
		const {
			data,
			isPaginationRequired,
			headers,
			renderCustomHeaders,
			className
		} = this.props;
		const { screenSize } = this.context;
		return (
			<div className={Cx("data-grid",className)}>
				{screenSize > 2 && (typeof renderCustomHeaders === 'function' ? renderCustomHeaders() : this.renderColumnHeaders(headers))}
				{this.renderRowHeaders(headers)}
				{this.renderRowGridData(data,headers)}
				{this.renderColumnGridData(data,headers)}
				{isPaginationRequired && !frameworkGlobals.isServer && this.renderPagination()}
			</div>
		);
	}
}

export default DataGrid;
