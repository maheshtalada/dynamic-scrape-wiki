import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import Cx from 'classnames';

export default class ConfirmModal extends Component {

    static propTypes = {
        message : PropTypes.string,
        onAccept : PropTypes.func,
        onDecline : PropTypes.func
    }

    static contextTypes = {
        i18n : PropTypes.object
    }

    static defaultProps = {
        acceptText : 'YES',
        declineText : 'NO'
    }
    

    constructor(props) {
        super(props);
        this.onAccept = this.onAccept.bind(this);
        this.onDecline = this.onDecline.bind(this);
    }

    onAccept() {
        this.props.removeModal();
        this.props.onAccept();
    }

    onDecline() {
        this.props.removeModal();
        this.props.onDecline && this.props.onDecline();
    }

    render() {
        const { message, className, acceptText, declineText} = this.props;
        const { l } = this.context.i18n;
        return (
            <div className={Cx("email-modal__content",className)}>
                <h1 className="email-modal__content__title">{l(message)}</h1>
                <div className="email-modal__content__send-email">
                    <Button onClick={this.onAccept}>{l(acceptText)}</Button>
                    <Button btnClassName="btn-default" onClick={this.onDecline}>{l(declineText)}</Button>
                </div>
            </div>
        )
    }
}