import clientConfig from '../config';

const MOBILE_CONTACT_TYPE = 'MOBILE';
export const camelize = function(str) {
	return str.split(' ').map(function(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}).join('');
};

export const phoneNumberFormat = function(phoneNumber,type='MOBILE',country) {
	phoneNumber = typeof phoneNumber === 'string' ? phoneNumber : phoneNumber.toString();

	const { mobileNumberFormatCheck, dialingCode } = clientConfig.localeSettings[country];

	let regex = new RegExp(mobileNumberFormatCheck);

	if(type === MOBILE_CONTACT_TYPE || country === 'US' || country === 'CA') {

		if(regex.test(phoneNumber)) {
			return `(${dialingCode}) ${phoneNumber}`;
		}

		phoneNumber = phoneNumber.match(/\d+/g).join('');
		switch(country) {
			case 'IN':
				phoneNumber = phoneNumber.replace(/./g,(v,i)=>(i === 1 || i === 4) ? v + '-' : v);
				break;
			case 'US':
			case 'CA':
				phoneNumber = phoneNumber.replace(/./g,(v,i)=>(i === 2 || i === 5) ? v + '-' : v);
				break;
			case 'MX':
				phoneNumber = phoneNumber.replace(/./g,(v,i)=>(i === 1 || i === 3 || i === 6) ? v + '-' : v);
				break;
		}
		return `(${dialingCode}) ${phoneNumber}`;
	} else {
		return `(${dialingCode}) ${phoneNumber}`;
	}
};
