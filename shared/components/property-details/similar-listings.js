import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActiveListings from '../realtor-details/active-listings';
import NoResults from '../common/no-results/no-results-found';
import Spinner from '../common/spinner/spinner';

export default class SimilarListings extends Component {
	constructor(props) {
		super(props);
	}

	static contextTypes = {
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		country: PropTypes.string
	};

	render() {
		const { similarListings ={}, user, location, screenSize, dispatch } = this.props;
		const { country, awsImagePath, i18n: {l} } = this.context;
		if(similarListings.isFetching) {
			return <Spinner />;
		}
		return (
			similarListings.data && similarListings.data.length ? <ActiveListings
				listings={similarListings.data}
				country={country}
				user = {user}
				location = {location}
				screenSize = {screenSize}
				awsImagePath={awsImagePath}
				l={l}
				isOpenNewTab
				dispatch={dispatch}
				showPostedBy={true}
				useCarousel={true}/> :
				''
		)
	}
}
