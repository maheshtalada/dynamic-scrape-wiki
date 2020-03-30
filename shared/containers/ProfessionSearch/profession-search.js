import React, {Component } from 'react';
import PropTypes from 'prop-types';
import BaseSearch from '../../lib/BaseSearch';
import { Toolbar} from '../../components/common/toolbar';
import { Button } from '../../components/common/button';
import Cx from 'classnames';
import { other_services_search_facets } from '../../assets/static/search-filter-configuration';
import { find, findIndex, cloneDeep, extend, has, throttle, size, first, isEmpty } from 'lodash';
import { OTHER_SERVICES_SEARCH_FACETS, GRID_VIEW, LIST_VIEW } from '../../utils/app-constants';
import { Panel, PanelHeader, PanelBody, PanelFooter } from '../../components/common/panel';
import { buildQueryObject, genarateAppliedFacets, getPartialSearchAttribute, genarateClasses, isFething, getPostedOndate, generateFlatBucketAggregations } from '../../utils/searchUtil';
import Loader from '../../components/common/page-loader/loader';
import SearchFilterWrapper from '../../components/applied-facets/search-filter-wrapper';
import Advertisement from '../../components/advertisement/advertisement';
import ExternalAdvertisement from '../../components/advertisement/external-advertisement';
import adsConfig from '../../assets/static/ads-component-config.json';
import { formatDateUtil } from '../../utils/localeUtil';
import ScrollFixed from '../../components/common/scroll-fixed/scroll-fixed';
import AreasServed from '../../components/common/realtor-info-components/areas-served';
import HeaderSearch from '../../components/header-search/header-search';
import LeadRealtors from '../../components/lead-realtors';

const PAGE_CONST_CONFIG = {
		'PAGE_TEMPLATE' : '/search/',
		'SEARCH_BY_NAME_CONFIG' : {
			'professional' : {
				'title' : 'SEARCHBYPROFESSIONALNAME',
				'placeholder' : 'SEARCHBYPROFESSIONALNAME'
			},
			'realtor' : {
				'title' : 'SEARCHBYREALTOR',
				'placeholder' : 'SEARCHBYREALTORNAME'
			},
			'content' : {
				'title' : 'SEARCHBYAUTHORNAME',
				'placeholder' : 'SEARCHBYAUTHORNAME'
			},
		},
		'NULL_RESULTS_CONFIG' : {
			'professional' : {
				'title' : 'PROFESSIONALNULLRESULTSTITLE',
				'message' : 'PROFESSIONALNULLRESULTSMESSAGE'
			},
			'realtor' : {
				'title' : 'REALTORNULLRESULTSTITLE',
				'message' : 'REALTORNULLRESULTSMESSAGE'
			},
			'content' : {
				'title' : 'CONTENTNULLRESULTSTITLE',
				'message' : 'CONTENTNULLRESULTSMESSAGE'
			}
		}
	},
	QUESTION = 'QUESTION',
	ARTICLE = 'ARTICLE';

export default class ProfessionSearch extends BaseSearch {

	constructor(props, context) {
		super(props, context);
		this.toggleFilter = this.toggleFilter.bind(this);
		this.addModal = this.addModal.bind(this);
		this.onFacetChange = this.onFacetChange.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.addSearchModal = this.addSearchModal.bind(this);
		this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
		this.onModalSearchClick = this.onModalSearchClick.bind(this);
		this.facetObjectData = other_services_search_facets[this.props.params.type];
		this.state = this.getStateObject();
		this.contantsConfig = PAGE_CONST_CONFIG;
	}

	componentWillReceiveProps(props) {
		// try better alternative
		const { view , toggleFilter, searchType, aggregations } = this.state;
		const { type } = this.props.params;
		this.facetObjectData = other_services_search_facets[props.params.type];
		// in this if condition, if the search type changes from content to professional/realtor,
		// the facetObject would be the previous one hence changed the condition

		// if(typeof this.facetObject !== 'object') {
		// 	this.facetObject = BaseSearch.getFacetObject(this.facetObjectData);
		// }
		if(this.state.searchType !== type) {
			this.facetObject = BaseSearch.getFacetObject(this.facetObjectData);
		}
		if(props) {
			this.setState({
				toggleFilter: (String(view) !== LIST_VIEW) && toggleFilter && isFething(this.props.isFetching, props.isFetching) || false,
				aggregations : props.aggregations,
				listings: props.data || [],
				currentPage : props.currentPage || 1	,
				total: props.total,
				pageCount: props.totalpage,
				facets: Object.assign({}, this.facetObject, props.location.query || {}),
				appliedfacets: genarateAppliedFacets(buildQueryObject(Object.assign({}, props.location.query)),this.facetObjectData,props.aggregations || []),
				isFetching : props.isFetching,
				searchType : type,
				leadRealtors : this.state.leadRealtors.data ? this.state.leadRealtors : props.leadRealtors
			});
		}
	}

