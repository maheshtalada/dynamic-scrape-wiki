const { getFilePaths } = require('./scripts/webpack/filePaths'),
	buildPaths = getFilePaths(process.env.NODE_ENV),
	config  = require(buildPaths.configFile);
module.exports = config;
