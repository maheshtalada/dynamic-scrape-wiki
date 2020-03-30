import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SiteConfig from '../../config';
import Cx from 'classnames';
import { QuickBooksTemplateInfo,
    TemplateDescription
} from './import-template-info';
import df from 'dateformat';
import XLSX from 'xlsx';
import { connect } from 'react-redux';
import delay from '../../lib/delay';
import Spinner from 'components/common/spinner/spinner';
import ColumnDataGrid from 'components/common/data-grid/column-data-grid';
import RadioList from 'components/common/radio-list/radio-list';
import { sprintf } from 'utils';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../redux/actions/schema'

const { assetsPath } = SiteConfig;
const HEADERLOOKUP = [ 'date' , 'name', 'memo', 'class', ['paid amount', 'amount']];
const IMPORT_OPTIONS = [
    {
        key : 'QUICKBOOKSTEMPLATE'
    }
];

const PATTERNLOOKUPMAP = {
	"income" : [
		{
			"regexp": "(rent|leas)",
			"type" : "RENTAL_INCOME",
			"subtype" : "",
			"isInclude" : true
		},
		{
			"regexp": "application",
			"type" : "OTHER_INCOME",
			"subtype" : "Application Fee",
			"isInclude" : true
		},
		{
			"regexp": "misc",
			"type" : "OTHER_INCOME",
			"subtype" : "Miscellaneous Income",
			"isInclude" : true
		},
		{
			"regexp": "(pet.*(deposit|fee)|pet)",
			"type" : "OTHER_INCOME",
			"subtype" : "Pet Fee",
			"isInclude" : true
		},
		{
			"regexp": "late",
			"type" : "OTHER_INCOME",
			"subtype" : "Late Fee",
			"isInclude" : false
		},
		{
			"regexp": "(security.*(deposit|fee)|security|deposit)",
			"type" : "OTHER_INCOME",
			"subtype" : "Security Deposit",
			"isInclude" : false
		},
		{
			"regexp": "(utility.*(reimburse|fee)|utility|reimburse)",
			"type" : "OTHER_INCOME",
			"subtype" : "Utility Reimbursement",
			"isInclude" : true
		},
		{
			"regexp": "laundry",
			"type" : "OTHER_INCOME",
			"subtype" : "Laundry Income",
			"isInclude" : true
		}
	],
	"expenses" : [
		{
			"regexp": "(tax|authority)",
			"type" : "PROPERTY_TAXES",
			"subtype" : "",
			"isInclude" : true
		},
		{
			"regexp": "(leas|advertis|marketing)",
			"type" : "LEASING_FEE",
			"subtype" : "",
			"isInclude" : true
		},
		{
			"regexp": "((home|owner).*(association|owner)|hoa|association)",
			"type" : "HOA_FEE",
			"subtype" : "",
			"isInclude" : true
		},
		{
			"regexp": "(insurance|protection)",
			"type" : "INSURANCE",
			"subtype" : "",
			"isInclude" : true
		},
		{
			"regexp": "(property.*(management|mgmt)|pm|management)",
			"type" : "MANAGEMENT_FEE",
			"subtype" : "",
			"isInclude" : true
		},
		{
			"regexp": "application",
			"type" : "MANAGEMENT_FEE",
			"subtype" : "Application Fee",
			"isInclude" : true
		},
		{
			"regexp": "late",
			"type" : "MANAGEMENT_FEE",
			"subtype" : "Late Fee",
			"isInclude" : false
		},
		{
			"regexp": "(commission|placement)",
			"type" : "MANAGEMENT_FEE",
			"subtype" : "Commission / Placement Fee",
			"isInclude" : true
		},
		{
			"regexp": "(maintenance|repair|carpet|janitor|labor|paint|plumb|floor|hvac|roof|key|lock)",
			"type" : "MAINTENANCE",
			"subtype" : "",
			"isInclude" : true
		},
		{
			"regexp": "(utilit|electricity|gas|water|sewer|garbage|recycl)",
			"type" : "MAINTENANCE",
			"subtype" : "Utilities",
			"isInclude" : true
		},
		{
			"regexp": "(remodel|renovat)",
			"type" : "MAINTENANCE",
			"subtype" : "Remodeling Expense",
			"isInclude" : true
		},
		{
			"regexp": "(equipment.*(rental|lease))",
			"type" : "MAINTENANCE",
			"subtype" : "Equipment Rental",
			"isInclude" : true
		},
		{
			"regexp": "(new.*(appliance|equipment)|appliance)",
			"type" : "MAINTENANCE",
			"subtype" : "New Appliance",
			"isInclude" : true
		},
		{
			"regexp": "pest",
			"type" : "MAINTENANCE",
			"subtype" : "Pest Control",
			"isInclude" : true
		},
		{
			"regexp": "(landscap|lawn|mow|garden)",
			"type" : "MAINTENANCE",
			"subtype" : "Landscaping Expense",
			"isInclude" : true
		},
		{
			"regexp": "(inspection|appraisal)",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Inspection Expense",
			"isInclude" : true
		},
		{
			"regexp": "bank",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Bank Service Charges",
			"isInclude" : true
		},
		{
			"regexp": "(security.*(fee|charge|service))",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Security Service Charges",
			"isInclude" : true
		},
		{
			"regexp": "closing",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Closing Costs",
			"isInclude" : false
		},
		{
			"regexp": "(professional|legal|accounting)",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Professional Fee",
			"isInclude" : true
		},
		{
			"regexp": "(auto|travel)",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Travel Expense",
			"isInclude" : true
		},
		{
			"regexp": "misc",
			"type" : "OTHER_EXPENSES",
			"subtype" : "Miscellaneous Expense",
			"isInclude" : true
		}
	]
};


