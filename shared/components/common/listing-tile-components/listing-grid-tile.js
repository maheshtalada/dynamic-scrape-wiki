import React from 'react';
import CaprateBox from '../caprate-display/caprate-box';
import AnalyzeReturns from '../../analyze-returns/analyze-returns';
import ListingPrimeInfo from '../listing-tile-components/prime-info';
import ListingPriceInfo from '../listing-tile-components/price-info';
import ListingAddressInfo from '../listing-tile-components/address-info';
import ListingTags from '../listing-tile-components/listing-tags';
import ListingSubtype from '../listing-tile-components/listing-sub-type';
import { getImagePath, checkIfValueAdd, getRentPotentialLabel } from '../../../utils/propertyUtil';
import { checkIfAnalyzeReturnsToShow, ifRentPotentialToShow } from '../../../utils/searchUtil';
import { localeCurrency } from '../../../utils/localeUtil';
import ImageCover from '../image-cover/image-cover';
import { getAbsoluteUrl } from 'utils/urlUtil';
import Wishlist from '../../../components/add-to-wishlist/wishlist';
import Cx from 'classnames';
/*import TenantApply from 'components/tenant-apply/tenant-apply';*/


export default function(props) {
	const {listing: item, awsImagePath, l, country, facets={}, screenSize, location, user, isCityStateOnly, isOpenNewTab, purchaseType, dispatch, isCarouselDataOverlay} = props;
	const isValueAdd = checkIfValueAdd(item.investmentcategories);
	//const isPopular = !isHomePageCarousel && {'height': '100%'};
	return (
		<div className="realtor-details__active-listings__panel-wrap">
			<div className="realtor-details__active-listings__tags">
				{<Wishlist propertyId={item.id} screenSize={screenSize} location={location} user={user}/>}
				{ item.subtype && <ListingSubtype value={l(item.subtype.toUpperCase())}/>}
			</div>
			{/*{checkIfAnalyzeReturnsToShow(item) && <div className="analyze-returns-btn">
				<AnalyzeReturns listingUrl={item.listingurl} purchaseType={purchaseType}
						listingId={item.id} showBtnText={false} isValueAdd={isValueAdd} isRentPotentialRequired={item.rent === undefined}/>
			</div>}*/}
			{/*checkIfTenantApplyRequired(item,user.user.id) &&
				<div className="tenant-apply-btn-wrap">
					<TenantApply
						btnClassName="btn-default"
						user={user}
						location={location}
						dispatch={dispatch}
						listingId={item.id}
						showBtnText={false}
						screenSize={screenSize}/>
				</div>
			*/}
			{typeof props.renderBundleBox === 'function' && props.renderBundleBox(item.bundles,item.id,item,true)}
			<a target={isOpenNewTab ? '_blank' : ''} className="cover-link flex flex-column flex-justify-end" href={`${getAbsoluteUrl(item.listingurl)}${purchaseType === 'leveraged' ? '?purchasetype=leveraged' : ''}`}>
				<ImageCover imagePath={getImagePath(awsImagePath,item.image)}/>
				{ !isCarouselDataOverlay && renderGridData(props)}
				{ isCarouselDataOverlay && <div className="investment-categories-wrap">
					<ListingTags listing={item} l={l} selectedTags={facets["investmentcategories"] || facets["rentalcategory"]}/>
				</div>
				}
				{ isCarouselDataOverlay && renderGridDataBelow(props)}
			</a>

		</div>
	)
}

