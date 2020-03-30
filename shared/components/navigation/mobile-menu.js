import React, {Component } from 'react';
import PropTypes from 'prop-types';


/**
 * User
 * Description: Mobile Menu container.
 */

class MobileMenu extends Component {

	static propTypes = {};

	static contextTypes = {
		router : PropTypes.object,
		i18n: PropTypes.object,
		width : PropTypes.number
	};

	render() {
		// const Menu = BurgerMenu.slide;

		const { width } = this.context;
		const { l, getLocale } = this.context.i18n;
		return (
			<div className="mobile-menu">

					<a id="home" className="menu-item" href="/">{`${l('HOME')}`}</a>
					<a id="login" className="menu-item" href="/login">{`${l('LOGIN')}`}</a>
					<a id="search" className="menu-item" href="/search">{`${l('SEARCH')}`}</a>
					<a id="contact" className="menu-item" href="/contact-us">{`${l('CONTACTUS')}`}</a>

			</div>

		);
	}
}

export default (MobileMenu);
