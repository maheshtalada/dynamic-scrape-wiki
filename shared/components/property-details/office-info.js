import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { phoneNumberFormat } from '../../utils/String';

export default class OfficeInfo extends Component {

    static contextTypes = {
        i18n : PropTypes.object,
        awsImagePath: PropTypes.string,
        assetsPath : PropTypes.string,
        country: PropTypes.string
    };
    
    constructor(props) {
        super(props);
    }

    render() {
        const { officeName, officeEmailId, officePhoneNumber } = this.props.mlsListing;
        const { i18n : {l}, country } = this.context;
        const numberFormat = officePhoneNumber && phoneNumberFormat(officePhoneNumber,'OFFICE',country);
        return (
            <div className="property-details__realtor-info brokerage-firm-info">
                <div className="property-details__realtor-info__info-wrap">
					<div className="property-details__realtor-info__desc">
						<span className="property-details__realtor-info__name">
                            {officeName.toLowerCase()}
						</span>
						<span className="property-details__realtor-info__type">{l("OFFICE")}</span>
                        <div className="brokerage-firm-info__contact-details">
                            <div className="flex detail-row flex-justify-between">
                                <a href={`tel:${numberFormat}`} className="value phone">{numberFormat}</a>
                            </div>
                            {officeEmailId && <div className="flex detail-row flex-justify-between">
                                <div className="value"><a href={`mailto:${officeEmailId}`}>{officeEmailId}</a></div>
                            </div>}
                        </div>
					</div>
				</div>
            </div>
        )
    }
}
