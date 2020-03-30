import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import MyListingDetails from '../components/profile/mylisting-details';
import { REQUEST_USER_LISTING } from '../redux/actions/userprofile';

class MyListing extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		return (
			<div className="property_listing-page">
				<MyListingDetails {...this.props}/>
			</div>
		);
	}

}

const mapStateToProps = ({userprofile}) => {
	return { data : userprofile.user_listing.listings };
};

export default connect(mapStateToProps)(
	connectDataFetchers(MyListing, [
		REQUEST_USER_LISTING
	])
);
