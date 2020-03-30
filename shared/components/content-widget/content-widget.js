import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../common/select/select';
import { findIndex as _findIndex } from 'lodash';
import { getPostedOndate } from '../../utils/searchUtil';
import { Button } from '../common/button';
import RadioList from '../common/radio-list/radio-list';
import NoResults from '../common/no-results/no-results-found';

const ARTICLE_DATA_TYPE = 'newsarticle';
const QUESTION_DATA_TYPE = 'question';
const QUESTION_FILTER_CONFIG = {
	'name' : 'answeredstatus'
};

export default class ContentWidget extends Component {

	static propTypes = {
		widgetTitle : PropTypes.string,
		categoryOptions : PropTypes.array,
		selectedCategory : PropTypes.string,
		questionFilterValue : PropTypes.string
	};

	static contextTypes = {
		i18n : PropTypes.object,
		country : PropTypes.string,
		awsImagePath : PropTypes.string,
		assetsPath : PropTypes.string
	};

	static getSelectedCategoryIndex(categories, selectedCategory) {
		return _findIndex(categories, { value : selectedCategory})
	}

	static makeSelectOptionsArray(categories) {
		let optionArray = [{ name : 'CATEGORY' , value : '' }];
		categories.map((category) => {
			optionArray.push({
				name : (category.key).toUpperCase(),
				value : category.key
			})
		});

		return optionArray;
	}

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(props) {
		this.forceUpdate();
	}

	handleActionEvents(externalAction, action, data) {
		const { contentType } = this.props;
		externalAction && externalAction(action,contentType,data);
	}

	renderThumbnail(item) {
		let content;
		const { assetsPath } = this.context;
		if(item.datatype === ARTICLE_DATA_TYPE) {
			content = <img src={`${assetsPath}/images/noimages/no-article.png`} alt="news article"/>
			if(item.thumbnail) {
				content = <img src={`${item.thumbnail}`} alt="article photo"/>
			}
		} else {
			content = item.datatype.charAt(0);
		}
		return (
			<div className="thumbnail">
				<span>
					{content}
				</span>
			</div>
		)
	}

	renderDataInfo(item,l) {
		if(item.datatype === ARTICLE_DATA_TYPE) {
			return (
				<div className="info__readmore">
					{item.content}
				</div>
			)
		}
		return (
			<div className="info__readmore">
				{`${item.answercount || 0} ${l('ANSWERS')}`}
			</div>
		)
	}

	renderData(item) {
		const { l } = this.context.i18n;
		const { country } = this.context;
		return (
			<a href={`${item.contenturl}`} target="_blank">
				<div className="content-widget__body__content-data">
					{this.renderThumbnail(item)}
					<div className="info">
						{/*<span className="info__author-name">{item.postedby}</span>*/}
						{/*<span className="info__created-date">{getPostedOndate(item.creationdate, country, 'Do MMM YYYY')}</span>*/}
						<div>
							<div className="info__title">{item.title}</div>
							{/*<div className="info__description">{item.content}</div>*/}
							{/*<div className="info__readmore">{l('CATEGORY')} : <span className="">{l(item.category.toUpperCase())}</span></div>*/}
							{this.renderDataInfo(item,l)}
						</div>
					</div>
				</div>
			</a>
		)
	}

	render(){
		const { widgetTitle, categoryOptions, selectedCategory,
			onCategoryChange, className, data, postContentTitle,
			showMoreTitle, onHandleEvent, onQuestionFilterChange,
			contentTypeConfig, contentType, questionFilterValue, questionFilterOptions } = this.props;
		const optionsArray = ContentWidget.makeSelectOptionsArray(categoryOptions);
		const selectedIndex = ContentWidget.getSelectedCategoryIndex(optionsArray, selectedCategory);
		const { l } = this.context.i18n;
		return (
			<div className={`content-widget ${className}`}>
				<div className="content-widget__header">
					<h1>{l(widgetTitle)}</h1>
					<Select
						wrapperCls={'btn btn-default'}
						options={optionsArray}
						selected={ selectedIndex > -1 ? selectedIndex :  0}
						inputClasses="no-border"
						onChange={(value)=>this.handleActionEvents(onHandleEvent , 'categoryChange', value)}
					/>
				</div>
				<div className="content-widget__body">
					{
						data && data.length > 0 ? data.map((dataItem,index) => this.renderData(dataItem)) :
							<NoResults
								l={l}
								title={contentTypeConfig[contentType].nullResultsTitle}
								message={contentTypeConfig[contentType].nullResultsMessage}
							/>
					}
				</div>
				<div className="content-widget__footer">
					<div className="content-widget__footer__left">
					{contentTypeConfig[contentType].postContentOption && <Button btnClassName="btn-default" className="content-widget__footer__post-content" onClick={(value)=>this.handleActionEvents(onHandleEvent , 'postContent')}>{l(postContentTitle)}</Button>}
					{contentTypeConfig[contentType].isFiltersRequired &&
						<RadioList
								   facet={QUESTION_FILTER_CONFIG.name}
								   items={questionFilterOptions}
								   selectedVal={questionFilterValue}
								   l={l}
								   classNames="content-widget__footer__question-filters"
								   onChange={(evt)=>this.handleActionEvents(onHandleEvent,'filterChange',evt.target.value)}/>
					}
					</div>
					<button className="btn btn-primary" onClick={(value)=>this.handleActionEvents(onHandleEvent , 'showMore')}>
						{l(showMoreTitle)}
					</button>
				</div>
			</div>
		)
	}
}
