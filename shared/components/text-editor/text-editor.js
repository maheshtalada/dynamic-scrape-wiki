import React , { Component } from 'react';
import PropTypes from 'prop-types';
import UploadImageToS3 from '../../lib/uploadFileToS3';
import { find as _find } from 'lodash';
import Spinner from '../common/spinner/spinner';
import SiteConfig from '../../config';
import loadable from '@loadable/component';
import Loader from 'components/common/page-loader/loader';
const ReactQuill = loadable(() => import(/* webpackChunkName: 'ReactQuill' */'react-quill'),{ LoadingComponent: Loader});

/*
 More toolbar options
 ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
 ['blockquote', 'code-block'],                    // blocks
 [{ 'header': 1 }, { 'header': 2 }],              // custom button values
 [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
 [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
 [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
 [{ 'direction': 'rtl' }],                        // text direction
 [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
 [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
 [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
 [{ 'font': [] }],                                // font family
 [{ 'align': [] }],                               // text align
 ['clean'],
 */

const { imageRootPath } = SiteConfig;
const ACCEPTED_IMG_TYPES = ['jpg','jpeg','png'];
export default class TextEditor extends Component {

	static propTypes = {
		placeholder :  PropTypes.string,
		onChange : PropTypes.func,
		imageServerPayload : PropTypes.object,
		value : PropTypes.string,
		editorOptions : PropTypes.array,
		editorFormats : PropTypes.array
	};

