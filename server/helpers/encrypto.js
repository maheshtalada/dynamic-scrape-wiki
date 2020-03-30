import crypto from 'crypto';
import config from 'config';
import moment from 'moment';

const saltLength = 8;

export function encrypt(text) {
	var cipher = crypto.createCipher(config.get('auth.encryption-type'), config.get('auth.encryption-key'));
	var crypted = cipher.update(text,'utf8','hex');
	crypted += cipher.final('hex');
	return crypted;
}

export function decrypt(text) {
	var decipher = crypto.createDecipher(config.get('auth.encryption-type'), config.get('auth.encryption-key'));
	var dec = decipher.update(text,'hex','utf8');
	dec += decipher.final('utf8');
	return dec;
}

function genRandomString(length) {
	return crypto.randomBytes(Math.ceil(length/2))
		.toString('base64')
		.slice(0,length);
}

function sha512(password, salt) {
	let hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	let hashPassword = hash.digest('base64');
	return hashPassword;
}

export function generateHashPassword(userPassword) {
	let salt = genRandomString(saltLength);
	let passwordData = sha512(userPassword, salt);
	return salt + passwordData;
}

export function verifyHashPassword(hashPassword, userPassword) {
	let salt = hashPassword.substring(0, saltLength);
	let hash = hashPassword.substring(saltLength);
	let userEnteredHash = sha512(userPassword, salt);
	return userEnteredHash === hash;
}

export function verifyOTPExpiry(datePasswordExpires) {
	let passwordExpires = moment(datePasswordExpires);
	let currentDate = moment.utc();
	return passwordExpires.isAfter(currentDate);
}
