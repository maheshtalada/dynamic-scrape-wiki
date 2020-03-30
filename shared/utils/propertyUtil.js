import { find as _find, findIndex as _findIndex, map as _map, extend as _extend, uniq as _uniq, concat as _concat, isEmpty as _isEmpty } from 'lodash';
import { FORSALE, FORLEASE, HOTEL, RETAIL, RESIDENTIAL, INDUSTRIAL, HEALTHCARE, AGRICULTURAL, OFFICE } from '../components/property-details/constants';
import showSectionConfig from '../assets/static/pdp-active-tab-section-config.json';
import { propertytypes } from '../assets/static/property-types-map.json';
import { isUrlAbsolute } from './urlUtil';
import ListhubAnalytics from '../config';
/*
 @param buildingUnits - object
 @param unit - integer
 */
const { listHubAnalytics } = ListhubAnalytics;
const ACRE_IN_SQFT = 43560;

const PROPERTY_TAGS_PRIORITY = ["valueadded","bestbuy","motivatedseller","ownerfinanced","rentalunit", "vacationrental","furnishedrental","assistedliving","luxuryrental"];
const MAX_TAGS_TO_SHOW = 2;
const VALUE_ADD_TAG = 'valueadded';
const TYPE_SALE = 'FORSALE',
	TYPE_LEASE = 'FORLEASE';

function getPropertyListingDetails(type, buildings, buildingNumber, unit) {
	const building = _findIndex(buildings, {'buildingNumber' : buildingNumber});
	// now fetch based on type

}

export function getAgriLandInfo(details) {
	return details.property.agriLandDetails || '';
}

export function getApartmentInfo(details) {
	return details.property.apartmentDetails || '';
}

export function getHospitalInfo(details) {
	return details.property.hospitalDetails || '';
}

export function getOfficeInfo(details) {
	const buildingUnit = getBuildingUnitInfo(details);
	// return details.property.officeDetails || (buildingUnit && buildingUnit.officeDetails) || '';
	return (buildingUnit && buildingUnit.officeDetails) || '';
}

export function getRetailStoreInfo(details) {
	const buildingUnit = getBuildingUnitInfo(details);
	// return details.property.retailStoreDetails || (buildingUnit && buildingUnit.retailStoreDetails) || '';
	return (buildingUnit && buildingUnit.retailStoreDetails) || '';
}

export function getBuildingInfo(details) {
	// const bnum = details.buildingNumber;
	// return _find(details.property.buildings, {'buildingNumber' : bnum});
	return _isEmpty(details.property.building) ? {} : details.property.building;
}

export function getBuildingUnitInfo(details) {
	// const building = getBuildingInfo(details);
	// const bunitnum = details.buildingUnitNumber;
	// return (building && building.buildingUnits && building.buildingUnits.length > 0 && _find(building.buildingUnits, {'unitNumber' : bunitnum})) || '';
	return _isEmpty(details.selectedUnit) ? {} : details.selectedUnit;
}

export function getTenantInfo(details) {
	return details.tenants;
}

export function getArea(details) {
	// const building = getBuildingInfo(details);
	// const buildingUnit = getBuildingUnitInfo(details);
	// if (buildingUnit && buildingUnit.totalArea && buildingUnit.totalArea > 0) {
	// 	return buildingUnit.totalArea;
	// } else if (building && building.totalArea && building.totalArea > 0) {
	// 	return building.totalArea;
	// } else if (details.property.totalArea && details.property.totalArea > 0) {
	// 	return details.property.totalArea;
	// }
	// return 0;
	return details.listingArea || 0;
}

export function getLotInfo(details) {
	// const lotNumber = details.propertyLotNumber;
	// return (details.property.lots && details.property.lots.length > 0 && _find(details.property.lots, { 'lotNumber' : lotNumber})) || '';
	return details.selectedLot || '';
}

export function getBuildingRoomsInfo(details) {
	return (details.property.hotelRooms && details.property.hotelRooms.length > 0 && details.property.hotelRooms) || [];
}

function getBuildingRoomsImages(details) {
	const rooms = getBuildingRoomsInfo(details);
	if(!rooms || rooms.length <0 ) {
		return [];
	}
	const imgArr = _map(rooms, 'images');
	const flattenArray = imgArr && imgArr.length > 0 && imgArr.reduce((a, b) => {
		return b && a.concat(b);
	});

	return _uniq(flattenArray);
}

export function getIndustrialBuildingInfo(details) {
	// const building = getBuildingInfo(details);
	return ( details.property && details.property.industrialBuildingDetails) || '';
}

/*
	@param type - String
 	@param buildings - Object
 	@param buildings - Integer
 	@param buildings - Integer
 */
