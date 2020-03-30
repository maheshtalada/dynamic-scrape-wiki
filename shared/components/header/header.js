import React, {Component } from 'react';
import PropTypes from 'prop-types';
/*import {modal} from 'react-redux-modal';*/
import cookie from 'cookie';
/*import QuickSearch from '../quicksearch/quicksearch';*/
import LoadingBar from '../common/page-loader/page-loader';
import Navigation from '../navigation/navigation';
/*import SearchWidget from '../quicksearch/searchwidget';*/
import Cx from 'classnames';
import { REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL } from '../../redux/actions/application';

// hide header search bar if page belongs below pages
const HIDE_SEARCH_TEMPLATES = [
	'/landing',
	'/property-listing/',
	'/register/',
	'/depot',
	'/blogs/new',
	'/residential-investment-markets/',
	'/frequently-asked-questions',
	'/terms-conditions',
	'/privacy-policy',
	'/register-company',
	'/about-us'
];

class Header extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country : PropTypes.string
	};

	static isHideHeaderSearch(pathName) {
		return HIDE_SEARCH_TEMPLATES.some(template => pathName.indexOf(template) > -1);
	}

	constructor(props) {
		super(props);
		//this.addModal = this.addModal.bind(this);
		// this.handleServicesClick = this.handleServicesClick.bind(this);
		this.state = {
			hamburger : 'close',
			languageDD : 'close'
		};

		this.initialPageLoad = true;
	}

	componentDidMount() {
		this.initialPageLoad = false;
	}


	onHMClick(stateParem) {
		// evt.preventDefault();
		if(this.state[stateParem] === 'close') {
			this.setState({
				[stateParem]: 'open'
			});
		} else {
			this.setState({
				[stateParem]: 'close'
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

	/*addModal() {
		modal.add(SearchWidget, {
			title: 'Search',
			size: 'custom', // large, medium or small,
			closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideTitleBar: false,// (optional) Switch to true if do not want the default title bar and close button,
			hideCloseButton: false // (optional) if you don't wanna show the top right close button
		});
	}*/

	renderNavigation() {
		return (
			<div id="app-header-content" className="header__nav-bar">
				<Navigation {...this.props}/>
			</div>
		)
	}

	/*renderQuickSearch() {
		return (
			<div className="container-quicksearch print-hide">
				{<QuickSearch {...this.props}/>}
			</div>
		)
	}*/


	render() {
		const { pathname } = this.props.location;
		const headerClasses = hideSearch ?  'header-no-search' : 'header-search';
		const { screenSize } = this.props;
		const isHomePage = pathname === '/';
		const hideSearch = Header.isHideHeaderSearch(pathname) || isHomePage;
		return (
			<header id="app-header" className={Cx('header')}>
				{
					!frameworkGlobals.isServer && !this.initialPageLoad &&
					<LoadingBar style={{ backgroundColor: '#fff', height: '5px' }} />
				}

				{this.renderNavigation()}
				{/*{!hideSearch && this.renderQuickSearch()}*/}
				{/*{!hideSearch && <AdvanceSearchLinks isTooltipRequired={false} className={isHomePage ? 'home-page' :''}{...this.props}/>}*/}
			</header>
		);
	}

	handleServicesClick(urlParam) {
		const {pathname, search} = this.props.location;
		this.props.dispatch(REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL({'registerLogin' : `${pathname}${search}`}));
		this.context.router.push({
			pathname : `/register/${urlParam}`
		});
	}

}

export default Header;
