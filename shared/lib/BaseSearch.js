import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'components/common/chip/chip';
import {modal} from 'react-redux-modal';
import Cx from 'classnames';
import SearchWidget from 'components/quicksearch/searchwidget';
import SearchFilterWrapper from 'components/applied-facets/search-filter-wrapper';
import { formatCurrency, localeCurrency, getValueByLocale, handleLargeNumbers } from 'utils/localeUtil';
import { buildQueryObject, genarateAppliedFacets, getPartialSearchAttribute, sortFacetsByOrder, formatArea, generateFlatBucketAggregations, daysToWeeks, getDaysSince, replaceHyphenWithSpace } from 'utils/searchUtil';
import { getImagePath } from 'utils/propertyUtil';
import SearchFacets from 'components/common/search-facets/search-facets';
import Paginate from 'components/pagination';
import ImageNotFound from 'components/common/image-not-found/image-not-found';
import NoResults from 'components/common/no-results/no-results-found';
import { findIndex as _findIndex, groupBy as _groupBy, size, throttle } from 'lodash';
import { sprintf } from 'utils';
import Wishlist from 'components/add-to-wishlist/wishlist';
import AppContants from 'utils/app-constants';
const { MAP_VIEW } = AppContants;

const PRICE = 'price';
const AREA = 'area';
const RPSF = 'rpsf';
const RANGESLIDER = 'RangeSlider';

