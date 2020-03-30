import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import ExpressListing from '../containers/Listing/create-express-listing';
import NavigationBar from '../components/navigation-bar';
import { listingMap } from '../assets/static/navigation-map.json';
import { cloneDeep } from 'lodash';
/*import Advertisement from '../components/advertisement/advertisement';
import ExternalAdvertisement from '../components/advertisement/external-advertisement';*/
import { createlisting, adbackground, adlogo } from '../assets/static/ads-component-config.json';
/*import ScrollFixed from '../components/common/scroll-fixed/scroll-fixed';
import uniqueFormId from '../utils/uniqueFormId';*/
import { REQUEST_GET_OVERVIEW_SCHEMA } from '../redux/actions/schema';

class ExpressListingPage extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		let navigationMap = cloneDeep(listingMap);
		navigationMap[1].activeStep = true;
		this.state = {
			navigationMap
		};
	}

	render() {
		const { l } = this.context.i18n;
		const { navigationMap } = this.state;
		navigationMap[1].canNavigate = this.props.isExisting;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="schema-listing-page listing-overview-page flex-layout">
					<div className="row">
						<div className="col-xs-12">
							<NavigationBar steps={navigationMap} currentStep={navigationMap[1]} keyName="{listingid}" keyValue={this.props.params.id || ''} title="PAGEHEADINGOVERVIEW"/>
						</div>
					</div>
					<div className="">
						<div className="">
							<div className="">
								<div className="schema-border" data-automation-selector="ssj-section-header-content">
									<h2 className="subheader-heading" data-automation-selector="ssj-section-title">{l('OVERVIEWINFOSCHEMATITLE')}</h2>
									{/* <p className="edit-personal-details-layout__section-text"
									   data-automation-selector="Instruction_Text">
										{l('FINANCIALINFOSCHEMADESCRIPTION')}
									</p>*/}
								</div>
								<ExpressListing {...this.props}/>
							</div>
							{/*<div className="col-lg-4 col-md-4" style={{textAlign : 'right'}}>
								<ScrollFixed scrollPosition={70} top={60} minWidth={992}>
									<Advertisement
										adBg={adbackground}
										l={l}
										adInfo={l(createlisting.ADCREATELISTINGHIGHLIGHT)}
										logo={adlogo}
									/>
									<ExternalAdvertisement dispatch={this.props.dispatch}/>
								</ScrollFixed>
							</div>*/}
						</div>
					</div>
				</div>
			</div>
		);

	}

}

const mapStateToProps = ({schema}) => {
	const { schema_get_overview } = schema;
	return {
		'schema_get_overview' : schema_get_overview.schema,
		'isExisting' : schema_get_overview.isExisting
	};
};

export default connect(mapStateToProps)(
	connectDataFetchers(ExpressListingPage, [
		REQUEST_GET_OVERVIEW_SCHEMA
	],true)
);


