const path                 = require('path'),
	webpack           = require('webpack'),
	AssetsPlugin      = require('assets-webpack-plugin'),
	MomentLocalesPlugin = require('moment-locales-webpack-plugin'),
	{ getFilePaths } = require('./scripts/webpack/filePaths'),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	HappyPack = require('happypack'),
	buildPaths = getFilePaths(process.env.NODE_ENV);

const plugins = [
	new MomentLocalesPlugin(),
	new webpack.DefinePlugin({
		"process.env": {
			BROWSER: JSON.stringify(true),
			NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'local-dev' )
		}
	}),
	new HappyPack({
		id: 'js',
		threads: 4,
		// https://github.com/babel/babel-loader#options
		loaders: ['babel-loader?cacheDirectory'],
	}),
	new AssetsPlugin({path: path.join(__dirname, 'etc')}),
];

module.exports = {
	target: 'web',
	entry: {
		main : './client/app.js',
	},
	optimization: {
		usedExports: true,
		nodeEnv: false,
		splitChunks: {
			chunks: 'all',
			minSize: 10000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](react|react-dom|react-redux|react-router|redux-thunk|prop-types)[\\/]/,
					name: 'vendor',
				},
				common: {
					test: /[\\/]node_modules[\\/](loadable-components|axios|jed|moment|react-lazy-load-image-component|react-redux-modal)[\\/]/,
					name: 'common',
				}
			}
		}
	},
	plugins,
	stats: {
		// Examine all modules
		//maxModules: Infinity,
		// Display bailout reasons
		//optimizationBailout: true,
		chunks: true
	},
	resolve: {
		modules: ['node_modules', 'public', 'shared', 'client'],
		extensions: ['*', '.js', ',jsx', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader,"css-loader","postcss-loader"]
			},
			{
				test: /\.less$/,
				use: [MiniCssExtractPlugin.loader,"css-loader","less-loader"]
			},
			{ test: /\.gif$/, use: "url-loader?limit=10000&mimetype=image/gif" },
			{ test: /\.jpg$/, use: "url-loader?limit=10000&mimetype=image/jpg" },
			{ test: /\.jpeg$/, use: "url-loader?limit=10000&mimetype=image/jpeg" },
			{ test: /\.png$/, use: "url-loader?limit=10000&mimetype=image/png" },
			{ test: /\.svg/, use: "url-loader?limit=26000&mimetype=image/svg+xml" },
			{ test: /\.(woff|woff2|ttf|eot)/, use: `url-loader?limit=10000&name=${buildPaths.iconFontName}.[ext]?v=[hash:8]` },
			{ test: /\.(jsx|js)$/, use: "babel-loader", exclude: [/node_modules/, /public/]},
			{ test: /\.txt$/, use: "raw-loader"},
			/*{
			 test: /\.js$/,
			 use: 'eslint',
			 enforce:'pre',
			 exclude: /node_modules|\.spec\.js/,
			 options: {
			 quiet: false,
			 fix:false,
			 failOnError: false,
			 failOnWarning: false,
			 emitError: false,
			 emitWarning: false
			 }
			 }*/
		]
	}
};
