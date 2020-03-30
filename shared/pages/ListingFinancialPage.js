import React , { Component } from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import FinancialDetails from '../containers/Listing/financial-details';
import NavigationBar from '../components/navigation-bar';
import { listingMap } from '../assets/static/navigation-map.json';
import { cloneDeep } from 'lodash';
import { createlisting, adbackground, adlogo } from '../assets/static/ads-component-config.json';
import { REQUEST_GET_FINANCIAL_SCHEMA } from '../redux/actions/schema';

class ListingFinancialPage extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		let navigationMap = cloneDeep(listingMap);
		navigationMap[3].activeStep = true;
		this.state = {
			navigationMap
		};
	}

	render() {
		const { l } = this.context.i18n;
		const { navigationMap } = this.state;
		return (
			<div className="profile-page__layout__profile-section">
			<div className="schema-listing-page listing-financial-page flex-layout">
				<div className="row">
					<div className="col-xs-12">
						<NavigationBar steps={navigationMap} currentStep={navigationMap[3]} keyName="{listingid}" keyValue={this.props.params.id || ''} title="PAGEHEADINGFINANCIAL"/>
					</div>
				</div>
				<div className="">
					<div className="">
						<div className="">
							<div className="schema-border" data-automation-selector="ssj-section-header-content">
								<h2 className="subheader-heading" data-automation-selector="ssj-section-title">{l('FINANCIALINFOSCHEMATITLE')}</h2>
								{/* <p className="edit-personal-details-layout__section-text"
								   data-automation-selector="Instruction_Text">
									{l('PROPERTYINFOSCHEMADESCRIPTION')}
								</p>*/}
							</div>
							<FinancialDetails {...this.props}/>
						</div>
						{/*<div className="col-lg-4 col-md-4" style={{textAlign : 'right'}}>
							<ScrollFixed scrollPosition={70} top={60} minWidth={992}>
								<Advertisement
									adBg={adbackground}
									adInfo={l(createlisting.ADCREATELISTINGHIGHLIGHT)}
									logo={adlogo}
									l={l}
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
	const { schema_get_financial } = schema;
	return { schema_get_financial };
};

export default connect(mapStateToProps)(
	connectDataFetchers(ListingFinancialPage, [
		REQUEST_GET_FINANCIAL_SCHEMA
	],true)
);


