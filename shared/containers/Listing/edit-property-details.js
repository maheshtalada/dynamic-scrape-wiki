import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values, cloneDeep, sortBy, extend } from 'lodash';
import { Schema } from '../../components/schema';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import LinearNavigation from '../../components/common/linear-navigation/linear-navigation';
import ScrollIntoView from 'scroll-into-view';
import ErrorBox from '../../components/common/error-box/error-box';
import { REQUEST_ADD_PROPERTY_SCHEMA } from '../../redux/actions/schema';

const NEXT = 'next',
	FINISH = 'finish';
class EditProperty extends Component {

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object,
		country : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			modifiedValues: {},
			initialValues: {},
			isFetching: false,
			navigatingSaveExit: false,
			errorCode: '',
			isError: false
		};
	}

	componentWillReceiveProps(props) {
		const { schema_get_property } = props;
		this.setState({
			isFetching: schema_get_property && schema_get_property.isFetching
		});
		if(props.schema_save_property && props.schema_save_property.isFetching) {
			this.setState({
				isFetching : props.schema_save_property.isFetching
			});
		} else if(props.schema_save_property && props.schema_save_property.listingid) {
			this.handlePostOnline(props.schema_save_property);
		}
		if(props.schema_save_property && (props.schema_save_property.error || props.schema_save_property.status === 'error')) {
			window.scrollTo(0,0);
			const {errors} = props.schema_save_property.error;
			this.setState({
				isError: true,
				errorCode: (function(errors){
					return errors.map(err => <div style={{display:"block"}}>{err.field} {err.code}</div>)
				})(errors)
			});
		}
	}

	handlePostOnline(props) {
		const { goto, navigatingSaveExit } = this.state;
		if(goto && goto === FINISH ) {
			this.setState({
				isFetching : props.isFetching
			}, () => {
				if(navigatingSaveExit) {
					this.context.router.push('/profile/listings');
				} else {
					this.context.router.push({
						pathname : props.listingurl
					});
				}
			});
		} else if (goto && goto === NEXT) {
			this.context.router.push({
				pathname : `/profile/financial/property-listing/${props.listingid}`
			});
		}

	}

	onSchemaChange(changeObject, hasErrors) {
		const { schema_get_property } = this.props;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(schema_get_property.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	renderSchema() {
		const { i18n, country } = this.context;
		const { schema_get_property } = this.props;

		if (isEmpty(schema_get_property)) {
			return null;
		}
		let propertyStructure = schema_get_property.schemas,
			referenceData = schema_get_property.referenceData,
			schemaInfo = schema_get_property.schemaInfos,
			listSchema = sortBy(values(propertyStructure), (o)=> {
				return o.order;
			});

		return listSchema.map((schemaData, index) => {
			return (

				<div id={`schema_${index}`} className="schema-container-wrapper schema-border">
					<Schema
						l={i18n.l}
						country = {country}
						ref={`schema_${index}`}
						data={schemaData}
						writeMode={true}
						updateonPropsChange={true}
						onChange={this.onSchemaChange.bind(this)}
						modifiedValues={this.state.modifiedValues}
						initialValues={this.state.initialValues}
						referenceData={referenceData}
					/>
				</div>
			);
		});
	}

	onSubmit(goto) {
		let schemasAreValid = true,
			schemaLength = values(this.props.schema_get_property.schemas).length,
			schemaGroups = [];


		for (let i = 0; i < schemaLength; ++i) {
			if (!this.refs[`schema_${i}`].checkSubmissionValid()) {
				schemaGroups.push(`schema_${i}`);
				schemasAreValid = false;
			}
		}
		if (schemasAreValid) {
			this.setState({
				goto : goto
			});
			this.props.dispatch(REQUEST_ADD_PROPERTY_SCHEMA({
				payload: extend({},this.state.initialValues,this.state.modifiedValues)
			}));
		} else {
			ScrollIntoView(document.getElementById(schemaGroups[0]));
		}

	}


	onBackClick() {
		this.context.router.push({
			pathname : `/profile/listing/property-listing/${this.props.params.id}`
		});
	}

	onNextClick() {
		this.onSubmit(NEXT);
	}

	onConfirmClick() {
		this.onSubmit(FINISH);
	}

	onNavigateSaveExitClick() {
		this.onSubmit(FINISH);
		this.setState({
			navigatingSaveExit: true
		});
	}

	render() {
		const { l } = this.context.i18n;
		const { isFetching, errorCode, isError } = this.state;
		return (
			<div className="schema-forms">
				{
					isFetching && !frameworkGlobals.isServer &&
					<Loader/>
				}
				{
					isError &&
					<ErrorBox l={l} errorCode="">
						<div>{errorCode}</div>
					</ErrorBox>

				}

				{ this.renderSchema()}
				{ !isFetching && <div className="col-xs-12" style={{padding :0}}>
					<LinearNavigation
						nextText="NEXTTOADDITIONAL"
						backText="BACKTOFINANCIAL"
						saveExitText="POSTONLINE"
						className="linear-navigation--light-theme"
						isSaveExitRequired={true}
						onNext={this.onNextClick.bind(this)}
						onBack={this.onBackClick.bind(this)}
						onConfirm={this.onConfirmClick.bind(this)}
						isNavigatingSaveExitRequired={true}
						navigatingSaveExitText = "SAVEEXIT"
						onNavigateSaveExit={this.onNavigateSaveExitClick.bind(this)}
					/>
				</div>}
			</div>
		);

	}

}

const mapStateToProps = ({schema}) => {
	const { schema_save_property } = schema;
	return {
		'schema_save_property': schema_save_property
	};
};

export default connect(mapStateToProps)(EditProperty);


