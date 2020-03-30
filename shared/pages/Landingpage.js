import React , { Component } from 'react';
import Footer from 'components/footer/footer';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import LandingPageContent from 'components/landing-page-content/landing-page-content';
import { REQUEST_POPULAR_LISTINGS } from '../redux/actions/application';

class Landingpage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="landing-page">
				<LandingPageContent {...this.props}/>
				<Footer dispatch={this.props.dispatch}/>
			</div>
		);

	}
}

const mapStateToProps = ({application}) => {
	const { popular_listings } = application;
	return { popularListings : popular_listings };
};

export default connect(mapStateToProps)(
	connectDataFetchers(Landingpage, [
		REQUEST_POPULAR_LISTINGS
	],true)
);


