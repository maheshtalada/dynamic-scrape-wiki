import SlickArrow from '../../../common/slick-arrows/slick-arrow-next';

export default {
	default : {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		adaptiveHeight: false,
		initialSlide: 0,
		lazyLoad: false,
		accessibility: true,
		nextArrow: <SlickArrow type="next" />,
		prevArrow: <SlickArrow type="prev" />,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	},
	videos : {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 1,
		adaptiveHeight: false,
		lazyLoad: false,
		accessibility: true,
		nextArrow: <SlickArrow type="next" />,
		prevArrow: <SlickArrow type="prev" />,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	},
	photos : {
		dots: true,
		dotsClass: 'slick-dots slick-thumb',
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: false,
		initialSlide: 0,
		lazyLoad: true,
		fade: true,
		accessibility: true,
		nextArrow: <SlickArrow type="next" />,
		prevArrow: <SlickArrow type="prev" />
	},
	documents : {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		adaptiveHeight: false,
		initialSlide: 0,
		lazyLoad: false,
		accessibility: true,
		nextArrow: <SlickArrow type="next" />,
		prevArrow: <SlickArrow type="prev" />,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	},
	"thumbs" : {
		dots: false,
		infinite: false,
		centerPadding: '60px',
		swipeToSlide: true,
		nextArrow: <SlickArrow type="next" />,
		prevArrow: <SlickArrow type="prev" />,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 10,
				slidesToScroll: 5
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		}]
	}

};
