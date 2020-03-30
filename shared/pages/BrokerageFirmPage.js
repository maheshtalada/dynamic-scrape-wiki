import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import BrokerageFirmDetails from 'containers/BrokerageFirmDetails/brokeragefirm-details';
import Footer from 'components/footer/footer';
import { REQUEST_BROKERAGEFIRM_DETAILS } from '../redux/actions/realtor'

class BrokerageFirmPage extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		return (
			<div className="property_listing-page">
				<BrokerageFirmDetails {...this.props}/>
				<Footer dispatch={this.props.dispatch}/>
			</div>
		);
	}

}

const mapStateToProps = ({realtor}) => {
	return { details : realtor.brokeragefirm };
};

export default connect(mapStateToProps)(
	connectDataFetchers(BrokerageFirmPage, [
		REQUEST_BROKERAGEFIRM_DETAILS
	])
);
