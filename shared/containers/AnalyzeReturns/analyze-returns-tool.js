import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Schema, Table, TableBody, TableHeader, TableRow } from 'components/schema';
import Loader from 'components/common/page-loader/loader';
import { connect } from 'react-redux';
import { ANALYZE_RETURN_SCHEMA_CONSTANTS } from 'components/analyze-returns/analyze-return-graph-data';
import { REQUEST_ANALYZE_RETURNS_ZESTIMATE } from '../../redux/actions/properties';
import { REQUEST_OPEN_SITE_FEEDBACK, REQUEST_FILE_SHARE_VIA_EMAIL, REQUEST_RESET_STORE_STATE } from '../../redux/actions/application';
import RadioList from 'components/common/radio-list/radio-list';
import { debounce, extend as _extend } from 'lodash';
import { getAbsoluteUrl } from 'utils/urlUtil';
import MainHeroPrimeInfo from 'components/property-details/main-hero-prime-info';
import Snackbar from 'components/common/snackbar/snackbar';
import SiteConfig from '../../config';
import { getBase64ImageFromUrl } from 'utils/pdfUtil';
import AnalyzeReturnAddressBar from 'components/analyze-returns/analyze-return-address-bar';
import ZillowDisclaimer from 'components/zillow-disclaimer/zillow-disclaimer';
import ErrorMessage from 'components/common/error-box/error-message';
import APPCONSTANTS from 'utils/app-constants';
import ShareViaEmail from 'components/share-via-email';
import delay from 'lib/delay';

import { CumulativeGains, IncomeGrowth, IrrGraph, RoiGraph, handleIrrDataChange, handleRoiGraphData, handleTotalGainsChange } from 'components/analyze-returns/analyze-returns-graphs';

async function getComponent(options) {
	try {
		const html2canvas = await import(/* webpackChunkName: "html2canvas" */ 'html2canvas');
		return await html2canvas.default(options);
	} catch (err) {
		console.error('html2canvas loading failed', err);
	}

};

const { ZILLOW_SITE_URL, ZESTIMATE_URL, ZILLOW_TERMS_URL } = APPCONSTANTS;
const { assetsPath, localeSettings } = SiteConfig;
const { CHERRYPICK_IDS,
	PURCHASE_TYPE_CASH,
	ROI_CAPRATE_GRAPH,
	ROI_CASHFLOW_GRAPH,
	ROI_IRR_GRAPH,
	TOTAL_GAIN_CHART,
	RENT_CASH_FLOW_CHART
} = ANALYZE_RETURN_SCHEMA_CONSTANTS;

const charts = {
	'CAPRATEGROWTH' : RoiGraph,
	'CASHONCASHGROWTH' : RoiGraph,
	'IRR' : IrrGraph,
	'TOTALGAINCHART' : CumulativeGains,
	'RENTCASHFLOWCHART' : IncomeGrowth
};

class AnalyzeReturnsTool extends Component {

	static contextTypes = {
		i18n : PropTypes.object,
		country : PropTypes.string,
		screenSize : PropTypes.number
	};

	constructor(props,context) {
		super(props);
		this.state = {
			modifiedValues: {},
			initialValues: {},
			hasErrors: false,
			cumulativeCashFlow: [],
			cumulativeAppreciation: [],
			principalPaid: [],
			rentIncrement: [],
			cashFlowGrowth: [],
            isFetching: props.isFetching,
            schema: props.schemaAnalyzeReturn,
			roiGraphToShow: TOTAL_GAIN_CHART,
			purchaseType: PURCHASE_TYPE_CASH
		};
		this.onClickReportIssue = this.onClickReportIssue.bind(this);
        this.onSchemaChange = debounce(this.onSchemaChange,300).bind(this);
        this.onAddressSelect = this.onAddressSelect.bind(this);
		this.sharePdfEmail = this.sharePdfEmail.bind(this);
		props.dispatch(REQUEST_RESET_STORE_STATE({
            type : 'RESPONSE_ANALYZE_RETURNS_ZESTIMATE'
        }));

		this.operationalSchema = React.createRef();
	}

