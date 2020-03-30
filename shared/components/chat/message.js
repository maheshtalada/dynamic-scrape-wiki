import React from 'react';

const Message = ({ name, message, time }) => {
	return (
		<div className="chat-window__message">
			<strong>{name} : </strong>{message}
		</div>
	);
};

export default Message;
