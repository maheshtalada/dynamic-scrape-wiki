import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import { formatDateUtil } from '../../utils/localeUtil';
import Spinner from '../../components/common/spinner/spinner';
import NoResults from '../../components/common/no-results/no-results-found';
import Actions from '../../components/profile/actions-component';
import { Button } from '../../components/common/button';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import { Link } from 'react-router';
import { modal } from 'react-redux-modal';
import AddQuestions from '../../components/questions/questions';
import { DELETE_QUESTION } from '../../redux/actions/articles';
import { REQUEST_USER_QUESTIONS } from '../../redux/actions/userprofile';

// keys of this config should match with lowercased version of action names we fetch in JSON
const ACTIONS_CONFIG = {
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
		'link' : true
	},
	'delete' : {
		'label' : 'DELETE',
		'icon' : 'trash',
		'callback' : 'deleteItem'
	},
	'edit' : {
		'label' : 'EDIT',
		'icon' : 'note',
		'callback' : 'editQuestion'
	},
	'remove' : {
		'label' : 'REMOVEQUESTION',
		'icon' : 'ticket',
		'callback' : 'removeQuestion'
	}
};

const COLUMN_HEADERS = {
	'title' : {
		label : 'QUESTION',
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
	'actions' : {
		label : 'ACTIONS',
		class : 'article-actions'
	}
};

const MAIN_ACTIONS = [];
const MORE_ACTIONS = ['VIEW','DELETE','REMOVE','EDIT'];
const POST_QUESTION_ROUTE = '/ask-a-question';

class QuestionsComponent extends MyPagesBaseComponent {

	static contextTypes = {
		i18n : PropTypes.object,
		router: PropTypes.object,
		awsImagePath: PropTypes.string,
		country: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			updatingQuestion: false,
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.DELETE_ITEM_ACTION = DELETE_QUESTION;
		this.PAGINATE_PATH_LINK = '/profile/questions';
	}

	static propTypes = {
		dispatch: PropTypes.func
	};

	static defaultProps = {
		userQuestions: {}
	};

	componentWillReceiveProps(props) {
		this.setState({
			questions: props.userQuestions.data,
			isFetching: props.userQuestions && props.userQuestions.isFetching,
			currentPage: props.userQuestions && props.userQuestions.currentPage,
			questionUpdating: props.questionUpdated && props.questionUpdated.updatingid,
			questionUpdated: props.questionUpdated && props.questionUpdated.updatedid,
			questionUpdateError: props.questionUpdated && props.questionUpdated.error
		});
	}

	renderCustomDataGridRow(dataItem,index) {
		const { l } = this.context.i18n;
		const { questionUpdating, questionUpdated, questionUpdateError } = this.state;
		const { country } = this.context;
		const viewUri = this.getViewUri(dataItem.actions,'VIEW');
		const mainActions = this.getActions(dataItem.actions,MAIN_ACTIONS);
		const moreActions = this.getActions(dataItem.actions,MORE_ACTIONS);

		return (
			<ul className="data-grid__data-rows__row__data-list">
				{questionUpdated === dataItem.id && !questionUpdateError &&
				<div className="update-msg-success">
					<span>{l('QUESTIONUPDATED')}</span>
				</div>
				}
				{questionUpdated === dataItem.id && questionUpdateError &&
				<div className="update-msg-fail error-box">
					<span>{l('QUESTIONUPDATEFAILED')}</span>
				</div>
				}
				{questionUpdating === dataItem.id &&
				<Spinner/>
				}
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block article-title">
					{viewUri ?
						<Link to={viewUri} target="_blank">
							{dataItem.title}
						</Link> :
						dataItem.title
					}
				</li>
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block article-category">
					{l(dataItem.category)}
				</li>
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block">
					{formatDateUtil(dataItem.postedDate,country,"DD/MM/YYYY")}
				</li>
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block actions-wrapper">
					<Actions
						mainActions = {mainActions}
						moreActions = {moreActions}
						handleActionClick = {this.handleDataGridAction}
						actionsConfig = {ACTIONS_CONFIG}
						data = {dataItem}
						itemIndex = {index}
					/>
				</li>
			</ul>
		);
	}

	removeQuestion(info) {}

	editQuestion(info) {
		const { l } = this.context.i18n;
		modal.add(AddQuestions, {
			title: l('EDITYOURQUESTION'),
			size: 'custom', // large, medium or small,
			key:'askquestion',
			dispatch : this.props.dispatch,
			pathname : this.props.location.pathname,
			questionId : info.id,
			mode : 'EDIT',
			redirectToQuestionDetails : false,
			closeOnOutsideClick: true, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideTitleBar: false,// (optional) Switch to true if do not want the default title bar and close button,
			hideCloseButton: false // (optional) if you don't wanna show the top right close button
		});
	}

	render() {
		const { l } = this.context.i18n;
		const { isFetching, questions, currentPage} = this.state;
		const { totalpage } = this.props.userQuestions;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__articles-wrapper">
					<div className="profile-page__layout__profile-section__articles-wrapper__header">
						<h1 className="profile-page__layout__profile-section__articles-wrapper__title">
							{l('MYQUESTIONS')}
						</h1>
						<a href={POST_QUESTION_ROUTE} target="_blank">
							<Button btnClassName="btn-primary"><i className="pe-7s-plus"/>{l('POSTQUESTION')}</Button>
						</a>
					</div>
					{isFetching ? <Loader/> :
					questions && questions.length > 0 && <ColumnDataGrid
						data = {questions}
						isPaginationRequired = {true}
						renderDataItem = {this.renderDataItem}
						renderCustomDataGridRow = {this.renderCustomDataGridRow}
						handlePageClick = {this.handlePageClick}
						pageCount = {totalpage}
						currentPage = {currentPage}
						headers = {COLUMN_HEADERS}
					/>}
					{ !questions && isFetching === false &&
					<NoResults l={l} title="YOUHAVENOQUESTIONSTITLE" message="YOUHAVENOQUESTIONSMESSAGE"/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userQuestions: userprofile.user_questions
	};
};
export default connect(mapStateToProps)(connectDataFetchers(QuestionsComponent, [
	REQUEST_USER_QUESTIONS
],true));
