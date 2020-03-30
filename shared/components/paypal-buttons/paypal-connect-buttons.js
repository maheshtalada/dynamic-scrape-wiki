/**
 * Created by maheshtalada on 27/03/19.
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { loadScript } from 'utils/scriptUtils';
import axios from 'axios';
import SiteConfig from '../../config';

const { paypal : paypalConfig } = SiteConfig;


export default class PaypalConnectButtons extends Component {

	static propsTypes = {
		amount : PropTypes.string.required,
	};

	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		const { location } = this.props;
		if(!window.paypal) {
			loadScript({
				nonce : frameworkGlobals.nonce,
				src : "https://www.paypalobjects.com/js/external/connect/api.js",
				id : "paypalConnectClient"
			}, ()=> {
				this.renderConnectPaypal();
			})
		} else {
			this.renderConnectPaypal();
		}
		if(location.query.code) {
			try {
				const authConfig = {
					method : 'POST',
					url : `${paypalConfig.host}v1/oauth2/token`,
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization' : `Basic ${btoa(paypalConfig.clientId+':'+paypalConfig.secret)}`
					},
					data : `grant_type=authorization_code&code=${location.query.code}`
				};
				const tokenResponse = await axios(authConfig);
				const userInfoConfig = {
					method : 'GET',
					url : `${paypalConfig.host}v1/identity/oauth2/userinfo?schema=paypalv1.1`,
					headers : {
						'Content-Type': 'application/json',
						'Authorization' : `Bearer ${tokenResponse.data.access_token}`
					}
				};
				const userInfo = await axios(userInfoConfig);
				console.log(userInfo.data);
			} catch (e) {

			}
		}
	}



	renderConnectPaypal() {
		paypal.use( ['login'],  (login)=> {
			login.render ({
				"appid": paypalConfig.clientId,
				"authend":paypalConfig.authend,
				"scopes":paypalConfig.scopes,
				"containerid":"cwppButton",
				"locale":"en-us",
				"theme":"neutral",
				"buttonType":"CWP",
				"buttonSize":"sm",
				"returnurl": this.props.returnUrl || "http://localhost:3002/schematest"
			});
		});
	}

	render() {
		//const PayPalButton = this.PayPalButton || '';
		return (
			<div id='cwppButton'></div>
		)
	}

}
