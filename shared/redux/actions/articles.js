import ArticleService from '../../services/articles';
import {addComment, editComment} from '../../utils/commentsUtil';
import {REQUEST_UPDATE_ERROR_RESPONSE} from './application';
import {REQUEST_USER_ARTICLES} from './userprofile';
import {findIndex} from 'lodash';

export function REQUEST_ARTICLE_TAGS(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_ARTICLE_TAGS',
			data: {
				isFetching: true
			}
		});

		const requestConfig = {
			endpoint: 'savearticletags',
			method: 'get',
			paramsPayload: payload.paramsPayload
		};
		try {
			const response = await ArticleService.fetchData(requestConfig);
			dispatch({
				type: 'RESPONSE_ARTICLE_TAGS',
				data: Object.assign(response.data, {isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_ARTICLE_TAGS',
					data: Object.assign(e, {isFetching: false})
				},
				error: e
			}));
		}
	};
}

export function SAVE_ARTICLE_TAGS(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_SAVE_ARTICLE_TAGS',
			data: {
				isSavingTags: true
			}
		});

		const requestConfig = {
			endpoint: 'savearticletags',
			method: 'post',
			paramsPayload: payload.paramsPayload,
			dataPayload: payload.dataPayload
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);
			dispatch({
				type: 'RESPONSE_SAVE_ARTICLE_TAGS',
				data: Object.assign(response.data, {isSavingTags: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_SAVE_ARTICLE_TAGS',
					data: Object.assign(e, {isSavingTags: false})
				},
				error: e
			}));
		}
	};
}

export function REQUEST_GET_ARTICLE(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_GET_ARTICLE',
			data: {
				isFetching: true
			}
		});

		dispatch({
			type: 'RESPONSE_ADD_ARTICLE_SCHEMA',
			data: {}
		});

		dispatch({
			type: 'RESPONSE_SAVE_ARTICLE_TAGS',
			data: {}
		});

		const requestConfig = {
			endpoint: 'getarticle',
			method: 'get',
			paramsPayload: {id: payload.params.articleid}
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);
			dispatch({
				type: 'RESPONSE_GET_ARTICLE',
				data: Object.assign(response.data, {isFetching: false})
			});

			dispatch({
				type: 'RESPONSE_SAVE_COMMENT',
				data: {[payload.params.articleid]: response.data.newsArticle.comments}
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_GET_ARTICLE',
					data: Object.assign(e, {isFetching: false})
				},
				error: e
			}));
		}
	};
}

export function REQUEST_SAVE_COMMENT(payload) {

	return async(dispatch, getState) => {
		const {comment_details = {}} = getState().articles;
		dispatch({
			type: 'RESPONSE_SAVE_COMMENT',
			data: {
				...comment_details,
				isSavingComment: true
			}
		});

		const requestConfig = {
			endpoint: 'savecomments',
			method: 'post',
			dataPayload: payload.dataPayload
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);
			let contentCommentObject = comment_details[payload.dataPayload.contentId] || {data: []};

			if (payload.dataPayload.id) {
				contentCommentObject.data = editComment(payload.dataPayload.id, response.data, contentCommentObject.data || [], 'comment');
			} else {
				contentCommentObject.data = addComment(response.data, (contentCommentObject && contentCommentObject.data) || []);
			}
			// if they are any errors;
			delete comment_details.error;

			dispatch({
				type: 'RESPONSE_SAVE_COMMENT',
				data: Object.assign(comment_details, {
					[payload.dataPayload.contentId]: contentCommentObject,
					isSavingComment: false
				})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_SAVE_COMMENT',
					data: Object.assign(comment_details, {error: e.error, isSavingComment: false})
				},
				error: e
			}));
		}
	};

}

export function REQUEST_DELETE_COMMENT(payload, contentId) {

	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_DELETE_COMMENT',
			data: {
				isDeletingComment: true
			}
		});

		const requestConfig = {
			endpoint: 'deletecomments',
			method: 'post',
			paramsPayload: payload
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);
			dispatch({
				type: 'RESPONSE_DELETE_COMMENT',
				data: Object.assign(response.data, {isDeletingComment: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_DELETE_COMMENT',
					data: Object.assign(e, {isDeletingComment: false})
				},
				error: e
			}));
		}
	};

}

export function REQUEST_GET_COMMENTS(payload) {
	return async(dispatch, getState) => {
		const {comment_details = ''}  = getState().articles;

		dispatch({
			type: 'RESPONSE_SAVE_COMMENT',
			data: {[payload.paramsPayload.contentid]: {isFetching: true}}
		});

		const requestConfig = {
			endpoint: 'getcomments',
			method: 'get',
			dataPayload: payload.dataPayload,
			paramsPayload: payload.paramsPayload
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);
			let storeData = comment_details;
			let commentData = comment_details && comment_details[payload.paramsPayload.contentid] || '';
			// append data into comments for loadmore
			if (commentData && commentData.data && commentData.data.length) {
				commentData.data = commentData.data.concat(response.data.data);
			} else {
				commentData = response.data
			}
			console.log(commentData, response.data.data);
			//delete response.data.data;
			//delete storeData[payload.paramsPayload.contentid];
			dispatch({
				type: 'RESPONSE_SAVE_COMMENT',
				data: Object.assign({}, storeData, {[payload.paramsPayload.contentid]: commentData, isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_SAVE_COMMENT',
					data: Object.assign(e, {isFetching: false})
				},
				error: e
			}));
		}
	};

}

