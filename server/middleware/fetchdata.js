import BaseService from '../services/BaseService';
import { getSessionData, setUserAccountDetails } from '../helpers/sessionUtils';
import { authorizationWithRefreshToken, authorizeAccount } from '../helpers/authenticationUtils';
//import Logger from '../../shared/utils/logger/logger';
// as we building server files
// adding instance path statically
//const logger = Logger.getInstance('middleware/fetchdata.js');

const fetchData = (async (req, res) => {
	let requestObject ={},
		headersPayload = {},
		sessionData = getSessionData(req),
		configObj = req.configObj;
	delete configObj.token;
	configObj.headersPayload = Object.assign({},{...configObj.headersPayload},{'countrycode' : req.cookies.country,
		'clientip' : req.headers.clientip});
	if(configObj) {
		if(sessionData && sessionData.access_token) {
			headersPayload = {
				headersPayload : {
					'Authorization': 'Bearer ' + sessionData.access_token,
					...configObj.headersPayload
				}
			};
		}
		delete configObj.headersPayload;
		requestObject = Object.assign(configObj, {...headersPayload});
		try{
			const authorizeCallData = await BaseService.fetchData(requestObject);
			//whenever any action occurs which results in change of any user related data(user profile, add to wishlist etc), this is required.
			if(req.isUpdateSession) {
				try {
					const responseUserObject = await authorizeAccount(sessionData);
					try {
						await setUserAccountDetails(req, responseUserObject.fileid);
						req.session.user = JSON.stringify(responseUserObject);
					} catch (e) {
						return res.status(500).send({
							context : e.msg,
							error : e.err
						});
					}
				} catch (e) {
					const { error , context } = e;
					const msg = {
						error,
						status : error.statusCode,
						context
					};
					return res.status(error.statusCode).send(msg);
				}
			}
			res.send(authorizeCallData);
		} catch (e) {
			res.status(e.statusCode).send(e);
		}
	} else {
		res.status(400).send('not found');
	}

});

export default fetchData;

