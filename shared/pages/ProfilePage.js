import React , { Component } from 'react';
import ProfileLayout from '../components/profile/profile-layout';
export default class ProfilePage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="profile-page">
				<ProfileLayout {...this.props}/>
			</div>
		);
	}
}
