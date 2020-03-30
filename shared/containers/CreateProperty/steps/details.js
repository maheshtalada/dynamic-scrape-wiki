import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values, extend } from 'lodash';
import { connect } from 'react-redux';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import { Schema } from 'components/schema';
import LocationSearch from 'components/common/location-search/location-search';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import Spinner from 'components/common/spinner/spinner';
import Loader from 'components/common/page-loader/loader';
import transformer from 'utils/form-data-transformer';
import { getPropertyNameFromGooglePlace, getAddressComponent } from 'utils/placesAPIUtil';
import ErrorBox from 'components/common/error-box/error-box';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../../redux/actions/schema';

class CreatePropertyDetails extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			modifiedValues: {},
			initialValues: {}
		};
		this.onAddressSchemaReady = this.onAddressSchemaReady.bind(this);
		this.onPlaceSelect = this.onPlaceSelect.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
		this.onSchemaChange = this.onSchemaChange.bind(this);
		this.onNavigateSaveExitClick = this.onNavigateSaveExitClick.bind(this);
	}

	componentWillReceiveProps(props) {
		// console.log(props.get_schema_my_property_details);
		this.setState({
			isFetching : props.get_schema_my_property_details.isFetching,
			schemas : props.get_schema_my_property_details.schema && props.get_schema_my_property_details.schema.schemas,
			referenceData : props.get_schema_my_property_details.schema && props.get_schema_my_property_details.schema.referenceData,
			isSaving : props.save_schema_my_property_details.isFetching
		});
		// console.log(props.save_schema_my_property_details);
		if(props.save_schema_my_property_details.status === 'success') {
			this.nextStep && typeof this[this.nextStep] === 'function' && this[this.nextStep](props);
		} else if(props.save_schema_my_property_details.error || props.save_schema_my_property_details.status === 'error') {
			this.setState({
				isError: true,
				errorCode: props.save_schema_my_property_details.error.error_description
			});
		}
	}

    onSchemaChange(changeObject, hasErrors) {
		this.setState({
			changeObject,
			hasErrors
		});
		this.refs['schemaDetails'] && this.refs['schemaDetails'].rebuild();
	}

	onAddressSchemaReady(tree) {
		this.setState({
			initialValues : tree.initialValues,
			modifiedValues : tree.modifiedValues
		});
	}

	saveSchema() {
		let schemasAreValid = true;
		if (!this.refs['schemaDetails'].checkSubmissionValid()) {
			schemasAreValid = false;
		}
		if(schemasAreValid) {
			this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
				method : 'post',
				endpoint : 'savemypropertydetails',
				actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_DETAILS',
				dataPayload: transformer.transformPathsToObject(extend({},this.state.initialValues,this.state.modifiedValues))
			}));
		}
	}

	populateAddress(place) {
		const propertyName = getPropertyNameFromGooglePlace(place);
		return {
			'myproperty.name' : this.state.initialValues['myproperty.name'] || propertyName,
			'myproperty.address.formattedAddress' : place.formatted_address,
			'myproperty.address.lineOne' : propertyName,
			'myproperty.address.lineTwo' : '',
			'myproperty.address.region' : getAddressComponent(place.address_components,'administrative_area_level_2', 'short_name') || '',
			'myproperty.address.locality' : (()=>{
				const nbh = getAddressComponent(place.address_components,'neighborhood', 'short_name'),
					sbl2 = getAddressComponent(place.address_components,'sublocality_level_2', 'short_name'),
					line2 = nbh && sbl2 ? `${nbh}, ${sbl2}` : '';
				const city = getAddressComponent(place.address_components,'locality', 'short_name');
				return line2 || nbh || sbl2 || city;
			})(),
			'myproperty.address.city' : getAddressComponent(place.address_components,'locality', 'short_name') || '',
			'myproperty.address.stateCode' : getAddressComponent(place.address_components,'administrative_area_level_1', 'short_name') || '',
			'myproperty.address.zipCode' : getAddressComponent(place.address_components,'postal_code', 'short_name') || '',
			'myproperty.address.country' : getAddressComponent(place.address_components,'country', 'short_name') || '',
			'myproperty.address.geometry.lat' : (typeof place.geometry.location.lat === 'function' ? place.geometry.location.lat() : place.geometry.location.lat ),
			'myproperty.address.geometry.lon' : (typeof place.geometry.location.lng === 'function' ? place.geometry.location.lng() : place.geometry.location.lng )
		};
	}
	
	onPlaceSelect(place,radius) {
		this.setState({
			isPlaceSelected : true,
			modifiedValues: {
				...this.state.modifiedValues,
				...this.populateAddress(place)
			}
		});
	}
    
    renderSchema() {
		const { i18n, country } = this.context;
		const { schemas, referenceData } = this.state;
        return (
			<Fragment>
				<div className="address-schema">
					<Schema
						key='addressSchema'
						l={i18n.l}
						country = {country}
						ref={'addressSchema'}
						data={schemas[0]}
						writeMode={true}
						updateonPropsChange={true}
						onChange={this.onSchemaChange}
						modifiedValues={this.state.modifiedValues}
						initialValues={this.state.initialValues}
						onReady={this.onAddressSchemaReady}
						referenceData={referenceData}
					/>
				</div>
				<Schema
					key='schemaDetails'
					l={i18n.l}
					country = {country}
					ref={'schemaDetails'}
					data={schemas[1]}
					writeMode={true}
					updateonPropsChange={true}
					onChange={this.onSchemaChange}
					modifiedValues={this.state.modifiedValues}
					initialValues={this.state.initialValues}
					referenceData={referenceData}
				/>
			</Fragment>
		);
	}

	render() {
		const { i18n : {l}, screenSize} = this.context;
		const { value = '', isFetching, schemas, isSaving, initialValues, modifiedValues, isError, errorCode, isPlaceSelected} = this.state;
		const { stepConfig } = this.props;
		const propertyName = initialValues['myproperty.address.formattedAddress'];
		return (
			<div className="create-property-details wizard__step-container">
				<div className="wizard__step-container__content-wrap">
					{isSaving && <Loader />}
					{
						isError &&
						<ErrorBox l={l} errorCode={errorCode}/>
					}
					<h3 className="wizard__question">{stepConfig.question}</h3>
					{(isFetching || !schemas) ? <Spinner /> : <Fragment><LocationSearch
						searchQueryValue={isPlaceSelected ? null : propertyName}
						placeHolder={`${l('PROPERTYADDRESS')}*`}
						onPlaceSelect = {this.onPlaceSelect}
						screenSize = {screenSize}
						inputAutoFocus = {false}
						isRestrictMetrosRequired={false}
						isPropertyLookupRequired = {false}
						isSearchBtnRequired = {false}>
							<div className="location-search-address-icon">
								<i className="pe-7s-preferred-location"/>
							</div>
						</LocationSearch>
						{this.renderSchema()}
					</Fragment>}
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					navigatingSaveExitText = "SAVEANDEXIT"
					className="linear-navigation--light-theme"
					isBackRequired={false}
					onNext={this.onNextClick}
					isNavigatingSaveExitRequired
					onNavigateSaveExit={this.onNavigateSaveExitClick}
				/>
			</div>
		);
	}

	onProceedToNextStep(props) {
		this.props.navigateNext({
			step : 'purchase-details',
			query: {
				id : props.save_schema_my_property_details.id
			}
		});
	}

	onExit() {
		this.props.onNavigateEnd();
	}
	
	onNavigateSaveExitClick() {
		this.nextStep = 'onExit';
		this.saveSchema();
	}
    
	onNextClick() {
		this.nextStep = 'onProceedToNextStep';
		this.saveSchema();
	}

}
const mapStateToProps = ({schema}) => {
	const { get_schema_my_property_details, 
		save_schema_my_property_details} = schema;
	return {
		get_schema_my_property_details, 
		save_schema_my_property_details
	};
};

export default connect(mapStateToProps)(connectDataFetchers(CreatePropertyDetails, [
	REQUEST_SCHEMA_MY_PROPERTY
], true, {
	method : 'get',
	endpoint : 'getmypropertydetails',
	actionType : 'RESPONSE_GET_SCHEMA_MY_PROPERTY_DETAILS',
	isGenerateDataPayload : true,
	dataPayloadLookup : [{key : "mypropertyid" , lookup : "query.id"}]
}));
