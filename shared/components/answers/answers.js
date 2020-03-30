import React, { Component} from 'react';
import PropTypes from 'prop-types';
import SaveAnswer from './save-answer';
import UserInfo from '../user-info/user-info';
import AnswerActions from './answer-actions';
import Comments from '../comments/comments';
import { modal } from 'react-redux-modal';
import ConfirmDelete from './confirm-delete-answer';
import LoginBarrier from '../../lib/LoginBarrier';
import { REQUEST_GET_COMMENTS, REQUEST_SAVE_ANSWER } from '../../redux/actions/articles';

export default class Answers extends LoginBarrier {

	static propTypes = {
		answer : PropTypes.object,
		dispatch : PropTypes.func,
		onCommentsSignIn : PropTypes.func
	};

	static defaultProps = {
		answer : {},
		onPostAnswerClick : ()=>{},
		onCancelClick : ()=>{}
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string
	};

	constructor(props) {
		super(props);

		this.state = {
			answer : props.answer,
			isEdit : props.isEdit,
			isSavingComment : false
		}

		this.onEditAnswer = this.onEditAnswer.bind(this);
		this.onDeleteAnswer = this.onDeleteAnswer.bind(this);
		this.onComments = this.onComments.bind(this);
		this.onPostAnswer = this.onPostAnswer.bind(this);
		this.onCancelAnswer = this.onCancelAnswer.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
	}

	componentWillReceiveProps(props) {
		const { answer, comments } = props;
		this.setState({
			answer,
			comments : comments[answer.id],
			isSavingComment : comments.isSavingComment || false
		});
	}

	renderUserInfo() {
		const { awsImagePath } = this.context;
		const { answer }  = this.state;
		const { l } = this.context.i18n;
		return <UserInfo
			user = {{
				photoURL : answer.photoURL,
				name : answer.userName
			}}
			awsImagePath = {awsImagePath}
			creationDate ={ answer.creationDate}
			l = {l}
		/>
	}

	renderAnswer() {
		const { answer, isEdit }  = this.state;
		const { user } = this.props;
		if(isEdit) {
			return <SaveAnswer
				answer = {answer.content || ''}
				onPostAnswerClick = {this.onPostAnswer}
				isEdit = { isEdit }
				onCancelClick = {this.onCancelAnswer}
				user = {user}
				questionId={answer.questionId}
			/>
		}

		return <div className="answer__content"
					dangerouslySetInnerHTML={{__html: answer.content}} />
	}

	onEditAnswer(evt, id) {
		evt.preventDefault();
		if(id) {
			this.setState({
				isEdit : true,
				requestComments : false
			})
		}
	}

	onDeleteAnswer(evt, id) {
		const { l } = this.context.i18n;

		modal.add(ConfirmDelete,{
			size: 'phone-view',
			title: l('DELETE'),
			onConfirm: this.onConfirmDelete,
			onCancel: this.onCancelDelete,
			warningInfo: 'CONFIRMDELETEANSWERMESSAGE',
			l,
			answerId: id
		});
	}

	onConfirmDelete(id) {
		modal.clear();
		this.props.onDeleteAnswer(id);
	}

	onCancelDelete() {
		modal.clear();
	}

	onComments(evt, id) {
		const { answer, requestComments } = this.state;
		if(!requestComments && !this.commentsFetched && answer.commentCount > 0) {
			this.fetchComments(1,id);
		}
		this.setState((prevState) => {
			return {
				requestComments : !prevState.requestComments
			};
		});
	}

	fetchComments(pageNumber = 1,id) {
		this.commentsFetched = true;
		this.props.dispatch(REQUEST_GET_COMMENTS({
			dataPayload : {
				page : pageNumber
			},
			paramsPayload : {
				'contentid' : id || this.state.answer.id
			}
		}))
	}

	onPostAnswer(answerContent) {
		const { isEdit, answer } = this.state;
		let payLoad  = {
			questionId : answer.questionId,
			content : answerContent
		};
		if(isEdit) {
			payLoad.id = answer.id;
		}
		this.setState({
			isEdit: false
		},() => {
			this.props.dispatch(REQUEST_SAVE_ANSWER(payLoad));
		});
	}

	onCancelAnswer() {
		this.setState({
			isEdit : false
		})
	}

	renderAnswerActions() {
		const { user } = this.props;
		const { answer,comments } = this.state;
		const commentCount = (comments && comments.data && comments.data.length) || answer.commentCount;
		return <AnswerActions
				onEdit = {this.onEditAnswer}
				onDelete = {this.onDeleteAnswer}
				onComments = {this.onComments}
				answerId = {answer.id}
				l = {this.context.i18n.l}
				user = {user}
				answerById = {answer.createdByUserId}
				commentsCount = {commentCount || 0}
			/>

	}

	renderComments() {
		const { comments, isSavingComment } = this.state;
		return <Comments
			dispatch={this.props.dispatch}
			user={this.props.user}
			comments={comments}
			onSignInClick={(mode)=>this.props.onCommentsSignIn(mode)}
			contentId = {this.state.answer.id}
			loadMore = {this.fetchComments}
			scrollToComments = {true}
			isSavingComment = {isSavingComment}
		/>
	}

	render() {
		const { l } = this.context.i18n;
		const { requestComments = false } = this.state;
		return (
			<div className="answer-wrapper">
				<div className="answer-wrapper__info">
					{this.renderUserInfo()}
					{this.renderAnswerActions()}
				</div>
				<div className="answer-wrapper__body">
					{this.renderAnswer()}
					{requestComments && this.renderComments()}
				</div>
			</div>
		);
	}


}


