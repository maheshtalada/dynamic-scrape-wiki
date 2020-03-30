import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { find as _find, filter as _filter, findIndex as _findIndex} from 'lodash';
import { localeCurrency } from '../../utils/localeUtil';

class MyPagesBaseComponent extends Component {

	static propTypes = {
		dispatch: PropTypes.func
	};

	static contextTypes = {
		i18n : PropTypes.object,
		router: PropTypes.object,
		awsImagePath: PropTypes.string,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	static getPriceInfo(item,country,l) {
		return item.price ?
			localeCurrency(item.price.toFixed(2),'','',country) :
			item.rpsf ? `${localeCurrency(item.rpsf.toFixed(2),'','',country)} ${l('PERSQUAREFEET')}` : ''
	}

	constructor(props) {
		super(props);
		const { screenSize } = props;
		this.handleDataGridAction = this.handleDataGridAction.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.itemClasses = screenSize > 2 ? 'data-grid__data-rows__row__data-list__item data-grid__data-item-block' : 'data-grid__data-rows__row__data-list__data-item-with-header';
		this.showHeader = screenSize <= 2;
		this.itemValueClass = this.showHeader ? 'data-grid__data-rows__row__data-list__data-item-with-header__value' : '';
	}

	handleDataGridAction(info,actionCallback) {
		if(typeof this[actionCallback] === 'function') {
			this[actionCallback](info);
		} else {
			return;
		}
	}

	handlePageClick({selected}) {
		this.setState({
			currentPage : selected,
			isFetching : true
		});
		this.context.router.push({
			pathname : this.PAGINATE_PATH_LINK,
			query: {
				'page' : selected
			}
		});
	}

	getViewUri(actions,name) {
		const viewAction = _find(actions,action => action.name === name);
		return viewAction ? viewAction.uri : '';
	}

	getActions(actions,actionsConfig) {
		const filteredActions = _filter(actions,action => !!action.flag);
		return _filter(filteredActions,action => actionsConfig.indexOf(action.name) >= 0);
	}

	deleteItem(info) {
		this.props.dispatch(this.DELETE_ITEM_ACTION({
			id : info.id,
			page : this.props.location.query.page || 1
		}));
	}

	checkIfActionValid(actions,actionName) {
		if(_findIndex(actions,{
			flag : true,
			name : actionName
		}) >= 0) {
			return true;
		}
		return false;
	}

}

export default MyPagesBaseComponent;
