import express from 'express';
import BaseService from '../services/BaseService';
import buildEndpoint, { getHeaderPayload } from '../helpers/endpointbuilder';
import { isUserLoggedIn } from '../helpers/sessionUtils';
import fetchData from '../middleware/fetchdata';
import queryString from 'query-string';
import authenticate from '../middleware/authenticate';

const properties = express.Router();

// Middle ware that is specific to this router
properties.use( (err, req, res, next) => {
	//console.log('Time: ', Date.now());
	next();
});

properties.get('/api/v1/property-listings/:id', async (req, res) => {

	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('propertylisting',endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	try{
		let client = await BaseService.fetchData(requestData);
		
		if(!client.propertyListing) {
			res.status(204).send();
			return;
		}

		res.send(client);

	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

properties.get('/api/v1/search/property-listing/similar-listing/:id', async (req, res) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('similarlistings',endPointParams),
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

properties.get('/api/v1/property-listings/schema/demographic-data', async (req, res) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getpropertydemographics'),
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

properties.get('/api/v1/gateway/analyze-returns/property-listing/:listingid', async (req, res) => {
	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getanalyzereturns',endPointParams),
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

properties.get('/api/v1/gateway/analyze-returns/z-estimate', async (req, res) => {
	const configObj = {
		method : 'get',
		endpoint :  buildEndpoint('getanalyzereturnszestimate'),
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

properties.post('/api/v1/gateway/analyze-returns/property-listing/:listingid', authenticate, async (req, res, next) => {
	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('saveanalyzereturns',endPointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

properties.post('/api/v1/users/account/property-wishlist/', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('addtowishlist'),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded',
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	req.isUpdateSession = true;
	next();
},fetchData);

properties.post('/api/v1/property-listings/offer', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('makeanoffer'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

properties.get('/api/v1/gateway/pdf/listing/:id/template', async(req, res) => {
	const requestData = Object.assign({},BaseService.defaultConfig,getPdfTemplateConfig(req));
	try{
		const client = await BaseService.fetchData(requestData);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

properties.get('/api/v1/gateway/pdf/listing/:id/template/secure', authenticate, async(req, res, next) => {
	const requestData = Object.assign({},BaseService.defaultConfig,getPdfTemplateConfig(req));
	req.configObj = requestData;
	next();
}, fetchData);

properties.post('/api/v1/gateway/pdf/listing/:id/:step', async(req, res) => {

	const requestData = Object.assign({},BaseService.defaultConfig,postPdfTemplateConfig(req));

	try{
		const client = await BaseService.fetchData(requestData);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});


properties.post('/api/v1/gateway/pdf/listing/:id/:step/secure', authenticate, async(req, res, next) => {

	const requestData = Object.assign({},BaseService.defaultConfig,postPdfTemplateConfig(req));
	req.configObj = requestData;
	next();
}, fetchData);


properties.get('/api/v1/gateway/pdf/listing/:id/pdf', async(req, res, next) => {
	const  { sessionuserid = '' } = req.headers;
	const configObj = {
		method : 'get',
		endpoint :  buildEndpoint('pdf.pdfdata.get.customization',{id : req.params.id}),
		headersPayload : getHeaderPayload(req, {sessionuserid}),
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	try{
		const client = await BaseService.fetchData(requestData);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});


function getPdfTemplateConfig(req) {
	const  { token = '' } = req.headers;
	return  {
		method : 'get',
		endpoint :  buildEndpoint('pdf.customization.get.pdftemplatedata',{id : req.params.id}),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req, { token})
	};
}


function postPdfTemplateConfig(req) {
	const isSendDataAsString = ['template', 'highlight'].includes(req.params.step);
	const  { token = '' } = req.headers;
	let headerPayLoad = {
		token
	};
	if(isSendDataAsString) {
		headerPayLoad['Content-Type'] =  'application/x-www-form-urlencoded';
	}

	return {
		method : 'post',
		endpoint :  buildEndpoint(`pdf.customization.post.${req.params.step}`,{id : req.params.id}),
		dataPayload : isSendDataAsString && queryString.stringify(req.body) || req.body,
		headersPayload : getHeaderPayload(req, headerPayLoad)
	};

}

export default properties;
