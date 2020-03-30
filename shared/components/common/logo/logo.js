import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Cx from 'classnames';
import appconstants from '../../../utils/app-constants';
import appconfig from '../../../config';
const { LOGO_IMAGE, SMALL } = appconstants;
const  { localeSettings,assetsPath } = appconfig;
/**
 * User
 * Description: Logo container.
 */
export default class Logo extends Component {

	static propTypes = {
		className: PropTypes.string,
		logo: PropTypes.string
	};

	static defaultProps = {
		className: 'logo-container',
		logo: ''
	};

	static contextTypes = {
		router : PropTypes.object,
		width : PropTypes.number,
		country : PropTypes.string,
		i18n : PropTypes.object
	};

	render() {
		const { className, logo, screenSize} = this.props;
		const { country, i18n : { l } } = this.context;
		return (
			<div className={Cx(className)}>
				<Link to={'/'} >
				<div className="logo flex flex-align-center" data-tag-category="Header Links" data-tag-action="click" data-tag-label="Logo">
				<img src={`${assetsPath}/images/logo/${localeSettings[country].siteLogo}?v=1`} alt="PropsHub"/>
					{/*screenSize > 1 ?
						<img src={`${assetsPath}/images/logo/${localeSettings[country].siteLogo}`} alt="PropsHub"/>
						:
						<img src={`${assetsPath}/images/logo.jpeg`} alt="PropsHub"/>
					*/}
					{/*<div className="logo-caption">
							{l("SITECAPTION")}
						</div>*/}
				</div>
				</Link>
			</div>
		);
	}
}