export function getGalleryImages(type, details , unit) {
	if(!details) {
		return;
	}
	let imageURL = [];
	const prop_type = details.property.type;

	const propertyLevel = details.property && details.property.images || [];

	if(prop_type !== 'LAND' && prop_type !== 'AGRICULTURAL') {
		const interiorLevel = details.interiorImages || [];
		const building = details.selectedUnit || {};
		let unitLevel = [];
		if(building) {
			unitLevel = building.images || [];
		}
		const roomsImages = getBuildingRoomsImages(details);
		return _concat(imageURL,propertyLevel,interiorLevel,unitLevel,roomsImages);
	}

	return propertyLevel;
}

/*
	@param details - object
	@param unit - integer
 */
function getBuildingUnitCover(details,unitNumber) {
	const unit = getBuildingUnit(details.buildings.buildingUnits, unitNumber);
	// get unit image , if not get property image
	if(unit.imageUrls && unit.imageUrls.length > 0 ) {
		return unit.imageUrls[0];
	}

	return details.imageUrls[0] || '';
}

export function getLandCover(details) {
	return details.imageUrls[0] || '';
}

export function getPrice(details) {
	if(_isEmpty(details)) {
		return {};
	}
	if(details.type === 'FORSALE') {
		return {
			price : details.salePrice.askingPrice,
			...details.salePrice
		};
	}else if(details.type === 'FORLEASE') {
		return {
			...details.leasePrice,
			price : details.leasePrice.price
		};
	}else {
		return {
			price : details.bidPrice.bidStartPrice,
			...details.bidPrice
		};
	}
}

export function flattenSpecificatiions(specs) {
	return specs.join(', ');
}

export function flattenUtilities(utils,l) {
	return (utils.map((item) => {
		return l(item.toUpperCase());
	})).join(', ');
}

export function flattenAreasServed(areas,l) {
	return (areas.map(area=>{
		return l(area.locality);
	})).join(', ');
}

export function getAmenities(property) {

	let propertyDetails, ameneties;

	if (property.property.type == 'RESIDENTIAL') {
		propertyDetails = getApartmentInfo(property);
		ameneties = propertyDetails.utilities;
		return ameneties && ameneties.length > 0 ? ameneties : [];
	}
	if (property.property.type == 'HEALTHCARE') {
		propertyDetails = getHospitalInfo(property);
		ameneties = propertyDetails.utilities;
		return ameneties && ameneties.length > 0 ? ameneties : [];
	}
	if (property.property.type == 'INDUSTRIAL') {
		propertyDetails = getIndustrialBuildingInfo(property);
		ameneties = propertyDetails.utilities;
		return ameneties && ameneties.length > 0 ? ameneties : [];
	}
	if (property.property.type == 'OFFICE') {
		propertyDetails = getOfficeInfo(property);
		ameneties = propertyDetails.utilities;
		return ameneties && ameneties.length > 0 ? ameneties : [];
	}
	if (property.property.type == 'AGRICULTURAL') {
		propertyDetails = getAgriLandInfo(property);
		ameneties = propertyDetails.utilities;
		return ameneties && ameneties.length > 0 ? ameneties : [];
	}

	if (property.property.type == 'RETAIL') {
		propertyDetails = getRetailStoreInfo(property);
		ameneties = propertyDetails.utilities;
		return ameneties && ameneties.length > 0 ? ameneties : [];
	}

	if (property.property.type == 'HOTEL') {
		propertyDetails = getBuildingRoomsInfo(property);
		ameneties = propertyDetails.utilities;
		return ameneties && ameneties.length > 0 ? ameneties : [];
	}
}

export function getUnitLocation() {

}

export function getMoreUnits() {

}

export function showSectionCheck(page,detail,attr) {
	if(!showSectionConfig[page][attr]) {
		return false;
	}
	for(let i=0 ; i<showSectionConfig[page][attr].length ; i++) {
		if(detail && detail[showSectionConfig[page][attr][i]] && (!_isEmpty(detail[showSectionConfig[page][attr][i]])))			{
			return true;
		}
	}
	return false;
}

export function getPropertyTypeIndex(type) {
	return _findIndex(propertytypes, { 'code' : type});
}

export function getRatePerSquareFeet(details) {
	const priceDetails = getPrice(details),
		area = details.listingArea,
		areaUom = details.listingAreaUOM;
	if(priceDetails.disclosePrice === false || !area) {
		return 0;
	}
	if(areaUom === 'ACRE') {
		return priceDetails.price/(area*ACRE_IN_SQFT);
	}
	return priceDetails.price/area;
}

