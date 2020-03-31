import React, { Fragment, PureComponent, memo, useReducer, useMemo, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { initChatSocket } from 'utils/chatUtil';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { REQUEST_GET_COMPANY, REQUEST_RUN_GRABBER, REQUEST_UPDATE_DATA_TABLE_STATE_CHANGES } from '../../redux/actions/application';
import { Button } from 'components/common/button';
import Spinner from 'components/common/spinner/spinner';
import Collapsible from 'components/common/collapsible/collapsible';
import { cloneDeep, values, isEmpty, extend, find, findIndex} from 'lodash';
import CustomSyncTable, {Thead, Tbody, Tr, Th, Td} from "react-row-select-table/dist/Sync";
import { Schema } from 'components/schema';
import { REQUEST_ADD_COMPANY_PEOPLE } from '../../redux/actions/schema';
import Loader from 'components/common/page-loader/loader';
import uniqueId from 'utils/uniqueFormId';
import ErrorBox from 'components/common/error-box/error-box';
const delay = require('delay');
let ADDPERSON = {
	"label": "ADD PERSON",
	"id": "ADDPERSON",
	"type": "clone",
	"data": {
		"key": "2"
	},
	"children": [
		{
			"label": "EXPERTISE",
			"id": "personremovable",
			"type": "list",
			"subtype": "list-removable-single",
			"classNames": ['schema__list', 'schema__list__removable-single','schema__list__removable-single__custom-btn'],
			"isButton" : true,
			"children": [
				{
					"type": "custom-multi-group",
					"children": [
						{
							"label": "name",
							"id": "details.people(*).name",
							"type": "text",
							"classNames" : ['schema__text', 'schema__name']
						},
						{
							"label": "phone",
							"id": "details.people(*).phone",
							"type": "text",
							"classNames" : ['schema__text', 'schema__phone']
						},
						{
							"label": "email",
							"id": "details.people(*).email",
							"type": "text",
							"classNames" : ['schema__text', 'schema__email']
						},
						{
							"label": "roles",
							"id": "details.people(*).roles",
							"type": "text",
							"classNames" : ['schema__text', 'schema__roles']
						},
						{
							"label": "fullAddresses",
							"id": "details.people(*).address",
							"type": "text-suggestion",
							"classNames" : ['schema__text', 'schema__fullAddresses']
						},
						{
							"label": "status",
							"id": "details.people(*).status",
							"type": "text",
							"classNames" : ['schema__text', 'schema__status']
						}
					]
				}
			]
		}
	]
};

const comapnyActionsStyles = {
	'flex-grow': '1' ,
	'align-items': 'flex-end',
	'justify-content' : 'top'
};

const COMPANY_LABEL = {
	"type" : "content",
	"label" : "Company"
};

const PEOPLE_LABEL = {
	"type" : "content",
	"label" : "People"
};

const SCHEMA_MAP_PEOPLE = {
	name : {
		component : 'text'
	},
	phone : {
		component : 'text'
	},
	email : {
		component : 'text'
	},
	roles : {
		component : 'text'
	},
	fullAddresses : {
		component : 'text-suggestion'
	},
	status : {
		component : 'text'
	},
};

const SCHEMA_MAP_COMPANY = {
	name : {
		component : 'text'
	},
	phone : {
		component : 'text'
	},
	fullAddresses : {
		component : 'text-suggestion'
	},
	status : {
		component : 'text'
	},
};


const TableList = memo(( { persons= [] , checked = [] , onSelectedRowsChange } ) => (
	<CustomSyncTable onCheck={value => onSelectedRowsChange(value)} checkeds={checked}>
		<Thead>
		<Tr>
			<Th>Name</Th>
			<Th>Email</Th>
			<Th>Phone</Th>
			<Th>Roles</Th>
			<Th>Address</Th>
		</Tr>
		</Thead>
		<Tbody>
		{
			persons.map( person => {
				return (
					<Tr>
						<Td><a href={person.link} target="_blank">{person.name}</a></Td>
						<Td>{person.phone}</Td>
						<Td>{person.email}</Td>
						<Td>{person.roles && person.roles.map( role => <span>{role}</span>)}</Td>
						<Td>{person.fullAddresses && person.fullAddresses.map( address => <span>{address}</span>)}</Td>
					</Tr>
				)
			})
		}
		</Tbody>
	</CustomSyncTable>
));

class Company extends PureComponent {

	constructor(props) {
		super(props);
		//this.runGrabber = this.runGrabber.bind(this);
		this.state = {
			realTimeLog : '',
			checked : [],
			modifiedValues : {},
			initialValues : {},
			isFetching : false,
			isOpen : true
		};
		this.updateValues = {}
		//this.handleChange = this.handleChange.bind(this);
	}

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object
	};

	static updateLogStatus(log) {
		//corporationwiki, //google
		return findIndex(log, { msg : 'done'}) > -1
	}

	static updateResponseLog(logData) {
		let data = {};
		if(findIndex(logData['google'], { msg : 'done'}) > -1) {
			data['google'] = find(logData['google'], { msg : 'done'}).data
		}

		if(findIndex(logData['corporationwiki'], { msg : 'done'}) > -1) {
			data['corporationwiki'] = find(logData['corporationwiki'], { msg : 'done'}).data
		}

		return data;
	}

	static updateLogData(logData) {
		if(findIndex(logData, { msg : 'done'}) > -1) {
			return find(logData, { msg : 'done'}).data
		}
		return '';
	}

	componentWillReceiveProps(props) {
		const { scrapeLog = '', response_company = '', response_grabber='', add_company_people = ''} = props;
		console.log(props);
		this.setState({
			realTimeLog : scrapeLog,
			companyLog : response_company,
			response_grabber : !isEmpty(response_grabber) || Company.updateResponseLog(scrapeLog),
			isOpenGoogle : Company.updateLogStatus(scrapeLog['google']),
			isOpenCorpWiki : Company.updateLogStatus(scrapeLog['corporationwiki']),
			peopleSchema : response_company && response_company.companyPeople && response_company.companyPeople.length > 0 && this.genarateSchema(response_company.companyPeople, response_company.companyData) || this.genarateEmptySchema(),
			corpWikiLastRunReportLog : Company.updateLogData(scrapeLog['corporationwiki']) || response_company && response_company.scrapeLog && response_company.scrapeLog.length && findIndex(response_company.scrapeLog, { 'source' : 'corporationwiki'}) > -1 && JSON.parse(find(response_company.scrapeLog, { 'source' : 'corporationwiki'})['logData']) || '',
			googleLastRunReportLog : Company.updateLogData(scrapeLog['google']) || response_company && response_company.scrapeLog && response_company.scrapeLog.length && findIndex(response_company.scrapeLog, { 'source' : 'google'}) > -1 && JSON.parse(find(response_company.scrapeLog, { 'source' : 'google'})['logData']) || '',
			isFetching : add_company_people && add_company_people.isFetching
		})
	}

	componentDidMount() {
		initChatSocket(this.props.dispatch, 'US');
		frameworkGlobals.emit('joinRoom', {
			room : `SCRAPE:${this.props.params.id}`
		});
	}

	runGrabber(source) {
		const { companyLog, isOpen = true } = this.state;
		const { id } = this.props.params;
		this.setState({
			isOpen : !isOpen
		}, ()=>{
			this.props.dispatch(REQUEST_RUN_GRABBER({
				dataPayload : {
					name : companyLog.CompanyName,
					state : companyLog.State.toLowerCase(),
					source,
					sid : `SCRAPE:${this.props.params.id}`
				},
				paramPayload : { id }
			}));
		})

	}

	renderFullName() {
		const { companyLog = ''} = this.state;
		let name;
		if(companyLog.FirstName) {
			name = companyLog.FirstName;
		}
		if(companyLog.MiddleName) {
			name = `${name} ${companyLog.MiddleName}`
		}
		if(companyLog.LastName) {
			name = `${name} ${companyLog.LastName}`
		}
		return name;
	}

	render() {
		const { l } = this.context.i18n;
		const { realTimeLog, companyLog = '', lastRunReportLog = '', isFetching } = this.state;

		return (
			<div className="container-layout">
				{
					isFetching && !frameworkGlobals.isServer &&
					<Loader/>
				}
				<div className="company-details-wrapper flex">
					{companyLog && this.renderCompany(companyLog)}
					<div className="container-company-actions flex flex-column" style={comapnyActionsStyles}>
						<div className="flex" style={{'font-size' : '2rem', 'font-weight' : '600'}}>{this.renderFullName()}</div>
						<div className="flex" style={{'font-size' : '1.8rem'}}>{companyLog.Email}</div>
					</div>
				</div>
				<div className="company-details-wrapper flex" style={{ 'border-top' : 'none', 'margin-bottom' : '20px'}}>
					{companyLog && this.renderPeople()}
				</div>
				{this.renderLogWindows(realTimeLog)}
			</div>
		)
	}

	renderCompany(companyLog) {
		const classesFlg = companyLog.Processed === 'yes' ? "company-processed" : "company-unprocessed";
		return (
			<div className="container-company flex flex-column" style={{'line-height' : '1.5'}}>
				<div className="flex">
					<span style={{'font-size' : '2rem', 'font-weight' : '600'}}>{companyLog.CompanyName}</span>
					<button className={`btn btn-default btn-sm ${classesFlg}`} style={{height : '25px', 'margin-left' : '10px' }}>
						{ companyLog.Processed === 'yes' ? 'Processed' : 'UnProcessed'}
					</button>
				</div>
				<div className="flex" style={{'font-size' : '1.8rem'}}>{this.getAddress(companyLog)}</div>
				<div className="flex" style={{'font-size' : '1.8rem'}}>{companyLog.Phone1}</div>
			</div>
		)
	}

	onSchemaChange = (changeObject, hasErrors) => {
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = 1;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	async submitPeople() {

		await this.props.dispatch(REQUEST_ADD_COMPANY_PEOPLE(
			{
				dataPayload: extend({}, this.state.initialValues, this.state.modifiedValues),
				paramsPayload : { id : this.props.params.id}
			}
		));
		this.context.router.push({
			pathname :`/company/${this.props.params.id}`,
			query : {
				reload : uniqueId()
			}
		});
	}


	renderPeople() {
		const { peopleSchema = '', modifiedValues = {}, initialValues = {}, activeTableId} = this.state;
		return (
			<div className="container-company flex flex-column" style={{'line-height' : '1.5', width : '100%'}}>
				{ peopleSchema && <Schema
					l={(text)=> text}
					country = {'us'}
					key={activeTableId}
					ref={`schema_0`}
					data={peopleSchema}
					writeMode={true}
					updateonPropsChange={true}
					onChange={this.onSchemaChange}
					onReady={this.onSchemaChange}
					modifiedValues={modifiedValues}
					initialValues={initialValues}
					referenceData={''}
				/>}
				{ !peopleSchema && <div className="flex" style={{'font-size' : '2rem', 'font-weight' : '600', 'justify-content' : 'center'}}>No People Added Yet</div>}
				{ peopleSchema && (!isEmpty(modifiedValues) || !isEmpty(initialValues)) && <Button className="toolbar-group save-search submit-people" onClick={()=>this.submitPeople()}>
					Submit People
				</Button> }
			</div>
		)
	}

	getAddress(data) {
		return `${data.Address1}, ${data.City} - ${data.Zip5}, ${data.State}`
	}

	renderCheckLogs() {

	}

	runCorpWiki(source, realTimeLog, logData) {
		const { response_grabber = ''} = this.props;
		const { isOpen, isOpenCorpWiki = false } = this.state;
		const hideClasses = isOpen || isOpenCorpWiki ? 'show' : 'hide';
		return (
			<div key="source" className="flex flex-column log-corpwiki">
				{ logData && <div className={`source__recent-report ${hideClasses}`}>
					{
						logData.map( (log, key ) => this.renderCompanyReport(log, source, key))
					}
				</div>}
				{ realTimeLog && !response_grabber && this.renderLogWindow(realTimeLog, source) }
				{ realTimeLog && !response_grabber && <Spinner styles={{margin : 0 }}/> }
				{
					response_grabber && response_grabber.error && <ErrorBox l={(txt)=> txt} errorCode={response_grabber.error}/>
				}
			</div>
		)
	}

	runGoogle(source, realTimeLog, logData) {
		const { response_grabber = ''} = this.props;
		const { isOpen, isOpenGoogle = false } = this.state;
		const hideClasses = isOpen || isOpenGoogle ? 'show' : 'hide';
		return (
			<div key="source" className="flex flex-column log-google">
				{ logData && <div className={`source__recent-report ${hideClasses}`}>
					{
						logData.map( (log, key ) => this.renderGoogleReport(log, source, key))
					}
				</div>}
				{ realTimeLog && !response_grabber['google'] && this.renderGoogleLogWindow(realTimeLog, source) }
				{ realTimeLog && !response_grabber['google'] && <Spinner styles={{margin : 0 }}/> }
				{
					response_grabber && response_grabber.error && <ErrorBox l={(txt)=> txt} errorCode={response_grabber.error}/>
				}

			</div>
		)
	}

	renderGoogleReport(log, source, key) {
		return (
			<div className="g">
				<div className="rc">
					<div className="r ggl-link">
						<a href={log.link} target="__blank"><h3>{log.title}</h3></a>
					</div>
					<div className="s">
						<div className="st">
							{log.desc}
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderGoogleLogWindow(logs, source) {
		return (
			logs && logs.map( (log, key) => <div className="flex flex-column" key={`${source}${key}`}>{this.renderReportLog(log)}</div> )
		)
	}

	runcorpDirectory(){

	}

	runOpenCorp() {

	}

	renderLogWindows(realTimeLog, logData) {
		const { corpWikiLastRunReportLog = '', googleLastRunReportLog = '', isOpen = true} = this.state;
		return (
			<div className="scrape-log-container flex">
				<Collapsible
					key="corporationwiki-collapse"
					transitionTime={250}
					trigger="Data Verification"
					open={true}
					className="grabber__collapsible"
				>
					<Button className="toolbar-group save-search data-verification-btn" onClick={()=>this.runGrabber('corporationwiki')}>
						{'RUN DATA VERIFICATION'}
					</Button>
					<div className="flex log-container">
						{this.runCorpWiki('corporationwiki', realTimeLog && realTimeLog['corporationwiki'] || '', corpWikiLastRunReportLog)}
						{this.runGoogle('google', realTimeLog && realTimeLog['google'] || '', googleLastRunReportLog)}
					</div>
				</Collapsible>
			</div>
		)
	}

	renderLogWindow(logs, source) {
		return (
			logs && logs.map( (log, key) => <div className="flex flex-column" key={`${source}${key}`}>{this.renderReportLog(log)}</div> )
		)
	}

	renderReportLog(log) {
		return(
			<div className={`logs ${log.className}`}>
				{ log.msg && <div className="flex log-message">{log.msg}</div>}
				{log.data && <div className="flex log-data">
					{ typeof log.data === 'string' ?  log.data :  <pre>{JSON.stringify(log.data, undefined, 4)}</pre>}
				</div>}
			</div>
		)
	}

	async handleChange(state, source, id){
		this.setState({
			checked : state,
			activeTableId : state.length && `${source}-${id}` || ''
		})
	}

	generateDataTableProps(data, source, id) {
		const {activeTableId = '', checked= [] } = this.state;
		const currDataTableId = `${source}-${id}`;
		return  {
			key : `data${source}${id}`,
			persons : data,
			checked : activeTableId === currDataTableId ? checked : [],
			onSelectedRowsChange :  state => this.handleChange(state, source, id)
		};
	}

	genarateEmptySchema(){
		let schemaChildren = [];
		schemaChildren.push({
			"label": "EXPERTISE",
			"id": `personremovable1`,
			"type": "list",
			"subtype": "list-removable-single",
			"classNames": ['schema__list', 'schema__list__removable-single','schema__list__removable-single__custom-btn'],
			"isButton" : true,
			"children" : [
				{
					"type": "custom-multi-group",
					"children": [
						{
							"label": "name",
							"id": "details.people(1).name",
							"type": "text",
							"classNames" : ['schema__text', 'schema__name']
						},
						{
							"label": "phone",
							"id": "details.people(1).phone",
							"type": "text",
							"classNames" : ['schema__text', 'schema__phone']
						},
						{
							"label": "email",
							"id": "details.people(1).email",
							"type": "text",
							"classNames" : ['schema__text', 'schema__email']
						},
						{
							"label": "roles",
							"id": "details.people(1).roles",
							"type": "text",
							"classNames" : ['schema__text', 'schema__roles']
						},
						{
							"label": "fullAddresses",
							"id": "details.people(1).address",
							"type": "text-suggestion",
							"classNames" : ['schema__text', 'schema__fullAddresses']
						},
						{
							"label": "status",
							"id": "details.people(1).status",
							"type": "text",
							"classNames" : ['schema__text', 'schema__status']
						}
					]
				}
			]
		})
		ADDPERSON.data.key = 2;
		schemaChildren.push(ADDPERSON);
		// company schema
		const companyschema = {
			"label": "EXPERTISE",
			"id": `companyremovable`,
			"type": "list",
			"subtype": "list-removable-single",
			"classNames": ['schema__list', 'schema__list__company', 'schema__list__removable-single','schema__list__removable-single__custom-btn'],
			"isButton" : true,
			"children" : [
				{
					"type": "custom-multi-group",
					"children" : this.buildCompanySchema()
				}
			]
		};

		schemaChildren.unshift(COMPANY_LABEL, companyschema, PEOPLE_LABEL);

		const peopleSchema = {
			"type" : "header",
			"children" : schemaChildren
		};

		return peopleSchema;
	}

	genarateSchema(pplData, companyData) {
		const peopleData =  pplData.map( (item , index ) => this.buildPeopleSchema(item, index+1));
		const schemaChildren = peopleData.map( (data, key) => {
			return {
				"label": "EXPERTISE",
				"id": `personremovable${key}`,
				"type": "list",
				"subtype": "list-removable-single",
				"classNames": ['schema__list', 'schema__list__removable-single','schema__list__removable-single__custom-btn'],
				"isButton" : true,
				"children" : [
					{
						"type": "custom-multi-group",
						"children" : data
					}
				]
			}
		});
		ADDPERSON.data.key = schemaChildren.length + 1;
		schemaChildren.push(ADDPERSON);

		// company schema
		const companyschema = {
			"label": "EXPERTISE",
			"id": `companyremovable`,
			"type": "list",
			"subtype": "list-removable-single",
			"classNames": ['schema__list', 'schema__list__company', 'schema__list__removable-single','schema__list__removable-single__custom-btn'],
			"isButton" : true,
			"children" : [
				{
					"type": "custom-multi-group",
					"children" : this.buildCompanySchema(companyData[0])
				}
			]
		};

		schemaChildren.unshift(COMPANY_LABEL, companyschema, PEOPLE_LABEL);

		const peopleSchema = {
			"type" : "header",
			"children" : schemaChildren
		};

		return peopleSchema;
	}

	getSchemaValues(data, type) {
		if(!data) {
			return '';
		}

		if(typeof data === 'object' && type === 'text-suggestion') {
			return data[0]
		}

		return data;
	}

	getSuggestionOptions(data, type) {
		if(!data) {
			return '';
		}

		if(typeof data === 'object' && type === 'text-suggestion') {
			console.log(data, type);
			return data.map( option => ({ value : option, label : option}))
		}

		if(type === 'text-suggestion') {
			return [{ value : data, label : data}]
		}

		return data;
	}

	buildPeopleSchema(data, index) {

		return Object.keys(SCHEMA_MAP_PEOPLE).map( key => {
			const value = this.getSchemaValues(data[key], SCHEMA_MAP_PEOPLE[key]['component']);
			this.updateValues[`details.people(${index}).${key}`] = value;
			return  {
				"label": key ,
				"id": `details.people(${index}).${key}`,
				"type": SCHEMA_MAP_PEOPLE[key]['component'],
				"classNames" : ['schema__text', `schema__${key}`],
				"data" : {
					"value" : value,
					"options" : this.getSuggestionOptions(data[key], SCHEMA_MAP_PEOPLE[key]['component'])
				}
			}
		})
	}

	buildCompanySchema(data={}) {
		return Object.keys(SCHEMA_MAP_COMPANY).map( key => {
			const value = this.getSchemaValues(data[key], SCHEMA_MAP_COMPANY[key]['component']);
			this.updateValues[`details.company.${key}`] = value;
			return  {
				"label": key ,
				"id": `details.company.${key}`,
				"type": SCHEMA_MAP_PEOPLE[key]['component'],
				"classNames" : ['schema__text', `schema__company__${key}`],
				"data" : {
					"value" : value,
					"options" : this.getSuggestionOptions(data[key], SCHEMA_MAP_COMPANY[key]['component'])
				}
			}
		})
	}

	addPeople() {
		const { activeTableId, corpWikiLastRunReportLog , checked } = this.state;
		const peopleLog = corpWikiLastRunReportLog[activeTableId.split('-')[1]];
		const peopleData =  checked.map( index => this.buildPeopleSchema(peopleLog['people'][index], index+1));
		const schemaChildren = peopleData.map( (data, key) => {
			return {
				"label": "EXPERTISE",
				"id": `personremovable${key}`,
				"type": "list",
				"subtype": "list-removable-single",
				"classNames": ['schema__list', 'schema__list__removable-single','schema__list__removable-single__custom-btn'],
				"isButton" : true,
				"children" : [
					{
						"type": "custom-multi-group",
						"children" : data
					}
				]
			}
		});

		ADDPERSON.data.key = schemaChildren.length + 1;
		schemaChildren.push(ADDPERSON);

		// company schema
		const companyschema = {
			"label": "EXPERTISE",
			"id": `companyremovable`,
			"type": "list",
			"subtype": "list-removable-single",
			"classNames": ['schema__list', 'schema__list__company', 'schema__list__removable-single','schema__list__removable-single__custom-btn'],
			"isButton" : true,
			"children" : [
				{
					"type": "custom-multi-group",
					"children" : this.buildCompanySchema(peopleLog)
				}
			]
		};

		schemaChildren.unshift(COMPANY_LABEL, companyschema, PEOPLE_LABEL);
		const peopleSchema = {
			"type" : "header",
			"children" : schemaChildren
		};
		window.scrollTo(0, 0);
		this.setState({peopleSchema, modifiedValues : this.updateValues})
	}

	renderCompanyReport(company, source, id) {
		const  { activeTableId = ''} = this.state;
		const currDataTableId = `${source}-${id}`;
		return (
			<div className="company-report__wrapper">
				<div className="company-report__company">
					<div><span><a href={company.link} target="__blank">{company.name}</a></span></div>
					<div className="company__address"><span>{company.fullAddresses.join(' || ')}</span></div>
					{ company.phone && <div><span>{company.phone}</span></div>}
					{company.status && <div><span>{company.status}</span></div>}
				</div>
				{ company.people && <div className="company-report__people">
					<TableList {...this.generateDataTableProps(company.people, source, id)} />
				</div>}
				{ activeTableId === currDataTableId ?
					<Button className="toolbar-group save-search" onClick={()=>this.addPeople()}>
						Add People
					</Button> : null}
			</div>
		)
	}
}

const mapStateToProps = ({application, chat, schema}) => {
	const { response_company, response_grabber =''} = application;
	return {
		response_company,
		id : chat.id,
		scrapeLog : chat.scrapeLog && chat.scrapeLog,
		add_company_people : schema.add_company_people || '',
		response_grabber
	};
};

export default connect(mapStateToProps)(
	connectDataFetchers(Company, [
		REQUEST_GET_COMPANY
	], true)
);

