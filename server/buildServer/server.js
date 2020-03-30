#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./" + chunkId + ".server.js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/maheshtalada/old-dynamic-scrape-wiki/server";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*
    eslint
        import/no-commonjs: 0
*/
__webpack_require__(1); // TODO adding pollyfill here move it later


Array.prototype.chunk = function (n) {
  if (!this.length) {
    return [];
  }

  return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _middleware_SSRMiddleware__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11);
/* harmony import */ var _middleware_requestContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(77);
/* harmony import */ var open__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(79);
/* harmony import */ var open__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(open__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _routes_application__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(86);













var useragent = __webpack_require__(80);

var app = express__WEBPACK_IMPORTED_MODULE_2___default()();

var server = __webpack_require__(81).createServer(app);

var expressStaticGzip = __webpack_require__(82);

var io = __webpack_require__(83)(server);

var chat = __webpack_require__(84); //set view engine


app.set('views', path__WEBPACK_IMPORTED_MODULE_6___default.a.join(__dirname, 'templates')); //disable express powered by

app.disable('x-powered-by'); // initialize chat listener

/*chat.init(io);*/
// start middleware initialization

app.use(useragent.express());
app.use(_middleware_requestContext__WEBPACK_IMPORTED_MODULE_10__["default"].middleware('request')); // not for local dev
//adding header for workbox  SW scope  change

if (process.env.NODE_ENV !== 'local-dev') {
  app.use('*.(js|css|json|svg|eot|ttf|woff)', function (req, res, next) {
    res.header('Service-Worker-Allowed', '/');
    next();
  });
} // static file serving with compression


app.use(compression__WEBPACK_IMPORTED_MODULE_5___default()());
app.use("/static", expressStaticGzip("public/static", {
  enableBrotli: true,
  orderPreference: ['br', 'gz']
}));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_3___default()());
app.use(body_parser__WEBPACK_IMPORTED_MODULE_4___default.a.json({
  limit: '10mb',
  extended: true
})); // for parsing application/json

app.use(body_parser__WEBPACK_IMPORTED_MODULE_4___default.a.urlencoded({
  limit: '10mb',
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(express__WEBPACK_IMPORTED_MODULE_2___default.a.query());
/*// create fake window object
global.window = new Object();
global.document = new Object({
	createElement : ()=>{}
});*/
//serve fevicon.ico

app.get('/favicon.ico', function (req, res) {
  return res.status(204).send({
    nope: true
  });
}); // initialize chat listener
//chat.init(io);

app.set('socketio', io);
io.on('connection', function (socket) {
  //socket.emit('recivesocketId', socket.id) // send each client their socket id
  //onJoinRoom(io, socket, data)
  socket.on('joinRoom', function (data) {
    socket.join(data.room);
    socket.emit('recivesocketId', data.room);
  });
});

app.use(_routes_application__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"]); // SSR Middleware

app.use(_middleware_SSRMiddleware__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);
var PORT = process.env.PORT || 5002;
frameworkGlobals.port = PORT;
server.listen(PORT,
/*#__PURE__*/
_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
/*#__PURE__*/
_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("server Listening on port ".concat(PORT), "environment", process.env.NODE_ENV);
          console.log("Application Running", " ", "http://localhost:".concat(PORT));
          _context.next = 4;
          return open__WEBPACK_IMPORTED_MODULE_11___default()("http://localhost:".concat(PORT));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_core_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_redux_store_configureStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(28);
/* harmony import */ var _shared_i18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(41);
/* harmony import */ var _shared_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(47);
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(57);
/* harmony import */ var _helpers_renderer_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(65);
/* harmony import */ var _public_static_lang_us_us_en_json__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(67);
var _public_static_lang_us_us_en_json__WEBPACK_IMPORTED_MODULE_13___namespace = /*#__PURE__*/__webpack_require__.t(67, 1);
/* harmony import */ var _shared_assets_static_meta_data_config_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(62);
var _shared_assets_static_meta_data_config_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(62, 1);
/* harmony import */ var _render404Html__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(68);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(70);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_cookie__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _shared_redux_actions_application__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(71);
/* harmony import */ var _requestContext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(77);
















 //import Logger from '../../shared/utils/logger/logger';



/*import { REQUEST_CHECK_USER_SESSION } from '../../shared/redux/actions/user';*/
//import { authorizeRequest } from './authenticate';
// as we building server files
// adding instance path statically
//const logger = Logger.getInstance('middleware/SSRMiddleware.js');
// Initializa localization

var i18nToolsRegistry = {
  us_en: new _shared_i18n__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].Tools({
    localeData: _public_static_lang_us_us_en_json__WEBPACK_IMPORTED_MODULE_13__,
    locale: 'us_en'
  })
}; // setup app globals for action handlers

global.frameworkGlobals = {
  isServer: true,
  isClient: false,
  isDev: false,
  basePath: '',
  clients: [],
  env: Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getEnv */ "e"])(),
  origin: _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].origin
};


function findDevice(_ref) {
  var isMobile = _ref.isMobile,
      isTablet = _ref.isTablet,
      isiPad = _ref.isiPad,
      isDesktop = _ref.isDesktop;

  if (isTablet || isiPad) {
    return 2;
  }

  if (isMobile) {
    return 1;
  }

  return 4;
}

var matchRoutes = Object(_shared_core_routes__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])();

var renderer =
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(req, res, next) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            Object(react_router__WEBPACK_IMPORTED_MODULE_5__["match"])({
              routes: matchRoutes,
              location: req.url
            },
            /*#__PURE__*/
            function () {
              var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
              /*#__PURE__*/
              _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(error, redirectLocation, renderProps) {
                var locale, country, i18nTools, nonce, ip, store, visitorCountry, visitorCountryName, server, _renderProps$routes$, whitelist, pagename, _renderProps$routes$$, loggedinCoditionalRedirect;

                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        locale = Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* detectLocale */ "a"])(req);
                        country = Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getCountry */ "d"])(req);
                        i18nTools = i18nToolsRegistry[locale];
                        nonce = parseInt(Math.random() * 1000000, 10) + new Date().getTime();
                        frameworkGlobals.nonce = nonce;
                        frameworkGlobals['siteCaptionIndex'] = Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getSiteCaptionIndex */ "g"])(); // handle error routes
                        //// no match router goto server side & 404 redirect

                        if (!error) {
                          _context2.next = 11;
                          break;
                        }

                        //logger.error("ui.server", "SSR Rendering failed",{ "error" : error, location : req.url});
                        res.send(500, error.message);
                        return _context2.abrupt("return");

                      case 11:
                        if (renderProps) {
                          _context2.next = 14;
                          break;
                        }

                        //logger.error("ui.server", "SSR Rendering failed",{ "error" : "route not matched", location : req.url});
                        Object(_render404Html__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(res, i18nTools);
                        return _context2.abrupt("return");

                      case 14:
                        // initial data setup
                        ip = Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getIp */ "f"])(req);
                        store = Object(_shared_redux_store_configureStore__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])();
                        visitorCountry = req.headers && req.headers['user-country-code'];
                        visitorCountryName = req.headers && req.headers['user-country-name']; //update to context for later use in API bridge

                        _requestContext__WEBPACK_IMPORTED_MODULE_18__["default"].set('request:visitorIP', ip);
                        _requestContext__WEBPACK_IMPORTED_MODULE_18__["default"].set('request:cookie_sid', req.cookies.sid || req.query.sid);
                        _requestContext__WEBPACK_IMPORTED_MODULE_18__["default"].set('request:hostname', "".concat(req.protocol, "://localhost:").concat(frameworkGlobals.port));
                        _requestContext__WEBPACK_IMPORTED_MODULE_18__["default"].set('request:country', country);
                        _requestContext__WEBPACK_IMPORTED_MODULE_18__["default"].set('request:location', req.cookies && req.cookies.locationname || '');
                        _requestContext__WEBPACK_IMPORTED_MODULE_18__["default"].set('request:visitorCountry', visitorCountry);
                        _requestContext__WEBPACK_IMPORTED_MODULE_18__["default"].set('request:visitorCountryName', visitorCountryName); // check redis session for secure routes
                        // handle redirects , remember me

                        server = 'on';

                        if (renderProps && renderProps.routes) {
                          _renderProps$routes$ = renderProps.routes[1], whitelist = _renderProps$routes$.whitelist, pagename = _renderProps$routes$.pagename, _renderProps$routes$$ = _renderProps$routes$.loggedinCoditionalRedirect, loggedinCoditionalRedirect = _renderProps$routes$$ === void 0 ? undefined : _renderProps$routes$$;
                        } // start pulling data for SSR


                        Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* fetchComponentsData */ "b"])({
                          locale: locale,
                          dispatch: store.dispatch,
                          components: renderProps.components,
                          params: renderProps.params,
                          query: renderProps.location.query
                        }).then(
                        /*#__PURE__*/
                        _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
                        /*#__PURE__*/
                        _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
                          var device, pageRoute, initialState, storeData, componentHTML, htmlSteam;
                          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  // if user already logged in
                                  // fetch from propshub redis store
                                  device = findDevice(req.useragent);
                                  pageRoute = renderProps.routes[renderProps.routes.length - 1];
                                  _context.next = 4;
                                  return store.dispatch(Object(_shared_redux_actions_application__WEBPACK_IMPORTED_MODULE_17__[/* REQUEST_GET_DEVICE */ "c"])({
                                    device: device,
                                    visitorIP: ip,
                                    cookie_sid: req.cookies.sid,
                                    hostname: "".concat(req.protocol, "://localhost:").concat(frameworkGlobals.port),
                                    country: country,
                                    location: req.cookies && req.cookies.locationname || '',
                                    visitorCountry: visitorCountry,
                                    visitorCountryName: visitorCountryName
                                  }));

                                case 4:
                                  // added to initial state
                                  initialState = store.getState();

                                  if (!pageRoute.checkEmptyContent) {
                                    _context.next = 10;
                                    break;
                                  }

                                  storeData = initialState[_shared_assets_static_meta_data_config_json__WEBPACK_IMPORTED_MODULE_14__[pageRoute.pagename].storename][_shared_assets_static_meta_data_config_json__WEBPACK_IMPORTED_MODULE_14__[pageRoute.pagename].lookupobject];

                                  if (storeData.status) {
                                    _context.next = 10;
                                    break;
                                  }

                                  Object(_render404Html__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])(res, i18nTools);
                                  return _context.abrupt("return");

                                case 10:
                                  //const metaData = getPageMeta(pageRoute.pagename, initialState, renderProps.params,req.url,frameworkGlobals.origin);
                                  componentHTML = _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()(react_redux__WEBPACK_IMPORTED_MODULE_4__["Provider"], {
                                    store: store
                                  }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_1___default()(_shared_i18n__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].Provider, {
                                    i18n: i18nTools
                                  }, void 0, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_5__["RouterContext"], renderProps))); // add visitor IP to config & send

                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].visitorIP = ip;
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].isServer = false;
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].isClient = true;
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].country = country;
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].visitorCountry = visitorCountry;
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].visitorCountryName = visitorCountryName;
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].location = req.cookies && req.cookies.locationname || '';
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].staticUrl = process.env.STATIC_URL || _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].staticUrl;
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].siteCaptionIndex = frameworkGlobals['siteCaptionIndex'];
                                  _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].env = frameworkGlobals.env; //const trackingCode = getGTMTrackingCode(frameworkGlobals.env);

                                  res.cookie('country', country, {
                                    maxAge: 1080000000,
                                    secure: _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].cookies.isSecure
                                  });
                                  res.cookie('locale', locale, {
                                    maxAge: 1080000000,
                                    secure: _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].cookies.isSecure
                                  });
                                  res.header('X-realIP', ip);
                                  res.header('Content-Type', 'text/html; charset=utf-8'); //const cspVal = getCSPSettings(nonce);
                                  //res.header('content-security-policy', cspVal);

                                  react_cookie__WEBPACK_IMPORTED_MODULE_16___default.a.plugToRequest(req, res);
                                  res.status(200).write(Object(_helpers_renderer_js__WEBPACK_IMPORTED_MODULE_12__[/* renderHeader */ "b"])(nonce, Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getAssetsPaths */ "c"])().scripts, {
                                    title: "",
                                    keywords: "",
                                    description: "",
                                    type: 'Home',
                                    siteName: 'Data Grabber',
                                    image: 'data'
                                  }, Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getAssetsPaths */ "c"])().css, _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"].assetsPath));
                                  htmlSteam = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_7__["renderToNodeStream"])(componentHTML);
                                  htmlSteam.pipe(res, {
                                    end: false
                                  });
                                  htmlSteam.on('end', function () {
                                    res.status(200).write(Object(_helpers_renderer_js__WEBPACK_IMPORTED_MODULE_12__[/* renderFooter */ "a"])(nonce, Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getAssetsPaths */ "c"])().vendor, Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getAssetsPaths */ "c"])().common, Object(_helpers_utils__WEBPACK_IMPORTED_MODULE_11__[/* getAssetsPaths */ "c"])().main, _shared_config__WEBPACK_IMPORTED_MODULE_10__["default"], initialState));
                                    return res.send();
                                  });

                                case 30:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }))).catch(function (err) {
                          //logger.error("ui.server", "SSR Rendering failed",{ "error" : err, location : req.url});
                          res.end(err.message);
                        });

                      case 28:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4, _x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function renderer(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["a"] = (renderer);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/jsx");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);





function errorLoading(err) {
  //onError don't fail sailently
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return function (module) {
    return cb(null, module.default);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function (store) {
  return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/",
    component: _pages_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]
  }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(react_router__WEBPACK_IMPORTED_MODULE_2__["IndexRoute"], {
    getComponent: function getComponent(location, cb) {
      Promise.all(/* import() | CompanyList */[__webpack_require__.e(2), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, 92)).then(loadRoute(cb)).catch(errorLoading);
    },
    server: "off",
    whitelist: "off",
    pagename: "CompanyList"
  }), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/company/:id",
    getComponent: function getComponent(location, cb) {
      Promise.all(/* import() | CompanyDetail */[__webpack_require__.e(2), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, 116)).then(loadRoute(cb)).catch(errorLoading);
    },
    server: "off",
    whitelist: "off",
    pagename: "CompanyDetail"
  }), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    path: "/people",
    getComponent: function getComponent(location, cb) {
      Promise.all(/* import() | PeopleList */[__webpack_require__.e(2), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 159)).then(loadRoute(cb)).catch(errorLoading);
    },
    server: "off",
    whitelist: "off",
    pagename: "PeopleList"
  }));
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_common_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(25);








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





if (process.env.BROWSER) {
  __webpack_require__(26);
}

var DEFAULT_SIZE = 'infinity',
    // desktop & larger
SCREEN_TYPES = {
  extraSmall: 1,
  small: 2,
  medium: 3,
  large: 4,
  infinity: 5
};

var App =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(App, _Component);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(App, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        screenSize: this.getScreenSize(),
        country: 'US'
      };
    }
  }]);

  function App(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, App);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(App).call(this, props));
    _this.initialPageLoad = true;
    _this.state = {};
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(App, [{
    key: "renderChildren",
    value: function renderChildren() {
      var _this2 = this;

      var childrenWithProps = react__WEBPACK_IMPORTED_MODULE_7___default.a.Children.map(this.props.children, function (child) {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.cloneElement(child, _objectSpread({}, _this2.props));
      });
      return childrenWithProps;
    }
  }, {
    key: "render",
    value: function render() {
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        id: "app-view",
        style: {
          'height': '100%'
        }
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_components_common_error_boundary_error_boundary__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {}, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "layout-container",
        id: "main-wrap"
      }, void 0, this.renderChildren())));
    }
  }, {
    key: "getScreenSize",
    value: function getScreenSize() {
      return 4;
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

App.propTypes = {
  location: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object,
  routes: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.array,
  children: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object,
  history: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object
};
App.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object,
  screenSize: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
  country: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string
};
App.childContextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.object,
  screenSize: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.number,
  country: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorBoundary; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);








var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("h1", {}, void 0, "Something went wrong.");

var ErrorBoundary =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ErrorBoundary, _React$Component);

  function ErrorBoundary(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ErrorBoundary);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ErrorBoundary).call(this, props));
    _this.state = {
      hasError: false
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({
        hasError: true
      }); // You can also log the error to an error reporting service

      console.error(error, info);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return _ref;
      }

      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
!(function webpackMissingModule() { var e = new Error("Cannot find module './style.less'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module './animate.less'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module './carousel.less'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module './quill.snow.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module './slick-theme.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module './slick.css'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());







/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return configureStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
/* harmony import */ var redux_responsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);
/* harmony import */ var redux_responsive__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_responsive__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_dynamic_middlewares__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40);
/* harmony import */ var redux_dynamic_middlewares__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_dynamic_middlewares__WEBPACK_IMPORTED_MODULE_4__);





var createStoreWithMiddleware = Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a, redux_dynamic_middlewares__WEBPACK_IMPORTED_MODULE_4___default.a)(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"]);
function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var store = createStoreWithMiddleware(_reducers__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], initialState, redux_responsive__WEBPACK_IMPORTED_MODULE_3__["responsiveStoreEnhancer"]);

  if (false) {}

  return store;
}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var _chat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var react_redux_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var react_redux_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_responsive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var redux_responsive__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_responsive__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(38);
/* harmony import */ var _progress_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(39);


/*import realtor from './realtor';
import properties from './properties';
import search from './search';
import user from './user';
import schema from './schema';
import userprofile from './userprofile';
import documents from './documents';*/




 // import { loadingBarReducer } from 'react-redux-loading-bar';


/*import articles from './articles';*/

var rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  /*realtor,
  properties,
  search,
  user,
  userprofile,
  schema,
  documents,*/
  schema: _schema__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"],
  chat: _chat__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],
  modals: react_redux_modal__WEBPACK_IMPORTED_MODULE_3__["reducer"],
  ProgressLoader: _progress_loader__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"],
  application: _application__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"],
  browser: redux_responsive__WEBPACK_IMPORTED_MODULE_4__["responsiveStateReducer"] // responsive state
  //articles

});
/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var DEFAULT_STATE = {
  'schema_get_basic': {},
  'schema_save_basic': {},
  'schema_get_financial': {},
  'schema_get_overview': {
    'schema': {},
    'isExisting': false
  },
  'user_edit_profile': {},
  'user_save_profile': {},
  'get_notification_preferences_schema': {},
  'save_notification_preferences_schema': {},
  'get_schema_my_property_details': {},
  'save_schema_my_property_details': {},
  'save_schema_my_property_purchase_details': {},
  'get_schema_my_property_purchase_details': {},
  'save_schema_my_property_expense': {},
  'save_schema_my_property_income': {},
  'get_schema_tenant_application': {},
  'save_schema_tenant_application': {},
  'save_tenant_application_review': {}
};
var schema = Object(_create_reducers__WEBPACK_IMPORTED_MODULE_1__[/* createReducers */ "a"])(DEFAULT_STATE, {
  REQUEST_SCHEMA_PROPERTIES: function REQUEST_SCHEMA_PROPERTIES(state, action) {
    return _objectSpread({}, state, {
      schema_properties: action.data
    });
  },
  RESPONSE_GET_FINANCIAL_SCHEMA: function RESPONSE_GET_FINANCIAL_SCHEMA(state, action) {
    return _objectSpread({}, state, {
      schema_get_financial: action.data
    });
  },
  RESPONSE_ADD_COMPANY_PEOPLE: function RESPONSE_ADD_COMPANY_PEOPLE(state, action) {
    return _objectSpread({}, state, {
      add_company_people: action.data
    });
  }
});
/* harmony default export */ __webpack_exports__["a"] = (schema);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createReducers; });
var createReducers = function createReducers(initialState, handlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);


var _createReducers;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var messageTypes = __webpack_require__(35).default.CHAT_MESSAGE_TYPES;

var DEFAULT_STATE = {};
var chat = Object(_create_reducers__WEBPACK_IMPORTED_MODULE_1__[/* createReducers */ "a"])(DEFAULT_STATE, (_createReducers = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_createReducers, messageTypes.userRequested, function (state, action) {
  return _objectSpread({}, state, {}, action.data);
}), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_createReducers, messageTypes.recivesocketId, function (state, action) {
  return _objectSpread({}, state, {}, action.data);
}), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_createReducers, messageTypes.scrapeLog, function (state, action) {
  return _objectSpread({}, state, {}, action.data);
}), _createReducers));
/* harmony default export */ __webpack_exports__["a"] = (chat);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  'GAPI_KEY': 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo',
  'CUSTOM_MARKER_ICON': 'static/images/marker/office-building.png',
  'CUSTOM_MARKER_ICON_LEASE': 'static/images/marker/office-building-lease.png',
  'CUSTOM_MARKER_ICON_SALE': 'static/images/marker/office-building-sale.png',
  'FORLEASE': 'for-rent',
  'FORSALE': 'for-sale',
  'REALTOR_SEARCH_TYPE': 'realtor',
  'DEFAULT_SEARCH_TYPE': 'for-sale',
  'LOGO_IMAGE': 'http://betagroup.be/images/footer-logo1.png',
  'LOADER_IMAge': 'static/images/loader/gears.gif',
  'PARTIAL_SEARCH_ATTRIBUTE': 'name',
  'PARTIAL_SEARCH_ATTRIBUTE_CONTENT': 'postedby',
  'PROPERTY_SEARCH_FACETS': {
    'PROPERTY_TYPE': 'propertytype',
    'SUB_TYPE': 'subtype',
    'PRICE': 'price',
    'AREA': 'area',
    'SALE_TYPE': 'saletype',
    'ZIPCODE': 'zipcode',
    'CITY': 'city',
    'STATE': 'state',
    'REGION': 'region',
    'LOCALITY': 'locality',
    'CAPACITY': 'capacity',
    'STATUS': 'constructionstatus',
    'RADIUS': 'radius',
    'AGE': 'age',
    'BED': 'bed',
    'SEAT': 'seat',
    'BEDROOM': 'bedroom',
    'RSPF': 'rspf',
    'CAPRATE': 'caprate'
  },
  'OTHER_SERVICES_SEARCH_FACETS': {
    'PROFESSIONAL': {
      'TYPE': 'datatype',
      'PROFESSIONS': 'professions',
      'AREAS': 'areas-locality',
      'YEARS': 'years'
    },
    'REALTOR': {
      'TYPE': 'datatype',
      'SPECIALTIES': 'specialties',
      'AREAS': 'areas-locality',
      'YEARS': 'years'
    },
    'CONTENT': {
      'TYPE': 'datatype',
      'CATEGORIES': 'categories'
    }
  },
  'DEFAULT_VIEW': 'map',
  'LIST_VIEW': 'list',
  'GRID_VIEW': 'grid',
  'MAP_VIEW': 'map',
  'DEFAULT_FILTER': true,
  'FILTER_SHOW': true,
  'FILTER_HIDE': false,
  'MAP_PIN': 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
  'SQUARE_PIN': 'M22-48h-44v43h16l6 5 6-5h16z',
  'SHIELD': 'M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z',
  'ROUTE': 'M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z',
  'SQUARE': 'M-24-48h48v48h-48z',
  'SQUARE_ROUNDED': 'M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z',
  'MAP_LOGO_ICON': 'M60.545,30.524c0-16.088-13.041-29.128-29.128-29.128c-16.087,0-29.128,13.041-29.128,29.128c0,11.37,6.515,21.217,16.015,26.014l13.114,16.066l13.115-16.066C54.03,51.741,60.545,41.894,60.545,30.524z M31.417,55.017c-13.527,0-24.493-10.965-24.493-24.493C6.924,16.997,17.89,6.03,31.417,6.03s24.493,10.967,24.493,24.494C55.909,44.052,44.943,55.017,31.417,55.017z',
  'EDIT_LISTING_LINK': '/profile/listing/property-listing/%s',
  'EDIT_MY_PROPERTY_LINK': '/profile/create-property/details?id=%s',
  'EDIT_MY_PROPERTY_TRANSACTION_LINK': '/profile/create-property/income-expense?id=%s',
  'GENERATE_REPORT_LINK': '/property-listings/%s/report',
  'GENERATE_FLYER_LINK': '/profile/flyer/template/%s',
  'EDIT_COMPANY_LINK': '/edit-company/%s',
  'EDIT_ARTICLE_LINK': '/blogs/edit/%s',
  'CREATE_ARTICLE_LINK': '/blogs/new',
  'EDIT_PROFILE_LINK': '/profile',
  'LISTING_ADDITIONAL_INFO_LINK': '/profile/additional/property-listing/%s',
  'CHAT_MESSAGE_TYPES': ['loginJoinRoom', 'userJoined', 'userLeft', 'joinRoom', 'recivesocketId', 'joinRequested', 'userRequested', 'userStartedTyping', 'userStoppedTyping', 'messageAdded', 'userRefreshed', 'scrapeLog'].reduce(function (accum, msg) {
    accum[msg] = msg;
    return accum;
  }, {}),
  'DEFAULT_SEARCH_METRO': 'dallas',
  'FACEBOOK_URL': 'https://www.facebook.com/propshubinc/',
  'TWITTER_URL': 'https://twitter.com/PropsHub',
  'YOUTUBE_URL': 'https://www.youtube.com/channel/UC8OFlleFFourdBbKl1l0ovQ',
  'PINTEREST_URL': 'https://in.pinterest.com/propshub/',
  'INSTAGRAM_URL': 'https://www.instagram.com/propshubinc/',
  'LINKEDIN_URL': 'https://www.linkedin.com/company/propshub/',
  'MEDIUM_URL': 'https://medium.com/propshub',
  'HELP_ME_INVEST_LINK': '/guided-search/investment',
  'ANALYZE_RETURNS_LINK': '/roi-calculator',
  'MY_PORTFOLIO_ROUTE': '/analyze-portfolio',
  'BLOGS_ROUTE': '/blogs',
  'DALLAS_PROPSHUB_INDEX_LINK': '/residential-investment-markets/texas/dallas-fort-worth/market-index/map/1',
  'PHOENIX_PROPSHUB_INDEX_LINK': '/residential-investment-markets/arizona/phoenix/market-index/map/2',
  'INDIANAPOLIS_PROPSHUB_INDEX_LINK': '/residential-investment-markets/indiana/indianapolis/market-index/map/3',
  'ZILLOW_SITE_URL': 'http://www.zillow.com/',
  'ZESTIMATE_URL': 'https://www.zillow.com/wikipages/What-is-a-Zestimate/',
  'ZILLOW_TERMS_URL': 'https://www.zillow.com/corp/Terms.htm',
  'ZILLOW_LOGO_URL': 'https://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_200x50.gif',
  'TENANT_APPLY_START_LINK': '/profile/tenant-application/start?listingid=%s'
});

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("react-redux-modal");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("redux-responsive");

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var DEFAULT_STATE = {
  device: null
};
var application = Object(_create_reducers__WEBPACK_IMPORTED_MODULE_1__[/* createReducers */ "a"])(DEFAULT_STATE, {
  REQUEST_GET_DEVICE: function REQUEST_GET_DEVICE(state, action) {
    return _objectSpread({}, state, {
      device: action.data
    });
  },
  RESPONSE_DATA_FROM_STORE: function RESPONSE_DATA_FROM_STORE(state, action) {
    return _objectSpread({}, state, {
      response_data_from_store: action.data
    });
  },
  RESPONSE_OPEN_SITE_FEEDBACK: function RESPONSE_OPEN_SITE_FEEDBACK(state, action) {
    return _objectSpread({}, state, {
      open_site_feedback: action.data
    });
  },
  REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL: function REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL(state, action) {
    return _objectSpread({}, state, {}, action.data);
  },
  RESPONSE_CONTACT_ACTIONS: function RESPONSE_CONTACT_ACTIONS(state, action) {
    return _objectSpread({}, state, {
      contact_details: action.data
    });
  },
  GET_EMAIL_RESPONSE: function GET_EMAIL_RESPONSE(state, action) {
    return _objectSpread({}, state, {
      email_sent_response: action.data
    });
  },
  RESPONSE_SHARE_VIA_EMAIL: function RESPONSE_SHARE_VIA_EMAIL(state, action) {
    return _objectSpread({}, state, {
      share_via_email_response: action.data
    });
  },
  RESPONSE_MAP_RANGE_LEGENDS: function RESPONSE_MAP_RANGE_LEGENDS(state, action) {
    return _objectSpread({}, state, {
      map_range_legends_response: action.data
    });
  },
  RESPONSE_LEAD_REALTORS: function RESPONSE_LEAD_REALTORS(state, action) {
    return _objectSpread({}, state, {
      lead_realtors_response: action.data
    });
  },
  UPDATE_ERROR_STATE: function UPDATE_ERROR_STATE(state, action) {
    return _objectSpread({}, state, {
      error_state: action.data
    });
  },
  REQUEST_UPDATE_INVESTOR_WIZARD: function REQUEST_UPDATE_INVESTOR_WIZARD(state, action) {
    return _objectSpread({}, state, {
      investor_wizard: action.data
    });
  },
  REQUEST_UPDATE_PDF_WIZARD: function REQUEST_UPDATE_PDF_WIZARD(state, action) {
    return _objectSpread({}, state, {
      pdf_wizard: action.data
    });
  },
  RESPONSE_POPULAR_LISTINGS: function RESPONSE_POPULAR_LISTINGS(state, action) {
    return _objectSpread({}, state, {
      popular_listings: action.data
    });
  },
  RESPONSE_FILE_SHARE_VIA_EMAIL: function RESPONSE_FILE_SHARE_VIA_EMAIL(state, action) {
    return _objectSpread({}, state, {
      response_file_share_email: action.data
    });
  },
  RESPONSE_GET_COMPANIES: function RESPONSE_GET_COMPANIES(state, action) {
    return _objectSpread({}, state, {
      response_companies: action.data
    });
  },
  RESPONSE_GET_PEOPLE: function RESPONSE_GET_PEOPLE(state, action) {
    return _objectSpread({}, state, {
      response_people: action.data
    });
  },
  RESPONSE_GET_COMPANY: function RESPONSE_GET_COMPANY(state, action) {
    return _objectSpread({}, state, {
      response_company: action.data
    });
  },
  RESPONSE_RUN_GRABBER: function RESPONSE_RUN_GRABBER(state, action) {
    return _objectSpread({}, state, {
      response_grabber: action.data
    });
  },
  RESPONSE_DATA_TABLE_STATE_CHANGES: function RESPONSE_DATA_TABLE_STATE_CHANGES(state, action) {
    return _objectSpread({}, state, {
      data_table: action.data
    });
  }
});
/* harmony default export */ __webpack_exports__["a"] = (application);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _create_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


var DEFAULT_STATE = {
  loadingBar: 0
};
var ProgressLoader = Object(_create_reducers__WEBPACK_IMPORTED_MODULE_1__[/* createReducers */ "a"])(DEFAULT_STATE, {
  'SHOW': function SHOW(state, action) {
    return _objectSpread({}, state, {
      loadingBar: 1
    });
  },
  'HIDE': function HIDE(state, action) {
    return _objectSpread({}, state, {
      loadingBar: 0
    });
  }
});
/* harmony default export */ __webpack_exports__["a"] = (ProgressLoader);

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("redux-dynamic-middlewares");

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Provider_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);


/* harmony default export */ __webpack_exports__["a"] = ({
  Provider: _Provider_jsx__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
  Tools: _Tools__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Provider; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);








var Provider =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Provider, _React$Component);

  function Provider() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Provider);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Provider).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Provider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        i18n: this.props.i18n
      };
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.Children.only(this.props.children);
    }
  }]);

  return Provider;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

Provider.propTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object.isRequired
};
Provider.childContextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object
};


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tools; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var jed__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jed__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);





var Tools = function Tools(_ref) {
  var _this = this;

  var localeData = _ref.localeData,
      locale = _ref.locale;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Tools);

  this.l = function (text, context) {
    text = String(text);

    if (text === 'undefined' || text === '') {
      return '';
    }

    return context ? _this.jed.pgettext(context, text) : _this.jed.gettext(text);
  };

  this.nl = function (singular, plural, amount, context) {
    return context ? _this.jed.npgettext(context, singular, plural, amount) : _this.jed.ngettext(singular, plural, amount);
  };

  this.getLocale = function () {
    return _this.locale.toLowerCase();
  };

  this.getTimeFromNow = function (date) {
    moment__WEBPACK_IMPORTED_MODULE_2___default.a.locale(_this.locale);
    return moment__WEBPACK_IMPORTED_MODULE_2___default()(date).fromNow();
  };

  this.humanizeDuration = function (time, unit) {
    moment__WEBPACK_IMPORTED_MODULE_2___default.a.locale(_this.locale);
    var duration = moment__WEBPACK_IMPORTED_MODULE_2___default.a.duration(time, unit);
    var hours = duration.hours();
    var hoursString = hours ? Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* sprintf */ "a"])(_this.nl('%d hour', '%d hours', hours), hours) : '';
    var minutes = duration.minutes();
    var minutesString = minutes ? Object(_utils__WEBPACK_IMPORTED_MODULE_3__[/* sprintf */ "a"])(_this.nl('%d minute', '%d minutes', minutes), minutes) : '';
    return "".concat(hoursString, " ").concat(minutesString);
  };

  this.jed = new jed__WEBPACK_IMPORTED_MODULE_1___default.a(localeData);
  this.locale = locale;
};



/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("jed");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getSupportedLocales */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sprintf; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);
/* harmony import */ var jed__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jed__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);



