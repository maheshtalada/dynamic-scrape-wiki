import moment from 'moment';

const { localeSettings } = require('../config').default;
// currency scale
	const GRAND_START = 1000, LOWER_GRAND_END = 9999,
		UPPER_GRAND_START = 10000, UPPER_GRAND_END = 999999,
	  LAC_START = 100000, LAC_END = 9999999,
	  MN_START = 1000000, MN_END = 999999999,
	  CR_START= 10000000 ,
	  BN_START = 1000000000 , BN_END = 999999999999,
	  TRILLION = 1000000000000,
	  INITIAL_VALUE = 1,
		LOWER_K_TO_FIX = 2,
	  K_TO_FIX = 0,
	MN_TO_FIX = 2,
	BN_TO_FIX = 3;

const CURRENCY_SCALE = {
	'IN' : {
		'LAC' : {
			'short_form' : 'L',
			'long_form' : 'Lac'
		},
		'CRORE' : {
			'short_form' : 'Cr',
			'long_form' : 'Lacs'
		}
	},
	'US' : {
		'GRAND' : {
			'short_form' : 'K',
			'long_form' : 'K'
		},
		'MILLION' : {
			'short_form' : 'Mn',
			'long_form' : 'Mn'
		},
		'BILLION' : {
			'short_form' : 'Bn',
			'long_form' : 'Bn'
		}

	}
};

function formateNumber(n,unit,tofix, configFix) {
	let val = n/unit;
	val = Number(configFix !== undefined ? val.toFixed(configFix) : tofix !== undefined ? val.toFixed(tofix) : Math.floor(val));
	if(val % 1 === 0 ) {
		return parseInt(val);
	}
	return val;

}

function numDifferentiation(val,tofix) {
	if(val >= 10000000) {
		val = (val/10000000).toFixed(tofix) + 'Cr';
	}	else if(val >= 100000) {
		val = (val/100000).toFixed(tofix) + 'Lac';
	}	else if(val >= 1000) {
		val = (val/1000).toFixed(tofix) + 'K';
	}
	return val;
}

export function handleLargeNumbers(value,tofix=2) {
	if(value >= GRAND_START && value <= LOWER_GRAND_END) {
		return `${formateNumber(value,GRAND_START,LOWER_K_TO_FIX, tofix)}K`;
	} else if (value >= UPPER_GRAND_START && value <= UPPER_GRAND_END) {
		return `${formateNumber(value,GRAND_START,K_TO_FIX, tofix)}K`;
	} else if(value >= MN_START && value <= MN_END) {
		return `${formateNumber(value,MN_START,MN_TO_FIX, tofix)}M`;
	} else if(value >= BN_START && value <= BN_END) {
		return `${formateNumber(value,BN_START,BN_TO_FIX, tofix)}B`;
	} else if(value >= TRILLION) {
		return `${formateNumber(value,TRILLION,BN_TO_FIX, tofix)}T`;
	} else {
		return formateNumber(value,INITIAL_VALUE,K_TO_FIX, tofix);
	}
}

export function formatCurrency(value,tofix=2,type='') {

	if(!type) {
		return value;
	}

	if(type === 'INR') {
		return numDifferentiation(value,tofix);
	}
	if(value >= 0) {
		return handleLargeNumbers(value,tofix);
	}
	return `-${handleLargeNumbers(Math.abs(value),tofix)}`
}

export function localeCurrency(val, prefix, code, country='US') {
	prefix = localeSettings[country].currencySymbol;
	code = localeSettings[country].localeString;
	return `${prefix}${Number(val).toLocaleString(code)}`;
}

export function addlocaleCurrencyCode(val, country='US') {
	const prefix = localeSettings[country].currencySymbol;
	return `${prefix}${val}`;
}

export function localeNumberFormat(val, country='US') {
	const code = localeSettings[country].localeString;
	return ( val === 0 || !!val )? Number(val).toLocaleString((code)) : '';
}

export function getValueByLocale(country, localeKey) {
	return localeSettings && localeSettings[country] && (localeSettings[country]).hasOwnProperty(localeKey) && localeSettings[country][localeKey];
}

export function formatDateUtil(date, country='US', knownFormat) {
	const format = getValueByLocale(country,'dateFormat');
	if(knownFormat) {
		return moment(date,knownFormat).format(format);
	}
	return moment(date).format(format);
}

/*module.exports = {
	formatCurrency,
	localeCurrency,
	getValueByLocale,
	localeNumberFormat,
	formatDateUtil,
	handleLargeNumbers,
	addlocaleCurrencyCode
};*/

