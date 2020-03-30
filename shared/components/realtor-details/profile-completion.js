import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import APPCONSTANTS from '../../utils/app-constants';
import { Line, Circle} from '../common/svg-shapes';
import uniqueFormId from '../../utils/uniqueFormId';

const {EDIT_PROFILE_LINK} = APPCONSTANTS;
const TITLE = "PROFILECOMPLETION",
	DESCRIPTION = "ENRICHYOURPROFILEMSG";

export default class ProfileCompletion extends Component {
	constructor(props) {
		console.log(props);
		super(props);
	}

	static propTypes = {
		user: PropTypes.object,
		progress: PropTypes.object,
		title: PropTypes.string,
		description: PropTypes.string,
		editUrl: PropTypes.string,
		editRequired: PropTypes.bool
	};

	static defaultProps = {
		title : TITLE,
		description: DESCRIPTION,
		editUrl: EDIT_PROFILE_LINK,
		editRequired: true
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	renderIndividualBars(groups) {
		const { l } = this.context.i18n;
		return groups && groups.map((group, index)=>{
				return (
					<div className={`bar bar-${index}`} onClick={()=>this.redirectTemplate(PAGES[group.name], this.props.details.id)}>
						<span className="bar-title">{l(group.name)}</span>
						<Line
							key={`bar-${index}-${uniqueFormId}`}
							strokeWidth="4"
							percent={Math.round(group.totalCompletion)}
							trailWidth="4"
							strokeLinecap="round"
							animationDuration="300"
							strokeColor="#739cc0"
							trailColor="#7cccf1"
						/>
					</div>
				);
			});

	};

	renderGroupFieldsInfo(groups) {
		let fieldObjects = [];
		const { l } = this.context.i18n;
		groups.map(group=>group.fields && fieldObjects.push({ groupName : group.name, fields: group.fields}));
		return (fieldObjects.length > 0 &&
			<div className="group-fields-wrap">
				{fieldObjects.map(fieldObj => {
					return <div className="group-fields-wrap__field">
						<h3 className="group-fields-wrap__field__group-name progress-title">{l(fieldObj.groupName+'MISSEDFIELDS')}</h3>
						{
							fieldObj.fields.map(field => {
								return <div className="row">
									<span className="col-xs-8 field-name">{l(field.name)} :</span>
									<span className="col-xs-4">{field.percentage.toFixed(2)}%</span>
								</div>
							})
						}
					</div>
				})}
			</div>
		)
	}

	render() {
		const { details,title,description, editUrl,progress, editRequired } = this.props;
		const { l } = this.context.i18n;
		return (
			<div className="listing-confirmation">
				{editRequired && <div className="col-lg-5 col-md-5 listing-confirmation__wrapper-left">
					<div className="listing-confirmation__title mod-bottom">{l(title)}</div>
					<div className="listing-confirmation__description mod-bottom">{l(description)}</div>
					<div className="listing-confirmation__actions">
					<span className="actions">
						<Link to={editUrl} target="_blank">
							<button className="btn btn-primary">
								{l('EDIT')}
							</button>
						</Link>
					</span>
					</div>
				</div>}
				<div className="col-lg-7 col-md-7 listing-confirmation__wrapper-right">
					{ !frameworkGlobals.isServer && <div className="completion-info">
						<div className="loading-indicator radial-bars">
							<Circle key={`overall-progress-${uniqueFormId}`} strokeWidth="13" percent={Math.round(progress.totalCompletion)} trailWidth="13" animationDuration="500" strokeColor="#7cccf1" trailColor="#f9f9f9" />
						</div>
						<div className="line-bars individual-progress">
							<h3 className="progress-title">{l('PERCENTAGEOFCOMPLETION')}</h3>
							<div className="bars">
								{this.renderIndividualBars(progress.groups)}
							</div>
						</div>
							{/*{this.renderGroupFieldsInfo(progress.groups)}*/}
					</div>
					}
				</div>
			</div>
		)
	}
}
