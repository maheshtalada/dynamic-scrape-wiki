import React, {Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Card from 'components/common/card/card';
import MainHero from 'components/property-details/main-hero';
import { throttle, union as _union, find as _find, isEmpty as _isEmpty, values as _values, sortBy as _sortBy, cloneDeep, extend } from 'lodash';
import scrollToElement from 'utils/scrollToUtil';
import Loader from 'components/common/page-loader/loader';
import PlacesConfig from 'assets/static/nearby-places-config.json';
import { listing } from 'assets/static/ads-component-config.json';
import { getPrice, getImagePath, getRentPotential, checkIfValueAdd, isMakeOfferRequired, triggerListHubEvent, checkIfOffMarketShowRequired, checkIfTenantApplyRequired } from '../../utils/propertyUtil';
import { connect } from 'react-redux';
import ConfirmListing from 'components/listing-confirmation/listing-confirmation';
import BaseDetails from 'lib/BaseDetails';
import Snackbar from 'components/common/snackbar/snackbar';
import { Schema } from 'components/schema';
import { tabsConfig } from 'assets/static/property-details-tabs.json';
import Collapsible from 'components/common/collapsible/collapsible';
import { propertydetails as listingShareOptions } from '../../assets/static/social-share-options.json';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { adbackground, adlogo } from 'assets/static/ads-component-config.json';
import Tabs from 'components/common/tabs/tabs';
import ContactLeadRealtorsOption from 'components/lead-realtors/contact-lead-realtors-option';
import MobileFooterOptions from 'components/common/mobile-footer-options/mobile-footer-options';
import googleMapLoader from 'google-map-react/lib/utils/loaders/google_map_loader';
import SITECONFIG from '../../config';
import METROSERVEDCONFIG from 'assets/static/metros-served-config';
import AnalyzeReturns from 'components/analyze-returns/analyze-returns';
import { REQUEST_PROPERTY_LISTING, REQUEST_SIMILAR_PROPERTY_LISTINGS, REQUEST_DEMOGRAPHICS_DATA, REQUEST_SEND_LISTING_CONTACT_EMAIL } from '../../redux/actions/properties';
import TenantApply from 'components/tenant-apply/tenant-apply';
import ScrollFixed from 'components/common/scroll-fixed/scroll-fixed';
import ExternalAdvertisement from 'components/advertisement/external-advertisement';
import loadable from '@loadable/component';
import BreadCrumbs from 'components/breadcrumbs/breadcrumbs';
import { Button } from 'components/common/button';
import ListingContact from 'components/lead-realtors/listing-contact';
import PageActions from 'components/page-actions/page-actions.js';
import Wishlist from 'components/add-to-wishlist/wishlist';
import SlantedTabs from 'components/common/slanted-tabs/slanted-tabs';

const { gmap } = SITECONFIG;
const { areasServed } = METROSERVEDCONFIG;
const SimilarListings = loadable(() => import(/* webpackChunkName: 'SimilarListings' */'components/property-details/similar-listings'));
const MLSListingAgentInfo = loadable(() => import(/* webpackChunkName: 'MLSListingAgentInfo' */'components/property-details/mls-listing-agent-info'));
const OpenHouse = loadable(() => import(/* webpackChunkName: 'OpenHouse' */'components/open-house/open-house'));
const DEFAULT_TAB = 'overview';
const MEDIA_TAB = "photos";
const TAB_COMPONENTS = {
	/*'InteractiveMap' : InteractiveMap,
	'StreetViewWrapper' : StreetViewWrapper,*/
	'ActiveListings' : SimilarListings,
	'ListingAgent' : MLSListingAgentInfo
};
const SALE_TYPE = 'FORSALE';
const RESIDENTIAL_LAND = 'RESIDENTIAL_LAND';
const TABACTIONS = {
	REQUEST_PROPERTY_LISTING,
	REQUEST_DEMOGRAPHICS_DATA,
	REQUEST_SIMILAR_PROPERTY_LISTINGS
};

class PropertyDetails extends BaseDetails {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		country: PropTypes.string,
		pageContext : PropTypes.string,
		screenSize : PropTypes.number
	};

	static defaultProps = {
		tabs: []
	};

	static getFirstVideo(details) {
		return (details && details.videoLinks && details.videoLinks[0]) || {};
	}

	static checkIfAnalyzeReturnsToShow(details) {
		const priceDetails = getPrice(details);
		if(details.type !== SALE_TYPE) {
			return false;
		}
		if(details.subType === RESIDENTIAL_LAND) {
			return false;
		}
		if(priceDetails.disclosePrice === false) {
			return false;
		}
		return true;
	}

	static getFilteredTabs(tabToFilter,tabs,check) {
		if(check) {
			return tabs.filter(tab => tab !== tabToFilter)
		}
		return tabs;
	}

	static isRedirectedFromSearch(prevLocation) {
		return prevLocation.indexOf('/residential-investment-properties') > -1;
	}

	constructor(props) {
		super(props);
		// this.showNearPlaces =  this.showNearPlaces.bind(this);
		// add null check for below logic
		const type = props.propertyListing && props.propertyListing.property && props.propertyListing.property.type,
			typePlaces = PlacesConfig[type] || {};
		this.state = {
			metaData : props.metaData || '',
			details : props.propertyListing || '',
			progress : props.completionDetail || '',
			detailSchema : props.detailSchema || '',
			schoolSchema : props.schoolSchema || '',
			photoSchema : props.photoSchema || '',
			videoSchema : props.videoSchema || '',
			floorPlanSchema : props.floorPlanSchema || '',
			medianPriceSchema : props.medianPriceSchema || '',
			mediaSchema : props.mediaSchema || '',
			externalLinkSchema : props.externalLinkSchema || '',
			owner : props.owner,
			activeTab: DEFAULT_TAB,
			/*defaultActive : DEFAULT_TAB,*/
			isFetching:false,
			nearbyPlaces:_union(PlacesConfig.COMMON,typePlaces),
			isShowEmailSentNotification: false,
			similarListings: {},
			pdpTabs: PropertyDetails.getFilteredTabs('medianPrice',props.tabs,!checkIfOffMarketShowRequired(props.propertyListing,props.user)) || '',
			sortedTabs : _sortBy(tabsConfig,tab => tab.order),
			collapsibleTabs : props.tabs && PropertyDetails.getFilteredTabs('medianPrice',props.tabs.slice(2),!checkIfOffMarketShowRequired(props.propertyListing,props.user)) || [],
			leadRealtors : props.preferredProfessional,
			referrerAgent : props.referrer,
			leadRealtorsTitle : 'INTERESTED',
			isUserOwnerSame : props.user.user && props.owner ? props.user.user.id === props.owner.id : false,
			allOpened : ['listingOwner'],
			openedTabs : ['listingOwner']
		};

		this.renderOpenHouse = this.renderOpenHouse.bind(this);
		this.onClickImageCover = this.onClickImageCover.bind(this);
		this.onSendEmail = this.onSendEmail.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props) {
			const { propertyListing } = props,
				type = propertyListing && propertyListing.property && propertyListing.property.type,
				typePlaces = PlacesConfig[type] || {};
			if(props.user && props.user.user.isLogIn && propertyListing) {
				if(props.user.user.id === propertyListing.ownedByUserId && !this.isDetailsRequested) {
					this.isDetailsRequested = true;
					this.props.dispatch(REQUEST_PROPERTY_LISTING({
						params : {...props.params},
						query : props.location.query
					}))
				}
			}

			this.setState({
				metaData : props.metaData || '',
				details : props.propertyListing,
				pdpTabs : PropertyDetails.getFilteredTabs('medianPrice',props.tabs,!checkIfOffMarketShowRequired(props.propertyListing,props.user)) || '',
				collapsibleTabs : props.tabs && PropertyDetails.getFilteredTabs('medianPrice',props.tabs.slice(2),!checkIfOffMarketShowRequired(props.propertyListing,props.user)) || [],
				progress : props.completionDetail || '',
				detailSchema : props.detailSchema || this.state.detailSchema || '',
				schoolSchema : props.schoolSchema || '',
				photoSchema : props.photoSchema || '',
				videoSchema : props.videoSchema || '',
				floorPlanSchema : props.floorPlanSchema || '',
				documentSchema : props.documentSchema || '',
				externalLinkSchema : props.externalLinkSchema || '',
				medianPriceSchema : props.medianPriceSchema || '',
				mediaSchema: props.mediaSchema || {},
				demographics_data: props.demographics_data || {},
				owner : props.owner,
				isFetching: props.isFetching || (props.demographics_data && props.demographics_data.isFetching),
				nearbyPlaces: _union(PlacesConfig.COMMON,typePlaces),
				similarListings : props.similarListings && props.similarListings || {},
				leadRealtors : props.preferredProfessional,
				referrerAgent : props.referrer,
				isUserOwnerSame : props.user.user && props.owner ? props.user.user.id === props.owner.id : false
			});
		}
	}

	componentDidMount() {
		if(!frameworkGlobals.isServer) {
			window.addEventListener('scroll',this.fetchSimilarListings);
			// have to load google map if there is no map loaded,
			// required for mobile and location search doesn't be on page for mobile
			if(!window.google) {
				googleMapLoader(gmap);
			}
			//call listhub analytics
			triggerListHubEvent('DETAIL_PAGE_VIEWED',this.props.propertyListing && this.props.propertyListing.mlsListing);
		}
	}


	componentWillUnmount() {
		if(!frameworkGlobals.isServer) {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}

	onClickImageCover() {
		const mediaTabConfig = _find(tabsConfig,{name : MEDIA_TAB});
		this.tabChange(mediaTabConfig);
	}

	onSchemaChange(changeObject, hasErrors, data) {
		this.setState({
			changeObject,
			hasErrors
		});
		const schemaLength = _values(data.schemas).length;

		if (!_isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	renderTabSchema(data,schemaName, tabConfig='') {
		let expressList = data.schemas,
			referenceData = data.referenceData|| {},
			listSchema = _sortBy(_values(expressList), (o)=> {
				return o.order;
			});
		let schemaComponents = listSchema.map((schemaData, index) => {
			return this.renderSchema(schemaData,`schema_${index}`,referenceData, index, schemaName);
		});
		// update subComponent in schema renderer tab
		if(tabConfig.subComponent) {
			schemaComponents.push(this.renderTabComponent(tabConfig.subComponent));
		}
		return schemaComponents
	}

	renderTabComponent({renderComponent, name}) {
		const Component = TAB_COMPONENTS[renderComponent];
		return <Component
			key={name}
			{...this.props}
			{...this.state}
		/>
	}

	renderTabDetails(tabName='') {
		const { activeTab , isFetching } = this.state;
		tabName = tabName || activeTab;
		const tabConfig = _find(tabsConfig,{ name: tabName});
		if(tabConfig.renderComponent) {
			return this.renderTabComponent(tabConfig);
		}
		if(!_isEmpty(this.state[tabConfig.storeKeyToCheck])) {
			const tabschema = this.renderTabSchema(this.state[tabConfig.storeKeyToCheck],tabConfig.name, tabConfig);
			return tabschema;
		}
		return '';
	}

	renderSchema(data,refVal='schema_0',referenceData={}, index, schemaName) {
		const { i18n, country } = this.context;
		return (
			<div className={`schema-container-wrapper schema-border schema-${schemaName}`}>
				<Schema
					key={`${schemaName}_${index}`}
					l={i18n.l}
					country = {country}
					ref={refVal}
					data={data}
					writeMode={true}
					onChange={(changeObject,hasErrors) => {this.onSchemaChange(changeObject,hasErrors,data)}}
					referenceData={referenceData}
				/>
			</div>
		)
	}

	renderOpenHouse() {
		const { details, owner, isUserOwnerSame } = this.state;
		const { user, location, dispatch } = this.props;
		return (
		details.openHouseTimes && details.openHouseTimes.length > 0 ?
			<OpenHouse openHouseTimes={details.openHouseTimes}
					   disableContactOptions = {isUserOwnerSame}
					   user={user}
					   location={location}
					   dispatch={dispatch}
					   owner={owner}
					   listingId={details.id}
			/> : null
		)
	}

	 tabChange(tabConfig) {
		const { openedTabs=[], allOpened=[] } = this.state;
		this.onReduxAction(tabConfig);
		openedTabs.indexOf(tabConfig.name) < 0 && openedTabs.push(tabConfig.name);
		allOpened.indexOf(tabConfig.name) < 0 && allOpened.push(tabConfig.name);

		this.setState({
			activeTab: tabConfig.name,
			openedTabs,
			allOpened
		}, ()=> {
			(this.props.tabs.slice(0,2).indexOf(tabConfig.name) > -1 || allOpened.indexOf(tabConfig.name) > -1) &&
			scrollToElement(false,tabConfig.tabHTMLId)
		});
	}

	onReduxAction(tabConfig) {
		if(tabConfig.reduxAction && _isEmpty(this.state[tabConfig.storeKeyToCheck])) {
			this.props.dispatch(TABACTIONS[tabConfig.reduxAction]({
				params : this.props.params,
				query : this.props.location.query
			}));
		}
	}

	onExpand(tab) {
		const { openedTabs =[], allOpened=[] } = this.state;
		openedTabs.indexOf(tab) < 0 && openedTabs.push(tab);
		allOpened.indexOf(tab) < 0 && allOpened.push(tab);
		const tabConfig = _find(tabsConfig,{ name: tab});
		if(tabConfig.subComponent && tabConfig.subComponent.reduxAction) {
			this.onReduxAction(tabConfig.subComponent);
		}else {
			this.onReduxAction(tabConfig);
		}

		this.setState({openedTabs, allOpened}, ()=>scrollToElement(false,tabConfig.tabHTMLId))
	}

	onCollapse(tab) {
		const { allOpened=[] } = this.state;
		this.setState({
			allOpened : allOpened.filter(existed => existed !== tab)
		})
	}

	renderCollapsibleTabs(l, collapsibleTabs, sortedTabs) {
		const { openedTabs =[], allOpened=[], externalLinkSchema } = this.state;
		collapsibleTabs = [...collapsibleTabs];
		if(externalLinkSchema) {
			collapsibleTabs.push("externalLinks");
		}

		return sortedTabs.filter(tab => collapsibleTabs.indexOf(tab.name) > -1).map(tab => {
			return (
				<Collapsible
					key={tab.name}
					overflowWhenOpen={tab.name === 'listingOwner' && 'unset'}
					transitionTime={250}
					trigger={l(tab.label)}
					open={allOpened.indexOf(tab.name) > -1 }
					onClosing={()=>this.onCollapse(tab.name)}
					onOpening={()=>this.onExpand(tab.name)}
					className="property-details__section-wrapper"
					openedClassName={tab.name}
					extraProps= { {id : tab.name}}
					minHeight = {tab.minHeight || 'auto'}
				>
					{ openedTabs.indexOf(tab.name) > -1 && this.renderTabDetails(tab.name)}
				</Collapsible>
			);
		});
	}
	/*
	 renderTabs() {
	 const { pdpTabs, activeTab } = this.state;
	 const tabsToShow = tabsConfig.filter(tab => pdpTabs.indexOf(tab.name) >= 0);
	 const modifiedTabs = _sortBy(tabsToShow,tab => tab.order);
	 return (
	 <SlantedTabs tabs={modifiedTabs} selectedTab={activeTab} slider={false} onTabSelect={this.tabChange}/>
	 )
	 }
	*/

	renderTabs() {
		const { pdpTabs, activeTab } = this.state;
		const { screenSize  } = this.context;
		const tabsToShow = tabsConfig.filter(tab => pdpTabs.indexOf(tab.name) >= 0);
		const modifiedTabs = _sortBy(tabsToShow,tab => tab.order);
		return (
			<Fragment>
				{
					screenSize < 2 ?
						<SlantedTabs tabs={modifiedTabs} selectedTab={activeTab} slider={false} onTabSelect={this.tabChange}/>
					: 	<Tabs tabs={modifiedTabs} selectedTab={activeTab} slider={false} onTabSelect={this.tabChange}/>
				}
			</Fragment>
		)
	}

	renderMakeOfferOption() {
		const { isUserOwnerSame, details } = this.state;
		const { screenSize } = this.context;
		return (
			!isUserOwnerSame && isMakeOfferRequired(details) && <MakeOffer
							user={this.props.user}
							location={this.props.location}
							dispatch={this.props.dispatch}
							listingId={details.id}
							screenSize={screenSize}/>
		)
	}

	renderAnalyzeReturnOption() {
		const { details } = this.state;
		const isShowAnalyzeReturns = PropertyDetails.checkIfAnalyzeReturnsToShow(details);
		const { screenSize, pageContext } = this.context;
		const isValueAdd = checkIfValueAdd(details.investmentCategories);
		const rentPotential = getRentPotential(details);
		const purchaseType = this.props.location.query.purchasetype;
		return (
			isShowAnalyzeReturns && <AnalyzeReturns className="btn-sm analyze-return-option-btn"
										context={pageContext}
										purchaseType={purchaseType}
										showInfoInOverlay={screenSize === 1}
										listingUrl={details.listingURL}
										listingId={details.id}
										 isValueAdd={isValueAdd}
										 isRentPotentialRequired={rentPotential === undefined}/>
		)
	}

	renderShareOption() {
		const { screenSize, pageContext, awsImagePath } = this.context;
		const { details } = this.state;
		const shareUrl = !frameworkGlobals.isServer ? window.location.href : '';
		const shareImagePath = getImagePath(awsImagePath,MainHero.getMainHeroImage(details).uri);
		return (
			<SocialShare
				context={pageContext}
				emailOptions={{
					shareType : 'PROPERTYLISTING'
				}}
				location={this.props.location}
				screenSize={screenSize}
				user={this.props.user}
				listingId={details.id}
				mlsListing={this.props.propertyListing.mlsListing}
				dispatch = {this.props.dispatch}
				shareUrl={shareUrl}
				title = {details.property && details.property.formattedAddress}
				imagePath = {shareImagePath}
				options = {listingShareOptions}
				showOptionsInOverlay = {screenSize === 1}
			/>
		)
	}

	renderTenantApplyOption() {
		const { details, isUserOwnerSame } = this.state;
		const isTenantApplyRequired = checkIfTenantApplyRequired(details);
		const { screenSize } = this.context;
		if(!isTenantApplyRequired || isUserOwnerSame) {
			return null;
		}

		return (
			<TenantApply
				user={this.props.user}
				location={this.props.location}
				dispatch={this.props.dispatch}
				listingId={details.id}
				screenSize={screenSize}/>
		)
	}

	renderActions() {
		const { user,  dispatch, owner, location, preferredProfessional } = this.props;
		const { details } = this.state;
		const { l } = this.context.i18n;
		let ACTION_OPTIONS = [
			{
				"name" : "MAKEANOFFER",
				"value" : "submitloi",
				"isLoginRequired" : true,
				"type" : "extraPayLoad",
				"icon" : "pe-7s-money-bag",
				"extraPayLoad" : {
					"listingId" : details.id
				},
				order : 1

			},
			{
				"name" : "SHARE",
				"value" : "share",
				"component" : this.renderShareOption(),
				order : 4
			},
			{
				"name" : "ADDTOWISHLIST",
				"value" : "wishlist",
				"component" : <Wishlist propertyId={details.id}
										screenSize={this.context.screenSize}
										onSuccessCallback={()=>{}}
										text="ADDTOWISHLIST"
										isIconText={true}
										location={location}
										user={user}/>,
				order : 5
			},

			{
				"name" : "CALCULATERETURN",
				"value" : "calculateroi",
				"icon" : "pe-7s-analyze-returns",
				"component" : <Link to={`${details.listingURL}/analyze-return`}>{l('CALCULATERETURN')}</Link>,
				order : 6

			}
		];

		if(user.user.id !== owner.id) {
			ACTION_OPTIONS.push({
				"name" : "CONTACTLISTINGAGENT",
				"value" : "contactlistingagent",
				"isLoginRequired" : true,
				"type" : "extraPayLoad",
				"icon" : "pe-7s-mail",
				"extraPayLoad" : {
					context : 'Listing Agent',
					contactedId : owner.id,
					contactedName: owner.name,
					actionType: 'EMAIL',
					contextType: 'LISTING',
					defaultMessage: '',
					//onActionFinished: this.onActionFinished,
					listingId : details.id
				},
				order : 2
			})
		}
		if(preferredProfessional && preferredProfessional.data) {
			ACTION_OPTIONS.push(
				{
					"name" : "CONTACTINVESTMENTSPECIALISTS",
					"value" : "contactlistingagent",
					"isLoginRequired" : true,
					"type" : "extraPayLoad",
					"icon" : "pe-7s-mail",
					"extraPayLoad" : {
						context : 'Listing Agent',
						contactedId : owner.id,
						contactedName: owner.name,
						actionType: 'EMAIL',
						contextType: 'LISTING',
						defaultMessage: '',
						specialists : preferredProfessional && preferredProfessional.data || '',
						//onActionFinished: this.onActionFinished,
						listingId : details.id
					},
					order : 3
				},
			)
		}

		const actionProps = { actions : ACTION_OPTIONS,  user,  dispatch};

		return (
			<PageActions {...actionProps} />
		)
	}

	renderHeaderControls(metaData, screenSize, l) {
		const isEnableBackToResults = PropertyDetails.isRedirectedFromSearch(document.referrer || ' ');
		return (
			<div className="property-details__controls col-md-12 col-lg-12">
				{ metaData.breadcrumbs && screenSize > 2 && <BreadCrumbs breadCrumbList={metaData.breadcrumbs} screenSize={screenSize}/> }
				<div className="property-details__control"> {isEnableBackToResults &&
					<Link to={document.referrer} className="btn-default">{l('BACKTORESULTS')}</Link>}
				</div>
				{screenSize > 2 &&this.renderActions()}
			</div>
		)
	}

	render() {
		const { metaData, details,progress, activeTab, collapsibleTabs, sortedTabs, isFetching, nearbyPlaces, owner, isShowEmailSentNotification, similarListings, videoToPlay, isUserOwnerSame, emailSuccessText, leadRealtors, referrerAgent} = this.state;
		const { user, chatUserStatus, standardDeviation, location, dispatch, params } = this.props;
		const {i18n : {l}, screenSize } = this.context;
		if(!isFetching && !details) {
			return null
		}
		const paramSaleType = this.props.params && this.props.params.saletype;
		const isShowAnalyzeReturns = PropertyDetails.checkIfAnalyzeReturnsToShow(details);
		const stateCode = (details && details.property && details.property.address.stateCode) || '';
		const metroServed = _find(areasServed,{'name' : params.city});
		const isOffMarketShowRequired = checkIfOffMarketShowRequired(details,user);

		return (
			<div className="property-details">
				<div className="row flex-layout">
					<div className="property-details__main col-lg-12 col-md-12 col-sm-12 col-xs-12">
					{isUserOwnerSame && owner.id &&
					<ConfirmListing
						details = {details}
						owner = {owner}
						user = {user.user}
						progress = {progress}
					/>
					}
					{
						<Snackbar active={isShowEmailSentNotification} timeout={5000} onTimeout={this.hideEmailNotif}>
							{l(emailSuccessText)}
						</Snackbar>
					}
					<div className="">
						<div className="property-details__left">
								<ScrollFixed scrollPosition={isUserOwnerSame ? 260 : 0} top={ screenSize > 2 ? 50 : 80} isWidthRequired={false} className="property-details__fixed-nav">
									<div className="property-details__nav">
										{this.renderHeaderControls(metaData, screenSize, l)}
										{this.renderTabs()}
									</div>
								</ScrollFixed>
							<div className="property-details__main-wrapper">
								{
									isFetching &&
									<Loader/>
								}

								{
									details.property &&
									<div className="sections">
										<div className="property-details__section-wrapper" id="overview">
											<Card key="hero" shadow={2} className="mod property-details__main-hero-wrap">
												<MainHero {...this.state}
															dispatch={this.props.dispatch}
															user={this.props.user}
															location={this.props.location}
														  propertyListing = {this.props.propertyListing}
															screenSize={screenSize}
															isOffMarketShowRequired={isOffMarketShowRequired}
														  renderMedianBellCurve={this.renderMedianBellCurve}
														  standardDeviation={standardDeviation || ''}
														  renderOpenHouse={this.renderOpenHouse}
														  isShowAnalyzeReturns = {isShowAnalyzeReturns}
														  onClickImageCover={this.onClickImageCover}/>
											</Card>
										</div>
										<div className="property-details__section-wrapper" id="details">
											<Card key="about" shadow={2} className="mod property-details__about-info">
												{ this.renderTabSchema(this.state.detailSchema,'details')}
											</Card>
										</div>

										{this.renderCollapsibleTabs(l,collapsibleTabs, sortedTabs)}
									</div>
								}
							</div>
						</div>
						{
							this.renderAdvertisement({
								adTitle : listing[paramSaleType] && listing[paramSaleType].adTitle,
								adInfo : listing.ADLISTINGPDPHIGHLIGHT,
								metroServedLabel : metroServed && metroServed.searchBarAddress
							},isUserOwnerSame ? 260 : 0, false)
						}
					</div>
				</div>
				</div>
				{screenSize <= 2 &&
					<MobileFooterOptions {...this.props} options={this.mobileFooterOptions()} />
				}
			</div>
		);
	}

	mobileFooterOptions() {
		const { user,  dispatch, owner, location, preferredProfessional } = this.props;
		const { details } = this.state;
		const { l } = this.context.i18n;
		let mobileFooterOptions = [
			{
				"name" : "CALCULATERETURN",
				"value" : "calculateroi",
				"icon" : "pe-7s-analyze-returns",
				"component" : <Link to={`${details.listingURL}/analyze-return`}>{l('CALCULATERETURN')}</Link>

			},
			{
				"name" : "MAKEANOFFER",
				"value" : "submitloi",
				"isLoginRequired" : true,
				"type" : "extraPayLoad",
				"icon" : "pe-7s-money-bag",
				"extraPayLoad" : {
					"listingId" : details.id
				}

			},
			{
				"name" : "SHARE",
				"value" : "share",
				"component" : this.renderShareOption()
			},
			{
				"name" : "ADDTOWISHLIST",
				"value" : "wishlist",
				"component" : <Wishlist propertyId={details.id}
										screenSize={this.context.screenSize}
										onSuccessCallback={()=>{}}
										text="ADDTOWISHLIST"
										isIconText={true}
										location={location}
										user={user}/>,
				order : 5
			}
		];

		if(user.user.id !== owner.id) {
			mobileFooterOptions.push({
				"name" : "CONTACTLISTINGAGENT",
				"value" : "contactlistingagent",
				"isLoginRequired" : true,
				"type" : "extraPayLoad",
				"icon" : "pe-7s-mail",
				"extraPayLoad" : {
					context : 'Listing Agent',
					contactedId : owner.id,
					contactedName: owner.name,
					actionType: 'EMAIL',
					contextType: 'LISTING',
					defaultMessage: '',
					//onActionFinished: this.onActionFinished,
					listingId : details.id
				},
				order : 2
			})
		}
		if(preferredProfessional && preferredProfessional.data) {
			mobileFooterOptions.push(
				{
					"name" : "CONTACTINVESTMENTSPECIALISTS",
					"value" : "contactlistingagent",
					"isLoginRequired" : true,
					"type" : "extraPayLoad",
					"icon" : "pe-7s-mail",
					"extraPayLoad" : {
						context : 'Listing Agent',
						contactedId : owner.id,
						contactedName: owner.name,
						actionType: 'EMAIL',
						contextType: 'LISTING',
						defaultMessage: '',
						specialists : preferredProfessional && preferredProfessional.data || '',
						//onActionFinished: this.onActionFinished,
						listingId : details.id
					},
					order : 3
				},
			)
		}

		return mobileFooterOptions;
	}

	onSendEmail({ name, email, message }, contactData) {
		const { details : { id }} = this.state;
		this.props.dispatch(REQUEST_SEND_LISTING_CONTACT_EMAIL({
			dataPayload : {
				contacteduserid : contactData.id,
				name : name.value,
				emailid : email.value,
				message : message.value
			},
			paramsPayload : {
				listingid : id
			}
		}))
	}

	/*
		create email options for preferedProfessional with realtor profession
		or to owner i.e listing agent
	*/
	renderRRContactEmail() {
		const { leadRealtors, owner } = this.state;
		const { user : {user} } = this.props;
		const emailAgent = leadRealtors && leadRealtors.data && _find(leadRealtors.data, {profession : 'realtor'}) || owner || '';
		if(!emailAgent) {
			return null
		}
		return (
			<ListingContact
				form = {{
					name : {
						value : user && user.name || '',
						error : false
					},
					email : {
						value : user && user.emailId || '',
						error : false
					}
				}}
				onSendEmail = {this.onSendEmail}
				contactData={emailAgent}
				listingContactEmailStatus={this.props.listing_contact_email}
				onEmailSent= {this.onEmailSentSuccess}
			/>
		)
	}

	renderAdvertisement({adTitle, adInfo, metroServedLabel=''}, scrollPosition=0, isVendorLinkRequired, vendorLinkText) {
		const { dispatch, screenSize} = this.props;

		return (
			screenSize > 1 ? <div className="property-details__right hidden-sm hidden-xs">
				<ScrollFixed scrollPosition={scrollPosition} top={60} isWidthRequired={true} className="property-details__right__scroll-fixed">
					{this.renderRRContactEmail()}
					<Fragment>
						<ExternalAdvertisement vendorLinkText={vendorLinkText} isVendorLinkRequired={isVendorLinkRequired} dispatch={dispatch} metroServedLabel={metroServedLabel}/>
					</Fragment>
				</ScrollFixed>
			</div> : null
		);
	}
}

export default connect(({properties})=> {
	return {
		similarListings: properties.similar_listings,
		demographics_data: properties.demographics_data,
		listing_contact_email : properties.listing_contact_email
	};
})(PropertyDetails);
