import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropDownMenuSimpleExample } from '../common/DropDownMenu';
import { AutoCompleteExampleSimple, AutoCompleteExampleDataSources } from '../common/AutoComplete';
import quicksearchoptions from '../../assets/static/quick-search-options.json';

/*
  Common Components - needed
   1)AutoComplete
   2)DropDownMenu or selectField
 */
export default class SearchBar extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	render() {
		const { l,width } = this.context.i18n;
		return(
			<div className="searchbar">
				<i className="pe-7s-search" />
				<AutoCompleteExampleDataSources
					classes="searchbar__autocomplete"
					hintText={`${l('SEARCH')}`}
				/>
				<DropDownMenuSimpleExample
					classes="searchbar__dropdown"
					menuItems={quicksearchoptions}
				/>
			</div>
		);
	}

}