export default class BaseSearch extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath: PropTypes.string,
		country : PropTypes.string,
		screenSize : PropTypes.number
	};

	static getFacetObject(facetsObject) {
		let toObj = {};
		Object.keys(facetsObject).map((facet)=>{
			toObj[facet]=''
		});
		return toObj;
	}

	static valueHandlers = {
		convertPriceRange(l,{value,minAggValue,maxAggValue}, country) {
			const range = value.split('-');
			const currencyFormat = getValueByLocale(country,'currencyFormat');
			if(!Number(range[1])) {
				return `${formatCurrency(range[0]||minAggValue,0,currencyFormat)}+`;
			}
			if(!Number(range[0])) {
				return `${l('UPTO')} ${formatCurrency(range[1]||maxAggValue,0,currencyFormat)}`;
			}
			return `${formatCurrency(range[0]||minAggValue,0,currencyFormat)} - ${formatCurrency(range[1]||maxAggValue,0,currencyFormat)}`;
		},
		convertRangeToValues(l,{value,minAggValue,maxAggValue}) {
			const range = value.split('-');
			if(!Number(range[1])) {
				return `${handleLargeNumbers(range[0]||minAggValue,1)}+`;
			}
			if(!Number(range[0])) {
				return `${l('UPTO')} ${handleLargeNumbers(range[1]||maxAggValue,1)}`;
			}
			return `${handleLargeNumbers(range[0]||minAggValue,1)} - ${handleLargeNumbers(range[1]||maxAggValue,1)}`;
		},
		convertRangeNumberOfDays(l,{value,minAggValue,maxAggValue}) {
			const range = value.split('-');
			if(!Number(range[1])) {
				return daysToWeeks(Number(range[0]),l,'<');
			}
			if(!Number(range[0])) {
				return daysToWeeks(Number(range[1]),l,'>');
			}
			return `${daysToWeeks(Number(range[0]),l)} - ${daysToWeeks(Number(range[1]),l)}`;
		},
		convertBooleanToYesNo(l,{value}) {
			return value ? l('YES') : 'NO';
		},
		convertAreaRange(l,{value, minAggValue, maxAggValue}, country) {
			const range = value.split('-');
			let area;
			if(!Number(range[1])) {
				area = formatArea(range[0]||minAggValue,l,country);
				return `${area.formattedValue} ${area.uom}+`;
			}
			if(!Number(range[0])) {
				area = formatArea(range[1]||maxAggValue,l,country);
				return `${l('UPTO')} ${area.formattedValue} ${area.uom}`;
			}
			const areaMin = formatArea(range[0]||minAggValue,l,country);
			const areaMax = formatArea(range[1]||maxAggValue,l,country);
			return `${areaMin.formattedValue} ${areaMin.uom} - ${areaMax.formattedValue} ${areaMax.uom}`;
		},
		convertSelectBoxValues(l,{value}) {
			return value.replace("-","+");
		},
		cityNameFormatter(l,{value}) {
			return replaceHyphenWithSpace(value);
		}
	};

	static facetChangeHandlers = {

		facetChange({facet, value}) {
			return BaseSearch.facetChangeHandlers.defaultFacetChange(this.facets, value, facet)
		},

		RangeSlider({facet, value}) {
			return BaseSearch.facetChangeHandlers.defaultFacetChange(this.facets, value, facet)
		},

		Slider({ facet, value}) {
			return BaseSearch.facetChangeHandlers.defaultFacetChange(this.facets, value, facet)
		},

		RadioList({ facet, value}) {
			return BaseSearch.facetChangeHandlers.defaultFacetChange(this.facets, value, facet)
		},

		Checkbox({ facet, value}) {
			return BaseSearch.facetChangeHandlers.defaultFacetChange(this.facets, value, facet)
		},

		CheckboxList({facet, value, isChecked}) {
			const aggsWithBuckets = this.aggregations.filter(agg => !!agg.buckets);
			const flatBucketAggregations = generateFlatBucketAggregations(aggsWithBuckets);
			return Object.assign(this.facets, {[facet] : BaseSearch.getModifiedSelectedTypes(isChecked,this.facets[facet]||'',value,flatBucketAggregations[facet])});
		},

		NestedCheckboxList({facet, isChecked, value, siblings, nestedFacet, nestedValues}) {
			const aggsWithBuckets = this.aggregations.filter(agg => !!agg.buckets);
			const flatBucketAggregations = generateFlatBucketAggregations(aggsWithBuckets);
			let nestedSiblings = [];
			const sibling = find(siblings,{ key : value });
			if(sibling && sibling.children) {
				nestedSiblings = sibling.children[0].buckets;
				nestedFacet = nestedFacet || sibling.children[0].name;
				nestedValues = nestedValues || nestedSiblings.map(s => s.key);
			}
			return Object.assign(this.facets, {[facet]: BaseSearch.getModifiedSelectedTypes(isChecked,this.facets[facet],value,flatBucketAggregations[facet]),
				[nestedFacet]: BaseSearch.getModifiedSelectedTypes(isChecked,this.facets[nestedFacet]||'',nestedValues||[''],flatBucketAggregations[nestedFacet])});
		},

		Switch({facet, value}) {
			return BaseSearch.facetChangeHandlers.defaultFacetChange(this.facets, value, facet)
		},

		SelectBoxes({value, facet}) {
			return BaseSearch.facetChangeHandlers.defaultFacetChange(this.facets, value, facet)
		},

		SearchPurchaseType({value, facet}) {
			return BaseSearch.facetChangeHandlers.defaultFacetChange(this.facets, value, facet)
		},

		defaultFacetChange(facets, value, facet) {
			return Object.assign(facets, {[facet]:value});
		}

	};

	static getModifiedSelectedTypes(selected,prevState='',typeValues,validSearchFacets=[]) {
		let modPrevState = prevState ? prevState.split(',') : [];
		if(typeValues.constructor !== Array) {
			typeValues = [typeValues];
		}
		typeValues.map(value => {
			const index = modPrevState.indexOf(value);
			if(selected) {
				index === -1 && modPrevState.push(value);
			} else {
				if(index > -1) {
					modPrevState = [...modPrevState.slice(0,index),...modPrevState.slice(index+1)];
				}
			}
		});
		if(validSearchFacets.length) {
			modPrevState = modPrevState.filter(facet => {
				return validSearchFacets.indexOf(facet) > -1
			})
		}
		return modPrevState.join(',');
	}

	static getSelectedSortOptionIndex(sort,sortorder,options) {
		if(sort && sortorder) {
			return _findIndex(options,{ value : `${sort}-${sortorder}`});
		}
	}

	static defaultInvestmentCategoryOption(type, categoryDefault) {
		if(type === 'leveraged' && categoryDefault === 'highcashflow') {
			return { investmentcategories : 'highcashoncash'}
		}

		if(type === 'cash' && categoryDefault === 'highcashoncash') {
			return { investmentcategories : 'highcashflow'}
		}
	}

	constructor(props) {
		super(props);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.addSearchModal = this.addSearchModal.bind(this);
		this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
		this.clearFilters = this.clearFilters.bind(this);
		this.onModalSearchClick = this.onModalSearchClick.bind(this);
		this.onProptypeFacetChange = this.onProptypeFacetChange.bind(this);
		this.toggleFilterOverlay = this.toggleFilterOverlay.bind(this);
		this.onUpdateState = this.onUpdateState.bind(this);
		this.onBundleToggleClick = this.onBundleToggleClick.bind(this);
		this.facetObject = undefined;
	}

	handleFiltersHeight() {
		const filtersDom = document.getElementsByClassName('search-results-layout__filters')[0];
		const footerDom = document.getElementsByClassName('footer-main')[0];
		if(filtersDom && footerDom) {
			if(footerDom.getBoundingClientRect().top < filtersDom.getBoundingClientRect().bottom) {
				filtersDom.style.height = `${footerDom.getBoundingClientRect().height - (filtersDom.getBoundingClientRect().bottom - footerDom.getBoundingClientRect().top)}px`
			} else {
				filtersDom.style.height = `${footerDom.getBoundingClientRect().height + (footerDom.getBoundingClientRect().top - filtersDom.getBoundingClientRect().bottom)}px`
			}
		}
	}

	toggleFilterOverlay() {
		this.setState({
			showFilterOverlay : !this.state.showFilterOverlay
		});
	}

	getStateObject() {
		if(typeof this.facetObject !== 'object') {
			this.facetObject = BaseSearch.getFacetObject(this.facetObjectData);
		}

		return {
			id : this.props.id,
			isFetching : true,
			currentPage : this.props.location.query.page || 1,
			toggleFilter: false,
			aggregations : this.props.aggregations || [],
			resulttab : this.props.resulttab,
			listings: this.props.data || [],
			total:this.props.total || '',
			pageCount: this.props.totalpage,
			mapBounds : this.props.mapBounds,
			facets: Object.assign({}, this.facetObject, this.props.location.query || {}),
			appliedfacets: genarateAppliedFacets(buildQueryObject(Object.assign({}, this.props.location.query)),this.facetObjectData,this.props.aggregations || [],this.IGNORE_APPLIED_FACETS),
			filterBtnText : 'Show Filter',
			lat : this.props.location.query.q && this.props.location.query.q.split(',')[0] || '',
			lon : this.props.location.query.q && this.props.location.query.q.split(',')[1] || '',
			uniueID:'',
			panelToShow: '',
			marker: '',
			formattedAddress: frameworkGlobals.location,
			searchType: this.props.params.type,
			leadRealtors: this.props.leadRealtors
		};

		// view: cookie.parse(document.cookie).view || DEFAULT_VIEW,
	}

	onUpdateState(stateKey,value,callback=()=>{}) {
		this.listingData = [];
		this.setState({
			[stateKey] : value
		},callback);
	}

	clearFilters(type='', facet='', value='', isChecked='', siblings) {

		if(type === 'CheckboxList' || type === 'NestedCheckboxList') {
			const facetObj = BaseSearch.facetChangeHandlers[type].call(this.state,{facet, value, isChecked, siblings});
			this.redirectURL(facetObj);
			return;
		}

		if( type && facet && typeof facet === 'string') {
			this.redirectURL(buildQueryObject(this.state.facets,facet));
			return;
		}

		const {location} = this.props;
		if(location.query) {
			let persistQueryObject = {};
			this.IGNORE_APPLIED_FACETS.forEach(facet => {
				persistQueryObject[facet] = location.query[facet];
			});
			this.redirectURL(persistQueryObject);
		} else {
			this.redirectURL({});
		}
	}

	redirectURL(facetObj='',pageChange) {
		let queryFacets = facetObj || this.state.facets,
			{params, location} = this.props,
			mapViewOptions='';
		const { resulttab, view, purchaseType } = this.state;
		const queryObj = buildQueryObject(Object.assign({},{q: location.query.q, bound: location.query.bound, statecode: location.query.statecode, metrogeoid: location.query.metrogeoid},queryFacets,{view : view},BaseSearch.defaultInvestmentCategoryOption(queryFacets.purchasetype,queryFacets.investmentcategories)));
		!pageChange && delete queryObj['page']; //to make sure we stay on page 1 when any of the filters are applied

		if(view === MAP_VIEW) {
			const page = !queryObj['count'] && 1 || queryObj['page'] || 1;
			mapViewOptions = {
				count : 200*Number(page),
				page
			}
		}else {
			//delete queryObj['page'];
			delete queryObj['count'];
		}

		console.log(facetObj);

		this.context.router.push({
			pathname: location.pathname,
			query: { ...queryObj, ...mapViewOptions}
		});

	}

	onProptypeFacetChange(facet, value, extraState) {
		const {location, params} = this.props;
		this.setState({
			facets : Object.assign(this.state.facets, {[facet]:value}),
			...extraState
		});
		const nameSearchKey = getPartialSearchAttribute(params.type);

		const partialSearch = this.state.facets[nameSearchKey] ? { [nameSearchKey] : this.state.facets[nameSearchKey] } : {} ;
		if(value === 'all') {
			this.redirectURL({...partialSearch,radius: location.query.radius});
			return;
		}
		this.redirectURL(Object.assign({
			[facet] : value,
			radius: location.query.radius
		},partialSearch));

	}

	renderPillValue(showAll,item) {
		const { l } = this.context.i18n;
		const { country } = this.context;
		const pillPrefix = showAll ? '' : `${l(item.name)} : `;
		if(typeof BaseSearch.valueHandlers[item.valueHandler] === 'function') {
			return `${pillPrefix}${BaseSearch.valueHandlers[item.valueHandler](l, item, country)}`;
		}
		return `${pillPrefix}${l(item.value.toUpperCase())}`;
	}

	renderIndividualFacetPill(facets,showAll) {
		return (
			<div className="flex flex-wrap">
				{
					facets.map( (item) => {
						return (
							<Chip onClose={e => {
								this.clearFilters(item.type, item.facet, item.value, item.isChecked, item.siblings||[]);
							}}>
								{
									this.renderPillValue(showAll,item)
								}
							</Chip>

						);
					})
				}
			</div>
		)
	}

	renderFacetPills(appliedfacets,showAll) {
		const { l } = this.context.i18n;
		const sortedAppliedFacets = sortFacetsByOrder(appliedfacets);
		const groupedAppliedFacets = _groupBy(sortedAppliedFacets,'name');
		if(showAll) {
			return Object.keys(groupedAppliedFacets).map(facetType => {
				return (
					<div className="applied-facet-group">
						<p className="applied-facet-group__facet-type">{l(facetType)}</p>
						{this.renderIndividualFacetPill(groupedAppliedFacets[facetType],showAll)}
					</div>
				)
			})
		} else {
			return this.renderIndividualFacetPill(appliedfacets);
		}
	}

	renderAppliedFacets() {
		const { screenSize } = this.props;
		const { appliedfacets } = this.state;
		return (
			<div className="appliedfacets-wrapper flex flex-align-center">
				{/* screenSize > 3 && size(appliedfacets) ?
					this.renderFacetPills(appliedfacets.slice(0, 1)) : null
				*/}
				{size(appliedfacets) ?
					<SearchFilterWrapper facetSize = {size(appliedfacets)} clearAllFilters = {this.clearFilters}>
						{this.renderFacetPills(appliedfacets,true) }
					</SearchFilterWrapper> : null
				}
			</div>
		)

	}

	onTypeChange(value) {
		const sortOptions = value.split('-');
		let payLoad = {'sort':sortOptions[0], 'sortorder':sortOptions[1]};
		if(this.props.location.query.page) {
			payLoad.page = this.props.location.query.page;
		}
		this.redirectURL(Object.assign({},
			this.state.facets,
			payLoad
		));
	}

	addSearchModal() {
		const { l } = this.context.i18n;
		modal.add(SearchWidget, {
			title: l('SEARCH'),
			location: this.props.location && this.props.location.query && this.props.location.query.q,
			size: 'custom', // large, medium or small,
			closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideTitleBar: false,// (optional) Switch to true if do not want the default title bar and close button,
			hideCloseButton: false, // (optional) if you don't wanna show the top right close button
			...this.props,
			onModalSearchClick: this.onModalSearchClick
		});
	}

	onModalSearchClick(formattedAddress) {
		this.setState({
			formattedAddress
		});
		modal.clear();
	}

	handleBackgroundClick() {
		this.toggleFilter();
	}

	handlePageClick({selected}) {
		// if data exist for the page, then get it
		const pageChange = true;
		if(this.props.location.query.sort) {
			this.redirectURL(Object.assign({},
				this.state.facets,
				{
					'page': selected,
					'sort': this.props.location.query.sort,
					'sortorder': this.props.location.query.sortorder
				},
			),pageChange);
		} else {
			this.redirectURL(Object.assign({},this.state.facets,{'page':selected}),pageChange);
		}
	}

	renderFacets (facetData,mobileFacetProps) {
		const { aggregations, facets,resulttab, purchaseType} = this.state,
			 { params, location } = this.props,
			 { SEARCH_BY_NAME_CONFIG } = this.contantsConfig;
		return (<SearchFacets
			className="item"
			key="filters"
			searchType = {params.type}
			purchaseType = {purchaseType}
			headerTitle = {SEARCH_BY_NAME_CONFIG[params.type].title}
			placeHolder = {SEARCH_BY_NAME_CONFIG[params.type].placeholder}
			facetsData={facetData}
			aggregations={aggregations}
			facets={facets}
			onUpdateState={this.onUpdateState}
			propertyTagTabs={resulttab}
			location={location}
			screenSize={this.props.screenSize}
			onFacetChange={this.onFacetChange}
			onClearFacet = {this.clearFilters}
			{...mobileFacetProps}
		/>)
	}

	renderPagination (hidePageNumbersFlag) {
		const { total, currentPage, pageCount } = this.state;
		return (<div className={Cx('pagination-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12')}>
			<Paginate previousLabel={'previous'}
					  forcePage={currentPage-1}
					  nextLabel={'next'}
					  breakLabel={<a href="">...</a>}
					  breakClassName={'break-me'}
					  pageCount={pageCount}
					  marginPagesDisplayed={2}
					  pageRangeDisplayed={5}
					  onPageChange={this.handlePageClick}
					  containerClassName={'pagination'}
					  subContainerClassName={'pages pagination'}
					  activeClassName={'active'}
					  hidePageNumbers={hidePageNumbersFlag}/>
		</div>);
	}

	renderGridItemThumbNail(image ) {
		const { awsImagePath, i18n:{l} } = this.context;
		return image ?
			<img src={getImagePath(awsImagePath,image)} alt={`${l('PROPERTYIMAGEMISSING')}`} />
			: <ImageNotFound textToShow={`${l('PROPERTYIMAGEMISSING')}`}/>
	}

	renderNoResultsFound() {
		const { l } = this.context.i18n,
			{ params, history } = this.props,
			{ NULL_RESULTS_CONFIG } = this.contantsConfig;
		return <NoResults
				l={l}
				title={NULL_RESULTS_CONFIG[params.type].title}
				message={NULL_RESULTS_CONFIG[params.type].message}
				goBackPrevRoute = {history && history.goBack}
			/>;
	}

	onBundleToggleClick(e) {
		e.preventDefault();
		// e.target won't give dataset
		// using currentTarget
		const id = e.currentTarget.dataset.value;
		// updating styles with react is very expensive
		// in below scenario , doing with js
		let bundlePanel = document.getElementById(`bundle-panel-${id}`);
		if(bundlePanel.classList.contains("bundle-panel")) {
			bundlePanel.classList.remove("bundle-panel");
		} else {
			bundlePanel.classList.add("bundle-panel");
		}
	}

	renderBundleBox(bundle, id, item, isGrid=false) {
		const { awsImagePath, i18n : { l } } = this.context;
		const bundleImage = bundle[0]['image'];
		return (
			<div className="bundle-count-box" data-tag-category='Guided Search' data-tag-action='click' data-tag-label='Guided Search Bundle' data-place={isGrid ? 'bottom': 'top'} onClick={(e)=>{ e.stopPropagation(); e.preventDefault(); this.onAddBundleModal(item); }} data-tip={sprintf(l('BUNDLETOOLTIP'),bundle.length)} data-value={id}>
				{!isGrid && <img src={getImagePath(awsImagePath,bundleImage)} className="image-cover__image" alt="bundles" />}
				<div className="bundle-count-box__content">
					<span className="bundle-count-box__count">{`+${bundle.length}`}</span>
				</div>
			</div>
		)
	}

	renderBundleBoxFooter(bundle, id, price) {
		const { i18n:{l}, country } = this.context;
		const { purchaseType } = this.state;
		let bundleSum = bundle.reduce((accumulator, currentValue)=> {
			return (accumulator + Number(currentValue.price));
		} , price);

		if(purchaseType === 'leveraged') {
			bundleSum = bundleSum / 5;
		}

		let listingList = bundle.map(bundleItem => (bundleItem.id));
		listingList.push(id);
		const currencyFormat = getValueByLocale(country,'currencyFormat');

		return (
			<div className="bundle-panel__header">
				<div className="bundle-panel__header__item">
					<Wishlist propertyId={listingList}
						isIconOnly={false}
						iconClass='pe-7s-like'
						screenSize={this.props.screenSize}
						location={this.props.location}
						user={this.props.user}/>
				</div>
			</div>
		)
	}


}
