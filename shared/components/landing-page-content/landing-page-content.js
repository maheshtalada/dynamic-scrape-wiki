import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import HomeSearchWidget from 'containers/HomeSearchWidget/homepage-searchwidget';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { sprintf } from 'utils';
import { Link } from 'react-router';
import PopularListings from 'containers/PopularListings/popular-listings';
import { propshubSteps } from 'assets/static/static-content.json';
import ScrollIntoView from 'scroll-into-view';
import MobileFooterOptions from '../../components/common/mobile-footer-options/mobile-footer-options';
import { REQUEST_OPEN_SITE_FEEDBACK } from '../../redux/actions/application';
const { MY_PORTFOLIO_ROUTE ,BLOGS_ROUTE , ANALYZE_RETURNS_LINK } = require('../../utils/app-constants').default;


export default class LandingPageContent extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			showCreateListingInfo : false,
			showPostArticleInfo: false,
			showAskExpertsInfo: false,
			isLogIn : props.user.user.isLogIn,
			isLoadingComponent : true
		};
		this.onComponentLoad = this.onComponentLoad.bind(this);
		this.onClickCloseMsg = this.onClickCloseMsg.bind(this);
		this.onClickSendFeedback = this.onClickSendFeedback.bind(this);
	}

	componentWillUnmount() {
		window.localStorage.setItem('visitormsghide', true);
	}

	componentDidMount() {
		if(this.props.location.hash) {
			const id = this.props.location.hash.replace('#','');
			ScrollIntoView(document.getElementById(`hash_${id}`));
		}
	}

	onComponentLoad() {
		this.setState({
			isLoadingComponent : false
		});
	}

	onClickCloseMsg() {
		this.setState({
			hideVisitorMsg : true
		});
		window.localStorage.setItem('visitormsghide', true);
	}

	onClickSendFeedback() {
		this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : true,
			subject : "PROVIDEFEEDBACK"
		}));
	}

	mobileFooterOptions() {
		const { l } = this.context.i18n;
		const mobileFooterOptions = [
			{
				"name" : "ROICALCULATOR",
				"value" : "roicalculator",
				"component" : <Link data-tag-category="Header Links" data-tag-action="click" data-tag-label="Analyze Returns link" to={ANALYZE_RETURNS_LINK}>
				<i className="pe-7s-analyze-returns"/>
				<span>{l('ROICALCULATOR')}</span>
				</Link>
			},
			{
				"name" : "PORTFOLIO",
				"value" : "portfolio",
				"component" : <Link data-tag-category="Header Links" data-tag-action="Analyze Portfolio click" data-tag-label="Analyze portfolio" to={MY_PORTFOLIO_ROUTE}>
				<i className="pe-7s-portfolio"/>
				<span>{l('PORTFOLIO')}</span>
				</Link>
			},
			{
				"name" : "BLOGS",
				"value" : "blogs",
				"component" : <Link data-tag-category="Header Links" data-tag-action="Blogs click" data-tag-label="Blogs" to={BLOGS_ROUTE}>
				<i className="pe-7s-note"/>
				<span>{l('BLOGS')}</span>
				</Link>
			},
			{
				"name" : "CONTACTUS",
				"value" : "contact",
				"component" : <a onClick={this.onClickSendFeedback}>
					<i className="pe-7s-newspaper"/>
					<span>{l('CONTACTUS')}</span>
				</a>
			}
		];
		return mobileFooterOptions;
	}


	render() {
		const { l } = this.context.i18n;
		const { isLoadingComponent, hideVisitorMsg } = this.state;
		const { location, screenSize } = this.props;
		const showVisitorMsg = window.localStorage && window.localStorage.getItem('visitormsghide') !== 'true' && frameworkGlobals.visitorCountry && !hideVisitorMsg && frameworkGlobals.visitorCountry !== 'US';
		return (
			<Fragment>
				<div className="landing-page__above-fold">
					<div className="quicksearch__text-header">
						<div className="quicksearch__text-header__main"><h1>{l('HOMECAPTION')}</h1></div>
					</div>
					<div className="home-search-widget col-md-12 col-lg-12 col-sm-12 col-xs-12">
						<div className="quick-search">
							<HomeSearchWidget {...this.props}/>
						</div>
						{/*<Fragment>
							<MetrosImgMap />
							<p className="landing-page-metros-map__header">Click below to explore the top residential property investment markets in USA</p>
						</Fragment>*/}
					</div>
				</div>
				{ showVisitorMsg && <div className="outside-vistor-message print-hide">
					<p className="title">{l('DIDYOUKNOW')}</p>
					<p className="msg">{sprintf(l('VISITORMESSAGE'),frameworkGlobals.visitorCountryName)}</p>
					<div className="flex flex-justify-end"><Link to="/frequently-asked-questions#internationalInvestors" target="_blank">{l('LEARNMORE')}</Link></div>
					<button className="close" onClick={this.onClickCloseMsg}><i className="pe-7s-close-3"/></button>
				</div>}
				<script type="application/ld+json" nonce={frameworkGlobals.nonce} dangerouslySetInnerHTML={{__html : JSON.stringify({
					"@context": "http://schema.org",
					"@type": "WebSite",
					"about": "place",
					"accessMode" : ["textual", "visual", "colorDependent", "chartOnVisual", "textOnVisual"],
					"accessModeSufficient" : ["textual", "visual"],
					"alternativeHeadline" : "Buy and sell investment properties",
					"audience" : "BusinessAudience",
					"sameAs": [
						"https://twitter.com/PropsHub",
						"https://www.youtube.com/channel/UC8OFlleFFourdBbKl1l0ovQ",
						"https://www.pinterest.com/propshub/",
						"https://www.facebook.com/propshubinc"
					],
					"author" : {
						"@type": "Organization",
						"legalName": "PropsHub Inc",
						"address": "271 Margarita Court, Los Altos, CA 94022",
						"areaServed": "Texas",
						"email": "help@propshub.com",
						"foundingLocation": "California",
						"hasOfferCatalog": {
							"@type": "OfferCatalog",
							"name": "Buy and sell investment properties",
							"itemListElement": [
								{
									"@type": "Offer",
									"itemOffered": {
										"@type": "Service",
										"name": "Residential property listings"
									}
								},
								{
									"@type": "Offer",
									"itemOffered": {
										"@type": "Service",
										"name": "Investment decision making tools"
									}
								},
								{
									"@type": "Offer",
									"itemOffered": {
										"@type": "Service",
										"name": "Return on investment calculator"
									}
								},
								{
									"@type": "Offer",
									"itemOffered": {
										"@type": "Service",
										"name": "Real estate agent - contact management"
									}
								},
								{
									"@type": "Offer",
									"itemOffered": {
										"@type": "Service",
										"name": "property marketing tools"
									}
								}
							]
						},
						"logo": "https://assets.propshub.com/static/images/logo/logo_us_green.png"
					},
					"copyrightHolder" : "PropsHub Inc",
					"copyrightYear" : new Date().getFullYear(),
					"genre" : "Real Estate"
				})}} />
				<div className="landing-page__below-fold">
					<PopularListings {...this.props} />
				</div>
				{screenSize <= 2 &&
					<MobileFooterOptions {...this.props} options={this.mobileFooterOptions()} />
				}
			</Fragment>
		);

	}
}