	componentWillReceiveProps(props) {
        let emailSendNotifMsg = this.state.emailSendNotifMsg,
			isShowEmailSentNotification = this.state.isShowEmailSentNotification;
		if(props) {
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
				isFetching: props.isFetching,
                schema: props.schemaAnalyzeReturn,
				modifiedValues : {},
				initialValues : {},
                isShowEmailSentNotification,
			    emailSendNotifMsg
			});
		}
	}

	componentDidMount() {
		this.fetchLogoBase64();
	}

	async fetchLogoBase64() {
        this.base64Img = await getBase64ImageFromUrl(`${assetsPath}/images/logo/logo_us_blue.png`);
        this.zillowLogoBase64Img = await getBase64ImageFromUrl(`${assetsPath}/images/zillow/zillowlogo.gif`);
    }

    onAddressSelect(address) {
        this.props.dispatch(REQUEST_ANALYZE_RETURNS_ZESTIMATE({
            dataPayload : {
                lineone : address.lineOne,
                zipcode : address.zipCode,
                latlong : address.latLong
            }
        }))
    }

	onClickReportIssue() {
        const { propertyListing } = this.state;
		this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : true,
			subject : "REPORTINACCURACYESTIMATIONS",
			title : "REPORTINACCURACYESTIMATIONS",
			listingId : propertyListing.id
		}))
	}

	onSchemaChange(changeObject, hasErrors) {
		const totalGains = handleTotalGainsChange(changeObject);
		const roiGraphData = handleRoiGraphData(changeObject);
		const irrDataObj = handleIrrDataChange(changeObject);
		const purchaseType = changeObject.modifiedValues[CHERRYPICK_IDS['purchaseType']] || changeObject.initialValues[CHERRYPICK_IDS['purchaseType']];
		this.setState({
			changeObject,
			hasErrors,
			...totalGains,
			...roiGraphData,
			...irrDataObj,
			purchaseType,
			//roiGraphToShow : this.state.graphShowChanged ? this.state.roiGraphToShow : purchaseType === PURCHASE_TYPE_CASH ? ROI_CAPRATE_GRAPH : ROI_IRR_GRAPH
		});

		if (this.refs) {
			this.refs["operationalSchema"] && this.refs["operationalSchema"].rebuild();
		}
		///this.operationalSchema && this.operationalSchema.current.rebuild();
	}
    
    renderTabularSchema() {
        const { i18n : {l}, country } = this.context;
		const { schema } = this.state;
        return (
            <div className="tabular-schema">
                <Schema ref="cashReturnSchema"
                        key={this.props.schemaKey}
                        l={l}
                        country={country}
                        data={schema.schemas[0]}
                        referenceData={schema.referenceData}
                        writeMode={true}
						onChange={this.onSchemaChange}
                        modifiedValues={this.state.modifiedValues}
                        initialValues={this.state.initialValues}/>
            </div>
        )
    }

    async sharePdfEmail(emailOptions){
		await delay(10);
		const pdf = await this.prepareJSPdf(true);
		const blob = pdf.output('blob');
		const formData = new FormData();
		formData.append('file', blob, this.getPdfFileName());
		formData.append('userids', emailOptions.userIds.join(','));
		formData.append('message', emailOptions.message);
		formData.append('sharetype', 'ANALYZE_RETURN');

		this.fileShareNotified = false;
		this.props.dispatch(REQUEST_FILE_SHARE_VIA_EMAIL({
			dataPayload : formData
		}));

	}
    
    // getting the share email modal close function as param from inside of the modal
	getEmailModalClose = (modalClose) => {
		this.emailModalClose = modalClose;
	}

	renderShareEmail() {
		const { i18n : {l}} = this.context;
		const { location, user, dispatch } = this.props;
		return (
			<ShareViaEmail shareDisclaimer={l('PDFSHAREDISCLAIMER')} btnClass="btn btn-default btn-sm" location={location} user={user} dispatch={dispatch} getModalCloseProp={this.getEmailModalClose} onActionSend={this.sharePdfEmail}>
				<i className="pe-7s-email"/>
				{l('SHARE')}
			</ShareViaEmail>
		);
    }
    
    async prepareJSPdf(reduceImageQuality) {
        const { analyze_returns_zestimate : { zillowListingUrl, propertyAddress } } = this.props;
		const { l } = this.context.i18n;
		const jsPDF = require('jspdf');
		this.margins = {
			left : 10
		};
		
        const mainContent = document.querySelector('.cash-return-modal__schema-wrap');
		const mainCanvas = await getComponent(mainContent,{
			scale : 1
		});

		const mainCanvasAspectRatio = Number(mainCanvas.style.height.replace('px',''))/Number(mainCanvas.style.width.replace('px',''));

		const mainCanvasDataUrl = mainCanvas.toDataURL();
		var pdf = new jsPDF('l', 'pt', 'a4');

		const canvasWidth = pdf.internal.pageSize.width - 20;

        this.pdfHeader(pdf);
        if(zillowListingUrl) {
			const primeInfo = document.querySelector('.cash-return-modal__property-details__prime-info');
			//const locationIcon = document.querySelector('.search-widget-wrap__location-icon');
            const primeInfoCanvas = await getComponent(primeInfo , {
                scale : 1
			});
			/*const locationIconCanvas = await getComponent(locationIcon , {
                scale : 1
			});*/
			const primeInfoCanvasWidth = 250;
			const locationIconWidth = 15;

			const primeInfoCanvasDataUrl = primeInfoCanvas.toDataURL();
			//const locationIconCanvasDataUrl = locationIconCanvas.toDataURL();
			const primeInfoCanvasAspectRatio = Number(primeInfoCanvas.style.height.replace('px',''))/Number(primeInfoCanvas.style.width.replace('px',''));
			//const locationIconCanvasAspectRatio = Number(locationIconCanvas.style.height.replace('px',''))/Number(locationIconCanvas.style.width.replace('px',''));
			
			//pdf.addImage(locationIconCanvasDataUrl, 'JPEG', this.margins.left, 50, locationIconWidth, locationIconCanvasAspectRatio*locationIconWidth);
			pdf.setFontSize(12);
			pdf.textWithLink(propertyAddress,this.margins.left+locationIconWidth+5,62,{ url : zillowListingUrl});
            pdf.addImage(primeInfoCanvasDataUrl, 'JPEG', pdf.internal.pageSize.width-primeInfoCanvasWidth-5, 50, primeInfoCanvasWidth, primeInfoCanvasAspectRatio*primeInfoCanvasWidth);
		    pdf.link(pdf.internal.pageSize.width-primeInfoCanvasWidth-5,50,primeInfoCanvasWidth,primeInfoCanvasAspectRatio*primeInfoCanvasWidth,{ url : zillowListingUrl });
        }
		pdf.addImage(mainCanvasDataUrl, 'JPEG', this.margins.left, 80, canvasWidth, mainCanvasAspectRatio*canvasWidth,'', reduceImageQuality ? 'MEDIUM' : '');
		pdf.setFontSize(7);
		pdf.setFontStyle('italic');
		pdf.setTextColor('#9E9E9E');
		const splittedNote = pdf.splitTextToSize(l('SYSTEMGENERATEDVALUENOTE'),pdf.internal.pageSize.width-(2*this.margins.left));
		const taxValueNote = this.getTaxValueNote();
        pdf.text(splittedNote,this.margins.left,mainCanvasAspectRatio*canvasWidth+80+20);
        let nextY = mainCanvasAspectRatio*canvasWidth+80+40;
		if(taxValueNote) {
			const splittedTaxValueNote = pdf.splitTextToSize(taxValueNote,pdf.internal.pageSize.width-(2*this.margins.left));
            pdf.text(splittedTaxValueNote,this.margins.left,nextY);
            nextY = nextY + 20;
        }
        if(zillowListingUrl) {
            pdf.addImage(this.zillowLogoBase64Img, 'PNG',pdf.internal.pageSize.width-130,nextY,120,30);
            pdf.link(pdf.internal.pageSize.width-130,nextY,120,30,{ url: ZILLOW_SITE_URL });
            pdf.textWithLink('© Zillow, Inc., 2006-2016. Use is subject to Terms of Use',this.margins.left,nextY,{ url : ZILLOW_TERMS_URL});
            pdf.setDrawColor('#9E9E9E');
            pdf.setLineWidth(0.5);
            pdf.line(146,nextY+2,186,nextY+2);
            nextY = nextY+10;
            pdf.textWithLink("What's a Zestimate?",this.margins.left,nextY,{ url : ZESTIMATE_URL});
            pdf.line(this.margins.left,nextY+2,this.margins.left+60,nextY+2);
        }

        return pdf;
    }

	onClickPrint = async () => {
		this.setState({
            isPdfProcessing: true
        });
        const pdf = await this.prepareJSPdf();
		pdf.save(this.getPdfFileName());
		this.setState({
            isPdfProcessing: false
        });
    }
    
    getPdfFileName() {
        const { analyze_returns_zestimate : { propertyAddress } } = this.props;
        return `${propertyAddress || 'analyze-returns'}.pdf`;
    }

	pdfHeader(pdf) {
		const { country, i18n : { l } } = this.context;
		const { siteDomain } = localeSettings[country];
		//pdf.setFillColor('#30415d');
		//pdf.rect(0, 0, pdf.internal.pageSize.width, 45, 'F');
		pdf.addImage(this.base64Img,'PNG',15,10,123,35);
	}

	getTaxValueNote() {
        const { l } = this.context.i18n;
        const { analyze_returns_zestimate : { zillowListingUrl } } = this.props;
		if(!zillowListingUrl) {
			return;
		}
		return (
			`*${l('TAXSYSTEMVALUENOTE')}`
		);
    }

    renderPropertyContext() {
        const { analyze_returns_zestimate : { zillowListingUrl, propertyAddress, propertyNotFound } } = this.props;
        if(propertyNotFound || !zillowListingUrl) {
            return null;
        }
        return (
            <div className="flex flex-align-center cash-return-modal__property-details">
                <div className="property-details__address">
                    <i className="pe-7s-preferred-location"/>
                    <div className="flex flex-align-end property-details__address-wrap">
                        <address>
                            <a target="_blank" rel="noopener noreferrer" href={zillowListingUrl} className="property-details__address__line-one">
                                {propertyAddress}
                            </a>
                        </address>
                        <a target="_blank" rel="noopener noreferrer" href={zillowListingUrl} className="cash-return-modal__property-details__details-link">Details on Zillow</a>
                    </div>
				</div>
				{this.renderPrimeInfo('',false)}
            </div>
        )
	}
	
	renderPrimeInfo(className='', showDetailsLink) {
		const { analyze_returns_zestimate : { zillowListingUrl, propertyArea, bedroom, bathroom, yearBuilt, propertyNotFound } } = this.props;
		const { country, i18n : { l }, screenSize } = this.context;
		if(propertyNotFound || !zillowListingUrl) {
            return null;
        }
		const details = {
            listingArea : propertyArea,
            listingAreaUOM : 'SQFT',
            selectedUnit : {
                numberOfBedRooms : bedroom,
                numberOfWashRooms : bathroom
            },
            property : {
                building : {
                    yearBuilt : yearBuilt
                }
            }
        };
		return (
			<Fragment>
				<div className='cash-return-modal__property-details cash-return-modal__property-details__prime-info flex flex-align-center'>
					{showDetailsLink && <a target="_blank" rel="noopener noreferrer" href={zillowListingUrl} className="cash-return-modal__property-details__details-link">Details on Zillow</a>}
					<MainHeroPrimeInfo tooltipPlace={"bottom"} country={country} l={l} details={details} showBasicInfo={true}/>
				</div>
				{ screenSize > 2 && <div className="search-bar-actions flex flex-align">
					{this.renderShareEmail()}
					<button className="btn btn-sm btn-default returns__reset-btn" data-tag-category='PDF Export Actions' data-tag-action='Click' data-tag-label='Analyze Returns' onClick={this.onClickPrint}>
						<i className="pe-7s-download"/>
						<span>{l('EXPORTTOPDF')}</span>
					</button>
				</div> }
			</Fragment>
		);
	}

    hideEmailNotification = () => {
		this.setState({
			isShowEmailSentNotification : false
		});
	}


	renderAnalyzeReturnSchema() {
		const { schema, isFetching, purchaseType, modifiedValues,roiGraphToShow, isPdfProcessing,  isShowEmailSentNotification, emailSendNotifMsg } = this.state;
		const { i18n : {l}, country, screenSize } = this.context;
        const { analyze_returns_zestimate : { zillowListingUrl, propertyNotFound } } = this.props;
		const roiGraphTitle  = modifiedValues['analyzereturn.downPaymentPercentage'] < 100 ? ROI_CASHFLOW_GRAPH : ROI_CAPRATE_GRAPH;
		const Chart = charts[roiGraphToShow];
		return (
			(isFetching || !schema ) ? <Loader/> :
				<div className="cash-return-modal">
					{isPdfProcessing && <Loader/>}
                    <AnalyzeReturnAddressBar onPlaceSelect={this.onAddressSelect} {...this.props}>
                        {screenSize > 2 && <div className="flex flex-row flex-align-end">
							{this.renderPrimeInfo('',true)}
						</div>}
                    </AnalyzeReturnAddressBar>
                    {!frameworkGlobals.isServer && ReactDOM.createPortal(
                        <Snackbar active={isShowEmailSentNotification} timeout={1000} onTimeout={this.hideEmailNotification}>
                            {l(emailSendNotifMsg)}
                        </Snackbar>,
					    document.querySelector('body'),
					)}
					{screenSize <= 2 && this.renderPrimeInfo('',true)}
					{propertyNotFound && <ErrorMessage errorCode={'ZILLOWPROPERTYNOTFOUND'} />}
					<div className="cash-return-modal__schema-wrap">
						{/*{screenSize !== 1 && this.renderTabularSchema()}*/}

						<div className="cash-return-modal__schema-wrap__item purchase-schema">
							<span className="cash-return-modal__schema-wrap__item__title">{l(schema.schemas[0].groupName)}</span>
							<Schema ref="purchaseSchema"
									key={this.props.schemaKey}
									className="schema"
									l={l}
									country={country}
									data={schema.schemas[0]}
									referenceData={schema.referenceData}
									writeMode={true}
									onChange={this.onSchemaChange}
									modifiedValues={this.state.modifiedValues}
									initialValues={this.state.initialValues}/>
							{/*{screenSize === 1 && this.renderTabularSchema()}*/}

						</div>
						<div className="cash-return-modal__schema-wrap__item operational-schema">
							<span className="cash-return-modal__schema-wrap__item__title">{l(schema.schemas[1].groupName)}</span>
							<Schema ref={this.operationalSchema}
									key={this.props.schemaKey}
									className="schema"
									l={l}
									country={country}
									data={schema.schemas[1]}
									referenceData={schema.referenceData}
									writeMode={true}
									onChange={this.onSchemaChange}
									modifiedValues={this.state.modifiedValues}
									initialValues={this.state.initialValues}/>
						</div>
						<div className="cash-return-modal__schema-wrap__item projections-schema flex flex-column">
							<span className="cash-return-modal__schema-wrap__item__title">{l(schema.schemas[2].groupName)}</span>
							<Schema ref="projectionsSchema"
									key={this.props.schemaKey}
									l={l}
									className="schema value-drivers"
									country={country}
									data={schema.schemas[2]}
									referenceData={schema.referenceData}
									writeMode={true}
									onChange={this.onSchemaChange}
									modifiedValues={this.state.modifiedValues}
									initialValues={this.state.initialValues}/>
							<div className="cash-return-modal__schema-wrap__item__charts schema">
								<Table>
									<TableHeader>
										<TableRow>
											Charts
										</TableRow>
									</TableHeader>
									<TableBody>
										<RadioList key="projection-charts" isOptionALLRequired={false} selectedVal={roiGraphToShow} items={[
											{
												"key" : TOTAL_GAIN_CHART,
											},
											{
												"key" : RENT_CASH_FLOW_CHART,
											},
											{
												"key": roiGraphTitle
											},
											{
												"key": ROI_IRR_GRAPH
											}
										]} onChange={(evt)=>{
											this.setState({
												graphShowChanged : true,
												roiGraphToShow : evt.currentTarget.value
											})
										}}/>
										<div className="cash-return-modal__schema-wrap__item__chart">
											<Chart country={country} l={l} {...this.state} graphTitle={roiGraphToShow}/>
										</div>
									</TableBody>
								</Table>
							</div>
						</div>
					</div>
					<div className="cash-return-modal__notes">
						{l('SYSTEMGENERATEDVALUENOTE')}
                    </div>
                    {<div className="cash-return-modal__notes property-tax-note">
						{this.getTaxValueNote()}
                    </div>}
                    {zillowListingUrl && <ZillowDisclaimer />}

				</div>
		)
	}

	render() {
		return !frameworkGlobals.isServer && this.renderAnalyzeReturnSchema();
	}
}

export default connect(({ application})=> {
    const { response_file_share_email = {} } = application;
	return {
		response_file_share_email
	};
})(AnalyzeReturnsTool);
