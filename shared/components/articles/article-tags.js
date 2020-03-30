import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/spinner';
import { Button } from '../common/button';
import {modal} from 'react-redux-modal';
import ContentTags from '../common/content-tags/content-tags';
import { REQUEST_ARTICLE_TAGS, SAVE_ARTICLE_TAGS } from '../../redux/actions/articles';

class ArticleTags extends Component {
	static propTypes = {
		articleId: PropTypes.string,
		redirectToPdp: PropTypes.bool,
		onArticleSave: PropTypes.func
	};

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object
	};

	static defaultProps = {
		redirectToPdp: false
	};

	constructor(props) {
		super(props);
		this.state = {
			isFetching: false,
			newTags: [],
			fetchedTags: []
		};
		this.selectedTags = [];

		this.updateSelectedTags = this.updateSelectedTags.bind(this);
		this.updateNewTags = this.updateNewTags.bind(this);
		this.saveTags = this.saveTags.bind(this);
	}

	componentDidMount() {
		const { articleId } = this.props;

		this.props.dispatch(REQUEST_ARTICLE_TAGS({
			paramsPayload : {
				id : articleId
			}
		}));
	}

	componentWillReceiveProps(props) {
		const { articleTags, saveArticleTags, articleId } = props;
		const { redirectToPdp, onArticleSave } = this.props;
		this.setState({
			isFetching: articleTags && articleTags.isFetching,
			fetchedTags: articleTags && (articleTags.data || []),
			isSavingTags: saveArticleTags && saveArticleTags.isSavingTags
		});
		if(articleTags && articleTags.data) {
			this.selectedTags = [...articleTags.data];
		}
		if(saveArticleTags && saveArticleTags.status === 'success') {
			modal.clear();
			if(onArticleSave) {
				onArticleSave(articleId);
			}
			if(redirectToPdp) {
				this.context.router.push({
					pathname : saveArticleTags.articleurl
				});
				//window.location = saveArticleTags.articleurl;
			}
		}
	}

	render() {
		const { isFetching, fetchedTags, newTags, isSavingTags } = this.state;
		const { l } = this.context.i18n;
		return ( isFetching ?
				<div className="m-article-tags__loader">
					<Spinner/>
				</div>:
				<div className="m-article-tags__tags-wrap">
					{isSavingTags &&
						<div className="m-article-tags__loader">
							<Spinner/>
						</div>
					}
					<ContentTags newTags={newTags}
								 fetchedTags={fetchedTags}
								 selectedTags={this.selectedTags}
								 updateSelectedTags={this.updateSelectedTags}
								 updateNewTags={this.updateNewTags}/>
					{/* <div className="m-article-tags__tags-wrap__add-tag">
						<Button onClick={this.addNewTag}><i className="pe-7s-plus"/>{l('ADDNEWTAG')}</Button>
					</div>*/}
					<div className="m-article-tags__tags-wrap__save-tags">
						<Button onClick={this.saveTags}>
							{l('SAVE')}
						</Button>
					</div>
				</div>
		);
	}

	updateSelectedTags(updatedSelectTags) {
		this.selectedTags = updatedSelectTags;
	}

	updateNewTags(updatedNewTags) {
		this.setState({
			newTags : updatedNewTags
		});
	}

	saveTags() {
		const { newTags } = this.state;
		const { articleId } = this.props;
		const allTags = [...this.selectedTags];
		this.props.dispatch(SAVE_ARTICLE_TAGS({
			dataPayload: allTags,
			paramsPayload: {
				id : articleId
			}
		}));
	}
}

const mapStateToProps = ({articles}) => {
	const { article_tags, save_article_tags } = articles;
	return {
		articleTags : article_tags,
		saveArticleTags: save_article_tags
	};
};

export default connect(mapStateToProps)(ArticleTags);
