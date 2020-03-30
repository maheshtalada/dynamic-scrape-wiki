import React, {Component } from 'react';
import PropTypes from 'prop-types';
import TogglePanel from '../toogle-panel/toggle-panel';
import TableItems from '../tabel-items/tabel-items';
import { other_services } from '../../assets/static/quick-search-options.json';

/**
 * User
 * Description: Mobile Menu container.
 */
class OtherMenuService extends Component {

	static propTypes = {};

	static defaultProps = {
		className: 'logo-container'
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		width : PropTypes.number
	};

	constructor(props) {
		super(props);
		this.handleServicesClick = this.handleServicesClick.bind(this);
		this.state = {
			hamburger : 'close',
			languageDD : 'close',
			profile : 'close',
			signup : 'close'
		};
	}

	componentWillReceiveProps(props) {
		if(props) {
			if(props.user.isLogIn) {
				setTimeout(() => {
					modal.clear();
					this.state.redirectlogin === CREATE_LIST && this.gotoListing();
				},200);
			}

		}
	}

	gotoListing() {
		this.setState({ redirectlogin : ''});
		this.context.router.push({
			pathname : '/profile/location/property-listing'
		});

	}

	onHMClick(stateParam) {
		console.log(stateParam);
		// evt.preventDefault();
		if(this.state[stateParam] === 'close') {
			this.setState({
				[stateParam]: 'open'
			});
		} else {
			this.setState({
				[stateParam]: 'close'
			});
		}
	}

	handleSelectLanguage(newLocale,locale) {

		if(newLocale === locale) {
			this.setState({
				languageDD: 'close'
			});
			return;
		}
		document.cookie = cookie.serialize('locale', newLocale, { path: '/', maxAge: 900000 });
		// track analytics
		// sendEvent('language', 'change', newLocale);
		window.location.reload();
	}

	logout() {
		this.props.dispatch(LOGOUT());
	}

	resetUserState() {
		this.props.dispatch(RESET_STATE());
	}

	addModal(mode) {
		let title = mode && mode.replace(/\s/g, '').toUpperCase();
		const { l } = this.context.i18n;
		modal.add(Login, {
			title: l(title),
			size: 'custom login-modal',
			dispatch:this.props.dispatch,
			hideTitleBar: false,
			hideCloseButton: false,
			changeMode: this.addModal,
			initial : true,
			screenSize : this.props.screenSize,
			mode
		});
	}

	getFilteredMenuLinks(device,query) {
		const key = Object.keys(query)[0];
		const filteredLinks = _filter(menu[device], (link)=> {
			return link[key] === query[key] && link;
		});
		return filteredLinks;
	}

	renderLanguageSwitcher() {
		const { languageDD } = this.state;
		const { getLocale } = this.context.i18n;
		const localeObj = _find(getSupportedLocales(),getLocale());
		return (
			<li className={languageDD === 'open' && 'active'}>
				<button className="dropdown-toggle cursor" href="#" data-toggle="dropdown" onClick={this.onHMClick.bind(this,'languageDD')}>
					<i className="pe-7s-global"/>
					<span className="js-language-switch">{localeObj[Object.keys(localeObj)[0]]}</span>
					<i className="pe-7s-angle-down" />
				</button>
				{ languageDD === 'open' && <TogglePanel
					collapse={this.onHMClick}
					childStateParam="languageDD"
					ignoreClass="js-language-switch">
					<LanguageSwitch
						languages={getSupportedLocales()}
						selectedLanguage={getLocale()}
						onSelectLanguage={this.handleSelectLanguage.bind(this)}
						canMenuOpen={languageDD === 'open'}
					/>
				</TogglePanel> }
			</li>
		);
	}

	renderMobileBurger() {
		const { user} = this.props;
		const { l, getLocale } = this.context.i18n;
		const { profile } = this.state;

		let tabelItems = null;
		if( user.isLogIn ) {
			tabelItems = <TableItems tableData={this.getFilteredMenuLinks('mobile',{'loggedin':true})} noColumns={1} handleClick={this.handleProfileMenuClick}>
				<span className="user-profile"><span className="profile">{l('WELCOME')} {user.name}</span></span>
			</TableItems>;
		} else {
			tabelItems = <TableItems tableData={this.getFilteredMenuLinks('mobile',{'loggedin':false})} noColumns={1} handleClick={this.handleProfileMenuClick} />;
		}

		return (
			<li className={profile === 'open' && 'active'}>
				<button className="cursor js-profile-switch" onClick={this.onHMClick.bind(this,'profile')}><i className="pe-7s-menu" /></button>
				{ profile === 'open' && <TogglePanel
					classes="profile-menu-mobile-items"
					collapse={this.onHMClick}
					childStateParam="profile"
					ignoreClass="pe-7s-menu">
					{tabelItems}
				</TogglePanel> }
			</li>
		);

	}

