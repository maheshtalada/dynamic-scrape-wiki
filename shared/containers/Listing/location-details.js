import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import Card from '../../components/common/card/card';
import { isEmpty, values, cloneDeep, sortBy, extend, debounce} from 'lodash';
import { Schema } from '../../components/schema';
import Cx from 'classnames';
import LocationDetailMap from '../../components/listing/location-details-map';
import { getAddressComponent, getPropertyNameFromGooglePlace } from '../../utils/placesAPIUtil';
import LinearNavigation from '../../components/common/linear-navigation/linear-navigation';
import Loader from '../../components/common/page-loader/loader';
import { modal } from 'react-redux-modal';
import SiteConfig from '../../config';
import googleMapLoader from 'google-map-react/lib/utils/loaders/google_map_loader';
import MobileMapSearch from '../../components/listing/mobile-map-search';
import axios from 'axios';
import Autocomplete from '../../components/common/autocomplete/autocomplete';
import { isEmpty as _isEmpty } from 'lodash';
import MetrosServedNote from 'components/metros-served-note/metros-served-note';
import { REQUEST_GET_BASIC_SCHEMA, REQUEST_ADD_BASIC_SCHEMA } from '../../redux/actions/schema';

const { gmap, localeSettings, api, endpoints, searchStateCode } = SiteConfig;
const SEARCH_CHAR_LENGTH_MIN = 3;

// TODO move below to separate config
const SUBMIT_ERROR_MSG = 'MANDATORYMESSAGE';
// define step constants
const LOCATION = 'location',
	PROPERTY = 'property',
	ICONS = {
		'LAND' : 'land',
		'AGRICULTURAL' : 'agricultural',
		'OFFICE' : 'office',
		'HOTEL' :  'lodging',
		'RESIDENTIAL' : 'residential',
		'HEALTHCARE': 'health-care',
		'INDUSTRIAL' : 'industrial',
		'RETAIL' : 'retail',
		'OTHER' : 'others'
	};

