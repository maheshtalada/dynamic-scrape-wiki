import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { getMapMarkerInfoStyle } from '../../utils/searchUtil';
const MARKER_INFO_WIDTH = 278,
	MARKER_INFO_HEIGHT = 206,
	MARKER_WIDTH = 35,
	MARKER_HEIGHT = 35;

export default class ListingMapMarker extends Component {

	static propTypes = {

	};

	static contextTypes = {
		i18n: PropTypes.object,
		country: PropTypes.string,
		awsImagePath: PropTypes.string
	};

	constructor(props){
		super(props);
		this.state = {
			markerIndex : props.markerIndex
		};
		this.onMarkerMouseLeave = this.onMarkerMouseLeave.bind(this);
		this.onMarkerInfoClose = this.onMarkerInfoClose.bind(this);
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			markerIndex : newProps.markerIndex
		})
	}

	onClickMarkerInfo(url) {
		const link = document.createElement('a');
		link.setAttribute('href',url);
		//link.setAttribute('target','_blank');
		link.dispatchEvent(new MouseEvent(`click`, {bubbles: true, cancelable: true, view: window}));
	}

	onMarkerClick(key, index) {
		this.setState({
			markerShown: index
		});
	}

	onMarkerMouseEnter(key, index) {
		//console.log(key,markerProps);
		this.setState({
			markerHovered: index
		})
	}

	onMarkerMouseLeave(evt) {
		// evt.persist();
		// if(this.markerMouseLeaveTimeout) {
		// 	clearTimeout(this.markerMouseLeaveTimeout);
		// }
		// this.markerMouseLeaveTimeout = setTimeout(()=>{
		// 	console.log(evt.relatedTarget,evt.currentTarget);
		// 	// if(evt.target.className.indexOf("listing-map-marker__marker") >= 0) {
		// 	// 	return;
		// 	// }
		//
		// },500);
		this.setState({
			markerHovered: -1
		})
	}

	onMarkerInfoClose(e) {
		e.stopPropagation();
		this.setState({
			markerShown: -1
		})
	}

	render() {
		const { listing } = this.props;
		const { markerShown, markerHovered, markerIndex } = this.state;
		const { i18n : {l}, country, awsImagePath } = this.context;
		const markerShownClass = markerShown === markerIndex ? "marker-shown": "";
		const markerHoveredClass = markerHovered === markerIndex ? "marker-hovered": "";
		const mapWidth = this.props.$geoService.getWidth();
		const mapHeight = this.props.$geoService.getHeight();
		const markerPos = this.props.$getDimensions(this.props.$dimensionKey);
		const markerDim = {
			width: MARKER_WIDTH,
			height: MARKER_HEIGHT,
			...markerPos
		};
		const markerInfoStyle = getMapMarkerInfoStyle(mapWidth, mapHeight, markerDim, MARKER_INFO_WIDTH, MARKER_INFO_HEIGHT);
		return (
			<div className="listing-map-marker" onMouseLeave={this.onMarkerMouseLeave} >
				<div id={`marker-${listing.id}`} onMouseEnter={()=>{this.onMarkerMouseEnter(listing.id,markerIndex)}} onClick={()=>{this.onMarkerClick(listing.id,markerIndex)}} className={Cx("listing-map-marker__marker",markerShownClass,markerHoveredClass)}>
					<span>1</span>
				</div>
				<div style={markerInfoStyle.style} id={`marker-info-${listing.id}`} onClick={()=>{this.onClickMarkerInfo(listing.listingurl)}}
					 className={Cx("listing-map-marker__info",markerShownClass,markerHoveredClass,markerInfoStyle.posClass)}>
					{markerShownClass && <button className="close-btn" onClick={this.onMarkerInfoClose}>
						<i className="pe-7s-close-3"/>
					</button>}
					<div className="listing-map-marker__info__caret"></div>
					{this.props.renderMarkerInfo(listing,markerIndex)}
				</div>
			</div>
		)
	}
}
