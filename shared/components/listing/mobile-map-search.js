import React, {Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Input from '../common/input/input';
import googleMapLoader from 'google-map-react/lib/utils/loaders/google_map_loader';
import SiteConfig from '../../config';

const { gmap, localeSettings } = SiteConfig;

export default class MobileMapSearch extends Component {
	static propTypes = {
		google: PropTypes.object,
		cityObj: PropTypes.object
	};

	static defaultProps = {
		cityObj: {}

	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		width: PropTypes.number,
		country: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.initPlaceSuggest = this.initPlaceSuggest.bind(this);
		this.placeSelected = this.placeSelected.bind(this);
		this.placeAutoComplete = null;
		this.state = {
			cityObj: props.cityObj,
			location:''
		};

	}

	componentDidMount() {
		if (typeof window.google !== 'undefined') {
			this.initPlaceSuggest(window.google.maps);
		} else {
			googleMapLoader({...gmap}).then((google) => {
				this.initPlaceSuggest(google);
			});
		}
	}


	initPlaceSuggest(google) {
		const { country } = this.context;
		/* const options = {
		 types: ['(regions)'],
		 componentRestrictions: {country: 'us'},
		 };*/
		const options = {
			componentRestrictions: {country: localeSettings[country].locationSearchRegion}
		};
		this.placeAutoComplete = new google.places.Autocomplete(ReactDOM.findDOMNode(this.refs.placeInput.refs.input), options);
		this.placeAutoComplete.addListener('place_changed',this.placeSelected);
	}

	placeSelected() {
		const place = this.placeAutoComplete.getPlace();
		const location = place.geometry.location;
		// console.log(place);
		// TO DO create result page route
		this.context.router.push({
			pathname : '/profile/location/property-listing',
			state : {
				location : {
					lat : location.lat(),
					lng : location.lng()
				},
				place : place
			}
		});

		this.props.removeModal();

	}

	render() {
		const {cityObj} = this.state;
		const { l,width } = this.context.i18n;
		return (

			<div className="search-box col-xs-11 col-sm-12 col-md-12 col-lg-12" ref="searchbox">
					<Input
						ref="placeInput"
						placeholder={`${l('CITY')} / ${l('LOCATION')}`}
						value={cityObj.formatted_address || ''}
						autoFocus={true}
						classes="no-border quick-search-input"
						onChange={() => {}}
					/>
			</div>

		);
	}

}

