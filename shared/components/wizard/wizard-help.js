import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { findDOMNode } from 'react-dom';

export default class WizardHelp extends Component {

    static contextTypes = {
        i18n : PropTypes.object
    }

    constructor(props) {
        super(props);
        this.toggleBoxOpen = this.toggleBoxOpen.bind(this);
        this.handleBodyClick = this.handleBodyClick.bind(this);
        this.state = {
            open : false
        }
    }

    componentDidMount() {
		window.addEventListener('click', this.handleBodyClick);
    }
    
    componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
	}

    toggleBoxOpen() {
        this.setState(prevState => {
            return {
                open : !prevState.open
            }
        })
    }

    render() {
        const { className, config } = this.props;
        const { open } = this.state;
        const { l } = this.context.i18n;
        return (
            <div className={Cx("wizard-help",className)}>
                <a href="javascript:void(0)" className="flex flex-justify-center flex-align-center wizard-help__click-link" onClick={this.toggleBoxOpen} aria-expanded={!!open} role="tab">
                    <i className="pe-7s-help1"/>
                </a>
                {open && <div className="wizard-help__box">
                    <div className="wizard-help__box__title">
                        {config.tips[0].title}
                    </div>
                    <div dangerouslySetInnerHTML={{__html: config.tips[0].description}}></div>
                </div>}
            </div>
        )
    }

    handleBodyClick(evt) {
		if(!findDOMNode(this).contains(evt.target)) {
			this.setState({
				open : false
			});
		}
	}
}