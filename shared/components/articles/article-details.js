import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Advertisement from '../advertisement/advertisement';
import Loader from 'components/common/page-loader/loader';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { articledetails as shareOptions, shareViaEmailOptions } from 'assets/static/social-share-options.json';
import { formatDateUtil } from 'utils/localeUtil';
import NoResults from 'components/common/no-results/no-results-found';
import Comments from 'components/comments/comments';
import ContactBar from 'components/common/contact-bar/contact-bar';
import { sprintf } from 'utils';
import appConstants from 'utils/app-constants';
import { Link } from 'react-router';
import { Button } from 'components/common/button';
import Snackbar from 'components/common/snackbar/snackbar';
import ContentLike from './content-like';
import { throttle } from 'lodash';
import ContactBarHandlers from 'lib/ContactBarHandlers';
import ScrollFixed from 'components/common/scroll-fixed/scroll-fixed';
import ExternalAdvertisement from 'components/advertisement/external-advertisement';
import { REQUEST_LIKE_ARTICLE, REQUEST_GET_COMMENTS, REQUEST_UPDATE_BLOG_STATUS } from '../../redux/actions/articles';
import { getAbsoluteUrl } from 'utils/urlUtil';

const SHARE_ACTIONS_OFFSET = 30;
const BLOG_STATUS = {
	PENDING_APPROVAL : {
		title : 'BLOGPENDINGTITLE',
		descMsg : 'BLOGPENDINGDESCRIPTION',
	},
	PENDING_CONTENT_APPROVAL : {
		title : 'BLOGPENDINGCONTENTTITLE',
		descMsg : 'BLOGPENDINGCONTENTDESCRIPTION',
	},
	DRAFT : {
		title: 'BLOGDRAFTTITLE',
		descMsg: 'BLOGDRAFTDESCRIPTION'
	},
	REJECTED : {
		title: 'BLOGREJECTEDTITLE',
		descMsg: 'BLOGREJECTEDDESCRIPTION'
	},
	CLOSED : {
		title: 'BLOGCLOSEDTITLE',
		descMsg: 'BLOGCLOSEDDESCRIPTION'
	},
	EXPIRED : {
		title: 'BLOGEXPIREDTITLE',
		descMsg: 'BLOGEXPIREDDESCRIPTION'
	}
};

export default class ArticleDetails extends ContactBarHandlers {

	static contextTypes = {
		i18n : PropTypes.object,
		country: PropTypes.string,
		awsImagePath: PropTypes.string,
		assetsPath : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			articleDetails : props.articleDetails || {},
			comments : props.comments && props.comments[props.params.articleid] || {},
			openChatFunctionality: false,
			isShowEmailSentNotification: false,
			stepAfterLogin: null,
			articleLikeCount : (props.articleDetails && props.articleDetails.newsArticle.likes) || 0,
			showBottomActions : false
		};

