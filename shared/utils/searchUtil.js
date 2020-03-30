import APPCONSTANTS from './app-constants';
import { find,findIndex as _findIndex, sortBy as _sortBy, includes as _includes } from 'lodash';
import moment from 'moment';
import cookie from 'react-cookie';
import { getValueByLocale, localeNumberFormat, handleLargeNumbers } from './localeUtil';
import SITECONFIG from '../config';

const { cookies } = SITECONFIG;
const { GRID_VIEW, MAP_VIEW, LIST_VIEW, PARTIAL_SEARCH_ATTRIBUTE, PARTIAL_SEARCH_ATTRIBUTE_CONTENT } = APPCONSTANTS;
const IGNORE_TYPES = ['q','bound','sort','sortorder','page'];
const ACRE_IN_SQFT = 43560;
const MIN_ACRE_VALUE = 0.5;
const MIN_SQFT_VALUE = 21780;
const ACRE_TYPE = 'acre';
const SQFT_TYPE = 'sqft';
const MIN_VIEWPORT_RADIUS = 2;
const MAX_VIEWPORT_RADIUS = 50;
const EARTH_RADIUS_KM = 6371;
const RANGE_STEPS = 5;
const TYPE_SALE = 'forsale';
const TYPE_LEASE = 'forlease';
const RESIDENTIAL_LAND = 'residential_land';
const MIN_CAPRATE = 3;
const MAX_CAPRATE = 10;
const MIN_CASHONCASH = 0;
const MAX_CASHONCASH = 15;
const CAPRATE_EXCLUDE_PROPERTY_TAGS = ['valueadded'];
const THRESHOLD_DAYS = 60;

const CONTEXT_TYPE_LOOKUP = [
	{
		"types" : ["SINGLE_FAMILY_HOME", "TOWNHOME", "GARDEN_HOME"],
		"mappedType" : "SingleFamilyResidence"
	},
	{
		"types" : ["RESIDENTIAL_APARTMENT", "LOFT_STYLE", "CONDO"],
		"mappedType" : "Apartment"
	},
	{
		"types" : ["RESIDENTIAL_LAND"],
		"mappedType" : "Place"
	}
];

export function getMicroDataContext(type) {
	const contextType =  find(CONTEXT_TYPE_LOOKUP , o => _includes(o.types, type));
	return contextType && contextType.mappedType || "House";
}

export function getAdditionalMicrodata(data, l='') {
	return data.map( prop => ({
			"@type" : "PropertyValue",
			"name" : prop[0],
			"value" : l && l(prop[1]) || prop[1]
		}
	))
}

// genarate facet query filters
// collect values which have the valid values & not all
export function buildQueryObject(object , facet=[]) {
	facet = Array.isArray(facet) && facet || [facet];
	let qObj={};
	Object.keys(object).forEach((key) => {
		if( object[key] !== '' && facet.indexOf(key) < 0 ) {
			qObj[key] = object[key];
		}
	});
	return qObj;
}

export function getPageData(page, data) {
	let pageData = [];
	if(!data.length) {
		return pageData;
	}
	const dataIndex = _findIndex(data, { page : page});
	if(dataIndex > -1) {
		return data[dataIndex].data;
	}
	return [];
}

export function getFacetRanges(range, min, max) {
	if(range !== '') {
		let list = range.split('-');
		if(list[0] === '') {
			list[0] = min;
		}
		if(list[1] === '') {
			list[1] = max;
		}
		return [list[0], list[1]];
	}
	return [min, max];
}

export function getSliderValue(value, max) {
	if(value !== '') {
		return value;
	}
	return max;
}

