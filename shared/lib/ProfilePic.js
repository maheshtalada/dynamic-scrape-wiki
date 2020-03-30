import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { modal } from 'react-redux-modal';
import ProfilePicModal from 'components/profile/profile-pic-modal';
import Spinner from 'components/common/spinner/spinner';
import SiteConfig from '../config';

const { assetsPath } = SiteConfig;
const NO_AVATAR_IMAGE_PATH = `${assetsPath}/images/noimages/noavatar.png`;
const AMAZON_S3_URL = 'https://s3.amazonaws.com/propshub/';

export default class BaseProfilePic extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showUploadedPic : false
		};

		this.onClickProfilePic = this.onClickProfilePic.bind(this);
		this.afterUploadingImage = this.afterUploadingImage.bind(this);
	}

	static propTypes = {
		userInfo : PropTypes.object,
		className : PropTypes.string,
		dispatch : PropTypes.func
	};

	static defaultProps = {
		label : ''
	}

	static contextTypes = {
		awsImagePath : PropTypes.string,
		i18n : PropTypes.object
	};

	afterUploadingImage(filePath) {
		this.setState({
			uploadedFilePath : filePath,
			showUploadedPic : true,
			imgLoading : true
		},() => {
			modal.clear();
			!this.props.isStopWindowReload && window.location.reload();
		});
	}

	onClickProfilePic(id='', photoObj ={}) {
		const { l } = this.context.i18n;
		const { userInfo = '', dispatch, afterUploadingImage, profileSection, user = '' } = this.props;
		const uri = userInfo.photo && userInfo.photo.uri || photoObj.photo && photoObj.photo.uri ;
		const { showUploadedPic, uploadedFilePath } = this.state;
		const { awsImagePath } = this.context;
		let imageUrl = showUploadedPic ? `${awsImagePath}/${uploadedFilePath}` : (uri ? `${awsImagePath}/${uri}` : NO_AVATAR_IMAGE_PATH);
		imageUrl += `?refresh=${Math.random()}`; // appending random param so as to get fresh image rather than from cache
		modal.add(ProfilePicModal,{
			title : l('PROFILEPICTURE'),
			size : 'profile-pic-modal',
			dispatch: dispatch,
			profilePicUrl: imageUrl,
			afterUploadingImage: afterUploadingImage || this.afterUploadingImage,
			uri : uri,
			profileSection,
			actions : this.imageUploadActions,
			listingId: id
		});
	}

}
