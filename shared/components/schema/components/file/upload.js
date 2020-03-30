import React from 'react';
import PropTypes from 'prop-types';
import UploadImageToS3 from '../../../../lib/uploadFileToS3';
import DefaultComponent from '../default-component/default-component';
import Dropzone from '../../../common/drop-zone';
import { Button } from '../../../common/button';

/**
 * @description Renders a file input component
 */

const ACCEPTED_IMG_TYPES = ['.jpg','.jpeg','.png','image/jpeg','image/png'];

export default class FileUploadComponent extends  DefaultComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__file-upload']
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);

		this.state = {
			openFile : false,
			files : undefined
		}
	}

	onDrop(acceptedFiles, rejectedFiles) {
		//const files = this.state.files.concat(acceptedFiles);
		this.setState({
			files: acceptedFiles,
			openFile:false
		});

	}

	renderLabel() {
		return null;
	}

	renderPreview(path, mode, name) {
		return (
			<div className="schema__file-upload__image-preview-container">
				<img src={path} alt={name} />
			</div>
		)
	}

	renderActions() {

	}

	onSelectFileClick() {
		this.setState({
			openFile : true
		});
	}

	renderBrowseFiles() {

		const { l } = this.context.i18n;
		const { files, openFile, isUploading, listingData, currentTab, rejectedFiles, highlightUploadBtn, isOptimizing } = this.state;
		return (
			<Dropzone className="drop-mode media-drop-zone"
					  onDrop={this.onDrop}
					  isResSizeImage={false}
					  isCompressImage={false}
					  openFile={openFile}
					  multiple={false}
					  disableClick={true}
					  key="photostab"
					  accept={ACCEPTED_IMG_TYPES.join(',')}
			>
				<div style={{top: '4%',position: 'relative',textAlign : 'center'}}>
					<div className="drop-zone-wrapper">
						<Button className="save-search" disabled={disable}
								onClick={()=>{
									this.onSelectFileClick();
								}}>
							<i className="pe-7s-file" />
							{l('SELECTFILESTOUPLOAD')}
						</Button>
					</div>
					{ isUploading && (files.length > 0 || rejectedFiles.length > 0) ?
						<div className="drop-zone-wrapper__images-actual">
							<span className="slider-gallery-title">{l('PREVIEWSELECTEDIMAGES')}</span>
							<div className="drop-zone-wrapper__images-actual__items">
								{ files.length > 0 && this.renderAcceptedFiles()}
								{ rejectedFiles.length > 0 && this.renderRejectedFiles()}
							</div>
						</div> : null}

				</div>
			</Dropzone>
		)
	}

	render() {
		return (
		<div className={classnames([this.props.classNames, 'schema__component', this.state.classNames])}>
			{this.renderPreview(this.props.label)}
			{this.renderValue(this.props.data && this.props.data.value || '')}
		</div>
		);
	}

	async onSaveImage () {
		try {
			let response = await UploadImageToS3(fileInput.files[0],this.props.data.payload.imageServerPayload);
			this.props.storeValue(this.props.id, response.data.filepath);
		} catch (e) {
			console.error('error uploading file ->' , e)
		}

	}

}


