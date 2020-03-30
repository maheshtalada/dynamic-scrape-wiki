import React from 'react';
import { Button } from '../common/button';

const ConfirmDelete = ({onConfirm,onCancel,warningInfo,l,answerId}) => {
	return (
		<div className="delete-answer-confirm">
			<div className="delete-answer-confirm__message">
				<i className="pe-7s-attention"/>
				<p>
					{l(warningInfo)}
				</p>
			</div>
			<div className="delete-answer-confirm__actions">
				{<Button onClick={(evt)=>onConfirm(answerId)}>{l('CONFIRM')}</Button>}
				{<Button onClick={(evt)=>onCancel(evt,answerId)}>{l('CANCEL')}</Button>}
			</div>
		</div>
	)
};

export default ConfirmDelete;

