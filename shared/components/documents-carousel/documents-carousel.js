import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

const SLICK_SETTINGS = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		adaptiveHeight: false,
		initialSlide: 0,
		lazyLoad: false,
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
	FILE_TYPE_ICONS = {
		'pdf': 'pdf-icon.png',
		'docx': 'doc-icon.png',
		'xlsx': 'xlsx-icon.png',
		'zip': 'zip-icon.png',
		'ppt': 'ppt-icon.png',
		'xls': 'xlsx-icon.png',
		'doc': 'doc-icon.png',
		'pptx': 'ppt-icon.png'
	},
	SERVER = 'server',
	ACCEPTED_IMG_TYPES = ['.jpg','.jpeg','.png'],
	ACCEPTED_DOC_TYPES = ['.jpg','.jpeg','.png','.pdf','.xls','.xlsx','.docx','.doc','.ppt','.pptx'];

export default class DocumentsCarousel extends Component {
	constructor(props) {
		super(props);
	}

	static contextTypes = {
		i18n: PropTypes.object,
		awsImagePath: PropTypes.string,
		assetsPath: PropTypes.string
	};

	static propTypes = {
		documents : PropTypes.array,
		isDeleteRequired: PropTypes.bool,
		onFileRemove: PropTypes.func,
		isDownloadRequired: PropTypes.bool,
		slickSettings: PropTypes.object
	};

	static defaultProps = {
		isDeleteRequired: false,
		isDownloadRequired: false
	};

	renderDocPreview(doc) {
		const fileExt = doc.title.split('.').pop();
		const { awsImagePath, assetsPath } = this.context;
		let previewImg;
		if(ACCEPTED_IMG_TYPES.indexOf(`.${fileExt}`) >= 0) {
			previewImg = <img alt="image" src={`${awsImagePath}/${doc.thumbnailUri}`} />;
		} else {
			previewImg = <img className="doc-icon" alt="image" src={`${assetsPath}/images/file-icons/${FILE_TYPE_ICONS[fileExt]}`} />;
		}
		return previewImg;
	}

	render() {
		const { documents, isDeleteRequired, isDownloadRequired } = this.props;
		const { l } = this.context.i18n;
		const slickSettings = this.props.slickSettings || SLICK_SETTINGS;
		const { awsImagePath } = this.context;
		return (
			<Slider {...slickSettings} className="docs-carousel">
				{
					documents && documents.map((doc,index) => {
						return (
							<div className="docs-carousel__item-wrap">
								<div className="docs-carousel__item-wrap__item">
									<div title={doc.title} className="docs-carousel__item-wrap__item__doc-name">
										{doc.title}
									</div>
									<a target="_blank" href={`${awsImagePath}/${doc.uri}`}>
									<div className="docs-carousel__item-wrap__item__icon-wrap">

											{this.renderDocPreview(doc)}
									</div>
									</a>
									<div className="docs-carousel__item-wrap__item__actions">
										<button className=""><a target="_blank" href={`${awsImagePath}/${doc.uri}`}>{l('VIEW')}</a></button>
										{isDownloadRequired && <button className=""><a download href={`${awsImagePath}/${doc.uri}`}><i className="pe-7s-download"/><span>{l('DOWNLOAD')}</span></a></button>}
										{isDeleteRequired && <button className="" onClick={()=> {
											this.props.onFileRemove(doc, '', 'files', SERVER, index);
										}}><span>{l('DELETE')}</span></button>
										}
									</div>
								</div>
							</div>
						);
					})
				}
			</Slider>
		);
	}
}
