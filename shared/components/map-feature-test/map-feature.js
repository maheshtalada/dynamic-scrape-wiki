import React, {Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import { getValueByLocale, formatCurrency } from 'utils/localeUtil';
import { pathToUrl, getSearchPageViewType } from 'utils/searchUtil';
import Loader from 'components/common/page-loader/loader';
import mapStyles from './map-styles.json';
import Cx from 'classnames';
import MapLegends from './map-legends';
import queryString from 'query-string';
import { getMetroServed } from 'utils/mapUtils';
import { find as _find, findKey as _findKey } from 'lodash';
import SiteConfig from '../../config';
import converter from '../../assets/static/convertjson.json';

const { gmap } = SiteConfig;

if (typeof(window) === 'undefined') {
	global.window = new Object();
	global.document = new Object();
}

window.dataLayer = window.dataLayer || [];


const DATA_BOX_STYLE = {
	width: 215,
	height: 100
};

const DEFAULT_SEARCH_RADIUS = 10;

const DataBox = ({data, showDataBox}) => {
	
	return (
		<div id="data-box" className="data-box nicebox" style={{position:'fixed', width: `auto`, height: `${DATA_BOX_STYLE.height}px`, ...data.styles, display: showDataBox ? 'block' : 'none'}}>
			<div className="box-header flex flex-justify-center" id="zipcode">
				<span>{data.header.value}</span>
			</div>
			{data.body && !!data.body.length &&
				data.body.map(item => {
					return (
						item.value != 0 ? <div className="box-body flex flex-align-center" id="boxValue">
							<label>{item.label}</label><div className="separator">:</div><span>{item.value}</span>
						</div> : null
					)
				})
			}
			{data.footer && <div className="box-footer flex flex-align-center" id="propertiesCount">
				<label>{data.footer.label}</label><div className="separator">:</div><span>{data.footer.value}</span>
			</div>}
		</div>
	)
};

const createMapOptions = (maps) => {
	return {
		panControl: true,
		mapTypeControl: false,
		scrollwheel: false,
		streetViewControl: false,
		maxZoom: 20,
		fullscreenControl: false,
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.LEFT_TOP
		},
		styles: mapStyles,
		gestureHandling: "greedy"
	};
};

let drawingManager;
let infoWindow;
let selectedShape;

let colors = ["#28559a","#3778c2","#4b9fe1","#63bce5","#7ed5ea"];

export default class MapFeature extends Component {

	// shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		lat : PropTypes.number,
		lng: PropTypes.number
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	static defaultProps = {
		height : 560,
		lat: 32.7766642,
		lng:-96.79698789999998,
		colors : {
			VERYHIGH : '#28559a',
			HIGH : "#3778c2",
			IDEAL : "#4b9fe1",
			MODERATE : "#63bce5",
			LOW : "#7ed5ea"
		},
		mapServerEndPoint : 'https://maps-dev.propshub.com/blockgroup/medianprice',
		redirectUri : '/residential-investment-properties/for-sale/{state}/search/zip-code/{term}',
		redirectByGeo : '/residential-investment-properties/for-sale/search/geo-location/bounds'
	};

	static getMapCenter(lat,lon,mapBounds) {
		if(lat && lon) {
			return [lat,lon]
		}
		if(mapBounds) {
			const bounds = mapBounds.split(',');
			return [(Number(bounds[0])+Number(bounds[2]))/2,(Number(bounds[1])+Number(bounds[3]))/2];
		}
	}

	constructor(props,context) {
		super(props);
		this.state = {
			center :{lat : props.lat, lng : props.lng},
			lat : props.lat,
			lng : props.lng,
			zoom: 5,
			map : '',
			maps: ''
		};
		this.styleFeature = this.styleFeature.bind(this);
		this.mouseInToRegion = this.mouseInToRegion.bind(this);
		this.mouseOutOfRegion = this.mouseOutOfRegion.bind(this);
		this.onClickMapDataBlock = this.onClickMapDataBlock.bind(this);
		this.redirectSearch = this.redirectSearch.bind(this);
		this.mapsEventListeners = [];
	}

