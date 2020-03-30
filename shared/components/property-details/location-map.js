import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import GoogleMap from 'google-map-react';
import { Scrollbars } from 'react-custom-scrollbars';
import { find as _find } from 'lodash';
import BaseLocationMap from '../../lib/BaseLocationMap';
import Select from '../common/select/select';
import Spinner from '../common/spinner/spinner';
import ReactTooltip from 'react-tooltip';
import { fitBounds } from 'google-map-react/utils';
import SITECONFIG from '../../config';

const { assetsPath, gmap, localeSettings } = SITECONFIG;

const MILETOMETER = 1609; // 1 mile - meters

if (typeof(window) === 'undefined') {
	global.window = new Object();
	global.document = new Object();
}

const createMapOptions = (maps) => {
	return {
		panControl: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: maps.ControlPosition.TOP_RIGHT
		},
		scrollwheel: false,
		streetViewControl: true,
		//mapTypeId: 'satellite',
		gestureHandling: 'auto'
	};
};


const PlaceMarker = ({name, typeIcon, place_id, photoUrl, vicinity, rating=''}) => {
	return (
		<div className="place-marker">
			<div className="marker-icon" data-tip data-for={place_id}>
				<i className={Cx('map-icon',typeIcon)}/>
			</div>
			<ReactTooltip place="top" key={place_id} id={place_id} type="light" effect="solid">
				<div className="place-marker-info">
					{photoUrl && <div className="place-marker-photo"> <img src={photoUrl} height={80} width={90} /></div>}
					<div className="place-marker-info__right">
						<span>{name}, <address>{vicinity}</address></span>
						{ rating &&<span className="rating">{`Rating : ${rating}`}</span>}
					</div>
				</div>
			</ReactTooltip>
		</div>
	)
};

const PropertyMarker = ({address}) => {
	return (
		<div className="property-marker">
			<div className="marker-icon" data-tip="" >
				<img src={`${assetsPath}/logo-tranparent.png`} alt="logo-map"/>
			</div>
			<ReactTooltip place="top" key="property"  type="light" effect="solid">
				<div style={{width: '300px'}}>{address}</div>
			</ReactTooltip>
		</div>
	)
};

