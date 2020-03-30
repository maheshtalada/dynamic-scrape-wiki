import express from 'express';
import BaseService from '../services/BaseService';
import buildEndpoint, { getHeaderPayload } from '../helpers/endpointbuilder';

const realtor = express.Router();

// Middle ware that is specific to this router
realtor.use( (err, req, res, next) => {
	//console.log('Time: ', Date.now());
	next();
});

realtor.get('/api/v1/real-estate-agents/:id', async (req, res) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('realtor',endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	try{
		const client = await BaseService.fetchData(requestData);
		if(!client.realtor) {
			res.status(204).send();
			return;
		}
		client.realtor.canChat = false;
		if(client.preferredProfessional && client.preferredProfessional.data.length) {
			for(let i=0; i<client.preferredProfessional.data.length; i++) {
				client.preferredProfessional.data[i].canChat = false;
			}
		}
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

realtor.get('/api/v1/professionals/:id', async (req, res) => {

	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('professional',endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	try{
		const client = await BaseService.fetchData(requestData);
		if(!client.professional) {
			res.status(204).send();
			return;
		}
		client.canChat = false;
		if(client.preferredProfessional && client.preferredProfessional.data.length) {
			for(let i=0; i<client.preferredProfessional.data.length; i++) {
				client.preferredProfessional.data[i].canChat = false;
			}
		}
		res.send(client);

	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

realtor.get('/api/v1/company/:id', async (req, res) => {

	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('company',endPointParams),
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

realtor.get('/api/v1/brokerage-firms/:id', async (req, res) => {

	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('brokeragefirm',endPointParams),
		dataPayload : req.query,
		headersPayload : getHeaderPayload(req)
	};

	const requestData = Object.assign({},BaseService.defaultConfig,configObj);

	try{
		let client = await BaseService.fetchData(requestData);
		if(!client.brokerageFirm) {
			res.status(204).send();
			return;
		}
		if(client.preferredProfessional && client.preferredProfessional.data.length) {
			for(let i=0; i<client.preferredProfessional.data.length; i++) {
				client.preferredProfessional.data[i].canChat = false;
			}
		}
		res.send(client);

	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

realtor.get('/api/v1/search/property-listing/owner/:id', async (req, res) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('ownerlistings',endPointParams),
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

realtor.get('/api/v1/search/property-listing/brokerage-firm/:id', async (req, res) => {
	const endPointParams = { 'id' : req.params.id};
	const configObj = {
		method : 'get',
		endpoint : buildEndpoint('firmlistings',endPointParams),
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

export default realtor;


