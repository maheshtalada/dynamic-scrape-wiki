import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values, extend } from 'lodash';
import schemas from './income-schema.json';
import { Schema } from 'components/schema';
import { connect } from 'react-redux';
import transformer from 'utils/form-data-transformer';
import Spinner from 'components/common/spinner/spinner';
import ErrorBox from 'components/common/error-box/error-box';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../../redux/actions/schema';

class AddIncome extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			modifiedValues: (({ rowData, isAdd })=>{
				if(!isAdd) {
					return { 'property.income(1).startDate' : rowData.startDate,
						'property.income(1).endDate' : rowData.endDate,
						'property.income(1).tenantName' : rowData.tenantName,
						'property.income(1).monthlyRent' : rowData.monthlyRent }
				}
				return {}
			})(props),
			initialValues: {}
        };
        this.onSchemaChange = this.onSchemaChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            isSaving : props.save_schema_my_property_income.isFetching
        });
        if(props.save_schema_my_property_income.status === 'success') {
            this.props.removeModal();
        } else if (props.save_schema_my_property_income.error || props.save_schema_my_property_income.status === 'error') {
			this.setState({
				isError: true,
				errorCode: props.save_schema_my_property_income.error.error_description
			});
		}
    }

    onSchemaChange(changeObject, hasErrors) {
        this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(schemas[this.props.schemaGroup]).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
    }

	renderSchema() {
        const { i18n, country } = this.context;
        const  { schemaGroup } = this.props;
        return schemas[schemaGroup].map((schemaData, index) => {
			return (
                <Schema
                    l={i18n.l}
                    country = {country}
                    ref={`schema_${index}`}
                    data={schemaData}
                    writeMode={true}
                    updateonPropsChange={true}
                    onChange={this.onSchemaChange}
                    modifiedValues={this.state.modifiedValues}
                    initialValues={this.state.initialValues}

                />
			);
		});
    }

	render() {
        const { i18n : {l}} = this.context;
        const { isSaving, isError, errorCode } = this.state;
		return (
			<div className="income-step add-new-income">
                {
                    isError &&
                    <ErrorBox l={l} errorCode={errorCode}/>
                }
                {this.renderSchema()}
                <div className="save-btn-wrap flex flex-justify-center">
                    <button className="btn btn-primary btn-l" onClick={this.saveSchema.bind(this)}>{l('SAVE')}</button>
                    {isSaving && <Spinner />}
                </div>
			</div>
		);
    }

	saveSchema() {
        const { endpoint, paramPayload, schemaGroup } = this.props;
        let schemasAreValid = true,
            schemaLength = values(schemas[schemaGroup]).length,
			schemaGroups = [];

		for (let i = 0; i < schemaLength; ++i) {
			if (!this.refs[`schema_${i}`].checkSubmissionValid()) {
				schemaGroups.push(`schema_${i}`);
				schemasAreValid = false;
			}
        }
        if(schemasAreValid) {
            this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
                method : 'post',
                endpoint : endpoint,
                actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_INCOME',
                paramPayload,
                dataPayload: transformer.transformPathsToObject(extend({},this.state.initialValues,this.state.modifiedValues)).income
            }));
        }
	}
}

const mapStateToProps = ({schema}) => {
	const { save_schema_my_property_income } = schema;
	return {
		save_schema_my_property_income
	};
};

export default connect(mapStateToProps)(AddIncome);
