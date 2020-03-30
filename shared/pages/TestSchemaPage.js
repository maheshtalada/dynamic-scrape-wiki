import React , { Component } from 'react';
import PropTypes from 'prop-types';
import MedianMapsContainer from 'containers/MedianMapsTest';

export default class TestSchemaPage extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		return (
			<div className="property_listing-page">
				<MedianMapsContainer {...this.props}/>
			</div>
		);
	}

}



