import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, { findDOMNode } from 'react-dom';
import TextComponent from './text';
import googleMapLoader from 'google-map-react/lib/utils/loaders/google_map_loader';
import { getAddressComponent } from '../../../../utils/placesAPIUtil';
import SiteConfig from '../../../../config';

const { gmap, localeSettings } = SiteConfig;
/**
 * @description Renders a currency version of the text component
 */

export default class TextGooglePlaceComponent extends TextComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__options', 'schema__text']
	};

	constructor(props) {
		super(props);

		this.state = {
			hasFocus: false
		};

		this.isDisplayValue = true;
		this.initPlaceSuggest = this.initPlaceSuggest.bind(this);
		this.placeSelected = this.placeSelected.bind(this);
	}

	componentDidMount() {
		// if length of children
		// update conditional id with null
		if(this.props.conditionalId && this.props.children.length && !this.props.getDataByID(this.props.conditionalId)) {
			this.props.storeValue(this.props.conditionalId, 'haveValue');
		}
		if (typeof window.google !== 'undefined') {
			this.initPlaceSuggest(window.google.maps);
		} else {
			googleMapLoader({...gmap}).then((google) => {
				this.initPlaceSuggest(google);
			});
		}
	}

	componentDidUpdate() {
		// if length of children
		// update conditional id with null
		if(this.props.conditionalId && !this.props.children.length && this.props.getDataByID(this.props.conditionalId)) {
			this.props.storeValue(this.props.conditionalId, '');
		}
	}

	initPlaceSuggest(google) {
		const { country } = this.props;
		const options = {
			types: ['(cities)'],
			componentRestrictions: {country: localeSettings[country].locationSearchRegion}
		};
		this.placeAutoComplete = new google.places.Autocomplete(ReactDOM.findDOMNode(this.refs.inputgoogleplace), options);
		this.placeAutoComplete.addListener('place_changed',this.placeSelected);
	}

	placeSelected() {

		const place = this.placeAutoComplete.getPlace();
		//check if places key length to check  for correct place object
		if(Object.keys(place).length <= 1) {
			return;
		}

		this.isDisplayValue = false;
		//add new pill clone set
		let selfIndex = this.props.root().children.length;
		let key = this.props.root().data.key++;
		this.props.root().inject([this.props.root().pillCloneChild], selfIndex, key );

		//update id keys
		let storeId = this.props.root().pillCloneChild.id.replace(/\*/, key);

		// store values
		this.props.storeValue(storeId, place.name);
		let idPrefix = storeId.split('.').slice(0,-1).join('.');
		this.props.storeValue(`${idPrefix}.cityName`,getAddressComponent(place.address_components,'locality', 'short_name') || '');
		this.props.storeValue(`${idPrefix}.region`, getAddressComponent(place.address_components,'administrative_area_level_2', 'short_name') || '');
		this.props.storeValue(`${idPrefix}.locality`, getAddressComponent(place.address_components,'sublocality_level_1', 'short_name') || getAddressComponent(place.address_components,'locality', 'short_name') || '');
		this.props.storeValue(`${idPrefix}.stateCode`, getAddressComponent(place.address_components,'administrative_area_level_1', 'short_name') || '');
		this.props.storeValue(`${idPrefix}.country`, getAddressComponent(place.address_components,'country', 'short_name') || '');
		this.props.storeValue(`${idPrefix}.geometry.lat`, place.geometry.location.lat());
		this.props.storeValue(`${idPrefix}.geometry.lon`, place.geometry.location.lng());

		// update conditional is if validation enabled
		if(this.props.conditionalId && !this.props.getDataByID(this.props.conditionalId)) {
			this.props.storeValue(this.props.conditionalId, 'haveValue');
		}
	}

	renderWriteValue(value) {
		const { l } = this.props;
		let inputValue = '';
		if(this.state.value) {
			inputValue = this.state.value;
		}
		let labelClassName = this.getLabelClassNames();

		let componentArray = [
			<div key="inputGooglePlaceContainer" className="schema__text__googleplace__container">
				<label className={labelClassName} htmlFor={this.state.uniqueId} data-automation-selector={this.getDataId('label')}>{l(this.props.label)}{this.renderLabelInfo()}{this.renderTooltip()}</label>
				<div className={`schema__pills__wrapper ${this.props.data.isFullPill ? 'full-pills': ''}`}>
					{this.props.children}
				</div>
				<input id={this.state.uniqueId}
					   type="text"
					   ref="inputgoogleplace"
					   placeholder={this.getPlaceHolder()}
					   name={this.props.id}
					   value={this.isDisplayValue ? inputValue : ''}
					   onChange={(evt)=>{
					   	this.onChange(evt.target.value);
					}}
				/>
			</div>
		];

		return componentArray;
	}

	onChange(value) {
		this.isDisplayValue = true;
		this.setState({value});
	}

}


