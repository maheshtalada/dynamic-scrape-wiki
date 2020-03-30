import React from 'react';
import { Provider } from 'react-redux';
import { RouterContext as RoutingContext, match } from 'react-router';
import routes from '../../shared/core/routes';
import { renderToNodeStream } from 'react-dom/server';
import configureStore from '../../shared/redux/store/configureStore';
import i18n from '../../shared/i18n';
import clientConfig from '../../shared/config';
import { getSiteCaptionIndex } from '../helpers/utils';
import { renderHeader, renderFooter } from '../helpers/renderer.js';
import usenLocaleData from '../../public/static/lang/us/us_en.json';
import { fetchComponentsData,
	getCountry,
	detectLocale,
	getIp,
	getAssetsPaths,
	//getGTMTrackingCode,
	getEnv,
	getPageMeta,
	getCSPSettings
} from '../helpers/utils';
import metaDataConfig from '../../shared/assets/static/meta-data-config.json';

import send404 from '../render404Html';
//import Logger from '../../shared/utils/logger/logger';
import cookie from 'react-cookie';
import { REQUEST_GET_DEVICE } from '../../shared/redux/actions/application';
/*import { REQUEST_CHECK_USER_SESSION } from '../../shared/redux/actions/user';*/
//import { authorizeRequest } from './authenticate';

// as we building server files
// adding instance path statically
//const logger = Logger.getInstance('middleware/SSRMiddleware.js');

// Initializa localization
const i18nToolsRegistry = {
	us_en   : new i18n.Tools({ localeData: usenLocaleData, locale: 'us_en' }),
};


// setup app globals for action handlers
global.frameworkGlobals = {
	isServer: true,
	isClient: false,
	isDev: false,
	basePath: '',
	clients : [],
	env : getEnv(),
	origin : clientConfig.origin,
};

import contextService from './requestContext';

function findDevice({isMobile, isTablet, isiPad,isDesktop }) {

	if(isTablet || isiPad) {

		return 2;
	}

	if(isMobile) {
		return 1;
	}

	return 4;
}

const matchRoutes = routes();

const renderer = async(req, res, next) => {
	match({ routes:matchRoutes, location: req.url }, async(error, redirectLocation, renderProps) => {
		const locale = detectLocale(req);
		const country = getCountry(req);
		const i18nTools = i18nToolsRegistry[locale];
		const nonce = parseInt(Math.random() * 1000000, 10) + (new Date().getTime());
		frameworkGlobals.nonce = nonce;
		frameworkGlobals['siteCaptionIndex'] = getSiteCaptionIndex();

		// handle error routes
		//// no match router goto server side & 404 redirect
		if (error) {
			//logger.error("ui.server", "SSR Rendering failed",{ "error" : error, location : req.url});
			res.send(500, error.message);
			return;
		} else if (!renderProps) {
			//logger.error("ui.server", "SSR Rendering failed",{ "error" : "route not matched", location : req.url});
			send404(res, i18nTools);
			return;
		}

		// initial data setup
		const ip = getIp(req);
		const store = configureStore();
		const visitorCountry = req.headers && req.headers['user-country-code'];
		const visitorCountryName = req.headers && req.headers['user-country-name'];

		//update to context for later use in API bridge
		contextService.set('request:visitorIP', ip);
		contextService.set('request:cookie_sid', req.cookies.sid || req.query.sid);
		contextService.set('request:hostname', `${req.protocol}://localhost:${frameworkGlobals.port}`);
		contextService.set('request:country', country);
		contextService.set('request:location', req.cookies && req.cookies.locationname || '');
		contextService.set('request:visitorCountry', visitorCountry);
		contextService.set('request:visitorCountryName', visitorCountryName);
		
		// check redis session for secure routes
		// handle redirects , remember me
		let server = 'on';
		if(renderProps && renderProps.routes) {
			const { whitelist, pagename, loggedinCoditionalRedirect = undefined } = renderProps.routes[1];

		}
		// start pulling data for SSR
		fetchComponentsData({
			locale,
			dispatch   : store.dispatch,
			components : renderProps.components,
			params     : renderProps.params,
			query      : renderProps.location.query
		})
			.then( async () => {
				// if user already logged in
				// fetch from propshub redis store
				const device = findDevice(req.useragent);
				const pageRoute =  renderProps.routes[renderProps.routes.length - 1];
				await store.dispatch(REQUEST_GET_DEVICE({
					device : device,
					visitorIP : ip,
					cookie_sid : req.cookies.sid,
					hostname : `${req.protocol}://localhost:${frameworkGlobals.port}`,
					country : country,
					location : req.cookies && req.cookies.locationname || '',
					visitorCountry : visitorCountry,
					visitorCountryName : visitorCountryName
				}));
				// added to initial state
				const initialState = store.getState();
				if(pageRoute.checkEmptyContent) {
					const storeData = initialState[metaDataConfig[pageRoute.pagename].storename][metaDataConfig[pageRoute.pagename].lookupobject];
					if(!storeData.status) {
						send404(res, i18nTools);
						return;
					}
				}

				//const metaData = getPageMeta(pageRoute.pagename, initialState, renderProps.params,req.url,frameworkGlobals.origin);
				let componentHTML = (
					<Provider store={store}>
						<i18n.Provider i18n={i18nTools}>
							<RoutingContext {...renderProps} />
						</i18n.Provider>
					</Provider>
				);

				// add visitor IP to config & send
				clientConfig.visitorIP = ip;
				clientConfig.isServer = false;
				clientConfig.isClient = true;
				clientConfig.country = country;
				clientConfig.visitorCountry = visitorCountry;
				clientConfig.visitorCountryName = visitorCountryName;
				clientConfig.location = req.cookies && req.cookies.locationname || '';
				clientConfig.staticUrl = process.env.STATIC_URL || clientConfig.staticUrl;
				clientConfig.siteCaptionIndex = frameworkGlobals['siteCaptionIndex'];
				clientConfig.env =  frameworkGlobals.env;

				//const trackingCode = getGTMTrackingCode(frameworkGlobals.env);

				res.cookie('country', country, { maxAge: 1080000000, secure: clientConfig.cookies.isSecure });
				res.cookie('locale', locale, { maxAge: 1080000000, secure: clientConfig.cookies.isSecure });
				res.header('X-realIP', ip);
				res.header('Content-Type', 'text/html; charset=utf-8');
				//const cspVal = getCSPSettings(nonce);
				//res.header('content-security-policy', cspVal);
				cookie.plugToRequest(req,res);
				res.status(200).write(renderHeader(nonce,getAssetsPaths().scripts, {
					title : "",
					keywords : "",
					description : "",
					type        : 'Home',
					siteName    : 'Data Grabber',
					image       : 'data'
				}, getAssetsPaths().css, clientConfig.assetsPath));

				const htmlSteam = renderToNodeStream(componentHTML);
				htmlSteam.pipe(res, { end: false });
				htmlSteam.on('end', () => {
					res.status(200).write(renderFooter(nonce,getAssetsPaths().vendor, getAssetsPaths().common, getAssetsPaths().main, clientConfig, initialState));
					return res.send();
				});
			})
			.catch(err => {
				//logger.error("ui.server", "SSR Rendering failed",{ "error" : err, location : req.url});
				res.end(err.message);
			});

	});

};

export default renderer;
