#!/usr/bin/env node
exports.ids = [2];
exports.modules = {

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export makeSlug */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isUrlAbsolute; });
/* unused harmony export formatExternalUrl */
/* unused harmony export getAbsoluteUrl */
function makeSlug() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var cleanName = name.replace(/[\-\s]+/g, '-').replace(/[^0-9a-zа-яїі\-]/gi, '').toLowerCase();
  return encodeURIComponent(cleanName);
}
function isUrlAbsolute(url) {
  //regex to check for absolute path uri
  var regEx = new RegExp('^[www.]|(?:[a-z]+:)?//', 'i');

  if (regEx.test(url)) {
    return true;
  }

  return false;
}
function formatExternalUrl(url) {
  if (url.match(/^https?/)) {
    return url;
  }

  return '//' + url;
}
function getAbsoluteUrl(relativeUrl) {
  return "".concat(frameworkGlobals.origin).concat(relativeUrl);
}
/*
module.exports = {
	isUrlAbsolute,
	makeSlug,
	formatExternalUrl,
	getAbsoluteUrl
};*/

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getAgriLandInfo */
/* unused harmony export getApartmentInfo */
/* unused harmony export getHospitalInfo */
/* unused harmony export getOfficeInfo */
/* unused harmony export getRetailStoreInfo */
/* unused harmony export getBuildingInfo */
/* unused harmony export getBuildingUnitInfo */
/* unused harmony export getTenantInfo */
/* unused harmony export getArea */
/* unused harmony export getLotInfo */
/* unused harmony export getBuildingRoomsInfo */
/* unused harmony export getIndustrialBuildingInfo */
/* unused harmony export getGalleryImages */
/* unused harmony export getLandCover */
/* unused harmony export getPrice */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return flattenSpecificatiions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return flattenUtilities; });
/* unused harmony export flattenAreasServed */
/* unused harmony export getAmenities */
/* unused harmony export getUnitLocation */
/* unused harmony export getMoreUnits */
/* unused harmony export showSectionCheck */
/* unused harmony export getPropertyTypeIndex */
/* unused harmony export getRatePerSquareFeet */
/* unused harmony export getAreaSquareFeet */
/* unused harmony export getRentPotential */
/* unused harmony export getImagePath */
/* unused harmony export getInvestmentCategories */
/* unused harmony export checkIfValueAdd */
/* unused harmony export getRentPotentialLabel */
/* unused harmony export isSwimmingPool */
/* unused harmony export isHOA */
/* unused harmony export isMakeOfferRequired */
/* unused harmony export getListingStatus */
/* unused harmony export checkIfOffMarketShowRequired */
/* unused harmony export getYearDuration */
/* unused harmony export getSchemaAdditionalList */
/* unused harmony export triggerListHubEvent */
/* unused harmony export getPropertyExpenses */
/* unused harmony export checkIfTenantApplyRequired */
/* unused harmony export formatAddressLineTwo */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(102);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(103);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(104);
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_concat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(105);
/* harmony import */ var lodash_concat__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_concat__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(106);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_property_details_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(107);
/* harmony import */ var _components_property_details_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_components_property_details_constants__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_static_pdp_active_tab_section_config_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(108);
var _assets_static_pdp_active_tab_section_config_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(108, 1);
/* harmony import */ var _assets_static_property_types_map_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(109);
var _assets_static_property_types_map_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(109, 1);
/* harmony import */ var _urlUtil__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(100);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(47);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }













/*
 @param buildingUnits - object
 @param unit - integer
 */

var listHubAnalytics = _config__WEBPACK_IMPORTED_MODULE_12__["default"].listHubAnalytics;
var ACRE_IN_SQFT = 43560;
var PROPERTY_TAGS_PRIORITY = ["valueadded", "bestbuy", "motivatedseller", "ownerfinanced", "rentalunit", "vacationrental", "furnishedrental", "assistedliving", "luxuryrental"];
var MAX_TAGS_TO_SHOW = 2;
var VALUE_ADD_TAG = 'valueadded';
var TYPE_SALE = 'FORSALE',
    TYPE_LEASE = 'FORLEASE';

function getPropertyListingDetails(type, buildings, buildingNumber, unit) {
  var building = lodash_findIndex__WEBPACK_IMPORTED_MODULE_2___default()(buildings, {
    'buildingNumber': buildingNumber
  }); // now fetch based on type

}

