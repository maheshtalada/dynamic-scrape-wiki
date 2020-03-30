import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ActiveListings from 'components/realtor-details/active-listings';
import { getAbsoluteUrl } from 'utils/urlUtil';
import ReactTooltip from 'react-tooltip';
import { propertysearch as shareOptions, shareViaEmailOptions } from 'assets/static/social-share-options.json';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { sprintf } from 'utils';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Spinner from 'components/common/spinner/spinner';

const LISTINGS_CAROUSEL_CONFIG = {
	"secondCarousel" : {
		"title" : "POPULARLISTINGSLEVERAGED",
		"tooltip": "CAPRATESEARCHTOOLTIP",
		"criteria" : ["Cash Flow Positive","Price < $150K"],
		"isCash": true,
		"showMoreLink": "/residential-investment-properties/for-sale/search/guided/recommend?amount=150000&creationtime=30-&investmentcategories=highcashflow&purchasetype=cash&view=list"
	},
	"firstCarousel" : {
		"title" : "POPULARLISTINGSRENTALUNIT",
		"criteria" : ["Turn Key","Price < 200K"],
		"tooltip": "TURNKEYTOOLTIP",
		"isCash": true,
		"facets": {
			"investmentcategories" : "rentalunit"
		},
		"showMoreLink": "/residential-investment-properties/for-sale/search/guided/recommend?amount=200000&creationtime=30-&investmentcategories=rentalunit&purchasetype=cash&view=list"
	},
	"thirdCarousel" : {
		"title" : "POPULARLISTINGSVALUEADDED",
		"tooltip": "FIXERUPPERTOOLTIP",
		"criteria" : ["Fixer Upper","Price < $100K"],
		"showMoreLink": "/residential-investment-properties/for-sale/search/geo-location/usa?investmentcategories=valueadded&price=0-100000&sort=creationtime&sortorder=desc&view=list",
		"facets": {
			"investmentcategories" : "valueadded"
		}
	}
};

const ShowMoreSlickSlide = ({l, linkSrc}) => {
	return (
		<a href={linkSrc} className="popular-listings__carousel-wrap__show-more-slide-wrap flex flex-justify-center flex-align-center">
			<div className="slide-show-more">
				<i className="pe-7s-plus3"/>
				{l("SHOWMORE")}
			</div>
		</a>
	)
};