export function genarateAppliedFacets(selectedFacets, facetConfigObject, aggregations, ignoreFacets) {
	let qObj=[];
	Object.keys(selectedFacets).forEach((key) => {
		if(selectedFacets[key] != 'all' && IGNORE_TYPES.indexOf(key) < 0 && facetConfigObject.hasOwnProperty(key)) {
			const list = selectedFacets[key].split(',');
			const aggregation = find(aggregations,{ name : key}) || {};
			const aggregationBuckets = aggregation && aggregation.buckets;
			const aggsWithBuckets = aggregations.filter(agg => !!agg.buckets);
			const flatBucketAggregations = generateFlatBucketAggregations(aggsWithBuckets);
			if(list.length > 1 ) {

				for(let i=0;i<list.length;i++) {
					if(flatBucketAggregations[key] && flatBucketAggregations[key].indexOf(list[i]) > -1) {
						qObj.push({
							'name' : facetConfigObject[key].label,
							'type' : facetConfigObject[key].type,
							'facet' : key,
							'value' : list[i],
							'isChecked' : false,
							'siblings' : aggregationBuckets,
							'order' : facetConfigObject[key].order,
							'minAggValue' : aggregation.minimum,
							'maxAggValue' : aggregation.maximum,
							'valueHandler' : facetConfigObject[key].data && facetConfigObject[key].data.valueHandler
						});
					} else {
						qObj.push({
							'name' : facetConfigObject[key].label,
							'type' : facetConfigObject[key].type,
							'facet' : key,
							'value' : list[i],
							'isChecked' : false,
							'order' : facetConfigObject[key].order,
							'minAggValue' : aggregation.minimum,
							'maxAggValue' : aggregation.maximum,
							'valueHandler' : facetConfigObject[key].data && facetConfigObject[key].data.valueHandler
						});
					}
				}
			} else {
				qObj.push({
					'name' : facetConfigObject[key].label,
					'type':facetConfigObject[key].type,
					'facet' : key,
					'value' : selectedFacets[key],
					'isChecked' : false,
					'order' : facetConfigObject[key].order,
					'minAggValue' : aggregation.minimum,
					'maxAggValue' : aggregation.maximum,
					'valueHandler' : facetConfigObject[key].data && facetConfigObject[key].data.valueHandler
				});
			}

		}
	});
	if(ignoreFacets) {
		return qObj.filter(facet => ignoreFacets.indexOf(facet.facet) < 0);
	}
	return qObj;
}

export function generateFlatBucketAggregations(aggregations,flatBucketAggregations={}) {
	if(!aggregations) {
		return;
	}
	aggregations.map(agg => {
		flatBucketAggregations[agg.name] = flatBucketAggregations[agg.name] || [];
		agg.buckets.map(b => {
			flatBucketAggregations[agg.name].push(b.key);
			return generateFlatBucketAggregations(b.children,flatBucketAggregations);
		});
	});
	return flatBucketAggregations;
}

export function genarateClasses(toggleFilter, viewFlg) {

	if(viewFlg === LIST_VIEW) {
		return {
			[LIST_VIEW] : {
				'wrapper' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
				'children' : 'col-lg-12 col-md-8 col-sm-12 col-xs-12'
			}
		};
	}else if(viewFlg === MAP_VIEW ) {
		return {
			[MAP_VIEW] : {
				'wrapper' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
				'children' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
			}
		};
	} else if(viewFlg === GRID_VIEW ) {
		return {
			[GRID_VIEW] : {
				'wrapper' : 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
				'children' : 'col-lg-6 col-md-6 col-sm-6 col-xs-12'
			}
		};
	}
}

export function getMapMarkerInfoStyle(mapWidth, mapHeight, markerDim, markerInfoWidth, markerInfoHeight) {
	const topOffset = markerDim.height+2;
	//position bottom right
	if((markerDim.x + markerInfoWidth < mapWidth) && (markerDim.y + topOffset + markerInfoHeight < mapHeight)) {
		return {
			style : {
				top: `${topOffset}px`
			},
			posClass : 'bottom-right'
		}
	}
	//position top left
	if((markerDim.x + markerInfoWidth > mapWidth) && (markerDim.y + topOffset + markerInfoHeight > mapHeight )) {
		return {
			style : {
				bottom: `${topOffset}px`
			},
			posClass : 'top-left'
		}
	}
	//position bottom left
	if((markerDim.x + markerInfoWidth > mapWidth) && (markerDim.y + topOffset + markerInfoHeight < mapHeight)) {
		return {
			style : {
				top: `${topOffset}px`
			},
			posClass : 'bottom-left'
		}
	}
	//position top right
	if((markerDim.x + markerInfoWidth < mapWidth) && (markerDim.y + topOffset + markerInfoHeight > mapHeight)) {
		return {
			style : {
				bottom: `${topOffset}px`
			},
			posClass : 'top-right'
		}
	}
	return {};
}

export function isFething(prev, next) {
	if(next) {
		return true;
	}

	if(!prev && !next) {
		return true;
	}

	if(!next) {
		return false;
	}
}

export function getPostedOndate(createdOn, country, formate='') {
	let localTime = moment.utc(createdOn).toDate();
	return moment(localTime).format( formate ? formate :getValueByLocale(country,'dateFormat'));
}

export function getDaysSince(createdOn) {
	const a = moment(createdOn);
	const b = moment();
	return b.diff(a,'days');
}

export function getPartialSearchAttribute(type) {
	return (type === 'content' ? PARTIAL_SEARCH_ATTRIBUTE_CONTENT : PARTIAL_SEARCH_ATTRIBUTE )
}

export function sortFacetsByOrder(facets) {
	return _sortBy(facets,facet => facet.order);
}

export function getSearchResultArea(item,country,l) {
	if(!!item.acre) {
		return formatArea(item.acre,l,country,'acre');
	}
	if(!!item.area) {
		return formatArea(item.area,l,country,'sqft');
	}
	return '';
}

