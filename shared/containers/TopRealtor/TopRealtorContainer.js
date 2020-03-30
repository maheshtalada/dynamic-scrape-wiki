import React, { Component } from 'react';
import TopRealtors from '../../components/top-realtors/top-realtors';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	const { realtors } = state.search.top_ten_realtor_properties;
	return { realtors };
};

const mapDispatchToProps = () => {
	return {
		clickHandle : () => {

		}
	};
};

export default connect(mapStateToProps)(TopRealtors);

