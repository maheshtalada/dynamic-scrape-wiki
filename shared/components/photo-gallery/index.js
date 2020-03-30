import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Cx from 'classnames';
import { getImagePath } from '../../utils/propertyUtil';
import PhotoSlideShow from '../photo-slideshow';
import {modal} from 'react-redux-modal';
import defaultSliderSettings from '../schema/components/custom/custom-carousel-options';

export default class PhotoGallery extends Component {
	constructor(props) {
		super(props);
		this.currentIndex = 0;
	}

	static contextTypes = {
		awsImagePath : PropTypes.string,
		i18n : PropTypes.object,
		screenSize : PropTypes.number
	};

	static propTypes = {
		isSlideShowRequired : PropTypes.bool,
		sliderSettings : PropTypes.object,
		thumbSliderSettings : PropTypes.object,
		onClickImage : PropTypes.func
	};

	static defaultProps = {
		isSlideShowRequired : false,
		sliderSettings: {},
		thumbSliderSettings : {},
		onClickImage : ()=>{}
	};

	shouldComponentUpdate() {
		return false;
	}

	addSlideShowModal(dataSet,initialSlide) {
		const { l } = this.context.i18n;
		modal.add(PhotoSlideShow,{
			title: l("PHOTOSLIDESHOW"),
			key: 'photo-slide-show',
			size: 'large',
			photos: dataSet,
			initialSlide,
			className: "slide-show",
		});
	}

	render() {
		const { photos, sliderSettings, className, thumbSliderSettings, isSlideShowRequired } = this.props;
		const { awsImagePath, screenSize } = this.context;
		const { l } = this.context.i18n;
		const thumbSettings = {
			...defaultSliderSettings.thumbs,
			...thumbSliderSettings
		};
		const settings = {
			...defaultSliderSettings["photos"],
			fade : screenSize > 1 ? true : false,
			...sliderSettings,
			beforeChange: (oldIndex,newIndex) => {
				this.currentIndex = newIndex;
				this.photoThumbSlider && this.photoThumbSlider.slickGoTo(newIndex);
				this.props.beforeChange && this.props.beforeChange(oldIndex,newIndex);
			},
			appendDots : (dots) => {
				return (
					<Slider ref={slider => this.photoThumbSlider = slider} {...thumbSettings}>
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
				<Slider {...settings} ref={el => this.photoSlider = el}>
					{
						photos.map((photo,index) => {
							return (
								<div>
									<div className="photo">
										<div className="img-wrap" onClick={this.props.onClickImage}>
											{isSlideShowRequired && photos.length > 1 &&
												<button className="btn slideshow-btn" onClick={()=>{this.addSlideShowModal(photos,this.currentIndex)}}>
													<i className="pe-7s-expand1"/>
													{/*<span>{l("VIEWINSLIDESHOW")}</span>*/}
												</button>
											}
											<img alt={`Property picture ${index+1} of ${photos.length}`} src={getImagePath(awsImagePath,photo.uri)}/>
										</div>
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

