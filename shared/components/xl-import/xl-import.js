/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
 - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
 - xlsx.full.min.js is loaded in the head of the HTML page
 - this script should be referenced with type="text/babel"
 - babel.js in-browser transpiler should be loaded before this script
 */

/*
 const incometypes = [
 ["Miscellaneous Income",1],
 ["Pet Fee Income",1],
 ["Rental Income",12]
 ];

 const expensetypes = [
 ["Bank Service Charges",1],
 ["Closing Costs",1],
 ["HOA Expense",1],
 ["Inspection Expense",1],
 ["Insurance Expense",1],
 ["Landscaping Expense",3],
 ["Leasing Fees",1],
 ["New Appliances",1],
 ["Pest Control",3],
 ["Professional Fees",1],
 ["Property Management Fees",1],
 ["Remodelling Expense",1],
 ["Repairs and Maintenance",6],
 ["Taxes - Property",1],
 ["Utilities",12]

 ];

 */
const TYPE_ACCUR_IN_YEAR = {
	"Miscellaneous Income" : 1,
	"Pet Fee Income" : 1,
	"Rental Income" : 12,
	"Application Fees" : 1,
	"Bank Service Charges" : 1,
	"Closing Costs" : 1,
	"HOA Expense" : 1,
	"Inspection Expense" : 1,
	"Insurance Expense" : 1,
	"Landscaping Expense" : 3,
	"Leasing Fees" : 1,
	"Late Fees" : 1,
	"New Appliances" : 1,
	"Pest Control" : 3,
	"Professional Fees" : 1,
	"Property Management Fees" : 1,
	"Remodelling Expense" : 1,
	"Repairs and Maintenance" : 6,
	"Taxes - Property" : 1,
	"Utilities" : 12
}
const incometypes = [
	["Application Fees"],
	["Miscellaneous Income"],
	["Pet Fee Income"],
	["Rental Income"]
];

const expensetypes = [
	["Bank Service Charges"],
	["Closing Costs"],
	["HOA Expense"],
	["Inspection Expense"],
	["Insurance Expense"],
	["Landscaping Expense"],
	["Leasing Fees"],
	["New Appliances"],
	["Pest Control"],
	["Professional Fees"],
	["Property Management Fees" , ["Admin Fee", "Application Fees", "Property Management Fees - Other", "Late Fees"]],
	["Remodelling Expense"],
	["Repairs and Maintenance"],
	["Taxes - Property"],
	["Utilities"]

];

const headerlookup = ['type' , 'date' , 'num', 'name', 'split' , 'memo', 'class', 'paid amount'];
const lookUpMap = {
	"income" : [
		{
			"regexp": "application",
			"type" : "OTHER_INCOME",
			"subtype" : "Application Fees"
		},
		{
			"regexp": "misc",
			"type" : "OTHER_INCOME",
			"subtype" : "Miscellaneous Income"
		},
		{
			"regexp": "pet",
			"type" : "OTHER_INCOME",
			"subtype" : "Pet Fee Income"
		},
		{
			"regexp": "(rent|leas)",
			"type" : "RENTAL_INCOME",
			"subtype" : ""
		}
	],
	"expense" : [
		{
			"regexp": "utilit",
			"type" : "MAINTENANCE",
			"subtype" : "Utilities"
		},
		{
			"regexp": "(maintenance|repair)",
			"type" : "MAINTENANCE",
			"subtype" : "Repairs and Maintenance"
		},
		{
			"regexp": "(remodel|renovat)",
			"type" : "MAINTENANCE",
			"subtype" : "Remodelling Expense"
		},
		{
			"regexp": "(appliance|equipment)",
			"type" : "MAINTENANCE",
			"subtype" : "New Appliances"
		},
		{
			"regexp": "pest",
			"type" : "MAINTENANCE",
			"subtype" : "Pest Control"
		},
		{
			"regexp": "(landscap,garden)",
			"type" : "MAINTENANCE",
			"subtype" : "Landscaping Expense"
		},
		{
			"regexp": "(inspection|appraisal)",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Inspection Expense"
		},
		{
			"regexp": "bank",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Bank Service Charges"
		},
		{
			"regexp": "closing",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Closing Costs"
		},
		{
			"regexp": "professional",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Professional Fees"
		},
		{
			"regexp": "taxes",
			"type" : "PROPERTY_TAXES",
			"subtype" : ""
		},
		{
			"regexp": "leas",
			"type" : "LEASING_FEE",
			"subtype" : ""
		},
		{
			"regexp": "((home|owner).*(association|owner)|hoa|association)",
			"type" : "HOA_FEE",
			"subtype" : ""
		},
		{
			"regexp": "(insurance|protection)",
			"type" : "INSURANCE",
			"subtype" : ""
		},
		{
			"regexp": "application",
			"type" : "MANAGEMENT_FEE",
			"subtype" : "Application Fees"
		},
		{
			"regexp": "late",
			"type" : "MANAGEMENT_FEE",
			"subtype" : "Late Fees"
		},
		{
			"regexp": "(property.*(management|mgmt)|pm)",
			"type" : "MANAGEMENT_FEE",
			"subtype" : "Property Management Fees"
		}
	]
}


