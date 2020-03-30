import React , { Component } from 'react';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import ProfessionSearch from '../containers/ProfessionSearch/profession-search';
import { REQUEST_PROFESSION_SEARCH_RESULTS } from '../redux/actions/search';
import { REQUEST_LEAD_REALTORS } from '../redux/actions/application';

class ProfessionSearchPage extends Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="search-page profession-search-page">
				<ProfessionSearch {...this.props}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { profession_search_results } = state.search;
	return { ...profession_search_results, leadRealtors : state.application.lead_realtors_response || {} };
};

export default connect(mapStateToProps)(
	connectDataFetchers(ProfessionSearchPage, [
		REQUEST_PROFESSION_SEARCH_RESULTS,
		REQUEST_LEAD_REALTORS
	])
);



