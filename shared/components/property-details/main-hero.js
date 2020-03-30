import React, {Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImageNotFound from 'components/common/image-not-found/image-not-found';
import { BreadcrumbsMicroData } from 'utils/commonUtils';
import { getGalleryImages, getBuildingUnitInfo, getPrice, getRatePerSquareFeet, getRentPotential, getImagePath, checkIfValueAdd, getRentPotentialLabel, getListingStatus, getSchemaAdditionalList, triggerListHubEvent, checkIfTenantApplyRequired, formatAddressLineTwo } from 'utils/propertyUtil';
import { formatCurrency, localeCurrency, localeNumberFormat, getValueByLocale, addlocaleCurrencyCode } from 'utils/localeUtil';
import { checkIfCaprateToShow, checkIfCashonCashToShow, getMicroDataContext, getAdditionalMicrodata } from 'utils/searchUtil';
import ReactTooltip from 'react-tooltip';
import CaprateBox from 'components/common/caprate-display/caprate-box';
import PhotoSlideShow from '../photo-slideshow';
import {modal} from 'react-redux-modal';
import Spinner from 'components/common/spinner/spinner';
import CurveGUI from 'lib/BellCurve';
import MainHeroPrimeInfo from './main-hero-prime-info';
import AnalyzeReturns from '../analyze-returns/analyze-returns';
import Wishlist from 'components/add-to-wishlist/wishlist';
import { REQUEST_OPEN_SITE_FEEDBACK } from '../../redux/actions/application';
import loadable from '@loadable/component';
import { propertydetails as listingShareOptions } from 'assets/static/social-share-options.json';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';

const InteractiveMap = loadable(() => import(/* webpackChunkName: 'InteractiveMap' */'components/property-details/interactive-map'));
const StreetViewWrapper = loadable(() => import(/* webpackChunkName: 'StreetViewWrapper' */'components/property-details/pdp-dynamic-components-wrapper'));
const PhotoGallery = loadable(() => import(/* webpackChunkName: 'StreetViewWrapper' */'../photo-gallery'));

const SALE_TYPE = 'FORSALE';

export default class MainHero extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentPhoto : 1
		};
		this.onClickReportIssue = this.onClickReportIssue.bind(this);
		this.onAddWishlistSuccess = this.onAddWishlistSuccess.bind(this);
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		country : PropTypes.string,
		screenSize : PropTypes.number
	};

	static getMainHeroImage(details) {
		if(details.property && details.property.images) {
			return details.property.images[0];
		}
		return details.interiorImages && details.interiorImages[0] || '';
	}

	static getRentPotentialLabel(details) {
		if(details.investmentCategories && details.investmentCategories.indexOf('VALUEADDED') > -1) {
			return 'RENTPOTENTIALONFIXUP';
		}
		return 'RENTPOTENTIAL';
	}

	static getMedianPriceLocalityZipcode(standardDeviation) {
		if(standardDeviation.locality && standardDeviation.zipCode) {
			return `(${standardDeviation.locality}, ${standardDeviation.zipCode})`
		}
		if(standardDeviation.locality) {
			return `(${standardDeviation.locality})`
		}
		if(standardDeviation.zipCode) {
			return `(${standardDeviation.zipCode})`
		}
		return '';
	}

	componentDidMount() {
		const { medianPriceBellCurveDrawn = undefined } = this.state;
		const { standardDeviation, isOffMarketShowRequired } = this.props;
		if(isOffMarketShowRequired && standardDeviation && standardDeviation.stdDeviation && !medianPriceBellCurveDrawn) {
			this.initMedianPriceBellCurve();
		}else if(!medianPriceBellCurveDrawn) {
			this.setState({
				medianPriceBellCurveDrawn: true
			});
		}
	}

	initMedianPriceBellCurve() {
		const { country, i18n } = this.context;
		const { l } = i18n;
		//const ratePerSquareFeet = getRatePerSquareFeet(this.props.propertyListing);
		//const area = getAreaSquareFeet(this.props.propertyListing);
		(new CurveGUI({...this.props.standardDeviation,
			"current" : getPrice(this.props.details).price,
			//"area" : area,
			"country" : country,
			"currentPriceLabel" : l('MEDIANCURRENTPRICE'),
			"legendLabel": l('MOREPROPERTIES'),
			"lowPriceLabel" : l('MEDIANLOWPRICE'),
			"marketPriceLabel" : l('MEDIANMARKETPRICE'),
			"highPriceLabel" : l('MEDIANHIGHPRICE'),
			callBack : ()=> {
				this.setState({
					medianPriceBellCurveDrawn : true
				})
			}
		}, "median-bell-curve-graph")).drawGraph();

	}

	renderPriceCaveat(type,l) {
		if(type === SALE_TYPE) {
			return `*${l('MEDIANSALEPRICECAVEAT')}`;
		}
		return  `*${l('MEDIANLEASEPRICECAVEAT')}`;
	}

	addSlideShowModal(dataSet) {
		const { l } = this.context.i18n;
		this.onViewedMorePhotos();
		modal.add(PhotoSlideShow,{
			title: this.props.details.property.formattedAddress,
			key: 'photo-slide-show',
			size: 'large modal-gallery-actions',
			photos: dataSet,
			className: "slide-show",
			initialSlide: this.state.currentPhoto - 1
		});
	}

	onAddWishlistSuccess() {
		//triggerListHubEvent('LISTING_SAVED',this.props.propertyListing.mlsListing);
	}

	onClickReportIssue() {
		this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : true,
			subject : "REPORTINACCURACYESTIMATIONS",
			title : "REPORTINACCURACYESTIMATIONS",
			listingId : this.props.details.id
		}))
	}

	addGalleryActionsModal(component) {
		const { l } = this.context.i18n;
		// TODO : if photos trigger onViewedMorePhotos
		modal.add(component,{
			title: this.props.details.property.formattedAddress,
			key: String(component),
			size: 'large modal-gallery-actions',
			...this.state,
			...this.props
		});
	}

	onViewedMorePhotos () {
		// Function called when main hero photo images are swiped or when slideshow is opened
		triggerListHubEvent('VIEWED_MORE_PHOTOS',this.props.details.mlsListing);
	}

	renderShareOption() {
		const { screenSize, pageContext, awsImagePath } = this.context;
		const { details } = this.props;
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

	renderPriceBoxes(details, l,country, {pprice, showCaprate, showRentPotential, ratePerSquareFeet, rentPotential, capRate}) {
		return (
			<Fragment>
				<CaprateBox value={pprice} label={l('PRICE')}/>
				{!!ratePerSquareFeet &&
				<CaprateBox value={localeCurrency(Math.ceil(ratePerSquareFeet),'₹','en-IN', country)} label={l('RATEPERSQUAREFEET')}/>
				}
				{showRentPotential &&
					<CaprateBox value={localeCurrency(rentPotential.toFixed(0),'₹','en-IN', country)} label={l(getRentPotentialLabel(details.investmentCategories))}/>
				}
				{showCaprate &&
					<CaprateBox value={`${capRate.toFixed(2)}%`} label={l('CAPRATE')}/>
				}
			</Fragment>
		)
	}

	renderPriceMessage(details, l) {

		return(
			<CaprateBox  className="offmerket" value={`${l(getListingStatus(details))}`} label=""/>
		)
	}


	render() {

		const { details, standardDeviation, isShowAnalyzeReturns, metaData, isOffMarketShowRequired, location, owner, user, dispatch } = this.props;
		const {awsImagePath, i18n : {l}, country, screenSize } = this.context;
		const imagePath = getImagePath(awsImagePath,MainHero.getMainHeroImage(details).uri);
		const priceDetails = getPrice(details);
		const ratePerSquareFeet = getRatePerSquareFeet(details);
		const listingPrice = priceDetails.showrpsf  ? ratePerSquareFeet : priceDetails.price;
		const capRate = priceDetails.propertyFinancials && priceDetails.propertyFinancials.calculatedCapRate;
		const cashonCashReturn = priceDetails.propertyFinancials && priceDetails.propertyFinancials.calculatedCashOnCashReturn;
		const disclosePrice = priceDetails.disclosePrice;
		const { numberOfBedRooms, numberOfWashRooms } = getBuildingUnitInfo(details);
		const rentPotential = getRentPotential(details);
		const listingAddress = details.property.address;
		const galleryImages = getGalleryImages('',this.props.details,'');
		const isValueAdd = checkIfValueAdd(details.investmentCategories);
		const showBellCurve = !!standardDeviation && !!standardDeviation.stdDeviation;
		const showCaprate = checkIfCaprateToShow(capRate,disclosePrice,details.investmentCategories,details.property.subType);
		const showCashonCash = checkIfCashonCashToShow(cashonCashReturn,disclosePrice,details.investmentCategories,details.property.subType);
		const showRentPotential = !!rentPotential;
		const pprice = listingPrice && localeCurrency(listingPrice.toFixed(2),'₹','en-IN', country);
		const additionalMicroData = getAdditionalMicrodata([["Property Sub Type", l(details.property.subType) || '' ],["MLS Number", details.mlsListing && details.mlsListing.mlsNumber || ''],["Bedroom" , numberOfBedRooms || ''],["Bathroom" , numberOfWashRooms || ''],["Price" , disclosePrice && pprice || ''], ["Cap Rate Potential", showCaprate && capRate && `${capRate.toFixed(2)}%` || ''],["Cash on cash potential", showCashonCash && cashonCashReturn && `${cashonCashReturn.toFixed(2)}%` || ''], ...getSchemaAdditionalList(details.investmentCategories, l, 'Investment Categories')])
		return (
			<div className="property-details__main-hero">
				<div className="property-details__main-hero__left">
					<div className="property-details__main-gallery">
						{(galleryImages.length && isOffMarketShowRequired) ?
							<PhotoGallery sliderSettings={{dots : false}}
										   photos={galleryImages}
										   onClickImage={()=>{this.addSlideShowModal(galleryImages)}}
										   beforeChange={(oldIndex,newIndex)=>{
											   this.setState({
												   currentPhoto : newIndex+1
											   });
											   this.onViewedMorePhotos();
										   }}/> :
							<ImageNotFound textToShow={`${l('PROPERTYIMAGEMISSING')}`} classNames="image-cover__image"/>
						}
					</div>
					<div className="property-details__gallery-actions">
						<div className="property-details__gallery-actions__items" onClick={()=>this.addGalleryActionsModal(InteractiveMap)}>
							<i className="pe-7s-intractive-map property-details__gallery-actions__item"/>
							<span className="property-details__gallery-actions__item name">{l('MAP')}</span>
						</div>
						<div className="property-details__gallery-actions__items" onClick={()=>this.addGalleryActionsModal(StreetViewWrapper)}>
							<i className="pe-7s-street-view property-details__gallery-actions__item"/>
							<span className="property-details__gallery-actions__item name">{l('STREETVIEW')}</span>
						</div>
						<div className="property-details__gallery-actions__items" onClick={()=>{this.addSlideShowModal(galleryImages)}}>
							<i className="pe-7s-camera-2 property-details__gallery-actions__item"/>
							<span className="property-details__gallery-actions__item name">{l('PHOTOSGALLERY')}</span>
						</div>
						<div className="property-details__gallery-actions__items">
							<span className="property-details__gallery-actions__item">
								<Wishlist propertyId={details.id}
										  listingStatus = {details.status}
										  screenSize={screenSize}
										  isIconText={true}
										  text="WISHLIST"
										  onSuccessCallback={()=>{}}
										  location={this.props.location}
										  user={this.props.user}/>
							</span>
						</div>
						<div className="property-details__gallery-actions__items">
							<span className="property-details__gallery-actions__item">
							{/*<i className="pe-7s-share-2 property-details__gallery-actions__item"/>
							<span className="property-details__gallery-actions__item">{l('SHARE')}</span>*/}
								{this.renderShareOption()}
							</span>
						</div>
					</div>
					{/*<ReactTooltip />*/}
				</div>
				<div className="property-details__main-details">
					<div className="item property-details__price-details">
						{
							!isOffMarketShowRequired || !disclosePrice ?
								this.renderPriceMessage(details, l) :
								this.renderPriceBoxes(details, l, country, {pprice, showCaprate, showRentPotential, ratePerSquareFeet,rentPotential, capRate})
						}
					</div>
					<div className="item space-out property-details__primary-info">
						<div className="item">
							<div className="item column align-start">
								<div className="flex flex-align-center item-bottom">
									<i className="pe-7s-residential"/>
									{l(details.property.subType)}
									{details.status === 'ACTIVE' ? ` ${l(details.type)}` : ''}
								</div>
								<div className="property-details__address item-bottom">
									<i className="pe-7s-preferred-location"/>
									{(details.property.discloseAddress !== false && getValueByLocale(country,'showFormattedAddress')) ?
										<address>
											<div className="property-details__address__line-one">
												<span className="line-one">{details.property.formattedAddress}</span>
												{/*<span className="line-one">{listingAddress.lineOne && listingAddress.lineOne.toLowerCase()}</span>
												<span className="line-two">{`${listingAddress.lineTwo?`, ${formatAddressLineTwo(listingAddress.lineTwo)}` : ''}`}</span>
												<span className="city-locality">{(listingAddress.city || listingAddress.locality || '').toLowerCase()}, </span>
												<span className="state-code">{listingAddress.stateCode.toUpperCase()}</span>-<span>{listingAddress.zipCode}</span>*/}
											</div>
											{/*<div className="property-details__address__city-state">
												<span className="city-locality">{(listingAddress.city || listingAddress.locality || '').toLowerCase()}, </span>
												<span className="state-code">{listingAddress.stateCode.toUpperCase()}</span>-<span>{listingAddress.zipCode}</span>
											</div>*/}
											{/*{details.property.formattedAddress}*/}
										</address> :
										<span>{l('ADDRESSUNDISCLOSED')}</span>
									}
								</div>
								{details.property.schoolDistrict && <div className="item space-out school-district">
									<div className="flex flex-align-center item-bottom">
										<i className="pe-7s-school" data-tip={l('SCHOOLDISTRICT')}/>
										{details.property.schoolDistrict}
									</div>
								</div>}
								<MainHeroPrimeInfo viewTypes={true} l={l} country={country} details={details} className="other-details"/>
								<div className="item justify-start align-start tags-wrap">
									{details.isVacationRental && <div className="investment-category-tag">
										{l('VACATIONRENTAL')}
									</div>}
									{details.rentalNotAllowed && <div className="investment-category-tag">
										{l('RENTALNOTALLOWEDTAG')}
									</div>}
									{details.investmentCategories &&
									details.investmentCategories.map(category => {
										return (
											<div className="investment-category-tag">
												{l(category)}
											</div>
										)
									})
									}
									{details.rentalCategory &&
									<div className="investment-category-tag">
										{l(details.rentalCategory.toUpperCase())}
									</div>
									}
								</div>
							</div>
						</div>

					</div>
					{isOffMarketShowRequired && <div className="item column property-details__financial-details financial-details">
						<div className="item space-out align-start">
							{showBellCurve &&<div className="item column">
								<div className="flex flex-align-center">
									<ReactTooltip id="market-price"/>
									<div className="median-band flex flex-align-center">
										<h4>{l('MOREPROPERTIES')}</h4><i dat-for="market-price" data-tip={l("MARKETPRICESTOOLTIP")} className="pe-7s-help1"/>
									</div>
									<button aria-label={l("REPORTINACCURACYESTIMATIONS")} onClick={this.onClickReportIssue} className="error-report-flag"><i data-tip={l("REPORTINACCURACYESTIMATIONS")} dat-for="market-price" className="pe-7s-flag"/></button>
								</div>
								<div className="item justify-end align-end price-caveat">
										<span> {this.renderPriceCaveat(details.type,l)}</span>
								</div>
							</div>}
							<div className="item">
								{isShowAnalyzeReturns &&
								<AnalyzeReturns className="return-calculate-btn"
												btnClassName="btn btn-primary"
												listingUrl={details.listingURL}
												listingId={details.id}
												isValueAdd={isValueAdd}
												purchaseType={location.query.purchasetype}
												isRentPotentialRequired={rentPotential === undefined}/>
								}
							</div>
							{/*checkIfTenantApplyRequired(details) && owner.id !== user.user.id &&
								<TenantApply
									btnClassName="btn btn-primary"
									user={user}
									location={location}
									dispatch={dispatch}
									listingId={details.id}
							screenSize={screenSize}/>*/}
						</div>
						<div className="item space-out align-start bell-curve-wrap">
							{showBellCurve && <div>
								<div className="median-bell-curve-graphs">
									{ !this.state.medianPriceBellCurveDrawn && <Spinner />}
									<canvas id="median-bell-curve-graph" width={screenSize === 1 ? "290" : "350"} height={screenSize === 1 ? "100" : "120"}></canvas>
								</div>
								<div className="bell-curve-legend-wrap">
									{!!standardDeviation.modeLowerBound && <div className="median-band-indicator-wrapper">
										<span className="median-band-indicator"></span>
										<span className="median-band-range">{`${l('MOSTPROPERTIES')} - ${addlocaleCurrencyCode(formatCurrency(standardDeviation.modeLowerBound,2,country))} - ${addlocaleCurrencyCode(formatCurrency(standardDeviation.modeUpperBound,2,country))}`}</span>
									</div>}
									<div className="median-indicators">
										<div className="median-band-indicator-wrapper">
											<span className="median-min-indicator"></span>
											<span className="median-band-range">{`${l('MEDIANLOWPRICE')} - ${addlocaleCurrencyCode(formatCurrency(standardDeviation.min,2,country))}`}</span>
										</div>
										<div className="median-band-indicator-wrapper">
											<span className="median-avg-indicator"></span>
											<span className="median-band-range">{`${l('MEDIANMARKETPRICE')} - ${addlocaleCurrencyCode(formatCurrency(standardDeviation.avg,2,country))}`}</span>
										</div>
										<div className="median-band-indicator-wrapper">
											<span className="median-max-indicator"></span>
											<span className="median-band-range">{`${l('MEDIANHIGHPRICE')} - ${addlocaleCurrencyCode(formatCurrency(standardDeviation.max,2,country))}`}</span>
										</div>
									</div>
								</div>
							</div>}

						</div>
					</div>}
					{this.props.renderOpenHouse()}
				</div>
				<script type="application/ld+json" nonce={frameworkGlobals.nonce} dangerouslySetInnerHTML={{__html : JSON.stringify(
					[{"@context": "http://schema.org",
					"@type": getMicroDataContext(details.property.subType),
					"name":details.property.formattedAddress,
					"image":imagePath,
					"url":details.listingURL,
					"description" : metaData.description,
					"disambiguatingDescription" : details.title,
					"address": {
						"@type": "PostalAddress",
						"streetAddress": details.property.address.lineOne,
						"addressLocality": details.property.address.city,
						"addressRegion": details.property.address.stateCode,
						"postalCode": details.property.address.zipCode
					},
					"geo": {
						"@type": "GeoCoordinates",
						"name": details.property.formattedAddress,
						"latitude": details.property.address.geometry.lat,
						"longitude": details.property.address.geometry.lon
					},
					"additionalProperty" : additionalMicroData
				},BreadcrumbsMicroData(metaData.breadcrumbs,frameworkGlobals.origin)])}} />
			</div>
		);
	}
}
