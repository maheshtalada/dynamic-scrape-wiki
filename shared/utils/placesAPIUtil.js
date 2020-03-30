
export function getAddressComponent(address, component, type) {
	let element ='';
	address.forEach((address_component) => {
		if (address_component.types.indexOf(component) > -1 ) {
			return element = (type === 'short_name') ? address_component.short_name : address_component.long_name;
		}
	});

	return element;
}

export function getPropertyNameFromGooglePlace(place) {
	const str = getAddressComponent(place.address_components,'street_number', 'short_name'),
		rto = getAddressComponent(place.address_components,'route', 'long_name'),
		lineone = str && rto ? `${str} ${rto}` : '';
	return lineone || str || rto || place.formatted_address.split(',')[0];
}

export function getZipFromAddress(address='') {
	let zipcodeMatches = address.match(/\d{5}(?:[\s]?[-\s][\s]?\d{4})?/gi) || [];
	return zipcodeMatches.pop();
}


