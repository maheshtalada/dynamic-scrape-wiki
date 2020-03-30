import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import UserRegistration from '../components/registration/userregistration';
import { cloneDeep } from 'lodash';
import Advertisement from '../components/advertisement/advertisement';
import ExternalAdvertisement from '../components/advertisement/external-advertisement';
import { registration, adbackground, adlogo } from '../assets/static/ads-component-config.json';
import ScrollFixed from '../components/common/scroll-fixed/scroll-fixed';
import { REQUEST_GET_USER_REGISTRATION_SCHEMA } from '../redux/actions/schema';

class UserRegistrationPage extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { l } = this.context.i18n;
		const { usertype } = this.props.params;
		const schemaTitle = l(`${usertype.toUpperCase()}REGISTRATIONINFOSCHEMATITLE`);
		const schemaDescription = l(`${usertype.toUpperCase()}REGISTRATIONSCHEMADESCRIPTION`);
		return (
			<div className="schema-listing-page registration-page">
				<div className="col-md-10 col-lg-10 col-lg-push-1 col-lg-pull-1 col-md-push-1 col-md-pull-1">
					<div className="col-xs-12 col-md-12 col-lg-12">
						<div className="col-md-8 col-lg-8 registration-page__schema-section">
							<div className="schema-border" data-automation-selector="ssj-section-header-content">
								<h2 className="subheader-heading" data-automation-selector="ssj-section-title">{schemaTitle}</h2>
								{/* <p className="edit-personal-details-layout__section-text"
								   data-automation-selector="Instruction_Text">
									{schemaDescription}
								</p>*/}
							</div>
							<UserRegistration {...this.props} mode="register"/>
						</div>
						<div className="col-md-4 col-lg-4 registration-page__ad-section">
							<ScrollFixed scrollPosition={25} top={80} minWidth={992}>
								<Advertisement
									adBg={adbackground}
									adTitle={l(registration[`${usertype.toUpperCase()}ADREGISTRATIONTEXT`])}
									adInfo={l(registration[`${usertype.toUpperCase()}ADREGISTRATIONHIGHLIGHT`])}
									logo={adlogo}
									l={l}
								/>
								<ExternalAdvertisement dispatch={this.props.dispatch}/>
							</ScrollFixed>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

const mapStateToProps = ({schema}) => {
	const { schema_get_userregistration } = schema;
	return { 'schema_get_userregistration' : schema_get_userregistration };
};

export default connect(mapStateToProps)(
	connectDataFetchers(UserRegistrationPage, [
		REQUEST_GET_USER_REGISTRATION_SCHEMA
	])
);


