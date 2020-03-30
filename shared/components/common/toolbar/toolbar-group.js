import React, {Component} from 'react';
import PropTypes from 'prop-types';
class ToolbarGroup extends Component {
	static propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
		firstChild: PropTypes.bool,
		lastChild: PropTypes.bool
	};

	static defaultProps = {
		firstChild: false,
		lastChild: false
	};

	render() {
		const {
			children,
			className,
			firstChild, // eslint-disable-line no-unused-vars
			lastChild, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const newChildren = React.Children.map(children, (currentChild) => {
			if (!currentChild) {
				return null;
			}
			return currentChild;
		}, this);

		return (
			<div {...other} className={className} >
				{newChildren}
			</div>
		);
	}
}

export default ToolbarGroup;