function getSupportedLocales(country) {
  var langauges = _config__WEBPACK_IMPORTED_MODULE_2__["default"].localeSettings[country].langauges;
  return langauges && langauges.map(function (language) {
    return _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, language.language, language.displyname);
  });
}
function sprintf(text) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return jed__WEBPACK_IMPORTED_MODULE_1___default.a.sprintf.apply(jed__WEBPACK_IMPORTED_MODULE_1___default.a, [text].concat(params));
}

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(48);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);
/*
 eslint
 import/no-commonjs: 0
 import/no-unresolved: 0
 */


var defaultConfig = __webpack_require__(49);

var environment = process.env.BUILD_ENV || process.env.NODE_ENV || 'local-dev';
var config;

if (process.env.BROWSER) {
  config = window.__CONFIG__;
} else {
  try {
    var envConfig = __webpack_require__(50)("./" + environment + ".json");

    config = lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultConfig, envConfig);
  } catch (e) {
    console.log('No config found for NODE_ENV=%s', environment);
    config = defaultConfig;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (config);

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("lodash/merge");

/***/ }),
/* 49 */
/***/ (function(module) {

module.exports = JSON.parse("{\"apiPrefix\":\"/api/v1\",\"endpoints\":{\"company\":{\"list\":{\"get\":{\"listcompanies\":\"/companies\",\"company\":\"/company/{id}\",\"rungrabber\":\"/rungrabber/{id}\"}},\"schema\":{\"post\":{\"people\":\"/company/{id}/people\"}}},\"people\":{\"list\":{\"get\":{\"listpeople\":\"/people\",\"person\":\"/people/{id}\"}}}},\"gtmcode\":\"GTM-MRT9RJW\",\"distanceunit\":\"mi\",\"gmap\":{\"key\":\"AIzaSyCOzoFwNL6d-jh0riKCUxUnz2olx3y0rIE\",\"v\":\"3.36\",\"libraries\":\"places,geometry,drawing\"},\"localeSettings\":{\"US\":{\"langauges\":[{\"language\":\"us_en\",\"displyname\":\"English\",\"default\":true}],\"sites\":[{\"name\":\"US\",\"link\":\"US\",\"icon\":\"country-flag us-flag\"}],\"requestHeaderCode\":\"us\",\"languageDirectory\":\"us\",\"localeString\":\"en-US\",\"locationSearchRegion\":\"us\",\"siteLogo\":\"logo_us.png\",\"searchRadiusUnits\":\"mi\",\"currencyFormat\":\"USD\",\"siteDomain\":\"dev.propshub.com\",\"currencySymbol\":\"$\",\"flagImgClass\":\"us-flag\",\"dateFormat\":\"MM/DD/YYYY\",\"showFormattedAddress\":true,\"mobileNumberFormatCheck\":\"^[0-9]{3}\\\\-[0-9]{3}\\\\-[0-9]{4}$\",\"dialingCode\":\"+1\",\"chatNameSpace\":\"http://localhost:5002\",\"earthRadius\":3959}},\"cdndsn\":{\"images\":\"//images.propshub.com\",\"assets\":\"//assets.propshub.com\"},\"isEnableListHubAnalytics\":false,\"listHubAnalytics\":{\"isEnableListHubAnalytics\":false,\"isReportListHubAnalytics\":false,\"listHubMetricId\":\"M-4361\"},\"cookies\":{\"isSecure\":false},\"paypal\":{\"host\":\"https://api.sandbox.paypal.com/\",\"authend\":\"sandbox\",\"scopes\":\"openid%20profile%20email%20address%20https%3A%2F%2Furi.paypal.com%2Fservices%2Fpaypalattributes\"},\"google\":{\"clientId\":\"257981987263-b9hgls50genavpgb7vumrji8k3bb1c9e.apps.googleusercontent.com\"}}");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./default.json": 49,
	"./development.json": 51,
	"./local-dev.json": 52,
	"./pilot.json": 53,
	"./production.json": 54,
	"./qa.json": 55,
	"./webpack-assets.json": 56
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 50;

/***/ }),
/* 51 */
/***/ (function(module) {

module.exports = JSON.parse("{\"staticUrl\":\"http://localhost:9052\",\"api\":{\"prefix\":\"/api/v1\",\"host\":\"service-dev.propshub.com\",\"port\":\"443\",\"protocol\":\"https\"},\"mapServer\":{\"path\":\"https://maps-dev.propshub.com\"},\"pdfServer\":{\"path\":\"https://report-dev.propshub.com\"},\"imageRootPath\":\"https://images.propshub.com\",\"assetsPath\":\"/static\",\"metrosServed\":[\"dallas\",\"phoenix\",\"indianapolis\",\"chicago\",\"jacksonville\",\"las-vegas\",\"atlanta\",\"orlando\",\"san-antonio\",\"philadelphia\",\"baltimore\",\"washington\"],\"searchStateCode\":\"TX[\\\\s|,]|AZ[\\\\s|,]|IN[\\\\s|,]|IL[\\\\s|,]|FL[\\\\s|,]|NV[\\\\s|,]|GA[\\\\s|,]|PA[\\\\s|,]|MD[\\\\s|,]|DC[\\\\s|,]\",\"localeSettings\":{\"US\":{\"siteDomain\":\"dev.propshub.com\",\"chatNameSpace\":\"https://chat-dev.propshub.com\",\"langauges\":[{\"language\":\"us_en\",\"displyname\":\"English\",\"default\":true}],\"sites\":[{\"name\":\"US\",\"link\":\"US\",\"icon\":\"country-flag us-flag\"}],\"requestHeaderCode\":\"us\",\"languageDirectory\":\"us\",\"localeString\":\"en-US\",\"locationSearchRegion\":\"us\",\"siteLogo\":\"logo_us.png\",\"searchRadiusUnits\":\"mi\",\"currencyFormat\":\"USD\",\"currencySymbol\":\"$\",\"flagImgClass\":\"us-flag\",\"dateFormat\":\"MM/DD/YYYY\",\"showFormattedAddress\":true,\"mobileNumberFormatCheck\":\"^[0-9]{3}\\\\-[0-9]{3}\\\\-[0-9]{4}$\",\"dialingCode\":\"+1\",\"earthRadius\":3959}},\"origin\":\"https://dev.propshub.com\",\"cookies\":{\"isSecure\":true},\"google\":{\"clientId\":\"257981987263-u6j5gqnfnstr8ihjumvc0qi88ru1nodk.apps.googleusercontent.com\"},\"paypal\":{\"clientId\":\"AZiZ-JCWPQ6ZB9mUIKPQMNEo_wrX9xwy1h9pijgO96S6nLV4PPG2z-zAjibf_lwTLTsdeAtZyUUj7TUe\",\"secret\":\"EJ1a2PQ6bWmXB5-gC9r8hg9Sny2DC5cIZI-gsfX841oSr7-V69wXE2g2GnFb93LsOdCO2xk9eyJ7Aq54\"}}");

/***/ }),
/* 52 */
/***/ (function(module) {

module.exports = JSON.parse("{\"staticUrl\":\"http://localhost:9052\",\"api\":{\"prefix\":\"/api/v1\",\"host\":\"service-dev.propshub.com\",\"port\":\"443\",\"protocol\":\"https\"},\"mapServer\":{\"path\":\"http://localhost:7002\"},\"pdfServer\":{\"path\":\"http://localhost:8081\"},\"imageRootPath\":\"https://images.propshub.com\",\"assetsPath\":\"/static\",\"metrosServed\":[\"dallas\",\"phoenix\",\"indianapolis\",\"chicago\",\"jacksonville\",\"las-vegas\",\"atlanta\",\"orlando\",\"san-antonio\",\"philadelphia\",\"baltimore\",\"washington\"],\"searchStateCode\":\"TX[\\\\s|,]|AZ[\\\\s|,]|IN[\\\\s|,]|IL[\\\\s|,]|FL[\\\\s|,]|NV[\\\\s|,]|GA[\\\\s|,]|PA[\\\\s|,]|MD[\\\\s|,]|DC[\\\\s|,]\",\"localeSettings\":{\"US\":{\"siteDomain\":\"dev.propshub.com\",\"chatNameSpace\":\"http://localhost:5002\",\"langauges\":[{\"language\":\"us_en\",\"displyname\":\"English\",\"default\":true}],\"sites\":[{\"name\":\"US\",\"link\":\"US\",\"icon\":\"country-flag us-flag\"}]}},\"listHubAnalytics\":{\"isEnableListHubAnalytics\":true,\"isReportListHubAnalytics\":true},\"origin\":\"http://localhost:5002\",\"google\":{\"clientId\":\"257981987263-m0poph7qqsc48bonk2o5t3ai9o3s99qs.apps.googleusercontent.com\"},\"paypal\":{\"clientId\":\"AZj16DhXq-ojUZK_74CRQN8CfIKqE6fp-0XO89sqn5_Hf9qqqpgXekgvAn8uRhf7aMp-eHKLtWsQ026O\",\"secret\":\"EN70PKUs4ldkZ9NggExiq0qrh8Isvg_RlJ88L-Tq_SVsmTKSpbHXKST8GBtDS4ErrtUP3W9PKDuuGwhG\"}}");

/***/ }),
/* 53 */
/***/ (function(module) {

module.exports = JSON.parse("{\"staticUrl\":\"http://localhost:8052\",\"api\":{\"prefix\":\"/api/v1\",\"host\":\"service.propshub.com\",\"port\":\"443\",\"protocol\":\"https\"},\"mapServer\":{\"path\":\"https://maps-pilot.propshub.com\"},\"pdfServer\":{\"path\":\"https://report.propshub.com\"},\"assetsPath\":\"https://assets.propshub.com/static\",\"metrosServed\":[\"dallas\",\"phoenix\",\"indianapolis\",\"chicago\",\"jacksonville\",\"las-vegas\"],\"searchStateCode\":\"TX[\\\\s|,]|AZ[\\\\s|,]|IN[\\\\s|,]|IL[\\\\s|,]|FL[\\\\s|,]|NV[\\\\s|,]\",\"imageRootPath\":\"https://images.propshub.com\",\"localeSettings\":{\"IN\":{\"siteDomain\":\"www.propshub.in\",\"chatNameSpace\":\"https://chat.propshub.in\"},\"US\":{\"siteDomain\":\"www.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"CA\":{\"siteDomain\":\"www.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"MX\":{\"siteDomain\":\"www.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"BR\":{\"siteDomain\":\"www.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"AR\":{\"siteDomain\":\"www.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"CO\":{\"siteDomain\":\"www.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"}},\"origin\":\"https://www.propshub.com\",\"cookies\":{\"isSecure\":true}}");

/***/ }),
/* 54 */
/***/ (function(module) {

module.exports = JSON.parse("{\"staticUrl\":\"http://localhost:9052\",\"api\":{\"prefix\":\"/api/v1\",\"host\":\"service.propshub.com\",\"port\":\"443\",\"protocol\":\"https\"},\"mapServer\":{\"path\":\"https://maps.propshub.com\"},\"pdfServer\":{\"path\":\"https://report.propshub.com\"},\"imageRootPath\":\"https://images.propshub.com\",\"assetsPath\":\"https://assets.propshub.com/static\",\"metrosServed\":[\"dallas\",\"phoenix\",\"indianapolis\",\"chicago\",\"jacksonville\",\"las-vegas\",\"atlanta\",\"orlando\",\"san-antonio\",\"philadelphia\",\"baltimore\",\"washington\"],\"searchStateCode\":\"TX[\\\\s|,]|AZ[\\\\s|,]|IN[\\\\s|,]|IL[\\\\s|,]|FL[\\\\s|,]|NV[\\\\s|,]|GA[\\\\s|,]|PA[\\\\s|,]|MD[\\\\s|,]|DC[\\\\s|,]\",\"localeSettings\":{\"US\":{\"siteDomain\":\"www.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\",\"langauges\":[{\"language\":\"us_en\",\"displyname\":\"English\",\"default\":true}],\"sites\":[{\"name\":\"US\",\"link\":\"US\",\"icon\":\"country-flag us-flag\"}],\"requestHeaderCode\":\"us\",\"languageDirectory\":\"us\",\"localeString\":\"en-US\",\"locationSearchRegion\":\"us\",\"siteLogo\":\"logo_us.png\",\"searchRadiusUnits\":\"mi\",\"currencyFormat\":\"USD\",\"currencySymbol\":\"$\",\"flagImgClass\":\"us-flag\",\"dateFormat\":\"MM/DD/YYYY\",\"showFormattedAddress\":true,\"mobileNumberFormatCheck\":\"^[0-9]{3}\\\\-[0-9]{3}\\\\-[0-9]{4}$\",\"dialingCode\":\"+1\",\"earthRadius\":3959}},\"listHubAnalytics\":{\"isEnableListHubAnalytics\":true,\"isReportListHubAnalytics\":false},\"origin\":\"https://www.propshub.com\",\"cookies\":{\"isSecure\":true}}");

/***/ }),
/* 55 */
/***/ (function(module) {

module.exports = JSON.parse("{\"staticUrl\":\"http://localhost:9052\",\"api\":{\"prefix\":\"/api/v1\",\"host\":\"service-qa.propshub.com\",\"port\":\"443\",\"protocol\":\"https\"},\"imageRootPath\":\"https://images.propshub.com\",\"localeSettings\":{\"IN\":{\"siteDomain\":\"qa.propshub.in\",\"chatNameSpace\":\"https://chat.propshub.in\"},\"US\":{\"siteDomain\":\"qa.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"CA\":{\"siteDomain\":\"qa.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"MX\":{\"siteDomain\":\"qa.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"BR\":{\"siteDomain\":\"qa.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"AR\":{\"siteDomain\":\"qa.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"},\"CO\":{\"siteDomain\":\"qa.propshub.com\",\"chatNameSpace\":\"https://chat.propshub.com\"}}}");

/***/ }),
/* 56 */
/***/ (function(module) {

module.exports = JSON.parse("{\"vendors~CompanyDetail~CompanyList~PeopleList\":{\"js\":\"http://localhost:9052/static/build/vendors~CompanyDetail~CompanyList~PeopleList.js\"},\"main\":{\"css\":\"http://localhost:9052/static/build/main.css\",\"js\":\"http://localhost:9052/static/build/main.js\"},\"vendor\":{\"js\":\"http://localhost:9052/static/build/vendor.js\"},\"common\":{\"js\":\"http://localhost:9052/static/build/common.js\"},\"CompanyList\":{\"js\":\"http://localhost:9052/static/build/CompanyList.js\"},\"CompanyDetail\":{\"js\":\"http://localhost:9052/static/build/CompanyDetail.js\"},\"CompanyList~PeopleList\":{\"js\":\"http://localhost:9052/static/build/CompanyList~PeopleList.js\"},\"vendors~Schema\":{\"css\":\"http://localhost:9052/static/build/vendors~Schema.css\",\"js\":\"http://localhost:9052/static/build/vendors~Schema.js\"},\"vendors~CompanyList~PeopleList\":{\"js\":\"http://localhost:9052/static/build/vendors~CompanyList~PeopleList.js\"},\"vendors~CompanyDetail\":{\"js\":\"http://localhost:9052/static/build/vendors~CompanyDetail.js\"},\"PeopleList\":{\"js\":\"http://localhost:9052/static/build/PeopleList.js\"},\"Schema\":{\"js\":\"http://localhost:9052/static/build/Schema.js\"},\"RangeSlider\":{\"js\":\"http://localhost:9052/static/build/RangeSlider.js\"},\"vendors~RangeSlider\":{\"js\":\"http://localhost:9052/static/build/vendors~RangeSlider.js\"},\"\":{\"svg\":[\"http://localhost:9052/static/build/90ed5b0ab24398668a51f8268d2f0607.svg\",\"http://localhost:9052/static/build/c1f9e49220c95680b81c1acaf22499d8.svg\"],\"eot\":[\"http://localhost:9052/static/build/Pe-icon-7-stroke.eot?v=7aa5855f\",\"http://localhost:9052/static/build/map-icons.eot?v=82829841\"],\"ttf\":[\"http://localhost:9052/static/build/Pe-icon-7-stroke.ttf?v=67b9d5d7\",\"http://localhost:9052/static/build/map-icons.ttf?v=6867e037\"],\"woff\":[\"http://localhost:9052/static/build/Pe-icon-7-stroke.woff?v=03dc1fa0\",\"http://localhost:9052/static/build/map-icons.woff?v=d660ef03\"]}}");

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fetchComponentsData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getEnv; });
/* unused harmony export getMetaDataFromState */
/* unused harmony export makeRedirectUrl */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getIp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getCountry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return detectLocale; });
/* unused harmony export getGTMTrackingCode */
/* unused harmony export getWebpackAssetsConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getAssetsPaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getSiteCaptionIndex; });
/* unused harmony export getPageMeta */
/* unused harmony export getCSPSettings */
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47);
/* harmony import */ var _shared_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46);
/* harmony import */ var _shared_assets_static_why_props_hub_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(61);
var _shared_assets_static_why_props_hub_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(61, 1);
/* harmony import */ var _shared_assets_static_meta_data_config_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62);
var _shared_assets_static_meta_data_config_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(62, 1);
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(63);
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_escape__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_8__);


/* eslint import/no-unresolved: 0*/









var _require$default = __webpack_require__(64).default,
    areasServed = _require$default.areasServed,
    mapTypeConfig = _require$default.mapTypeConfig;

function fetchComponentsData(_ref) {
  var dispatch = _ref.dispatch,
      components = _ref.components,
      params = _ref.params,
      query = _ref.query,
      locale = _ref.locale;
  var promises = components.map(function (current) {
    if (!current) {
      return null;
    }

    var component = current.WrappedComponent ? current.WrappedComponent : current;
    return component.fetchData ? component.fetchData({
      dispatch: dispatch,
      params: params,
      query: query,
      locale: locale
    }) : null;
  });
  return Promise.all(promises);
}
function getEnv() {
  return process.env.NODE_ENV || 'local-dev';
}
function getMetaDataFromState() {
  /* eslint more/no-duplicated-chains: 0 */
  return {
    title: "",
    keywords: "",
    description: "",
    type: 'Home',
    siteName: 'Data Grabber',
    image: 'data'
  };
}
function makeRedirectUrl(_ref2) {
  var originalUrl = _ref2.originalUrl;
  var UIWallPath = "".concat(_shared_config__WEBPACK_IMPORTED_MODULE_3__["default"].embedOrigin, "/");
  return "".concat(UIWallPath).concat(originalUrl);
}
function getIp(req) {
  var ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;

  if (ip.substr(0, 7) === '::ffff:') {
    return ip.substr(7);
  }

  return ip;
}
function getCountry(req) {
  if (process.env.NODE_ENV !== 'production' && req.query && req.query.site) {
    return req.query.site;
  }

  if (req.cookies.country) {
    return req.cookies.country;
  }

  return req.headers && req.headers['http-country-code'] || 'US';
}
function detectLocale(req) {
  // Take locale passed by webserver

  /*const country = getCountry(req);
  	let localObj='';
  const { langauges } = clientConfig.localeSettings[country];
  if(!req.cookies.locale) {
  	localObj = _find(langauges, { 'default' : true});
  } else {
  	localObj = _find(langauges, { language : req.cookies.locale.toLowerCase()});
  }
  const passedLocale = (localObj && localObj.language && localObj.language.toLowerCase()) || '';
  if (passedLocale && Object.keys(_find(getSupportedLocales(country),passedLocale))[0] === passedLocale) {
  	return passedLocale;
  } else {
  	return _find(langauges, { 'default' : true}).language;
  }*/
  return 'us_en';
}
/*
 for given environment tracking code will be send
 */

function getGTMTrackingCode() {
  var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'local-dev';
  var GTMTrackingCode = {
    'local-dev': {
      trackingCode: '&gtm_auth=sFVjavj2bDWE8PDiVvIlBw&gtm_preview=env-19'
    },
    'development': {
      trackingCode: '&gtm_auth=sFVjavj2bDWE8PDiVvIlBw&gtm_preview=env-19'
    },
    'pilot': {
      trackingCode: '&gtm_auth=rfO8WeA-L6nP0ifdvS12Vg&gtm_preview=env-20'
    },
    'production': {
      trackingCode: '&gtm_auth=kXFUg4TmLtXQmCzB9LdNVA&gtm_preview=env-2'
    }
  };
  return GTMTrackingCode[environment].trackingCode;
}
function getWebpackAssetsConfig() {
  var envConfig = __webpack_require__(56);

  return envConfig;
}
function getAssetsPaths() {
  var webpackAssets = getWebpackAssetsConfig();
  return {
    scripts: Object.keys(webpackAssets).filter(function (asset) {
      return asset && asset !== 'main' && asset !== 'vendor' && asset !== 'common';
    }).map(function (asset) {
      return webpackAssets[asset].js;
    }),
    main: webpackAssets.main.js,
    common: webpackAssets.common.js,
    vendor: webpackAssets.vendor.js,
    css: webpackAssets.main.css
  };
}
function getSiteCaptionIndex() {
  return Math.floor(Math.random() * _shared_assets_static_why_props_hub_json__WEBPACK_IMPORTED_MODULE_5__[/* whypropshub */ "a"].sitecaptions.length);
}

function generateTag(counter, storeData, lookupArray) {
  var needleData = Array.isArray(storeData[lookupArray[counter]]) && storeData[lookupArray[counter]][0] || storeData[lookupArray[counter]] || '';

  if (counter === lookupArray.length - 1) {
    if (!needleData) {
      return '';
    }

    if (needleData && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(needleData) === 'object') {
      return needleData[0];
    } else {
      return needleData;
    }
  }

  if (!needleData) {
    return '';
  }

  return generateTag(counter + 1, needleData, lookupArray);
}

function metaProperty(_ref3) {
  var tag = _ref3.tag,
      content = _ref3.content,
      propertyName = _ref3.propertyName;
  return "<meta ".concat(propertyName, "=\"").concat(tag, "\" content=\"").concat(lodash_escape__WEBPACK_IMPORTED_MODULE_7___default()(content), "\" />");
}

function metatemplates() {
  return {
    investmentDestination: function investmentDestination(params) {
      var metroData = lodash_find__WEBPACK_IMPORTED_MODULE_1___default()(areasServed, {
        metroID: Number(params.id) || 1
      });

      if (!metroData) {
        metroData = lodash_find__WEBPACK_IMPORTED_MODULE_1___default()(areasServed, {
          metroID: 1
        });
      }

      return {
        "keywords": "cap rate potential, popular searches, turn key, fixer upper, listing price, demographics, rental unit ratio, income, unemployment, population growth, property crime, violent crime, commute time, market index",
        "title": "PropsHub | Real Estate Investment Markets | ".concat(metroData.searchBarAddress, " | ").concat(mapTypeConfig[params.maptype].metaKeyword),
        "description": "Analyze ".concat(mapTypeConfig[params.maptype].metaKeyword, " for zip codes in ").concat(metroData.searchBarAddress, " market")
      };
    }
  };
}

function generateMetaTags(pageMetaTags) {
  var storeData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var metaTags = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default()(pageMetaTags);

  return metaTags.map(function (metatag) {
    if (metatag.content) {
      return metaProperty(metatag);
    }

    var lookupArray = metatag.dynamicMeta && metatag.dynamicMeta.propertyLookup;
    var metas = generateTag(0, storeData, lookupArray);

    if (metas) {
      metatag.content = metatag.dynamicMeta.prefix && "".concat(metatag.dynamicMeta.prefix).concat(metas) || metas;
      return metaProperty(metatag);
    }
  }).join('');
} // we also need url & image & type for og tags


function getPageMeta(page, state, params, reqUrl, origin) {
  // check if the route is dynamic
  var siteName = _shared_assets_static_meta_data_config_json__WEBPACK_IMPORTED_MODULE_6__.siteName;
  var pageData = _shared_assets_static_meta_data_config_json__WEBPACK_IMPORTED_MODULE_6__[page] || getMetaDataFromState(),
      extraMetaData = '',
      canonicalUrl = '';

  if (pageData.storename) {
    var storename = pageData.storename,
        lookupobject = pageData.lookupobject;
    var storeData = state[storename][lookupobject];
    var dynamicMeta = Object.assign(storeData.metaData || getMetaDataFromState());
    extraMetaData = pageData.extraMeta && generateMetaTags(pageData.extraMeta, storeData) || '';
    canonicalUrl = dynamicMeta.canonicalUrl ? "".concat(origin).concat(dynamicMeta.canonicalUrl) : "".concat(origin).concat(reqUrl);
    return Object.assign(dynamicMeta, {
      extraMetaData: extraMetaData,
      siteName: siteName,
      canonicalUrl: canonicalUrl
    });
  }

  canonicalUrl = "".concat(origin).concat(reqUrl);
  extraMetaData = pageData.extraMeta && generateMetaTags(pageData.extraMeta) || '';
  var staticMeta = pageData.title && pageData || pageData['metaTemplate'] && metatemplates()[pageData['metaTemplate']](params);
  return Object.assign(staticMeta, {
    extraMetaData: extraMetaData,
    siteName: siteName,
    canonicalUrl: canonicalUrl
  });
}

function getHosts(cspType) {
  return config__WEBPACK_IMPORTED_MODULE_8___default.a.get('csp.hosts.common').concat(config__WEBPACK_IMPORTED_MODULE_8___default.a.get(cspType)).join(' ');
}

function getCSPSettings(nonce) {
  var cspVal = ['default-src \'none\'', 'base-uri \'self\'', "script-src 'self' 'nonce-".concat(nonce, "' ").concat(getHosts('csp.hosts.scripts'), " 'unsafe-eval' 'strict-dynamic'"), "connect-src 'self' ".concat(getHosts('csp.hosts.connect'), " 'unsafe-inline'"), "img-src 'self' ".concat(getHosts('csp.hosts.images'), " data: blob:"), "font-src 'self' ".concat(getHosts('csp.hosts.fonts')), "frame-src 'self' ".concat(getHosts('csp.hosts.frames')), "style-src 'self' 'unsafe-inline' ".concat(getHosts('csp.hosts.styles')), 'object-src \'self\''].join('; ');
  return cspVal;
}

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("lodash/find");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("lodash/cloneDeep");

