import {whypropshub} from '../../assets/static/why-props-hub.json';
import React, { PureComponent } from 'react';

import SiteConfig from '../../config';
const { assetsPath } = SiteConfig;

export default class Advertisement extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return null
		/*const {adTitle, logo, l} = this.props;
		const captionIndex = frameworkGlobals.siteCaptionIndex;
		return (
			<div className="advertisment-wrapper">
				<p className="advertisment-wrapper__title">{adTitle ? adTitle : l(whypropshub.sitecaptions[captionIndex])}</p>
				<p className="advertisment-wrapper__info">{l('SITECAPTION')}</p>
			</div>
		);*/
	}
};
