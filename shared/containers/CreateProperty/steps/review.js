import React , { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import Spinner from 'components/common/spinner/spinner';
import ReactDataGrid from 'react-data-grid';
import { Data } from 'react-data-grid-addons';
import { getGraphData, MONTHLY_VIEW, YEARLY_VIEW, GRAPH_VIEW_TABS, CUSTOM_VIEW, MONTHS_MAP } from 'components/analyze-returns/analyze-return-graph-data';
import Chart from 'components/charts';
import moment from 'moment';
import { formatCurrency, getValueByLocale } from 'utils/localeUtil';
import { getPropertyExpenses } from 'utils/propertyUtil';
import Cx from 'classnames';
import Timeless from 'components/timeline/Timeline';
import SimpleTabs from 'components/common/simple-tabs/simple-tabs';
import SingleSelectBoxes from 'components/common/single-select-boxes';
import { getYearInShort } from 'utils/dateUtil';
import Loader from 'components/common/page-loader/loader';
import SiteConfig from '../../../config';
import { getBase64ImageFromUrl } from 'utils/pdfUtil';
import { chunk as _chunk, find as _find } from 'lodash';
import { getAbsoluteUrl } from 'utils/urlUtil';
import PropertyInfoStrip from './property-info-strip';
import ShareViaEmail from 'components/share-via-email';
import Snackbar from 'components/common/snackbar/snackbar';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../../redux/actions/schema';
import { REQUEST_FILE_SHARE_VIA_EMAIL } from '../../../redux/actions/application';
//import loadable from '@loadable/component';
//const ReactDataGrid = loadable(() => import(/* webpackChunkName: 'ReactDataGrid' */'react-data-grid'),{ LoadingComponent: Loader});


const delay =  require('../../../lib/delay');

const { assetsPath, localeSettings } = SiteConfig;
const GA_CATEGORY = 'Create Property';
const EXPENSES = getPropertyExpenses();
const ROWS = [
	{
		"key" : "grossRentRevenue",
		"label" : "GROSSRENTREVENUE"
	},
	{
		"key" : "otherIncome",
		"label" : "OTHER_INCOME"
	},
	{
		"key" : "totalIncome",
		"label" : "TOTALINCOME"
	},
	...EXPENSES,
	{
		"key" : "totalExpenses",
		"label" : "TOTALEXPENSES"
	},
	{
		"key" : "netOperatingIncome",
		"label" : "NETOPERATINGINCOME"
	},
	{
		"key" : "emiCost",
		"label" : "DEBTSERVICES"
	},
	{
		"key" : "cashflowvalue",
		"label" : "ANNUALFREECASHFLOW"
	}
];
const DETAILS_VIEW = 'details',
	SUMMARY_VIEW = 'summary',
	GRAPH_Y_AXIS_POINTS = 10;
class ReviewProperty extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			view : SUMMARY_VIEW,
			graphViewSwitch : 'yearly'
		};
		this.onBackClick = this.onBackClick.bind(this);
		this.onNextClick = this.onNextClick.bind(this);
		this.sharePdfEmail = this.sharePdfEmail.bind(this);
		this.onNavigateSaveExitClick = this.onNavigateSaveExitClick.bind(this);
	}

	componentWillReceiveProps(props) {
		const graphView = props.get_schema_my_property_review.yearlyAnalyzeReturns && props.get_schema_my_property_review.yearlyAnalyzeReturns.length > 2 ? YEARLY_VIEW : MONTHLY_VIEW;
		let emailSendNotifMsg = this.state.emailSendNotifMsg,
			isShowEmailSentNotification = this.state.isShowEmailSentNotification;
		if(props.response_file_share_email.data && this.fileShareNotified === false) {
			if(props.response_file_share_email.data.status === 'success') {
				emailSendNotifMsg = 'EMAILSENT';
			} else {
				emailSendNotifMsg = 'EMAILSENDFAIL';
			}
			isShowEmailSentNotification = true;
			this.fileShareNotified = true;
			this.emailModalClose && this.emailModalClose();
		}
		this.setState({
			isFetching : props.get_schema_my_property_review.isFetching,
			monthlyData : this.isGraphViewChangeManual ? this.state.monthlyData : this.filterMonthlyData(props.get_schema_my_property_review.monthlyAnalyzeReturns,props.get_schema_my_property_review.defaultStartDate,props.get_schema_my_property_review.defaultEndDate),
			yearlyData : props.get_schema_my_property_review.yearlyAnalyzeReturns,
			defaultEndDate : props.get_schema_my_property_review.defaultEndDate,
			defaultStartDate : props.get_schema_my_property_review.defaultStartDate,
			startDate : props.get_schema_my_property_review.startDate,
			endDate : props.get_schema_my_property_review.endDate,
			graphViewSwitch : this.isGraphViewChangeManual ? this.state.graphViewSwitch : graphView,
			graphViewTab : this.isGraphViewChangeManual ? this.state.graphViewTab : graphView,
			propertyDetails : props.get_schema_my_property_review.myProperty,
			view : SUMMARY_VIEW,
			isShowEmailSentNotification,
			emailSendNotifMsg
		});
	}

	componentDidMount() {
		this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
			method : 'get',
			endpoint : 'getmypropertyreview',
			actionType : 'RESPONSE_GET_SCHEMA_MY_PROPERTY_REVIEW',
			paramPayload : {
				id : this.props.id || this.props.location.query.id
			}
		}));
		this.fetchLogoBase64();
	}

	async fetchLogoBase64() {
		this.base64Img = await getBase64ImageFromUrl(`${assetsPath}/images/logo/logo_us_blue.png`);
	}

	// getting the share email modal close function as param from inside of the modal
	getEmailModalClose = (modalClose) => {
		this.emailModalClose = modalClose;
	}

	/*onChangeGraphView = (tabName) => {
		const tab = _find(GRAPH_VIEW_TABS,  { name : tabName})
		this.setState({
			graphViewSwitch : tab.name
		},() => { this.props.onChangeGraphView(tab); });
	}*/

	onChangeGraphView = (tabName) => {
		const tab = _find(GRAPH_VIEW_TABS,  { name : tabName})
		// const view = evt.currentTarget.checked ? MONTHLY_VIEW : YEARLY_VIEW;
		const startDate = tab.value.startdate || this.props.get_schema_my_property_review.defaultStartDate;
		const endDate = tab.value.enddate || this.props.get_schema_my_property_review.defaultEndDate;
		this.isGraphViewChangeManual = true;
		this.setState({
			graphViewTab : tab.name,
			graphViewSwitch : tab.value.viewtype,
			monthlyData : this.filterMonthlyData(this.props.get_schema_my_property_review.monthlyAnalyzeReturns,startDate,endDate)
		});
	}

	onChangeView(view) {
		this.setState({
			view
		});
	}

	onTimespanChange = (timespan) => {
		this.setState({
			monthlyData : this.filterMonthlyData(this.props.get_schema_my_property_review.monthlyAnalyzeReturns,timespan.startDate,timespan.endDate)
		});
	}

	getRows = () => {
		const { monthlyData, yearlyData, graphViewSwitch } = this.state;
		const { l } = this.context.i18n;
		if(graphViewSwitch === MONTHLY_VIEW) {
			return ROWS.map(rowConfig => {
				let rowObj = {
					'incomeExpenseTitle' : l(rowConfig.label)
				};
				monthlyData.forEach(monthData => {
					rowObj[`${monthData.year}-${monthData.month}`] = monthData[rowConfig.key] || 0;
				});
				return rowObj;
			});
		}
		return ROWS.map(rowConfig => {
			let rowObj = {
				'incomeExpenseTitle' : l(rowConfig.label)
			};
			yearlyData.forEach(yearData => {
				rowObj[yearData.year] = yearData[rowConfig.key] || 0;
			});
			return rowObj;
		});
	};

	rowGetter = (rowIdx) => {
		const rows = this.getRows();
		return rows[rowIdx];
	}

	getColumns() {
		const { l } = this.context.i18n;
		const { monthlyData, yearlyData, graphViewSwitch } = this.state;
		let columns = [{
			key: 'incomeExpenseTitle',
			name: l('INCOMEEXPENSES'),
			resizable: true,
			filterable: false,
			sortable: false,
			frozen : true,
			width: 190
		}];
		if(graphViewSwitch === MONTHLY_VIEW) {
			monthlyData.slice(0,monthlyData.length).map(monthData => {
				const month = parseInt(monthData.month/10) === 0 ? `0${monthData.month}` : monthData.month;
				columns.push({
					key : `${monthData.year}-${monthData.month}`,
					name : `${month}/${getYearInShort(monthData.year)}`,
					width: 75
				});
			});
			delete columns[columns.length-1].width;
			return columns;
		}
		yearlyData.slice(0,yearlyData.length).reverse().map(yearData => {
			columns.push({
				key : yearData.year,
				name : yearData.year,
				width: 75
			});
		});
		delete columns[columns.length-1].width;
		return columns;
	}

	getGraphDataset(data,keyProp) {
		const { graphViewSwitch } = this.state;
		if(graphViewSwitch === MONTHLY_VIEW) {
			return data.map(monthData => monthData[keyProp]);
		}
		const yearsToDisplay = this.getGraphLabels(data);
		return data.filter(yearData => yearsToDisplay.indexOf(yearData.year) >= 0).map(yearData => yearData[keyProp]);
	}

	getGraphLabels(data) {
		const { graphViewSwitch } = this.state;
		if(graphViewSwitch === MONTHLY_VIEW) {
			return data.map((monthData,i) => {
				const month = parseInt(monthData.month/10) === 0 ? `0${monthData.month}` : monthData.month;
				return `${month}/${getYearInShort(monthData.year)}`;
			});
		}
		const allYears = data.map(yearD => yearD.year);
		const firstYear = allYears[0];
		const lastYear = allYears[data.length-1];
		const yearGap = Math.ceil((lastYear - firstYear)/GRAPH_Y_AXIS_POINTS);
		let years = [];
		let year = firstYear;
		while(year < lastYear) {
			if(allYears.indexOf(year) >= 0) {
				years.push(year);
			}
			year += yearGap;
		}
		if(year >= lastYear) {
			years.push(lastYear);
		}
		return years;
	}

	renderExpenseBreakdownGraph(data) {
		const { i18n : {l}, country } = this.context;
		let graphData = getGraphData('expenseBreakdown',l,country);
		const totalExpenses = data.reduce((acc,current) => acc + current.totalExpenses,0);
		let labels = [];
		graphData.data.datasets[0].data = EXPENSES.map(expense => {
			const percentage = (((data.reduce((acc,current) => acc + current[expense.key],0))/totalExpenses)*100).toFixed(2);
			labels.push(l(expense.label));
			return percentage;
		});
		graphData.options.tooltips.callbacks.label = (t,d) => `${d.labels[t.index]} - ${d.datasets[0].data[t.index]}%`;
		graphData.data.labels = labels;
		return (
			<Chart data = {graphData.data}
				   graphType = {graphData.type}
				   width="100%"
				   height="210px"
				   title={l('EXPENSEBREAKDOWN')}
				   options = {graphData.options}/>
		);
	}

	renderExpensesGraph(data) {
		const { i18n : {l}, country, screenSize } = this.context;
		const { graphViewSwitch } = this.state;
		let graphData = getGraphData('expenses',l,country);
		EXPENSES.forEach((expense,i) => {
			graphData.data.datasets[i].data = this.getGraphDataset(data,expense.key);
		});
		graphData.data.labels = this.getGraphLabels(data);
		graphData.options.legend.position = screenSize > 2 ? 'right' : 'bottom';
		if(graphViewSwitch === MONTHLY_VIEW) {
			graphData.options.tooltips.callbacks.title = (t,d) => `${MONTHS_MAP[data[t[0].index].month].long}, ${data[t[0].index].year}`;
		}
		return (
			<Chart data = {graphData.data}
				   graphType = {graphData.type}
				   width="100%"
				   height= {screenSize > 2 ? "230px" : "300px"}
				   title={l('EXPENSETREND')}
				   options = {graphData.options}/>
		);
	}

	renderIncomeExpenseRatioGraph(data) {
		const { i18n : {l}, country } = this.context;
		const { graphViewSwitch } = this.state;
		const currencyFormat = getValueByLocale(country,'currencyFormat');
		const currencySymbol = getValueByLocale(country,'currencySymbol');
		let graphData = getGraphData('incomeExpenseRatio',l,country);
		const incomes = this.getGraphDataset(data,'totalIncome');
		const expenses = this.getGraphDataset(data,'totalExpenses');
		graphData.data.datasets[0].data = incomes.map((income,i) => {
			return income === 0 ? 100 : (expenses[i]/income)*100;
		});
		graphData.data.labels = this.getGraphLabels(data);
		graphData.options.tooltips.footerFontStyle = 'normal';
		graphData.options.tooltips.callbacks.beforeFooter = (t,d) => `${l('TOTALINCOME')} : ${currencySymbol}${formatCurrency(incomes[t[0].index],2,currencyFormat)}`;
		graphData.options.tooltips.callbacks.footer = (t,d) => `${l('TOTALEXPENSES')} : ${currencySymbol}${formatCurrency(expenses[t[0].index],2,currencyFormat)}`;
		if(graphViewSwitch === MONTHLY_VIEW) {
			graphData.options.tooltips.callbacks.title = (t,d) => `${MONTHS_MAP[data[t[0].index].month].long}, ${data[t[0].index].year}`;
		}
		return (
			<Chart data = {graphData.data}
				   graphType = {graphData.type}
				   width="100%"
				   height="200px"
				   title={l('INCOMEEXPENSERATIO')}
				   options = {graphData.options}/>
		);
	}

	renderIncomeExpenseGraph(data) {
		const { i18n : {l}, country } = this.context;
		let graphData = getGraphData('incomeExpense',l,country);
		graphData.data.datasets[0].data = this.getGraphDataset(data,'totalIncome');
		graphData.data.datasets[1].data = this.getGraphDataset(data,'totalExpenses');
		graphData.data.labels = this.getGraphLabels(data);
		return (
			<Chart data = {graphData.data}
				   graphType = {graphData.type}
				   width="100%"
				   height="200px"
				   title={l('INCOMEEXPENSES')}
				   options = {graphData.options}/>
		);
	}

	renderNOIGraph(data) {
		const { i18n : {l}, country } = this.context;
		const { graphViewSwitch } = this.state;
		let graphData = getGraphData('income',l,country);
		graphData.data.datasets[0].data = this.getGraphDataset(data,'netOperatingIncome');
		graphData.data.datasets[1].data = this.getGraphDataset(data,'grossRentRevenue');
		graphData.data.labels = this.getGraphLabels(data);
		if(graphViewSwitch === MONTHLY_VIEW) {
			graphData.options.tooltips.callbacks.title = (t,d) => `${MONTHS_MAP[data[t[0].index].month].long}, ${data[t[0].index].year}`;
		}
		return (
			<Chart data = {graphData.data}
				   graphType = {graphData.type}
				   width="100%"
				   height="230px"
				   title={l('INCOME')}
				   options = {graphData.options}/>
		);
	}

	renderGraphs() {
		const { view, graphViewSwitch, monthlyData, yearlyData } = this.state;
		const data = graphViewSwitch === MONTHLY_VIEW ? monthlyData : yearlyData;
		return (
			<div className={Cx("flex review-step__graph-wrap",{'hide' : view !== SUMMARY_VIEW })}>
				<div className="flex flex-column noi-graph-wrap">
					{this.renderNOIGraph(data)}
					{this.renderIncomeExpenseRatioGraph(data)}
				</div>
				<div className="flex flex-column expense-graph-wrap">
					{this.renderExpensesGraph(data)}
					{this.renderExpenseBreakdownGraph(data)}
				</div>
			</div>
		)
	}

	renderData() {
		const { view, defaultEndDate, defaultStartDate, startDate, endDate, graphViewSwitch, graphViewTab  } = this.state;
		const { i18n : {l}, screenSize } = this.context;
		const TABS = screenSize === 1 ? GRAPH_VIEW_TABS.filter(tab => tab.name !== CUSTOM_VIEW) : GRAPH_VIEW_TABS;
		return (
			<Fragment>
				<div className="review-step__graph-timeline-wrap">
					<SingleSelectBoxes
						key="View Selection"
						boxOptions={TABS}
						isAnyRequired = {false}
						selectedBox = {graphViewTab}
						l={l}
						analyticsData={ {
							"category" : "Portfolio Dashboard",
							"action" : "Click",
							"label" : "View Selection"
						}}
						onChange={(value)=>{this.onChangeGraphView(value)}}/>
					{/*<SimpleTabs analyticsData={{ category : GA_CATEGORY, label : 'Review view type selection' }} onChange={this.onChangeGraphView} selected={graphViewTab} tabs={TABS} />*/}
					{graphViewTab === CUSTOM_VIEW &&
					<div className="review-step__graph-timeline">
						<Timeless ref={(node) => { this.timeless = node}}
								  minYear = {startDate && moment.utc(startDate).toDate().getFullYear() || ''}
								  maxYear = {endDate && moment.utc(endDate).toDate().getFullYear() || ''}
								  minTimestamp={startDate}
								  maxTimestamp={endDate}
								  minCursorDefaultTimestamp={defaultStartDate || ''}
								  maxCursorDefaultTimestamp={defaultEndDate || ''}
								  onChangeDelay={250}
								  onChange={this.onTimespanChange}
								  disabled={this.state.disabled}
						/>
					</div>
					}
				</div>
				{this.renderGraphs()}
				{<div className={Cx("review-step__data-grid-wrap",{'hide' : view !== DETAILS_VIEW})}>
					{!frameworkGlobals.isServer  &&  <ReactDataGrid
						key={DETAILS_VIEW}
						enableCellAutoFocus={false}
						columns={this.getColumns()}
						rowGetter={this.rowGetter}
						rowsCount={ROWS.length}
						rowHeight={22}
						headerRowHeight={25}
						minHeight={360}/>}
				</div>}
			</Fragment>
		)
	}

	getPdfFileName() {
		const propertyName = this.getPropertyHeader();
		const date = moment().format('MMDDYYYY');
		return `${propertyName} ${date}.pdf`;
	}

	getPropertyHeader() {
		const { propertyDetails } = this.state;
		return propertyDetails.name ? propertyDetails.name : (propertyDetails.address && propertyDetails.address.formattedAddress)
	}

	renderViewSwitchTabs = () => {
		const { l } = this.context.i18n;
		return (
			<div className="review-step__switch-view-tabs flex flex-align-center">
				<button data-tag-category={GA_CATEGORY} data-tag-action='click' data-tag-label='Review summary' onClick={()=>this.onChangeView(SUMMARY_VIEW)} className={Cx("review-step__switch-view-btn",{'active': this.state.view === SUMMARY_VIEW})}>
					{l('SUMMARY')}
				</button>
				<button data-tag-category={GA_CATEGORY} data-tag-action='click' data-tag-label='Review details' onClick={()=>this.onChangeView(DETAILS_VIEW)} className={Cx("review-step__switch-view-btn",{'active': this.state.view === DETAILS_VIEW})}>
					{l('DETAILS')}
				</button>
			</div>
		)
	}

	renderSharePdfEmail = () => {
		const { i18n : {l}} = this.context;
		const { location, user, dispatch } = this.props;
		return (
			<ShareViaEmail shareDisclaimer={l('PDFSHAREDISCLAIMER')} btnClass="btn btn-default btn-sm profile-page__layout__profile-section__wishlist__share-btn" location={location} user={user} dispatch={dispatch} getModalCloseProp={this.getEmailModalClose} onActionSend={this.sharePdfEmail}>
				<i className="pe-7s-email"/>
				{l('SHARE')}
			</ShareViaEmail>
		);
	}

	renderPropertyDetails() {
		const { i18n : {l}, country, screenSize } = this.context;
		const { propertyDetails } = this.state;
		const { isPortfolioView, id } = this.props;
		return (
			<PropertyInfoStrip
				renderViewSwitchTabs={this.renderViewSwitchTabs}
				propertyDetails={propertyDetails}
				isPortfolioView={isPortfolioView}
				isReviewStep={true}
				id={id}
				l={l}
				screenSize={screenSize}
				renderSharePdfEmail={this.renderSharePdfEmail}
				onExportToPdf={this.onNextClick}
				country={country}/>
		);
	}

	render() {
		const { i18n : {l}, screenSize} = this.context;
		const { value = '', isFetching, monthlyData, year, propertyDetails, isPdfProcessing, isShowEmailSentNotification, emailSendNotifMsg } = this.state;
		const { stepConfig, className } = this.props;
		return (
			<div className={Cx("review-step wizard__step-container",className)}>
				{!frameworkGlobals.isServer && ReactDOM.createPortal(
					<Snackbar active={isShowEmailSentNotification} timeout={1000} onTimeout={this.hideEmailNotification}>
                    	{l(emailSendNotifMsg)}
               	 	</Snackbar>,
					document.querySelector('body'),
				)}
				{this.renderPropertyDetails()}
				<div className="wizard__step-container__content-wrap">
					{isPdfProcessing && <Loader />}
					{isFetching && <Spinner />}
					{(!isFetching && monthlyData) ? this.renderData() : ( isFetching === false ) && <div className="no-result">
						{l('EMPTYREVIEWRESULTS')}
					</div>}
				</div>
				<LinearNavigation
					nextCaret={false}
					backText={l('PREVIOUS')}
					className="linear-navigation--light-theme"
					isSaveExitRequired={false}
					navigatingSaveExitText={'EXIT'}
					onNavigateSaveExit={this.onNavigateSaveExitClick}
					isNavigatingSaveExitRequired
					onBack={this.onBackClick}
					onNext={this.onNextClick}
					isNextRequired={false}
				/>
			</div>
		);
	}

	hideEmailNotification = () => {
		this.setState({
			isShowEmailSentNotification : false
		});
	}

	filterMonthlyData(allData,startDate,endDate) {
		if(!allData) {
			return '';
		}
		startDate = typeof startDate === 'string' ? startDate : moment.utc(startDate).format('DD/MM/YYYY');
		endDate = typeof endDate === 'string' ? endDate : moment.utc(endDate).format('DD/MM/YYYY');
		const startDateSplit = startDate.split('/');
		const endDateSplit = endDate.split('/');
		const startMonth = Number(startDateSplit[1]);
		const startYear = Number(startDateSplit[2]);
		const endMonth = Number(endDateSplit[1]);
		const endYear = Number(endDateSplit[2]);
		return allData.filter(data => {
			const cond = data.year === startYear ? data.month >= startMonth : ( data.year === endYear ? data.month <= endMonth : (data.year > startYear && data.year < endYear))
			return cond;
		});
	}

	onNavigateSaveExitClick() {
		this.props.onNavigateEnd();
	}

	onBackClick() {
		this.props.navigatePrevious({
			step : 'income-expense',
			query : {
				id : this.props.location.query.id
			}
		});
	}

	cloneCanvas(oldCanvas) {

		//create a new canvas
		var newCanvas = document.createElement('canvas');
		var context = newCanvas.getContext('2d');

		//set dimensions
		newCanvas.width = oldCanvas.width;
		newCanvas.height = oldCanvas.height;

		//apply the old canvas to the new one
		context.drawImage(oldCanvas, 0, 0);

		//Clone the new canvas to desired place
		newCanvas.clone().appendTo("#second_container");

	}

	getAutoTableData(rows,columns) {
		const columnGroups = _chunk(columns.slice(1),12);
		let headers = [];
		let bodyRowGroups = [];
		let headerKeys = [];
		columnGroups.forEach(group => {
			let header = [];
			let headerKey = [];
			header.push(columns[0].name);
			headerKey.push(columns[0].key);
			group.forEach(g => {
				header.push(g.name);
				headerKey.push(g.key);
			});
			headers.push(header);
			headerKeys.push(headerKey);
		});
		headerKeys.forEach(keyGroup => {
			let bodyRows = [];
			rows.forEach(row => {
				let bodyRow = [];
				keyGroup.forEach(key => {
					bodyRow.push(row[key]);
				});
				bodyRows.push(bodyRow);
			});

			bodyRowGroups.push(bodyRows);
		});

		return {
			headRows : headers,
			bodyRows : bodyRowGroups
		};
	}

	prepareJSPdf() {
		this.margins = {
			left: 15
		};
		const {headRows, bodyRows} = this.getAutoTableData(this.getRows(),this.getColumns());
		const { l } = this.context.i18n;

		require('jspdf-autotable');
		const jsPDF = require('jspdf');

		// convert the required html to canvas
		const noiWrapper = document.querySelectorAll('.noi-graph-wrap .chart-container');
		const expenseWrapper = document.querySelectorAll('.expense-graph-wrap .chart-container');
		const incomeCanvas = noiWrapper[0].querySelector('.chartjs-render-monitor');
		const expenseRatioCanvas = noiWrapper[1].querySelector('.chartjs-render-monitor');
		const expenseCanvas = expenseWrapper[0].querySelector('.chartjs-render-monitor');
		const expenseBreakUpCanvas = expenseWrapper[1].querySelector('.chartjs-render-monitor');

		const incomeCanvasAspectRatio = Number(incomeCanvas.style.height.replace('px',''))/Number(incomeCanvas.style.width.replace('px',''));
		const expenseRatioCanvasAspectRatio = Number(expenseRatioCanvas.style.height.replace('px',''))/Number(expenseRatioCanvas.style.width.replace('px',''));
		const expenseCanvasAspectRatio = Number(expenseCanvas.style.height.replace('px',''))/Number(expenseCanvas.style.width.replace('px',''));
		const expenseBreakUpCanvasAspectRatio = Number(expenseBreakUpCanvas.style.height.replace('px',''))/Number(expenseBreakUpCanvas.style.width.replace('px',''));

		const incomeCanvasDataURL = incomeCanvas.toDataURL();
		const expenseRatioCanvasDataURL = expenseRatioCanvas.toDataURL();
		const expenseCanvasDataURL = expenseCanvas.toDataURL();
		const expenseBreakUpCanvasDataURL = expenseBreakUpCanvas.toDataURL();

		var pdf = new jsPDF('p', 'pt', 'a4');
		this.pdfHeader(pdf);
		pdf.setTextColor('#15776e');
		pdf.setFontSize(15);

		pdf.text(l('INCOME'),this.margins.left,80);
		pdf.addImage(incomeCanvasDataURL, 'png', this.margins.left, 90, 360, incomeCanvasAspectRatio*360,'', 'MEDIUM');

		pdf.text(l('INCOMEEXPENSERATIO'),this.margins.left,340);
		pdf.addImage(expenseRatioCanvasDataURL, 'png', this.margins.left, 350, 360, expenseRatioCanvasAspectRatio*360,'', 'MEDIUM');

		pdf.text(l('EXPENSETREND'),this.margins.left,560);
		pdf.addImage(expenseCanvasDataURL, 'png', this.margins.left, 570, 550, expenseCanvasAspectRatio*550,'', 'MEDIUM');

		pdf.addPage();
		this.pdfHeader(pdf);

		pdf.setTextColor('#15776e');
		pdf.setFontSize(15);

		pdf.text(l('EXPENSEBREAKDOWN'),this.margins.left,80);
		pdf.addImage(expenseBreakUpCanvasDataURL, 'JPEG', this.margins.left, 90, 450, expenseBreakUpCanvasAspectRatio*450,'', 'MEDIUM');

		headRows.forEach((headRow,i) => {
			if(i === 1) {
				pdf.addPage();
				this.pdfHeader(pdf);
			}
			if(i === 0) {
				pdf.setTextColor('#15776e');
				pdf.setFontSize(15);
				pdf.text(l('DETAILS'),this.margins.left, 290);
			}

			pdf.autoTable({
				startY: i === 0 ? 300 : i === 1 ? 60 : pdf.previousAutoTable.finalY + 40,
				head: [headRow],
				body: bodyRows[i],
				tableLineColor: '#ddd',
				tableLineWidth: 1,
				tableWidth: 'wrap',
				margin: {
					top: 20,
					left: this.margins.left,
					right: 0,
					bottom: 0
				},
				styles: {
					lineColor: '#ddd',
					lineWidth: 1,
					fontSize: 9,
					halign: 'right',
					minCellWidth: 38
				},
				headStyles: {
					fillColor: '#f9f9f9',
					fontSize: 10,
					textColor: '#15776e',
					fontStyle: 'normal'
				},
				columnStyles: {
					0 : {
						halign : 'left',
						cellWidth : 108
					}
				},
				alternateRowStyles: {
					fillColor: '#fff'
				},
				didParseCell: function(data) {
					switch(data.row.index) {
						case 2:
						case 10:
							data.cell.styles.fontStyle = 'bold';
							break;
						case 11:
						case 13:
							data.cell.styles.fillColor = '#f9f9f9';
							data.cell.styles.fontStyle = 'bold';
					}

					if (data.row.section === 'head' ) {
						data.cell.styles.halign = 'left';
						data.cell.styles.fontStyle = 'bold';
					}
				},
				didDrawPage: function(data) {
					pdf.setTextColor('#000');
				}
			});
		});

		return pdf;
	}

	async onNextClick() {

		this.setState({
			isPdfProcessing: true
		});

		await delay(10); // required for the page loader to display

		const pdf = this.prepareJSPdf();
		pdf.save(this.getPdfFileName());
		this.setState({
			isPdfProcessing: false
		});
	}

	async sharePdfEmail(emailOptions){
		await delay(10);
		const pdf = this.prepareJSPdf();
		const blob = pdf.output('blob');
		const formData = new FormData();
		formData.append('file', blob, this.getPdfFileName());
		formData.append('userids', emailOptions.userIds.join(','));
		formData.append('message', emailOptions.message);
		formData.append('sharetype', 'MY_PROPERTY');

		this.fileShareNotified = false;
		this.props.dispatch(REQUEST_FILE_SHARE_VIA_EMAIL({
			dataPayload : formData
		}));

	}

	headerFooterFormatting(doc, totalPages)
	{
		let i = totalPages;
		for(; i >= 1; i--)
		{
			doc.setPage(i);
			//header
			this.header(doc);

			this.footer(doc, i, totalPages);
			doc.page++;
		}
	}

	pdfFooter(doc, pageNumber, totalPages){
		var str = "Page " + pageNumber + " of " + totalPages
		doc.setFontSize(10);
		doc.text(str, margins.left, doc.internal.pageSize.height - 20);
	}

	pdfHeader(pdf) {
		const { country } = this.context;
		pdf.setTextColor('#000');
		pdf.addImage(this.base64Img,'PNG',this.margins.left,10,123,35);
		pdf.setFontSize(9);
		pdf.setFontSize(16);
		pdf.text(this.getPropertyHeader(), pdf.internal.pageSize.width-10,30,{ align : 'right'});
		pdf.setDrawColor('#000');
		pdf.line(this.margins.left, 50, pdf.internal.pageSize.width - 10,50); // horizontal line
	}

}

const mapStateToProps = ({schema, application}) => {
	const { get_schema_my_property_review } = schema;
	const { response_file_share_email = {} } = application;
	return {
		get_schema_my_property_review,
		response_file_share_email
	};
};

export default connect(mapStateToProps)(ReviewProperty);
