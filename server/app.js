import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser 	from 'body-parser';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import config from 'config';
import renderer from './middleware/SSRMiddleware';
import contextService from './middleware/requestContext';
import open from 'open';
const useragent = require('express-useragent');
const app = express();
const server = require('http').createServer(app);
const expressStaticGzip = require('express-static-gzip');
const io = require('socket.io')(server);
const chat = require('./chat');

//set view engine
app.set('views', path.join(__dirname, 'templates'));

//disable express powered by
app.disable( 'x-powered-by' );

// initialize chat listener
/*chat.init(io);*/

// start middleware initialization
app.use(useragent.express());
app.use(contextService.middleware('request'));

// not for local dev
//adding header for workbox  SW scope  change
if(process.env.NODE_ENV !== 'local-dev') {
	app.use('*.(js|css|json|svg|eot|ttf|woff)', (req, res, next)=>{
		res.header('Service-Worker-Allowed', '/');
		next();
	});
}

// static file serving with compression
app.use(compression());
app.use("/static", expressStaticGzip("public/static", {
	enableBrotli: true,
	orderPreference: ['br', 'gz']
}));

app.use(cookieParser());
app.use(bodyParser.json({limit: '10mb', extended: true})) // for parsing application/json
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))// for parsing application/x-www-form-urlencoded
app.use(express.query());

/*// create fake window object
global.window = new Object();
global.document = new Object({
	createElement : ()=>{}
});*/

//serve fevicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).send({nope: true}));

// initialize chat listener
//chat.init(io);
app.set('socketio', io);
io.on('connection', socket => {
	//socket.emit('recivesocketId', socket.id) // send each client their socket id
	//onJoinRoom(io, socket, data)
	socket.on('joinRoom', (data) => {
		socket.join(data.room);
		socket.emit('recivesocketId', data.room)
	});

});

import application from './routes/application';

app.use(application);

// SSR Middleware
app.use(renderer);

const PORT = process.env.PORT || 5002;

frameworkGlobals.port = PORT;

server.listen(PORT, async() => {
	console.log(`server Listening on port ${PORT}`,  "environment",  process.env.NODE_ENV);
	console.log(`Application Running`,  " ",  `http://localhost:${PORT}`);
	await open(`http://localhost:${PORT}/?type=unprocessed`);
});


