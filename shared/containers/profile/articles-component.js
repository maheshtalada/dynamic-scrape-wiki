import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import appConstants from '../../utils/app-constants';
import { formatDateUtil } from '../../utils/localeUtil';
import Spinner from '../../components/common/spinner/spinner';
import NoResults from '../../components/common/no-results/no-results-found';
import Actions from '../../components/profile/actions-component';
import { modal } from 'react-redux-modal';
import ArticleTags from '../../components/articles/article-tags';
import { Button } from '../../components/common/button';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import { Link } from 'react-router';
import Cx from 'classnames';
import { REMOVE_ARTICLE, DELETE_ARTICLE } from '../../redux/actions/articles';
import { REQUEST_USER_ARTICLES } from '../../redux/actions/userprofile';

// keys of this config should match with lowercased version of action names we fetch in JSON
const ACTIONS_CONFIG = {
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
		'callback' : 'viewArticle',
		'link' : true
	},
	'delete' : {
		'label' : 'DELETE',
		'icon' : 'close-3',
		'callback' : 'deleteItem'
	},
	'tags' : {
		'label' : 'TAGS',
		'icon' : 'ribbon',
		'callback' : 'addArticleTags'
	},
	'edit' : {
		'label' : 'EDIT',
		'icon' : 'note',
		'callback' : 'editArticle',
		'link' : true,
		'path' : appConstants.EDIT_ARTICLE_LINK
	},
	'remove' : {
		'label' : 'REMOVEARTICLE',
		'icon' : 'trash',
		'callback' : 'removeArticle'
	}
};

const COLUMN_HEADERS = {
	'title' : {
		label : 'ARTICLETITLE',
		class : 'article-title'
	},
	'category' : {
		label : 'CATEGORY',
		class : 'article-category'
	},
	'postedDate' : {
		label : 'POSTEDON',
		class : 'article-date'
	},
	'status' : {
		label : 'status',
		class : 'article-status'
	},
	'actions' : {
		label : 'ACTIONS',
		class : 'actions'
	}
};

const MAIN_ACTIONS = ['EDIT','DELETE','REMOVE'];
const MORE_ACTIONS = [];
const POST_ARTICLE_ROUTE = '/blogs/new';

class ArticlesComponent extends MyPagesBaseComponent {

	static contextTypes = {
		i18n : PropTypes.object,
		router: PropTypes.object,
		awsImagePath: PropTypes.string,
		country: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			updatingArticle: false,
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.onArticleSave = this.onArticleSave.bind(this);
		this.DELETE_ITEM_ACTION = DELETE_ARTICLE;
		this.PAGINATE_PATH_LINK = '/profile/blogs';
	}

	static propTypes = {
		dispatch: PropTypes.func
	};

	static defaultProps = {
		userArticles: {}
	};

	componentWillReceiveProps(props) {
		this.setState({
			articles: props.userArticles.data,
			isFetching: props.userArticles && props.userArticles.isFetching,
			currentPage: props.userArticles && props.userArticles.currentPage,
			articleUpdating: props.articleUpdated && props.articleUpdated.updatingid,
			articleUpdated: props.articleUpdated && props.articleUpdated.updatedid,
			articleUpdateError: props.articleUpdated && props.articleUpdated.error
		});
	}