	componentWillReceiveProps(props) {
		this.setState({
			center :{lat : props.lat, lng : props.lng},
			lat : props.lat,
			lng : props.lng,
			zoom: this.context.screenSize === 1 ? 9 : 9
		});
	}

	clearSelection () {
		if (selectedShape) {
			if (selectedShape.type !== 'marker') {
				selectedShape.setEditable(false);
			}
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
			infoWindow.close();
		}
	}

	selectColor (color) {
		// Retrieves the current options from the drawing manager and replaces the
		// stroke or fill color as appropriate.
		let rectangleOptions = drawingManager.get('rectangleOptions');
		rectangleOptions.fillColor = color;
		drawingManager.set('rectangleOptions', rectangleOptions);

		let circleOptions = drawingManager.get('circleOptions');
		circleOptions.fillColor = color;
		drawingManager.set('circleOptions', circleOptions);

	}

	setSelectedShapeColor (color) {
		if (selectedShape) {
			selectedShape.set('fillColor', color);
		}
	}

	/*makeColorButton (color) {
		let button = document.createElement('span');
		button.className = 'color-button';
		button.style.backgroundColor = color;
		this.mapsEventListeners['maps.event.makeColorButton'] = google.maps.event.addDomListener(button, 'click', function () {
			this.selectColor(color);
			this.setSelectedShapeColor(color);
		});

		return button;
	}*/

	buildColorPalette () {
		this.selectColor(colors[0]);
	}

	componentWillUnmount() {
		const { map, maps } = this.state;
		this.mapsEventListeners.map( (listener, key) => {
			if(key.indexOf('maps.event') > -1) {
				maps.event.removeListener(listener);
			} else {
				map.data.removeListener(listener)
			}
		});
	}

	async onMapLoad(map, maps){
		// set up the style rules and events for maps.Data
		map.data.setStyle(this.styleFeature);
		this.mapsEventListeners['map.data.mouseInToRegion'] = map.data.addListener('mouseover', this.mouseInToRegion);
		this.mapsEventListeners['map.data.mouseOutOfRegion'] = map.data.addListener('mouseout', this.mouseOutOfRegion);
		this.mapsEventListeners['map.data.onClickMapDataBlock'] = map.data.addListener('click', this.onClickMapDataBlock);
		infoWindow = new maps.InfoWindow({
			maxWidth : 150
		});

		const metroServed = getMetroServed(this.props.params.id);
		const deviceConfig = _find(metroServed.bounds,{"userAgent": this.props.device});

		const bounds = map.getBounds();

		const ne = bounds.getNorthEast();
		const sw = bounds.getSouthWest();
		const config = {
			lngW :  sw.lng(),
			latS : sw.lat(),
			lngE :  ne.lng(),
			latN : ne.lat(),
			metroGeoId : metroServed.metroGeoId
		};

		//this.initDrawingManager(map,maps);

		if(!frameworkGlobals.isServer) {
			try {
				const responseObject = await fetch(`${window.__CONFIG__.assetsPath}/metro-geo-json/allstates/states.json`);
				const data = await responseObject.json();
				window['mapdata'] = data;
			} catch(e) {
				new Error("map data not loaded", e)
			}
		}

		this.loadMapShapes(config, maps, map);

		this.setState( {
			map : map,
			maps: maps
		});
		//document.getElementById("medianColorPolation").style.display = "flex";
	};

