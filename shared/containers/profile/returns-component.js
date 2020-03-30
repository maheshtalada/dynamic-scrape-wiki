import React, {Component} from 'react';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import { formatDateUtil } from '../../utils/localeUtil';
import NoResults from '../../components/common/no-results/no-results-found';
import Actions from '../../components/profile/actions-component';
import { Link } from 'react-router';
import Cx from 'classnames';
import { propertydetails as shareOptions, shareViaEmailOptions } from 'assets/static/social-share-options.json';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { sprintf } from 'utils';
import { DELETE_SAVED_RETURN, REQUEST_USER_RETURNS } from '../../redux/actions/userprofile';

// keys of this config should match with lowercased version of action names we fetch in JSON
const ACTIONS_CONFIG = {
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
		'link' : true
	},
	'edit' : {
		'label' : 'EDIT',
		'icon' : 'note',
		'link' : true
	},
	'remove' : {
		'label' : 'DELETE',
		'icon' : 'trash',
		'callback' : 'deleteItem'
	}
};

const COLUMN_HEADERS = {
	'propertyAddress' : {
		label : 'ADDRESS',
		class : 'search-name'
	},
	'dateCreated' : {
		label : 'SAVEDON',
		class : 'date'
	},
	'actions' : {
		label : 'ACTIONS',
		class : 'actions'
	}
};

const MAIN_ACTIONS = ['VIEW','EDIT','REMOVE'];
const MORE_ACTIONS = [];

class ReturnsComponent extends MyPagesBaseComponent {

	static defaultProps = {
		userReturns : {}
	};

	constructor(props) {
		super(props);
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.state = {
			returns: [],
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.PAGINATE_PATH_LINK = '/profile/returns';
		this.DELETE_ITEM_ACTION = DELETE_SAVED_RETURN;
	}

	componentWillReceiveProps(props) {
		this.setState({
			returns: props.userReturns.data,
			isFetching: props.userReturns && props.userReturns.isFetching,
			currentPage: props.userReturns && props.userReturns.currentPage
		});
	}

	renderCustomDataGridRow(dataItem,index,headers) {
		const { country, i18n : {l} } = this.context;
		const viewUri = this.getViewUri(dataItem.actions,'VIEW');
		const mainActions = this.getActions(dataItem.actions,MAIN_ACTIONS);
		const moreActions = this.getActions(dataItem.actions,MORE_ACTIONS);
		const { propertyAddress, dateCreated } = dataItem;
		const { user, location, screenSize, dispatch } = this.props;
		return (
			<ul className="data-grid__data-rows__row__data-list">
				<li className={Cx(this.itemClasses,"search-name")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.propertyAddress.label)}</div>}
					<div className={this.itemValueClass}>
						<Link to={viewUri} target="_blank"> {propertyAddress} </Link>
					</div>
				</li>
				<li className={Cx(this.itemClasses,"searched-on")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.dateCreated.label)}</div>}
					<div className={this.itemValueClass}>
						{formatDateUtil(dateCreated,country,"DD/MM/YYYY")}
					</div>
				</li>
				<li className={Cx(this.itemClasses,"actions-wrapper")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.actions.label)}</div>}
					<div className={Cx("flex flex-align-center",this.itemValueClass)}>
						<SocialShare
							context="My Return"
							emailOptions={{
								shareType : "ANALYZE_RETURN_LINK",
								title : sprintf(shareViaEmailOptions.returns.title,propertyAddress),
								description : shareViaEmailOptions.returns.description,
								link : getAbsoluteUrl(viewUri)
							}}
							location={location}
							user={user}
							shareUrl={getAbsoluteUrl(viewUri)}
							title = {sprintf(shareViaEmailOptions.returns.title,propertyAddress)}
							options = {shareOptions}
							screenSize = {screenSize}
							dispatch = {dispatch}
							iconOnly
						/>
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
		const { isFetching, returns, currentPage } = this.state;
		const { totalpage } = this.props.userReturns;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__listings-wrapper">
					<div className="profile-page__layout__profile-section__listings-wrapper__header">
						<h1 className="profile-page__layout__profile-section__listings-wrapper__title">
							{l('MYRETURNS')}
						</h1>
					</div>
					{isFetching ? <Loader/> :
					returns && returns.length > 0 && <ColumnDataGrid
						data = {returns}
						isPaginationRequired = {true}
						renderDataItem = {this.renderDataItem}
						renderCustomDataGridRow = {this.renderCustomDataGridRow}
						handlePageClick = {this.handlePageClick}
						pageCount = {totalpage}
						currentPage = {currentPage}
						headers = {COLUMN_HEADERS}
					/>}
					{ !returns && isFetching === false &&
					<NoResults l={l} title="YOUHAVENORETURNSTITLE" message="YOUHAVENORETURNSMESSAGE"/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userReturns: userprofile.user_returns,
		deleteReturn: userprofile.delete_saved_return
	};
};
export default connect(mapStateToProps)(connectDataFetchers(ReturnsComponent, [
	REQUEST_USER_RETURNS
],true));
