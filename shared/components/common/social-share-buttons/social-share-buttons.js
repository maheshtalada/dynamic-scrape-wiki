import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import ShareViaEmail from '../../share-via-email';
import Cx from 'classnames';
/*import {triggerListHubEvent} from '../../../utils/propertyUtil';*/
import Spinner from '../spinner/spinner';
import loadable from '@loadable/component';
import { findIndex as _findIndex } from 'lodash';
import MobileOverlay from 'components/common/mobile-overlay/mobile-overlay';

const Share = loadable(() => import(/* webpackChunkName: 'share' */'./share.js'),{
	LoadingComponent: Spinner,
});

const SHARE_BUTTONS_WRAP_HEIGHT = 160;

export default class SocialShare extends Component {

	static propTypes = {
		shareOptions : PropTypes.object,
		shareUrl : PropTypes.string,
		title : PropTypes.string,
		imagePath : PropTypes.string,
		options : PropTypes.object
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	static defaultProps = {
		shareOptions : {},
		shareUrl : !frameworkGlobals.isServer ? window.location.href : '',
		title : '',
		imagePath : '',
		options : [],
		context : ''
	};

	constructor(props) {
		super(props);
		this.state = {
			showShareOptions: false,
			shareWrapperPosition: props.shareWrapperPosition || 'bottom'
		};
		this.toggleShow = this.toggleShow.bind(this);
		this.closeShareOptions = this.closeShareOptions.bind(this);
		this.handleBodyClick = this.handleBodyClick.bind(this);
		//this.onClickShareButton = this.onClickShareButton.bind(this);
	}

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	componentDidMount() {
		window.addEventListener('click', this.handleBodyClick);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
	}

	/*onClickShareButton(network) {
		const listHubEvents = {
			'facebook' : 'SHARED_FACEBOOK',
			'twitter' : 'SHARED_TWITTER',
			'googlePlus' : 'SHARED_GOOGLE_PLUS',
			'pinterest' : 'SHARED_PINTEREST',
			'whatsapp' : 'SHARED_MOBILE'
		};
		triggerListHubEvent(listHubEvents[network],this.props.mlsListing);
	}*/

	toggleShow() {
		let position = this.state.shareWrapperPosition;
		if(this.refs.shareButton.getBoundingClientRect().bottom + SHARE_BUTTONS_WRAP_HEIGHT > window.innerHeight) {
			position = 'top';
		}
		this.setState({
			showShareOptions: !this.state.showShareOptions,
			shareWrapperPosition: position
		})
	}

	closeShareOptions() {
		this.setState({
			showShareOptions: false
		})
	}

	enableShareOption(shareOptions, network) {
		return _findIndex(shareOptions, { network : network}) > -1 && true;
	}

	renderShareOptions() {
		const { options, shareUrl, title, imagePath } = this.props;
		const { showShareOptions, shareWrapperPosition } = this.state;
		return (
			<div className={Cx("social-share",shareWrapperPosition,{ 'show' : showShareOptions})}>
				{<button className="social-share__close" onClick={this.closeShareOptions}>
					<i className="pe-7s-close-3"/>
				</button>}
				{ this.enableShareOption(options, 'email') && <div className="social-share__network email">
					<ShareViaEmail {...this.props} shareUrl={shareUrl}/>
				</div>}
				<Share {...this.props}/>
			</div>
		)
	}

	render() {
		const { i18n : {l} , screenSize } = this.context;
		const { iconOnly, context, btnText='SHARE', btnClass='btn-default btn-sm', showOptionsInOverlay } = this.props;
		return (
			<div className="social-share-wrap">
				<button ref="shareButton" className={Cx("social-share-wrap__share-btn btn",btnClass,{'icon-only': iconOnly})} onClick={this.toggleShow}>
					<i className="pe-7s-share-2 social-share-wrap__share-btn__icon" data-for="contact-actions-tooltips" data-tip={l('SHARE')}/>
					<span className="social-share-wrap__share-btn__text">{l(btnText)}</span>
				</button>
				{(this.state.showShareOptions) && (showOptionsInOverlay ?
					<MobileOverlay className="sort-options-overlay" onCloseOverlay={()=>{
						this.setState({
							showShareOptions : false
						});
					}}>
						{this.renderShareOptions()}
					</MobileOverlay> :
					this.renderShareOptions())
				}
			</div>
		);
	}

	handleBodyClick(evt) {
		if(!findDOMNode(this).contains(evt.target)) {
			this.closeShareOptions();
		}
	}

}
