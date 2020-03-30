import React , { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import ReactDOM, { findDOMNode } from 'react-dom';
import googleMapLoader from 'google-map-react/lib/utils/loaders/google_map_loader';
import Cx from 'classnames';
import ExpandIndicator from '../common/expand-indicator/expand-indicator';
import { offsetCenter } from '../../utils/mapUtils';
import cookie from 'react-cookie';
import SiteConfig from '../../config';

const { gmap, localeSettings, cookies } = SiteConfig;
const { MAP_LOGO_ICON } = require('../../utils/app-constants').default;

if (typeof(window) === 'undefined') {
	global.window = new Object();
	global.document = new Object();
}

const createMapOptions = (maps) => {
	return {
		panControl: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			position: maps.ControlPosition.TOP_RIGHT
		},
		scrollwheel: false,
		streetViewControl: false,
		disableDefaultUI: false,
		draggable : true,
		fullscreenControl : false
	};
};

var drawingManager;
var selectedShape;
var colors = ['#12BCAD', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
var selectedColor;
var colorButtons = {};

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

export default class AdvanceMapSearch extends Component {

	static contextTypes = {
		i18n: PropTypes.object,
		country: PropTypes.string
	};

	static propTypes = {
		height: PropTypes.number,
		lat: PropTypes.number,
		lon: PropTypes.number,
		drawingControlRequired: PropTypes.bool,
		onClickPreferredLocations: PropTypes.func
	};

	static defaultProps = {
		height : 560,
		lat: 12.9833,
		lon:77.5833,
		drawingControlRequired: true
	};

	constructor(props) {
		super(props);
		this.state = {
			center : [props.lat,props.lon],
			lat : props.lat,
			lon : props.lon,
			zoom:15,
			inputValue : ''
		};
		this.markers=[];
		this.initPlaceSuggest = this.initPlaceSuggest.bind(this);
		this.placeSelected = this.placeSelected.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
		this.showLocateOnMapInput = this.showLocateOnMapInput.bind(this);
		this.toggleFullMap = this.toggleFullMap.bind(this);
	}

	componentDidMount() {
		if (typeof window.google !== 'undefined') {
			this.loadMap = true;
			this.initPlaceSuggest(window.google.maps);
			this.forceUpdate();
			return;
		}
		googleMapLoader(gmap).then((google) => {
			this.loadMap = true;
			this.initPlaceSuggest(google);
			this.forceUpdate();
		});
	}

	clearSelection () {
		if (selectedShape) {
			if (selectedShape.type !== 'marker') {
				selectedShape.setEditable(false);
			}

			//selectedShape = null;
		}
	}

	setSelection (shape) {
		if (shape.type !== 'marker') {
			this.clearSelection();
			shape.setEditable(true);
			this.selectColor(shape.get('fillColor') || shape.get('strokeColor'));
		}

		selectedShape = shape;
	}

	deleteSelectedShape () {
		if (selectedShape) {
			selectedShape.setMap(null);
		}
	}

	selectColor (color) {
		// Retrieves the current options from the drawing manager and replaces the
		// stroke or fill color as appropriate.
		var rectangleOptions = drawingManager.get('rectangleOptions');
		rectangleOptions.fillColor = color;
		drawingManager.set('rectangleOptions', rectangleOptions);

		var circleOptions = drawingManager.get('circleOptions');
		circleOptions.fillColor = color;
		drawingManager.set('circleOptions', circleOptions);

	}

	setSelectedShapeColor (color) {
		if (selectedShape) {
			selectedShape.set('fillColor', color);
		}
	}

	makeColorButton (color) {
		var button = document.createElement('span');
		button.className = 'color-button';
		button.style.backgroundColor = color;
		google.maps.event.addDomListener(button, 'click', function () {
			this.selectColor(color);
			this.setSelectedShapeColor(color);
		});

		return button;
	}

	buildColorPalette () {
		this.selectColor(colors[0]);
	}

	createMarker(map, maps, centerCoords='',address='', geoCode=true) {

		let {center} = this.state;
		if(centerCoords !== '') {
			center = centerCoords;
		}

		const Marker = require('../../utils/map-icons');
		// delete one if exists
		this.deleteMarkers();
		const markerObj = new Marker({
			map: map,
			position: new maps.LatLng(center[0], center[1]),
			draggable: true,
			icon: {
				path: MAP_LOGO_ICON,
				fillColor: '#009287',
				fillOpacity: 1,
				strokeColor: '',
				strokeWeight: 0,
				scale: 0.7,
				anchor: new maps.Point(30, 70)
			},
			map_icon_label: '<span class="map-icon map-icon-postal-code-prefix" style="color:#0a9a8d"></span>'
		});

		this.markers.push(markerObj);
		this.geocode(markerObj.position,address,geoCode);

		maps.event.addListener(markerObj, 'dragstart', (e)=> {
			this.infoWindow.close();
		});

		maps.event.addListener(markerObj, 'dragend', (e)=> {
			this.infoWindow.close();
			//offsetCenter(map.getCenter(), 0,-100,map);
			const point = markerObj.position;
			this.handleMapPositionChange(point);
		});

		maps.event.addListener(markerObj, 'click', (e)=> {
			this.infoWindow.open(map, markerObj);
		});

	}

	handleMapPositionChange(point) {
		this.map.panTo(point);
		const geocoder = new this.maps.Geocoder();
		geocoder.geocode({
			latLng: point
		}, (responses) => {
			if (responses && responses.length > 0) {
				const place = responses[0];
				const lat = place.geometry.location.lat();
				const lon = place.geometry.location.lng();
				this.createMarker(this.map, this.maps, [lat,lon],place.formatted_address);
				this.placeSelected(place);
				//this.props.onCircleDraw('',lat,lon);
			} else {
				// console.error('Sorry but Google Maps could not determine the approximate postal address of this location.');
			}
		});
	}

	geocode = (position,address,geoCode) => {
		const geocoder = new this.maps.Geocoder();
		geocoder.geocode({
			latLng: position
		}, (responses) => {
			if (responses && responses.length > 0) {
				this.showInfoWindow(address || responses[0].formatted_address,geoCode);
			} else {
				console.error('Sorry but Google Maps could not determine the approximate postal address of this location.');
			}
		});
	};

	showInfoWindow = (address,geoCode)=> {
		const marker = this.markers[0];
		const pos = marker.position;

		let html = `<span style="display: inline-block;font-size: 1.5rem;margin-bottom: 5px;">${address}</span>`;
		// map.panTo(pos);
		//offsetCenter(map.getCenter(), 0,-85,map);
		this.infoWindow.setContent(`<div id="iw" style="max-width:280px;color:#000"> ${html} </div>`);
		geoCode && this.infoWindow.open(this.map, marker);

	};

	deleteMarkers() {
		// const { map, maps } = this.state;
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}

		this.markers =[];
	}

	onMapLoad = async (map, maps) => {
		var options = {
			strokeWeight: 0,
			fillOpacity: 0.45,
			editable: true,
			draggable: true,
			zIndex : 10
		};
		this.infoWindow = new maps.InfoWindow();
		this.map = map;
		this.maps = maps;
		this.createMarker(map,maps);
		drawingManager = new maps.drawing.DrawingManager({
			drawingControl: this.props.drawingControlRequired,
			drawingControlOptions: {
				position: maps.ControlPosition.TOP_CENTER,
				drawingModes: ['circle', 'rectangle']
			},
			rectangleOptions: options,
			circleOptions: options,
			map: map
		});
		//drawingManager.setMap(map);

		maps.event.addDomListener(map, 'resize', ()=> {
			const point = this.markers[0].position;
			map.panTo(point);
			offsetCenter(map.getCenter(), 0,0,map);
		});

		maps.event.addListener(drawingManager, 'overlaycomplete',  (e) => {
			var newShape = e.overlay;

			newShape.type = e.type;
			this.deleteSelectedShape();
			if (e.type !== maps.drawing.OverlayType.MARKER) {
				// Switch back to non-drawing mode after drawing a shape.
				drawingManager.setDrawingMode(null);

				// Add an event listener that selects the newly-drawn shape when the user
				// mouses down on it.
				maps.event.addListener(newShape, 'click',  (e) => {
					this.setSelection(newShape);
				});
				this.setSelection(newShape);
			}
			else {
				maps.event.addListener(newShape, 'click',  (e) => {
					this.setSelection(newShape);
				});
				this.setSelection(newShape);
			}
		});

		maps.event.addListener(drawingManager, 'drawingmode_changed', this.deleteSelectedShape);
		maps.event.addListener(map, 'click', this.clearSelection);
		maps.event.addListener(drawingManager, 'circlecomplete', (circle) => {
			this.props.onCircleDraw(circle.getRadius(),circle.center.lat(),circle.center.lng());
			maps.event.addListener(circle, 'radius_changed', ()=> {
				this.props.onCircleDraw(circle.getRadius(),circle.center.lat(),circle.center.lng());
			});

			maps.event.addListener(circle, 'dragend', () => {
				this.props.onCircleDraw(circle.getRadius(),circle.center.lat(),circle.center.lng());
			});
		});

		maps.event.addListener(drawingManager, 'rectanglecomplete', (rectangle) => {
			this.props.onRectangleDraw(rectangle);
			console.log(rectangle);
			maps.event.addListener(rectangle, 'bounds_changed', ()=> {
				this.props.onRectangleDraw(rectangle);
			});
		});

		/*google.maps.event.addListener(circle, 'radius_changed', function() {
		 console.log(circle.getRadius());
		 });

		 google.maps.event.addListener(outerPath, 'set_at', function() {
		 console.log('Vertex moved on outer path.');
		 });

		 google.maps.event.addListener(innerPath, 'insert_at', function() {
		 console.log('Vertex removed from inner path.');
		 });

		 google.maps.event.addListener(rectangle, 'bounds_changed', function() {
		 console.log('Bounds changed.');
		 });*/


		//maps.event.addDomListener(document.getElementById('delete-button'), 'click', this.deleteSelectedShape);

		this.buildColorPalette();
	};

	onChangeInput(evt) {
		this.setState({
			inputValue : evt.currentTarget.value
		})
	}

	initPlaceSuggest(google) {
		const { country } = this.context;
		let options = {
			types: ['(regions)'],
			componentRestrictions: {country: localeSettings[country].locationSearchRegion}
		};
		this.placeAutoComplete = new google.places.Autocomplete(ReactDOM.findDOMNode(this.refs.inputgoogleplace), options);
		this.placeAutoComplete.addListener('place_changed',this.placeSelected);
	}

	placeSelected(selectedPlace='') {
		const place = selectedPlace || this.placeAutoComplete.getPlace();
		const lat = place.geometry.location.lat();
		const lon = place.geometry.location.lng();
		cookie.save('locationquery', `${lat},${lon}`, { path: '/', maxAge: 1080000000, secure : cookies.isSecure });
		cookie.save('locationname', place.formatted_address, { path: '/', maxAge: 1080000000, secure : cookies.isSecure });
		this.setState({
			center : [lat,lon],
			inputValue : place.formatted_address
		},()=>{
			this.createMarker(this.map,this.maps,this.state.center,place.formatted_address)
			this.props.onCircleDraw('',lat,lon,place.geometry.viewport);
		});
	}

	showLocateOnMapInput() {
		this.setState({
			isLocateOnMap : true
		});
		this.refs.inputgoogleplace.focus();
	}

	toggleFullMap() {
		if(this.timeout) {
			window.clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(()=>{
			this.maps.event.trigger(this.map,'resize');
		},400);
		this.setState({
			showFullMap : !this.state.showFullMap
		})
	}

	render() {
		const { l } = this.context.i18n;
		const { inputValue, isLocateOnMap, showFullMap } = this.state;
		return (
			<div className={Cx("advanced-map-search flex",showFullMap ? 'show-full-map': '')}>
				{/*<div className={`advance-search-widget__search-options__map-wrapper__location__options map-showing`}>
					<button className="btn btn-primary" onClick={this.props.onClickShowMap}>{l('CLOSEMAP')}</button>
				</div>*/}
				<div className="schema-map-wrapper">
					{!frameworkGlobals.isServer && this.loadMap && <GoogleMap
						center={this.state.center}
						onGoogleApiLoaded={({map, maps}) => this.onMapLoad(map, maps)}
						zoom={this.state.zoom}
						options={createMapOptions}
						googleMapLoader={_resolvePromise}
						yesIWantToUseGoogleMapApiInternals={true}
						bootstrapURLKeys={gmap}
					/>}
					{/*<button className="btn btn-default map-address-bar__preferred-location-btn flex flex-align-center" onClick={this.props.onClickPreferredLocations}>
						<span>
							{l('PREFERREDLOCATIONS')}
						</span>
					</button>*/}
					<div className="map-address-bar">
						<div className="map-address-bar__input-wrap">
							{/*{!isLocateOnMap && <button className="btn btn-default" onClick={this.showLocateOnMapInput}>{l('LOCATEONMAP')}</button>}*/}
							{<input id="map-address-input"
									className='show'
								   type="text"
								   ref="inputgoogleplace"
								   placeholder={l("ENTERPREFEREDLOCATION")}
								   name={"map-address-input"}
								   onChange={this.onChangeInput}
								   value={inputValue}
							/>}
						</div>
					</div>
					<ExpandIndicator
						className="map-search-expand"
						onClick={this.toggleFullMap}
						titleText={showFullMap ? l('SHOWFILTERS') : l('SHOWFULLMAP')}
						direction={showFullMap ? 'left': 'right'} />
					{showFullMap && this.props.renderCTAButtons()}
				</div>
				{!showFullMap && <div className="advanced-map-search__right-rail">
					{this.props.renderCriteria()}
					<div className="flex flex-align-center">
						{this.props.renderCTAButtons()}
					</div>
				</div>}
			</div>
		);

	}

}
