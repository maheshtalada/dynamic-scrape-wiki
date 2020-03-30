import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loader from '../page-loader/loader';
import Snackbar from '../snackbar/snackbar';
import loadable from '@loadable/component';
import { REQUEST_OPEN_SITE_FEEDBACK } from '../../../redux/actions/application';

const ErrorDisplay = ({ error }) => <div>Oups! {error.message}</div>
const FeedbackBox = loadable(() => import(/* webpackChunkName: 'FeedbackBox' */'./feedback-box'), {ErrorComponent: ErrorDisplay});

export default class SiteFeedback extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			feedbackBoxOpen : props.open,
			feedbackBoxMinimized : false,
			isSending : false,
			showSnackbar : false,
			defaultSubject : props.subject,
			title : props.title,
			listingId : props.listingId,
			brokerageFirmId : props.brokerageFirmId
		};
		this.closeFeedbackBox = this.closeFeedbackBox.bind(this);
		this.onFeedbackSent = this.onFeedbackSent.bind(this);
		this.feedbackSending = this.feedbackSending.bind(this);
		this.toggleFeedbackBox = this.toggleFeedbackBox.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			feedbackBoxOpen : props.open,
			defaultSubject : props.subject,
			title : props.title,
			listingId : props.listingId,
			brokerageFirmId : props.brokerageFirmId
		})
	}

	onFeedbackSent(response) {
		if(response.data && response.data.message === 'CREATED') {
			this.setState({
				isSending : false,
				feedbackSuccess : true,
				showSnackbar : true
			},() => {
				this.closeFeedbackBox();
			});
		} else {
			this.setState({
				isSending : false,
				feedbackSuccess : false,
				showSnackbar : true
			});
		}
	}

	render() {
		const { feedbackBoxOpen, feedbackBoxMinimized, isSending, feedbackSuccess, showSnackbar, defaultSubject, title, listingId, brokerageFirmId } = this.state;
		const { l } = this.context.i18n;
		const { user } = this.props;
		return (
			<div className="site-feedback">
				{ isSending && <Loader/> }
				<Snackbar active={showSnackbar}
						  onTimeout={() => {
							  this.setState({
								  showSnackbar : false
							  });}}
						  timeout={5000}
				>
					{l(`${feedbackSuccess ? 'FEEDBACKSENTSUCCESS' : 'FEEDBACKSENTFAIL'}`)}
				</Snackbar>
				<TransitionGroup enter={false}>
				{ feedbackBoxOpen &&
					<CSSTransition classNames="slide-left" timeout={{exit: 300}}>
					<FeedbackBox user={user}
								 minimized={feedbackBoxMinimized}
								 closeFeedbackBox={this.closeFeedbackBox}
								 feedbackSending={this.feedbackSending}
								 onFeedbackSent={this.onFeedbackSent}
								 defaultSubject={defaultSubject}
								 title={title}
								 listingId={listingId}
								 brokerageFirmId={brokerageFirmId}
								 toggleFeedbackBox={this.toggleFeedbackBox}/>
					</CSSTransition>
				}
				</TransitionGroup>
				{/*<button className="site-feedback__main-btn"
						onClick={()=>{this.toggleFeedbackBox('feedbackBoxOpen');}}>
					{l('SENDSITEFEEDBACK')}
				</button>*/}
			</div>
		);
	}

	feedbackSending() {
		this.setState({
			isSending : true
		});
	}

	closeFeedbackBox(evt) {
		// if(evt && evt.keyCode !== 27) {
		// 	return;
		// }
		this.props.dispatch(REQUEST_OPEN_SITE_FEEDBACK({
			open : false
		}))
	}

	toggleFeedbackBox(val) {
		this.setState((prevState) => {
			return {
				[val] : !prevState[val],
				'feedbackBoxMinimized' : val === 'feedbackBoxMinimized' ? !prevState[val] : false
			};
		});
	}
}
