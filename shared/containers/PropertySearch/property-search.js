import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import BaseSearch from 'lib/BaseSearch';
import Cx from 'classnames';
import { property_search_facets } from 'assets/static/search-filter-configuration';
import { find, findIndex, size } from 'lodash';
import { Panel, PanelBody } from 'components/common/panel';
import { buildQueryObject, genarateAppliedFacets, genarateClasses, getPostedOndate, generateFlatBucketAggregations, checkIfAnalyzeReturnsToShow, getDaysSince, formatDaysOnMarket, ifRentPotentialToShow, getMicroDataContext, getAdditionalMicrodata, checkIfTenantApplyRequired } from '../../utils/searchUtil';
import { getImagePath, checkIfValueAdd, getRentPotentialLabel, getSchemaAdditionalList, triggerListHubEvent } from '../../utils/propertyUtil';
import { localeCurrency, getValueByLocale, formatCurrency } from 'utils/localeUtil';
import Select from 'components/common/select/select';
import searchsortoptions from 'assets/static/search-sort-options.json';
import Loader from 'components/common/page-loader/loader';
import Advertisement from 'components/advertisement/advertisement';
import ExternalAdvertisement from 'components/advertisement/external-advertisement';
import { listing, adbackground, adlogo } from 'assets/static/ads-component-config.json';
import PageActions from 'components/page-actions/page-actions.js';
import Wishlist from 'components/add-to-wishlist/wishlist';
import ReactTooltip from 'react-tooltip';
import ScrollFixed from 'components/common/scroll-fixed/scroll-fixed';
import CaprateBox from 'components/common/caprate-display/caprate-box';
import ListingPrimeInfo from 'components/common/listing-tile-components/prime-info';
import ListingPriceInfo from 'components/common/listing-tile-components/price-info';
import ListingAddressInfo from 'components/common/listing-tile-components/address-info';
import ListingTags from 'components/common/listing-tile-components/listing-tags';
import ListingSubtype from 'components/common/listing-tile-components/listing-sub-type';
import ImageCover from 'components/common/image-cover/image-cover';
import MobileFooterOptions from 'components/common/mobile-footer-options/mobile-footer-options';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { propertysearch as shareOptions, shareViaEmailOptions } from 'assets/static/social-share-options.json';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { sprintf } from 'utils';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import AnalyzeReturns from 'components/analyze-returns/analyze-returns';
import { REQUEST_OPEN_SITE_FEEDBACK } from '../../redux/actions/application';
import { REQUEST_ADD_TO_WISHLIST } from '../../redux/actions/properties';
import AppContants from 'utils/app-constants';
import loadable from '@loadable/component';
import { modal } from 'react-redux-modal';
import SingleSelectBoxes from 'components/common/single-select-boxes';

const ListingMap = loadable(() => import(/* webpackChunkName: 'ListingMap' */'components/property-search/listing-map'));
const ListingGridTile = loadable(() => import(/* webpackChunkName: 'ListingGridTile' */'components/common/listing-tile-components/listing-grid-tile'));
const { DEFAULT_VIEW, GRID_VIEW, MAP_VIEW, LIST_VIEW } = AppContants;


const PAGE_CONST_CONFIG = {
	'PAGE_TEMPLATE' : '/residential-investment-properties/{type}/{state}/search/geo-location/{term}',
	'SEARCH_BY_NAME_CONFIG' : {
		'for-sale' : {
			'title' : 'SEARCHBYPROPERTY',
			'placeholder' : 'SEARCHBYPROPERTYNAME'
		},
		'for-rent' : {
			'title' : 'SEARCHBYPROPERTY',
			'placeholder' : 'SEARCHBYPROPERTYNAME'
		},
		'for-invest' : {
			'title' : 'SEARCHBYPROPERTY',
			'placeholder' : 'SEARCHBYPROPERTYNAME'
		}
	},
	'NULL_RESULTS_CONFIG' : {
		'for-sale' : {
			'title' : 'PROPERTYNULLRESULTSTITLE',
			'message' : 'PROPERTYNULLRESULTSMESSAGE'
		},
		'for-rent' : {
			'title' : 'PROPERTYNULLRESULTSTITLE',
			'message' : 'PROPERTYNULLRESULTSMESSAGE'
		},
		'for-invest' : {
			'title' : 'PROPERTYNULLRESULTSTITLE',
			'message' : 'PROPERTYNULLRESULTSMESSAGE'
		}
	}
};

