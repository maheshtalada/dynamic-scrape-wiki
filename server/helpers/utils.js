/* eslint import/no-unresolved: 0*/

import { find as _find, cloneDeep as _deepClone } from 'lodash';
import clientConfig from '../../shared/config';
import { getSupportedLocales } from '../../shared/utils';
import {whypropshub} from '../../shared/assets/static/why-props-hub.json';
import pageMetaData from '../../shared/assets/static/meta-data-config.json';
import {escape as escapeHTML} from 'lodash';
import config from 'config';

const { areasServed, mapTypeConfig } = require('../../shared/assets/static/metros-served-config').default;
export function fetchComponentsData({ dispatch, components, params, query, locale}) {
	const promises = components.map(current => {
		if(!current) {
			return null;
		}
		const component = current.WrappedComponent ? current.WrappedComponent : current;

		return component.fetchData
			? component.fetchData({ dispatch, params, query, locale})
			: null;
	});

	return Promise.all(promises);
}

export function getEnv() {
	return process.env.NODE_ENV || 'local-dev' ;
}

export function getMetaDataFromState() {
	/* eslint more/no-duplicated-chains: 0 */
	return {
		title : "",
		keywords : "",
		description : "",
		type        : 'Home',
		siteName    : 'Data Grabber',
		image       : 'data'
	};
}

export function makeRedirectUrl({ originalUrl }) {
	const UIWallPath = `${clientConfig.embedOrigin}/`;

	return `${UIWallPath}${originalUrl}`;
}

export function getIp(req) {
	let ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
	if (ip.substr(0, 7) === '::ffff:') {
		return ip.substr(7);
	}

	return ip;
}

export function getCountry(req) {
	if(process.env.NODE_ENV !== 'production' && (req.query && req.query.site)) {
		return req.query.site;
	}

	if(req.cookies.country) {
		return req.cookies.country;
	}

	return ( (req.headers && req.headers['http-country-code']) || 'US');
}

export function detectLocale(req) {
	// Take locale passed by webserver
	/*const country = getCountry(req);

	let localObj='';
	const { langauges } = clientConfig.localeSettings[country];
	if(!req.cookies.locale) {
		localObj = _find(langauges, { 'default' : true});
	} else {
		localObj = _find(langauges, { language : req.cookies.locale.toLowerCase()});
	}
	const passedLocale = (localObj && localObj.language && localObj.language.toLowerCase()) || '';
	if (passedLocale && Object.keys(_find(getSupportedLocales(country),passedLocale))[0] === passedLocale) {
		return passedLocale;
	} else {
		return _find(langauges, { 'default' : true}).language;
	}*/

	return 'us_en';

}

/*
 for given environment tracking code will be send
 */
export function getGTMTrackingCode(environment = 'local-dev') {

	const GTMTrackingCode = {
		'local-dev' : {
			trackingCode : '&gtm_auth=sFVjavj2bDWE8PDiVvIlBw&gtm_preview=env-19'
		},
		'development' : {
			trackingCode : '&gtm_auth=sFVjavj2bDWE8PDiVvIlBw&gtm_preview=env-19'
		},
		'pilot' : {
			trackingCode : '&gtm_auth=rfO8WeA-L6nP0ifdvS12Vg&gtm_preview=env-20'
		},
		'production' : {
			trackingCode : '&gtm_auth=kXFUg4TmLtXQmCzB9LdNVA&gtm_preview=env-2'
		},
	}

	return GTMTrackingCode[environment].trackingCode;
}

export function getWebpackAssetsConfig() {
	const envConfig = require('../../etc/webpack-assets.json');
	return envConfig
}

export function getAssetsPaths() {
	const webpackAssets = getWebpackAssetsConfig();
	return {
		scripts: Object.keys(webpackAssets).filter(asset => asset && asset !== 'main' && asset !== 'vendor' && asset !== 'common').map(asset => webpackAssets[asset].js),
		main:  webpackAssets.main.js,
		common : webpackAssets.common.js,
		vendor : webpackAssets.vendor.js,
		css: webpackAssets.main.css
	};
}

export function getSiteCaptionIndex() {
	return Math.floor(Math.random() * whypropshub.sitecaptions.length);
}

