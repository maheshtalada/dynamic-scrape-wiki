import React, {Component} from 'react';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import NoResults from '../../components/common/no-results/no-results-found';
import Actions from '../../components/profile/actions-component';
import { Link } from 'react-router';
import { formatDateUtil } from '../../utils/localeUtil';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import Cx from 'classnames';
import { propertysearch as shareOptions, shareViaEmailOptions } from 'assets/static/social-share-options.json';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { sprintf } from 'utils';
import { REQUEST_USER_SEARCHES, DELETE_SAVED_SEARCH } from '../../redux/actions/userprofile';

// keys of this config should match with lowercased version of action names we fetch in JSON
const ACTIONS_CONFIG = {
	'rename' : {
		'label' : 'RENAME',
		'icon' : 'note',
		'callback' : 'renameSearch'
	},
	'remove' : {
		'label' : 'DELETE',
		'icon' : 'trash',
		'callback' : 'deleteItem'
	},
	'search' : {
		'label' : 'VIEW',
		'icon' : 'look',
		'link' : true
	}
};

const COLUMN_HEADERS = {
	'name' : {
		label : 'NAME',
		class : 'search-name'
	},
	'savedDate' : {
		label : 'SAVEDON',
		class : 'saved-date'
	},
	'actions' : {
		label : 'ACTIONS',
		class : 'actions'
	}
};

const MAIN_ACTIONS = ['SEARCH','REMOVE'];
const MORE_ACTIONS = [];

class SearchesComponent extends MyPagesBaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			searches: [],
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.PAGINATE_PATH_LINK = '/profile/searches';
		this.DELETE_ITEM_ACTION = DELETE_SAVED_SEARCH;
	}

	componentWillReceiveProps(props) {
		const { userSearches } = props;
		this.setState({
			searches: userSearches && userSearches.data,
			isFetching: userSearches && userSearches.isFetching,
			currentPage: userSearches && userSearches.currentPage
		});
	}

	renderCustomDataGridRow(dataItem,index,headers) {
		const { country, i18n : {l} } = this.context;
		const viewUri = this.getViewUri(dataItem.actions,'SEARCH');
		const mainActions = this.getActions(dataItem.actions,MAIN_ACTIONS);
		const moreActions = this.getActions(dataItem.actions,MORE_ACTIONS);
		const { name, dateCreated } = dataItem;
		const { user, location, screenSize, dispatch } = this.props;
		return (
			<ul className="data-grid__data-rows__row__data-list">
				<li className={Cx(this.itemClasses,"search-name")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.name.label)}</div>}
					<div className={this.itemValueClass}>
						<Link to={viewUri} target="_blank"> {name} </Link>
					</div>
				</li>
				<li className={Cx(this.itemClasses,"searched-on")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.savedDate.label)}</div>}
					<div className={this.itemValueClass}>
						{formatDateUtil(dateCreated,country,"DD/MM/YYYY")}
					</div>
				</li>
				<li className={Cx(this.itemClasses,"actions-wrapper")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.actions.label)}</div>}
					<div className={Cx("flex flex-align-center",this.itemValueClass)}>
						<SocialShare
							context="My Search"
							emailOptions={{
								shareType : "SEARCH_LINK",
								title : sprintf(shareViaEmailOptions.search.title,`| ${name}`),
								description : shareViaEmailOptions.search.description,
								link : getAbsoluteUrl(viewUri)
							}}
							location={location}
							user={user}
							shareUrl={getAbsoluteUrl(viewUri)}
							title = {sprintf(shareViaEmailOptions.search.title,`| ${name}`)}
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
		const { isFetching, searches, currentPage} = this.state;
		const { userSearches } = this.props;
		const totalpage = userSearches && userSearches.totalpage;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__searches-wrapper">
					<div className="profile-page__layout__profile-section__searches-wrapper__header">
						<h1 className="profile-page__layout__profile-section__searches-wrapper__title">
							{l('MYSEARCHES')}
						</h1>
					</div>
					{isFetching ? <Loader/> :
					searches && searches.length > 0 && <ColumnDataGrid
						data = {searches}
						isPaginationRequired = {true}
						renderDataItem = {this.renderDataItem}
						renderCustomDataGridRow = {this.renderCustomDataGridRow}
						handlePageClick = {this.handlePageClick}
						pageCount = {totalpage}
						currentPage = {currentPage}
						headers = {COLUMN_HEADERS}
					/>}
					{ (!searches || (searches && searches.length === 0)) && isFetching === false &&
					<NoResults l={l} title="YOUHAVENOSEARCHESTITLE" message="YOUHAVENOSEARCHESMESSAGE"/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userSearches: userprofile.user_searches,
		deleteSearch: userprofile.delete_saved_search
	};
};
export default connect(mapStateToProps)(connectDataFetchers(SearchesComponent, [
	REQUEST_USER_SEARCHES
],true));
