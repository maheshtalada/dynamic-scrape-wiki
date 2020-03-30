import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components/common/button';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { isEmpty as _isEmpty } from 'lodash';
import LoginBarrier from '../../lib/LoginBarrier';
import Loader from '../common/page-loader/loader';
import Snackbar from '../common/snackbar/snackbar';
import Cx from 'classnames';
import MobileOverlay from '../common/mobile-overlay/mobile-overlay';
import { SAVE_PROPERTY_SEARCH } from '../../redux/actions/search';
import { REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL } from '../../redux/actions/application';

const STEP_AFTER_LOGIN = 'enableSaveSearch';

const isModalOpen = className => document.querySelector(".rrm-holder");
class SaveSearch extends LoginBarrier {

	static propTypes = {
		searchName : PropTypes.string,
		uri : PropTypes.string,
		dispatch : PropTypes.func
	};

	static contextTypes = {
		i18n : PropTypes.object,
		location : PropTypes.string,
		screenSize : PropTypes.number
	};

	constructor(props,context) {
		super(props);
		this.state = {
			showSearchName : false,
			searchName : '',
			isShowSaveSearchNotif : false
		};
		this.onClickSaveSearch = this.onClickSaveSearch.bind(this);
		this.onChangeSearchName = this.onChangeSearchName.bind(this);
		this.saveSearch = this.saveSearch.bind(this);
		this.handleBodyClick = this.handleBodyClick.bind(this);
		this.hideSavedSearchNotif = this.hideSavedSearchNotif.bind(this);
	}

	componentDidMount() {
		window.addEventListener('click', this.handleBodyClick);
	}

	componentWillReceiveProps(props) {
		if(props) {
			console.log(props);
			const { savePropertySearch } = props;
			const { stepAfterLogin } = this.state;
			if(!_isEmpty(savePropertySearch)) {
				this.setState({
					saveStatus : savePropertySearch.status,
					isSaving : savePropertySearch.isSaving,
					isShowSaveSearchNotif : savePropertySearch.status === 'success'
				});
			}
			if(props.user && props.user.user.isLogIn) {
				this[stepAfterLogin] && this[stepAfterLogin]();
			}
		}
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
	}

	updateLoginRedirectUrl() {
		const { pathname, search } = window.location;
		this.props.dispatch(REQUEST_SAVE_REGISTER_LOGIN_REDIRECT_URL({'registerLogin' : `${pathname}${search}`}));
	}

	onClickSaveSearch() {
		const { user } = this.props;
		const { l } = this.context.i18n;
		if (user && user.user && user.user.isLogIn) {
			this.enableSaveSearch();
		} else {
			this.setState({
				stepAfterLogin : STEP_AFTER_LOGIN
			},()=>{
				this.redirectToLogin('Log In');
			});
		}
	}

	enableSaveSearch() {
		this.setState({
			showSearchName : !this.state.showSearchName,
			stepAfterLogin : null
		});
	}


	onChangeSearchName(evt) {
		this.setState({
			searchName : evt.target.value,
			showError : false
		});
	}

	hideSavedSearchNotif() {
		this.setState({
			isShowSaveSearchNotif : false,
			forceCloseNotif : true
		});
	}

	renderSearchNameBox() {
		const { l } = this.context.i18n;
		const { searchName, showError  } = this.state;
		return (
			<div className={Cx("save-search__save-name",{'show-error' : showError})}>
				<input value={searchName} autoFocus={true} className="name-input" placeholder={l('PROVIDESEARCHNAME')} onChange={this.onChangeSearchName}/>
				<Button btnClassName="btn-primary" onClick={this.saveSearch} data-tag-category="Search Toolbar" data-tag-action="Save Click" data-tag-label="Save">{l('SAVE')}</Button>
			</div>
		)
	}

	render() {
		const { l } = this.context.i18n;
		const { showSearchName, isSaving, isShowSaveSearchNotif, forceCloseNotif  } = this.state;
		const { screenSize } = this.context;
		return (
			<div className={Cx("save-search",this.props.className)}>
				<button title={l('SAVESEARCH')} onClick={this.onClickSaveSearch} data-tag-category="Search Toolbar" data-tag-action="Save Search Click" data-tag-label="Save Search" className={`btn btn-sm btn-default flex flex-align-center save-search__save-btn ${isSaving ? 'saving' : ''}`}>
					<i className="pe-7s-diskette"/>
					<span>{screenSize === 1 ? l('SAVE') : l('SAVESEARCH')}</span>
				</button>
				{isSaving && <Loader/>}
				<Snackbar active={forceCloseNotif ? false : isShowSaveSearchNotif} action={<i className="pe-7s-close-3"/>} timeout={3000} onActionClick={this.hideSavedSearchNotif} onTimeout={this.hideSavedSearchNotif}>
					{l('SAVED')}
				</Snackbar>
				{showSearchName && (screenSize <= 2 ? <MobileOverlay onCloseOverlay={()=>{
					this.setState({
						showSearchName : false
					});
				}}>
					{this.renderSearchNameBox()}
				</MobileOverlay> : this.renderSearchNameBox())
				}
			</div>
		);
	}

	saveSearch() {
		const { searchName } = this.state;
		const { pathname, search, query } = this.props.location;
		const purchaseType = this.props.purchaseType;
		let uri = `${pathname}${search}`;
		if(this.props.searchType !== 'for-rent' && purchaseType) {
			uri = `${pathname}${query.purchasetype ? search.replace(`purchasetype=${query.purchasetype}`,`purchasetype=${purchaseType}`) : search ? `${search}&purchasetype=${purchaseType}` : `?purchasetype=${purchaseType}`}`;
		}
		if(!searchName) {
			this.setState({
				showError : true
			});
			return;
		}
		this.setState({
			showSearchName : false,
			forceCloseNotif : false
		},()=>{
			this.props.dispatch(SAVE_PROPERTY_SEARCH({
				name : searchName,
				uri
			}));
		})
	}

	handleBodyClick(evt) {
		if(!findDOMNode(this).contains(evt.target) && !isModalOpen()) {
			this.setState({
				showSearchName : false
			});
		}
	}
}

const mapStateToProps = ({ search }) => {
	return {
		savePropertySearch : search.save_property_search
	};
};

export default connect(mapStateToProps)(SaveSearch);
