import React from 'react';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import MyPagesBaseComponent from 'components/profile/mypages-base-component';
import Loader from 'components/common/page-loader/loader';
import ColumnDataGrid from 'components/common/data-grid/column-data-grid';
import appConstants from 'utils/app-constants';
import Actions from 'components/profile/actions-component';
import Cx from 'classnames';
import Spinner from 'components/common/spinner/spinner';
import { sprintf } from 'utils';
import { modal } from 'react-redux-modal';
import ConfirmModal from 'components/common/confirm-modal/confirm-modal';
import PortfolioPropertyView from 'components/portfolio/portfolio-property-view';
import PortfolioGraphs from 'components/portfolio/portfolio-graphs';
import Snackbar from 'components/common/snackbar/snackbar';
import MobileFooterOptions from 'components/common/mobile-footer-options/mobile-footer-options';
import { Link } from 'react-router';
import PortfolioNoResults from 'components/portfolio/portfolio-no-results';
import { REQUEST_REMOVE_USER_PROPERTY, REQUEST_USER_PROPERTIES } from '../../redux/actions/userprofile';
import loadable from '@loadable/component';

const PortfolioTemplateImport = loadable(() => import(/* webpackChunkName: 'PortfolioTemplateImport' */'components/property-template-import/portfolio-template-import'),{ LoadingComponent: Loader});
// keys of this config should match with lowercased version of action names we fetch in JSON
const ACTIONS_CONFIG = {
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
		'callback' : 'viewSummary'
	},
	'edit' : {
		'label' : 'EDIT',
		'icon' : 'note',
		'link' : true,
		'isOpenSameTab' : true,
		'path' : appConstants.EDIT_MY_PROPERTY_LINK
	},
	'remove' : {
		'label' : 'DELETE',
		'icon' : 'trash',
		'callback' : 'removeProperty'
	}
};

const COLUMN_HEADERS = {
	'propertyAddress' : {
		label : 'PROPERTY',
		class : 'property-name'
	},
	'actions' : {
		label : 'ACTIONS',
		class : 'actions portfolio-actions'
	}
};

const MAIN_ACTIONS = ['EDIT','REMOVE'];
const MORE_ACTIONS = [];//['VIEW','EDIT','GENERATEFLYER','GENERATEREPORT','SCHEDULEOPENHOUSE','REMOVE','DELETE'];
const CREATE_PROPERTY_ROUTE = '/profile/create-property/details';
const REVIEW_PROPERTY_ROUTE = '/profile/create-property/review?id=%s';

class PortfolioComponent extends MyPagesBaseComponent {

	static defaultProps = {
		userProperties : {}
	};

	constructor(props) {
		super(props);
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.onAddImportModal = this.onAddImportModal.bind(this);
		this.state = {
			properties: [],
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.PAGINATE_PATH_LINK = '/profile/portfolio';
		this.DELETE_ITEM_ACTION = '';
		this.isFileDialogActive = false;
		this.propertyObject = {};
	}

	componentWillReceiveProps(props) {
		this.setState({
			properties: props.userProperties.myProperties && props.userProperties.myProperties.data,
			propertySummaryData : props.userProperties.myPropertyAnalyzeReturns,
			actionResponseId: props.userProperties && props.userProperties.actionResponseId,
			isFetching: props.userProperties && props.userProperties.isFetching,
			currentPage: props.userProperties && props.userProperties.currentPage,
			listingUpdating: props.removeProperty && props.removeProperty.updatingid,
			listingUpdated: props.removeProperty && props.removeProperty.updatedid,
			listingUpdateError: props.removeProperty && props.removeProperty.error
		});
	}

	removeProperty(info) {
		modal.add(ConfirmModal,{
			size : 'phone-view',
			className : 'make-offer-modal',
			message : 'DELETEPROPERTYCONFIRM',
			onAccept : () => {this.onRemoveConfirm(info)}
		});
	}

	onRemoveConfirm(info) {
		this.props.dispatch(REQUEST_REMOVE_USER_PROPERTY({
			paramData : {
				'id' : info.id
			},
			requestQuery : this.graphViewTabValue,
			page : this.props.location.query.page || 1
		}));
	}

	viewSummary(info) {
		modal.add(PortfolioPropertyView,{
			id : info.id,
			title : info.name,
			size : 'large',
			location: this.props.location,
			dispatch: this.props.dispatch
		});
	}

	onClickProperty(info) {
		this.viewSummary(info);
	}

	onChangeGraphView = (tab) => {
		this.graphViewTabValue = tab.value;
		this.props.dispatch(REQUEST_USER_PROPERTIES({
			actionResponseId : this.state.actionResponseId,
			query : tab.value
		}));
	}

	onTimespanChange = (timespan) => {
		this.props.dispatch(REQUEST_USER_PROPERTIES({
			actionResponseId : this.state.actionResponseId,
			query : {
				viewtype : 'monthly',
				startdate : timespan.startDate,
				enddate : timespan.endDate
			}
		}));
	}

	renderCustomDataGridRow(dataItem,index,headers) {
		const { l } = this.context.i18n;
		const { country } = this.context;
		const { listingUpdating, listingUpdated, listingUpdateError } = this.state;
		const isReviewValid = this.checkIfActionValid(dataItem.actions,'VIEW');
		const mainActions = this.getActions(dataItem.actions,MAIN_ACTIONS);
		const moreActions = this.getActions(dataItem.actions,MORE_ACTIONS);
		const priceInfo = MyPagesBaseComponent.getPriceInfo({price : dataItem.noi},country,l);
		const reviewPropertyRoute = isReviewValid && sprintf(REVIEW_PROPERTY_ROUTE,dataItem.id);
		return (
			<ul className="data-grid__data-rows__row__data-list">
				{listingUpdating === dataItem.id &&
					<Spinner/>
				}
				<li className={Cx(this.itemClasses,"portfolio-property-name")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.propertyAddress.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={dataItem.name}>
						{reviewPropertyRoute ? <a onClick={()=> {this.onClickProperty(dataItem)}} href="javascript:void(0)">
							{dataItem.name}
						</a> : dataItem.name}
					</span>
				</li>
				<li className={Cx(this.itemClasses,"actions-wrapper portfolio-actions")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.actions.label)}</div>}
					<div className={Cx("flex flex-align-center",this.itemValueClass)}>
						<Actions
							mainActions = {mainActions}
							moreActions = {moreActions}
							handleActionClick = {this.handleDataGridAction}
							actionsConfig = {ACTIONS_CONFIG}
							data = {dataItem}
							itemIndex = {index}
						/>
					</div>
				</li>
			</ul>
		);
	}

