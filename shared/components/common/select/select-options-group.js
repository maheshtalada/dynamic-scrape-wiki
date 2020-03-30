import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

export default class SelectOptionsGroup extends Component {
    
    static contextTypes = {
        i18n : PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            showOptions : props.openSubOptions || false
        }
        this.toggleOptions = this.toggleOptions.bind(this);
    }

    toggleOptions() {
        this.setState({
            showOptions : !this.state.showOptions
        })
    }

    render() {
        const { tooltip, title, children } = this.props;
        const { l } = this.context.i18n;
        const { showOptions } = this.state;
        return (
            <li className="select-options-group-header">
                <button onClick={this.toggleOptions} className="flex flex-justify-between group-btn-wrap">
                    <div className="flex flex-align-center">
                        <div className="option">{l(title)}</div>
                        {tooltip && <i className="pe-7s-help1 tooltip" data-tip={l(tooltip)} data-for="select-options-tooltip"/>}
                    </div>
                    
                    <i className={Cx("group-header-icon",showOptions ? "pe-7s-angle-up-circle" : "pe-7s-angle-down-circle")}/>
                    
                </button>
                {showOptions && <ul className="select-options-group-list">
                    {children}
                </ul>}
            </li>
        )
    }
}