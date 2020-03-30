import express from 'express';
import BaseService from '../services/BaseService';
import buildEndpoint, { getHeaderPayload } from '../helpers/endpointbuilder';
import fetchData from '../middleware/fetchdata';
import authenticate from '../middleware/authenticate';
import queryString from 'query-string';
import multer from 'multer';
const FormData = require('form-data');
const storage = multer.memoryStorage();
const upload  = multer({ storage});
const contact = express.Router();

contact.get('/api/v1/gateway/contact/:id', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('contactactions',endpointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

contact.post('/api/v1/gateway/contact', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('postcontactaction'),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'})
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

contact.post('/api/v1/gateway/contact/share', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('shareviaemail'),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'})
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

contact.post('/api/v1/gateway/contact/share-file', upload.single('file'), authenticate, async(req,res,next) => {

	const form = new FormData();
	const userids = req.body.userids.split(',');
	let i=0,useridsLength = userids.length;
	for (; i < useridsLength; i++) {
		form.append('userids', userids[i]);
	}
	form.append('file', req.file.buffer, req.file.originalname);
	form.append('message', req.body.message);
	form.append('sharetype', req.body.sharetype);
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('fileshareviaemail'),
		dataPayload : form,
		headersPayload : getHeaderPayload(req, {
			'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
		})
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);


contact.post('/api/v1/property-listings/:listingid/contact', async(req,res) => {
	const endpointParams = {
		'listingid' : req.params.listingid
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('email.contact.post.listingcontact', endpointParams),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req,{
		'Content-Type': 'application/x-www-form-urlencoded'})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	try{
		const client = await BaseService.fetchData(requestData);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});


export default contact;
