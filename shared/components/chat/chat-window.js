import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';
import Actions from './actions';
import SendMessageForm from './send-message-form';
import Messages from './messages';
import { cloneDeep } from 'lodash';
import Cx from 'classnames';
import { sprintf } from '../../utils';
import EmailModal from '../common/email-modal';
import {modal} from 'react-redux-modal';
import { REQUEST_SEND_USER_MESSAGE, REQUEST_SEND_USER_TYPING, REQUEST_SEND_WINDOW_MINIMIZE, REQUEST_SEND_WINDOW_CLOSE } from '../../redux/actions/chat';

const CHAT_WINDOW_WIDTH = 350;

export default class ChatWindow extends Component {

	/* static propTypes = {
		messages : Proptypes.array,
		window : Proptypes.number
	};

	static defaultProps = {
		messages : [],
		window :1
	};*/

	static contextTypes = {
		i18n: PropTypes.object
	};


	constructor(props) {
		super(props);
		this.sendMessage = this.sendMessage.bind(this);
		this.onTyping = this.onTyping.bind(this);
		this.onMinimize = this.onMinimize.bind(this);
		this.onClose = this.onClose.bind(this);
		this.addEmailModal = this.addEmailModal.bind(this);

		this.state = {
			minimize : props.minimize,
			msgLength :  props.messages.length || 0
		};

		this.messagesEnd = undefined;
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	notifyEmailSent() {
		modal.clear();
	}

	addEmailModal() {
		const { id, user } = this.props;
		const { l } = this.context.i18n;
		const listingId = id.split('O')[1];
		modal.add(EmailModal,{
			contactedId : user.id,
			dispatch: this.props.dispatch,
			listingId : listingId,
			size: 'medium',
			title: l('SENDEMAIL'),
			contactedName: user.name,
			notifyEmailSent: this.notifyEmailSent,
			actionType : 'CHAT',
			contextType: 'LISTING'
		});

	}


	sendMessage(message) {
		// const { messages } = this.state;
		this.props.dispatch(REQUEST_SEND_USER_MESSAGE({
			user : this.props.user,
			from : this.props.from,
			id : this.props.id,
			displayName : this.props.displayName,
			messages : {
				'name': this.props.from.name,
				'time': '',
				'message': message
			},
			typing : false
		}, this.props.emit));

	}

	onTyping() {
		this.props.messages.length > 0 && this.props.dispatch(REQUEST_SEND_USER_TYPING({
			user : this.props.user,
			id : this.props.id,
			displayName : this.props.displayName,
			typing : true
		}, this.props.emit));
	}

	onMinimize(evt) {
		evt.preventDefault();
		const { minimize } = this.state;
		this.setState({
			minimize : !minimize,
			msgLength : this.props.messages.length
		},()=>{
			this.props.dispatch(REQUEST_SEND_WINDOW_MINIMIZE({
				id : this.props.id,
				minimize : !minimize
			}));
		});
	}

	onClose() {
		this.props.dispatch(REQUEST_SEND_WINDOW_CLOSE({
			id : this.props.id,
			close : true
		}));
	}


	render() {
		const { l } = this.context.i18n;
		const { user, displayName, messages, typing } = this.props;
		const isLogin = typeof this.props.isLogin !== 'undefined' ? this.props.isLogin : true;
		const { minimize, msgLength } = this.state;
		const style = {
			right : `${this.props.window * (CHAT_WINDOW_WIDTH+10)}px`,
			width : `${CHAT_WINDOW_WIDTH}px`
		};
		const minimizeClasses = minimize ? 'animate-hide' : 'animate-show';
		const minimizeToggleIconClasses = minimize ? 'pe-7s-angle-up' : 'pe-7s-angle-down';
		const highlightClass = messages.length > msgLength && minimize ? 'blink-container' :'';
		return (
			<div className="chat-window" style={style}>
				<div className="chat-window__wrapper">
					<div className={Cx('chat-window__header', highlightClass)} onClick={(evt)=> minimize && this.onMinimize(evt)}>
						<div className="chat-window__title">
							<span className="chat-window__title__name">
								{user.name}
								{!isLogin && ` (${l('OFFLINE')}) ` }
								{ highlightClass ? ` (${messages.length - msgLength} ${l('NEWMESSAGES')})`:''}
							</span>
							<span className="chat-window__title__property" >{displayName}</span>
						</div>
						<Actions
							handleMinimize = {this.onMinimize}
							handleClose = {this.onClose}
							toggleIconClass = {minimizeToggleIconClasses}
						/>
					</div>
					<div className={Cx('chat-window__body',minimizeClasses)}>
						<div className="chat-window__body__box" ref={(el) => {
							this.messagesEnd = el;
						}}>
							<Messages messages={messages} user={user}/>
							{ typing && <span className="chat-window__typing">{sprintf(l('TYPING'),user.name)}</span>}
						</div>
						{ isLogin && <SendMessageForm
							sendMessage={this.sendMessage}
							typing={this.onTyping}
							isOffline = {isLogin}
						/>}
						{ !isLogin &&
							<div className="chat-window__email-btn-wrap">
								{/* !isLogin &&
								<div className="chat-window__offline-info">
									<span>{l('OFFLINEINFO')}</span>
								</div>
								*/}
								<button onClick={this.addEmailModal} className="btn btn-shadow-hover">{sprintf(l('OFFLINEMESSAGE'),user.name)}</button>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}

	scrollToBottom = () => {
		const node = ReactDOM.findDOMNode(this.messagesEnd);
		node.scrollTop = node.scrollHeight+10;
	}

}

