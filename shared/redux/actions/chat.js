import { findIndex, find, extend, cloneDeep, forEach as _forEach } from 'lodash';
import uniqueId  from 'utils/uniqueFormId';
const { CHAT_MESSAGE_TYPES : messageTypes } = require('../../utils/app-constants').default;

export function	REQUEST_USER_CHAT_REQUESTED(payload) {
		return (dispatch, getState) => {
			const { chatModals } = getState().chat;
			let	existing = (chatModals && chatModals.length > 0 &&cloneDeep(chatModals)) || [];
			const chatIndex = findIndex(existing, { id : payload.id});
			if(chatIndex > -1 ) {
				existing[chatIndex].close = false;
			} else {
				existing.push(payload);
			}

			localStorage.setItem('chats', JSON.stringify(existing));
			dispatch({
				type : messageTypes.userRequested,
				data : Object.assign({},{chatModals : existing})
			});
		};
	}

export function	REQUEST_SCRAPE_LOG(payload) {
	return (dispatch, getState) => {
		const { scrapeLog = {} } = getState().chat;
		if(scrapeLog[payload.source]) {
			scrapeLog[payload.source].push({
				...payload.log
			})
		} else {
			scrapeLog[payload.source] = [];
			scrapeLog[payload.source].push({
				...payload.log
			})
		}
		console.log(scrapeLog);
		dispatch({
			type : messageTypes.scrapeLog,
			data : Object.assign({id :uniqueId()},{scrapeLog})
		});
	};
}
export function REQUEST_SOCKET_ID(payload) {
	return (dispatch, getState) => {
		console.log(payload);
		//localStorage.setItem('chats', JSON.stringify(existing));
		dispatch({
			type: messageTypes.recivesocketId,
			data: Object.assign({}, {socket: {id: payload}})
		});
	};
}

export function	REQUEST_JOIN_CHAT_ROOM(payload, emit) {
		return (dispatch, getState) => {
			emit(messageTypes.joinRequested, payload);
			const { chatModals } = getState().chat;
			dispatch({
				type : messageTypes.userRequested,
				data : Object.assign({},{chatModals : chatModals})
			});
		};
	}

export function	REQUEST_SEND_USER_MESSAGE(payload, emit) {
		return (dispatch, getState) => {
			emit && emit(messageTypes.messageAdded, payload);
			const { chatModals } = getState().chat;
			let	existing = (chatModals && chatModals.length > 0 &&cloneDeep(chatModals)) || [];
			// find if chat id exist
			const chatIndex = findIndex(existing, { id : payload.id});
			if(chatIndex > -1 ) {
				existing[chatIndex].messages.push(payload.messages);
				existing[chatIndex].close = false;
			} else {
				const messageObj = payload.messages;
				payload.messages = [];
				payload.messages.push(messageObj);
				existing.push(payload);
			}

			localStorage.setItem('chats', JSON.stringify(existing));
			dispatch({
				type : messageTypes.userRequested,
				data : Object.assign({},{chatModals : existing})
			});
		};
	}


export function	REQUEST_SEND_USER_TYPING(payload, emit) {
		const typingTimerLength = 800;

		return (dispatch, getState) => {
			const { chatModals } = getState().chat;
			let	existing = (chatModals && chatModals.length > 0 && cloneDeep(chatModals)) || [];
			// find if chat id exist
			const chatIndex = findIndex(existing, { id : payload.id});
			if(chatIndex > -1 ) {
				if(emit) {
					if(payload.typing) {
						emit(messageTypes.userStartedTyping, payload);
					}
					const lastTypingTime = Date.now();
					setTimeout(() => {
						const timeDiff = Date.now() - lastTypingTime;
						if (timeDiff >= typingTimerLength && payload.typing) {
							payload.typing = false;
							emit(messageTypes.userStartedTyping, payload);
						}
					}, typingTimerLength);
				} else {
					existing[chatIndex].typing = payload.typing;
					dispatch({
						type : messageTypes.userRequested,
						data : Object.assign({},{chatModals : existing})
					});
				}
			}
		};

	}

export function	REQUEST_SEND_WINDOW_MINIMIZE(payload) {
		return (dispatch, getState) => {
			const { chatModals } = getState().chat;
			let	existing = (chatModals && chatModals.length > 0 &&cloneDeep(chatModals)) || [];
			// find if chat id exist
			const chatIndex = findIndex(existing, { id : payload.id});
			if(chatIndex > -1 ) {
				existing[chatIndex].minimize = payload.minimize;
			}
			localStorage.setItem('chats', JSON.stringify(existing));
			dispatch({
				type : messageTypes.userRequested,
				data : Object.assign({},{chatModals : existing})
			});
		};
	}

export function	REQUEST_SEND_WINDOW_CLOSE(payload) {
		return (dispatch, getState) => {
			const { chatModals } = getState().chat;
			let	existing = (chatModals && chatModals.length > 0 &&cloneDeep(chatModals)) || [];
			// find if chat id exist
			const chatIndex = findIndex(existing, { id : payload.id});
			if(chatIndex > -1 ) {
				existing[chatIndex].close = payload.close;
			}
			localStorage.setItem('chats', JSON.stringify(existing));
			dispatch({
				type : messageTypes.userRequested,
				data : Object.assign({},{chatModals : existing})
			});
		};
	}

export function	REQUEST_UPDATE_USER_STATUS(payload) {
		return (dispatch, getState) => {
			const { chatModals } = getState().chat;
			let	existing = (chatModals && chatModals.length > 0 && cloneDeep(chatModals)) || [];
			// find if chat id exist
			_forEach(existing, (chat, index)=>{
				if(chat.user.id === payload.id) {
					existing[index].isLogin = payload.isLogin;
				}
			});
			localStorage.setItem('chats', JSON.stringify(existing));
			dispatch({
				type : messageTypes.userRequested,
				data : Object.assign({},{chatModals : existing})
			});
		};
	}