const LoadingSteps = ({steps=[],l}) => {
    const length = steps.length;
    return (length ?
        <div className="loading-steps flex flex-column">
            {steps.map((step,index) => {
                if(index === length-1) {
                    return (
                        <div className="loading-step flex flex-align-center ">
                            {step.isStopLoading && (step.isError ? <i className="pe-7s-close-circle invalid"/> : <i className="pe-7s-check valid" />)}
                            <span>{l(step.msg || step)}</span>
                            {!step.isStopLoading && <Spinner />}
                        </div>
                    )
                }
                return (
                    <div className="loading-step flex flex-align-center ">
                        <i className="pe-7s-check valid" />
                        <span>{l(step)}</span>
                    </div>
                ) 
            })}
        </div> : null
    )
}

const ErrorDataGrid = ({ data }) => {
    const headers = {
        'row' : {
            label : 'ROW'
        },
        'col' : {
            label : 'COLUMN'
        },
        'message' : {
            label : 'MESSAGE'
        }
    };
    return (
        <ColumnDataGrid
            className="error-data-grid"
            data = {data}
            headers = {headers}
        />
    )
}

const InvalidHeaders = ({ headers, l }) => {
    let headersConfig = {};
    headers.forEach(header => {
		if(Array.isArray(header)) {
			const lastEle = header.pop();
			 headersConfig[lastEle] = { label : lastEle };
		} else {
			headersConfig[header] = { label : header };
		}

    });
    let data = [];
    return (
        <div className="invalid-headers">
            <div className="invalid-headers__msg">{l('INVALIDHEADERSMESSAGE')}</div>
            <ColumnDataGrid
                className="invalid-headers-grid"
                data = {data}
                headers = {headersConfig}
            />
        </div>
    )
}

class PortfolioTemplateImport extends Component {

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
	static getQBHeaderColumns(data) {
		const lookUpLength = HEADERLOOKUP.length;
		const flatHeaders = HEADERLOOKUP.flat();
		const dataLength =  data.length;
		let i = 0, rowCell,k;
		for (; i < dataLength ; i++) {
			const rowLength = data[i].length;
			if(rowLength > lookUpLength) {
				k =0;
				let j = 0;
				for(; j < rowLength; j++){
					rowCell = String(data[i][j]);
					rowCell && flatHeaders.includes(rowCell.toLowerCase()) && k++;
				}
				if( k === lookUpLength) {
					break;
				}
			}
		}

		if(k !== lookUpLength) {
			return Promise.reject({
				error : "INVALIDHEADERS",
				headers : HEADERLOOKUP,
				validationMsg : ["LOADINGFILE","VALIDATINGDATA",{msg: "INVALIDHEADERS", isStopLoading: true, isError: true}],
			})
		}
		return Promise.resolve({
			header : data[i],
			trailingEmptyCells : PortfolioTemplateImport.getTrailingEmptyCells(data[i]),
			// TODO improve this logic by getting index from function
			columnsMap : {
				date : data[i].indexOf('Date'),
				amount : data[i].indexOf('Paid Amount') > -1 ?  data[i].indexOf('Paid Amount') :  data[i].indexOf('Amount'),
				description : [data[i].indexOf('Name'), data[i].indexOf('Memo')],
				property : data[i].indexOf('Class'),
			}
		});
	};

