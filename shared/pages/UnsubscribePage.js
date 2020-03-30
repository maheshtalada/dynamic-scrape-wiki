import React, { Component, Fragment } from 'react';
import Footer from '../components/footer/footer';
import Unsubscribe from '../containers/UserUnsubscribe/unsubscribe';

export default class UnsubscribePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Unsubscribe {...this.props}/>
                <Footer dispatch={this.props.dispatch}/>
            </Fragment>
        );
    }
}
