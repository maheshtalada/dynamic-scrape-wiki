import React from 'react';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import NoResults from '../../components/common/no-results/no-results-found';
import { formatDateUtil, localeCurrency } from '../../utils/localeUtil';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import Cx from 'classnames';
import { REQUEST_USER_PAYMENTS } from '../../redux/actions/userprofile';

// keys of this config should match with lowercased version of action names we fetch in JSON

const COLUMN_HEADERS = {
	'id' : {
		label : 'ID',
		class : 'id'
	},
	'context' : {
		label : 'PAYMENTCONTEXT',
		class : 'payment-context'
    },
    'amount' : {
        label : 'AMOUNT',
        class : 'amount'
    },
    'paymentDate' : {
        label : 'PAYMENTDATE',
        class : 'payment-date'
    }
};

class PaymentsComponent extends MyPagesBaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			payments: [],
			currentPage: (props.location.query && props.location.query.page) || 1
		};
		this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.PAGINATE_PATH_LINK = '/profile/payments';
	}

	componentWillReceiveProps(props) {
		const { userPayments } = props;
		this.setState({
			payments: userPayments && userPayments.data,
			isFetching: userPayments && userPayments.isFetching,
			currentPage: userPayments && userPayments.currentPage
		});
	}

	renderCustomDataGridRow(dataItem,index,headers) {
		const { country, i18n : {l} } = this.context;
		const { id, paymentContext, paymentAmount, paymentTime } = dataItem;
		const { user, location, screenSize, dispatch } = this.props;
		return (
			<ul className="data-grid__data-rows__row__data-list">
				<li className={Cx(this.itemClasses,"id")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.id.label)}</div>}
					<div className={this.itemValueClass}>
						{id}
					</div>
				</li>
				<li className={Cx(this.itemClasses,"context")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.context.label)}</div>}
					<div className={this.itemValueClass}>
						{l(paymentContext)}
					</div>
				</li>
                <li className={Cx(this.itemClasses,"payment-amount")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.amount.label)}</div>}
					<div className={this.itemValueClass}>
						{localeCurrency(paymentAmount.toFixed(2),'','',country)}
					</div>
				</li>
                <li className={Cx(this.itemClasses,"payment-date")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.paymentDate.label)}</div>}
					<div className={this.itemValueClass}>
						{formatDateUtil(paymentTime,country)}
					</div>
				</li>
			</ul>
		);
	}

	render() {
		const { l } = this.context.i18n;
		const { isFetching, payments, currentPage} = this.state;
		const { userPayments } = this.props;
		const totalpage = userPayments && userPayments.totalpage;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__payments-wrapper">
					<div className="profile-page__layout__profile-section__payments-wrapper__header">
						<h1 className="profile-page__layout__profile-section__payments-wrapper__title">
							{l('MYPAYMENTS')}
						</h1>
					</div>
					{isFetching ? <Loader/> :
					payments && payments.length > 0 && <ColumnDataGrid
						data = {payments}
						isPaginationRequired = {true}
						renderDataItem = {this.renderDataItem}
						renderCustomDataGridRow = {this.renderCustomDataGridRow}
						handlePageClick = {this.handlePageClick}
						pageCount = {totalpage}
						currentPage = {currentPage}
						headers = {COLUMN_HEADERS}
					/>}
					{ (!payments || (payments && payments.length === 0)) && isFetching === false &&
					<NoResults l={l} title="YOUHAVENOPAYMENTSTITLE" message="YOUHAVENOPAYMENTSMESSAGE"/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userPayments: userprofile.user_payments
	};
};
export default connect(mapStateToProps)(connectDataFetchers(PaymentsComponent, [
	REQUEST_USER_PAYMENTS
],true));
