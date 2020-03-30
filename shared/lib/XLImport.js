import React, {Component} from 'react';
const XLSX = require('xlsx');

export default class XLImport extends Component {

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

	constructor(props) {
		super(props);
		this.propertyObject = {};
	}

	async handleFile(file/*:File*/) {
		/* Boilerplate to set up FileReader */
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = async (e) => {
			this.propertyObject = {};
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array', cellDates: true});
			/* Get first worksheet */
			const wsname = wb.SheetNames.length > 1 ? wb.SheetNames[1] : wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
			this.processData(data);
		};
		if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
	};

}

