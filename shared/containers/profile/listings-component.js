import React, {Component} from 'react';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import appConstants from '../../utils/app-constants';
import { formatDateUtil } from '../../utils/localeUtil';
import { formatArea } from '../../utils/searchUtil';
import Spinner from '../../components/common/spinner/spinner';
import NoResults from '../../components/common/no-results/no-results-found';
import Actions from '../../components/profile/actions-component';
import { Button } from '../../components/common/button';
import { Link } from 'react-router';
import Cx from 'classnames';
import { propertysearch as shareOptions, shareViaEmailOptions } from 'assets/static/social-share-options.json';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { getImagePath } from 'utils/propertyUtil';
import { DELETE_USER_LISTING, REQUEST_REMOVE_USER_LISTING, REQUEST_USER_LISTING } from '../../redux/actions/userprofile';
import SiteConfig from '../../config';

const { pdfServer } = SiteConfig;

// keys of this config should match with lowercased version of action names we fetch in JSON
const ACTIONS_CONFIG = {
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
		'link' : true
	},
	'remove' : {
		'label' : 'REMOVE',
		'icon' : 'ticket',
		'callback' : 'removeListing'
	},
	'scheduleopenhouse' : {
		'label' : 'SCHEDULEOPENHOUSE',
		'icon' : 'ribbon',
		'link' : true,
		'isOpenSameTab' : true,
		'path' : appConstants.LISTING_ADDITIONAL_INFO_LINK
	},
	'edit' : {
		'label' : 'EDIT',
		'icon' : 'note',
		'link' : true,
		'isOpenSameTab' : true,
		'path' : appConstants.EDIT_LISTING_LINK
	},
	'delete' : {
		'label' : 'DELETE',
		'icon' : 'trash',
		'callback' : 'deleteItem'
	},
	'generatereport': {
		'label' : 'GENERATEREPORT',
		'icon' : 'download',
		'link': true,
		'path' : `${pdfServer.path}${appConstants.GENERATE_REPORT_LINK}`
	},
	'generateflyer' : {
		'label' : 'GENERATEFLYER',
		'icon' : 'bookmark-2',
		'link': true,
		'isOpenSameTab' : true,
		'path' : appConstants.GENERATE_FLYER_LINK
	}
};

const COLUMN_HEADERS = {
	'category' : {
		label : 'CATEGORY',
		class : 'sub-type'
	},
	'propertyAddress' : {
		label : 'ADDRESS',
		class : 'title'
	},
	'listingType' : {
		label : 'TYPE',
		class : 'listing-type'
	},
	'area' : {
		label : 'AREA',
		class : 'area'
	},
	'price' : {
		label : 'PRICE',
		class : 'price'
	},
	'postedDate' : {
		label : 'POSTEDON',
		class : 'date'
	},
	'status' : {
		label : 'STATUS',
		class : 'status'
	},
	'completion' : {
		label : 'PERCENTAGEOFCOMPLETION',
		class : 'completion'
	},
	'actions' : {
		label : 'ACTIONS',
		class : 'actions'
	}
};

const MAIN_ACTIONS = ['EDIT','GENERATEFLYER'];
const MORE_ACTIONS = ['VIEW','EDIT','GENERATEFLYER','GENERATEREPORT','SCHEDULEOPENHOUSE','REMOVE','DELETE'];
const CREATE_LISTING_ROUTE = '/profile/location/property-listing';

class ListingsComponent extends MyPagesBaseComponent {

	static defaultProps = {
		userListings : {}
	};

