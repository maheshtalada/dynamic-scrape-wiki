import express from 'express';
import BaseService from '../services/BaseService';
import buildEndpoint, { getHeaderPayload } from '../helpers/endpointbuilder';
import fetchData from '../middleware/fetchdata';
import authenticate from '../middleware/authenticate';
import queryString from 'query-string';

const search = express.Router();

// Middle ware that is specific to this router
search.use( (err, req, res, next) => {
	//console.log('Time: ', Date.now());
	next();
});

search.get('/api/v1/search/:type', async (req, res) => {

	const endPointParams = { 'type' : req.params.type};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('professionsearch',endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	try{
		const client = await BaseService.fetchData(requestData);

		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

search.get('/api/v1/gateway/search/:type', async (req, res) => {

	const endPointParams = { 'type' : req.params.type};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('contentsearch',endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	try{
		const client = await BaseService.fetchData(requestData);

		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

search.get('/api/v1/search/property-listing/:type/:location/:term', async (req, res, next) => {

	const endPointParams = {
		'type' : req.params.type,
		'location' : req.params.location,
		'term' : req.params.term
	};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('search',endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	try{
		const client = await BaseService.fetchData(requestData);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

search.get('/api/v1/recommendation/property-listing', async (req, res) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getinvestmentrecommendations'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	try{
		const client = await BaseService.fetchData(requestData);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

search.get('/api/v1/search/property/latlon' , async (req, res) => {

	const configObj = {
		method: 'get',
		endpoint: buildEndpoint('locateproperty'),
		dataPayload: req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({}, BaseService.defaultConfig, configObj);

	try {
		const client = await BaseService.fetchData(requestData);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

search.post('/api/v1/saved-search', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savepropertysearch'),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

export default search
