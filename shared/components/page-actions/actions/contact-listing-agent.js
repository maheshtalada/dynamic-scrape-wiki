import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import Spinner from 'components/common/spinner/spinner';
import SingleSelectBoxes from 'components/common/single-select-boxes';
import MediaListItem from 'components/common/media-list-item';
import Select from 'components/common/select/select';

const EmailModal =  loadable(() => import(/* webpackChunkName: 'SendEmailModal' */'components/common/email-modal/'),{
	LoadingComponent: Spinner
});
const PhoneDetails =  loadable(() => import(/* webpackChunkName: 'ViewPhoneDetailModal' */'components/common/phone-details/'),{
	LoadingComponent: Spinner
});

const CONTACT_TYPE_OPTIONS = [
	{
		"label" : "SENDEMAIL",
		"value" : "email"
	},
	{
		"label" : "VIEWPHONENUMBER",
		"value" : "phone"
	}
];

const CONTACTTYPE_COMPONENTS = {
	'email' : EmailModal,
	'phone' : PhoneDetails
}

const DEFAULT_CONTACT_TYPE = "email";

export default class ContactListingAgent extends Component {

	static propTypes = {
		actionComponent : PropTypes.string
	};

	static defaultProps = {
		className : 'page-actions'
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		country: PropTypes.string,
		pageContext : PropTypes.string,
		screenSize : PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			contactType :  DEFAULT_CONTACT_TYPE,
			selectedOption : this.props.specialists && this.props.specialists[0],
			contactedId : this.props.specialists && this.props.specialists[0].id,
			contactedName : this.props.specialists && this.props.specialists[0].name
		};
	}

	renderSpecialists(specialists) {
		const { selectedOption } = this.state;
		const options = specialists.map ( specialist => ({
			"name" : specialist.name,
			"value" : specialist.id,
			"isOnSelectClose" : true,
			"component" : <MediaListItem data={specialist} awsImagePath={this.context.awsImagePath} onClick={(selectedOption)=>this.setState({
				selectedOption,
				contactedId : selectedOption.id,
				contactedName : selectedOption.name,
				contactType : DEFAULT_CONTACT_TYPE
			})}/>
		}));

		return (
			<Select
				key="contact-specialists"
				btnClassName="btn btn-default search-results__actions-btn"
				wrapperCls="col-lg-2 cl-md-2 contact-list-options"
				options={options}
				displayValue = {<MediaListItem data={selectedOption} awsImagePath={this.context.awsImagePath} onClick={()=>{}}/>}
				name="property-sort"
				inputClasses="no-border"
			/>
		)

	}

	render() {
		const  { l } = this.context.i18n;
		const { contactType, contactedId, contactedName } = this.state;
		const { specialists = ''} = this.props;
		const Component = CONTACTTYPE_COMPONENTS[contactType];
		const propsData = specialists && Object.assign({...this.props, contactedId, contactedName}) || this.props;
		return (
			<div className="contact-agent">
				{ specialists && this.renderSpecialists(specialists)}
				<SingleSelectBoxes
					key={`contact-options${propsData.contactedId}`}
					className="contact-agent__control col-lg-12 col-md-12"
					boxOptions={CONTACT_TYPE_OPTIONS}
					selectedBox = {contactType}
					isAnyRequired={false}
					l={l}
					analyticsData={{}}
					onChange={(contactType)=>this.setState({contactType})}/>
				<Component {...propsData}/>
			</div>
		);
	}

}

