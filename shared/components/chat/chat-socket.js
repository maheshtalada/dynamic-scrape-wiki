import io from 'socket.io-client';
//import { chat } from '../../assets/static/socket-event-to-action.json';
import { REQUEST_SEND_USER_MESSAGE, REQUEST_SEND_USER_TYPING, REQUEST_SOCKET_ID, REQUEST_SCRAPE_LOG } from '../../redux/actions/chat';

const { CHAT_MESSAGE_TYPES : messageTypes } = require('../../utils/app-constants').default;
const { localeSettings } = require('../../config').default;
const  chat = {
	"messageAdded": REQUEST_SEND_USER_MESSAGE,
	"userStartedTyping": REQUEST_SEND_USER_TYPING,
	"recivesocketId" : REQUEST_SOCKET_ID,
	"scrapeLog" : REQUEST_SCRAPE_LOG,
};
export default class ChatSocket {

	constructor(dispatch,country) {
		const { chatNameSpace } = localeSettings[country];
		this.chat = io(chatNameSpace,{
			reconnection: true,
			reconnectionDelay: 2000,
			reconnectionAttempts: 10
		});
		this.addListeners(dispatch);
	}

	addListeners(dispatch) {
		Object.keys(messageTypes)
			.forEach(type => this.chat.on(type, (payload) => {
				dispatch(chat[type](payload));
			}));
	}

	emit() {
		return (type, payload)=> {
			this.chat.emit(type, payload);
		};
	}
}




