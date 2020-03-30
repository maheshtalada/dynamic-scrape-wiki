import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getPropertyExpenses } from 'utils/propertyUtil';
import Chart from 'components/charts';
import { Table, TableBody, TableHeader, TableRow } from 'components/schema';
import { getGraphData, MONTHLY_VIEW, YEARLY_VIEW, CUSTOM_VIEW, MONTHS_MAP, GRAPH_VIEW_TABS } from 'components/analyze-returns/analyze-return-graph-data';
import { formatCurrency, getValueByLocale } from 'utils/localeUtil';
import { flatMap as _flatMap, groupBy as _groupBy, findIndex as _findIndex, find as _find } from 'lodash';
import PortfolioPropertySelect from './portfolio-property-select';
import Timeless from 'components/timeline/Timeline';
import moment from 'moment';
import SingleSelectBoxes from 'components/common/single-select-boxes';
import { getYearInShort } from 'utils/dateUtil';
import SiteConfig from '../../config';
import { getBase64ImageFromUrl } from 'utils/pdfUtil';
import { getAbsoluteUrl } from 'utils/urlUtil';
import ShareViaEmail from 'components/share-via-email';
import Snackbar from 'components/common/snackbar/snackbar';
import { chunk as _chunk, startCase as _startCase } from 'lodash';
import PORTFOLIOCONFIG from 'assets/static/property-portfolio-config';
import Loader from 'components/common/page-loader/loader';
import { REQUEST_FILE_SHARE_VIA_EMAIL } from '../../redux/actions/application';

const { assetsPath, localeSettings } = SiteConfig
const { PROPERTY_PORTFOLIO_ROWS } = PORTFOLIOCONFIG;
const delay =  require('../../lib/delay');
const fontColor = "#30415d";

class PortfolioGraphs extends Component {

	static contextTypes = {
		i18n : PropTypes.object,
		country : PropTypes.string,
		screenSize : PropTypes.number
	}

	static defaultProps = {
		myPropertyAnalyzeReturns : []
	}

    constructor(props) {
		super(props);
        this.state = {
			data : props.myPropertyAnalyzeReturns || [],
			selectedProperties : props.myPropertyAnalyzeReturns || [],
			actionResponseId : props.actionResponseId,
			graphViewSwitch : 'yearly'
		};
		this.onSelectProperties = this.onSelectProperties.bind(this);
		this.sharePdfEmail = this.sharePdfEmail.bind(this);
	}

