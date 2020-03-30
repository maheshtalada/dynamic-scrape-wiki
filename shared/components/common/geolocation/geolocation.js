import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import Spinner from '../spinner/spinner';

class Geolocation extends Component {

	static contextTypes = {
		i18n: PropTypes.object
	};

	static PropTypes = {
		onDetectLocation: PropTypes.func,
		showLocationFetchError: PropTypes.bool
	};

	static defaultProps = {
		onDetectLocation: () => {},
		showLocationFetchError: false
	};

	constructor(props) {
		super(props);
		this.onClickLocateMe = this.onClickLocateMe.bind(this);
		this.state = {
			fetchingLocation: false,
			errorFetchingLocation: false
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			errorFetchingLocation: props.showLocationFetchError
		});
	}

	onClickLocateMe() {
		const geocoder = new google.maps.Geocoder();
		this.setState({
			fetchingLocation: true
		});
		navigator.geolocation.getCurrentPosition((position)=>{
			const { latitude,longitude } = position.coords;

			const latlng = new google.maps.LatLng(latitude,longitude);

			geocoder.geocode({'latLng':latlng},(results,status)=>{

				this.setState({
					fetchingLocation: false
				});

				if ( status === 'OK') {
					this.props.onDetectLocation(results[0],'',latlng);
				} else {
					this.setState({
						errorFetchingLocation: true
					});
				}
			});

		},(error)=>{
			this.setState({
				fetchingLocation: false,
				errorFetchingLocation: true
			});
		});
	}

	render() {
		const { l } = this.context.i18n;
		const { screenSize } = this.props;
		const { fetchingLocation, errorFetchingLocation } = this.state;

		return (
			<div className="geolocation-wrapper">
				<Button onClick={this.onClickLocateMe} className="geolocation-wrapper__btn" btnClassName="btn btn-default">
					{fetchingLocation &&
						<Spinner/>
					}
					<i className="pe-7s-geo-location" />
					<span>{l('LOCATEME')}</span>
				</Button>
				{errorFetchingLocation &&
					<p className="geolocation-wrapper__loc-fetch-error">
						{l('COULDNOTFETCHLOCATION')}
					</p>
				}
			</div>
		);
	}
}

export default Geolocation;