		this.onLoadMore = this.onLoadMore.bind(this);
		this.onClickArticleLike = this.onClickArticleLike.bind(this);
		this.showBottomActions = this.showBottomActions.bind(this);
		this.onPublishArticle = this.onPublishArticle.bind(this);
	}

	componentWillReceiveProps(props) {
		if (props) {
			if (props.user && props.user.user.isLogIn) {
				const {stepAfterLogin, contactActiontype} = this.state;
				ContactBarHandlers.responseHandlers[stepAfterLogin] &&
				ContactBarHandlers.responseHandlers[stepAfterLogin].call(this, {actionType: contactActiontype, ...this.contactBarData});
				if (this.articleLikeRedirect) {
					this.likeArticle();
				}
			}

			if(props.article_update_status && !props.article_update_status.isFetching) {
				location.reload();
				return;
			}

			this.setState({
				isArticleStatusUpdating : props.article_update_status && props.article_update_status.isFetching,
				commentIsSaving: props.comments && !String(props.comments.isSavingComment) && true || false,
				articleDetails: props.articleDetails,
				comments: props.comments && props.comments[props.params.articleid] || {},
				commentsError: props.comments && props.comments.error || ''
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll',this.showBottomActions);
	}

	componentDidMount() {
		const { articleDetails } = this.props;
		const articleOwner = articleDetails && articleDetails.user;
		/*if(articleOwner) {
			frameworkGlobals.emit('joinRoom', {
				room : `PDP:${articleOwner.id}`
			});
		}*/
		window.addEventListener('scroll',throttle(this.showBottomActions,1000));
	}

	showBottomActions() {
		if(!this.refs.shareActions) {
			return;
		}
		const elementBoundary = this.refs.shareActions.getBoundingClientRect();
		if(elementBoundary.top < SHARE_ACTIONS_OFFSET) {
			this.setState({
				showBottomActions : true
			});
		}
	}

	onClickArticleLike() {
		const { user } = this.props;
		if(user.user.isLogIn) {
			this.likeArticle();
		} else {
			this.articleLikeRedirect = true;
			this.redirectToLogin('Log In');
		}
	}

	likeArticle() {
		const { newsArticle } = this.state.articleDetails;
		const { articleLiked, articleLikeCount } = this.state;
		if(!articleLiked) {
			this.setState({
				articleLiked : true,
				articleLikeCount : articleLikeCount+1
			},() => {
				this.props.dispatch(REQUEST_LIKE_ARTICLE({
					articleid : newsArticle.id
				}));
			});
		}
	}

	onLoadMore(pageNumber) {
		this.props.dispatch(REQUEST_GET_COMMENTS({
			dataPayload : {
				page : pageNumber
			},
			paramsPayload : {
				'contentid' : this.props.params.articleid
			}
		}))
	}

	renderShare() {
		const { location, user, screenSize, dispatch, params, articleDetails } = this.props;
		return (
			<SocialShare
				context="search"
				emailOptions={{
					shareType : "NEWS_ARTICLE",
					articleid : params.articleid
				}}
				location={location}
				user={user}
				shareUrl={getAbsoluteUrl(articleDetails.newsArticle.articleURL)}
				title = {articleDetails.newsArticle.title}
				options = {shareOptions}
				screenSize = {screenSize}
				dispatch = {dispatch}
			/>
		);
	}

	render() {
		const { l } = this.context.i18n;
		const { country, awsImagePath, assetsPath } = this.context;
		const { chatUserStatus, location, dispatch, user } = this.props;
		const { isArticleStatusUpdating = undefined } = this.state;
		const { newsArticle, isFetching } = this.state.articleDetails;
		const articleOwner = this.state.articleDetails.user;
		const shareUrl = !frameworkGlobals.isServer ? window.location.href : '';
		const disableContactOptions = articleOwner && user.user ? articleOwner.id === user.user.id : false;
		const { openChatFunctionality, isShowEmailSentNotification, comments, commentIsSaving, commentsError = undefined, articleLikeCount, articleLiked, showBottomActions } = this.state;
		this.contactBarData = {
			personId : articleOwner && articleOwner.id,
			contextType : 'ARTICLE',
			personName : articleOwner && articleOwner.name,
			defaultMsg : 'DEFAULTARTICLEEMAILMSG',
			articleId : newsArticle && newsArticle.id
		};
		return(
			<div className="content-details-page row">
				{ (isFetching || isArticleStatusUpdating) && <Loader/>}
				<Snackbar active={isShowEmailSentNotification} onTimeout={this.hideEmailNotif}>
					{l('EMAILSENT')}
				</Snackbar>
				{ this.state.articleDetails && newsArticle &&
				<div className="flex">
					<div className="content-details-page__article-wrap">
						{disableContactOptions && newsArticle.status !== "APPROVED" &&
						<div className="listing-confirmation">
							<div className="col-lg-12 col-md-12 listing-confirmation__wrapper-left">
								<div className="listing-confirmation__title mod-bottom">{l(BLOG_STATUS[newsArticle.status].title)}</div>
								<div className="listing-confirmation__description mod-bottom">{l(BLOG_STATUS[newsArticle.status].descMsg)}</div>
								{ newsArticle.status === "DRAFT" && <Button onClick={this.onPublishArticle} btnClassName="btn btn-primary">{l('PUBLISH')}</Button>}
							</div>
						</div>
						}
						{disableContactOptions &&
							<Link to={sprintf(appConstants.EDIT_ARTICLE_LINK,newsArticle.id)} target="_blank">
								<Button className="content-details-page__article-wrap__edit">
									<i className="pe-7s-note"/>
									{l('EDIT')}
								</Button>
							</Link>
						}
						<h1 className="content-details-page__article-wrap__title">{newsArticle.title}</h1>
						<div className="content-details-page__article-wrap__tags">
							{
								newsArticle.tags && newsArticle.tags.map(tag => {
									return (
										<span className="tag">{tag}</span>
									);
								})
							}
						</div>
						<div className="content-details-page__article-wrap__author">
							<div className="content-details-page__article-wrap__author__info">
								<div className="property-details__realtor-info__avatar">
									<img src={articleOwner.photo ? `${awsImagePath}/${articleOwner.photo.thumbnailUri}` : `${assetsPath}/images/noimages/noavatar.png`} />
								</div>
								<div>
									<div className="content-details-page__article-wrap__author__info__user-name">
										{articleOwner && <span>{articleOwner.name}</span>}
									</div>
									<div className="content-details-page__article-wrap__author__info__user-status">
										{articleOwner.status && <span>{articleOwner.status}</span>}
									</div>
									<div className="content-details-page__article-wrap__author__info__posted-date">
										{<span><span className="label">{l('POSTEDON')} : </span>{formatDateUtil(newsArticle.creationDate,country)}</span>}
									</div>
								</div>
							</div>
							<div className="content-details-page__article-wrap__author__contact-actions">
								<ContactBar
									context="Article Details"
									contactOptions={articleOwner.allowedContactActions || []}
									onActionFinished = {()=>{}}
									ownerDetails={articleOwner}
									contactBarData = {this.contactBarData}
									dispatch={dispatch}
									canChat={chatUserStatus}
									user={user}
									location={location}
									disableContactOptions={disableContactOptions}
									chatDetails={{
										id : `${articleOwner.id}O${user.id}`,
										displayName : articleOwner.name,
										from : {
											id: user.id,
											name : user.name
										},
										user : {
											id: articleOwner.id,
											name : articleOwner.name
										},
										messages : []
									}}
								/>
							</div>
						</div>
						<div ref="shareActions" className="content-details-page__article-wrap__share-options">
							{this.renderShare()}
							<ContentLike likeCount={articleLikeCount}
										 liked={articleLiked}
										 l={l}
										 onClickLike={this.onClickArticleLike}/>
						</div>
						<div className="content-details-page__article-wrap__separator"></div>
						<div className="content-details-page__article-wrap__content"
							 dangerouslySetInnerHTML={{__html: newsArticle.articleContent}} />
						<div className="content-details-page__article-wrap__separator"></div>
						<Comments
							dispatch={this.props.dispatch}
							user={user.user}
							comments={comments}
							error={commentsError}
							onSignInClick={this.redirectToLogin.bind(this)}
							contentId = {this.props.params.articleid}
							loadMore = {this.onLoadMore}
							isSavingComment = {commentIsSaving}
						/>
						<div className="content-details-page__article-wrap__separator"></div>
						{showBottomActions && <div className="content-details-page__article-wrap__share-options">
							{this.renderShare()}
							<ContentLike likeCount={articleLikeCount}
										 liked={articleLiked}
										 l={l}
										 onClickLike={this.onClickArticleLike}/>
						</div>}
					</div>
					<div className="content-details-page__ad-wrap hidden-sm hidden-xs">
						<ScrollFixed scrollPosition={0} top={65}>
							<Advertisement
								logo
								l={l}
							/>
							<ExternalAdvertisement dispatch={this.props.dispatch}/>
						</ScrollFixed>
					</div>
				</div>
				}
				{!newsArticle && isFetching === false &&
					<NoResults l={l} title="NULLARTICLETITLE" message="NULLARTICLEMESSAGE"/>
				}
			</div>
		);
	}

	onPublishArticle() {
		this.props.dispatch(REQUEST_UPDATE_BLOG_STATUS({
			dataPayload : {
				status : 'PENDING_APPROVAL'
			},
			paramsPayload : {
				'id' : this.props.params.articleid
			}
		}))
	}
}

