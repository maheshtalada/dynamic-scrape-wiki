import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchWidget from './searchwidget';

export default class MobileSearchWidget extends SearchWidget {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        google: PropTypes.object,
		cityObj: PropTypes.object
    };

    static defaultProps = {
        cityObj: {},
        searchInputFocus : true
    };

    render() {
        const { l } = this.context.i18n;
        const { closeWidget } = this.props;
        return (
            <div className="mobile-search-widget">
                {this.renderSearchBar()}
                <div className="flex flex-justify-center mobile-search-widget__actions">
                    <button className="btn btn-primary" onClick={this.onSearch}>{l("SEARCH")}</button>
                    {/* <button className="btn btn-default" onClick={closeWidget}>{l("CLOSE")}</button> */}
                </div>
            </div>
        )
    }
}