	constructor(props) {
		super(props);
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.state = {
			listings: [],
			updatingListing: false,
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.PAGINATE_PATH_LINK = '/profile/listings';
		this.DELETE_ITEM_ACTION = DELETE_USER_LISTING;
	}

	componentWillReceiveProps(props) {
		this.setState({
			listings: props.userListings.data,
			isFetching: props.userListings && props.userListings.isFetching,
			currentPage: props.userListings && props.userListings.currentPage,
			listingUpdating: props.listingUpdated && props.listingUpdated.updatingid,
			listingUpdated: props.listingUpdated && props.listingUpdated.updatedid,
			listingUpdateError: props.listingUpdated && props.listingUpdated.error
		});
	}

	removeListing(info) {
		this.props.dispatch(REQUEST_REMOVE_USER_LISTING({
			data : {
				'status' : 'CLOSED'
			},
			paramData : {
				'listingid' : info.id
			},
			page : this.props.location.query.page || 1
		}));
	}

	renderCustomDataGridRow(dataItem,index,headers) {
		const { l } = this.context.i18n;
		const { awsImagePath,country } = this.context;
		const { listingUpdating, listingUpdated, listingUpdateError } = this.state;
		const { propertyName, propertyAddress } = dataItem;
		const viewUri = this.getViewUri(dataItem.actions,'VIEW');
		const mainActions = this.getActions(dataItem.actions,MAIN_ACTIONS);
		const moreActions = this.getActions(dataItem.actions,MORE_ACTIONS);
		let modifiedPropertyName = '';
		const listingArea = dataItem.area && formatArea(dataItem.area,l,country,dataItem.areauom);
		if(propertyAddress) {
			modifiedPropertyName = propertyAddress.startsWith(propertyName) ? propertyAddress : propertyName + ' - ' + propertyAddress;
		} else {
			modifiedPropertyName = dataItem.propertyName;
		}
		const priceInfo = MyPagesBaseComponent.getPriceInfo(dataItem,country,l);
		const { user, location, screenSize, dispatch } = this.props;
		const isListingLive = this.checkIfActionValid(dataItem.actions,'REMOVE');
		const shareImagePath = dataItem.image && getImagePath(awsImagePath,dataItem.image);
		return (
			<ul className="data-grid__data-rows__row__data-list">
				{listingUpdated === dataItem.id && !listingUpdateError &&
				<div className="update-msg-success">
					<span>{l('LISTINGUPDATED')}</span>
				</div>
				}
				{listingUpdated === dataItem.id && listingUpdateError &&
				<div className="update-msg-fail error-box">
					<span>{l('LISTINGUPDATEFAILED')}</span>
				</div>
				}
				{listingUpdating === dataItem.id &&
				<Spinner/>
				}
				<li className={this.itemClasses}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.category.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.propertySubtype)}>{l(dataItem.propertySubtype)}</span>
				</li>
				<li className={Cx(this.itemClasses,"property-name")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.propertyAddress.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={dataItem.propertyAddress}>
						<Link to={viewUri} target="_blank">
							{dataItem.propertyAddress}
						</Link>
					</span>
				</li>
				<li className={this.itemClasses}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.listingType.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.listingType)}>{l(dataItem.listingType)}</span>
				</li>
				<li className={Cx(this.itemClasses,'area')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.area.label)}</div>}
					{listingArea && <span className={Cx(this.itemValueClass,"slice-off")} title={`${listingArea.formattedValue} ${listingArea.uom}`}>
						{`${listingArea.formattedValue} ${listingArea.uom}`}
					</span>}
				</li>
				<li className={this.itemClasses}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.price.label)}</div>}
					{ priceInfo && <span className={Cx(this.itemValueClass,"slice-off")} title={priceInfo}>
						{priceInfo}
					</span> }
				</li>
				<li className={this.itemClasses}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.postedDate.label)}</div>}
					<div className={this.itemValueClass}>
						{formatDateUtil(dataItem.postedDate,country,"DD/MM/YYYY")}
					</div>
				</li>
				<li className={Cx(this.itemClasses,'status')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.status.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.status)}>{l(dataItem.status)}</span>
				</li>
				<li className={this.itemClasses}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.completion.label)}</div>}
					<div className={this.itemValueClass}>
						{dataItem.completionPercentage && `${Math.round(dataItem.completionPercentage)}%`}
					</div>
				</li>
				<li className={Cx(this.itemClasses,"actions-wrapper")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.actions.label)}</div>}
					<div className={Cx("flex flex-align-center",this.itemValueClass)}>
						{isListingLive &&
							<SocialShare
								context="My Listing"
								emailOptions={{
									shareType : 'PROPERTYLISTING'
								}}
								location={location}
								user={user}
								shareUrl={getAbsoluteUrl(viewUri)}
								title = {dataItem.propertyAddress}
								listingId={dataItem.id}
								options = {shareOptions}
								screenSize = {screenSize}
								dispatch = {dispatch}
								imagePath = {shareImagePath}
								iconOnly
							/>
						}
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

	render() {
		const { l } = this.context.i18n;
		const { isFetching, listings, currentPage } = this.state;
		const { totalpage } = this.props.userListings;
		const { screenSize } = this.props;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__listings-wrapper">
					<div className="profile-page__layout__profile-section__listings-wrapper__header">
						<h1 className="profile-page__layout__profile-section__listings-wrapper__title">
							{l('MYLISTINGS')}
						</h1>
						{screenSize >= 3 && <a href={CREATE_LISTING_ROUTE} target="_blank">
							<Button btnClassName="btn-primary"><i className="pe-7s-plus"/>{l('CREATELISTING')}</Button>
						</a>}
					</div>
					{isFetching ? <Loader/> :
					listings && listings.length > 0 && <ColumnDataGrid
						data = {listings}
						isPaginationRequired = {true}
						renderDataItem = {this.renderDataItem}
						renderCustomDataGridRow = {this.renderCustomDataGridRow}
						handlePageClick = {this.handlePageClick}
						pageCount = {totalpage}
						currentPage = {currentPage}
						headers = {COLUMN_HEADERS}
					/>}
					{ !listings && isFetching === false &&
					<NoResults l={l} title="YOUHAVENOLISTINGSTITLE" message="YOUHAVENOLISTINGSMESSAGE"/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userListings: userprofile.user_listing,
		listingUpdated: userprofile.listing_updated
	};
};
export default connect(mapStateToProps)(connectDataFetchers(ListingsComponent, [
	REQUEST_USER_LISTING
],true));
