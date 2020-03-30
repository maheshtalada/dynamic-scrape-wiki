import React, { Component} from 'react';
import PropTypes from 'prop-types';
import TextEditor from '../text-editor/text-editor';
import { Button } from '../common/button';

export default class SaveAnswer extends Component {

	static propTypes = {
		answer : PropTypes.string,
		onPostAnswerClick : PropTypes.func,
		isEdit : PropTypes.bool,
		onCancelClick : PropTypes.func,
		user : PropTypes.object,
		questionId : PropTypes.string
	};

	static defaultProps = {
		answer : '',
		onPostAnswerClick : ()=>{},
		onCancelClick : ()=>{}
	};

	static contextTypes = {
		router:PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			answer : props.answer,
			isEdit : props.isEdit
		}

	}

	componentWillReceiveProps(props) {
		this.state = {
			answer : props.answer,
			isEdit : props.isEdit
		}
	}

	handleEvents(external, answer) {
		external && external(answer)
	}

	render() {
		const { l } = this.context.i18n;
		const { answer, isEdit }  = this.state;
		const { questionId, user } = this.props;
		const imageUploadDirectory = `${questionId}/question`;
		return (
			<div className="answer__submit-form">
				<TextEditor
					onChange={(text)=>{
						this.setState({
							answer: text
						})
					}}
					value = {answer}
					placeholder={l('WRITEYOURANSWER')}
					imageServerPayload={{
						directory : imageUploadDirectory,
						thumbnail : 'false',
						userid : user.id
					}}
				/>
				<div className="answer__submit-form__actions">
					<Button btnClassName="btn-sm btn-primary" onClick={()=>this.handleEvents(this.props.onPostAnswerClick, answer)}>{ isEdit ? l('UPDATEANSWER') : l('POSTANSWER')}</Button>
					<Button btnClassName="btn-sm btn-primary" onClick={()=>this.handleEvents(this.props.onCancelClick, answer)}>{l('CANCEL')}</Button>
				</div>
			</div>
		);
	}


}


