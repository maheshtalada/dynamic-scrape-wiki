import React from 'react';
import APPCONSTANTS from 'utils/app-constants';
const { ZILLOW_SITE_URL, ZESTIMATE_URL, ZILLOW_TERMS_URL, ZILLOW_LOGO_URL } = APPCONSTANTS;

export default function ZillowDisclaimer({address,link}) {
    return (
        <div className="zillow-disclaimer flex flex-justify-between flex-align-center">
            <div>
                © Zillow, Inc., 2006-2016. Use is subject to <a rel="noopener noreferrer" target="_blank" href={ZILLOW_TERMS_URL}>Terms of Use</a>
                <div>
                    <a target="_blank" rel="noopener noreferrer" href={ZESTIMATE_URL}>What's a Zestimate?</a>
                </div>
            </div>
            <div>
                <a target="_blank" href={ZILLOW_SITE_URL} rel="noopener noreferrer">
                    <img src={ZILLOW_LOGO_URL} width="200" height="50" alt="Zillow Real Estate Search" />  
                </a>
            </div>
        </div>
    )
}
