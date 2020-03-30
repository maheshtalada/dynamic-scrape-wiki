import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Schema } from '../schema';
import QuestionSchema from '../../assets/static/schema/create-question-schema.json';
import { isEmpty, values } from 'lodash';
import { Button } from '../common/button';
import Spinner from '../common/spinner/spinner';
import ContentTags from '../common/content-tags/content-tags';
import LoginBarrier from '../../lib/LoginBarrier';
import { REQUEST_GET_QUESTION_EDIT_SCHEMA } from '../../redux/actions/schema';
import { REQUEST_ADD_QUESTION  } from '../../redux/actions/articles';


const CONFIG = {
	'EDIT' : {
		'saveBtnText' : 'SAVE',
		'tagsEnable' : true
	},
	'ADD' : {
		'saveBtnText' : 'POSTYOURQUESTION'
	}
};

class Question extends LoginBarrier {

	static propTypes = {
		question : PropTypes.object,
		questionId : PropTypes.string,
		mode : PropTypes.string,
		redirectToQuestionDetails: PropTypes.bool
	};

	static defaultProps = {
		question : {},
		questionId : null,
		mode : 'ADD',
		redirectToQuestionDetails : true
	};

	static contextTypes = {
		i18n : PropTypes.object,
		router : PropTypes.object,
		country : PropTypes.string
	};

	constructor(props){
		super(props);

		this.onQuestionTyping =  this.onQuestionTyping.bind(this);
		this.onClickPostQuestion =  this.onClickPostQuestion.bind(this);
		this.updateSelectedTags = this.updateSelectedTags.bind(this);
		this.updateNewTags = this.updateNewTags.bind(this);
		this.onQuestionTitleChange = this.onQuestionTitleChange.bind(this);
		this.selectedTags = [];
		this.state = {
			modifiedValues: {},
			initialValues: {},
			isFetching: false,
			newTags: [],
			fetchedTags: [],
			questionSchema : props.mode === 'ADD' && QuestionSchema,
			questionTitle : props.questionTitle || ''
		};
		this.userLoggedIn = props.user.isLogIn;
	}

	componentDidMount() {
		//this.question.focus();
		const { mode, questionId } = this.props;
		if(mode === 'EDIT') {
			this.props.dispatch(REQUEST_GET_QUESTION_EDIT_SCHEMA({
				id : questionId
			}));
		}
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.selectedTags = props.questionSchema && props.questionSchema.tags && [...props.questionSchema.tags];
			this.setState({
				isAddingQuestion: props.question && props.question.isAddingQuestion,
				isFetching: props.questionSchema && props.questionSchema.isFetching,
				questionSchema: (props.questionSchema && props.questionSchema.schema) || this.state.questionSchema,
				fetchedTags : props.questionSchema && props.questionSchema.tags,
				questionTitle : props.questionTitle
			},()=>{
				if(props.question.questionurl) {
					if(this.props.redirectToQuestionDetails) {
						window.location = props.question.questionurl;
					} else {
						window.location.reload();
					}
				}
				if(!this.userLoggedIn && this.postQuestionRedirect && props.user.isLogIn) {
					this.postQuestion();
				}
			});
		}
	}

	onSchemaChange(changeObject, hasErrors) {
		const { questionSchema } = this.state;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(questionSchema.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	onQuestionTyping() {
		this.question.style.height = (this.question.scrollHeight)+"px";
	}

	onQuestionTitleChange(evt) {
		this.setState({
			questionTitle : evt.target.value
		});
	}

	onClickPostQuestion() {
		let schemasAreValid = true;
		const { questionSchema } = this.state;
		const schemaLength = values(questionSchema.schemas).length;

		for (let i = 0; i < schemaLength; ++i) {
			if (!this.refs[`schema_${i}`].checkSubmissionValid()) {
				schemasAreValid = false;
			}
		}
		if(schemasAreValid) {
			if(this.props.user.isLogIn) {
				this.postQuestion();
			} else {
				this.postQuestionRedirect = true;
				this.redirectToLogin('Log In');
			}
		}
	}

	postQuestion() {
		const { mode } = this.props;
		let payLoad = Object.assign({},
			this.state.initialValues,
			this.state.modifiedValues);
		const { questionTitle } = this.state;
		switch(mode) {
			case 'EDIT' :
				payLoad['question.tags'] = [...this.selectedTags];
				break;
			case 'ADD' :
				payLoad['question.title'] = questionTitle;
		}
		this.userLoggedIn = true;
		this.setState({
			disable : true
		}, () => {
			this.props.dispatch(REQUEST_ADD_QUESTION(payLoad))
		});
	}

	render() {
		const { i18n, country } = this.context;
		const { disable = false, isAddingQuestion, questionSchema, isFetching, newTags, fetchedTags, questionTitle } = this.state;
		const { mode } = this.props;
		return (
			<div className="questions">
				{isFetching && <Spinner/>}
				{!isFetching && questionSchema && <div>
					<div className="questions__user-info">
					</div>
					<div className="questions__create-box">
						{mode === 'ADD' && <textarea placeholder={l('TYPEYOURQUESTION')} value={questionTitle} onChange={this.onQuestionTitleChange} ref={ el=> this.question = el} onKeyDown={this.onQuestionTyping}></textarea>}
					</div>
					<div className="questions__more-info">
						<Schema
							l={i18n.l}
							country = {country}
							ref="schema_0"
							data={questionSchema.schemas[0]}
							writeMode={true}
							onChange={this.onSchemaChange.bind(this)}
							modifiedValues={this.state.modifiedValues}
							initialValues={this.state.initialValues}
							referenceData={questionSchema.referenceData}
						/>
					</div>
					{CONFIG[mode].tagsEnable &&
						<div className="questions__tags">
							<h2>{l('EDITTAGS')}</h2>
						<ContentTags newTags={newTags}
									 fetchedTags={fetchedTags}
									 selectedTags={this.selectedTags}
									 updateSelectedTags={this.updateSelectedTags}
									 updateNewTags={this.updateNewTags}/>
						</div>
					}
					<div className="questions__actions">
						{!this.props.user.isLogIn && <span className="questions__actions__login-prompt">{`${l('LOGINANDPOSTQUESTION')}*`}</span>}
						{ isAddingQuestion && <Spinner/>}
						<Button className="save-search" disabled={disable}
								onClick={this.onClickPostQuestion}>
							<i className="pe-7s-box1" />
							{l(CONFIG[mode].saveBtnText)}
						</Button>
					</div>
				</div>}
			</div>
		)
	}

	updateSelectedTags(updatedSelectTags) {
		this.selectedTags = updatedSelectTags;
	}

	updateNewTags(updatedNewTags) {
		this.setState({
			newTags : updatedNewTags
		});
	}

}

export default connect(({articles,schema})=>(
	{
		question:articles.new_question_details||{},
		questionSchema: schema.question_schema
	}
))(Question);

