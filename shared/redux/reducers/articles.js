import { createReducers } from './create-reducers';

const DEFAULT_STATE = {
	article_data : {}
};

const articles = createReducers(DEFAULT_STATE, {
	RESPONSE_ARTICLE_TAGS: (state, action) => (
		{
			...state,
			article_tags : action.data
		}
	),

	RESPONSE_SAVE_ARTICLE_TAGS: (state, action) => (
		{
			...state,
			save_article_tags : action.data
		}
	),

	RESPONSE_GET_ARTICLE: (state, action) => (
		{
			...state,
			article_details : action.data
		}
	),

	RESPONSE_SAVE_COMMENT: (state, action) => (
		{
		...state,
			comment_details : action.data
		}
	),

	RESPONSE_SAVE_ANSWER: (state, action) => (
		{
			...state,
			answer_details : action.data
		}
	),

	RESPONSE_DELETE_ANSWER: (state, action) => (
		{
			...state,
			delete_answer : action.data
		}
	),

	RESPONSE_DELETE_COMMENT: (state, action) => (
		{
			...state,
			deleted_comment_details : action.data
		}
	),

	RESPONSE_GET_ARTICLE_QUESTIONS: (state, action) => (
		{
			...state,
			article_questions_data : action.data
		}
	),

	RESPONSE_GET_BLOG_LIST: (state, action) => (
		{
			...state,
			article_data : action.data
		}
	),

	RESPONSE_REMOVE_ARTICLE : (state, action) => (
		{
			...state,
			article_updated : action.data
		}
	),

	RESPONSE_DELETE_ARTICLE : (state, action) => (
		{
			...state,
			delete_article : action.data
		}
	),

	RESPONSE_LIKE_ARTICLE : (state, action) => (
		{
			...state,
			response_like_article : action.data
		}
	),

	RESPONSE_UPDATE_BLOG_STATUS : (state, action) => (
		{
			...state,
			response_update_article_status : action.data
		}
	)


});

export default articles;