function getAgriLandInfo(details) {
  return details.property.agriLandDetails || '';
}
function getApartmentInfo(details) {
  return details.property.apartmentDetails || '';
}
function getHospitalInfo(details) {
  return details.property.hospitalDetails || '';
}
function getOfficeInfo(details) {
  var buildingUnit = getBuildingUnitInfo(details); // return details.property.officeDetails || (buildingUnit && buildingUnit.officeDetails) || '';

  return buildingUnit && buildingUnit.officeDetails || '';
}
function getRetailStoreInfo(details) {
  var buildingUnit = getBuildingUnitInfo(details); // return details.property.retailStoreDetails || (buildingUnit && buildingUnit.retailStoreDetails) || '';

  return buildingUnit && buildingUnit.retailStoreDetails || '';
}
function getBuildingInfo(details) {
  // const bnum = details.buildingNumber;
  // return _find(details.property.buildings, {'buildingNumber' : bnum});
  return lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(details.property.building) ? {} : details.property.building;
}
function getBuildingUnitInfo(details) {
  // const building = getBuildingInfo(details);
  // const bunitnum = details.buildingUnitNumber;
  // return (building && building.buildingUnits && building.buildingUnits.length > 0 && _find(building.buildingUnits, {'unitNumber' : bunitnum})) || '';
  return lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(details.selectedUnit) ? {} : details.selectedUnit;
}
function getTenantInfo(details) {
  return details.tenants;
}
function getArea(details) {
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
function getLotInfo(details) {
  // const lotNumber = details.propertyLotNumber;
  // return (details.property.lots && details.property.lots.length > 0 && _find(details.property.lots, { 'lotNumber' : lotNumber})) || '';
  return details.selectedLot || '';
}
function getBuildingRoomsInfo(details) {
  return details.property.hotelRooms && details.property.hotelRooms.length > 0 && details.property.hotelRooms || [];
}

function getBuildingRoomsImages(details) {
  var rooms = getBuildingRoomsInfo(details);

  if (!rooms || rooms.length < 0) {
    return [];
  }

  var imgArr = lodash_map__WEBPACK_IMPORTED_MODULE_3___default()(rooms, 'images');

  var flattenArray = imgArr && imgArr.length > 0 && imgArr.reduce(function (a, b) {
    return b && a.concat(b);
  });
  return lodash_uniq__WEBPACK_IMPORTED_MODULE_5___default()(flattenArray);
}

function getIndustrialBuildingInfo(details) {
  // const building = getBuildingInfo(details);
  return details.property && details.property.industrialBuildingDetails || '';
}
/*
	@param type - String
 	@param buildings - Object
 	@param buildings - Integer
 	@param buildings - Integer
 */

function getGalleryImages(type, details, unit) {
  if (!details) {
    return;
  }

  var imageURL = [];
  var prop_type = details.property.type;
  var propertyLevel = details.property && details.property.images || [];

  if (prop_type !== 'LAND' && prop_type !== 'AGRICULTURAL') {
    var interiorLevel = details.interiorImages || [];
    var building = details.selectedUnit || {};
    var unitLevel = [];

    if (building) {
      unitLevel = building.images || [];
    }

    var roomsImages = getBuildingRoomsImages(details);
    return lodash_concat__WEBPACK_IMPORTED_MODULE_6___default()(imageURL, propertyLevel, interiorLevel, unitLevel, roomsImages);
  }

  return propertyLevel;
}
/*
	@param details - object
	@param unit - integer
 */

function getBuildingUnitCover(details, unitNumber) {
  var unit = getBuildingUnit(details.buildings.buildingUnits, unitNumber); // get unit image , if not get property image

  if (unit.imageUrls && unit.imageUrls.length > 0) {
    return unit.imageUrls[0];
  }

  return details.imageUrls[0] || '';
}

function getLandCover(details) {
  return details.imageUrls[0] || '';
}
function getPrice(details) {
  if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(details)) {
    return {};
  }

  if (details.type === 'FORSALE') {
    return _objectSpread({
      price: details.salePrice.askingPrice
    }, details.salePrice);
  } else if (details.type === 'FORLEASE') {
    return _objectSpread({}, details.leasePrice, {
      price: details.leasePrice.price
    });
  } else {
    return _objectSpread({
      price: details.bidPrice.bidStartPrice
    }, details.bidPrice);
  }
}
function flattenSpecificatiions(specs) {
  return specs.join(', ');
}
function flattenUtilities(utils, l) {
  return utils.map(function (item) {
    return l(item.toUpperCase());
  }).join(', ');
}
function flattenAreasServed(areas, l) {
  return areas.map(function (area) {
    return l(area.locality);
  }).join(', ');
}
function getAmenities(property) {
  var propertyDetails, ameneties;

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
function getUnitLocation() {}
function getMoreUnits() {}
function showSectionCheck(page, detail, attr) {
  if (!_assets_static_pdp_active_tab_section_config_json__WEBPACK_IMPORTED_MODULE_9__[page][attr]) {
    return false;
  }

  for (var i = 0; i < _assets_static_pdp_active_tab_section_config_json__WEBPACK_IMPORTED_MODULE_9__[page][attr].length; i++) {
    if (detail && detail[_assets_static_pdp_active_tab_section_config_json__WEBPACK_IMPORTED_MODULE_9__[page][attr][i]] && !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_7___default()(detail[_assets_static_pdp_active_tab_section_config_json__WEBPACK_IMPORTED_MODULE_9__[page][attr][i]])) {
      return true;
    }
  }

  return false;
}
function getPropertyTypeIndex(type) {
  return lodash_findIndex__WEBPACK_IMPORTED_MODULE_2___default()(_assets_static_property_types_map_json__WEBPACK_IMPORTED_MODULE_10__[/* propertytypes */ "a"], {
    'code': type
  });
}
function getRatePerSquareFeet(details) {
  var priceDetails = getPrice(details),
      area = details.listingArea,
      areaUom = details.listingAreaUOM;

  if (priceDetails.disclosePrice === false || !area) {
    return 0;
  }

  if (areaUom === 'ACRE') {
    return priceDetails.price / (area * ACRE_IN_SQFT);
  }

  return priceDetails.price / area;
}
function getAreaSquareFeet(details) {
  var listingArea = details.listingArea,
      listingAreaUOM = details.listingAreaUOM;

  if (listingAreaUOM === 'ACRE') {
    return listingArea * ACRE_IN_SQFT;
  }

  return listingArea;
}
function getRentPotential(details) {
  var priceDetails = getPrice(details);

  if (priceDetails.propertyFinancials) {
    return priceDetails.propertyFinancials.predictedGrossRentRevenue;
  }

  return undefined;
}
function getImagePath(awsImagePath, imageUri) {
  if (Object(_urlUtil__WEBPACK_IMPORTED_MODULE_11__[/* isUrlAbsolute */ "a"])(imageUri)) {
    return imageUri;
  }

  return "".concat(awsImagePath, "/").concat(imageUri);
}
function getInvestmentCategories() {
  var categories = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var selectedCategory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!categories.length) {
    return false;
  }

  categories = categories.map(function (c) {
    return c.toLowerCase();
  });
  var tagsToShow = [];

  for (var i = 0; i < PROPERTY_TAGS_PRIORITY.length; i++) {
    if (categories.indexOf(PROPERTY_TAGS_PRIORITY[i]) >= 0 && PROPERTY_TAGS_PRIORITY[i] !== selectedCategory) {
      tagsToShow.push(PROPERTY_TAGS_PRIORITY[i]);
    }

    if (tagsToShow.length === MAX_TAGS_TO_SHOW) {
      break;
    }
  }

  return tagsToShow.length ? tagsToShow : '';
}
function checkIfValueAdd(tags) {
  if (!tags) {
    return false;
  }

  tags = tags.map(function (tag) {
    return tag.toLowerCase();
  });
  return tags.indexOf(VALUE_ADD_TAG) >= 0;
}
function getRentPotentialLabel(tags) {
  if (checkIfValueAdd(tags)) {
    return "RENTPOTENTIALONFIXUP";
  }

  return "RENTPOTENTIAL";
}
function isSwimmingPool() {
  var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (details.property && details.property.apartmentDetails && details.property.apartmentDetails.utilities) {
    return details.property.apartmentDetails.utilities.indexOf("SWIMMINGPOOL") >= 0;
  }

  return false;
}
function isHOA() {
  var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (details.salePrice && details.salePrice.propertyFinancials && details.salePrice.propertyFinancials.ownerAssociationFee) {
    return true;
  }

  return false;
}
function isMakeOfferRequired() {
  var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (details.type === TYPE_LEASE || details.status !== 'ACTIVE') {
    return false;
  }

  return true;
}
function getListingStatus() {
  var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (details.type === TYPE_LEASE && details.status === 'CLOSED') {
    return 'LEASED';
  }

  return details.status;
}
function checkIfOffMarketShowRequired() {
  var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var user = arguments.length > 1 ? arguments[1] : undefined;

  if (user.user.id === details.ownedByUserId) {
    return true;
  }

  if (details.status === 'ACTIVE') {
    return true;
  }

  return false;
}
function getYearDuration(year) {
  return new Date().getFullYear() - Number(year);
}
function getSchemaAdditionalList(additionalList, l, label) {
  additionalList = additionalList && additionalList.map(function (spec) {
    return [label, l(spec.toUpperCase())];
  });

  if (additionalList && additionalList.length) {
    return additionalList;
  } else {
    return '';
  }
}
function triggerListHubEvent(eventName, mlsListing, data) {
  if (listHubAnalytics.isEnableListHubAnalytics && (mlsListing || data)) {
    lh('submit', eventName, data ? data : {
      lkey: mlsListing.listingKey
    });
  }
}
function getPropertyExpenses() {
  return [{
    "key": "leasingFees",
    "label": "LEASINGFEES"
  }, {
    "key": "managementFees",
    "label": "MANAGEMENTFEES"
  }, {
    "key": "propertyMaintenance",
    "label": "PROPERTYMAINTENANCE"
  }, {
    "key": "ownerAssociationFee",
    "label": "OWNERASSOCIATIONFEE"
  }, {
    "key": "propertyTaxes",
    "label": "PROPERTYTAXES"
  }, {
    "key": "propertyInsurance",
    "label": "PROPERTYINSURANCE"
  }, {
    "key": "otherExpenses",
    "label": "OTHEREXPENSES"
  }];
}
function checkIfTenantApplyRequired(details) {
  var priceDetails = getPrice(details);

  if (details.type === TYPE_LEASE && details.status === 'ACTIVE' && priceDetails.acceptRentalApplication) {
    return true;
  }

  return false;
}
function formatAddressLineTwo(lineTwo) {
  if (!isNaN(lineTwo) || lineTwo.length === 1) {
    return "#".concat(lineTwo);
  }

  return lineTwo;
}

