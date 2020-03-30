import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LeadRealtors from './index';
import MobileOverlay from '../common/mobile-overlay/mobile-overlay';

export default class ContactLeadRealtorsOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRealtors : false
        };
        this.toggleShowRealtors = this.toggleShowRealtors.bind(this);
    }

    static contextTypes = {
        i18n : PropTypes.object
    };

    render() {
        const { showRealtors } = this.state;
        const { l } = this.context.i18n;
        return (
            <div className="contact-lead-realtors-option">
            <button className="btn btn-sm btn-default contact-lead-realtors-option-btn" onClick={this.toggleShowRealtors}>
                <i className="pe-7s-Phone-number"/>
                <span>{l('INVESTMENTSPECIALISTS')}</span>
            </button>
            {showRealtors && <MobileOverlay onCloseOverlay={this.toggleShowRealtors}>
                <LeadRealtors {...this.props}/>
            </MobileOverlay>}
            </div>
        )
    }

    toggleShowRealtors() {
        this.setState({
            showRealtors : !this.state.showRealtors
        })
    }
}