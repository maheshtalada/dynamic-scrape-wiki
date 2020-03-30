import { findIndex as _findIndex, find as _find } from 'lodash';

export function getSessionData(req) {
	if(req.session && req.session.user) {
		return {
			...JSON.parse(req.session.user)
		};
	}
	return;
}

export function isUserLoggedIn(req, userid) {

	const redisHandler = req.session.getRedisSessionsModule();

	// do early exit check
	if(req.session.user) {
		const { id } = JSON.parse(req.session.user);
		if(id === userid) {
			return Promise.resolve(false);
		}
	}
	// check for redis
	// TODO improve this logic to find directly id from redis instead getting all sessions & finding
	return new Promise((resolve, reject) => {
		redisHandler.soapp({
			app: 'sid',
			dt: 1200},
			(err, resp) => {
				if (err || resp.sessions.length === 0) {
					return reject(false);
				} else {
					if( _findIndex(resp.sessions, {id: userid}) > -1 ) {
						return resolve(true);
					}
					return reject(false);
				}
			}
		);
	});

}

export function setUserAccountDetails(req, fileid) {
	// set session data in propshub redis
	return new Promise( (resolve, reject) => {
		req.session.upgrade( fileid, ( err ) =>{
			if( err ) {
				return reject({
					msg : 'not set redis',
					error : err
				});
			}

			return resolve();
		});
	});
}
