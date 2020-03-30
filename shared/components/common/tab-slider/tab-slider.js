import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import SlickArrow from '../slick-arrows/slick-arrow-next';

const defaultSettings = {
	className: 'slider variable-width',
	variableWidth: true,
	dots: false,
	infinite: false,
	centerPadding: '60px',
	slidesToShow: 1,
	slidesToScroll: 1,
	swipeToSlide: true,
	nextArrow: <SampleNextArrow />,
	prevArrow: <SlickArrow type="prev" />,
	afterChange: function (index) {
		console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
	}
};
function isLastSlideInsideTrack(props) {
	const sliderClass = props.sliderClass ? `.${props.sliderClass}` : '';
	const lastSlide = document.querySelectorAll(`${sliderClass} .slick-slide`)[props.slideCount-1];
	const slickList = document.querySelectorAll(`${sliderClass} .slick-list`)[0];
	if(lastSlide && slickList) {
		return lastSlide.getBoundingClientRect().right < slickList.getBoundingClientRect().right
	}
	return true;
}

function SampleNextArrow(props) {
	return !frameworkGlobals.isServer && !isLastSlideInsideTrack(props) && (
			<SlickArrow type="next" {...props} />
		);
}

function SamplePrevArrow(props) {
	return (
		<SlickArrow type="prev" {...props}/>
	);
}

export default function(props) {
	const { settings={} } = props;
	let modSettings = Object.assign({},defaultSettings,settings);
	modSettings.nextArrow = <SampleNextArrow sliderClass={settings.className || ''}/>;
	modSettings.prevArrow = <SamplePrevArrow sliderClass={settings.className || ''}/>;
	return (
		<Slider {...modSettings}>
			{props.children}
		</Slider>
	)
}
