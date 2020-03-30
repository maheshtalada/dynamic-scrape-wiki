import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SiteConfig from '../../config.js';
import { connect } from 'react-redux';
import { Schema } from 'components/schema';
import defaultComponentIndex from 'components/pdf-generator/pdf-component-index.js';
import { isEmpty, values, cloneDeep, sortBy, extend, find as _find } from 'lodash';
import { REQUEST_GET_PROPERTY_PDF } from '../../redux/actions/properties';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';

const { assetsPath } = SiteConfig;

class DownloadPdf extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			modifiedValues: {},
			initialValues: {},
		};
	}

	render() {
		const { i18n : {l}} = this.context;
		const { templateOption = '' } = this.state;
		const { stepConfig, property_pdf_template = ''} = this.props;
		return (
			<div className="pdf-classic">
				{this.renderSchema()}
			</div>
		);
	}

	onSchemaChange = (changeObject, hasErrors) => {
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(this.props.property_pdf_data.pages).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	renderSchema() {
		const { l } = this.context.i18n
		let expressList = this.props.property_pdf_data.pages,
			referenceData = this.props.property_pdf_data.referenceData|| {},
			listSchema = sortBy(values(expressList), (o)=> {
				return o.order;
			});

		return listSchema.map((schemaData, index) => {
			return (
				<Schema
					l={l}
					ref={`schema_${index}`}
					data={schemaData}
					customComponentIndex = {defaultComponentIndex}
					writeMode={true}
					onChange={this.onSchemaChange.bind(this)}
					modifiedValues={this.state.modifiedValues}
					initialValues={this.state.initialValues}
					referenceData={referenceData}
				/>
			);
		});

	}
}


const mapStateToProps = ({properties}) => {
	const { property_pdf_data = '' } = properties;
	return { property_pdf_data };
};

export default connect(mapStateToProps)(
	connectDataFetchers(DownloadPdf, [
		REQUEST_GET_PROPERTY_PDF
	])
);
