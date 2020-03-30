import React from 'react';
import Cx from 'classnames';

export default function({id='', name='', checked,label='', className, onChange, l, leftLabel, rightLabel}) {
	return (
		<div className={Cx('side-switch',className)}>
            <label className={Cx("side-switch__left",{ 'active' : !checked})}>{l(leftLabel)}</label>
			<input type="checkbox" onChange={onChange} id={id} name={name} className={Cx("switch-input",className)} checked={checked}/>
			<label htmlFor={id} className="switch-label">{label}</label>
            <label className={Cx("side-switch__right",{ 'active' : checked})}>{l(rightLabel)}</label>
		</div>
	)
}