	/*
	 test with subtype, if find then return object
	 or test with type
	 */
	static getTypSubType(iandeType, dataType, dataSubtype) {

		let i = 0 , result = '';
		for (; i < PATTERNLOOKUPMAP[iandeType].length ; i++) {
			let matchSet = '';
			let dataItem = PATTERNLOOKUPMAP[iandeType][i];
			const pattern = new RegExp(dataItem.regexp, "gi");
			if(dataSubtype) {
				matchSet = dataSubtype.match(pattern);
			}

			if(!matchSet || matchSet.join('') === '') {
				matchSet = dataType.match(pattern);
			}

			if(matchSet && matchSet.join('') !== '') {
				result = PATTERNLOOKUPMAP[iandeType][i];
				break;
			}
		}

		return result || {
				"type" : `OTHER_${iandeType.toUpperCase()}`,
				"subtype" : dataType || dataSubtype,
				"isInclude" : true
			};

	}

	static isValidDate(row, key) {
		if(!row[this.columnsMap.date]) {
			return { row : key+1, col : XLSX.utils.encode_col(this.columnsMap.date), 'message': 'Date Missing'}
		}
		return;
	}

	static isValidAmount(row, key) {
		if(row[this.columnsMap.amount] === '') {
			return { row : key+1, col : XLSX.utils.encode_col(this.columnsMap.amount), 'message': 'Amount Missing'}
		}
		return;
	}

	static getDescription(name, memo) {
 		if(name && memo) {
			return `${memo} : ${name}`;
		}

		if(memo) {
			return memo;
		}

		return name || '';
	}

    static contextTypes = {
        i18n : PropTypes.object
	};

	static defaultProps = {
		analyticsCategory: 'Import Properties',
		description: 'Use this tool to import historical rental data for properties you currently own and create useful visualizations.'
	}

    constructor(props) {
        super(props);
        this.state = {
            option: 'QUICKBOOKSTEMPLATE',
            'QUICKBOOKSTEMPLATE' : {},
            'APPFOLIOTEMPLATE': {},
            'DEFAULTTEMPLATE': {}
        };
        this.onOptionChange = this.onOptionChange.bind(this);
        this.toggleInstructions = this.toggleInstructions.bind(this);
        this.IMPORT_OPTIONS_CONFIG = {
            'QUICKBOOKSTEMPLATE' : {
                'instructions' : QuickBooksTemplateInfo,
                'descriptionTitle': 'Import your historical rental data.',
                'descriptionText': props.description,
				'dataProcessor' : 'qbProcessor'
            },
            'APPFOLIOTEMPLATE' : {
                'sampleDataFile' : 'QB_PNL_Sample.xlsx',
                'instructions' : QuickBooksTemplateInfo
            },
            'DEFAULTTEMPLATE' : {
                'sampleDataFile' : 'QB_PNL_Sample.xlsx',
                'descriptionTitle': 'Upload detailed Transaction Report',
                'descriptionText': 'Each row represents an Income / Expense journal entry for a property.',
				'dataProcessor' : 'customProcessor'
            }
        };
    }

    componentDidMount() {
		// Tried implementing addEventListener, but didn't work out
		document.body.onfocus = this.onFileDialogCancel;
		this.fileInputEl.addEventListener('change',(e) => {
			this.handleChange(e);
		});
	}

	componentWillReceiveProps(props) {
		const  {  saveProperties = {}, successMsg } = props;
		const { l } = this.context.i18n;
		if(!saveProperties.isFetching && saveProperties.status) {
			props.successCallback(sprintf(l(successMsg),Object.values(this.propertyObject).length));
			props.removeModal();
		}
	}

	onOptionChange(option) {
        this.setState({
            option
        });
    }

    toggleInstructions() {
        this.setState({
            showInstructions : !this.state.showInstructions
        })
    }

