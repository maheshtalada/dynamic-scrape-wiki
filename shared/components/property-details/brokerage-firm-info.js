import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImagePath } from '../../utils/propertyUtil';
import { getAbsoluteUrl } from 'utils/urlUtil';
import BrokerageFirmContactDetails from './brokerage-firm-contact-details';

export default class BrokerageFirmInfo extends Component {

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
        const { profileURL, logo, name } = this.props.brokerageFirm;
        const { mlsListing } = this.props;
        const { i18n : {l}, awsImagePath, assetsPath } = this.context;
        return (
            <div className="property-details__realtor-info brokerage-firm-info">
                <div className="property-details__realtor-info__info-wrap">
					{/*logo && <a href={getAbsoluteUrl(profileURL)} title={l('CLICKTOVIEWPROFILE')} target="_blank">
						<div className="property-details__realtor-info__avatar">
							<img src={getImagePath(awsImagePath,logo)} alt={name} />
						</div>
                    </a>*/}
					<div className="property-details__realtor-info__desc">
						<span className="property-details__realtor-info__name">
                            <a href={getAbsoluteUrl(profileURL)} title={l('CLICKTOVIEWPROFILE')} target="_blank">{name.toLowerCase()}</a>
						</span>
						<span className="property-details__realtor-info__type">{l("BROKERAGEFIRM")}</span>
                        <BrokerageFirmContactDetails 
                            mlsListing={mlsListing}
							brokerageFirm={this.props.brokerageFirm}/>
					</div>
				</div>
                {/*<div className="brokerage-firm-info__view-contact-details">
                    <button className="btn btn-default" onClick={this.onClickHandler}>{l("CONTACTCOLLAPSIBLE")}</button>
        </div>*/}
            </div>
        )
    }
}