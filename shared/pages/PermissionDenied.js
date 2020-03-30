import React , { Component } from 'react';
import { assetsPath } from '../config';
import PropTypes from 'prop-types';


export default class PermissionDenied extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { l } = this.context.i18n;
		return (
			<div className="error-page">
				<div className="error-page__page-content">
					<div className="error-page__page-content__image-wrap col-xs-12 col-md-5 col-lg-5">
						<img src={`${assetsPath}/images/errorPage/server-error.svg`} className="error-page__page-content__image"/>
					</div>
					<div className="error-page__page-content__text-wrap col-xs-12 col-md-7 col-lg-7">
						<h1 className="error-page__page-content__title">{l("Seems like something's broken!")}</h1>
						<h2 className="error-page__page-content__description">{l('Check back soon')}</h2>
					</div>
				</div>
			</div>
		);

	}
}

