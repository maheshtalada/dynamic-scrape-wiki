import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import loadable from '@loadable/component';
import { getPropertyNameFromGooglePlace, getAddressComponent, getZipFromAddress } from 'utils/placesAPIUtil';

const LocationSearch = loadable(() => import(/* webpackChunkName: 'LocationSearch' */'components/common/location-search/location-search'));

export default class AnalyzeReturnAddressBar extends Component {
    
    constructor(props) {
        super(props);
        this.onPlaceSelect = this.onPlaceSelect.bind(this);
        this.onClickAnalyze = this.onClickAnalyze.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.renderSearchBtnContent = this.renderSearchBtnContent.bind(this);
        this.renderNoMatchNote = this.renderNoMatchNote.bind(this);
        this.state = {
            noMatchNoteRequired : true
        }
    }

    componentWillReceiveProps(props) {
        const { analyze_returns_zestimate = {} } = props;
        if(analyze_returns_zestimate.propertyAddress !== this.props.analyze_returns_zestimate.propertyAddress) {
            this.setState({
                searchQueryValue : analyze_returns_zestimate.propertyAddress
            });
        }
    }

    static contextTypes = {
        i18n : PropTypes.object,
        screenSize : PropTypes.number,
        assetsPath : PropTypes.string
    }

    onPlaceSelect(place) {
        const lineOne = getPropertyNameFromGooglePlace(place);
        const zipCode = getAddressComponent(place.address_components,'postal_code','long_name');
        const latLong = `${place.geometry.location.lat()},${place.geometry.location.lng()}`;
        this.setState({
            searchQueryValue : place.formatted_address
        },() => {
            this.props.onPlaceSelect({
                lineOne,
                zipCode,
                latLong
            });
        });
    }

    onClickAnalyze(searchQuery) {
        this.triggerSearch(searchQuery);
    }

    onInputChange(searchQuery) {
        this.triggerSearch(searchQuery);
    }

    triggerSearch(searchQuery) {
        let zipCode = getZipFromAddress(searchQuery);
        let lineOne = searchQuery.replace(/usa|us/gi,'');
        let noMatchNoteRequired = true;
        
        if(searchQuery.lastIndexOf(zipCode) > 0 && searchQuery.length > 10) {
            lineOne = lineOne.replace(zipCode,'');
            this.props.onPlaceSelect({
                lineOne,
                zipCode,
                latLong : '22,33'
            });
            
            noMatchNoteRequired = false;
        }
        this.setState({
            noMatchNoteRequired,
            searchQueryValue : searchQuery
        });
    }

    renderSearchBtnContent() {
        const { i18n : {l}, assetsPath } = this.context;
        return (
            <span className="modal-search">
                {l('ANALYZE')}
            </span>
        );
    }

    renderNoMatchNote() {
        const { l } = this.context.i18n;
        return (
            <div className="metros-served-note">
                <p>{l('ROI_ADDRESS_PROMPT')}</p>
                <ul>
                    <li>{l('LINEONE')}</li>
                    <li>{l('UNITNUMBER')}</li>
                    <li>{l('CITY')}</li>
                    <li>{l('ZIPCODE')}</li>
                </ul>
            </div>
        );
    }

    render() {
        const { children, className } = this.props;
        const { i18n : { l }, screenSize } = this.context;
        const { noMatchNoteRequired, searchQueryValue } = this.state;
        return (
            <div className={Cx("container-quicksearch print-hide",className)}>
                <div className="search-widget-wrap">
                    <div className="search-widget-wrap__search-bar">
                        <i className="pe-7s-preferred-location search-widget-wrap__location-icon" />
                        <LocationSearch
                            gaTags={{
                                category : "Property lookup actions",
                                action : "Click",
                                label : "Zillow property lookup"
                            }}
                            searchQueryValue={searchQueryValue}
                            getPredictionsDelay={400}
                            searchCharMinLength={10}
                            placeTypes = {['address']}
                            placeHolder={l('ZILLOWPROPERTYLOOKUP')}
                            onPlaceSelect = {this.onPlaceSelect}
                            screenSize = {screenSize}
                            inputAutoFocus
                            onChange={this.onClickAnalyze}
                            onSearch={this.onClickAnalyze}
                            isNoMatchNoteRequired={noMatchNoteRequired}
                            renderNoMatchNote={this.renderNoMatchNote}
                            isRestrictMetrosRequired={false}
                            isPropertyLookupRequired = {false}
                            searchBtnContent={this.renderSearchBtnContent} />
                    </div>
                </div>
                {children}
            </div>
        );
    }
}