	renderData() {
		const { currentPage, properties, propertySummaryData, actionResponseId } = this.state;
		const { totalpage } = this.props.userProperties.myProperties || {};
		const { userProperties, location, user, dispatch, response_file_share_email } = this.props;
		return (
			<div className="portfolio-wrapper">
				<ColumnDataGrid
					data = {properties}
					isPaginationRequired = {true}
					renderDataItem = {this.renderDataItem}
					renderCustomDataGridRow = {this.renderCustomDataGridRow}
					handlePageClick = {this.handlePageClick}
					pageCount = {totalpage}
					currentPage = {currentPage}
					headers = {COLUMN_HEADERS}
				/>
				<PortfolioGraphs {...userProperties}
								response_file_share_email={response_file_share_email}
								location={location}
								user={user}
								dispatch={dispatch}
								actionResponseId={actionResponseId} 
								onTimespanChange={this.onTimespanChange} 
								onChangeGraphView={this.onChangeGraphView}/>
			</div>
		)
	}

	onAddImportModal() {
		const { l } = this.context.i18n;
		modal.add(PortfolioTemplateImport,{
			size : 'custom',
			analyticsCategory : 'Analyze Portfolio',
			title : l('IMPORTPROPERTIES'),
			dispatch : this.props.dispatch,
			successMsg : 'PROPERTIESIMPORTSUCCESS',
			successCallback :this.getProperties.bind(this)
		});
	}

	getProperties(successMsg) {
		this.props.dispatch(REQUEST_USER_PROPERTIES({
			query : this.graphViewTabValue
		}));
		this.setState({
			showAck : true,
			ackMsg : successMsg
		});
	}

	hideAck = () => {
		this.setState({
			showAck : false
		});
	}

	renderCreatePropertyOption() {
		const { l } = this.context.i18n;
		return (
			<Link to={CREATE_PROPERTY_ROUTE} className="btn btn-primary portfolio__create-property__btn">
				<i className="pe-7s-plus"/> <span>{l('CREATEAPROPERTY')}</span>
			</Link>
		);
	}

	renderImportOption() {
		const { l } = this.context.i18n;
		return (
			<button type="button" data-tag-category='Analyze Portfolio' data-tag-action='click' data-tag-label='Import Properties' className="btn btn-primary portfolio__import__btn" onClick={this.onAddImportModal}><i className="pe-7s-upload"/><span>{l('IMPORTPROPERTIES')}</span></button>
		)
	}

	mobileFooterOptions() {

		const mobileFooterOptions = [
			{
				"name" : "CREATEPROPERTY",
				"value" : "createproperty",
				"component" : this.renderCreatePropertyOption()
			},
			{
				"name" : "IMPORTDATA",
				"value" : "importdata",
				"component" : this.renderImportOption()
			}
		];
		return mobileFooterOptions;
	}


	render() {
		const { l } = this.context.i18n;
		const { isFetching, properties, ackMsg, showAck } = this.state;
		const { screenSize, user } = this.props;
		return (
			<div className="profile-page__layout__profile-section">
				<Snackbar active={showAck} timeout={1000} onTimeout={this.hideAck}>
					{ackMsg}
				</Snackbar>
				<div className="profile-page__layout__profile-section__portfolio-wrapper">
					<div className="profile-page__layout__profile-section__portfolio-wrapper__header">
						<h1 className="profile-page__layout__profile-section__portfolio-wrapper__title">
							{l('MYPORTFOLIO')}
						</h1>
						{screenSize > 1 && <div className="flex profile-page__layout__profile-section__portfolio-wrapper__header__btn-wrap">
							{this.renderCreatePropertyOption()}
							{this.renderImportOption()}
						</div>}
					</div>
					{isFetching && <Loader/> }
					{ properties && properties.length > 0 && this.renderData()}
					{ !properties && isFetching === false &&
						<PortfolioNoResults l={l} onClickImport={this.onAddImportModal} user={user}/>
					}
				</div>
				{screenSize <= 2 &&
					<MobileFooterOptions {...this.props} options={this.mobileFooterOptions()} />
				}
			</div>
		);
	}
}

const mapStateToProps = ({userprofile, application}) => {
	const { response_file_share_email = {} } = application;
	return {
		userProperties: userprofile.user_properties || {},
		removeProperty: userprofile.remove_property,
		response_file_share_email
	};
};
export default connect(mapStateToProps)(connectDataFetchers(PortfolioComponent, [
	REQUEST_USER_PROPERTIES
],true));
