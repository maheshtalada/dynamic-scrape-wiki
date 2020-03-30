import React , { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import Dropzone from '../../components/common/drop-zone';
import { concat } from 'lodash';
import { Button } from '../../components/common/button';
import { connect } from 'react-redux';
import { findIndex as _findIndex, cloneDeep } from 'lodash';
import LoadingBar from '../../components/common/page-loader/page-loader';
import { getTabImages } from '../../utils/listingUtil';
import LinearNavigation from '../../components/common/linear-navigation/linear-navigation';
import { mediaTabsConfig } from '../../assets/static/media-drop-zone-tabs.json';
import DocumentsCarousel from '../../components/documents-carousel/documents-carousel';
import { sprintf } from '../../utils';
import EditListingMedia from '../../components/listing/edit-listing-media';
import { modal } from 'react-redux-modal';
import Loader from '../../components/common/page-loader/loader';
import AddMediaTag from '../../components/listing/add-media-tag';
import AddLinksTab from '../../components/listing/additional-links-tab';
import Slider from 'react-slick';
import SlickArrow from '../../components/common/slick-arrows/slick-arrow-next';
import { getImagePath } from '../../utils/propertyUtil';
import { REQUEST_SAVE_PROPERTY_IMAGES, REQUEST_DELETE_PROPERTY_IMAGES, REQUEST_UPLOAD_PROPERTY_IMAGES, REQUEST_ADD_DEFAULT_PROPERTY_IMAGES, REQUEST_EDIT_PROPERTY_IMAGES, REQUEST_SAVE_PROPERTY_ADDITIONAL_LINKS } from '../../redux/actions/documents';

const UPLOADEDBYPOST = 'POSTONLINE',
	MAX_SIZE_BYTES = (1048576 * 10),
	MAX_SIZE_MB = `${(1*10)}MB`,
	LONGER_FILE_UPLOAD_SIZE = 0.9,
	BROWSER = 'browser',
	SERVER = 'server',
	BASE_SIZE = (1048576 * 3), // 3 mb base size
	BASE_QUALITY = 60, // base quality
	MAX_WIDTH = 1000, // base quality
	PHOTOSTAB = 'PROPERTY',
	VIDEOTAB = 'VIDEO_LINK',
	EXTERNALLINKTAB = 'EXTERNAL_LINK',
	MAX_DOC_COUNT = 10,
	DOCUMENTTAB = 'DOCUMENT',
	FLOORPLANTAB = 'FLOOR_PLAN',
	UPLOAD_MODE = 'upload',
	EDIT_MODE = 'edit';


const FILE_TYPE_ICONS = {
	'pdf': 'pdf-icon.png',
	'docx': 'doc-icon.png',
	'xlsx': 'xlsx-icon.png',
	'zip': 'zip-icon.png',
	'ppt': 'ppt-icon.png',
	'xls': 'xlsx-icon.png',
	'doc': 'doc-icon.png',
	'pptx': 'ppt-icon.png'
};

const ACCEPTED_IMG_TYPES = ['.jpg','.jpeg','.png','image/jpeg','image/png'];
const ACCEPTED_DOC_TYPES = ['.jpg','.jpeg','.png','.pdf','.xls','.xlsx','.docx','.doc','.ppt','.pptx'];

const THUMBS_SETTINGS = {
	wrapperClassName : "slick-thumb-container",
	slidesPerRow: 3,
	rows: 3,
	slidesToShow: 1,
	infinite: false,
	nextArrow: <SlickArrow type="next" />,
	prevArrow: <SlickArrow type="prev" />,
};
const MAIN_SLIDER_SETTINGS = {
	wrapperClassName : "carousel-slider",
	dots: true,
	infinite: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	accessibility: true,
	nextArrow: <SlickArrow type="next" />,
	prevArrow: <SlickArrow type="prev" />
};


class MediaDropZone extends Component {

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object,
		awsImagePath: PropTypes.string,
		assetsPath: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
		this.onDropNotifier = this.onDropNotifier.bind(this);
		this.onImageRemove = this.onImageRemove.bind(this);
		this.onFinishEdit = this.onFinishEdit.bind(this);
		this.onSaveFileTag = this.onSaveFileTag.bind(this);
		this.saveAdditionalLink = this.saveAdditionalLink.bind(this);
		this.removeAdditionalLink = this.removeAdditionalLink.bind(this);
		// this.onSetDefaultClick = this.onSetDefaultClick.bind(this);
		this.state = {
			files: [],
			rejectedFiles: [],
			extraFiles:[],
			listingData : cloneDeep(props.listingMedia),
			uploadedLength:0,
			isUploading : false,
			currentTab: props.listingMedia.mediaMenu[props.currentTabIndex],
			highlightUploadBtn: false,
			defaultImage : undefined,
			isOptimizing : false,
			uploadedBy : undefined,
			defaultFileIndex : 0,
			currentActionMode : '',
			isFetching : false
		};
	}

	componentWillReceiveProps(props) {
		const { mediaServerData,saveResponse } = props;
		const { listingData, currentTab, uploadedBy, currentActionMode } = this.state;

		if(mediaServerData && !saveResponse.saveddata && mediaServerData.mediadata && currentActionMode === UPLOAD_MODE) {
			this.setState({
				uploadedLength : mediaServerData.mediadata.length,
				uploadedFiles : mediaServerData.uploadedFiles,
				isUploading : true
			},()=> {
				if(this.state.files.length === mediaServerData.mediadata.length && !this.requestedSaveImages) {
					this.requestedSaveImages = true;
					this.props.dispatch(REQUEST_SAVE_PROPERTY_IMAGES(props.params,currentTab));
				}
			});

			return;

		}

		if(saveResponse && saveResponse.saveddata && currentActionMode === UPLOAD_MODE) {
			if(uploadedBy === UPLOADEDBYPOST ) {
				this.context.router.push({
					pathname : this.state.listingData.listingurl
				});
			} else {
				setTimeout(()=> {
					this.setState({
						isUploading : false,
						files: [],
						uploadedLength:0,
						uploadedFiles:[],
						listingData : getTabImages(listingData, mediaServerData.mediadata, currentTab)
					});
				}, 600);
			}
			return;
		}

		if(currentActionMode === EDIT_MODE) {
			if(props.listingMedia.isFetching){
				this.setState({
					isFetching : true
				});
			} else if(!props.listingMedia.isFetching) {
				this.setState({
					listingData : props.listingMedia,
					isFetching : false
				});
			}
		}
	}

	onDrop(acceptedFiles, rejectedFiles) {
		const files = this.state.files.concat(acceptedFiles);
		// check if more than MAX_DOC_COUNT files
		if( files.length > MAX_DOC_COUNT ) {
			const minArrFiles = files.splice(0,MAX_DOC_COUNT);
			this.setState({
				files: minArrFiles,
				openFile:false,
				extraFiles : files,
				isUploading : true,
				highlightUploadBtn: true,
				isOptimizing : false
			});
		} else {
			this.setState({
				files: files,
				rejectedFiles : rejectedFiles,
				openFile:false,
				isUploading : true,
				highlightUploadBtn: true,
				isOptimizing : false
			});
		}

	}

	onDropNotifier() {
		this.setState({
			isOptimizing : true,
			openFile : false
		});
	}

	onImageRemove(file, fromFiles, type, from, index) {
		if(from === BROWSER) {
			const foundIndex = _findIndex(fromFiles, file);
			// remove one atIndex
			fromFiles.splice(foundIndex, 1);
			this.setState({
				[type]: fromFiles
			});
		} else {
			const { listingData, currentTab } = this.state;
			const tab = currentTab.toLowerCase();
			listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY].splice(index,1);
			this.setState({
				listingData : listingData,
				defaultFileIndex : listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY].length === index ? index-1 : index
			});
			this.props.dispatch(REQUEST_DELETE_PROPERTY_IMAGES(this.props.params,file,currentTab));
		}

	}

	uploadImages() {
		const { listingData, files, uploadedFiles, currentTab, defaultImage } = this.state;
		uploadedFiles && uploadedFiles.map((file)=>{
			const foundIndex = _findIndex(files,file);
			if(foundIndex > -1 ) {
				files.splice(foundIndex,1);
			}
		});

		this.setState({
			uploadedLength:0,
			highlightUploadBtn: false,
			currentActionMode : UPLOAD_MODE,
			defaultFileIndex : 0
		});

		files.length > 0 &&
		this.props.dispatch(REQUEST_UPLOAD_PROPERTY_IMAGES(
			files,
			listingData.propertyId,
			currentTab,
			defaultImage
		));
		this.requestedSaveImages = false;
	}

	onSelectFileClick() {
		this.setState({
			openFile : true
		});
	}

	renderCarouselItems(items) {
		const { l } = this.context.i18n;
		const { awsImagePath } = this.context;
		return items.map((file,index)=>{
			const defaultOne = file.primary || false;
			return (
				<div key={index} className="carousel-item-wrap">
					{file.tag && <div className="media-tag">
						{file.tag}
					</div>}
					<img alt="image" src={getImagePath(awsImagePath,file.uri)} />
					<div className="item-actions">
						{
							defaultOne ?
								<button className="item-actions__item current-defualt">{l('CURRENTDEFAULT')}</button>
								: <button className="item-actions__item" onClick={()=>this.onSetDefaultClick(file, SERVER, index)}>{l('SETASDEFAULT')}</button>
						}
						<button className="item-actions__item" onClick={()=>{
							this.onImageEdit(`${awsImagePath}/${file.uri}`,'', 'files',SERVER,index);
						}}>{l('EDIT')}</button>

						<button className="item-actions__item" onClick={()=>{
							this.onImageRemove(file, '', 'files', SERVER, index);
						}}>{l('DELETE')}</button>
					</div>
				</div>
			);
		});
	}

	renderCarousel(items) {
		const { defaultFileIndex } = this.state;
		const { awsImagePath } = this.context;
		const settings = {
			...MAIN_SLIDER_SETTINGS,
			initialSlide: defaultFileIndex < 0 ? 0 : defaultFileIndex,
			beforeChange: (oldIndex,newIndex) => {
				this.photoThumbSlider.slickGoTo(Math.floor((newIndex)/(9)),true);
			},
			appendDots : (dots) => {
				return (
					<Slider ref={slider => this.photoThumbSlider = slider} {...THUMBS_SETTINGS}>
						{dots}
					</Slider>
				)
			},
			customPaging : (i) => {
				return (
					<div className="thumb-wrap">
						<img src={getImagePath(awsImagePath,items[i].uri)}/>
					</div>
				)
			}
		};
		return (
			<Slider {...settings}>
				{this.renderCarouselItems(items)}
			</Slider>
		);
	}


	onBackClick() {
		this.context.router.push({
			pathname : `/profile/additional/property-listing/${this.props.params.id}`
		});
	}

	onSetDefaultClick(file, from, index ) {
		if(from === BROWSER) {
			this.setState({
				defaultImage : file,
				defaultFileIndex : index
			});
		} else {
			const { listingData, currentTab } = this.state;
			const tab = currentTab.toLowerCase();
			const currentDefaultIndex = _findIndex(listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY], { 'primary' :  true});
			if( currentDefaultIndex > -1 ) {
				listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY][currentDefaultIndex]= Object.assign(listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY][currentDefaultIndex],{ 'primary' : false});
			}
			listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY][index] = Object.assign(listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY][index],{ 'primary' : true});
			this.setState({
				listingData : listingData,
				defaultFileIndex : index
			});
			this.props.dispatch(REQUEST_ADD_DEFAULT_PROPERTY_IMAGES({...this.props.params},{key: file.uri}));
		}
	}

	onNextClick() {
		const { files, isUploading } = this.state;
		const { l } = this.context.i18n;

		if(isUploading && files.length > 0) {
			this.setState({
				uploadedBy : UPLOADEDBYPOST
			});
			this.uploadImages();
		} else {
			this.context.router.push({
				pathname : this.state.listingData.listingurl
			});
		}


		/* modal.add(ConfirmListing, {
			title: l('POSTONLINE'),
			size: 'custom', // large, medium or small,
			key:'confirmlist',
			step: 2,
			dispatch : this.props.dispatch,
			pathname : this.props.location.pathname,
			listingid: this.state.listingData.listingid || '',
			listingstatus: this.state.listingData.listingstatus || '',
			listingurl: this.state.listingData.listingurl || '',
			username : this.state.listingData.username || '',
			closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideTitleBar: false,// (optional) Switch to true if do not want the default title bar and close button,
			hideCloseButton: true // (optional) if you don't wanna show the top right close button
		});*/
	}

	renderFilePreviewImage(file,tab) {
		const fileName = file.name;
		const { assetsPath } = this.context;
		let fileExt = fileName ? fileName.split('.').pop() : file.type;
		fileExt = ( fileExt || '' ).toLowerCase();
		let previewImg;
		if(tab === PHOTOSTAB) {
			previewImg = <img alt="image" src={file.preview} />;
		} else {
			if(ACCEPTED_IMG_TYPES.indexOf(`.${fileExt}`) >= 0) {
				previewImg = <img alt="image" src={file.preview} />;
			} else {
				previewImg = <img className="doc-icon" alt="image" src={`${assetsPath}/images/file-icons/${FILE_TYPE_ICONS[fileExt]}`} />;
			}
		}
		return previewImg;
	}

	onImageEdit(file, fromFiles, type, from, index) {
		const { l } = this.context.i18n;
		let fileObject = undefined;
		if(from === BROWSER) {
			 fileObject = new File([file],'previewimage',{type : file.type});
		} else {
			fileObject = `${file}?key=${Math.random()}`;
		}

		modal.add(EditListingMedia,{
			title : l('EDIT'),
			size : 'profile-pic-modal',
			listingMediaPreview : true,
			previewFile : fileObject,
			fileIndex : index,
			from : from,
			onFinishEdit : this.onFinishEdit
		});
	}

	onFinishEdit(file, index, from) {
		const { files, listingData } = this.state;
		if(from === SERVER) {
			const { currentTab } = this.state;
			const tab = currentTab.toLowerCase();
			this.setState({
				currentActionMode : EDIT_MODE,
				defaultFileIndex : index
			}, ()=>{
				this.props.dispatch(REQUEST_EDIT_PROPERTY_IMAGES(
					listingData.listingid,
					{ file : file, oldFilePath : listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY][index].uri, directory : listingData.propertyId},
					currentTab,
					listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY][index].defaultImage
				));

				modal.clear();
			});

			return;
		}

		let editedFiles = files.slice(0);
		editedFiles[index] = file;
		this.setState({
			files : editedFiles
		});
		modal.clear();
	}

	onSaveFileTag(index,tag,tab) {
		const { files } = this.state;
		let modFiles = files.slice(0);
		switch(tab) {
			case DOCUMENTTAB:
			case FLOORPLANTAB:
				const fileName = modFiles[index].name;
				const ext = fileName && fileName.split('.').pop();
				if(tag) {
					modFiles[index].title = `${tag.replace(' ','-')}.${ext}`;
				}
				break;
			case PHOTOSTAB:
				modFiles[index].tag = tag;
				break;
		}
		this.setState({
			files: modFiles
		});
	}

	renderAcceptedFiles(tab) {
		const { l } = this.context.i18n;
		const { files, openFile, extraFiles, uploadedLength, isUploading, listingData, currentTab, rejectedFiles, defaultImage } = this.state;
		const { mediaServerData } = this.props;
		const disable = mediaServerData && mediaServerData.isFetching ? 'disabled' : '';
		const tags = listingData.propertyTags || [];
		const acceptedFiles = files.map((file,index) => {
			const classFlip = index < uploadedLength && isUploading ? 'flipped' : '';
			const defaultOne = defaultImage === file;
			return (
				<div className="item-wrap">
					{tab !== PHOTOSTAB &&
						<div className="doc-name" title={file.title || file.name}>
							{file.title || file.name}
						</div>
					}
				<div className={Cx('drop-zone-wrapper__images-actual__item',classFlip)}>
					<div className="face">
						<div className="add-tag-wrap">
							{tab === PHOTOSTAB && file.tag &&
							<div className="doc-name" title={file.tag}>
								{file.tag}
							</div>
							}
							<AddMediaTag
								tags={tab === PHOTOSTAB ? tags : []}
								btnText={mediaTabsConfig[tab].ADD_TAG_BTN_TEXT}
								inputPlaceholder={mediaTabsConfig[tab].INPUT_PLACEHOLDER}
								fileIndex={index}
								tab={tab}
								mode={tab === PHOTOSTAB && file.tag ? 'edit' : 'add'}
								selectedTag={file.tag}
								onSaveTag={this.onSaveFileTag}/>
							<button className="btn-default right remove-action"><i className="pe-7s-close" onClick={(evt)=>{
								evt.preventDefault();
								this.onImageRemove(file,files, 'files',BROWSER);
							}} /></button>
						</div>
						<div className="preview-img-wrap">
							{this.renderFilePreviewImage(file,tab)}
						</div>
						<div className="item-actions">
							{(tab === PHOTOSTAB) &&
							(defaultOne ?
									<span>{l('CURRENTDEFAULT')}</span>
									: <Button btnClassName="btn-default" onClick={(evt)=> {
								evt.preventDefault();
								this.onSetDefaultClick(file, BROWSER);
							}}>{l('SETASDEFAULT')}</Button>)
							}
							{ tab === PHOTOSTAB && <Button btnClassName="btn-default edit-action" onClick={(evt)=>{
								evt.preventDefault();
								this.onImageEdit(file,files, 'files',BROWSER,index);
							}}>{l('EDIT')}</Button>}
						</div>
					</div>
					<div className="face back">
						<div className="back-center">
							<i className="pe-7s-check" />
							<div>{l('UPLOADSUCCESS')}</div>
						</div>
					</div>
					{ uploadedLength === index && disable === 'disabled' && <div className="progress-cover">
						<LoadingBar
							style={{ backgroundColor: '#f7f9fa', height: '10px'}}
							updateTime={300}
							progressIncrease={5}
							maxProgress={80}
						/>
					</div>}
				</div>
					</div>
			);
		});
		return acceptedFiles;
	}

	renderRejectedFiles(tab) {
		const { rejectedFiles } = this.state;
		const rejected = rejectedFiles.map((file) => {
			return (
				<div className="item-wrap">
					{tab !== PHOTOSTAB &&
					<div className="doc-name">
						{file.name}
					</div>
					}
				<div className={Cx('drop-zone-wrapper__images-actual__item')}>

					<div className="face">
						<div className="preview-img-wrap">
							{this.renderFilePreviewImage(file,tab)}
						</div>
						<div className="attention">
							<i className="pe-7s-attention" />
							<span className="attention__msg">
								{`can't upload , file size (${this.bytesToSize(file.size)}) exceeds default size allowed`}
							</span>
						</div>
						<div className="item-actions">
							<span className="right"><i className="pe-7s-close" onClick={()=>{
								this.onImageRemove(file,rejectedFiles, 'rejectedFiles', BROWSER);
							}} /></span>
						</div>
					</div>
				</div>
				</div>
			);
		});
		return rejected;
	}

	renderPhotosTab() {
		const {  i18n: {l}, assetsPath } = this.context;
		const { files, openFile, isUploading, listingData, currentTab, rejectedFiles, highlightUploadBtn, isOptimizing } = this.state;
		const tab = currentTab.toLowerCase();
		const { mediaServerData } = this.props;
		const disable = mediaServerData && mediaServerData.isFetching ? 'disabled' : '';
		return (
			<Dropzone className="drop-mode media-drop-zone"
					  onDrop={this.onDrop}
					  onDropNotifier = {this.onDropNotifier}
					  isResSizeImage={true}
					  isCompressImage={true}
					  openFile={openFile}
					  maxSize={MAX_SIZE_BYTES}
					  multiple={true}
					  quality = {BASE_QUALITY}
					  maxWidth={MAX_WIDTH}
					  disableClick={true}
					  key="photostab"
					  accept={ACCEPTED_IMG_TYPES.join(',')}
			>
				<div style={{top: '4%',position: 'relative',textAlign : 'center'}}>
					<div className="drop-zone-wrapper">
						<div className="note-size">{sprintf(l('DROPIMAGETITLE'),MAX_DOC_COUNT)}</div>
						<Button className="toolbar-group save-search" disabled={disable}
								onClick={()=>{
									this.onSelectFileClick();
								}}>
							<i className="pe-7s-file" />
							{l('SELECTFILESTOUPLOAD')}
						</Button>
						{ isOptimizing && <Button className="toolbar-group save-search" disabled="disabled" >
							<img src={`${assetsPath}/images/loader/button-loader.gif`} width="20" height="20" />
							{l('PROCESSINGIMAGES')}
							<i className="pe-7s-more" />
						</Button> }
						{ (!isOptimizing && isUploading && files.length > 0) && <Button className={`toolbar-group save-search drop-zone-wrapper__upload-btn ${highlightUploadBtn && 'drop-zone-wrapper__highlight-upload-btn'}`} disabled={disable}
																						 onClick={()=>{
																							 this.uploadImages();
																						 }}>
							{
								disable === 'disabled' ?
									<img src={`${assetsPath}/images/loader/button-loader.gif`} width="20" height="20" />
									: ''
							}
							<i className="pe-7s-cloud-upload" />
							{l('UPLOADNOW')}
						</Button> }
					</div>
					{ isUploading && (files.length > 0 || rejectedFiles.length > 0) ?
						<div className="drop-zone-wrapper__images-actual">
							<span className="slider-gallery-title">{l('PREVIEWSELECTEDIMAGES')}</span>
							<div className="drop-zone-wrapper__images-actual__items">
								{ files.length > 0 && this.renderAcceptedFiles(PHOTOSTAB)}
								{ rejectedFiles.length > 0 && this.renderRejectedFiles()}
							</div>
						</div> : null}

					{ (!isUploading || (!files.length && !rejectedFiles.length)) &&
					<div className="drop-zone-slider-gallery gallery-content-wrapper">
						{ listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY] && listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY].length > 0 ?
							<span className="slider-gallery-title">{l('PHOTOSGALLERY')}</span> :
							<span className="slider-gallery-title" style={{ textAlign : 'center'}}>{`${l('NOIMAGESUPLOADED')} ${l(mediaTabsConfig[tab.toUpperCase()].LABEL)}`}</span>
						}
						{ listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY] && listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY].length > 0 && this.renderCarousel(listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY])}
					</div>
					}
					{/* {extraFiles.length > 0 ? <div className="drop-zone-wrapper__images-extras">
					 <div style={{display: 'inline-block'}}>{extraFiles.map((file) => <img height={190} width={225} src={file.preview} /> )}</div>
					 </div> : null}*/}

				</div>
			</Dropzone>
		);
	}

	renderDocumentsTab() {
		const {  i18n: {l}, assetsPath } = this.context;
		const { files, openFile, isUploading, listingData, currentTab, rejectedFiles, highlightUploadBtn, isOptimizing } = this.state;
		const tab = currentTab.toLowerCase();
		const { mediaServerData } = this.props;
		const disable = mediaServerData && mediaServerData.isFetching ? 'disabled' : '';
		return (
			<Dropzone className="drop-mode media-drop-zone"
					  onDrop={this.onDrop}
					  onDropNotifier = {this.onDropNotifier}
					  openFile={openFile}
					  maxSize={MAX_SIZE_BYTES}
					  multiple={true}
					  quality = {BASE_QUALITY}
					  maxWidth={MAX_WIDTH}
					  disableClick={true}
					  isResSizeImage={false}
					  isCompressImage={false}
					  key="documentstab"
					  accept={ACCEPTED_DOC_TYPES.join(',')}
			>
				<div className="media-drop-zone__doc-zone" style={{top: '4%',position: 'relative',textAlign : 'center'}}>
					<div className="drop-zone-wrapper">
						<div className="note-size">{sprintf(l('DROPIMAGETITLE'),MAX_DOC_COUNT)}</div>
						<Button className="toolbar-group save-search" disabled={disable}
								onClick={()=>{
									this.onSelectFileClick();
								}}>
							<i className="pe-7s-file" />
							{l('SELECTFILESTOUPLOAD')}
						</Button>
						{ isOptimizing && <Button className="toolbar-group save-search" disabled="disabled" >
							<img src={`${assetsPath}/images/loader/button-loader.gif`} width="20" height="20" />
							{l('PROCESSINGIMAGES')}
							<i className="pe-7s-more" />
						</Button> }
						{ (!isOptimizing && isUploading && files.length > 0) && <Button className={`toolbar-group save-search drop-zone-wrapper__upload-btn ${highlightUploadBtn && 'drop-zone-wrapper__highlight-upload-btn'}`} disabled={disable}
																						 onClick={()=>{
																							 this.uploadImages();
																						 }}>
							{
								disable === 'disabled' ?
									<img src={`${assetsPath}/images/loader/button-loader.gif`} width="20" height="20" />
									: ''
							}
							<i className="pe-7s-cloud-upload" />
							{l('UPLOADNOW')}
						</Button> }
					</div>
					{ isUploading && (files.length > 0 || rejectedFiles.length > 0) ?
						<div className="drop-zone-wrapper__images-actual">
							<span className="slider-gallery-title">{l(mediaTabsConfig[tab.toUpperCase()].PREVIEW_LABEL)}</span>
							<div className="drop-zone-wrapper__images-actual__items">
								{ files.length > 0 && this.renderAcceptedFiles(tab.toLocaleUpperCase())}
								{ rejectedFiles.length > 0 && this.renderRejectedFiles()}
							</div>
						</div> : null}

					{ (!isUploading || (!files.length && !rejectedFiles.length)) &&
					<div className="drop-zone-slider-gallery gallery-content-wrapper">
						{ listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY] && listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY].length > 0 ?
							<span className="slider-gallery-title">{l(mediaTabsConfig[tab.toUpperCase()].GALLERY_TITLE)}</span> :
							<span className="slider-gallery-title" style={{ textAlign : 'center'}}>{`${l('NOIMAGESUPLOADED')} ${l(mediaTabsConfig[tab.toUpperCase()].LABEL)}`}</span>
						}
						{ listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY] && listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY].length > 0 &&
								<DocumentsCarousel 
									onFileRemove = {this.onImageRemove}
 		isDeleteRequired= {true} 
									documents = {listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY]} 
								/>
						}
					</div>
					}
					{/* {extraFiles.length > 0 ? <div className="drop-zone-wrapper__images-extras">
					 <div style={{display: 'inline-block'}}>{extraFiles.map((file) => <img height={190} width={225} src={file.preview} /> )}</div>
					 </div> : null}*/}

				</div>
			</Dropzone>
		);
	}

	renderAddLinkTabs(tab) {
		const { listingData } = this.state;
		return <AddLinksTab links={listingData[mediaTabsConfig[tab.toUpperCase()].DATA_KEY]}
							saveAdditionalLink={this.saveAdditionalLink}
							removeAdditionalLink={this.removeAdditionalLink}
							  tab={tab}
							  tabsConfig={mediaTabsConfig}/>
	}

	saveAdditionalLink(title,url,tab) {
		const { listingData } = this.state;
		this.setState({
			currentActionMode : EDIT_MODE
		},() => {
			this.props.dispatch(REQUEST_SAVE_PROPERTY_ADDITIONAL_LINKS({
				tab,
				dataPayload : [{
					mediaOption: mediaTabsConfig[tab].MEDIA_OPTION,
					title,
					uri: url
				}],
				paramsPayload : {
					id : listingData.listingid
				}
			}));
		});
	}

	removeAdditionalLink(index,uri,tab) {
		const { params } = this.props;
		const updateMediaStore = true;
		this.setState({
			currentActionMode : EDIT_MODE
		},() => {
			this.props.dispatch(REQUEST_DELETE_PROPERTY_IMAGES(params,{uri},tab,index,updateMediaStore));
		});
	}

	render() {
		const { l } = this.context.i18n;
		const { files, openFile, isUploading, listingData, currentTab, rejectedFiles, highlightUploadBtn, isOptimizing, isFetching } = this.state;
		const tab = currentTab.toLowerCase();
		const { mediaServerData } = this.props;
		const disable = mediaServerData && mediaServerData.isFetching ? 'disabled' : '';

		return (
			<div className="listing-media-drop-zone">
				{
					isFetching && !frameworkGlobals.isServer &&
					<Loader/>
				}
				{ currentTab === PHOTOSTAB && this.renderPhotosTab()}
				{ currentTab === DOCUMENTTAB && this.renderDocumentsTab()}
				{ currentTab === VIDEOTAB && this.renderAddLinkTabs(VIDEOTAB)}
				{ currentTab === EXTERNALLINKTAB && this.renderAddLinkTabs(EXTERNALLINKTAB)}
				{ currentTab === FLOORPLANTAB && this.renderDocumentsTab()}
				<div className="col-xs-12">
					<LinearNavigation
						nextText="POSTONLINE"
						backText="BACKTOADDITIONAL"
						className="linear-navigation--light-theme"
						isSaveExitRequired={false}
						onNext={this.onNextClick.bind(this)}
						onBack={this.onBackClick.bind(this)}
					/>
				</div>
			</div>
		);

	}

	bytesToSize(bytes) {
		return `${parseFloat((bytes / (1024*1024)).toFixed(1))} MB`;
	}

}


const mapStateToProps = ({documents}) => {
	const { media_server_data, save_response_data } = documents;
	return {
		'mediaServerData' : media_server_data,
		'saveResponse' : save_response_data
	};
};

export default connect(mapStateToProps)(MediaDropZone);


