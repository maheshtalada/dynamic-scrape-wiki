import loadable from '@loadable/component';
import Spinner from 'components/common/spinner/spinner';

export const PageActionsIndex = {
	'savesearch' : loadable(() => import(/* webpackChunkName: 'save-search' */'components/page-actions/actions/save-search'),{
	LoadingComponent: Spinner
	}),

	'contactlistingagent' : loadable(() => import(/* webpackChunkName: 'ContactListingAgent' */'components/page-actions/actions/contact-listing-agent'),{
		LoadingComponent: Spinner
	}),
	'mysearch' : loadable(() => import(/* webpackChunkName: 'MySearches' */'components/property-search/my-searches'),{
		LoadingComponent: Spinner
	}),

	'shareviaemail' : loadable(() => import(/* webpackChunkName: 'ShareViaEmailModal' */'components/share-via-email/share-via-email-modal'),{
		LoadingComponent: Spinner
	}),

	'contactviaemail' : loadable(() => import(/* webpackChunkName: 'SendEmailModal' */'components/common/email-modal/'),{
		LoadingComponent: Spinner
	}),

	'viewphonedetails' : loadable(() => import(/* webpackChunkName: 'ViewPhoneDetailModal' */'components/common/phone-details/'),{
		LoadingComponent: Spinner
	}),

	'addcontactform' : loadable(() => import(/* webpackChunkName: 'AddContactForm' */'components/add-to-my-contacts/add-new-contact-form'),{
		LoadingComponent: Spinner
	}),

	'submitloi' : loadable(() => import(/* webpackChunkName: 'SubmitLOI' */'components/make-an-offer/make-offer-modal'),{
		LoadingComponent: Spinner
	})

}
