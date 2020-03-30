import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { Schema } from '../schema';
import { isEmpty, values, cloneDeep, sortBy, extend } from 'lodash';
import Advertisement from '../advertisement/advertisement';
import { createarticle, adbackground, adlogo } from '../../assets/static/ads-component-config.json';
import Loader from '../common/page-loader/loader';
import {modal} from 'react-redux-modal';
import ArticleTags from './article-tags';
import LinearNavigation from '../common/linear-navigation/linear-navigation';
import { REQUEST_ADD_ARTICLE_SCHEMA } from '../../redux/actions/schema'
import ScrollFixed from 'components/common/scroll-fixed/scroll-fixed';
import ExternalAdvertisement from 'components/advertisement/external-advertisement';

class ArticleComponent extends Component {

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object,
		country : PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			hasErrors: false,
			forceValidation: false,
			modifiedValues: {},
			initialValues: {},
			isFetching: false,
			savingArticle: false
		};
		this.openArticleTagsModal = this.openArticleTagsModal.bind(this);
		this.onCloseTagsModal = this.onCloseTagsModal.bind(this);
		this.isTagsModalOpened = false;
	}

	componentWillReceiveProps(props) {
		const { schema_get_article,schema_save_article } = props;
		this.setState({
			isFetching: schema_get_article && schema_get_article.isFetching,
			savingArticle: schema_save_article && schema_save_article.isFetching,
			savedArticleUrl: schema_save_article && schema_save_article.articleurl
		});
		if(schema_save_article && schema_save_article.status === 'success' && !this.isTagsModalOpened) {
			this.openArticleTagsModal(schema_save_article.articleid);
		}
	}

	onCloseTagsModal() {
		console.log('onCLose article');
		const { savedArticleUrl } = this.state;
		this.context.router.push({
			pathname : savedArticleUrl
		});
	}

	render() {
		const { l } = this.context.i18n;
		const { isFetching, savingArticle } = this.state;
		return (
			<div className="schema-listing-page article-page flex">
				{(isFetching || savingArticle) &&
				<Loader/>}
				<div className="article-page__left">
					<div className="schema-border article-page__title" data-automation-selector="ssj-section-header-content">
						<h1 className="subheader-heading" data-automation-selector="ssj-section-title">{l('CREATEARTICLETITLE')}</h1>
					</div>
					{ this.renderSchema()}
					{/*<button className="btn btn-primary" onClick={()=>this.onSubmit()}>{l('SAVE')}</button>*/}
					<LinearNavigation
						nextText="PUBLISH"
						backText="SAVEASDRAFT"
						nextCaret={false}
						backCaret={false}
						className="linear-navigation--light-theme"
						onNext={()=>this.onSubmit('publish')}
						onBack={()=>this.onSubmit('draft')}
					/>
				</div>
				<div className="article-page__right hidden-sm hidden-xs">
					<ScrollFixed scrollPosition={0} top={65}>
						<Advertisement
							logo
							l={l}
						/>
						<ExternalAdvertisement dispatch={this.props.dispatch}/>
					</ScrollFixed>
				</div>

			</div>
		);

	}

	renderSchema() {
		const { i18n, country } = this.context;
		const { schema_get_article } = this.props;
		if (isEmpty(schema_get_article)) {
			return null;
		}
		let expressList = schema_get_article.schemas,
			schemaInfo = schema_get_article.schemaInfos,
			referenceData = schema_get_article.referenceData,
			listSchema = sortBy(values(expressList), (o)=> {
				return o.order;
			});
		// console.log(schema_get_financial.schemas);

		return listSchema.map((schemaData, index) => {
			return (
				<div id={`schema_${index}`}>
					<Schema
						l={i18n.l}
						country = {country}
						ref={`schema_${index}`}
						data={schemaData}
						writeMode={true}
						onChange={this.onSchemaChange.bind(this)}
						modifiedValues={this.state.modifiedValues}
						initialValues={this.state.initialValues}
						referenceData={referenceData}
					/>
				</div>
			);
		});

	}

	openArticleTagsModal(articleId) {
		const { l } = this.context.i18n;
		this.isTagsModalOpened = true;
		modal.add(ArticleTags,{
			title: l('ARTICLETAGS'),
			size: 'article-tags',
			articleId,
			dispatch: this.props.dispatch,
			onCloseModal: this.onCloseTagsModal,
			redirectToPdp: true
		});
	}

	onSchemaChange(changeObject, hasErrors) {
		const schema_get_article = this.props;
		this.setState({
			changeObject,
			hasErrors
		});
		let schemaLength = values(schema_get_article.schemas).length;

		if (!isEmpty(this.refs)) {
			for (let i = 0; i < schemaLength; ++i) {
				this.refs[`schema_${i}`] && this.refs[`schema_${i}`].rebuild();
			}
		}
	}

	onSubmit(status) {
		let schemasAreValid = true,
			schemaLength = values(this.props.schema_get_article.schemas).length,
			schemaGroups = [];


		for (let i = 0; i < schemaLength; ++i) {
			if (!this.refs[`schema_${i}`].checkSubmissionValid()) {
				schemaGroups.push(`schema_${i}`);
				schemasAreValid = false;
			}
		}
		if (schemasAreValid) {
			this.isTagsModalOpened = false;
			this.props.dispatch(REQUEST_ADD_ARTICLE_SCHEMA({
				dataPayload : extend({},this.state.initialValues,this.state.modifiedValues),
				paramsPayload : { status }
			}));
		}


	}

}

export default ArticleComponent;



