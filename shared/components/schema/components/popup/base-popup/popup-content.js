import React from 'react';
import PropTypes from 'prop-types';
import templates from './templates.js';

export default class PopupContent extends React.Component {

	static propTypes = {
		templateKey: PropTypes.string
	};

	static defaultProps = {
		templateKey: ''
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: templates[this.props.templateKey]}} />
		);
	}
}




