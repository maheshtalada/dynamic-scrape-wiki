import React from 'react';
import Cx from 'classnames';

export default function({id='', name='', checked,label='', className, onChange, l}) {
	return (
		<div>
			<input type="checkbox" onChange={onChange} id={id} name={name} className={Cx("switch-input",className)} checked={checked}/>
			<label htmlFor={id} className="switch-label">{label} <span className="toggle--on">{l('YES')}</span><span className="toggle--off">{l('NO')}</span></label>
		</div>
	)
}
