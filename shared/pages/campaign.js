import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SiteConfig from '../config.js';
import { connect } from 'react-redux';
import { Schema } from 'components/schema';
import defaultComponentIndex from 'components/pdf-generator/pdf-component-index.js';
import { isEmpty, values, cloneDeep, sortBy, extend, find as _find } from 'lodash';
import { REQUEST_GET_PROPERTY_PDF } from '../redux/actions/properties';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import SchemaData from '../assets/static/schema/schema-FLYER-classic.json';

const { assetsPath } = SiteConfig;

class DownloadPdf extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number,
		awsImagePath : PropTypes.string
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
		const { property_pdf_data = ''} = this.props;
		return (
			<Fragment>
				{ property_pdf_data.type && <div className={`pdf-generator pdf-${property_pdf_data.type.toLowerCase()}-${property_pdf_data.template}`}>
					{/*{property_pdf_data.header && this.renderPDFHeader(property_pdf_data.header)}*/}
					{this.renderSchema()}
					{/*{property_pdf_data.footer && this.renderPDFFooter(property_pdf_data.footer)}*/}
				</div>}
			</Fragment>
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
					assetsPath={assetsPath}
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

	renderPDFHeader(data) {
		return (
			<div className="pdf-header">
				<div className="pdf-header__left">
					<div className="pdf-header__logo">
						<a target="_blank" href="/"><img src={`${assetsPath}/images/logo/logo_us_green.png`} alt="propshub" /></a>
					</div>
				</div>
				<div className="pdf-header__right">
					<h4 className="pdf-header__title">{data.title}</h4>
				</div>
			</div>
		)
	}

	renderPDFFooter(data) {
		const { awsImagePath } = this.context;
		const  { realtor = '', brokerageFirm = '' } = data;
		return (
			<div className="pdf-footer">
				{
					realtor &&
					<div className="pdf-footer__left">
						{ realtor.photo &&<div className="pdf-footer__left__pic">
							<div className="img-wrap cursor">
								<img ref="profileImgEl" alt="user profile pic" src={`${awsImagePath}/${realtor.photo}`}/>
							</div>
						</div>}
						<div className="pdf-footer__left__info">
							<div className="realtor-name">{realtor.name}</div>
							{
								realtor.siteurl &&
								<a href={`${realtor.siteurl}`} traget="_blank"></a>
							}
							{ realtor.phone && <div className="realtor-phone">
								{ realtor.phone.replace(/./g,(v,i)=>(i === 2 || i === 5) ? v + '-' : v) }
							</div>}
							{ realtor.email &&  <div className="realtor-email">{ realtor.email}</div>}
						</div>
					</div>
				}

				{
					brokerageFirm &&
					<div className="pdf-footer__right">
						<div className="pdf-footer__right__info">
							<div className="realtor-name">{brokerageFirm.name}</div>
							{ brokerageFirm.phone && <div className="realtor-phone">
								{ brokerageFirm.phone.replace(/./g,(v,i)=>(i === 2 || i === 5) ? v + '-' : v) }
							</div>}
							{ brokerageFirm.email &&  <div className="realtor-email">{brokerageFirm.email}</div>}
						</div>
						{ brokerageFirm.logo && <div className="pdf-footer__right__pic">
							<div className="img-wrap cursor">
								<img ref="profileImgEl" alt="user profile pic" src={`${awsImagePath}/${brokerageFirm.logo}`}/>
							</div>
						</div>}
					</div>
				}
			</div>
		)
	}

}


const mapStateToProps = ({properties}) => {
	const { property_pdf_data = '' } = properties;
	return { property_pdf_data };
};

export default connect(mapStateToProps)(
	connectDataFetchers(DownloadPdf, [
		REQUEST_GET_PROPERTY_PDF
	], false,{ redis : true})
);
