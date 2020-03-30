import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import { Schema } from '../../components/schema';
import { isEmpty, values, cloneDeep, sortBy, extend } from 'lodash';
import ScrollIntoView from 'scroll-into-view';
import { Button } from '../../components/common/button';
import { SAVE_NOTIFICATION_PREFERENCES_SCHEMA, REQUEST_NOTIFICATION_PREFERENCES_SCHEMA } from '../../redux/actions/schema';

class PreferencesComponent extends Component {

	static propTypes = {

	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			isFetching: false,
			modifiedValues: {},
			initialValues: {},
			hasErrors: false
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onSchemaChange = this.onSchemaChange.bind(this);
	}

	componentWillReceiveProps(props) {
		const { getPreferences, savePreferences } = props;
		if(props) {
			this.setState({
				isFetching : getPreferences && getPreferences.isFetching,
				referenceData : getPreferences && getPreferences.referenceData,
				schemaInfos : getPreferences && getPreferences.schemaInfos,
				schemas : getPreferences && getPreferences.schemas,
				isSaving : savePreferences && savePreferences.isSaving,
				preferencesSaveSuccess : savePreferences && savePreferences.status === 'success'
			});
			if(savePreferences && savePreferences.status === 'success') {
				window.scrollTo(0,0);
			}
		}
	}

	onSchemaChange(changeObject, hasErrors) {
		const { getPreferences } = this.props;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(getPreferences.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	onSubmit() {
		let schemasAreValid = true,
			schemaGroups = [];
		const { schemas } = this.state;
		const schemaLength = values(schemas).length;

		for (let i = 0; i < schemaLength; ++i) {
			if (!this.refs[`schema_${i}`].checkSubmissionValid()) {
				schemaGroups.push(`schema_${i}`);
				schemasAreValid = false;
			}
		}
		if(schemasAreValid) {
			this.props.dispatch(SAVE_NOTIFICATION_PREFERENCES_SCHEMA({
				dataPayload: extend({},this.state.initialValues,this.state.modifiedValues)
			}));
		} else {
			ScrollIntoView(document.getElementById(schemaGroups[0]));
		}
	}

	renderSchema() {
		const { schemas, schemaInfos, referenceData, schemaKey } = this.state;
		const { i18n, country } = this.context;

		return (
			<div className="profile-page__layout__profile-section__preferences-wrapper__schema-wrapper">
				{schemas.map((schemaData, index) => {
					return (
						<div className="schema-container-wrapper schema-border" id={`schema_${index}`}>
							<Schema
								l={i18n.l}
								country = {country}
								key={schemaKey}
								ref={`schema_${index}`}
								data={schemaData}
								writeMode={true}
								onChange={this.onSchemaChange}
								modifiedValues={this.state.modifiedValues}
								initialValues={this.state.initialValues}
								referenceData={referenceData}
							/>
						</div>
					);
				})
				}
			</div>
		);
	}

	render() {
		const { l } = this.context.i18n;
		const { isFetching, schemas, isSaving, preferencesSaveSuccess } = this.state;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__preferences-wrapper">
					<div className="profile-page__layout__profile-section__preferences-wrapper__header">
						<h1 className="profile-page__layout__profile-section__preferences-wrapper__title">
							{l('MYPREFERENCES')}
						</h1>
					</div>
					{
						preferencesSaveSuccess && <div className="alert alert-success">{l('PREFERENCESSAVESUCCESS')}</div>
					}
					{
						(isFetching || isSaving) && <Loader/>
					}
					{
						schemas && schemas.length > 0 &&
						<div>
							{this.renderSchema()}
						</div>
					}
					{ schemas && schemas.length > 0 &&
					<div className="save-preferences-btn">
						<Button btnClassName="btn-primary" onClick={this.onSubmit}>{l('SAVE')}</Button>
					</div>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({schema}) => {
	return {
		getPreferences: schema.get_notification_preferences_schema,
		savePreferences: schema.save_notification_preferences_schema
	};
};
export default connect(mapStateToProps)(connectDataFetchers(PreferencesComponent, [
	REQUEST_NOTIFICATION_PREFERENCES_SCHEMA
],true));
