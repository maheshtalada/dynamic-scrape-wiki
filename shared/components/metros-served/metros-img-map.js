import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import metrosServedConfig from 'assets/static/metros-served-config';
/*import cookie from 'react-cookie';*/
import { pathToUrl } from 'utils/searchUtil';
import APPCONSTANTS from 'utils/app-constants';
import { Link } from 'react-router';
const { areasServed } = metrosServedConfig;
const { FORSALE, FORLEASE, REALTOR_SEARCH_TYPE} = APPCONSTANTS;

const SEARCH_CONFIG = {
	[FORSALE] : '/search/property/',
	[FORLEASE] : '/search/property/',
	[REALTOR_SEARCH_TYPE] : '/search/'
};

const MAX_WIDTH_890 = '(max-width: 890px)',
	MIN_WIDTH_892 = '(min-width: 892px)';

export default class MetrosServed extends Component {

	static contextTypes = {
		router : PropTypes.object,
		screenSize: PropTypes.number
    };
    
    static propTypes = {
        searchType : PropTypes.string
    };

    static defaultProps = {
        searchType : 'for-sale',
		isShowMap :  true
    };

    static isDisplayMap(screenSize, mediaMatch) {
    	if(String(mediaMatch) === 'undefined' && screenSize > 2) {
    		return true
		} else if(String(mediaMatch) === 'undefined' && screenSize === 2) {
			return true
		} else {
    		return mediaMatch;
		}
	}

 	constructor(props) {
		super(props);
		this.state = {
			searchType: props.searchType
		};

	}

	componentWillReceiveProps(props) {
		this.setState({
			searchType : props.searchType
		});
	}

	getMapUrl(metroConfig) {
        const params = {
			statecode : metroConfig.stateCode,
			metroid : metroConfig.metroGeoId,
		};
		return pathToUrl('/residential-investment-properties/for-sale/search/geo-location/bounds?view=list&investmentcategories=highcashflow&metrogeoid={metroid}&purchasetype=cash&statecode={statecode}', params);
    }

    renderMetros() {
		const metros = areasServed.filter(area => !area.isHideOnMap).map(area => {
				return (
					<Link to={this.getMapUrl(area)}>
						<div className="metro-wrap flex flex-column flex-align-center" style={{'top': `${area.position.y}px`,'left': `${area.position.x}px`}}>
							<div className="metro-wrap__dot"></div>
							<div className={Cx("metro-wrap__name", area.labelDisplayClass || '')}>{area.label}</div>
						</div>
					</Link>
				)
			});

		return metros;
	}

	render() {
		const { className} = this.props;
		return (
			<div className={Cx("metros-served flex flex-column flex-justify-center",className)}>
				<div className="metros-served__container">
					<div className="map-img-wrap">
						<img src="/static/images/landingpage/usa_map.png" className="map-img-wrap__image"/>
						<div className="map-img-wrap__map-metro-list hidden-xs hidden-sm"> {this.renderMetros()}</div>
						<div className="map-img-wrap__metro-list hidden-md hidden-lg">{
							areasServed.filter(area => !area.isHideOnMap).map(area => {
								return (
									<Link to={this.getMapUrl(area)}>
										<div className="metro-wrap flex flex-column flex-align-center">
											<div className={Cx("metro-wrap__name", area.labelDisplayClass || '')}>{area.label}</div>
										</div>
									</Link>
								)
							})
						} </div>
					</div>
				</div>
			</div>
		)
	}
}
