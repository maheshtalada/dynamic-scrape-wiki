import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import SiteConfig from '../config.js';
import { connect } from 'react-redux';
import Loader from 'components/common/page-loader/loader';
import { Button } from 'components/common/button';
import { Schema } from 'components/schema';
import defaultComponentIndex from 'components/pdf-generator/pdf-component-index.js';
import { isEmpty, values, cloneDeep, sortBy, extend, find as _find } from 'lodash';
import { REQUEST_GET_PROPERTY_PDF } from '../redux/actions/properties';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import axios from 'axios';
import loadable from '@loadable/component';
import BaseProfilePic from 'lib/ProfilePic';
import {  REQUEST_UPLOAD_PROFILE_IMAGE, REQUEST_UPLOAD_OFFICE_LOGO } from '../redux/actions/userprofile';
import SchemaData from '../assets/static/schema/schema-FLYER-classic.json';

const ProfilePic = loadable(() => import(/* webpackChunkName: 'ProfilePic' */'components/profile/profile-pic-component'));

const { assetsPath, imageRootPath } = SiteConfig;

const realtorphoto = 'Profile Photo';
const brokeragefirmlogo = 'Logo';

class FlyerPreview extends BaseProfilePic {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number,
		awsImagePath : PropTypes.string,
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			modifiedValues: {},
			initialValues: {}
		};
		this.el = React.createRef();

	}

	componentDidUpdate() {
		const { screenSize} = this.context;
		if(this.el.current && screenSize <= 2 && !this.stylesUpdated) {
			const rect = this.el.current.getBoundingClientRect();
			const scale = Math.min(window.innerWidth / rect.width , window.innerHeight / 1227);
			this.el.current.style.transform = "scale("+scale+")";
			setTimeout(()=>{
				const reactBounds= this.el.current.getBoundingClientRect();
				const wrapper = document.getElementsByClassName('wizard__step-container');
				const wrapperHeight = wrapper[0].offsetHeight;
				const navigation = document.getElementsByClassName('linear-navigation');
				const margintop = wrapperHeight - (reactBounds.bottom + 70); // 70 is header height
				navigation[0].style.marginTop = `-${margintop}px`;
				this.stylesUpdated = true;
			},500)

		}
	}

	render() {
		const { i18n : {l}} = this.context;
		const { templateOption = '', isFileDownloading } = this.state;
		const { stepConfig, property_pdf_data = '', user : {user }, dispatch} = this.props;

		return (
			<div className="choose-template-step wizard__step-container">
				<div className="flex flex-justify-center">
					<h3 className="wizard__question">{l('PREVIEWPDF')}</h3>
				</div>
				{ property_pdf_data.type && <div ref={this.el} className={`wizard__answer-options-container pdf-generator pdf-${property_pdf_data.type.toLowerCase()}-${property_pdf_data.template}`}>
					{/*{property_pdf_data.header && this.renderPDFHeader(property_pdf_data.header)}*/}
					{this.renderSchema()}
				{/*	{property_pdf_data.footer && this.renderPDFFooter(property_pdf_data.footer, user)}*/}
				</div>}
				<LinearNavigation
					nextBtnGATags={{
						'data-tag-category' : 'Generate Flyer Actions',
						'data-tag-action' : 'Click',
						'data-tag-label' : 'Generate Flyer'
					}}
					nextText="Download PDF (A4)"
					currentActiveLoader={isFileDownloading ? 'next' : ''}
					backText={l('PREVIOUS')}
					className="linear-navigation--light-theme"
					onNext={this.onNextClick.bind(this)}
					onBack={this.onBackClick.bind(this)}
				/>

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
		const { property_pdf_data } = this.props;
		const { l } = this.context.i18n;
		let expressList = property_pdf_data.pages,
			referenceData = property_pdf_data.referenceData || {},
			listSchema = sortBy(values(expressList), (o)=> {
				return o.order;
			});

		return listSchema.map((schemaData, index) => {
			return (
				<div className="pdf-preview-page">
					{this.renderPDFHeader(property_pdf_data.header)}
					<Schema
						l={l}
						assetsPath={assetsPath}
						ref={`schema_${index}`}
						data={schemaData}
						customComponentIndex = {defaultComponentIndex}
						writeMode={true}
						onChange={this.onSchemaChange.bind(this)}
						modifiedValues={this.state.modifiedValues}
						initialValues={this.state.initialValues}
						referenceData={referenceData}
					/>
					{this.renderPDFFooter(property_pdf_data.footer)}
				</div>
			);
		});

	}

	renderPDFHeader(data) {
		return (
			<div className="pdf-header">
				<div className="pdf-header__left">
					<div className="pdf-header__logo">
						<a target="_blank" href="/"><img src={`${assetsPath}/images/logo/logo_us_blue.png`} alt="propshub" /></a>
					</div>
				</div>
				<div className="pdf-header__right">
					<h4 className="pdf-header__title">{data.title}</h4>
				</div>
			</div>
		)
	}

	renderPDFFooter(data) {
		const  { realtor = '', brokerageFirm = '' } = data;
		const realtorPhotoLabel = realtor.photo ? `Change ${realtorphoto}` : `Add ${realtorphoto}`;
		const brokerageLogoLabel = brokerageFirm.logo ? `Change ${brokeragefirmlogo}` : `Add ${brokeragefirmlogo}`;
		//const name = realtor.licensenumber ? `${realtor.name} (${realtor.licensenumber})` : realtor.name;
		const licensenumber = realtor.licensenumber ? ` (#${realtor.licensenumber})` : '';
		return (
			<div className="pdf-footer">
				{
					realtor &&
					<div className="pdf-footer__left">
						<div className="pdf-footer__left__pic">
							<ProfilePic key={`realtor-${this.props.params.id}`} userInfo={{ photo : { uri : realtor.photo}}} dispatch={this.props.dispatch} isStopWindowReload={true} isShowUpload={false} photoUrl={realtor.photo} />
						</div>
						<div className="pdf-footer__left__info">
							<div className="realtor-name"><a href={`${realtor.siteurl}`} target="_blank">{realtor.name}</a>{licensenumber}</div>
							{ realtor.phone && <div className="realtor-phone">
								{ realtor.phone.replace(/./g,(v,i)=>(i === 2 || i === 5) ? v + '-' : v) }
							</div>}
							{ realtor.email &&  <div className="realtor-email">{ realtor.email}</div>}
						</div>
						<Button btnClassName="btn-default" onClick={()=>this.updateActions('realtor', { photo : { uri : realtor.photo}})}>
							{realtorPhotoLabel}
						</Button>
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
						<div className="pdf-footer__right__pic">
							<ProfilePic key={`brokerage-${this.props.params.id}`} userInfo={{ photo : { uri : brokerageFirm.logo}}} dispatch={this.props.dispatch} isStopWindowReload={true} isShowUpload={false} photoUrl={brokerageFirm.logo}/>
						</div>
						<Button btnClassName="btn-default" onClick={()=>this.updateActions('brokerage', { photo : { uri : brokerageFirm.logo}})}>
							{brokerageLogoLabel}
						</Button>
					</div>
				}
			</div>
		)
	}

	updateActions(type, photoObj) {
		if(type === 'realtor') {
			this.imageUploadActions = {
				add : REQUEST_UPLOAD_PROFILE_IMAGE
			}
		} else {
			this.imageUploadActions = {
				add : REQUEST_UPLOAD_OFFICE_LOGO
			}
		}

		this.onClickProfilePic(this.props.params.id , photoObj);
	}

	onBackClick() {
		this.context.router.push({
			pathname :  `/profile/flyer/contactinfo/${this.props.params.id}`,
			query : this.props.location.query
		})
	}

	async onNextClick() {
		const captchaConfig =  {
			method : 'GET',
			url : `/api/v1/puppeteer?id=${this.props.params.id}`,
			responseType: 'arraybuffer',
			headers: {
				'Accept': 'application/pdf',
				'clientip' : frameworkGlobals.visitorIP
			}
		};

		this.setState({
			isFileDownloading : true
		})
		try {
			const { property_pdf_data : { title, type, template }} = this.props;
			const response = await axios(captchaConfig);
			const blob = new Blob([response.data], {type: "application/pdf"});
			const link = document.createElement('a');
			const url = window.URL.createObjectURL(blob);
			const fileName = `${type.toLowerCase()}-${template}-${title}.pdf`;

			// IE doesn't allow using a blob object directly as link href
			// instead it is necessary to use msSaveOrOpenBlob
			if (navigator && navigator.msSaveOrOpenBlob) {
				navigator.msSaveOrOpenBlob(blob, fileName);

			} else {

				// For other browsers:
				// Create a link pointing to the ObjectURL containing the blob.
				link.href = url;
				link.download = fileName;
				link.dispatchEvent(new MouseEvent(`click`, {bubbles: false, cancelable: true}));

			}
			setTimeout(function () {
				// For Firefox it is necessary to delay revoking the ObjectURL
				window.URL.revokeObjectURL(url);
			}, 100);

			this.setState({
				isFileDownloading : false
			})

		} catch (e) {
			console.log(e)
		}
	}
}


const mapStateToProps = ({properties}) => {
	const { property_pdf_data = '' } = properties;
	return { property_pdf_data };
};

export default connect(mapStateToProps)(
	connectDataFetchers(FlyerPreview, [
		REQUEST_GET_PROPERTY_PDF
	], true)
);