/***/ }),
/* 61 */
/***/ (function(module) {

module.exports = JSON.parse("{\"a\":{\"sitecaptions\":[\"CAPTION2\",\"CAPTION7\",\"CAPTION8\",\"CAPTION4\",\"CAPTION9\",\"CAPTION12\"]}}");

/***/ }),
/* 62 */
/***/ (function(module) {

module.exports = JSON.parse("{\"siteName\":\"Data Grabber\",\"CompanyList\":{\"title\":\"\",\"keywords\":\"\",\"description\":\"\"},\"CompanyDetail\":{\"title\":\"\",\"keywords\":\"\",\"description\":\"\"}}");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("lodash/escape");

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(47);

var metrosServed = _config__WEBPACK_IMPORTED_MODULE_0__["default"].metrosServed; // for city cordinates Longitude and latitude
// https://www.latlong.net/search.php?keyword=atlanta+GA+USA

/* harmony default export */ __webpack_exports__["default"] = ({
  "areasServed": [{
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 1,
    "mlsID": "NTREIS",
    "mlsAreaName": "Dallas - Fort Worth, TX",
    "isDefaultMetro": true,
    "label": "Dallas - Fort Worth",
    "name": "dallas",
    "shortName": "DFW",
    "cityName": "dallas",
    "coordinates": [-96.79698789999998, 32.7766642],
    "position": {
      "x": "357",
      "y": "306"
    },
    "radius": 50,
    "stateName": "texas",
    "stateCode": "tx",
    "metroGeoId": "19100",
    "searchBarAddress": "Dallas - Fort Worth, TX, USA",
    "flattenAddress": "dallas-fort-worth",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-97.8909001084528&latS=32.36131200558859&lngE=-95.70307569154716&latN=33.19008668979193",
      "zoom": "",
      "filePath": "/dallas_1/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-97.49461973593748&latS=32.03696323778923&lngE=-96.09935606406248&latN=33.510267078941176",
      "zoom": "",
      "filePath": "/dallas_1/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-97.35042417929685&latS=31.926302512836408&lngE=-96.2435516207031&latN=33.61897671596588",
      "zoom": "",
      "filePath": "/dallas_1/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/texas/dallas-fort-worth/market-index/map/1",
    "aboutUsInfo": {
      "label": "Dallas - Fort Worth, TX"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 2,
    "mlsID": "ARMLSAZ",
    "mlsAreaName": "Phoenix, AZ",
    "label": "Phoenix",
    "name": "phoenix",
    "shortName": "Phoenix",
    "cityName": "phoenix",
    "coordinates": [-112.074036, 33.448376],
    "position": {
      "x": "205",
      "y": "272"
    },
    "radius": 50,
    "stateName": "arizona",
    "stateCode": "az",
    "metroGeoId": "38060",
    "searchBarAddress": "Phoenix, AZ, USA",
    "flattenAddress": "phoenix",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-113.05387913964842&latS=33.08898463975204&lngE=-111.09419286035154&latN=33.80628433758936",
      "zoom": "",
      "filePath": "/phoenix_2/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-112.77166783593748&latS=32.71425393305108&lngE=-111.37640416406248&latN=34.176336657753545",
      "zoom": "",
      "filePath": "/phoenix_2/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-112.62747227929685&latS=32.60441824584214&lngE=-111.5205997207031&latN=34.28420099257654",
      "zoom": "",
      "filePath": "/phoenix_2/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/arizona/phoenix/market-index/map/2",
    "aboutUsInfo": {
      "label": "Phoenix, AZ"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 3,
    "mlsID": "MIBORIN",
    "mlsAreaName": "Indianapolis, IN",
    "label": "Indianapolis",
    "name": "indianapolis",
    "shortName": "Indianapolis",
    "cityName": "indianapolis",
    "coordinates": [-86.146011, 39.733032],
    "position": {
      "x": "518",
      "y": "187"
    },
    "radius": 50,
    "stateName": "indiana",
    "stateCode": "in",
    "metroGeoId": "26900",
    "searchBarAddress": "Indianapolis, IN, USA",
    "flattenAddress": "indianapolis",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-87.12585413964842&latS=39.40167956032279&lngE=-85.16616786035155&latN=40.062799275012715",
      "zoom": "",
      "filePath": "/indianapolis_3/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-86.84364283593749&latS=39.05594979368175&lngE=-85.44837916406249&latN=40.40352837370409",
      "zoom": "",
      "filePath": "/indianapolis_3/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-86.69944727929686&latS=38.95456884226451&lngE=-85.59257472070311&latN=40.50280214373378",
      "zoom": "",
      "filePath": "/indianapolis_3/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/indiana/indianapolis/market-index/map/3",
    "aboutUsInfo": {
      "label": "Indianapolis, IN"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 4,
    "mlsID": "MAARTN",
    "mlsAreaName": "Memphis, TN",
    "label": "Memphis",
    "name": "memphis",
    "shortName": "Memphis",
    "cityName": "memphis",
    "coordinates": [-89.6615, 35.2962],
    "position": {
      "x": "337",
      "y": "122"
    },
    "radius": 50,
    "stateName": "tennessee",
    "stateCode": "tn",
    "metroGeoId": "32820",
    "searchBarAddress": "Memphis, TN, USA",
    "flattenAddress": "memphis",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-91.06427210610963&latS=34.918571337457884&lngE=-88.87794989389039&latN=35.31594411824428",
      "zoom": "",
      "filePath": "/memphis_4/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-90.66874283593751&latS=34.39768155457975&lngE=-89.27347916406251&latN=35.83101441372248",
      "zoom": "",
      "filePath": "/memphis_4/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-90.47510880273438&latS=34.472436180055126&lngE=-89.46711319726563&latN=35.75749654938437",
      "zoom": "",
      "filePath": "/memphis_4/mobile.json"
    }],
    "aboutUsInfo": {
      "label": "Memphis, TN"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 5,
    "mlsID": "MREDIL",
    "mlsAreaName": "Chicago, IL",
    "label": "Chicago",
    "labelDisplayClass": "top",
    "name": "chicago",
    "shortName": "Chicago",
    "cityName": "chicago",
    "coordinates": [-88.02025388671876, 41.79517843173927],
    "position": {
      "x": "526",
      "y": "150"
    },
    "radius": 50,
    "stateName": "illinois",
    "stateCode": "il",
    "metroGeoId": "16980",
    "searchBarAddress": "Chicago, IL, USA",
    "flattenAddress": "chicago",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-89.54323362304689&latS=41.31361601916228&lngE=-87.32948850585939&latN=42.1926182124771",
      "zoom": "",
      "filePath": "/chicago_5/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-88.83049558593751&latS=41.371250736799254&lngE=-87.78679441406251&latN=42.32160187188284",
      "zoom": "",
      "filePath": "/chicago_5/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-88.81264280273439&latS=41.260369460549015&lngE=-87.80464719726564&latN=42.43066055260326",
      "zoom": "",
      "filePath": "/chicago_5/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/illinois/chicago/market-index/map/5",
    "aboutUsInfo": {
      "label": "Chicago, IL"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 6,
    "mlsID": "NEFMLS",
    "mlsAreaName": "Jacksonville, FL",
    "label": "Jacksonville",
    "name": "jacksonville",
    "shortName": "Jacksonville",
    "cityName": "jacksonville",
    "coordinates": [-81.655647, 30.332184],
    "position": {
      "x": "597",
      "y": "336"
    },
    "radius": 50,
    "stateName": "florida",
    "stateCode": "fl",
    "metroGeoId": "27260",
    "searchBarAddress": "Jacksonville, FL, USA",
    "flattenAddress": "jacksonville",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-83.59780487574648&latS=29.635674243785935&lngE=-79.7134891242535&latN=31.02377468188333",
      "zoom": "",
      "filePath": "/jacksonville_6/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-83.59780487574648&latS=29.635674243785935&lngE=-79.7134891242535&latN=31.02377468188333",
      "zoom": "",
      "filePath": "/jacksonville_6/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-82.21320315234374&latS=29.569471471236184&lngE=-81.09809084765624&latN=31.089001875604815",
      "zoom": "",
      "filePath": "/jacksonville_6/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/florida/jacksonville/market-index/map/6",
    "aboutUsInfo": {
      "label": "Jacksonville, FL"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 7,
    "mlsID": "GLVARNV",
    "mlsAreaName": "Las Vegas, NV",
    "label": "Las Vegas",
    "name": "las-vegas",
    "shortName": "Las Vegas",
    "cityName": "las-vegas",
    "coordinates": [-115.172813, 36.114647],
    "position": {
      "x": "162",
      "y": "220"
    },
    "radius": 50,
    "stateName": "nevada",
    "stateCode": "nv",
    "metroGeoId": "29820",
    "searchBarAddress": "Las Vegas, NV, USA",
    "flattenAddress": "las-vegas",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-117.11497087574651&latS=35.462352343184904&lngE=-113.23065512425353&latN=36.76156818188536",
      "zoom": "",
      "filePath": "/lasvegas_7/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-117.11497087574651&latS=35.462352343184904&lngE=-113.23065512425353&latN=36.76156818188536",
      "zoom": "",
      "filePath": "/lasvegas_7/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-115.73036915234377&latS=35.40031159472044&lngE=-114.61525684765627&latN=36.82254322059211",
      "zoom": "",
      "filePath": "/lasvegas_7/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/nevada/las-vegas/market-index/map/7",
    "aboutUsInfo": {
      "label": "Las Vegas, NV"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 8,
    "mlsID": "GAMLS",
    "mlsAreaName": "Atlanta, GA",
    "label": "Atlanta",
    "name": "atlanta",
    "shortName": "Atlanta",
    "cityName": "atlanta",
    "coordinates": [-84.386330, 33.753746],
    "position": {
      "x": "568",
      "y": "280"
    },
    "radius": 50,
    "stateName": "georgia",
    "stateCode": "ga",
    "metroGeoId": "12060",
    "searchBarAddress": "Atlanta, GA, USA",
    "flattenAddress": "atlanta",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-86.35288273437499&latS=33.09700640557418&lngE=-82.41977726562499&latN=34.40549331195533",
      "zoom": "",
      "filePath": "/atlanta_8/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-85.78159367187499&latS=32.97612402162754&lngE=-82.99106632812499&latN=34.52437856546178",
      "zoom": "",
      "filePath": "/atlanta_8/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-84.89032780273436&latS=32.93118263131395&lngE=-83.88233219726561&latN=34.56849280157385",
      "zoom": "",
      "filePath": "/atlanta_8/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/georgia/atlanta/market-index/map/8",
    "aboutUsInfo": {
      "label": "Atlanta, GA"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 9,
    "mlsID": "MFRMLS",
    "mlsAreaName": "Orlando, FL",
    "label": "Orlando",
    "name": "orlando",
    "shortName": "Orlando",
    "cityName": "orlando",
    "coordinates": [-81.379234, 28.538336],
    "position": {
      "x": "629",
      "y": "383"
    },
    "radius": 50,
    "stateName": "florida",
    "stateCode": "fl",
    "metroGeoId": "36740",
    "searchBarAddress": "Orlando, FL, USA",
    "flattenAddress": "orlando",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-83.345786734375&latS=27.8581503125805&lngE=-79.412681265625&latN=29.214158643529714",
      "zoom": "",
      "filePath": "/orlando_9/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-82.774497671875&latS=27.717219097406094&lngE=-79.983970328125&latN=29.35310302313351",
      "zoom": "",
      "filePath": "/orlando_9/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-81.88323180273437&latS=27.66979605737127&lngE=-80.87523619726562&latN=29.399774602762108",
      "zoom": "",
      "filePath": "/orlando_9/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/florida/orlando/market-index/map/9",
    "aboutUsInfo": {
      "label": "Orlando, FL"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 10,
    "mlsID": "SABOR",
    "mlsAreaName": "San Antonio, TX",
    "label": "San Antonio",
    "name": "san-antonio",
    "shortName": "San Antonio",
    "cityName": "san-antonio",
    "coordinates": [-98.491142, 29.424349],
    "position": {
      "x": "357",
      "y": "377"
    },
    "radius": 50,
    "stateName": "texas",
    "stateCode": "tx",
    "metroGeoId": "41700",
    "searchBarAddress": "San Antonio, TX, USA",
    "flattenAddress": "san-antonio",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-100.45769473437497&latS=28.749902710215686&lngE=-96.52458926562497&latN=30.094346967222066",
      "zoom": "",
      "filePath": "/san_antonio_10/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-99.88640567187497&latS=28.61014517663039&lngE=-97.09587832812497&latN=30.23207882767302",
      "zoom": "",
      "filePath": "/san_antonio_10/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-98.99513980273434&latS=28.563115878473862&lngE=-97.9871441972656&latN=30.27834197571884",
      "zoom": "",
      "filePath": "/san_antonio_10/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/texas/san-antonio/market-index/map/10",
    "aboutUsInfo": {
      "label": "San Antonio, TX"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 11,
    "mlsID": "BRIGHT",
    "mlsAreaName": "Philadelphia, PA",
    "label": "Philadelphia",
    "labelDisplayClass": "top",
    "name": "philadelphia",
    "shortName": "Philadelphia",
    "cityName": "philadelphia",
    "coordinates": [-75.165222, 39.952583],
    "position": {
      "x": "683",
      "y": "160"
    },
    "radius": 50,
    "stateName": "pennsylvania",
    "stateCode": "pa",
    "metroGeoId": "37980",
    "searchBarAddress": "Philadelphia, PA, USA",
    "flattenAddress": "philadelphia",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-77.13177473437497&latS=39.306343369201855&lngE=-73.19866926562497&latN=40.592773967063266",
      "zoom": "",
      "filePath": "/philadelphia_11/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-76.20892317187497&latS=38.967617808055834&lngE=-74.12152082812497&latN=40.92356575946765",
      "zoom": "",
      "filePath": "/philadelphia_11/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-75.66921980273435&latS=39.19361593411537&lngE=-74.6612241972656&latN=40.70322077671911",
      "zoom": "",
      "filePath": "/philadelphia_11/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/pennsylvania/philadelphia/market-index/map/11",
    "aboutUsInfo": {
      "label": "Philadelphia, PA"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 12,
    "mlsID": "BRIGHT",
    "mlsAreaName": "Baltimore, MD",
    "label": "Baltimore",
    "name": "baltimore",
    "shortName": "Baltimore",
    "cityName": "baltimore",
    "coordinates": [-76.609383, 39.299236],
    "position": {
      "x": "640",
      "y": "177"
    },
    "radius": 50,
    "stateName": "maryland",
    "stateCode": "md",
    "metroGeoId": "12580",
    "searchBarAddress": "Baltimore, MD, USA",
    "flattenAddress": "baltimore",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-78.57593573437498&latS=38.64690776854879&lngE=-74.64283026562498&latN=39.94554170494868",
      "zoom": "",
      "filePath": "/baltimore_12/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-77.65308417187498&latS=38.305024809047616&lngE=-75.56568182812498&latN=40.27952520071297",
      "zoom": "",
      "filePath": "/baltimore_12/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-77.11338080273435&latS=38.53312695508084&lngE=-76.1053851972656&latN=40.057051751685286",
      "zoom": "",
      "filePath": "/baltimore_12/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/baltimore/maryland/market-index/map/12",
    "aboutUsInfo": {
      "label": "Baltimore, MD"
    }
  }, {
    "markerOffsetX": 0,
    "markerOffsetY": 25,
    "metroID": 13,
    "mlsID": "BRIGHT",
    "mlsAreaName": "Washington, DC",
    "label": "Washington, DC",
    "isHideOnMap": true,
    "labelDisplayClass": "right-bottom",
    "name": "washington",
    "shortName": "Washington, DC",
    "cityName": "washington",
    "coordinates": [-77.065674, 39.014050],
    "position": {
      "x": "70",
      "y": "175"
    },
    "radius": 50,
    "stateName": "dc",
    "stateCode": "dc",
    "metroGeoId": "47900",
    "searchBarAddress": "Washington, DC, USA",
    "flattenAddress": "washington",
    "bounds": [{
      "userAgent": 4,
      "bounds": "lngW=-79.032226734375&latS=38.359091011491266&lngE=-75.099121265625&latN=39.66299885376263",
      "zoom": "",
      "filePath": "/washington_13/desktop.json"
    }, {
      "userAgent": 2,
      "bounds": "lngW=-78.109375171875&latS=38.015844249868884&lngE=-76.021972828125&latN=39.99836241485435",
      "zoom": "",
      "filePath": "/washington_13/tablet.json"
    }, {
      "userAgent": 1,
      "bounds": "lngW=-77.56967180273438&latS=38.24485516907706&lngE=-76.56167619726563&latN=39.774968603332844",
      "zoom": "",
      "filePath": "/washington_13/mobile.json"
    }],
    "marketIndexLink": "/residential-investment-markets/washington/dc/market-index/map/13",
    "aboutUsInfo": {
      "label": "Washington, DC"
    }
  }].filter(function (area) {
    return metrosServed.indexOf(area.name) >= 0;
  }),
  "mapTypeConfig": {
    "cash-purchase": {
      "metaKeyword": "Cash purchase properties"
    },
    "leveraged-purchase": {
      "metaKeyword": "Leveraged purchase properties"
    },
    "sale-price": {
      "metaKeyword": "Sale Price"
    },
    "turn-key-properties": {
      "metaKeyword": "Turn key properties"
    },
    "fixer-properties": {
      "metaKeyword": "Fixer Upper properties"
    },
    "rental-unit-ratio": {
      "metaKeyword": "Rental unit ratio"
    },
    "income": {
      "metaKeyword": "Income"
    },
    "unemployment": {
      "metaKeyword": "Unemployment"
    },
    "population-growth": {
      "metaKeyword": "Population growth"
    },
    "property-crime": {
      "metaKeyword": "Property crime"
    },
    "violent-crime": {
      "metaKeyword": "Violent crime"
    },
    "commute-time": {
      "metaKeyword": "Commute time"
    },
    "market-index": {
      "metaKeyword": "Market index"
    }
  }
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return renderFooter; });
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_escape__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_1__);


var renderHeader = function renderHeader(nonce, scripts, metaData, cssPath, assetsPath) {
  return "<!DOCTYPE html><html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:og=\"http://ogp.me/ns#\" xmlns:fb=\"https://www.facebook.com/2008/fbml\"><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=0\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" /><meta http-equiv=\"x-dns-prefetch-control\" content=\"on\" /><meta charset=\"UTF-8\"><link rel=\"dns-prefetch\" href=\"//images.propshub.com\" /><link rel=\"dns-prefetch\" href=\"//fonts.googleapis.com\" /><link rel=\"dns-prefetch\" href=\"//assets.propshub.com\" /><link rel=\"canonical\" href=\"".concat(metaData.canonicalUrl, "\"></link><link rel=\"shortcut icon\" href=\"").concat(assetsPath, "/images/favicon.ico\" /><link rel=\"manifest\" href=\"").concat(assetsPath, "/manifest.json\"><meta name=\"mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"theme-color\" content=\"#222\"><title>").concat(lodash_escape__WEBPACK_IMPORTED_MODULE_0___default()(metaData.title), "</title><meta name=\"keywords\" content=\"").concat(lodash_escape__WEBPACK_IMPORTED_MODULE_0___default()(metaData.keywords), "\"><meta name=\"description\" content=\"").concat(lodash_escape__WEBPACK_IMPORTED_MODULE_0___default()(metaData.description), "\"><meta name=\"author\" content=\"Propshub, Inc.\" /><meta property=\"fb:app_id\" content=\"2113117318901395\" /><link rel=\"stylesheet\" nonce=\"").concat(nonce, "\" crossorigin href=\"").concat(cssPath, "\"> </head><body><div id=\"react-view\">");
};
var renderFooter = function renderFooter(nonce, vendor, common, main, config, initialState) {
  return "</div><script nonce=\"".concat(nonce, "\" type=\"application/javascript\"> var frameworkGlobals=").concat(serialize_javascript__WEBPACK_IMPORTED_MODULE_1___default()({
    nonce: nonce,
    origin: config.origin,
    isServer: false,
    country: config.country,
    isClient: false,
    isDev: false,
    basePath: '',
    visitorIP: config.visitorIP,
    location: config.location,
    env: config.env,
    visitorCountry: config.visitorCountry,
    visitorCountryName: config.visitorCountryName,
    siteCaptionIndex: config.siteCaptionIndex
  }, {
    isJSON: true
  }), ";window.__CONFIG__=").concat(serialize_javascript__WEBPACK_IMPORTED_MODULE_1___default()(config, {
    isJSON: true
  }), "; window.__INITIAL_STATE__=").concat(serialize_javascript__WEBPACK_IMPORTED_MODULE_1___default()(initialState, {
    isJSON: true
  }), "; </script> <script type=\"application/javascript\" crossorigin src=\"").concat(vendor, "\" nonce=\"").concat(nonce, "\"></script> <script type=\"application/javascript\" crossorigin src=\"").concat(common, "\" nonce=\"").concat(nonce, "\"></script> <script type=\"application/javascript\" crossorigin src=\"").concat(main, "\" nonce=\"").concat(nonce, "\"></script></body> </html>");
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 67 */
/***/ (function(module) {

module.exports = JSON.parse("{\"domain\":\"messages\",\"locale_data\":{\"messages\":{\"MYARTICLES\":[\"My Blogs\"],\"BLOGS\":[\"Blogs\"],\"REMOVEARTICLE\":[\"Expire Blog\"],\"WRITEANARTICLEINFO\":[\"Write a Real Estate Blog\"],\"YOUHAVENOARTICLESTITLE\":[\"You have not authored any Blogs yet\"],\"ARTICLEPOSTED\":[\"Send me an Email Notification when somebody posts a Blog in my Specialty areas\"],\"ARTICLEUPDATED\":[\"Blog Updated !!!\"],\"ARTICLEUPDATEFAILED\":[\"Blog could not be Updated !!! Please try again later.\"],\"YOUHAVENOARTICLESMESSAGE\":[\"Click on the button to Write a Blog\"],\"RESPONSES\":[\"Comments\"],\"SIGNINTOPOSTRESPONSE\":[\"Sign in to Post a Comment\"],\"POSTYOURCOMMENT\":[\"Post your Comment\"],\"POSTCOMMENT\":[\"Post Comment\"],\"UPDATECOMMENT\":[\"Update Comment\"],\"POSTANARTICLE\":[\"Write a Blog\"],\"CREATEARTICLETITLE\":[\"Write a Blog\"],\"ARTICLETITLE\":[\"Blog Title\"],\"ARTICLEPURPOSE\":[\"Blog Summary or Purpose\"],\"RELATEDNEWSARTICLES\":[\"Related Blogs\"],\"TAGS\":[\"Tags\"],\"REFERENCES\":[\"References\"],\"BUYING\":[\"Buying \"],\"ANALYSIS_AND_TRENDS\":[\"Analysis and Trends\"],\"LOANS_AND_MORTGAGES\":[\"Loans and Mortgages\"],\"LANDLORD_AND_TENANT_FORUM\":[\"Landlord and Tenant Forum\"],\"PROPERTY_REPAIRS\":[\"Property Repairs\"],\"BUYING_OVERSEAS\":[\"Buying Overseas\"],\"TOOLS_AND_TIPS\":[\"Tools and Tips\"],\"OTHER_SERVICES\":[\"Other Services\"],\"LATESTNEWSARTICLES\":[\"Latest Blogs\"],\"MOREARTICLES\":[\"More Blogs?\"],\"ARTICLE\":[\"Blog\"],\"NEWSARTICLE\":[\"Blog\"],\"RECENTARTICLES\":[\"Recent Blogs\"],\"DEFAULTARTICLEEMAILMSG\":[\"I read your Blog and would like to discuss further.\"],\"COMMENTEDITED\":[\"Comment Saved !!!\"],\"COMMENTADDED\":[\"Comment Saved !!!\"],\"CREATEARTICLEDESCRIPTION\":[\"Provide a concise summary and relevant tags for your real estate blog to drive more traffic and generate more leads.\"],\"ARTICLECONTENT\":[\"Type your blog content here. Use the toolbar options to format your content and add images or links.\"],\"ADDNEWTAG\":[\"Add a New Tag\"],\"ARTICLETAGS\":[\"Provide Tags for the Blog\"],\"ENTERREFERENCES\":[\"Enter an external Reference\"],\"ADDRELATEDNEWSARTICLES\":[\"Add a Related Blog\"],\"ENTERRELATEDNEWSARTICLE\":[\"Enter the Title of the Related Blog\"],\"POSTARTICLEONLINE\":[\"Post Blog Online\"],\"ARTICLETITLETOOLTIP\":[\"Provide an attractive and self-explanatory title for your blog.\"],\"ARTICLEPURPOSETOOLTIP\":[\"Provide a brief summary and purpose of your blog. Ensure that it contains all the relevant search keywords for which this blog should appear in the results.\"],\"REFERENCESTOOLTIP\":[\"Provide an external reference link or author details or narrative text.\"],\"RELATEDNEWSARTICLETOOLTIP\":[\"Provide references to other related blogs written by you or others.\"],\"ARTICLETITLEREQUIRED\":[\"Blog Title is required\"],\"ARTICLECATEGORYREQUIRED\":[\"Blog Category is required\"],\"ARTICLECONTENTREQUIRED\":[\"Blog Content is required\"],\"ARTICLEPURPOSEREQUIRED\":[\"Blog Summary or Purpose is required\"],\"REPORTISSUEPLACEHOLDER\":[\"Describe your issue here\"],\"CASHFLOWLISTINGS\":[\"Cash Flowing Properties\"],\"ANALYZEPORTFOLIO\":[\"Analyze Portfolio\"],\"UNITNUMBER\":[\"Unit Number\"],\"ROI_ADDRESS_PROMPT\":[\"Please try entering the full address including:\"],\"STARTHERE\":[\"Start here\"],\"CONTACTREFERREDAGENT\":[\"Contact your agent\"],\"CONTACTLISTINGAGENT\":[\"Contact Listing Agent\"],\"CONTACTINVESTMENTSPECIALIST\":[\"Contact investment specialist(s)\"],\"FLYER_VIDEO_TITLE\":[\"Generate flyer for your MLS listing in few easy steps\"],\"ROI_CALCULATOR_VIDEO_TITLE\":[\"Quickly determine ROI for any investment property\"],\"SEARCH_VIDEO_TITLE\":[\"Discover cash flowing investment properties\"],\"ANALYZE_PORTFOLIO_VIDEO_TITLE\":[\"Visualize your rental portfolio to assess performance\"],\"ANALYZE_MARKETS_VIDEO_TITLE\":[\"Analyze investment market dynamics at a deeper level\"],\"EMAIL_CAMPAIGN_FLYER_VIDEO_SUBTITLE\":[\"Watch this video to learn more.\"],\"RENTALNOTALLOWEDTAG\":[\"No Rentals allowed\"],\"RENTALNOTALLOWED\":[\"No Rentals allowed ?\"],\"RENTALNOTALLOWEDTOOLTIP\":[\"Choose this option if the community does not allow rental tenants.\"],\"SEARCHPROPERTIESFORRENT\":[\"Properties for Rent\"],\"ACCESSMYACCOUNT\":[\"Access My Account\"],\"GOOGLE_CONTACTS_NOTE\":[\"Your Google contacts with a valid name and E-mail address will be available for import.\"],\"OWNERFINANCED\":[\"Owner Financed\"],\"OWNERFINANCED_SEARCH_TAB_TOOLTIP\":[\"Browse owner financed properties\"],\"MOBILENUMBERINVALIDERROR\":[\"Please enter a valid ten digit mobile number\"],\"ROICALCULATOR\":[\"ROI Calculator\"],\"SHOWOPENHOUSE\":[\"Display Open House\"],\"ZILLOWPROPERTYLOOKUP\":[\"Lookup property address on Zillow\"],\"ANALYZERETURNSTOOLTIP\":[\"Calculate cash flow for any property using this interactive tool. Rent and expense estimates are automatically populated where possible.\"],\"ZESTIMATE\":[\"Zestimate\"],\"ZESTIMATERENT\":[\"Zestimate Rent\"],\"ZILLOWPROPERTYNOTFOUND\":[\"We could not find a property matching the given address in Zillow. Please try again.\"],\"GETZESTIMATE\":[\"Get Zestimate\"],\"POSTCARD\":[\"Postcard\"],\"EXPENSERATIOGRAPH\":[\"Income/Expense Ratio\"],\"GENERATEFLYERPAGETITLE\":[\"Generate Flyer\"],\"SESSIONEXPIREPROMPT\":[\"Your session has expired. Please Login to continue.\"],\"PDFSHAREDISCLAIMER\":[\"This will send an email to your contact(s) with this PDF report as attachment.\"],\"PROPERTIES\":[\"Properties\"],\"SHOWMYINFO\":[\"Disclose Realtor Information\"],\"SHOWMYBROKERAGEFIRMINFO\":[\"Disclose Brokerage Firm\"],\"SHOWPRICE\":[\"Disclose Price\"],\"SHOWADDRESS\":[\"Disclose Address\"],\"TAXSYSTEMVALUENOTE\":[\"Property Taxes estimated based on past census data provided by U.S. Census Bureau.\"],\"TAXUSERGIVENVALUENOTE\":[\"Property Taxes provided by listing agent.\"],\"EMAILSENDFAIL\":[\"There was some problem sending your Email. Please try again.\"],\"ACTIVATEREALTORWELCOMENOTE\":[\"Welcome. PropsHub empowers real estate agents by providing a easy-to-use platform to manage and market MLS listings for free. Our account activation process is quick and easy. Registered users can schedule open house, manage contacts, share listings, generate flyers and much more.\"],\"ACTIVATEUSERWELCOMENOTE\":[\"Welcome. PropsHub provides an array of tools to identify properties that are good candidates for long term real estate investing in sound markets. Our account activation process is quick and easy. Registered users can track income /expenses and analyze the health of their portfolio in few easy steps for free.\"],\"OWNER\":[\"Owner\"],\"PROFILEPICTOOLTIP\":[\"Ensure that the photo is less than 650KB in size.\"],\"GENERATEREPORT\":[\"Generate Detailed Flyer\"],\"GENERATEFLYER\":[\"Generate Flyer\"],\"HANDOUTCLASSIC\":[\"Classic\"],\"HANDOUTCONTEMPORARY\":[\"Contemporary\"],\"FLYER\":[\"Classic (both-sided)\"],\"HAS_HOA\":[\"HOA\"],\"HAS_POOL\":[\"Pool\"],\"EXPORTTOPDF\":[\"Export to PDF\"],\"LASTTENYEARSVIEW\":[\"10 years\"],\"LASTTHREEYEARSVIEW\":[\"3 years\"],\"LASTYEARVIEW\":[\"1 year\"],\"CUSTOMVIEW\":[\"Custom\"],\"GOTIT\":[\"Got it\"],\"MONTHLYVIEW\":[\"Monthly view\"],\"YEARLYVIEW\":[\"Yearly view\"],\"EXCLUDE\":[\"Exclude\"],\"FILTERNORESULTSFOUND\":[\"No results found\"],\"OFFICE\":[\"Office\"],\"PHONENUMBER\":[\"Phone Number\"],\"SHOWPROFILEPIC\":[\"Display photo\"],\"SHOWLOGO\":[\"Display logo\"],\"PROPERTIESIMPORTSUCCESS\":[\"%s properties imported successfully.\"],\"TRANSACTIONIMPORTSUCCESS\":[\"Data imported successfully.\"],\"SUPPORTEDFORMATS\":[\"Supported Formats:\"],\"ANALYZEPORTFOLIOTOOLTIP\":[\"Use this tool to import historical rental data for properties you currently own and create useful visualizations.\"],\"ANALYZEMYPORTFOLIO\":[\"Analyze My Portfolio\"],\"APPLY\":[\"Apply\"],\"SELECTEDPROPERTIES\":[\"Selected Properties\"],\"INVALIDHEADERSMESSAGE\":[\"One or more required fields are not provided. Please check the detailed instructions for the list of required fields.\"],\"INVALIDHEADERS\":[\"Invalid headers\"],\"ROW\":[\"Row\"],\"COLUMN\":[\"Column\"],\"MESSAGE\":[\"Message\"],\"LOADINGFILE\":[\"Loading file\"],\"VALIDATINGDATA\":[\"Validating data\"],\"INVALIDDATAFOUND\":[\"Invalid data found\"],\"UPLOADINGDATA\":[\"Uploading data\"],\"HIDEINSTRUCTIONS\":[\"Hide Instructions\"],\"IMPORTPROPERTIES\":[\"Import Properties\"],\"IMPORTINCOMEEXPENSE\":[\"Import Income / Expenses\"],\"QUICKBOOKSTEMPLATE\":[\"QuickBooks Profit and Loss Detail\"],\"APPFOLIOTEMPLATE\":[\"AppFolio Profit and Loss Detail\"],\"DEFAULTTEMPLATE\":[\"PropsHub Transaction Report\"],\"UPLOADFILE\":[\"Upload file\"],\"DELETEPROPERTYCONFIRM\":[\"Are you sure you want to remove this property from your portfolio?\"],\"DELETETRANSACTIONCONFIRM\":[\"Are you sure you want to delete this transaction?\"],\"EXIT\":[\"Exit\"],\"EDITTRANSACTION\":[\"Edit Transaction\"],\"ADDTRANSACTION\":[\"Add Transaction\"],\"LASTYEAR\":[\"Last year\"],\"INCOMEEXPENSERATIO\":[\"Expense Ratio\"],\"EXPENSEBREAKDOWN\":[\"Expense Breakup\"],\"MYPORTFOLIO\":[\"My Portfolio\"],\"INCOMEEXPENSENOTADDED\":[\"You have not added income/expenses information for this property.\"],\"YEARPURCHASED\":[\"Year of Purchase\"],\"SUBTYPE\":[\"Sub Type\"],\"TRANSACTIONDATE\":[\"Transaction Date\"],\"ADDINCOMEEXPENSE\":[\"Add Income/Expense\"],\"RENTAL_INCOME\":[\"Rental Income\"],\"MANAGEMENT_FEE\":[\"Management Fee\"],\"LEASING_FEE\":[\"Leasing Fee\"],\"PROPERTY_TAXES\":[\"Property Taxes\"],\"INSURANCE\":[\"Insurance\"],\"HOA_FEE\":[\"HOA Fee\"],\"MAINTENANCE\":[\"Maintenance\"],\"OTHER_EXPENSES\":[\"Other Expenses\"],\"OTHER_INCOME\":[\"Other Income\"],\"INCOMEEXPENSES\":[\"Income / Expenses\"],\"EXPENSETREND\":[\"Expenses\"],\"TOTALINCOME\":[\"Total Income\"],\"TOTALEXPENSES\":[\"Total Expenses\"],\"EXPENSETYPEREQUIRED\":[\"Expense type is required\"],\"MONTHLYRENTTREQUIRED\":[\"Monthly rent is required\"],\"EXPENSEDATEREQUIRED\":[\"Expense date is required\"],\"LEASESTARTDATEREQUIRED\":[\"Lease start date is required\"],\"LEASEENDDATEREQUIRED\":[\"Lease end date is required\"],\"EXPENSEAMOUNTREQUIRED\":[\"Expense amount is required\"],\"INCOMENOTADDED\":[\"You have not added lease information for this property.\"],\"EXPENSESNOTADDED\":[\"You have not added any expenses for this property.\"],\"DOWNLOADIMPORTTEMPLATE\":[\"Download template\"],\"IMPORTDATA\":[\"Import\"],\"PRINT\":[\"Print\"],\"PURCHASEPRICEREQUIRED\":[\"Purchase price is required\"],\"DOWNPAYMENTREQUIRED\":[\"Down payment is required\"],\"SAVEANDEXIT\":[\"Save & Exit\"],\"LEVERAGEDPURCHASEDETAIL\":[\"Loan Purchase\"],\"CASHPURCHASEDETAIL\":[\"Cash Purchase\"],\"UPDATE\":[\"Update\"],\"AREAUOM\":[\"Unit\"],\"PROPERTYADDRESS\":[\"Property Address\"],\"YEARONE\":[\"Year 1\"],\"YEARTEN\":[\"Year 10\"],\"SENDMARKETINGEMAIL\":[\"Send me promotions and marketing Emails.\"],\"TENANTNAME\":[\"Tenant Name\"],\"ADDEXPENSE\":[\"Add Expense\"],\"EXPENSEDATE\":[\"Date\"],\"ADDINCOME\":[\"Add Income\"],\"LEASESTARTDATE\":[\"Lease Start Date\"],\"PURCHASEDATE\":[\"Purchase Date\"],\"PURCHASEPRICE\":[\"Purchase Price\"],\"CREATEPROPERTYTITLE\":[\"My Property\"],\"CREATEAPROPERTY\":[\"Add a Property\"],\"YOUHAVENOPROPERTIESTITLE\":[\"You have not added any Properties\"],\"YOUHAVENOPROPERTIESMESSAGE\":[\"Click on the button to add a Property\"],\"UNSUBSCRIBE\":[\"Unsubscribe\"],\"UNSUBSCRIBEERROR\":[\"There was a problem unsubscribing. Please try again\"],\"UNSUBSCRIBE_SUCCESSFULL\":[\"You have been successfully unsubscribed.\"],\"MARKETING_UNSUBSCRIBE\":[\"Marketing e-mails\"],\"LEADGENERATION_UNSUBSCRIBE\":[\"Lead generation e-mails\"],\"MARKETING_UNSUBSCRIBE_DESCRIPTION\":[\"By checking this option, you will not receive any marketing communications and news letters from PropsHub.\"],\"LEADGENERATION_UNSUBSCRIBE_DESCRIPTION\":[\"By checking this option, you will not receive any contact notification when other users try to reach out to you via chat/telephone/email/rsvp options from PropsHub.\"],\"CHOOSEAMARKET\":[\"Choose a market\"],\"CHOOSESEARCHCATEGORY\":[\"Choose a category\"],\"SEARCHBYCATEGORY\":[\"Search by Category\"],\"BUNDLETOOLTIP\":[\"Based on your investment amount, in addition to this property, we estimate you can buy %s additional properties. Click to see additional properties.\"],\"TOTALINVESTMENT\":[\"Investment\"],\"ACTIVATEYOURACCOUNT\":[\"Activate your account\"],\"AUTO_VERIFIED_USER_PASSWORD_SET_DONE\":[\"Your account is already activated. Please login\"],\"AUTO_VERIFIED_USER_TOKEN_INVALID\":[\"Invalid activation link. Please try again\"],\"AUTO_VERIFIED_USER_TOKEN_EXPIRED\":[\"Activation link has been expired. Please provide the security code to verify your Email\"],\"CASHFLOWPOSITIVE_SEARCH_TAB_TOOLTIP\":[\"Browse properties with rent greater than all associated expenses.\"],\"TURNKEY_SEARCH_TAB_TOOLTIP\":[\"Browse properties which are currently occupied by tenants.\"],\"FIXERUPPER_SEARCH_TAB_TOOLTIP\":[\"Browse properties that requires significant repairs and/or upgrades prior to renting.\"],\"BESTBUY_SEARCH_TAB_TOOLTIP\":[\"Browse properties with list price significantly lesser than comparable properties in the immediate neighborhood.\"],\"MOTIVATEDSELLER_SEARCH_TAB_TOOLTIP\":[\"Browse properties that are priced to sell.\"],\"FURNISHEDRENTAL_SEARCH_TAB_TOOLTIP\":[\"Browse properties that are fully furnished.\"],\"VACATIONRENTAL_SEARCH_TAB_TOOLTIP\":[\"Browse properties that are being rented as seasonal, executive or vacation rentals.\"],\"ASSISTEDLIVING_SEARCH_TAB_TOOLTIP\":[\"Browse properties that are being rented in senior or assisted living communities.\"],\"LUXURYRENTAL_SEARCH_TAB_TOOLTIP\":[\"Browse properties that are being rented as executive or luxury rentals.\"],\"SEARCHBYLOCATIONTOOLTIP\":[\"Search for properties by City, Zip Code, Neighborhood, Address\"],\"CHOOSEMARKETTOANALYZE\":[\"Choose investment market to analyze\"],\"SEARCHBYLOCATION\":[\"Search by Location\"],\"ALLPROPERTIESFORSALE\":[\"All Properties For Sale\"],\"ALLCASH\":[\"( All Cash )\"],\"LEVERAGEDDOWNVALUE\":[\"( 20% Down )\"],\"SHAREMYWATCHLIST\":[\"Share My Watch List\"],\"WHATISPROPSHUB\":[\"What is PropsHub?\"],\"MODIFYSEARCH\":[\"Modify Search\"],\"EXPLORE\":[\"Explore\"],\"POPULARLISTINGSRENTALUNIT\":[\"Turn key\"],\"POPULARLISTINGSLEVERAGED\":[\"Loan Purchase\"],\"POPULARLISTINGSVALUEADDED\":[\"Fixer Upper\"],\"GENERATE\":[\"Generate\"],\"PDFNOIMAGESTOCHOOSE\":[\"This listing does not have any photos. Please edit your listing to upload photos\"],\"GUIDEDSEARCHTOOLTIP\":[\"Cut to the chase. Tell us how much you plan to invest and in a few steps we will show you cash flowing and turn-key properties that suit your budget.\"],\"ANALYZEMARKETSTOOLTIP\":[\"If you are not sure where to invest, this tool is useful. Choose a market below to understand the market dynamics at a deeper level.\"],\"YOURAD\":[\"Your Ad\"],\"INTERESTED\":[\"Interested in this property?\"],\"REQUESTCOMPANYUPDATE\":[\"Company information update\"],\"REQUESTUPDATES\":[\"Request updates\"],\"HELPMEINVEST\":[\"Guided Search\"],\"SHOWMORE\":[\"Show more\"],\"GUIDEDSEARCHLASTSTEP\":[\"Identify cash flowing properties\"],\"HELPMEINVESTCAPTION\":[\"Identify cash flowing properties in a few steps\"],\"GETSTARTED\":[\"Start\"],\"HELPTIP\":[\"Help\"],\"SAVERETURNS\":[\"Save Returns\"],\"RESETSUCCESS\":[\"The estimates have been reset.\"],\"RESET\":[\"Reset\"],\"RETURNSSAVED\":[\"This Return has been saved in My Returns.\"],\"ERRORSAVINGRETURNS\":[\"Error while saving your returns. Please try again later\"],\"ERRORSAVING\":[\"Error while saving this record\"],\"YOUHAVENORETURNSTITLE\":[\"You have no saved returns\"],\"YOUHAVENORETURNSMESSAGE\":[\"You can save unlimited number of returns from the calculate ROI page\"],\"MYRETURNS\":[\"My Returns\"],\"LEARNMORE\":[\"Learn more\"],\"PREFERREDVENDORS\":[\"Preferred vendors\"],\"VISITORMESSAGE\":[\"Real estate investors in %s can buy and sell properties in USA\"],\"DIDYOUKNOW\":[\"Did you know?\"],\"CAPTION7\":[\"Analyze investment market dynamics at a deeper level\"],\"CAPTION8\":[\"Discover cash flowing investment properties\"],\"CAPTION9\":[\"Generate flyer for your MLS listing in few easy steps\"],\"CAPTION12\":[\"Visualize your rental portfolio to assess performance\"],\"MOBILEACCESSINFOTIP\":[\"Our site is not yet optimized for mobile devices. Please use our desktop site.\"],\"DONE\":[\"Done\"],\"HIGHESTRENTPOTENTIAL\":[\"Rent Estimate (High to Low)\"],\"CAPRATESEARCHTAB\":[\"All Cash Purchase\"],\"LEVERAGEDSEARCHTAB\":[\"Loan Purchase\"],\"LEVERAGEDSEARCHTOOLTIP\":[\"Browse properties that offer a positive cash flow with a loan purchase. Use the calculate ROI feature to understand the return potential and verify the return potential with a qualified realtor.\"],\"ADVERTISEWITHUS\":[\"Advertise with us\"],\"BECOMEPREFERREDREALTOR\":[\"Become a PropsHub investment specialist\"],\"IRRYEARTEN\":[\"IRR (Yr 10)\"],\"CAPRATEYEARONE\":[\"Cap Rate Estimate (Yr 1)\"],\"IRRTOOLTIP\":[\"Internal Rate of Return. Includes 6% sale closing cost.\"],\"IRRGRAPHNOTE\":[\"Includes 6% sale closing cost\"],\"CAPRATELEGENDSNOTE\":[\"Median cap rate Estimate\"],\"MEDIANPRICELEGENDSNOTE\":[\"Median prices of active listings\"],\"RENTALUNITLEGENDSNOTE\":[\"Rented vs self-occupied units\"],\"INCOMELEGENDSNOTE\":[\"Median income\"],\"UNEMPLOYMENTLEGENDSNOTE\":[\"Unemployment rate\"],\"POPULATIONLEGENDSNOTE\":[\"Annual population growth\"],\"PROPERTYCRIMELEGENDSNOTE\":[\"Crimes per 100K population\"],\"VIOLENTCRIMELEGENDSNOTE\":[\"Crimes per 100K population\"],\"COMMUTETIMELEGENDSNOTE\":[\"Median commute time to work\"],\"RECOMMENDATIONLEGENDSNOTE\":[\"Investment market index\"],\"FIXERUPPERLEGENDNOTE\":[\"Count of fixer upper properties\"],\"TURNKEYLEGENDNOTE\":[\"Count of turn key properties\"],\"TURNKEYTOOLTIP\":[\"Browse turn key properties. A turn key property comes with a tenant and a property manager. Typically, this means rent is collected from the first day of ownership. Pay attention to the lease terms.\"],\"FIXERUPPERTOOLTIP\":[\"Browse fixer upper properties. A fixer upper is a property that needs repairs to bring the property up to rentable condition. Typically, these properties are priced lower to account for the repair expenses. Compare prices to make sure that the list price reflects this expense. A PropsHub investment specialist can help you with the rehab management.\"],\"CAPRATESEARCHTOOLTIP\":[\"Browse properties that offer a positive cash flow with an all cash purchase. Use the calculate ROI feature to understand the return potential and verify the return potential with a qualified realtor.\"],\"POPULARSEARCHES\":[\"Popular Searches\"],\"POPULARSEARCHTABTOOLTIP\":[\"View of popular searches like turn key, fixer upper & listing price by zip code.\"],\"TURNKEYTABTOOLTIP\":[\"View of turn key property counts by zip code. A turn key property comes with a tenant and a property manager. Typically, this means rent is collected from the first day of ownership. Pay attention to the lease terms.\"],\"FIXERUPPERTABTOOLTIP\":[\"View of fixer upper property counts by zip code. A fixer upper is a property that needs repairs to bring the property up to rentable condition. Typically, these properties are priced lower to account for the repair expenses. Compare prices to make sure that the list price reflects this expense. A PropsHub investment specialist can help you with the rehab management.\"],\"IRR\":[\"IRR\"],\"DEMOGRAPHICSTABTOOLTIP\":[\"View of demographics by zip code. Data sourced from United States Census Bureau and Federal Bureau of Investigation.\"],\"GROSSRENTREVENUETOOLTIP\":[\"Monthly rent times 12.\"],\"MORTGAGEBROKER\":[\"Mortgage Broker\"],\"REPORTANISSUE\":[\"Report an issue\"],\"SUBJECT\":[\"Subject\"],\"REAL_ESTATE_INVESTOR\":[\"Real Estate Investor\"],\"USERREGISTRATIONTYPE\":[\"I am a\"],\"NEEDLEGALADVICE\":[\"Need legal advice\"],\"NEEDINSURANCE\":[\"Need insurance\"],\"NEEDLOAN\":[\"Need loan\"],\"NEEDINVESTMENTADVICE\":[\"Need investment advice\"],\"NEEDBUYINGASSISTANCE\":[\"Need buying assistance\"],\"PROVIDEFEEDBACK\":[\"Send site feedback\"],\"REPORTINACCURACYESTIMATIONS\":[\"Report inaccuracy\"],\"PROVIDESUBJECT\":[\"Provide subject\"],\"USERREGISTRATIONTYPETOOLTIP\":[\"Your profession or specialty\"],\"REALESTATEPROFESSIONALS\":[\"PropsHub preferred vendors\"],\"INCORPORATION_ATTORNEY\":[\"Incorporation Attorney\"],\"INSURANCE_AGENT\":[\"Insurance Agent\"],\"LOAN_OFFICER\":[\"Loan Officer\"],\"FROM\":[\"From\"],\"LISTEDTODAY\":[\"Listed Today\"],\"EMAILINVALIDERROR\":[\"The email entered is invalid. Please enter a valid email.\"],\"ROOMGREATEROREQUALBEDROOM \":[\"The total number of rooms should be greater than or equal to the number of bedrooms.\"],\"VIEWTYPESTOOLTIP\":[\"Provide views seen from your property such as mountain view, pool view, park view etc.\"],\"ADDVIEWTYPES\":[\"Add View Type\"],\"SEARCHORCLICKTEXT\":[\"Search above or click below to explore\"],\"PROPSHUBINDEX1\":[\"least favorable\"],\"PROPSHUBINDEX5\":[\"most favorable\"],\"MAPDRAWSELECTIONINFO\":[\"Click to search for properties\"],\"DAYSONMARKET\":[\"Days on Market\"],\"NEWEST\":[\"Newest\"],\"OLDEST\":[\"Oldest\"],\"RENTALUNITRATIO\":[\"Rental Unit Ratio\"],\"SHAREVIAEMAIL\":[\"Share via Email\"],\"INVESTMENTSPECIALISTS\":[\"Investment Specialist(s)\"],\"LEASED\":[\"Leased\"],\"MARKETPRICESTOOLTIP\":[\"This graph is developed using the best available comparable properties within the geographical vicinity of the listed property. \"],\"AREASSERVEDNOTE\":[\"Now serving Dallas Fort Worth (DFW) Metro.\"],\"SELECTMETROTOEXPLORE\":[\"Analyze Markets\"],\"MEDIANSALEPRICECAVEAT\":[\"Verify accuracy with qualified professional.\"],\"SYSTEMGENERATEDVALUENOTE\":[\"All data presented via PropsHub products are purely for educational purposes only and are estimates based on data from various sources. PropsHub does not guarantee the accuracy or reliability of data presented via its products. Do not make any purchase decision based on data presented via PropsHub products. We highly recommend, that you verify every piece of data with a qualified professional and do your own due diligence prior to making any investment decision.\"],\"NETOPERATINGINCOMETOOLTIP\":[\"The Net Operating Income (NOI) is the annual income generated by a property after including all income collected from operations, and deducting all expenses incurred from operations\"],\"CAPRATETOOLTIP\":[\"Ratio of Net Operating Income to Asking Price\"],\"CASHONCASHRETURNPERCENTAGETOOLTIP\":[\"Ratio of Cash Flow to Initial Investment.\"],\"VACANCYLOSSESTOOLTIP\":[\"Losses that stems from vacancy.  Assumed at 15 days. \"],\"MANAGEMENTFEESTOOLTIP\":[\"Fees paid for property management. Assumed at 8%. \"],\"LEASINGFEESTOOLTIP\":[\"Fees paid for new tenant acquisition. Assumed at half month rent.\"],\"PROPERTYINSURANCETOOLTIP\":[\"Fire and hazard insurance premium.\"],\"PROPERTYTAXESTOOLTIP\":[\"Estimated Annual Property Tax.\"],\"PROPERTYMAINTENANCETOOLTIP\":[\"Expenses related to repairs, upgrades and maintenance. \"],\"MONTHLYRENTREVENUETOOLTIP\":[\"Monthly rent Estimate.\"],\"OWNERASSOCIATIONFEETOOLTIP\":[\"Home owners association dues. \"],\"HOMECAPTION\":[\"Discover cash flowing investment properties\"],\"SITECAPTION\":[\"Find your next deal\"],\"CAPTION1\":[\"Investment decisions made simple\"],\"CAPTION2\":[\"Quickly determine ROI for any investment property\"],\"CAPTION3\":[\"Compare prices, trends and potential\"],\"CAPTION4\":[\"View comprehensive neighborhood demographic data\"],\"CAPTION5\":[\"Generate flyers and reports for free\"],\"CAPTION6\":[\"Chat online with real estate professionals\"],\"RECOMMENDATIONTABTOOLTIP\":[\"View of the proprietary index we compute for a zip code by looking at a variety of factors like cap rate estimate, list price, median income, population growth, unemployment rate, rental units ratio, property crime, violent crime. A higher index rating usually means that the zip code ranked favorably on most key factors.\"],\"CASHFLOWPOSITIVETABTOOLTIP\":[\"View of Cash flow positive properties by zip code. Cash flow positive property is one whose rent generated is greater than all expenses associated with that property.\"],\"CAPRATETABTOOLTIP\":[\"View of median cap rate estimate by zip code. Cap Rate is the ratio of Net Operating Income to Asking Price.\"],\"CASHONCASHTABTOOLTIP\":[\"View of median cash on cash estimate by zip code. Cash on cash estimate is the ratio of Net Operating Income after debt service to initial investment assuming 20% down.\"],\"CASHONCASHLEGENDSNOTE\":[\"Median cash on cash estimate assuming 20% down\"],\"MEDIANSALEPRICETABTOOLTIP\":[\"View of median listing prices by zip code.\"],\"INCOMETABTOOLTIP\":[\"View of median income by zip code. Data sourced from United States Census Bureau.\"],\"WIDGETPOPULATIONGROWTHTABTOOLTIP\":[\"View of population growth by zip code. Data sourced from United States Census Bureau.\"],\"UNEMPLOYMENTGROWTHTABTOOLTIP\":[\"View of unemployment rate by zip code. Data sourced from United States Census Bureau.\"],\"RENTEDUNITTABTOOLTIP\":[\"View of ratio of rental units to owner occupied units by zip code. Data sourced from United States Census Bureau.\"],\"PROPERTYCRIMETABTOOLTIP\":[\"View of property crime rate by zip code. Data sourced from Federal Bureau of Investigation.\"],\"VIOLENTCRIMETABTOOLTIP\":[\"View of violent crime rate by zip code. Data sourced from Federal Bureau of Investigation.\"],\"COMMUTETIMETABTOOLTIP\":[\"View of commute time to work by zip code. Data sourced from United States Census Bureau.\"],\"MAPSEARCHUSAGEINFO\":[\"To view properties, click on a zip code, OR, draw a circle/rectangle to select a custom area on the map and click on the selected area. \"],\"HIGHCASHFLOWTABTOOLTIP\":[\"This map compares the count of the cash flow positive properties for sale in each zip code. Neighborhoods with higher number of cash flow positive properties are ideal for investment.\"],\"MAKEANOFFER\":[\"Submit LOI\"],\"MAKEANOFFERDEFAULTMESSAGE\":[\"Type your message here...\"],\"MAKEANOFFERCONFIRMATION\":[\"Your LOI has been submitted. You should hear from an agent shortly.\"],\"LISTINGAGENT\":[\"Agent\"],\"LISTINGAGENTS\":[\"Agents\"],\"RENTEDUNITS\":[\"Rental Units\"],\"IDEALFORINVESTMENT\":[\"Good\"],\"INVESTWITHCAUTION\":[\"Fair\"],\"RECOMMENDATIONTAB\":[\"PropsHub Index\"],\"ADDTOCONTACTS\":[\"Add to My Contacts\"],\"RENTPOTENTIALONFIXUP\":[\"Rent Estimate on Fixup\"],\"SHOWRENTALPROPERTY\":[\"Rental Unit ?\"],\"RENTALPROPERTY\":[\"Rental Unit\"],\"TWOBHKAPARTMENTPRICE\":[\"Two Bedroom\"],\"PROPERTYTAXES\":[\"Property Taxes\"],\"APARTMENTDETAILSCOLLAPSIBLE\":[\"Building Features\"],\"NUMBEROFPARKINGLOTS\":[\"Parking Spaces\"],\"NUMBEROFSTORIES\":[\"Levels\"],\"VIEWINSLIDESHOW \":[\"View in slide show\"],\"CONTACTOURLEADREALTOR\":[\"Contact our preferred realtor(s)\"],\"CONTACTOURLEADVENDOR\":[\"Contact our preferred vendor(s)\"],\"MONTHLYRENTREVENUE\":[\"Monthly Rent\"],\"CASHFLOWPOSITIVETAB\":[\"Cash Flow Positive Density\"],\"CASHFLOWPOTENTIAL\":[\"Cash Flow Estimate\"],\"MEDIANSALEPRICETAB\":[\"Sale Price\"],\"MEDIANLISTINGPRICE\":[\"Median Listing Price\"],\"PROPERTIESFORSALECOUNT\":[\"Properties for Sale\"],\"ANALYZERETURNSREQUIREDINFOTITLE\":[\"Please provide the following information to proceed\"],\"ANALYZE\":[\"Analyze\"],\"COMMUTETIME\":[\"Commute Time\"],\"PROPERTYCRIMETAB\":[\"Property Crime\"],\"VIOLENTCRIMETAB\":[\"Violent Crime\"],\"STREETVIEWNOTAVAILABLE\":[\"Street View not available\"],\"CHOOSEFROMEXISTINGCONTACTS\":[\"Choose Contact\"],\"ADDNEWCONTACT\":[\"Add New Contact\"],\"SENDINGTO\":[\"Sending To\"],\"CONTACTADDEDSUCCESS\":[\"Contact added successfully.\"],\"LEGENDS\":[\"Legends\"],\"SUBDIVISION\":[\"Sub Division\"],\"PHARMACY\":[\"Pharmacy\"],\"PARK\":[\"Park\"],\"PHOTOSLIDESHOW\":[\"Slide Show\"],\"PLAY\":[\"Play\"],\"PAUSE\":[\"Pause\"],\"IRRGROUP\":[\"Annual Appreciation\"],\"PROPERTYANNUALAPPRECIATIONPERCENTAGE\":[\"Property Price\"],\"RENTINCREMENTPERCENTAGE\":[\"Rent\"],\"DOWNPAYMENTCOST\":[\"Down Payment\"],\"DOWNPAYMENT\":[\"Down Payment\"],\"MOTIVATEDSELLER\":[\"Motivated Seller\"],\"APPLIEDFILTERS\":[\"Clear Filters\"],\"VIEWTYPES\":[\"View Types\"],\"MEDIANLEASEPRICEANALYSIS\":[\"Estimated Monthly Rent\"],\"STREETVIEW\":[\"Street View\"],\"HIGHCASHFLOW\":[\"Cash Flow Positive\"],\"HIGHCASHONCASH\":[\"Cash Flow Positive\"],\"TERMSCONDITIONS\":[\"Terms of Use\"],\"SAVED\":[\"This Search Criteria has been Saved in My Searches. You will receive Email notifications if new matches are found.\"],\"PHOTOSGALLERY\":[\"Photos\"],\"MEDIANMARKETPRICE\":[\"Median\"],\"VALUEADDED\":[\"Fixer Upper\"],\"OWNERASSOCIATIONFEE\":[\"HOA Fee\"],\"MEANTRAVELTIME\":[\"Mean Commute Time\"],\"INCOMEEXPENSEGROUP\":[\"Income & Leasing Expenses\"],\"INVESTMENTEXPENSEGROUP\":[\"Investment & Property Expenses\"],\"CASHONCASHGROWTH\":[\"Cash on Cash Growth\"],\"CAPRATEGROWTH\":[\"Cap Rate Growth\"],\"MINUTES\":[\"Mins\"],\"UNEMPLOYMENTGROWTHYAXIS\":[\"Unemployment Rate\"],\"UNEMPLOYMENTGROWTH\":[\"Unemployment\"],\"WIDGETUNEMPLOYMENT\":[\"Unemployment Rates\"],\"OVERVIEW\":[\"Overview\"],\"ROIGROUP\":[\"Return on Investment\"],\"LOCATEONMAP\":[\"Locate on Map\"],\"ANY\":[\"Any\"],\"LEVERAGEDPURCHASE\":[\"Loan Purchase\"],\"CASHPURCHASE\":[\"Cash Purchase\"],\"RENTALUNIT\":[\"Turn Key\"],\"FURNISHEDRENTAL\":[\"Furnished Unit\"],\"MOSTPROPERTIES\":[\"Popular Range\"],\"BESTBUY\":[\"Below Market Price\"],\"SUBTYPEAREABEDROOM\":[\"Similar area & bedrooms\"],\"MORESEARCHOPTIONS\":[\"Map Search\"],\"SUBTYPEAREA\":[\"Similar area\"],\"NOPROPERTIESTOCOMPARE\":[\"No Similar Properties for Comparison\"],\"EXTERNALLINKSTABTITLE\":[\"Provide the URL of your Related Links\"],\"EXTERNALLINKPLACEHOLDER\":[\"Type your Related Link Title\"],\"EXTERNALLINKURLPLACEHOLDER\":[\"Type or Paste your Related Link URL\"],\"EXTERNAlLINKTITLE\":[\"Related Link Title\"],\"EXTERNALLINKURL\":[\"Related Link\"],\"EXTERNALLINKS\":[\"External Links\"],\"LUXURYRENTAL\":[\"Luxury Rental\"],\"MOREPROPERTIES\":[\"Market Prices\"],\"RENTALCATEGORY\":[\"Rental Category\"],\"DOWNPAYMENTPERCENTAGE\":[\"Down Payment\"],\"LOANINTERESTRATE\":[\"Interest Rate\"],\"INITIALIMPROVEMENTCOST\":[\"Fixup + Closing Cost\"],\"MANAGEMENTFEES\":[\"Management Fee\"],\"LEASINGFEES\":[\"Leasing Fee\"],\"PROPERTYINSURANCE\":[\"Insurance\"],\"PROPERTYMAINTENANCE\":[\"Maintenance\"],\"CUMANNUALRENT\":[\"Annual Rent\"],\"TOTALGAINCHART\":[\"Cumulative Gains\"],\"RENTCASHFLOWCHART\":[\"Income Growth\"],\"ANNUALFREECASHFLOW\":[\"Cash Flow\"],\"DEBTSERVICES\":[\"Debt Service\"],\"PERCENTAGEOFGRR\":[\"% of Annual Income\"],\"CHOOSELOCATIONTOSEARCH\":[\"Please enter a valid Metro / City / Zip Code / Neighborhood to begin your Search\"],\"RENTPOTENTIAL\":[\"Rent Estimate\"],\"UPTO\":[\"Up to\"],\"MEDIANSALEPRICEANALYSIS\":[\"Asking Price Comparison\"],\"MEDIANLEASEPRICE\":[\"Median Rental\"],\"SUBTYPEBEDROOM\":[\"Same bedrooms\"],\"NON_REFUNDABLE_PET_FEE\":[\"Non Refundable Pet Fee\"],\"CUMPRINCIPALPAID\":[\"Cumulative Principal Paid\"],\"CUMAPPRECIATION\":[\"Cumulative Appreciation\"],\"CUMCASHFLOW\":[\"Cumulative Cash Flow\"],\"MEDIANPRICESTATS\":[\"Comparison\"],\"MEDIANCURRENTPRICE\":[\"This property\"],\"MEDIANLOWPRICE\":[\"Low\"],\"MEDIANHIGHPRICE\":[\"High\"],\"BACK\":[\"Back\"],\"ACREAGE\":[\"Acreage\"],\"SQUAREFOOTAGE\":[\"Square Footage\"],\"YEAR\":[\"Year\"],\"RATEOFRETURN\":[\"Rate of Return\"],\"INTERNALRATEOFRETURNWITHMORTGAGE\":[\"Internal Rate of Return\"],\"INTERNALRATEOFRETURN\":[\"Internal Rate of Return\"],\"SALECLOSINGCOST\":[\"Sale Closing Cost\"],\"CALCULATERETURN\":[\"Calculate ROI\"],\"INVESTMENTGROUP\":[\"Investment\"],\"MORTGAGEGROUP\":[\"Mortgage\"],\"INCOMEGROUP\":[\"Income\"],\"EXPENSEGROUP\":[\"Annual Expenses\"],\"RETURNGROUPWITHOUTMORTGAGE\":[\"Estimated Returns\"],\"RETURNGROUPWITHMORTGAGE\":[\"Estimated Returns\"],\"ASKINGPRICE\":[\"Asking Price\"],\"CLOSINGCOST\":[\"Closing Cost\"],\"EMICOST\":[\"Monthly Mortgage\"],\"LOANDURATION\":[\"Term\"],\"DEPRECIATIONPERCENTAGE\":[\"Depreciation\"],\"INITIALINVESTMENTWITHMORTGAGE\":[\"Initial Investment\"],\"INITIALINVESTMENTWITHOUTMORTGAGE\":[\"Initial Investment\"],\"TOTALINVESTMENTCOST\":[\"Cost Basis\"],\"COSTBASIS\":[\"Total Cost Basis\"],\"ANNUALTAXABLEINCOMEWITHMORTGAGE\":[\"Taxable Cash Flow\"],\"ANNUALTAXABLEINCOMEWITHOUTMORTGAGE\":[\"Taxable Cash Flow\"],\"INITIALINVESTMENT\":[\"Initial Investment\"],\"CASHONCASHRETURNPERCENTAGE\":[\"Cash on Cash\"],\"APPROXCALCVALUENOTE\":[\"Actual values may vary\"],\"ALLPROPERTIES\":[\"All Properties\"],\"CURRENTPROPERTY\":[\"This property\"],\"MEDIANSALEPRICEXAXIS\":[\"Median Sale Price (USD)\"],\"MEDIANSALEPRICEYAXIS\":[\"Category\"],\"MEDIANLEASEPRICEXAXIS\":[\"Median Rent (USD)\"],\"MEDIANLEASEPRICEYAXIS\":[\"Category\"],\"MEDIANLEASEPRICESTATS\":[\"Median Price\"],\"MEDIANSALEPRICESTATS\":[\"Median Price\"],\"DAILY\":[\"Per Day\"],\"WEEK\":[\"Per Week\"],\"MONTH\":[\"Per Month\"],\"ANNUALLY\":[\"Per Annum\"],\"SCHOOLDISTRICT\":[\"School District\"],\"RELIGIOUS_FACILITY\":[\"Religious Facility\"],\"DEPOSITS\":[\"Deposits\"],\"ADDDEPOSITS\":[\"Add Deposits\"],\"DEPOSITTYPE\":[\"Deposit Type\"],\"SECURITY_DEPOSIT\":[\"Security Deposit\"],\"PET_DEPOSIT\":[\"Pet Deposit\"],\"KEY_DEPOSIT\":[\"Key Deposit\"],\"CLEANING_DEPOSIT\":[\"Cleaning Deposit\"],\"MATCHINGADDRESSES\":[\"Matching Addresses\"],\"MATCHINGPROPERTIES\":[\"Matching Properties\"],\"MONDAY\":[\"Monday\"],\"TUESDAY\":[\"Tuesday\"],\"WEDNESDAY\":[\"Wednesday\"],\"THURSDAY\":[\"Thursday\"],\"FRIDAY\":[\"Friday\"],\"SATURDAY\":[\"Saturday\"],\"SUNDAY\":[\"Sunday\"],\"TOMORROW\":[\"Tomorrow\"],\"TODAY\":[\"Today\"],\"COMING\":[\"Coming\"],\"SELLING\":[\"Selling \"],\"REALTORS\":[\"Realtors / Brokers\"],\"PROPERTY_MANAGEMENT\":[\"Property Management\"],\"FORECLOSURE\":[\"Foreclosure\"],\"LOTAREAUOM\":[\"Unit\"],\"LAUNDRYROOM\":[\"Laundry Room\"],\"LIBRARY\":[\"Library\"],\"MEDIAROOM\":[\"Media Room\"],\"MOTHERINLAW\":[\"Mother In Law\"],\"RECREATIONALROOM\":[\"Recreational Room\"],\"SITTINGROOM\":[\"Sitting Room\"],\"STORAGE\":[\"Storage\"],\"UTILITY\":[\"Utility\"],\"WALKINCLOSET\":[\"Walkin Closet\"],\"WETBAR\":[\"Wet Bar\"],\"ATRIUM\":[\"Atrium\"],\"ATTIC\":[\"Attic\"],\"DEN\":[\"Den\"],\"FAMILYROOM\":[\"Family Room\"],\"FIREPLACE\":[\"Fire Place\"],\"FOYER\":[\"Foyer\"],\"GREENHOUSE\":[\"Green House\"],\"GUESTROOM\":[\"Guest Room\"],\"NORTH\":[\"North\"],\"SOUTH\":[\"South\"],\"EAST\":[\"East\"],\"WEST\":[\"West\"],\"NORTHEAST\":[\"North East\"],\"NORTHWEST\":[\"North West\"],\"SOUTHEAST\":[\"South East\"],\"SOUTHWEST\":[\"South West\"],\"PARKINGTYPES\":[\"Parking Types\"],\"ADDPARKINGTYPES\":[\"Add Parking Types\"],\"LEASEPRICEUOM\":[\"Unit\"],\"CHARACTERS\":[\"Characters\"],\"FLOORNUMBER\":[\"Floor Number\"],\"FACINGDIRECTION\":[\"Facing Direction\"],\"LESS\":[\"Less\"],\"MORE\":[\"More\"],\"TIME_SHARE\":[\"Time Share\"],\"CABIN\":[\"Cabin\"],\"MLSNUMBER\":[\"MLS Number\"],\"MLSID\":[\"MLS\"],\"MLSLISTINGURL\":[\"Listing Source Link\"],\"MLSPROPERTYTYPE\":[\"Category (from Source)\"],\"MLSPROPERTYSUBTYPE\":[\"Property Type (from Source)\"],\"MLSINFORMATION\":[\"MLS Information\"],\"LISTINGAREAUOM\":[\"Unit\"],\"YOURADHERE\":[\"Your Advertisement Here\"],\"LOCATIONDIRECTION\":[\"Directions\"],\"ACRE\":[\"Acres\"],\"MAXIMIZE\":[\"Maximize\"],\"INCOME\":[\"Income\"],\"SELECTALL\":[\"Select All\"],\"NAMEUNDISCLOSED\":[\"Undisclosed Property Name\"],\"ADDRESSUNDISCLOSED\":[\"Undisclosed Address\"],\"PRICEUNDISCLOSED\":[\"Undisclosed Price\"],\"UNDISCLOSED\":[\"Undisclosed\"],\"LIKES\":[\"Likes\"],\"FLOORPLAN\":[\"Floor Plans and Surveys\"],\"COMMERCIAL_PROPERTIES\":[\"Commercial Properties\"],\"RESIDENTIAL_INVESTMENTS\":[\"Residential Investments\"],\"ROOM\":[\"Room Information\"],\"ROLE\":[\"Role\"],\"LEGALDESCRIPTION\":[\"Description\"],\"DISCLAIMER\":[\"Disclaimer\"],\"LIVINGAREA\":[\"Living Area\"],\"LIVINGROOM\":[\"Living Room\"],\"STUDY\":[\"Study\"],\"KITCHEN\":[\"Kitchen\"],\"DININGROOM\":[\"Dining Room\"],\"PATIO\":[\"Patio\"],\"PORCH\":[\"Porch\"],\"DECK\":[\"Deck\"],\"GARAGE\":[\"Garage\"],\"WORKSHOP\":[\"Workshop\"],\"BASEMENT\":[\"Basement\"],\"BEDROOM\":[\"Bedroom\"],\"BATHROOM\":[\"Bathroom\"],\"FULLBATHROOM\":[\"Full Bathroom\"],\"HALFBATHROOM\":[\"Half Bathroom\"],\"QUARTERBATHROOM\":[\"Quarter Bathroom\"],\"THREEQUARTERBATHROOM\":[\"Three Quarter Bathroom\"],\"BARBEQUEAREA\":[\"Barbeque Area\"],\"DISABLEDACCESS\":[\"Disabled Access\"],\"LAWNAREA\":[\"Lawn Area\"],\"WIREDFORAUTOMATION\":[\"Wired for Automation\"],\"DRAFT\":[\"Draft\"],\"PENDING_APPROVAL\":[\"Pending Content Moderation\"],\"PENDING_CONTENT_APPROVAL\":[\"Pending Content Approval\"],\"ACTIVE\":[\"Active\"],\"REJECTED\":[\"Rejected\"],\"EXPIRED\":[\"Expired\"],\"CLOSED\":[\"Off Market\"],\"PENDING_SALE_CLOSURE\":[\"Pending sale closure\"],\"CLICKTOVIEWPROFILE\":[\"Click Here to View Profile\"],\"CHOOSEONMAP\":[\"Choose on Map\"],\"CLOSEMAP\":[\"Close Map\"],\"HOMEFORSALESEARCHHEADER\":[\"Find Residential Investments for Sale\"],\"FORLEASESEARCHHEADER\":[\"Find Properties for Lease\"],\"PROFESSIONALSEARCHHEADER\":[\"Find Service Providers or Professionals\"],\"REALTORSEARCHHEADER\":[\"Find Preferred Realtors / Brokers\"],\"HIGHESTCAPRATE\":[\"Cap Rate Estimate (High to Low)\"],\"HIGHESTCASHONCASH\":[\"Cash on Cash Estimate (High to Low)\"],\"LOWESTCAPRATE\":[\"Cap Rate Estimate (Low to High)\"],\"CAPRATERANGE\":[\"Cap Rate Estimate (%)\"],\"INVESTEMENTCATEGORIES\":[\"Investment Categories\"],\"PREFERREDLOCATION\":[\"Preferred Location\"],\"PREFERREDLOCATIONS\":[\"Preferred Location(s)\"],\"MINIMUM\":[\"Minimum\"],\"MAXIMUM\":[\"Maximum\"],\"CORE\":[\"Core\"],\"COREPLUS\":[\"Core Plus\"],\"DEVELOPMENTOPPORTUNITY\":[\"Development Opportunity\"],\"CAPITALCONSTRAINTS\":[\"Capital Constraints\"],\"ENVIRONMENTPROBLEMS\":[\"Environment Problems\"],\"MANAGEMENTPROBLEMS\":[\"Management Problems\"],\"NEEDSSTRUCTURIALIMPROVEMENTS\":[\"Needs Structural Improvements\"],\"NEEDSINETRIORIMPROVEMENTS\":[\"Needs Interior Improvements\"],\"OPERATIONALPROBLEMS\":[\"Operational Problems\"],\"OTHERVALUEADDED\":[\"Other Value Add\"],\"RISKRETURNCATEGORY\":[\"Investment Category\"],\"VALUEADDEDREASON\":[\"Reason\"],\"ALLBILLSPAID\":[\"All Bills Paid\"],\"METEREDUNITS\":[\"Separately Metered Units\"],\"SOMEBILLSPAID\":[\"Some Bills Paid\"],\"MULTIFAMILYHOUSINGTYPE\":[\"Utility Bills\"],\"PAIDUTILITIES\":[\"Paid Utilities\"],\"CURRENTRENT\":[\"Current Rent\"],\"SECURITYDEPOSIT\":[\"Security Deposit\"],\"NUMBEROFUNITS\":[\"Number of Units\"],\"ADD\":[\"Add\"],\"DEMOGRAPHICS\":[\"Demographics\"],\"WIDGETFMRDATA\":[\"Fair Market Rents\"],\"WIDGETHOUSING\":[\"Housing Occupancy Rates\"],\"WIDGETMEDIANINCOME\":[\"Income Growth\"],\"WIDGETOCCUPATION\":[\"Population by Occupation\"],\"WIDGETINCOMESLAB\":[\"Current Income Slabs\"],\"WIDGETTRANSPORTATION\":[\"Commute to Work\"],\"WIDGETVIOLENTCRIME\":[\"Violent Crime Rates\"],\"WIDGETPROPERTYCRIME\":[\"Property Crime Rates\"],\"WIDGETEMPLOYMENTGROWTH\":[\"Employment Rates\"],\"WIDGETETHNICITY\":[\"Population by Ethnicity\"],\"WIDGETPOPULATIONGROWTH\":[\"Population Growth\"],\"WIDGETPROPERTYTAX\":[\"Property Taxes Paid\"],\"WIDGETSCHOOL\":[\"Schools\"],\"WIDGETDISASTERDATA\":[\"Recent Federal Emergencies\"],\"SOURCE\":[\"Source\"],\"WIDGETFMRFOOTER\":[\"US Department of Housing and Urban Development\"],\"WIDGETCENSUSFOOTER\":[\"US Census Bureau\"],\"WIDGETSCHOOLFOOTER\":[\"US Department of Education\"],\"WIDGETCRIMEFOOTER\":[\"Federal Bureau of Investigation\"],\"WIDGETDISASTERDATAFOOTER\":[\"Federal Emergency Management Agency\"],\"TOTALPOPULATION\":[\"Total Population\"],\"MEDIANAGE\":[\"Median Age\"],\"WHITE\":[\"White\"],\"BLACK\":[\"Black\"],\"ASIAN\":[\"Asian\"],\"AMERICAN\":[\"American Indian\"],\"HISPANICPERCENTAGE\":[\"Hispanic Population\"],\"EMPTY\":[\"Other\"],\"OTHER\":[\"Other\"],\"MALEFEMALERATIO\":[\"Male / Female Ratio\"],\"FAIRMARKETRENT\":[\"Fair Market Rent\"],\"FMRDATAXAXIS\":[\"Year\"],\"FMRDATAYAXIS\":[\"Market Rent\"],\"EFFICIENTAPARTMENTPRICE\":[\"Efficiency\"],\"ONEBHKAPARTMENTPRICE\":[\"Single Bedroom\"],\"THREEBHKAPARTMENTPRICE\":[\"Three Bedroom\"],\"FOURBHKAPARTMENTPRICE\":[\"Four Bedroom\"],\"UNKNOWN\":[\"Unknown\"],\"TOTALUNITS\":[\"Total Number of Units\"],\"OCCUPIEDUNIT\":[\"Occupied Units\"],\"RENTEDUNIT\":[\"Rental Unit\"],\"OCCUPIEDRENTEDUNITXAXIS\":[\"Year\"],\"OCCUPIEDRENTEDUNITYAXIS\":[\"Percentage of Units\"],\"POPULATIONGROWTHYAXIS\":[\"Population\"],\"POPULATIONGROWTH\":[\"Total Population\"],\"POPULATIONGROWTHXAXIS\":[\"Year\"],\"EMPLOYEMENTGROWTHYAXIS\":[\"Employed Population Percentage\"],\"EMPLOYEMENTGROWTH\":[\"Employed Population\"],\"EMPLOYEMENTGROWTHXAXIS\":[\"Year\"],\"OTHEROCCUPATION\":[\"Other Occupation\"],\"EMPLOYEDPERCENTAGE\":[\"Employed Population\"],\"MEDIANPROPERTYTAX\":[\"Median Property Tax\"],\"MEDIANPROPERTYTAXYAXIS\":[\"Year\"],\"MEDIANPROPERTYTAXXAXIS\":[\"Property Taxes Paid\"],\"MEDIANINCOME\":[\"Median Income\"],\"MEDIANINCOMEXAXIS\":[\"Year\"],\"MEDIANINCOMEYAXIS\":[\"Income\"],\"MANAGEMENTOCCUPATION\":[\"Management\"],\"SERVICEOCCUPATION\":[\"Service\"],\"SALESOCCUPATION\":[\"Sales\"],\"CONSTRUCTIONOCCUPATION\":[\"Construction\"],\"PRODUCTIONOCCUPATION\":[\"Production\"],\"INCOMESLAB\":[\"Total Population\"],\"INCOMESLABXAXIS\":[\"Income Slab\"],\"INCOMESLABYAXIS\":[\"Population Percentage\"],\"BELOWFIFTEENTHOUSANDINCOME\":[\"< 15K\"],\"FIFTEENTOTHIRTYTHOUSANDINCOME\":[\"15K - 30K\"],\"THIRTYTOFIFTYTHOUSANDINCOME\":[\"30K - 50K\"],\"FIFTYTOSEVENTYFIVEHOUSANDINCOME\":[\"50K - 75K\"],\"SEVENTYFIVETOHUNDREDTHOUSANDINCOME\":[\"75K - 100K\"],\"HUNDREDTOONEFIFTYTHOUSANDINCOME\":[\"100K - 150K\"],\"ONEFIFTYABOVETHOUSANDINCOME\":[\"> 150K\"],\"TRANSPORTATIONMEANS\":[\"Means of Transportation\"],\"TRANSPORTATIONMEANSXAXIS\":[\"Percentage of Population\"],\"TRANSPORTATIONMEANSYAXIS\":[\"Transportation Option\"],\"PEOPLEDROVEALONE\":[\"Drove Alone\"],\"PEOPLECARPOOLED\":[\"Car Pooled\"],\"PEOPLEUSEDPUBLICTRANSPORTATION\":[\"Public Transportation\"],\"PEOPLEUSEDBICYCLEORWALKED\":[\"Bicycled or Walked\"],\"PEOPLEUSEDOTHERTRANSPORTATION\":[\"Other Transportation\"],\"PEOPLEWORKEDATHOME\":[\"Worked at Home\"],\"SCHOOLNAME\":[\"School Name\"],\"LOWESTGRADE\":[\"Lowest Grade\"],\"HIGHESTGRADE\":[\"Highest Grade\"],\"SCHOOLTYPE\":[\"School Type\"],\"VIOLENTCRIMEDATA\":[\"Violent Crime Rate\"],\"VIOLENTCRIMEDATAXAXIS\":[\"Year\"],\"VIOLENTCRIMEDATAYAXIS\":[\"Crime Rate (per 100000 population)\"],\"PROPERTYCRIMEDATA\":[\"Property Crime Rate\"],\"PROPERTYCRIMEDATAXAXIS\":[\"Year\"],\"PROPERTYCRIMEDATAYAXIS\":[\"Crime Rate (per 100,000 population)\"],\"INCIDENTTITLE\":[\"Incident\"],\"INCIDENTTYPE\":[\"Incident Type\"],\"IHPROGRAMDECLARED\":[\"Interim Housing\"],\"IAPROGRAMDECLARED\":[\"Individual Assistance\"],\"PAPROGRAMDECLARED\":[\"Public Assistance\"],\"HMPROGRAMDECLARED\":[\"Hazard Mitigation\"],\"INCIDENTBEGINDATE\":[\"Incident Date\"],\"TAGNAME\":[\"Photo Label\"],\"RENAMEFILE\":[\"Rename your Document\"],\"FILENAME\":[\"Document Name\"],\"VIDEOTITLE\":[\"Video Title\"],\"VIDEOURL\":[\"Video URL\"],\"CLOSE\":[\"Close\"],\"MINIMIZE\":[\"Minimize\"],\"COMMENTS\":[\"Comments\"],\"FEEDBACKCONTENTMESSAGE\":[\"Type your message here...\"],\"SITEFEEDBACKHEADER\":[\"Send Site Feedback\"],\"SENDSITEFEEDBACK\":[\"Contact Us\"],\"READMORE\":[\"Read More...\"],\"SEARCHBYPROPERTY\":[\"Find Property\"],\"SEARCHBYREALTOR\":[\"Find Realtor / Broker\"],\"QUESTION\":[\"Q & A\"],\"OFFLINE\":[\"Offline\"],\"SAVING\":[\"Saving...\"],\"YEARS\":[\"Years\"],\"MONTHS\":[\"Months\"],\"WEEKS\":[\"Weeks\"],\"DAYS\":[\"Day(s)\"],\"INVESTMENTCATEGORIES\":[\"Investment Categories\"],\"DEPOSITSDETAILS\":[\"Deposits\"],\"SHOWVACATIONRENTALS\":[\"Show Short-term Rentals ?\"],\"LEASECATEGORY\":[\"Lease Category\"],\"SUBLETALLOWED\":[\"Sub Let Allowed ?\"],\"ADDEXPENSESBYTENANT\":[\"Add an Expense paid by Tenant\"],\"EXPENSESBYLANDLORD\":[\"Expenses paid by Landlord\"],\"EXPENSESBYTENANT\":[\"Expenses paid by Tenant\"],\"ADDEXPENSESBYLANDLORD\":[\"Add an Expense paid by Landlord\"],\"MASTERLEASE\":[\"Master Lease\"],\"SUBLEASE\":[\"Sub Lease\"],\"TYPING\":[\"%s is typing?\"],\"NEWMESSAGES\":[\"new message(s)\"],\"DEFAULTCHATMESSAGE\":[\"Type your message here...\"],\"MOREACTIONS\":[\"More Actions\"],\"ACTIONS\":[\"Actions\"],\"THUMBNAIL\":[\"Photo\"],\"LEFT\":[\"Left\"],\"RIGHT\":[\"Right\"],\"ROTATE\":[\"Rotate\"],\"ZOOM\":[\"Zoom\"],\"RSVP\":[\"RSVP\"],\"SEEALL\":[\"See All\"],\"EXISTING\":[\"Existing\"],\"NEW\":[\"New\"],\"NEWLYRENOVATED\":[\"Newly Renovated\"],\"UNDERCONSTRUCTION\":[\"Under Construction\"],\"PROPOSED\":[\"Proposed\"],\"ARCHITECT\":[\"Architect\"],\"HOMETELEPHONE\":[\"Home Telephone\"],\"OFFICETELEPHONE\":[\"Office Telephone\"],\"MOBILE\":[\"Mobile\"],\"AUCTION\":[\"Auction\"],\"BANKOWNED\":[\"Bank Owned\"],\"ELECTRICITYBACKUP\":[\"Electricity Backup\"],\"BYBUILDER\":[\"By Builder\"],\"BYOWNER\":[\"By Owner\"],\"BYAGENT\":[\"By Agent\"],\"BYBANK\":[\"By Bank\"],\"NEWCONSTRUCTION\":[\"New Construction\"],\"FORSALE\":[\"For Sale\"],\"FORLEASE\":[\"For Lease\"],\"FORAUCTION\":[\"For Auction\"],\"LAND\":[\"Land\"],\"RESIDENTIAL\":[\"All residential\"],\"TWIN_HOME\":[\"Twin Home\"],\"LOFT_STYLE\":[\"Loft Styled Apartment\"],\"GARDEN_HOME_SINGLE_UNIT\":[\"Garden Home\"],\"GARDEN_HOME_1_4_UNITS\":[\"Garden Home 1 to 4 Units\"],\"CONDO_SINGLE_UNIT\":[\"Condo\"],\"CONDO_1_4_UNITS\":[\"Condo 1 to 4 Units\"],\"TOWNHOME_1_4_UNITS\":[\"Town Home 1 to 4 Units\"],\"OTHER_RESIDENTIAL\":[\"Other Residential\"],\"TRIPLEX\":[\"Triplex\"],\"QUADRUPLEX\":[\"Quadruplex\"],\"MOBILE_HOME\":[\"Mobile Home\"],\"DUPLEX\":[\"Duplex\"],\"DUPLEX_SINGLE_UNIT\":[\"Duplex\"],\"TOWNHOME_SINGLE_UNIT\":[\"Townhome\"],\"DUPLEX_2_UNITS\":[\"Duplex 2 Units\"],\"SINGLE_FAMILY_HOME_PORTFOLIO\":[\"Single Family Home - Portfolio\"],\"TOWNHOME\":[\"Town Home\"],\"GARDEN_HOME\":[\"Garden Home\"],\"CONGREGATE_HOUSING\":[\"Congregate Housing\"],\"ASSISTEDLIVING\":[\"Assisted Living\"],\"SINGLE_FAMILY_HOME\":[\"Single Family Home\"],\"TOWN_HOUSE\":[\"Town House\"],\"GARDEN_LOW_RISE\":[\"Garden Low Rise\"],\"INDEPENDENT_HOUSE\":[\"Single Family Home\"],\"MULTI_FAMILY_APARTMENT\":[\"Multi-Family Apartments\"],\"RESIDENTIAL_APARTMENT\":[\"Residential Apartment\"],\"APARTMENT\":[\"Apartments\"],\"ROW_HOUSE\":[\"Town House\"],\"PG_ACCOMMODATION\":[\"Limited Service Hotel\"],\"HOTEL_AND_LODGING\":[\"Hotel\"],\"SERVICED_APARTMENT\":[\"Residential Suites\"],\"CONDO\":[\"Condominium\"],\"RESTAURANT\":[\"Restaurant\"],\"PETROL_BUNK\":[\"Gas Station\"],\"ENTERTAINMENT\":[\"Entertainment\"],\"THEATRE\":[\"Theatre\"],\"CAFE\":[\"Cafe\"],\"BAR\":[\"Bar\"],\"ELECTRICITY\":[\"Electricity\"],\"TELEPHONE\":[\"Telephone\"],\"WATER\":[\"City Water\"],\"GAS\":[\"Gas\"],\"CABLE\":[\"Cable\"],\"INTERNET\":[\"Internet\"],\"WIFI\":[\"Wifi\"],\"POWERBACKUP\":[\"Power Backup\"],\"CLIMATECONTROL\":[\"Climate Control\"],\"AIRCONDITION\":[\"Air Condition\"],\"ELEVATORS\":[\"Elevators\"],\"WASTEDISPOSAL\":[\"Waste Disposal\"],\"VIDEOSURVEILLANCE\":[\"Video Surveillance\"],\"CAFETERIA\":[\"Cafeteria\"],\"SECURITY\":[\"Security\"],\"GYM\":[\"Gym\"],\"CLUBHOUSE\":[\"Club House\"],\"CHILDCARE\":[\"Child Care\"],\"RECREATIONAREA\":[\"Recreation Area\"],\"CONFERENCEROOM\":[\"Conference Room\"],\"MAINTENANCESTAFF\":[\"Maintenance Staff\"],\"SMOKINGZONE\":[\"Smoking Zone\"],\"QUICKSEARCH\":[\"Quick Search\"],\"NAME\":[\"Name\"],\"OTP\":[\"Security Code\"],\"SENDOTP\":[\"Send\"],\"RESENDOTP\":[\"Re Send\"],\"HOME\":[\"Home\"],\"SUMMARY\":[\"Summary\"],\"MYSEARCHES\":[\"My Searches\"],\"FILTERS\":[\"Filters\"],\"SHOW\":[\"Show\"],\"SAVEASDRAFT\":[\"Save as Draft\"],\"MAP\":[\"Map View\"],\"SAVE\":[\"Save\"],\"SUBMIT\":[\"Submit\"],\"FIND\":[\"Find\"],\"CLEAR\":[\"Clear\"],\"HIDE\":[\"Hide\"],\"RADIUS\":[\"Radius\"],\"CLEARALL\":[\"Clear All\"],\"SORT\":[\"Sort\"],\"VIEWONMAP\":[\"View on Map\"],\"ADDRESS\":[\"Address\"],\"PROPERTYNAME\":[\"Property Name\"],\"PROPERTYTYPE\":[\"Category\"],\"PROPERTYSUBTYPE\":[\"Property Type\"],\"AREA\":[\"Square Footage\"],\"LOTAREA\":[\"Lot Area\"],\"PROPERTYDESCRIPTION\":[\"Property Description\"],\"HIGHLIGHTS\":[\"Highlights\"],\"CANCEL\":[\"Cancel\"],\"OK\":[\"OK\"],\"PHOTOS\":[\"Photos\"],\"ADDITIONALDOCUMENTS\":[\"Documents\"],\"ADDVIDEOLINKS\":[\"Videos\"],\"PROPERTYLISTINGTYPE\":[\"Listing Type\"],\"ADDITIONALDETAILS\":[\"Additional Information\"],\"FINANCIALINFORMATION\":[\"Overview\"],\"FINANCIALS\":[\"Financials\"],\"PRICERANGE\":[\"Price\"],\"AREARANGE\":[\"Area (Sq Ft)\"],\"MYPROFILE\":[\"My Profile\"],\"MOBILENUMBER\":[\"Mobile Number\"],\"MYCOMPANY\":[\"My Company\"],\"MYLISTINGS\":[\"My Listings\"],\"ABOUTUS\":[\"About Us\"],\"CONTACTUS\":[\"Contact Us\"],\"FAQ\":[\"FAQ\"],\"TITLE\":[\"Listing Title\"],\"PROPERTYLISTINGSALETYPE\":[\"Posted By\"],\"ENDDATE\":[\"Listing Expiry Date\"],\"STATUS\":[\"Status\"],\"DISTRESSED\":[\"Distressed ?\"],\"DISTRESSEDSTATUS\":[\"Distressed Status\"],\"SALEPRICE\":[\"Financial Information\"],\"LEASEPRICE\":[\"Lease Information\"],\"BIDPRICE\":[\"Bid Price\"],\"BIDSTARTPRICE\":[\"Bid Start Price\"],\"DEPOSITAMOUNT\":[\"Security Deposit\"],\"DAYSFORFULLPAYMENT\":[\"Days For Full Payment\"],\"BIDSTARTDATE\":[\"Bid Start Date\"],\"BIDENDDATE\":[\"Bid End Date\"],\"COMMISSIONSPLIT\":[\"Buyer Agent Commission\"],\"COMMISSIONPERCENTAGE\":[\"Commission Percentage\"],\"COMMISSIONAMOUNT\":[\"Commission Charges\"],\"PERSQUAREFEET\":[\"Per Sq Ft\"],\"BASERATEPERSQUAREFEET\":[\"Base Rate Per Sq Ft\"],\"RATEPERSQUAREFEET\":[\"Rate Per Sq Ft\"],\"DISCLOSEADDRESS\":[\"Disclose Address?\"],\"DISCLOSEPRICE\":[\"Disclose Price?\"],\"PRICE\":[\"Price\"],\"DESPOSITAMOUNT\":[\"Deposit\"],\"LEASEPERIOD\":[\"Lease Period in Years\"],\"LEASETERM\":[\"Lease Term\"],\"LEASETERMUOM\":[\"Unit\"],\"SALETYPE\":[\"Posted By\"],\"CAPRATEKNOWN\":[\"Calculate Cap Rate Estimate?\"],\"CAPRATETYPE\":[\"Financial Type\"],\"ACTUAL\":[\"Actual\"],\"PROFORMA\":[\"Pro-Forma\"],\"GROSSRENTREVENUE\":[\"Annual Income\"],\"VACANCYLOSSES\":[\"Vacancy Losses\"],\"OTHEREXPENSES\":[\"Other Expenses\"],\"CALCULATEANDAPPLY\":[\"Apply\"],\"CALCULATENETOPERATINGINCOME\":[\"Calculate\"],\"NETOPERATINGINCOME\":[\"Net Operating Income\"],\"CALCULATEDCAPRATE\":[\"Cap Rate Estimate\"],\"CAPRATE\":[\"Cap Rate Estimate\"],\"CASHONCASHRETURNPERCENTAGEYEARONE\":[\"Cash on Cash Estimate (Yr 1)\"],\"DELETE\":[\"Remove\"],\"IMAGEURLS\":[\"Photos\"],\"PRIMARYIDENTIFIER\":[\"APN or Parcel ID\"],\"TOTALAREA\":[\"Total Area\"],\"DESCRIPTION\":[\"Description\"],\"AMENITIES\":[\"Amenities\"],\"UTILITIES\":[\"Utilities Available at Site\"],\"CONDITIONS\":[\"Conditions\"],\"LINEONE\":[\"Street Address\"],\"LINETWO\":[\"Unit Number\"],\"REGION\":[\"County\"],\"LOCALITY\":[\"Neighborhood\"],\"CITY\":[\"City\"],\"STATE\":[\"State\"],\"ZIPCODE\":[\"Zip Code\"],\"COUNTRY\":[\"Country\"],\"CURRENCY\":[\"Currency\"],\"COMPANYNAME\":[\"Company Name\"],\"CONTACTNUMBERS\":[\"Contact Numbers\"],\"WEBSITE\":[\"Website\"],\"WEBSITES\":[\"Websites\"],\"COMPANYTYPE\":[\"Company Type\"],\"SAVEDSEARCHPREFERENCES\":[\"Match Notification Preferences\"],\"CONTACTPREFERENCES\":[\"Contact Preferences\"],\"CONTENTPREFERENCES\":[\"New Content Notification Preferences\"],\"AREASSERVED\":[\"Areas Served\"],\"SPECIALTIES\":[\"Specialties\"],\"ABOUT\":[\"About\"],\"YEAROFINCEPTION\":[\"Year Of Inception\"],\"MINDIVISIBLEAREA\":[\"Minimum Divisible Interior Area\"],\"MAXDIVISIBLEAREA\":[\"Maximum Divisible Interior Area\"],\"MAXCONTIGUOUSAREA\":[\"Maximum Contiguous Interior Area\"],\"YEARBUILT\":[\"Year Built\"],\"NUMBEROFROOMS\":[\"Number Of Rooms\"],\"CONSTRUCTIONSTATUS\":[\"Construction Status\"],\"LEASEAMOUNT\":[\"Lease Amount\"],\"EXPENSEAMOUNT\":[\"Expenses\"],\"EXPENSETYPE\":[\"Expense Type\"],\"LEASEENDDATE\":[\"Lease End Date\"],\"ROOMTYPE\":[\"Room Type\"],\"NUMBEROFWASHROOMS\":[\"Bathrooms\"],\"FURNISHEDSTATUS\":[\"Furnished ?\"],\"UNFURNISHED\":[\"Not Furnished\"],\"SEMI_FURNISHED\":[\"Semi Furnished\"],\"FURNISHED\":[\"Furnished\"],\"DISTANCE\":[\"Search Radius\"],\"BUILDINGAGE\":[\"Building Age (Years)\"],\"POSTEDBY\":[\"Posted By\"],\"PROPERTIESFOUND\":[\"Properties Found\"],\"BYRELAVANCE\":[\"By Relevance\"],\"HIGHESTAREA\":[\"Square Footage (High to Low)\"],\"LOWESTAREA\":[\"Square Footage (Low to High)\"],\"HIGHESTPRICE\":[\"Price (High to Low)\"],\"LOWESTPRICE\":[\"Price (Low to High)\"],\"GRID\":[\"Grid\"],\"CHAT\":[\"Chat\"],\"EMAIL\":[\"Email\"],\"SHARE\":[\"Share\"],\"LOGIN\":[\"Login\"],\"FEATUREDREALTORS\":[\"Featured Realtors\"],\"FEATUREDPROPERTIES\":[\"Featured Properties\"],\"LOCATION\":[\"Location\"],\"INTERACTIVEMAP\":[\"Interactive Map\"],\"MOREDETAILS\":[\"More Details\"],\"RESIDENTIAL_LAND\":[\"Residential Land\"],\"VILLA\":[\"Condominium\"],\"STORE\":[\"Store\"],\"LAUNDRY\":[\"Laundry\"],\"SCHOOL\":[\"School\"],\"SPA\":[\"Spa\"],\"CATEGORIES\":[\"Categories\"],\"CATEGORY\":[\"Category\"],\"FIXTURES\":[\"Fixtures\"],\"CLICKTOSEE\":[\"Click to See Nearby Places\"],\"INTERCOM\":[\"Intercom\"],\"VIDEOCONFERENCE\":[\"Video Conference\"],\"LAN\":[\"Local Area Network\"],\"ENTRYSECURITY\":[\"Entry Security\"],\"BIOMETRICACCESS\":[\"Biometric Access\"],\"CHILDRENPLAYAREA\":[\"Children Play Area\"],\"GARDENAREA\":[\"Garden Area\"],\"SWIMMINGPOOL\":[\"Pool\"],\"JOGGINGTRACK\":[\"Jogging Track\"],\"INDOORSPORTS\":[\"Indoor Sports\"],\"OUTDOORSPORTS\":[\"Outdoor Sports\"],\"DEPARTMENTSTORE\":[\"Department Store\"],\"DETAILS\":[\"Details\"],\"FEATURES\":[\"Amenities\"],\"SPECIFICATIONS\":[\"Features\"],\"FORLEASEDETAILS\":[\"Lease Information\"],\"FORSALEDETAILS\":[\"Sale Information\"],\"PRICEDETAILS\":[\"Price Details\"],\"BUILDINGROOMDETAILS\":[\"Room Details\"],\"ROOMS\":[\"Rooms\"],\"AIRPORT\":[\"Airport\"],\"HOSPITAL\":[\"Hospital\"],\"BUSSTATION\":[\"Bus Station\"],\"POLICE\":[\"Police Station\"],\"POSTOFFICE\":[\"Post Office\"],\"SUBWAYSTATION\":[\"Subway Station\"],\"TRAINSTATION\":[\"Train Station\"],\"SHOPPINGMALL\":[\"Shopping Mall\"],\"PARKING\":[\"Parking\"],\"ATM\":[\"ATM\"],\"LODGING\":[\"Lodging\"],\"REALESTATEAGENCY\":[\"Real Estate Agency\"],\"BANK\":[\"Bank\"],\"CREATELISTING\":[\"List a Property\"],\"PHOTOSVIDEOS\":[\"Photos and Documents\"],\"FINISH\":[\"Finish\"],\"SELECTEDBUILDINGUNITCOLLAPSIBLE\":[\"Unit Information\"],\"PROPERTYCOLLAPSIBLE\":[\"Property Information\"],\"SELECTEDLOTDETAILSCOLLAPSIBLE\":[\"Lot Information\"],\"SELECTEDBUILDINGCOLLAPSIBLE\":[\"Building Information\"],\"BUILDINGDETAILSCOLLAPSIBLE\":[\"Building Information\"],\"ADDITIONALPROPERTYDETAILSCOLLAPSIBLE\":[\"Additional Details\"],\"ROOMSCOLLAPSIBLE\":[\"Room Information\"],\"SECURITYSTAFF\":[\"Security Staff\"],\"MAINTENANCECHARGES\":[\"Monthly Maintenance Charges\"],\"RENTALAMOUNT\":[\"Lease Amount\"],\"COVEREDPARKING\":[\"Covered Parking\"],\"YES\":[\"Yes\"],\"NO\":[\"No\"],\"UNITTYPE\":[\"Unit Type\"],\"CONFIRM\":[\"Confirm\"],\"AVAILABLEDATE\":[\"Date Available\"],\"WELCOMETO\":[\"Welcome To\"],\"ADDNEW\":[\"Add New\"],\"LOCATEME\":[\"Use My Location\"],\"ENTERPREFEREDLOCATION\":[\"City, Zip Code, Neighborhood, Address\"],\"REGISTER\":[\"Sign Up\"],\"ACTIVELISTINGS\":[\"Recent Listings\"],\"CLEARSEARCH\":[\"Clear\"],\"SEARCHBYPROPERTYNAME\":[\"Property Name / Street Address\"],\"SEARCHBYREALTORNAME\":[\"Realtor / Broker Name\"],\"SEARCHBYPROFESSIONALNAME\":[\"Service Provider Name\"],\"SEARCH\":[\"Search\"],\"DOCUMENTSGALLERY\":[\"Uploaded Documents\"],\"PROPERTY\":[\"Property\"],\"UNIT\":[\"Unit\"],\"PROPSHUBREGISTRATION\":[\"2018 Propshub All rights reserved\"],\"CALLUS\":[\"Call Us\"],\"EMAILUS\":[\"Email Us\"],\"SIGNIN\":[\"Login\"],\"SETTINGS\":[\"Settings\"],\"BACKTO\":[\"Back to\"],\"POSTEDON\":[\"Posted On\"],\"LIST\":[\"List View\"],\"SAVESEARCH\":[\"Save Search\"],\"NEWLYLISTED\":[\"Most Recently Posted\"],\"NEXT\":[\"Next\"],\"ALL\":[\"All\"],\"IMAGES\":[\"Photos\"],\"BACKTOMAP\":[\"Previous Step\"],\"PREVIOUS\":[\"Previous\"],\"LOADINGDATA\":[\"Working...\"],\"GAS_STATION\":[\"Gas Station\"],\"GASSTATION\":[\"Gas Station\"],\"CITYLOCATION\":[\"City or Location\"],\"TONS\":[\"Tons\"],\"YRS\":[\"Yrs\"],\"MI\":[\"Mi\"],\"KM\":[\"Kilometers\"],\"PERCENTAGE\":[\"%\"],\"FT\":[\"Ft\"],\"AMOUNT\":[\"Amount\"],\"SQFT\":[\"Sq Ft\"],\"AGENT\":[\"Agent\"],\"HELP\":[\"Ask a Question\"],\"TYPE\":[\"Type\"],\"PROPERTYFORSALE\":[\"Properties for Sale\"],\"PROPERTYFORLEASE\":[\"All Properties For Rent\"],\"REALTORSANDBROKERS\":[\"Realtors\"],\"VACATIONRENTAL\":[\"Short-term Rental\"],\"REALTOR\":[\"Realtor\"],\"PROFESSIONAL\":[\"Service Providers\"],\"PHONE\":[\"Phone\"],\"CONTACTACTIONS\":[\"Contact Preferences\"],\"STARTTIME\":[\"Visiting Hour Start Time\"],\"ENDTIME\":[\"Visiting Hour End Time\"],\"ADDOPENHOUSETIME\":[\"Add Another Date\"],\"HOURS\":[\"Choose Time\"],\"OPENHOUSEDATE\":[\"Open House Date\"],\"SCHEDULEOPENHOUSE\":[\"Schedule Open House\"],\"OPENHOUSETIMES\":[\"Schedule Open House\"],\"INDIVIDUAL\":[\"Individual\"],\"COMPANY\":[\"Company\"],\"BROKERAGEFIRM\":[\"Brokerage Firm\"],\"SIMILARLISTINGS\":[\"Similar Properties\"],\"SIGNUPAS\":[\"Sign Up as\"],\"LOADMORE\":[\"Load More\"],\"SEND\":[\"Send\"],\"SENDEMAIL\":[\"Send Email\"],\"IN\":[\"India\"],\"US\":[\"USA\"],\"CA\":[\"Canada\"],\"AR\":[\"Argentina\"],\"CO\":[\"Colombia\"],\"BR\":[\"Brazil\"],\"MX\":[\"Mexico\"],\"USD\":[\"$\"],\"CAD\":[\"Canadian Dollar\"],\"MXN\":[\"Mexican Peso\"],\"BRL\":[\"Brazilian Real\"],\"ARS\":[\"Argentine Peso\"],\"COP\":[\"Colombian Peso\"],\"INR\":[\"Indian Rupees\"],\"CAPTION\":[\"Search for?\"],\"PROPERTYNULLRESULTSTITLE\":[\"No Properties Found. Please Try Again.\"],\"REALTORNULLRESULTSTITLE\":[\"No Realtors / Brokers Found. Please Try Again.\"],\"PROFESSIONALNULLRESULTSTITLE\":[\"No Service Providers Found. Please Try Again.\"],\"REALTORNULLRESULTSMESSAGE\":[\"Looks like there are no realtors / brokers available for your search criteria. Please broaden your search criteria or check back later.\"],\"PROFESSIONALNULLRESULTSMESSAGE\":[\"Looks like there are no service providers available for your search criteria. Please broaden your search criteria or check back later.\"],\"PROPERTYNULLRESULTSMESSAGE\":[\"Looks like there are no properties available for your search criteria. Please broaden your search criteria or check back later.\"],\"PROPERTYTOOMANYRESULTS\":[\"We found too many properties matching your search criteria. Please narrow your search criteria and try again.\"],\"PROFESSIONALTOOMANYRESULTS\":[\"We found too many service providers matching your search criteria. Please narrow your search criteria and try again.\"],\"BROKERAGEFIRMINFOCOLLAPSIBLE\":[\"Professional Summary\"],\"COMPANYINFOCOLLAPSIBLE\":[\"Professional Summary\"],\"PROFESSIONALSCOLLAPSIBLE\":[\"Associated Service Providers\"],\"REALTORSCOLLAPSIBLE\":[\"Associated Realtors / Brokers\"],\"ADDPROFESSIONAL\":[\"Add a Service Provider\"],\"ADDREALTOR\":[\"Add a Realtor / Broker\"],\"AUTHORIZEDPERSONNEL\":[\"I am authorized to update this Company Information\"],\"TERMSCONDITIONSTITLE\":[\"I have read and agree to the \"],\"LISTINGPENDINGTITLE\":[\"Your Listing is Pending Approval\"],\"LISTINGPENDINGDESCRIPTION\":[\"Congrats, your listing has been created successfully! Before publishing your listing, we will have to run the listing through our content moderation process. Typically, it takes 20 minutes or so. You will receive an email, once your listing is published online.\"],\"LISTINGPENDINGCONTENTTITLE\":[\"Your Listing is Pending Content Approval\"],\"LISTINGPENDINGCONTENTDESCRIPTION\":[\"Your listing is awaiting review by our content moderator before it can be published online. Typically, it takes 24 to 48 hours. You will receive an email, once your listing is published online.\"],\"LISTINGACTIVETITLE\":[\"Your Listing is Active\"],\"LISTINGACTIVEDESCRIPTION\":[\"You can Enrich your Listing at any time. Click on the Edit button below to modify your Listing\"],\"LISTINGCONFIRMATIONTITLE\":[\"Preview and confirm your Listing\"],\"LISTINGCONFIRMATIONDESCRIPTION\":[\"Please preview you listing before your confirm. Once you confirm, it will take a few minutes for your listing to get published online.\"],\"LISTINGREJECTEDTITLE\":[\"Your Listing is Rejected\"],\"LISTINGREJECTEDDESCRIPTION\":[\"You will need to edit your Listing to remove any objectionable content. Click on the Edit button below to modify your Listing\"],\"LISTINGCLOSEDTITLE\":[\"Your Property is Off Market\"],\"LISTINGCLOSEDDESCRIPTION\":[\"You can Enrich your Listing at any time. Click on the Edit button below to modify your Listing\"],\"BLOGPENDINGTITLE\":[\"Your Blog is Pending Approval\"],\"BLOGPENDINGDESCRIPTION\":[\"Congrats, your blog has been created successfully! Before publishing your blog, we will have to run the blog through our content moderation process. Typically, it takes 20 minutes or so. You will receive an email, once your blog is published online.\"],\"BLOGPENDINGCONTENTTITLE\":[\"Your Blog is Pending Content Approval\"],\"BLOGPENDINGCONTENTDESCRIPTION\":[\"Your blog is awaiting review by our content moderator before it can be published online. Typically, it takes 24 to 48 hours. You will receive an email, once your blog is published online.\"],\"BLOGDRAFTTITLE\":[\"Preview and publish your Blog\"],\"BLOGDRAFTDESCRIPTION\":[\"Please preview you blog before your publish. Once you publish, it will take a few minutes for your blog to get published online.\"],\"BLOGREJECTEDTITLE\":[\"Your Blog is Rejected\"],\"BLOGREJECTEDDESCRIPTION\":[\"You will need to edit your Blog to remove any objectionable content and then publish it.\"],\"BLOGCLOSEDTITLE\":[\"Your Blog is Offline\"],\"BLOGCLOSEDDESCRIPTION\":[\"You can enrich your Blog at any time. Click on the Edit button to modify your Blog\"],\"TAGEXISTS\":[\"Duplicate Tag\"],\"PROFANITYFOUND\":[\"We found the following inappropriate word(s) in your comments. Please fix it and resubmit your comments.\"],\"APPROVED\":[\"Approved\"],\"MANDATORYMESSAGE\":[\"Please ensure that you enter values for all the required fields highlighted below\"],\"LISTINGDRAFTMODE\":[\"This page is for your Preview only. It will not be visible to other users yet\"],\"PROPERTYEMAILMESSAGE\":[\"Type your message here...\"],\"PERSONEMAILMESSAGE\":[\"Type your message here...\"],\"RSVPEMAILMESSAGE\":[\"I would visit the property during Open House on %s\"],\"ENTERRSVPMESSAGE\":[\"Send an RSVP to %s\"],\"ENTEREMAILMESSAGE\":[\"Compose message to %s\"],\"RESIDENTIALSUBTYPEINVALID\":[\"Invalid Residential Property Sub Type\"],\"PROFESSIONINVALID\":[\"Profession is invalid\"],\"UPLOADING\":[\"Uploading...\"],\"UPLOADSUCCESS\":[\"Uploaded successfully...\"],\"MYPREFERENCES\":[\"My Preferences\"],\"MYCONTACTS\":[\"My Contacts\"],\"NOTIFICATIONS\":[\"My Notifications\"],\"REMOVE\":[\"Take Property Off Market\"],\"EDIT\":[\"Edit\"],\"VIEW\":[\"View\"],\"ENTERLOCATION\":[\"Enter Address / Neighborhood / City / Zip Code\"],\"PUBLISH\":[\"Publish\"],\"NUMBEROFBEDROOMS\":[\"Bedrooms\"],\"OFFLINEMESSAGE\":[\"%s is offline. Click here to send an Email\"],\"PROVIDESEARCHNAME\":[\"Provide a Name for your Search\"],\"PERCENTAGEOFCOMPLETION\":[\"Completion Status\"],\"FINANCIALCOMPLETIONGROUP\":[\"Financials\"],\"LISTINGCOMPLETIONGROUP\":[\"Listing Information\"],\"PROPERTYCOMPLETIONGROUP\":[\"Property Details\"],\"ADDITIONALCOMPLETIONGROUP\":[\"Additional Information\"],\"MISSINGFIELDS\":[\"Missing Fields\"],\"VIDEOSTABTITLE\":[\"Provide the URL for your Videos\"],\"TAGFILE\":[\"Label your Photo\"],\"SAVEEXIT\":[\"Save Draft & Exit\"],\"SENDINGEMAIL\":[\"Sending Email...\"],\"EMAILSENT\":[\"Email Sent\"],\"PRIVACYPOLICY\":[\"Privacy Policy\"],\"PROFILECOMPLETION\":[\"Enrich your profile\"],\"USERCOMPLETIONGROUP\":[\"Profile Details\"],\"REALTORSANDBROKERSSEARCHOPTIONINFO\":[\"Search for Realtors / Brokers\"],\"INCOME_SPECIALIST\":[\"Income Specialist\"],\"WELCOME\":[\"Welcome\"],\"LOGOUT\":[\"Logout\"],\"LEGAL\":[\"Legal\"],\"LOGINHEADING\":[\"Login / Sign Up\"],\"RESIDENTIAL_LENDING\":[\"Residential Lending\"],\"COMMERCIAL_LENDING\":[\"Commercial Lending\"],\"URBAN_PLANNING\":[\"Urban Planning / Civil Engineering\"],\"BACK_OFFICE_SPECIALIST\":[\"Back Office Specialist\"],\"OTHER_SPECIALTY\":[\"Other\"],\"COMMERCIAL_APPRAISER\":[\"Commercial Appraiser\"],\"GENERAL_APPRAISER\":[\"General Appraiser\"],\"RESIDENTIAL_APPRAISER\":[\"Residential Appraiser\"],\"PROPERTY_INSPECTOR\":[\"Property Inspector\"],\"PROPERTY_MANAGER\":[\"Property Manager\"],\"LICENSE\":[\"License\"],\"LICENSENUMBER\":[\"License Number\"],\"LICENSEJURISDICTION\":[\"License Jurisdiction\"],\"LICENSEISSUINGAUTHORITY\":[\"License Issuing Authority\"],\"APPRENTICEINSPECTOR\":[\"Apprentice Inspector\"],\"AUCTIONEER\":[\"Auctioneer\"],\"CERTIFIEDGENERALAPPRAISER\":[\"Certified General Appraiser\"],\"CERTIFIEDRESIDENTIALAPPRAISER\":[\"Certified Residential Appraiser\"],\"LEASING_AGENT\":[\"Leasing Agent\"],\"LICENSEDAPPRAISER\":[\"Licensed Appraiser\"],\"LICENSEDINSPECTOR\":[\"Licensed Inspector\"],\"MORTGAGE_BROKER\":[\"Mortgage Broker\"],\"REALESTATEBROKER\":[\"Real Estate Broker\"],\"REGISTEREDAPPRAISER\":[\"Registered Appraiser\"],\"REGISTEREDINSPECTOR\":[\"Registered Inspector\"],\"PROPERTYMANAGEMENT\":[\"Property Management\"],\"RENTALPROPERTYMANAGEMENT\":[\"Rental Property Management\"],\"SALESPERSON\":[\"Salesperson\"],\"APPRAISAL\":[\"Appraisal\"],\"INDUSTRIAL\":[\"Industrial\"],\"FARM_AND_LAND\":[\"Farm and Land\"],\"LAND_DEVELOPMENT\":[\"Land Development\"],\"SECURITIESANDSYNDICATION\":[\"Securities and Syndication\"],\"COUNSELING\":[\"Counseling\"],\"RESEARCH\":[\"Research\"],\"SITEURL\":[\"Site URL\"],\"TWITTERHANDLE\":[\"Twitter Handle\"],\"FACEBOOK\":[\"Facebook URL\"],\"BLOG\":[\"Blog URL\"],\"LINKEDIN\":[\"LinkedIn URL\"],\"EMAILID\":[\"Email\"],\"PASSWORD\":[\"Password\"],\"FORGOTPASSWORD\":[\"Forgot Password ?\"],\"SIGNUP\":[\"Sign Up\"],\"REMEMBERME\":[\"Remember Me\"],\"PROPERTYIMAGEMISSING\":[\"No Photos\"],\"PROFESSIONINFOCOLLAPSIBLE\":[\"Professional Information\"],\"CONTACTCOLLAPSIBLE\":[\"Contact Information\"],\"EXPERTISE\":[\"Areas of Expertise\"],\"OTHERCONTACTNUMBERS\":[\"Other Contact Numbers\"],\"CONTACTNUMBERTYPE\":[\"Contact Number Type\"],\"CONTACTNUMBER\":[\"Contact Number\"],\"WEBSITETYPE\":[\"Web Site Type\"],\"PROFESSIONALSINCE\":[\"Professional Since\"],\"AREAS\":[\"Localities Served\"],\"YEARSOFEXPERIENCE\":[\"Years of Experience\"],\"CHOOSELOCATIONONMAP\":[\"Click here to specify your Preferred Location on Map \"],\"FEEDBACKSENTFAIL\":[\"There was some problem sending your Email. Please try again.\"],\"FEEDBACKSENTSUCCESS\":[\"Thank you for your Email. We will respond to you as soon as possible.\"],\"COULDNOTFETCHLOCATION\":[\"We could not fetch your location\"],\"WIDGETMEDIANPRICE\":[\"Median Prices are based on the asking prices of all properties listed \"],\"RENTINCREMENTPERCENTAGETOOLTIP\":[\"Provide the estimated annual increase in rent considering historic and prevailing market conditions\"],\"COSTBASISTOOLTIP\":[\"This is the cost basis of the investment which takes into consideration the asking price and initial improvement costs.\\nCost Basis = Asking Price + Initial Improvement Cost\"],\"TOTALINVESTMENTCOSTTOOLTIP\":[\"This is the cost basis of the investment which takes into consideration the asking price, closing cost and initial improvement costs.\"],\"ANNUALTAXABLEINCOMETOOLTIP\":[\"This is the annual taxable income after taking into consideration all the expenses incurred on maintaining the property\"],\"DEPRECIATIONPERCENTAGETOOLTIP\":[\"Provide the estimated annual depreciation of the property value considering normal wear and tear and standard depreciation rates\"],\"PROPERTYANNUALAPPRECIATIONPERCENTAGETOOLTIP\":[\"Provide the estimated annual appreciation in the property value considering historic and prevailing market conditions\"],\"INITIALINVESTMENTWITHOUTMORTGAGETOOLTIP\":[\"Asking price plus any fixup & closing cost.\"],\"ANNUALTAXABLEINCOMEWITHOUTMORTGAGETOOLTIP\":[\"This is the Annual taxable income after taking into consideration all the expenses incurred on maintaining the property.\\nAnnual Taxable Income Without Mortgage = Net Operating Income- Depreciation Value\\n\"],\"INITIALINVESTMENTWITHMORTGAGETOOLTIP\":[\"Down payment plus any fixup & closing cost.\"],\"COSTBASISWITHMORTGAGETOOLTIP\":[\"This is the Free Cash Flow after taking into consideration the debt service\\nFree Cash Flow = Net Operating Income - Debt Service\"],\"ANNUALTAXABLEINCOMEWITHMORTGAGETOOLTIP\":[\"This is the Annual Taxable Income after taking into consideration all the expenses incurred on maintaining the property \\nTaxable Cash Flow = Annual Free Cash Flow-Depreciation Value\"],\"SALECLOSINGCOSTTOOLTIP\":[\"Provide the estimated sale closing considering commissions, county fees, etc.\"],\"CLOSINGCOSTTOOLTIP\":[\"Estimated purchase closing cost considering commissions, county fees, etc.\"],\"FIXUPCOSTTOOLTIP\":[\"Estimated cost for repairs and/or improvements to be made after purchase and prior to renting to first tenant.\"],\"EMICOSTTOOLTIP\":[\"This is the estimated monthly mortgage amount considering  standard interest rates. The actual mortgage amount would vary based on the interest rate charged by the bank and the credit score\"],\"TOTALINVESTMENTCOSTWITHMORTGAGETOOLTIP\":[\"This is the total initial investment considering closing costs, down payment, etc.\"],\"CASHONCASHRETURNPERCENTAGEWITHMORTGAGETOOLTIP\":[\"This is the rate of return that calculates the cash income earned on the cash invested in a property in relation to the total initial investment only.\"],\"OTHEREXPENSESTOOLTIP\":[\"Provide the Total Annual Amount for all other Expenses\"],\"HOMEFORSALESEARCHOPTIONINFO\":[\"Search for Residential Investments for Sale\"],\"PROPERTYFORLEASESEARCHOPTIONINFO\":[\"Search for Properties for Lease\"],\"PROFESSIONALSEARCHOPTIONINFO\":[\"Search for Service Providers or Professionals Serving Real Estate like Bankers, Insurance Agents, Loan Agents, Property Managers, etc.\"],\"LOCATIONPREFUSAGEINFO\":[\"Enter one or more preferred locations and search radius to define the bounds\"],\"CAPRATERANGETOOLTIP\":[\"Provide the upper and lower range values for cap rate estimate in case you are looking for properties already generating rental income\"],\"NUMBERONLY\":[\"Please enter a valid number\"],\"MAXVALUE\":[\"Please enter a valid value less than \"],\"MAXLENGTH\":[\"The maximum number of characters allowed is \"],\"MINLENGTH\":[\"The minimum number of characters required is \"],\"EMAILIDREQUIRED\":[\"Email is required\"],\"EMAILPATTERNERROR\":[\"Please enter a valid email address \"],\"URLPATTERN\":[\"Please enter a valid website address \"],\"DATE_EXCEPTION\":[\"Invalid date specified\"],\"DECIMALUPTO4DIGIT\":[\"Please provide a valid number with a maximum of 4 decimal places\"],\"MEDIANLEASEPRICECAVEAT\":[\"Median Rents are indicative. Review Listing details carefully.\"],\"GROSSRENTREVENUEREQUIRED\":[\"Gross Income is required\"],\"ISVACATIONRENTAL\":[\"Is this Unit a Short-term Rental ?\"],\"ISVACATIONRENTALTOOLTIP\":[\"Indicate whether this property is being rented out as a short-term, seasonal, executive or vacation rental.\"],\"PREVIEWSELECTEDFLOORPLANDOCS\":[\"Selected Floor Plans and Surveys\"],\"FLOORPLANSGALLERY\":[\"Uploaded Floor Plans and Surveys\"],\"BASICINFORMATION\":[\"Location\"],\"PROPERTYDETAILS\":[\"Details\"],\"LOCATEPROPERTYTIP\":[\"Choose from the Properties below\"],\"PROPERTYFOUND\":[\"Matching Properties at your Location\"],\"PROPERTYNOTFOUND\":[\"Did not find your Property ?\"],\"SELFOWNED\":[\"Do you own this Listing?\"],\"OWNEREMAILID\":[\"Listing Owner Email Id\"],\"OWNERMOBILENUMBER\":[\"Listing Owner Mobile Number\"],\"OWNERNAME\":[\"Listing Owner Name\"],\"MARKERDRAGPINMESSAGE\":[\"In case you are unable to find your address, enter the nearest landmark or neighborhood and then drag the pin to your property location\"],\"BASICINFOSCHEMATITLE\":[\"Locate your Property\"],\"DROPIMAGETITLE\":[\"Drag and Drop your Files here. You can upload up to 10 files each time.\"],\"MEDIATITLE\":[\"Upload Photos for your Property\"],\"OVERVIEWINFOSCHEMATITLE\":[\"Provide basic information about your Listing\"],\"FINANCIALINFOSCHEMATITLE\":[\"Provide financial information\"],\"ADDITIONALINFOSCHEMATITLE\":[\"Provide additional information\"],\"PROPERTYINFOSCHEMATITLE\":[\"Enrich your Property Details\"],\"VALUEADDEDREASONTOOLTIP\":[\"Provide the primary reason or factor which makes the Investment Category of this property a Value Add\"],\"DISTRESSEDTOOLTIP\":[\"Indicate whether this property is distressed and the appropriate status\"],\"PROPERTYNAMETOOLTIP\":[\"Provide a unique name for the property so that, others can easily identify it\"],\"AREATOOLTIP\":[\"Provide the area of the property. If you are listing a lot or a building unit, then, this should be the area of the lot or unit listed\"],\"LOTAREATOOLTIP\":[\"Provide the total lot area of the property\"],\"ENDDATETOOLTIP\":[\"Provide the date until which your Listing should be active\"],\"CONTACTACTIONSTOOLTIP\":[\"Provide your preferred mode of contact. Enabling all possible contact options will facilitate others to reach you easily\"],\"SELFOWNEDTOOLTIP\":[\"Provide the ownership details for this Listing. If this listing is not owned by you, then, provide the owner information\"],\"AVAILABLEDATETOOLTIP\":[\"Provide the date by which the property will be available for occupancy\"],\"DISCLOSEADDRESSTOOLTIP\":[\"Indicate whether you would like to Disclose or Hide the Address for this Property\"],\"DISCLOSEPRICETOOLTIP\":[\"Indicate whether you would like to Disclose or Hide the Price for this Listing\"],\"CAPRATEKNOWNTOOLTIP\":[\"If you know the Cap Rate Estimate of the Property or Unit being listed, then, you may directly enter it. If not, we can help you calculate the Cap Rate Potential.\"],\"CAPRATETYPETOOLTIP\":[\"Indicate whether the Cap Rate Estimate is based on actual or projected revenues\"],\"COMMISSIONSPLITTOOLTIP\":[\"Provide the buyer agent commission percentage\"],\"COMMISSIONPERCENTAGETOOLTIP\":[\"Provide the commission percentage that the buyer would have to pay\"],\"COMMISSIONAMOUNTTOOLTIP\":[\"Provide the commission amount that the buyer would have to pay\"],\"SPECIFICATIONSTOOLTIP\":[\"Provide property features including details about the foundation, building materials used, finish, fixtures and furnishings\"],\"PRIMARYIDENTIFIERTOOLTIP\":[\"Provide the APN or Parcel ID. This will be vital for evaluating the property for purchasing decisions.\"],\"HIGHLIGHTSTOOLTIP\":[\"Provide key highlights of your property like facing direction, ventilation, etc.\"],\"MINDIVISIBLEAREATOOLTIP\":[\"Provide the smallest area allowed in the division of this Lot\"],\"MAXDIVISIBLEAREATOOLTIP\":[\"Provide the largest area allowed in the division of this Lot\"],\"MAXCONTIGUOUSAREATOOLTIP\":[\"Provide the largest contiguous area allowed in the division of this Lot\"],\"FIXTURESTOOLTIP\":[\"Provide the details of each fixture or appliance available in your unit\"],\"PROPERTYNAMEREQUIRED\":[\"Property Name is required\"],\"PROPERTYSUBTYPEREQUIRED\":[\"Property Type is required\"],\"PROPERTYTYPEREQUIRED\":[\"Category is required\"],\"LINEONEREQUIRED\":[\"Street Address is required\"],\"CITYREQUIRED\":[\"City is required\"],\"ZIPCODEREQUIRED\":[\"Zip Code is required\"],\"LOCALITYREQUIRED\":[\"Locality is required\"],\"TITLEREQUIRED\":[\"Listing Title is required\"],\"LISTINGAREAREAMISSING\":[\"Area is required\"],\"PROPERTYLISTINGTYPEREQUIRED\":[\"Listing Type is required\"],\"STARTTIMEMISSING\":[\"Start Time is required\"],\"ENDTIMEMISSING\":[\"End Time is required\"],\"ENDTIMEINVALID\":[\"End Time cannot be lesser than or equal to Start Time\"],\"OPENHOUSEENDDATEMINVALUE\":[\"Open House Date cannot be earlier than  \"],\"ENDDATEMINVALUE\":[\"Listing Expiry Date cannot be earlier than  \"],\"ENDDATEMAXVALUE\":[\"Listing Expiry Date cannot be greater than  \"],\"ENDDATEREQUIRED\":[\"Listing Expiry Date is required\"],\"DISCLOSEADDRESSREQUIRED\":[\"Disclose Address is required\"],\"DISCLOSEPRICEREQUIRED\":[\"Disclose Price is required\"],\"SALEPRICEREQUIRED\":[\"Sale Price is required\"],\"LEASEPRICEREQUIRED\":[\"Lease Amount is required\"],\"PROPERTYLISTINGMISSING\":[\"Property Listing is required\"],\"PROPERTYMISSING\":[\"Property is required\"],\"SALEPRICEMISSING\":[\"Sale Price is required\"],\"SALEPRICEINVALID\":[\"Sale Price is invalid\"],\"COMMISSIONSPLITINVALID\":[\"Buyer Agent Commission is invalid\"],\"SALECOMMISSIONINVALID\":[\"Commission Percentage is invalid\"],\"LEASEPRICEMISSING\":[\"Lease Price is required\"],\"LEASEPRICEINVALID\":[\"Lease Price is invalid\"],\"LEASEDEPOSITINVALID\":[\"Deposit Amount is invalid\"],\"LEASETERMINVALID\":[\"Lease Term is invalid\"],\"LEASEMAINTENANCECHARGESINVALID\":[\"Monthly Maintenance Charges is invalid\"],\"LEASECOMMISSIONINVALID\":[\"Commission Amount is invalid\"],\"NUMBEROFBEDSREQUIRED\":[\"Number of Beds is required\"],\"NUMBEROFSEATSREQUIRED\":[\"Number of Seats is required\"],\"NUMBEROFBEDROOMSREQUIRED\":[\"Number of Bedrooms is required\"],\"LISITNGAREAREQUIRED\":[\"Area is required\"],\"ENDDATEMISSING\":[\"Expiry Date is required\"],\"OTHERSUBTYPEINVALID\":[\"Invalid Other Property Sub Type\"],\"SUBTYPEMISSING\":[\"Property Type is required\"],\"LISTINGTITLEMISSING\":[\"Listing Title is required\"],\"LISTINGSALETYPEMISSING\":[\"Posted By is required\"],\"LISTINGTYPEMISSING\":[\"Listing Type is required\"],\"TYPEMISSING\":[\"Category is required\"],\"LEASETERMREQUIRED\":[\"Lease Term is required\"],\"LEASETYPEREQUIRED\":[\"Lease Type is required\"],\"LEASEAMOUNTREQUIRED\":[\"Lease Amount is required\"],\"DISTRESSEDSTATUSREQUIRED\":[\"Distressed Status is required\"],\"CREATEPROPERTY\":[\"Provide Property Information\"],\"CONFIRMADDRESS\":[\"Confirm the Address of your Property\"],\"MOVEMAP\":[\"Move or drag map to find properties\"],\"BACKTOPROPERTY\":[\"Previous Step\"],\"NOIMAGESUPLOADED\":[\"No files uploaded for\"],\"PREVIEWSELECTEDDOCUMENTS\":[\"Selected Documents\"],\"PREVIEWSELECTEDIMAGES\":[\"Preview Selected Photos\"],\"CURRENTDEFAULT\":[\"Default Photo\"],\"SETASDEFAULT\":[\"Set as Default\"],\"CONFIRMPROPERTY\":[\"Select this Location\"],\"NEXTTOFINANCIAL\":[\"Next Step\"],\"NEXTTOADDITIONAL\":[\"Next Step\"],\"BACKTOADDITIONAL\":[\"Previous Step\"],\"NEXTTOCREATEPROPERTY\":[\"Next Step\"],\"BACKTOADDRESS\":[\"Previous Step\"],\"ADDLEASERENEWALOPTIONS\":[\"Add a Lease Renewal Option\"],\"ADDHIGHLIGHTS\":[\"Add another Highlight\"],\"POSTONLINE\":[\"Post Listing Online\"],\"NEXTTOPROPERTY\":[\"Next Step\"],\"NEXTTOPHOTOS\":[\"Next Step\"],\"BACKTOFINANCIAL\":[\"Previous Step\"],\"SELECTEDBUILDINGUNIT\":[\"Describe your Unit\"],\"PROPERTYBUILDINGDETAILS\":[\"Describe your Building\"],\"APARTMENTDETAILS\":[\"Describe your Residential Community\"],\"PROPERTYLOTDETAILS\":[\"Describe your Lot\"],\"ENTERHIGHLIGHTS\":[\"Enter Property Highlights\"],\"ADDFIXTURES\":[\"Add a Fixture\"],\"ENTERFIXTURES\":[\"Enter Fixture Details\"],\"ADDSPECIFICATIONS\":[\"Add a Feature\"],\"ENTERSPECIFICATIONS\":[\"Enter Features\"],\"ADDROOMS\":[\"Add a Room\"],\"HOTELROOMDETAILS\":[\"Describe your Room\"],\"LOTDETAILSCOLLAPSIBLE\":[\"Lot Information (I am listing a specific Lot)\"],\"SELECTEDLOT\":[\"Describe your Lot\"],\"MAXNOOFFILES\":[\"You can Upload up to 10 Files\"],\"UPLOADNOW\":[\"Upload Now\"],\"SELECTFILESTOUPLOAD\":[\"Browse Files\"],\"MINIMUM4IMAGESREQUIRED\":[\"Add at least 4 Photos\"],\"LISTINGUPDATED\":[\"Listing updated...\"],\"LISTINGUPDATEFAILED\":[\"Listing could not be updated. Please try again later.\"],\"VIDEOTITLEPLACEHOLDER\":[\"Type your Video Title\"],\"VIDEOURLPLACEHOLDER\":[\"Type or Paste your Video URL\"],\"ASKINGPRICEPRICEREQUIRED\":[\"Enter the Asking Price\"],\"ISRENTALPROPERTYTOOLTIP\":[\"Indicate whether this property unit is rented out and the appropriate financial information\"],\"ISRENTALPROPERTY\":[\"Is this unit rented out ?\"],\"RENTALAMOUNTREQUIRED\":[\"Lease Amount is required\"],\"CONSTRUCTIONSTATUSYEARBUILTINVALID \":[\"Construction Status and Year combination is invalid.\"],\"ISREALTOR\":[\"I am a Real Estate Professional\"],\"PROFILEPICTURE\":[\"Profile Photo\"],\"ADDPROFILEPIC\":[\"Add Profile Photo\"],\"UPDATEPROFILEPIC\":[\"Change Profile Photo\"],\"YOUHAVENOCOMPANIESTITLE\":[\"You are currently not associated with a Company\"],\"YOUHAVENOCOMPANIESMESSAGE\":[\"Click on the button to register a new company\"],\"YOUHAVENOLISTINGSTITLE\":[\"You have not Listed any Properties\"],\"YOUHAVENOLISTINGSMESSAGE\":[\"Click on the button to List a Property\"],\"CONFIRMPASSWORDERROR\":[\"Passwords do not match. Please retry.\"],\"PASSWORDCHANGESUCCESS\":[\"Password changed...\"],\"PREFERENCESSAVESUCCESS\":[\"Preferences saved...\"],\"PROFILESAVESUCCESS\":[\"Profile saved...\"],\"MYWISHLIST\":[\"My Watch List\"],\"WISHLIST\":[\"Watch List\"],\"REMOVEFROMWISHLIST\":[\"Remove from My Watch List\"],\"PHONENUMBERVIEWED\":[\"Send me an Email Notification when somebody views my Phone Number\"],\"CHATINITIATED\":[\"Send me an Email Notification when somebody initiates a Chat Conversation with me\"],\"RSVPSENT\":[\"Send me an Email Notification when somebody sends an RSVP for my Open House\"],\"SAVEDSEARCHMATCH\":[\"Send me an Email Notification when New Listings are posted matching my Saved Search Criteria\"],\"LISTINGCREATED\":[\"Send me an Email Notification when somebody Lists a Property in my Areas & Neighborhoods Served \"],\"ENTERSAVEDSEARCHNOTIFICATIONDAYS\":[\"Enter Number of Days\"],\"SAVEDSEARCHNOTIFICATIONDAYS\":[\"Days after which we should stop sending you Match Notifications\"],\"SAVEDON\":[\"Saved on\"],\"YOUHAVENOWISHLISTTITLE\":[\"You have no Listings in your Watch List\"],\"YOUHAVENOWISHLISTMESSAGE\":[\"Click on the Heart symbol in the Listing display to add it to your Watch List\"],\"YOUHAVENOSEARCHESTITLE\":[\"You have no Saved Searches\"],\"YOUHAVENOSEARCHESMESSAGE\":[\"Click on the Save Search button in the Property Search Results to save it for future reference\"],\"YOUHAVENONOTIFTITLE\":[\"You have no Contacts\"],\"YOUHAVENONOTIFMESSAGE\":[\"Whenever you contact somebody or when somebody contacts you, your Contacts will be visible here\"],\"ADDEDTOWISHLIST\":[\"Added to Watch List\"],\"ADDTOWISHLIST\":[\"Add to Watch List\"],\"STATUSMESSAGE\":[\"Status Message\"],\"ENRICHYOURPROFILEMSG\":[\"Please enrich your profile to improve your visibility to potential investors.\"],\"LICENSEREQUIRED\":[\"Enter the License Number\"],\"CURRENTPASSWORD\":[\"Current Password\"],\"NEWPASSWORD\":[\"New Password\"],\"CONFIRMPASSWORD\":[\"Confirm Password\"],\"ENTERNAME\":[\"Enter Name\"],\"ENTERMOBILE\":[\"Enter Mobile\"],\"NOTAMEMBER\":[\"Not a Member ?\"],\"EMAILPHONE\":[\"Email or Mobile Number\"],\"MEMBERLOGIN\":[\"Member Login\"],\"CREATEYOURACCOUNT\":[\"Create Your Account\"],\"MEMBER\":[\"Member\"],\"CHANGEPASSWORD\":[\"Change Password\"],\"CHANGEPASSWORDDESCRIPTION\":[\"Provide your new password\"],\"ADDWEBSITES\":[\"Add a Web Site\"],\"USERSREGISTRATIONINFOSCHEMATITLE\":[\"Sign up as a member\"],\"PROFESSIONALSREGISTRATIONINFOSCHEMATITLE\":[\"Sign up as a Service Provider or Professional\"],\"REALTORSREGISTRATIONINFOSCHEMATITLE\":[\"Sign up as a Realtor / Broker\"],\"COMPANYREGISTRATIONINFOSCHEMATITLE\":[\"Register your company in our site\"],\"VERIFYOTPHEADING\":[\"Verify Security Code\"],\"VERIFYOTPACCOUNTLOCKEDLINE1\":[\"Your Account has been Locked due to too many incorrect password attempts. Re-sending Security Code...\"],\"VERIFYOTPACCOUNTLOCKEDLINE2\":[\"Provide the Security Code that was sent to your Email\"],\"VERIFYOTPUSERUNVERIFIEDLINE1\":[\"We notice that you did not complete the Sign Up process during your last visit. Re-sending Security Code...\"],\"VERIFYOTPUSERUNVERIFIEDLINE2\":[\"Provide the Security Code that was sent to your Email\"],\"VERIFYOTPEMPTYPASSWORDLINE1\":[\"We notice that you did not complete the Sign Up process during your last visit. Re-sending Security Code...\"],\"VERIFYOTPEMPTYPASSWORDLINE2\":[\"Provide the Security Code that was sent to your Email\"],\"VERIFYOTPAUTOREGISTEREDLINE1\":[\"We need to establish that this Email Id belongs to you\"],\"VERIFYOTPAUTOREGISTEREDLINE2\":[\"Provide the Security Code that was sent to your Email\"],\"VERIFYOTPFORGOTPASSWORDLINE1\":[\"We need to verify your email ID in order to Reset your Password\"],\"VERIFYOTPFORGOTPASSWORDLINE2\":[\"Provide the Security Code that was sent to your Email\"],\"VERIFYOTPDESCRIPTIONLINE2\":[\"Provide the Security Code that was sent to your Email\"],\"VERIFYOTPDESCRIPTIONLINE1\":[\"We need to establish that this Email Id belongs to you\"],\"REGISTRATIONHEADING\":[\"Sign Up\"],\"REGISTRATIONDESCRIPTIONLINE1\":[\"Provide your Identification\"],\"REGISTRATIONDESCRIPTIONLINE2\":[\"Your information will be used for identifying you and will never be shared with anyone else\"],\"LOGINDESCRIPTIONLINE1\":[\"Provide your Email ID\"],\"LOGINDESCRIPTIONLINE2\":[\"You will be prompted for your Password or Sign Up credentials\"],\"PASSWORDHEADING\":[\"Security Check\"],\"PASSWORDDESCRIPTIONLINE1\":[\"Provide your Password\"],\"PASSWORDDESCRIPTIONLINE2\":[\"You will appear as Online and can instantly connect with others who are also Online\"],\"FORGOTPASSWORDHEADING\":[\"Set Password\"],\"FORGOTPASSWORDDESCRIPTIONLINE1\":[\"Provide a Password for future login to our site\"],\"FORGOTPASSWORDDESCRIPTIONLINE2\":[\"You can choose a Password which is strong and easy to remember\"],\"STATUSMESSAGETOOLTIP\":[\"Provide a brief message which will be displayed in your Contact Card\"],\"AREASSERVEDTOOLTIP\":[\"Cities or neighborhoods that you serve.\"],\"PROFESSIONSTOOLTIP\":[\"Choose the type of services provided by you\"],\"EXPERTISETOOLTIP\":[\"Provide your primary areas of expertise and specialties\"],\"SPECIALTIESTOOLTIP\":[\"Choose your appropriate real estate specialties \"],\"BROKERAGEFIRMCOMPLETETOOLTIP\":[\"Your brokerage firm may already be registered with us. Lookup our data with your company name. If not found, you can always register your company here.\"],\"COMPANYCOMPLETETOOLTIP\":[\"Your company may already be registered with us. Lookup our data with your company name. If not found, you can always register your company here.\"],\"HAVECOMPANYTOOLTIP\":[\"If you are associated with a company, you can benefit by providing your company information here\"],\"HAVECOMPANY\":[\"Associated with a Company ?\"],\"BROKERAGEFIRMCOMPLETE\":[\"Enter your Brokerage Firm Name\"],\"COMPANYCOMPLETE\":[\"Enter your Company Name\"],\"ADDCOMPANYCOLLAPSIBLE\":[\"Did not find your Company ?\"],\"AREAREQUIRED\":[\"At least one Area Served is required\"],\"COMPANYNAMEREQUIRED\":[\"Company Name is required\"],\"CONTACTNUMBERTYPEREQUIRED\":[\"Contact Number Type is required\"],\"CONTACTNUMBERREQUIRED\":[\"Contact Number is required\"],\"NAMEREQUIRED\":[\"Name is required\"],\"MOBILENUMBERREQUIRED\":[\"Mobile Number is required\"],\"PASSWORDREQUIRED\":[\"Password is required\"],\"REALTORINVALID\":[\"Realtor / Broker is invalid\"],\"AREASMISSING\":[\"Areas Served is required\"],\"REALTORSINCEINVALID\":[\"Professional Since is invalid\"],\"SPECIALTIESINVALID\":[\"`\"],\"CONTACTACTIONSMISSING\":[\"At least one Preferred Contact Option is required\"],\"CONTACTACTIONINVALID\":[\"Preferred Contact Option is invalid\"],\"PROFESSIONALINVALID\":[\"Professional is invalid\"],\"PROFESSIONSMISSING\":[\"At least one Profession is required\"],\"MOBILEOREMAILMANDATORY\":[\"At least one of Email or Mobile Number is mandatory\"],\"MOBILEOREMAILACTIONANYONENEEDED\":[\"At least one of Email or Telephone Number should be set as preferred contact option\"],\"EXPIRED_PASSWORD\":[\"Your password has expired. Please reset it.\"],\"EMPTY_PASSWORD\":[\"Password is empty\"],\"USER_UNVERIFIED\":[\"Please verify your Security Code to proceed further\"],\"USER_ACCOUNT_DISABLED\":[\"Your account is disabled. Please contact our system administrator\"],\"USER_ACCOUNT_LOCKED\":[\"Your account is locked. Please reset your password\"],\"USER_MOBILE_EXIST\":[\"The mobile number that you supplied is already registered in our system. Please try another mobile number\"],\"USER_EMAIL_EXIST\":[\"The email ID that you supplied is already registered in our system. Please try another email ID\"],\"USER_EMAIL_MOBILE_EXIST\":[\"The email and mobile number that you supplied is already registered in our system. Please try another email or mobile number\"],\"TOKEN_NOT_FOUND\":[\"Security Code is invalid. Please try again\"],\"TOKEN_EXPIRED\":[\"Your Security Code has expired. Please generate a new Security Code\"],\"TOKEN_NOT_MATCHING\":[\"Security Code is invalid. Please try again\"],\"OLD_PASSWORD_NOT_SAME\":[\"Old password is invalid\"],\"BAD_CREDENTIALS\":[\"User name or password is invalid\"],\"INVALID_USERNAME\":[\"User name or password is invalid\"],\"INVALID_USERID\":[\"User name or password is invalid\"],\"USER_NOT_FOUND\":[\"User name or password is invalid\"],\"BROKERAGE_FIRM_EXIST\":[\"Another brokerage firm with the same name exists\"],\"COMPANY_EXIST\":[\"Another company with the same name exists\"],\"BROKERAGE_FIRM_NOT_EXIST\":[\"Brokerage firm does not exist\"],\"COMPANY_NOT_EXIST\":[\"Company does not exist\"],\"COMPANYINVALID\":[\"Company is invalid\"],\"ADDOTHERCONTACTNUMBERS\":[\"Add a Contact Number\"],\"ENTERAREA\":[\"Enter Areas Served by you\"],\"ADDAREASSERVED\":[\"Add an Area Served\"],\"ENTEREXPERTISE\":[\"Enter your Areas of Expertise\"],\"ADDEXPERTISE\":[\"Add an Area of Expertise\"],\"REGISTERCOMPANY\":[\"Register My Company\"],\"ROLETYPE\":[\"I am a\"],\"ROLE_CUSTOMER\":[\"Real Estate Investor\"],\"ROLE_REALTOR\":[\"Realtor\"],\"ROLE_PROFESSIONAL\":[\"Real Estate Service Provider\"],\"ENTEROTP\":[\"Enter the Security Code sent to your Email\"],\"USEREMAIL_EXIST\":[\"A user with this email ID already exists. Please use an alternate email ID.\"],\"AMOUNTINVALID\":[\"Please enter a valid amount without commas\"],\"DAYSINVALID\":[\"Please enter a valid number of days\"],\"OFFERINTENTDESCLAIMER\":[\"This will send an email to an agent.\"],\"DUEDILIGENCEPERIODTOOLTIP\":[\"Days needed by you to perform due diligence. After the due diligence period, the earnest money deposit will become non-refundable.\"],\"EARNESTMONEYDEPOSITTOOLTIP\":[\"Initial amount deposited by you. The earnest money deposit will become non-refundable after the due diligence period.\"],\"CLOSINGPERIODTOOLTIP\":[\"Days needed by you to complete the purchase. You should take into consideration the time needed for loan closure, funds transfer, title transfer, etc.\"],\"ROLETYPETOOLTIP\":[\"Sign Up as a Real Estate Investor if you are an Investor or Property Owner. \\nIf you are a Realtor / Broker or a Service Provider / Professional Serving the Real Estate Industry, you will be prompted for additional information.\"],\"FLYERACCOUNTACTIVATE\":[\"Set your password to download this flyer\"],\"HANDOUTVERBOSE\":[\"Verbose\"],\"PREVIEWPDF\":[\"Preview your flyer and download\"],\"BYLOCATION\":[\"By Location\"],\"BYBUDGET\":[\"By Budget\"],\"BYMETRO\":[\"By Metro\"],\"BACKTORESULTS\":[\"Back to Results\"],\"MLSLISTINGAGENT\":[\"Listing Agent\"],\"CONTACTINVESTMENTSPECIALISTS\":[\"Contact Investment Specialist(s)\"],\"COMPARE\":[\"Compare\"],\"VIEWPHONENUMBER\":[\"View Phone Number\"],\"MARKETS\":[\"Markets\"],\"PORTFOLIO\":[\"Portfolio\"],\"NOCONTACTNUMBERSFOUND\":[\"Telephone numbers not provided\"],\"INVESTMENTCATEGORIESTOOLTIP\":[\"Select the investment categories that best describes this property\"],\"PHONEDETAILS\":[\"Telephone Number\"],\"MANAGEMENTTOOLTIP\":[\"Fees paid for property management\"],\"CALCULATEDCAPRATETOOLTIP\":[\"Calculated as the Ratio of Net Operating Income to Listing Price\"],\"ANALYZERETURNSBUTTONTOOLTIP\":[\"Calculate cash flow for this property using this interactive tool. Rent and expense estimates are automatically populated where possible.\"],\"FIXUPCOST\":[\"Initial Fixup Cost\"],\"PURCHASE\":[\"Loan\"],\"PURCHASESUMMARY\":[\"Purchase Summary\"],\"OPERATIONALSTATEMENT\":[\"Estimated Income / Expenses\"],\"PROJECTIONS\":[\"Projections\"],\"ASSUMPTIONS\":[\"Assumptions\"],\"EXPENSEGROUPTOOLTIP\":[\"Total of all the expenses incurred for maintaining and managing the property.\"],\"ANNUALFREECASHFLOWTOOLTIP\":[\"Annual income minus all expenses excluding debt service.\"],\"\":{\"domain\":\"messages\",\"plural_forms\":\"nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);\",\"lang\":\"\"}}}}");

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return send404; });
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
/* harmony import */ var _shared_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47);
/* harmony import */ var _shared_pages_NotFoundPage_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69);







var _ref =
/*#__PURE__*/
_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_shared_pages_NotFoundPage_jsx__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {});

function send404(res, i18nTools) {
  var componentHTML = react_dom_server__WEBPACK_IMPORTED_MODULE_2___default.a.renderToString(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()(_shared_i18n__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].Provider, {
    i18n: i18nTools
  }, void 0, _ref));
  var html = render404HTML({
    componentHTML: componentHTML,
    config: _shared_config__WEBPACK_IMPORTED_MODULE_4__["default"]
  });
  res.status(404).send(html);
}

function render404HTML(_ref2) {
  var componentHTML = _ref2.componentHTML,
      config = _ref2.config;
  return "\n        <!DOCTYPE html>\n        <html>\n        <head>\n            <meta charset=\"utf-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=0\">\n            <link rel=\"shortcut icon\" href=\"/static/favicon.ico\"/>\n            <title>Propshub - propshub.com</title>\n            <meta name=\"description\" content=\"404 Page not found\">\n            <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900&subset=latin,cyrillic' rel='stylesheet' type='text/css'>\n            <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\n            <link rel=\"stylesheet\" href=\"https://storage.googleapis.com/code.getmdl.io/1.0.6/material.cyan-pink.min.css\" />\n            <link rel=\"stylesheet\" href=\"".concat(config.staticUrl, "/static/notFoundPageStyles/main.css\">\n            <script src=\"https://storage.googleapis.com/code.getmdl.io/1.0.6/material.min.js\"></script>\n        </head>\n        <body>\n            <div id=\"react-view\">").concat(componentHTML, "</div>\n        </body>\n        </html>\n    ");
}

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(47);









var assetsPath = _config__WEBPACK_IMPORTED_MODULE_8__["default"].assetsPath;

var NotFoundPage =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(NotFoundPage, _Component);

  function NotFoundPage() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, NotFoundPage);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(NotFoundPage).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(NotFoundPage, [{
    key: "render",
    value: function render() {
      var i18n = this.context.i18n;
      return _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "NotFoundPage"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("div", {
        className: "page-content"
      }, void 0, _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("h2", {
        className: "text"
      }, void 0, " ", i18n.l('The page you are looking for cannot be found'), " "), _babel_runtime_helpers_jsx__WEBPACK_IMPORTED_MODULE_0___default()("img", {
        src: "".concat(assetsPath, "/images/notFoundPage/404.png"),
        className: "image"
      })));
    }
  }]);

  return NotFoundPage;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

NotFoundPage.contextTypes = {
  i18n: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object
};
/* harmony default export */ __webpack_exports__["a"] = (NotFoundPage);

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("react-cookie");

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return REQUEST_GET_DEVICE; });
/* unused harmony export REQUEST_OPEN_SITE_FEEDBACK */
/* unused harmony export REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL */
/* unused harmony export REQUEST_DATA_FROM_STORE */
/* unused harmony export REQUEST_UPDATE_UNAUTHERIZE_ERROR */
/* unused harmony export REQUEST_UPDATE_SERVER_ERROR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return UPDATE_ERROR_STATE; });
/* unused harmony export REQUEST_RESET_ERROR_STATE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return REQUEST_UPDATE_ERROR_RESPONSE; });
/* unused harmony export REQUEST_UPDATE_INVESTOR_WIZARD */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return REQUEST_GET_COMPANIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return REQUEST_GET_PEOPLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return REQUEST_GET_COMPANY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return REQUEST_RUN_GRABBER; });
/* unused harmony export REQUEST_UPDATE_DATA_TABLE_STATE_CHANGES */
/* unused harmony export REQUEST_RESET_STORE_STATE */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lib_delay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72);
/* harmony import */ var lib_delay__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lib_delay__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_application__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(73);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var ERROR_CODES = {
  401: REQUEST_UPDATE_UNAUTHERIZE_ERROR,
  500: REQUEST_UPDATE_SERVER_ERROR
};

