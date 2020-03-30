import React from 'react';
import { Panel, PanelBody } from '../common/panel';
import Slider from 'react-slick';
import SlickArrow from '../common/slick-arrows/slick-arrow-next';
import ListingGridTile from '../common/listing-tile-components/listing-grid-tile';

const ActiveListings = (props) => {
	const {listings, useCarousel, slidesToShow = 3, slidesToScroll = 1, ShowMoreSlide} = props;
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow,
		slidesToScroll,
		initialSlide: 0,
		lazyLoad: false,
		nextArrow: <SlickArrow type="next" />,
		prevArrow: <SlickArrow type="prev" />,
		responsive: [{
			breakpoint: 1080,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,

			}
		},
			{
			breakpoint: 880,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				initialSlide: 0
			}
		},
			{
			breakpoint: 560,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	};

	return(
		<div className="col-lg-12 col-md-12 col-sm-12 realtor-details__active-listings">
			{useCarousel && listings.length > 0 ?
				<Slider {...settings}>
					{renderListings(props)}
					{ShowMoreSlide &&
						<div className="realtor-details__active-listings__listing-link show-more-slide">
							<Panel className={'slick__item'}>
								<PanelBody>
									{ShowMoreSlide}
								</PanelBody>
							</Panel>
						</div>
					}
				</Slider> :
				<div>
					{listings.length > 0 && renderListings(props)}
				</div>
			}
		</div>
	);

};

const renderListings = ({ isCarouselDataOverlay = false , isROICalculatorRequired=true, isCaprateBoxRequired = true,listings,awsImagePath, l, country, useCarousel, screenSize, location, user, dispatch, facets, isLeveraged, isCash, isOpenNewTab, isCityStateOnly = false}) => {
	const panelClasses = useCarousel ? 'slick__item' : 'col-lg-4 col-md-4 col-sm-6 col-xs-12';
	return listings && listings.map((item,index) => {
			return (
				<div className="realtor-details__active-listings__listing-link">
					<Panel key={index} id={index} className={panelClasses}>
						<PanelBody>
							<ListingGridTile isROICalculatorRequired={isROICalculatorRequired} isCaprateBoxRequired={isCaprateBoxRequired} isCarouselDataOverlay={isCarouselDataOverlay} isOpenNewTab={isOpenNewTab} isLeveraged={isLeveraged} isCityStateOnly={isCityStateOnly} isCash={isCash} listing={item} facets={facets} dispatch={dispatch} screenSize={screenSize} location={location} user={user} awsImagePath={awsImagePath} l={l} country={country}/>
						</PanelBody>
					</Panel>
				</div>
			)
		}
	);
};

export default ActiveListings;
