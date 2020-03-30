import React from 'react';
import Cx from 'classnames';
import uniqueId from '../../../utils/uniqueFormId';

export default function Radio(props) {
	let inputProps = {
		id : (props.id || 'mdl-radio-field-' + props.value.replace(/[^a-z0-9]/gi, ''))+uniqueId(),
		type : 'radio',
		name : props.name,
		onChange : props.onChange,
		value : props.value,
		checked : props.checked || '',
		disabled : props.disabled || ''
	};
	return (
		<div className={Cx("mdl-radio-group",props.className)}>
			<input {...inputProps} key={inputProps.id} />
			<label htmlFor={inputProps.id}>{props.children}</label>
		</div>
	)
}
