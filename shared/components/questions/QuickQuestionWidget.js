import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { REQUEST_QUESTION_MATCHES } from '../../redux/actions/articles';
import { Button } from '../common/button';
import Spinner from '../common/spinner/spinner';
import AddQuestions from './questions';

class QuickQuestionWidget extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.onClickAsk = this.onClickAsk.bind(this);
		this.onQuestionInput = this.onQuestionInput.bind(this);
		this.onQuestionKeyUp = this.onQuestionKeyUp.bind(this);
		this.onCloseMatches = this.onCloseMatches.bind(this);
		this.state = {
			question : '',
			questionMatches : []
		};
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				isFetching : props.questionMatches && props.questionMatches.isFetching,
				questionMatches : (props.questionMatches && props.questionMatches.data) || [],
				user : props.user
			});
		}
	}

	onQuestionInput(evt) {
		this.setState({
			question : evt.target.value,
			showMatches : false
		});
	}

	onQuestionKeyUp(evt) {
		if(evt.keyCode !== 13) {
			return;
		}
		this.onClickAsk();
	}

	onClickAsk() {
		const { question } = this.state;
		const payLoad = {
			q : question
		};
		if(!question) {
			return;
		}
		this.setState({
			showMatches : true
		},() => {
			this.props.dispatch(REQUEST_QUESTION_MATCHES(payLoad));
		});
	}

	onCloseMatches() {
		this.setState({
			showMatches : false
		});
	}

	render() {
		const { l } = this.context.i18n;
		const { disableAsk = false, isFetching, questionMatches, showMatches, question } = this.state;
		return (
			<div className="quick-question-widget search-box">
				<div className="search-bar">
					<input value={question} placeholder={l('TYPEYOURQUESTION')} onKeyUp={this.onQuestionKeyUp} onChange={this.onQuestionInput}/>
					{ showMatches &&
						<div className="quick-question-widget__matches">
							<button className="quick-question-widget__matches__close" onClick={this.onCloseMatches}><i className="pe-7s-close"/> </button>
						{isFetching ?
							<div className="quick-question-widget__matches__spinner-wrap">
								<Spinner/>
								<span>{l('FETCHINGQUESTIONMATCHES')}</span>
							</div>:
							<div>
								{!!questionMatches.length &&
								<div>
									<p className="quick-question-widget__matches__title">{l('MATCHEDQUESTIONSTITLE')}</p>
									<div className="quick-question-widget__matches__list">
										{
											questionMatches.map((match) => (
												<a href={match.uri} target="_blank" key={match.id}><div className="quick-question-widget__matches__list__item">{match.name}</div></a>
											))
										}
									</div>
								</div>}
								<div className="quick-question-widget__post-question">
									{!!questionMatches.length && <p className="quick-question-widget__matches__title">{l('NOMATCHESPOSTQUESTION')}</p>}
									<AddQuestions {...this.props}
												  user={this.props.user.user}
												  questionTitle = {question}/>
								</div>
							</div>
						}
						</div>
					}
				</div>
				<div className="search-btn">
					<Button btnClassName="btn btn-primary" disabled={disableAsk} className="toolbar-group save-search" onClick={this.onClickAsk}>
						{l('ASK')}
					</Button>
				</div>
			</div>
		)
	}
}

export default connect(({articles})=>(
	{
		question : articles.new_question_details||{},
		questionMatches : articles.question_matches
	}
))(QuickQuestionWidget);