/*
	SUBTYPE MAP ->

	Subtype logic - > if type is OTHER_INCOME or OTHER_EXPENSE - > get from type
		or
	Find Logic to get Type
 */

import React from 'react';
const XLSX = require('xlsx');
import df from 'dateformat';
const faker = require('faker');

class SheetJSApp extends React.Component {

	static getTrailingEmptyCells(row) {
		let i=0, nonZeroIndex = '';
		for(; i < row.length; i+=1) {
			if(row[i]) {
				nonZeroIndex = i;
				break;
			}
		}

		return nonZeroIndex
	}
	/*
		get number of columns
		get empty trailing columns
		get column index
	 */
	static getHeaderColumns(data) {
		const lookUpLength = headerlookup.length;
		const dataLength =  data.length;
		let i = 0, rowCell;
		for (; i < dataLength ; i++) {
			const rowLength = data[i].length;
			if(rowLength > lookUpLength) {
				let k =0, j = 0;
				for(; j < rowLength; j++){
					rowCell = String(data[i][j]);
					rowCell && headerlookup.includes(rowCell.toLowerCase()) && k++;
				}
				if( k === lookUpLength) {
					break;
				}
			}
		}
		return {
			header : data[i],
			trailingEmptyCells : SheetJSApp.getTrailingEmptyCells(data[i]),
			columnsMap : {
				date : data[i].indexOf('Date'),
				amount : data[i].indexOf('Paid Amount'),
				description : [data[i].indexOf('Name'), data[i].indexOf('Memo')],
				property : data[i].indexOf('Class'),
			}
		}
	};

	/*
		test with subtype, if find then return object
		or test with type
	 */
	static getTypSubType(iandeType, dataType, dataSubtype) {

		let i = 0 , result = '';
		for (; i < lookUpMap[iandeType].length ; i++) {
			let matchSet = '';
			let dataItem = lookUpMap[iandeType][i];
			 const pattern = new RegExp(dataItem.regexp, "gi");
			if(dataSubtype) {
				matchSet = dataSubtype.match(pattern);
			}

			if(!matchSet || matchSet.join('') === '') {
				matchSet = dataType.match(pattern);
			}

			if(matchSet && matchSet.join('') !== '') {
				result = lookUpMap[iandeType][i];
				break;
			}
		}

		return result || {
					"type" : `OTHER_${iandeType.toUpperCase()}`,
					"subtype" : dataType || dataSubtype
				};

	}

	constructor(props) {
		super(props);
		this.state = {
			data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
			cols: []  /* Array of column objects e.g. { name: "C", K: 2 } */
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
		this.propertyObject = {};
		this.genFakeData = [];
		//this.generateData();

	};
	handleFile(file/*:File*/) {
		/* Boilerplate to set up FileReader */
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array' , cellDates: true});
			console.log(wb);
			/* Get first worksheet */
			const wsname = wb.SheetNames.length > 1 ? wb.SheetNames[1] : wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
			console.log(data);
			this.processData(data);
			/*console.log(make_cols(ws['!ref']) , data);
			/!* Update state *!/
			this.setState({ data: data, cols: make_cols(ws['!ref']) });*/
		};
		if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
	};

	isDataRow(data) {
		return this._headerColumns.header.length === data.length && this._headerColumns.trailingEmptyCells === SheetJSApp.getTrailingEmptyCells(data)
	}

