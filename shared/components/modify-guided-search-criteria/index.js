import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { modal } from 'react-redux-modal';
import GuidedSearchCriteriaModal from './guided-search-criteria-modal';

export default class ModifyGuidedSearch extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {};
    }

    static contextTypes = {
        i18n : PropTypes.object
    }

    onClick() {
        const { location } = this.props;
        const { l } = this.context.i18n;
        modal.add(GuidedSearchCriteriaModal,{
            amount : location.query.amount,
            purchaseType : location.query.purchasetype,
            metroGeoIds : location.query.metrogeoid,
            location,
            size: 'medium',
            title : l('MODIFYSEARCH')
        });
    }

    render() {
        const { l } = this.context.i18n;
        const { analyticsData : {category, action, label} } = this.props;
        return (
            <button data-tag-category={category} data-tag-action={action} data-tag-label={label} className="modify-guided-search-btn btn btn-default" onClick={this.onClick}>{l('MODIFYSEARCH')}</button>
        )
    }
}
