import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { modal } from 'react-redux-modal';
import Loader from 'components/common/page-loader/loader';
import { REQUEST_VERIFY_TOKEN_VIA_EMAIL } from '../redux/actions/user';
import { isFunction } from 'lodash';
import Cx from 'classnames';
import loadable from '@loadable/component';
import Footer from 'components/footer/footer';

const Login = loadable(() => import(/* webpackChunkName: 'quicksignup' */'components/login/login'),{
	LoadingComponent: Loader,
});

class ActivateAccountPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading : true,
			error : false,
			verifyTokenTriggered : true
		};
	}

	static contextTypes = {
		i18n : PropTypes.object,
		router : PropTypes.object
	};


	static sanitiseFunctionName(name) {
		return name.split('_').reduce(function(acc , item) {
			return acc += item.charAt(0).toUpperCase() + item.slice(1)
		});
	}

	static renderCampaign = {

		flyer() {
			const { props } = this;
			this.context.router.push({
				pathname : `/flyer/template/${props.location.query.listing_id}`,
				query : { ...props.location.query }
			});
		},

		propertyManagerCashflow() {
			return this.renderAccountActiveLogin();
		},

		newUser() {
			return this.renderAccountActiveLogin();
		},

		analyzeReturn() {
			return this.renderAccountActiveLogin();
		}
	};

	static errorHandlers = {

		tokenNotFound() {
			this.renderLoginModal();
		},

		invalidToken() {
			this.renderLoginModal();
		},

		tokenExpired() {
			this.renderLoginModal();
		}
	};

	componentWillReceiveProps(props) {
		const { user: {user} } = props;
		const { error } = this.state;
		if(!error && props && user && user.isVerifyingToken === false && this.state.verifyTokenTriggered) {
			const errorHandler = ActivateAccountPage.sanitiseFunctionName(user.message.toLowerCase());
			if(typeof ActivateAccountPage.errorHandlers[errorHandler] === 'function') {
				this.setState({
					error : true
				}, ()=>{
					ActivateAccountPage.errorHandlers[errorHandler].call(this);
				})
			} else {
				this.setState({
					verifyTokenTriggered : false
				});
			}
		}
	}

	componentDidMount() {
		const { user = {}, location } = this.props;
		this.setState({
			isLoading : false
		});
		this.props.dispatch(REQUEST_VERIFY_TOKEN_VIA_EMAIL({
			query : location.query
		}));
	}

	renderAccountActiveLogin() {
		const { isLoading, verifyTokenTriggered } = this.state;
		const { l } = this.context.i18n;
		const { user } = this.props;
		return (<div className={Cx("reset-password-page__container", user.user.modalSize)}>
			<h1 className="reset-password-page__title">{l('ACCESSMYACCOUNT')}</h1>
			{user.user && !verifyTokenTriggered && <Login {...this.props} user={user.user} className='activate-account'/>}
		</div>)
	}

	renderCampaign() {
		const handlerFunction = ActivateAccountPage.sanitiseFunctionName(this.props.location.query.campaign_type);
		// check function exist to avoid silent failures
		if(isFunction(ActivateAccountPage.renderCampaign[handlerFunction])) {
			return ActivateAccountPage.renderCampaign[handlerFunction].call(this)
		}
		return (
			<h1 className="reset-password-page__title">ERROR : Invalid Campaign</h1>
		)
	}

	renderLoginModal() {
		modal.add(Login, {
			title: 'LOGIN',
			size: 'custom login-modal',
			dispatch:this.props.dispatch,
			hideTitleBar: false,
			hideCloseButton: false,
			screenSize : this.props.screenSize
		});
	}

	render() {
		const { isLoading, verifyTokenTriggered, error = undefined } = this.state;
		const { user } = this.props;
		return (

			<Fragment>
				<div className="reset-password-page landing-page">
					{(isLoading || user.user.isVerifyingToken) && <Loader />}
					{ !error && !verifyTokenTriggered && this.renderCampaign()}
				</div>
				<Footer dispatch={this.props.dispatch}/>
			</Fragment>
		);
	}
}

const mapStateToProps = ({user}) => {
	return { user: user };
};

export default connect(mapStateToProps)(ActivateAccountPage);
