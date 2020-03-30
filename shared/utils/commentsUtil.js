import { findIndex as _findIndex } from 'lodash';

export function addComment(newComment, contentCommentObj ) {
	return [newComment].concat(contentCommentObj);
}

export function editComment(commentId, newComment, contentCommentObj, key) {
   const commentIndex = _findIndex(contentCommentObj,  { id : commentId});
	contentCommentObj[commentIndex][key] = newComment[key];
	return contentCommentObj;
}