/***/ }),

/***/ 107:
/***/ (function(module, exports) {

module.exports = {
  'FORSALE': 'salePrice',
  'FORLEASE': 'leasePrice',
  'HOTEL': 'buildingRooms',
  'RETAIL': 'retailStoreDetails',
  'AGRICULTURAL': 'agriLandDetails',
  'INDUSTRIAL': 'industrialBuildingDetails',
  'RESIDENTIAL': 'apartmentDetails',
  'HEALTHCARE': 'hospitalDetails',
  'OFFICE': 'officeDetails'
};

/***/ }),

/***/ 108:
/***/ (function(module) {

module.exports = JSON.parse("{\"listing\":{\"features\":[\"highlights\",\"utilities\"],\"similarListings\":[\"data\"],\"documents\":[\"documents\",\"floorPlans\"],\"videos\":[\"videoLinks\"],\"externalLinks\":[\"externalLinks\"],\"schools\":[\"schools\"],\"medianPriceStatics\":[\"medianPriceStatics\"]},\"realtor\":{\"specialties\":[\"specialties\",\"areasOfExpertise\"],\"listings\":[\"data\"],\"articles\":[\"data\"],\"about\":[\"about\",\"websites\"]},\"brokeragefirm\":{\"recentListings\":[\"data\"],\"cashFlowListings\":[\"data\"],\"realtors\":[\"data\"],\"about\":[\"about\",\"websites\"],\"specialties\":[\"specialties\",\"areasOfExpertise\"],\"areasServed\":[\"areasServed\",\"areasServed\"]},\"company\":{\"specialties\":[\"professionTypes\"],\"professionals\":[\"professionals\"]},\"professional\":{\"specialties\":[\"professions\",\"areasOfExpertise\"],\"about\":[\"about\",\"websites\"]}}");

/***/ }),

