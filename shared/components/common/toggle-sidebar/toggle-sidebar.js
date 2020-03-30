import React from 'react';
import Cx from 'classnames';
import TooglePanel from '../../toogle-panel/toggle-panel';

class ToggleSidebar extends TooglePanel {
	constructor(props) {
		super(props);
	}

	render() {
		const { children, classes, direction} = this.props;
		return (
			<div className={Cx(classes,'toggle-sidebar',direction)} ref="toggle">
				{children}
			</div>
		);
	}
}

export default ToggleSidebar;