    render() {
		const inputAttributes = {
			accept : ".xlsx,.xls",
			type: 'file',
			style: { display: 'none' },
			ref: el => this.fileInputEl = el // eslint-disable-line
		};
		const { analyticsCategory } = this.props;
        const { option, showInstructions } = this.state;
        const { validationMsg = '', invalidData, headers } = this.state[option];
        const { l } = this.context.i18n;
        const TemplateInstructions = this.IMPORT_OPTIONS_CONFIG[option].instructions;
        const templateDescriptionTitle = this.IMPORT_OPTIONS_CONFIG[option].descriptionTitle;
        const templateDescriptionText = this.IMPORT_OPTIONS_CONFIG[option].descriptionText;
		const sampleDataFile = this.IMPORT_OPTIONS_CONFIG[option].sampleDataFile;
		const disableUpload = validationMsg.length >= 1 && (!invalidData && !headers);
        return (
            <div className="property-template-import">
                {/*<div className="property-template-import__options">
                    {IMPORT_OPTIONS.map(option => {
                        return (
                            <button key={option.key} className={Cx({'active' : option.key === this.state.option})} onClick={()=>{this.onOptionChange(option.key)}}>{l(option.key)}</button>
                        );
                    })}
                </div>*/}
                <div className="property-template-import__option-detail-wrap">
                    <div className="property-template-import__option-detail-wrap__description-wrap">
                        <TemplateDescription title={templateDescriptionTitle} text={templateDescriptionText}/>
                    </div>
					<div className="property-template-import__format-options">
						<RadioList key='import-format-options'
							title={l('SUPPORTEDFORMATs')}
							className="radio-list"
							items={IMPORT_OPTIONS}
							onChange={(evt)=>{
								this.setState({
									option: evt.currentTarget.value
								});
							}}
							isOptionALLRequired={false}
							selectedVal={option}
							l = {l}/>
					</div>
                    <div className="property-template-import__upload-wrap">
						<input {...inputAttributes} />
						<button data-tag-category={analyticsCategory} data-tag-action='click' data-tag-label='Upload property data file' className={Cx("btn btn-primary btn-l",{'disabled' : disableUpload})} disabled={disableUpload || false} onClick={()=> {this.onSelectFileClick()}}>{l('UPLOADFILE')}</button>
						<div className="upload-limit-note">Excel file upto 5 MB size</div>
                    </div>
                    <div className="flex">
                        {sampleDataFile && <div className="flex flex-column" style={{'marginRight' : '20px'}}>
                            <a href={`${assetsPath}/downloads/${sampleDataFile}`} download>Download Sample Data</a>
                        </div>}
                        {TemplateInstructions && <div className="flex flex-justify-end">
                            <a href="javascript:void(0);" onClick={this.toggleInstructions}>{'Detailed Instructions'}</a>
                        </div>}
                    </div>
                    <LoadingSteps steps={validationMsg} l={l}/>
                    {invalidData && <ErrorDataGrid data={invalidData}/>}
                    {headers && <InvalidHeaders headers={headers} l={l}/>}
                    {showInstructions && <div className="property-template-import__instructions">
                        <a href="javascript:void(0);" onClick={this.toggleInstructions} className="property-template-import__instructions__close-btn">{l('HIDEINSTRUCTIONS')}</a>
                        <TemplateInstructions />
                    </div>}
                </div>
            </div>
        )
    }

