import React, {Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import { propertytypes } from '../../assets/static/property-types-map.json';
import { map as _map } from 'lodash';
import ListingMapMarker from './listing-map-marker';
import supercluster from 'points-cluster';
import { Panel, PanelBody } from '../../components/common/panel';
import loadable from '@loadable/component';
import SiteConfig from '../../config';
import uniqueId  from 'utils/uniqueFormId';


const ListingGridTile = loadable(() => import(/* webpackChunkName: 'ListingGridTile' */'../../components/common/listing-tile-components/listing-grid-tile'));
const { gmap } = SiteConfig;

if (typeof(window) === 'undefined') {
	global.window = new Object();
	global.document = new Object();
}

const createMapOptions = (maps) => {
	return {
		panControl: true,
		mapTypeControl: true,
		scrollwheel: false,
		streetViewControl: true,
		maxZoom: 20,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.LEFT_TOP
		}
	};
};

//Example values of min & max latlng values
function findBounds(lat_min,lat_max, lng_min,  lng_max, map, maps) {
	map.setCenter(maps.LatLng(((lat_max + lat_min) / 2.0),((lng_max + lng_min) / 2.0)));
	map.fitBounds(maps.LatLngBounds(
		//bottom left
		maps.LatLng(lat_min, lng_min),
		//top right
		maps.LatLng(lat_max, lng_max)
	));
}

const ClusterMarker = ({count, clusterId='', lat, lng, onClusterClick, points, zoom}) => {
	return (
		<div className="listing-map-marker" onClick={(e)=>onClusterClick(lat,lng, clusterId, points, zoom)}>
			<div className="listing-map-marker__marker cluster">
				{count}
			</div>
		</div>
	)
};

function fitBoundsNeSw(bounds, maps, map) {
	const boundsArr = bounds.split(',');
	const neNew = new maps.LatLng( boundsArr[0], boundsArr[1] );
	const swNew = new maps.LatLng( boundsArr[2], boundsArr[3] );
	const boundsNew = new maps.LatLngBounds( swNew, neNew );
	map.fitBounds( boundsNew )
	return map;
}

const CLUSTER_RADIUS = 80;
const DEFAULT_ZOOM = 9;

export default class LocationDetailMap extends Component {

	// shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		onPositionChange: PropTypes.func,
		locateProperty: PropTypes.func,
		onBoundChange : PropTypes.func,
		mapRadius : PropTypes.number
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath: PropTypes.string
	};

	static defaultProps = {
		height : 560,
		lat: 12.9833,
		lon: 77.5833,
		onPositionChange : () =>{},
		updatePlace : () =>{},
		locateProperty : () => {},
		onBoundChange : () => {},
		isBoundsApply : true
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

	static pointsToZoom(points, map, maps, lookup ) {
		const latMin = _map(points, lookup.lat).sort((a, b)=> a-b)[0];
		const latMax = _map(points, lookup.lat).sort((a, b)=> b-a)[0];
		const lngMin = _map(points, lookup.lng).sort((a, b)=> a-b)[0];
		const lngMax = _map(points, lookup.lng).sort((a, b)=> b-a)[0];
		map.fitBounds(new maps.LatLngBounds(
			//bottom left
			new maps.LatLng(latMin, lngMin),
			//top right
			new maps.LatLng(latMax, lngMax)
		));

		return map.getZoom();
	}

	constructor(props) {
		super(props);
		this.state = {
			center : LocationDetailMap.getMapCenter(props.lat,props.lon,props.mapBounds),
			lat : props.lat,
			lon : props.lon,
			mapBounds: props.mapBounds,
			zoom: DEFAULT_ZOOM,
			map : '',
			maps:'',
			mode : '',
			initialLoad: true,
			infoWindow:'',
			listings:props.listings,
			typeIcons : (()=>{
				return _map(propertytypes,(type)=>{
					return {
						[type.code] : type['icon-class']
					};
				});
			})()
		};

		this.markers=[];
		this.place='';
		this.bounds='';
		this.initialZoom = DEFAULT_ZOOM;
	}

	componentWillReceiveProps(props) {
		const { map='', maps='', mode } = this.state;
		if(props && typeof(props.isFetching) !== 'undefined' && !props.isFetching && props.markerIndex !== 'stop-render') {
			this.setState({
				currentCluster : '',
				listings:  props.listings,
				mapBounds: props.mapBounds || this.state.mapBounds,
				markerHovered: props.markerIndex
			},()=>{
				if(maps) {
					!props.isBoundsApply && fitBoundsNeSw(this.state.mapBounds, maps, map);
				}
			});
		}

	}

	_onDragEnd = (Object,map,maps) => {
		const bound = map.getBounds();
		const ne = bound.getNorthEast();
		const sw = bound.getSouthWest();
		this.setState({
			mode : 'bound',
			map : map,
			currentCluster : ''
		});
		if (this.props.onBoundChange && Object) {
			this.props.onBoundChange(ne.lat(),ne.lng(),sw.lat(),sw.lng());
		}
	}

	_onZoomChange = (Object,map, maps) => {
		const { initialLoad, zoom } = this.state;
		const bound = map.getBounds();
		const ne = bound.getNorthEast();
		const sw = bound.getSouthWest();

		if (!this.isLoadData && this.props.onBoundChange && Object) {
			this.setState({
				zoom : map.getZoom(),
				clusterId : '',
				loadMarkers : false,
				currentCluster : ''
			});
			//this.props.onBoundChange(ne.lat(),ne.lng(),sw.lat(),sw.lng());
		}

		this.isLoadData = false;
	};

	_onZoomAnimationEnd = (Object,map, maps)=>{
		this.setState({loadMarkers: true});
	}

	onMapLoad(map, maps){
		const { listings, mapBounds, zoom } = this.state;
		const { mapmovetxt } = this.props;
		const calculatedZoom = LocationDetailMap.pointsToZoom(listings, map, maps, { lat  : 'geometry.lat' , lng : 'geometry.lon'});
		this.setState( {
			map : map,
			maps: maps,
			zoom : LocationDetailMap.pointsToZoom(listings, map, maps, { lat  : 'geometry.lat' , lng : 'geometry.lon'}),
			currentCluster : '',
			loadMarkers : zoom === calculatedZoom
		});
	}

	onClusterClick(lat, lng, clusterId='',points,zoomIn) {
		const  { zoom, map, maps } = this.state;

		//this.currentCluster = points;
		this.setState({
			center : {
				lat,
				lng
			},
			clusterId : clusterId,
			zoom : LocationDetailMap.pointsToZoom(points, map, maps,{ lat  : 'geometry.lat' , lng : 'geometry.lon'}),
			loadMarkers : false,
			currentCluster : points
		})
	}

	renderMarkerInfo(item) {
		const { searchFacets } = this.props;
		const { country, i18n, awsImagePath } = this.context;
		return (
			<div>
				<PanelBody>
					<ListingGridTile
						listing={item}
						screenSize={this.props.screenSize}
						location={this.props.location}
						user={this.props.user}
						dispatch={this.props.dispatch}
						facets={searchFacets}
						country={country} l={i18n.l}
						renderBundleBox={item.bundles && this.props.renderBundleBox}
						awsImagePath={awsImagePath}/>
				</PanelBody>
			</div>
		)
	}

	renderMarker({numPoints, wx, wy, points, zoom}, index) {
		if(numPoints === 1) {
			return <ListingMapMarker key={points[0].id}
									 lat={wy}
									 lng={wx}
									 markerIndex={index}
									 renderMarkerInfo={()=>{return this.renderMarkerInfo(points[0])}}
									 listing={points[0]}/>
		}
		return <ClusterMarker
			key={points[0].id}
			lat={wy}
			lng={wx}
			count={numPoints}
			points={points}
			zoom = {zoom}
			markerIndex={index}
			onClusterClick={this.onClusterClick.bind(this)}
		/>
	}
	renderMarkers() {
		const { listings, markerHovered, markerShown, map, zoom, clusterId= '', currentCluster = ''} = this.state;
		const bounds = map.getBounds();
		const pointsList = currentCluster || listings;
		//const currentZoom = map.getZoom();
		const aNorth  =   bounds.getNorthEast().lat();
		const aEast   =   bounds.getNorthEast().lng();
		const aSouth  =   bounds.getSouthWest().lat();
		const aWest   =   bounds.getSouthWest().lng();

		const list =  pointsList.map(listing => ({
				id : listing.id,
				lat : listing.geometry.lat,
				lng : listing.geometry.lon,
				...listing
			})
		);

		const cluster = supercluster(list, {
			minZoom : 5, // min zoom to generate clusters on
			maxZoom: 19, // max zoom level to cluster the points on
			radius: 40 // cluster radius in pixels
		});

		const clusterData = cluster({ bounds: { nw: { lat: aNorth, lng: aWest }, se: { lat: aSouth, lng: aEast } }, zoom: zoom });

		if(clusterData && clusterData.length) {
			return clusterData.map((listing,index) => this.renderMarker(listing, index))
		}
		return null;
	}


	render() {
		const { center, zoom, loadMarkers, id='', listings } = this.state;
		return (
			<div id="property-listings-map-container" className="schema-map-wrapper">
				<GoogleMap
					center={center}
					onDragEnd={this._onDragEnd}
					onZoomChange={this._onZoomChange}
					onZoomAnimationEnd={this._onZoomAnimationEnd}
					onGoogleApiLoaded={({map, maps}) => this.onMapLoad(map, maps)}
					zoom={zoom}
					options={createMapOptions}
					bootstrapURLKeys={gmap}>
					{loadMarkers && this.renderMarkers()}
				</GoogleMap>
			</div>
		);
	}
}
