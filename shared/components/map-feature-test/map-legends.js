import React, {Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { getValueByLocale, formatCurrency } from '../../utils/localeUtil';
import Cx from 'classnames';

export default class MapLegends extends Component {

    static contextTypes = {
        screenSize : PropTypes.number,
        i18n : PropTypes.object,
        country : PropTypes.string
    }

    static propTypes = {
        legendBoxConfig : PropTypes.object,
        tooltipMsg : PropTypes.string
    }

    constructor(props,context) {
        super(props);
        this.state = {
            showCollapsedView : context.screenSize === 1
        }
        this.onToggleCollapseLegends = this.onToggleCollapseLegends.bind(this);
    }

    textFormatter({displayValue, postFix}) {
        const { l } = this.context.i18n;
        if(this.state.showCollapsedView) {
            return l(displayValue);
        }
		return `${l(displayValue)} ${postFix ? `(${l(postFix)})` : ''}`;
	}

	priceFormatter(value) {
		const { country, i18n: {l} } = this.context;
		const currencyFormat = getValueByLocale(country,'currencyFormat');
		const currencySymbol = getValueByLocale(country,'currencySymbol');
		return `${currencySymbol}${formatCurrency(value,2,currencyFormat)}`;
	}

	percentFormatter(value,config) {
		const formattedValue = this.numberFormatter(value,config);
		return `${formattedValue}%`
	}

	defaultFormatter(value,config) {
		const { l } = this.context.i18n;
		return `${l(value)} ${config.postFix ? l(config.postFix) : ''}`;
	}

	numberFormatter(value,config) {
		const toFix = config.toFix === undefined ? 2 : config.toFix;
		return Number(value).toFixed(toFix);
	}

    endRangeFormatter({displayValue, type},config) {
        const { mapRangeLegends } = this.props;
        // if(this.state.showCollapsedView) {
        //     return type === 'low' ? this[config.displayValueFormatter](mapRangeLegends[displayValue[0]],config) : '';
        // }
		return `${type === 'low' ? '<' : '>'} ${this[config.displayValueFormatter](mapRangeLegends[displayValue[0]],config)}`;
	}

	rangeFormatter({displayValue},config) {
        const { mapRangeLegends } = this.props;
        if(this.state.showCollapsedView) {
            return config.higherEndFirst ? this[config.displayValueFormatter](mapRangeLegends[displayValue[0]],config) : this[config.displayValueFormatter](mapRangeLegends[displayValue[1]],config);
        }
		return `${this[config.displayValueFormatter](mapRangeLegends[displayValue[0]],config)} - ${this[config.displayValueFormatter](mapRangeLegends[displayValue[1]],config)}`;
    }
    
    onToggleCollapseLegends() {
        this.setState({
            showCollapsedView : !this.state.showCollapsedView
        });
        // localStorage.setItem("map-legends-collapse",!this.state.showCollapsedView);
    }


    render() {
        const { i18n : {l}, screenSize } = this.context;
        const { legendBoxConfig, tooltipMsg } = this.props;
        const { showCollapsedView } = this.state;
        return (
            <div id="medianColorPolation" className={Cx("median-maps-color-polation flex flex-justify-center",{'collapsed' : showCollapsedView})}>
                {!showCollapsedView && <div className="median-maps-color-polation-wrapper">
                    <div className="legends-title-wrap flex flex-justify-between flex-align-center">
                        <span>{l(legendBoxConfig.title)}</span>
                        <div className="tooltip-icon" data-place="top" data-tip={l(tooltipMsg)}>
                            <i className="pe-7s-help1"/>
                        </div>
                        <div>
                            <button className="legends-collapse-btn" onClick={this.onToggleCollapseLegends}><i className="pe-7s-less"/></button>
                        </div>
                    </div>
                    <ul className="flex flex-column">
                        {legendBoxConfig.legends.map(legend => {
                            return (
                                <li className="flex flex-align-center">
                                    <div className="color-box" style={{backgroundColor: legend.colorCode}}></div>
                                    <div className="legend-value">{this[legend.formatter](legend,legendBoxConfig.dataConfig)}</div>
                                </li>
                            )
                        })}
                    </ul>
                    {legendBoxConfig.note && <div className="legends-note">
                        {l(legendBoxConfig.note)}
                    </div>}
                </div>}
                {showCollapsedView && <div className="median-maps-color-polation-wrapper">
                    <div className="legends-title-wrap flex flex-justify-between flex-align-center">
                        <span>{l(legendBoxConfig.title)}</span>
                        <div className="tooltip-icon" data-place="top" data-for={l(legendBoxConfig.title)} data-tip={l(tooltipMsg)}>
                            <i className="pe-7s-help1"/>
                        </div>
						<ReactTooltip place="top" key={l(legendBoxConfig.title)} id={l(legendBoxConfig.title)} type="light" effect="solid" />
                        <div>
                            <button className="legends-collapse-btn" onClick={this.onToggleCollapseLegends}><i className="pe-7s-plus"/></button>
                        </div>
                    </div>    
                    <div className="legends-wrap">
                        <ul className="flex">
                            {legendBoxConfig.legends.map(legend => {
                                return (
                                    <li className="flex flex-column">
                                        <div className="color-box" style={{backgroundColor: legend.colorCode}}></div>
                                        <div className="legend-value">{this[legend.formatter](legend,legendBoxConfig.dataConfig)}</div>
                                    </li>
                                )
                            })}
                        </ul> 
                    </div>
                </div>}
            </div>
        )
    }
}