	componentWillReceiveProps(props) {
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
			data : props.myPropertyAnalyzeReturns || [],
			actionResponseId : props.actionResponseId,
			selectedProperties : props.actionResponseId !== this.state.actionResponseId ? props.myPropertyAnalyzeReturns : PortfolioGraphs.getUpdatedSelectedProperties(props.myPropertyAnalyzeReturns,this.state.selectedProperties),
			isShowEmailSentNotification,
			emailSendNotifMsg
		});
	}

	componentDidMount() {
		this.fetchLogoBase64();
	}

	async fetchLogoBase64() {
        this.base64Logo = await getBase64ImageFromUrl(`${assetsPath}/images/logo/logo_us_blue.png`);
    }

	onTimespanChange = (timespan) => {
		this.props.onTimespanChange(timespan);
	}

	onChangeGraphView = (tabName) => {
		const tab = _find(GRAPH_VIEW_TABS,  { name : tabName})
		this.setState({
			graphViewSwitch : tab.name
		},() => { this.props.onChangeGraphView(tab); });
	}

	// getting the share email modal close function as param from inside of the modal
	getEmailModalClose = (modalClose) => {
		this.emailModalClose = modalClose;
	}

	hideEmailNotification = () => {
		this.setState({
			isShowEmailSentNotification : false
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
		formData.append('sharetype', 'MY_PORTOFOLIO');

		this.fileShareNotified = false;
		this.props.dispatch(REQUEST_FILE_SHARE_VIA_EMAIL({
			dataPayload : formData
		}));

	}

	getPdfFileName() {
		const { user : { user } } = this.props;
		return `${_startCase(user.name)} Portfolio ${moment().format('MMDDYYYY')}.pdf`;
	}

	onExportToPdf = async () => {
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

	getPdfTableData() {
		const { viewType } = this.props;
		const { l } = this.context.i18n;
		const dataGroups = _chunk(this.cummulativeData,12);
		let headers = [];
		let bodyRows = [];
		dataGroups.forEach((group,i) => {
			headers[i] = [l('INCOMEEXPENSES')];
			bodyRows[i] = [];
			group.forEach(dataItem => {
				if(viewType === MONTHLY_VIEW) {
					const month = parseInt(dataItem.month/10) === 0 ? `0${dataItem.month}` : dataItem.month;
					headers[i].push(`${month}/${getYearInShort(dataItem.year)}`);
				} else {
					headers[i].push(dataItem.year);
				}
			});
			PROPERTY_PORTFOLIO_ROWS.forEach((rowConfig,rowIndex) => {
				bodyRows[i][rowIndex] = [l(rowConfig.label)];
				group.forEach(dataItem => {
					bodyRows[i][rowIndex].push(dataItem[rowConfig.key]);
				});
			});
		});
		return {
			headRows : headers,
			bodyRows
		};
	}

	autoTablePropertyRows() {
		const { selectedProperties } = this.state;
		const groupedProperties = _chunk(selectedProperties,3);
		let bodyRows = [];
		groupedProperties.forEach(group => {
			bodyRows.push(group.map(prop => prop.name));
		});
		return bodyRows;
	}

	prepareJSPdf() {
		this.margins = {
			left: 15
		};
		const { headRows, bodyRows } = this.getPdfTableData();
		const { selectedProperties } = this.state;
		const { l } = this.context.i18n;
		require('jspdf-autotable');
		const jsPDF = require('jspdf');
		// convert the required html to canvas
		const noiWrapper = document.querySelectorAll('.portfolio-wrapper__graph-wrap__wrapper-1 .chart-container');
		const expenseWrapper = document.querySelectorAll('.portfolio-wrapper__graph-wrap__wrapper-2 .chart-container');
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
		
		pdf.setTextColor(fontColor);
		pdf.setFontSize(15);
		pdf.text(l('PROPERTIES'),this.margins.left,80);
		const propertiesToShow = this.autoTablePropertyRows();
		pdf.autoTable({
			startY: 90,
			body: propertiesToShow,
			showHead: false,
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
				cellWidth: 150
			},
			alternateRowStyles: {
				fillColor: '#fff'
			}
		});
		// selectedProperties.forEach((prop,i) => {
		// 	pdf.setTextColor('#000000');
		// 	pdf.setFontSize(12);
		// 	pdf.text(prop.name,this.margins.left,80+10+(i*20));
		// });
		const propertiesTableEndY = pdf.autoTable.previous.finalY;
		pdf.setTextColor(fontColor);
		pdf.setFontSize(15);

		const graph1Y = propertiesTableEndY+50;
		pdf.text(l('INCOME'),this.margins.left,graph1Y);
		pdf.addImage(incomeCanvasDataURL, 'png', this.margins.left, graph1Y+10, 320, incomeCanvasAspectRatio*320,'', 'MEDIUM');

		const graph2Y = graph1Y+10+incomeCanvasAspectRatio*320+50;
		pdf.text(l('INCOMEEXPENSERATIO'),this.margins.left,graph2Y);
		pdf.addImage(expenseRatioCanvasDataURL, 'png', this.margins.left, graph2Y+10, 320, expenseRatioCanvasAspectRatio*320,'', 'MEDIUM');

		pdf.addPage();
		this.pdfHeader(pdf);

		pdf.setTextColor(fontColor);
		pdf.setFontSize(15);

		const graph3Y = 80;
		pdf.text(l('EXPENSETREND'),this.margins.left,graph3Y);
		pdf.addImage(expenseCanvasDataURL, 'png', this.margins.left, graph3Y+10, 450, expenseCanvasAspectRatio*450,'', 'MEDIUM');

		const graph4Y = graph3Y+10+expenseCanvasAspectRatio*450+50;
		pdf.text(l('EXPENSEBREAKDOWN'),this.margins.left,graph4Y);
		pdf.addImage(expenseBreakUpCanvasDataURL, 'JPEG', this.margins.left, graph4Y+10, 410, expenseBreakUpCanvasAspectRatio*410,'', 'MEDIUM');

		headRows.forEach((headRow,i) => {
			if(i === 0 || i === 2) {
				pdf.addPage();
				this.pdfHeader(pdf);
				pdf.setTextColor(fontColor);
				pdf.setFontSize(15);
				pdf.text(l('DETAILS'),this.margins.left, 80);
			}

			pdf.autoTable({
				startY: (i === 0 || i === 2 ) ? 90 : pdf.previousAutoTable.finalY + 40,
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
					textColor: fontColor,
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

	pdfHeader(pdf) {
		const { country, i18n : {l} } = this.context;
      	const { siteDomain } = localeSettings[country];
		//pdf.setFillColor('#30415d');
		//pdf.rect(0, 0, pdf.internal.pageSize.width, 50, 'F');
	    //pdf.setTextColor('#30415d');
        pdf.addImage(this.base64Logo,'PNG',this.margins.left,10,123,35);

   }


	renderExpenseBreakdownGraph(data) {
        const { i18n : {l}, country } = this.context;
        let graphData = getGraphData('expenseBreakdown',l,country);
        const totalExpenses = data.reduce((acc,current) => acc + current.totalExpenses,0);
        let labels = [];
        graphData.data.datasets[0].data = getPropertyExpenses().map(expense => {
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
				   enlargeChartTitle={l('EXPENSEBREAKDOWN')}
				   options = {graphData.options}/>
        );
    }

	renderExpensesGraph(data) {
		const { i18n : {l}, country, screenSize } = this.context;
		const { viewType } = this.props;
		let graphData = getGraphData('expenses',l,country);
		let graphHeight = '230px';
        getPropertyExpenses().forEach((expense,i) => {
            graphData.data.datasets[i].data = PortfolioGraphs.getGraphDataset(data,expense.key);
        });
		graphData.data.labels = this.getGraphLabels(data);
		graphData.options.legend.position = screenSize > 2 ? 'right' : 'bottom';
		if(viewType === MONTHLY_VIEW) {
			// graphData.options.legend.position = 'bottom';
			graphHeight = '240px';
			graphData.options.tooltips.callbacks.title = (t,d) => `${MONTHS_MAP[data[t[0].index].month].long}, ${data[t[0].index].year}`;
		}
        return (
            <Chart data = {graphData.data}
				   graphType = {graphData.type}
				   width="100%"
                   height={screenSize > 2 ? graphHeight : "300px"}
				   enlargeChartTitle={l('EXPENSETREND')}
				   options = {graphData.options}/>
        );
    }

	renderIncomeExpenseRatioGraph(data) {
		const { i18n : {l}, country } = this.context;
		const { viewType } = this.props;
        const currencyFormat = getValueByLocale(country,'currencyFormat');
        const currencySymbol = getValueByLocale(country,'currencySymbol');
		let graphData = getGraphData('incomeExpenseRatio',l,country);
        const incomes = PortfolioGraphs.getGraphDataset(data,'totalIncome');
        const expenses = PortfolioGraphs.getGraphDataset(data,'totalExpenses');
        graphData.data.datasets[0].data = incomes.map((income,i) => {
            return income === 0 ? 100 : (expenses[i]/income)*100;
        });
        graphData.data.labels = this.getGraphLabels(data);
        graphData.options.tooltips.footerFontStyle = 'normal';
        graphData.options.tooltips.callbacks.beforeFooter = (t,d) => `${l('TOTALINCOME')} : ${currencySymbol}${formatCurrency(incomes[t[0].index],2,currencyFormat)}`;
		graphData.options.tooltips.callbacks.footer = (t,d) => `${l('TOTALEXPENSES')} : ${currencySymbol}${formatCurrency(expenses[t[0].index],2,currencyFormat)}`;
		if(viewType === MONTHLY_VIEW) {
			graphData.options.tooltips.callbacks.title = (t,d) => `${MONTHS_MAP[data[t[0].index].month].long}, ${data[t[0].index].year}`;
		}
        return (
            <Chart data = {graphData.data}
				   graphType = {graphData.type}
				   width="100%"
                   height="210px"
				   enlargeChartTitle={l('INCOMEEXPENSERATIO')}
                   options = {graphData.options}/>
        );
    }

	renderNOIGraph(data) {
		const { i18n : {l}, country } = this.context;
		const { viewType } = this.props;
		let graphData = getGraphData('income',l,country);
		let graphHeight = '230px';
		graphData.data.datasets[0].data = PortfolioGraphs.getGraphDataset(data,'netOperatingIncome');
		graphData.data.datasets[1].data = PortfolioGraphs.getGraphDataset(data,'grossRentRevenue');
		graphData.data.labels = this.getGraphLabels(data);
		if(viewType === MONTHLY_VIEW) {
			graphHeight = '240px';
			graphData.options.tooltips.callbacks.title = (t,d) => `${MONTHS_MAP[data[t[0].index].month].long}, ${data[t[0].index].year}`;
		}
        return (
			<Chart data = {graphData.data}
				graphType = {graphData.type}
				width="100%"
				height={graphHeight}
				enlargeChartTitle={l('INCOME')}
				options = {graphData.options}/>
        );
	}
	
    render() {
		const { data, selectedProperties, actionResponseId, graphViewSwitch, isShowEmailSentNotification, emailSendNotifMsg, isPdfProcessing } = this.state;
		const { viewType, location, user, dispatch } = this.props;
		const { screenSize } = this.context;
		if(data.length === 0) {
			return null;
		}
		this.cummulativeData = [];
		if(viewType === YEARLY_VIEW) {
			this.cummulativeData = PortfolioGraphs.getCummulativeData(selectedProperties);
		} else {
			this.cummulativeData = PortfolioGraphs.getCummulativeDataMonthly(selectedProperties);
			// cummulativeData = cummulativeData.filter((d,i) => (i !== 2 && i !== 5 && i !== 7) || d.month === 1 );
		}

		const { l } = this.context.i18n;
		const TABS = screenSize === 1 ? GRAPH_VIEW_TABS.filter(tab => tab.name !== CUSTOM_VIEW) : GRAPH_VIEW_TABS;
        return (
            this.cummulativeData && this.cummulativeData.length > 0 ? <div className="portfolio-wrapper__graph-wrap">
				{isPdfProcessing && <Loader />}
				{!frameworkGlobals.isServer && ReactDOM.createPortal(
					<Snackbar active={isShowEmailSentNotification} timeout={1000} onTimeout={this.hideEmailNotification}>
                    	{l(emailSendNotifMsg)}
               	 	</Snackbar>,
					document.querySelector('body'),
				)}
				<div className="flex flex-justify-between flex-align-end portfolio-wrapper__property-select-wrap">
					<div className="portfolio-wrapper__switch-view-container">
						<SingleSelectBoxes
							key="View Selection"
							boxOptions={TABS}
							isAnyRequired = {false}
							selectedBox = {graphViewSwitch}
							l={l}
							analyticsData={ {
								"category" : "Portfolio Dashboard",
								"action" : "Click",
								"label" : "View Selection"
							}}
							onChange={(value)=>{this.onChangeGraphView(value)}}/>
						</div>
					<div className="flex flex-align-start portfolio-wrapper__export-options">
						{screenSize > 2 && <button className="btn btn-default" data-tag-category='PDF Export Actions' data-tag-action='Click' data-tag-label='My Portfolio' onClick={this.onExportToPdf}><i className="pe-7s-bookmark-2" />{l('EXPORTTOPDF')}</button> }
						{screenSize > 2 && <ShareViaEmail btnClass="btn btn-default profile-page__layout__profile-section__wishlist__share-btn"
										location={location}
										user={user}
										dispatch={dispatch}
										shareDisclaimer={l('PDFSHAREDISCLAIMER')}
										getModalCloseProp={this.getEmailModalClose}
										onActionSend={this.sharePdfEmail}>
							<i className="pe-7s-email"/>
							{l('SHARE')}
						</ShareViaEmail>}
						<PortfolioPropertySelect data={data} actionResponseId={actionResponseId} onSelected={this.onSelectProperties}/>
					</div>
				</div>
				<div className="flex">
					{graphViewSwitch === CUSTOM_VIEW && this.props.startDate && <div className="portfolio-wrapper__graph-timeline">
						<Timeless ref={(node) => { this.timeless = node}}
								minYear = {this.props.startDate && moment.utc(this.props.startDate).toDate().getFullYear() || ''}
								maxYear = {this.props.endDate && moment.utc(this.props.endDate).toDate().getFullYear() || ''}
								minTimestamp={this.props.startDate}
								maxTimestamp={this.props.endDate}
								minCursorDefaultTimestamp={this.props.selectedStartDate || ''}
							  	maxCursorDefaultTimestamp={this.props.selectedEndDate || ''}
								onChangeDelay={250}
								onChange={this.onTimespanChange}
								disabled={this.state.disabled}
						/>
					</div>}
				</div>
				<div className="mock-flex">
					<div className="portfolio-wrapper__graph-wrap__wrapper-1 mock-flex-item">
						<Table>
							<TableHeader>
								<TableRow>
									{l('INCOME')}
								</TableRow>
							</TableHeader>
							<TableBody>
								<div className="cash-return-modal__schema-wrap__item__chart">
									{this.renderNOIGraph(this.cummulativeData)}
								</div>
							</TableBody>
						</Table>

						<Table>
							<TableHeader>
								<TableRow>
									{l('INCOMEEXPENSERATIO')}
								</TableRow>
							</TableHeader>
							<TableBody>
								<div className="cash-return-modal__schema-wrap__item__chart">
									{this.renderIncomeExpenseRatioGraph(this.cummulativeData)}
								</div>
							</TableBody>
						</Table>
					</div>
					<div className="portfolio-wrapper__graph-wrap__wrapper-2 mock-flex-item">
						<Table>
							<TableHeader>
								<TableRow>
									{l('EXPENSETREND')}
								</TableRow>
							</TableHeader>
							<TableBody>
								<div className="cash-return-modal__schema-wrap__item__chart">
									{this.renderExpensesGraph(this.cummulativeData)}
								</div>
							</TableBody>
						</Table>

						<Table>
							<TableHeader>
								<TableRow>
									{l('EXPENSEBREAKDOWN')}
								</TableRow>
							</TableHeader>
							<TableBody>
								<div className="cash-return-modal__schema-wrap__item__chart">
									{this.renderExpenseBreakdownGraph(this.cummulativeData)}
								</div>
							</TableBody>
						</Table>
					</div>
				</div>
            </div> : null
        );
	}

	onSelectProperties(selectedProperties) {
		this.setState({
			selectedProperties
		});
	}

	static getCummulativeData(data) {
		const allYearsData = _flatMap(data,i => i.analyzeReturns);
		const groupedData = _groupBy(allYearsData, i => i.year);
		return Object.values(groupedData).map(yearData => {
			return yearData.reduce((prevValue,currentValue) => {
				let obj = {};
				if(!prevValue) {
					return currentValue;
				}
				Object.keys(currentValue).forEach(key => {
					if(key !== 'year') {
						obj[key] = (prevValue[key] || 0) + currentValue[key];
					} else {
						obj[key] = currentValue[key];
					}
				});
				return obj;
			},{});
		});
	}

	static getCummulativeDataMonthly(data) {
		const allYearsData = _flatMap(data,i => i.analyzeReturns);
		const yearGroupedData = _groupBy(allYearsData, i => i.year);
		const yearWiseData = Object.values(yearGroupedData);
		let cumData = [];
		yearWiseData.forEach(yearData => {
			let monthlyGroupedData = _groupBy(yearData, i => i.month);
			Object.values(monthlyGroupedData).forEach(monthData => {
				cumData.push(monthData.reduce((prevValue,currentValue) => {
					let obj = {};
					if(!prevValue) {
						return currentValue;
					}
					Object.keys(currentValue).forEach(key => {
						if(key !== 'year' && key !== 'month') {
							obj[key] = (prevValue[key] || 0) + currentValue[key];
						} else {
							obj[key] = currentValue[key];
						}
					});
					return obj;
				},{}));
			});
		});
		return cumData;
	}
	
	getGraphLabels(data) {
		const { viewType } = this.props;
		if(viewType === MONTHLY_VIEW) {
			return data.map((yearData,i) => {
				// const year = ( i === 0 || yearData.month === 1 ) ? ` '${yearData.year % 100}` : '';
				// return `${MONTHS_MAP[yearData.month].short}${year}`;
				const month = parseInt(yearData.month/10) === 0 ? `0${yearData.month}` : yearData.month;
				return `${month}/${getYearInShort(yearData.year)}`;
			});
		}
		return data.map(yearData => yearData.year);
	}

	static getGraphDataset(data,keyProp) {
        return data.map(yearData => yearData[keyProp]);
	}
	
	static getUpdatedSelectedProperties(data=[],selectedProperties=[]) {
		if(!selectedProperties.length) {
			return data;
		}
		if(!data.length) {
			return [];
		}
		const updatedSelectProperties = data.filter(sp => _findIndex(selectedProperties,{id : sp.id}) >= 0);
		return updatedSelectProperties.length ? updatedSelectProperties : data;
	}
}

export default PortfolioGraphs;
