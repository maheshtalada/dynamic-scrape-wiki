import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

const events = ['onClick', 'onMouseOver'];
export default class Panel extends React.Component {

	static propTypes = {
		title : PropTypes.string,
		className : PropTypes.string,
		footer : PropTypes.string,
		children : PropTypes.node,
		id : PropTypes.string
	};

	static defaultProps = {
		id : ''
	};

	constructor(props) {
		super(props);
	}

	comopnentDidMount() {
		registerEvents();
	}

	registerEvents() {
		evtNames.forEach(e => {
			this.listeners[e] = this.map.addListener(e, this.handleEvent(e,this.map));
		});
	}

	render() {

		return (

			<div className={Cx('hpanel', this.props.className)} id={`panel${this.props.id}`}>
				{ this.props.children }
			</div>
		);
	}

}