//since setTime wont return promise
// we can use this to sleep synchronously
const timeout = (ms)=> {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const START_RADIUS = 1,
	START_ZOOM = 14,
	DEFAULT_PLACE_TYPE = 'school';

// make it dynamic
const RADIUS_TO_ZOOM = {
	1 :  START_ZOOM,
	2 : START_ZOOM - 1,
	3 : START_ZOOM - 1,
	4 : START_ZOOM - 2,
	5 : START_ZOOM - 2,
}

let PlacesObj = [];

export default class LocationMap extends BaseLocationMap {

	/*shouldComponentUpdate = shouldPureComponentUpdate;*/

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		screenSize: PropTypes.number
	};

	static defaultProps = {
		defaultRadius : MILETOMETER,
	};

	constructor(props) {
		super(props);

		this.state = {
			center : {lat : props.lat, lng : props.lng},
			zoom: START_ZOOM,
			map : '',
			maps: '',
			isPlacesLoading: false,
			currentType: DEFAULT_PLACE_TYPE,
			placesCnt: '',
			places: props.places,
			radius : START_RADIUS
		};

		this.onRadiusChange =  this.onRadiusChange.bind(this);
		this.onChange =  this.onChange.bind(this);
		this.togglePlacesOverlay = this.togglePlacesOverlay.bind(this);


		this.markers=[];
		this.placesArr=[];
	}

	async requestPlaces(service , request){
		return new Promise((resolve, reject) => {
			let resultsStore =[];
			service.nearbySearch(request, async(results,status, pagination) => {
				resultsStore.push.apply(resultsStore, results);
				if(pagination && pagination.hasNextPage) {
					await timeout(2000); // need 2 sec delay to make more places
					pagination.nextPage();
					await timeout(1000); // wait 1 sec before resolving*!/*/
				}else {
					resolve({
						results : resultsStore,
						status : status
					});
				}

			});
		});
	};

	//TODO : cache the google places for given radius
	async getPlaces(map, maps, center,type ){
		const { radius, currentType, places } = this.state;
		type = type || currentType;
		const { nearbyPlaces } = this.props;
		const pyrmont = new maps.LatLng(center.lat,center.lng);
		const service = new maps.places.PlacesService(map);
		const placesArr = [];
		const request = {
			location: pyrmont,
			radius: radius * MILETOMETER,
			types: [type]
		};
		const res = await this.requestPlaces(service, request, radius);
		const item = _find(nearbyPlaces, { type : type});
		placesArr.push({
			type: item.type,
			classes: item['icon-class'],
			label: item.label,
			...res
			//data: cachedData && Object.assign({...cachedData.data}, {[radius]: {...res}}) || {[radius]: {...res}}
		});
		return placesArr;

	};

	async onMapLoad(map, maps){
		const { center, radius } = this.state;
		this.setState( {
			map : map,
			maps:maps,
			initialLoad:false,
			isPlacesLoading : true
		});

		this.props.onMapLoad && this.props.onMapLoad();

		const populationOptions = {
			strokeColor: '#739cc0',
			strokeOpacity: 1,
			strokeWeight: 1,
			fillColor: '#CFEBE8',
			fillOpacity: 0.3,
			map: map,
			center: new maps.LatLng(center.lat,center.lng),
			radius: radius * MILETOMETER
		};

		new maps.Circle(populationOptions);

		// Add the circle for this city to the map.
		let places=[];
		places = await this.getPlaces(map, maps, center);
		this.setState({places, isPlacesLoading : false});

	};

	async onPlaceTypeClick(type) {
		const { map, maps, center, currentType} = this.state;
		this.setState({
			isPlacesLoading : true,
			currentType : type,
			showPlacesOverlay : false
		});
		if(type === currentType) {
			this.setState({
				isPlacesLoading : false
			});
			return ;
		}
		let places=[];
		places = await this.getPlaces(map, maps, center, type);
		this.setState({
			isPlacesLoading : false,
			places : places
		});
	}

	onChange({bounds, size}) {
		/*console.log(bounds);
		const {center, zoom} = fitBounds({nw : bounds.nw, se : bounds.se}, size);
		console.log(center, zoom);*/
	}

	getPlaceByType(currentType) {
		const { places } = this.state;
		return _find(places,{ 'type' : currentType});
	}

	showNearPlaces(currentType) {
		const placesObj = this.getPlaceByType(currentType);
		const { results, classes } = placesObj;
		if(results.length === 0) {
			return;
		}
		return results.map(place => {
			return (
				<PlaceMarker
					typeIcon={classes}
					photoUrl={place.photos && place.photos[0].getUrl({'maxWidth': 90, 'maxHeight': 90})}
					key={place.place_id}
					id={place.place_id}
					lat={place.geometry.location.lat()}
					lng={place.geometry.location.lng()}
					{...place}/>
			)
		})
	}

	renderPropertyMarker() {
		const { center } = this.state;
		return <PropertyMarker
			id={1}
			lat={center.lat}
			lng={center.lng}
			key={1}
			address={this.props.locAddress}
		/>
	}

	togglePlacesOverlay(e) {
		e.stopPropagation();
		this.setState({
			showPlacesOverlay : !this.state.showPlacesOverlay
		})
	}

	renderPlacesWrapper() {
		const { currentType } = this.state;
		const { l } = this.context.i18n;
		return (
			<div className="places-wrapper">
				<div className="places-control">
					{/*<span>{`${l('NEARBYPLACES')}`}</span>*/}
					<div className="places-control__radius">
						<span>{`${l('RADIUS')}(MI)`}</span>
						<Select
							btnClassName={'btn btn-default places-radius'}
							options={[...Array(5)].map((key,i)=>({name : i+1 , value : i+1}))}
							selected={this.state.radius - 1}
							inputClasses="no-border"
							onChange={this.onRadiusChange}
						/>
					</div>
				</div>
				<Scrollbars className="places" autoHeight={true} autoHeightMin={300} autoHeightMax={600} >
					<ul className="places-items-wrapper">
						{this.renderPlaces(l, currentType)}
					</ul>
				</Scrollbars>
			</div>
		)
	}

	renderPlaceToShowMobile(nearbyPlaces,l,currentType) {
		const placeToShow = _find(nearbyPlaces,{'type' : currentType});
		return (
			<ul className="current-showing-place places-items-wrapper" onClick={this.togglePlacesOverlay}>
				{this.renderPlace(placeToShow || nearbyPlaces[0],l, currentType)}
			</ul>
		)
	}

	renderPlace(place,l,currentType) {
		const { isPlacesLoading, places } = this.state;
		const googlePlaceResult = _find(places, { 'type' : place.type});
		return (
			<li className={place.type === currentType ? 'active' :''} onClick={()=>{
				this.onPlaceTypeClick(place.type,place['icon-class']);
			}}>
				<i className={Cx('map-icon',place['icon-class'])} />{l(place.label)}{isPlacesLoading && place.type === currentType ? <Spinner /> : `${googlePlaceResult ? ` (${googlePlaceResult.results.length})`: ''}` }
			</li>
		)
	}

	renderPlaces(l, currentType) {
		const { nearbyPlaces } = this.props;
		return nearbyPlaces.map((place)=> {
			return this.renderPlace(place,l,currentType);
		});
	}

	onRadiusChange(changedRadius) {
		this.setState({radius : changedRadius, zoom: RADIUS_TO_ZOOM[changedRadius], loading : true})
	}

	render() {
		const { l } = this.context.i18n;
		const { screenSize } = this.context;
		const { currentType, showPlacesOverlay } = this.state;
		const { nearbyPlaces } = this.props;
		return (
			<div className="interactive-map-wrap">
				{screenSize > 1 && this.renderPlacesWrapper()}
				{screenSize === 1 && this.renderPlaceToShowMobile(nearbyPlaces,l,currentType)}
				{showPlacesOverlay && <div className="places-overlay-wrapper">
					<button className="close-overlay" onClick={this.togglePlacesOverlay}><i className="pe-7s-close-3"/></button>
					{this.renderPlacesWrapper()}
					<div className="back-drop"></div>
				</div>}
				<div className="map-wrapper">
					<GoogleMap
						key={this.state.radius}
						onGoogleApiLoaded={({map, maps}) => this.onMapLoad(map, maps)}
						center={this.state.center}
						zoom={this.state.zoom}
						onChange={this.onChange}
						options={createMapOptions}
						yesIWantToUseGoogleMapApiInternals={true}
						bootstrapURLKeys={gmap}>
						{this.renderPropertyMarker()}
						{ this.getPlaceByType(currentType) && this.showNearPlaces(currentType)}
					</GoogleMap>
				</div>

			</div>
		);
	}
}



