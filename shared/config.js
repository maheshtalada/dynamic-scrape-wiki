/*
 eslint
 import/no-commonjs: 0
 import/no-unresolved: 0
 */
import { merge } from 'lodash';
const defaultConfig = require('../etc/default.json');
const environment = process.env.BUILD_ENV || process.env.NODE_ENV || 'local-dev';
let config;
if (process.env.BROWSER) {
	config = window.__CONFIG__;
} else {

	try {
		var envConfig = require('../etc/'+environment+'.json');
		config = merge({},defaultConfig,envConfig);
	} catch (e) {
		console.log('No config found for NODE_ENV=%s',environment);
		config = defaultConfig;
	}
}

export default config;
