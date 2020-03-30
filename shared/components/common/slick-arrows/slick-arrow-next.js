import React from 'react';
import Cx from 'classnames';

export default function({className, style, onClick, customClass, type='left'}) {
	const iconClass = {
		'next' : 'right',
		'prev' : 'left'
	};
	const disabled = className.indexOf('slick-disabled') >= 0 ? 'disabled' : '';
	return (
		<button aria-label={type === 'next' ? 'Next' : 'Previous'} className={Cx("custom-slick-arrow",customClass,type,disabled)} onClick={onClick} style={style}>
			<i className={`pe-7s-${iconClass[type]}-arrow-2`}/>
		</button>
	)
}
