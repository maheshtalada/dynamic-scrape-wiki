const path                 = require('path'),
	webpack           = require('webpack'),
	OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
	{ getFilePaths } = require('./scripts/webpack/filePaths'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	BrotliPlugin = require('brotli-webpack-plugin'),
	WorkboxPlugin = require('workbox-webpack-plugin'),
	buildPaths = getFilePaths(process.env.NODE_ENV),
	TerserPlugin = require('terser-webpack-plugin'),
	merge = require('webpack-merge'),
	baseConfig = require('./webpack.base.config.js');

const plugins = [
	new CleanWebpackPlugin([buildPaths.cleanBuild]),
	new MiniCssExtractPlugin({
		filename: `${buildPaths.fileName}.css?v=[hash:8]`,
	}),
	new webpack.HashedModuleIdsPlugin(),
	new BrotliPlugin({
		asset: '[path].br?[query]',
		test: /\.(js|css|json|svg|eot|ttf|woff)(\?.*)?$/i,
		threshold: 10240,
		minRatio: 0.8
	}),
	new WorkboxPlugin.GenerateSW({
		// these options encourage the ServiceWorkers to get in there fast
		// and not allow any straggling "old" SWs to hang around
		clientsClaim: true,
		skipWaiting: true,
	}),

];

module.exports = merge(baseConfig, {
	optimization: {
		minimize: true,
		minimizer: [
			new OptimizeCSSAssetsPlugin({}),
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				exclude: /node_modules/, // skip pre-minified libs
				parallel: true,
				terserOptions : {
					compress: {
						inline: 1,
						keep_classnames: true,
						keep_fnames: true,
					},
					mangle: {
						keep_fnames: true,
					},
					keep_fnames: true,
				}
			})
		]
	},
	plugins,
	output: {
		path: path.join(__dirname, buildPaths.buildPath),
		publicPath: buildPaths.outPutPath,
		filename: `${buildPaths.fileName}.js?v=[hash:8]`,
		chunkFilename: `${buildPaths.fileName}.js?v=[hash:8]`,
		crossOriginLoading: "anonymous"
	},
});
