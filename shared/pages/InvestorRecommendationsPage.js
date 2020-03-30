import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import Recommendations from 'containers/InvestorRecommendations/Recommendations';
import Footer from '../components/footer/footer';
import { REQUEST_INVESTMENT_RECOMMENDATIONS } from '../redux/actions/search';

class InvestorRecommendations extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { l } = this.context.i18n;
		const { screenSize } = this.context;
		return (
			<div className="page-main-layout recommendations-page">
				<Recommendations {...this.props} />
				<Footer dispatch={this.props.dispatch}/>
			</div>
		);
	}
}

const mapStateToProps = ({search}) => {
	const { investment_recommendations} = search;
	return { investment_recommendations};
};

export default connect(mapStateToProps)(
	connectDataFetchers(InvestorRecommendations, [
		REQUEST_INVESTMENT_RECOMMENDATIONS
	])
);




