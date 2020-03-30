import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import SiteConfig from '../../../config.js';
import Cx from 'classnames';
import { find as _find } from 'lodash';

const { assetsPath } = SiteConfig;
const boxOptions = [
    {
        "label" : "HANDOUTCLASSIC",
		"value" : "handout-classic",
		"nextStep" : "heroimage",
		"watermarkImage" : `${assetsPath}/images/pdf-templates/classiconepagewatermark.png`
	},
	{
        "label" : "HANDOUTCONTEMPORARY",
		"value" : "handout-contemporary",
		"nextStep" : "galleryimages",
		"watermarkImage" : `${assetsPath}/images/pdf-templates/contempraryonepagewatermark.png`
    },
	/*{
        "label" : "POSTCARD",
		"value" : "postcard-classic",
		"nextStep" : "galleryimages",
		"watermarkImage" : `${assetsPath}/images/pdf-templates/postcardwatermark.png`
	},*/
	{
        "label" : "HANDOUTVERBOSE",
		"value" : "handout-verbose",
		"nextStep" : "heroimage",
		"watermarkImage" : `${assetsPath}/images/pdf-templates/classictwopagewatermark.png`
	}
];

const LISTING_NOT_FOUND = 'PROPERTYLISTING_NOT_FOUND';
class Template extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.onTemplateChange = this.onTemplateChange.bind(this);
	}

	componentWillReceiveProps(props) {
		const { property_pdf_template, user : {user} } = props;
		if(property_pdf_template.status === 'error' && property_pdf_template.error.error_description === LISTING_NOT_FOUND){
			let pathname ;
			if(user.isLogIn) {
				pathname = '/profile/listings';
			} else {
				pathname = '/';
			}
			this.context.router.push({pathname});
			return;
		}
		if(!this.state.isNextClicked) {
			this.setState({
				templateOption : props.property_pdf_template.selectedTemplate && `${props.property_pdf_template.selectedType}-${props.property_pdf_template.selectedTemplate}` || '',
				type: props.property_pdf_template.selectedType,
				template: props.property_pdf_template.selectedTemplate
			})
		}
	}


	render() {
		const { i18n : {l}} = this.context;
		const { templateOption = '', isNextClicked='' } = this.state;
		const { stepConfig, property_pdf_template = ''} = this.props;
		return (
			<div className="choose-template-step wizard__step-container">
				<div className="flex flex-justify-between wizard__question-wrapper">
					<h3 className="wizard__question">{stepConfig.question}</h3>
					{property_pdf_template && property_pdf_template.addressLineOne && <div className="pdf-wizard-page__listing-name"><i className="pe-7s-preferred-location"/> {property_pdf_template.addressLineOne}</div>}
				</div>
				<div className="wizard__answer-options-container">
					<div className="pdf-templates">
						{boxOptions.map(option => {
							const isSelected = templateOption.toLowerCase() === option.value;
							return (
								<a href="" className={Cx("pdf-templates__template-wrap", { 'selected' : isSelected})} onClick={(e)=>{ e.preventDefault(); this.onTemplateChange(option.value);}}>
									<div className="pdf-templates__template-wrap__img-wrap">
										{isSelected && <div className="image-selector__check-wrap flex flex-align-center flex-justify-center">
											<i className="pe-7s-tick"/>
										</div>}
										<img alt={l(option.label)} src={option.watermarkImage} />
									</div>
									<div className="pdf-templates__template-wrap__label">
										{l(option.label)}
									</div>
								</a>
							);
						})}
					</div>
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					backText={l('PREVIOUS')}
					currentActiveLoader={isNextClicked ? 'next' : ''}
					isNextDisabled={templateOption ? false : true}
					className="linear-navigation--light-theme"
					isSaveExitRequired={false}
					isNavigatingSaveExitRequired={false}
					onNext={this.onNextClick.bind(this)}
					isBackRequired={false}
				/>
			</div>
		);
	}

	onTemplateChange(value) {
		const templateObj = value.split('-');
		this.setState({
			type : templateObj[0],
			template : templateObj[1],
			templateOption : value
		});
	}

	static getNextStep(templateValue,options) {
		const template = _find(options, { value : templateValue });
		if(template) {
			return template.nextStep;
		}
		return 'heroimage';
	}

	onNextClick() {
		const { type, template, templateOption } = this.state;
		const nextStep = Template.getNextStep(templateOption.toLowerCase(),boxOptions);
		this.setState({
			isNextClicked : true
		}, ()=> {
			this.props.navigateNext(
				{
					type : type.toLowerCase(),
					template,
					templateOption : templateOption.toLowerCase(),
					actionType : 'RESPONSE_ADD_PROPERTY_PDF_TEMPLATE',
					endpoint: 'pdf.customization.post.pdftemplatedata',
					paramsPayload : {
						id : this.props.params.id,
						step : 'template'
					},
					dataPayload : {
						type : type.toUpperCase(),
						template
					},
					headersPayload : {
						token : this.props.location.query.token
					}
				},
				{
					step : nextStep,
					query : Object.assign({...this.props.location.query},{template : templateOption.toLowerCase()})
				}
			);
		})

	}
}

export default Template;

