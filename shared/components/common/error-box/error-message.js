import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

class ErrorMessage extends Component {

    static contextTypes = {
        i18n : PropTypes.object
    }

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.state = {
            showMsg: true
        };
    }

    onClose() {
        this.setState({
            showMsg : false
        });
    }

    render() {
        const { errorCode, classNames } = this.props;
        const { showMsg } = this.state;
        const { l } = this.context.i18n;
        return(
            showMsg && <div className={Cx('error-message',classNames)}>
                {l(errorCode)}
                {<button className="error-message__close-btn" onClick={this.onClose}>
                    <i className='pe-7s-close-3' />
                </button>}
            </div>
        );
    }
}

export default ErrorMessage;
