const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distPath = path.resolve(__dirname, 'server/buildServer');

module.exports = {
	entry: './server/runner.js',
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: distPath,
		filename: 'server.js',
		publicPath: __dirname + '/server'
	},
	optimization: {
		usedExports: true,
		nodeEnv: false
	},
	resolve: {
		modules: ['node_modules', 'public', 'server', 'shared', 'client'],
		extensions: ['*', '.js', ',jsx', '.json'],
	},
	module: {
		rules: [
			{ test: /\.(jsx|js)$/, use: "babel-loader", exclude: [/node_modules/, /public/, `/shared/assets/`]},
		]
	},
	plugins: [
		new CleanWebpackPlugin(['server/buildServer']),
		new webpack.IgnorePlugin(/\.(css|less)$/),
		new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true,
		})
	]
};
