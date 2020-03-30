import React , { Component } from 'react';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import QuestionDetails from '../components/questions/question-details';
import { REQUEST_GET_QUESTION } from '../redux/actions/articles';

class QuestionDetailPage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<QuestionDetails {...this.props}/>
		);
	}

}

const mapStateToProps = ({articles}) => (
	 {

	 	'questionDetails' : articles.question_details,
		 'comments' : articles.comment_details,
		 'answers' : articles.answer_details
	}
);

export default connect(mapStateToProps)(
	connectDataFetchers(QuestionDetailPage, [
		REQUEST_GET_QUESTION
	])
);
