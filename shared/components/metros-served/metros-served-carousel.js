import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import Slider from 'react-slick';
import SlickArrow from '../common/slick-arrows/slick-arrow-next';

const SETTINGS = {
	dots: false,
	infinite: true,
	centerPadding: '60px',
	slidesToShow: 1,
	slidesToScroll: 1,
	swipeToSlide: true,
	nextArrow: <SlickArrow type="next" />,
	prevArrow: <SlickArrow type="prev" />,
	autoplay: true,
	autoplaySpeed: 2000
};

export default class MetrosServedCarousel extends Component {
	constructor(props) {
		super(props);
		this.onSlideChange = this.onSlideChange.bind(this);
		this.state = {
			slideGoTo : props.slideGoTo
		}
	}

	static contextTypes = {
		i18n: PropTypes.object
	};

	onSlideChange(index) {
		const { areasServed } = this.props;
		this.props.onSlideChange(areasServed[index],index);
	}

	componentWillReceiveProps(props) {
		this.slider.slickGoTo(props.slideGoTo);
	}

	render() {
		const { className, areasServed } = this.props;
		const { l } = this.context.i18n;
		return (
			<div className={Cx('metros-served-carousel',className)}>
				<Slider ref={slider => (this.slider = slider)} {...SETTINGS} afterChange={this.onSlideChange}>
					{
						areasServed.map(city => {
							return (
								<div>
									<div key={city.name} className="metros-served-carousel__area-wrap">
										<h1>{city.label}</h1>
										<button className="btn btn-default" onClick={()=>{this.props.onClickSearch(city)}}>{l('SEARCH')}</button>
									</div>
								</div>
							)
						})
					}
				</Slider>
			</div>
		)
	}

}
