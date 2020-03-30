import React from 'react';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import Loader from '../../components/common/page-loader/loader';
import ColumnDataGrid from '../../components/common/data-grid/column-data-grid';
import { formatDateUtil } from '../../utils/localeUtil';
import NoResults from '../../components/common/no-results/no-results-found';
import Actions from '../../components/profile/actions-component';
import Cx from 'classnames';
import { modal } from 'react-redux-modal';
import { phoneNumberFormat } from 'utils/String';
import TenantApplicationDetails from 'containers/TenantApplication/tenant-application-details';
import TenantApplicationReview from 'containers/TenantApplication/application-review';
import { REQUEST_USER_APPLICATIONS } from '../../redux/actions/userprofile';

// keys of this config should match with lowercased version of action names we fetch in JSON
const TENANT_ACTIONS_CONFIG = {
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
        'callback' : 'applicationView'
	},
	'edit' : {
		'label' : 'EDIT',
		'icon' : 'note',
		'link' : true,
		'isOpenSameTab' : true
	}
};

const PROPERTY_ACTIONS_CONFIG = {
	'view' : {
		'label' : 'VIEW',
		'icon' : 'look',
        'callback' : 'applicationView'
    },
    'review' : {
        'label' : 'REVIEW',
        'icon' : 'note',
        'callback' : 'tenantApplicationReview'
    }
};

const TENANT_COLUMN_HEADERS = {
	'id' : {
		label : 'ID',
		class : 'id'
    },
    'propertyAddress' : {
		label : 'ADDRESS',
		class : 'title'
	},
    'appliedDate' : {
		label : 'APPLIEDDATE',
		class : 'date'
	},
	'status' : {
		label : 'STATUS',
		class : 'status'
	},
	'comments' : {
		label : 'COMMENTS',
		class : 'comments'
	},
	'actions' : {
		label : 'ACTIONS',
		class : 'actions'
	}
};

const PROPERTY_COLUMN_HEADERS = {
	'id' : {
		label : 'ID',
		class : 'id'
    },
    'propertyAddress' : {
		label : 'ADDRESS',
		class : 'title'
	},
	'dateSubmitted' : {
		label : 'DATESUBMITTED',
		class : 'date'
	},
	'tenantName' : {
		label : 'TENANTNAME',
		class : 'tenant-name'
	},
	'mobileNumber' : {
		label : 'MOBILENUMBER',
		class : 'mobile-number'
	},
    'status' : {
		label : 'STATUS',
		class : 'status'
	},
	'comments' : {
		label : 'COMMENTS',
		class : 'comments'
	},
	'actions' : {
		label : 'ACTIONS',
		class : 'actions'
	}
};

const TENANT_MAIN_ACTIONS = ['VIEW','EDIT'];
const TENANT_MORE_ACTIONS = [];
const PROPERTY_MAIN_ACTIONS = ['APPROVE','REJECT','REVIEW','VIEW','SENDEMAIL'];
const PROPERTY_MORE_ACTIONS = [];

class ApplicationsComponent extends MyPagesBaseComponent {

	static defaultProps = {
		userApplications : {}
	};

	constructor(props) {
		super(props);
        this.renderTenantApplication = this.renderTenantApplication.bind(this);
        this.renderPropertyApplication = this.renderPropertyApplication.bind(this);
		this.state = {
            myTenantApplications: [],
            myPropertyApplications : [],
            isFetching : true,
			currentPage: (props.location.query && props.location.query.page) || 1
		};
    }

	componentWillReceiveProps(props) {
		this.setState({
            myTenantApplications: props.userApplications.myTenantApplications,
            myPropertyApplications : props.userApplications.myPropertyApplications,
			isFetching: props.userApplications && props.userApplications.isFetching,
			currentPage: props.userApplications && props.userApplications.currentPage
		});
	}
    
