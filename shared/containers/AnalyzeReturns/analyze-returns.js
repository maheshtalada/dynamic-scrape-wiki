import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Schema, Table, TableBody, TableHeader, TableRow } from 'components/schema';
import Loader from 'components/common/page-loader/loader';
import { connect } from 'react-redux';
import { ANALYZE_RETURN_SCHEMA_CONSTANTS } from 'components/analyze-returns/analyze-return-graph-data';
import RadioList from 'components/common/radio-list/radio-list';
import { debounce, extend as _extend } from 'lodash';
import MakeOffer from 'components/make-an-offer';
import ZillowDisclaimer from 'components/zillow-disclaimer/zillow-disclaimer';
/*import HeaderSearch from 'components/header-search/header-search';*/
import MobileFooterOptions from 'components/common/mobile-footer-options/mobile-footer-options';
import { isMakeOfferRequired } from 'utils/propertyUtil';
import SaveAnalyzeReturns from 'components/analyze-returns/save-returns';
import { getValueByLocale } from 'utils/localeUtil';
import { getAbsoluteUrl } from 'utils/urlUtil';
import Snackbar from 'components/common/snackbar/snackbar';
import { Link } from 'react-router';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { propertydetails as shareOptions, shareViaEmailOptions } from 'assets/static/social-share-options.json';
import { sprintf } from 'utils';
import SiteConfig from '../../config';
import { getBase64ImageFromUrl } from 'utils/pdfUtil';
import { REQUEST_OPEN_SITE_FEEDBACK, REQUEST_DATA_FROM_STORE } from '../../redux/actions/application';
import { REQUEST_SAVE_ANALYZE_RETURNS } from '../../redux/actions/properties';
import PropertyContext from 'components/analyze-returns/property-context';
import { CumulativeGains, IncomeGrowth, IrrGraph, RoiGraph, handleIrrDataChange, handleRoiGraphData, handleTotalGainsChange } from 'components/analyze-returns/analyze-returns-graphs';
import PageActions from 'components/page-actions/page-actions.js';
import { simulateClick } from 'utils/domUtils';
import { sortBy as _sortBy } from 'lodash';

async function getComponent(options) {
	try {
		const html2canvas = await import(/* webpackChunkName: "html2canvas" */ 'html2canvas');
		return await html2canvas.default(options);
	} catch (err) {
		console.error('html2canvas loading failed', err);
	}

};

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

class AnalyzeReturns extends Component {

	static propTypes = {
		listingId: PropTypes.string
	};

	static contextTypes = {
		i18n : PropTypes.object,
		country : PropTypes.string,
		screenSize : PropTypes.number
	};

	static defaultProps = {
		listingId: ''
	};

