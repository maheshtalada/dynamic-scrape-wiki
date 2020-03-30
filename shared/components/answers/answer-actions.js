import React from 'react';
import { Button } from '../common/button';

const AnswerActions = ({onEdit, onDelete, onComments, answerId, l, commentsCount, user, answerById}) => {
	return (
		<div className="answer-actions">
			<Button btnClassName="btn-default" onClick={(evt)=>onComments(evt,answerId)}> <i className="pe-7s-comment"></i>{l('COMMENTS')}{`(${commentsCount})`}</Button>
			{user && user.id === answerById && <Button btnClassName="btn-default" onClick={(evt)=>onEdit(evt,answerId)}><i className="pe-7s-note"></i> {l('EDIT')}</Button>}
			{user && user.id === answerById && <Button btnClassName="btn-default" onClick={(evt)=>onDelete(evt,answerId)}> <i className="pe-7s-trash"></i>{l('DELETE')}</Button>}
		</div>
	)
};

export default AnswerActions;

