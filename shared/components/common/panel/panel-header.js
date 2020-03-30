import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PanelHeader extends Component {

	static propTypes = {
		children: PropTypes.node
	};

	static defaultProps = {
		children: ''
	};

	render() {

		return (
			<h2 className="panel-heading hbuilt">
				{ this.props.children}
			</h2>
		);

	}

}
