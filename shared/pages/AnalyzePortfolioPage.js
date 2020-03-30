import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'components/common/error-boundary/error-boundary';
import PortfolioNoResults from 'components/portfolio/portfolio-no-results';
import Footer from 'components/footer/footer';
import {modal} from 'react-redux-modal';
import Spinner from 'components/common/spinner/spinner';
import loadable from '@loadable/component';
import  { REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL } from '../redux/actions/application';
const Login = loadable(() => import(/* webpackChunkName: 'quicksignup' */'../components/login/login'),{
	LoadingComponent: Spinner,
});


class AnalyzePortfolioPage extends Component {

	constructor(props) {
        super(props);
        this.onAddLoginModal = this.onAddLoginModal.bind(this);
    }
    
    componentDidMount() {
        this.props.dispatch(REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL({'registerLogin' : '/profile/portfolio'}));
    }

    static contextTypes = { i18n: PropTypes.object };
    
    onAddLoginModal() {
        const { l } = this.context.i18n;
        modal.add(Login,{
            title: l('LOGINHEADING'),
            size: 'custom login-modal',
            ...this.props
        });
    }

	render() {
        const { user, dispatch } = this.props;
        const { l } = this.context.i18n;
		return (
            <Fragment>
                <div className="analyze-portfolio-page">
                    <div className="profile-page__layout__profile-section__portfolio-wrapper__header">
                        <h1 className="profile-page__layout__profile-section__portfolio-wrapper__title">{l('ANALYZEPORTFOLIO')}</h1>
                        <button className="btn btn-primary analyze-portfolio-page__login-btn" onClick={this.onAddLoginModal}>{l('STARTHERE')}</button>
                    </div>
                    <ErrorBoundary>
                        <PortfolioNoResults l={l} user={user}/>
                    </ErrorBoundary>
                </div>
                <Footer dispatch={dispatch}/>
            </Fragment>
		);
	}

}

export default AnalyzePortfolioPage;