export function getAreaSquareFeet(details) {
	const { listingArea,listingAreaUOM}  = details;
	if(listingAreaUOM === 'ACRE') {
		return (listingArea*ACRE_IN_SQFT);
	}
	return listingArea;
}

export function getRentPotential(details) {
	const priceDetails = getPrice(details);
	if(priceDetails.propertyFinancials) {
		return priceDetails.propertyFinancials.predictedGrossRentRevenue;
	}
	return undefined;
}

export function getImagePath(awsImagePath,imageUri) {
	if(isUrlAbsolute(imageUri)) {
		return imageUri;
	}
	return `${awsImagePath}/${imageUri}`;
}

export function getInvestmentCategories(categories=[],selectedCategory='') {
	if(!categories.length) {
		return false;
	}
	categories = categories.map(c => c.toLowerCase());
	let tagsToShow = [];
	for(let i=0; i<PROPERTY_TAGS_PRIORITY.length; i++) {
		if(categories.indexOf(PROPERTY_TAGS_PRIORITY[i]) >= 0 && PROPERTY_TAGS_PRIORITY[i] !== selectedCategory) {
			tagsToShow.push(PROPERTY_TAGS_PRIORITY[i]);
		}
		if(tagsToShow.length === MAX_TAGS_TO_SHOW) {
			break;
		}
	}
	return tagsToShow.length ? tagsToShow : '';
}

export function checkIfValueAdd(tags) {
	if(!tags) {
		return false;
	}
	tags = tags.map(tag => tag.toLowerCase());
	return tags.indexOf(VALUE_ADD_TAG) >= 0;
}

export function getRentPotentialLabel(tags) {
	if(checkIfValueAdd(tags)) {
		return "RENTPOTENTIALONFIXUP";
	}
	return "RENTPOTENTIAL"
}

export function isSwimmingPool(details={}) {
	if(details.property && details.property.apartmentDetails && details.property.apartmentDetails.utilities) {
		return details.property.apartmentDetails.utilities.indexOf("SWIMMINGPOOL") >= 0;
	}
	return false;
}

export function isHOA(details={}) {
	if(details.salePrice && details.salePrice.propertyFinancials && details.salePrice.propertyFinancials.ownerAssociationFee) {
		return true;
	}
	return false;
}

export function isMakeOfferRequired(details={}) {
	if(details.type === TYPE_LEASE || details.status !== 'ACTIVE') {
		return false;
	}
	return true;
}

export function getListingStatus(details={}) {
	if(details.type === TYPE_LEASE && details.status === 'CLOSED') {
		return 'LEASED'
	}
	return details.status;
}

export function checkIfOffMarketShowRequired(details={},user) {
	if(user.user.id === details.ownedByUserId) {
		return true;
	}
	if(details.status === 'ACTIVE') {
		return true;
	}
	return false;
}

export function getYearDuration(year) {
	return (new Date()).getFullYear() - Number(year);
}

export function getSchemaAdditionalList(additionalList, l, label) {
	additionalList = additionalList && additionalList.map(spec => [label , l(spec.toUpperCase())])
	if(additionalList && additionalList.length){
		return additionalList;
	}else {
		return '';
	}

}

export function triggerListHubEvent(eventName,mlsListing,data) {
	if(listHubAnalytics.isEnableListHubAnalytics && (mlsListing || data)) {
		lh('submit', eventName, data ? data : {lkey: mlsListing.listingKey});
	}
}

export function getPropertyExpenses() {
	return [{
		"key" : "leasingFees",
		"label" : "LEASINGFEES"
	},
	{
		"key" : "managementFees",
		"label" : "MANAGEMENTFEES"
	},
	{
		"key" : "propertyMaintenance",
		"label" : "PROPERTYMAINTENANCE"
	},
	{
		"key" : "ownerAssociationFee",
		"label" : "OWNERASSOCIATIONFEE"
	},
	{
		"key" : "propertyTaxes",
		"label" : "PROPERTYTAXES"
	},
	{
		"key" : "propertyInsurance",
		"label" : "PROPERTYINSURANCE"
	},
	{
		"key" : "otherExpenses",
		"label" : "OTHEREXPENSES"
	}];
}

export function checkIfTenantApplyRequired (details) {
	const priceDetails = getPrice(details);
	if(details.type === TYPE_LEASE && details.status === 'ACTIVE' && priceDetails.acceptRentalApplication) {
		return true;
	}
	return false;
}

export function formatAddressLineTwo(lineTwo) {
	if(!isNaN(lineTwo) || lineTwo.length === 1) {
		return `#${lineTwo}`;
	}
	return lineTwo;
}

