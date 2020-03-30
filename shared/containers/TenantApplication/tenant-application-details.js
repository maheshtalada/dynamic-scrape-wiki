import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { localeCurrency, formatDateUtil } from 'utils/localeUtil';
import { phoneNumberFormat } from 'utils/String';
import { connect } from 'react-redux';
import Spinner from 'components/common/spinner/spinner';
import { REQUEST_SCHEMA_TENANT_APPLICATION } from '../../redux/actions/schema';

const LabelValue = ({label,value}) => {
    if(!value) {
        return null;
    }
    return (
        <div className="label-value">
            <div className="font-bold label">{label}</div>
            <div className="value">{value}</div>
        </div>
    )
}

class TenantApplicationDetails extends Component {
    
    static contextTypes = {
        i18n : PropTypes.object,
        country : PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            details : props.details || {}
        };
    }

    componentWillMount(props) {
        if(!this.props.details) {
            this.props.dispatch(REQUEST_SCHEMA_TENANT_APPLICATION({
                method : 'get',
                endpoint : 'tenantapplicationdetails',
                actionType : 'RESPONSE_SCHEMA_TENANT_APPLICATION',
                paramPayload : {
                    id : this.props.id
                }
            }));
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            isFetching : props.get_schema_tenant_application.isFetching,
            details : props.get_schema_tenant_application
        });
    }

    render() {
        const { details, isFetching } = this.state;
        const { i18n : {l }, country } = this.context;
        if(isFetching || !details.rentalTenant) {
            return <Spinner />;
        }
        const rentalTenant = details.rentalTenant || {};
        const currentEmployment = rentalTenant.currentEmployment || {};
        const otherIncome = rentalTenant.otherIncome || [];
        const residences = rentalTenant.residences || [];
        const houseMates = rentalTenant.houseMates || [];
        const pets = rentalTenant.pets || [];
        const vehicles = rentalTenant.vehicles || [];
        return (
            <div className="tenant-application-details__details-wrap">
                <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('APPLICATION')}</h2>
                    <LabelValue label={l('APPLICATIONID')} value={l(details.id)}/>
                    <LabelValue label={l('STATUS')} value={l(details.applicationStatus)}/>
                    <LabelValue label={l('REFERRER')} value={l(details.referrer)}/>
                    <LabelValue label={l('REFERREDBYNAME')} value={details.referredByName}/>
                    {details.moveInDate && <LabelValue label={l('MOVEINDATE')} value={formatDateUtil(details.moveInDate,country,"DD/MM/YYYY")}/>}
                    <LabelValue label={l('MOVINGREASON')} value={details.movingReason}/>
                    <LabelValue label={l('ADDITIONALCOMMENTS')} value={details.additionalComments}/>
                </div>
                <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('TENANTPERSONALINFO')}</h2>
                    <LabelValue label={l('NAME')} value={rentalTenant.name}/>
                    <LabelValue label={l('EMAIL')} value={<a href={`mailto:${rentalTenant.emailId}`}>{rentalTenant.emailId}</a>}/>
                    {rentalTenant.mobileNumber && <LabelValue label={l('MOBILENUMBER')} value={phoneNumberFormat(rentalTenant.mobileNumber,'MOBILE',country)}/>}
                    {rentalTenant.dateOfBirth && <LabelValue label={l('DATEOFBIRTH')} value={formatDateUtil(rentalTenant.dateOfBirth,country,"DD/MM/YYYY")}/>}
                    <LabelValue label={l('MARITALSTATUS')} value={l(rentalTenant.maritalStatus)}/>
                    <LabelValue label={l('COUNTRYOFCITIZENSHIP')} value={rentalTenant.countryOfCitizenship}/>
                    {rentalTenant.socialSecurityNumber && <LabelValue label={l('SOCIALSECURITYNUMBER')} value={`xxx-xx-${rentalTenant.socialSecurityNumber.substr(rentalTenant.socialSecurityNumber.length-4)}`}/>}
                    {rentalTenant.drivingLicenseNumber && <LabelValue label={l('DRIVINGLICENSENUMBER')} value={`xxxxxxx${rentalTenant.drivingLicenseNumber.substr(rentalTenant.drivingLicenseNumber.length-4)}`}/>}
                </div>
                <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('CURRENTEMPLOYMENT')}</h2>
                    <LabelValue label={l('COMPANYNAME')} value={currentEmployment.companyName}/>
                    <LabelValue label={l('JOBTITLE')} value={currentEmployment.jobTitle}/>
                    <LabelValue label={l('YEARSWORKED')} value={currentEmployment.yearsWorked}/>
                    {currentEmployment.monthlySalary && <LabelValue label={l('MONTHLYSALARY')} value={`${localeCurrency(currentEmployment.monthlySalary,'₹','en-IN', country)}`}/>}
                    {currentEmployment.supervisor && <div className="tenant-application-details__detail-box__sub-details">
                        <h3 className="tenant-application-details__detail-box__title">{l('SUPERVISOR')}</h3>
                        <LabelValue label={l('NAME')} value={currentEmployment.supervisor.name}/>
                        <LabelValue label={l('EMAIL')} value={<a href={`mailto:${currentEmployment.supervisor.emailId}`}>{currentEmployment.supervisor.emailId}</a>}/>
                        {currentEmployment.supervisor.mobileNumber && <LabelValue label={l('MOBILENUMBER')} value={phoneNumberFormat(currentEmployment.supervisor.mobileNumber,'MOBILE',country)}/>}
                    </div>}
                </div>
                {otherIncome.length > 0 && <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('OTHERINCOME')}</h2>
                    {otherIncome.map(income => {
                        return (
                            <div className="tenant-application-details__detail-box__value-group">
                                {income.income && <LabelValue label={l('INCOME')} value={`${localeCurrency(income.income,'₹','en-IN', country)}`}/>}
                                <LabelValue label={l('DESCRIPTION')} value={income.incomeDescription}/>
                            </div>
                        );
                    })}
                </div>}
                {details.emergencyContact && <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('EMERGENCYCONTACT')}</h2>
                    <LabelValue label={l('NAME')} value={details.emergencyContact.name}/>
                    <LabelValue label={l('EMAIL')} value={<a href={`mailto:${details.emergencyContact.emailId}`}>{details.emergencyContact.emailId}</a>}/>
                    {details.emergencyContact.mobileNumber && <LabelValue label={l('MOBILENUMBER')} value={phoneNumberFormat(details.emergencyContact.mobileNumber,'MOBILE',country)}/>}
                </div>}
                {houseMates.length > 0 && <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('HOUSEMATES')}</h2>
                    {houseMates.map(houseMate => {
                        return (
                            <div className="tenant-application-details__detail-box__value-group">
                                {houseMate.relatedPerson && <Fragment>
                                    <LabelValue label={l('NAME')} value={houseMate.relatedPerson.name}/>
                                    {houseMate.relatedPerson.dateOfBirth && <LabelValue label={l('DATEOFBIRTH')} value={formatDateUtil(houseMate.relatedPerson.dateOfBirth,country,"DD/MM/YYYY")}/>}
                                    {houseMate.relatedPerson.mobileNumber && <LabelValue label={l('MOBILENUMBER')} value={phoneNumberFormat(houseMate.relatedPerson.mobileNumber,'MOBILE',country)}/>}
                                </Fragment>}
                                <LabelValue label={l('RELATIONSHIP')} value={houseMate.relationship}/>
                            </div>
                        );
                    })}
                </div>}
                {pets.length > 0 && <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('PETS')}</h2>
                    {pets.map(pet => {
                        return (
                            <div className="tenant-application-details__detail-box__value-group">
                                <LabelValue label={l('NAME')} value={pet.name}/>
                                <LabelValue label={l('BREED')} value={pet.breed}/>
                                <LabelValue label={l('WEIGHT')} value={pet.weight}/>
                                <LabelValue label={l('AGE')} value={pet.age}/>
                                <LabelValue label={l('COLOR')} value={pet.color}/>
                                <LabelValue label={l('GENDER')} value={l(pet.gender)}/>
                                <LabelValue label={l('NEUTERED')} value={pet.neutered ? l('YES') : l('NO')}/>
                                <LabelValue label={l('DECLAWED')} value={pet.declawed ? l('YES') : l('NO')}/>
                                <LabelValue label={l('RABIESSHOTCURRENT')} value={pet.rabiesShotCurrent ? l('YES') : l('NO')}/>
                                <LabelValue label={l('BITEHISTORY')} value={pet.biteHistory ? l('YES') : l('NO')}/>
                            </div>
                        );
                    })}
                </div>}
                {vehicles.length > 0 && <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('VEHICLES')}</h2>
                    {vehicles.map(vehicle => {
                        return (
                            <div className="tenant-application-details__detail-box__value-group">
                                <LabelValue label={l('MAKE')} value={vehicle.make}/>
                                <LabelValue label={l('MODEL')} value={vehicle.model}/>
                                <LabelValue label={l('YEAR')} value={vehicle.year}/>
                                <LabelValue label={l('COLOR')} value={vehicle.age}/>
                                <LabelValue label={l('LICENSENUMBER')} value={vehicle.licenseNumber}/>
                            </div>
                        );
                    })}
                </div>}
                <div className="tenant-application-details__detail-box disclosures">
                    <h2 className="tenant-application-details__detail-box__title">{l('DISCLOSURES')}</h2>
                    <LabelValue label={l('HASBEENEVICTED')} value={rentalTenant.hasBeenEvicted ? l('YES') : l('NO')}/>
                    <LabelValue label={l('HASBEENCONVICTED')} value={rentalTenant.hasBeenConvicted ? l('YES') : l('NO')}/>
                    <LabelValue label={l('HASFILEDSUIT')} value={rentalTenant.hasFiledSuit ? l('YES') : l('NO')}/>
                    <LabelValue label={l('ISSMOKER')} value={rentalTenant.isSmoker ? l('YES') : l('NO')}/>
                    <LabelValue label={l('HASWATERFURNITURE')} value={rentalTenant.hasWaterFurniture ? l('YES') : l('NO')}/>
                    <LabelValue label={l('HASRENTERSINSURANCE')} value={rentalTenant.hasRentersInsurance ? l('YES') : l('NO')}/>
                    <LabelValue label={l('ISMILITARY')} value={rentalTenant.isMilitary ? l('YES') : l('NO')}/>
                    <LabelValue label={l('HASBEENBANKRUPT')} value={rentalTenant.hasBeenBankrupt ? l('YES') : l('NO')}/>
                    <LabelValue label={l('HASFORECLOSEDPROPERTY')} value={rentalTenant.hasForeclosedProperty ? l('YES') : l('NO')}/>
                    <LabelValue label={l('HASBREACHEDRENTALAGREEMENT')} value={rentalTenant.hasBreachedRentalAgreement ? l('YES') : l('NO')}/>
                    <LabelValue label={l('HASCREDITPROBLEMS')} value={rentalTenant.hasCreditProblems ? l('YES') : l('NO')}/>
                    <LabelValue label={l('ISSEXOFFENDER')} value={rentalTenant.isSexOffender ? l('YES') : l('NO')}/>
                </div>
                {residences.length > 0 && <div className="tenant-application-details__detail-box">
                    <h2 className="tenant-application-details__detail-box__title">{l('RESIDENCES')}</h2>
                    {residences.map(residence => {
                        return (
                            <div className="tenant-application-details__detail-box__value-group">
                                <div className="tenant-application-details__detail-box__sub-details">
                                    <h3 className="tenant-application-details__detail-box__title">{l('ADDRESS')}</h3>
                                    <LabelValue label={l('LINEONE')} value={residence.address.lineOne}/>
                                    <LabelValue label={l('LINETWO')} value={residence.address.lineTwo}/>
                                    <LabelValue label={l('CITY')} value={residence.address.city}/>
                                    <LabelValue label={l('ZIPCODE')} value={residence.address.zipCode}/>
                                </div>
                                {residence.moveInDate && <LabelValue label={l('MOVEINDATE')} value={formatDateUtil(residence.moveInDate,country,"DD/MM/YYYY")}/>}
                                {residence.moveOutDate && <LabelValue label={l('MOVEOUTDATE')} value={formatDateUtil(residence.moveOutDate,country,"DD/MM/YYYY")}/>}
                                <LabelValue label={l('MOVINGREASON')} value={residence.movingReason}/>
                                <LabelValue label={l('ISCURRENTRESIDENCE')} value={residence.isCurrentResidence ? l('YES') : l('NO')}/>
                                {residence.rentalAmount && <LabelValue label={l('RENTALAMOUNT')} value={`${localeCurrency(residence.rentalAmount,'₹','en-IN', country)}`}/>}
                                {residence.propertyManager && <div className="tenant-application-details__detail-box__sub-details">
                                    <h3 className="tenant-application-details__detail-box__title">{l('PROPERTYMANAGER')}</h3>
                                    <LabelValue label={l('NAME')} value={residence.propertyManager.name}/>
                                    <LabelValue label={l('EMAIL')} value={<a href={`mailto:${residence.propertyManager.emailId}`}>{residence.propertyManager.emailId}</a>}/>
                                    {residence.propertyManager.mobileNumber && <LabelValue label={l('MOBILENUMBER')} value={phoneNumberFormat(residence.propertyManager.mobileNumber,'MOBILE',country)}/>}
                                </div>}
                            </div>
                        );
                    })}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = ({schema}) => {
	const { get_schema_tenant_application} = schema;
	return {
		get_schema_tenant_application
	};
};

export default connect(mapStateToProps)(TenantApplicationDetails);
