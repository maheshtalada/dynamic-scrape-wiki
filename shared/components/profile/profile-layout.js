import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileSidebar from './profile-sidebar';
import ProfileEditSidebar from './profile-edit-sidebar';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import loadable from '@loadable/component';
import { profilePageLinks as PROFILE_EDIT_PAGE_LINKS } from 'assets/static/profile-page-edit-links.json';
import { profilePageLinks as PROFILE_PAGE_LINKS } from 'assets/static/profile-page-links.json';
import Loader from 'components/common/page-loader/loader';

const ListingsComponent = loadable(() => import(/* webpackChunkName: 'MyListingsComponent' */'../../containers/profile/listings-component'),{ LoadingComponent: Loader}),
ReturnsComponent = loadable(() => import(/* webpackChunkName: 'MyReturnsComponent' */'../../containers/profile/returns-component'),{ LoadingComponent: Loader}),
SearchesComponent = loadable(() => import(/* webpackChunkName: 'MySearchesComponent' */'../../containers/profile/searches-component'),{ LoadingComponent: Loader}),
CompanyComponent = loadable(() => import(/* webpackChunkName: 'MyCompanyComponent' */'../../containers/profile/company-component'),{ LoadingComponent: Loader}),
MyContacts = loadable(() => import(/* webpackChunkName: 'MyContacts' */'../../containers/profile/my-contacts'),{ LoadingComponent: Loader}),
ArticlesComponent = loadable(() => import(/* webpackChunkName: 'MyArticlesComponent' */'../../containers/profile/articles-component'),{ LoadingComponent: Loader}),
ChangePassword = loadable(() => import(/* webpackChunkName: 'ChangePassword' */'../../containers/profile/change-password-component'),{ LoadingComponent: Loader}),
PreferencesComponent = loadable(() => import(/* webpackChunkName: 'MyPreferencesComponent' */'../../containers/profile/preferences-component'),{ LoadingComponent: Loader}),
WishlistComponent = loadable(() => import(/* webpackChunkName: 'MyWishlistComponent' */'../../containers/profile/wishlist-component'),{ LoadingComponent: Loader}),
ProfileComponent = loadable(() => import(/* webpackChunkName: 'MyProfileComponent' */'../../containers/profile/profile-component'),{ LoadingComponent: Loader}),
PortfolioComponent = loadable(() => import(/* webpackChunkName: 'MyPortfolioComponent' */'../../containers/profile/portfolio-component'),{ LoadingComponent: Loader}),
PDFWizard =  loadable(() => import(/* webpackChunkName: 'FlyerComponent' */'../../containers/PDFWizard/PDFWizard'),{ LoadingComponent: Loader}),
CreateProperty =  loadable(() => import(/* webpackChunkName: 'CreatePropertyComponent' */'../../containers/CreateProperty/CreateProperty'),{ LoadingComponent: Loader}),
ListingLocationInfo =  loadable(() => import(/* webpackChunkName: 'ListingLocationInfo' */'../../pages/LocationInfoPage'),{ LoadingComponent: Loader}),
ExpressListing =  loadable(() => import(/* webpackChunkName: 'ExpressListing' */'../../pages/ExpressListingPage'),{ LoadingComponent: Loader}),
EditPropertyDetails = loadable(() => import(/* webpackChunkName: 'EditPropertyDetails' */'../../pages/EditPropertyDetailsPage'),{ LoadingComponent: Loader}),
ListingFinancial = loadable(() => import(/* webpackChunkName: 'ListingFinancial' */'../../pages/ListingFinancialPage'),{ LoadingComponent: Loader}),
AdditionalDetails = loadable(() => import(/* webpackChunkName: 'AdditionalDetails' */'../../pages/AdditionalDetailsPage'),{ LoadingComponent: Loader}),
ListingMedia = loadable(() => import(/* webpackChunkName: 'ListingMedia' */'../../pages/ListingMediaPage'),{ LoadingComponent: Loader}),
FlyerPreview =  loadable(() => import(/* webpackChunkName: 'FlyerPreview' */'../../pages/FlyerPreview.js'),{ LoadingComponent: Loader});
// TenantApplication =  loadable(() => import(/* webpackChunkName: 'TenantApplicationComponent' */'../../containers/TenantApplication/TenantApplication'),{ LoadingComponent: Loader}),
// MyApplications = loadable(() => import(/* webpackChunkName: 'MyApplicationsComponent' */'../../containers/profile/applications-component'),{ LoadingComponent: Loader}),
// MyPayments = loadable(() => import(/* webpackChunkName: 'MyPaymentsComponent' */'../../containers/profile/payments-component'),{ LoadingComponent: Loader}),
// ProfileConnectPaypal = loadable(() => import(/* webpackChunkName: 'ProfileConnectPaypal' */'../../containers/profile/profile-paypal-connect'),{ LoadingComponent: Loader});