export function REQUEST_GET_BLOG_LIST(payload) {
	return async(dispatch, getState) => {

		const {article_data} = getState().articles;

		const requestConfig = {
			endpoint: 'getbloglist',
			method: 'get',
			dataPayload: payload.dataPayload
		};

		try {
			let articles;
			const response = await ArticleService.fetchData(requestConfig);

			if (article_data.data && findIndex(response.data.data, {id: article_data.data[0].id}) < -1) {
				article_data.data = article_data.data.concat(response.data.data);
				articles = article_data
			} else {
				articles = response.data
			}

			dispatch({
				type: 'RESPONSE_GET_BLOG_LIST',
				data: Object.assign({}, articles)
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_GET_BLOG_LIST',
					data: Object.assign(e)
				},
				error: e
			}));
		}
	};

}

export function DELETE_ARTICLE(payload) {
	return async(dispatch) => {

		dispatch({
			type: 'SHOW'
		});

		dispatch({
			type: 'RESPONSE_DELETE_ARTICLE',
			data: {
				isDeleting: true
			}
		});

		const requestConfig = {
			endpoint: 'deletearticle',
			method: 'post',
			paramsPayload: payload
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);

			dispatch({
				type: 'HIDE'
			});

			dispatch({
				type: 'RESPONSE_DELETE_ARTICLE',
				data: Object.assign(response.data, {isDeleting: false})
			});
			if (response.status.toLowerCase() === 'success') {
				dispatch(REQUEST_USER_ARTICLES(
					{
						query: {
							page: payload.page
						}
					}
					)
				);
			}
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_DELETE_ARTICLE',
					data: Object.assign(e, {isDeleting: false})
				},
				error: e
			}));
		}
	};
}

export function REQUEST_UPDATE_BLOG_STATUS(payload) {
	return async(dispatch) => {

		dispatch({
			type: 'RESPONSE_UPDATE_BLOG_STATUS',
			data: {
				isFetching: true
			}
		});

		const requestConfig = {
			endpoint: 'removearticle',
			method: 'post',
			...payload
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);
			dispatch({
				type: 'RESPONSE_UPDATE_BLOG_STATUS',
				data: {
					isFetching: false
				}
			});
		} catch (e) {
			console.log(e);
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_REMOVE_ARTICLE',
					data: {
						isFetching: false,
						'error': e.error && e.error.error_description || '',
						'status': e.status
					}
				},
				error: e
			}));
		}
	};
}

export function REMOVE_ARTICLE(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'RESPONSE_REMOVE_ARTICLE',
			data: {
				isFetching: true,
				updatingid: payload.paramData.id
			}
		});

		const requestConfig = {
			endpoint: 'removearticle',
			method: 'post',
			paramsPayload: payload.paramData,
			dataPayload: payload.data
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);
			dispatch({
				type: 'RESPONSE_REMOVE_ARTICLE',
				data: {
					isFetching: false,
					updatedid: payload.paramData.id,
					...response.data
				}
			});
			if (response.status.toLowerCase() === 'success') {
				dispatch(REQUEST_USER_ARTICLES(
					{
						query: {
							page: payload.page
						}
					}
					)
				);
			}
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_REMOVE_ARTICLE',
					data: {
						isFetching: false,
						'error': e.error && e.error.error_description || '',
						'status': e.status
					}
				},
				error: e
			}));
		}
	};
}

export function REQUEST_LIKE_ARTICLE(payload) {
	return async(dispatch) => {
		dispatch({
			type: 'SHOW'
		});

		dispatch({
			type: 'RESPONSE_LIKE_ARTICLE',
			data: {
				isFetching: true
			}
		});

		const requestConfig = {
			endpoint: 'articlelike',
			method: 'post',
			paramsPayload: payload
		};

		try {
			const response = await ArticleService.fetchData(requestConfig);

			dispatch({
				type: 'HIDE'
			});

			dispatch({
				type: 'RESPONSE_ARTICLE_LIKE',
				data: Object.assign(response.data, {isFetching: false})
			});
		} catch (e) {
			dispatch(REQUEST_UPDATE_ERROR_RESPONSE({
				action: {
					type: 'RESPONSE_ARTICLE_LIKE',
					data: Object.assign(e, {isFetching: false})
				},
				error: e
			}));
		}
	};
}