const VIEW_OPTIONS = [
	{
		"label" : "LIST",
		'value' : LIST_VIEW
	},
	{
		"label" : "MAP",
		'value' : MAP_VIEW
	}
];

const RECOMMEND = 'recommend';
const INVESTMENT_CATEGORIES_TOOLTIPS = {
	'highcashoncash' : 'CASHFLOWPOSITIVE_SEARCH_TAB_TOOLTIP',
	'highcashflow' : 'CASHFLOWPOSITIVE_SEARCH_TAB_TOOLTIP',
	'rentalunit' : 'TURNKEY_SEARCH_TAB_TOOLTIP',
	'valueadded' : 'FIXERUPPER_SEARCH_TAB_TOOLTIP',
	'bestbuy' : 'BESTBUY_SEARCH_TAB_TOOLTIP',
	'motivatedseller' : 'MOTIVATEDSELLER_SEARCH_TAB_TOOLTIP',
	'furnishedrental' : 'FURNISHEDRENTAL_SEARCH_TAB_TOOLTIP',
	'vacationrental' : 'VACATIONRENTAL_SEARCH_TAB_TOOLTIP',
	'assistedliving' : 'ASSISTEDLIVING_SEARCH_TAB_TOOLTIP',
	'luxuryrental' : 'LUXURYRENTAL_SEARCH_TAB_TOOLTIP',
	'ownerfinanced' : 'OWNERFINANCED_SEARCH_TAB_TOOLTIP'
}

