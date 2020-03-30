import os from 'os';
import winston from 'winston';
import { assign } from 'lodash/object';
import { map } from 'lodash/collection';
import LEVELS from './levels';

/**
* Logging wrapper
*
* Usage
* const logger = Logger.getInstance(callee);
* logger.level(category, message, ...meta);
*
* Example
* const logger = Logger.getInstance('route/route-name');
* logger.debug('api.auth', 'Auth failed', {user: 'dave'});
*/
class Logger {

	constructor(callee) {
		// Set the internal info including calling class/origin
		this.internalMeta = {
			class: callee
		};

		// Create our logging methods
		this.generateLogMethods(Object.keys(LEVELS));
	}

	/**
	* Get a new instance of the this class
	* @param   {string} callee Description of the requesting class
	* @returns {object}       A new instance of Logger
	*/
	static getInstance(callee) {
		return new Logger(callee);
	}

	/**
	* Getter for internal meta
	* @returns {object} Internal meta data for log
	*/
	get internalMeta() {
		return assign(this._internalMeta, {
			pid: process.pid,
			host: os.hostname()
		});
	}

	/**
	* Setter for internal data
	* @param  {object} meta Internal data to be added
	*/
	set internalMeta(meta) {
		this._internalMeta = meta;
	}

	/**
	* Set external meta data
	* @param {func} data Data to be registered
	*/
	static set externalMeta(data) {
		this._externalMeta = data;
	}

	/**
	* Get meta data from external feed
	* @returns {object} External meta data
	*/
	static get externalMeta() {
		if (typeof this._externalMeta === 'function') {
			return this._externalMeta();
		}
		return this._externalMeta;
	}

	/**
	* Getter of config property
	* @returns {object} Logger configuration, mainly transport config
	*/
	static get config() {
		return this._config;
	}

	/**
	* Setter of the config property
	* @param  {object} values New configuration to be set
	*/
	static set config(values) {
		// Set the default levels
		winston.setLevels(LEVELS);

		// Set the transports
		if (values.transports) {
			winston.loggers.options.transports = this.getTransports(values.transports);
		}
		this._config = values;
	}

	/**
	* Get transport options
	* @param  {object} transports An object of transport options
	* @returns {object} transports Formatted transports to be used with plugin
	*/
	static getTransports(transports) {
		return map(transports, (transport, type) => {
			return new winston.transports[type](transport);
		});
	}

	/**
	* Add a new logger category
	* @param {string} id Category identifier
	*/
	addCategory(id) {
		winston.loggers.add(id);
	}

	/**
	* Get a log category
	* @param  {string} id Identifier of the log category
	* @returns {object}   The category instance
	*/
	getCategory(id) {
		return winston.loggers.get(id);
	}

	/**
	* Generator for logging methods onto the class
	* @param  {Array} levels A list of level methods to generate
	*/
	generateLogMethods(levels) {
		const self = this;

		levels.forEach((level) => {
			self[level] = (instance, message, ...meta) => {
				self.log(instance, level, message, ...meta);
			};
		});
	}

	/**
	* Main log function for all levels
	* @param  {string} category Identifier of the log category
	* @param  {string} level    Logging level
	* @param  {string} message  Log message
	* @param  {object} meta     Meta information
	*/
	log(category, level, message = '', ...meta) {

		if (!this[level]) {
			throw new Error('Log method does not exist');
		}

		const instance = this.getCategory(category);
		const finalMeta = assign(this.internalMeta, Logger.externalMeta, {category: category});
		const metaDataKey = 'logData=';

		instance[level](message,metaDataKey , ...meta, finalMeta);
	}

}

export default Logger;