/***/ 109:
/***/ (function(module) {

module.exports = JSON.parse("{\"a\":[{\"name\":\"healthcare\",\"code\":\"healthcare\",\"value\":\"healthcare\",\"description\":\"\",\"icon-class\":\"pe-7s-health-care\"},{\"name\":\"agricultural\",\"code\":\"agricultural\",\"value\":\"agricultural\",\"description\":\"\",\"icon-class\":\"pe-7s-agricultural\"},{\"name\":\"industrial\",\"code\":\"industrial\",\"value\":\"industrial\",\"description\":\"\",\"icon-class\":\"pe-7s-industrial\"},{\"name\":\"retail\",\"code\":\"retail\",\"value\":\"retail\",\"description\":\"\",\"icon-class\":\"pe-7s-retail\"},{\"name\":\"office\",\"code\":\"office\",\"value\":\"office\",\"description\":\"\",\"icon-class\":\"pe-7s-office\"},{\"name\":\"residential\",\"code\":\"residential\",\"value\":\"residential\",\"description\":\"\",\"icon-class\":\"pe-7s-residential\"},{\"name\":\"land\",\"code\":\"land\",\"value\":\"land\",\"description\":\"\",\"icon-class\":\"pe-7s-land\"},{\"name\":\"hotel\",\"code\":\"hotel\",\"value\":\"hotel\",\"description\":\"\",\"icon-class\":\"pe-7s-lodging\"},{\"name\":\"food_dining\",\"code\":\"food_dining\",\"value\":\"food_dining\",\"description\":\"\",\"icon-class\":\"pe-7s-fooddining\"},{\"name\":\"multi_family\",\"code\":\"multi_family\",\"value\":\"multi_family\",\"description\":\"\",\"icon-class\":\"pe-7s-multifamily\"},{\"name\":\"special_purpose\",\"code\":\"special_purpose\",\"value\":\"special_purpose\",\"description\":\"\",\"icon-class\":\"pe-7s-specialpurpose\"},{\"name\":\"other\",\"code\":\"other\",\"value\":\"other\",\"description\":\"\",\"icon-class\":\"pe-7s-others\"}]}");

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return uniqueId; });
var uidCounter = 0,
    maxUid = 10000000000; // used to loop server side since a server could run for a long time

