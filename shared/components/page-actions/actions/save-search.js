import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/common/button';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import Loader from 'components/common/page-loader/loader';
import Snackbar from 'components/common/snackbar/snackbar';
import Cx from 'classnames';
import MobileOverlay from 'components/common/mobile-overlay/mobile-overlay';
import { isEmpty as _isEmpty } from 'lodash';
import { SAVE_PROPERTY_SEARCH } from '../../../redux/actions/search';

class SaveSearch extends Component {

	static propTypes = {
		searchName : PropTypes.string,
		uri : PropTypes.string,
		dispatch : PropTypes.func
	};

	static defaultProps = {
		searchType : 'for-sale'
	}

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
		this.onChangeSearchName = this.onChangeSearchName.bind(this);
		this.saveSearch = this.saveSearch.bind(this);
		this.hideSavedSearchNotif = this.hideSavedSearchNotif.bind(this);
	}

	componentWillReceiveProps(props) {
		if(props) {
			const { savePropertySearch } = props;
			if(!_isEmpty(savePropertySearch)) {
				this.setState({
					saveStatus : savePropertySearch.status,
					isSaving : savePropertySearch.isSaving,
					isShowSaveSearchNotif : savePropertySearch.status === 'success'
				});
			}
		}
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
		}, ()=> this.props.removeModal());
	}

	renderSearchNameBox() {
		const { l } = this.context.i18n;
		const { searchName, showError  } = this.state;
		return (
			<div className={Cx("save-search__save-name",{'show-error' : showError})}>
				<input value={searchName} autoFocus={true} className="name-input" placeholder={l('PROVIDESEARCHNAME')} onChange={this.onChangeSearchName}/>
				<Button btnClassName="btn-primary" onClick={this.saveSearch} data-tag-category="Search Toolbar" data-tag-action="Save Click" data-tag-label="Save">{l('SAVE')}</Button>
				<p className="save-search__prompt">You will receive email notifications when new properties matching your search criteria are found.</p>
			</div>
		)
	}

	render() {
		const { l } = this.context.i18n;
		const { isSaving, isShowSaveSearchNotif, forceCloseNotif  } = this.state;
		const { screenSize } = this.context;
		return (
			<div className={Cx("save-search",this.props.className)}>
				{isSaving && <Loader/>}
				<Snackbar active={forceCloseNotif ? false : isShowSaveSearchNotif} action={<i className="pe-7s-close-3"/>} timeout={2000} onActionClick={this.hideSavedSearchNotif} onTimeout={this.hideSavedSearchNotif}>
					{l('SAVED')}
				</Snackbar>
				{(screenSize <= 2 ? <MobileOverlay onCloseOverlay={this.props.removeModal}>
					{this.renderSearchNameBox()}
				</MobileOverlay> : this.renderSearchNameBox())
				}
			</div>
		);
	}

	saveSearch() {
		const { searchName } = this.state;
		const { pathname, search, query } = this.props.location;
		let uri = `${pathname}${search}`;

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

}

const mapStateToProps = ({ search }) => {
	return {
		savePropertySearch : search.save_property_search
	};
};

export default connect(mapStateToProps)(SaveSearch);