	async handleFile(file/*:File*/) {
		/* Boilerplate to set up FileReader */
		await delay((500));
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
			//console.log(data, ws['!ref']);
			this.processAndSendData(data);

		};
		if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
	};

	async processAndSendData(data) {
		const { propertyId, propertyName } = this.props;
		try {
			await this.processData(data);
			if(propertyName) {
				const cashFlows = (this.propertyObject[propertyName] && this.propertyObject[propertyName].cashFlowTransactions) || [];
				await this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
					method : 'post',
					endpoint : 'savepropertycashflow',
					actionType : 'RESPONSE_SAVE_USER_MY_PROPERTIES',
					paramPayload : { id : propertyId},
					dataPayload: cashFlows
				}));
			} else {
				await this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
					method : 'post',
					endpoint : 'saveproperties',
					actionType : 'RESPONSE_SAVE_USER_MY_PROPERTIES',
					dataPayload: Object.values(this.propertyObject)
				}));
			}
		} catch (e) {}
	}

	handleChange(e) {
		const { option } =	this.state;
		const files = e.target.files;
		this.setState( { [option] :{ validationMsg : ["LOADINGFILE"], invalidData: '' }}, ()=>{
			if(files && files[0]) this.handleFile(files[0]);
		});

	}

	onSelectFileClick() {
		this.isFileDialogActive = true;
		this.fileInputEl.value = null;
		this.fileInputEl.click();
	}

	isDataRow(data) {
		return this._headerColumns.header.length === data.length && this._headerColumns.trailingEmptyCells === PortfolioTemplateImport.getTrailingEmptyCells(data)
	}

	getCustomTemplateRecords() {}

	getQuickBooksTemplatePLRecords(data, iandeType) {
		const dataLength = data.length;
		let i=0, type = '', subtype = '';
		for (; i < dataLength ; i++) {
			if(!data[i].length) {
				continue;
			}
			// data row collection
			if(this.isDataRow(data[i])) {
				const date  = typeof data[i][this._headerColumns.columnsMap.date] === 'object'
					? df(new Date(data[i][this._headerColumns.columnsMap.date]), "dd/mm/yyyy")
					: data[i][this._headerColumns.columnsMap.date];
				const typeObj = PortfolioTemplateImport.getTypSubType(iandeType, type.join(''), subtype && subtype.join('') || '', data[i]);
				if(this.propertyObject.hasOwnProperty(data[i][this._headerColumns.columnsMap.property])) {
					const { cashFlowTransactions } = this.propertyObject[data[i][this._headerColumns.columnsMap.property]];
					cashFlowTransactions.push({
						"type" : typeObj.type,
						"subType" : typeObj.subtype,
						"transactionDate" : date,
						"description" : PortfolioTemplateImport.getDescription(data[i][this._headerColumns.columnsMap.description[0]], data[i][this._headerColumns.columnsMap.description[1]]),
						"amount" : data[i][this._headerColumns.columnsMap.amount],
						"isIncludedForComputation" : typeObj.isInclude
					})
					this.propertyObject[data[i][this._headerColumns.columnsMap.property]].cashFlowTransactions = cashFlowTransactions;
				}else {
					this.propertyObject[data[i][this._headerColumns.columnsMap.property]] = {
						"name" : data[i][this._headerColumns.columnsMap.property],
						"cashFlowTransactions" : [{
							"type" : typeObj.type,
							"subType" : typeObj.subtype,
							"transactionDate" : date,
							"description" : PortfolioTemplateImport.getDescription(data[i][this._headerColumns.columnsMap.description[0]], data[i][this._headerColumns.columnsMap.description[1]]),
							"amount" : data[i][this._headerColumns.columnsMap.amount],
							"isIncludedForComputation" : typeObj.isInclude
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

	isValidDataRow(row, key) {

		if(this._headerColumns.header.length !== row.length || this._headerColumns.trailingEmptyCells !== PortfolioTemplateImport.getTrailingEmptyCells(row)) {
			return;
		}

		const validateActions = [
			'isValidDate',
			'isValidAmount'
		];

		return validateActions.map(action => PortfolioTemplateImport[action].call(this._headerColumns, row, key)).filter( val => val);
	}

	async customProcessor(data) {

	}

	async qbProcessor(data) {
		const { option } = this.state;
		this.setState({ [option] : {
			validationMsg : ["LOADINGFILE","VALIDATINGDATA"]
		}});

		await delay((800));

		try {
			this._headerColumns = await PortfolioTemplateImport.getQBHeaderColumns(data);
		} catch (e) {
			return Promise.reject(e);
		}

		// validate data before start processing
		const validateData = data.map( (row, key) => this.isValidDataRow(row, key)).filter( row => row && row.length);
		//if invalid data  , stop data process & inform user
		if(validateData.length) {
			let mergedResults = [].concat.apply([], validateData);
			return Promise.reject({
				validationMsg : ["LOADINGFILE","VALIDATINGDATA",{msg : "INVALIDDATAFOUND", isStopLoading: true, isError: true}],
				invalidData : mergedResults
			});
		}

		// TODO : improve this logic only to lookup Income & Expense
		// this means replace map & use loop and then break it
		this._data = data.map( ele => {
			const nonZeroIndex = PortfolioTemplateImport.getTrailingEmptyCells(ele);
			return ele.slice(nonZeroIndex, ele.length).shift();
		});
		const incomeStartIndex = this._data.indexOf('Income');
		const incomeEndIndex = this._data.indexOf('Total Income');
		const expenseStartIndex = this._data.indexOf('Expense');
		const expenseEndIndex = this._data.indexOf('Total Expense');
		this._income = data.slice(incomeStartIndex + 1 , incomeEndIndex);
		this._expense = data.slice(expenseStartIndex + 1 ,expenseEndIndex);
		this.getQuickBooksTemplatePLRecords(this._income, 'income');
		this.getQuickBooksTemplatePLRecords(this._expense, 'expenses');
		return Promise.resolve({
			validationMsg : ["LOADINGFILE","VALIDATINGDATA",{msg: "UPLOADINGDATA"}]
		});
	}

	async processData(data) {
		const { option } = this.state;
		const { dataProcessor } = this.IMPORT_OPTIONS_CONFIG[option];
		try {
			const msg = await this[dataProcessor](data);
			this.setState( { [option] : msg})
			delete this.propertyObject.undefined;
			return Promise.resolve();
		} catch (e) {
			this.setState( { [option] : e})
			return Promise.reject();
		}
	}

}

const mapStateToProps = ({userprofile}) => {
	return {
		saveProperties: userprofile.save_properties
	};
};
export default connect(mapStateToProps)(PortfolioTemplateImport);
