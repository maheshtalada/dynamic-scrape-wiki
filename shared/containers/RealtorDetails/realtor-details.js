import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/common/card/card';
import { connect } from 'react-redux';
import MainHero from 'components/realtor-details/main-hero';
import AboutRealtor from 'components/realtor-details/about';
import ProfessionalSummary from 'components/realtor-details/features';
import Loader from 'components/common/page-loader/loader';
import { realtordetails } from 'assets/static/social-share-options.json';
import { realtor } from 'assets/static/ads-component-config.json';
import ActiveListings from 'components/realtor-details/active-listings';
import { Button } from 'components/common/button';
import { showSectionCheck, getImagePath } from 'utils/propertyUtil';
import RecentArticles from 'components/articles/recent-articles';
import BaseDetails from 'lib/BaseDetails';
import ProfileCompletion from 'components/realtor-details/profile-completion';
import MobileFooterOptions from 'components/common/mobile-footer-options/mobile-footer-options';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { REQUEST_REALTOR_DETAILS, REQUEST_OWNER_PROPERTY_LISTING } from '../../redux/actions/realtor';

/*
	Description

 */

class RealtorDetails extends BaseDetails {

	constructor(props) {
		super(props);
		this.tabChange = this.tabChange.bind(this);
		this.state = {
			details : props.details || '',
			ownerListings : props.details && props.details.propertyListings && props.details && props.details.propertyListings.data ||'',
			isFetching:false,
			screenSize: this.props.screenSize,
			page : 1,
			isLoadMore : false
		};
		this.onAddContactSuccess = this.onAddContactSuccess.bind(this);
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		country : PropTypes.string,
		assetsPath : PropTypes.string
	};

	componentWillReceiveProps(props) {
		if(props) {
			const { details, page } = this.state;
			if(props.user.user.isLogIn) {
				if(props.user.user.id === props.details.realtor.id && !this.isDetailsRequested) {
					this.isDetailsRequested = true;
					this.props.dispatch(REQUEST_REALTOR_DETAILS({
						params : {...props.params}
					}))
				}
			}

			this.setState({
				details : props.details || details,
				ownerListings : props.ownerListings && props.ownerListings.data || this.state.ownerListings,
				isFetching: props.isFetching,
				isLoadMore: props.ownerListings && props.ownerListings.isFetching
			});

		}
	}

	loadOwnerListings() {
		this.setState({
			isLoadMore : true,
			page : parseInt(this.state.page)+1
		}, ()=>{
			this.props.dispatch(
				REQUEST_OWNER_PROPERTY_LISTING({
					dataPayload : {
						page : parseInt(this.state.page),
						count : 18
					},
					paramsPayload : {
						'id' : this.props.params.id
					}
				})
			);
		});
	}

	onAddContactSuccess() {
		this.setState({
			showSnackbar : true,
			snackbarMessage : "CONTACTADDEDSUCCESS"
		})
	}

	render() {

		const { details, activeTab, isFetching, ownerListings, page, isLoadMore, isShowEmailSentNotification, showSnackbar, snackbarMessage } = this.state;
		const {awsImagePath,i18n, country, assetsPath } = this.context;
		const { l } = i18n;
		const { user, chatUserStatus, location, screenSize, dispatch } = this.props;
		const isUserRealtorSame = details && details.realtor ? details.realtor.id === user.user.id : false;
		const contactBarData = {
			personId: details.realtor && details.realtor.id,
			contextType: 'PROFILE',
			personName: details.realtor && details.realtor.name
		};
		return (
			<div className="property-details realtor-details">
				<div className="flex-layout row">
					<div className="property-details__main col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="property-details__left">
						<div className="">
						{
							(isFetching || isLoadMore)&&
							<Loader/>
						}
							{ isUserRealtorSame && details.completionDetail &&
							<ProfileCompletion
								user = {user.user}
								progress = {details.completionDetail}
							/>
							}

							<div className="sections">
								<div className="property-details__section-wrapper" id="details">
									<Card key="hero" shadow={2} className="mod property-details__main-info realtor-details__main-info">
										<MainHero {...this.state}
												  location={location}
												  user={user}
												  dispatch={dispatch}
												  isUserRealtorSame={isUserRealtorSame}
												  chatUserStatus={chatUserStatus}
												  contactBarData={contactBarData}/>
									</Card>
								</div>
								{ showSectionCheck('realtor',details.realtor,'specialties') &&
									<div className="property-details__section-wrapper" id="specialties">
										<Card key="about" shadow={2} className="mod property-details__about-info realtor-details__specialties-card">
											<header className="header-wrapper">
												<span className="header-title">{`${l('SPECIALTIES')}`}</span>
											</header>
											<ProfessionalSummary details={details}/>
										</Card>
									</div>
								}
								{showSectionCheck('realtor',details.realtor,'about') &&
								<div className="property-details__section-wrapper" id="about">
									<Card key="about" shadow={2} className="mod property-details__about-info">
										<header className="header-wrapper">
											<span className="header-title">{`${l('ABOUT')}`}</span>
										</header>
										<AboutRealtor details={details}/>
									</Card>
								</div>}
								{ showSectionCheck('realtor',details.propertyListings,'listings') &&
									<div className="property-details__section-wrapper" id="activeListings">
									<Card key="listings" shadow={2} className="mod property-details__listings">
										<header className="header-wrapper">
											<span className="header-title">{`${l('ACTIVELISTINGS')}`}</span>
										</header>
										<ActiveListings
											listings = {ownerListings}
											l = {l}
											awsImagePath = {awsImagePath}
											country = {country}
											user = {user}
											location = {location}
											screenSize = {screenSize}
										/>
										{
											(details.propertyListings.totalpage && page < details.propertyListings.totalpage) &&
											<Button className="col-lg-12 col-md-12 col-sm-12 toolbar-group save-search" onClick={()=>this.loadOwnerListings()}>
												{`${l('LOADMORE')}`}
											</Button>
										}
									</Card>
								</div>
								}
								{showSectionCheck('realtor',details.articles,'articles') &&
									<div className="property-details__section-wrapper" id="recentArticles">
										<Card key="articles" shadow={2} className="mod property-details__listings">
											<header className="header-wrapper">
												<span className="header-title">{`${l('RECENTARTICLES')}`}</span>
											</header>
											<RecentArticles
												articles = {details.articles.data}
												l = {l}
												country = {country}
												assetsPath = {assetsPath}
											/>
											{/*
												(details.propertyListings.totalpage &&  page <= details.propertyListings.totalpage)  &&
												<Button className="col-lg-12 col-md-12 col-sm-12 toolbar-group save-search" onClick={()=>this.loadOwnerListings()}>
													{`${l('LOADMORE')}`}
												</Button>
											*/}
										</Card>
									</div>
								}
							</div>

						</div>
					</div>
					{
						this.renderAdvertisement({
							adInfo : realtor.ADREALTORPDPHIGHLIGHT
						},undefined,true)
					}
				</div>
				</div>
				{/*{screenSize === 1 &&
					<MobileFooterOptions {...this.props}>
						{this.renderAddToContactOption()}
						{this.renderShareOption()}
					</MobileFooterOptions>
				}
*/}
			</div>
		);
	}

}

export default connect(({realtor})=>(
	{
		'ownerListings' : realtor.owner_listing_data
	}
))(RealtorDetails);
