import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import SliderSettings from './custom-carousel-options';
import DefaultComponent from '../default-component/default-component';
import { getImagePath } from '../../../../utils/propertyUtil';
import PhotoGallery from '../../../photo-gallery';
import SiteConfig from '../../../../config';

const { assetsPath } = SiteConfig;
const FILE_TYPE_ICONS = {
		'pdf': 'pdf-icon.png',
		'docx': 'doc-icon.png',
		'xlsx': 'xlsx-icon.png',
		'zip': 'zip-icon.png',
		'ppt': 'ppt-icon.png',
		'xls': 'xlsx-icon.png',
		'doc': 'doc-icon.png',
		'pptx': 'ppt-icon.png'
	},
	ACCEPTED_IMG_TYPES = ['.jpg','.jpeg','.png'],
	ACCEPTED_DOC_TYPES = ['.jpg','.jpeg','.png','.pdf','.xls','.xlsx','.docx','.doc','.ppt','.pptx'];

const TYPE_RENDER_HANDLERS = {
	'photos' : 'renderPhotos',
	'documents' : 'renderDocuments',
	'videos' : 'renderVideos',
	'floorPlans': 'renderDocuments'
};

const DEFAULT_VIDEO_THUMBNAIL = `${assetsPath}/images/file-icons/unknown-icon.png`;

export default class CustomCarouselWrapper extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__carousel', 'schema__carousel-wrapper']
	};


	constructor(props) {
		super(props);
	}

	renderLabel(label) {
		return (null);
	}

	setVideoToPlay(uri,title) {
		this.setState({
			videoToPlay : { uri, title }
		});
	}

	renderDocPreview(doc) {
		const fileExt = doc.title.split('.').pop();
		const { awsImagePath } = this.props;
		let previewImg;
		if(ACCEPTED_IMG_TYPES.indexOf(`.${fileExt}`) >= 0) {
			previewImg = <img alt="image" src={getImagePath(awsImagePath,doc.thumbnailUri || doc.uri)} />;
		} else {
			previewImg = <img className="doc-icon" alt="image" src={`${assetsPath}/images/file-icons/${FILE_TYPE_ICONS[fileExt]}`} />;
		}
		return previewImg;
	}

	renderDocuments(type,dataSet) {
		const settings = SliderSettings[type] || SliderSettings['default'];
		const { awsImagePath, l } = this.props;
		return (
			<Slider {...settings} className="docs-carousel">
				{
					dataSet && dataSet.map((doc,index) => {
						const docUrl = getImagePath(awsImagePath,doc.uri);
						return (
							<div className="docs-carousel__item-wrap">
								<div className="docs-carousel__item-wrap__item">
									<div title={doc.title} className="docs-carousel__item-wrap__item__doc-name">
										{doc.title}
									</div>
									<a target="_blank" href={docUrl}>
										<div className="docs-carousel__item-wrap__item__icon-wrap">
											{this.renderDocPreview(doc)}
										</div>
									</a>
									<div className="docs-carousel__item-wrap__item__actions">
										<button className="">
											<a target="_blank" href={docUrl}>{l('VIEW')}</a>
										</button>
									</div>
								</div>
							</div>
						);
					})
				}
			</Slider>
		)
	}

	getVideoThumbnailPath(uri) {
		const regex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		const match = uri.match(regex);
		if(match && match[2].length === 11) {
			return `https://img.youtube.com/vi/${match[2]}/1.jpg`;
		}
		return DEFAULT_VIDEO_THUMBNAIL;
	}

	renderVideos(type,dataSet) {
		const settings = SliderSettings[type];
		const { videoToPlay = dataSet[0] } = this.state;
		return (
			<div className="schema__carousel-wrapper__videos-wrap">
				<h1 className="property-details__videos__title">{videoToPlay.title}</h1>
				<div className="main-video-frame flex flex-justify-center">
					<iframe allowFullScreen={true} frameBorder="0" src={videoToPlay.uri} width="600" height="300"/>
				</div>
				<Slider {...settings}>
					{
						dataSet.map(video => {
							return (
								<div>
									<div className="video-thumbnail"  onClick={()=>{this.setState({videoToPlay: video})}}>
										<div className="video-thumbnail__mask"><i className="pe-7s-video"/></div>
										<img src={this.getVideoThumbnailPath(video.uri)} alt="video thumbnail"/>
									</div>
								</div>
							)
						})
					}
				</Slider>
			</div>
		)
	}

	renderPhotos(type,dataSet=[]) {
		return (
				<PhotoGallery photos={dataSet}
							  className="gallery"
							  isSlideShowRequired={true}
							  thumbSliderSettings={SliderSettings.thumbs} />
		)
	}

	renderValue(value) {
		const className = this.getValueClassNames();
		const { medias: dataSet, mediaType: type } = this.props.data;
		return (<div className={className}>
			{this[TYPE_RENDER_HANDLERS[type]](type, dataSet)}
		</div>)
	}

}





