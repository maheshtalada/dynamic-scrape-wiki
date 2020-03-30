import React, {Component } from 'react';
import PropTypes from 'prop-types';

export default class Title extends Component {

	static propTypes = {
		title: PropTypes.string,
		className: PropTypes.string
	};

	static defaultProps = {
		className: 'title-container',
		title: 'PropsHub'
	};

	render() {
		const {className, title} = this.props;
		return(
	       	<div className={className}>
				<span>{title}</span>
			</div>
		);
	}
}
