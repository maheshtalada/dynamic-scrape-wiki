import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Cx from 'classnames';
import { getImagePath } from '../../utils/propertyUtil';
import SlideShowControls from './slide-show-controls';
import defaultSliderSettings from '../schema/components/custom/custom-carousel-options';

export default class PhotoSlideShow extends Component {
	constructor(props) {
		super(props);
		this.onClickPlay = this.onClickPlay.bind(this);
		this.onClickPause = this.onClickPause.bind(this);
		this.onClickPrev = this.onClickPrev.bind(this);
		this.onClickNext = this.onClickNext.bind(this);
		this.slideShowPaused = true;
		this.currentIndex = 0;
	}

	static contextTypes = {
		awsImagePath : PropTypes.string
	};

	static propTypes = {
		sliderSettings : PropTypes.object,
		thumbSliderSettings : PropTypes.object,
		photos : PropTypes.array
	};

	static defaultProps = {
		className : 'slide-show',
		initialSlide : 0,
		sliderSettings: {},
		thumbSliderSettings : {},
		photos : []
	};

	onClickPrev() {
		this.photoSlider.slickPrev();
	}

	onClickNext() {
		this.photoSlider.slickNext();
	}

	onClickPlay() {
		const { className } = this.props;
		this.slideShowPaused = false;
		this.photoSlider.slickPlay();
		document.querySelectorAll(`.schema__carousel-wrapper__photos-wrap.${className} .photo img`)[this.currentIndex].classList.add("photo-animate-zoom-in");
	}

	onClickPause() {
		this.slideShowPaused = true;
		const { className } = this.props;
		this.photoSlider.slickPause();
		document.querySelectorAll(`.schema__carousel-wrapper__photos-wrap.${className} .photo img`)[this.currentIndex].classList.remove("photo-animate-zoom-in");
	}

	componentDidMount() {
		this.onClickPause();
		this.photoThumbSlider && this.photoThumbSlider.slickGoTo(this.props.initialSlide);
	}

	render() {
		const { photos, sliderSettings, className, thumbSliderSettings, initialSlide } = this.props;
		const { awsImagePath } = this.context;
		const thumbSettings = {
			...defaultSliderSettings.thumbs,
			...thumbSliderSettings
		};
		const settings = {
			...defaultSliderSettings["photos"],
			...sliderSettings,
			speed: 1000,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 4000,
			pauseOnHover: false,
			initialSlide: initialSlide,
			lazyLoad: false,
			arrows: false,
			beforeChange: (oldIndex,newIndex) => {
				const newPhotoDomEl = document.querySelectorAll(`.schema__carousel-wrapper__photos-wrap.${className} .photo img`)[newIndex];
				!this.slideShowPaused && newPhotoDomEl.classList.add("photo-animate-zoom-in");
				this.photoThumbSlider.slickGoTo(newIndex);
				this.currentIndex++;
			},
			afterChange: index => {
				const newPhotoDomEl = document.querySelectorAll(`.schema__carousel-wrapper__photos-wrap.${className} .photo img`)[index];
				setTimeout(()=>{
					newPhotoDomEl.classList.remove("photo-animate-zoom-in");
				},3500);
			},
			appendDots : (dots) => {
				return (
						<Slider ref={slider => this.photoThumbSlider = slider} {...thumbSettings} slidesToShow={15}>
							{dots}
						</Slider>
				)
			},
			customPaging : (i) => {
				return <img src={getImagePath(awsImagePath,photos[i].thumbnailUri || photos[i].uri)}/>
			}
		};
		return (
			<div className={Cx("schema__carousel-wrapper__photos-wrap",className)}>
				{photos.length > 1 && <SlideShowControls onClickPlay={this.onClickPlay}
								   onClickPrev={this.onClickPrev}
								   onClickNext={this.onClickNext}
								   onClickPause={this.onClickPause}/>}
				<Slider {...settings} ref={el => this.photoSlider = el}>
					{
						photos.map((photo,index) => {
							return (
								<div>
									<div className="photo">
										<img className={Cx(index === initialSlide && "")} src={getImagePath(awsImagePath,photo.uri)}/>
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

