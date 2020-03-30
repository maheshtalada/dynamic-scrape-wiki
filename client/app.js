import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { match, Router, browserHistory as history } from 'react-router';
import cookie from 'react-cookie';
import routes from '../shared/core/routes';
import configureStore from '../shared/redux/store/configureStore';
import i18n from '../shared/i18n';

if (process.env.NODE_ENV !== 'local-dev' && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/static/build/service-worker.js', { scope: "/" }).then(registration => {
			//console.log('SW registered: ', registration);
		}).catch(registrationError => {
			console.log('SW registration failed: ', registrationError);
		});
	});
}

const
	DEFAULT_LOCALE = 'us_en'
	, DEFAULT_COUNTRY = 'us'
	, initialState = window.__INITIAL_STATE__ || {}
	, store = configureStore(initialState)
	, locale = cookie.load('locale') || DEFAULT_LOCALE
	, country = (cookie.load('country') && cookie.load('country').toLowerCase()) || DEFAULT_COUNTRY
	, { pathname, search, hash } = window.location
	, location = `${pathname}${search}${hash}`
	, matchRoutes = routes()
	;

let dataLayer = window.dataLayer || [] ;

function loadLocale(country, localeToLoad) {
	country = country.toUpperCase();
	let countryCode = '';
	if(window.__CONFIG__.localeSettings.hasOwnProperty(country)) {
		 countryCode = window.__CONFIG__.localeSettings[country].languageDirectory;
	} else {
		 countryCode = DEFAULT_COUNTRY;
	}


    // "": { "domain": "messages", "lang": "" }
	return fetch(`${window.__CONFIG__.assetsPath}/lang/${countryCode}/${localeToLoad}.json?v=23`).then(res => {
		if (res.status >= 400) {
			throw new Error('Bad response from server');
		}

		return res.json();
	});
}

// TODO adding pollyfill here move it later
Array.prototype.chunk = function( n ) {
	if ( !this.length ) {
		return [];
	}
	return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
};

loadLocale(country, locale).then(localeData => {
	const i18nTools = new i18n.Tools({ localeData, locale });
	match({routes:matchRoutes, location}, (error, redirectLocation, renderProps) => {
		hydrate(
			<Provider store={store}>
				<i18n.Provider i18n={i18nTools}>
					<Router history={history} onUpdate={() => {
						if(!window.location.hash) {
							window.scrollTo(0, 0);
						}}}>{routes(store)}</Router>
				</i18n.Provider>
			</Provider>,
			document.getElementById('react-view')
		);
	});
}).catch(error => {
	console.error(error);
});
