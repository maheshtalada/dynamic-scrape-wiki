import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';

export default class SendMessageForm extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.onSendClick = this.onSendClick.bind(this);
		this.onTextareaKeyDown = this.onTextareaKeyDown.bind(this);
		this.onTextareaChange = this.onTextareaChange.bind(this);
		this.keyPress = this.keyPress.bind(this);

		this.state = { valid: false, name: null };
	}

	componentWillMount() {
		document.addEventListener('keyup', this.keyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.keyPress);
	}

	onSendClick(event) {
		event.preventDefault();
		this.refs.messageInput.value.length > 0 && this.props.sendMessage(this.state.message);
		this.refs.messageInput.value = '';
	}

	onTextareaChange(event) {
		const message = event.target.value;
		const valid = message && message.length > 0;
		this.setState({ valid, message });
	}

	onTextareaKeyDown(event) {
		const message = event.target.value;
		const valid = message && message.length > 0;
		valid && this.props.typing();
	}

	render() {
		const { l } = this.context.i18n;
		let submitDisabled = !this.props.isOffline;
		/* if (this.state.valid) {
			submitDisabled = false
		}*/

		return (
			<div className="chat-window__footer">
				<div className="chat-window__input-box">
					<textarea className="chat-window__input-box__text-area" ref="messageInput" placeholder={l('DEFAULTCHATMESSAGE')} maxLength="500"
							  rows="2" cols="33" onChange={this.onTextareaChange} onKeyDown={this.onTextareaKeyDown} disabled={submitDisabled} />
					<button onClick={this.onSendClick} className="btn btn-shadow-hover" disabled={submitDisabled}>Send</button>
				</div>
			</div>
		);
	}

	keyPress(event) {
		if(event.keyCode === 13) {
			this.onSendClick(event);
		}
	}
}


