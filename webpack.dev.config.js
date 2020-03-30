const path = require('path'),
	merge = require('webpack-merge'),
	webpack = require('webpack'),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	{ getFilePaths } = require('./scripts/webpack/filePaths'),
	buildPaths = getFilePaths(process.env.NODE_ENV),
	baseConfig = require('./webpack.base.config.js');

const plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new MiniCssExtractPlugin({
		filename: `${buildPaths.fileName}.css`,
	}),
];

module.exports = merge(baseConfig,{
	devServer : {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		hot: true,
		compress: true,
		host: 'localhost',
		port: 9052
	},
	cache: true,
	plugins,
	output: {
		path: path.join(__dirname, buildPaths.buildPath),
		publicPath: buildPaths.outPutPath,
		filename: `${buildPaths.fileName}.js`,
		chunkFilename: `${buildPaths.fileName}.js`,
		crossOriginLoading: "anonymous"
	},
});