class PopularListings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listings : props.popularListings,
			isFetching : false,
			isLoadingComponent : true
		};

		this.onComponentLoad = this.onComponentLoad.bind(this);
	}

	static contextTypes = {
		i18n : PropTypes.object,
		screenSize : PropTypes.number,
		country : PropTypes.string,
		awsImagePath : PropTypes.string
	};

	componentWillReceiveProps(props) {
		if(props.popularListings) {
			this.setState({
				isFetching : props.popularListings.isFetching,
				listings: props.popularListings
			});
		}
	}

	componentDidUpdate() {
		ReactTooltip.rebuild();
	}

	onComponentLoad() {
		this.setState({
			isLoadingComponent : false
		});
	}

	renderShare(shareUrl,carouselTitle) {
		const { location, user, screenSize, dispatch } = this.props;
		return (
			<SocialShare
				context="search"
				emailOptions={{
					shareType : "SEARCH_LINK",
					title : sprintf(shareViaEmailOptions.search.title,`| ${carouselTitle}`),
					description : shareViaEmailOptions.search.description,
					link : shareUrl
				}}
				location={location}
				user={user}
				shareUrl={shareUrl}
				title = {carouselTitle}
				options = {shareOptions}
				screenSize = {screenSize}
				dispatch = {dispatch}
			/>
		);
	}

	renderShowMore(showMoreLink) {
		const { l } = this.context.i18n;
		return (
			<a data-tag-category='Guided Search Actions' data-tag-action='Click' data-tag-label='Guided Search' href={showMoreLink} className="popular-listings__carousel-wrap__show-more"><i className="pe-7s-plus"/><span>{l('SHOWMORE')}</span></a>
		);
	}

	render() {
		const { isFetching, listings, isLoadingComponent } = this.state;
		const { i18n : {l}, screenSize, country , awsImagePath} = this.context;
		const { user, dispatch, location } = this.props;
		const carousel = 'secondCarousel';
		const carousel1 = 'firstCarousel';
		const carousel2 = 'thirdCarousel';
		return (
			<div className="popular-listings">
				<ReactTooltip id="popular-listing-carousel-tooltip"/>
				{ listings && <Fragment>
					{ listings[carousel] && listings[carousel].data.length > 2 && <section className="landing-page-content-main">
						<div className="max-container flex">
							<LazyLoadComponent threshold={20} afterLoad={this.onComponentLoad}>
								<div className="popular-listings__carousel-wrap">
								<div className="popular-listings__carousel-wrap__title-wrap">
									{screenSize > 1 && this.renderShare(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel].showMoreLink),LISTINGS_CAROUSEL_CONFIG[carousel].criteria.join(" | "))}
									<h2 className="popular-listings__carousel-wrap__title"><span>{LISTINGS_CAROUSEL_CONFIG[carousel].criteria.join(" | ")}</span> <i className="pe-7s-help1" data-for="popular-listing-carousel-tooltip" data-tip={l(LISTINGS_CAROUSEL_CONFIG[carousel].tooltip)} /></h2>
									{screenSize > 1 && this.renderShowMore(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel].showMoreLink))}
								</div>
								<ActiveListings listings={listings[carousel].data}
												isLeveraged={LISTINGS_CAROUSEL_CONFIG[carousel].isLeveraged}
												isCash={LISTINGS_CAROUSEL_CONFIG[carousel].isCash}
												isCityStateOnly = {true}
												country={country}
												user = {user}
												location = {location}
												screenSize = {screenSize}
												awsImagePath={awsImagePath}
												l={l}
												isCarouselDataOverlay={true}
												facets={LISTINGS_CAROUSEL_CONFIG[carousel].facets}
												useCarousel={true}
												slidesToShow={4}
												slidesToScroll={4}
												ShowMoreSlide={<ShowMoreSlickSlide l={l} linkSrc={getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel].showMoreLink)}/>}
												dispatch={dispatch}/>
								{screenSize === 1 && <div className="popular-listings__carousel-wrap__actions">
									{this.renderShare(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel].showMoreLink),LISTINGS_CAROUSEL_CONFIG[carousel].criteria.join(" | "))}
									{this.renderShowMore(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel].showMoreLink))}
								</div>}
							</div>
							</LazyLoadComponent>
						</div>
					</section>}

					{ listings[carousel1] && listings[carousel1].data.length > 2 && <section className="landing-page-content-main">
						<div className="max-container flex">
							{/*{isLoadingComponent && <Spinner/>}*/}
							<LazyLoadComponent threshold={20} afterLoad={this.onComponentLoad}>
								<div className="popular-listings__carousel-wrap">
									<div className="popular-listings__carousel-wrap__title-wrap">
										{screenSize > 1 && this.renderShare(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel1].showMoreLink),LISTINGS_CAROUSEL_CONFIG[carousel1].criteria.join(" | "))}
										<h2 className="popular-listings__carousel-wrap__title"><span>{LISTINGS_CAROUSEL_CONFIG[carousel1].criteria.join(" | ")}</span> <i className="pe-7s-help1" data-for="popular-listing-carousel-tooltip" data-tip={l(LISTINGS_CAROUSEL_CONFIG[carousel1].tooltip)} /></h2>
										{screenSize > 1 && this.renderShowMore(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel1].showMoreLink))}
									</div>
									<ActiveListings listings={listings[carousel1].data}
													isLeveraged={LISTINGS_CAROUSEL_CONFIG[carousel1].isLeveraged}
													isCash={LISTINGS_CAROUSEL_CONFIG[carousel1].isCash}
													country={country}
													user = {user}
													location = {location}
													screenSize = {screenSize}
													awsImagePath={awsImagePath}
													isCarouselDataOverlay={true}
													isCityStateOnly = {true}
													l={l}
													facets={LISTINGS_CAROUSEL_CONFIG[carousel1].facets}
													useCarousel={true}
													slidesToShow={4}
													slidesToScroll={4}
													ShowMoreSlide={<ShowMoreSlickSlide l={l} linkSrc={getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel1].showMoreLink)}/>}
													dispatch={dispatch}/>
									{screenSize === 1 && <div className="popular-listings__carousel-wrap__actions">
										{this.renderShare(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel1].showMoreLink),LISTINGS_CAROUSEL_CONFIG[carousel1].criteria.join(" | "))}
										{this.renderShowMore(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel1].showMoreLink))}
									</div>}
								</div>
							</LazyLoadComponent>
						</div>
					</section>}

					{ listings[carousel2] && listings[carousel2].data.length > 2 && <section className="landing-page-content-main">
						<div className="max-container flex">
							{/*{isLoadingComponent && <Spinner/>}*/}
							<LazyLoadComponent threshold={20} afterLoad={this.onComponentLoad}>
								<div className="popular-listings__carousel-wrap fixer-upper">
									<div className="popular-listings__carousel-wrap__title-wrap">
										{screenSize > 1 && this.renderShare(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel2].showMoreLink),LISTINGS_CAROUSEL_CONFIG[carousel2].criteria.join(" | "))}
										<h2 className="popular-listings__carousel-wrap__title"><span>{LISTINGS_CAROUSEL_CONFIG[carousel2].criteria.join(" | ")}</span> <i className="pe-7s-help1" data-for="popular-listing-carousel-tooltip" data-tip={l(LISTINGS_CAROUSEL_CONFIG[carousel2].tooltip)} /></h2>
										{screenSize > 1 && this.renderShowMore(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel2].showMoreLink))}
									</div>
									<ActiveListings listings={listings[carousel2].data}
													isLeveraged={LISTINGS_CAROUSEL_CONFIG[carousel2].isLeveraged}
													isCash={LISTINGS_CAROUSEL_CONFIG[carousel2].isCash}
													country={country}
													isCityStateOnly = {true}
													user = {user}
													location = {location}
													screenSize = {screenSize}
													awsImagePath={awsImagePath}
													isCarouselDataOverlay={true}
													isCaprateBoxRequired={false}
													l={l}
													facets={LISTINGS_CAROUSEL_CONFIG[carousel2].facets}
													useCarousel={true}
													slidesToShow={4}
													slidesToScroll={4}
													ShowMoreSlide={<ShowMoreSlickSlide l={l} linkSrc={getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel2].showMoreLink)}/>}
													dispatch={dispatch}/>
									{screenSize === 1 && <div className="popular-listings__carousel-wrap__actions">
										{this.renderShare(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel2].showMoreLink),LISTINGS_CAROUSEL_CONFIG[carousel2].criteria.join(" | "))}
										{this.renderShowMore(getAbsoluteUrl(LISTINGS_CAROUSEL_CONFIG[carousel2].showMoreLink))}
									</div>}
								</div>
							</LazyLoadComponent>
						</div>
					</section>}
				</Fragment>	}
			</div>
		)
	}
}

export default PopularListings;