export function formatArea(value,l,country,type=SQFT_TYPE,decimals=2) {
	value = Number(value);
	if(!value) {
		return '';
	}
	if(type.toLowerCase() === ACRE_TYPE) {
		if(value < MIN_ACRE_VALUE) {
			const valueInSqft = value*ACRE_IN_SQFT;
			return {
				formattedValue : localeNumberFormat(valueInSqft.toFixed(0),country),
				uom : l('SQFT')
			};
		}
		return {
			formattedValue : localeNumberFormat(value.toFixed(decimals),country),
			uom : l('ACRE')
		};
	}
	if(value < MIN_SQFT_VALUE) {
		return {
			formattedValue : localeNumberFormat(value.toFixed(0),country),
			uom : l('SQFT')
		};
	}
	const valueInAcres = value/ACRE_IN_SQFT;
	return {
		formattedValue : localeNumberFormat(valueInAcres.toFixed(decimals),country),
		uom : l('ACRE')
	};
}

function toRadian(deg) {
	return (deg*Math.PI)/180;
}

export function getRadiusFromMapViewport(viewport,earthRadius) {
	//Formula to calculate distance between two coordinates is taken from here
	//https://andrew.hedges.name/experiments/haversine/
	let radius = MAX_VIEWPORT_RADIUS;
	if(typeof viewport.getSouthWest === 'function') {
		const lon1 = viewport.getSouthWest().lng(),
		lon2 = viewport.getNorthEast().lng(),
		lat1 = viewport.getSouthWest().lat(),
		lat2 = viewport.getNorthEast().lat(),
		dlon = toRadian(lon2 - lon1),
		dlat = toRadian(lat2 - lat1),
		a = (Math.pow(Math.sin(dlat/2),2)) + (Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.pow(Math.sin(dlon/2),2)),
		c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) ),
		distance = earthRadius * c;
		radius = distance/2;
	}
	if(radius < MIN_VIEWPORT_RADIUS) {
		return MIN_VIEWPORT_RADIUS;
	}
	if(radius > MAX_VIEWPORT_RADIUS) {
		return MAX_VIEWPORT_RADIUS;
	}
	return Math.round(radius);
}

export function getLocalityFromGeolocatedPlace(place) {
	let placeName = place.formatted_address.split(',')[0];
	if(place.address_components) {
		const localities = place.address_components.filter(comp => comp.types.indexOf('locality') > -1);
		if(localities.length) {
			placeName = localities[0].short_name;
		}
	}
	return placeName;
}

export function getSelectOptions(min,max,stepSize) {
	let options = [];
	stepSize = stepSize || (max-min)/RANGE_STEPS;
	let inc = stepSize;
	while(inc < max) {
		if(inc === stepSize) {
			options.push({
				'name' : `<${handleLargeNumbers(inc,2)}`,
				'value' : `${min}-${inc}`
			});
		} else {
			options.push({
				'name' : `${handleLargeNumbers(inc,2)}+`,
				'value' : `${inc}-${max}`
			});
		}
		inc += stepSize;
	}
	return options;
}

export function getRangeSelectOptions(min,max,stepSize,stepCount,selectedMinValue='',selectedMaxValue='') {
	let options = {
		minValues : [],
		maxValues : []
	};
	stepCount = stepCount || RANGE_STEPS;
	stepSize = stepSize || (max-min)/stepCount;
	let minInc = min;
	let step = 1;
	let maxInc = selectedMinValue === '' ? minInc+stepSize : Number(selectedMinValue)+stepSize;
	let minLastVal = selectedMaxValue === '' ? max : Number(selectedMaxValue);
	while(minInc < minLastVal && step <= stepCount) {
		options.minValues.push(minInc);
		minInc += stepSize;
		step++;
	}
	step = 1;
	while(step <= stepCount) {
		options.maxValues.push(maxInc);
		maxInc += stepSize;
		step++;
	}
	return options;
}

export function getSelectedOptionIndex(options,value) {
	return _findIndex(options,{'value' : value});
}

export function checkIfCaprateToShow(caprate,disclosePrice,investmentCategories=[],propertyType,minRate=MIN_CAPRATE,maxRate=MAX_CAPRATE) {
	if(!caprate || disclosePrice === false) {
		return false;
	}
	if(caprate < minRate || caprate > maxRate) {
		return false;
	}
	if(investmentCategories.length) {
		investmentCategories = investmentCategories.map(category => category.toLowerCase());
		return !CAPRATE_EXCLUDE_PROPERTY_TAGS.some(tag => investmentCategories.indexOf(tag) >= 0)
	}
	return true;
}