	toggleFilter() {
		/* document.cookie = cookie.serialize('filter', (!this.state.toggleFilter), { path: '/', maxAge: 900000 });*/
		this.setState({
			toggleFilter: !this.state.toggleFilter
		});
	}

	onFacetChange(type, facet, value, isChecked, siblings) {
		const facetObj = BaseSearch.facetChangeHandlers[type].call(this.state,{facet, value, isChecked, siblings});
		this.redirectURL(facetObj);
	}

	renderProfessions(type,item) {
		const { l } = this.context.i18n;
		switch(type) {
			case 'professional':
				return item.professions && item.professions.length && (<span className="price">{item.professions.map(p=>l(p.toUpperCase())).join(', ')}</span>);
			case 'realtor':
				return item.specialties && item.specialties.length && (<span className="price">{item.specialties.map(s=>l(s.toUpperCase())).join(', ')}</span>);
		}
	}

	renderContentBadge(contentType,item) {
		const { assetsPath } = this.context;
		if(contentType === QUESTION) {
			return contentType.charAt(0);
		}
		return item.thumbnail ? <img src={item.thumbnail} alt="article photo"/> : <img src={`${assetsPath}/images/noimages/no-article.png`} alt="article photo"/>;
	}

	renderContentResults(grids) {
		const { country, i18n } = this.context;
		const { listings } = this.state;
		let contentType = undefined;
		let listingData = listings && listings.map((item,index) => {
			contentType = item.datatype === 'newsarticle' ? ARTICLE : QUESTION;
					return (<a href={`${item.contenturl}`} target="_blank">
						<Panel key={index} className={Cx(grids)}>
							<PanelBody className="row">
								<div className={Cx('search-listings__media__content-badge', item.datatype)}>
									<span className="search-listings__media__content-badge__text">
										{this.renderContentBadge(contentType,item)}
									</span>
								</div>
								<div className="search-listings__media__content-data">
									<span className="author-name">{item.postedby}</span>
									<span className="content-created-date">{formatDateUtil(item.creationdate,country)}</span>
									<div className="search-listings__data-row">
										<div className="content-title">{item.title}</div>
									</div>
									<div className="search-listings__data-row">
										<div className="content-description">{item.content}</div>
									</div>
									<div className="search-listings__data-row">
										{contentType === QUESTION && <div className="">{`${item.answercount} ${i18n.l('ANSWERS')}`}</div>}
									</div>
									<div className="search-listings__data-row">
										<div className="content-readmore-option">{i18n.l('READMORE')}</div>
									</div>
								</div>
								<div className={Cx('search-listings__media__content-legend', item.datatype)}>{i18n.l(contentType)}</div>
							</PanelBody>
						</Panel>
					</a>)
			});

		return listingData;
	}

	renderListings(grids) {

		const { listings, view } = this.state;
		const { l } = this.context.i18n;
		const professionType = this.props.params.type;
		const toggleClassGridWrap = 'col-lg-9 col-md-8 col-sm-8 col-xs-12';
		const toggleClassMediaGridWrap = 'col-lg-3 col-md-4 col-sm-4 col-xs-12';

		let listingData = listings && listings.map((item,index) => (
				<a href={`${item.profileurl}`} target="_blank">
				<Panel key={index} className={Cx(grids)}>
					<PanelBody className="row">
						<div className={Cx('search-listings__media',toggleClassMediaGridWrap)}>
							{this.renderGridItemThumbNail(item.photo)}
						</div>
						<div className={Cx('search-listings__data',toggleClassGridWrap)}>
							<span className="property-name">{item.name}{item.status && <span className="contact-bar__listing-owner__status"> - {item.status}</span>}</span>
							<div className="search-listings__data-row">
								<div className="col-lg-12 col-md-12 col-sm-12 details">
									<AreasServed areas={item.areas} className="area"/>
									{/* item.companyname &&
									<span className="search-listings__data-row__company-name">{`${l('COMPANY')} : ${item.companyname}`}</span>
									*/}
									<div className="professions">
										{this.renderProfessions(professionType,item)}
									</div>
								</div>
							</div>
							<div className="search-listings__data-row flex-end">
								<div className="col-lg-3 col-md-3 col-sm-3 hidden-xs view-btn">
									<Button className="toolbar-group save-search">
										{`${l('DETAILS')}`}
									</Button>
								</div>
							</div>
						</div>
					</PanelBody>
				</Panel>
				</a>
			)
		);

		return listingData;
	}