	renderDesktopMenu() {
		const { user } = this.props;
		const { profile, signup } = this.state;
		const { l, getLocale } = this.context.i18n;
		// const localeObj = _find(getSupportedLocales(),getLocale());

		return (
			<ul className="header__nav-bar__items desktop">
				{this.renderLanguageSwitcher()}

				{

					<li><button className="cursor" onClick={() => {
						user.isLogIn ? this.gotoListing() : this.addModal(l('Log In')); this.setState({ redirectlogin : CREATE_LIST});
					}}><i className="pe-7s-ribbon" />
						<span>{l('CREATELISTING')}</span></button>
					</li>
				}
				{
					!user.isLogIn &&
					<li className={signup === 'open' && 'active'}><button className="cursor js-profile-switch" onClick={this.onHMClick.bind(this,'signup')}><span className="signup"><i className="pe-7s-user" />{l('SIGNUP')}</span></button>
						{ signup === 'open' && <TogglePanel
							classes="signup-menu-items"
							collapse={this.onHMClick}
							childStateParam="signup"
							ignoreClass="signup">
							<TableItems tableData={menu.desktop.signuplinks} noColumns={1} handleClick={this.handleSignupMenuClick}/>
						</TogglePanel> }
					</li>
				}

				{
					!user.isLogIn ?
						<li><button className="cursor" onClick={() => {
							this.resetUserState(); this.addModal(l('Log In'));
						}}><i className="pe-7s-unlock" /><span>{l('LOGIN')}</span></button></li>
						: <li className={profile === 'open' && 'active'}><button className="cursor js-profile-switch" onClick={this.onHMClick.bind(this,'profile')}><i className="pe-7s-user" /><span className="profile">{user.name}</span><i className="pe-7s-angle-down" /></button>
						{ profile === 'open' && <TogglePanel
							classes="profile-menu-items"
							collapse={this.onHMClick}
							childStateParam="profile"
							ignoreClass="profile">
							<TableItems tableData={menu.desktop.profilelinks} noColumns={2} handleClick={this.handleProfileMenuClick}/>
						</TogglePanel> }
					</li>
				}
			</ul>
		);
	}

	renderMobileMenu() {
		// const { user, screenSize } = this.props;
		// const { profile, languageDD } = this.state;
		const { getLocale } = this.context.i18n;
		// const localeObj = _find(getSupportedLocales(),getLocale());

		return (
			<ul className="header__nav-bar__items mobile">
				{this.renderLanguageSwitcher()}
				{this.renderMobileBurger()}
			</ul>
		);
	}

	render() {

		const { screenSize } = this.props;
		let menuItems = null;
		if( screenSize > 3 ) {
			menuItems = this.renderDesktopMenu();
		} else {
			menuItems = this.renderMobileMenu();
		}

		return (
			<div style={{'float' : 'right'}}>
				{menuItems}
			</div>
		);
	}

	/*
	 TODO: this logic needs to improved
	 */

	handleProfileMenuClick(link) {
		const { l, getLocale } = this.context.i18n;
		if(link && link.toLowerCase() === 'logout') {
			this.logout();
			this.setState({
				redirectlogin : '/'
			});
			this.context.router.push({
				pathname : '/'
			});
		}

		if(link && link.toLowerCase() === 'login') {
			this.resetUserState();
			this.addModal(l('Log In'));
		}

		if(link && link.toLowerCase() === 'signup') {
			this.resetUserState();
			this.addModal(l('Register'));
		}

		if(link && link.toLowerCase() === 'createlisting') {
			this.gotoListing();
		}


		this.setState({
			profile: 'close'
		});
	}

	handleSignupMenuClick(urlParam) {
		const {pathname, search} = this.props.location;
		/* this.setState({
		 redirectLogin : 'register',
		 redirectPath : `${pathname}${query}`
		 });
		 */
		console.log(`${pathname}${search}`);
		this.context.router.push({
			pathname : `/register/${urlParam}`
		});



	}
}

export default (DefaultMenu);
