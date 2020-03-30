import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import ServerError from './error-server';
import UnautherizeError from './error-unautherize';
import { REQUEST_RESET_ERROR_STATE } from '../../../redux/actions/application';


// screens
const SCREEN_LAYOUTS = {
	unauthorized : UnautherizeError,
	servererror : ServerError
};

class ErrorStateModal extends Component {

	static propTypes = {
		errorState: PropTypes.string
	};

	static defaultProps = {
		errorState: ''
	};

	static contextTypes = {
		i18n : PropTypes.object,
		router : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.onActionSubmit = this.onActionSubmit.bind(this);
	}

	render() {
		const { errorState='', user } = this.props;
		const ErrorComponent = errorState && SCREEN_LAYOUTS[errorState];
		const { l } = this.context.i18n;
		return (
			<div className={Cx("",this.props.className)}>
				<ErrorComponent
					l={l}
					{...this.props}
					{...this.state}
					onSubmit={this.onActionSubmit}
				/>
				{/* {user.user.isForceLogin && <Login {...this.props}/>} */}
			</div>
		);
	}

	onActionSubmit() {
		this.props.dispatch(REQUEST_RESET_ERROR_STATE());
		this.props.modal.clear();
		this.context.router.replace({pathname: '/'});
	}

}

export default ErrorStateModal;

