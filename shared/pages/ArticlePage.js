import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import ArticleComponent from 'components/articles/create-article';
import { REQUEST_GET_ARTICLE_SCHEMA } from '../redux/actions/schema';

class ArticlePage extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	/*componentWillReceiveProps(props) {}*/

	render() {
		const { l } = this.context.i18n;
		return (
			<div className="schema-create-article schema-page">
				<ArticleComponent {...this.props} />
			</div>
		);
	}

}

const mapStateToProps = ({schema}) => {
	const { schema_get_article, schema_save_article } = schema;
	return {
		'schema_get_article' : schema_get_article,
		'schema_save_article' : schema_save_article
	};
};

export default connect(mapStateToProps)(
	connectDataFetchers(ArticlePage, [
		REQUEST_GET_ARTICLE_SCHEMA
	], true)
);
