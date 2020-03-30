export function makeSlug(name = '') {
	const cleanName = name.replace(/[\-\s]+/g, '-')
               .replace(/[^0-9a-zа-яїі\-]/gi, '')
               .toLowerCase();

	return encodeURIComponent(cleanName);
}

export function isUrlAbsolute(url) {
	//regex to check for absolute path uri
	const regEx = new RegExp('^[www.]|(?:[a-z]+:)?//', 'i');
	if(regEx.test(url)) {
		return true;
	}
	return false;
}

export function formatExternalUrl(url) {
	if(url.match(/^https?/)) {
		return url;
	}
	return '//'+url;
}

export function getAbsoluteUrl(relativeUrl) {
	return `${frameworkGlobals.origin}${relativeUrl}`;
}

/*
module.exports = {
	isUrlAbsolute,
	makeSlug,
	formatExternalUrl,
	getAbsoluteUrl
};*/
