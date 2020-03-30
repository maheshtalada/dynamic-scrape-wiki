import { resizeImage } from '../components/common/drop-zone/getDataTransferItems';
import DocumentsService from 'services/documents';

const uploadOptions = {
	quality : 60,
	maxWidth : 600,
	isCompress : true
};
const UploadImageToS3 = async(file, options) => {
	options = Object.assign(uploadOptions,options);

	const res = await resizeImage({
		file: file,
		quality: options.quality,
		maxWidth : options.maxWidth,
		isCompress : options.isCompress
	});

	const data = new FormData();
	data.append('file', res);
	data.append('directory', options.directory);
	data.append('thumbnail', options.thumbnail);
	data.append('userid', options.userid);

	const uploadConfig = {
		endpoint : 'mediaupload',
		method : 'post',
		dataPayload : data
	};

	try {
		const response = await DocumentsService.fetchData(uploadConfig);
		return Promise.resolve(response);
	} catch(error) {
		return Promise.reject(error);
	}
};

export default UploadImageToS3;
