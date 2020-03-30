import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, values, cloneDeep, sortBy, extend } from 'lodash';
import { Schema } from '../../components/schema';
import Loader from '../../components/common/page-loader/loader';
import LinearNavigation from '../../components/common/linear-navigation/linear-navigation';
import ScrollIntoView from 'scroll-into-view';
import ErrorBox from '../../components/common/error-box/error-box';
import { REQUEST_ADD_FINANCIAL_SCHEMA } from '../../redux/actions/schema'

const NEXT = 'next',
	FINISH = 'finish';
class FinancialDetails extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			hasErrors: false,
			forceValidation: false,
			modifiedValues: {},
			initialValues: {},
			isFetching: (props.schema_get_financial && props.schema_get_financial.isFetching) || false,
			navigatingSaveExit: false,
			errorCode: '',
			isError: false
		};
	}

	componentWillReceiveProps(props) {
		const { schema_get_financial } = props;
		this.setState({
			isFetching: schema_get_financial && schema_get_financial.isFetching
		});
		if(props.schema_save_financial && props.schema_save_financial.listingid) {
			this.handlePostOnline(props.schema_save_financial);
			return;
		} else if(props.schema_save_financial && props.schema_save_financial.isFetching) {
			this.setState({
				isFetching : props.schema_save_financial.isFetching
			});
			return;
		}
		if(props.schema_save_financial && (props.schema_save_financial.error || props.schema_save_financial.status === 'error')) {
			window.scrollTo(0,0);
			this.setState({
				isError: true,
				errorCode: props.schema_save_financial.error && props.schema_save_financial.error.error_description
			});
		}
	}

	handlePostOnline(props) {
		const { goto,navigatingSaveExit } = this.state;
		if(goto && goto === FINISH ) {
			this.setState({
				isFetching : props.isFetching
			} , () => {
				if (navigatingSaveExit) {
					this.context.router.push('/profile/listings');
				} else {
					this.context.router.push({
						pathname: props.listingurl
					});
				}
			});
		} else if (goto && goto === NEXT) {
			this.context.router.push({
				pathname : `/profile/additional/property-listing/${props.listingid}`
			});
		}

	}

	onSchemaChange(changeObject, hasErrors) {
		const schema_get_financial = this.props;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(schema_get_financial.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	renderSchema() {
		const { i18n, country } = this.context;
		const { schema_get_financial } = this.props;
		if (isEmpty(schema_get_financial)) {
			return null;
		}
		let expressList = schema_get_financial.schemas,
			schemaInfo = schema_get_financial.schemaInfos,
			referenceData = schema_get_financial.referenceData,
			listSchema = sortBy(values(expressList), (o)=> {
				return o.order;
			});
		// console.log(schema_get_financial.schemas);

		return listSchema.map((schemaData, index) => {
			return (
				<div id={`schema_${index}`}>
					<Schema
						l={i18n.l}
						country = {country}
						ref={`schema_${index}`}
						data={schemaData}
						writeMode={true}
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
			schemaLength = values(this.props.schema_get_financial.schemas).length,
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
			this.props.dispatch(REQUEST_ADD_FINANCIAL_SCHEMA({
				payload: extend({},this.state.initialValues,this.state.modifiedValues)
			}));
		} else {
			ScrollIntoView(document.getElementById(schemaGroups[0]));
		}

	}

	onBackClick() {
		this.context.router.push({
			pathname : `/profile/property/property-listing/${this.props.params.id}`
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
		const { isFetching, errorCode, isError} = this.state;
		return (
			<div className="schema-forms">
				{
					isFetching && !frameworkGlobals.isServer &&
					<Loader/>
				}
				{
					isError &&
					<ErrorBox l={l} errorCode={errorCode}/>
				}
				{ this.renderSchema()}
				{!isFetching && <LinearNavigation
					nextText="NEXTTOADDITIONAL"
					backText="BACKTOPROPERTY"
					saveExitText="POSTONLINE"
					className="linear-navigation--light-theme"
					isSaveExitRequired={true}
					isNavigatingSaveExitRequired={true}
					navigatingSaveExitText = "SAVEEXIT"
					onNext={this.onNextClick.bind(this)}
					onConfirm={this.onConfirmClick.bind(this)}
					onBack={this.onBackClick.bind(this)}
					onNavigateSaveExit={this.onNavigateSaveExitClick.bind(this)}
				/>}
			</div>
		);

	}

}

const mapStateToProps = ({schema}) => {
	const { schema_save_financial } = schema;
	return {
		schema_save_financial
	};
};

export default connect(mapStateToProps)(FinancialDetails);


