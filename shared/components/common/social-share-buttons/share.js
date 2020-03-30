import React, { Fragment, Component} from 'react';
import { findIndex as _findIndex } from 'lodash';
import ShareButtons from './share-buttons';
import ShareCounts from './share-counts';
import generateShareIcon from './generateIcon';

const {
	FacebookShareButton,
	GooglePlusShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	PinterestShareButton,
	WhatsappShareButton
} = ShareButtons;

const {
	FacebookShareCount,
	GooglePlusShareCount,
	LinkedinShareCount,
	PinterestShareCount
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const WhatsappIcon = generateShareIcon('whatsapp');


export default class Share extends Component {

	constructor(props) {
		super(props)
	}

	enableShareOption(shareOptions, network) {
		return _findIndex(shareOptions, { network : network}) > -1 && true;
	}

	render() {
		const {options : shareOptions, shareUrl, imagePath, title, screenSize } = this.props;
		return (
			<Fragment>
				{this.enableShareOption(shareOptions, 'facebook') && <div className="social-share__network facebook">
					<FacebookShareButton
						url={shareUrl}
						title={title}
						className="facebook"
						picture={imagePath}>
						<FacebookIcon
							size={20}
							round />
						<FacebookShareCount
							network="facebook"
							url={shareUrl}>
							{count => count}
						</FacebookShareCount>
					</FacebookShareButton>
				</div>}
				{this.enableShareOption(shareOptions, 'twitter') && <div className="social-share__network twitter">
					<TwitterShareButton
						url={shareUrl}
						title={title}
						className="twitter"
						picture={imagePath}>
						<TwitterIcon
							size={20}
							round/>
						<div className="social-share__share-count">
							Tweet
						</div>
					</TwitterShareButton>
				</div>}
				{this.enableShareOption(shareOptions, 'google') && <div className="social-share__network google">
					<GooglePlusShareButton
						url={shareUrl}
						className="google">
						<GooglePlusIcon
							size={20}
							round />
						<GooglePlusShareCount
							url={shareUrl}>
							{count => count}
						</GooglePlusShareCount>
					</GooglePlusShareButton>
				</div>}

				{this.enableShareOption(shareOptions, 'linkedin') && <div className="social-share__network linkedin">
					<LinkedinShareButton
						url={shareUrl}
						title={title}
						windowWidth={750}
						className="linkedin"
						windowHeight={600}>
						<LinkedinIcon
							size={20}
							round />
						<LinkedinShareCount
							url={shareUrl}>
							{count => count}
						</LinkedinShareCount>
					</LinkedinShareButton>
				</div>}

				{this.enableShareOption(shareOptions, 'pinterest') && <div className="social-share__network pinterest">
					<PinterestShareButton
						url={shareUrl}
						media={imagePath}
						windowWidth={1000}
						className="pinterest"
						windowHeight={730}>
						<PinterestIcon size={20} />
						<PinterestShareCount url={shareUrl}/>
					</PinterestShareButton>
				</div>}

				{this.enableShareOption(shareOptions, 'whatsapp') && screenSize === 1 && <div className="social-share__network whatsapp">
					<WhatsappShareButton
						url={shareUrl}
						title={title}
						className="whatsapp"
						separator=":: ">
						<WhatsappIcon size={20} />
						<div className="social-share__share-count">
							WhatsApp
						</div>
					</WhatsappShareButton>
				</div>}
			</Fragment>
		)
	}
}



