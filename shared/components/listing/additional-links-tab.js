import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common/button';
import Slider from 'react-slick';
import { formatExternalUrl } from '../../utils/urlUtil';

const SLICK_SETTINGS = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
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
};

const VIDEOTAB = 'VIDEO_LINK';

export default class AddLinksTab extends Component {

	static propTypes = {
		links: PropTypes.array
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	static defaultProps = {
		links: []
	};

	static extractVideoUrl(url) {
		let match = url.match(/^(https?):\/\/(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(https?):\/\/(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
		if (match) {
			return match[1] + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
		}
		if (match = url.match(/^(https?):\/\/(?:www\.)?vimeo\.com\/(\d+)/)) {
			// eslint-disable-line no-cond-assign
			return match[1] + '://player.vimeo.com/video/' + match[2] + '/';
		}
		return url;
	};

	constructor(props) {
		super(props);
		this.onSave = this.onSave.bind(this);
		this.state = {
			links : props.links,
			videoTitle : '',
			videoUrl : ''
		};
	}

	componentWillReceiveProps(props) {
		if(props) {
			this.setState({
				links : props.links
			});
		}
	}

	onSave() {
		const { title, url } = this.refs;
		const { tab } = this.props;
		if(!url) {
			return;
		}
		const formattedUrl = tab === VIDEOTAB ? AddLinksTab.extractVideoUrl(url.value) : formatExternalUrl(url.value);
		this.props.saveAdditionalLink(title.value,formattedUrl,tab);
		title.value = '';
		url.value = '';
	}

	renderVideosCarousel(videos) {
		const { l } = this.context.i18n;
		return (
			<Slider {...SLICK_SETTINGS} className="add-links-tab__videos-carousel">
				{
					videos.map((video,index) => {
						return (
							<div key={video.uri} className="add-links-tab__videos-carousel__carousel-item">
								<button title={l('DELETE')} className="btn" onClick={()=>{this.removeVideoLink(index,video.uri);}}><i className="pe-7s-close"/></button>
								<iframe allowFullScreen={true} frameBorder="0" src={video.uri} width="300" height="200"/>
								<div title={video.title} className="add-links-tab__videos-carousel__video-actions">
									<span className="title">
										{video.title}
									</span>
								</div>
							</div>
						);
					})
				}
			</Slider>
		);
	}

	renderExternalLinks(links) {
		const { l } = this.context.i18n;

		return (
			<ul className="add-links-tab__external-links">
				{
					links.map((link,index) => {
					return (
							<li key={link.url}>
								<a target="_blank" rel="noopener noreferrer" href={link.uri}>{link.title}</a>
								<button title={l('DELETE')} className="btn" onClick={()=>{this.removeVideoLink(index,link.uri);}}><i className="pe-7s-close"/></button>
							</li>
						)
					})
				}
			</ul>
		)
	}

	render() {
		const { links } = this.state;
		const { l } = this.context.i18n;
		const { tab, tabsConfig } = this.props;
		return (
			<div className="add-links-tab">
				<div className="add-links-tab__header">
					<h1>
						{l(tabsConfig[tab].TAB_TITLE)}
					</h1>
				</div>
				{ links && links.length > 0 &&
					tab === VIDEOTAB ? this.renderVideosCarousel(links) : this.renderExternalLinks(links)
				}
				<div className="add-links-tab__link-info">
					<div className="group">
						<label htmlFor="link-title">{l(tabsConfig[tab].LINK_TITLE)} :</label>
						<input ref="title" id="link-title" name="link-title" placeholder={l(tabsConfig[tab].LINK_TITLE_PLACEHOLDER)}/>
					</div>
					<div className="group">
						<label htmlFor="link-url">{l(tabsConfig[tab].LINK_URL)} :</label>
						<input ref="url" id="link-url" name="link-url" placeholder={l(tabsConfig[tab].LINK_URL_PLACEHOLDER)}/>
					</div>
					<div className="group">
						<label>&nbsp;</label>
						<Button className="save-btn" onClick={this.onSave}>{l('SAVE')}</Button>
					</div>
				</div>
			</div>
		);
	}

	removeVideoLink(index,uri) {
		const { tab } = this.props;
		this.props.removeAdditionalLink(index,uri,tab);
	}
}
