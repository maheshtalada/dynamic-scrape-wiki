import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LoginBarrier from '../../lib/LoginBarrier';
import APPCONSTANTS from 'utils/app-constants';
import { sprintf } from 'utils';
import Cx from 'classnames';

const { TENANT_APPLY_START_LINK } = APPCONSTANTS;
class TenantApply extends LoginBarrier {

	static contextTypes = {
        i18n : PropTypes.object,
        router : PropTypes.object
	};

	static propTypes = {
		btnClassName : PropTypes.string,
		showBtnText : PropTypes.bool
	};

	static defaultProps = {
		btnClassName : 'btn-sm btn-default',
		showBtnText : true
	}

	constructor(props) {
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.state = {};
	}

	onClickHandler() {
        const { user, listingId } = this.props;
        const link = sprintf(TENANT_APPLY_START_LINK,listingId);
		if (user && user.user && user.user.isLogIn) {
			this.routeRedirect(link);
		} else {
            this.redirectToLogin('Log In',link);
		}
	}

	render() {
		const { l } = this.context.i18n;
		const { btnClassName, showBtnText } = this.props;
		return (
            <button className={Cx("btn tenant-apply-btn",btnClassName)} onClick={this.onClickHandler}>
                <i className="pe-7s-note2" data-tip={showBtnText ? '' : l('TENANTAPPLY')}/>
                {showBtnText && <span>{l("TENANTAPPLY")}</span>}
            </button>
		)
	}

}

export default TenantApply;
