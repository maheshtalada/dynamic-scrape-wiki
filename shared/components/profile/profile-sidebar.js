import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ScrollFixed from '../common/scroll-fixed/scroll-fixed';
import Cx from 'classnames';
import { REQUEST_USER_LOGOUT } from '../../redux/actions/user';

const INDIVIDUAL_LINK = 'individual';

export default class ProfileSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSection : props.profileSection || 'profile',
			allLinksClose : false
		};
	}

	static propTypes = {
		profileSection: PropTypes.string,
		userInfo: PropTypes.object,
		classNames : PropTypes.Array
	};

	static contextTypes = {
		i18n : PropTypes.object,
		router: PropTypes.object,
		awsImagePath: PropTypes.string
	};

	componentDidMount() {
		const { selectedSection } = this.state;
		const { links } = this.props;
		const linksWithChildren = links.filter(link => link.children && link.children.length > 0);
		const defaultLinkToOpen = linksWithChildren.filter(link => link.names.indexOf(selectedSection) > -1)[0];
		if(defaultLinkToOpen) {
			this.setState({
				[`link${defaultLinkToOpen.id}Open`] : true
			});
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			selectedSection : props.profileSection || 'profile'
		});
	}

	logout() {
		const userID = this.props.userInfo.id;
		this.props.dispatch(REQUEST_USER_LOGOUT());
	}

	onClickPageLink(route,section,linkType) {
		this.context.router.push({
			pathname: route
		});
		if(section === 'logout') {
			this.logout();
		} else {
			this.setState({
				selectedSection: section,
				allLinksClose: linkType === INDIVIDUAL_LINK
			});
		}
	}

	toggleLink(index) {
		this.setState((prevState) => {
			return {
				[`link${index}Open`] : prevState.allLinksClose || !prevState[`link${index}Open`],
				allLinksClose : false
			};
		});
	}

	renderSidebarOptions(pageLinks) {
		const { l } = this.context.i18n;
		return pageLinks.map((link) => {
			if(link.children && link.children.length > 0) {
				const linkOpen = this.state[`link${link.id}Open`];
				const { allLinksClose } = this.state;
				const linkCloseFlag = !linkOpen || allLinksClose;
				return (
				<li className={'profile-page__layout__sidebar__profile-links__toggle-link'}>
					<div className={`parent-link ${linkCloseFlag ? 'close' : 'open'}`} onClick={()=>{
						this.toggleLink(link.id);
					}}>
						<i className={`${link.icon}`}/>
						<span>{l(link.label)}</span>
						<i className={`toggle-icon ${linkCloseFlag ? 'pe-7s-angle-left' : 'pe-7s-angle-down'}`}/>
					</div>
					<ul className={`sublinks ${linkCloseFlag ? 'close' : 'open'}`}>
						{link.children.map(child => this.renderPageLink(child))}
					</ul>
				</li>
				);
			} else {
				return this.renderPageLink(link,INDIVIDUAL_LINK);
			}
		});
	}

	renderPageLink(link,linkType) {
		const { role_id: roleId } = this.props.userInfo;
		const { selectedSection } = this.state;
		const { l } = this.context.i18n;

		return link.userRoles.indexOf(roleId) !== -1 ?
			<li className={`profile-page__layout__sidebar__profile-links__link ${link.activeSections && link.activeSections.indexOf(selectedSection) > -1 ? 'active': ''}`}
				onClick={()=>{
					this.onClickPageLink(link.route,link.name,linkType);
				}}>
				<i className={`${link.icon}`}/>
				<span>{l(link.label)}</span>
			</li> :
			null;
	}

	renderSidebar() {
		const { classNames, links } = this.props;
		return (
			<div className={Cx("profile-page__layout__sidebar collapsed",classNames)}>
				<ScrollFixed key="expanded-scroll-fixed" className="sidebar-scroll-fix" scrollPosition={0} top={50}>
				<ul className="profile-page__layout__sidebar__profile-links">
					{this.renderSidebarOptions(links)}
				</ul>
				</ScrollFixed>
			</div>
		)
	}

	render() {
		return (
			this.renderSidebar()
		);
	}
}
