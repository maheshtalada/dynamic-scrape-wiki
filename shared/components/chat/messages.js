import React from 'react';
import Message from './message';

const Messages = ({ messages}) => {

	let messageUi = null;

	if (messages.length > 0) {
		messageUi = messages.map(({message, name, time}, index) => {
			/* let name = null
			if (message.get('user')) {
				name = message.get('user').get('name')
			}*/

			return (
				<Message
					key={`message${index}`}
					name={name}
					createdAt={time}
					message={message}
				/>
			);
		});
	}

	return (
		<div className="chat-window__messages">
			{messageUi}
		</div>
	);
};

export default Messages;
