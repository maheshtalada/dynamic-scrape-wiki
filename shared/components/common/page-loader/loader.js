import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';


/**
 * User
 * Description: Loader container.
 */
export default class Loader extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	static defaultProps = {
		loadingText  : 'LOADINGDATA'
	}

	constructor(props) {
		super(props);
	}


	render() {
		const { l } = this.context.i18n;
		return (
			<div className="page-loader">
				<div className="page-loader__content">
					<Spinner />
					<span>{l(this.props.loadingText)}</span>
				</div>
			</div>
		);
	}

}
