
function getDataTransferFiles(event, isMultipleAllowed = true) {
	let dataTransferItemsList = [];
	if (event.dataTransfer) {
		const dt = event.dataTransfer;
		if (dt.files && dt.files.length) {
			dataTransferItemsList = dt.files;
		} else if (dt.items && dt.items.length) {
      // During the drag even the dataTransfer.files is null
      // but Chrome implements some drag store, which is accesible via dataTransfer.items
			dataTransferItemsList = dt.items;
		}
	} else if (event.target && event.target.files) {
		dataTransferItemsList = event.target.files;
	}

	if (dataTransferItemsList.length > 0) {
		dataTransferItemsList = isMultipleAllowed ? dataTransferItemsList : [dataTransferItemsList[0]];
	}

  // Convert from DataTransferItemsList to the native Array
	return Array.prototype.slice.call(dataTransferItemsList);
}

function dataURItoBlob(dataURI) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	var byteString = atob(dataURI.split(',')[1]);
	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var dw = new DataView(ab);
	for(var i = 0; i < byteString.length; i++) {
		dw.setUint8(i, byteString.charCodeAt(i));
	}
	// write the ArrayBuffer to a blob, and you're done
	return new Blob([ab], {type: mimeString});
}

function resizeImage(settings) {
	if(!settings.isCompress){
		return settings.file
	}
	const file = settings.file;
	const quality = settings.quality;
	const reader = new FileReader();
	const image = new Image();
	let canvas = document.createElement('canvas');

	const resize = function(resizeWidth) {
		const width = image.width;
		const height = image.height;
		const convasX = canvas.getContext('2d');
		if(width > resizeWidth) {
			canvas.width = width;
			canvas.height = height;
			convasX.drawImage(image, 0, 0);
			while (canvas.width * 0.5 > resizeWidth) {
				canvas.width *= 0.5;
				canvas.height *= 0.5;
				convasX.drawImage(canvas, 0, 0, canvas.width, canvas.height);
			}
			canvas.width = resizeWidth;
			canvas.height = canvas.width * image.height / image.width;
			convasX.drawImage(image, 0, 0, canvas.width, canvas.height);
		} else {
			canvas.width = width;
			canvas.height = height;
			convasX.drawImage(image, 0, 0, canvas.width, canvas.height);
		}
		const dataUrl = canvas.toDataURL(settings.file.type, quality/100);
		return dataURItoBlob(dataUrl);
	};
	return new Promise(function(ok, no) {
		if (!file.type.match(/image.*/)) {
			no(new Error('Not an image'));
			return;
		}
		reader.onload = function(readerEvent) {
			image.onload = function() {
				return ok(resize(settings.maxWidth));
			};
			image.src = readerEvent.target.result;
		};
		reader.readAsDataURL(file);
	});
}

module.exports = {
	getDataTransferFiles,
	resizeImage,
	dataURItoBlob
};
