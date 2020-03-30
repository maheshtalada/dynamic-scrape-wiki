export function loadScript (options, callback) {
	const existingScript = document.getElementById(options.id);

	if (!existingScript) {
		const script = document.createElement('script');
		script.nonce = options.nonce;
		script.src = options.src;
		script.id = options.id;
		document.body.appendChild(script);

		script.onload = () => {
			if (callback) callback();
		};
	}

	if (existingScript && callback) callback();
}

export async function getJSON(url) {
	return new Promise( (resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'json';

		xhr.onload = function() {
			const { status, response = undefined } = xhr;
			if (status == 200) {
				return resolve(response)
			}
		};

		xhr.onerror = function () {
			return reject("Something Went Wrong, try again")
		};

		xhr.send();
	});
}




