const WEBPACK_ENV_FILE_PATHS_CONFIG = {
	"production" : {
		outPutPath : "https://assets.propshub.com/static/build/",
		fileName : "[name]",
		buildPath : "/public/static/build",
		cleanBuild :  "public/static/build",
		iconFontName : "[name]",
		configFile : "./webpack.prod.config.js",
	},
	"analyse" : {
		outPutPath : "/static/build/",
		fileName : "[name]",
		buildPath : "/public/static/build",
		cleanBuild :  "public/static/build",
		iconFontName : "[name]",
		configFile : "./webpack.prod.config.js",
	},
	"pilot" : {
		outPutPath : "https://assets.propshub.com/static/build/",
		fileName : "[name]",
		buildPath : "/public/static/build",
		cleanBuild :  "public/static/build",
		iconFontName : "[name]",
		configFile : "./webpack.prod.config.js",
	},
	"development" : {
		outPutPath : "/static/build/",
		fileName : "[name]",
		buildPath : "/public/static/build",
		cleanBuild :  "public/static/build",
		iconFontName : "[name]",
		configFile : "./webpack.prod.config.js",
	},
	"local-dev" : {
		outPutPath : "http://localhost:9052/static/build/",
		fileName : "[name]",
		buildPath : "/public/static/build/",
		cleanBuild :  "public/static/build",
		iconFontName : "[name]",
		configFile : "./webpack.dev.config.js",
	}
};

function getFilePaths(env) {
	return WEBPACK_ENV_FILE_PATHS_CONFIG[env || 'local-dev']
}

module.exports = {
	getFilePaths
};