	getRowRecords(data, iandeType) {
		const dataLength = data.length;
		let i=0, type = '', subtype = '';
		for (; i < dataLength ; i++) {
			console.log(data[i])
			if(!data[i].length) {
				continue;
			}
			// data row collection
			if(this.isDataRow(data[i])) {
				const date  = typeof data[i][this._headerColumns.columnsMap.date] === 'object'
					? df(new Date(data[i][this._headerColumns.columnsMap.date]), "dd/mm/yyyy")
					: data[i][this._headerColumns.columnsMap.date];
				const typeObj = SheetJSApp.getTypSubType(iandeType, type.join(''), subtype && subtype.join('') || '', data[i]);
				//console.log(typeObj);
				if(this.propertyObject.hasOwnProperty(data[i][this._headerColumns.columnsMap.property])) {
					const { cashFlowTransactions } = this.propertyObject[data[i][this._headerColumns.columnsMap.property]];
					cashFlowTransactions.push({
						"type" : typeObj.type,
						"subtype" : typeObj.subtype,
						"transactionDate" : date,
						"description" : `${data[i][this._headerColumns.columnsMap.description[0]]} ${data[i][this._headerColumns.columnsMap.description[1]]}`,
						"amount" : data[i][this._headerColumns.columnsMap.amount]
					})
					this.propertyObject[data[i][this._headerColumns.columnsMap.property]].cashFlowTransactions = cashFlowTransactions;
				}else {
					this.propertyObject[data[i][this._headerColumns.columnsMap.property]] = {
						"name" : data[i][this._headerColumns.columnsMap.property],
						"cashFlowTransactions" : [{
							"type" : typeObj.type,
							"subtype" : typeObj.subtype,
							"transactionDate" : date,
							"description" : `${data[i][this._headerColumns.columnsMap.description[0]]} ${data[i][this._headerColumns.columnsMap.description[1]]}`,
							"amount" : data[i][this._headerColumns.columnsMap.amount]
						}]
					}
				}
				if(data[i+1] && !this.isDataRow(data[i+1]) && this._headerColumns.header.length === data[i+1].length) {
					i++;
				}
				continue;
			}

			if(type && type.length < data[i].length) {
				subtype = data[i];
			} else {
				type = data[i];
			}
		}

	}

	generateFakePropertyName(count) {
		return Array.apply(null, {length: count}).map((val, key) => faker.address.streetAddress())
	}

	generateFakeAmount() {
		return faker.finance.amount();
	}

	generateFakeDate(mon, year) {
		return `${mon}/01/${year}`;
	}

	generateFakeNames() {
		return faker.name.findName();
	}

	getpropertiesData(propertyNames, years, cYear, type) {
		for ( let i = 0 ; i < propertyNames.length ; i++) {
			const property = propertyNames[i];
			for(let j = 1 ; j <= years ; j ++ ) {
				const year = cYear - j;
				const times = TYPE_ACCUR_IN_YEAR[type] || 1;
				for (let k = 1 ; k <=times ; k++ ) {
					const cdate = this.generateFakeDate( k , year );
					const data = [].concat.apply([],[Array(7), [faker.finance.transactionType(), cdate, faker.finance.account(), this.generateFakeNames(), faker.lorem.sentence(),property,this.generateFakeAmount()]])
					this.genFakeData.push(data)
				}
			}
		}
	}

	recursiveTypeHandler(trailingSpaces, array, propertyNames, years, cYear) {
		for(var m = 0; m < array.length; m++) {
			if(Array.isArray(array[m])) {
				return this.recursiveTypeHandler(trailingSpaces+1 , array[m], propertyNames, years, cYear);
			}
			const tralingSpacesList = Array(trailingSpaces);
			const typeData = [].concat.apply([],[tralingSpacesList, array[m]]);
			this.genFakeData.push(typeData)
			this.getpropertiesData(propertyNames, years, cYear, array[m]);
			/*const totTypeData = [].concat.apply([],[tralingSpacesList, `Total ${array[m]}`]);
			this.genFakeData.push(totTypeData)*/
		}
	}

