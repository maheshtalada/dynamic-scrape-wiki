import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import CompanyDetails from '../components/company-details/company-details';
import { REQUEST_COMPANY_DETAILS } from '../redux/actions/realtor';

class CompanyPage extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		return (
			<div className="property_listing-page flex-layout">
				<CompanyDetails {...this.props}/>
			</div>
		);
	}

}

const mapStateToProps = ({realtor}) => {
	return { details : realtor.company };
};

export default connect(mapStateToProps)(
	connectDataFetchers(CompanyPage, [
		REQUEST_COMPANY_DETAILS
	])
);
