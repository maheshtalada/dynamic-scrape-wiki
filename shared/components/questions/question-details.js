import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Advertisement from '../advertisement/advertisement';
import { question as questionpdp, adbackground, adlogo } from '../../assets/static/ads-component-config.json';
import Loader from '../common/page-loader/loader';
import { formatDateUtil } from '../../utils/localeUtil';
import moment from 'moment';
import NoResults from '../common/no-results/no-results-found';
import Comments from '../comments/comments';
import { Button } from '../common/button';
import Snackbar from '../common/snackbar/snackbar';
import Answers from '../answers/answers';
import SaveAnswer from '../answers/save-answer';
import QuestionActions from './question-actions';
import UserInfo from '../user-info/user-info';
import SocialShare from '../common/social-share-buttons/social-share-buttons';
import { questiondetails as shareOptions } from '../../assets/static/social-share-options.json';
import BaseDetails from '../../lib/BaseDetails';
import { findIndex as _findIndex } from 'lodash';
import { modal } from 'react-redux-modal';
import AddQuestions from './questions';
import ContactBar from '../common/contact-bar/contact-bar';

import { REQUEST_DELETE_ANSWER, REQUEST_GET_COMMENTS, REQUEST_SAVE_ANSWER } from '../../redux/actions/articles';

const ACTION_MODES = {
	WRITEANSWER : 'answer',
	WRITECOMMENT : 'comment'
};

export default class QuestionDetails extends BaseDetails {

	static contextTypes = {
		i18n : PropTypes.object,
		country: PropTypes.string,
		awsImagePath: PropTypes.string,
		assetsPath : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			questionDetails : props.questionDetails || {},
			answers : props.answers || {},
			comments : props.comments || {},
			openChatFunctionality: false,
			isShowEmailSentNotification: false,
			stepAfterLogin: null,
			isShowCommentAck: false,
			triggerSnack : false
		};

