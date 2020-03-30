import express from 'express';
import BaseService from '../services/BaseService';
import buildEndpoint, { getHeaderPayload } from '../helpers/endpointbuilder';
import fetchData from '../middleware/fetchdata';
import authenticate from '../middleware/authenticate';
import queryString from 'query-string';
const userprofile = express.Router();

// Middle ware that is specific to this router
userprofile.use( (err, req, res, next) => {
	//console.log('Time: ', Date.now());
	next();
});

userprofile.get('/api/v1/gateway/my-property/user', authenticate,  async(req, res, next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserproperties'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
}, fetchData);

userprofile.get('/api/v1/gateway/users/account/company', authenticate,  async(req, res,next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getusercompany'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.get('/api/v1/gateway/users/account/listing', authenticate,  async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserlisting'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.get('/api/v1/gateway/users/account/analyze-return', authenticate,  async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserreturns'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/gateway/users/account/analyze-return/:id/delete', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deletesavedreturn',endpointParams),
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.get('/api/v1/gateway/users/account/contact-action', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getusernotifications'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/property-listings/:listingid/status', authenticate, async (req, res, next) => {

	const endPointParams = { 'listingid' : req.params.listingid};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('listingconfirmation',endPointParams),
		dataPayload : queryString.stringify({
			status : req.body.status
		}),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/gateway/users/account/profile-photo', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('saveprofileimage'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	req.isUpdateSession = true;
	next();
},fetchData);

userprofile.get('/api/v1/gateway/users/account/article', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserarticles'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/users/account/changepassword', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('userprofilepassword'),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})

	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/users/account/profile-photo/delete', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deleteprofilepic'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	req.isUpdateSession = true;
	next();
},fetchData);

userprofile.get('/api/v1/gateway/users/account/saved-search', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getusersearches'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/saved-search/:id/delete', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deletesavedsearch',endpointParams),
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/property-listings/:id/delete', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deleteuserlisting',endpointParams),
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/gateway/news-articles/:id/delete', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deletearticle',endpointParams),
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.get('/api/v1/gateway/users/account/property-wishlist', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserwishlist'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/users/account/property-wishlist/delete', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deletewishlistitem'),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'
		}),
		dataPayload : queryString.stringify(req.body)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/gateway/news-articles/:id/status', authenticate,  async (req, res, next) => {

	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('removearticle',endPointParams),
		dataPayload : queryString.stringify({
			status : req.body.status
		}),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.get('/api/v1/gateway/users/account/question', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserquestions'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/gateway/users/account/add-contact', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('addtomycontacts'),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/gateway/my-property/:id/delete', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('removeproperty',endpointParams),
		headersPayload : getHeaderPayload(req),
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/gateway/my-property', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('saveproperties'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

userprofile.post('/api/v1/gateway/users/account/import-contact', authenticate, async(req,res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('importcontacts'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req,{
			'Content-Type': 'application/json'
		})
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);


userprofile.get('/api/v1/gateway/rental-applications/user', authenticate,  async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserapplications'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

userprofile.get('/api/v1/gateway/users/account/payment', authenticate,  async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserpayments'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

export default userprofile;
