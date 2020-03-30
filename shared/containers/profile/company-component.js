import React, {Component} from 'react';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import { REQUEST_USER_COMPANY } from '../../redux/actions/userprofile';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import appConstants from '../../utils/app-constants';
import NoResults from '../../components/common/no-results/no-results-found';
import Actions from '../../components/profile/actions-component';
import { Button } from '../../components/common/button';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';

// keys of this config should match with lowercased version of action names we fetch in JSON
const ACTIONS_CONFIG = {
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
		'callback' : 'viewCompany',
		'link' : true
	},
	'edit' : {
		'label' : 'EDIT',
		'icon' : 'note',
		'callback' : 'editCompany',
		'link' : true,
		'path' : appConstants.EDIT_COMPANY_LINK
	}
};

const COLUMN_HEADERS = {
	'name' : {
		label : 'NAME',
		class : 'company-name'
	},
	'areasServed' : {
		label : 'AREASSERVED',
		class : 'company-areas'
	},
	'specialties' : {
		label : 'SPECIALTIES',
		class : 'company-specialties'
	},
	'actions' : {
		label : 'ACTIONS',
		class : 'company-actions'
	}
};

const MAIN_ACTIONS = [];
const MORE_ACTIONS = ['VIEW','EDIT'];
const REGISTER_COMPANY_ROUTE = '/register-company';

class CompanyComponent extends MyPagesBaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			companies: [],
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.PAGINATE_PATH_LINK = '/profile/company';
	}

	componentWillReceiveProps(props) {
		const { userCompany } = props;
		this.setState({
			companies: userCompany && userCompany.company && userCompany.company.data,
			isFetching: userCompany && userCompany.isFetching,
			currentPage: userCompany && userCompany.currentPage
		});
	}

	renderCustomDataGridRow(dataItem,index) {
		const mainActions = this.getActions(dataItem.actions,MAIN_ACTIONS);
		const moreActions = this.getActions(dataItem.actions,MORE_ACTIONS);
		const { name, areasServed, specialties } = dataItem;
		return (
			<ul className="data-grid__data-rows__row__data-list">
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block company-name">
					{name}
				</li>
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block company-areas">
					{areasServed && areasServed.length > 0 && areasServed.join(', ')}
				</li>
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block company-specialties">
					{specialties && specialties.length > 0 && this.renderSpecialties(specialties)}
				</li>
				<li className="data-grid__data-rows__row__data-list__item data-grid__data-item-block actions-wrapper">
					<Actions
						mainActions = {mainActions}
						moreActions = {moreActions}
						handleActionClick = {this.handleDataGridAction}
						actionsConfig = {ACTIONS_CONFIG}
						data = {dataItem}
						itemIndex = {index}
					/>
				</li>
			</ul>
		);
	}

	renderSpecialties(specialties) {
		const { l } = this.context.i18n;
		return specialties.map(specialty => l(specialty)).join(', ');
	}

	render() {
		const { l } = this.context.i18n;
		const { isFetching, companies, currentPage} = this.state;
		const { userCompany } = this.props;
		const totalpage = userCompany && userCompany.company && userCompany.company.totalpage;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__companies-wrapper">
					<div className="profile-page__layout__profile-section__companies-wrapper__header">
						<h1 className="profile-page__layout__profile-section__companies-wrapper__title">
							{l('MYCOMPANY')}
						</h1>
						<a href={REGISTER_COMPANY_ROUTE} target="_blank">
							<Button btnClassName="btn-primary"><i className="pe-7s-plus"/>{l('REGISTERCOMPANY')}</Button>
						</a>
					</div>
					{isFetching ? <Loader/> :
					companies && companies.length > 0 && <ColumnDataGrid
						data = {companies}
						isPaginationRequired = {true}
						renderDataItem = {this.renderDataItem}
						renderCustomDataGridRow = {this.renderCustomDataGridRow}
						handlePageClick = {this.handlePageClick}
						pageCount = {totalpage}
						currentPage = {currentPage}
						headers = {COLUMN_HEADERS}
					/>}
					{ !companies && isFetching === false &&
					<NoResults l={l} title="YOUHAVENOCOMPANIESTITLE" message="YOUHAVENOCOMPANIESMESSAGE"/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userCompany: userprofile.user_company
	};
};
export default connect(mapStateToProps)(connectDataFetchers(CompanyComponent, [
	REQUEST_USER_COMPANY
],true));