	initDrawingManager(map,maps) {
		let options = {
			strokeWeight: 3,
			fillOpacity: 0.20,
			editable: true,
			draggable: true,
			zIndex : 10,
			strokeColor : colors[0]
		};
		const { l } = this.context.i18n;
		const { metroStateCode } = this.props;
		const { defaultQueryParam } = this.props.tabConfig;
		const queryParams = queryString.stringify(Object.assign({},defaultQueryParam,{'investmentcategories': 'all'}));
		drawingManager = new maps.drawing.DrawingManager({
			drawingControl: this.props.drawingControlRequired,
			drawingControlOptions: {
				position: maps.ControlPosition.TOP,
				drawingModes: ['circle', 'rectangle']
			},
			rectangleOptions: options,
			circleOptions: options,
			map: map
		});
		this.mapsEventListeners['maps.event.overlaycomplete'] = maps.event.addListener(drawingManager, 'overlaycomplete',  (e) => {
			let newShape = e.overlay;
			newShape.type = e.type;
			this.deleteSelectedShape();
			if (e.type !== maps.drawing.OverlayType.MARKER) {
				// Switch back to non-drawing mode after drawing a shape.
				drawingManager.setDrawingMode(null);

				// Add an event listener that selects the newly-drawn shape when the user
				// mouses down on it.
				this.mapsEventListeners['maps.event.overlaycompleteclick'] = maps.event.addListener(newShape, 'click',  (e) => {
					this.redirectSearch(this.props.redirectByGeo);
					this.setSelection(newShape);
				});
				this.mapsEventListeners['maps.event.overlaycompletemouseover'] = maps.event.addListener(newShape, 'mouseover',  (e) => {
					console.log(e);
				});
				this.setSelection(newShape);
			}
			else {
				this.mapsEventListeners['maps.event.overlaycompleteclick'] =  maps.event.addListener(newShape, 'click',  (e) => {
					this.setSelection(newShape);
				});
				this.setSelection(newShape);
			}
			infoWindow.setContent(`<div class="map-draw-selection-info">${l("MAPDRAWSELECTIONINFO")}</div>`);
			infoWindow.open(map);
		});
		this.mapsEventListeners['maps.event.drawingmodechanged']  = maps.event.addListener(drawingManager, 'drawingmode_changed', this.deleteSelectedShape);
		this.mapsEventListeners['maps.event.clearSelection']  = maps.event.addListener(map, 'click', this.clearSelection);
		this.mapsEventListeners['maps.event.circlecomplete']  = maps.event.addListener(drawingManager, 'circlecomplete', (circle) => {
			//this.props.onCircleDraw(circle.getRadius(),circle.center.lat(),circle.center.lng());
			this.query = `?q=${circle.center.lat()},${circle.center.lng()}&radius=${Math.ceil(circle.getRadius()/1000)}&${queryParams}&statecode=${metroStateCode.toLowerCase()}`;
			this.mapsEventListeners['maps.event.radiuschanged']  = maps.event.addListener(circle, 'radius_changed', ()=> {
				//this.props.onCircleDraw(circle.getRadius(),circle.center.lat(),circle.center.lng());
				this.query = `?q=${circle.center.lat()},${circle.center.lng()}&radius=${Math.ceil(circle.getRadius()/1000)}&${queryParams}&statecode=${metroStateCode.toLowerCase()}`;
			});

			this.mapsEventListeners['maps.event.centerchanged']  = maps.event.addListener(circle, 'center_changed', () => {
				//this.props.onCircleDraw(circle.getRadius(),circle.center.lat(),circle.center.lng());
				this.query = `?q=${circle.center.lat()},${circle.center.lng()}&radius=${Math.ceil(circle.getRadius()/1000)}&${queryParams}&statecode=${metroStateCode.toLowerCase()}`;
				infoWindow.setPosition(circle.center);
			});

			infoWindow.setPosition(circle.center);
		});

		this.mapsEventListeners['maps.event.rectanglecomplete'] = maps.event.addListener(drawingManager, 'rectanglecomplete', (rectangle) => {
			//this.props.onRectangleDraw(rectangle);

			infoWindow.setPosition(this.getRectangleBoundsCenter(rectangle,maps));
			this.query = `?bound=${this.getRectangleBounds(rectangle)}&${queryParams}&statecode=${metroStateCode.toLowerCase()}`;
			this.mapsEventListeners['maps.event.boundschanged'] = maps.event.addListener(rectangle, 'bounds_changed', ()=> {
				//this.props.onRectangleDraw(rectangle);
				this.query = `?bound=${this.getRectangleBounds(rectangle)}&${queryParams}&statecode=${metroStateCode.toLowerCase()}`;
				infoWindow.setPosition(this.getRectangleBoundsCenter(rectangle,maps));
			});
		});
		this.buildColorPalette();
	}

