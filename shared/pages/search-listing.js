import React , { Component } from 'react';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import PropertySearch from '../containers/PropertySearch/property-search';
import ErrorBoundary from '../components/common/error-boundary/error-boundary';
import { REQUEST_PROPERTY_SEARCH_RESULTS } from '../redux/actions/search';

class SearchListingPage extends Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<main className="search-page">
				<ErrorBoundary>
				<PropertySearch {...this.props}/>
				</ErrorBoundary>
			</main>
		);
	}
}


const mapStateToProps = (state) => {
	const { property_search_results } = state.search;
	return { ...property_search_results };
};

export default connect(mapStateToProps)(
	connectDataFetchers(SearchListingPage, [
		REQUEST_PROPERTY_SEARCH_RESULTS
	], true)
);



