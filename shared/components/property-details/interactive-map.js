import React, {Component } from 'react';
import PropTypes from 'prop-types';
import LocationMap from './location-map';
import { triggerListHubEvent } from 'utils/propertyUtil';

export default class InteractiveMap extends Component {

	constructor(props) {
		super(props);
		this.state = {
			places :''
		};
		this.onLocationMapLoad = this.onLocationMapLoad.bind(this);
	}

	static contextTypes = {
		i18n: PropTypes.object
	};

	updatePlaces = (places) => {
		this.setState({
			places : places
		});
	};

	onLocationMapLoad() {
		triggerListHubEvent('PROPERTY_MAP_CLICKED',this.props.details.mlsListing);
	}

	render() {
		const { items,details,nearbyPlaces,height, view } = this.props;
		const { places } = this.state;
		const { l } = this.context.i18n;
		const propertyFormattedAddress = details.property.discloseAddress !== false ? details.property.formattedAddress : l('ADDRESSUNDISCLOSED');
		const propertyName = details.property.discloseAddress !== false ? details.property.name : l('NAMEUNDISCLOSED');
		return (
			<div className="gallery-content-wrapper" id="location">
				<LocationMap
				 lng={details.property.address.geometry.lon}
				 lat={details.property.address.geometry.lat}
				 address={details.property.address}
				 locAddress={propertyFormattedAddress}
				 nearbyPlaces={nearbyPlaces}
				 places={places}
				 onMapLoad={this.onLocationMapLoad}
				 height={height - 120}
				 updatePlaces={this.updatePlaces}
				 propertyName={propertyName}
				 />
			</div>
		);
	}
}
