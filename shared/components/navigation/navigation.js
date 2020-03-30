import React, {Component } from 'react';
import PropTypes from 'prop-types';
import DefaultMenu from './default-menu';
import Cx from 'classnames';

/**
 * User
 * Description: Mobile Menu container.
 */

class Navigation extends Component {

	static propTypes = {
		className: PropTypes.string,
		logo: PropTypes.string
	};

	static defaultProps = {
		className: 'logo-container'
	};

	static contextTypes = {
		router : PropTypes.object,
		width : PropTypes.number
	};

	render() {

		const {logo, className} = this.props;
		const { width } = this.context;

		return (<DefaultMenu {...this.props}/>);
	}
}

export default (Navigation);