const DEFAULT_PAGE = 'profile';

const PROFILE_SECTION_COMPONENTS = {
	'listings' : {
		component : ListingsComponent
	},
	'applications' : {
		component : null
	},
	'payments' : {
		component : null
	},
	'searches' : {
		component : SearchesComponent
	},
	'company' : {
		component : CompanyComponent
	},
	'mycontacts' : {
		component : MyContacts
	},
	'blogs' : {
		component : ArticlesComponent
	},
	'changepassword' : {
		component : ChangePassword,
		isProfileEditSidebarRequired : true
	},
	'preferences' : {
		component : PreferencesComponent,
		isProfileEditSidebarRequired : true
	},
	'wishlist' : {
		component : WishlistComponent
	},
	'profile' : {
		component : ProfileComponent
	},
	'returns' : {
		component : ReturnsComponent
	},
	'portfolio' : {
		component : PortfolioComponent
	},
	'flyer' : {
		component : PDFWizard
	},
	'pdf' : {
		component : FlyerPreview
	},
	'create-property' : {
		component : CreateProperty
	},
	'location' : {
		component : ListingLocationInfo
	},
	'listing' : {
		component : ExpressListing
	},
	'property' : {
		component : EditPropertyDetails
	},
	'financial' : {
		component : ListingFinancial
	},
	'additional' : {
		component : AdditionalDetails
	},
	'media' : {
		component : ListingMedia
	},
	'tenant-application' : {
		component : null
	},
	'connect-paypal' : {
		component : null,
		isProfileEditSidebarRequired : true
	}
};

const profilePageEditLinks = PROFILE_EDIT_PAGE_LINKS.filter(link => !link.hidden);
const profilePageLinks = PROFILE_PAGE_LINKS.filter(link => !link.hidden);

export default class ProfileLayout extends Component {

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			profileSection : props.params.section
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			profileSection: props.params.section
		});
	}

	render() {
		const { profileSection } = this.state;
		const ProfilePageComponent = profileSection ? PROFILE_SECTION_COMPONENTS[profileSection].component : ProfileComponent;
		const { screenSize, user } = this.props;
		return (
			<div className={`profile-page__layout ${profileSection}`}>
				{screenSize > 2 && (!profileSection || PROFILE_SECTION_COMPONENTS[profileSection].isProfileEditSidebarRequired) &&
				<ProfileEditSidebar links={profilePageEditLinks} userInfo = {user.user} profileSection={profileSection}/>
				}
				{/*
				 <TransitionGroup enter={false} className="profile-page__section-wrap">
				 <CSSTransition timeout={{exit: 300}} classNames="fade">
				 <ProfilePageComponent {...this.props}/>
				 </CSSTransition>
				 </TransitionGroup>
				 */}
				<div className="profile-page__section-wrap">
					<ProfilePageComponent {...this.props}/>
				</div>
				{screenSize > 2 &&
				<ProfileSidebar dispatch={this.props.dispatch} links={profilePageLinks} userInfo = {user.user} profileSection={profileSection}/>
				}
			</div>
		);
	}
}



