import React, { Component } from 'react';
import TopProperties from '../../components/near-by-properties/near-by-properties';
import { connect } from 'react-redux';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';

const mapStateToProps = (state) => {
	const { properties } = state.search.top_ten_realtor_properties;
	return { properties };
};

const mapDispatchToProps = () => {
	return {

	};
};

export default connect(mapStateToProps)(TopProperties);

