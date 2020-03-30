import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import { Button } from '../../../common/button';

export default class CustomSearchSelect extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__custom-search-select']
	};

	constructor(props, context) {
		super(props, context);
		this.fetchData = this.fetchData.bind(this);
		//this.onSelect =  this.onSelect.bind(this);
		this.state = {
			hasFocus: false,
			value : props.data.name,
			xhr : '',
			ajaxData : [],
			showDropDown : false
		};
	}

	componentDidMount() {
		this.setState({
			xhr : new XMLHttpRequest()
		});
	}

	fetchData() {
		const requestData =  this.getRequestData();
		const { xhr } = this.state;
		const { data } = this.props;
		let _self = this;
		xhr.open('GET', `${data.url}?${requestData}`, true);
		xhr.send();

		xhr.onerror = function onErrordata() {
			console.log(data);
		};

		xhr.onload = function onSuccessdata() {
			const data = this.responseText ? JSON.parse(this.responseText) : [];
			_self.setState({
				ajaxData : data,
				showDropDown : data.data.length > 0
			});
		};
	}

	getRequestData() {
		const { cherrypickids, getDataByID } = this.props;
		let requestData = [], idData= undefined;
		Object.keys(cherrypickids).forEach(key=>{
			idData = getDataByID(cherrypickids[key]);
			if(idData) {
				requestData.push(`${key}=${idData}`)
			}
		});
		return requestData.join('&');
	}

	onSelect() {

	}

	renderTableData(data) {
		let multiLevel = data.data.length,
			tableDataRows = [],
			keyCounter = 0;

		for (let i = 0; i < multiLevel; ++i) {
			tableDataRows.push(
				<tr key={i}>
					<td><a onClick={ e => this.onSelect(data.data[i])}></a></td>
					{data.headers.map(key => (<td key={keyCounter++}>{data.data[i][key] || ''}</td>))}
				</tr>
			);
		}
		return tableDataRows;
	}

	renderValue() {
		const { l } = this.props;
		const { showDropDown, ajaxData } = this.state;
		let className = this.getValueClassNames();
			let keyCounter = 0;
		return (
			<div className={className}>
				{this.props.children}
				<Button btnClassName="btn btn-primary" onClick={this.fetchData}>
					{l('SEARCH')}
				</Button>

				{ showDropDown && <div className="schema__custom-search-select__data">
					<table>
						<thead>
						<tr key="headerKey">
							<th></th>
							{ajaxData.headers.map(key => (<th key={keyCounter++}>{key}</th>))}
						</tr>
						</thead>
						<tbody>
							{this.renderTableData(ajaxData)}
						</tbody>
					</table>
				</div> }
			</div>
		);
	}

}





