import express from 'express';
import BaseService from '../services/BaseService';
import buildEndpoint, { getHeaderPayload } from '../helpers/endpointbuilder';
import fetchData from '../middleware/fetchdata';
import queryString from 'query-string';
import { isUserLoggedIn } from '../helpers/sessionUtils';
import authenticate from '../middleware/authenticate';
import Logger from '../../shared/utils/logger/logger';

// as we building server files
// adding instance path statically
const logger = Logger.getInstance('routes/articles.js');

const articles = express.Router();

// Middle ware that is specific to this router

articles.use( (err, req, res, next) => {
	//console.log('Time: ', Date.now());
	next();
});

articles.get('/api/v1/gateway/home/content', async(req,res) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getarticlesandquestions'),
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

articles.get('/api/v1/gateway/search/content', async(req,res) => {
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getbloglist'),
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

articles.get('/api/v1/gateway/news-articles/:id/tag', authenticate, async(req,res,next)=> {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObject = {
		method : 'get',
		endpoint : buildEndpoint('getarticletags',endpointParams),
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObject);
	req.configObj = requestData;
	next();

},fetchData);

articles.post('/api/v1/gateway/news-articles/:id/tag', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savearticletags',endpointParams),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);


articles.get('/api/v1/gateway/news-articles/:id', async(req,res) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('getarticle', endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	try{
		const client = await BaseService.fetchData(requestData);
		client.user.canChat = false;
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

articles.post('/api/v1/gateway/news-articles/:articleid/like', authenticate, async(req,res,next) => {
	const endpointParams = {
		'articleid' : req.params.articleid
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('articlelike',endpointParams),
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);


articles.post('/api/v1/gateway/comments', authenticate, async(req, res, next) => {

	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savecomments'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);


articles.get('/api/v1/gateway/comments/content/:contentid', async(req, res, next) => {
	const endpointParams = {
		'contentid': req.params.contentid
	};
	const configObj = {
		method: 'get',
		endpoint: buildEndpoint('getcomments', endpointParams),
		dataPayload: req.body,
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

articles.post('/api/v1/gateway/comments/:commentid/delete', authenticate, async(req, res, next) => {
	const endpointParams = {
		'commentid' : req.params.commentid
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deletecomments',endpointParams),
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

articles.post('/api/v1/gateway/questions', authenticate, async(req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('savequestion'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

articles.post('/api/v1/gateway/answers', authenticate, async(req, res, next) => {
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('saveanswer'),
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

articles.post('/api/v1/gateway/answers/:id/delete', authenticate, async(req, res, next) => {

	const endpointParams = {
		'id': req.params.id
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deleteanswers', endpointParams),
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

articles.get('/api/v1/gateway/questions/:id', async(req, res, next) => {
	const endpointParams = {
		'id': req.params.id
	};
	const configObj = {
		method: 'get',
		endpoint: buildEndpoint('getquestion', endpointParams),
		dataPayload: req.body,
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

articles.get('/api/v1/gateway/questions/:id/answers', async(req, res, next) => {
	const endpointParams = {
		'id': req.params.id
	};
	const configObj = {
		method: 'get',
		endpoint: buildEndpoint('getanswers', endpointParams),
		dataPayload: req.body,
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

articles.post('/api/v1/gateway/questions/:id/delete', authenticate, async(req,res,next) => {
	const endpointParams = {
		'id' : req.params.id
	};
	const configObj = {
		method : 'post',
		endpoint : buildEndpoint('deletequestion',endpointParams),
		headersPayload : getHeaderPayload(req)
	};
	const requestData = Object.assign({},BaseService.defaultConfig,configObj);
	req.configObj = requestData;
	next();
},fetchData);

articles.get('/api/v1/search/content/question/match',async (req,res) => {
	const configObj = {
		method: 'get',
		endpoint: buildEndpoint('getquestionmatches'),
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

export default articles