/**
 * @description Creates a unique id which then can be used for forms without worrying
 *              about id collision
 * @returns {string} id used for labels
 */

function uniqueId() {
  uidCounter = (uidCounter + 1) % maxUid;
  return 'uid_' + uidCounter.toString(36);
}
/*module.exports = uniqueId;*/

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return connectDataFetchers; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var IS_FIRST_MOUNT_AFTER_LOAD = true;
function connectDataFetchers(Component) {
  var _class, _temp;

  var actionCreators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var firstLoad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var customProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(DataFetchersWrapper, _Component);

    function DataFetchersWrapper() {
      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, DataFetchersWrapper);

      return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(DataFetchersWrapper).apply(this, arguments));
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(DataFetchersWrapper, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var location = this.props.location;
        var prevLocation = prevProps.location;
        var isUrlChanged = location.pathname !== prevLocation.pathname || location.search !== prevLocation.search;

        if (isUrlChanged) {
          this._fetchDataOnClient();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (firstLoad || !IS_FIRST_MOUNT_AFTER_LOAD) {
          this._fetchDataOnClient();
        }

        IS_FIRST_MOUNT_AFTER_LOAD = false;
      }
    }, {
      key: "_fetchDataOnClient",
      value: function _fetchDataOnClient() {
        var locale = this.context.i18n ? this.context.i18n.getLocale() : 'en';
        DataFetchersWrapper.fetchData({
          locale: locale,
          dispatch: this.props.dispatch,
          params: this.props.params,
          query: this.props.location.query
        });
      }
    }, {
      key: "render",
      value: function render() {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, this.props, customProps));
      }
    }], [{
      key: "fetchData",
      value: function fetchData(_ref) {
        var dispatch = _ref.dispatch,
            _ref$params = _ref.params,
            params = _ref$params === void 0 ? {} : _ref$params,
            _ref$query = _ref.query,
            query = _ref$query === void 0 ? {} : _ref$query,
            locale = _ref.locale;
        return Promise.all(actionCreators.map(function (actionCreator) {
          return dispatch(actionCreator(_objectSpread({
            params: params,
            query: query,
            locale: locale
          }, customProps)));
        }));
      }
    }]);

    return DataFetchersWrapper;
  }(Component), _class.contextTypes = {
    i18n: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object,
    router: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object
  }, _class.propTypes = {
    dispatch: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func.isRequired,
    params: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object.isRequired,
    location: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.shape({
      pathname: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string.required,
      search: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string,
      query: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string.object
    }).isRequired
  }, _temp;
}

/***/ })

};;