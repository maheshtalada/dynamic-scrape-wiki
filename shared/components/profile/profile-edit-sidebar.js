import React, { Component, Fragment } from 'react';
import ProfileSidebar from './profile-sidebar';
import Cx from 'classnames';
import ScrollFixed from '../common/scroll-fixed/scroll-fixed';
import ProfilePic from './profile-pic-component';

export default class ProfileEditSidebar extends ProfileSidebar {
	constructor(props) {
		super(props);
	}
    
    renderSidebar() {
		const { classNames, links } = this.props;
		return (
			<div className={Cx("profile-page__layout__sidebar",classNames)}>
				<ScrollFixed key="expanded-scroll-fixed" className="sidebar-scroll-fix" scrollPosition={0} top={50}>
					<ProfilePic userInfo={this.props.userInfo} profileSection={this.props.profileSection} dispatch={this.props.dispatch}/>
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