function generateTag(counter, storeData,lookupArray) {
	let needleData = Array.isArray(storeData[lookupArray[counter]]) && storeData[lookupArray[counter]][0] || storeData[lookupArray[counter]] || '';
	if(counter === lookupArray.length - 1) {
		if(!needleData) {
			return '';
		}
		if(needleData && typeof needleData === 'object') {
			return needleData[0]
		} else {
			return needleData;
		}
	}

	if(!needleData) {
		return '';
	}

	return generateTag(counter + 1, needleData,lookupArray);
}

function metaProperty({tag, content, propertyName}) {
	return `<meta ${propertyName}="${tag}" content="${escapeHTML(content)}" />`
}

function metatemplates() {
	return {
		investmentDestination : (params)=> {
			let metroData = _find(areasServed, {metroID : Number(params.id) || 1});
			if(!metroData) {
				metroData = _find(areasServed, {metroID : 1});
			}
			return {
				"keywords" : "cap rate potential, popular searches, turn key, fixer upper, listing price, demographics, rental unit ratio, income, unemployment, population growth, property crime, violent crime, commute time, market index",
				"title" : `PropsHub | Real Estate Investment Markets | ${metroData.searchBarAddress} | ${mapTypeConfig[params.maptype].metaKeyword}`,
				"description" : `Analyze ${mapTypeConfig[params.maptype].metaKeyword} for zip codes in ${metroData.searchBarAddress} market`,
			}
		}
	}
}

function generateMetaTags(pageMetaTags, storeData={}) {
	let metaTags = _deepClone(pageMetaTags);
	return metaTags.map(metatag => {
		if(metatag.content) {
			return metaProperty(metatag)
		}
		let lookupArray = metatag.dynamicMeta && metatag.dynamicMeta.propertyLookup;
		const metas = generateTag(0 , storeData,lookupArray);
		if(metas){
			metatag.content = metatag.dynamicMeta.prefix && `${metatag.dynamicMeta.prefix}${metas}` || metas;
			return metaProperty(metatag)
		}
	}).join('');
}

// we also need url & image & type for og tags
export function getPageMeta(page,state, params,reqUrl,origin) {
	// check if the route is dynamic
	const { siteName } = pageMetaData;
	let pageData = pageMetaData[page] || getMetaDataFromState(),
		extraMetaData ='',
		canonicalUrl ='';
	if(pageData.storename) {
		const  { storename , lookupobject } = pageData;
		const storeData = state[storename][lookupobject];
		const dynamicMeta =  Object.assign(storeData.metaData || getMetaDataFromState());
		extraMetaData = pageData.extraMeta && generateMetaTags(pageData.extraMeta,storeData) || '';
		canonicalUrl = dynamicMeta.canonicalUrl ? `${origin}${dynamicMeta.canonicalUrl}` : `${origin}${reqUrl}`;
		return Object.assign(dynamicMeta,{extraMetaData, siteName, canonicalUrl});
	}
	canonicalUrl = `${origin}${reqUrl}`;
	extraMetaData = pageData.extraMeta && generateMetaTags(pageData.extraMeta) || '';
	const staticMeta = pageData.title && pageData || (pageData['metaTemplate'] && (metatemplates()[pageData['metaTemplate']](params))) ;
	return Object.assign(staticMeta,{extraMetaData, siteName, canonicalUrl});
}

function getHosts(cspType) {
	return config.get('csp.hosts.common').concat(config.get(cspType)).join(' ');
}

export function getCSPSettings(nonce) {
	const cspVal = [
		 'default-src \'none\'',
		'base-uri \'self\'',
		`script-src \'self\' \'nonce-${nonce}\' ${getHosts('csp.hosts.scripts')} \'unsafe-eval\' \'strict-dynamic\'`, 
		`connect-src \'self\' ${getHosts('csp.hosts.connect')} \'unsafe-inline\'`, 
		`img-src \'self\' ${getHosts('csp.hosts.images')} data: blob:`, 
		`font-src \'self\' ${getHosts('csp.hosts.fonts')}`, 
		`frame-src \'self\' ${getHosts('csp.hosts.frames')}`,
		`style-src \'self\' \'unsafe-inline\' ${getHosts('csp.hosts.styles')}`, 
		'object-src \'self\'' ].join('; ');

	return cspVal;
}







