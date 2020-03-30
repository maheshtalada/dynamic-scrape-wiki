import express from 'express';
import BaseService from '../services/BaseService';
import btoa from 'btoa';
import queryString from 'query-string';
import moment from 'moment';
import { getRoleID } from '../../shared/utils/userUtilities';
import { isUserLoggedIn, setUserAccountDetails } from '../helpers/sessionUtils';
import { authorizationWithRefreshToken, authorizeAccount } from '../helpers/authenticationUtils';
import buildEndpoint,  { getHeaderPayload } from '../helpers/endpointbuilder';

const user = express.Router();

// Middleware that is specific to this router
user.use( (err, req, res, next) => {
	//console.log('Time: ', Date.now());
	next();
});

const doLogin = async(req, res, custom='') => {
	const configOuth = {
		method : 'post',
		endpoint : '/oauth/token',
		dataPayload : custom ? queryString.stringify(custom.body) : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req, {
			'Authorization': 'Basic ' + btoa('my-trusted-client' + ':' + 'secret'),
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	try {
		const response =  await BaseService.fetchData(configOuth);
		// get user Object
		const configUser = {
			method : 'get',
			endpoint : '/api/v1/users/account',
			dataPayload : {
				'access_token' : response.access_token
			},
			headersPayload : getHeaderPayload(req)
		};

		try {
			let client = await BaseService.fetchData(configUser);
			const fileid = client.id;
			client.role_id = getRoleID(client.roles);
			// add access token & send response
			const propshubStore = Object.assign({...client},
				{'refresh_token' : response.refresh_token,
					'access_token' : response.access_token,
					'expires_in' : response.expires_in,
					'fileid': fileid,
					'created_time' : moment().unix()
				}
			);

			// set session data in propshub redis
			req.session.upgrade( fileid, ( err ) =>{
				if( err ) {
					return res.send({
						msg : 'not set redis',
						error : err
					});
				}
				req.session.user = JSON.stringify(propshubStore);
				res.send(Object.assign(client, {'refresh_token' : response.refresh_token}));
			});

		} catch (e) {
			// logger with error details
			res.status(e.statusCode).send(e);
		}

	} catch (e) {
		res.status(e.statusCode).send(e);
	}
};
// Define the home route
user.post('/api/v1/oauth/token', async(req, res) => {

	return doLogin(req, res);
});


user.get('/api/v1/logout', (req, res) => {

	// destroy global session
	// global.access_token ='';
	// destroy propshub redis store of current client
	req.session.destroy(() => {
		res.send({
			status : 'success'
		});
	});

});

user.post('/api/v1/gateway/users/generateotp' , async(req, res) => {

	const otpConfig = {
		method : 'post',
		endpoint : '/api/v1/gateway/users/generateotp',
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req,{
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	try{
		const client = await BaseService.fetchData(otpConfig);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

user.post('/api/v1/gateway/users/verify' , async(req, res) => {

	const verifyConfig = {
		method : 'post',
		endpoint : '/api/v1/gateway/users/verify',
		dataPayload : queryString.stringify({
			username : req.body.username,
			token : req.body.token
		}),
		headersPayload : getHeaderPayload(req,{
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	try{
		const client = await BaseService.fetchData(verifyConfig);
		if(req.body.password) {
			const custom = {
				path : '/oauth/token',
				body : {
					grant_type : 'password',
					username : req.body.username,
					password : req.body.password
				}
			};
			// res.send(client.data);
			return doLogin(req, res, custom);
		} else {
			res.send(client);
		}
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

user.post('/api/v1/user-profile/reset-password/verify' , async(req, res) => {

	const verifyConfig = {
		method : 'post',
		endpoint : '/api/v1/user-profile/reset-password/verify',
		dataPayload : queryString.stringify({
			token : req.body.token
		}),
		headersPayload : getHeaderPayload(req,{
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	try{
		const client = await BaseService.fetchData(verifyConfig);
		if(client.message === 'TOKEN_EXPIRED') {
			const otpConfig = {
				method : 'post',
				endpoint : '/api/v1/gateway/users/generateotp',
				dataPayload : queryString.stringify({
					token : req.body.token,
					username : client.username
				}),
				headersPayload : getHeaderPayload(req,{
					'Content-Type': 'application/x-www-form-urlencoded'
				})
			};
			try {
				await BaseService.fetchData(otpConfig);
			} catch (e) {
				res.status(e.statusCode).send(e);
			}
		}
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

user.post('/api/v1/user-profile/reset-password' , async(req, res) => {

	const verifyConfig = {
		method : 'post',
		endpoint : '/api/v1/user-profile/reset-password',
		dataPayload : queryString.stringify({
			token : req.body.token,
			password : req.body.password,
			name : req.body.name,
		}),
		headersPayload : getHeaderPayload(req,{
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	try{
		const client = await BaseService.fetchData(verifyConfig);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

user.post('/api/v1/user-profile/changepassword' , async(req, res) => {

	const body = Object.assign({},req.body);
	const changePasswordConfig = {
		method : 'post',
		endpoint : '/api/v1/user-profile/changepassword',
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req,{
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	try{
		const client = await BaseService.fetchData(changePasswordConfig);
		if(client.message !== 'UPDATED') {
			res.send(Object.assign({},client, {status : 'failed'}));
		} else {
			const custom = {
				path : '/oauth/token',
				body : {
					grant_type : 'password',
					username : body.username,
					password : body.password
				}
			};

			return doLogin(req, res, custom);
		}

	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

/*user.post('/api/v1/users' , async(req, res) => {

	const usersConfig = {
		method : 'post',
		endpoint : '/api/v1/users',
		dataPayload : req.body,
		headersPayload : getHeaderPayload(req,{
			'Content-Type': 'application/json'
		})
	};

	try{
		const client = await BaseService.fetchData(usersConfig);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});*/

user.post('/api/v1/user-profile/unsubscribe' , async(req, res) => {

	const usersConfig = {
		method : 'post',
		endpoint : '/api/v1/user-profile/unsubscribe',
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req,{
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	try{
		const client = await BaseService.fetchData(usersConfig);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

user.post('/api/v1/user-profile/lookup' , async(req, res) => {

	const userLookupConfig = {
		method : 'post',
		endpoint : buildEndpoint('userlookup'),
		dataPayload : queryString.stringify(req.body),
		headersPayload : getHeaderPayload(req,{
			'Authorization': 'Basic ' + btoa('my-trusted-client' + ':' + 'secret'),
			'Content-Type': 'application/x-www-form-urlencoded'
		})
	};

	try{
		const client = await BaseService.fetchData(userLookupConfig);
		res.send(client);
	} catch (e) {
		res.status(e.statusCode).send(e);
	}
});

user.post('/api/v1/users/refreshtoken' , async(req, res) => {
	const custom = {
		path : '/oauth/token',
		body : {
			grant_type : 'refresh_token',
			refresh_token : req.body.refresh_token
		}
	};
	return doLogin(req, res, custom);
});

user.get('/api/v1/userloginstatus/:userid', async(req, res ) => {
	let loginResponse;
	try {
		loginResponse = await isUserLoggedIn(req, req.params.userid);
	} catch (e) {
		loginResponse = {
			'error' : 'user login status check failed',
			'status' : 'failed'
		};
	}
	res.send(loginResponse);
});

export default user;
