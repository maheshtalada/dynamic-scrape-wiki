import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { phoneNumberFormat } from '../../utils/String';
import { triggerListHubEvent } from '../../utils/propertyUtil';

export default class BrokerageFirmContactDetails extends Component {
    static contextTypes = {
        i18n : PropTypes.object,
        awsImagePath: PropTypes.string,
        assetsPath : PropTypes.string,
        country: PropTypes.string
    };
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { mlsListing } = this.props;
        if(mlsListing) {
            triggerListHubEvent('OFFICE_PHONE_CALL',mlsListing);
        }
    }

    render() {
        const { i18n : { l }, country } = this.context;
        const { brokerageFirm } = this.props;
        return (
            <div className="brokerage-firm-info__contact-details">
            
                {brokerageFirm.contactNumbers && brokerageFirm.contactNumbers.map(number => {
                    const numberFormat = number.number && phoneNumberFormat(number.number,number.contactNumberType,country);
                    return (
                        <div className="flex detail-row flex-justify-between">
                            {/*<div className="label">{l(number.contactNumberType)}</div>*/}
                            <a href={`tel:${numberFormat}`} className="value phone">{numberFormat}</a>
                        </div>
                    )
                })}
                {brokerageFirm.emailId && <div className="flex detail-row flex-justify-between">
                    {/* <div className="label">{l('EMAIL')}</div> */}
                    <div className="value"><a href={`mailto:${brokerageFirm.emailId}`}>{brokerageFirm.emailId}</a></div>
                </div>}
                {/*brokerageFirm.websites && brokerageFirm.websites.length > 0 && brokerageFirm.websites.map(website => {
                    return (
                        <div className="flex detail-row flex-justify-between">
                            <div className="label">{l(website.websiteURLType)}</div>
                            <div className="value"><a target="_blank" href={website.url}>{website.url}</a></div>
                        </div>
                    )
                })*/}    
            </div>
        )
    }
}