export function checkIfCashonCashToShow(cashoncash,disclosePrice,investmentCategories=[],propertyType) {
	return checkIfCaprateToShow(cashoncash,disclosePrice,investmentCategories=[],propertyType,MIN_CASHONCASH,MAX_CASHONCASH);
}

export function ifRentPotentialToShow(rent,caprateToShow,cashoncashToShow, purchaseType) {
    if((caprateToShow && purchaseType !== 'leveraged') || (cashoncashToShow && purchaseType === "leveraged")) {
        return !!rent;
    }
    return false;
}

export function checkIfAnalyzeReturnsToShow(item) {
	if(item.listingtype !== TYPE_SALE) {
		return false;
	}
	if(item.subtype === RESIDENTIAL_LAND) {
		return false;
	}
	if(!item.price) {
		return false;
	}
	return true;
}

export function getPlaceTypeSearchParam(place={}) {
	const { types, name } = place;
	if(types) {
		if(types.indexOf('postal_code') > -1) {
			return {
				zipcode : name
			};
		}
		if(types.indexOf('locality') > -1) {
			return {
				city : name.toLowerCase().replace(/\./g,'').replace(/\s/g,'-')
			};
		}
	}
	return {};
}

export function replaceHyphenWithSpace(value) {
	if(value) {
		return value.replace(/-/g,' ');
	}
}

export function daysToWeeks(days,l,prefix='',postfix='') {
	//if(days <= THRESHOLD_DAYS) {
		return `${prefix} ${days}${postfix} ${l('DAYS')}`;
	//}
	//return `${prefix}${Math.ceil(days/7)}${postfix} ${l('WEEKS')}`;
}

export function formatDaysOnMarket(days,l) {
	// console.log(moment.duration(days,"days").humanize())
	if(days === 0) {
		return l('LISTEDTODAY');
	}
	return daysToWeeks(days,l);
}

export function getDateSinceDays(days) {
	return moment().subtract(days, 'days').valueOf();
}

export function numberOfDaysOptionsFormat(optionValues,l,min,max) {
	let options = [];
	optionValues.lowRange.map((value,index) => {
		options.push({
			"name" : `< ${value}`,
			"value" : `${value}-`,
			"key": `${value}-`,
			"isDisabled": getDaysSince(max) > value
		})
	});

	optionValues.highRange.map((value,index) => {
		options.push({
			"name" : `> ${value}`,
			"value" : `-${value}`,
			"key": `-${value}`,
			"isDisabled": getDaysSince(min) < value
		})
	});
	return options;
}

export function washroomFacetOptionFormat(optionValues,min,max) {
	let options = [];
	optionValues.map((value,index) => {
		options.push({
			"name" : `${value}+`,
			"value" : `${value}-`,
			"key": value,
			"isDisabled": !(value >= min && value <= max)
		})
	});
	return options;
}

export function capRateFacetOptionFormat(optionValues,min,max) {
	let options = [];
	optionValues.map((value,index) => {
		options.push({
			"name" : `${value}+`,
			"value" : `${value}-`,
			"key": value,
			"isDisabled": (value > max)
		})
	});
	return options;
}

export function getStateCodeFromGooglePlace(place={}) {
	let stateCode = '';
	if(place.address_components) {
		const comps = place.address_components.filter(comp => comp.types.indexOf('administrative_area_level_1') > -1);
		if(comps.length) {
			stateCode = comps[0].short_name;
		}
	}
	return stateCode;
}

export function pathToUrl(path , params) {
	let endpointRegex = /\{[^\}]*}/g,
		paramMatch,
		i,
		key;

	paramMatch = path.match(endpointRegex);
	if (paramMatch && paramMatch.length) {
		for (i = 0; i < paramMatch.length; ++i) {
			key = paramMatch[i].replace(/\{|\}/g, '');
			if (!params[key]) {
				throw new Error('URL Parameter not matched');
			}
			path = path.replace('{' + key + '}', params[key]);
		}
	}
	return path;
}

export function getPurchaseType() {
	return cookie.load("purchaseType") || 'cash';
}

export function setPurchaseType(value) {
	cookie.save('purchaseType',value,{ path: '/', maxAge: 31557600, secure : cookies.isSecure });
}

export function checkIfTenantApplyRequired(details,userId) {
	if(userId === details.ownerid || details.listingtype !== TYPE_LEASE) {
		return false;
	}
	return true;
}


export function getSearchPageViewType(screenSize, view, isParamsObject= true) {

	if(screenSize === 1) {
		return isParamsObject ? { view : 'grid'}  : '&view=grid';
	}

	if(view === 'map') {
		return  isParamsObject ? { view : 'map' , count : 200 , page : 1} : '&view=map&count=200&page=1';
	}

	return isParamsObject ? { view : 'list'} : '&view=list';

}



