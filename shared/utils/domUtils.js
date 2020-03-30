export function getClosestNode(elem,selector) {
	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;
}

export function simulateClick(ele, conditionalEle = false) {
	const htmlEle = document.querySelector(ele);
	if(conditionalEle) {
		const conditionalHtmlEle = 	document.querySelector(conditionalEle)
		htmlEle && conditionalHtmlEle && htmlEle.click();
		return;
	}

	if(htmlEle) {
		htmlEle.click();
	}
}

export function updateMobileFoter(display) {
	const htmlEle = document.querySelector('.mobile-footer-options');
	if(htmlEle) {
		htmlEle.style.display = display;
	}
}

