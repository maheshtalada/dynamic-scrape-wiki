import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/common/card/card';
import MainHero from '../../components/brokeragefirm-details/main-hero';
import AboutBrokerageFirm from '../../components/brokeragefirm-details/about';
import ProfessionalSummary from '../../components/brokeragefirm-details/features';
import Loader from '../../components/common/page-loader/loader';
import AgentsDetails from '../../components/brokeragefirm-details/agents';
import AreasServed from 'components/common/realtor-info-components/areas-served';
import { brokeragefirm } from '../../assets/static/ads-component-config.json';
import { showSectionCheck, getImagePath } from '../../utils/propertyUtil';
import BaseDetails from '../../lib/BaseDetails';
import Snackbar from '../../components/common/snackbar/snackbar';
import MobileFooterOptions from '../../components/common/mobile-footer-options/mobile-footer-options';
import { connect } from 'react-redux';
import ActiveListings from '../../components/realtor-details/active-listings';
import { Button } from '../../components/common/button';
import { REQUEST_BROKERAGE_FIRM_LISTINGS, REQUEST_BROKERAGEFIRM_DETAILS, REQUEST_BROKERAGE_FIRM_CASH_FLOW_LISTINGS } from '../../redux/actions/realtor';
import ScrollIntoView from 'scroll-into-view';

/*
 Description

 */

const HASH_MAP = {
	'#cash-flowing-properties' : '#cashFlowListings'
};

