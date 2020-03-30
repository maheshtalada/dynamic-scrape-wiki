import React , { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import LinearNavigation from 'components/common/linear-navigation/linear-navigation';
import Input from 'components/common/input/input';
import uniqueFormId from 'utils/uniqueFormId.js';
import Spinner from 'components/common/spinner/spinner';

class Highlights extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
        super(props);
        this.state = {};
        this.onAddHighlight = this.onAddHighlight.bind(this);
    }

	componentWillReceiveProps(props) {
		if(!this.state.isNextClicked) {
			this.setState({
				highlights: props.property_pdf_template.highlights || (props.property_pdf_template.highlights ? Highlights.formatHighlights(props.property_pdf_template.highlights) : []),
				isFetching: props.property_pdf_template.highlights && true
			});
		}
    }
    
	onHighlightChange(highlight,value) {
        this.setState({
            highlights : {...this.state.highlights, [highlight] : value}
        });
    }
    
    onAddHighlight() {
        const { highlights } = this.state;
        this.setState({
            highlights : {...highlights, [`highlight(${uniqueFormId()})`] : ''}
        });
    }

    onRemoveHighlight(highlight) {
		const { highlights } = this.state;
        let modifiedHighlights = Object.assign({},highlights);
        delete modifiedHighlights[highlight];
        this.setState({
            highlights : modifiedHighlights
        });
    }

	render() {
		const { i18n : {l}, screenSize} = this.context;
		const { highlights, isFetching, isNextClicked='' } = this.state;
		const { stepConfig, property_pdf_template } = this.props;
		return (
			<div className="highlights-step wizard__step-container">
                <div className="flex flex-justify-between wizard__question-wrapper">
				    <h3 className="wizard__question">{stepConfig.question}</h3>
                    {property_pdf_template && property_pdf_template.addressLineOne && <div className="pdf-wizard-page__listing-name"><i className="pe-7s-preferred-location"/> {property_pdf_template.addressLineOne}</div>}
                </div>
                { highlights && <div className="wizard__answer-options-container">
					<div className="highlights-wrap">
                        {Object.keys(highlights).map((key,index) => {
                            return (
                                <div className="highlights-wrap__highlight flex flex-align-center">
                                    <Input
										inputType={ screenSize > 2 ? 'text' : 'textarea'}
                                        key={key}
                                        ref="placeInput"
                                        placeholder={l('HIGHLIGHTS')}
                                        onChange={(value) => this.onHighlightChange(key,value)}
                                        value={highlights[key]}
                                        classes="quick-search-input">
                                    </Input>
                                    <button className="btn" onClick={()=> { this.onRemoveHighlight(key); }}>
                                        <i className="pe-7s-close-circle" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <button className="schema__clone__link button--text btn btn-default" onClick={this.onAddHighlight}>
                        <i className="pe-7s-plus2" />
                        {l('ADDHIGHLIGHTS')}
                    </button>
                </div> }
				<LinearNavigation
					nextText={l('NEXT')}
					backText={l('PREVIOUS')}
					className="linear-navigation--light-theme"
					currentActiveLoader={isNextClicked ? 'next' : ''}
					isSaveExitRequired={false}
					isNavigatingSaveExitRequired={false}
					onNext={this.onNextClick.bind(this)}
					onBack={this.onBackClick.bind(this)}
				/>
			</div>
		);
    }
    
    static formatHighlights(highlights=[]) {
        let highlightsObj = '';
        if(highlights.length) {
            highlightsObj = {
                'highlight(1)' : ''
            };
            highlights.map((highlight,index) => {
                highlightsObj[`highlight(${index+1})`] = highlight;
            });
        }
        return highlightsObj;
    }

	onNextClick() {
        const { highlights } = this.state;
        const { stepConfig } = this.props;
		this.setState({
			isNextClicked : true
		},()=> {
			this.props.navigateNext(
				{
					actionType : 'RESPONSE_ADD_PROPERTY_PDF_TEMPLATE',
					endpoint: 'pdf.customization.post.pdftemplatedata',
					paramsPayload : {
						id : this.props.params.id,
						step : 'highlight'
					},
					dataPayload : {
						highlights : Object.values(highlights)
					},
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

export default Highlights;
