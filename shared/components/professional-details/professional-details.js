import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/card/card';
import MainHero from './main-hero';
import AboutProfessional from './about';
import ProfessionalSummary from './features';
import Loader from '../common/page-loader/loader';
import { professional } from '../../assets/static/ads-component-config.json';
import { showSectionCheck } from '../../utils/propertyUtil';
import BaseDetails from '../../lib/BaseDetails';
import ProfileCompletion from '../realtor-details/profile-completion';
import MobileFooterOptions from '../../components/common/mobile-footer-options/mobile-footer-options';
import { REQUEST_PROFESSIONAL_DETAILS } from '../../redux/actions/realtor'

/*
	Description

 */

class ProfessionalDetails extends BaseDetails {

	constructor(props) {
		super(props);
		this.tabChange = this.tabChange.bind(this);
		this.state = {
			details : props.details.professional || '',
			activeTab: 0,
			isFetching:false,
			screenSize: this.props.screenSize,
			isShowEmailSentNotification: false,
			stepAfterLogin: null,
			openChatFunctionality: false,
			progress : props.details.completionDetail
		};
		this.onAddContactSuccess = this.onAddContactSuccess.bind(this);
	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		country : PropTypes.string
	};

	componentWillReceiveProps(props) {
		if(props) {
			if(props.user.user.isLogIn) {
				if(props.user.user.id === props.details.professional.id && !this.isDetailsRequested) {
					this.isDetailsRequested = true;
					this.props.dispatch(REQUEST_PROFESSIONAL_DETAILS({
						params : {...props.params}
					}))
				}
			}

			this.setState({
				details : props.details.professional,
				isFetching: props.isFetching,
				progress : props.details.completionDetail
			});
		}
	}

	onAddContactSuccess() {
		this.setState({
			showSnackbar : true,
			snackbarMessage : "CONTACTADDEDSUCCESS"
		})
	}

	render() {

		const { details, activeTab, isFetching, isShowEmailSentNotification, openChatFunctionality, progress, showSnackbar, snackbarMessage} = this.state;
		const {i18n } = this.context;
		const { l } = i18n;
		const { user, chatUserStatus, screenSize, dispatch } = this.props;
		const isUserProfessionalSame = details.id === user.user.id;
		const contactBarData = {
			personId: details.id,
			contextType: 'PROFILE',
			personName: details.name
		};
		return (
			<div className="property-details professional-details">
				{/*{screenSize > 1 && <HeaderSearch {...this.props}>
					<div className="search-bar-actions flex">
						{this.renderAddToContactOption()}
						{this.renderShareOption()}
					</div>
				</HeaderSearch>}*/}
				<div className="flex-layout row">
					<div className="property-details__main col-lg-12 col-md-12 col-sm-12 col-xs-12">
					{/*<Snackbar active={isShowEmailSentNotification} onTimeout={this.hideEmailNotif}>
						{l('EMAILSENT')}
					</Snackbar>
					<Snackbar active={showSnackbar} onTimeout={()=>{this.setState({ showSnackbar : false})}}>
						{l(snackbarMessage)}
					</Snackbar>*/}
					<div className="property-details__left">
						<div className="">
						{
							isFetching &&
							<Loader/>
						}
							{ isUserProfessionalSame && progress &&
							<ProfileCompletion
								user = {user.user}
								progress = {progress}
							/>
							}

							<div className="sections">
								<div className="property-details__section-wrapper" id="details">
									<Card key="hero" shadow={2} className="mod property-details__main-info professional-details__main-info">
										<MainHero {...this.state}
												  location={this.props.location}
												  user={this.props.user}
												  dispatch={dispatch}
												  isUserRealtorSame={isUserProfessionalSame}
												  chatUserStatus={chatUserStatus}
												  contactBarData={contactBarData}/>
									</Card>
								</div>
								{ showSectionCheck('professional',details,'specialties') &&
									<div className="property-details__section-wrapper" id="specialties">
										<Card key="about" shadow={2} className="mod property-details__about-info realtor-details__specialties-card">
											<ProfessionalSummary details={details}/>
										</Card>
									</div>
								}
								{showSectionCheck('professional',details,'about') &&
								<div className="property-details__section-wrapper" id="about">
									<Card key="about" shadow={2} className="mod property-details__about-info">
										<header className="header-wrapper">
											<span className="header-title">{`${l('ABOUT')}`}</span>
										</header>
										<AboutProfessional details={details}/>
									</Card>
								</div>}
							</div>

						</div>
					</div>
					{
						this.renderAdvertisement({
							adInfo : professional.ADPROFESSIONALPDPHIGHLIGHT
						},undefined,true)
					}
				</div>
				</div>
				{screenSize === 1 && 
					<MobileFooterOptions {...this.props}>
						{this.renderAddToContactOption()}
						{this.renderShareOption()}
					</MobileFooterOptions>
				}
			</div>
		);
	}

}

export default ProfessionalDetails;
