import React , { Component } from 'react';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import ArticleDetails from 'components/articles/article-details';
import { REQUEST_GET_ARTICLE } from '../redux/actions/articles'

class ArticleDetailPage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ArticleDetails {...this.props}/>
		);
	}

}

const mapStateToProps = ({articles}) => {
	const { article_details, comment_details, response_update_article_status, } = articles;
	return {
		'articleDetails' : article_details,
		'comments' : comment_details,
		article_update_status : response_update_article_status,
	};
};

export default connect(mapStateToProps)(
	connectDataFetchers(ArticleDetailPage, [
		REQUEST_GET_ARTICLE
	])
);
