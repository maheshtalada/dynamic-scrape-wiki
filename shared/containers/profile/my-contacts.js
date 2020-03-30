import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/common/page-loader/loader';
import NoResults from '../../components/common/no-results/no-results-found';
import ContactCard from '../../components/profile/contact-card';
import Paginate from '../../components/pagination';
import Snackbar from '../../components/common/snackbar/snackbar';
import AddNewContact from '../../components/add-to-my-contacts';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import GoogleContacts from 'components/google-contacts/google-contacts';
import { REQUEST_USER_NOTIFICATIONS } from '../../redux/actions/userprofile';

class MyContacts extends MyPagesBaseComponent {

	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
			currentPage: (props.location.query && props.location.query.page) || 1,
			isShowEmailSentNotification: false
		};
		this.onEmailSent = this.onEmailSent.bind(this);
		this.onHideEmailNotif = this.onHideEmailNotif.bind(this);
		this.onAddNewContact = this.onAddNewContact.bind(this);
		this.PAGINATE_PATH_LINK = '/profile/mycontacts';
	}

	componentWillReceiveProps(props) {
		this.setState({
			notifications: props.userNotifications.data,
			isFetching: props.userNotifications.isFetching,
			currentPage: props.userNotifications && props.userNotifications.currentPage
		});
	}

	onEmailSent() {
		this.setState({
			isShowEmailSentNotification : true
		});
	}

	onHideEmailNotif() {
		this.setState({
			isShowEmailSentNotification : false
		});
	}

	onAddNewContact(contactInfo) {
		this.props.dispatch(REQUEST_USER_NOTIFICATIONS({}))
	}

	renderPagination() {
		const { totalpage } = this.props.userNotifications;
		const { currentPage } = this.state;
		return (
			<Paginate previousLabel={'previous'}
					  forcePage={currentPage-1}
					  nextLabel={'next'}
					  breakLabel={<a href="">...</a>}
					  breakClassName={'break-me'}
					  pageCount={totalpage}
					  marginPagesDisplayed={2}
					  pageRangeDisplayed={5}
					  onPageChange={this.handlePageClick}
					  containerClassName={'pagination'}
					  subContainerClassName={'pages pagination'}
					  hidePageNumbers={this.props.screenSize === 1}
					  activeClassName={'active'}
			/>
		);
	}

	render() {
		const { l } = this.context.i18n;
		const { notifications, isFetching, isShowEmailSentNotification } = this.state;
		return (
			<div className="profile-page__layout__profile-section">
				<div className="profile-page__layout__profile-section__notifications-wrapper">
					<div className="profile-page__layout__profile-section__notifications-wrapper__header">
						<h1 className="profile-page__layout__profile-section__notifications-wrapper__title">
							{l('MYCONTACTS')}
						</h1>
						<div className="flex flex-align-center">
							<AddNewContact user={this.props.user}
								location={this.props.location}
								dispatch={this.props.dispatch}
								btnClass="btn-primary btn"
								onAddSuccess={this.onAddNewContact}/>
							<GoogleContacts onImportSuccess={this.onAddNewContact}/>
						</div>
					</div>
					<Snackbar active={isShowEmailSentNotification} onTimeout={this.onHideEmailNotif}>
						{l('EMAILSENT')}
					</Snackbar>
					{ isFetching ? <Loader/> :
						notifications && notifications.length > 0 &&
						<div>
							<div className="profile-page__layout__profile-section__notifications-wrapper__contacts-info-wrap">
								{notifications.map(notification => {
									return (
										<ContactCard onEmailSent={this.onEmailSent}
													 contactInfo={notification} {...this.props}/>
									);
								})}
							</div>
							{this.renderPagination()}
						</div>
					}
					{!notifications && isFetching === false &&
						<NoResults l={l} title="YOUHAVENONOTIFTITLE" message="YOUHAVENONOTIFMESSAGE"/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ userprofile }) => {
	return {
		userNotifications : userprofile.user_notifications
	};
};

export default connect(mapStateToProps)(connectDataFetchers(MyContacts, [
	REQUEST_USER_NOTIFICATIONS
],true));
