import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';


import App from '../pages/App';


function errorLoading(err) {
	//onError don't fail sailently
	console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
	return (module) => cb(null, module.default);
}

export default (store)=>(
		<Route path="/" component={App}>
			<IndexRoute
				getComponent = {(location, cb) => {
					import(/* webpackChunkName: "CompanyList" */ '../pages/CompanyListPage.js')
						.then(loadRoute(cb))
						.catch(errorLoading);
				}}
				server = "off"
				whitelist = "off"
				pagename = "CompanyList"
			/>
			<Route
				path = "/company/:id"
				getComponent = {(location, cb) => {
                    import(/* webpackChunkName: "CompanyDetail" */ '../pages/CompanyDetailPage.js')
                        .then(loadRoute(cb))
                        .catch(errorLoading);
                }}
				server = "off"
				whitelist = "off"
				pagename = "CompanyDetail"
			/>
			<Route
				path = "/people"
				getComponent = {(location, cb) => {
					import(/* webpackChunkName: "PeopleList" */ '../pages/PeoplePage.js')
						.then(loadRoute(cb))
						.catch(errorLoading);
				}}
				server = "off"
				whitelist = "off"
				pagename = "PeopleList"
			/>

		</Route>

);
