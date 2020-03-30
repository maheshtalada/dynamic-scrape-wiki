import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Resizable from 'react-resizable-box';
import PillsSuggestions from '../pills-suggestions/pills-suggestions';
import {buildQueryObject} from '../../../utils/searchUtil';
import { Button } from '../../common/button';
import axios from 'axios';
import cookie from 'react-cookie';
import ExpandIndicator from '../../common/expand-indicator/expand-indicator';
import loadable from '@loadable/component';
import { advertiseWithUs, reportIssue, becomePreferredVendor, companyUpdates } from './feedback-templates';
import { find as _find } from 'lodash';
import SiteConfig from '../../../config';

const { api, endpoints, cookies } = SiteConfig;
const ErrorDisplay = ({ error }) => <div>Oups! {error.message}</div>
const TextEditor = loadable(() => import(/* webpackChunkName: 'FeedbackBox' */'../../text-editor/text-editor'), {ErrorComponent: ErrorDisplay});

const FEEDBACK_POST_URL = `${api.protocol}://${api.host}:${api.port}${api.prefix}${endpoints.sendfeedback}`;
const TEXT_EDITOR_OPTIONS = [
	[{ 'header': [1, 2, false] }],
	['bold', 'italic', 'underline','strike', 'blockquote'],
	[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
	['link', 'image']
];
const TEXT_EDITOR_FORMATS = [
	'header',
	'bold', 'italic', 'underline', 'strike', 'blockquote',
	'list', 'bullet', 'indent',
	'link', 'image'
];

const SUBJECT_SUGGESTIONS = [
	{
		"label": "REPORTANISSUE",
		"placeholder": "REPORTISSUEPLACEHOLDER"
	},
	{
		"label": "REPORTINACCURACYESTIMATIONS",
		"placeholder": "REPORTISSUEPLACEHOLDER"
	},
	{
		"label": "PROVIDEFEEDBACK"
	},
	{
		"label": "NEEDBUYINGASSISTANCE"
	},
	{
		"label": "NEEDINVESTMENTADVICE"
	},
	{
		"label": "NEEDLOAN"
	},
	{
		"label": "NEEDINSURANCE"
	},
	{
		"label": "NEEDLEGALADVICE"
	},
	{
		"label": "ADVERTISEWITHUS",
		"template": advertiseWithUs
	},
	{
		"label": "BECOMEPREFERREDREALTOR",
		"template": becomePreferredVendor
	},
	{
		"label": "REQUESTCOMPANYUPDATE",
		"template": companyUpdates
	}
];

export default class FeedbackBox extends Component {
	static propTypes = {
		minimized : PropTypes.bool,
		closeFeedbackBox : PropTypes.func,
		onFeedbackSent : PropTypes.func,
		feedbackSending : PropTypes.func,
		defaultSubject : PropTypes.string,
		title : PropTypes.string
	};

	static defaultProps = {
		defaultSubject : '',
		title : 'SENDSITEFEEDBACK'
	};

	static contextTypes = {
		i18n : PropTypes.object,
		country : PropTypes.string,
		screenSize : PropTypes.number
	};

	constructor(props,context) {
		super(props);
		const { l } = context.i18n;
		this.suggestionsConfig = SUBJECT_SUGGESTIONS.map(suggestion => {
			return (
				{	
					'suggestion': l(suggestion.label),
					'template' : suggestion.template ? suggestion.template() : '',
					'placeholder' : suggestion.placeholder
				}
			)
		});
		const subjectConfig = _find(this.suggestionsConfig,{ suggestion : l(props.defaultSubject)});
		this.state = {
			username : cookie.load('anonymousUserEmailId') || '',
			content : subjectConfig ? subjectConfig.template : '',
			placeholder : subjectConfig ? subjectConfig.placeholder : '',
			usernameError : false,
			subject : props.defaultSubject,
			title : props.title,
			listingId : props.listingId,
			brokerageFirmId : props.brokerageFirmId
		};
		this.onClickSend = this.onClickSend.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeContent = this.onChangeContent.bind(this);
		this.onChangeSubject = this.onChangeSubject.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			subject : props.defaultSubject,
			title : props.title,
			listingId : props.listingId,
			brokerageFirmId : props.brokerageFirmId
		})
	}

	onChangeUsername(evt) {
		let error = false;
		if(evt.target.value.length === 0) {
			error = true;
		}
		this.setState({
			username : evt.target.value,
			usernameError : error
		});
	}

	onChangeContent(val) {
		this.setState({
			content : val
		});
	}

	onClickSend() {
		const { username } = this.state;
		const { user } = this.props;
		if( !user.user.isLogIn && !username) {
			this.setState({
				usernameError : true
			});
			return;
		}
		this.sendFeedback();
	}

	onChangeSubject(val) {
		const subjectConfig = _find(this.suggestionsConfig,{ suggestion : val});
		this.setState({
			subject : val,
			content : subjectConfig ? subjectConfig.template : this.state.content,
			placeholder : subjectConfig ? subjectConfig.placeholder : ''
		});
	}

	render() {
		const { i18n : {l}, screenSize } = this.context;
		const { minimized, user, defaultSubject, title } = this.props;
		const userId = user.user.id || '';
		const { usernameError, content, username, placeholder } = this.state;
		const imageUploadDirectory = userId ? `${userId}/siteFeedback` : 'siteFeedback';
		return (
			<Resizable className={`site-feedback__feedback-box ${minimized ? 'minimized' :''}`}
					   enable={{
						   top : false,
						   right : false,
						   bottom : false,
						   left : true,
						   topRight : false,
						   bottomRight : false,
						   bottomLeft : false,
						   topLeft : false
					   }}
					   width={screenSize === 1 ? '100%' : 550}
					   height="calc(100vh - 60px)">
				<ExpandIndicator titleText={l('EXPAND')}/>
				<div className="site-feedback__feedback-box__header">
					<h1>{l(title)}</h1>
					<div className="site-feedback__feedback-box__header__actions">
						<Button onClick={()=>{this.props.toggleFeedbackBox('feedbackBoxMinimized');}}>
							{minimized ? l('MAXIMIZE') : l('MINIMIZE')}
						</Button>
						<Button onClick={this.props.closeFeedbackBox}>
							{l('CLOSE')}
						</Button>
					</div>
				</div>
				<div className="site-feedback__feedback-box__content">
					{!user.user.isLogIn &&
						<div className="site-feedback__feedback-box__content__username">
							<label htmlFor="username">{l('FROM')} : </label>
							<input placeholder={l('EMAILID')} value={username} autoFocus={true} type="text" name="username" id="username" onChange={this.onChangeUsername}/>
						</div>
					}
					<div className="site-feedback__feedback-box__content__username">
						<label htmlFor="email-subject">{l('SUBJECT')} : </label>
					<PillsSuggestions id="email-subject"
									  minQueryLength={1}
									  isFullPill = {false}
									  translator = {l}
									  isAddNewPill={false}
									  suggestions={this.suggestionsConfig.map(s => s.suggestion)}
									  handleAddition={this.onChangeSubject}
									  handleInputChange={this.onChangeSubject}
									  updateInputValue={true}
									  defaultInputValue={l(defaultSubject)}
									  placeholder={l("PROVIDESUBJECT")}/>
					</div>
					<TextEditor onChange={this.onChangeContent}
								placeholder={placeholder ? l(placeholder) : l('FEEDBACKCONTENTMESSAGE')}
								imageServerPayload={{
									directory : imageUploadDirectory,
									thumbnail : 'false',
									userid : userId
								}}
								value={content}
								editorOptions={TEXT_EDITOR_OPTIONS}
								editorFormats={TEXT_EDITOR_FORMATS}/>
					{usernameError && <div className="alert alert-warning">{l('EMAILIDREQUIRED')}</div>}
					<Button onClick={this.onClickSend}>{l('SEND')}</Button>
					{ screenSize <=2 && <Button onClick={this.props.closeFeedbackBox}>
						{l('CLOSE')}
					</Button> }
				</div>
			</Resizable>
		);
	}

	async sendFeedback() {
		const { username, content, subject, listingId, brokerageFirmId } = this.state;
		const { user } = this.props;
		const { pathname, search } = window.location;
		const uri = `${pathname}${search}`;
		const { country, i18n : {l} } = this.context;
		const modifiedSubject = listingId ? `${l(subject)} for listing with id ${listingId}` : l(subject);
		const payload = buildQueryObject({
			pageUri : uri,
			comment : content,
			subject : modifiedSubject,
			listingId : listingId,
			brokerageFirmId : brokerageFirmId
		});
		if ( user.user.isLogIn ) {
			payload.userId = user.user.id;
		} else {
			payload.userName = username;
			cookie.save('anonymousUserEmailId',username, { secure : cookies.isSecure});
		}
		const config = {
			method : 'POST',
			url: FEEDBACK_POST_URL,
			headers : {
				'countrycode' : country
			},
			data : payload
		};
		try {
			this.props.feedbackSending();
			const response = await axios(config);
			this.props.onFeedbackSent(response);
		} catch (e) {
			this.props.onFeedbackSent(e);
		}
	}
}
