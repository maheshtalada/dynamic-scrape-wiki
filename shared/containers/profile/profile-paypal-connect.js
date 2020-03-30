import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import PaypalConnectButtons from 'components/paypal-buttons/paypal-connect-buttons.js';

class ProfilePaypalConnect extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			
		};
		
	}

	componentWillReceiveProps(props) {
		
	}

	

	render() {
		const { l } = this.context.i18n;
		const { isSaving } = this.state;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__profile-wrapper">
					<div className="profile-page__layout__profile-section__profile-wrapper__header">
						<h1 className="profile-page__layout__profile-section__profile-wrapper__title">
							{l('CONNECTPAYPAL')}
						</h1>
					</div>
					{
						isSaving && <Loader/>
                    }
                    <div className="profile-page_paypal-connect">
                        <h2>Link your PayPal Account to receive funds into your account.</h2>
                        <div className="flex flex-justify-center profile-page_paypal-connect__btn-wrap">
                            <PaypalConnectButtons location={this.props.location} returnUrl={window.location && window.location.href}/>
                        </div>
                        <div>
                            When tenants apply for your rental listings, PropsHub will collect the rental application fees designated by you. Once payment is received, PropsHub will deduct the applicable payment gateway charges plus a transaction fee of $2.00 and credit the remaining amount to your PayPal account.
                        </div>
                    </div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		connectPaypal: userprofile.connect_paypal
	};
};
export default connect(mapStateToProps)(ProfilePaypalConnect);
