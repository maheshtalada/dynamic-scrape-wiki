import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import CompanyRegistration from '../components/registration/companyregistration';
import { cloneDeep } from 'lodash';
import ScrollFixed from '../components/common/scroll-fixed/scroll-fixed';
import Advertisement from '../components/advertisement/advertisement';
import ExternalAdvertisement from '../components/advertisement/external-advertisement';
import { registration, adbackground, adlogo } from '../assets/static/ads-component-config.json';
import { REQUEST_GET_COMPANY_REGISTRATION_SCHEMA } from '../redux/actions/schema';

class CompanyRegistrationPage extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { l } = this.context.i18n;
		return (
			<div className="schema-listing-page registration-page flex-layout">
				<div className="">
						<div className="col-xs-12 col-md-8 col-lg-8">
							{/* <ScrollFixed scrollPosition={130} top={76} minWidth={992}>*/}
							<div className="schema-border" data-automation-selector="ssj-section-header-content">
								<h2 className="subheader-heading" data-automation-selector="ssj-section-title">{l('COMPANYREGISTRATIONINFOSCHEMATITLE')}</h2>
								{/* <p className="edit-personal-details-layout__section-text"
								   data-automation-selector="Instruction_Text">
									{l('COMPANYREGISTRATIONSCHEMADESCRIPTION')}
								</p>*/}
							</div>
							<CompanyRegistration {...this.props} mode="register"/>
							{/* </ScrollFixed>*/}
						</div>
						<div className="col-lg-4 col-md-4" style={{textAlign : 'right'}}>
							<ScrollFixed scrollPosition={20} top={60} minWidth={992}>
								<Advertisement
									adBg={adbackground}
									adTitle={l(registration.COMPANYADREGSITRATIONTEXT)}
									adInfo={l(registration.COMPANYADREGISTRATIONHIGHLIGHT)}
									logo={adlogo}
									l={l}
								/>
								<ExternalAdvertisement dispatch={this.props.dispatch}/>
							</ScrollFixed>
						</div>
				</div>
			</div>
		);

	}

}

const mapStateToProps = ({schema}) => {
	const { schema_get_companyregistration } = schema;
	return { 'schema_get_companyregistration' : schema_get_companyregistration };
};

export default connect(mapStateToProps)(
	connectDataFetchers(CompanyRegistrationPage, [
		REQUEST_GET_COMPANY_REGISTRATION_SCHEMA
	], true)
);


