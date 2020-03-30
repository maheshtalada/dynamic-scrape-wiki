import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdvanceSearchWidget from './advance-search-widget';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BaseSearchWidget from '../quicksearch/BaseSearchWidget';
import { options } from '../../assets/static/advance-search-options';
import Cx from 'classnames';
import TabSlider from '../common/tab-slider/tab-slider';
import ReactTooltip from 'react-tooltip';

const OPTIONS = options.filter(option => !option.hidden);

export default class AdvanceSearchLinks extends BaseSearchWidget {
	constructor(props) {
		super(props);
		this.state = {
			searchType : BaseSearchWidget.getSearchType(props),
		};
		this.onCloseAdvanceSearch = this.onCloseAdvanceSearch.bind(this);
	}

	static propTypes = {
		isTooltipRequired : PropTypes.bool,
		isHomePage : PropTypes.bool
	};

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object
	};

	static defaultProps = {
		isTooltipRequired : true,
		isHomePage : false
	};

	componentWillReceiveProps(newProps) {
		//this.onCloseAdvanceSearch();
		this.forceUpdate();
	}

	onSearchOptionClick(searchType) {
		this.setState({
			searchType : searchType,
			openAdvanceSearch : true,
			type : searchType
		});
	}

	onCloseAdvanceSearch() {
		this.setState({
			openAdvanceSearch : false
		})
	}

	renderHomePageSearchLinks() {
		const { l } = this.context.i18n;
		return (
			<div className="advance-search-links-home__links-wrap">
				{OPTIONS.map((tab,index) => {
					return (<div key={tab.type}
								 className="advance-search-links-home__links-wrap__link"
						>
							<div className="advance-search-links-home__links-wrap__link__icon-wrap" data-tag-category="Search" data-tag-action="" onClick={()=>{this.onSearchOptionClick(tab.type,index)}}>
								<i className={tab.iconClass}/>
							</div>
							<div className="advance-search-links-home__links-wrap__link__name">
								<span>{l(tab.name)}</span>
							</div>
						</div>
					);
				})}
			</div>
		)
	}

	renderHeaderSearchLinks() {
		const { l } = this.context.i18n;
		const { isTooltipRequired } = this.props;
		return (
			<div className="search-options-tabs-wrapper">
				<ul className="search-options-tabs-wrapper__tabs">
					<i className="pe-7s-search search-icon"/>
					<TabSlider settings={{className : 'search-options-tabs-wrapper__tabs__slider'}}>
						{OPTIONS.map((tab,index) => {
							return (<li key={tab.value} data-tip={isTooltipRequired ? l(`${tab.name.toUpperCase()}SEARCHOPTIONINFO`): ''}
										className="search-options-tabs-wrapper__tabs__tab"
										onClick={()=>{this.onSearchOptionClick(tab.value,index)}}>
									<span className="search-options-tabs-wrapper__tabs__tab__wrap">
									<i className={tab.iconClass}/><span className="tab-name">{l(tab.name)}</span>
									</span>
							</li>);
						})}
					</TabSlider>
				</ul>
			</div>
		)
	}

	render() {
		const { openAdvanceSearch, searchType } = this.state;
		const { className, isHomePage } = this.props;
		const linksWrapClassname = isHomePage ? 'advance-search-links-home' : 'advance-search-links';
		return (
			<div className={Cx(linksWrapClassname,className)}>
				{isHomePage ? this.renderHomePageSearchLinks() : this.renderHeaderSearchLinks()}
				{<ReactTooltip/>}
				<TransitionGroup>
				{ openAdvanceSearch &&
					<CSSTransition classNames="zoom-up" timeout={250}>
					<AdvanceSearchWidget searchType={searchType}
										 onClose={this.onCloseAdvanceSearch}
										 optionsConfig={OPTIONS}
										 {...this.props}
					/>
					</CSSTransition>
				}
				</TransitionGroup>
			</div>
		)
	}
}
