import React , { Component } from 'react';
import PropTypes from 'prop-types';
import Company from '../containers/Companies/Company';

class CompanyDetailPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
			<Company {...this.props}/>
        );
    }

}

export default CompanyDetailPage;
