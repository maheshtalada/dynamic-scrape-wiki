import React from 'react';
import Cx from 'classnames';

export default function({ className, onClick, titleText='', direction='left' }) {
	return (
		<div title={titleText} className={Cx("expand-indicator flex flex-align-center",className,onClick ? 'cursor': '')} onClick={onClick}>
			<i className={`expand-indicator__icon pe-7s-arrowhead-${direction}`}/>
		</div>
	)
}
