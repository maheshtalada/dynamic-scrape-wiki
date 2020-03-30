import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { loadScript } from 'utils/scriptUtils';
import Spinner from 'components/common/spinner/spinner';
import SiteConfig from '../../config';

const { paypal : paypalConfig } = SiteConfig;

export default class PaypalPaymentButtons extends Component {

	static propsTypes = {
		amount : PropTypes.string.required,
		onPaymentApprove : PropTypes.func
	};

	static defaultProps = {
		onPaymentApprove : () => {}
	}

	constructor(props) {
		super(props);
		this.state = {
			fetchingPaypalButton : true
		};
	}

	componentDidMount() {
		if(!window.paypal) {
			loadScript({
				nonce : frameworkGlobals.nonce,
				src : `https://www.paypal.com/sdk/js?client-id=${paypalConfig.clientId}`,
				id : "paypalPaymentClient"
			}, ()=> {
				this.initPaypalButton();
			});
		} else {
			this.initPaypalButton();
		}

	}

	initPaypalButton() {
		this.PayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });
		this.setState({
			fetchingPaypalButton : false
		});
	}

	createOrder(data, actions) {
		return actions.order.create({
			purchase_units: [{
				amount: {
					value: this.props.amount
				}
			}]
		});
	}

	onApprove(data, actions) {
		return actions.order.capture().then((details) => {
			// Show a success message to your buyer
			this.props.onPaymentApprove(details,data);
			console.log('Transaction completed by ' + details.payer.name.given_name, details);
		});
	}

	onError(err) {
		console.log(err);
	}

	render() {
		const PayPalButton = this.PayPalButton || '';
		const { fetchingPaypalButton } = this.state;
		return (
			<div className="paypal-buttons-container">
				{fetchingPaypalButton && <Spinner />}
				{ this.PayPalButton && <PayPalButton
					style = {{
						layout:  'vertical',
						color:   'blue',
						shape:   'pill',
						label:   'pay',
						tagline: false
					}}
					createOrder={ (data, actions) => this.createOrder(data, actions) }
					onApprove={ (data, actions) => this.onApprove(data, actions) }
					onError = {(err)=> this.onError(err)}
				/>}
			</div>
		)
	}


}
