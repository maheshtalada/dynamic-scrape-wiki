import React from 'react';
import Cx from 'classnames';

export default function(props) {
	return (
		<div className={Cx('mdl-card',props.className)}>
			{props.children}
		</div>
	)
}
