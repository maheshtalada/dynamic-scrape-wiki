import React , { Component } from 'react';
import PropTypes from 'prop-types';
/*import Login from '../components/login/login';*/
import {modal} from 'react-redux-modal';
import SiteConfig from '../config';

const { api } = SiteConfig;


export default class LoginPage extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.changeLoginMode = this.changeLoginMode.bind(this);
		this.thirdPartyLoginHandler = this.thirdPartyLoginHandler.bind(this);
		this.state = {
			loginMode : 'Log In'
		}
	}

	componentDidMount() {
		const { l } = this.context.i18n;
		// setTimeout(()=>{
		// 	modal.add(Login, {
		// 		title: l('LOGIN'),
		// 		size: 'custom',
		// 		...this.props.user,
		// 		dispatch:this.props.dispatch,
		// 		hideTitleBar: false,
		// 		hideCloseButton: false,
		// 		changeMode: '',
		// 		initial : true,
		// 		screenSize : this.props.screenSize,
		// 		mode : 'Log In'
		// 	});
		// }, 500);
	}

	changeLoginMode(mode) {
		this.setState({
			loginMode : mode
		});
	}

	thirdPartyLoginHandler(token) {
		this.refs.accessTokenInput.value = token;
		this.refs.alexaForm.submit();
	}

	render() {
		const { l } = this.context.i18n;
		const { loginMode } = this.state;
		const { query } = this.props.location;
		return (
			<div className="external-login-page">
				<div className="col-md-10 col-lg-10 col-lg-push-1 col-lg-pull-1 col-md-push-1 col-md-pull-1">
					<div className="col-xs-12 col-md-12 col-lg-12">
						{/*{!frameworkGlobals.isServer && <Login title= {l('LOGIN')}
								size='custom'
							   {...this.props.user}
								dispatch={this.props.dispatch}
								hideTitleBar={false}
								hideCloseButton={false}
								changeMode={this.changeLoginMode}
								initial = {true}
								screenSize = {this.props.screenSize}
							  	location = {this.props.location}
							  	isThirdPartyLogin={true}
								thirdPartyLoginHandler={this.thirdPartyLoginHandler}
								mode = {loginMode}/>}*/}
						<form method="POST" ref="alexaForm" className="hidden" action={`${api.protocol}://${api.host}/oauth/authorize`}>
							<input type="hidden" name="access_token" ref="accessTokenInput"/>
								<input type="hidden" name="response_type" value="code"/>
									<input type="hidden" name="redirect_uri" value={query.redirect_uri}/>
										<input type="hidden" name="state" value={query.state}/>
											<input type="hidden" name="client_id" value={query.client_id}/>
						</form>
					</div>
				</div>
			</div>
		);

	}

}
