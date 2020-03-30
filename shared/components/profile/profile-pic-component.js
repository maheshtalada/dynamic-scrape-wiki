import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { Button } from '../common/button';
import Spinner from '../common/spinner/spinner';
import SiteConfig from '../../config';
import BaseProfilePic from 'lib/ProfilePic';
import { REQUEST_SAVE_PROFILE_IMAGE, REQUEST_UPLOAD_PROFILE_IMAGE, DELETE_USER_PROFILE_PIC } from '../../redux/actions/userprofile';

const { assetsPath } = SiteConfig;
const NO_AVATAR_IMAGE_PATH = `${assetsPath}/images/noimages/noavatar.png`;
const AMAZON_S3_URL = 'https://s3.amazonaws.com/propshub/';

export default class ProfilePic extends BaseProfilePic {
	constructor(props, context) {
		super(props, context);

		this.state = {
			showUploadedPic : false
		};

		this.imageUploadActions = {
			add : REQUEST_UPLOAD_PROFILE_IMAGE,
			save : REQUEST_SAVE_PROFILE_IMAGE,
			delete : DELETE_USER_PROFILE_PIC
		}

	}

	static propTypes = {
		userInfo : PropTypes.object,
		className : PropTypes.string,
		dispatch : PropTypes.func
	};

	static defaultProps = {
		label : '',
		isShowUpload : true
	}

	static contextTypes = {
		awsImagePath : PropTypes.string,
		i18n : PropTypes.object
	};

	componentDidMount() {
		if(!this.refs.profileImgEl.complete) {
			this.setState({
				imgLoading : true
			});
		}
		this.refs.profileImgEl.addEventListener('load',() => {
			this.setState({
				imgLoading : false
			});
		});
	}

	render() {
		const { className, userInfo, label, isShowUpload, photoUrl=''} = this.props;
		const { l } = this.context.i18n;
		const { awsImagePath } = this.context;
		const { showUploadedPic, uploadedFilePath, imgLoading } = this.state;
		const uri = photoUrl || userInfo.photo && userInfo.photo.uri;
		const imageUrl = showUploadedPic ? `${awsImagePath}/${uploadedFilePath}` : (uri ? `${awsImagePath}/${uri}`: NO_AVATAR_IMAGE_PATH);
		return (
			<div className={Cx("profile-page__layout__sidebar__profile-pic-wrap",className)}>
				<div className="profile-page__layout__sidebar__profile-pic-wrap__pic">
					{imgLoading && <Spinner/>}
					<div className="img-wrap cursor" onClick={this.onClickProfilePic}>
						<img ref="profileImgEl" alt="user profile pic" src={imageUrl}/>
					</div>
					{ isShowUpload && <div className="profile-page__layout__sidebar__profile-pic-wrap__action">
						<Button btnClassName="btn-default" onClick={this.onClickProfilePic}>
							{label  ? label : (uri || uploadedFilePath) ? l('UPDATEPROFILEPIC') : l('ADDPROFILEPIC')}
						</Button>
					</div>}
				</div>
			</div>
		)
	}
}
