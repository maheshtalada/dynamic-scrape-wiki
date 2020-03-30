import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import PropertyDetails from 'containers/PropertyDetails/property-details';
import ErrorBoundary from 'components/common/error-boundary/error-boundary';
import Footer from 'components/footer/footer';
import { REQUEST_PROPERTY_LISTING } from '../redux/actions/properties';

class PropertyListing extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		return (
            <div className="property_listing-page">
               <ErrorBoundary>
                <PropertyDetails {...this.props}/>
				<Footer dispatch={this.props.dispatch}/>
			   </ErrorBoundary>
            </div>
		);
	}

}

const mapStateToProps = ({properties}) => {
	const { properties_listing_data } = properties;
	return { ...properties_listing_data };
};

export default connect(mapStateToProps)(
    connectDataFetchers(PropertyListing, [
    	REQUEST_PROPERTY_LISTING
	], true)
);
