import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

class Toolbar extends Component {
	static propTypes = {
		children: PropTypes.node,
		className: PropTypes.string
	};

	static defaultProps = {};

	render() {
		const {
			children,
			className,
			...other
		} = this.props;

		return (
			<div {...other} className={Cx(className,'toolbar hidden-xs')}>
				{children}
			</div>
		);
	}
}

export default Toolbar;
