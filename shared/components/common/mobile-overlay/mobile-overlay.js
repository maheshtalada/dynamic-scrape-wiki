import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

export default class MobileOverlay extends Component {
    constructor(props) {
        super(props);
    };

    static propTypes = {
        isCloseRequired : PropTypes.bool
    };

    static contextTypes = {
        i18n : PropTypes.object
    };

    static defaultProps = {
        isCloseRequired : true
    };

    render() {
        const { className, children, onCloseOverlay, isCloseRequired } = this.props;
        const { l } = this.context.i18n;
        return (
            <div className={Cx("mobile-overlay",className,{'no-close': !isCloseRequired})}>
                {isCloseRequired && 
                    <div className="flex flex-justify-center mobile-overlay__close-wrap">
                        <button className="mobile-overlay__close btn btn-default" onClick={onCloseOverlay}>{l('CLOSE')}</button>
                    </div>}
                {children}
            </div>
        )
    }
}
