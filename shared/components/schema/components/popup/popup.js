import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import Popup from './base-popup/popup';
import { Button } from '../../../common/button';

/**
 * @description Creates a popup component with link
 * @prop classNames {array} Additional classnames to be added to the component
 * @prop data {array} Additional props for component
 */

export default class PopupComponent extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array,
		data: PropTypes.object
	};

	static defaultProps = {
		classNames: ['schema__popup']
	};

	static actionHandlers = {

		 updatedNetIncome(evt) {
			 const { data, cloneKey } = this.props,
			 // get and replace values
			 { eventData } = data,
			 valueId = eventData.valueId.replace(/\*/, cloneKey),
			 replaceId= eventData.replaceId.replace(/\*/, cloneKey);
			 this.toggleOpenState(evt);
			 this.props.storeValue(replaceId, this.props.getDataByID(valueId))
		 }
	};

	constructor(props, context) {
		super(props, context);
		this.toggleOpenState = this.toggleOpenState.bind(this);
		this.state = {
			isOpen: props.data && props.data.isOpen || false
		};
	}

	toggleOpenState(event) {
		if (event) {
			event.preventDefault();
		}

		this.setState({
			isOpen:  !this.state.isOpen
		});
	}

	renderLabel() {
		return null;
	}

	renderPopup() {
		const { l } = this.context.i18n;
		const { data, children } = this.props;
		return (
			<Popup
				onClose={this.toggleOpenState}
				cancelText={data.cancelText||''}
				onAction={(event)=>PopupComponent.actionHandlers[data.eventName].call(this, event)}
			>
				<span className="popup-content-wrapper__logo-icon">
					<i className="icon-cob icon-info popup-content-wrapper__icon" />
				</span>
				<div className="popup-content-wrapper__content">
					<h3 className="popup-content-wrapper__heading">
						{data && l(data.title) || ''}
					</h3>
					<div className="popup-content-wrapper__message">
						{children}
					</div>
				</div>
			</Popup>
		);
	}

	renderLink(value) {
		const { l, data='' } = this.props;
		if(data.linkType &&  data.linkType === 'link') {
			return (
				<a
					href="#"
					className="schema__popup__link"
					onClick={this.toggleOpenState}
				>
					{l(value)}
				</a>
			)
		}

		return (
			<Button btnClassName="btn btn-primary" onClick={this.toggleOpenState}>
				{l(value)}
			</Button>
		);

	}

	renderValue(value) {
		const markup = [this.renderLink(value)];

		if (this.state.isOpen) {
			markup.push(this.renderPopup());
		}

		return super.renderValue(markup);
	}

}


