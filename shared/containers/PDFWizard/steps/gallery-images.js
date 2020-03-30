import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import ImageSelector from 'components/image-selector/ImageSelector';
import Spinner from 'components/common/spinner/spinner';
import { sprintf } from 'utils';
import { REQUEST_PROPERTY_IMAGES } from '../../../redux/actions/properties';

class GalleryImages extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
       super(props);
       this.state = {};
       this.onImageSelect = this.onImageSelect.bind(this);
	}

	componentWillReceiveProps(props) {
		if(!this.state.isNextClicked) {
			this.setState({
				selectedImages : props.property_pdf_template.images && props.property_pdf_template.images.filter( img => img.selected),
				images : props.property_pdf_template && props.property_pdf_template.images && props.property_pdf_template.images.filter( img => img.selected),
				isFetching : false
			});
		}
	}


	onImageSelect(image,isSelected) {
        const { selectedImages } = this.state;
        const { stepConfig } = this.props;
		if(isSelected) {
			this.setState({
				selectedImages : selectedImages.filter(selected => selected.uri !== image.uri)
			});
		} else {
			this.setState({
				selectedImages : selectedImages.length === stepConfig.maxImages ? selectedImages : [...selectedImages,image]
			});
		}
	}

	render() {
		const { i18n : {l}} = this.context;
		const { value, selectedImages=[], images=[], isFetching, isNextClicked = '' } = this.state;
		const { stepConfig, property_pdf_template } = this.props;
		return (
			<div className="gallery-images-type-step wizard__step-container">
                <div className="flex flex-justify-between wizard__question-wrapper">
					<h3 className="wizard__question">{sprintf(stepConfig.question,stepConfig.maxImages)}
						<span className="selected-image-count">{`(${selectedImages.length}/${stepConfig.maxImages})`}</span>
					</h3>
					{property_pdf_template.addressLineOne && <div className="pdf-wizard-page__listing-name"><i className="pe-7s-preferred-location"/> {property_pdf_template.addressLineOne}</div>}
                </div>
				<div className="wizard__answer-options-container">
                    { isFetching && <Spinner /> }
					{ property_pdf_template && property_pdf_template.images && <ImageSelector images={property_pdf_template.images} selected={selectedImages} onSelect={this.onImageSelect}/>}
                    { isFetching === false && property_pdf_template && property_pdf_template.images === 0 && <div className="no-images-found">
                            {l('PDFNOIMAGESTOCHOOSE')}
                        </div>
                    }
				</div>
				<LinearNavigation
					nextText={l('NEXT')}
					backText={l('PREVIOUS')}
					className="linear-navigation--light-theme"
					currentActiveLoader={isNextClicked ? 'next' : ''}
					isNextDisabled={selectedImages.length ? false : true}
					isSaveExitRequired={false}
					isNavigatingSaveExitRequired={false}
					onNext={this.onNextClick.bind(this)}
					onBack={this.onBackClick.bind(this)}
				/>
			</div>
		);
	}

	onNextClick() {
        const { selectedImages } = this.state;
        const { stepConfig } = this.props;
        this.setState({
        	isNextClicked : true
		},()=>{
			this.props.navigateNext(
				{
					actionType : 'RESPONSE_ADD_PROPERTY_PDF_TEMPLATE',
					endpoint: 'pdf.customization.post.pdftemplatedata',
					paramsPayload : {
						id : this.props.params.id,
						step : 'thumbnail'
					},
					dataPayload : selectedImages,
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

export default GalleryImages;
