import { isEmpty as _isEmpty } from 'lodash';

const
	INVESTMENT_WIZARD_URL = '/guided-search',
	PDF_WIZARD_URL = '/profile/flyer',
	PROFILE_URL = '/profile',
	ERROR_URL = '/error',
	SITE_ROOT_URL = '/',
	LOGGEDIN_FLEYER_CAMAPIGN_URL = '/profile/flyer/template/{listing_id}';

const FLYER_CAMPAIGN = 'flyer';

class RedirectHelpers {

	static isLoggedIn(user) {
		return (user && user.isLogIn);
	}

	static isUrlContains() {

	}

	static templateUrl(url, param) {
		return `${url}/${param}`;
	}

	static loggedinCampaignRedirect({query}) {
		const { campaign_type = '', listing_id= '' } = query;
		if(campaign_type === FLYER_CAMPAIGN){
			return LOGGEDIN_FLEYER_CAMAPIGN_URL.replace('{listing_id}',listing_id);
		} else {
			return PROFILE_URL;
		}
	}

}

//check if main page accessed
//replace with first step
function mainInvestRouteRedirect(locationObject) {
	const { params } = locationObject;
	if(_isEmpty(params)) {
		return RedirectHelpers.templateUrl(INVESTMENT_WIZARD_URL, 'investment')
	}
	return null;
}

function purchaseTypeRouteRedirect(locationObject) {
	const { params, location } = locationObject;
	if(params.step === 'type' && _isEmpty(location.query)) {
		return RedirectHelpers.templateUrl(INVESTMENT_WIZARD_URL, 'investment')
	}
	return null;
}

function metroRouteRedirect(locationObject) {
	const { params, location } = locationObject;
	if(params.step === 'market' && _isEmpty(location.query)) {
		return RedirectHelpers.templateUrl(INVESTMENT_WIZARD_URL, 'investment')
	}
	return null;
}

function PDFTemplateRouteRedirect(locationObject) {
	const { params } = locationObject;
	if(_isEmpty(params)) {
		return RedirectHelpers.templateUrl(PDF_WIZARD_URL, 'template')
	}
	return null;
}

function ResetPasswordRouteRedirect({location}) {
	if(RedirectHelpers.isLoggedIn(this.user.user)) {
		return RedirectHelpers.loggedinCampaignRedirect(location);
	}
}

function AnalyzePortfolioRouteRedirect() {
	if(RedirectHelpers.isLoggedIn(this.user.user)) {
		return '/profile/portfolio';
	}
}

function RedirectUnotherizeRoutes() {
	if(!RedirectHelpers.isLoggedIn(this.user.user)) {
		return SITE_ROOT_URL;
	}
}

function redirectReducer(actions, locationObject, referrerObject, store) {

	let finalUrl;

	actions.every((redirectFunction)=> {
		let result;
		result = redirectFunction.apply(store, [locationObject, referrerObject]);
		if (result === null || typeof result === 'undefined') {
			return true;
		}
		finalUrl = result;
		return false;
	});
	return finalUrl;

}

function routeRedirect(actions, locationObject, referrerObject, store, replace) {
	const finalUrl = redirectReducer(actions, locationObject, referrerObject, store);
	// Make sure there aren't multiple url redirects needed
	// console.log(finalUrl);
	if (!finalUrl) {
		return null
		// throw an error?
		//console.error('NOT ABLE TO FIND ANY ROUTE,', 'REDIRECTING ERROR PAGE');
		//return replace(ERROR_URL);
	}

	replace(finalUrl);
}

function investmentWizardRouteReducer( next, replace, store, prev='') {
	const actions = [
		mainInvestRouteRedirect,
		purchaseTypeRouteRedirect,
		metroRouteRedirect
	];

	routeRedirect(actions, next, prev, store, replace)
}

function PDFWizardRouteReducer( next, replace, store, prev='') {
	const actions = [
		PDFTemplateRouteRedirect
	];

	routeRedirect(actions, next, prev, store, replace)
}

function ResetPasswordRouteReducer(next,replace,store, prev='') {
	const actions = [
		ResetPasswordRouteRedirect
	];
	routeRedirect(actions, next, prev, store, replace)
}

function AnalyzePortfolioRouteReducer(next,replace,store,prev='') {
	const actions = [
		AnalyzePortfolioRouteRedirect
	];
	routeRedirect(actions, next, prev, store, replace)
}

function RedirectUnOtherize(next, replace, store, prev = '') {
	const actions = [
		RedirectUnotherizeRoutes
	];
	routeRedirect(actions, next, prev, store, replace)
}

export default {
	investmentWizardRouteReducer,
	PDFWizardRouteReducer,
	ResetPasswordRouteReducer,
	AnalyzePortfolioRouteReducer,
	RedirectUnOtherize
};
