import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { checkIfValidEmailId, checkIfValidMobileNumber } from '../../utils/userUtilities';
import { Button } from '../common/button';
import InputField from '../common/input-field/input-field';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/spinner';
import Snackbar from 'components/common/snackbar/snackbar';
import { REQUEST_ADD_TO_MY_CONTACTS } from '../../redux/actions/userprofile';

const snackbarMessage = 'Contact added successfully !!!';
class AddNewContactForm extends Component {

	static propTypes = {
		successCallback : PropTypes.func,
		className : PropTypes.string,
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	static defaultProps = {
		successCallback : ()=>{}
	};

	constructor(props) {
		super(props);
		this.onClickAdd = this.onClickAdd.bind(this);
		this.hideSnackBar = this.hideSnackBar.bind(this);
		this.state = {
			addToMyContacts : {}
		};
	}

	componentWillReceiveProps(props) {
		if(props.addToMyContacts.status === "success" && this.contactAddNotified === false) {
			this.contactAddNotified = true;
			this.setState({
				addToMyContacts : props.addToMyContacts,
				isFetching : props.addToMyContacts.isFetching,
				showSnackbar : true
			});
		} else {
			this.setState({
				addToMyContacts : props.addToMyContacts,
				isFetching : props.addToMyContacts.isFetching
			});
		}
	}

	onInputChange(key,value) {
		this.setState({
			[key] : value
		})
	}

	onClickAdd() {
		const { emailId, name, phone } = this.state;
		if(!checkIfValidEmailId(emailId)) {
			this.setState({
				isInvalidEmail : true
			});
			return;
		}
		if(phone && !checkIfValidMobileNumber(phone)) {
			this.setState({
				isInvalidPhone : true
			});
			return;
		}
		this.contactAddNotified = false;
		this.setState({
			isFetching: true,
			isInvalidEmail : false,
			isInvalidPhone : false
		});
		this.props.dispatch(REQUEST_ADD_TO_MY_CONTACTS({
			name : name,
			emailid : emailId,
			mobilenumber : phone
		}));
	}

	hideSnackBar() {
		this.setState({ showSnackbar : false}, ()=> this.props.removeModal())
	}

	render() {
		const { className } = this.props;
		const { isInvalidEmail, name, emailId, isFetching, isInvalidPhone, showSnackbar } = this.state;
		const isEnableButton = !!name && !!emailId;
		const { l } = this.context.i18n;
		return (
			<div className={Cx("add-new-contact-form",className)}>
				<Snackbar active={showSnackbar} onTimeout={this.hideSnackBar}>
					{snackbarMessage}
				</Snackbar>
				<div className="field-group">
					<InputField placeholder={l("NAME")} onChange={value => this.onInputChange("name",value)} label={`${l('NAME')}`} required/>
					<InputField placeholder={l("EMAILID")} onChange={value => this.onInputChange("emailId",value)} label={`${l('EMAILID')}`} required/>
					<InputField placeholder={l("MOBILENUMBER")} onChange={value => this.onInputChange("phone",value)} label={`${l('MOBILENUMBER')}`} required/>
				</div>
				{isInvalidEmail &&
					<div className="alert alert-warning">
						<div>{l('EMAILINVALIDERROR')}</div>
					</div>
				}
				{isInvalidPhone &&
					<div className="alert alert-warning">
						<div>{l('MOBILENUMBERINVALIDERROR')}</div>
					</div>
				}
				<div className="btn-wrap flex flex-justify-center flex-align-center">
					<Button disabled={!isEnableButton} onClick={this.onClickAdd}>{l("ADD")}</Button>
					{isFetching && <Spinner />}
				</div>
			</div>
		)
	}

}

const mapStateToProps = ({userprofile}) => {
	return {
		addToMyContacts : userprofile.response_add_to_my_contacts || {}
	}
};

export default connect(mapStateToProps)(AddNewContactForm);
