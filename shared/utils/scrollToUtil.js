import moment from 'moment';

// Returns document.documentElement for Chrome and Safari
// document.body for rest of the world
function checkBody() {
	document.documentElement.scrollTop += 1;
	const body = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
	document.documentElement.scrollTop -= 1;
	return body;
}

function getDesitination(element) {
	// Height checks to prevent requestAnimationFrame from infinitely looping
	// If the function tries to scroll below the visible document area
	// it should only scroll to the bottom of the document
	const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
	const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
	return documentHeight - element.offsetTop < windowHeight ? documentHeight - windowHeight : element.offsetTop;
}

function scrollIt(element, duration = 200, easing = 'linear',  callback) {
	// define timing functions
	const easings = {
		linear(t) {
			return t;
		},
		easeInQuad(t) {
			return t * t;
		},
		easeOutQuad(t) {
			return t * (2 - t);
		},
		easeInOutQuad(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		easeInCubic(t) {
			return t * t * t;
		},
		easeOutCubic(t) {
			return (--t) * t * t + 1;
		},
		easeInOutCubic(t) {
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		},
		easeInQuart(t) {
			return t * t * t * t;
		},
		easeOutQuart(t) {
			return 1 - (--t) * t * t * t;
		},
		easeInOutQuart(t) {
			return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
		},
		easeInQuint(t) {
			return t * t * t * t * t;
		},
		easeOutQuint(t) {
			return 1 + (--t) * t * t * t * t;
		},
		easeInOutQuint(t) {
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
		}
	};

	const body = checkBody();
	const start = body.scrollTop - 115;
	const startTime = moment();
	const destination = getDesitination(element);

	function scroll() {
		const now = moment();
		const time = Math.min(1, ((now - startTime) / duration));
		const timeFunction = easings[easing](time);
		body.scrollTop = (timeFunction * (destination - start)) + start;
		if (Math.ceil(body.scrollTop) === destination) {
			typeof callback === 'function' && callback();
			return;
		}
		requestAnimationFrame(scroll);
	}
	scroll();
}

export default function scrollToElement(isAnimate = true, elem, duration, easing, callback) {
	// options = options || {};
	elem = typeof isAnimate  === 'string' && isAnimate || elem;
	if (typeof elem === 'string') {
		elem = document.querySelector(elem);
	}

	if(typeof isAnimate !== 'string' && !isAnimate) {
		const destination = getDesitination(elem);
		const body = checkBody();
		body.scrollTop = destination;
		typeof callback === 'function' && callback();
		return;
	}
	scrollIt(elem, duration, easing, callback);
};
