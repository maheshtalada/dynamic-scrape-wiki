/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import icons from './icons';

import {
  getFacebookShareCount,
  getGooglePlusShareCount,
  getLinkedinShareCount,
  getPinterestShareCount,
  getVKShareCount,
  getOKShareCount
} from './share-count-getters';

class SocialMediaShareCount extends Component {
	constructor(props) {
		super(props);

		this._isMounted = false;
		this.state = { count: 0 };
	}

	componentDidMount() {
		this._isMounted = true;
		this.updateCount(this.props.url);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url !== this.props.url) {
			this.updateCount(nextProps.url);
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	updateCount(url) {
		if (this.props.getCount) {
			this.setState({
				isLoading: true
			});

			this.props.getCount(url, count => {
				if (this._isMounted) {
					this.setState({
						count,
						isLoading: false
					});
				}
			});
		}
	}

	render() {
		const {
      count,
      isLoading
    } = this.state;

		const {
      children,
      className
    } = this.props;

		return (
      <span className={cx('social-share__share-count flex flex-justify-center flex-align-center', className)}>
        {!isLoading && children(count || 0)}
      </span>
		);
	}
}

SocialMediaShareCount.propTypes = {
	children: PropTypes.func,
	className: PropTypes.string,
	getCount: PropTypes.func,
	url: PropTypes.string.isRequired
};

SocialMediaShareCount.defaultProps = {
	children: shareCount => shareCount
};

function shareCountFactory(getCount) {
	return props =>
    <SocialMediaShareCount getCount={getCount} {...props} />;
}

const FacebookShareCount = shareCountFactory(getFacebookShareCount);
const LinkedinShareCount = shareCountFactory(getLinkedinShareCount);
const GooglePlusShareCount = shareCountFactory(getGooglePlusShareCount);
const PinterestShareCount = shareCountFactory(getPinterestShareCount);
const VKShareCount = shareCountFactory(getVKShareCount);
const OKShareCount = shareCountFactory(getOKShareCount);
const TwitterShareCount = () => {
	throw new Error('TwitterShareCount was removed in version 1.3.0 because' +
    'the Twitter API was shut down and there is no replacement. Please ' +
    'remove it from your code.');
};

export default {
	FacebookShareCount,
	LinkedinShareCount,
	GooglePlusShareCount,
	PinterestShareCount,
	VKShareCount,
	OKShareCount
}
