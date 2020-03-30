import React, {Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import APPCONSTANTS from 'utils/app-constants';
import { offsetCenter } from '../../utils/mapUtils';
import SiteConfig from '../../config';

const { gmap } = SiteConfig;
const { MAP_LOGO_ICON } = APPCONSTANTS;
if (typeof(window) === 'undefined') {
	global.window = new Object();
	global.document = new Object();
}

const createMapOptions = (maps) => {
	return {
		panControl: true,
		mapTypeControl: true,
		scrollwheel: false,
		streetViewControl: false
	};
};

const _resolvePromise = () => {
	return new Promise((resolve, reject) => {
		if (typeof window === 'undefined') {
			return reject(new Error('google map cannot be loaded outside browser env'));
		}

		if (window.google && window.google.maps) {
			return resolve(window.google.maps);

		}
	});
};

export default class LocationDetailMap extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		onPositionChange: PropTypes.func,
		locateProperty: PropTypes.func
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	static defaultProps = {
		height : 500,
		lat: 12.9833,
		lon:77.5833,
		onPositionChange : () =>{},
		updatePlace : () =>{},
		locateProperty : () => {},
		showInfo: false,
		locAddress: ''
	};

	constructor(props) {
		super(props);
		// this.locateProperty = this.locateProperty.bind(this);
		this.state = {
			center : [props.lat,props.lon],
			lat : props.lat,
			lon : props.lon,
			showInfo: props.showInfo,
			zoom:15,
			map : '',
			maps:'',
			initialLoad: true,
			infoWindow:''
		};

		this.markers=[];
		this.place='';
		this.timeOut = '';
	}

	componentWillReceiveProps(props) {
		if(props.showInfo && props.isMapRefresh) {
			this.setState({
				showInfo: props.showInfo,
				center : [props.lat, props.lon],
				zoom: 15,
				showRight :props.showRight
			}, this.createMarker(this.state.map, this.state.maps, [props.lat, props.lon],props.locAddress,props.showInfo));
			this.timeOut = setTimeout(()=>{
				const { map, maps } = this.state;
				maps.event.trigger(map, 'resize');
				this.setState({
					showRight :props.showRight
				});
			}, 500);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeOut);
	}

	createMarker(map, maps, centerCoords='',address='', geoCode=true) {

		let {center,infoWindow, showInfo} = this.state;
		if(centerCoords !== '') {
			center = centerCoords;
		}

		const Marker = require('../../utils/map-icons').default;
		// delete one if exists
		this.deleteMarkers();
		const markerObj = new Marker({
			map: map,
			position: new maps.LatLng(center[0], center[1]),
			draggable: true,
			icon: {
				path: MAP_LOGO_ICON,
				fillColor: '#739cc0',
				fillOpacity: 1,
				strokeColor: '',
				strokeWeight: 0,
				scale: 0.7,
				anchor: new maps.Point(30, 70)
			},
			map_icon_label: '<span class="map-icon map-icon-postal-code-prefix" style="color:#739cc0"></span>'
		});

		this.markers.push(markerObj);
		this.geocode(markerObj.position,address,geoCode);

		maps.event.addListener(markerObj, 'dragstart', (e)=> {
			infoWindow.close();
		});

		maps.event.addListener(markerObj, 'dragend', (e)=> {
			infoWindow.close();
			offsetCenter(map.getCenter(), 0,-100,map);
			const point = markerObj.position;
			map.panTo(point);
			const geocoder = new maps.Geocoder();
			geocoder.geocode({
				latLng: point
			}, (responses) => {
				if (responses && responses.length > 0) {
					typeof this.props.onPositionChange === 'function' && this.props.onPositionChange(responses[0]);
				} else {
					// console.error('Sorry but Google Maps could not determine the approximate postal address of this location.');
				}
			});

		});

		maps.event.addListener(markerObj, 'click', (e)=> {
			infoWindow.open(map, markerObj);
		});

	}

	deleteMarkers() {
		// const { map, maps } = this.state;
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}

		this.markers =[];
	}

	showInfoWindow = (address,geoCode)=> {
		const { l } = this.context.i18n;
		const { map, maps, infoWindow, showInfo } = this.state;
		const marker = this.markers[0];
		const pos = marker.position;

		window.confirmProperty = () => {
			this.props.locateProperty();
		};

		let html = `<span style="display: inline-block;font-size: 1.5rem;margin-bottom: 5px;">${address}</span>`;
		// map.panTo(pos);
		offsetCenter(map.getCenter(), 0,-85,map);
		infoWindow.setContent(`<div id="iw" style="max-width:280px;color:#000"> ${html} </div>`);
		geoCode && infoWindow.open(map, marker);

	}

	geocode = (position,address,geoCode) => {
		const { map, maps } = this.state;

		/* if(address) {
			this.showInfoWindow(address,geoCode);
			//offsetCenter(map.getCenter(), 0,-100,map);
			return;
		}*/
		const geocoder = new maps.Geocoder();
		geocoder.geocode({
			latLng: position
		}, (responses) => {
			if (responses && responses.length > 0) {
				this.showInfoWindow(address || responses[0].formatted_address,geoCode);
				!address && typeof this.props.updatePlace === 'function' && this.props.updatePlace(responses[0], position);
			} else {
				// console.error('Sorry but Google Maps could not determine the approximate postal address of this location.');
			}
		});
	}

	onMapLoad = async (map, maps) => {
		this.setState( {
			map : map,
			maps: maps,
			initialLoad:false,
			infoWindow : new maps.InfoWindow()
		});
		this.createMarker(map,maps,'','',false);
		maps.event.addDomListener(map, 'resize', ()=> {
			const point = this.markers[0].position;
			map.panTo(point);
			offsetCenter(map.getCenter(), 0,-100,map);
		});
		/* maps.event.addDomListener(window, "resize", ()=> {
			const point = this.markers[0].position;
			map.panTo(point);
			offsetCenter(map.getCenter(), 0,-100,map)
		});*/

	}

	render() {
		const { l } = this.context.i18n;
		const { center, lat, lon } = this.state;
		return (
			<div className="schema-map-wrapper schema-border" style={{ height: this.props.height}}>
				{/* <div className="drag-message-wrapper">
					{l('MARKERDRAGPINMESSAGE')}
				</div>*/}
				{ lat && lon && <GoogleMap
					center={this.state.center}
					onGoogleApiLoaded={({map, maps}) => this.onMapLoad(map, maps)}
					zoom={this.state.zoom}
					options={createMapOptions}
					onChange={this.onChange}
					googleMapLoader={_resolvePromise}
					yesIWantToUseGoogleMapApiInternals={true}
					bootstrapURLKeys={gmap} /> }
			</div>
		);
	}
}