	generateData(properties = 2, years = 1, trailingSpaces = 3) {
		const cYear= new Date().getFullYear();
		const propertyNames = this.generateFakePropertyName(properties);
		// push titles
		const title = [`${properties} Properties - Profit & Loss Detail Inception to Current by Class`];
		this.genFakeData.push(title);
		const sheetHeaders =  [].concat.apply([],[Array(7), 'Type', 'Date','Num', 'Name', 'Memo', 'Class', 'Paid Amount']);
		this.genFakeData.push(sheetHeaders);
		const incomeexpenseTitle = [].concat.apply([],[Array(1), `Ordinary Income/Expense`]);
		this.genFakeData.push(incomeexpenseTitle);
		// -------------------- Income Data --------------
		const incomeTitle = [].concat.apply([],[Array(2), `Income`]);
		this.genFakeData.push(incomeTitle);
		for ( let l = 0 ; l < incometypes.length ; l++) {
			this.recursiveTypeHandler(trailingSpaces, incometypes[l], propertyNames, years, cYear);
		}
		const incomeTitleEnd = [].concat.apply([],[Array(2), `Total Income`]);
		this.genFakeData.push(incomeTitleEnd);
		// -------------------- Income Data End --------------

		// -------------------- Expense Data --------------
		const expenseTitle = [].concat.apply([],[Array(2), `Expense`]);
		this.genFakeData.push(expenseTitle)
		for ( let l = 0 ; l < expensetypes.length ; l++) {
			this.recursiveTypeHandler(trailingSpaces, expensetypes[l], propertyNames, years, cYear);
		}
		const expenseTitleEnd = [].concat.apply([],[Array(2), `Total Expense`]);
		this.genFakeData.push(expenseTitleEnd)
		// -------------------- Expense Data END --------------
		const ws = XLSX.utils.aoa_to_sheet(this.genFakeData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		XLSX.writeFile(wb, "sheetjs.xlsx")
	}

	processData(data) {
		/* convert state to workbook */
		console.log(data)
		this.generateData();
		//this.generateData(data);
		//console.log(data);
		/*const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/!* generate XLSX file and send to client *!/
		XLSX.writeFile(wb, "sheetjs.xlsx")*/
		this._headerColumns = SheetJSApp.getHeaderColumns(data);
		// TODO : improve this logic only to lookup Income & Expense
		// this means replace map & use loop and then break it
		this._data = data.map( ele => {
				const nonZeroIndex = SheetJSApp.getTrailingEmptyCells(ele);
				return ele.slice(nonZeroIndex, ele.length).shift();
			});
		const incomeStartIndex = this._data.indexOf('Income');
		const incomeEndIndex = this._data.indexOf('Total Income');
		const expenseStartIndex = this._data.indexOf('Expense');
		const expenseEndIndex = this._data.indexOf('Total Expense');
		this._income = data.slice(incomeStartIndex + 1 , incomeEndIndex);
		this._expense = data.slice(expenseStartIndex + 1 ,expenseEndIndex);
		this.getRowRecords(this._income, 'income');
		this.getRowRecords(this._expense, 'expense');
		delete  this.propertyObject.undefined;
		console.log(Object.values(this.propertyObject));
	}

	exportFile() {
		/* convert state to workbook */
		const ws = XLSX.utils.aoa_to_sheet(this.state.data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx")
	};
	render() { return (
		<DragDropFile handleFile={this.handleFile}>
			<div className="row"><div className="col-xs-12">
				<DataInput handleFile={this.handleFile} />
			</div></div>
			<div className="row"><div className="col-xs-12">
				<button className="btn btn-success btn-primary" onClick={() =>this.generateData()}>Export</button>
			</div></div>
			<div className="row"><div className="col-xs-12">
				<OutTable data={this.state.data} cols={this.state.cols} />
			</div></div>
		</DragDropFile>
	); };
};

if(typeof module !== 'undefined') module.exports = SheetJSApp

/* -------------------------------------------------------------------------- */

/*
 Simple HTML5 file drag-and-drop wrapper
 usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
 handleFile(file:File):void;
 */
class DragDropFile extends React.Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
	};
	suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
	onDrop(evt) { evt.stopPropagation(); evt.preventDefault();
		const files = evt.dataTransfer.files;
		if(files && files[0]) this.props.handleFile(files[0]);
	};
	render() { return (
		<div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
			{this.props.children}
		</div>
	); };
};

/*
 Simple HTML5 file input wrapper
 usage: <DataInput handleFile={callback} />
 handleFile(file:File):void;

 var ar = [
 [2,6,89,45],
 [3,566,23,79],
 [434,677,9,23]
 ];

 var hash = {};
 for(var i = 0 ; i < ar.length; i += 1) {
 hash[ar[i]] = i;
 }

 var val = [434,677,9,23];

 if(hash.hasOwnProperty(val)) {
 document.write(hash[val]);
 }
 */
class DataInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	};
	handleChange(e) {
		const files = e.target.files;
		if(files && files[0]) this.props.handleFile(files[0]);
	};
	render() { return (
		<form className="form-inline">
			<div className="form-group">
				<label htmlFor="file">Spreadsheet</label>
				<input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
			</div>
		</form>
	); };
}

/*
 Simple HTML Table
 usage: <OutTable data={data} cols={cols} />
 data:Array<Array<any> >;
 cols:Array<{name:string, key:number|string}>;
 */
class OutTable extends React.Component {
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

/* list of supported file types */
const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

/* generate an array of column objects */
const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};