	getRectangleBounds(rectangle) {
		const NE = rectangle.getBounds().getNorthEast();
		const SW = rectangle.getBounds().getSouthWest();
		return `${NE.lat()},${NE.lng()},${SW.lat()},${SW.lng()}`;
	}

	getRectangleBoundsCenter(rectangle,maps) {
		const ne = rectangle.getBounds().getNorthEast(),
			sw = rectangle.getBounds().getSouthWest(),
		bounds = new maps.LatLngBounds(sw,ne);
		return bounds.getCenter();
	}

	onClickMapDataBlock(e) {
		const zipcode = e.feature.getProperty('zipcode');
		/*const lat = e.feature.getProperty('lat');
		const lng = e.feature.getProperty('lng');*/
		//let stateCode = e.feature.getProperty('statecode');
		let stateCode = e.feature.getProperty('statecode');
		//let stateCode  = this.props.metroStateCode.toLowerCase()
		const stateName = stateCode.toUpperCase();
		const { defaultQueryParam } = this.props.tabConfig;
		/*if(lat && lng) {
			this.query = `?q=${lat},${lng}&radius=${DEFAULT_SEARCH_RADIUS}&zipcode=${zipcode}&statecode=${stateCode}`;
		} else {
			this.query = `?q=${e.latLng.lat()},${e.latLng.lng()}&radius=${DEFAULT_SEARCH_RADIUS}&zipcode=${zipcode}&statecode=${stateCode}`;
		}*/
		const query = queryString.stringify(Object.assign({},defaultQueryParam,{
			'investmentcategories' : !e.feature.getProperty('type') ? 'all' : defaultQueryParam.investmentcategories,
			'statecode': stateCode.toLowerCase()
		}));
		this.redirectSearch(`${pathToUrl(this.props.redirectUri, {
			state : stateName.replace(',','').replace(/\s/gi,'-'),
			term : zipcode
		})}?${query}`, false);
	}

	/*
	 redirect to search URL
	 */
	redirectSearch(url, isQueryRequired = true) {
		const { screenSize } = this.context;
		const link = document.createElement('a');
		url = isQueryRequired ? `${url}${this.query}` : url;
		link.setAttribute('href',`${url}${getSearchPageViewType(screenSize, 'map', false)}`);
		if(screenSize > 2) {
			link.setAttribute('target','_blank');
		}
		link.dispatchEvent(new MouseEvent(`click`, {bubbles: false, cancelable: true}));
	}

	textFormatter({displayValue}) {
		const { l } = this.context.i18n;
		return l(displayValue);
	}

	priceFormatter(value) {
		if(value === null) {
			return '';
		}
		const { country, i18n: {l} } = this.context;
		const currencyFormat = getValueByLocale(country,'currencyFormat');
		const currencySymbol = getValueByLocale(country,'currencySymbol');
		return `${currencySymbol}${formatCurrency(value,2,currencyFormat)}`;
	}

	percentFormatter(value,config) {
		if(value === null) {
			return '';
		}
		const formattedValue = this.numberFormatter(value,config);
		return `${formattedValue}%`
	}

	defaultFormatter(value,config) {
		const { l } = this.context.i18n;
		if(value === null) {
			return '';
		}
		return `${l(value)} ${config.postFix ? l(config.postFix) : ''}`;
	}

	numberFormatter(value,config) {
		if(value === null) {
			return '';
		}
		const toFix = config.toFix === undefined ? 2 : config.toFix;
		return Number(value).toFixed(toFix);
	}

