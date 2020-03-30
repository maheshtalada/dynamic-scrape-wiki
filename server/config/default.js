/*
 eslint
 import/no-commonjs: 0
 import/no-unresolved: 0
 */
const merge = require('lodash').merge;

// as we building server files
// adding instance path statically
const defaultConfig = require('./default.json');
const environment = process.env.BUILD_ENV || process.env.NODE_ENV || 'local-dev';

try {
	const envConfig = require('./'+environment+'.json');
	module.exports = merge({},defaultConfig,envConfig);
} catch (e) {
	console.log('No config found for NODE_ENV=%s',environment);
	module.exports = defaultConfig;
}

