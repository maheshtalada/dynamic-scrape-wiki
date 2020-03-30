import React, {Component} from 'react';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import NoResults from '../../components/common/no-results/no-results-found';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import Actions from '../../components/profile/actions-component';
import { formatDateUtil } from '../../utils/localeUtil';
import { formatArea } from '../../utils/searchUtil';
import { Link } from 'react-router';
import Cx from 'classnames';
import { propertysearch as shareOptions } from 'assets/static/social-share-options.json';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { getAbsoluteUrl } from 'utils/urlUtil';
import ShareViaEmail from 'components/share-via-email';
import { getImagePath } from 'utils/propertyUtil';
import { DELETE_WISHLIST_ITEM, REQUEST_USER_WISHLIST } from '../../redux/actions/userprofile';

// keys of this config should match with lowercased version of action names we fetch in JSON
const ACTIONS_CONFIG = {
	'remove' : {
		'label' : 'REMOVEFROMWISHLIST',
		'icon' : 'trash',
		'callback' : 'deleteItem'
	},
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
		'link' : true
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
	'actions' : {
		label : 'ACTIONS',
		class : 'actions'
	}
};

const MAIN_ACTIONS = ['REMOVE'];
const MORE_ACTIONS = [];

class WishlistComponent extends MyPagesBaseComponent {

	static defaultProps = {
		userWishlist : {}
	};

	constructor(props) {
		super(props);
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.state = {
			wishlist: [],
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.PAGINATE_PATH_LINK = '/profile/wishlist';
		this.DELETE_ITEM_ACTION = DELETE_WISHLIST_ITEM;
	}

	componentWillReceiveProps(props) {
		const { userWishlist } = props;
		this.setState({
			wishlist: userWishlist && userWishlist.data,
			isFetching: userWishlist && userWishlist.isFetching,
			currentPage: userWishlist && userWishlist.currentPage
		});
	}

	renderCustomDataGridRow(dataItem,index,headers) {
		const { l } = this.context.i18n;
		const { country, awsImagePath } = this.context;
		const viewUri = this.getViewUri(dataItem.actions,'VIEW');
		const mainActions = this.getActions(dataItem.actions,MAIN_ACTIONS);
		const moreActions = this.getActions(dataItem.actions,MORE_ACTIONS);
		const priceInfo = MyPagesBaseComponent.getPriceInfo(dataItem,country,l);
		const listingArea = formatArea(dataItem.area,l,country,dataItem.areauom);
		const { user, location, screenSize, dispatch } = this.props;
		const isListingLive = this.checkIfActionValid(dataItem.actions,'REMOVE');
		const shareImagePath = dataItem.image && getImagePath(awsImagePath,dataItem.image);
		return (
			<ul className="data-grid__data-rows__row__data-list">
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
				<li className={Cx(this.itemClasses,'date')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.postedDate.label)}</div>}
					<div className={this.itemValueClass}>
						{formatDateUtil(dataItem.postedDate,country,"DD/MM/YYYY")}
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
								imagePath = {shareImagePath}
								screenSize = {screenSize}
								dispatch = {dispatch}
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
		const { isFetching, wishlist, currentPage} = this.state;
		const { totalpage } = this.props.userWishlist;
		const { user, location, screenSize, dispatch } = this.props;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__listings-wrapper">
					<div className="profile-page__layout__profile-section__listings-wrapper__header">
						<h1 className="profile-page__layout__profile-section__listings-wrapper__title">
							{l('MYWISHLIST')}
						</h1>
						<ShareViaEmail btnClass="btn btn-default btn-sm profile-page__layout__profile-section__wishlist__share-btn" emailOptions={{ shareType : 'WISHLIST' }} location={location} user={user}>
							<i className="pe-7s-email"/>
							{l('SHARE')}
						</ShareViaEmail>
					</div>
					{isFetching ? <Loader/> :
					wishlist && wishlist.length > 0 && <ColumnDataGrid
						data = {wishlist}
						isPaginationRequired = {true}
						renderDataItem = {this.renderDataItem}
						renderCustomDataGridRow = {this.renderCustomDataGridRow}
						handlePageClick = {this.handlePageClick}
						pageCount = {totalpage}
						currentPage = {currentPage}
						headers = {COLUMN_HEADERS}
					/>}
					{ ((wishlist && wishlist.length === 0) || !wishlist) && isFetching === false &&
					<NoResults l={l} title="YOUHAVENOWISHLISTTITLE" message="YOUHAVENOWISHLISTMESSAGE"/>
					}
				</div>
			</div>
		);
	}

	deleteItem(info) {
		this.props.dispatch(this.DELETE_ITEM_ACTION({
			propertyid : info.id,
			page : this.props.location.query.page || 1
		}));
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userWishlist: userprofile.user_wishlist,
		deleteWishlistItem: userprofile.delete_wishlist_item
	};
};
export default connect(mapStateToProps)(connectDataFetchers(WishlistComponent, [
	REQUEST_USER_WISHLIST
],true));
