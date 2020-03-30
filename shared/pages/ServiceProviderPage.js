import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import ProfessionalDetails from 'components/professional-details/professional-details';
import Footer from 'components/footer/footer';
import { REQUEST_PROFESSIONAL_DETAILS } from '../redux/actions/realtor';

class ProfessionalPage extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		return (
			<div className="property_listing-page">
				<ProfessionalDetails {...this.props}/>
				<Footer dispatch={this.props.dispatch}/>
			</div>
		);
	}

}

const mapStateToProps = ({realtor}) => {
	return { details : realtor.professional };
};

export default connect(mapStateToProps)(
	connectDataFetchers(ProfessionalPage, [
		REQUEST_PROFESSIONAL_DETAILS
	])
);
