import React, { Component } from 'react';

export default class Actions extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { toggleIconClass } = this.props;
		return (
			<div className="chat-window__actions">
				<a className="chat-window__actions__item" onClick={(evt)=>this.props.handleMinimize(evt)}><i className={toggleIconClass} /> </a>
				<a className="chat-window__actions__item" onClick={(evt)=>this.props.handleClose(evt)}><i className="pe-7s-close" /> </a>
			</div>
		);
	}

}