	render() {

		const { i18n : {l}, assetsPath } = this.context,
			{ toggleFilter, aggregations, listings, facets, total, isFetching,view, currentPage, appliedfacets, lat, lon, searchType, formattedAddress, leadRealtors} = this.state,
			viewFlg = String(view),
			filterToggleClass = 'side-menu-info',
			 toggleClassFilter = ( viewFlg !== LIST_VIEW && !toggleFilter) ? 'hide-filter' : 'show-filter',
			toggleClassGridWrap = ( viewFlg !== LIST_VIEW ) ? 'col-lg-12 col-md-12 col-sm-12' : 'col-lg-8 col-md-12 col-sm-12',
			{ location, screenSize, params, dispatch, user, chatUserStatus } = this.props,
			filerColClasses = Cx('search-tool-bar__filter-options'),
			viewClasses = genarateClasses(toggleFilter,viewFlg),
			gridViewFilterStyles = ( viewFlg !== LIST_VIEW && !toggleFilter ) ? { width : 0 , height : 0 } : {},
			filterArrowCls = toggleFilter ? 'pe-7s-left-arrow' :'pe-7s-right-arrow',
			layoutClasses = ( viewFlg === GRID_VIEW ) ? 'col-lg-12 col-md-11 col-sm-10' : 'col-lg-12 col-md-12 col-sm-12',
			hidePageNumbersFlag = screenSize < 3;
		return (
			<div key="search-tool-bar" className={Cx('search-tool-bar',viewFlg)}>
				{
					isFetching &&
					<Loader/>
				}
				<HeaderSearch {...this.props}>
					{this.renderAppliedFacets()}
				</HeaderSearch>
				{ listings.length > 0 &&
				<div className="">
					<div className="xs-search-bar col-xs-12 hidden-lg hidden-md">
						{/*<input className="xs-search-bar__search-input" placeholder={`${l('CITYLOCATION')}`} onClick={this.addSearchModal} value={formattedAddress} type="text"/>*/}
						{aggregations && aggregations.length > 0 && <div className="xs-search-bar__search-options">
							<button onClick={this.addModal} className="btn btn-primary">
								{l('FILTERS')}
							</button>
						</div>
						}
					</div>
					{/*<Toolbar className="search-tool-bar__tool-bar" ref="toolbar">
						<Button onClick={this.addModal} btnText="Filters" className="toolbar-group filter-btn"/>
						{ screenSize >= 2 && <div className="toolbar-group">
							<div className="applied-filters col-md-5 col-lg-6 col-sm-2">
								{ (screenSize <= 3 || viewFlg !== LIST_VIEW) &&
								<button onClick={this.toggleFilter} name="map" className={Cx('filters control btn btn-default show-filter col-lg-2 col-md-3 col-sm-12')}>
									<span><i className={filterArrowCls}/>{`${l('FILTERS')}`}</span>
								</button>}
							</div>
						</div>}
					</Toolbar>*/}

					<div className={Cx('search-results-layout', viewFlg)}>
						<div className="search-results-layout__responsive">
							{
								((viewFlg === LIST_VIEW && screenSize > 3) || toggleFilter) &&
								<div
									className={Cx('search-results-layout__filters', filterToggleClass)}
									style={gridViewFilterStyles}>
										{ aggregations && aggregations.length > 0 &&
										this.renderFacets(this.facetObjectData)
										}
								</div>
							}
							<div className={Cx('search-results-layout__results',toggleClassGridWrap)}>
								<div className={Cx('search-listings  col-lg-12 col-md-12 col-sm-12 col-xs-12',viewFlg)}>
									<div className={Cx('search-listings__data-view', viewClasses[viewFlg].wrapper)}>
										{ params.type === 'content' ? this.renderContentResults() : this.renderListings(viewClasses[viewFlg].children)}
									</div>
								</div>

							</div>
						</div>
						<div className="add-slots hidden-xs hidden-sm">
							<div style={{'width': 'inherit'}}>
								<ScrollFixed scrollPosition={0} top={105}>
									<Advertisement
										adBg={adsConfig.adbackground}
										adTitle={l(adsConfig[params.type].ADSEARCHTEXT)}
										adInfo={l(adsConfig[params.type].ADSEARCHHIGHLIGHT)}
										logo={adsConfig.adlogo}
										l={l}
									/>
									{<ExternalAdvertisement dispatch={dispatch}
									/>}
									{<LeadRealtors dispatch={dispatch}
												  user={user}
												   leadRealtors={leadRealtors}
												  chatUserStatus={chatUserStatus}
												  location={location}/>}
								</ScrollFixed>
							</div>
						</div>
					</div>
					{this.renderPagination(hidePageNumbersFlag)}

				</div>
				}
				{listings.length === 0 && !isFetching && this.renderNoResultsFound()}
			</div>
		);
	}

}
