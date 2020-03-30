import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faqData from '../assets/static/schema/frequently-asked-questions';
import { Schema } from '../components/schema';
import ScrollFixed from 'components/common/scroll-fixed/scroll-fixed';
import Footer from '../components/footer/footer';
import scrollToElement from 'utils/scrollToUtil';

const FAQ_SECTIONS = [
	{
		"label": "Glossary",
		"hash": "glossary"
	},
	{
		"label": "Analyze Markets",
		"hash": "analyzeMarkets"
	},
	{
		"label": "Search",
		"hash": "search"
	},
	{
		"label": "Calculating return on investment",
		"hash": "calculateReturnOnInvestment"
	},
	{
		"label": "Analyzing my portfolio",
		"hash": "analyzeMyPortfolio"
	},
	{
		"label": "PropsHub investment specialists",
		"hash": "investmentSpecialists"
	},
	{
		"label": "International investors",
		"hash": "internationalInvestors"
	},
	{
		"label": "Flyer generation",
		"hash": "flyerGeneration"
	},
	{
		"label": "Other",
		"hash": "other"
	}
];

export default class FAQPage extends Component {

	static contextTypes = {
		i18n : PropTypes.object,
		country : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		const sectionId = window.location.hash ? window.location.hash.replace('#','faq_') : '';
		if(sectionId) {
			//scrollToElement(`#${sectionId}`);
		}
	}

	onFaqSectionClick(sectionHash) {
		scrollToElement(`#faq_${sectionHash}`);
	}

	render() {
		const { i18n : {l}, country } = this.context;
		const { location } = this.props;
		return (
			<div className="faq-page">
				<section className="WordSection1">
					<div className="flex flex-align-start">
						<ScrollFixed scrollPosition={0} top={55}>
							<div className="faq-page__sections">
								<h1><b>PropsHub FAQ</b></h1>
								<ul>
									{FAQ_SECTIONS.map(section => {
										return (
											<li className={`#${section.hash}` === location.hash ? 'selected' : ''}>
												<a href={`#${section.hash.replace('faq_','')}`} onClick={() => {this.onFaqSectionClick(section.hash); }}>{section.label}</a>
											</li>
										);
									})}
								</ul>
								
							</div>
						</ScrollFixed>
						<div className="faq-page__schema">
							<Schema
								key={'faq-schema'}
								l={l}
								country = {country}
								ref={"faqSchema"}
								data={faqData.getSchema(l).schema.schemas[0]}
								writeMode={false}
								onChange={() => {}}
							/>
						</div>
					</div>
				</section>
				<Footer dispatch={this.props.dispatch}/>
			</div>
		)
	}
}
