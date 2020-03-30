import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';
import CommentSubmitForm from './comment-submit-form';
import { findIndex as _findIndex } from 'lodash';
import { Button } from '../common/button';
import Snackbar from '../common/snackbar/snackbar';
import Spinner from '../common/spinner/spinner';
import scrollToElement from '../../utils/scrollToUtil';
import Loader from '../common/page-loader/loader';
import { REQUEST_DELETE_COMMENT, REQUEST_SAVE_COMMENT } from '../../redux/actions/articles';

const modes = {
	ADD : 'add',
	EDIT : 'edit',
	DELETE : 'delete',
	LOAD : 'load'
};

export default class Comments extends Component {
	static PropTypes = {
		comments : PropTypes.array.isRequired,
		user : PropTypes.object.isRequired,
		onSignInClick :  PropTypes.func.isRequired,
		contentId : PropTypes.number,
		dispatch : PropTypes.func,
		loadMore : PropTypes.func,
		scrollToComments : PropTypes.bool
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string
	};

	static defaultProps = {
		scrollToComments : false
	};

	static responseHandlers = {

		add(newProps) {
			const {isSavingComment} = newProps;
			if (!isSavingComment) {
				this.setState({
					total : newProps.comments.data  && newProps.comments.data.length || '',
					comments : newProps.comments && newProps.comments.data || [] ,
					commentsError : newProps.error,
					commentSaving : isSavingComment,
					commentAck : !isSavingComment && 'COMMENTADDED',
					isShowCommentAck : !isSavingComment,
					isError : newProps.error && true || false
				});
				return;
			}
			this.setState({
				commentSaving : isSavingComment,
				isShowCommentAck : false
			});
		},

		edit(newProps) {
			const {isSavingComment} = newProps;
			if(!isSavingComment) {
				this.setState({
					comments : newProps.comments && newProps.comments.data || [] ,
					commentId : undefined,
					commentsError : newProps.error,
					isEditing : false,
					commentSaving : isSavingComment,
					commentAck : !isSavingComment && 'COMMENTADDED',
					isShowCommentAck : !isSavingComment,
					isError : newProps.error && true || false
				})
				return;
			}
			this.setState({
				commentSaving :isSavingComment,
				isShowCommentAck : false
			});
		},

		delete(newProps) {
			return;
		},

		load(newProps) {
			this.setState({
				comments : newProps.comments && newProps.comments.data,
				total : newProps.comments && newProps.comments.total || 0,
				isFetching : newProps.comments && newProps.comments.isFetching
			});
			return;
		},

	};

	constructor(props){
		super(props);
		this.onClickPost = this.onClickPost.bind(this);
		this.onEditClick = this.onEditClick.bind(this);
		this.onDeleteComment = this.onDeleteComment.bind(this);
		this.keyPress = this.keyPress.bind(this);
		this.onCancelClick = this.onCancelClick.bind(this);
		this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
		this.hideCommentAck = this.hideCommentAck.bind(this);

		this.state = {
			isEditing : undefined,
			comments : props.comments && props.comments.data || [],
			total : props.comments && props.comments.total || 0,
			currentPage : 1,
			actionMode : undefined,
			commentSaving : false,
			commentAck : '',
			isShowCommentAck : false,
			isFetching : props.comments && props.comments.isFetching
		}
	}

	componentDidMount() {
		document.addEventListener('keyup', this.keyPress);
		if(this.props.scrollToComments) {
			scrollToElement(`#comments${this.props.contentId}`);
		}
	}

	componentWillReceiveProps(props) {

		const { actionMode } = this.state;
		// call static response handlers
		if(!actionMode){
			Comments.responseHandlers['load'].call(this, props);
			return;
		}
		Comments.responseHandlers[actionMode] && Comments.responseHandlers[actionMode].call(this, props);
	}

	componentWillUnmount() {
		document.removeEventListener('keyup', this.keyPress);
	}

	onEditClick(evt,id) {
		evt.preventDefault();
		this.setState({
			commentId : id,
			isEditing : true,
			actionMode : modes.EDIT,
			isShowCommentAck : false
		})
	}