	static isRedirectedFromSearch(prevLocation) {
		return prevLocation.indexOf('/residential-investment-properties') > -1;
	}

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
			propertyListing: props.propertyListing,
			roiGraphToShow: TOTAL_GAIN_CHART,
			purchaseType: PURCHASE_TYPE_CASH
		};
		this.onClickReportIssue = this.onClickReportIssue.bind(this);
		this.onClickReset = this.onClickReset.bind(this);
		this.onSchemaChange = debounce(this.onSchemaChange,300).bind(this);
		this.onSaveReturns = this.onSaveReturns.bind(this);
		this.showSnackbar = this.showSnackbar.bind(this);
		this.hideSnackbar = this.hideSnackbar.bind(this);

		// refs
		this.operationalSchema = React.createRef();
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				isFetching: props.isFetching,
				schema: props.schemaAnalyzeReturn,
				propertyListing: props.propertyListing,
				modifiedValues : {},
				initialValues : {},
				savedAnalyzeReturnURL : props.saveAnalyzeReturns && props.saveAnalyzeReturns.analyzeReturnURL
			});
			if(props.isFetchedFromStore) {
				this.showSnackbar('RESETSUCCESS');
			}
		}
	}

	componentDidMount() {
		this.fetchLogoBase64();
	}

	async fetchLogoBase64() {
		this.base64Img = await getBase64ImageFromUrl(`${assetsPath}/images/logo/logo_us_blue.png`);
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
		//TODO: preserve from rendering graph before data calculated
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

		this.operationalSchema && this.operationalSchema.current.rebuild();
	}

	renderTabularSchema() {
		const { i18n : {l}, country } = this.context;
		const { schema } = this.state;
		return (
			<div className="tabular-schema">
				<Schema ref={this.cashReturnSchema}
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

	onSaveReturns() {
		const { propertyListing } = this.state;
		this.props.dispatch(REQUEST_SAVE_ANALYZE_RETURNS({
			dataPayload : _extend({},this.state.changeObject.initialValues,this.state.changeObject.modifiedValues),
			paramsPayload : {
				listingid : propertyListing.id
			}
		}));
	}

	renderSaveOption() {
		const { user, location, dispatch, saveAnalyzeReturns } = this.props;
		const { screenSize } = this.context;
		const { propertyListing } = this.state;
		return (
			propertyListing.status === 'ACTIVE' &&
			<SaveAnalyzeReturns user={user}
								saveResponse={saveAnalyzeReturns}
								location={location}
								dispatch={dispatch}
								onSaveReturns={this.onSaveReturns}
								screenSize={screenSize}/>
		)
	}

	showSnackbar(msg) {
		this.setState({
			isShowSnackbar : true,
			snackbarMsg : msg
		})
	}

	hideSnackbar() {
		this.setState({
			isShowSnackbar : false,
			forceHideSnackbar : true
		})
	}

	renderMakeOfferOption() {
		const { propertyListing } = this.state;
		const { location, user, dispatch } = this.props;
		const { screenSize } = this.context;
		return (
			isMakeOfferRequired(propertyListing) && <MakeOffer
				user={user}
				location={location}
				dispatch={dispatch}
				listingId={propertyListing.id}
				screenSize={screenSize}/>
		)
	}

	onClickReset() {
		this.setState({
			forceHideSnackbar : false
		},()=>{
			this.props.dispatch(REQUEST_DATA_FROM_STORE({
				store : 'properties',
				lookupObject : 'analyze_returns_data'
			}));
		})
	}

	renderPDPLink() {
		const { l } = this.context.i18n;
		const { propertyListing } = this.state;
		return (
			<Link className="btn btn-sm btn-default returns__pdp-link" to={getAbsoluteUrl(propertyListing.listingURL)}>
				<i className="pe-7s-residential"/>
				<span>{l('PROPERTYCOMPLETIONGROUP')}</span>
			</Link>
		)
	}

	renderResetOption() {
		const { l } = this.context.i18n;
		return (
			<button className="btn btn-sm btn-default returns__reset-btn" onClick={this.onClickReset}>
				<i className="pe-7s-back"/>
				<span>{l('RESET')}</span>
			</button>
		)
	}

	getAnalyzeReturnsLink() {
		const { savedAnalyzeReturnURL } = this.state;
		const shareUrl = !frameworkGlobals.isServer ? `${window.location.origin}${savedAnalyzeReturnURL || window.location.pathname}` : '';
		return shareUrl;
	}

	renderShareOption() {
		const { location, user, screenSize, dispatch } = this.props;
		const { propertyListing } = this.state;
		const address = propertyListing.property.formattedAddress;
		const shareUrl = this.getAnalyzeReturnsLink();
		return (
			<SocialShare
				context="Analyze Returns"
				showOptionsInOverlay={screenSize <= 2}
				emailOptions={{
					shareType : "ANALYZE_RETURN_LINK",
					title : sprintf(shareViaEmailOptions.returns.title,address),
					description : shareViaEmailOptions.returns.description,
					link : shareUrl
				}}
				shareWrapperPosition="left"
				location={location}
				user={user}
				shareUrl={shareUrl}
				title = {propertyListing.property.formattedAddress}
				options = {shareOptions}
				screenSize = {screenSize}
				dispatch = {dispatch}
			/>
		);
	}

	onClickPrint = async () => {
		const { propertyListing } = this.state;
		this.setState({
			isPdfProcessing: true
		});
		const { l } = this.context.i18n;
		const jsPDF = require('jspdf');
		this.margins = {
			left : 10
		};

		const detailsContent = document.querySelector('.cash-return-modal__property-details');
		const mainContent = document.querySelector('.cash-return-modal__schema-wrap');
		const detailsCanvas = await getComponent(detailsContent , {
			scale : 1
		});
		const mainCanvas = await getComponent(mainContent,{
			scale : 1
		});

		const detailsCanvasAspectRatio = Number(detailsCanvas.style.height.replace('px',''))/Number(detailsCanvas.style.width.replace('px',''));
		const mainCanvasAspectRatio = Number(mainCanvas.style.height.replace('px',''))/Number(mainCanvas.style.width.replace('px',''));

		const detailsCanvasDataUrl = detailsCanvas.toDataURL();
		const mainCanvasDataUrl = mainCanvas.toDataURL();
		var pdf = new jsPDF('l', 'pt', 'a4');

		const canvasWidth = pdf.internal.pageSize.width - 20;

		this.pdfHeader(pdf);
		pdf.addImage(detailsCanvasDataUrl, 'JPEG', this.margins.left, 80, canvasWidth, detailsCanvasAspectRatio*canvasWidth);
		pdf.link(this.margins.left,80,canvasWidth/2,detailsCanvasAspectRatio*canvasWidth,{ url : getAbsoluteUrl(propertyListing.listingURL) });
		pdf.addImage(mainCanvasDataUrl, 'JPEG', this.margins.left, 110, canvasWidth, mainCanvasAspectRatio*canvasWidth);
		pdf.setFontSize(7);
		pdf.setFontStyle('italic');
		pdf.setTextColor('#9E9E9E');
		const splittedNote = pdf.splitTextToSize(l('SYSTEMGENERATEDVALUENOTE'),pdf.internal.pageSize.width-(2*this.margins.left));
		const taxValueNote = this.getTaxValueNote();
		pdf.text(splittedNote,this.margins.left,mainCanvasAspectRatio*canvasWidth+110+20);
		if(taxValueNote) {
			const splittedTaxValueNote = pdf.splitTextToSize(taxValueNote,pdf.internal.pageSize.width-(2*this.margins.left));
			pdf.text(splittedTaxValueNote,this.margins.left,mainCanvasAspectRatio*canvasWidth+110+40);
		}
		pdf.save(`${propertyListing.property.formattedAddress}.pdf`);
		this.setState({
			isPdfProcessing: false
		},()=>{
			simulateClick('.page-actions .select-wrapper .select-wrapper__select-btn');
		});
	}

	pdfHeader(pdf) {
		const { country } = this.context;
		const { siteDomain } = localeSettings[country];

		//pdf.setFillColor('#30415d');
		//pdf.rect(0, 0, pdf.internal.pageSize.width, 50, 'F');
		pdf.addImage(this.base64Img,'PNG',15,10,123,35);
	}

	getTaxValueNote() {
		const { l } = this.context.i18n;
		const systemGeneratedValue = document.querySelector('.system-generated-value');
		const userGivenValue = document.querySelector('.user-given-value');
		const {  zillowListingUrl  } = this.props;

		if((!systemGeneratedValue && !userGivenValue) || zillowListingUrl) {
			return;
		}
		return (
			systemGeneratedValue ? `*${l('TAXSYSTEMVALUENOTE')}`: `*${l('TAXUSERGIVENVALUENOTE')}`
		);
	}

	renderActions() {
		const { user, location, dispatch, saveAnalyzeReturns, zillowListingUrl } = this.props;
		const { i18n : {l}, country, screenSize } = this.context;
		const { propertyListing  } = this.state;

		const ACTION_OPTIONS = [
			{
				"name" : "MAKEANOFFER",
				"value" : "submitloi",
				"isLoginRequired" : true,
				"type" : "extraPayLoad",
				"icon" : "pe-7s-money-bag",
				"extraPayLoad" : {
					"listingId" : propertyListing.id
				},
				order : 1
			},
			{
				"name" : "RESET",
				"value" : "reset",
				"component" : this.renderResetOption(),
				order : 3
			},
			{
				"name" : "SHARE",
				"value" : "share",
				"component" : this.renderShareOption(),
				order : 4
			},
			{
				order : 5,
				"name" : "EXPORTTOPDF",
				"value" : "exportpdf",
				"component" : <button className="btn btn-sm btn-default returns__reset-btn" data-tag-category='PDF Export Actions' data-tag-action='Click' data-tag-label='Analyze Returns' onClick={this.onClickPrint}>
					<i className="option__icon pe-7s-download"/>
					<span>{l('EXPORTTOPDF')}</span>
				</button>
			}
		];

		if(!zillowListingUrl) {
			ACTION_OPTIONS.push({
				"name" : "SAVERETURNS",
				"value" : "savereturns",
				"component" : this.renderSaveOption(),
				order : 2
			})
		}

		const actionProps = { actions : ACTION_OPTIONS,  user,  dispatch};

		return (
			<PageActions {...actionProps}>
				{this.renderBackToPage(propertyListing.listingURL, l)}
			</PageActions>
		)

	}

	renderBackToPage(listingURL, l) {

		const referrerLink = document.referrer || ' ';
		const isEnableBackToResults = AnalyzeReturns.isRedirectedFromSearch(referrerLink);
		const backToPageLabel =  isEnableBackToResults ? 'BACKTORESULTS' : 'PROPERTYCOMPLETIONGROUP';
		const backToLink = isEnableBackToResults ? referrerLink : listingURL;

		return (
			<Link to={backToLink} target="_blank" className="cash-return-modal__property-details__details-link pdp">{l(backToPageLabel)}</Link>
		)
	}

	mobileFooterOptions() {
		const { zillowListingUrl } = this.props;
		const { i18n : {l} } = this.context;
		const { propertyListing  } = this.state;

		const footerOptions = [
			{
				"name" : "MAKEANOFFER",
				"value" : "submitloi",
				"isLoginRequired" : true,
				"type" : "extraPayLoad",
				"icon" : "pe-7s-money-bag",
				"extraPayLoad" : {
					"listingId" : propertyListing.id
				},
				order : 2
			},
			{
				"name" : "RESET",
				"value" : "reset",
				"component" : this.renderResetOption(),
				order : 5
			},
			{
				"name" : "SHARE",
				"value" : "share",
				"component" : this.renderShareOption(),
				order : 3
			},
		];

		if(!zillowListingUrl) {
			footerOptions.push({
				"name" : "SAVERETURNS",
				"value" : "savereturns",
				"component" : this.renderSaveOption(),
				order : 1
			})
		}

		return _sortBy(footerOptions,option => option.order);
	}

	renderAnalyzeReturnSchema() {
		const { zillowListingUrl } = this.props;
		const { schema, isFetching, purchaseType, modifiedValues, roiGraphToShow, propertyListing, isShowSnackbar,snackbarMsg, forceHideSnackbar, isPdfProcessing } = this.state;
		const { i18n : {l}, country, screenSize } = this.context;
		const roiGraphTitle  = modifiedValues['analyzereturn.downPaymentPercentage'] < 100 ? ROI_CASHFLOW_GRAPH : ROI_CAPRATE_GRAPH;
		const Chart = charts[roiGraphToShow];
		return (
			(isFetching || !schema || !propertyListing) ? <Loader/> :
				<div className="cash-return-modal">
					{ screenSize > 1 && this.renderActions()}
					{isPdfProcessing && <Loader/>}
					<Snackbar active={forceHideSnackbar ? false : isShowSnackbar} timeout={2000} onTimeout={this.hideSnackbar}>
						{l(snackbarMsg)}
					</Snackbar>
					<div className="flex flex-justify-between flex-align-center cash-return-modal__property-details">
						{propertyListing && <PropertyContext l={l} country={country} propertyListing={propertyListing} zillowListingUrl={zillowListingUrl} />}
						<div className="empty">&nbsp;</div>
						{/*<Link to={propertyListing.listingURL} target="_blank" className="cash-return-modal__property-details__details-link pdp">{l('PROPERTYCOMPLETIONGROUP')}</Link>*/}
					</div>
					<div className="cash-return-modal__schema-wrap">
						<div className="cash-return-modal__schema-wrap__item purchase-schema">
							<span className="cash-return-modal__schema-wrap__item__title">{l(schema.schemas[0].groupName)}</span>
							<Schema ref="purchaseSchema"
									className="schema"
									l={l}
									country={country}
									data={schema.schemas[0]}
									referenceData={schema.referenceData}
									writeMode={true}
									onChange={this.onSchemaChange}
									modifiedValues={this.state.modifiedValues}
									initialValues={this.state.initialValues}/>
						</div>
						<div className="cash-return-modal__schema-wrap__item operational-schema">
							<span className="cash-return-modal__schema-wrap__item__title">{l(schema.schemas[1].groupName)}</span>
							<Schema ref={this.operationalSchema}
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
					<div className="cash-return-modal__notes property-tax-note">
						{this.getTaxValueNote()}
					</div>
					{zillowListingUrl && <ZillowDisclaimer />}
					{screenSize <= 2 &&
						<MobileFooterOptions {...this.props} options={this.mobileFooterOptions()} />
					}
				</div>
		)
	}

	render() {
		return !frameworkGlobals.isServer && this.renderAnalyzeReturnSchema();
	}
}

export default connect(({properties, application})=> {
	return {
		saveAnalyzeReturns: properties.save_analyze_returns,
		...application.response_data_from_store
	};
})(AnalyzeReturns);
