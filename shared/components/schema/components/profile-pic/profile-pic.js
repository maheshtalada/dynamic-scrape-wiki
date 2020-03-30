import React  from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import loadable from '@loadable/component';
const ProfilePic = loadable(() => import(/* webpackChunkName: 'ProfilePic' */'../../../profile/profile-pic-component'));

/**
 * @description Creates a labelless iframe component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class SchemaProfilePic extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__profile-pic']
	};

	renderLabel(label) {
		return (null);
	}

	renderValue(value) {
		const { label, data, user, dispatch } = this.props;
		return (
            <ProfilePic userInfo={user.user} dispatch={dispatch} isStopWindowReload={true}/>
		);

	}

}
