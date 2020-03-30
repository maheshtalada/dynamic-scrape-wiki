import React from 'react';
import { Button } from '../common/button';

const QuestionActions = ({onAnswer, onComment, l, commentCount}) => {
	return (
		<div className="content-details-page__question-actions">
			<Button btnClassName="btn-default" onClick={(evt)=>onAnswer(evt)}><i className="pe-7s-note"></i> {l('WRITEANSWER')}</Button>
			<Button btnClassName="btn-default" onClick={(evt)=>onComment(evt)}> <i className="pe-7s-comment"></i>{l('COMMENTS')} {`(${commentCount || 0})`}</Button>
		</div>
	)
};

export default QuestionActions;