class BrokerageFirmDetails extends BaseDetails {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		screenSize: PropTypes.number,
		awsImagePath : PropTypes.string,
		country : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			details : props.details || '',
			recentListings : props.details && props.details.recentListings && props.details.recentListings.data ||'',
			cashFlowListings : props.details && props.details.cashFlowListings && props.details.cashFlowListings.data || '',
			activeTab: 0,
			isFetching:false,
			screenSize: this.props.screenSize,
			isCashFlowLoadMore : false,
			isRecentListingsLoadMore : false,
			realtors : props.details.realtors || [],
			realtorPage : 1,
			recentListingPage : 1,
			cashFlowListingPage : 1
		};

	}

	componentDidMount() {
		if(this.props.location.hash) {
			const hash = this.props.location.hash;
			const el = document.querySelector(HASH_MAP[hash]);
			if (el) {
				ScrollIntoView(el,{
					align: {
						topOffset : '140'
					}
				});
			}
		}
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				recentListings : props.recentListings && props.recentListings.data || this.state.recentListings,
				cashFlowListings : props.cashFlowListings && props.cashFlowListings.data || this.state.cashFlowListings,
				details : props.details,
				isFetching: props.isFetching,
				realtors : props.details.realtors,
				isRecentListingsLoadMore: props.recentListings && props.recentListings.isFetching,
				isCashFlowLoadMore: props.cashFlowListings && props.cashFlowListings.isFetching
			});
		}
	}

	loadRecentListings() {
		this.setState({
			isRecentListingsLoadMore : true,
			recentListingPage : parseInt(this.state.recentListingPage)+1
		}, ()=>{
			this.props.dispatch(
				REQUEST_BROKERAGE_FIRM_LISTINGS({
					dataPayload : {
						page : parseInt(this.state.recentListingPage),
						count: 18
					},
					paramsPayload : {
						'id' : this.props.params.id
					}
				})
			);
		});
	}

	loadCashFlowListings() {
		this.setState({
			isCashFlowLoadMore : true,
			cashFlowListingPage : parseInt(this.state.cashFlowListingPage)+1
		}, ()=>{
			this.props.dispatch(
				REQUEST_BROKERAGE_FIRM_CASH_FLOW_LISTINGS({
					dataPayload : {
						page : parseInt(this.state.cashFlowListingPage),
						findpositivecashflow : true,
						count: 18
					},
					paramsPayload : {
						'id' : this.props.params.id
					}
				})
			);
		});
	}

	loadRealtors() {
		this.setState({
			isLoadMore : true,
			page : parseInt(this.state.realtorPage)+1
		}, ()=>{
			this.props.dispatch(
				REQUEST_BROKERAGEFIRM_DETAILS({
					dataPayload : {
						page : parseInt(this.state.realtorPage),
						count : 18
					},
					params : {
						'id' : this.props.details.brokerageFirm.id
					}
				})
			);
		});
	}

	render() {

		const { details, activeTab, isFetching, recentListings, cashFlowListings, isShowEmailSentNotification, realtors, realtorPage, recentListingPage, cashFlowListingPage, isRecentListingsLoadMore, isCashFlowLoadMore } = this.state;
		const {i18n, screenSize, awsImagePath, country } = this.context;
		const { l } = i18n;
		const { user, location } = this.props;
		return (
			<div className="property-details brokeragefirm-details">
				<div className="flex-layout row">
					<div className="property-details__main col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="property-details__left">
							<div className="">
								{
									(isFetching || isRecentListingsLoadMore || isCashFlowLoadMore)&&
									<Loader/>
								}
								{
									<Snackbar active={isShowEmailSentNotification} onTimeout={this.hideEmailNotif}>
										{l('EMAILSENT')}
									</Snackbar>
								}
								<div className="sections">
									<div className="property-details__section-wrapper" id="details">
										<Card key="hero" shadow={2} className="mod property-details__main-info brokeragefirm-details__main-info">
											<MainHero {...this.state} user={this.props.user}
													  location={this.props.location}
													  dispatch={this.props.dispatch}
													  screenSize={this.props.screenSize}/>
										</Card>
									</div>
									{ showSectionCheck('brokeragefirm',details.cashFlowListings,'cashFlowListings') &&
									<div className="property-details__section-wrapper" id="cashFlowListings">
										<Card key="cashFlowListings" shadow={2} className="mod property-details__listings">
											<header className="header-wrapper">
												<span className="header-title">{`${l('CASHFLOWLISTINGS')}`}</span>
											</header>
											<ActiveListings
												listings = {cashFlowListings}
												l = {l}
												awsImagePath = {awsImagePath}
												country = {country}
												user = {user}
												location = {location}
												screenSize = {screenSize}
											/>
											{
												(details.cashFlowListings.totalpage && cashFlowListingPage < details.cashFlowListings.totalpage) &&
												<Button className="col-lg-12 col-md-12 col-sm-12 toolbar-group save-search show-more-listings" onClick={()=>this.loadCashFlowListings()}>
													{`${l('SHOWMORE')}`}
												</Button>
											}
										</Card>
									</div>
									}
									{ showSectionCheck('brokeragefirm',details.recentListings,'recentListings') &&
									<div className="property-details__section-wrapper" id="recentListings">
										<Card key="recentListings" shadow={2} className="mod property-details__listings">
											<header className="header-wrapper">
												<span className="header-title">{`${l('ACTIVELISTINGS')}`}</span>
											</header>
											<ActiveListings
												listings = {recentListings}
												l = {l}
												awsImagePath = {awsImagePath}
												country = {country}
												user = {user}
												location = {location}
												screenSize = {screenSize}
											/>
											{
												(details.recentListings.totalpage && recentListingPage < details.recentListings.totalpage) &&
												<Button className="col-lg-12 col-md-12 col-sm-12 toolbar-group save-search show-more-listings" onClick={()=>this.loadRecentListings()}>
													{`${l('SHOWMORE')}`}
												</Button>
											}
										</Card>
									</div>
									}
									{ showSectionCheck('brokeragefirm',details.brokerageFirm,'specialties') &&
									<div className="property-details__section-wrapper" id="specialties">
										<Card key="about" shadow={2} className="mod property-details__about-info brokeragefirm-details__specialties">
											<header className="header-wrapper">
												<span className="header-title">{`${l('SPECIALTIES')}`}</span>
											</header>
											<ProfessionalSummary details={details.brokerageFirm}/>
										</Card>
									</div>
									}
									{showSectionCheck('brokeragefirm',details.brokerageFirm,'about') &&
									<div className="property-details__section-wrapper" id="about">
										<Card key="about" shadow={2} className="mod property-details__about-info brokeragefirm-details__about-info">
											<header className="header-wrapper">
												<span className="header-title">{`${l('ABOUT')}`}</span>
											</header>
											<AboutBrokerageFirm details={details.brokerageFirm}/>
										</Card>
									</div>}
									{showSectionCheck('brokeragefirm',details.brokerageFirm,'areasServed') &&
									<div className="property-details__section-wrapper" id="areasserved">
										<Card key="about" shadow={2} className="mod property-details__about-info brokeragefirm-details__areasserved">
											<header className="header-wrapper">
												<span className="header-title">{`${l('AREASSERVED')}`}</span>
											</header>
											<AreasServed areas={details.brokerageFirm.areasServed} className="other-details areas-served bottom-buffer" isShowMoreRequired={false}/>
										</Card>
									</div>}

									{showSectionCheck('brokeragefirm',details.realtors,'realtors') &&
									<div className="property-details__section-wrapper" id="realtorsBrokers">
										<Card key="agents" shadow={2} className="mod property-details__agents">
											<header className="header-wrapper">
												<span className="header-title">{`${l('REALTORSANDBROKERS')}`}</span>
											</header>
											<AgentsDetails realtors={realtors.data} details={details.brokerageFirm}/>
											{
												(details.realtors.totalpage && realtorPage < details.realtors.totalpage) &&
												<div className="flex flex-justify-end">
													<button className="btn btn-primary" onClick={()=>this.loadRealtors()}>
														{`${l('LOADMORE')}`}
													</button>
												</div>
											}
										</Card>
									</div>
									}
								</div>

							</div>
						</div>
						{
							this.renderAdvertisement({
								adInfo : brokeragefirm.ADBROKERAGEFIRMPDPHIGHLIGHT
							},undefined,true)
						}
					</div>
				</div>
				{/*{screenSize === 1 &&
				<MobileFooterOptions {...this.props}>
					{this.renderShareOption()}
				</MobileFooterOptions>
				}*/}
			</div>
		);
	}
}

export default connect(({realtor})=>(
	{
		'details' : realtor.brokeragefirm,
		'recentListings': realtor.firm_listing_data,
		'cashFlowListings': realtor.firm_cash_flow_listing_data
	}
))(BrokerageFirmDetails);