function getErrorActionName(statusCode) {
  return ERROR_CODES[statusCode] || '';
}

function REQUEST_GET_DEVICE(device) {
  return {
    type: 'REQUEST_GET_DEVICE',
    data: device
  };
}
function REQUEST_OPEN_SITE_FEEDBACK() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: 'RESPONSE_OPEN_SITE_FEEDBACK',
    data: payload
  };
}
function REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL(payload) {
  return {
    type: 'REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL',
    data: payload
  };
}
function REQUEST_DATA_FROM_STORE(payload) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(dispatch, getState) {
        var data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch({
                  type: 'RESPONSE_DATA_FROM_STORE',
                  data: {
                    isFetching: true
                  }
                });
                _context.next = 3;
                return lib_delay__WEBPACK_IMPORTED_MODULE_3___default()(100);

              case 3:
                data = getState()[payload.store][payload.lookupObject];

                try {
                  dispatch({
                    type: 'RESPONSE_DATA_FROM_STORE',
                    data: Object.assign(data, {
                      isFetching: false,
                      isFetchedFromStore: true
                    })
                  });
                } catch (e) {
                  dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
                    action: {
                      type: 'RESPONSE_DATA_FROM_STORE',
                      data: Object.assign(e, {
                        isFetching: false
                      })
                    },
                    error: e
                  }));
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}
function REQUEST_UPDATE_UNAUTHERIZE_ERROR() {
  return function (dispatch) {
    var user = Object.assign({}, {
      isLogIn: false
    }, {
      isFetching: false,
      isForceLogin: true,
      errorInfo: {
        description: 'SESSIONEXPIREPROMPT'
      }
    });
    dispatch({
      type: 'REQUEST_UPDATE_USER_STORE',
      data: user
    });
    dispatch({
      type: 'userRequested',
      data: Object.assign({}, {
        chatModals: []
      })
    });
    dispatch({
      type: 'UPDATE_ERROR_STATE',
      data: {
        error: 'unauthorized'
      }
    });
  };
}
function REQUEST_UPDATE_SERVER_ERROR() {
  return {
    type: 'UPDATE_ERROR_STATE',
    data: {
      error: 'servererror'
    }
  };
}
function UPDATE_ERROR_STATE(payload) {
  return function (dispatch) {
    var errorActionName = getErrorActionName(payload.statusCode);

    if (errorActionName) {
      dispatch(errorActionName());
      return;
    }

    REQUEST_RESET_ERROR_STATE(payload);
  };
}
function REQUEST_RESET_ERROR_STATE(payload) {
  return {
    type: 'UPDATE_ERROR_STATE',
    data: ''
  };
}
function REQUEST_UPDATE_ERROR_RESPONSE(payload) {
  return function (dispatch) {
    dispatch({
      type: 'HIDE'
    });
    payload.action && dispatch(payload.action);
    dispatch(UPDATE_ERROR_STATE(payload.error));
  };
}
function REQUEST_UPDATE_INVESTOR_WIZARD(payload) {
  return function (dispatch, getState) {
    var investor_wizard = getState().application.investor_wizard;
    dispatch({
      type: 'REQUEST_UPDATE_INVESTOR_WIZARD',
      data: Object.assign({}, _objectSpread({}, investor_wizard), _objectSpread({}, payload))
    });
  };
}
function REQUEST_GET_COMPANIES(payload) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(dispatch) {
        var config, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                config = {
                  endpoint: 'company.list.get.listcompanies',
                  method: 'get',
                  dataPayload: {
                    processed: payload.query && payload.query.type || 'unprocessed'
                  }
                };
                _context2.prev = 1;
                _context2.next = 4;
                return _services_application__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].fetchData(config);

              case 4:
                response = _context2.sent;
                dispatch({
                  type: 'RESPONSE_GET_COMPANIES',
                  data: response.data
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
                  action: {
                    type: 'RESPONSE_GET_COMPANIES',
                    data: Object.assign(_context2.t0, {
                      isFetching: false
                    })
                  },
                  error: _context2.t0
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
function REQUEST_GET_PEOPLE(payload) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(dispatch) {
        var config, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                config = {
                  endpoint: 'people.list.get.listpeople',
                  method: 'get',
                  dataPayload: {
                    processed: payload.query && payload.query.type || 'unprocessed'
                  }
                };
                _context3.prev = 1;
                _context3.next = 4;
                return _services_application__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].fetchData(config);

              case 4:
                response = _context3.sent;
                dispatch({
                  type: 'RESPONSE_GET_PEOPLE',
                  data: response.data
                });
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
                  action: {
                    type: 'RESPONSE_GET_PEOPLE',
                    data: Object.assign(_context3.t0, {
                      isFetching: false
                    })
                  },
                  error: _context3.t0
                }));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
      }));

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}
function REQUEST_GET_COMPANY(payLoad) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(dispatch) {
        var config, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                config = {
                  endpoint: 'company.list.get.company',
                  method: 'get',
                  paramsPayload: payLoad.params
                };
                _context4.prev = 1;
                _context4.next = 4;
                return _services_application__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].fetchData(config);

              case 4:
                response = _context4.sent;
                dispatch({
                  type: 'RESPONSE_GET_COMPANY',
                  data: response.data
                });
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
                  action: {
                    type: 'RESPONSE_GET_COMPANY',
                    data: Object.assign(_context4.t0, {
                      isFetching: false
                    })
                  },
                  error: _context4.t0
                }));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));

      return function (_x5) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}
