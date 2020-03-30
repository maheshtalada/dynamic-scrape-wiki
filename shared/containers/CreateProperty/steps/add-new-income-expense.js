import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, values, extend } from 'lodash';
import schemas from './income-and-expense-schema.json';
import { Schema } from 'components/schema';
import { connect } from 'react-redux';
import transformer from 'utils/form-data-transformer';
import { formatDateUtil } from 'utils/localeUtil';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../../redux/actions/schema'

const GA_CATEGORY = 'Create Property';

class AddIncomeExpense extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props,context) {
		super(props);
		const { country } = context;
		this.state = {
			modifiedValues: (({ rowData, isAdd })=>{
				if(!isAdd) {
					return { 'property.incomeandexpense.transactionDate' : formatDateUtil(rowData.transactionDate,country,'DD/MM/YYYY'),
						'property.incomeandexpense.type' : rowData.type,
						'property.incomeandexpense.subType' : rowData.subType,
						'property.incomeandexpense.description' : rowData.description,
						'property.incomeandexpense.amount' : rowData.amount,
						'property.incomeandexpense.isIncludedForComputation' : rowData.isIncludedForComputation };
				}
				return {}
			})(props),
			initialValues: {}
        };
        this.onSchemaChange = this.onSchemaChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            isSaving : props.save_schema_my_property_cashflow.isFetching
        });
        if(props.save_schema_my_property_cashflow.status === 'success') {
            this.props.removeModal();
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
					referenceData={schemas.referenceData}

                />
			);
		});
    }

	render() {
        const { i18n : {l}} = this.context;
        const { isSaving } = this.state;
		return (
			<div className="income-step add-new-income">
                {this.renderSchema()}
                <div className="save-btn-wrap flex flex-justify-center">
                    <button data-tag-category={GA_CATEGORY} data-tag-action='click' data-tag-label='Save Transaction' className="btn btn-primary btn-l" onClick={this.saveSchema.bind(this)}>{l('SAVE')}</button>
                    {/* {isSaving && <Spinner />} */}
                </div>
			</div>
		);
    }

	saveSchema() {
		const { endpoint, paramPayload } = this.props;
		this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
			method : 'post',
			endpoint : endpoint,
			actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_CASHFLOW',
			paramPayload,
			dataPayload: transformer.transformPathsToObject(extend({},this.state.initialValues,this.state.modifiedValues)).incomeandexpense
		}));
	}
}

const mapStateToProps = ({schema}) => {
	const { save_schema_my_property_cashflow = {} } = schema;
	return {
		save_schema_my_property_cashflow
	};
};

export default connect(mapStateToProps)(AddIncomeExpense);
