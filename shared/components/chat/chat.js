import React, { Component } from 'react';
import ChatWindow from './chat-window';

export default class ChatComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages : [],
			chats : props.chats
		};
		this.ChatSocket = undefined;
		this.emit = undefined;
		this.userId = undefined;
	}

	componentDidMount() {
		this.connectChatSocket();
		this.emit && this.forceUpdate();
	}

	componentWillReceiveProps(props) {
		this.connectChatSocket(props);
		this.setState({
			chats : props.chats
		});

	}

	renderChatWindow() {
		const { chats } = this.state;
		return chats.filter(chat => !chat.close).map(( chat , index )=>{
			return ( <ChatWindow
				window={index}
				key={chat.id}
				emit={frameworkGlobals.emit}
				dispatch={this.props.dispatch}
				{...chat}
			/>);
		});

	}

	render() {
		const { isLogIn } = this.props;
		const { chats } = this.state;
		return (
			<div>{ isLogIn && chats.length > 0 && frameworkGlobals.ChatSocket ? this.renderChatWindow() : null}</div>
		);
	}

	connectChatSocket(props='') {
		const data = props || this.props;
		if(!data.isLogIn) {
			this.userId ='';
		}
		if(data.isLogIn && this.userId !== data.userID) {
			this.userId = data.userID;
			frameworkGlobals.emit('loginJoinRoom', {
				room : `PDP:${data.userID}`,
				userRoom : `USER:${data.userID}`,
				login : true
			});
		}
	}

}
