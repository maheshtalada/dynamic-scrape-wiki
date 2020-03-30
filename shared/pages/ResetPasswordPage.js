import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import Footer from '../components/footer/footer';
import {modal} from 'react-redux-modal';
import LandingPageContent from 'components/landing-page-content/landing-page-content';
import Loader from 'components/common/page-loader/loader';
import loadable from '@loadable/component';
import { REQUEST_VERIFY_TOKEN_VIA_EMAIL } from '../redux/actions/user';
import { REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL, REQUEST_POPULAR_LISTINGS } from '../redux/actions/application';

import Spinner from '../components/common/spinner/spinner';
const Login = loadable(() => import(/* webpackChunkName: 'quicksignup' */'../components/login/login'),{
	LoadingComponent: Spinner,
});

class ResetPasswordPage extends Component {

	constructor(props) {
        super(props);
        this.state = {
            isLoading : true
        };
    }

    static contextTypes = {
        i18n : PropTypes.object,
        router : PropTypes.object
    }

    componentDidMount() {
        const { user = {}, location } = this.props;
        this.props.dispatch(REQUEST_VERIFY_TOKEN_VIA_EMAIL({
            query : location.query
        }));
    }

    componentWillReceiveProps(props) {
        const { user } = props;
        if(user.user && user.user.isFetching === false && !this.modalOpened) {
            setTimeout(() => {
                this.addLoginModal(props);
            },100);
            
            if(user.user && user.user.loginRedirectUrl) {
                this.props.dispatch(REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL({'registerLogin' : user.user.loginRedirectUrl}));
            }
            this.modalOpened = true;
        }
    }

    addLoginModal(props) {
        const { l } = this.context.i18n;
        const { modalTitle, userstatus, modalSize } = props.user.user;
        this.setState({
            isLoading : false
        });
        modal.add(Login,{
            title: l(modalTitle || 'LOGINHEADING'),
            size: `custom login-modal ${modalSize || ''}`,
            ...props,
            className : 'activate-account'
        });
    }

	render() {
        const { isLoading } = this.state;
		return (
            <div className="reset-password-page landing-page">
                {isLoading && <Loader />}
                <LandingPageContent {...this.props}/>
                <Footer dispatch={this.props.dispatch}/>
            </div>
		);
	}
}

const mapStateToProps = ({user, application}) => {
    const { popular_listings } = application;
	return { popularListings : popular_listings, user: user };
};

export default connect(mapStateToProps)(connectDataFetchers(ResetPasswordPage, [
    REQUEST_POPULAR_LISTINGS
]));
