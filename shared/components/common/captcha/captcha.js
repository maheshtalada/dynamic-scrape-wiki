import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { TextComponent } from '../../schema';

const DEFAULT_FONT_SIZE= 38;
export default class CaptchaComponent extends Component {

	static captchaConfig(fontSize)  {
		return {
			method : 'GET',
			url : `/api/v1/captcha?fontSize=${fontSize}`,
			headers : {
				'Content-Type' : 'application/json'
			}
		}
	};

	static defaultProps = {
		fontSize : DEFAULT_FONT_SIZE
	};

	static getErrorStatus(value, text, error) {
		if(error && value.length === 4 && value === text){
			return false
		}
		return error
	}

	constructor(props) {
		super(props);
		this.state = {
			captcha :  {
				text : '',
				data : ''
			},
			value : ''
		};
		this.storeValue = this.storeValue.bind(this);
	}

	componentWillReceiveProps(props) {
		const { value, captcha } = this.state;
		this.setState({
			error :  CaptchaComponent.getErrorStatus(value, captcha.text, props.error)
		})
	}

	async componentDidMount(){
		try {
			const { fontSize } = this.props;
			const captcha = await axios(CaptchaComponent.captchaConfig(fontSize));
			this.setState({captcha : captcha.data});
			this.props.onLoad(captcha.data.text);
		} catch (e) {
			console.log(e)
		}
	}

	storeValue(id, value) {
		value = value.toUpperCase();
		this.setState({value}, ()=>this.props.onChange(value))
	}

	render() {
		const { isDisplayTopLabel = true } = this.props;
		const { captcha, value = '', error = '' } = this.state;

		return (
			<div className="captcha">
				<TextComponent
					data = {{value}}
					isDisplayTopLabel={isDisplayTopLabel}
					error= {error && ' ' || ''}
					label="Type the characters shown"
					writeMode={true}
					l={label => label}
					classNames={['schema__text', 'captcha__text']}
					storeValue={this.storeValue}
					validation={[
						{
							"type": "required",
							"message": "ENTERVALIDTEXTSHOWEDINTHEBOX",
							"value": "ENTERVALIDTEXTSHOWEDINTHEBOX"
						}
					]}
				/>
				<div className="captcha__svg-text" style={{width: '90px',
					padding: '4px 4px 0 4px',
					border: '1px solid'}} dangerouslySetInnerHTML={{__html: captcha.data}} />
			</div>
		)
	}
}
