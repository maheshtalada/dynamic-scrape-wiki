import React from 'react';
import uniqueId from '../../../utils/uniqueFormId';
import ReactTooltip from 'react-tooltip';
/**
 * @description renders an input radio group items with mask.
 */

const MaskedRadio = ({ name, value,  selectedValue, onChange, label, labelPostfix, disable, l, analyticsData={}, tooltip}) => {
	const id = `${uniqueId()}-${value}`;
	return (
		<div className={`masked__radio__item hvr-rectangle-out ${disable ? 'mask__disable' : ''}`} key={`radio_item_${value}`}>
			<input type="checkbox"
				   name={name}
				   disabled={disable}
				   id={id}
				   value={value}
				   checked={selectedValue}
				   key={`${value}_input`}
				   data-tag-category={analyticsData.category}
				   data-tag-action={analyticsData.action}
				   data-tag-label={`${analyticsData.label} ${label}`}
				   onChange={(evt)=>onChange(evt, value)}/>
			<label htmlFor={id} key={value} title={disable ? l('NA') : ''}>
				<span className="hvr-grow">{label}</span>
				{labelPostfix && <span className="label-postfix">{l(labelPostfix)}</span>}
				{tooltip && <i className="tooltip pe-7s-help1" data-tip={tooltip} data-for={`masked-radio-tooltip-${id}`}/>}
				<ReactTooltip id={`masked-radio-tooltip-${id}`}/>
			</label>
		</div>
	);
};

export default MaskedRadio;
