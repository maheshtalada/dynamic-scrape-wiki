import Logger from '../logger/logger';
import * as ExceptionConstants from './exception-constants';
import Boom from 'boom';

// Mapping from our codes to boom status codes
const boomMapping = {
	'400': 'badRequest',
	'401': 'unauthorized',
	'403': 'forbidden',
	'404': 'notFound',
	'500': 'badImplementation',
	'518': 'unsupportedMediaType'
};

/**
 * ExceptionHandler Handling wrapper
 *
 * Usage
 * const exception = ExceptionHandler.getInstance(callee);
 * exception.raise(exceptionCode, category, message, data, callback);
 *
 * Example
 * const exception = ExceptionHandler.getInstance('route/route-name');
 * exception.raise(ExceptionHandler.BAD_IMPLEMENTATION, 'category.name', 'Unhandled exception', {error: 'something'}, () => {});
 *
 */
class ExceptionHandler {

	constructor(callee) {
		// Create a logging instance
		this.logger = Logger.getInstance(callee);
	}

	/**
	 * Get a new instance of the this class
	 * @param   {string} callee Description of the requesting class
	 * @returns {object}        A new instance of ExceptionHandler
	 */
	static getInstance(callee) {
		return new ExceptionHandler(callee);
	}

	/**
	 * Get the exception response, essentially the wrapper around the chosen library
	 * @param   {string}         exceptionCode ExceptionHandler code/message to match our library
	 * @param   {string}         message       Message to be added to the response
	 * @returns {object}                       The response to be returned
	 */
	getResponse(exceptionCode, message) {
		const boomCode = boomMapping[exceptionCode];
		const response = Boom[boomCode] || Boom.badImplementation;
		return response(message);
	}

	/**
	 * Raise an exception
	 * @param   {string}          exceptionCode ExceptionHandler enum
	 * @param 	{sting}			  category		Category name
	 * @param   {string}          message       ExceptionHandler message
	 * @param   {object|array}    data          Data to be passed
	 * @param   {func}            callback      Callback function
	 */
	raise(exceptionCode, category, message, data, callback) {
		// Log our exception
		this.logger.warn(category, `${exceptionCode}: ${message}`, formatData(data));

		if (callback) {
			callback(this.getResponse(exceptionCode, message));
		}
	}

}

export default Object.assign(ExceptionHandler, ExceptionConstants);


function formatData(data) {
	if (data && data.hasOwnProperty('stack')) {
		return '\n' + data.stack;
	} else {
		return data;
	}
}
