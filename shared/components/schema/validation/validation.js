import { uniq } from 'lodash';

class Validation {

	validateRequired(isRequired, value, message) {
		message = message || 'This field is required';
		if (!this._required(isRequired, value)) {
			return message;
		}
		return true;
	}

	validateMinValue(min, value, message) {
		message = message || 'Please enter a minimum of ### value';
		if (!this._minValue(min, value)) {
			return `${message}###${min}`;
		}
		return true;
	}

	validateGreaterValue(min, value, message, currentValue){
		if(!(parseFloat(currentValue.value) >= parseFloat(currentValue.dependableValue))) {
			return `${message}###${currentValue.dependableValue}`;
		}
		return true
	}

	validateLessValue(min, value, message, currentValue){
		if(!(parseFloat(currentValue.value) <= parseFloat(currentValue.dependableValue))) {
			return `${message}###${currentValue.dependableValue}`;
		}
		return true
	}

	validateMaxValue(max, value, message) {

		message = message || 'Please enter a maximum value of ###';
		if (!this._maxValue(max, value)) {
			return `${message}###${max}`;
		}
		return true;
	}

	validateMinLength(length, value, message) {
		message = message || 'Please enter a minimum of ### characters';
		if (!this._minLength(length, value)) {
			return `${message}###${length}`;
		}
		return true;
	}

	validateMaxLength(length, value, message) {
		message = message || 'Please enter the maximum characters of ###';
		if (!this._maxLength(length, value)) {
			return `${message}###${length}`;
		}
		return true;
	}

	validateMinDate(mdate, value, message) {
		message = message || 'Please enter the minimum date of ###';
		if (!this._minDate(mdate, value)) {
			return `${message}###${mdate}`;
		}
		return true;
	}

	validateMaxDate(mdate, value, message) {
		message = message || 'Please enter the maximum date of ###';
		if (!this._maxDate(mdate, value)) {
			return `${message}###${mdate}`;
		}
		return true;
	}

	validateMinMonthYear(mdate, value, message) {
		message = message || 'Please enter the minimum month & year of ###';
		if (!this._minMonthYear(mdate, value)) {
			return `${message}###${mdate}`;
		}
		return true;
	}

	validateMaxMonthYear(mdate, value, message) {
		message = message || 'Please enter the maximum month & year of ###';
		if (!this._maxMonthYear(mdate, value)) {
			return `${message}###${mdate}`;
		}
		return true;
	}

	validateInvalidCharacter(pattern, value, message) {
		message = message || 'Please remove the following invalid characters:###';

		if (!this._invalidCharacter(pattern, value)) {
			let regex = this._buildRegex(pattern);
			return `${message}###${uniq(value.match(regex)).join(',')}`;
		}
		return true;
	}

	validatePattern(pattern, value, message) {
		message = message || 'Please use the correct pattern';
		if (!this._testPattern(pattern, value)) {
			return message;
		}
		return true;
	}

	checkForSubmit(dependableValue, value, handler) {
		if(handler === 'submit') {
			return value;
		}
		return dependableValue;
	}

	checkAllowValidation(handler,dependableValue) {
		if(handler !== 'submit') {
			return true;
		}

		if(dependableValue) {
			return true;
		}

		return false;
	}

	validateValue(value, validationRules, dependableValidations ='', dependableValue, handler, conditionalValue='') {
		if(conditionalValue) {
			value = conditionalValue;
		}
		if ( validationRules && Array.isArray(validationRules)) {
			for (let i = 0; i < validationRules.length; ++i) {
				let rule = this._parseRule(validationRules[i]);
				if (this[rule.name]) {
					var results = this[rule.name](rule.value, value, rule.message);
					if (results !== true) {
						return results || 'Invalid Field Data';
					}
				}
			}
		}

		if(dependableValidations && Array.isArray(dependableValidations.validation)) {
			const rules = dependableValidations.validation;
			for (let i = 0; i < rules.length; ++i) {
				let rule = this._parseRule(rules[i]);
				if (this[rule.name] && handler === rules[i].handler && this.checkAllowValidation(rules[i].handler,dependableValue)) {
					var results = this[rule.name](rule.value, this.checkForSubmit(dependableValue, value, rules[i].handler), rule.message,{
						value : value || 0,
						dependableValue : dependableValue || 0
 					});
					if (results !== true) {
						return results || 'Invalid Field Data';
					}
				}
			}
		}

		return true;
	}


	_buildRegex(pattern) {
		var flags = '';
		if (pattern.indexOf('/') === 0) {
			var lastSlash = pattern.lastIndexOf('/');
			flags = pattern.substr(lastSlash + 1);
			pattern = pattern.substr(1, lastSlash - 1);
		}
		return new RegExp(pattern, flags);
	}

	_toCamelCase(arr) {
		return arr.join('-').replace(/-\w/g, function(m) {
			return m[1].toUpperCase();
		});
	}

	_required(isRequired, value) {
		value = String(value);
		if (isRequired && !value.trim().length) {
			return false;
		}
		return true;
	}

	_minLength(length, value) {
		value = String(value);
		if (value.trim().length && value.trim().length < length) {
			return false;
		}
		return true;
	}

	_minValue(min, value) {
		min = min || 0;
		value = value || 0;
		if (value && parseFloat(value) < parseFloat(min)) {
			return false;
		}
		return true;
	}

	_maxValue(max, value) {
		max = max || 0;
		value = value || 0;
		return !(parseFloat(value) > parseFloat(max));
	}

	_maxLength(length, value) {
		value = String(value);
		if (value.trim().length > length) {
			return false;
		}
		return true;
	}

	_stringToDate(value) {
		let date = value.split(/[\/\-\.]/, 3);
		if (date.length !== 3) {
			return false;
		}
		let month = parseInt(date[1]),
			day = parseInt(date[0]),
			year = parseInt(date[2]);

		return new Date(year, month - 1, day);
	}

	_maxDate(date, value) {
		if(value.replace('//','') === '') {
			return true;
		}
		let mDate = this._stringToDate(date),
			currentValue = this._stringToDate(value);
		return currentValue <= mDate;
	}

	_maxMonthYear(date, value) {
		let cDate = new Date().getDate(),
			mDate = cDate + '/' + date,
			vDate = cDate + '/' + value;
		return this._maxDate(mDate, vDate);
	}

	_minMonthYear(date, value) {
		let cDate = new Date().getDate(),
			mDate = cDate + '/' + date,
			vDate = cDate + '/' + value;
		return this._minDate(mDate, vDate);
	}

	_minDate(date, value) {
		if(value.replace('//','') === '') {
			return true;
		}
		let mDate = this._stringToDate(date),
			currentValue = this._stringToDate(value);
		return currentValue >= mDate;
	}

	_invalidCharacter(pattern, value) {
		return !this._testPattern(pattern, value);
	}

	_testPattern(pattern, value) {
		if (value === '') {
			return true;
		}

		let regex = this._buildRegex(pattern);
		return regex.test(value);
	}


	_parseRule(validationRule) {
		return {
			name: this._toCamelCase(['validate', validationRule.type]),
			value: validationRule.value || true,
			message: validationRule.message || ''
		};
	}
}

export default new Validation();
