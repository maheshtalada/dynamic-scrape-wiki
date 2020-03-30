import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginBarrier from 'lib/LoginBarrier';
import { REQUEST_GET_BLOG_LIST } from '../../redux/actions/articles'
import InfiniteScroll from 'react-infinite-scroll-component';
import ArticleListTile from './article-list-tile';
import ScrollFixed from 'components/common/scroll-fixed/scroll-fixed';
import Advertisement from 'components/advertisement/advertisement';
import ExternalAdvertisement from 'components/advertisement/external-advertisement';
import MobileFooterOptions from 'components/common/mobile-footer-options/mobile-footer-options';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import appConstants from 'utils/app-constants';

class ContentLanding extends LoginBarrier {

	static propTypes = {
		showArticles : PropTypes.bool,
		onClickShowMore : PropTypes.func
	};

	static defaultProps = {
		showArticles: true,
		onClickShowMore : ()=>{}
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath: PropTypes.string,
		assetsPath: PropTypes.string,
		country : PropTypes.string
	};

	constructor(props) {
		super(props);

		this.state = {
			content : props.article_data,
			page : 1,
			hasMore : true
		};
		this.perPage = 10;
		this.nextData = this.nextData.bind(this);
		this.refreshData = this.refreshData.bind();
		this.onClickCreateArticle = this.onClickCreateArticle.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props.article_data){
			this.setState({
				content : props.article_data
			})
		}

	}

	nextData() {
		const { page, content } = this.state;
		const {  total } = content;
		if( (this.perPage * page) < total) {
			this.setState({
				page : page+1
			},()=>{
				this.props.dispatch(REQUEST_GET_BLOG_LIST({
					dataPayload : {
						page : page + 1
					}
				}));
			})
		} else {
			this.setState({
				hasMore : false
			})
		}
	}

	refreshData() {
		console.log('refresh data')
	}

	renderBlogList(data) {
		const { assetsPath, i18n : {l}, country } = this.context;
		return data.map(item => {
			return(
				<ArticleListTile item={item} country={country} assetsPath={assetsPath} l={l}/>
			)
		});
	}

	onClickCreateArticle() {
		this.handleloginBarrierLink(appConstants.CREATE_ARTICLE_LINK);
	}

	renderCreateArticleOption() {
		const { l } = this.context.i18n;
		return (
			<button className="btn btn-sm btn-default create-article-btn" onClick={this.onClickCreateArticle}>
				<i className="pe-7s-note"/>
				<span>{l('CREATEARTICLETITLE')}</span>
			</button>
		)
	}

	mobileFooterOptions() {
		const { i18n : {l} } = this.context;

		const footerOptions = [
			{
				"name" : "CREATEARTICLETITLE",
				"value" : "createarticle",
				"component" : <button className="btn btn-sm btn-default create-article-btn" onClick={this.onClickCreateArticle}>
					<i className="pe-7s-note"/>
					<span>{l('CREATEARTICLETITLE')}</span>
				</button>
			}
		];

		return footerOptions;
	}

	renderShareOption() {
		return (
			null
		);
	}

	render() {
		const { content, hasMore } = this.state;
		const { l } = this.context.i18n;
		const { screenSize } = this.props;
		return (
			<Fragment>
				<div className="content-landing">
					<div className="content-landing__blog-list">
						{ screenSize > 2 && <div className="search-bar-actions flex flex-justify-end">
							{this.renderCreateArticleOption()}
						</div>}
						{ content.data && <InfiniteScroll
							dataLength={content.data.length} //This is important field to render the next data
							next={this.nextData}
							hasMore={hasMore}
							loader={<h4>Loading...</h4>}
							>
							{this.renderBlogList(content.data)}
						</InfiniteScroll>}
					</div>
					{<div className="content-landing__ad-slots hidden-sm hidden-xs">
						<ScrollFixed scrollPosition={0} top={60}>
							<Advertisement
								logo
								l={l}
							/>
							<ExternalAdvertisement dispatch={this.props.dispatch}/>
						</ScrollFixed>
					</div>}
				</div>
				{screenSize <= 2 &&
					<MobileFooterOptions {...this.props} options={this.mobileFooterOptions()} />
				}
			</Fragment>
		)
	}
}

const mapStateToProps = ({articles}) => {
	return { article_data : articles.article_data };
};

export default connect(mapStateToProps)(ContentLanding);


