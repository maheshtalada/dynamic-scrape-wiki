import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PageActions from 'components/page-actions/page-actions';

class ShareViaEmailButton extends PageActions {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { l } = this.context.i18n;
		const { btnClass = 'social-share__share-button btn btn-sm btn-default share-via-email-button', children, emailOptions } = this.props;
 		return (
			<button className={btnClass} onClick={()=>this.onActionClick('shareviaemail', {isLoginRequired : true, type : 'extraPayLoad', name : 'SHAREVIAEMAIL',  extraPayLoad: {...this.props}})}>
				{children ? children : <Fragment>
					<span className="icon-wrap social-icon flex flex-align-center flex-justify-center">
						<i className="pe-7s-email"/>
					</span>
					<span className="share-via-email-button__label flex flex-justify-center">{l("EMAIL")}</span>
				</Fragment>}
			</button>
		)
	}

}

export default ShareViaEmailButton;
