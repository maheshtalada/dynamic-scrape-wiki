import React, {Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TogglePanel from '../toogle-panel/toggle-panel';
import TableItems from '../tabel-items/tabel-items';
import {modal} from 'react-redux-modal';
import { find as _find, filter as _filter } from 'lodash';
import ToggleSidebar from '../common/toggle-sidebar/toggle-sidebar';
import Logo from '../common/logo/logo';
import uniqueFormId from '../../utils/uniqueFormId';
import loadable from '@loadable/component';
import Spinner from '../common/spinner/spinner';
import { Link } from 'react-router';
import { pathToUrl } from 'utils/searchUtil';
import { updateMobileFoter } from 'utils/domUtils';
import ReactTooltip from 'react-tooltip';
import { REQUEST_USER_LOGOUT, REQUEST_RESET_STATE } from '../../redux/actions/user';
import { REQUEST_OPEN_SITE_FEEDBACK, REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL } from '../../redux/actions/application';
import ProfileMenuLinks from '../../assets/static/profile-menu-links';
import MetroServedConfig from 'assets/static/metros-served-config';

const { menu } = ProfileMenuLinks;
const { areasServed } =  MetroServedConfig;
const { EDIT_PROFILE_LINK ,HELP_ME_INVEST_LINK , ANALYZE_RETURNS_LINK } = require('../../utils/app-constants').default;

const Login = loadable(() => import(/* webpackChunkName: 'quicksignup' */'../login/login'),{
	LoadingComponent: Spinner,
});


/**
 * User
 * Description: Mobile Menu container.
 */
const CREATE_LIST = 'createlist',
	DEPOT_ROUTE = '/depot',
	POST_ARTICLE = 'postarticle',
	POST_ARTICLE_ROUTE ='/news-articles',
	MY_PORTFOLIO = 'portfolio',
	MY_PORTFOLIO_ROUTE = '/analyze-portfolio',
	BLOGS_ROUTE = '/blogs',
	CREATE_LISTING_ROUTE = '/profile/location/property-listing',
	ACTIVATE_ACCOUNT_ROUTE_1 = '/activate-account',
	ACTIVATE_ACCOUNT_ROUTE_2 = '/reset-password';

const HIDE_LOGIN_PATHS = [ACTIVATE_ACCOUNT_ROUTE_1,ACTIVATE_ACCOUNT_ROUTE_2];
class DefaultMenu extends Component {

	static propTypes = {
		className: PropTypes.string,
		logo: PropTypes.string
	};

	static defaultProps = {
		className: 'logo-container'
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		width : PropTypes.number,
		country : PropTypes.string,
		awsImagePath : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.addModal = this.addModal.bind(this);
		this.onHeaderMenuClick = this.onHeaderMenuClick.bind(this);
		this.handleProfileMenuClick = this.handleProfileMenuClick.bind(this);
		this.handleSignupMenuClick = this.handleSignupMenuClick.bind(this);
		this.handleRedirections = this.handleRedirections.bind(this);
		this.onClickSendFeedback = this.onClickSendFeedback.bind(this);
		this.state = {
			hamburger : 'close',
			languageDD : 'close',
			profile : 'close',
			mobileHamburgerMenu : 'close',
			signup : 'close',
			siteDD : 'close',
			marketDD : 'close',
			isMobile : props.screenSize <= 2,
			isLogIn : props.user.user.isLogIn
		};
	}

	componentWillReceiveProps(props) {
		if(props) {
			if(props.user.user.isLogIn && !this.state.isLogIn) {
				this.setState({
					isLogIn : true
				},this.handleRedirections);
			}
			// this.updateRegisterLogin();
		}
	}

	handleRedirections() {
		setTimeout(() => {
			// modal.clear(); // clearing off the modal in the login.js component itself
			const {pathname, search} = this.props.location;
			const curPath = `${pathname}${search}`;

			if(this.props.registerRedirectUrl === curPath || this.props.actionComponentPayLoad || this.props.actionSubmit) {
				return;
			}

			if(this.props.registerRedirectUrl && this.props.registerRedirectUrl.indexOf('/reset-password') >= 0) {
				return this.context.router.push({
					pathname: '/'
				});
			}

			return this.context.router.push(this.props.registerRedirectUrl);

		},200);
	}

	gotoRoute(route) {
		this.context.router.push({
			pathname : route
		});
	}

	onHeaderMenuClick(stateParam) {
		if(this.state[stateParam] === 'close') {
			this.setState({
				[stateParam]: 'open'
			}, ()=>{
				updateMobileFoter('none')

			});
		} else {
			this.setState({
				[stateParam]: 'close'
			}, ()=>{
				updateMobileFoter('flex')
			});
		}
	}

	logout() {
		const userID = this.props.user.user.id;
		this.setState({
			isLogIn : false
		});
		this.props.dispatch(REQUEST_USER_LOGOUT());
		this.updateRegisterLogin('/');
	}

	resetUserState() {
		this.props.dispatch(REQUEST_RESET_STATE());
	}

	addModal() {
		const { l } = this.context.i18n;
		modal.add(Login, {
			title: l('LOGINHEADING'),
			size: 'custom login-modal',
			...this.props.user,
			dispatch:this.props.dispatch,
			hideTitleBar: false,
			hideCloseButton: false,
			screenSize : this.props.screenSize,
			location: this.props.location,
		});
	}

	onClickSendFeedback() {
		this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : true,
			subject : "PROVIDEFEEDBACK"
		}));
	}

	getFilteredMenuLinks(device,query) {
		const key = Object.keys(query)[0];
		const filteredLinks = _filter(menu[device], (link)=> {
			return (link[key] === query[key] || link[key] === undefined) && link;
		});
		return filteredLinks;
	}

	getSelectedMarket() {
		const { params } = this.props;
		if(params.metro && params.id) {
			return _find(areasServed,{
				metroID : Number(params.id)
			});
		}
		return '';
	}

	getMarketsServed() {

		return areasServed.sort((a, b)=>{
			if(a.label > b.label) {
				return 1;
			}

			if(b.label > a.label) {
				return -1
			}
			return 0

		}).map(area => {
			return ({
				link : area,
				name : area.label
			});
		});
	}

	renderAnalyzeMarkets() {
		const { l } = this.context.i18n;
		const { marketDD } = this.state;
		const selectedMarket = this.getSelectedMarket();
		const markets = this.getMarketsServed();
		return (
			<li className={`${ marketDD === 'open' && 'active'} js-analyze-market-ignore header__nav-bar__item`}>
				<button data-tip={l('ANALYZEMARKETSTOOLTIP')} data-for="desktop-header-menu-tooltip" data-automation-selector="header-analyze-market-button" className="site-switch-btn dropdown-toggle cursor flex flex-align-center" href="#" data-toggle="dropdown" onClick={()=>this.onHeaderMenuClick('marketDD')} data-tag-category="Header Links" data-tag-action="click" data-tag-label="Analyze Markets Menu">
					<span className="country-name">{l('MARKETS')}</span>
					<i className="pe-7s-angle-down header-icon" />
				</button>
				{ marketDD === 'open' && <TogglePanel
					collapse={this.onHeaderMenuClick}
					childStateParam="marketDD"
					ignoreClass="js-analyze-market-ignore">
					<TableItems tableData={markets} noColumns={1} handleClick={this.handleSelectMarket.bind(this)}/>
				</TogglePanel>
				}
			</li>
		);
	}

	handleSelectMarket(market) {
		const params = {
			state : market.stateName,
			metro : market.flattenAddress,
			id : market.metroID,
			maptype : 'sale-price'
		};
		this.setState({
			marketDD : 'close'
		},()=>{
			this.context.router.push({
				pathname: pathToUrl('/residential-investment-markets/{state}/{metro}/{maptype}/map/{id}', params)
			})
		})
	}

	handleLoginClick() {
		this.resetUserState();
		this.updateRegisterLogin(this.props.registerRedirectUrl !== '/' ? this.props.registerRedirectUrl : '');
		this.addModal();
	}

	handleloginBarrierLink(linkName) {
		const { user } = this.props.user;
		return (
			{
				[CREATE_LIST]: () => {
					if(user.isLogIn) {
						this.gotoRoute(CREATE_LISTING_ROUTE);
					} else {
						this.addModal();
						this.updateRegisterLogin(CREATE_LISTING_ROUTE);
					}
				},
				[POST_ARTICLE]: () => {
					if(user.isLogIn) {
						this.gotoRoute(POST_ARTICLE_ROUTE);
					} else {
						this.addModal();
						this.updateRegisterLogin(POST_ARTICLE_ROUTE);
					}
				}
			}
		)[linkName]();
	}


	renderDesktopHamburgerMenu() {
		const tabelItems = <TableItems tableData={menu.desktop.hamburgerLinks} noColumns={1} handleClick={this.handleProfileMenuClick} />;
		const { hamburger } = this.state;
		return (
			<div className={`header__nav-bar__hamburger ${ hamburger === 'open' && 'active'}`}>
				<button className="cursor js-menu-switch" onClick={()=>this.onHeaderMenuClick('hamburger')}
						data-tag-category="Header Links"
						data-tag-action="click"
						data-tag-label="Hamburger"
						aria-label="Menu"
				>
					<i className="pe-7s-menu2"/>
				</button>
				{hamburger === 'open' && <ToggleSidebar
					classes={'header__nav-bar__hamburger__menu'}
					collapse={this.onHeaderMenuClick}
					childStateParam="hamburger"
					ignoreClass="js-menu-switch">

					{tabelItems}
				</ToggleSidebar>
				}
			</div>
		);
	}

	renderMobileHamburgerMenu() {
		const { mobileHamburgerMenu } = this.state;
		const tabelItems = <TableItems tableData={this.getFilteredMenuLinks('mobile',{'loggedin':false})} noColumns={1} handleClick={this.handleProfileMenuClick} />;

		return (
			<li className={`header__nav-bar__hamburger ${ mobileHamburgerMenu === 'open' && 'active'}`}>
				<button className="cursor js-menu-switch" onClick={()=>this.onHeaderMenuClick('mobileHamburgerMenu')}><i className={`${mobileHamburgerMenu === 'open'?'pe-7s-menu2':'pe-7s-menu2'}`} /></button>
				{mobileHamburgerMenu === 'open' && <ToggleSidebar
					classes={'hamburger-menu'}
					collapse={this.onHeaderMenuClick}
					childStateParam="mobileHamburgerMenu"
					ignoreClass="js-menu-switch">
					{tabelItems}
				</ToggleSidebar>
				}
			</li>
		);
	}

	renderProfileOption(isAvatarRequired) {
		const { user : { user } } = this.props;
		const thumbnailUri = user.photo && user.photo.thumbnailUri;
		const { awsImagePath } = this.context;
		const { profile } = this.state;
		return (
			<li className={`${ profile === 'open' && 'active'}  header__nav-bar__item`}>
				<button data-automation-selector="header-profile-button" className="cursor js-profile-switch flex flex-align-center" onClick={()=>this.onHeaderMenuClick('profile')} data-tag-category="Header Links" data-tag-action="click" data-tag-label="Profile Menu">
					{isAvatarRequired && (thumbnailUri ? <span className="profile-thumbnail">
								<img src={`${awsImagePath}/${thumbnailUri}`} alt="profile pic"/>
							</span> :
							<i className="pe-7s-user header-icon"/>
					)}
					<span className="profile m-hide" data-automation-selector="header-profile-name">{user.name}</span>
					<i className="pe-7s-angle-down header-icon" />
				</button>
				{profile === 'open' && <ToggleSidebar
					classes={'profile-menu-items'}
					collapse={this.onHeaderMenuClick}
					childStateParam="profile"
					ignoreClass="js-profile-switch">
					<TableItems userData={user} tableData={menu.desktop.profilelinks} noColumns={1} handleClick={this.handleProfileMenuClick}/>
				</ToggleSidebar>}
			</li>
		)
	}

	renderSignUp(l) {
		return (
			<li className="login header__nav-bar__item">
				<button data-automation-selector="header-login-signup-button" className="cursor" onClick={() => {
					this.handleLoginClick();
				}} data-tag-category="Header Links" data-tag-action="click" data-tag-label="Login">
					<span>{l('LOGINHEADING')}</span>
				</button>
			</li>
		);
	}

	renderLoginMenu(isAvatarRequired=true) {
		const { user : { user }, location : { pathname } } = this.props;
		const { l } = this.context.i18n;
		if(HIDE_LOGIN_PATHS.some(path => pathname.indexOf(path) > -1)) {
			return null;
		}
		return (
			!user.isLogIn
				? this.renderSignUp(l)
				: this.renderProfileOption(isAvatarRequired)

		)
	}

	renderDesktopMenu() {
		const isLandingPage = this.props.location.pathname === '/';
		const { l } = this.context.i18n;
		const { screenSize } = this.props;

		return (
			<div className="desktop-menu">
				<div className="header__nav-bar__logo-wrap">
					{this.renderDesktopHamburgerMenu()}
					<Logo screenSize={screenSize}/>
				</div>
				<ul className="header__nav-bar__items desktop">
					<ReactTooltip id="desktop-header-menu-tooltip" />
					{/*{!isLandingPage && <li data-tip={l("GUIDEDSEARCHTOOLTIP")} data-for="desktop-header-menu-tooltip" className="header__nav-bar__item">
					 <Link data-tag-category="Header Links" data-tag-action="click" data-tag-label="Guided search link" to={HELP_ME_INVEST_LINK}>{l('HELPMEINVEST')}</Link>
					 </li>}*/}
					<li data-tip={l("ANALYZERETURNSTOOLTIP")} data-for="desktop-header-menu-tooltip" className="header__nav-bar__item">
						<Link data-tag-category="Header Links" data-tag-action="click" data-tag-label="Analyze Returns link" to={ANALYZE_RETURNS_LINK}>{l('ROICALCULATOR')}</Link>
					</li>
					{this.renderAnalyzeMarkets()}
					<li data-tip={l('ANALYZEPORTFOLIOTOOLTIP')} data-for="desktop-header-menu-tooltip" className="header__nav-bar__item">
						<Link data-tag-category="Header Links" data-tag-action="Analyze Portfolio click" data-tag-label="Analyze portfolio" to={MY_PORTFOLIO_ROUTE}>{l('PORTFOLIO')}</Link>
					</li>
					<li className="header__nav-bar__item">
						<Link data-tag-category="Header Links" data-tag-action="Blogs click" data-tag-label="Blogs" to={BLOGS_ROUTE}>{l('BLOGS')}</Link>
					</li>
					<li className="header__nav-bar__item">
						{screenSize >= 2 &&
						<button className="site-feedback__main-btn" onClick={this.onClickSendFeedback}>
							{l('SENDSITEFEEDBACK')}
						</button>}
					</li>
					{this.renderLoginMenu()}
				</ul>
			</div>
		);
	}

	renderMobileMenu() {
		const { screenSize } = this.props;

		return (
			<ul className="header__nav-bar__items mobile">
				<ul className="header__nav-bar__items__left-group">
					{this.renderMobileHamburgerMenu()}
					<Logo screenSize={screenSize}/>
				</ul>
				{this.renderLoginMenu(true)}
			</ul>
		);
	}

	render() {

		const { screenSize } = this.props;
		const { hamburger,mobileHamburgerMenu, profile } = this.state;
		let menuItems = null;
		let isMobileMenuOpen = false;
		if( screenSize > 2 ) {
			//menuItems = this.renderDesktopMenu();
		} else {
			isMobileMenuOpen = mobileHamburgerMenu === 'open';
			//menuItems = this.renderMobileMenu();
		}

		return (
			<Fragment>
				{<div className={`menu-backdrop ${(hamburger === 'open' || profile === 'open' || isMobileMenuOpen) ? 'search-tool-bar__sideBackDrop' : ''}`}></div>}
				{ this.renderDesktopMenu()}
				{ this.renderMobileMenu()}
			</Fragment>
		);
	}

	profileMenuActions(link,data) {
		return ({
			'logout' : () => {
				this.logout();
				this.context.router.push({
					pathname : '/'
				});
			},
			'login' : () => {
				this.handleLoginClick();
			},
			[CREATE_LIST]: () => {
				this.handleloginBarrierLink(data.link);
			},
			'users': () => {
				this.handleSignupMenuClick(data.link);
			},
			'realtors': () => {
				this.handleSignupMenuClick(data.link);
			},
			'professionals': () => {
				this.handleSignupMenuClick(data.link);
			},
			'profile': () => {
				this.context.router.push({
					pathname : data.route
				});
			},
			[POST_ARTICLE] : () => {
				this.handleloginBarrierLink(data.link);
			},
			'routelink': () => {
				this.context.router.push({
					pathname: data.route
				})
			},
			'contactus' : () => {
				this.onClickSendFeedback();
			},
			'analyzemarket' : () => {
				this.handleSelectMarket(data.route)
			}
		})[link](data);
	}

	handleProfileMenuClick(link,route) {
		if (link) {

			this.setState({
				profile: 'close',
				hamburger: 'close',
				mobileHamburgerMenu: 'close'
			});
			this.profileMenuActions(link.toLowerCase(),{
				link,
				route
			});
		}
	}

	updateRegisterLogin(link='') {
		const {pathname, search} = this.props.location;
		const url = link ? link : `${pathname}${search}`;
		this.props.dispatch(REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL({'registerLogin' : url}));
	}

	handleSignupMenuClick(urlParam) {
		this.updateRegisterLogin();
		this.setState({
			'signup': 'close'
		});
		this.context.router.push({
			pathname : `/register/${urlParam}`,
			state : {
				key : uniqueFormId()
			}
		});
	}
}

export default DefaultMenu;

