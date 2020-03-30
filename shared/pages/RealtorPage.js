import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import RealtorDetails from '../containers/RealtorDetails/realtor-details';
import Footer from '../components/footer/footer';
import { REQUEST_REALTOR_DETAILS } from '../redux/actions/realtor';

class RealtorPage extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		return (
			<div className="property_listing-page">
				<RealtorDetails {...this.props}/>
				<Footer dispatch={this.props.dispatch}/>
			</div>
		);
	}

}

const mapStateToProps = ({realtor}) => {
	return { details : realtor.realtor };
};

export default connect(mapStateToProps)(
	connectDataFetchers(RealtorPage, [
		REQUEST_REALTOR_DETAILS
	])
);
