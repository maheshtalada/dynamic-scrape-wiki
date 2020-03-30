import moment from 'moment';
import { getSessionData, setUserAccountDetails } from '../helpers/sessionUtils';
import { authorizationWithRefreshToken, authorizeAccount } from '../helpers/authenticationUtils';
//import Logger from '../../shared/utils/logger/logger';

// as we building server files
// adding instance path statically
//const logger = Logger.getInstance('middleware/authenticate.js');

export async function authorizeRequest(req, payload) {
	try {
		const authResponse = await authorizationWithRefreshToken(payload);
		//update session
		try {
			await setUserAccountDetails(req, authResponse.fileid);
			return Promise.resolve(authResponse);
		} catch (e) {
			return Promise.reject({
				context : e.msg,
				error : e.err,
				code : 500
			});
		}
	} catch (e) {
		const  { error, context } = e;
		return Promise.reject({error, context, code : 500});
	}
}

const authenticate = (async (req, res, next) => {
	let sessionData = getSessionData(req);
	// check if the access_token is still alive or expired,
	let payload = {
		path : '/oauth/token',
		body : {
			grant_type : 'refresh_token'
		}
	};

	if(sessionData && sessionData.access_token) {
		const m = moment.unix(sessionData.created_time);
		//refresh token call 20 sec early before it expires
		const buffer = moment(m).add(sessionData.expires_in - 20,'s').format('YYYY-MM-DD HH:mm');
		if( moment(buffer).unix() < moment().unix()) {
			//logger.info("api.outh", "access token expired",{ "expirytime" :buffer, "currenttime" : moment().format('YYYY-MM-DD HH:mm') });
			payload.body.refresh_token = sessionData.refresh_token;
		} else {
			return next();
		}
	} else {
		const { refreshkey = undefined } = req.cookies;
		// if remember me is on
		if(refreshkey) {
			payload.body.refresh_token = refreshkey;
		} else {
			return res.status(401).send({
				statusCode : 401,
				status : 'Unauthorized'
			});
		}
	}

	try {
		const userData = await authorizeRequest(req, payload);
		req.session.user = JSON.stringify(userData);
		return next();
	} catch (e) {
		const { code , error, context } = e;
		res.status(code).send( {error, context});
	}

});

export default authenticate;



