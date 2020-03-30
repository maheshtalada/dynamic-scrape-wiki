import React from 'react';
import Cx from 'classnames';

export default function Chip(props) {
	return (
		<div className={Cx("chip ",props.className)}>
			<span className="chip__text">{props.children}</span>
			{props.onClose && <button type="button" className="chip__action" onClick={props.onClose}><i className="pe-7s-close-circle"/></button>}
		</div>
	)
}
