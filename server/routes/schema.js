import express from 'express';
import BaseService from '../services/BaseService';
import buildEndpoint, { getHeaderPayload } from '../helpers/endpointbuilder';
import fetchData from '../middleware/fetchdata';
import authenticate from '../middleware/authenticate';
import queryString from 'query-string';

const schema = express.Router();

// Middle ware that is specific to this router

schema.use( (err, req, res, next) => {
	//console.log('Time: ', Date.now());
	next();
});


schema.get('/api/v1/schema/listing/basic/propertydetail', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getpropertybuilding'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);


schema.post('/api/v1/property-listings/basic', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savelocationschema'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/property-listings/schema/basic', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getlocationschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/property-listings/overview', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('saveoverviewschema'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/listing/overview', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getoverviewschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/property-listings/financial', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savefinancialschema'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/listing/financial', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getfinancialschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/property-listings/additionalinfo', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('saveadditionalschema'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/listing/additionalinfo', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getadditionalschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/listing/properties', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getpropertyschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);


schema.post('/api/v1/property-listings/properties', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savepropertyschema'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/person/:usertype(users|realtors|professionals)', async (req, res, next) => {
	const endPointParams = { 'usertype' : req.params.usertype};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getuserregistrationschema',endPointParams),
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

schema.get('/api/v1/schema/users' , async (req, res, next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getsignupschema',{ emailid : req.query.username}),
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

schema.post('/api/v1/gateway/users/register' , async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savesignupschema'),
		dataPayload : req.body,
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

schema.post('/api/v1/users' , async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savesignupschemausers'),
		dataPayload : req.body,
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

schema.post('/api/v1/professionals' , async (req, res, next) => {	

	const configObj = {	
	   method : 'post',	
	   endpoint : buildEndpoint('savesignupschemaprofessionals'),	
	   dataPayload : req.body,	
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

schema.post('/api/v1/realtors' , async (req, res, next) => {

	const configObj = {	
	   method : 'post',	
	   endpoint : buildEndpoint('savesignupschemarealtors'),	
	   dataPayload : req.body,	
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

schema.post('/api/v1/:usertype(users|realtors|professionals)' , async (req, res, next) => {
	const endPointParams = { 'usertype' : req.params.usertype};	
	const configObj = {	
		method : 'post',	
		endpoint : buildEndpoint('saveuserschema',endPointParams),
		dataPayload : req.body,
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

schema.get('/api/v1/schema/company', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getcompanyregistrationschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/company/:id', authenticate, async (req, res, next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getcompanyeditschema',endpointParams),
		paramsPayload : req.params,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);


schema.post('/api/v1/:companytype(company|brokerage-firms)', authenticate, async (req, res, next) => {

	const endPointParams = { 'companytype' : req.params.companytype};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savecompanyschema',endPointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/property-listings/:listingid/status', authenticate, async (req, res, next) => {

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

schema.get('/api/v1/schema/content/article', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getarticleschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/content/article/:id', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getarticleeditschema',endpointParams),
		paramsPayload : req.params,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/news-articles/:status', authenticate, async (req, res, next) => {

	const endpointParams = {
		'status' : req.params.status
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savearticle', endpointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/users/account/edit', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('userprofileedit'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/users/account/edit', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('userprofileedit'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	req.isUpdateSession = true;
	next();
},fetchData);

schema.get('/api/v1/gateway/users/account/notification-preference', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getnotificationpreferences'),
		headersPayload : getHeaderPayload(req),
		dataPayload : req.query
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/users/account/notification-preference', authenticate, async(req, res,next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('getnotificationpreferences'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/content/question/:id', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	let configObj = {
		method : 'get',
		endpoint : buildEndpoint('getquestioneditschema',endpointParams),
		paramsPayload : req.params,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/my-property/basic', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getmypropertydetails'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/schema/my-property/purchase', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getmypropertypurchasedetails'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/my-property/basic', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savemypropertydetails'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/my-property/purchase', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savemypropertypurchasedetails'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/my-property/:id/analyze-return', authenticate, async(req,res,next) => {
	const endpointParams = { ...req.params};
	let configObj = {
		method : 'get',
		endpoint : buildEndpoint('getmypropertyreview',endpointParams),
		paramsPayload : req.params,
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/my-property/:id/cashflow', authenticate, async(req,res,next) => {
	const endpointParams = { ...req.params};
	let configObj = {
		method : 'get',
		endpoint : buildEndpoint('getpropertycashflow',endpointParams),
		paramsPayload : req.params,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/my-property/:id/cashflow/add', authenticate, async(req,res,next) => {
	const endpointParams = { ...req.params};
	let configObj = {
		method : 'post',
		endpoint : buildEndpoint('savepropertycashflow',endpointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/my-property/:id/cashflow/:cashflowid/delete', authenticate, async(req,res,next) => {
	const endpointParams = { ...req.params};
	let configObj = {
		method : 'post',
		endpoint : buildEndpoint('deletepropertycashflow',endpointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/my-property/:id/cashflow/:cashflowid/update', authenticate, async(req,res,next) => {
	const endpointParams = { ...req.params};
	let configObj = {
		method : 'post',
		endpoint : buildEndpoint('updatepropertycashflow',endpointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/property-listings/:id/pdf',  async (req, res, next) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('pdfcontactinfo',endPointParams),
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

schema.get('/api/v1/gateway/rental-applications/tenant/media-details', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('gettenantdocuments'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/rental-applications/:id/review', authenticate, async (req, res, next) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('tenantapplicationdetails',endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantstartschemasave'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/tenant/basic', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantinfoschemasave'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/tenant/employment', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantincomeschemasave'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/tenant/residence', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantresidencesschemasave'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/tenant/house-hold', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenanthouseholdschemasave'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/tenant/disclosure', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantdisclosuresschemasave'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/:id/confirm', authenticate, async (req, res, next) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantconfirmsave',endPointParams),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/:id/payment-failure', authenticate, async (req, res, next) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantpaymentfailsave',endPointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/:id/validate', authenticate, async (req, res, next) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantconfirmdetails',endPointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.post('/api/v1/gateway/rental-applications/close', authenticate, async (req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('tenantapplicationreview'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/rental-applications/schema', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('tenantstartschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/rental-applications/schema/tenant/basic', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('tenantinfoschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/rental-applications/schema/tenant/employment', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('tenantincomeschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/rental-applications/schema/tenant/residence', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('tenantresidencesschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/rental-applications/schema/tenant/house-hold', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('tenanthouseholdschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

schema.get('/api/v1/gateway/rental-applications/schema/tenant/disclosure', authenticate, async (req, res, next) => {

	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('tenantdisclosuresschema'),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	req.configObj = requestData;
	next();
},fetchData);

export default schema;
