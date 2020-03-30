import { findIndex, find } from 'lodash';
//import Logger from '../../shared/utils/logger/logger';

const { CHAT_MESSAGE_TYPES : messageTypes } = require('../../shared/utils/app-constants').default;
// as we building server files
// adding instance path statically
//const logger = Logger.getInstance('middleware/fetchdata');


//https://github.com/NAWilson9/socket.io-utils/blob/master/socket.io-utils.js

const handleReconnect = (io, socket, user) => {
	const timeoutId = disconnectedUsers[ user.id ];

	if (timeoutId) {
		clearTimeout(timeoutId);
		// logger.info({ user }, 'User refreshed')
		return socket.emit(messageTypes.joinRequested, user);
	}
	addUser(io, socket, user);
};

function onDisconnect(io, socket) {
	// console.log(socket.id);
}

function onJoinRoom(io, socket, data) {
	console.log(data);
	socket.join(data.room);
}

function onLoginJoinRoom(io, socket, data) {
	// const event = messageTypes.chatStatus;
	socket.join(data.userRoom);
	io.to(data.room).emit('chatStatus' ,{
		login : data.login,
		userID : data.userRoom.split(':')[1]
	});
}

function onMessageAdded(io, socket, data) {
	const clientID = data.user.id;
	const room = `USER:${clientID}`;
	const pdpRoom = `PDP:${clientID}`;
	const event = messageTypes.messageAdded;
	const user = Object.assign({},data.user);
	data.user = data.from;
	data.from = user;
	socket.join(pdpRoom);
	io.to(room).emit(event ,data);
}

function onTypingStarted(io, socket, data) {
	const event = messageTypes.userStartedTyping;
	const clientID = data.user.id;
	const room = `USER:${clientID}`;
	const user = Object.assign({},data.user);
	data.user = data.from;
	data.from = user;
	io.to(room).emit(event ,data);
}


const addListenersToSocket = (io, socket) => {
	socket.user = {};
	console.log('asdasdas');
	//logger.info("api.socket", "socket initialized & listeners added",{});
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
	socket.on(messageTypes.messageAdded, (data) => onMessageAdded(io, socket, data));
	socket.on(messageTypes.userStartedTyping, (data) => onTypingStarted(io, socket, data));
	socket.on(messageTypes.joinRoom, (data) => onJoinRoom(io, socket, data));
	socket.on(messageTypes.loginJoinRoom, (data) => onLoginJoinRoom(io, socket, data));
	socket.on('disconnect', () => onDisconnect(io, socket));

};

export const init = (io) => {
	io.on('connection', (socket) => addListenersToSocket(io, socket));
};
