import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SiteConfig from '../config';

const { assetsPath } = SiteConfig;

class NotFoundPage extends Component {
	static contextTypes = { i18n: PropTypes.object };

	render() {
		const { i18n } = this.context;

		return (
            <div className="NotFoundPage">

                <div className="page-content">
                    <h2 className="text"> {i18n.l('The page you are looking for cannot be found')} </h2>
                    <img src={`${assetsPath}/images/notFoundPage/404.png`} className="image" />
                </div>
            </div>
		);
	}
}

export default NotFoundPage;
