import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextComponent, TextareaComponent } from 'components/schema';
import CaptchaComponent from 'components/common/captcha/captcha';
import { Button } from 'components/common/button';
import Spinner from 'components/common/spinner/spinner';
import uniqueFormId from 'utils/uniqueFormId.js';
const DEFAULT_MESSAGE = 'I am interested in this property';
export default class ListingContact extends Component {
	static contextTypes = {
		i18n : PropTypes.object,
		screenSize : PropTypes.number,
		awsImagePath : PropTypes.string,
		assetsPath : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			form : {
				...props.form,
				message : {
					value : DEFAULT_MESSAGE,
					error : false
				},
				captcha : {
					value : '',
					error : false
				}
			}
		};

		this.onSendClick = this.onSendClick.bind(this);
	}

	componentWillReceiveProps(props) {
		const { listingContactEmailStatus = '' } = props;
		const prevProps = this.state;
		const { form } = prevProps;
		//to avoid circular loop
		// check new props & prev state
		this.setState({
			listingContactEmailStatus,
			form : listingContactEmailStatus.status === 'success' && Object.assign({...form} , {captcha : {value : ''}}) || form
		}, ()=>{
			if(listingContactEmailStatus && listingContactEmailStatus.status === 'success' && prevProps.listingContactEmailStatus.status !== 'success') {
				this.props.onEmailSent();
			}
		})
	}

	onSendClick() {
		const { form } = this.state;
		//check data is valid
		const errorForm = Object.assign({},form);
		let isError = false;
		const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		//String(' '); is to display no message
		// as we wanted to highlight the input box with red border
		if(errorForm.name.value === '') {
			errorForm.name.error = String(' ');
			isError = true;
		}

		if(errorForm.email.value === ''){
			errorForm.email.error = String(' ');
			isError = true;
		} else if(!errorForm.email.value.match(emailformat)){
			errorForm.email.error = 'Enter Valid Email ID';
			isError = true;
		}

		if(errorForm.message.value === ''){
			errorForm.message.error = String(' ');
			isError = true;
		}

		if(errorForm.message.value === ''){
			errorForm.message.error = String(' ');
			isError = true;
		}

		if(errorForm.captcha.value === '' || errorForm.captcha.value !== this.captchaText){
			errorForm.captcha.error = String(' ');
			isError = true;
		}

		if(isError) {
			return this.setState({
				form : errorForm
			})
		}

		this.props.onSendEmail(form, this.props.contactData);
	}

	render() {
		const { l } = this.context.i18n;
		const { form , listingContactEmailStatus = '' } = this.state;

		return (
			<div className="lead-realtors__wrap">
				<div className="lead-realtors__wrap__title">{l('INTERESTED')}</div>
				<div className="lead-realtors__wrap__body">
					<div className="lead-realtors__wrap__form">
						<TextComponent
							data = {{value : form.name.value}}
							error= {form.name.error}
							label="Your Name"
							isDisplayTopLabel={false}
							writeMode={true}
							l={label => label}
							storeValue={(id,value)=> this.setState({ form : Object.assign({...form} , {name : {value}})})}
							validation={[
								{
									"type": "required",
									"message": "ENTERVALIDTEXTSHOWEDINTHEBOX",
									"value": "ENTERVALIDTEXTSHOWEDINTHEBOX"
								}
							]}
						/>
						<TextComponent
							data = {{value : form.email.value}}
							error= {form.email.error}
							label="Your Email Id"
							isDisplayTopLabel={false}
							writeMode={true}
							l={label => label}
							storeValue={(id,value)=> this.setState({ form : Object.assign({...form} , {email : {value}})})}
							validation={[
								{
									"type": "required",
									"message": "ENTERVALIDTEXTSHOWEDINTHEBOX",
									"value": "ENTERVALIDTEXTSHOWEDINTHEBOX"
								}
							]}
						/>
						<TextareaComponent
							data = {{value : form.message.value}}
							error= {form.message.error}
							label="Type your message here"
							writeMode={true}
							isDisplayTopLabel={false}
							l={label => label}
							maxLength={1000}
							storeValue={(id,value)=> this.setState({ form : Object.assign({...form} , {message : {value}})})}
							validation={[
								{
									"type": "required",
									"message": "ENTERVALIDTEXTSHOWEDINTHEBOX",
									"value": "ENTERVALIDTEXTSHOWEDINTHEBOX"
								}
							]}
						/>

						<CaptchaComponent key={listingContactEmailStatus.status === 'success' ? uniqueFormId() : 'captcha'}
							fontSize = {26}
							isDisplayTopLabel={false}
							onChange = { value => this.setState({ form : Object.assign({...form} , {captcha : {value}})})}
							onLoad ={ text => this.captchaText = text}
							error={form.captcha.error}/>

						<Button data-tag-category='Share Actions' data-tag-action="Click" data-tag-label='Share' onClick={this.onSendClick}>
							{ listingContactEmailStatus && listingContactEmailStatus.status === 'sending' && <Spinner singleColor={true}/>}
							{l('SENDEMAIL')}
							</Button>
					</div>
				</div>
			</div>
		)
	}
}