function REQUEST_RUN_GRABBER(payLoad) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(dispatch) {
        var config, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                config = {
                  endpoint: 'company.list.get.rungrabber',
                  method: 'get',
                  dataPayload: payLoad.dataPayload,
                  paramsPayload: payLoad.paramPayload
                };
                console.log(config);
                _context5.prev = 2;
                _context5.next = 5;
                return _services_application__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].fetchData(config);

              case 5:
                response = _context5.sent;
                console.log(response);
                dispatch({
                  type: 'RESPONSE_RUN_GRABBER',
                  data: response.data
                });
                _context5.next = 13;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](2);
                dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
                  action: {
                    type: 'RESPONSE_RUN_GRABBER',
                    data: Object.assign(_context5.t0, {
                      isFetching: false
                    })
                  },
                  error: _context5.t0
                }));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 10]]);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}
function REQUEST_UPDATE_DATA_TABLE_STATE_CHANGES(payload) {
  return function (dispatch) {
    dispatch({
      type: 'RESPONSE_DATA_TABLE_STATE_CHANGES',
      data: payload
    });
  };
}
function REQUEST_RESET_STORE_STATE(payload) {
  return function (dispatch) {
    dispatch({
      type: payload.type,
      data: {}
    });
  };
}

/***/ }),
/* 72 */
/***/ (function(module, exports) {

var createAbortError = function createAbortError() {
  var error = new Error('Delay aborted');
  error.name = 'AbortError';
  return error;
};

var createDelay = function createDelay(_ref) {
  var _ref$clearTimeout = _ref.clearTimeout,
      clear = _ref$clearTimeout === void 0 ? clearTimeout : _ref$clearTimeout,
      _ref$setTimeout = _ref.setTimeout,
      set = _ref$setTimeout === void 0 ? setTimeout : _ref$setTimeout,
      willResolve = _ref.willResolve;
  return function (ms) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        value = _ref2.value,
        signal = _ref2.signal;

    if (signal && signal.aborted) {
      return Promise.reject(createAbortError());
    }

    var timeoutId;
    var settle;
    var rejectFn;

    var signalListener = function signalListener() {
      clear(timeoutId);
      rejectFn(createAbortError());
    };

    var cleanup = function cleanup() {
      if (signal) {
        signal.removeEventListener('abort', signalListener);
      }
    };

    var delayPromise = new Promise(function (resolve, reject) {
      settle = function settle() {
        cleanup();

        if (willResolve) {
          resolve(value);
        } else {
          reject(value);
        }
      };

      rejectFn = reject;
      timeoutId = set(settle, ms);
    });

    if (signal) {
      signal.addEventListener('abort', signalListener, {
        once: true
      });
    }

    delayPromise.clear = function () {
      clear(timeoutId);
      timeoutId = null;
      cleanup();
      settle();
    };

    return delayPromise;
  };
};

var delay = createDelay({
  willResolve: true
});
delay.reject = createDelay({
  willResolve: false
});

delay.createWithTimers = function (_ref3) {
  var clearTimeout = _ref3.clearTimeout,
      setTimeout = _ref3.setTimeout;
  var delay = createDelay({
    clearTimeout: clearTimeout,
    setTimeout: setTimeout,
    willResolve: true
  });
  delay.reject = createDelay({
    clearTimeout: clearTimeout,
    setTimeout: setTimeout,
    willResolve: false
  });
  return delay;
};

module.exports = delay;
module.exports.default = delay;

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _BaseService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(74);






var ApplicationService =
/*#__PURE__*/
function (_BaseService) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ApplicationService, _BaseService);

  function ApplicationService() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ApplicationService);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(ApplicationService).apply(this, arguments));
  }

  return ApplicationService;
}(_BaseService__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);