	render() {
		const { center, zoom, boxData, showDataBox, showMapUsageTip } = this.state;
		const { legendBox : legendBoxConfig , tooltip : tooltipMsg, key } = this.props.tabConfig;
		const { mapRangeLegends, params } = this.props;
		const { l } = this.context.i18n;
		return (
			<div id="median-map-feature" className={Cx("median-map-feature",key)}>
				<GoogleMap
					key={params.metro}
					center={center}
					onDragEnd={this._onDragEnd.bind(this)}
					onZoomChange={this._onZoomChange.bind(this)}
					onGoogleApiLoaded={({map, maps}) => this.onMapLoad(map, maps)}
					zoom={zoom}
					options={createMapOptions}
					yesIWantToUseGoogleMapApiInternals={true}
					bootstrapURLKeys={gmap} />
				{boxData && <DataBox data={boxData} showDataBox={showDataBox}/>}
				<div id="pageLoader" style={{display: 'none'}}>
					<Loader/>
				</div>
				<MapLegends mapRangeLegends={{
					fixer_upper_count_range_1 : 173,
					fixer_upper_count_range_2 : 397,
					fixer_upper_count_range_3 : 794,
					fixer_upper_count_range_4 : 1886,
				}} legendBoxConfig={legendBoxConfig} tooltipMsg={tooltipMsg}/>
				{/*<div id="medianColorPolation" className="median-maps-color-polation flex flex-justify-center">
					{mapRangeLegends && legendBoxConfig.legends && <div className="median-maps-color-polation-wrapper">
						<div className="legends-title-wrap flex flex-justify-between flex-align-center">
							<span>{l(legendBoxConfig.title)}</span>
							<div className="tooltip-icon" data-place="bottom" data-tip={l(tooltipMsg)}>
								<i className="pe-7s-help1"/>
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
						</div>*/}
			</div>
		);
	}

	/** Loads the state boundary polygons from a GeoJSON source. */
	loadMapShapes(config, maps, map) {
		//const url = 'lngW='+config.lngW+'&latS='+config.latS+'&lngE='+config.lngE+'&latN='+config.latN+'&metroGeoId='+config.metroGeoId+'&geojson='+config.geojson;
		//const xhr = new XMLHttpRequest();
		//const pageLoader = document.getElementById("pageLoader");
		let censusData = '';
		let mapGeoJson = [];
		/*mapGeoJson.push({
			geometry : JSON.parse(window.mapdata['metroGeo'][0].st_asgeojson),
			properties : {},
			type : "Feature"
		});
*/
		window.mapdata['dataSet'].forEach(data =>{
			//console.log(data.st_asgeojson)
			let medianData = _find(converter , { 'state' : data.state});
			if(medianData) {
				let geojson = {};
				geojson.geometry = JSON.parse(data.st_asgeojson)
				geojson.properties = medianData;
				geojson.type = "Feature";
				mapGeoJson.push(geojson)
			}
		});

		map.data.addGeoJson({
			features: mapGeoJson,
			type: "FeatureCollection"
		}, { idPropertyName: 'state' });

		//xhr.open('GET', `${this.props.mapServerEndPoint}?${url}`);
		//pageLoader.style.display = 'block';
		/*xhr.onload = function() {
			//pageLoader.style.display = 'none';
			censusData = JSON.parse(xhr.responseText);
			if(config.geojson) {
				map.data.addGeoJson(censusData, { idPropertyName: 'id' });
			} else {
				let mapGeoJson = [];
				mapGeoJson.push({
					geometry : JSON.parse(window.mapdata['metroGeo'][0].st_asgeojson),
					properties : {},
					type : "Feature"
				});
				window.mapdata['dataSet'].forEach(data =>{
					let medianData = censusData[data.zipcode] || '';
					if(medianData) {
						let geojson = {};
						geojson.geometry = JSON.parse(data.st_asgeojson)
						geojson.properties = medianData;
						geojson.type = "Feature";
						mapGeoJson.push(geojson)
					}
				});

				map.data.addGeoJson({
					features: mapGeoJson,
					type: "FeatureCollection"
				}, { idPropertyName: 'id' });
			}

		};
		xhr.send();*/

	}

	_onDragEnd(Object,map,maps)  {
		const bound = map.getBounds();
		const ne = bound.getNorthEast();
		const sw = bound.getSouthWest();
		const config = {
			lngW :  sw.lng(),
			latS : sw.lat(),
			lngE :  ne.lng(),
			latN : ne.lat(),
			geojson : true
		};

		this.loadMapShapes(config, maps, map);
	}

