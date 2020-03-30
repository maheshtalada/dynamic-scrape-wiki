import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SearchOptionTabs from 'components/search-options-tabs/search-options-tabs';
import BaseSearchWidget from 'components/quicksearch/BaseSearchWidget';
import loadable from '@loadable/component';
import { searchVariations } from 'assets/static/search-variations';
import MobileSearchOptions from 'components/mobile-search-options/mobile-search-options';
import MobileOverlay from 'components/common/mobile-overlay/mobile-overlay';
import MetrosImgMap from 'components/metros-served/metros-img-map';
import Cx from 'classnames';


const ErrorDisplay = ({ error }) => <div>{error.message}</div>
const LocationSearch = loadable(() => import(/* webpackChunkName: 'LocationSearch' */'components/common/location-search/location-search'));
const MetrosServedNote = loadable(() => import(/* webpackChunkName: 'MetrosServed' */'components/metros-served-note/metros-served-note'));
const SearchByBudget = loadable(() => import(/* webpackChunkName: 'SearchByBudget' */'components/search-by-budget/search-by-budget'));
const MobileSearchWidget = loadable(() => import(/* webpackChunkName: 'SearchByBudget' */'components/quicksearch/mobile-search-widget'));

class HomeSearchWidget extends BaseSearchWidget {

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchType : 'for-sale',
			searchVariation : 'searchByMetro',
			stateCode : '',
			metroGeoId : ''
		};
		this.onSearchVariationChange = this.onSearchVariationChange.bind(this);
		this.toggleMobileSearch = this.toggleMobileSearch.bind(this);
		this.toggleMobileSearchByCategory = this.toggleMobileSearchByCategory.bind(this);
		this.onTypeChange = this.onTypeChange.bind(this);
		this.onMetroSelect = this.onMetroSelect.bind(this);
	}

	toggleMobileSearch(searchType) {
		this.setState({
			searchVariation :searchType,
			showMobileSearch : !this.state.showMobileSearch,
			//searchType : searchType || this.state.searchType
		});
	}

	toggleMobileSearchByCategory() {
		this.setState({
			showMobileSearchByCategory : !this.state.showMobileSearchByCategory
		});
	}

	onSearchVariationChange(tab) {
		this.setState({
			searchVariation : tab.value,
			searchType : tab.searchType || this.state.searchType
		})
	}

	onMetroSelect(metro,isSearch) {
		this.setState({
			stateCode : metro.stateCode,
			metroGeoId : metro.metroGeoId
		},()=>{
			if(isSearch) {
				this.onSearch('','list');
			}
		})
	}

	render() {

		const { l } = this.context.i18n;
		const {searchType, noLocationError, showMobileSearch, searchVariation, showMobileSearchByCategory} = this.state;
		const { screenSize } = this.props;
		const placeHolder = BaseSearchWidget.getSearchOption(this.searchOptions,searchType).searchboxplaceholder;
		const typeIndex = searchType ? BaseSearchWidget.getTypeIndex(this.searchOptions,searchType) : undefined;
		return(
			<Fragment>
				<div className="homepage-search-widget-wrap">
					<SearchOptionTabs tabsInfo={searchVariations}
														 onTabSelect={this.onSearchVariationChange}
					/>


					<div className="search-option-boxes">
						<MobileSearchOptions options={searchVariations}
											 searchType={searchType}
											 l={l}
											 onMetroClick={this.onClickMapSearch}
											 onToggleMobileSearch={this.toggleMobileSearch}
											 toggleMobileSearchByCategory={this.toggleMobileSearchByCategory}
											 onSelect={this.onSearchVariationChange}/>

					</div>

					<div className="search-box-wrapper row">
						<div className={Cx("home-page search-box flex flex-align-center", searchVariation)}
							 ref="searchbox">
							{(searchVariation === 'searchByLocation') && <div className="search-bar">
								<LocationSearch
									searchType={searchType}
									placeHolder={l(placeHolder)}
									onPlaceSelect={this.onPlaceSelect}
									onSearch={this.onSearch}
									screenSize={screenSize}
									inputAutoFocus={true}
									isSearchBtnTextRequired
									isSearchBtnIconRequired={false}
									showMetroServedNote={false}
									noLocationError={noLocationError}>
								</LocationSearch>
								<MetrosServedNote />
							</div>}
							{searchVariation === 'guidedSearch' && <div className="search-bar">
								<SearchByBudget l={l} screenSize={screenSize}/>
							</div>}

							{searchVariation === 'searchByMetro' && <div className="search-bar">
								{screenSize > 1 && <MetrosImgMap /> }
							</div>}
						</div>
					</div>
				</div>
				{showMobileSearch && searchVariation === 'searchByLocation' && <MobileOverlay key="home-search-widget-overlay" className="search-widget-overlay" onCloseOverlay={this.toggleMobileSearch}>
					<MobileSearchWidget {...this.props} closeWidget={this.toggleMobileSearch}
										searchType={searchType} />
				</MobileOverlay>}

				{showMobileSearch && searchVariation === 'searchByMetro' && <MobileOverlay key="home-search-widget-overlay" className="search-widget-overlay" onCloseOverlay={this.toggleMobileSearch}>
					<MetrosImgMap isShowMap={false}/>
				</MobileOverlay>}
			</Fragment>
		);

	}

}

const mapStateToProps = ({search}) => {
	const { quick_search_check } = search;
	return {
		...quick_search_check
	};
};


export default connect(mapStateToProps)(HomeSearchWidget);