class LocationDetails extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country : PropTypes.string,
		visitorCountry : PropTypes.string,
		assetsPath : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.initPlaceSuggest = this.initPlaceSuggest.bind(this);
		this.getSuggestions = debounce(this.getSuggestions,400);
		this.placeSelected = this.placeSelected.bind(this);
		this.onPositionChange = this.onPositionChange.bind(this);
		this.updatePlace = this.updatePlace.bind(this);
		this.onDetectLocation = this.onDetectLocation.bind(this);
		this.onSchemaChange = this.onSchemaChange.bind(this);
		this.handleGooglePlacesPredictions = this.handleGooglePlacesPredictions.bind(this);
		this.placeAutoComplete = null;
		this.state = {
			cityObj: '',
			location: ((data)=>{
				if(data.geolocation) {
					return {
						lat : data.geolocation.lat,
						lon : data.geolocation.lon,
						showInfo : false
					};
				}
				return '';
			})(props.schema_get_basic),
			isFetching: false,
			modifiedValues :{},
			initialValues:{},
			showSchema : true,
			isError: false,
			showProperties: false,
			isMapLoaded:false,
			showPropertytypeSchema: false,
			showAddressSchema : true,
			showRight: false,
			showLocationFetchError: false,
			showGeolocation: true,
			propertySuggestions : [],
			addressSuggestions : [],
			searchTerm: '',
			mode : '',
			emptyPropertySchema : {},
			isMapRefresh : true,
			isLoadSchema : false
		};

	}

	populateAddress(place) {

		return {
			'propertylisting.property.name' : place.name || getPropertyNameFromGooglePlace(place),
			'propertylisting.property.address.lineOne' : getPropertyNameFromGooglePlace(place),
			'propertylisting.property.address.lineTwo' : '',
			'propertylisting.property.address.region' : getAddressComponent(place.address_components,'administrative_area_level_2', 'short_name') || '',
			'propertylisting.property.address.locality' : (()=>{
				const nbh = getAddressComponent(place.address_components,'neighborhood', 'short_name'),
					sbl2 = getAddressComponent(place.address_components,'sublocality_level_2', 'short_name'),
					line2 = nbh && sbl2 ? `${nbh}, ${sbl2}` : '';
				const city = getAddressComponent(place.address_components,'locality', 'short_name');
				return line2 || nbh || sbl2 || city;
			})(),
			'propertylisting.property.address.city' : getAddressComponent(place.address_components,'locality', 'short_name') || '',
			'propertylisting.property.address.stateCode' : getAddressComponent(place.address_components,'administrative_area_level_1', 'short_name') || '',
			'propertylisting.property.address.zipCode' : getAddressComponent(place.address_components,'postal_code', 'short_name') || '',
			'propertylisting.property.address.country' : getAddressComponent(place.address_components,'country', 'short_name') || '',
			'propertylisting.property.address.geometry.lat' : (typeof place.geometry.location.lat === 'function' ? place.geometry.location.lat() : place.geometry.location.lat ),
			'propertylisting.property.address.geometry.lon' : (typeof place.geometry.location.lng === 'function' ? place.geometry.location.lng() : place.geometry.location.lng )
		};
	}

	componentWillReceiveProps(props) {
		const { mode } = this.state;
		if(props.schema_save_basic && props.schema_save_basic.listingid) {
			this.context.router.push({
				pathname : `/profile/listing/property-listing/${props.schema_save_basic.listingid}`
			});
		}else if(props.schema_save_basic && props.schema_save_basic.isFetching) {
			this.setState({
				isFetching: props.schema_save_basic.isFetching
			});
		}else if(props.schema_get_basic && props.schema_get_basic.isFetching) {
			this.setState({
				isLoadSchema : props.schema_get_basic.isFetching
			});
		}else if(props.schema_get_basic && !props.schema_get_basic.isFetching) {
			const toggleFlag = !!mode;
			this.setState({
				location: ((data)=>{
					if(data.geolocation) {
						return {
							lat : data.geolocation.lat,
							lon : data.geolocation.lon,
							showInfo : toggleFlag
						};
					}
					return '';
				})(props.schema_get_basic),
				isMapLoaded : true,
				isLoadSchema : false,
				showRight : toggleFlag,
				isMapRefresh: true,
				emptyPropertySchema : !toggleFlag ? props.schema_get_basic.schema.schemas[0] : this.state.emptyPropertySchema
			});
		}
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

	addModal() {
		modal.add(MobileMapSearch, {
			title: 'Search',
			size: 'custom', // large, medium or small,
			closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideTitleBar: false,// (optional) Switch to true if do not want the default title bar and close button,
			hideCloseButton: false // (optional) if you don't wanna show the top right close button
		});
	}

	initPlaceSuggest(google) {
		this.autoCompleteService = new google.places.AutocompleteService();
		this.placesService = new google.places.PlacesService(document.createElement('div'));
	}

	/*
	 these predictions no need to go global store
	 hence doing xhr call using axios here
	 */

	getSuggestions() {
		const { country } = this.context,
			query = this.state.searchTerm,
			// TODO : if new searchTerm part of old data & old data.length === 3 , don't make server call
			headerPayload = Object.assign({'countrycode' : country}),
			config = {
				method : 'GET',
				url: `${api.protocol}://${api.host}:${api.port}${api.prefix}${endpoints.locationproperties}${query}`,
				headers : headerPayload
			};
			this.setState({
				loading : true
			});
			axios(config).then(
				(response) => {
					this.setState({
						loading : false,
						propertySuggestions : response.data || []
					});
				},
				(error) => {
					this.setState({
						loading : false
					});
					console.log(error);
				}
			);

	}

	getPredictions(val) {
		const { country } = this.context;
		if(val.length < SEARCH_CHAR_LENGTH_MIN ) {
			this.setState({
				addressSuggestions: [],
				propertySuggestions : []
			});
			return;
		}
		this.setState({
			showLocationFetchError: false,
			loading: true
		});
		val = val ? val.trim() : '';
		if(val.length >= SEARCH_CHAR_LENGTH_MIN) {
			this.autoCompleteService.getPlacePredictions(
				{
					input: val,
					componentRestrictions: {
						country: localeSettings[country].locationSearchRegion
					}
				},this.handleGooglePlacesPredictions
			);
		}
		if(!!val) {
			this.setState({
				showGeolocation: false
			});
		} else {
			this.setState({
				showGeolocation: true
			});
		}
	}

	handleGooglePlacesPredictions(predictions,status) {
		if(status !== 'OK') {
			this.setState({
				addressSuggestions: [],
				loading: false
			});
		} else {
			if(searchStateCode) {
				const regex = new RegExp(searchStateCode,'g');
				predictions = predictions.filter(place => {
					return place.structured_formatting.secondary_text && place.structured_formatting.secondary_text.match(regex)
				});
			}
			this.setState({
				addressSuggestions : predictions,
				loading: false
			},this.getSuggestions);
		}
	}

	placeSelected(state) {
		if(state.place_id) {
			this.placesService.getDetails({
				placeId: state.place_id
			}, (place, status)=> {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					const { location } = place.geometry;
					this.setState({
						location : {
							'lat' : location.lat(),
							'lon' : location.lng(),
							'showInfo' : true
						},
						showProperties : false,
						showRight : true,
						cityObj : place,
						address : place.formatted_address,
						modifiedValues:this.populateAddress(place),
						initialValues: {},
						mode : LOCATION,
						showAddressSchema : true,
						showPropertytypeSchema : false,
						isMapRefresh : true,
						propertySchemaKey : state.place_id
					});
				}
			});
		} else {
			this.setState({
				mode : PROPERTY,
				address : state.name,
				modifiedValues :{},
				initialValues:{},
				showAddressSchema: true,
				showPropertytypeSchema : false,
				propertySchemaKey : state.id
			}, () => {
				this.props.dispatch(REQUEST_GET_BASIC_SCHEMA({
					'params' : {'propertyid' : state.id}
				}));
			});

		}
	}

	updatePlace(place, location) {
		this.setState({
			cityObj : place,
			location : {
				'lat' : location.lat(),
				'lon' : location.lng()
			},
			showRight : false,
			modifiedValues:this.populateAddress(place),
			initialValues: {},
			mode : LOCATION
		});
	}

	hideDataRight() {
		this.setState({
			showRight : false
		});
	}


	onPositionChange(place) {
		const { location } = place.geometry;
		place.description = place.formatted_address;
		this.setState({
			location : {
				'lat' : location.lat(),
				'lon' : location.lng(),
				'showInfo' : true
			},
			showProperties : false,
			showRight : true,
			cityObj : place,
			address : place.formatted_address,
			modifiedValues:this.populateAddress(place),
			initialValues: {},
			mode : LOCATION,
			showAddressSchema : true,
			showPropertytypeSchema : false,
			isMapRefresh : true,
			propertySchemaKey : place.place_id,
			searchTerm :  place.formatted_address,
			propertySuggestions : [],
			addressSuggestions : [place]
		});
	}

	onSchemaChange(changeObject, hasErrors) {
		const { schema_get_basic } = this.props;
		this.setState({
			changeObject,
			hasErrors,
			isMapRefresh : false
		});
		let schemaLength = values(schema_get_basic.schema.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	goToNext(toggleObj) {
		let schemasAreValid = true;
		if(!toggleObj.showAddressSchema) {
			if (this.refs[`schema_${1}`] && !this.refs[`schema_${1}`].checkSubmissionValid()) {
				schemasAreValid = false;
			}

			if(schemasAreValid) {
				this.setState({
					...toggleObj,
					isMapRefresh : false
				});
				return;
			}
			window.scrollTo(0,0);
			return;
		}
		this.setState({
			...toggleObj,
			isMapRefresh : false
		});
	}

	renderPropertyTypesSchema() {
		const { i18n, country } = this.context;
		const { schema_get_basic } = this.props;
		const { mode , emptyPropertySchema, propertySchemaKey } = this.state;

		if (isEmpty(schema_get_basic.schema)) {
			return null;
		}
		let propertyStructure = mode === LOCATION ? emptyPropertySchema : schema_get_basic.schema.schemas[0],
			referenceData = schema_get_basic.schema.referenceData;
		/* listSchema = sortBy(values(propertyStructure), (o)=> {
		 return o.order;
		 });*/
		return (
			<div>
				<Schema
					key={propertySchemaKey}
					l={i18n.l}
					country = {country}
					index={0}
					ref={`schema_${0}`}
					data={propertyStructure}
					writeMode={true}
					onChange={this.onSchemaChange}
					updateonPropsChange={true}
					modifiedValues={this.state.modifiedValues}
					initialValues={this.state.initialValues}
					referenceData={referenceData}
				/>
			</div>
		);
	}
	renderLocationSchema() {
		const { i18n, country } = this.context;
		const { schema_get_basic } = this.props;
		if (isEmpty(schema_get_basic.schema)) {
			return null;
		}
		let propertyStructure = schema_get_basic.schema.schemas[1],
			referenceData = schema_get_basic.schema.referenceData;
		/* listSchema = sortBy(values(propertyStructure), (o)=> {
		 return o.order;
		 });*/
		return (
			<div>
				<Schema
					index={1}
					ref={`schema_${1}`}
					l={i18n.l}
					country = {country}
					data={propertyStructure}
					writeMode={true}
					updateonPropsChange={true}
					onChange={this.onSchemaChange}
					modifiedValues={this.state.modifiedValues}
					initialValues={this.state.initialValues}
					referenceData={referenceData}
				/>
			</div>
		);
	}

	onSubmit() {
		let schemasAreValid = true;
		if (this.refs[`schema_${0}`] && !this.refs[`schema_${0}`].checkSubmissionValid()) {
			schemasAreValid = false;
		}
		if(schemasAreValid) {
			this.props.dispatch(REQUEST_ADD_BASIC_SCHEMA({
				...extend({},this.state.initialValues,this.state.modifiedValues)
			}));
			return;
		}
		window.scrollTo(0,0);
	}

	onPropertySelect(evt) {
		this.setState({
			selectedValue : evt.currentTarget.value,
			isError : false,
			modifiedValues : {},
			initialValues : {},
			buildingSchema : false
		});
	}

	toggleClass() {
		this.setState({
			modifiedValues :  !this.state.showSchema ? this.populateAddress(this.state.cityObj) : {},
			initialValues: {},
			showSchema : !this.state.showSchema,
			selectedValue : '',
			isError : false
		});
	}

	renderLocate() {
		const { l } = this.context.i18n;
		const { showSchema, showAddressSchema, showPropertytypeSchema } = this.state;
		const toggle = (showSchema) ? 'show' : 'hide';
		const addressSchemaClasses = showAddressSchema ? 'show-animate-left-slide' : 'hide-animate-slide';
		const propertyTypeClasses = showPropertytypeSchema ? 'show-animate-right-slide' : 'hide';
		return (
			<div className="results-wrapper">
				<div className={Cx('results-wrapper-items',toggle)}>
					<div className={Cx('location-schema-wrapper',addressSchemaClasses)}>
						<span>{l('CONFIRMADDRESS')}</span>
						{ this.renderLocationSchema()}
						<div className="navigation-links">
							<LinearNavigation
								nextText="NEXTTOCREATEPROPERTY"
								backText="BACKTOMAP"
								className="linear-navigation--light-theme"
								isSaveExitRequired={false}
								onNext={() => this.goToNext({
									showAddressSchema: false,
									showPropertytypeSchema : true
								})}
								onBack={()=>{
									this.hideDataRight();
								}}
							/>
						</div>
					</div>
					<div className={Cx('propertytypes-schema-wrapper',propertyTypeClasses)}>
						{ this.renderPropertyTypesSchema()}
						<LinearNavigation
							nextText="NEXTTOFINANCIAL"
							backText="BACKTOADDRESS"
							className="linear-navigation--light-theme"
							isSaveExitRequired={false}
							onNext={() => this.onSubmit(true)}
							onBack={() => this.goToNext({
								showAddressSchema: true,
								showPropertytypeSchema : false
							})}
						/>
					</div>
				</div>
			</div>
		);
	}

	updateClasses(dir) {
		const { showRight } = this.state;
		const { screenSize } = this.props;
		if(!showRight && dir === 'left') {
			return 'col-lg-12 col-md-12 col-sm-12 col-xs-12';
		}

		if(showRight && dir === 'left') {
			return screenSize > 3 ? 'col-lg-8 col-md-8 col-sm-8 col-xs-12' : 'hide-animate-slide width-height-none';
		}

		if(showRight && dir === 'right') {
			return screenSize > 3 ? 'col-lg-4 col-md-4 col-sm-4' : 'col-lg-8 col-md-6 col-sm-10 col-xs-12';
		}

	}

	onDetectLocation(place,name,location) {
		place.description = place.formatted_address;
		this.setState({
			location : {
				'lat' : location.lat(),
				'lon' : location.lng(),
				'showInfo' : true
			},
			showProperties : false,
			showRight : true,
			cityObj : place,
			address : place.formatted_address,
			modifiedValues:this.populateAddress(place),
			initialValues: {},
			mode : LOCATION,
			showAddressSchema : true,
			showPropertytypeSchema : false,
			isMapRefresh : true,
			propertySchemaKey : place.place_id,
			searchTerm :  place.formatted_address,
			showGeolocation: false,
			propertySuggestions : [],
			addressSuggestions : [place]
		});
	}

	renderItems(items) {
		const { l } = this.context.i18n;
		return items.map((item, index) => {
			const type = item.props['data-item-type'];
			if (index === 0 || items[index - 1].props['data-item-type'] !== type) {
				const style = {
					background: '#eee',
					color: '#454545',
					padding: '2px 6px',
					fontWeight: 'bold'
				};
				return [<div style={style}>{l(type)}</div>, item];
			}
			return item;
		});
	}

	renderAutoCompleteItem(searchTerm, index, item, isHighlighted) {
		const pattern = new RegExp('^' + searchTerm, 'gi'),
			itemText = item.description || item.name,
			displayText = itemText.replace(pattern,`<span style="font-weight:bold;">${searchTerm}</span>`);
		return (
			<div className={`autocomplete-menu__item ${isHighlighted && 'highlight'}`}
				 key={item.place_id || item.id}
				 data-item-type={item.place_id ? 'MATCHINGADDRESSES' : 'MATCHINGPROPERTIES'}>
				<i className={item.place_id ? 'pe-7s-map-marker' : `pe-7s-${ICONS[item.type]}`} />
				<span dangerouslySetInnerHTML={{__html: displayText}} />
			</div>
		);
	}

	render() {
		const { i18n : {l} , assetsPath } = this.context;
		const { searchTerm, location, isLoadSchema, isFetching, isError, isMapRefresh, propertySuggestions, addressSuggestions, isMapLoaded, showRight, address, showLocationFetchError, showGeolocation, inputBarValue='', loading } = this.state;
		const { country, visitorCountry } = this.context;
		const isGeoLocate = false;//visitorCountry === country;
		const suggestions = addressSuggestions.concat(propertySuggestions);
		const isSuggestions = suggestions.length;

		return (
			<div className="listing-location-details col-lg-12 col-md-12 col-xs-12">
				{
					isFetching &&
					<Loader/>
				}
				<div className="schema-header" />
				<div className={Cx('listing-location-details__left',this.updateClasses('left'))}>
					<div className="address-bar">
						<div className="search">
							<div className="autocomplete-wrapper">
								<i className="pe-7s-search"/>
								<Autocomplete
									value={searchTerm}
									inputProps={{
										id: 'states-autocomplete',
										'placeholder' : l('ENTERLOCATION')
									}}
									items={suggestions || []}
									getItemValue={(item) => item.description || item.name}
									onSelect={(value, state) => {
										this.setState({ searchTerm : value});
										this.placeSelected(state);
									}}
									onChange={(event, value) => {
										this.setState({ inputBarValue : value, searchTerm : value, isMapRefresh : false});
										this.getPredictions(value);
									}}
									renderItem={(value, index,item, isHighlighted) => {
										return this.renderAutoCompleteItem(value, index, item, isHighlighted);
									}}
									renderMenu={(items, value, style) => (
										inputBarValue.length >= SEARCH_CHAR_LENGTH_MIN ? <div className="autocomplete-menu">
											{!loading && _isEmpty(items) && inputBarValue.length >= SEARCH_CHAR_LENGTH_MIN ? (
												<div className="autocomplete-menu__no-matches-found">
													<div className="autocomplete-menu__item-status">No matches found for <span className="search-term">{value}</span></div>
													<div style={{padding: '10px'}}>{l('MARKERDRAGPINMESSAGE')}</div>
													<MetrosServedNote />
												</div>
											) : this.renderItems(items)}
											<div style={{textAlign: 'right'}}>
												<img src={`${assetsPath}/images/powered-by-google.png`} alt="google" />
											</div>
										</div> : null
									)}
								/>
							</div>
							{ isGeoLocate && showGeolocation &&
							<Geolocation
								showLocationFetchError={showLocationFetchError}
								onDetectLocation={this.onDetectLocation}
								{...this.props}
							/>
							}
						</div>
					</div>
					{ isMapLoaded &&
					<LocationDetailMap
						{...location}
						showRight={showRight}
						locAddress={address}
						onPositionChange={this.onPositionChange}
						updatePlace={this.updatePlace}
						isMapRefresh={isMapRefresh}
					/>
					}
				</div>
				{
					showRight && <div className={Cx('listing-location-details__right show-animate-right-slide',this.updateClasses('right'))}>
						<Card shadow={2}>
							<div className="schema-header-wrapper">
								{
									isError && <div className="error-msg">
										{l(SUBMIT_ERROR_MSG)}
									</div>
								}
								{
									isLoadSchema ?
										<Loader/> :
										this.renderLocate()
								}

							</div>
						</Card>
					</div>
				}
			</div>
		);
	}

}

const mapStateToProps = ({schema}) => {
	return {
		'schema_get_basic' : schema.schema_get_basic || '',
		'schema_save_basic' : schema.schema_save_basic || ''
	};
};

export default connect(mapStateToProps)(
	connectDataFetchers(LocationDetails, [
		REQUEST_GET_BASIC_SCHEMA
	], true)
);

