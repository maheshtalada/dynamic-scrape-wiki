const SCREEN_STATUS = ['FORGOT_PASSWORD' , 'USER_AUTO_REGISTERED', 'USER_ACCOUNT_LOCKED', 'EMPTY_PASSWORD'];

function isDisable(isFetching, inputFields) {
	return isFetching || inputFields.some(value => !value);
}

function getConditionalScreen(currentStatus) {

	if(SCREEN_STATUS.indexOf(currentStatus) > -1) {
		return {
			userstatus: "RESET_PASSWORD"
		}
	}
	if(currentStatus === 'AUTO_VERIFIED_USER_VERIFY_OTP') {
		return {
			userstatus: "AUTO_VERIFIED_USER_RESET_PASSWORD"
		}
	}

	return '';
}

function isTermsAndCondtionsRequired(contex) {
	if(contex === 'USER_AUTO_REGISTERED'
		|| contex === 'EMPTY_PASSWORD') {
		return true;
	}
	return false;
}

function getDataTagLabel(status) {
	if(status === 'USER_CREATED') {
		return 'Registration Verified';
	}

	return 'OTP Confirm';
}

module.exports = {
	isDisable,
	getConditionalScreen,
	isTermsAndCondtionsRequired,
	getDataTagLabel
};
