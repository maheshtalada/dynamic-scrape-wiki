import React , { Component } from 'react';
import PropTypes from 'prop-types';
import googleMapLoader from 'google-map-react/lib/utils/loaders/google_map_loader';
import Spinner from '../components/common/spinner/spinner';
import NoResults from '../components/common/no-results/no-results-found';
import Cx from 'classnames';
import SiteConfig from '../config';

const { gmap } = SiteConfig;

if (typeof(window) === 'undefined') {
	global.window = new Object();
	global.document = new Object();
}

export default class BaseLocationMap extends Component {

	static propTypes = {
		mapStyle: PropTypes.any,
		textStyle: PropTypes.object,
		address: PropTypes.string,
		zip: PropTypes.number,
		streetView: PropTypes.bool,
		zoomLevel: PropTypes.number,
		streetViewZoom: PropTypes.number,
		defaultText: PropTypes.string,
		errorText: PropTypes.string
	};


	static defaultProps = {
		streetView: 1,
		zoomLevel: 10,
		streetViewZoom: 50,
		zip: 0,
		mapStyle: '',
		textStyle: '',
		defaultText: 'Please Provide address',
		errorText: 'Couldn\'t load maps for the address'
	};

	componentDidMount() {
		 this.loadGmap();
	}

	loadGmap() {
		 googleMapLoader(gmap).then((google) => {
			this.loadMap = true;
			this.google = google;
			//this.forceUpdate();
		});
	}

	renderPanaroma(latLang, panoId) {
		const streetView = new this.google.StreetViewService();
		const latlng = new this.google.LatLng(latLang)
		streetView.getPanoramaByLocation(panoId, this.props.streetViewZoom, (data, status) => {
			if (status === this.google.StreetViewStatus.OK) {
				const panorama = new this.google.StreetViewPanorama(this.map);
				panorama.setPano(data.location.pano);
				const heading = this.google.geometry.spherical.computeHeading(data.location.latLng, latlng);
				panorama.setPov({
					heading,
					pitch: 0,
					zoom: 1
				});
				panorama.setVisible(true);
				this.isStreetViewLoaded = true;
			} else {
				this.setState({
					isStreetViewAvailable : false
				});
				console.log('not street view available')
			}
		});
	}

	directionsService(address, latLang) {
		const directionsService = new this.google.DirectionsService();
		const request = {
			origin: address,
			destination: address,
			travelMode: this.google.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, (response, directionStatus) => {
			if (directionStatus === this.google.DirectionsStatus.OK) {
				const panoId = response.routes[0].legs[0].start_location;
				this.renderPanaroma(latLang, panoId);
			}
		});
	}

	async loadStreetView(ele){
		this.map = ele;
		if(!this.google) {
			await this.loadGmap();
		}
		!this.isStreetViewLoaded && this.directionsService(this.props.address, this.props.latlng);
	}

	renderStreetView() {
		const { isStreetViewAvailable } = this.state;
		const { l } = this.context.i18n;
		return (
			<div ref={(div) => this.loadStreetView(div)} className={Cx("street-view-wrapper",!isStreetViewAvailable && 'no-street-view')}>
				{isStreetViewAvailable ? <Spinner /> :
					<NoResults l={l} title="STREETVIEWNOTAVAILABLE"/>}
			</div>
		);
	}



}
