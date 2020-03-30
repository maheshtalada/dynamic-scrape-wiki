import express from 'express';
/*import BaseService from '../services/BaseService';
import buildEndpoint from '../helpers/endpointbuilder';*/

export const chat = express.Router();

// Middle ware that is specific to this router
chat.use( (err, req, res, next) => {
	console.log('Time: ', Date.now());
	next();
});

/* chat.get('/api/v1/property-listings/:id', async (req, res) => {


});*/

/*module.exports = chat;*/
