import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { getDataTransferFiles, dataURItoBlob, resizeImage } from '../common/drop-zone/getDataTransferItems';
import AvatarEditor from 'react-avatar-editor';
import { Button } from '../common/button';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/spinner';
import { RangeSlider } from '../common/range-slider';
import ReactTooltip from 'react-tooltip';
import {  DELETE_USER_PROFILE_PIC } from '../../redux/actions/userprofile';

const ACCEPTED_IMG_TYPES = ['.jpg','.jpeg','.png'];

class ProfilePicModal extends Component {
	constructor(props) {
		super(props);

		this.onProfilePicChange = this.onProfilePicChange.bind(this);
		this.onClickBrowseFiles = this.onClickBrowseFiles.bind(this);
		this.onClickSaveProfilePic = this.onClickSaveProfilePic.bind(this);
		this.onRotateLeft = this.onRotateLeft.bind(this);
		this.onRotateRight = this.onRotateRight.bind(this);
		this.onZoomChange = this.onZoomChange.bind(this);
		this.onImageReadyOnCanvas = this.onImageReadyOnCanvas.bind(this);
		this.onClickDeletePic = this.onClickDeletePic.bind(this);

		this.state = {
			imageFile : props.profilePicUrl,
			uploadedFilePath : props.profilePicUrl,
			isUploading : false,
			isSaving : false,
			zoomLevel : 1.15,
			rotateDegrees : 0,
			isImgLoading : true,
			showDeleteOption : !!props.uri,
			profileSection : props.profileSection
		};
	}

	static propTypes = {
		dispatch: PropTypes.func,
		profilePicUrl: PropTypes.string,
		afterUploadingImage: PropTypes.func,
		uri: PropTypes.string,
		actions : PropTypes.object
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	componentWillReceiveProps(props) {
		if(props) {
			const { uploadProfilePic, saveProfilePic, deleteProfilePic } = props;
			this.setState({
				isUploading: uploadProfilePic && uploadProfilePic.isUploading,
				isSaving: saveProfilePic && saveProfilePic.isSaving,
				isDeleting: deleteProfilePic && deleteProfilePic.deletingPic
			},() => {
				/*if(uploadProfilePic && uploadProfilePic.status === 'success') {
					this.props.dispatch(actions.save({
						dataPayload : {
							uri : uploadProfilePic.filepath,
							thumbnailUri : uploadProfilePic.thumbnailpath
						},
						isEditProfile : !this.state.profileSection
					}));
				}*/
				if(uploadProfilePic && uploadProfilePic.status === 'success') {
					this.props.afterUploadingImage(uploadProfilePic.filepath);
				}
				if(deleteProfilePic && deleteProfilePic.status === 'success') {
					window.location.reload();
				}
			});
		}
	}

	componentDidMount() {
		this.fileInputEl.addEventListener('change',(e) => {
			this.onProfilePicChange(e);
		});
	}

	onProfilePicChange = async(e) => {
		const filesList = getDataTransferFiles(e,false);
		this.setState({
			imageFile : filesList[0],
			showDeleteOption : false
		});
	};

	onClickBrowseFiles() {
		this.fileInputEl.click();
	}

	setEditorRef = (editor) => {
		this.editor = editor;
	};

	onClickSaveProfilePic = async() => {
		if(this.editor) {
			const canvas = this.editor.getImage();
			const dataURL = canvas.toDataURL('image/png');
			const imageBlob = dataURItoBlob(dataURL);
			const compressedImageBlob = await resizeImage({
				file : imageBlob,
				isCompress : true,
				quality : 70,
				maxWidth : 1000
			});
			this.props.dispatch(this.props.actions.add(compressedImageBlob, this.props.listingId));
		}
	};

	onZoomChange(value) {
		this.setState({
			zoomLevel : value
		});
	}

	onRotateLeft() {
		this.setState((prevState) => {
			return {
				rotateDegrees : prevState.rotateDegrees+90
			};
		});
	}

	onRotateRight() {
		this.setState((prevState) => {
			return {
				rotateDegrees : prevState.rotateDegrees-90
			};
		});
	}

	onImageReadyOnCanvas() {
		this.setState({
			isImgLoading: false
		});
	}

	onClickDeletePic() {
		const { uri } = this.props;
		this.props.dispatch(DELETE_USER_PROFILE_PIC({
			key : uri,
			isEditProfile : !this.state.profileSection
		}));
	}

	render() {
		const { imageFile, isUploading, isSaving, zoomLevel, rotateDegrees, isImgLoading, isDeleting, showDeleteOption} = this.state;
		const { l } = this.context.i18n;
		return (
			<div className="m-profile-pic-modal__content">
				<input type="file" accept={ACCEPTED_IMG_TYPES.join(',')} style={{'display': 'none'}} ref={el => this.fileInputEl = el}/>
				<div className="m-profile-pic-modal__content__editor">
					<div className="m-profile-pic-modal__content__editor__canvas-wrap">
					{ showDeleteOption && <Button btnClassName="btn-default" onClick={this.onClickDeletePic}>
						<i className="pe-7s-trash"/>
						{l('DELETE')}
					</Button>}
					{(isUploading || isSaving || isImgLoading || isDeleting) &&
						<Spinner/>
					}
					{/* <i className="profile-pic-tooltip pe-7s-help1" data-place="right" data-for="react-tooltip-profile-pic" data-tip={l('PROFILEPICTOOLTIP')}/> */}
					<AvatarEditor
						image={imageFile}
						width={225}
						height={225}
						border={25}
						scale={zoomLevel}
						ref={this.setEditorRef}
						rotate={rotateDegrees}
						color={[0,0,0,0.3]}
						crossOrigin="anonymous"
						disableBoundaryChecks={true}
						onImageReady={this.onImageReadyOnCanvas}
						/>
					<span className="profile-pic-note">*{l('PROFILEPICTOOLTIP')}</span>
					</div>
					<div className="m-profile-pic-modal__content__editor__settings">
						<div className="setting-wrap">
							<RangeSlider
								title="ZOOM"
								min={1}
								max={3}
								step={0.05}
								onChange={this.onZoomChange}
								defaultValue={zoomLevel}
							/>
						</div>
						<div className="setting-wrap">
							<label>{l('ROTATE')}</label>
							<div className="rotate-actions">
								<Button onClick={this.onRotateLeft} btnClassName="btn-default">{l('LEFT')}</Button>
								<Button onClick={this.onRotateRight} btnClassName="btn-default">{l('RIGHT')}</Button>
							</div>
						</div>
						<div className="setting-wrap">
							<Button btnClassName="btn-primary" onClick={this.onClickBrowseFiles}>{l('SELECTFILESTOUPLOAD')}</Button>
						</div>
						<div className="setting-wrap">
							<Button btnClassName="btn-primary" onClick={this.onClickSaveProfilePic}>{l('UPLOADNOW')}</Button>
						</div>
					</div>
				</div>
				<ReactTooltip id="react-tooltip-profile-pic"/>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		uploadProfilePic : userprofile.profile_image_upload,
		saveProfilePic : userprofile.profile_image_save,
		deleteProfilePic : userprofile.delete_profile_pic
	};
};

export default connect(mapStateToProps)(ProfilePicModal);
