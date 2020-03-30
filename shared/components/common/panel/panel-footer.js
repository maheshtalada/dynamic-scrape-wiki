import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PanelFooter extends Component {

	static propTypes = {
		children: PropTypes.node
	};

	static defaultProps = {
		children: ''
	};

	render() {

		return (
			<div className="panel-footer">
				{ this.props.children}
			</div>
		);

	}

}