	onDeleteComment(id) {
		const {  comments , total } = this.state;
		const deleteIndex = _findIndex(comments, { id : id});
		comments.splice(deleteIndex,1);
		this.setState({
			comments,
			total : total-1,
			actionMode : modes.DELETE
		}, ()=>{
			this.props.dispatch(REQUEST_DELETE_COMMENT({
				commentid : id
			}, this.props.contentId))
		})

	}

	hideCommentAck() {
		this.setState({
			isShowCommentAck : false,
			triggerSnack : false
		});
	}

	renderComments() {
		const { user } = this.props;
		const { awsImagePath, i18n } = this.context;
		const { commentId, isEditing,commentsError, comments, total, lastCommented=undefined, isError = undefined} =  this.state;
		return comments && comments.map((comment)=> {
			return (
				<Comment
					key={comment.id}
					isEdit = {comment.id === commentId}
					comment={comment}
					awsImagePath = {awsImagePath}
					onEdit = {this.onEditClick}
					onRemove = {this.onDeleteComment}
					onClickPost={this.onClickPost}
					onCancelClick={this.onCancelClick}
					isLogIn = {user.isLogin}
					userID={user.id || ''}
					l= {i18n.l}
				/>
			)
		})
	}

	onClickPost(value, id) {

		if(!value || value.trim().length < 2) {
			return;
		}

		let mode = modes.ADD,
		 	payload = {
				comment : value,
				contentId : this.props.contentId
			};

		if(id) {
			payload.id = id;
			mode = modes.EDIT
		}

		this.setState({
			actionMode: mode,
			lastCommented : value
		}, ()=> {
			this.props.dispatch(REQUEST_SAVE_COMMENT({
				dataPayload : payload
			}))
		})
	}

	onCancelClick(evt) {
		evt.preventDefault()
		this.setState({
			commentId : undefined,
			isEditing : false
		})
	}

	renderAddCommentForm(isLogin) {
		const { l } = this.context.i18n;
		const { commentSaving, lastCommented, isError , commentsError} = this.state;
		if(isLogin) {
			return (
				<CommentSubmitForm
					l={l}
					onClickForm={this.hideCommentAck}
					onClickPost={this.onClickPost}
					commentSaving={commentSaving}
					value = {lastCommented}
					isError = {isError}
					error = { commentsError && commentsError.error_description || ''}
				/>
			)
		}
		return (null);
	}

	onLoadMoreClick() {
		const { currentPage } = this.state;
		this.setState({
			currentPage: currentPage+1,
			actionMode: modes.LOAD
		}, ()=> {
			this.props.loadMore(currentPage+1)
		})
	}


	render() {
		const { l } = this.context.i18n;
		const { isLogIn } = this.props.user;
		const userID = this.props.user.id;
		const { isShowCommentAck, commentAck, isFetching, commentSaving, isError } = this.state;

		return (
			<div id={`comments${this.props.contentId}`} className="comments">
				{ (commentSaving) && <Loader/>}
				<div>
					{
						!isLogIn && <div className="comments__login-btn mod">
							<Button btnClassName="btn-primary" onClick={()=>this.props.onSignInClick('Log In')}>{l('SIGNINTOPOSTRESPONSE')}</Button>
						</div>
					}
				</div>
				{ !isError && <Snackbar
					active={isShowCommentAck}
					timeout={3000}
					onTimeout={this.hideCommentAck}>
					{l(commentAck)}
				</Snackbar>}
				{ (isFetching) && <Spinner/>}
				{this.renderAddCommentForm(isLogIn)}
				<div className="article-details-page__article-wrap__separator"></div>
				{
					this.state.total > 0 && <div className="comments__header">
						<i className="pe-7s-comment"></i>
						<span>{` ${this.state.total} ${l('RESPONSES')}`}</span>
					</div>
				}
				{this.renderComments()}
				{ this.props.comments && this.state.currentPage < this.props.comments.totalpage &&  <Button btnClassName="btn-sm btn-primary" className="toolbar-group load-more" onClick={this.onLoadMoreClick}>
					{`${l('LOADMORE')}`}
				</Button>}
			</div>
		)
	}

	keyPress(event) {
		/*if(event.keyCode === 13) {
			this.onClickPost(event);
		}*/
	}

}

