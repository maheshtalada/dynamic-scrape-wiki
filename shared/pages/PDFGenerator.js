import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forEach as _forEach, values as _values } from 'lodash';


import SiteConfig from '../config';

const { imageRootPath, assetsPath, mapServer } = SiteConfig;

if (process.env.BROWSER) {
	require('../assets/styles');
}

const DEFAULT_SIZE = 'infinity', // desktop & larger
	SCREEN_TYPES = {
		extraSmall : 1,
		small : 2,
		medium : 3,
		large : 4,
		infinity : 5
	};

const ErrorModalConfig = {
	'unauthorized' : {
		title : 'LOGIN'
	},
	'servererror' : {
		title : 'SERVERERROR'
	}
}

class PDFGenerator extends Component {

	static propTypes = {
		location : PropTypes.object,
		routes   : PropTypes.array,
		children : PropTypes.object,
		history  : PropTypes.object
	};

	static contextTypes = {
		width: PropTypes.number,
		awsImagePath: PropTypes.string,
		screenSize : PropTypes.number,
		country : PropTypes.string,
		hostname : PropTypes.string,
		visitorIP :PropTypes.string,
		location : PropTypes.object,
		visitorCountry :PropTypes.string,
		assetsPath : PropTypes.string,
		pageContext : PropTypes.string,
		i18n : PropTypes.object
	};

	isUnmounted = false;

	static childContextTypes = {
		width: PropTypes.number,
		awsImagePath: PropTypes.string,
		screenSize : PropTypes.number,
		country : PropTypes.string,
		hostname : PropTypes.string,
		visitorIP : PropTypes.string,
		location : PropTypes.string,
		visitorCountry :PropTypes.string,
		assetsPath : PropTypes.string,
		pageContext : PropTypes.string,
		i18n : PropTypes.object
	};

	constructor(props) {

		super(props);
		this.initialPageLoad = true;

		this.state = {
			chatUserStatus : {},
			siteFeedback : props.siteFeedback
		};

	}

	getChildContext() {
		const { device : {country, hostname, visitorIP, location, visitorCountry} , location : {pathname}, routes , width } = this.props;
		return {
			width : width,
			awsImagePath :imageRootPath,
			screenSize : this.getScreenSize(),
			country : country,
			hostname : hostname,
			visitorIP : visitorIP,
			location : location,
			visitorCountry : visitorCountry,
			assetsPath : assetsPath,
			pageContext : routes[1].pagename || pathname
		};
	}

	renderChildren(screenSize) {
		const { userLocation } = this.state;
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {...this.props, chatUserStatus:this.state.chatUserStatus , screenSize:screenSize, userLocation})
		);
		return childrenWithProps;
	}

	getScreenSize() {
		// get all values which is greaterThan - true
		const { lessThan, greaterThan,mediaType } = this.props.browser;
		if(_values(lessThan).indexOf(true) < 0 ) {
			return this.props.device.device;
		}
		let mediaConst =[];
		_forEach(greaterThan, (value , key)=> {
			if(value) {
				mediaConst.push(SCREEN_TYPES[key]);
			}
		});
		return SCREEN_TYPES[mediaType] || this.props.device.device || 4;
		// return mediaConst.length ? Math.max.apply(null,mediaConst) : 1;
	}

	getContainerClasses(headerRequired) {

	}

	render() {
		const screenSize = this.getScreenSize();
		const { chats, routes, user, location } = this.props;
		const { userLocation, siteFeedback } = this.state;
		const headerRequired = (routes[1] && !routes[1].headerNotRequired);
		const containerClasses = this.getContainerClasses(headerRequired);
		return (
			<div id="pdf-view">
				{this.renderChildren(screenSize)}
			</div>
		);
	}
}

const mapStateToProps = ({browser, application, user, chat}) => {
	return {
		browser : browser,
		emailSentResponse : application.email_sent_response || '',
		contactDetails : application.contact_details || '',
		device : application.device,
		errorState : application.error_state && application.error_state.error || '',
		registerRedirectUrl : application.registerLogin || '/',
		user : user,
		chats : chat.chatModals || [],
		siteFeedback : application.open_site_feedback || {}
	};
};

export default connect(mapStateToProps)(PDFGenerator);