/* harmony default export */ __webpack_exports__["a"] = (new ApplicationService());

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_ApiBridge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(75);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var BaseService =
/*#__PURE__*/
function () {
  function BaseService() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, BaseService);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(BaseService, [{
    key: "fetchData",
    value: function fetchData(requestConfig) {
      var _Object$assign = Object.assign({}, BaseService.defaultConfig, requestConfig),
          endpoint = _Object$assign.endpoint,
          method = _Object$assign.method,
          paramsPayload = _Object$assign.paramsPayload,
          dataPayload = _Object$assign.dataPayload,
          headersPayload = _Object$assign.headersPayload,
          endpointBase = _Object$assign.endpointBase;

      return new Promise(function (resolve, reject) {
        _lib_ApiBridge__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"][method].apply(_lib_ApiBridge__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], [endpoint, paramsPayload, dataPayload, headersPayload, endpointBase]).then(function (response) {
          resolve({
            data: response.data,
            status: 'success'
          });
        }, function (error) {
          reject(_objectSpread({}, error.response.data));
        });
      });
    }
  }], [{
    key: "callAPI",
    value: function callAPI(endpoint, method) {
      var paramsPayload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var dataPayload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var headersPayload = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var endpointBase = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'url';
      return _lib_ApiBridge__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"][method].apply(_lib_ApiBridge__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], [endpoint, paramsPayload, dataPayload, headersPayload, endpointBase]);
    }
  }]);

  return BaseService;
}();