const renderGridData = (props) => {
	const {listing: item, l, country, facets={}, isCityStateOnly, purchaseType, isCarouselDataOverlay} = props;
	const capRateBoxTheme = !isCarouselDataOverlay && 'dark';
	return (
		<div className="realtor-details__active-listings__data flex flex-column flex-justify-end">
			{ !isCarouselDataOverlay && <ListingTags listing={item} l={l} selectedTags={facets["investmentcategories"] || facets["rentalcategory"]}/>}
			<div className="flex flex-justify-between flex-align-start">
				<div className="flex flex-column info-wrap">
					<div className="flex flex-justify-between flex-align-center">
						<ListingPriceInfo listing={item} country={country} l={l} className="price-info"/>
					</div>
					<ListingPrimeInfo isGridTile className="area-info" country={country} l={l} listing={item}/>
					<ListingAddressInfo isIcon={true} isCityStateOnly={isCityStateOnly} listing={item} l={l} className="property-address"/>
				</div>
				<div className="flex flex-column flex-justify-between flex-align-end caprate-wrap">
					<div>
						{ifRentPotentialToShow(item.rent,item.caprate,item.cashoncashreturn,purchaseType) &&
						<CaprateBox value={localeCurrency(item.rent.toFixed(0),'₹','en-IN',country)} label={l(getRentPotentialLabel(item.investmentcategories))} theme={capRateBoxTheme}/>
						}
					</div>
					<div>
						{purchaseType !== 'leveraged' && item.caprate &&
						<CaprateBox value={`${item.caprate.toFixed(2)}%`} tooltip={l('CAPRATE')} label={l('CAPRATE')} theme={capRateBoxTheme}/>
						}
						{purchaseType === 'leveraged' && item.cashoncashreturn &&
						<CaprateBox value={`${item.cashoncashreturn.toFixed(2)}%`} tooltip={l('CASHONCASHRETURNPERCENTAGE')} label={l('CASHONCASHRETURNPERCENTAGE')} theme={capRateBoxTheme}/>
						}
					</div>
				</div>
			</div>
		</div>
	);
};


const renderGridDataBelow = (props) => {
	const {listing: item, l, country, facets={}, isCityStateOnly, purchaseType, isCarouselDataOverlay, isCaprateBoxRequired, isROICalculatorRequired} = props;
	const capRateBoxTheme = !isCarouselDataOverlay && 'dark';
	const isValueAdd = checkIfValueAdd(item.investmentcategories);
	return (
		<div className="realtor-details__active-listings__data flex flex-column flex-justify-end">
			{ !isCarouselDataOverlay && <ListingTags listing={item} l={l} selectedTags={facets["investmentcategories"] || facets["rentalcategory"]}/>}
			<div className="realtor-details__active-listings__data__box">
				<div className="flex flex-justify-between flex-align-center">
						<ListingPriceInfo listing={item} country={country} l={l} className="price-info"/>
					{ isROICalculatorRequired && <div>
							{checkIfAnalyzeReturnsToShow(item) &&
							<AnalyzeReturns className="return-calculate-btn"
											btnClassName="btn btn-default btn-sm analyze-return-option-btn" listingUrl={item.listingurl} purchaseType={purchaseType}
											listingId={item.id} isValueAdd={isValueAdd} isRentPotentialRequired={item.rent === undefined}/>
							}
						</div>}

				</div>
				<div className="flex flex-justify-between flex-align-start listing-prime-info-wrap">
					<ListingPrimeInfo isGridTile className="area-info" country={country} l={l} listing={item} isBDBAPostfix={true}/>
				</div>
				{ isCaprateBoxRequired && <div className="flex flex-justify-between flex-align-start caprate-info-wrap">
					<div className="flex flex-column col-md-6 col-sm-6 col-xs-6 border-right">
						<div>
							{ifRentPotentialToShow(item.rent,item.caprate,item.cashoncashreturn,purchaseType) &&
								<div data-place="left" className={Cx('property-caprate',capRateBoxTheme, '')}>
									<div className="label">
										{l(getRentPotentialLabel(item.investmentcategories))}
									</div>
									<div className="value">
										{localeCurrency(item.rent.toFixed(0),'₹','en-IN',country)}
									</div>
								</div>
							}
						</div>
					</div>
					<div className="flex flex-column col-md-6 col-sm-6 col-xs-6">
						<div>
							{purchaseType !== 'leveraged' && item.caprate &&
								<div data-place="left" className={Cx('property-caprate',capRateBoxTheme, '')}>
									<div className="label">
										{l('CAPRATE')}
									</div>
									<div className="value">
										{`${item.caprate.toFixed(2)}%`}
									</div>
								</div>
							}
							{purchaseType === 'leveraged' && item.cashoncashreturn &&
								<div data-place="left" data-tip={l('CASHONCASHRETURNPERCENTAGE')} className={Cx('property-caprate',capRateBoxTheme, '')}>
									<div className="label">
										{l('CASHONCASHRETURNPERCENTAGE')}
									</div>
									<div className="value">
										{`${item.cashoncashreturn.toFixed(2)}%`}
									</div>
								</div>
							}
						</div>
					</div>
				</div> }
			</div>
			<div className="flex flex-justify-start flex-align-center address-info">
				<ListingAddressInfo isIcon={true} isCityStateOnly={isCityStateOnly} listing={item} l={l} className="property-address"/>
			</div>
		</div>
	);
};
