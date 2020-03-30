import React, {Component} from 'react';
import { connect } from 'react-redux';
import PortfolioTemplateImport from './portfolio-template-import';
import { REQUEST_SCHEMA_MY_PROPERTY } from '../../redux/actions/schema';

class PropertyTemplateImport extends PortfolioTemplateImport {
    constructor(props) {
        super(props);
    }

    async processAndSendData(data) {
        const { propertyId, propertyName } = this.props;
		try {
            await this.processData(data);
            const cashFlows = (this.propertyObject[propertyName] && this.propertyObject[propertyName].cashFlowTransactions) || [];
            await this.props.dispatch(REQUEST_SCHEMA_MY_PROPERTY({
				method : 'post',
				endpoint : 'savepropertycashflow',
				actionType : 'RESPONSE_SAVE_SCHEMA_MY_PROPERTY_CASHFLOW',
				paramPayload : { id : propertyId},
				dataPayload: cashFlows
			}));
		} catch (e) {}
	}

    render() {
        return super.render();
    }
}

const mapStateToProps = ({userprofile}) => {
	return {
		saveProperties: userprofile.save_properties
	};
};
export default connect(mapStateToProps)(PropertyTemplateImport);
