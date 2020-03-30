import { createReducers } from './create-reducers';

const DEFAULT_STATE = {
	'schema_get_basic': {},
	'schema_save_basic': {},
	'schema_get_financial': {},
	'schema_get_overview': {
		'schema' : {},
		'isExisting' : false
	},
	'user_edit_profile': {},
	'user_save_profile': {},
	'get_notification_preferences_schema' : {},
	'save_notification_preferences_schema' : {},
	'get_schema_my_property_details': {},
	'save_schema_my_property_details' : {},
	'save_schema_my_property_purchase_details': {},
	'get_schema_my_property_purchase_details': {},
	'save_schema_my_property_expense': {},
	'save_schema_my_property_income': {},
	'get_schema_tenant_application': {},
	'save_schema_tenant_application': {},
	'save_tenant_application_review': {}
};

const schema = createReducers(DEFAULT_STATE, {

	REQUEST_SCHEMA_PROPERTIES: (state, action) => (
		{
			...state,
			schema_properties: action.data
		}
	),
	RESPONSE_GET_FINANCIAL_SCHEMA : (state, action) => (
		{
			...state,
			schema_get_financial: action.data
		}
	),
	RESPONSE_ADD_COMPANY_PEOPLE : (state, action) => (
		{
			...state,
			add_company_people : action.data
		}
	)
});



export default schema;
