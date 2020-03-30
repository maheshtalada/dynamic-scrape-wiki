import React from 'react';
import SiteConfig from '../../config';
import moment from 'moment';

const {assetsPath} = SiteConfig;

const UserInfo = ({ awsImagePath, user, creationDate, l }) => {

	return (
		<div className="userinfo">
			<div className="userinfo__img contact-bar__listing-owner__avatar">
				<img src={user.photoURL ? `${awsImagePath}/${user.photoURL}` : `${assetsPath}/images/noimages/noavatar.png`} alt={user.name}/>
			</div>
			<div className="userinfo__data">
				<span className="userinfo__data__name">{user.name}</span>
				<span className="userinfo__data__time-added">{`${l('ANSWEREDON')} ${moment(creationDate).format('MMM DD, YYYY')}`}</span>
			</div>
		</div>
	)
};

export default UserInfo;
