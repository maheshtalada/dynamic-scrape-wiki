import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/spinner';
import { REQUEST_ADD_TO_MY_CONTACTS } from '../../redux/actions/userprofile';
import Cx from 'classnames';
import Snackbar from 'components/common/snackbar/snackbar';
import PageActions from 'components/page-actions/page-actions';

const snackbarMessage = 'Contact added successfully !!!';
class AddNewContact extends PageActions {

	static propTypes = {
		contactId : PropTypes.string,
		btnText : PropTypes.string
	};

	static defaultProps = {
		btnText : 'ADDNEWCONTACT',
		context : ''
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			addToMyContacts : {}
		};
		this.addPersonToContacts = this.addPersonToContacts.bind(this);
	}

	componentWillReceiveProps(props) {
		const { user, addToMyContacts } = props;
		if(this.isSubmitAction && user.user.isLogIn) {
			this.isSubmitAction = false;
			this.submitAction();
		}

		if(addToMyContacts.status === 'success' && this.contactAddNotified === false){
			this.contactAddNotified = true;
			this.setState({
				isFetching: false,
				showSnackbar : true
			})
		}
	}

	addPersonToContacts() {
		const { contactId } = this.props;
		this.contactAddNotified = false;
		this.setState({
			isFetching : true
		},()=>{
			this.props.dispatch(REQUEST_ADD_TO_MY_CONTACTS({
				userid : contactId
			}))
		})
	}

	render() {
		const { l } = this.context.i18n;
		const { btnText, btnClass, iconOnly, context, contactId, user } = this.props;
		const { isFetching, showSnackbar } = this.state;
		const isUserContactIdSame = contactId && user && user.user && user.user.id === contactId;
		return (
				<div className={Cx("add-to-my-contacts",{'icon-only' : iconOnly})}>
					{isFetching && <Spinner />}
					<Snackbar active={showSnackbar} onTimeout={()=> this.setState({showSnackbar : false})}>
						{snackbarMessage}
					</Snackbar>
					{<button title={l("ADDTOCONTACTS")} disabled={isUserContactIdSame ? 'disabled': null} className={Cx("add-to-my-contacts__add-btn flex flex-align-center",btnClass,{'disabled': isUserContactIdSame})}
							 onClick={()=>this.onActionClick(
							 	'addcontactform',
								 {
								 	isLoginRequired : true,
									type : 'extraPayLoad',
									name : 'ADDTOCONTACTS',
									extraPayLoad: {...this.props},
									isPostLoginSubmit : contactId && this.addPersonToContacts || false
								 }
							 )}
							 data-tag-category={`${context} - Contact Actions`} data-tag-action="Contact Action Click" data-tag-label={`Add ${context} to My Contacts`}>
						<i className="pe-7s-plus" data-for="contact-actions-tooltips" data-tip={l("ADDTOCONTACTS")}/>
						<span className="btn-text">{l(btnText)}</span>
					</button>}
				</div>
		)
	}
}

const mapStateToProps = ({userprofile}) => {
	return {
		addToMyContacts : userprofile.response_add_to_my_contacts || {}
	}
};

export default connect(mapStateToProps)(AddNewContact);
