import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { modal } from 'react-redux-modal';
import MakeOfferModal from './make-offer-modal';
import LoginBarrier from '../../lib/LoginBarrier';
import Snackbar from 'components/common/snackbar/snackbar';
import { connect } from 'react-redux';

const STEP_AFTER_LOGIN = "addMakeOfferModal";

class MakeOffer extends LoginBarrier {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.onMakeOfferSuccess = this.onMakeOfferSuccess.bind(this);
		this.hideSnackbar = this.hideSnackbar.bind(this);
		this.state = {
			isShowSnackbar : false
		};
	}

	componentWillReceiveProps(props) {
		const { stepAfterLogin } = this.state;
		if(props.user && props.user.user.isLogIn) {
			if(this.loginModalClearTimeout) {
				clearTimeout(this.loginModalClearTimeout);
			}
			this.loginModalClearTimeout = setTimeout(()=>{
				!this.modalAdded && this[stepAfterLogin] && this[stepAfterLogin]();
			},300);
		}
	}

	onClickHandler() {
		const { user } = this.props;
		if (user && user.user && user.user.isLogIn) {
			this.addMakeOfferModal();
		} else {
			this.setState({
				stepAfterLogin : STEP_AFTER_LOGIN
			},()=>{
				this.redirectToLogin('Log In');
			});
		}
	}

	addMakeOfferModal() {
		const { l } = this.context.i18n;
		this.setState({
			stepAfterLogin: null,
			forceHideSnackbar : false
		},()=>{
			this.modalAdded = true;
			modal.add(MakeOfferModal,{
				...this.props,
				title : l("MAKEANOFFER"),
				size: 'medium',
				className: "make-offer-modal",
				successCallback: this.onMakeOfferSuccess
		})
		})
	};

	onMakeOfferSuccess() {
		this.showSnackbar();
	}

	showSnackbar() {
        this.setState({
			isShowSnackbar : true,
        })
    }

	hideSnackbar() {
		this.setState({
			isShowSnackbar : false,
			forceHideSnackbar : true
        })
	}

	render() {
		const { l } = this.context.i18n;
		const { isShowSnackbar, forceHideSnackbar } = this.state;
		return (
			<Fragment>
				<button className="btn btn-sm btn-default make-offer-btn" onClick={this.onClickHandler} data-tag-category="Ready to Invest Contact Actions" data-tag-action="Ready to Invest Click" data-tag-label="Ready to Invest">
					<i className="pe-7s-money-bag"/>
					<span>{l("MAKEANOFFER")}</span>
				</button>
				<Snackbar active={forceHideSnackbar ? false : isShowSnackbar} timeout={3000} onTimeout={this.hideSnackbar}>
					{l('MAKEANOFFERCONFIRMATION')}
				</Snackbar>
			</Fragment>
		)
	}

}

const mapStateToProps = ({ user }) => {
	return {
		user : user
	};
};

export default connect(mapStateToProps)(MakeOffer);
