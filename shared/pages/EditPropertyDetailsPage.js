import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import EditPropertyDetails from '../containers/Listing/edit-property-details';
import NavigationBar from '../components/navigation-bar';
import { listingMap } from '../assets/static/navigation-map.json';
import { cloneDeep } from 'lodash';
import { createlisting, adbackground, adlogo } from '../assets/static/ads-component-config.json';
import { REQUEST_GET_PROPERTY_SCHEMA } from '../redux/actions/schema';


class EditPropertyDetailsPage extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		let navigationMap = cloneDeep(listingMap);
		navigationMap[2].activeStep = true;
		this.state = {
			navigationMap
		};
	}

	render() {
		const { l } = this.context.i18n;
		const { navigationMap } = this.state;
		return (
			<div className="profile-page__layout__profile-section">
			<div className="schema-listing-page listing-property-page flex-layout">
				<div className="row">
					<div className="col-xs-12">
						<NavigationBar steps={navigationMap} currentStep={navigationMap[2]} keyName="{listingid}" keyValue={this.props.params.id || ''} title="Listing & Property set-up"/>
					</div>
				</div>
				<div className="">
					<div className="">
						<div className="">
							<div className="schema-border" data-automation-selector="ssj-section-header-content">
								<h2 className="subheader-heading" data-automation-selector="ssj-section-title">{l('PROPERTYINFOSCHEMATITLE')}</h2>
							</div>
							<EditPropertyDetails {...this.props}/>
						</div>

					</div>
				</div>
			</div>
			</div>
		);
	}

}

const mapStateToProps = ({schema}) => {
	const { schema_get_property } = schema;
	return { 'schema_get_property' : schema_get_property };
};

export default connect(mapStateToProps)(
	connectDataFetchers(EditPropertyDetailsPage, [
		REQUEST_GET_PROPERTY_SCHEMA
	],true)
);

