const wdioConfig = require('./wdio.conf.js');

/*wdioConfig.config.capabilities = [{
    browserName: 'chrome',
}];

wdioConfig.config.services = ['phantomjs'];*/

exports.config = wdioConfig.config;
