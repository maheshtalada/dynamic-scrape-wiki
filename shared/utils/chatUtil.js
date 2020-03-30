export function initChatSocket(dispatch, country) {
	if(!frameworkGlobals.ChatSocket) {
		const ChatSocket =  require('../components/chat/chat-socket').default;
		frameworkGlobals.ChatSocket = new ChatSocket(dispatch, country);
		frameworkGlobals.emit = frameworkGlobals.ChatSocket.emit();
		frameworkGlobals.chat = frameworkGlobals.ChatSocket.chat;
	}
}