		this.onWriteAnswer = this.onWriteAnswer.bind(this);
		this.onWriteComment = this.onWriteComment.bind(this);
		this.onPostAnswer = this.onPostAnswer.bind(this);
		this.hideCommentAck = this.hideCommentAck.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
		this.onDeleteAnswer = this.onDeleteAnswer.bind(this);
		this.onClickEditQuestion = this.onClickEditQuestion.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props) {
			let enableWriteAnswer = props.answers.isSavingAnswer;
			if(props.user && props.user.user.isLogIn) {
				const {stepAfterLogin, contactActiontype} = this.state;
				BaseDetails.responseHandlers[stepAfterLogin] &&
				BaseDetails.responseHandlers[stepAfterLogin].call(this, {actionType: contactActiontype, ...this.contactBarData});
				if(this.loginBarrier) {
					enableWriteAnswer = true;
				}
			}
			this.setState({
				questionDetails : props.questionDetails,
				answers : props.answers || {},
				comments : props.comments || {},
				isEnableWriteAnswer : enableWriteAnswer,
				isSavingAnswer : props.answers.isSavingAnswer,
				isShowCommentAck : !props.answers.isSavingAnswer && this.state.triggerSnack
			});
		}
	}

	componentDidMount() {
		const { questionDetails } = this.props;
		const questionOwner = questionDetails && questionDetails.user;
		if(questionOwner) {
			frameworkGlobals.emit('joinRoom', {
				room : `PDP:${questionOwner.id}`
			});
		}
	}

	renderAnswers() {
		const { answers } = this.state;
		const { params } = this.props;
		//const { }
		return answers[params.questionid].data && answers[params.questionid].data.map( answer => {
			return (
				<Answers
					key = {answer.id}
					user = {this.props.user.user}
					answer={answer}
					isEdit = {false}
					onDeleteAnswer = {this.onDeleteAnswer}
					dispatch = {this.props.dispatch}
					comments = {this.state.comments}
					onCommentsSignIn = {(mode)=>{this.redirectToLogin(mode)}}
				/>
			)
		})
	}

	onDeleteAnswer(id) {
		const { answers, questionDetails } = this.state;
		const deleteIndex = _findIndex(answers[questionDetails.question.id].data, { id : id});
		this.props.dispatch(REQUEST_DELETE_ANSWER({
			id : id
		},deleteIndex,questionDetails.question.id));
	}

	onWriteComment() {
		const { question } = this.state.questionDetails;
		if(!this.state.requestComments && !this.commentsFetched && question.commentCount > 0) {
			this.fetchComments();
		}
		this.setState((prevState) => {
			return {
				requestComments : !prevState.requestComments
			};
		});
	}

	fetchComments(pageNumber = 1) {
		const { params } = this.props;
		this.commentsFetched = true;
		this.props.dispatch(REQUEST_GET_COMMENTS({
			dataPayload : {
				page : pageNumber
			},
			paramsPayload : {
				'contentid' : params.questionid
			}
		}));
	}

	renderComments() {
		const { dispatch, user, params } = this.props;
		const { comments } = this.state;
		return (
			<Comments
				dispatch={dispatch}
				user={user.user}
				comments={comments[params.questionid]}
				onSignInClick={this.redirectToLogin.bind(this)}
				contentId = {params.questionid}
				loadMore = {this.fetchComments}
				isSavingComment = {comments.isSavingComment || false}
			/>
		)
	}

	onWriteAnswer() {
		const { user } = this.props.user;
		if(!user.isLogIn) {
			this.loginBarrier = true;
			this.redirectToLogin('Log In');
			return;
		}
		this.setState({
			isEnableWriteAnswer : !this.state.isEnableWriteAnswer,
			requestComments : false
		})
	}

	onPostAnswer(answerContent) {
		const { params } = this.props;
		let payLoad  = {
			questionId : params.questionid,
			content : answerContent
		};
		this.loginBarrier = false;
		this.props.dispatch(REQUEST_SAVE_ANSWER(payLoad));
		this.setState({
			triggerSnack : true
		})
	}

	renderUserInfo() {
		const { awsImagePath } = this.context;
		const { user }  = this.props.user;
		const { l } = this.context.i18n;
		return <UserInfo
			user = {{
				photoURL : user.photo && user.photo.thumbnailUri,
				name : user.name
			}}
			awsImagePath = {awsImagePath}
			creationDate ={ moment()}
			l = {l}
		/>
	}

	hideCommentAck() {
		this.setState({
			isShowCommentAck : false,
			triggerSnack : false
		});
	}

	onClickEditQuestion() {
		const { l } = this.context.i18n;
		const { question } = this.state.questionDetails;
		modal.add(AddQuestions, {
			title: l('EDITYOURQUESTION'),
			size: 'custom', // large, medium or small,
			key:'askquestion',
			dispatch : this.props.dispatch,
			pathname : this.props.location.pathname,
			questionId : question.id,
			mode : 'EDIT',
			closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideTitleBar: false,// (optional) Switch to true if do not want the default title bar and close button,
			hideCloseButton: false // (optional) if you don't wanna show the top right close button
		});
	}


	render() {
		const { l } = this.context.i18n;
		const { country, awsImagePath, assetsPath } = this.context;
		const { isEnableWriteAnswer = false, isShowCommentAck = false, isSavingAnswer = false, requestComments, answers, comments, openChatFunctionality, isShowEmailSentNotification } = this.state;
		const { user } = this.props.user;
		const { question,  isFetching } = this.state.questionDetails;
		const questionOwner = this.state.questionDetails.user;
		const disableContactOptions = questionOwner && user ? questionOwner.id === user.id : false;
		//const answers = question.answers || '';
		const shareUrl = !frameworkGlobals.isServer ? window.location.href : '';
		const commentCount = question && ((comments[question.id] && comments[question.id].data && comments[question.id].data.length) || question.commentCount);
		const answersCount = question && answers[question.id] && answers[question.id].data && answers[question.id].data.length;
		const { chatUserStatus } = this.props;
		this.contactBarData = Object.assign({},{
			personId : questionOwner && questionOwner.id,
			contextType : 'QUESTION',
			personName : questionOwner && questionOwner.name,
				defaultMsg : 'DEFAULTQUESTIONEMAILMSG',
			questionId : question.id
		},this.contactBarData);
		return(
			<div className="content-details-page question-details row">
				{ (isFetching || isSavingAnswer) && <Loader/>}
				<Snackbar
					active={isShowCommentAck}
					onTimeout={this.hideCommentAck}>
					{l('ANSWERADDED')}
				</Snackbar>
				<Snackbar active={isShowEmailSentNotification} onTimeout={this.hideEmailNotif}>
					{l('EMAILSENT')}
				</Snackbar>
				{ this.state.questionDetails && question &&
				<div>
					<div className="content-details-page__article-wrap col-lg-offset-1 col-md-offset-0 col-sm-offset-1 col-lg-7 col-md-10 col-sm-10">
						{disableContactOptions &&
						<Button className="content-details-page__article-wrap__edit" onClick={this.onClickEditQuestion}>
							<i className="pe-7s-note"/>
							{l('EDIT')}
						</Button>
						}
						<h1 className="content-details-page__article-wrap__title">{question.title} <span className="content-details-page__article-wrap__category">
							- {l(question.category)}
						</span></h1>
						<p className="content-details-page__question-description">{question.description}</p>
						<div className="content-details-page__article-wrap__tags">
							{
								question.tags && question.tags.map(tag => {
									return (
										<span className="tag">{tag}</span>
									);
								})
							}
						</div>
						<div className="content-details-page__article-wrap__author">
							<div className="content-details-page__article-wrap__author__info">
								<div className="property-details__realtor-info__avatar">
									<img src={questionOwner.photo ? `${awsImagePath}/${questionOwner.photo.thumbnailUri}` : `${assetsPath}/images/noimages/noavatar.png`} />
								</div>
								<div>
									<div className="content-details-page__article-wrap__author__info__user-name">
										{questionOwner && <span>{questionOwner.name}</span>}
									</div>
									<div className="content-details-page__article-wrap__author__info__user-status">
										{questionOwner.status && <span>{questionOwner.status}</span>}
									</div>
									{<div className="content-details-page__article-wrap__author__info__posted-date">
										{<span><span className="label">{l('POSTEDON')} : </span>{formatDateUtil(question.creationDate,country)}</span>}
									</div>}
								</div>
							</div>
							<div className="content-details-page__article-wrap__author__contact-actions">
								<ContactBar
									contactOptions={questionOwner.allowedContactActions || []}
									ownerDetails={questionOwner}
									handleViewPhone = {(actionType) => {
										this.handleViewPhoneOption({
											actionType,
											...this.contactBarData
										});
									}
									}
									handleEmail = {(actionType) => {
										this.handleEmailOption({
											actionType,
											...this.contactBarData
										});
									}
									}
									handleChat = {this.handleChatOption}
									dispatch = {this.props.dispatch}
									openChatFunctionality = {openChatFunctionality}
									canChat = {chatUserStatus}
									userID = {user.id}
									disableContactOptions = {disableContactOptions}

									chatDetails={{
										id : `${questionOwner.id}O${user.id}`,
										displayName : questionOwner.name,
										from : {
											id: user.id,
											name : user.name
										},
										user : {
											id: questionOwner.id,
											name : questionOwner.name
										},
										messages : []
									}}
								/>
							</div>
						</div>
						<div className="content-details-page__question-actions-wrap">
							<QuestionActions
								onAnswer =  {this.onWriteAnswer}
								onComment = { this.onWriteComment}
								commentCount = {commentCount}
								l = {l}
							/>
							{ !frameworkGlobals.isServer && <SocialShare
								shareUrl={shareUrl}
								title={question.title}
								screenSize={this.props.screenSize}
								options={shareOptions}
							/>
							}
						</div>
						{isEnableWriteAnswer &&
							<div className="content-details-page__post-answer">
								<div className="content-details-page__article-wrap__separator"></div>
								{this.renderUserInfo()}
								<SaveAnswer
									answer={''}
									onPostAnswerClick={this.onPostAnswer}
									isEdit={ false }
									onCancelClick={this.onWriteAnswer}
									questionId={question.id}
									user={this.props.user.user}
								/>
							</div>
						}
						<div className="content-details-page__question-comments">
							{ requestComments && this.renderComments()}
						</div>
						{ answers[question.id] &&
							<div className="content-details-page__answers-wrap">
								<div className="content-details-page__article-wrap__separator"></div>
								{ answersCount > 0 && <p className="content-details-page__answers-wrap__answer-count"><span>{answersCount}</span> {l('ANSWERS')}</p>}
								{ this.renderAnswers()}
							</div>
						}
					</div>
					<div className="content-details-page__ad-wrap col-lg-3 col-md-3 col-sm-3 hidden-sm hidden-xs">
						<Advertisement
							adBg={adbackground}
							adTitle={l(questionpdp.ADQUESTIONPDPTEXT)}
							adInfo={l(questionpdp.ADQUESTIONPDPHIGHLIGHT)}
							logo={adlogo}
							l={l}
						/>
						<div className="content-details-page__ad-wrap__promo">
							<Advertisement
								adTitle={l("YOURADHERE")}
								l={l}
								isExternalAd={true}
							/>
						</div>
					</div>
				</div>
				}
				{!question && isFetching === false &&
				<NoResults l={l} title="NULLQUESTIONTITLE" message="NULLQUESTIONMESSAGE"/>
				}
			</div>
		);
	}
}


