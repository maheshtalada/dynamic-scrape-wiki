import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/card/card';
import MainHero from './main-hero';
import AboutCompany from './about';
import ProfessionalSummary from './features';
import SubMenuTabs from './sub-menu-tabs';
import Loader from '../common/page-loader/loader';
import SocialShare from '../common/social-share-buttons/social-share-buttons';
import { realtordetails } from '../../assets/static/social-share-options.json';
import { company } from '../../assets/static/ads-component-config.json';
import { showSectionCheck } from '../../utils/propertyUtil';
import BaseDetails from '../../lib/BaseDetails';

/*
	Description

 */

export default class CompanyDetails extends BaseDetails {

	constructor(props) {
		super(props);
		this.state = {
			details : props.details || '',
			activeTab: 0,
			isFetching:false,
			screenSize: this.props.screenSize
		};

	}

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				details : props.details,
				isFetching: props.isFetching
			});
		}
	}

	render() {

		const { details, activeTab, isFetching } = this.state;
		const {i18n } = this.context;
		const { l } = i18n;
		const shareUrl = !frameworkGlobals.isServer ? window.location.href : '';
		const title = details.name;
		return (
			<div className="property-details company-details row">
				<div className="sub-menu-tabs col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<SubMenuTabs details={details} activeTab={activeTab} onChange={this.tabChange} />
				</div>
				<div className="property-details__main col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div className="property-details__left">
						<div className="">
						{
							isFetching &&
							<Loader/>
						}

							<div className="sections">
								<div className="property-details__section-wrapper" id="tab0">
									<Card key="hero" shadow={2} className="mod property-details__main-info company-details__main-info">
										<MainHero {...this.state}/>
										<div className="row company-details__main-info__share-wrap">
											{/* <div className="col-lg-5 col-md-5 col-sm-5">*/}

											{/* </div>*/}
											<div className="col-lg-9 col-md-9 col-sm-9 pull-right">
												{/* <span>Share :</span>*/}
												{ !frameworkGlobals.isServer && <SocialShare
													shareUrl={shareUrl}
													title = {title}
													options = {realtordetails}
												/>
												}
											</div>
										</div>
									</Card>
								</div>
								<div className="property-details__section-wrapper" id="tab1">
									<Card key="about" shadow={2} className="mod property-details__about-info">
										<header className="header-wrapper">
											<span className="header-title">{`${l('ABOUT')}`}</span>
										</header>
										<AboutCompany details={details}/>
									</Card>
								</div>
								{ showSectionCheck('company',details,'specialties') &&
									<div className="property-details__section-wrapper" id="tab2">
										<Card key="about" shadow={2} className="mod property-details__about-info">
											<header className="header-wrapper">
												<span className="header-title">{`${l('SPECIALTIES')}`}</span>
											</header>
											<ProfessionalSummary details={details}/>
										</Card>
									</div>
								}
								{ showSectionCheck('company',details,'professionals') &&
									<div className="property-details__section-wrapper" id="tab3">
										<Card key="listings" shadow={2} className="mod property-details__listings">
											<header className="header-wrapper">
												<span className="header-title">{`${l('PROFESSIONALS')}`}</span>
											</header>
										</Card>
									</div>
								}
							</div>

						</div>
					</div>
					{
						this.renderAdvertisement({
							adTitle : company.ADCOMPANYPDPTEXT,
							adInfo : company.ADCOMPANYPDPHIGHLIGHT
						})
					}
				</div>
			</div>
		);
	}

}
