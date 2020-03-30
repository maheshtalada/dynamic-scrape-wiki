import React , { Component, Fragment } from 'react';
import InvestorWizard from '../containers/InvestorWizard/InvestorWizard';
import Footer from 'components/footer/footer';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';

class InvestorWizardPage extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<div className="investor-wizard-page">
					<InvestorWizard {...this.props} />
				</div>
				<Footer dispatch={this.props.dispatch}/>
			</Fragment>
		);
	}
}

// to enable is_first_mount_load for later use
export default connect()(connectDataFetchers(InvestorWizardPage));



