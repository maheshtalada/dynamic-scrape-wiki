import React, { Component } from 'react';
import ReviewProperty from '../../containers/CreateProperty/steps/review';

export default class PortfolioPropertyView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, location, user, dispatch } = this.props;
        return (
            <ReviewProperty dispatch={dispatch} location={location} user={{user: user}} isPortfolioView={true} id={id} className='portfolio-property-summary'/>
        );
    }
}