BaseService.defaultConfig = {
  endpoint: '',
  method: '',
  paramsPayload: {},
  dataPayload: {},
  headersPayload: {},
  endpointBase: 'url'
};


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(70);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_cookie__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_config_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47);







var DEFAULT_ENDPOINTS = _shared_config_js__WEBPACK_IMPORTED_MODULE_6__["default"].endpoints,
    api = _shared_config_js__WEBPACK_IMPORTED_MODULE_6__["default"].api;

var ApiBridge =
/*#__PURE__*/
function () {
  function ApiBridge() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ApiBridge);

    this.apiURL = this.getURL();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ApiBridge, [{
    key: "getURL",
    value: function getURL() {
      return "".concat(api.protocol, "://").concat(api.host, ":").concat(api.port).concat(api.prefix);
    }
  }, {
    key: "getNestedObject",
    value: function getNestedObject(obj, dotSeparatedKeys) {
      var pathArr = dotSeparatedKeys.split('.');
      return pathArr.reduce(function (o, key) {
        return o && o[key] !== 'undefined' ? o[key] : undefined;
      }, obj);
    }
  }, {
    key: "buildEndpoint",
    value: function buildEndpoint(endpointName) {
      var endpointParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var endpoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_ENDPOINTS;
      var endpointRegex = /\{[^\}]*}/g,
          endpointStr,
          paramMatch,
          i,
          key;
      endpointStr = this.getNestedObject(endpoints, endpointName);

      if (!endpointStr) {
        throw new Error('Endpoint not found: ' + endpointName);
      }

      paramMatch = endpointStr.match(endpointRegex);

      if (paramMatch && paramMatch.length) {
        for (i = 0; i < paramMatch.length; ++i) {
          key = paramMatch[i].replace(/\{|\}/g, '');

          if (!endpointParams[key]) {
            throw new Error('Endpoint Parameter not matched');
          }

          endpointStr = endpointStr.replace('{' + key + '}', endpointParams[key]);
        }
      }

      return endpointStr;
    }
  }, {
    key: "restUrl",
    value: function () {
      var _restUrl = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(method, url, dataPayload) {
        var headerPayload,
            config,
            response,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                headerPayload = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
                method = method.toUpperCase();
                config = {
                  method: method,
                  url: url,
                  headers: headerPayload
                };

                if (method === 'GET' ? config.params = dataPayload : config.data = dataPayload) {//console.log(config);
                }

                _context.prev = 4;
                _context.next = 7;
                return axios__WEBPACK_IMPORTED_MODULE_4___default()(config);

              case 7:
                response = _context.sent;
                return _context.abrupt("return", Promise.resolve(response));

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0);
                return _context.abrupt("return", Promise.reject(_context.t0));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }));

      function restUrl(_x, _x2, _x3) {
        return _restUrl.apply(this, arguments);
      }

      return restUrl;
    }()
  }, {
    key: "rest",
    value: function rest(method, endpointName, endpointParams, dataPayload) {
      var headerPayload = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var endpointBase = arguments.length > 5 ? arguments[5] : undefined;
      // CSRF Token to send back to UI server

      /* ajaxPayload.headers = ajaxPayload.headers || {};*/

      /* if(frameworkGlobals.isServer) {
      	headerPayload = frameworkGlobals.csrfToken;
      }*/
      // if(!frameworkGlobals.isServer) {
      endpointBase = 'path'; // }

      var endpointStr = this.buildEndpoint(endpointName, endpointParams);
      var url = endpointBase === 'path' ? "".concat(api.prefix).concat(endpointStr) : "".concat(this.apiURL).concat(endpointStr);

      if (frameworkGlobals.isServer) {
        var contextService = __webpack_require__(77).default;

        url = "".concat(contextService.get('request:hostname')).concat(url);
        headerPayload = Object.assign(headerPayload, {
          'Cookie': "sid=".concat(contextService.get('request:cookie_sid'), ";country=").concat(contextService.get('request:country')),
          'clientip': contextService.get('request:visitorIP')
        });
      } else {
        var csrf = react_cookie__WEBPACK_IMPORTED_MODULE_5___default.a.load('csrf-token', {
          path: '/'
        });
        headerPayload = Object.assign(headerPayload, {
          'clientip': frameworkGlobals.visitorIP,
          'csrf-token': csrf
        });
      }

      return this.restUrl(method, url, dataPayload, headerPayload);
    }
  }, {
    key: "postFile",
    value: function postFile(endpointName, endpointParams, formData) {
      var ajaxPayload = {
        cache: false,
        contentType: false,
        processData: false
      };
      return this.post(endpointName, endpointParams, formData, headerPayload);
    }
  }, {
    key: "post",
    value: function post(endpointName, endpointParams, payload) {
      var headerPayload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var endpointBase = arguments.length > 4 ? arguments[4] : undefined;
      return this.rest('post', endpointName, endpointParams, payload, headerPayload, endpointBase);
    }
  }, {
    key: "put",
    value: function put(endpointName, endpointParams, payload) {
      var headerPayload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var endpointBase = arguments.length > 4 ? arguments[4] : undefined;
      headerPayload.headers = headerPayload.headers || {};
      headerPayload.headers['X-Http-Method-Overwrite'] = 'put';
      return this.rest('post', endpointName, endpointParams, payload, headerPayload, endpointBase);
    }
  }, {
    key: "patch",
    value: function patch(endpointName, endpointParams, payload) {
      var headerPayload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var endpointBase = arguments.length > 4 ? arguments[4] : undefined;
      headerPayload.headers = headerPayload.headers;
      headerPayload.headers['X-Http-Method-Overwrite'] = 'patch';
      return this.rest('post', endpointName, endpointParams, payload, headerPayload, endpointBase);
    }
  }, {
    key: "get",
    value: function get(endpointName, endpointParams, payload) {
      var headerPayload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var endpointBase = arguments.length > 4 ? arguments[4] : undefined;
      return this.rest('get', endpointName, endpointParams, payload, headerPayload, endpointBase);
    }
  }, {
    key: "delete",
    value: function _delete(endpointName, endpointParams, payload) {
      var headerPayload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var endpointBase = arguments.length > 4 ? arguments[4] : undefined;
      // headerPayload.headers = headerPayload.headers;
      // headerPayload.headers['X-Http-Method-Overwrite'] = 'delete';
      return this.rest('delete', endpointName, endpointParams, payload, headerPayload, endpointBase);
    }
  }]);

  return ApiBridge;
}();

/* harmony default export */ __webpack_exports__["a"] = (new ApiBridge());

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Module defining a simple interface for setting and getting context objects on a domain.
 * A connect middleware allows wrapping requests in a domain and setting/getting values
 * on the active domain object.
 * @module {Object} request-context
 * @requires domain
 */
var domain = __webpack_require__(78);
/**
 * The ContextService provides the middleware and context accessor methods
 * @type {Object}
 */


/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * Wrap the request/response loop in a namespace wrapper (by using node's domain system).
   * All following functions will be run in the created namespace. Returns a function
   * function that can be used as connect middleware.
   * @type {Function}
  	 * @params {String} name - The name of the namespace to create
   *
   */
  middleware: contextMiddleware,

  /**
   * Set the context for a given name or path.
   * @param {String} name - The name of the context
   * @param {*} value - The value to set
   */
  setContext: setContext,

  /**
   * Alias for the setContext method.
   * @param {String} name - The name of the context
   * @param {*} value - The value to set
   */
  set: setContext,

  /**
   * Return the context or a context variable for a name or path.
   * @param {String} name - The name or path of the context or context property to retrieve
   * @returns {undefined|*} The context for the given specifier or null if no such name could be found
   */
  getContext: getContext,

  /**
   * Alias for the getContext method.
   * @param {String} name - The name or path of the context or context property to retrieve
   * @returns {undefined|*} The context for the given specifier or null if no such name could be found
   */
  get: getContext
});
/**
 * Return the context for a name.
 * @api private
 * @param {String} name - The name of the context to retrieve
 * @param {domain} [current] - A domain object to retrieve the context object from
 * @returns {*} The context for the given name
 */

function getContext(name, current) {
  var context = getCurrent(current);

  if (!context) {
    return undefined;
  }

  return getPropertyForPath(context, name);
}
/**
 * Initiates the context object on the provided domain
 * @param domain - A domain object to initialize the context object on
 * @returns {Object|*}
 */


function initContext(domain) {
  if (!domain) {
    throw new Error('No domain found when initializing context');
  }

  domain.__$cntxt__ = Object.create(null);
  return domain.__$cntxt__;
}
/**
 * Set the context for a given name
 * @api private
 * @param {String} name - The name of the context
 * @param {*} value - The value to set
 * @param {domain} [current] - A domain object to retrieve the context object from
 * @throws Error
 */


function setContext(name, value, current) {
  var context = getCurrent(current);

  if (!context) {
    throw new Error('No active context found to set property ' + name);
  }

  setPropertyForPath(context, name, value);
}
/**
 * Wrap the request/response loop in a namespace wrapper (by using node's domain system).
 * @api private
 * @param {String} namespace - The name of the namespace to create
 * @returns {Function} A function that can be used as request middleware. Following functions
 * will be run in the created namespace.
 */


function contextMiddleware(namespace) {
  if (!namespace) {
    throw new Error('No namespace specified!');
  }

  return function runInContextMiddleware(req, res, next) {
    // We want multiple request-context consumers to use the same domain
    // context object rather than creating a bunch of nested domains.
    // Their namespaces should be sufficient to keep each consumer's
    // data separate from the others.
    if (domain.active && domain.active.__$cntxt__) {
      setContext(namespace, Object.create(null), domain.active);
      next();
      return;
    }

    var d = domain.create();
    d.add(req);
    d.add(res);
    d.on('error', handleError);
    initContext(d);
    setContext(namespace, Object.create(null), d);
    d.run(next);

    function handleError(err) {
      if (!res._header) {
        res.setHeader('Connection', 'close');
      }

      res.end();
      next(err);
    }
  };
}
/**
 * Get the current active domain context object
 * @api private
 * @param {domain} [current] - A domain object the context container should be looked upon
 * @returns {null|Object}
 */


function getCurrent(current) {
  if (!current) {
    current = domain.active;
  } // no active domain found


  if (!current || !current.__$cntxt__) {
    return null;
  }

  return current.__$cntxt__;
}
/**
 * Get the object property for a given path divided by dots
 * @api private
 * @param {Object} obj - The object to query
 * @param {String} path - The objects property path divided by dots
 * @returns {*}
 */


