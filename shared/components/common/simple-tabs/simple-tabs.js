import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

export default class SimpleTabs extends Component {

    static contextTypes = {
        i18n : PropTypes.object
    }

    static defaultProps = {
        analyticsData : {}
    }

    constructor(props) {
        super(props);
        this.state = {
            active : props.selected || props.tabs[0].name
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            active : this.state.active || props.selected
        });
    }

    onTabChange = (tab) => {
        this.setState({
            active : tab.name
        },() => {
            this.props.onChange(tab);
        });
    }

    render() {
        const { className, tabs, analyticsData : { category, label } } = this.props;
        const { l } = this.context.i18n;
        return (
            <div className={Cx("simple-tabs",className)}>
                <div className="simple-tabs__tabs-wrap flex flex-align-center">
                    {tabs.map(tab => {
                        return (
                            <button data-tag-category={category} data-tag-action='click' data-tag-label={`${label} ${l(tab.label)}`} key={tab.label} onClick={()=>this.onTabChange(tab)} className={Cx("simple-tabs__tabs-wrap__tab-btn",{'active': this.state.active === tab.name})}>
                                {l(tab.label)}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
}