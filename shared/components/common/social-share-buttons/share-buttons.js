/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as links from './social-media-share-links';
import { windowOpen } from './utils';

const supportedNetworks = Object.keys(links);

class ShareButton extends Component {
	static propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		disabledStyle: PropTypes.object,
		network: PropTypes.oneOf(supportedNetworks),
		opts: PropTypes.object,
		url: PropTypes.string.isRequired,
		style: PropTypes.object,
		windowWidth: PropTypes.number,
		windowHeight: PropTypes.number,
		beforeOnClick: PropTypes.func
	};

	static defaultProps = {
		disabledStyle: {
			opacity: 0.6
		}
	}

	onClick = (e) => {
		const {
      disabled,
      windowWidth,
      windowHeight,
	  beforeOnClick,
	  onClickShareButton
    } = this.props;

		if (!disabled) {
			e.preventDefault();

			const windowOptions = {
				height: windowHeight,
				width: windowWidth
			};

			const windowOpenBound = () => windowOpen(this.link(), windowOptions);
			onClickShareButton && onClickShareButton(this.props.network);
			if (beforeOnClick) {
				beforeOnClick().then(() => windowOpenBound());
			} else {
				windowOpenBound();
			}
		}
	}

	link() {
		const { url, opts, network } = this.props;
		return links[network](url, opts);
	}

	render() {
		const {
      children,
      className,
      disabled,
      disabledStyle,
      network,
      style
    } = this.props;

		const classes = cx(
			'social-share__share-button',
			'btn btn-sm btn-default',
			{
				disabled: !!disabled
			},
      className
    );

		return (
      <button
	  data-tag-category='Share Actions' data-tag-action="Click" data-tag-label='Share'
        onClick={this.onClick}
        className={classes}
        style={{
	...style,
	...(disabled ? disabledStyle : {})
}}>
        {children}
      </button>
		);
	}
}

/* HOC to ease migration from v1 to v2.
 * To-be-removed in v2.
 */
function createShareButton(network, optsMap = () => ({}), propTypes, defaultProps = {}) {
	const CreatedButton = props => (
    <ShareButton {...props}
      network={network}
      opts={optsMap(props)} />
  );

	CreatedButton.propTypes = propTypes;
	CreatedButton.defaultProps = defaultProps;

	return CreatedButton;
}

const FacebookShareButton = createShareButton('facebook', props => ({
	description: props.description,
	title: props.title,
	picture: props.picture,
	hashtag: props.hashtag
}), {
	description: PropTypes.string,
	title: PropTypes.string,
	picture: PropTypes.string,
	hashtag: PropTypes.string
}, {
	windowWidth: 550,
	windowHeight: 400
});

const TwitterShareButton = createShareButton('twitter', props => ({
	hashtags: props.hashtags,
	title: props.title,
	via: props.via
}), {
	hashtags: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string,
	via: PropTypes.string
}, {
	windowWidth: 550,
	windowHeight: 400
});

const TelegramShareButton = createShareButton('telegram', props => ({
	title: props.title,
	via: props.via
}), {
	title: PropTypes.string,
	via: PropTypes.string
}, {
	windowWidth: 550,
	windowHeight: 400
});

const WhatsappShareButton = createShareButton('whatsapp', props => ({
	title: props.title,
	separator: props.separator
}), {
	title: PropTypes.string,
	separator: PropTypes.string
}, {
	separator: ' ',
	windowWidth: 550,
	windowHeight: 400
});

const GooglePlusShareButton = createShareButton('googlePlus',
  undefined,
  undefined,
	{
		windowWidth: 550,
		windowHeight: 400
	}
);

const LinkedinShareButton = createShareButton('linkedin', props => ({
	title: props.title,
	description: props.description
}), {
	title: PropTypes.string,
	description: PropTypes.string
}, {
	windowWidth: 750,
	windowHeight: 600
});

const PinterestShareButton = createShareButton('pinterest', props => ({
	media: props.media,
	description: props.description
}), {
	media: PropTypes.string.isRequired,
	description: PropTypes.string
}, {
	windowWidth: 1000,
	windowHeight: 730
});

const VKShareButton = createShareButton('vk', props => ({
	title: props.title,
	description: props.description,
	image: props.image
}), {
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string
}, {
	windowWidth: 660,
	windowHeight: 460
});

const OKShareButton = createShareButton('ok', props => ({
	title: props.title,
	description: props.description,
	image: props.image
}), {
	title: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string
}, {
	windowWidth: 660,
	windowHeight: 460
});


export default {
	FacebookShareButton,
	OKShareButton,
	VKShareButton,
	PinterestShareButton,
	LinkedinShareButton,
	GooglePlusShareButton,
	WhatsappShareButton,
	TelegramShareButton,
	TwitterShareButton
}