export default class PropertySearch extends BaseSearch {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath: PropTypes.string,
		country : PropTypes.string,
		screenSize : PropTypes.number
	};

	constructor(props, context) {
		super(props, context);
		this.IGNORE_APPLIED_FACETS = ["radius","investmentcategories","purchasetype"];
		this.toggleFilter = this.toggleFilter.bind(this);
		this.onViewChange=this.onViewChange.bind(this);
		this.onActionChange=this.onActionChange.bind(this);
		this.handleReSize = this.handleReSize.bind(this);
		this.onFacetChange = this.onFacetChange.bind(this);
		this.renderGridTile = this.renderGridTile.bind(this);
		this.onClickReportIssue = this.onClickReportIssue.bind(this);
		this.searchFilterConfigKey = props.params.term === RECOMMEND ? RECOMMEND : props.params.type;
		this.facetObjectData = property_search_facets[this.searchFilterConfigKey];
		this.state = this.getStateObject();
		this.state.view =  props.screenSize === 1 ? GRID_VIEW : (props.location.query && props.location.query.view) || DEFAULT_VIEW;
		this.state.purchaseType = props.location.query && props.location.query.purchasetype;
		this.contantsConfig = PAGE_CONST_CONFIG;
		this.bundleModal = this.bundleModal.bind(this);
		this.renderBundleBox = this.renderBundleBox.bind(this);

		this.listingData =[];
	}

	handleReSize(view) {

		if (this.state.view === MAP_VIEW || view === MAP_VIEW) {
			const width = ReactDOM.findDOMNode(this.refs['map-wrapper']);
			this.setState({
				mapWidth: width.clientWidth
			});
		}
	}

	componentWillReceiveProps(props) {
		// in this if condition, if the search type changes from content to professional/realtor,
		// the facetObject would be the previous one hence changed the condition
		// if(typeof this.facetObject !== 'object') {
		// 	this.facetObject = BaseSearch.getFacetObject(this.facetObjectData);
		// }
		const searchTypeChanged = props.params.type !== this.state.searchType;
		if(searchTypeChanged) {
			this.facetObject = BaseSearch.getFacetObject(this.facetObjectData);
		}
		// prevent updating stale stuff
		if(props && props.id && props.id !== this.state.id) {
			this.setState({
				id : props.id,
				aggregations : props.aggregations,
				resulttab : props.resulttab,
				bundles : [],
				listings: props.data || [],
				currentPage : props.currentPage || 1,
				total: props.total,
				pageCount : props.totalpage,
				mapBounds: props.mapBounds,
				facets: Object.assign({}, this.facetObject, props.location.query || {}),
				appliedfacets: genarateAppliedFacets(buildQueryObject(Object.assign({}, props.location.query)),this.facetObjectData, props.aggregations || [], this.IGNORE_APPLIED_FACETS),
				isFetching : props.isFetching,
				mapLoad : props.isFetching,
				searchType : props.params.type,
				toggleFilter : searchTypeChanged ? false : this.state.toggleFilter,
				leadRealtors : props.leadRealtors,
				view : (props.location.query && props.location.query.view) || this.state.view || DEFAULT_VIEW,
				purchaseType : props.location.query && props.location.query.purchasetype
			});
			this.resetBundleClasses();
		}

		this.searchFilterConfigKey = props.params.term === RECOMMEND ? RECOMMEND : props.params.type;
	}

	shouldComponentUpdate(nextProps, nextState) {

		if(!this.listingData.length || (this.state.showFilterOverlay !== nextState.showFilterOverlay)) {
			return true;
		}
		return false
	}

	componentDidUpdate() {
		ReactTooltip.rebuild()
	}

	toggleFilter() {
		this.setState({
			toggleFilter: !this.state.toggleFilter,
			mapLoad : !this.state.mapLoad
		});
	}

	onFacetChange(type, facet, value, isChecked, siblings,nestedFacet, nestedValues) {
		const facetObj = BaseSearch.facetChangeHandlers[type].call(this.state,{facet, value, isChecked, siblings,nestedFacet, nestedValues});
		this.redirectURL(facetObj);
	}

	onMapBoundsChange(neLat,neLon,swLat,swLon) {
		const {location} = this.props;
		const boundsParam = `${neLat},${neLon},${swLat},${swLon}`;
		this.redirectURL({...buildQueryObject(this.state.facets),q:location.query.q,bound:boundsParam});
	}

	onViewChange(view) {

		this.setState({
			view,
			//id: uniqueId(),
			toggleFilter : false
		}, ()=>this.redirectURL());
	}

	onClickReportIssue(e,listingId) {
		e.stopPropagation();
		this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : true,
			subject : "REPORTINACCURACYESTIMATIONS",
			title : "REPORTINACCURACYESTIMATIONS",
			listingId : listingId
		}))
	}

	renderWishlist(item) {
		return (
			<Wishlist propertyId={item.id}
					  screenSize={this.props.screenSize}
					  location={this.props.location}
					  user={this.props.user}/>
		)
	}

	renderGridTile(item,isBundle=false) {
		const { country, i18n, awsImagePath } = this.context;
		const { facets, purchaseType } = this.state;
		return (
			<PanelBody>
				<ListingGridTile
					listing={item}
					screenSize={this.props.screenSize}
					location={this.props.location}
					user={this.props.user}
					dispatch={this.props.dispatch}
					facets={facets}
					purchaseType={purchaseType}
					renderBundleBox={item.bundles && !isBundle && this.renderBundleBox}
					country={country} l={i18n.l}
					awsImagePath={awsImagePath}/>
			</PanelBody>
		)
	}

	bundleModal({ item }) {
		return (
			<div className="bundle-panel search-listings">
				<div className="bundle-panel__all-listings-wrap">
					{item.bundles && this.renderBundleBoxFooter(item.bundles, item.id, Number(item.price))}
					{ item.bundles &&
					<div className="bundle-panel__wrapper">
						{item.bundles && this.showBundles([item,...item.bundles])}
					</div>
					}
				</div>
			</div>
		)
	}

	onAddBundleModal(item) {
		const { i18n : {l}, country, screenSize } = this.context;
		const { purchaseType } = this.state;
		let bundleSum = item.bundles.reduce((accumulator, currentValue)=> {
			return (accumulator + Number(currentValue.price));
		} , Number(item.price));

		if(purchaseType === 'leveraged') {
			bundleSum = bundleSum / 5;
		}
		const currencyFormat = getValueByLocale(country,'currencyFormat');
		modal.add(this.bundleModal,{
			size: 'bundle-modal',
			title : <span className="bundle-panel__header__item investment"><span className="investment-label">{`${l('TOTALINVESTMENT')} : `}</span><span className="investment-value">{`$${formatCurrency(Math.round(bundleSum), 0, currencyFormat)}`}</span></span>,
			item: item,
			backgroundNoScroll : screenSize < 3
		})
	}

	showBundles(bundles) {
		return bundles.map(item => {
			return (
				this.props.screenSize === 1 ?
					<Panel key={item.id} className='col-lg-6 col-md-6 col-sm-6 col-xs-12' id={item.id}>
						{this.renderGridTile(item,true)}
					</Panel> :
					this.renderListTile(item, true)
			)
		});
	}

	renderListTile(item,isBundle = false) {
		const toggleClassGridWrap = 'col-lg-8 col-md-8 col-sm-8 col-xs-12';
		const toggleClassMediaGridWrap = 'col-lg-4 col-md-4 col-sm-4 col-xs-12';
		const { country, i18n : {l}, awsImagePath } = this.context;
		const { facets, bundles, purchaseType } = this.state;
		const isValueAdd = checkIfValueAdd(item.investmentcategories);
		const showRentPotential = ifRentPotentialToShow(item.rent,item.caprate,item.cashoncashreturn,purchaseType);
		const imagePath = getImagePath(awsImagePath,item.image);
		const additionalMicroData = getAdditionalMicrodata([["Bedroom" , item.bedroom || ''],["Bathroom" , item.washroom || ''],["Price" , item.showprice && localeCurrency(item.price.toFixed(2), '', '', country) || ''], ["Cap Rate Potential", item.caprate && `${item.caprate.toFixed(2)}%` || ''], ["Cash on Cash potential", item.cashoncashreturn && `${item.cashoncashreturn.toFixed(2)}%` || ''], ...getSchemaAdditionalList(item.investmentcategories, l, 'Investment Categories')]);
		const { user, location, dispatch, screenSize } = this.props;
		return (
			<Panel key={item.id} className='col-lg-12 col-md-12 col-sm-12 col-xs-12' id={item.id}>
				<div className="search-listings__listing">
					{!isBundle && <script type="application/ld+json" nonce={frameworkGlobals.nonce} dangerouslySetInnerHTML={{__html : JSON.stringify({
						"@context": "http://schema.org",
						"@type":  item.subtype && getMicroDataContext(item.subtype.toUpperCase()) || 'House',
						"name": item.formattedaddress,
						"image": imagePath,
						"floorSize" : item.area,
						"address": {
							"@type": "PostalAddress",
							"streetAddress": item.formattedaddress.split(',')[0],
							"addressLocality": item.city,
							"postalCode": item.zipcode
						},
						"geo": {
							"@type": "GeoCoordinates",
							"name": item.formattedaddress,
							"latitude": item.geometry.lat,
							"longitude": item.geometry.lon
						},
						"additionalProperty" : additionalMicroData
					})}} />}
					{this.renderWishlist(item)}
					<a href={`${getAbsoluteUrl(item.listingurl)}${purchaseType === 'leveraged' ? '?purchasetype=leveraged' : ''}`} target={isBundle ? '_blank' : ''}>
						<PanelBody className={'row'} key={`body${item.id}${String(isBundle)}`}>
							<div className={Cx('search-listings__media',toggleClassMediaGridWrap)}>
								<ImageCover imagePath={imagePath}/>
								{ item.subtype && <ListingSubtype value={l(item.subtype.toUpperCase())} />}
							</div>
							<div className={Cx('search-listings__data flex flex-column flex-justify-between property-search-data', toggleClassGridWrap)}>
								<div>
									<ListingAddressInfo listing={item} l={l} className="search-listings__data-row"/>
									<div className="search-listings__data-row flex flex-align-start flex-justify-between">
										<div>
											<ListingPriceInfo listing={item} country={country} l={l}/>
											<ListingPrimeInfo listing={item} country={country} l={l}/>
										</div>
										<div className="flex caprate-wrap">
											{showRentPotential && <CaprateBox value={localeCurrency(item.rent.toFixed(0),'₹','en-IN', country)} label={l(getRentPotentialLabel(item.investmentcategories))}/>}
											{purchaseType !== "leveraged" && item.caprate &&
											<CaprateBox value={`${item.caprate.toFixed(2)}%`} label={l('CAPRATE')}/>
											}
											{purchaseType === "leveraged" && item.cashoncashreturn &&
											<CaprateBox value={`${item.cashoncashreturn.toFixed(2)}%`} label={l('CASHONCASHRETURNPERCENTAGE')}/>
											}
										</div>
									</div>
									<ListingTags listing={item} l={l} className="search-listings__data-row flex-justify-start" selectedTags={facets['investmentcategories'] || facets["rentalcategory"]}/>
								</div>
								<div className="search-listings__data-row flex flex-align-end flex-justify-between">
									{item.creationtime && <div className="posted-on flex flex-align-center" data-for="listing-search-tile-tooltip" data-tip={l('DAYSONMARKET')}>
										<i className="pe-7s-date"/>{formatDaysOnMarket(getDaysSince(item.creationtime),l)}
									</div>}

									{item.bundles && !isBundle && this.renderBundleBox(item.bundles, item.id, item)}

									<div style={{background : '#fff', width : '100px'}}></div>

								</div>
							</div>
						</PanelBody>
					</a>
					<div className="action-btn-wrap flex flex-justify-end flex-align-center flex-wrap">
						{checkIfAnalyzeReturnsToShow(item) && <div className="analyze-returns-btn">
							<AnalyzeReturns listingUrl={item.listingurl}
											btnClassName="btn btn-primary"
											openLinkInNewTab={isBundle}
											purchaseType={purchaseType}
											screenSize={this.props.screenSize} context="Search" listingId={item.id} isValueAdd={isValueAdd} isRentPotentialRequired={item.rent === undefined}/>
						</div>}
					</div>

				</div>
			</Panel>
		)
	}

	renderListings(grids) {
		const { listings, view, isFetching, bundles = [] } = this.state;
		const viewFlg = String(view);
		const listHubData = [];

		!this.listingData.length && listings && listings.map((item,index) => {
				// switching from map view to list/grid view, we have 200 listings in the data while re-rendering,
				// thus restricting more listings to render
				// TODO: find another way if possible
				if(index > 20) {
					return null;
				}
				item.mlskey && listHubData.push({lkey : item.mlskey});
				this.listingData.push(
					viewFlg === LIST_VIEW ? this.renderListTile(item) :
						<Panel key={item.id} className={Cx(grids)} id={item.id}>
							{this.renderGridTile(item)}
						</Panel>
				)
			}
		);

		if(this.listingData.length === 0 && !isFetching) {
			return this.renderNoResultsFound();
		}
		// for listHub Data
		!frameworkGlobals.isServer && String(isFetching) !== 'false' && listHubData.length > 0 && triggerListHubEvent('SEARCH_DISPLAY',undefined,listHubData);
		return this.listingData;
	}

	renderMySearchesOption() {
		const { screenSize, location, dispatch, user } = this.props;
		return (
			<MySearches screenSize={screenSize}
						location={location}
						dispatch={dispatch}
						user={user}/>
		)
	}

	renderFilterOption() {
		const { l } = this.context.i18n;
		return (
			<button onClick={this.toggleFilterOverlay} className='filter-option-btn btn btn-sm btn-default'>
				<i className="pe-7s-filter"/>
				<span>{l('FILTERS')}</span>
			</button>
		)
	}

	renderSortOption() {
		const { searchType, facets } = this.state;
		const { screenSize } = this.props;
		const sortOptionSelected = BaseSearch.getSelectedSortOptionIndex(facets.sort,facets.sortorder,searchsortoptions[searchType]);
		return (
			<Select
				btnClassName="btn btn-sm btn-default search-results__sort-btn search-sort-btn"
				showOptionsInOverlay={screenSize <= 2}
				btnLabel={screenSize <= 2 && "SORT"}
				options={searchsortoptions[searchType]}
				iconClass="pe-7s-sort"
				name="property-sort"
				selected={sortOptionSelected || 0}
				inputClasses="no-border"
				onChange={this.onTypeChange.bind(this)}
			/>
		)
	}

	renderSaveSearchOption() {
		const { screenSize, location, dispatch, user } = this.props;
		const { searchType, purchaseType } = this.state;
		return (
			<SaveSearch screenSize={screenSize}
						location={location}
						purchaseType={purchaseType}
						searchType={searchType}
						dispatch={dispatch}
						user={user}/>
		)
	}

	renderShare() {
		const { location, user, screenSize, dispatch } = this.props;
		const shareUrl = !frameworkGlobals.isServer ? window.location.href : '';
		return (
			<SocialShare
				context="search"
				showOptionsInOverlay={screenSize <= 2}
				emailOptions={{
					shareType : "SEARCH_LINK",
					title : sprintf(shareViaEmailOptions.search.title),
					description : shareViaEmailOptions.search.description,
					link : shareUrl
				}}
				location={location}
				user={user}
				shareUrl={shareUrl}
				title = {sprintf(shareViaEmailOptions.search.title)}
				options = {shareOptions}
				screenSize = {screenSize}
				dispatch = {dispatch}
			/>
		)
	}

	renderResultsFound() {
		const { total  } = this.props,
		 { l } = this.context.i18n;
		return (
			<div className="search-results__control count">
				{total} Results Found
			</div>
		)
	}

	onActionChange(value) {

	}

	renderActions() {
		const { screenSize, location, dispatch, user } = this.props;
		const { searchType, purchaseType } = this.state;
		const shareUrl = !frameworkGlobals.isServer ? window.location.href : '';

		const ACTION_OPTIONS = [
			{
				"name" : "SAVESEARCH",
				"value" : "savesearch",
				"isLoginRequired" : true,
				"icon" : "pe-7s-diskette"
			},
			{
				"name" : "MYSEARCHES",
				"value" : "mysearch",
				"isLoginRequired" : true,
				"icon" : "pe-7s-search"
			},
			{
				"name" : "SHARE",
				"value" : "share",
				"component" : <SocialShare
					context="search"
					emailOptions={{
						shareType : "SEARCH_LINK",
						title : sprintf(shareViaEmailOptions.search.title),
						description : shareViaEmailOptions.search.description,
						link : shareUrl
					}}
					location={location}
					user={user}
					shareUrl={shareUrl}
					title = {sprintf(shareViaEmailOptions.search.title)}
					options = {shareOptions}
					screenSize = {screenSize}
					dispatch = {dispatch}
				/>
			}
		];

		const actionProps = { actions : ACTION_OPTIONS,  user,  dispatch};

		return (
			<PageActions {...actionProps} />
		)
	}

	renderSearchToolbar() {
		const { view } = this.state,
			{ i18n : {l}, country } = this.context;
		return (
			<div className="search-results__controls flex flex-align-center">
				<SingleSelectBoxes
					className="search-results__control col-lg-2 col-md-3"
					boxOptions={VIEW_OPTIONS}
					selectedBox = {view}
					isAnyRequired={false}
					l={l}
					analyticsData={{}}
					onChange={this.onViewChange}/>
				{this.renderSortOption()}
				{this.renderActions()}
			</div>
		)
	}

	getLayoutContainerRect() {
		if(this.refs.searchLayoutContainer && this.refs.searchLayoutContainer.getBoundingClientRect) {
			return this.refs.searchLayoutContainer.getBoundingClientRect();
		}
	}

	mobileFooterOptions() {
		const mobileFooterOptions = [
			{
				"name" : "Filter",
				"value" : "filter",
				"component" : this.renderFilterOption()
			},
			{
				"name" : "Sort",
				"value" : "sort",
				"component" : this.renderSortOption()
			},
			{
				"name" : "Share",
				"value" : "share",
				"component" : this.renderShare()
			},
			{
				"name" : "SAVESEARCH",
				"value" : "savesearch",
				"isLoginRequired" : true,
				"icon" : "pe-7s-diskette"
			},
			{
				"name" : "MYSEARCHES",
				"value" : "mysearch",
				"isLoginRequired" : true,
				"icon" : "pe-7s-search"
			}
		];

		return mobileFooterOptions;
	}

	render() {
		const { i18n :{l}, country, screenSize } = this.context,
			{ toggleFilter, aggregations, listings,isConstrutor, isFetching,view, mapLoad, mapBounds, searchType, resulttab, facets, total, leadRealtors, showFilterOverlay, appliedfacets} = this.state,
			viewFlg = String(view),
			filterToggleClass = `side-menu-info ${resulttab ? '' : 'no-tags-tab'}`,
			toggleClassGridWrap = viewFlg === MAP_VIEW ? 'col-lg-12 col-md-12' : 'col-lg-8 col-md-12',
			{ location, dispatch, user, chatUserStatus } = this.props,
			viewClasses = genarateClasses(toggleFilter,viewFlg),
			layoutClasses ='col-lg-12 col-md-12 col-sm-12',
			hidePageNumbersFlag = screenSize === 1;

		return (
			<div key="search-tool-bar" className={Cx('search-tool-bar',viewFlg)}>
				{
					(isFetching || frameworkGlobals.isServer) &&
					<Loader/>
				}
				{/*{screenSize > 2 && this.renderSearchToolbar()}*/}
				{ screenSize < 2 && this.renderResultsFound()}
				{((isFetching && listings.length) || (!isFetching)) && <div className="">
					<div className={Cx('search-results-layout', viewFlg)}>
						<div ref="searchLayoutContainer" className="search-results-layout__responsive">
							{/*{
								showFilterOverlay ?
									<div className={Cx('search-results-layout__filters filter-overlay',  filterToggleClass)}>
										{ aggregations && aggregations.length > 0 &&
										this.renderFacets(property_search_facets[this.searchFilterConfigKey],{
											onCloseFilterOverlay: this.toggleFilterOverlay,
											mobileOverlay:true,
											listingCount : total || 0,
											clearAllFilters : this.clearFilters,
											isClearAllRequired: screenSize < 3 && !!size(appliedfacets)
										})
										}
									</div> :
									<div className={Cx('search-results-layout__filters',  filterToggleClass)}>
										{ aggregations && aggregations.length > 0 &&
										this.renderFacets(property_search_facets[this.searchFilterConfigKey])
										}
									</div>
							}*/}
							{
								screenSize > 3 ?
									<div className={Cx('search-results-layout__filters',  filterToggleClass)}>
										{this.renderResultsFound()}
										{ aggregations && aggregations.length > 0 &&
										this.renderFacets(property_search_facets[this.searchFilterConfigKey])
										}
									</div> : showFilterOverlay ?
									<div className={Cx('search-results-layout__filters filter-overlay',  filterToggleClass)}>
										{ aggregations && aggregations.length > 0 &&
										this.renderFacets(property_search_facets[this.searchFilterConfigKey],{
											onCloseFilterOverlay: this.toggleFilterOverlay,
											mobileOverlay:true,
											listingCount : total || 0,
											clearAllFilters : this.clearFilters,
											isClearAllRequired: screenSize < 3 && !!size(appliedfacets)
										})
										}
									</div>
									: null
							}
							<div className={Cx('search-results-layout__results',toggleClassGridWrap)}>
								<ReactTooltip/>
								{screenSize > 2 && this.renderSearchToolbar()}
								<div className={Cx('search-listings',viewFlg)}>
									{ viewFlg === MAP_VIEW ?
										<div className={Cx('search-listings__map-view')}>
											<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 search-listings__map-view__map-container">
												<div className="row">
													<div className={Cx('map-wrapper', viewClasses[viewFlg].wrapper)}>
														<div>
															<ListingMap
																isBoundsApply={this.props.location.query.bound || false}
																searchFacets={this.state.facets}
																mapBounds = {mapBounds}
																mapmovetxt={l('MOVEMAP')}
																listings={listings}
																{...location.query}
																lon={parseFloat(this.state.lon)}
																lat={parseFloat(this.state.lat)}
																onBoundChange={this.onMapBoundsChange.bind(this)}
																isFetching = {mapLoad}
																markerIndex = {this.state.marker}
																country = {country}
																screenSize={this.props.screenSize}
																location={this.props.location}
																user={this.props.user}
																dispatch={this.props.dispatch}
																renderBundleBox={this.renderBundleBox}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
										:
										<div className={Cx('search-listings__data-view row')}>
											{this.renderListings(viewClasses[viewFlg].children)}
											{this.renderPagination(hidePageNumbersFlag)}
										</div>
									}

								</div>

							</div>
						</div>
						{ (viewFlg !== MAP_VIEW ) && <div className="add-slots hidden-xs hidden-sm hidden-md">
							<div style={{'width': 'inherit'}}>
								<ScrollFixed scrollPosition={0} top={105}>
									<Advertisement
										adBg={adbackground}
										adTitle={listing[searchType] && l(listing[searchType].adTitle)}
										adInfo={l(listing.ADLISTINGSEARCHHIGHLIGHT)}
										logo={adlogo}
										l={l}
									/>
									<ExternalAdvertisement dispatch={dispatch} />

								</ScrollFixed>
							</div>
						</div>}
					</div>
					<div onClick={this.handleBackgroundClick} className={toggleFilter ? 'search-tool-bar__sideBackDrop' : ''} />
				</div>}
				{screenSize <= 2 &&
					<MobileFooterOptions {...this.props} options={this.mobileFooterOptions()} />
				}
			</div>
		);
	}

	addBundleToWishList(propertyIds) {
		this.props.dispatch(REQUEST_ADD_TO_WISHLIST({
			propertylistingids: propertyIds
		}));
	}

	resetBundleClasses() {
		this.listingData = [];
		// updated classes
		// if listing recommendations
		if (this.props.params.term === RECOMMEND){
			let bundleNodes = document.querySelectorAll(".bundle-panel");
			let i = 0;
			const nodeLength = bundleNodes.length;
			for (; i < nodeLength; i++) {
				bundleNodes[i].classList.remove("bundle-panel");
			}
		}
	}

}