	_onZoomChange(Object,map, maps){
		const bound = map.getBounds();
		const ne = bound.getNorthEast();
		const sw = bound.getSouthWest();
		const config = {
			lngW :  sw.lng(),
			latS : sw.lat(),
			lngE :  ne.lng(),
			latN : ne.lat(),
			geojson : true
		};

		this.loadMapShapes(config, maps, map);
	}

	/**
	 * Applies a gradient style based on the 'census_variable' column.
	 * This is the callback passed to data.setStyle() and is called for each row in
	 * the data set.  Check out the docs for Data.StylingFunction.
	 *
	 * @param {google.maps.Data.Feature} feature
	 */
	styleFeature(feature) {
		console.log(feature);
		let outlineWeight = 0.5, zIndex = 3;
		if (!feature.getProperty('state')) {
			outlineWeight = zIndex = 0;
			return {
				strokeWeight: 1,
				strokeColor: "#757575",
				zIndex: zIndex,
				fillColor: 'transparent',
				fillOpacity: 0.8
			};
		}
		/*if (feature.getProperty('state') === 'hover') {
			outlineWeight = zIndex = 1;
		}*/
		const { legendBox : legendBoxConfig } = this.props.tabConfig;
		return {
			strokeWeight: outlineWeight,
			strokeColor: "#fff",
			zIndex: zIndex,
			fillColor: legendBoxConfig.colorCodes[feature.getProperty('tx_segment')] || 'transparent',
			fillOpacity: 0.6
		};
	}

	/**
	 * Responds to the mouse-in event on a map shape (state).
	 *
	 * @param {?google.maps.MouseEvent} e
	 */
	mouseInToRegion(e) {
		const { dataBox : dataBoxConfig } = this.props.tabConfig;
		const { l } = this.context.i18n;

		if(!e.feature.getProperty('id') || (dataBoxConfig.isNotRequiredForTypes && dataBoxConfig.isNotRequiredForTypes.indexOf(e.feature.getProperty('type')) >= 0)) {
			return;
		}

		// set the hover state so the setStyle function can change the border
		e.feature.setProperty('state', 'hover');
		let data = {};
		let style = {};
		const el = document.getElementById('data-box');
		this.mouseEventKey = this.mouseEventKey || _findKey(e,(o) => {
			return o.clientX !== undefined;
		});
		const mouseEvent = e[this.mouseEventKey];
		if(mouseEvent.pageY + DATA_BOX_STYLE.height > window.innerHeight) {
			style['bottom'] = `${(window.innerHeight - mouseEvent.pageY)+10}px`
		} else {
			style['top'] = mouseEvent.pageY+10+'px';
		}
		if(mouseEvent.pageX + DATA_BOX_STYLE.width > window.innerWidth) {
			style['right'] = `${(window.innerWidth - mouseEvent.pageX)+10}px`;
		} else {
			style['left'] = mouseEvent.pageX+10+'px';
		}
		// update the label
		//style['display'] = 'block';
		const cityName = e.feature.getProperty('cityname');
		data['header'] = {
			value: `${cityName ? `${cityName},` : ''} ${e.feature.getProperty('statecode')} - ${e.feature.getProperty('zipcode')}`
		};
		data['body'] = [];
		if(dataBoxConfig.body) {
			dataBoxConfig.body.map(config => {
				data['body'].push({
					label : l(config.displayLabel),
					value : this[config.formatter](e.feature.getProperty(config.displayValue),config)
				})
			});
		}
		const footerValue = e.feature.getProperty(dataBoxConfig.footer.displayValue);
		if(footerValue) {
			data['footer'] = {
				label : l(dataBoxConfig.footer.displayLabel),
				value : footerValue
			};
		}
		data['styles'] = style;

		this.setState({
			boxData : data,
			showDataBox : true
		});


	}

	/**
	 * Responds to the mouse-out event on a map shape (state).
	 *
	 * @param {?google.maps.MouseEvent} e
	 */
	mouseOutOfRegion(e) {
		// reset the hover state, returning the border to normal
		this.setState({
			showDataBox : false
		});
		e.feature.setProperty('state', 'normal');
	}
}