	static defaultProps = {
		placeholder :  'STARTTYPEHERE',
		onChange : ()=>{},
		imageServerPayload : undefined,
		value : '',
		editorOptions : [
			[{ 'header': [1, 2, false] }],
			['bold', 'italic', 'underline','strike', 'blockquote'],
			[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
			['link', 'image', 'video'],
			['clean']
		],
		editorFormats : [
			'header',
			'bold', 'italic', 'underline', 'strike', 'blockquote',
			'list', 'bullet', 'indent',
			'link', 'image', 'video'
		]
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			hasErrors: false,
			forceValidation: false,
			modifiedValues: {},
			initialValues: {},
			text: props.value
		};

		this.quillRef = undefined;

		this.modules = {
			toolbar: {
				container: props.editorOptions,
				handlers: {
					'image': this.imgHandler
				}
			}
		};

		this.formats = props.editorFormats;

		this.handleDrop = this.handleDrop.bind(this);
		this.handlePaste = this.handlePaste.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			text : props.value
		});
	}

	componentDidMount() {
		if(this.quillRef) {
			this.quillRef.getEditor().focus();
		}
	}

	renderQuill() {
		return (
			!frameworkGlobals.isServer ? <ReactQuill
				ref={(quill) => this.onEditorLoad(quill)}
				value={this.state.text}
				onChange={this.handleChange.bind(this)}
				theme="snow"
				modules={this.modules}
				formats={this.formats}
				placeholder={this.props.placeholder}
			/> : <Spinner/>
		);
	}

	render() {
		return (
			<div className="text-editor">
				{this.renderQuill()}
			</div>
		);

	}

	handleChange(value) {
		this.setState({ text: value });
		this.props.onChange && this.props.onChange(value);
	}

	onEditorLoad(quill) {
		this.quillRef = quill;
		let loaderContainer = document.createElement('div');
		loaderContainer.classList.add('ql-image-loader','hide');
		loaderContainer.innerHTML = '<span class="ql-image-loader__content">""</span>';
		if(this.quillRef) {
			const { container } = this.quillRef.getEditor();
			this.quillRef.getEditor().root.addEventListener('drop', this.handleDrop, false);
			this.quillRef.getEditor().root.addEventListener('paste', this.handlePaste, false);
			container.appendChild(loaderContainer);
			this.quillRef.getEditor().root.dataset.placeholder = this.props.placeholder;
		}
	}

	imgHandler = async(evt) => {
		const { container } = this.quillRef.getEditor();
		let fileInput = container.querySelector('input.ql-image[type=file]');
		let loaderContainer = container.querySelector('.ql-image-loader');
		const { l } = this.context.i18n;
		if (fileInput === null) {
			fileInput = document.createElement('input');
			fileInput.setAttribute('type', 'file');
			fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
			fileInput.setAttribute('style','display: none;');
			fileInput.classList.add('ql-image');
			// loaderContainer = document.createElement('div');
			// loaderContainer.classList.add('ql-image-loader');
			fileInput.addEventListener('change', async() => {
				// loaderContainer.innerHTML = `<span class="ql-image-loader__content">${l('UPDLOADING')}</span>`;
				if (fileInput.files != null && fileInput.files[0] != null) {
					try {
						loaderContainer && loaderContainer.classList.remove('hide');
						let response = await UploadImageToS3(fileInput.files[0],this.props.imageServerPayload);
						let range = this.quillRef.getEditor().getSelection();
						this.quillRef.getEditor().insertEmbed(range.index, 'image', `${imageRootPath}/${response.data.filepath}`, 'user');
						fileInput.value = '';
						container.removeChild(fileInput);
						loaderContainer && loaderContainer.classList.add('hide');
					} catch (e) {
						throw new Error('things went wrong while uploading', e);
					}
				}
			});
			container.appendChild(fileInput);
			if(loaderContainer) {
				loaderContainer.querySelector('.ql-image-loader__content').innerHTML = l('UPLOADING');
			}
		}
		fileInput.click();
	};

	/*handleUploadImage = async(file) => {
		let res = await resizeImage({
			file: file,
			quality: 70,
			maxWidth : 600
		});

		const {imageServerPayload, uploadAPIURL } = this.props;
		const data = new FormData();
		data.append('file', res);
		data.append('directory',imageServerPayload.directory);
		data.append('thumbnail',imageServerPayload.thumbnail);
		data.append('userid',imageServerPayload.userid);

		const config = {
			method : 'POST',
			url: uploadAPIURL,
			data : data
		};

		try {
			const response = await axios(config);
			return Promise.resolve(response);
		} catch(error) {
			return Promise.reject(error);
		}
	};*/

	/**
	 * Handler for drop event to read dropped files from evt.dataTransfer
	 * @param {Event} evt
	 */
	handleDrop = async(evt) => {
		evt.preventDefault();
		const { container } = this.quillRef.getEditor();
		const { l } = this.context.i18n;
		const file = evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files[0];
		const fileExt = file && file.name && file.name.split('.').pop();
		if(ACCEPTED_IMG_TYPES.indexOf(fileExt) < 0) {
			return;
		}
		let loaderContainer = container.querySelector('.ql-image-loader');
		if(loaderContainer) {
			loaderContainer.querySelector('.ql-image-loader__content').innerHTML = l('UPLOADING');
		}

		try {
			loaderContainer && loaderContainer.classList.remove('hide');
			let response = await UploadImageToS3(file, this.props.imageServerPayload);
			let cursorPosition = this.quillRef.getEditor().getLength()-1; // cursor position where the dropped imaged should go
			this.quillRef.getEditor().insertEmbed(cursorPosition, 'image', `${imageRootPath}/${response.data.filepath}`, 'user');
			loaderContainer && loaderContainer.classList.add('hide');
		} catch (e) {
			loaderContainer && loaderContainer.classList.add('hide');
			throw new Error('things went wrong while uploading', e);
		}
	};

	/**
	 * Handler for paste event to read pasted files from evt.clipboardData
	 * @param {Event} evt
	 */
	handlePaste = async(evt) => {
		const { container } = this.quillRef.getEditor();
		const { l } = this.context.i18n;
		let loaderContainer = container.querySelector('.ql-image-loader');
		if(loaderContainer) {
			loaderContainer.querySelector('.ql-image-loader__content').innerHTML = l('UPLOADING');
		}
		if (!evt.clipboardData || !evt.clipboardData.items || !evt.clipboardData.items.length) {
			return;
		}

		const clipboardItems = Array.from(evt.clipboardData.items);
		const fileItem = _find(clipboardItems,{ kind : 'file'});
		if (!fileItem) {
			return;
		}
		const file = fileItem.getAsFile();
		const fileExt = file && file.name && file.name.split('.').pop();
		if (ACCEPTED_IMG_TYPES.indexOf(fileExt) < 0) {
			return;
		}

		try {
			loaderContainer && loaderContainer.classList.remove('hide');
			let response = await UploadImageToS3(file, this.props.imageServerPayload);
			let range = this.quillRef.getEditor().getSelection();
			let endOfText = this.quillRef.getEditor().getLength()-1; // cursor position where the dropped imaged should go
			let cursorPosition = range ? range.index : endOfText;
			this.quillRef.getEditor().insertEmbed(cursorPosition, 'image', `${imageRootPath}/${response.data.filepath}`, 'user');
			loaderContainer && loaderContainer.classList.add('hide');
		} catch (e) {
			loaderContainer && loaderContainer.classList.add('hide');
			throw new Error('things went wrong while uploading', e);
		}

	};

	/**
	 * Insert the image into the document at the current cursor position
	 * @param {String} dataUrl  The base64-encoded image URI
	 */
	insert(dataUrl) {
		const index = (this.quillRef.getEditor().getSelection() || {}).index || this.quillRef.getEditor().getLength();
		this.quillRef.getEditor().insertEmbed(index, 'image', dataUrl, 'user');
	}

	/**
	 * Extract image URIs a list of files from evt.dataTransfer or evt.clipboardData
	 * @param {File[]} files  One or more File objects
	 * @param {Function} callback  A function to send each data URI to
	 */
	readFiles(files, callback) {
		// check each file for an image
		[].forEach.call(files, file => {
			if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
				// file is not an image
				// Note that some file formats such as psd start with image/* but are not readable
				return;
			}
			// callback(file.getAsFile())
			// set up file reader
			const reader = new FileReader();
			reader.onload = (evt) => {
				callback(evt.target.result);
			};
			// read the clipboard item or file
			const blob = file.getAsFile ? file.getAsFile() : file;
			if (blob instanceof Blob) {
				reader.readAsDataURL(blob);
			}
		});
	}



}
