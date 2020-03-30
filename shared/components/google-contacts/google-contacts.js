import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadScript, getJSON } from 'utils/scriptUtils';
import GoogleContactsList from './google-contacts-list';
import { modal } from 'react-redux-modal';
import SiteConfig from '../../config';

const { google } = SiteConfig;

export default class GoogleContacts extends Component {

    static contextTypes = {
        i18n : PropTypes.object
    }

    constructor(props) {
        super(props);
        this.getContacts = this.getContacts.bind(this);
    }

    componentDidMount() {
        loadScript({
            nonce : frameworkGlobals.nonce,
            src : "https://apis.google.com/js/client.js",
            id : "googleClient"
        });
    }

    render() {
        return (
            <div className="google-contacts">
                <button className="btn btn-primary" onClick={this.getContacts}>
                    <i className="pe-7s-upload"/>
                    {'Import Google Contacts'}
                </button>
            </div>
        )
    }

    handleAuthResult = async (authResult) => {
        if(authResult.access_token) {
            modal.add(GoogleContactsList,{
                title : 'Import Google Contacts',
                size : 'contacts-import',
                dispatch : this.props.dispatch,
                onImportSuccess: this.props.onImportSuccess,
                accessToken : authResult.access_token
            });
        }
    }

    getContacts() {
        const config = {
            'client_id': google.clientId,
            'scope': 'https://www.google.com/m8/feeds'
        };
        gapi.auth.authorize(config, this.handleAuthResult);
    }
}
