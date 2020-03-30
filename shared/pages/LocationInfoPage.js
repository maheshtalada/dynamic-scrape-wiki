import React , { Component } from 'react';
import PropTypes from 'prop-types';
import LocationDetails from '../containers/Listing/location-details';
import NavigationBar from '../components/navigation-bar';
import { listingMap } from '../assets/static/navigation-map.json';
import { cloneDeep } from 'lodash';

export default class LocationInfoPage extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		let navigationMap = cloneDeep(listingMap);
		navigationMap[0].activeStep = true;
		this.state = {
			navigationMap
		};
	}

	render() {
		const { l } = this.context.i18n;
		const { navigationMap } = this.state;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="schema-listing-page listing-location-page flex-layout">
					<div className="">
						<div className="col-xs-12">
							<NavigationBar steps={navigationMap} currentStep={navigationMap[0]} keyName="{listingid}" keyValue={this.props.params.id || ''} title="PAGEHEADINGBASIC"/>
						</div>
						<div className="">
							<div className="schema-header-wrapper col-xs-12 col-md-12 col-lg-12" style={{marginBottom : '10px'}}>
								<h2 className="subheader-heading">{l('BASICINFOSCHEMATITLE')}</h2>
								{/* <span className="subheader-heading-description">{l('BASICINFOSCHEMADESCRIPTION')}</span>*/}
							</div>
						</div>
					</div>
					<LocationDetails {...this.props}/>
				</div>
			</div>
		);
	}

}



