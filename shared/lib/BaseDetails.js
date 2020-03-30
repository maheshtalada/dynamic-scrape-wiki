import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import scrollToElement from '../utils/scrollToUtil';
import { throttle } from 'lodash';
import Advertisement from '../components/advertisement/advertisement';
import ExternalAdvertisement from '../components/advertisement/external-advertisement';
import { adbackground, adlogo } from '../assets/static/ads-component-config.json';
import ScrollFixed from '../components/common/scroll-fixed/scroll-fixed';

export default class BaseDetails extends Component {
	constructor(props) {
		super(props);
		this.timeOutInterval = undefined;
		this.handleScroll = this.handleScroll.bind(this);
		this.tabChange = this.tabChange.bind(this);
		this.hideEmailNotif = this.hideEmailNotif.bind(this);
		this.onEmailSentSuccess = this.onEmailSentSuccess.bind(this);
	}

	componentWillMount(props) {
		if(!frameworkGlobals.isServer) {
			this.innerHeight = window.innerHeight;
			this.innerWidth = window.innerWidth;
			//window.addEventListener('scroll', throttle(this.handleScroll,100));
		}

	}

	componentWillUnmount() {
		//window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		var section = document.querySelectorAll('.sections'),i=0,
			sections = {};

		if(section && section.length > 0 ) {
			[].forEach.call(section[0].childNodes, (div) => {
				sections[div.id] = div.offsetTop-70;
			});
			var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

			for (i in sections) {
				if (sections[i] <= scrollPosition) {
					this.setState({activeTab: Number(i.replace('tab',''))});
				}
			}
		}
	}

	hideEmailNotif() {
		this.setState({
			isShowEmailSentNotification : false
		})
	}

	onEmailSentSuccess(successText = "EMAILSENT") {
		this.setState({
			isShowEmailSentNotification : true,
			emailSuccessText : successText
		})
	}

	tabChange(tab) {
		// this.setState({ activeTab: tabId });
		scrollToElement(tab.tabHTMLId);
	}

	renderAdvertisement({adTitle, adInfo, metroServedLabel=''}, scrollPosition=0, isVendorLinkRequired, vendorLinkText) {
		const { l } = this.context.i18n;
		const { dispatch, screenSize} = this.props;
		return (
			screenSize > 1 ? <div className="property-details__right hidden-sm hidden-xs">
				<ScrollFixed scrollPosition={scrollPosition} top={60} className="property-details__right__scroll-fixed">
					<Advertisement
						adBg={adbackground}
						adTitle={l(adTitle)}
						adInfo={l(adInfo)}
						logo={adlogo}
						l={l}
					/>
					<ExternalAdvertisement vendorLinkText={vendorLinkText} isVendorLinkRequired={isVendorLinkRequired} dispatch={dispatch} metroServedLabel={metroServedLabel}/>
				</ScrollFixed>
			</div> : null
		);
	}
}
