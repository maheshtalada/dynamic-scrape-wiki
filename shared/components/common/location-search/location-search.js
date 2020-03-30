import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import googleMapLoader from 'google-map-react/lib/utils/loaders/google_map_loader';
import cookie from 'react-cookie'
import axios from 'axios';
import Autocomplete from '../autocomplete/autocomplete';
import { localeCurrency, getValueByLocale } from '../../../utils/localeUtil';
import { getRadiusFromMapViewport } from '../../../utils/searchUtil';
import { isEmpty as _isEmpty } from 'lodash';
import MetrosServedNote from 'components/metros-served-note/metros-served-note';
import { debounce } from 'lodash';
import SiteConfig from '../../../config';

const { api, endpoints, gmap, localeSettings, cookies, searchStateCode } = SiteConfig;

const ICONS = {
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

const SEARCH_CHAR_LENGTH_MIN = 3,
PLACES_RESULT_COUNT_LIMIT = 3;

export default class LocationSearch extends Component {
	static propTypes = {
		google: PropTypes.object,
		placeHolder: PropTypes.string,
		locationText: PropTypes.string,
		onPlaceSelect: PropTypes.func,
		onSearch : PropTypes.func,
		searchType : PropTypes.string,
		onGeolocate : PropTypes.func,
		multipleLocations : PropTypes.bool,
		isPDPRedirectRequired : PropTypes.bool,
		isSearchBtnRequired : PropTypes.bool,
		isPropertyLookupRequired : PropTypes.bool,
		isRestrictMetrosRequired : PropTypes.bool,
		isNoMatchNoteRequired : PropTypes.bool,
		gaTags : PropTypes.object,
		getPredictionsDelay : PropTypes.number
	};

	static defaultProps = {
		cityObj: {},
		placeHolder: 'ENTERLOCATION',
		locationText: '',
		onPlaceSelect: ()=>{},
		onSearch:()=>{},
		multipleLocations: false,
		isPDPRedirectRequired: true,
		isSearchBtnRequired: true,
		searchType : '',
		isPropertyLookupRequired : true,
		isRestrictMetrosRequired : true,
		gaTags : {},
		isNoMatchNoteRequired : true,
		getPredictionsDelay : 200,
		showMetroServedNote : true
	};

	static contextTypes = {
		i18n: PropTypes.object,
		location : PropTypes.string,
		country : PropTypes.string,
		visitorCountry : PropTypes.string,
		assetsPath : PropTypes.string,
		screenSize : PropTypes.number
	};

	static getSearchInputValue(type, contextLocation, contentSearchterm, locationSearchValue) {
		if(type === 'content') {
			return contentSearchterm;
		}
		//return frameworkGlobals.isServer ? contextLocation : locationSearchValue;
		return locationSearchValue;
	}

	constructor(props, context) {
		super(props);
		this.initPlaceSuggest = this.initPlaceSuggest.bind(this);
		this.updatePlace = this.updatePlace.bind(this);
		this.keyPress = this.keyPress.bind(this);
		this.handleGooglePlacesPredictions = this.handleGooglePlacesPredictions.bind(this);
		this.placeAutoComplete = null;
		this.state = {
			location:'',
			searchText: '',
			showGeolocation: true,
			showLocationFetchError: false,
			propertySuggestions : [],
			addressSuggestions : [],
			searchTerm : props.searchQueryValue || '',
			searchType : props.searchType.split('?')[0],
			contentSearchterm : props.urlSearchTerm,
			noLocationError : false
		};
		this.getPredictions = debounce(this.getPredictions,props.getPredictionsDelay);
		this.updateLocationSearchValue(props);
		this.onClickSearch = this.onClickSearch.bind(this);
		this.searchCharMinLength = props.searchCharMinLength || SEARCH_CHAR_LENGTH_MIN;
	}

	componentDidMount() {
		if (typeof window.google !== 'undefined') {
			this.initPlaceSuggest(window.google.maps);
			return;
		}
		googleMapLoader({...gmap}).then((google) => {
			this.initPlaceSuggest(google);
		});
		// if(!this.state.searchTerm) {
		// 	this.updateCookies('','','');
		// }
	}

	componentWillReceiveProps(props) {
		// console.log(props.searchType, this.state.searchType)
		const { searchType, searchTerm } = this.state;
		const searchTypeTerm = props.searchType.split('?')[0];
		if(props) {
			this.setState({
				location: props.location,
				searchType : searchTypeTerm,
				contentSearchterm : searchTerm,
				propertySuggestions : [],
				noLocationError : props.noLocationError,
				searchTerm : props.searchQueryValue || this.state.searchTerm || ''
			});
			if(this.props.isPropertyLookupRequired && searchTerm.length >= this.searchCharMinLength && searchTypeTerm !== searchType && (searchTypeTerm !== 'realtor' && searchTypeTerm !== 'content' && searchTypeTerm !== 'professional')) {
				this.getSuggestions(searchTypeTerm);
			}
		}
		this.updateLocationSearchValue(props);
	}

	updateLocationSearchValue(props) {
		if(props.multipleLocations) {
			this.locationSearchValue = ''
		}else {
			this.locationSearchValue = props.searchQueryValue;
		}
	}

	updateCookies(locationquery,locationname,locationradius) {
		cookie.save('locationradius', locationradius, { path: '/', maxAge: 1080000000, secure : cookies.isSecure });
		cookie.save('locationquery', locationquery, { path: '/', maxAge: 1080000000, secure : cookies.isSecure });
		cookie.save('locationname', locationname, { path: '/', maxAge: 1080000000, secure : cookies.isSecure });
	}

	initPlaceSuggest(google) {
		this.autoCompleteService = new google.places.AutocompleteService();
		this.placesService = new google.places.PlacesService(document.createElement('div'));
	}

	/*
	 these predictions no need to go global store
	 hence doing xhr call using axios here
	 */

	getSuggestions(type = '') {
		let searchType = type || this.props.searchType;
		searchType = searchType.split('?')[0];
		if( searchType === 'realtor' && searchType === 'content' || searchType === 'professional') {
			return;
		}
		const { country } = this.context,
			query = this.state.searchTerm,
			headerPayload = Object.assign({'countrycode' : country}),
			config = {
				method : 'GET',
				url: `${api.protocol}://${api.host}:${api.port}${api.prefix}${endpoints.listingsuggestions}${query}`.replace('{listingtype}',searchType),
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
		frameworkGlobals.location = val;
		this.locationSearchValue = val;
		if(this.state.searchType === 'content') {
			this.setState({contentSearchterm: val});
			frameworkGlobals.contentQuery = val;
			return;
		}
		const { country } = this.context;
		if(val.length < this.searchCharMinLength ) {
			this.setState({
				addressSuggestions: [],
				propertySuggestions : [],
				showGeolocation : true
			});
			return;
		}
		val = val ? val.trim() : '';
		if(val.length >= this.searchCharMinLength) {
			this.autoCompleteService.getPlacePredictions(
				{
					input: val,
					types : this.props.placeTypes,
					componentRestrictions: {
						country: localeSettings[country].locationSearchRegion
					}
				},this.handleGooglePlacesPredictions
			);
		}

		this.setState({
			showGeolocation: !val,
			showLocationFetchError: false,
			noLocationError: false
		},()=>{
			this.props.onChange && this.props.onChange(this.locationSearchValue);
		});
	}

	handleGooglePlacesPredictions(predictions,status) {
		// this.updateCookies('','','');
		if(status !== 'OK') {
			this.setState({
				addressSuggestions: [],
				loading : false
			},this.props.isPropertyLookupRequired ? this.getSuggestions : null);
			return;
		}
		//console.log(predictions);
		if(searchStateCode && this.props.isRestrictMetrosRequired) {
			const regex = new RegExp(searchStateCode,'gi');
			predictions = predictions.filter(place => {
				return place.structured_formatting.secondary_text && place.structured_formatting.secondary_text.match(regex)
			});
		}
		predictions = predictions.sort((a,b)=>{
			if(a.description.length <= b.description.length) {
				return 0
			}else {
				return 1
			}
		});
		this.setState({
			addressSuggestions : predictions.slice(0,PLACES_RESULT_COUNT_LIMIT),
			loading : false
		},this.props.isPropertyLookupRequired ? this.getSuggestions : null);
	}

	onClickSearch() {
		const { addressSuggestions, searchTerm } = this.state;
		if(searchTerm && addressSuggestions && addressSuggestions.length) {
			this.placeSelected(addressSuggestions[0]);
			return;
		}
		this.props.onSearch && this.props.onSearch(searchTerm, 'list');
		return;
	}

	placeSelected(state, value) {
		if(state.place_id) {
			this.placesService.getDetails({
				placeId: state.place_id
			}, (place, status)=> {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					this.updatePlace(place, value);
				}
			});
			return;
		}
		if(this.props.isPDPRedirectRequired) {
			const link = document.createElement('a');
			link.setAttribute('href',state.uri);
			//link.setAttribute('target','_blank');
			link.dispatchEvent(new MouseEvent(`click`, {bubbles: true, cancelable: true, view: window}));
			return;
		}
		this.locationSearchValue = state.name;
		this.props.onPlaceSelect && this.props.onPlaceSelect({listingId: state.id,...state}, map);
	}

	updatePlace(place, value ='', latlng='') {
		const { location } = place.geometry;
		const { country } = this.context;
		value = value || place.formatted_address;
		let viewportRadius = '';
		if(!place.geometry) {
			place = {
				formatted_address : cookie.load('locationname') || '',
				location : cookie.load('locationquery') || ''
			};
		}

		if(place.geometry) {
			viewportRadius = getRadiusFromMapViewport(place.geometry.viewport,getValueByLocale(country,'earthRadius'));
		}

		frameworkGlobals.location = value;
		if(this.props.multipleLocations) {
			this.locationSearchValue = '';
		} else {
			this.locationSearchValue = value;
		}
		// document.addEventListener('keydown', this.keyPress);
		this.props.onPlaceSelect && this.props.onPlaceSelect(place,viewportRadius, 'list');
		// this.setState({
		// 	showGeolocation: !!value
		// });
	}

	render() {
		const { propertySuggestions, searchTerm, addressSuggestions, showGeolocation, showLocationFetchError, searchType, noLocationError, inputBarValue='', loading } = this.state;
		const { l } = this.context.i18n;
		const { visitorCountry, country, assetsPath, screenSize } = this.context;
		const location = LocationSearch.getSearchInputValue(searchType,this.context.location, this.state.contentSearchterm, this.locationSearchValue);
		const isGeoLocate = false;//visitorCountry === country;
		const suggestions = addressSuggestions.concat(propertySuggestions);
		const {placeHolder, showMetroServedNote, multipleLocations, inputAutoFocus = false, isSearchBtnTextRequired, isSearchBtnIconRequired = true, isSearchBtnRequired, isRestrictMetrosRequired, searchBtnContent, renderNoMatchNote, isNoMatchNoteRequired} = this.props;
		return (
			<div className="location-search flex">
				<div className={`autocomplete-wrapper ${noLocationError ? 'no-search-input' : ''}`}>
					<Autocomplete
						value={searchTerm}
						inputProps={{
							id: 'states-autocomplete',
							'placeholder' : l(placeHolder),
							'autoFocus' : inputAutoFocus
						}}
						items={suggestions || []}
						getItemValue={(item) => item.description || item.name}
						onSelect={(value, state) => {
							this.setState({ searchTerm : multipleLocations ? '' :value});
							this.placeSelected(state, value);
						}}
						onChange={(event, value) => {
							this.setState({ loading : true, inputBarValue : value, searchTerm : value});
							this.getPredictions(value);
						}}
						renderItem={(value, index,item, isHighlighted) => {
							return this.renderAutoCompleteItem(value, index, item, isHighlighted);
						}}
						renderMenu={(items, value, style) => (
							!loading && inputBarValue.length >= this.searchCharMinLength && isNoMatchNoteRequired ? <div className="autocomplete-menu">
								{_isEmpty(items) && inputBarValue.length >= this.searchCharMinLength ? (
									<div className="autocomplete-menu__no-matches-found">
										<div className="autocomplete-menu__item-status">No matches found for <span className="search-term">{value}</span></div>
										{showMetroServedNote && <MetrosServedNote />}
										{renderNoMatchNote && renderNoMatchNote()}
									</div>
								) : this.renderItems(items)}
								<div className="autocomplete-menu__google-icon">
									<img src={`${assetsPath}/images/powered-by-google.png`} alt="google" />
								</div>
							</div> : null
						)}
					/>
					{ isGeoLocate && showGeolocation &&
						<Geolocation showLocationFetchError={showLocationFetchError} onDetectLocation={this.updatePlace} {...this.props}/>
					}
					{noLocationError &&
						<div className="no-location-error alert alert-warning">
							<div>{l('CHOOSELOCATIONTOSEARCH')}</div>
						</div>
					}
				</div>
				{this.props.children && this.props.children}
				{isSearchBtnRequired && <button className="btn btn-primary toolbar-group search-btn" aria-label="search" data-tag-label="Search Go" data-tag-category="Home Search Tabs" data-tag-action="Search Go Click" onClick={this.onClickSearch}>
					{searchBtnContent ? searchBtnContent() : <Fragment>
						{isSearchBtnTextRequired && <span>{l('SEARCH')}</span>}
						{isSearchBtnIconRequired && <i className="pe-7s-search" />}
					</Fragment>}
				</button>}
			</div>
		);
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
			}else {
				return item;
			}
		});
	}

	keyPress(event) {
		const { searchTerm } = this.state;
		if(event.keyCode === 13) {
			this.props.onSearch && this.props.onSearch(searchTerm, 'list');
			return;
		}
	}

	/*addModal() {
		const { l } = this.context.i18n;
		modal.add(SearchWidget, {
			title: l('SEARCH'),
			size: 'custom', // large, medium or small,
			closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
			hideTitleBar: false,// (optional) Switch to true if do not want the default title bar and close button,
			hideCloseButton: false // (optional) if you don't wanna show the top right close button
		});
	}*/

	renderAutoCompleteItem(searchTerm, index, item, isHighlighted) {
		const pattern = new RegExp('^' + searchTerm, 'gi'),
			itemText = item.description || `${item.name} - <span class="item-price">${localeCurrency(Number(item.price),'','',this.context.country)}</span>`,
			displayText = itemText.replace(pattern,`<span style="font-weight:bold;">${searchTerm}</span>`);
		const {gaTags} = this.props;
		return (
			<div className={`autocomplete-menu__item ${isHighlighted && 'highlight'}`}
				 key={item.place_id || item.id}
				 data-tag-category={gaTags.category}
				 data-tag-action={gaTags.action}
				 data-tag-label={gaTags.label}
				 data-item-type={item.place_id ? 'MATCHINGADDRESSES' : 'MATCHINGPROPERTIES'}>
				<i className={item.place_id ? 'pe-7s-map-marker' : 'pe-7s-residential'} />
				<span dangerouslySetInnerHTML={{__html: displayText}} />
			</div>
		);
	}


}
