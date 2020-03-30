import validation from './validation';
import SchemaError from './SchemaError';
import { camelCase } from 'lodash/string';

export default class SchemaValidator {
	constructor(schema) {
		this._schema = schema;
	}

	/**
	 * Validate the web Client payoad data
	 * @param {object} data  - Payload data
	 * @returns {Promise} Resolves true or returns a SchemaError()
	 */
	validate(data) {

		return new Promise((resolve, reject) => {

			try {
				parseSection(this._schema, section => {
					if (section.id && section.validation) {
						this._validateSection(section, data);
					}
				});

				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}


	_validateSection(section, data) {

		// Need to recurse over array data types
		parseData(data, section.id, (value, id) => {
			section.validation.forEach(checkRule.bind(null, value, id));
		});

		return true;
	}
}


function parseSection(section, callback) {

	callback(section);

	Object.keys(section).forEach(key => {

		let property = section[key];

		if (Array.isArray(property)) {
			property.forEach(child => {
				parseSection(child, callback);
			});
		}

		if (typeof property === 'object') {
			parseSection(property, callback);
		}
	});
}


function parseData(data, id, callback) {

	let wildId = id.replace(/(\(.*\))/g, '\(.*\)');
	let match = new RegExp(wildId);

	Object.keys(data).forEach(key => {

		if (match.test(key)) {
			callback(data[key], id);
		}
	});
}


function checkRule(value, id, rule) {

	let ruleType = camelCase('validate' + capitalizeFirstLetter(rule.type));

	// TODO: Remove rule tests at some point
	if (validation[ruleType] && (rule.type === 'pattern' || rule.type === 'invalid-character' )) {

		let result = validation[ruleType](rule.value || rule.pattern || true, value || '', rule.message || '');
		if (result !== true) {
			throw new SchemaError(`${result} for id '${id}'`);
		}
	}
}


function capitalizeFirstLetter(string) {
	return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}
