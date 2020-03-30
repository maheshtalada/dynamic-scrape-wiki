import React, { Component } from 'react';
import { Button } from '../common/button';
import Loader from '../../components/common/page-loader/loader';
import ErrorBox from '../common/error-box/error-box';

const CommentSubmitForm = ({l, onClickForm, onClickPost, onCancelClick, isEdit, commentText, commentId, commentSaving, value=undefined, isError=undefined, error = undefined}) => {

	let commentInput;

	const onSubmit = e => {
		e.preventDefault()
		if (commentInput.value) {
			onClickPost(commentInput.value, commentId);
			if(!isEdit) {
				commentInput.value = '';
			}
		}
	};
	return (
		<div className={`comments__submit-form ${isEdit ? 'edit-mode' : ''}`}>
			<h1 className="comments__submit-form__title">{l('POSTYOURCOMMENT')}</h1>
			{ isError && <ErrorBox l={l} errorCode={error}>
				<div><br/>"{value}"</div>
			</ErrorBox>}
			<textarea className="comments__submit-form__input-box"  ref={ el => commentInput = el } placeholder={l('POSTCOMMENT')} rows="4" onClick={onClickForm} defaultValue={commentText}></textarea>
			<div className="comments__submit-form__actions">
				<Button onClick={(evt)=>{onSubmit(evt)}}>{ isEdit ? l('UPDATECOMMENT') : l('POSTCOMMENT')}</Button>
				{ isEdit && <Button onClick={(evt)=>{onCancelClick(evt)}}>{l('CANCEL')}</Button>}
				{commentSaving && <Loader/>}
			</div>
		</div>
	)
}


export default CommentSubmitForm;
