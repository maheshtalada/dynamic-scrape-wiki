import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

export default class PanelBody extends Component {

	static propTypes = {
		children: PropTypes.node
	};

	static defaultProps = {
		children: ''
	};

	render() {
		const { className } = this.props;
		return (
			<div className={Cx("panel-body",className)}>
				{ this.props.children}
			</div>
		);

	}

}
