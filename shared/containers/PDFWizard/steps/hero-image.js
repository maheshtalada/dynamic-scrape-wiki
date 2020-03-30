import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import ImageSelector from 'components/image-selector/ImageSelector';
import Spinner from 'components/common/spinner/spinner';

class HeroImage extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedImage : props.property_pdf_template.images &&  props.property_pdf_template.images.filter( img => img.primary)[0]
		};
		this.onImageSelect = this.onImageSelect.bind(this);
	}


	componentWillReceiveProps(props) {
		if(!this.state.isNextClicked) {
			this.setState({
				images : props.property_pdf_template.images ,
				selectedImage :props.property_pdf_template.images &&  props.property_pdf_template.images.filter( img => img.primary)[0],
				isFetching : false
			});
		}
	}

	onImageSelect(image,isSelected) {
		if(isSelected) {
			this.setState({
				selectedImage : {}
			});
		} else {
			this.setState({
				selectedImage : image
			});
		}
	}

	render() {
		const { i18n : {l}} = this.context;
		const { selectedImage, images=[], isFetching, isNextClicked= '' } = this.state;
		const { stepConfig, property_pdf_template } = this.props;
		return (
			<div className="hero-image-step wizard__step-container">
				<div className="flex flex-justify-between wizard__question-wrapper">
					<h3 className="wizard__question">{stepConfig.question}</h3>
					{property_pdf_template && property_pdf_template.addressLineOne && <div className="pdf-wizard-page__listing-name"><i className="pe-7s-preferred-location"/> {property_pdf_template.addressLineOne}</div>}
				</div>
				<div className="wizard__answer-options-container">
					{ isFetching && <Spinner /> }
					{ property_pdf_template && property_pdf_template.images && <ImageSelector images={property_pdf_template.images} selected={[selectedImage]} onSelect={this.onImageSelect}/>}
					{ isFetching === false && property_pdf_template && property_pdf_template.images === 0 && <div className="no-images-found">
						{l('PDFNOIMAGESTOCHOOSE')}
					</div>
					}
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					backText={l('PREVIOUS')}
					isNextDisabled={selectedImage ? false : images.length === 0 ? false : true}
					currentActiveLoader={isNextClicked ? 'next' : ''}
					className="linear-navigation--light-theme"
					isSaveExitRequired={false}
					isNavigatingSaveExitRequired={false}
					onNext={this.onNextClick.bind(this)}
					onBack={this.onBackClick.bind(this)}
				/>
			</div>
		);
	}

	onNextClick() {
		const { selectedImage } = this.state;
		const { stepConfig } = this.props;
		this.setState({
			isNextClicked : true
		}, ()=> {
			this.props.navigateNext(
				{
					actionType : 'RESPONSE_ADD_PROPERTY_PDF_TEMPLATE',
					endpoint: 'pdf.customization.post.pdftemplatedata',
					paramsPayload : {
						id : this.props.params.id,
						step : 'heroimage'
					},
					dataPayload : selectedImage,
					headersPayload : {
						token : this.props.location.query.token
					}
				},
				{
					step : stepConfig.next,
					query : this.props.location.query
				}
			);
		})

	}

	onBackClick() {
		const { stepConfig } = this.props;
		this.props.navigatePrevious({
			step : stepConfig.prev,
			query : this.props.location.query
		});
	}
}

export default HeroImage;
