import { roles } from '../../shared/assets/static/roles-configuration.json';
import { find as _find } from 'lodash';

const EMAIL_REGEX = /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
const MOBILE_NUMBER_REGEX = /^[0-9]{0,10}$/;

export function getRoleID(userRoles) {
	const roleIDs = userRoles && userRoles.length > 0 && userRoles.map((role) =>{
		const roleObj = _find(roles, { 'role' : role});
		return roleObj && roleObj.role_id || 0;
	});

	return Math.max.apply(null, roleIDs);
}


export function getRoleName(userRoles) {
	const roleID = getRoleID(userRoles);
	return _find(roles, { 'role_id' : roleID}).name;
}

export function checkIfValidEmailId(emailId) {
	if(!emailId) {
		return false;
	}
	return EMAIL_REGEX.test(emailId);
}

export function checkIfValidMobileNumber(phone) {
	return MOBILE_NUMBER_REGEX.test(phone);
}
