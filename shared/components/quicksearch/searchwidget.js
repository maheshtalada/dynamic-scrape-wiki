import React from 'react';
import Select from '../common/select/select';
import LocationSearch from '../common/location-search/location-search';
import BaseSearchWidget from './BaseSearchWidget';
import { capitalize, toUpper }  from 'lodash/string';
import {options} from 'assets/static/advance-search-options';

const NOT_SEARCH_TERM = [ 'bounds', 'recommend'];
class SearchWidget extends BaseSearchWidget {

	constructor(props, context) {
		super(props, context);
	}

	static defaultProps = {
		cityObj: {},
		searchInputFocus : false
    };

	getSearchBoxTerm() {
		const { term = '' } = this.props.params;
		let searchTerm = '';
		if(term && NOT_SEARCH_TERM.indexOf(term) < 0 ) {
			searchTerm = term.split('-').map( (str, index)  => capitalize(str)).join(', ');
			//searchTerm = term.replace('-', ', ');
		}
		return searchTerm
	}

	renderSearchBar() {
		const { screenSize, searchInputFocus } = this.props;
		const { searchType, noLocationError } = this.state;
		const typeIndex = BaseSearchWidget.getTypeIndex(this.searchOptions,searchType);
		const placeHolder = BaseSearchWidget.getSearchOption(this.searchOptions,searchType).searchboxplaceholder;
		const searchQuery = this.getSearchBoxTerm();
		const { l } = this.context.i18n;
		return (
			<div className="search-widget-wrap__search-bar">
				<LocationSearch
					searchType={searchType}
					placeHolder={`${l(placeHolder)}`}
					onPlaceSelect = {this.onPlaceSelect}
					onSearch = {this.onSearch}
					screenSize = {screenSize}
					inputAutoFocus = {screenSize === 1 && searchInputFocus && true}
					searchQueryValue = {searchQuery}
					noLocationError = {noLocationError}/>
			</div>
		)
	}

	render() {
		const { searchType, openAdvanceSearch } = this.state;
		const { l } = this.context.i18n;
		return (
		<div className="search-widget-wrap">
			{this.renderSearchBar()}
		</div>
		);
	}

}


const mapStateToProps = ({search}) => {
	const { quick_search_check } = search;
	console.log(quick_search_check);
	return {
		...quick_search_check
	};
};

export default SearchWidget;
