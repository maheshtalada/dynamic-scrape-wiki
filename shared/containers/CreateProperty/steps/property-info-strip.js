import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import { formatArea } from 'utils/searchUtil';
import moment from 'moment';
import { sprintf } from 'utils';
import { Link } from 'react-router';
import appConstants from 'utils/app-constants';

const MainInfo = ({propertyDetails, l, country}) => {
    const livingArea = formatArea(propertyDetails.livingArea,l,country,propertyDetails.livingAreaUOM);
    const lotArea = formatArea(propertyDetails.lotArea,l,country,propertyDetails.lotAreaUOM);
    const purchaseDetail = propertyDetails.cashPurchaseDetail || propertyDetails.leveragedPurchaseDetail;
    const purchaseYear = purchaseDetail && moment(purchaseDetail.purchaseDate,"DD/MM/YYYY").year();
    return (
        <div className="main-hero-prime-info">
            <ReactTooltip />
            {livingArea && <div className="item area" data-tip={l('SQUAREFOOTAGE')}>
                <i className="pe-7s-area-sqft"/>
                <div className="flex flex-align-end">
                    <span>{livingArea.formattedValue}</span>
                    <span className="uom">{livingArea.uom}</span>
                </div>
            </div>}
            {!!propertyDetails.bedrooms && <div className="item" data-tip={l('BEDROOM')}>
                <i className="pe-7s-bed-1"/>
                {propertyDetails.bedrooms}
            </div>}
            {!!propertyDetails.bathrooms && <div className="item" data-tip={l('BATHROOM')}>
                <i className="pe-7s-bathroom"/>
                {propertyDetails.bathrooms}
            </div>}
            {lotArea && <div className="item area">
                <i className="pe-7s-industrial-fenced-yard" data-tip={l('LOTAREA')}/>
                <div className="flex flex-align-end">
                    <span>{lotArea.formattedValue}</span>
                    <span className="uom">{lotArea.uom}</span>
                </div>
            </div>}
            {purchaseYear && <div className="item">
                <i className="pe-7s-date2" data-tip={l('YEARPURCHASED')}/>
                {purchaseYear}
            </div>}
        </div>
    )
}

const PdfActions = ({ screenSize, renderSharePdfEmail, onExportToPdf, l}) => {
    return (
        <Fragment>
           {screenSize > 2 && <button className="btn btn-default btn-sm" data-tag-category='PDF Export Actions' data-tag-action='Click' data-tag-label='My Portfolio' onClick={onExportToPdf}><i className="pe-7s-bookmark-2" /> {l('EXPORTTOPDF')}</button> }
            {screenSize > 2 && renderSharePdfEmail()} 
        </Fragment>
    )
}

export default (props) => {
    const { isPortfolioView, id, propertyDetails, l, screenSize, name, renderViewSwitchTabs, onExportToPdf, renderSharePdfEmail, isReviewStep } = props;
    let propertyName = name;
    if(propertyDetails) {
        propertyName = propertyDetails.name ? propertyDetails.name : (propertyDetails.address && propertyDetails.address.formattedAddress)
    }
    return (
        <div className="cash-return-modal__property-details">
            {renderViewSwitchTabs ? renderViewSwitchTabs() : <div></div>}
            {isPortfolioView ?
                <div className="review-step__portfolio-view-actions">
                    <Link target="_blank" to={sprintf(appConstants.EDIT_MY_PROPERTY_TRANSACTION_LINK,id)} className="btn btn-sm btn-primary no-underline"><i className="pe-7s-note" />{l('EDIT')}</Link>
                    <PdfActions screenSize={screenSize} l={l} renderSharePdfEmail={renderSharePdfEmail} onExportToPdf={onExportToPdf}/>
                </div> :
                <div className="flex flex-align-center review-step__property-detail-wrap">
                    {isReviewStep && <PdfActions screenSize={screenSize} l={l} renderSharePdfEmail={renderSharePdfEmail} onExportToPdf={onExportToPdf}/>}
                    {propertyName && <div className="property-details__address">
                        <i className="pe-7s-preferred-location"/>
                        <address>
                            <div className="property-details__address__line-one">
                                {propertyName}
                            </div>
                        </address>
                    </div>}
                    {propertyDetails && <MainInfo {...props}/>}
                </div>
            }
        </div>
    );
}
