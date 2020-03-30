import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { dataURItoBlob } from '../common/drop-zone/getDataTransferItems';
import AvatarEditor from 'react-avatar-editor';
import { Button } from '../common/button';
import Spinner from '../common/spinner/spinner';
import { RangeSlider } from '../common/range-slider';


export default class EditListingMedia extends Component {
	constructor(props) {
		super(props);

		this.onClickSaveMedia = this.onClickSaveMedia.bind(this);
		this.onRotateLeft = this.onRotateLeft.bind(this);
		this.onRotateRight = this.onRotateRight.bind(this);
		this.onZoomChange = this.onZoomChange.bind(this);
		this.onImageReadyOnCanvas = this.onImageReadyOnCanvas.bind(this);

		this.state = {
			imageFile : props.previewFile,
			uploadedFilePath : props.profilePicUrl,
			zoomLevel : 1,
			rotateDegrees : 0,
			isImgLoading : true,
			aspectRatio : 1
		};

		typeof(props.previewFile) === 'object' && this.setImageAspectRatio(props.previewFile) || this.imageAspectRatio(props.previewFile)
	}

	static propTypes = {
		previewFile: PropTypes.object,
		onFinishEdit: PropTypes.func,
		listingMediaPreview : PropTypes.bool,
		fileIndex : PropTypes.number
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	componentWillReceiveProps(props) {
		if(props) {
			console.log(props);
		}
	}

	setEditorRef = (editor) => {
		this.editor = editor;
	};

	onClickSaveMedia() {
		const { fileIndex, previewFile, from } = this.props;
		if(this.editor) {
			const canvas = this.editor.getImage();
			const dataURL = canvas.toDataURL(previewFile.type);
			let file = dataURItoBlob(dataURL);
			file.preview = window.URL.createObjectURL(file);
			this.props.onFinishEdit(file,fileIndex, from);
		}
	}

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

	setImageAspectRatio(file) {
		var reader = new FileReader();
		var image = new Image();
		reader.onload = (readerEvent) => {
			image.onload = () => {
				this.setState({ aspectRatio : image.width / image.height});
			};
			image.src = readerEvent.target.result;
		};
		reader.readAsDataURL(file);
	}

	imageAspectRatio(file) {
		let image = new Image();
		image.onload = () => {
			this.setState({ aspectRatio : image.width / image.height});
		};
		image.crossOrigin = "anonymous";
		image.src = file;
	}

	render() {
		const { imageFile, zoomLevel, rotateDegrees, isImgLoading, aspectRatio } = this.state;
		const { l } = this.context.i18n;
		return (
			<div className="m-edit-media__content">
				<div className="m-edit-media__content__editor">
					<div className="m-edit-media__content__editor__canvas-wrap">
						{isImgLoading &&
						<Spinner/>
						}
						<AvatarEditor
							image={imageFile}
							width={300}
							height={300/aspectRatio}
							border={10}
							scale={zoomLevel}
							ref={this.setEditorRef}
							rotate={rotateDegrees}
							color={[0,0,0,0.3]}
							crossOrigin="anonymous"
							onImageReady={this.onImageReadyOnCanvas}
						/>
					</div>
					<div className="m-edit-media__content__editor__settings">
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
							<Button btnClassName="btn-primary" onClick={this.onClickSaveMedia}>{l('SAVE')}</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

