import express from 'express';
import BaseService from '../services/BaseService';
import buildEndpoint, { getHeaderPayload } from '../helpers/endpointbuilder';
import queryString from 'query-string';
import fetchData from '../middleware/fetchdata';
import authenticate from '../middleware/authenticate';
import multer from 'multer';
const FormData = require('form-data');
const storage = multer.memoryStorage();
const upload = multer({storage});
import axios from 'axios';
import fs from 'fs';
import config from 'config';
import { getSessionData, setUserAccountDetails } from '../helpers/sessionUtils';
const documents = express.Router();

// Middle ware that is specific to this router
documents.use( (err, req, res, next) => {
	console.log('Time: ', Date.now());
	next();
});

documents.post('/api/v1/aws/upload', upload.single('file'), authenticate, async(req,res,next) => {
	const form = new FormData();
	form.append('file', req.file.buffer, req.file.originalname);
	form.append('directory', req.body.directory);
	form.append('mimetype', req.file.mimetype);
	if(req.body.userid) {
		form.append('userid', req.body.userid);
	}
	if(req.body.thumbnail) {
		form.append('thumbnail', req.body.thumbnail);
	}

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('mediaupload'),
		dataPayload : form,
		headersPayload : getHeaderPayload(req, {
			'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

documents.post('/api/v1/aws/edit', upload.single('file'), authenticate, async(req,res,next) => {
	const form = new FormData();
	form.append('file', req.file.buffer, req.file.originalname);
	form.append('key', req.body.key);
	form.append('mimetype', req.file.mimetype);

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('mediaedit'),
		dataPayload : form,
		headersPayload : getHeaderPayload(req, {
			'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

documents.post('/api/v1/gateway/rental-applications/tenant/media/upload', upload.single('file'), authenticate, async (req, res, next) => {
	const form = new FormData();
	form.append('file', req.file.buffer, req.file.originalname);
	form.append('mimetype', req.file.mimetype);
	form.append('mediaoption',req.body.mediaoption);
	
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savetenantdocuments'),
		dataPayload : form,
		headersPayload : getHeaderPayload(req,{
			'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

documents.post('/api/v1/property-listings/:listingid/medias', authenticate, async (req, res, next) => {
	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savelistingimages', endPointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestDataPost = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestDataPost;
	next();
},fetchData);

documents.post('/api/v1/property-listings/:listingid/medias/delete', authenticate, async (req, res, next) => {
	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deletelistingimages', endPointParams),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'})
	};

	const requestDataPost = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestDataPost;
	next();
},fetchData);

documents.post('/api/v1/property-listings/:listingid/medias/edit', authenticate, async (req, res, next) => {
	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('editlistingmedia', endPointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestDataPost = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestDataPost;
	next();
},fetchData);

documents.post('/api/v1/property-listings/:listingid/medias/tag', authenticate, async (req, res, next) => {
	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savelistingimagetags', endPointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestDataPost = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestDataPost;
	next();
},fetchData);

documents.post('/api/v1/property-listings/:listingid/medias/default', authenticate, async (req, res, next) => {
	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savelistingdefaultimage', endPointParams),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'})
	};

	const requestDataPost = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestDataPost;
	next();
},fetchData);

documents.get('/api/v1/gateway/rental-applications/tenant/media', authenticate, async (req, res, next) => {
	const baseUrl = config.get('api.api-base');
	const sessionData = getSessionData(req);
	const configObj = {
		method: 'get',
		url: `${baseUrl}${buildEndpoint('downloadtenantmedia')}`,
		params : req.query,
		headers : getHeaderPayload(req,{
			'Authorization': 'Bearer ' + sessionData.access_token,
			'countrycode' : req.cookies.country,
			'clientip' : req.headers.clientip}),
		responseType: 'stream'
	};


	try {
		const response = await axios(configObj);
		// TODO handle empty response , i.e if data is empty
		try {
			response.data.pipe(res);
		} catch (e) {
			res.send(e)
		}
	} catch(error) {
		res.send(e)
	}
});

documents.get('/api/v1/property-listings/:listingid/medias', authenticate, async (req, res, next) => {
	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method: 'get',
		endpoint: buildEndpoint('getlistingmedia', endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestDataGet = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestDataGet;
	next();
},fetchData);

documents.post('/api/v1/gateway/users/account/profile-photo', upload.single('file'), authenticate, async (req, res, next) => {
	const form = new FormData();
	form.append('file', req.file.buffer, req.file.originalname);
	form.append('mimetype', req.file.mimetype);

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('saveprofileimage'),
		dataPayload : form,
		headersPayload : getHeaderPayload(req,{
			'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.isUpdateSession = true;
	req.configObj = requestData;
	next();
},fetchData);


documents.post('/api/v1/property-listings/:id/medias/office-logo', upload.single('file'), authenticate, async (req, res, next) => {
	const form = new FormData();
	form.append('file', req.file.buffer, req.file.originalname);
	form.append('mimetype', req.file.mimetype);

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('brokaragefirm.upload.post.officelogo', { id : req.params.id}),
		dataPayload : form,
		headersPayload : getHeaderPayload(req,{
			'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);


export default documents;
