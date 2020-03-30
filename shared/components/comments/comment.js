import React, { Component } from 'react';
import moment from 'moment';
import CommentSubmitForm from './comment-submit-form';
import  SiteConfig from '../../config';

const { assetsPath } = SiteConfig;

const Comment = ({isEdit, comment, awsImagePath, onEdit, onRemove, isLogIn, userID, l, onTextareaChange, onClickPost, onCancelClick}) => {
		let componentData = undefined;
		if(isEdit) {
			componentData = <CommentSubmitForm
				l={l}
				onTextareaChange={onTextareaChange}
				onClickPost={onClickPost}
				isEdit={isEdit}
				commentText = {comment.comment}
				commentId = {comment.id}
				onCancelClick={onCancelClick}
			/>
		} else {
			componentData = (<div><div className="comments__item__description">{comment.comment}</div>
			{ userID === comment.createdByUserId && <div className="comments__item__actions">
				<span><button onClick={(evt)=>{onEdit(evt, comment.id)}}><i className="pe-7s-note"></i> {l('EDIT')}</button></span>
				<span><button onClick={()=>{onRemove(comment.id)}}><i className="pe-7s-trash"></i> {l('DELETE')}</button></span>
			</div>}</div>)
		}
	return (
		<div className="comments__item">
			<div className="comments__item__user-img contact-bar__listing-owner__avatar">
				<img src={comment.photoURL ? `${awsImagePath}/${comment.photoURL}` : `${assetsPath}/images/noimages/noavatar.png`} alt={comment.userName} />
			</div>
			<div className="comments__item__data">
				<div className="comments__item__user">
					<span className="name">{comment.userName}</span>
					<span className="time-added">{moment(comment.creationDate).fromNow()}</span>
				</div>
				{componentData}
			</div>
		</div>
	)
};

export default Comment;
