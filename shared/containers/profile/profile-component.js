import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import { Schema } from '../../components/schema';
import { isEmpty, values, cloneDeep, sortBy, extend } from 'lodash';
import { Button } from '../../components/common/button';
import ProfileCompletion from '../../components/realtor-details/profile-completion';
import ErrorBox from '../../components/common/error-box/error-box';
import ScrollIntoView from 'scroll-into-view';
import { SAVE_USER_PROFILE_SCHEMA, REQUEST_USER_PROFILE_SCHEMA } from '../../redux/actions/schema';

class ProfileComponent extends Component {

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
		const { userEditProfile={}, userSaveProfile, completionDetail } = props;
		if(props) {
			this.setState({
				isFetching : userEditProfile.isFetching,
				referenceData : userEditProfile.schema && userEditProfile.schema.referenceData,
				schemaInfos : userEditProfile.schema && userEditProfile.schema.schemaInfos,
				schemas : userEditProfile.schema &&userEditProfile.schema.schemas,
				isSaving : userSaveProfile && userSaveProfile.isSaving,
				profileSaveSuccess : userSaveProfile && userSaveProfile.status === 'success',
				completionDetail : userEditProfile && userEditProfile.completionDetail
			});
			if(userSaveProfile && userSaveProfile.status === 'success') {
				window.scrollTo(0,0);
				window.location.reload();
			}
			if(userSaveProfile && (userSaveProfile.error || userSaveProfile.status === 'error')) {
				window.scrollTo(0,0);
				this.setState({
					isError: true,
					errorCode: userSaveProfile.error && userSaveProfile.error.error_description
				});
			}
		}
	}

	onSchemaChange(changeObject, hasErrors) {
		const { userEditProfile } = this.props;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(userEditProfile.schemas).length;

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
			this.props.dispatch(SAVE_USER_PROFILE_SCHEMA({
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
			<div className="profile-page__layout__profile-section__profile-wrapper__schema-wrapper">
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
		const { isFetching, schemas, isSaving, profileSaveSuccess, completionDetail, errorCode, isError } = this.state;
		const { user } = this.props.user;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__profile-wrapper">
					<div className="profile-page__layout__profile-section__profile-wrapper__header">
						<h1 className="profile-page__layout__profile-section__profile-wrapper__title">
							{l('MYPROFILE')}
						</h1>
						{user.profileURL && <a href={user.profileURL} target="_blank">
							<Button btnClassName="btn-primary" title={l("CLICKTOVIEWPROFILE")}><i className="pe-7s-look"/>{l('VIEW')}</Button>
						</a>}
					</div>
					{
						profileSaveSuccess && <div className="alert alert-success">{l('PROFILESAVESUCCESS')}</div>
					}
					{
						(isFetching || isSaving) && <Loader/>
					}
					{
						isError &&
						<ErrorBox l={l} errorCode={errorCode}/>
					}
					{
						schemas && schemas.length > 0 &&
							<div>
								{this.renderSchema()}
								{completionDetail && <ProfileCompletion
									user = {user}
									progress = {completionDetail}
									editRequired = {false}
								/>}
							</div>
					}
					{ schemas && schemas.length > 0 &&
						<div className="save-profile-btn">
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
		userEditProfile: schema.user_edit_profile,
		userSaveProfile: schema.user_save_profile
	};
};
export default connect(mapStateToProps)(connectDataFetchers(ProfileComponent, [
	REQUEST_USER_PROFILE_SCHEMA
],true));
