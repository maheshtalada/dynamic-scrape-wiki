import React, {Component } from 'react';
import PropTypes from 'prop-types';

export default class MobileAccessInfoModal extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { l } = this.context.i18n;
		return (
            <div className="email-modal__content">
                <h1 className="email-modal__content__title flex flex-justify-center">{l("MOBILEACCESSINFOTIP")}</h1>
                <div className="email-modal__content__send-email">
                <button className="btn btn-primary" onClick={()=>{this.props.removeModal()}}>{l("OK")}</button>
                </div>
            </div>
		);
	}
}

