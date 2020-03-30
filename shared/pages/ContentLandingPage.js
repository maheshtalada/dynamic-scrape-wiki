import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import ContentLanding from 'components/articles/article-content-landing';
import { REQUEST_GET_BLOG_LIST } from '../redux/actions/articles';

class ContentLandingPage extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { l } = this.context.i18n;
		return (
			<div className="content-landing-page clearfix">
				<ContentLanding {...this.props} />
			</div>
		);

	}

}

const mapStateToProps = ({articles}) => {
	return { article_data : articles.article_data };
};

export default connect(mapStateToProps)(
	connectDataFetchers(ContentLandingPage, [
		REQUEST_GET_BLOG_LIST
	], true)
);



