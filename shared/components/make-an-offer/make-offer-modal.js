import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common/button';
import { connect } from 'react-redux';
import Cx from 'classnames';
import Spinner from '../common/spinner/spinner';
import { REQUEST_MAKE_AN_OFFER } from '../../redux/actions/properties';
import makeofferschema from './make-an-offer-schema.json';
import { Schema } from '../schema';
import CaptchaComponent from 'components/common/captcha/captcha';
import { extend , isEmpty} from 'lodash';

class MakeOfferModal extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			makeOfferResponse : {},
			modifiedValues : {},
			initialValues: {},
		};
		this.onSubmit = this.onSubmit.bind(this);

	}

	componentWillReceiveProps(props) {
		this.setState({
			makeOfferResponse : props.makeOfferResponse
		});
		if(props.makeOfferResponse.status === "success" && this.makeOfferNotified === false) {
			this.makeOfferNotified = true;
			this.props.removeModal();
			//this.props.successCallback();
		}
	}

	renderSchema() {
		const { i18n, country } = this.context;
		return (
			<Schema
				l={i18n.l}
				country = {country}
				ref="schema"
				data={makeofferschema}
				writeMode={true}
				updateonPropsChange={true}
				onChange={this.onSchemaChange.bind(this)}
				modifiedValues={this.state.modifiedValues}
				initialValues={this.state.initialValues}
			/>
		);
	}

	render() {
		const { makeOfferResponse, isCaptchaError = false } = this.state;
		const { l } = this.context.i18n;
		const { className, makeOfferText='MAKEANOFFERTITLE' } = this.props;
		return (
			<div className={Cx("email-modal__content",className)}>
				{this.renderSchema()}
				<textarea className="email-modal__content__msg-text" placeholder={l("MAKEANOFFERDEFAULTMESSAGE")} ref="textareaEl" rows="5"/>
				<CaptchaComponent
					onChange = { value => this.setState({captchaValue : value})}
					onLoad ={ text => this.setState({captchaText : text})}
					error={isCaptchaError}/>
				<div className="share-via-email__disclaimer">{l('OFFERINTENTDESCLAIMER')}</div>
				<div className="email-modal__content__send-email">
					<Button onClick={this.onSubmit} data-tag-category="Ready to Invest Contact Actions" data-tag-action="Contact Actions Click" data-tag-label="Ready to Invest Confirmation">{l('CONFIRM')}</Button>
					<Button btnClassName="btn-default" onClick={this.props.removeModal} data-tag-category="Ready to Invest Contact Actions" data-tag-action="Contact Actions Click" data-tag-label="Ready to Invest Cancel">{l('CANCEL')}</Button>
					{makeOfferResponse.isFetching && <Spinner />}
				</div>
			</div>
		)
	}

	onSchemaChange(changeObject, hasErrors) {
		this.setState({
			changeObject,
			hasErrors
		});

		this.refs[`schema`] && this.refs[`schema`].rebuild();
	}

	onSubmit() {
		const { listingId } = this.props;
		let schemasAreValid = true;
		const { country } = this.context;

		if (!this.refs.schema.checkSubmissionValid()) {
			schemasAreValid = false;
		}
		if (schemasAreValid) {
			if(this.state.captchaValue != this.state.captchaText) {
				return this.setState({
					isCaptchaError : true
				});
			} else {
				const message = this.refs.textareaEl.value;
				this.makeOfferNotified = false;
				const payload = {
					...extend({},this.state.initialValues,this.state.modifiedValues),
					message,
					listingIds : [listingId]
				};
				this.props.dispatch(REQUEST_MAKE_AN_OFFER({...payload}));
			}

		} else {
			setTimeout(()=>{
				this.setState({
					isCaptchaError  : this.state.captchaValue != this.state.captchaText
				});
			},200);
		}
	}

}

const mapStateToProps = ({ properties }) => {
	return {
		makeOfferResponse : properties.make_offer_response || {}
	};
};

export default connect(mapStateToProps)(MakeOfferModal);