	renderCustomDataGridRow(dataItem,index,headers) {
		const { l } = this.context.i18n;
		const { articleUpdating, articleUpdated, articleUpdateError } = this.state;
		const { country } = this.context;
		const viewUri = this.getViewUri(dataItem.actions,'VIEW');
		const mainActions = this.getActions(dataItem.actions,MAIN_ACTIONS);
		const moreActions = this.getActions(dataItem.actions,MORE_ACTIONS);

		return (
			<ul className="data-grid__data-rows__row__data-list">
				{articleUpdated === dataItem.id && !articleUpdateError &&
				<div className="update-msg-success">
					<span>{l('ARTICLEUPDATED')}</span>
				</div>
				}
				{articleUpdated === dataItem.id && articleUpdateError &&
				<div className="update-msg-fail error-box">
					<span>{l('ARTICLEUPDATEFAILED')}</span>
				</div>
				}
				{articleUpdating === dataItem.id &&
				<Spinner/>
				}
				<li className={Cx(this.itemClasses,"article-title")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.title.label)}</div>}
					<div className={this.itemValueClass}>
						{viewUri ?
							<Link to={viewUri} target="_blank">
								{dataItem.title}
							</Link> :
							dataItem.title
						}
					</div>
				</li>
				<li className={Cx(this.itemClasses,"article-category")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.category.label)}</div>}
					<div className={this.itemValueClass}>
						{l(dataItem.category)}
					</div>
				</li>
				<li className={this.itemClasses}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.postedDate.label)}</div>}
					<div className={this.itemValueClass}>
						{formatDateUtil(dataItem.postedDate,country,"DD/MM/YYYY")}
					</div>
				</li>
				<li className={Cx(this.itemClasses,"article-status")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.status.label)}</div>}
					<div className={this.itemValueClass}>
						{l(dataItem.status)}
					</div>
				</li>
				<li className={Cx(this.itemClasses,"actions-wrapper")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.actions.label)}</div>}
					<div className={Cx("flex flex-align-center",this.itemValueClass)}>
						<Actions
							mainActions = {mainActions}
							moreActions = {moreActions}
							handleActionClick = {this.handleDataGridAction}
							actionsConfig = {ACTIONS_CONFIG}
							data = {dataItem}
							itemIndex = {index}
						/>
					</div>
				</li>
			</ul>
		);
	}

	addArticleTags(info) {
		const { l } = this.context.i18n;
		modal.add(ArticleTags,{
			title: l('ARTICLETAGS'),
			size: 'article-tags',
			articleId: info.id,
			dispatch: this.props.dispatch,
			redirectToPdp: false,
			onArticleSave: this.onArticleSave
		});
	}

	onArticleSave(articleId) {
		// updating the store with empty data as the article has been saved with new tags
		this.setState({
			articleUpdated : articleId
		},() => {
			this.props.dispatch({
				type : 'RESPONSE_SAVE_ARTICLE_TAGS',
				data : {}
			});
		});
	}

	removeArticle(info) {
		this.props.dispatch(REMOVE_ARTICLE({
			data : {
				'status' : 'CLOSED'
			},
			paramData : {
				'id' : info.id
			},
			page : this.props.location.query.page || 1
		}));
	}

	render() {
		const { l } = this.context.i18n;
		const { isFetching, articles, currentPage} = this.state;
		const { totalpage } = this.props.userArticles;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__articles-wrapper">
					<div className="profile-page__layout__profile-section__articles-wrapper__header">
						<h1 className="profile-page__layout__profile-section__articles-wrapper__title">
							{l('MYARTICLES')}
						</h1>
						<a href={POST_ARTICLE_ROUTE} target="_blank">
							<Button btnClassName="btn-primary"><i className="pe-7s-plus"/>{l('POSTANARTICLE')}</Button>
						</a>
					</div>
					{isFetching ? <Loader/> :
					articles && articles.length > 0 && <ColumnDataGrid
						data = {articles}
						isPaginationRequired = {true}
						renderDataItem = {this.renderDataItem}
						renderCustomDataGridRow = {this.renderCustomDataGridRow}
						handlePageClick = {this.handlePageClick}
						pageCount = {totalpage}
						currentPage = {currentPage}
						headers = {COLUMN_HEADERS}
					/>}
					{ !articles && isFetching === false &&
					<NoResults l={l} title="YOUHAVENOARTICLESTITLE" message="YOUHAVENOARTICLESMESSAGE"/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile,articles}) => {
	return {
		userArticles: userprofile.user_articles,
		articleUpdated: articles.article_updated
	};
};
export default connect(mapStateToProps)(connectDataFetchers(ArticlesComponent, [
	REQUEST_USER_ARTICLES
],true));