    renderPropertyApplication(dataItem,index,headers) {
        const { l } = this.context.i18n;
        const { country } = this.context;
        const actions = [
            {
                name : 'VIEW',
                flag : ( dataItem.applicationStatus === 'APPROVED' || dataItem.applicationStatus === 'REJECTED' ) ? true : false
            },
            {
                name : 'REVIEW',
                flag : dataItem.applicationStatus === 'PENDING_REVIEW' ? true : false
            }
        ];
        const mainActions = this.getActions(actions,PROPERTY_MAIN_ACTIONS);
		const moreActions = this.getActions(actions,PROPERTY_MORE_ACTIONS);
		const mobileNumber = dataItem.rentalTenant && phoneNumberFormat(dataItem.rentalTenant.mobileNumber,'MOBILE',country);
		return (
			<ul className="data-grid__data-rows__row__data-list">
				<li className={Cx(this.itemClasses,"id")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.id.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.id)}>{l(dataItem.id)}</span>
				</li>
				<li className={Cx(this.itemClasses,"property-name")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.propertyAddress.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={dataItem.propertyAddress}>
                        {actions[0].flag ? <a href="javascript:void(0)" onClick={()=>{this.applicationView(dataItem);}} target="_blank">
							{dataItem.propertyAddress}
						</a> : 
							dataItem.propertyAddress
						}
					</span>
				</li>
				<li className={Cx(this.itemClasses,'date')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.dateSubmitted.label)}</div>}
					{dataItem.creationDate && <div className={this.itemValueClass}>
						{formatDateUtil(dataItem.creationDate,country)}
					</div>}
				</li>
				{dataItem.rentalTenant && <li className={Cx(this.itemClasses,'tenant-name')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.tenantName.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.rentalTenant.name)}>{l(dataItem.rentalTenant.name)}</span>
				</li>}
				{mobileNumber && <li className={Cx(this.itemClasses,'mobile-number')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.mobileNumber.label)}</div>}
					<a href={`tel:${mobileNumber}`} className={Cx(this.itemValueClass,"slice-off")} title={mobileNumber}>{mobileNumber}</a>
				</li>}
				<li className={Cx(this.itemClasses,'status')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.status.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.applicationStatus)}>{l(dataItem.applicationStatus)}</span>
				</li>
				<li className={Cx(this.itemClasses,'comments')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.comments.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.approvalComments)}>{l(dataItem.approvalComments)}</span>
				</li>
				<li className={Cx(this.itemClasses,"actions-wrapper")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.actions.label)}</div>}
					<div className={Cx("flex flex-align-center",this.itemValueClass)}>
						<Actions
                            mainActions = {mainActions}
                            moreActions = {moreActions}
                            handleActionClick = {this.handleDataGridAction}
							actionsConfig = {PROPERTY_ACTIONS_CONFIG}
							data = {dataItem}
							itemIndex = {index}
						/>
					</div>
				</li>
			</ul>
		);
    }

	renderTenantApplication(dataItem,index,headers) {
		const { l } = this.context.i18n;
        const { country } = this.context;
        const actions = [
            {
                name : 'VIEW',
                flag : dataItem.applicationStatus ? true : false,
                uri : `/profile/tenant-application/confirm/${dataItem.id}?listingid=${dataItem.listingId}`
            },
            {
                name : 'EDIT',
                flag : ( dataItem.applicationStatus === 'PENDING_REVIEW' || dataItem.applicationStatus === 'APPROVED' || dataItem.applicationStatus === 'REJECTED' ) ? false : true,
                uri : `/profile/tenant-application/start/${dataItem.id}?listingid=${dataItem.listingId}`
            }
        ];
        const mainActions = this.getActions(actions,TENANT_MAIN_ACTIONS);
        const moreActions = this.getActions(actions,TENANT_MORE_ACTIONS);
		return (
			<ul className="data-grid__data-rows__row__data-list">
				<li className={Cx(this.itemClasses,"id")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.id.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.id)}>{l(dataItem.id)}</span>
				</li>
				<li className={Cx(this.itemClasses,"property-name")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.propertyAddress.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={dataItem.propertyAddress}>
                        {actions[0].flag ? <a href="javascript:void(0)" onClick={()=>{this.applicationView(dataItem);}} target="_blank">
							{dataItem.propertyAddress}
                        </a> : dataItem.propertyAddress}
					</span>
				</li>
				<li className={Cx(this.itemClasses,'date')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.appliedDate.label)}</div>}
					{dataItem.creationDate && <div className={this.itemValueClass}>
						{formatDateUtil(dataItem.creationDate,country)}
					</div>}
				</li>
				<li className={Cx(this.itemClasses,'status')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.status.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.applicationStatus)}>{l(dataItem.applicationStatus)}</span>
				</li>
				<li className={Cx(this.itemClasses,'comments')}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.comments.label)}</div>}
					<span className={Cx(this.itemValueClass,"slice-off")} title={l(dataItem.approvalComments)}>{l(dataItem.approvalComments)}</span>
				</li>
				<li className={Cx(this.itemClasses,"actions-wrapper")}>
					{this.showHeader && <div className="data-grid__data-rows__row__data-list__data-item-with-header__header">{l(headers.actions.label)}</div>}
					<div className={Cx("flex flex-align-center",this.itemValueClass)}>
						<Actions
                            mainActions = {mainActions}
                            moreActions = {moreActions}
                            handleActionClick = {this.handleDataGridAction}
							actionsConfig = {TENANT_ACTIONS_CONFIG}
							data = {dataItem}
							itemIndex = {index}
						/>
					</div>
				</li>
			</ul>
		);
    }
    
    applicationView(dataItem) {
        modal.add(TenantApplicationDetails,{
            size : 'custom',
            title : dataItem.propertyAddress || '',
            listingId : dataItem.listingId,
            id : dataItem.id
        })
    }

    tenantApplicationReview(dataItem) {
        modal.add(TenantApplicationReview,{
            size : 'custom',
            title : dataItem.propertyAddress || '',
            listingId : dataItem.listingId,
            id : dataItem.id,
            dispatch : this.props.dispatch,
            onConfirmReview : this.onConfirmReview,
        })
    }

    onConfirmReview = (data) => {
        this.props.dispatch(REQUEST_USER_APPLICATIONS({}));
    }

	render() {
		const { l } = this.context.i18n;
		const { isFetching, listings, currentPage, myTenantApplications, myPropertyApplications } = this.state;
        const { screenSize } = this.props;
        if(isFetching) {
            return <Loader />;
        }
		return (
			<div className="profile-page__layout__profile-section">
				{myTenantApplications && myTenantApplications.length > 0 && <div className="profile-page__layout__profile-section__applications-wrapper">
                    <div className="profile-page__layout__profile-section__applications-wrapper__header">
                        <h1 className="profile-page__layout__profile-section__applications-wrapper__title">
                            {l('MYRENTALAPPLICATIONS')}
                        </h1>
                    </div>
                    <ColumnDataGrid
                        data = {myTenantApplications}
                        isPaginationRequired = {false}
                        renderDataItem = {this.renderDataItem}
                        renderCustomDataGridRow = {this.renderTenantApplication}
                        handlePageClick = {this.handlePageClick}
                        pageCount = {myTenantApplications.totalpage}
                        currentPage = {currentPage}
                        headers = {TENANT_COLUMN_HEADERS}
                    />
				</div>}
                {myPropertyApplications && myPropertyApplications.length > 0 && <div className="profile-page__layout__profile-section__applications-wrapper">
                    <div className="profile-page__layout__profile-section__applications-wrapper__header">
                        <h1 className="profile-page__layout__profile-section__applications-wrapper__title">
                            {l('MYPROPERTYAPPLICATIONS')}
                        </h1>
                    </div>
                    <ColumnDataGrid
                        data = {myPropertyApplications}
                        isPaginationRequired = {false}
                        renderDataItem = {this.renderDataItem}
                        renderCustomDataGridRow = {this.renderPropertyApplication}
                        handlePageClick = {this.handlePageClick}
                        pageCount = {myPropertyApplications.totalpage}
                        currentPage = {currentPage}
                        headers = {PROPERTY_COLUMN_HEADERS}
                    />
				</div>}
                { !myPropertyApplications && !myTenantApplications && isFetching === false &&
                    <div className="profile-page__layout__profile-section__applications-wrapper">
                        <h1 className="profile-page__layout__profile-section__applications-wrapper__title">
                            {l('MYRENTALAPPLICATIONS')}
                        </h1>
					    <NoResults l={l} title="YOUHAVENORENTALAPPLICATIONS" message="YOUHAVENORENTALAPPLICATIONSMESSAGE"/>
                    </div>
                }
			</div>
		);
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		userApplications: userprofile.user_applications
	};
};
export default connect(mapStateToProps)(connectDataFetchers(ApplicationsComponent, [
	REQUEST_USER_APPLICATIONS
],true));