function getPropertyForPath(obj, path) {
  if (obj && path) {
    var arr = normalizePathArray(path);

    while (arr.length) {
      if (!(obj = obj[arr.shift()])) {
        break;
      }
    }
  }

  return obj;
}
/**
 * Set the object property for a given path divided by dots
 * @api private
 * @param {Object} obj - The object to modify
 * @param {String} path - The objects property path divided by dots
 * @param {*} value - The value to set on the objects path
 * @returns {*}
 */


function setPropertyForPath(obj, path, value) {
  var arr = normalizePathArray(path);
  var len = arr.length - 1;

  for (var i = 0; i < len; i += 1) {
    if (typeof obj[arr[i]] === 'undefined') {
      // create a new object container for undefined paths
      obj[arr[i]] = {};
    }

    obj = obj[arr[i]];
  }

  obj[arr[len]] = value;
}
/**
 * Normalize the namespace of a path by replacing all ':' to '.'.
 * @api private
 * @param {String} path - The context object property path divided by dots
 * @returns {*}
 */


function normalizePathArray(path) {
  return path.replace(':', '.').split('.');
}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("domain");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("open");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("express-useragent");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("express-static-gzip");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85);
/* harmony import */ var lodash_findIndex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_findIndex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_1__);

 //import Logger from '../../shared/utils/logger/logger';

var messageTypes = __webpack_require__(35).default.CHAT_MESSAGE_TYPES; // as we building server files
// adding instance path statically
//const logger = Logger.getInstance('middleware/fetchdata');
//https://github.com/NAWilson9/socket.io-utils/blob/master/socket.io-utils.js


var handleReconnect = function handleReconnect(io, socket, user) {
  var timeoutId = disconnectedUsers[user.id];

  if (timeoutId) {
    clearTimeout(timeoutId); // logger.info({ user }, 'User refreshed')

    return socket.emit(messageTypes.joinRequested, user);
  }

  addUser(io, socket, user);
};

function onDisconnect(io, socket) {// console.log(socket.id);
}

function onJoinRoom(io, socket, data) {
  console.log(data);
  socket.join(data.room);
}

function onLoginJoinRoom(io, socket, data) {
  // const event = messageTypes.chatStatus;
  socket.join(data.userRoom);
  io.to(data.room).emit('chatStatus', {
    login: data.login,
    userID: data.userRoom.split(':')[1]
  });
}

function onMessageAdded(io, socket, data) {
  var clientID = data.user.id;
  var room = "USER:".concat(clientID);
  var pdpRoom = "PDP:".concat(clientID);
  var event = messageTypes.messageAdded;
  var user = Object.assign({}, data.user);
  data.user = data.from;
  data.from = user;
  socket.join(pdpRoom);
  io.to(room).emit(event, data);
}

function onTypingStarted(io, socket, data) {
  var event = messageTypes.userStartedTyping;
  var clientID = data.user.id;
  var room = "USER:".concat(clientID);
  var user = Object.assign({}, data.user);
  data.user = data.from;
  data.from = user;
  io.to(room).emit(event, data);
}

var addListenersToSocket = function addListenersToSocket(io, socket) {
  socket.user = {};
  console.log('asdasdas'); //logger.info("api.socket", "socket initialized & listeners added",{});
  // saves having to type "socket.request.session.user" everywhere
  // console.log(socket.request.session);

  /* if(socket.request.session && socket.request.session.user) {
  	const { id, name } = JSON.parse(socket.request.session.user);
  	socket.user = {
  		id : id,
  		name : name
  	};
  	console.log(socket.user);
  }*/

  /* if (user) {
  	handleReconnect(io, socket, user)
  }*/
  // console.log(io);

  socket.on(messageTypes.messageAdded, function (data) {
    return onMessageAdded(io, socket, data);
  });
  socket.on(messageTypes.userStartedTyping, function (data) {
    return onTypingStarted(io, socket, data);
  });
  socket.on(messageTypes.joinRoom, function (data) {
    return onJoinRoom(io, socket, data);
  });
  socket.on(messageTypes.loginJoinRoom, function (data) {
    return onLoginJoinRoom(io, socket, data);
  });
  socket.on('disconnect', function () {
    return onDisconnect(io, socket);
  });
};

var init = function init(io) {
  io.on('connection', function (socket) {
    return addListenersToSocket(io, socket);
  });
};

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("lodash/findIndex");

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_4__);




/*import BaseService from '../services/BaseService';
 import buildEndpoint, { getHeaderPayload }  from '../helpers/endpointbuilder';
 import { isUserLoggedIn, getSessionData } from '../helpers/sessionUtils';
 import puppeteer from 'puppeteer';*/

var delay = __webpack_require__(87);



var pool = __webpack_require__(88);

var _require = __webpack_require__(91),
    Cluster = _require.Cluster; // as we building server files
// adding instance path statically
//https://www.codementor.io/@saurabharch/web-push-notification-full-stack-application-with-node-js-restful-api-nnonfcilg


var application = express__WEBPACK_IMPORTED_MODULE_3___default.a.Router();
var io, roomId, scrapeSource;

var arrayToVal = function arrayToVal(val) {
  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(val) === 'object') {
    return val.join('||');
  } else {
    return val;
  }
};

var flagVal = function flagVal(val) {
  return val === 'unprocessed' ? 'no' : 'yes';
};

application.use(function (err, req, res, next) {
  next();
});
application.get('/api/v1/companies',
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
    var _req$query$processed, processed, client;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query$processed = req.query.processed, processed = _req$query$processed === void 0 ? 'unprocessed' : _req$query$processed;
            _context.prev = 1;
            _context.next = 4;
            return pool.query("select * from entities where CompanyName !='' and processed='".concat(flagVal(processed), "'"));

          case 4:
            client = _context.sent;
            console.log(client);
            res.send(client);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).send(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
application.get('/api/v1/people',
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
    var _req$query$processed2, processed, people;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$query$processed2 = req.query.processed, processed = _req$query$processed2 === void 0 ? 'unprocessed' : _req$query$processed2;
            _context2.prev = 1;
            _context2.next = 4;
            return pool.query("select * from company_people where person_contact_processed='".concat(flagVal(processed), "'"));

          case 4:
            people = _context2.sent;
            console.log(people);
            res.send(people);
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500).send(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
application.get('/api/v1/people/:id',
/*#__PURE__*/
function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(req, res) {
    var id, person;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return pool.query("select person_name as name, person_phone as phone, person_email as email, person_roles as roles, person_address as fullAddresses, person_status as status, person_contact_processed as isProcessed from company_people where company_people_id=\"".concat(id, "\""));

          case 4:
            person = _context3.sent;
            res.send(person);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(500).send(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
application.get('/api/v1/company/:id',
/*#__PURE__*/
function () {
  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(req, res) {
    var id, client, logData, companies, companyPeople;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return pool.query("select * from entities where EntityID=\"".concat(id, "\""));

          case 4:
            client = _context4.sent;
            _context4.prev = 5;
            _context4.next = 8;
            return pool.query("SELECT * FROM scrapeActivityLog t\n\t\t\t WHERE companyID=\"".concat(id, "\" and date_added = (\n\t\t\t SELECT max(date_added)\n\t\t\t FROM scrapeActivityLog\n\t\t\t WHERE companyID=\"").concat(id, "\" and t.source = source\n\t\t\t )"));

          case 8:
            logData = _context4.sent;
            client[0]['scrapeLog'] = logData;
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](5);
            console.log(_context4.t0);
            res.status(500).send(_context4.t0);

          case 16:
            _context4.prev = 16;
            _context4.next = 19;
            return pool.query("select name, phone, address as fullAddresses, status from companies where companyId=\"".concat(id, "\""));

          case 19:
            companies = _context4.sent;
            client[0]['companyData'] = companies;
            _context4.next = 26;
            break;

          case 23:
            _context4.prev = 23;
            _context4.t1 = _context4["catch"](16);
            res.status(500).send(_context4.t1);

          case 26:
            _context4.prev = 26;
            _context4.next = 29;
            return pool.query("select person_name as name, person_phone as phone, person_email as email, person_roles as roles, person_address as fullAddresses, person_status as status from company_people where companyID=\"".concat(id, "\""));

          case 29:
            companyPeople = _context4.sent;
            client[0]['companyPeople'] = companyPeople;
            _context4.next = 36;
            break;

          case 33:
            _context4.prev = 33;
            _context4.t2 = _context4["catch"](26);
            res.status(500).send(_context4.t2);

          case 36:
            res.send(client[0]);
            _context4.next = 43;
            break;

          case 39:
            _context4.prev = 39;
            _context4.t3 = _context4["catch"](1);
            console.log(_context4.t3);
            res.status(500).send(_context4.t3);

          case 43:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 39], [5, 12], [16, 23], [26, 33]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
application.post('/api/v1/company/:id/people',
/*#__PURE__*/
function () {
  var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(req, res, next) {
    var id, dataList, delPersonResults, delCompanyResults, data, insertCompanyResult, insertValues, insertPeopleResult, updateResult;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            dataList = req.body;
            _context5.prev = 2;
            _context5.next = 5;
            return pool.query("DELETE FROM company_people WHERE companyId='".concat(id, "'"));

          case 5:
            delPersonResults = _context5.sent;
            _context5.next = 8;
            return pool.query("DELETE FROM companies WHERE companyId='".concat(id, "'"));

          case 8:
            delCompanyResults = _context5.sent;

            if (!dataList.company) {
              _context5.next = 14;
              break;
            }

            data = dataList.company;
            _context5.next = 13;
            return pool.query("INSERT INTO companies (\n\t\t\tcompanyID, \n\t\t\tname, \n\t\t\tphone, \n\t\t\tstatus, \n\t\t\taddress) \n\t\tVALUES ('".concat(id, "', '").concat(data.name, "', '").concat(data.phone, "', '").concat(data.status, "', '").concat(data.fullAddresses, "')"));

          case 13:
            insertCompanyResult = _context5.sent;

          case 14:
            if (!dataList.people) {
              _context5.next = 31;
              break;
            }

            insertValues = dataList.people.map(function (data) {
              return "('".concat(id, "', '").concat(data.name, "', '").concat(data.email, "', '").concat(data.phone, "', '").concat(data.status, "', '").concat(data.fullAddresses, "', '").concat(arrayToVal(data.roles), "')");
            });
            _context5.next = 18;
            return pool.query("INSERT INTO company_people (\n\t\t\tcompanyID, \n\t\t\tperson_name, \n\t\t\tperson_email, \n\t\t\tperson_phone, \n\t\t\tperson_status, \n\t\t\tperson_address, \n\t\t\tperson_roles) \n\t\tVALUES ".concat(insertValues.join(', ')));

          case 18:
            insertPeopleResult = _context5.sent;
            _context5.prev = 19;
            _context5.next = 22;
            return pool.query("UPDATE entities SET processed='yes' WHERE EntityID='".concat(id, "'"));

          case 22:
            updateResult = _context5.sent;
            res.send(updateResult);
            _context5.next = 29;
            break;

          case 26:
            _context5.prev = 26;
            _context5.t0 = _context5["catch"](19);
            res.status(500).send(_context5.t0);

          case 29:
            _context5.next = 32;
            break;

          case 31:
            res.send(delPersonResults);

          case 32:
            _context5.next = 38;
            break;

          case 34:
            _context5.prev = 34;
            _context5.t1 = _context5["catch"](2);
            console.log(_context5.t1);
            res.status(500).send(_context5.t1);

          case 38:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 34], [19, 26]]);
  }));

  return function (_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());
application.get('/api/v1/rungrabber/:id',
/*#__PURE__*/
function () {
  var _ref6 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(req, res) {
    var _req$query, source, name, state, sid, id, data, corporationwiki, google;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$query = req.query, source = _req$query.source, name = _req$query.name, state = _req$query.state, sid = _req$query.sid;
            id = req.params.id;
            io = req.app.get('socketio');
            roomId = sid;
            scrapeSource = source;
            _context6.prev = 5;
            _context6.next = 8;
            return getCompany({
              name: name,
              state: state,
              io: io,
              sid: sid
            });

          case 8:
            data = _context6.sent;
            corporationwiki = data.corporationwiki, google = data.google;
            console.log(data);

            if (corporationwiki) {
              pool.query("INSERT into scrapeActivityLog (companyID, logData, source, date_added) values (".concat(id, ",'").concat(JSON.stringify(corporationwiki), "', 'corporationwiki', UNIX_TIMESTAMP(CURRENT_TIME()))"));
            }

            if (google) {
              pool.query("INSERT into scrapeActivityLog (companyID, logData, source, date_added) values (".concat(id, ",'").concat(JSON.stringify(google), "', 'google', UNIX_TIMESTAMP(CURRENT_TIME()))"));
            }

            res.send(data);
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](5);
            res.status(500).send({
              error: _context6.t0
            });

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[5, 16]]);
  }));

  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}());

function waitForStdProcess(_x14, _x15) {
  return _waitForStdProcess.apply(this, arguments);
}

function _waitForStdProcess() {
  _waitForStdProcess = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(_ref11, timer) {
    var _ref11$msg, msg, _ref11$className, className, _ref11$data, data, _ref11$source, source, P, x, oneIteration, iterationPerSec, totalItereationPerTimer, i;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _ref11$msg = _ref11.msg, msg = _ref11$msg === void 0 ? '' : _ref11$msg, _ref11$className = _ref11.className, className = _ref11$className === void 0 ? '' : _ref11$className, _ref11$data = _ref11.data, data = _ref11$data === void 0 ? '' : _ref11$data, _ref11$source = _ref11.source, source = _ref11$source === void 0 ? '' : _ref11$source;
            P = ["\\", "|", "/", "-"];
            x = 0;
            oneIteration = 250; // milli sec

            iterationPerSec = 1000 / oneIteration; // oneIteration

            totalItereationPerTimer = timer * iterationPerSec;
            process.stdout.write(" " + msg); //do send message

            io.to(roomId).emit('scrapeLog', {
              source: source,
              log: {
                msg: msg,
                className: className,
                data: data
              }
            });
            i = 1;

          case 9:
            if (!(i <= totalItereationPerTimer)) {
              _context10.next = 17;
              break;
            }

            process.stdout.write("\r" + P[x++]);
            x = x % P.length;
            _context10.next = 14;
            return delay(Number(1) * oneIteration);

          case 14:
            i++;
            _context10.next = 9;
            break;

          case 17:
            process.stdout.write('\r\n');

          case 18:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _waitForStdProcess.apply(this, arguments);
}

var googleCrawl =
/*#__PURE__*/
function () {
  var _ref7 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(_ref8) {
    var page, data, url, companyName, state, onSuccess, onError, dataObj, dataToSend;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            page = _ref8.page, data = _ref8.data;
            url = data.url, companyName = data.companyName, state = data.state, onSuccess = data.onSuccess, onError = data.onError;
            _context7.prev = 2;
            _context7.next = 5;
            return waitForStdProcess({
              msg: "Search For ".concat(companyName, ", ").concat(state.toUpperCase()),
              className: "company-name",
              source: 'google'
            }, 1);

          case 5:
            _context7.next = 7;
            return page.goto(url, {
              waitUntil: ['load', 'domcontentloaded']
            });

          case 7:
            _context7.next = 9;
            return page.evaluate(function () {
              var googleEle = document.querySelectorAll('#search .rc');
              return Object.values(googleEle).map(function (el) {
                var titleLink = el.querySelector('.r > a');
                var desc = el.querySelector('.s .st');
                return {
                  title: titleLink.innerText.replace('\n', '').replace(/"/g, '\\"').replace(/(?:\\[rn]|[\r\n])/g, " » ").trim(),
                  link: titleLink.href,
                  desc: desc.innerText.replace(/"/g, '\\"').replace(/(?:\\[rn]|[\r\n])/g, " ").trim()
                };
              });
            });

          case 9:
            dataToSend = _context7.sent;
            _context7.next = 12;
            return waitForStdProcess({
              msg: "Result Found For ".concat(companyName, ", ").concat(state.toUpperCase()),
              className: "company-name google-log",
              source: 'google',
              data: dataToSend
            }, 1);

          case 12:
            onSuccess(dataToSend);
            _context7.next = 18;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](2);
            onError(_context7.t0);

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 15]]);
  }));

  return function googleCrawl(_x16) {
    return _ref7.apply(this, arguments);
  };
}(); // We don't define a task and instead use own functions


var corporation =
/*#__PURE__*/
function () {
  var _ref9 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(_ref10) {
    var page, data, companyName, state, url, onSuccess, onError, jsonData, peopleData;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            page = _ref10.page, data = _ref10.data;
            companyName = data.companyName, state = data.state, url = data.url, onSuccess = data.onSuccess, onError = data.onError;
            jsonData = [];
            peopleData = [];
            _context9.prev = 4;
            return _context9.delegateYield(
            /*#__PURE__*/
            _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8() {
              var resultsFound, itemsData, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, address, company, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _company, peopleLinks, fullAddress, status, phone, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, people, _fullAddress, indexPerson, _status, _phone;

              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return waitForStdProcess({
                        msg: "Search For ".concat(companyName),
                        className: "company-name",
                        source: 'corporationwiki'
                      }, 1);

                    case 2:
                      _context8.next = 4;
                      return page.goto(url, {
                        waitUntil: ['load', 'domcontentloaded']
                      });

                    case 4:
                      _context8.next = 6;
                      return page.waitFor("#results-stats");

                    case 6:
                      _context8.next = 8;
                      return page.$eval('#results-stats', function (el) {
                        return el.innerText;
                      });

                    case 8:
                      resultsFound = _context8.sent;

                      if (!(resultsFound === '0 Results Found')) {
                        _context8.next = 11;
                        break;
                      }

                      throw 'no companies found';

                    case 11:
                      _context8.next = 13;
                      return page.waitFor("#entity_type_facets_container input[type=checkbox]");

                    case 13:
                      _context8.next = 15;
                      return page.click("#entity_type_facets_container input[type=checkbox]");

                    case 15:
                      _context8.next = 17;
                      return waitForStdProcess({
                        msg: 'Enable Filters',
                        source: 'corporationwiki'
                      }, 3);

                    case 17:
                      _context8.next = 19;
                      return page.select('#states_facets_container select', state);

                    case 19:
                      _context8.next = 21;
                      return waitForStdProcess({
                        msg: '',
                        className: "filters",
                        source: 'corporationwiki'
                      }, 5);

                    case 21:
                      _context8.next = 23;
                      return page.$$('.list-group-item');

                    case 23:
                      itemsData = _context8.sent;
                      _context8.next = 26;
                      return waitForStdProcess({
                        msg: "Found ".concat(itemsData.length, " Companies"),
                        className: "company-length",
                        source: 'corporationwiki'
                      }, 1);

                    case 26:
                      i = 0;
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context8.prev = 30;
                      _iterator = itemsData[Symbol.iterator]();

                    case 32:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context8.next = 46;
                        break;
                      }

                      item = _step.value;
                      _context8.next = 36;
                      return item.$eval('.col-xs-12.col-lg-5', function (el) {
                        return el.innerText;
                      });

                    case 36:
                      address = _context8.sent;
                      _context8.next = 39;
                      return item.$eval('.ellipsis', function (company) {
                        return {
                          name: company.innerText,
                          link: company.getAttribute('href')
                        };
                      });

                    case 39:
                      company = _context8.sent;
                      company['address'] = address.split('\n')[1].trim();
                      jsonData.push(company);
                      i++;

                    case 43:
                      _iteratorNormalCompletion = true;
                      _context8.next = 32;
                      break;

                    case 46:
                      _context8.next = 52;
                      break;

                    case 48:
                      _context8.prev = 48;
                      _context8.t0 = _context8["catch"](30);
                      _didIteratorError = true;
                      _iteratorError = _context8.t0;

                    case 52:
                      _context8.prev = 52;
                      _context8.prev = 53;

                      if (!_iteratorNormalCompletion && _iterator.return != null) {
                        _iterator.return();
                      }

                    case 55:
                      _context8.prev = 55;

                      if (!_didIteratorError) {
                        _context8.next = 58;
                        break;
                      }

                      throw _iteratorError;

                    case 58:
                      return _context8.finish(55);

                    case 59:
                      return _context8.finish(52);

                    case 60:
                      _context8.next = 62;
                      return waitForStdProcess({
                        msg: '',
                        data: jsonData,
                        className: "companies",
                        source: 'corporationwiki'
                      }, 1);

                    case 62:
                      //await page.waitFor(3000);
                      //get full company address from company details page
                      i = 0;
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      _context8.prev = 66;
                      _iterator2 = jsonData[Symbol.iterator]();

                    case 68:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context8.next = 109;
                        break;
                      }

                      _company = _step2.value;
                      _context8.next = 72;
                      return waitForStdProcess({
                        msg: "Fetching People for ".concat(_company.name, ", ").concat(_company.address),
                        className: "company-fetching",
                        source: 'corporationwiki'
                      }, 1);

                    case 72:
                      _context8.next = 74;
                      return page.goto(_company.link, {
                        waitUntil: ['load', 'domcontentloaded']
                      });

                    case 74:
                      _context8.next = 76;
                      return page.evaluate(function (selector) {
                        var rows = document.querySelectorAll(selector);
                        return Object.values(rows).map(function (row) {
                          var peopleEle = row.querySelector('td:nth-child(1) > a');
                          var labelEle = row.querySelectorAll('.role-label');
                          var peopleRoles = Object.values(labelEle).map(function (ele) {
                            return ele.innerText;
                          });
                          return {
                            name: peopleEle.childNodes[2].nodeValue.trim(),
                            link: peopleEle.getAttribute('href'),
                            roles: peopleRoles
                          };
                        });
                      }, '#people > div.card.min-card-height > div > div > table > tbody > tr');

                    case 76:
                      jsonData[i]['people'] = _context8.sent;
                      peopleLinks = jsonData[i]['people'].map(function (person, key) {
                        return {
                          id: i,
                          personIndex: key,
                          link: person.link
                        };
                      });
                      peopleData = peopleData.concat(peopleLinks);
                      _context8.next = 81;
                      return page.$$eval('.list-group-item span[itemprop="address"]', function (addresses) {
                        return addresses.map(function (address) {
                          return address.innerText;
                        });
                      });

                    case 81:
                      fullAddress = _context8.sent;
                      jsonData[i]['fullAddresses'] = fullAddress;
                      _context8.prev = 83;
                      _context8.next = 86;
                      return page.$eval('#header-status .label-success', function (el) {
                        return el && el.innerText;
                      });

                    case 86:
                      status = _context8.sent;
                      jsonData[i]['status'] = status;
                      _context8.next = 92;
                      break;

                    case 90:
                      _context8.prev = 90;
                      _context8.t1 = _context8["catch"](83);

                    case 92:
                      _context8.prev = 92;
                      _context8.next = 95;
                      return page.$eval('#phone .phone-number', function (el) {
                        return el && el.innerText;
                      });

                    case 95:
                      phone = _context8.sent;
                      jsonData[i]['phone'] = phone;
                      _context8.next = 101;
                      break;

                    case 99:
                      _context8.prev = 99;
                      _context8.t2 = _context8["catch"](92);

                    case 101:
                      _context8.next = 103;
                      return waitForStdProcess({
                        msg: "Full Address - ".concat(jsonData[i]['fullAddresses']),
                        className: "company-address",
                        source: 'corporationwiki'
                      }, 1);

                    case 103:
                      _context8.next = 105;
                      return waitForStdProcess({
                        msg: "",
                        className: "company-people",
                        data: jsonData[i]['people'],
                        source: 'corporationwiki'
                      }, 3);

                    case 105:
                      i++;

                    case 106:
                      _iteratorNormalCompletion2 = true;
                      _context8.next = 68;
                      break;

                    case 109:
                      _context8.next = 115;
                      break;

                    case 111:
                      _context8.prev = 111;
                      _context8.t3 = _context8["catch"](66);
                      _didIteratorError2 = true;
                      _iteratorError2 = _context8.t3;

                    case 115:
                      _context8.prev = 115;
                      _context8.prev = 116;

                      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                      }

                    case 118:
                      _context8.prev = 118;

                      if (!_didIteratorError2) {
                        _context8.next = 121;
                        break;
                      }

                      throw _iteratorError2;

                    case 121:
                      return _context8.finish(118);

                    case 122:
                      return _context8.finish(115);

                    case 123:
                      //get person full address
                      i = 0;
                      _context8.next = 126;
                      return waitForStdProcess({
                        msg: "Fetch People addresses",
                        className: "company-people-details-title",
                        source: 'corporationwiki'
                      }, 1);

                    case 126:
                      _iteratorNormalCompletion3 = true;
                      _didIteratorError3 = false;
                      _iteratorError3 = undefined;
                      _context8.prev = 129;
                      _iterator3 = peopleData[Symbol.iterator]();

                    case 131:
                      if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                        _context8.next = 165;
                        break;
                      }

                      people = _step3.value;
                      _context8.next = 135;
                      return page.goto(people.link);

                    case 135:
                      _context8.next = 137;
                      return page.$$eval('.list-group-item span[itemprop="address"]', function (addresses) {
                        return addresses.map(function (address) {
                          return address.innerText;
                        });
                      });

                    case 137:
                      _fullAddress = _context8.sent;
                      indexPerson = jsonData[people.id]['people'][people.personIndex];
                      _context8.prev = 139;
                      _context8.next = 142;
                      return page.$eval('#header-status .label-success', function (el) {
                        return el && el.innerText;
                      });

                    case 142:
                      _status = _context8.sent;
                      indexPerson['status'] = _status;
                      _context8.next = 148;
                      break;

                    case 146:
                      _context8.prev = 146;
                      _context8.t4 = _context8["catch"](139);

                    case 148:
                      _context8.prev = 148;
                      _context8.next = 151;
                      return page.$eval('#phone .phone-number', function (el) {
                        return el && el.innerText;
                      });

                    case 151:
                      _phone = _context8.sent;
                      indexPerson['phone'] = _phone;
                      _context8.next = 157;
                      break;

                    case 155:
                      _context8.prev = 155;
                      _context8.t5 = _context8["catch"](148);

                    case 157:
                      indexPerson['id'] = ++i;
                      indexPerson['fullAddresses'] = _fullAddress;
                      jsonData[people.id]['people'][people.personIndex] = indexPerson;
                      _context8.next = 162;
                      return waitForStdProcess({
                        msg: '',
                        className: "company-people-data",
                        data: indexPerson,
                        source: 'corporationwiki'
                      }, 3);

                    case 162:
                      _iteratorNormalCompletion3 = true;
                      _context8.next = 131;
                      break;

                    case 165:
                      _context8.next = 171;
                      break;

                    case 167:
                      _context8.prev = 167;
                      _context8.t6 = _context8["catch"](129);
                      _didIteratorError3 = true;
                      _iteratorError3 = _context8.t6;

                    case 171:
                      _context8.prev = 171;
                      _context8.prev = 172;

                      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                        _iterator3.return();
                      }

                    case 174:
                      _context8.prev = 174;

                      if (!_didIteratorError3) {
                        _context8.next = 177;
                        break;
                      }

                      throw _iteratorError3;

                    case 177:
                      return _context8.finish(174);

                    case 178:
                      return _context8.finish(171);

                    case 179:
                      onSuccess(jsonData);

                    case 180:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, null, [[30, 48, 52, 60], [53,, 55, 59], [66, 111, 115, 123], [83, 90], [92, 99], [116,, 118, 122], [129, 167, 171, 179], [139, 146], [148, 155], [172,, 174, 178]]);
            })(), "t0", 6);

          case 6:
            _context9.next = 11;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t1 = _context9["catch"](4);
            onError(_context9.t1);

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[4, 8]]);
  }));

  return function corporation(_x17) {
    return _ref9.apply(this, arguments);
  };
}();

function getCompany(_x18) {
  return _getCompany.apply(this, arguments);
}

function _getCompany() {
  _getCompany = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee14(_ref12) {
    var name, state, cluster, google, corporationwiki, corporationWikiPageUrl, googleUrl;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            name = _ref12.name, state = _ref12.state;
            _context14.next = 3;
            return Cluster.launch({
              concurrency: Cluster.CONCURRENCY_BROWSER,
              maxConcurrency: 2,
              timeout: 100 * 1000
              /*puppeteerOptions : {
              	headless : false
              }*/

            });

          case 3:
            cluster = _context14.sent;
            // Event handler to be called in case of problems
            cluster.on('taskerror',
            /*#__PURE__*/
            function () {
              var _ref13 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
              /*#__PURE__*/
              _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(err, data) {
                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        console.log("Error crawling ".concat(data, ": ").concat(err.message));
                        _context11.next = 3;
                        return cluster.idle();

                      case 3:
                        _context11.next = 5;
                        return cluster.close();

                      case 5:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));

              return function (_x19, _x20) {
                return _ref13.apply(this, arguments);
              };
            }());
            _context14.prev = 5;
            // corporation wiki
            corporationWikiPageUrl = encodeURI("https://www.corporationwiki.com/search/results?term=".concat(name));
            cluster.queue({
              url: corporationWikiPageUrl,
              companyName: name,
              state: state,
              onSuccess: function () {
                var _onSuccess = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
                /*#__PURE__*/
                _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee12(data) {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee12$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          corporationwiki = data; //done sending

                          _context12.next = 3;
                          return waitForStdProcess({
                            msg: 'done',
                            className: "company-name",
                            source: 'corporationwiki',
                            data: data
                          }, 1);

                        case 3:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _callee12);
                }));

                function onSuccess(_x21) {
                  return _onSuccess.apply(this, arguments);
                }

                return onSuccess;
              }(),
              onError: function onError(error) {
                console.log('error', error);
              }
            }, corporation);
            googleUrl = "https://www.google.com/search?q=".concat(name, ",").concat(state);
            cluster.queue({
              url: googleUrl,
              companyName: name,
              state: state,
              onSuccess: function () {
                var _onSuccess2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
                /*#__PURE__*/
                _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee13(data) {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          google = data;
                          _context13.next = 3;
                          return waitForStdProcess({
                            msg: 'done',
                            className: "company-name",
                            source: 'google',
                            data: data
                          }, 1);

                        case 3:
                        case "end":
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }));

                function onSuccess(_x22) {
                  return _onSuccess2.apply(this, arguments);
                }

                return onSuccess;
              }(),
              onError: function onError(error) {
                console.log('error', error);
              }
            }, googleCrawl);
            _context14.next = 12;
            return cluster.idle();

          case 12:
            _context14.next = 14;
            return cluster.close();

          case 14:
            return _context14.abrupt("return", Promise.resolve({
              corporationwiki: corporationwiki,
              google: google
            }));

          case 17:
            _context14.prev = 17;
            _context14.t0 = _context14["catch"](5);
            _context14.next = 21;
            return cluster.idle();

          case 21:
            _context14.next = 23;
            return cluster.close();

          case 23:
            return _context14.abrupt("return", Promise.reject(_context14.t0));

          case 24:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[5, 17]]);
  }));
  return _getCompany.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["a"] = (application);

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("delay");

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(89);

var mysql = __webpack_require__(90);

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'grabber'
}); // Ping database to check for common exception errors.

pool.getConnection(function (err, connection) {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }

    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }

    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) connection.release();
  return;
}); // Promisify for Node.js async/await.

pool.query = util.promisify(pool.query);
module.exports = pool;

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("puppeteer-cluster");

/***/ }),
/* 92 */,
/* 93 */,
/* 94 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ }),
/* 95 */,
/* 96 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),
/* 97 */,
/* 98 */
/***/ (function(module, exports) {

module.exports = require("lodash/filter");

/***/ }),
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, exports) {

module.exports = require("lodash/map");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("lodash/extend");

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("lodash/uniq");

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = require("lodash/concat");

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("lodash/isEmpty");

/***/ }),
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, exports) {

module.exports = require("react-data-table-component");

/***/ }),
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/***/ (function(module, exports) {

module.exports = require("react-tooltip");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 121 */,
/* 122 */
/***/ (function(module, exports) {

module.exports = require("lodash/forEach");

/***/ }),
/* 123 */,
/* 124 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),
/* 125 */,
/* 126 */,
/* 127 */
/***/ (function(module, exports) {

module.exports = require("lodash/values");

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = require("react-row-select-table/dist/Sync");

/***/ }),
/* 129 */,
/* 130 */
/***/ (function(module, exports) {

module.exports = require("@loadable/component");

/***/ }),
/* 131 */,
/* 132 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/get");

/***/ }),
/* 133 */,
/* 134 */,
/* 135 */
/***/ (function(module, exports) {

module.exports = require("kramed");

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = require("lodash/compact");

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */
/***/ (function(module, exports) {

module.exports = require("lodash/some");

/***/ }),
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */
/***/ (function(module, exports) {

module.exports = require("react-text-mask");

/***/ }),
/* 169 */,
/* 170 */
/***/ (function(module, exports) {

module.exports = require("react-date-picker");

/***/ }),
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */
/***/ (function(module, exports) {

module.exports = require("react-datetime");

/***/ }),
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */
/***/ (function(module, exports) {

module.exports = require("react-custom-scrollbars");

/***/ }),
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */
/***/ (function(module, exports) {

module.exports = require("lodash/sortBy");

/***/ }),
/* 212 */,
/* 213 */,
/* 214 */
/***/ (function(module, exports) {

module.exports = require("react-addons-create-fragment");

/***/ }),
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */
/***/ (function(module, exports) {

module.exports = require("lodash/isEqual");

/***/ }),
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */
/***/ (function(module, exports) {

module.exports = require("lodash/chunk");

/***/ }),
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */
/***/ (function(module, exports) {

module.exports = require("add-dom-event-listener");

/***/ })
/******/ ]);