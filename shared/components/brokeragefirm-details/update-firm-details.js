import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginBarrier from '../../lib/LoginBarrier';
import { REQUEST_OPEN_SITE_FEEDBACK } from '../../redux/actions/application';

const STEP_AFTER_LOGIN = 'openSiteFeedback';

export default class UpdateFirmDetails extends LoginBarrier {
    static contextTypes = {
        i18n : PropTypes.object,
        awsImagePath: PropTypes.string,
        assetsPath : PropTypes.string,
        country: PropTypes.string
    };
    
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.state = {};
    }

    componentWillReceiveProps(props) {
		const { stepAfterLogin } = this.state;
		if(props.user && props.user.user.isLogIn) {
			if(this.loginModalClearTimeout) {
				clearTimeout(this.loginModalClearTimeout);
			}
			this.loginModalClearTimeout = setTimeout(()=>{
				this[stepAfterLogin] && this[stepAfterLogin]();
			},300);
		}
    }
    
    onClickHandler() {
		const { user } = this.props;
		if (user && user.user && user.user.isLogIn) {
			this.openSiteFeedback();
		} else {
			this.setState({
				stepAfterLogin : STEP_AFTER_LOGIN
			},()=>{
				this.redirectToLogin('Log In');
			});
		}
    }
    
    openSiteFeedback() {
        const { i18n : { l }, country } = this.context;
        const { brokerageFirm } = this.props;
        this.setState({
            stepAfterLogin : null
        },()=>{
            this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
                open : true,
                subject : "REQUESTCOMPANYUPDATE",
                title : "REQUESTCOMPANYUPDATE",
                brokerageFirmId : brokerageFirm.id
            }));
        })
    }

    render() {
        const { i18n : {l}} = this.context;
        return (
            <div className="brokerage-firm-info__update-firm-details brokerage-firm-info__view-contact-details">
                <button className="btn btn-default" onClick={this.onClickHandler}>{l("REQUESTUPDATES")}</button>
            </div>
        )
    }
}
