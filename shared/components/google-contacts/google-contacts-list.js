import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'components/common/checkbox/checkbox';
import { Button } from 'components/common/button';
import { getJSON } from 'utils/scriptUtils';
import Spinner from 'components/common/spinner/spinner';
import { connect } from 'react-redux';
import { REQUEST_RESET_STORE_STATE } from '../../redux/actions/application';
import { REQUEST_IMPORT_CONTACTS } from '../../redux/actions/userprofile';

class GoogleContactsList extends Component {
    
    static contextTypes = {
        i18n : PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            contactList : [],
            selectedContacts : {}
        };
        this.contactSelect = this.contactSelect.bind(this);
        this.onToggleAll = this.onToggleAll.bind(this);
        this.onClickImport = this.onClickImport.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        props.dispatch(REQUEST_RESET_STORE_STATE({
            type : 'RESPONSE_IMPORT_CONTACTS'
        }));
    }

    componentDidMount() {
        this.fetchContacts();
    }

    componentWillReceiveProps(props) {
        this.setState({
            isSaving : props.addContacts.isSaving,
            selectedContactsToAdd : props.addContacts.selectedContactsToAdd,
            addedContactsCount : props.addContacts.addedContactsCount
        });
        if(props.addContacts.status === 'success') {
            this.props.onImportSuccess();
            this.props.removeModal();
        }
    }

    async fetchContacts() {
        const { accessToken } = this.props;
        this.setState({
            isFetching : true
        });
        const contactsFeed = await getJSON("https://www.google.com/m8/feeds/contacts/default/full?access_token=" + accessToken + "&alt=json&max-results=5000");
        const contacts = GoogleContactsList.getContactList(contactsFeed.feed.entry);
        this.setState({
            contactsFeed,
            isFetching : false,
            contactList: [...this.state.contactList,...contacts]
        });
    }

    onChangeSearch(evt) {
        const query = evt.target.value;
        const { contactList } = this.state;
        const filteredList = contactList.filter(contact => {
            if(contact.mobileNumber && contact.mobileNumber.indexOf(query) >= 0) {
                return true;
            }
            if(contact.emailId && contact.emailId.indexOf(query) >= 0) {
                return true;
            }
            if(contact.name && contact.name.indexOf(query) >= 0) {
                return true;
            }
        });
        this.setState({
            searchFilterList : filteredList,
            searchQuery : query
        });
    }

    onToggleAll(evt) {
        const { contactList } = this.state;
        let selected = {};
        contactList.forEach(contact => {
            selected[contact.emailId] = evt.currentTarget.checked;
        });
        this.setState({
            selectedContacts : selected,
            isSelectAll : evt.currentTarget.checked
        });
    }

    onClickImport() {
        const { contactList, selectedContacts } = this.state;
        const selected = contactList.filter(contact => selectedContacts[contact.emailId] === true);
        this.props.dispatch(REQUEST_IMPORT_CONTACTS({
            contacts : selected
        }));
    }

    getDisplayText(searchQuery,fieldValue) {
        const pattern = new RegExp(`^${searchQuery}`,'gi'),
        displayText = fieldValue.replace(pattern,`<span class="contact-label__search-highlight">${searchQuery}</span>`);
        return displayText;
    }

    renderContactLabel(contact) {
        // console.log(contact);
        const { searchQuery } = this.state;
        return (
            <div className="contact-label">
                {contact.name && <div className="contact-label__title">
                    <span dangerouslySetInnerHTML={{__html : this.getDisplayText(searchQuery,contact.name)}}/>
                </div>}
                {contact.mobileNumber && <div className="contact-label__phone flex flex-align-start">
                    <i className="pe-7s-Phone-number" />
                    <span dangerouslySetInnerHTML={{__html : this.getDisplayText(searchQuery,contact.mobileNumber)}}/>
                </div>}
                {contact.emailId && <div className="contact-label__email flex flex-align-start">
                    <i className="pe-7s-email" />
                    <span dangerouslySetInnerHTML={{__html : this.getDisplayText(searchQuery,contact.emailId)}}/>
                </div>}
            </div>
        );
    }

    render() {
        const { contactList, searchFilterList, searchQuery, selectedContacts, isSelectAll, isFetching, isSaving, addedContactsCount, selectedContactsToAdd } = this.state;
        const { l } = this.context.i18n;
        const isEnableImport = GoogleContactsList.checkIfEnableImport(selectedContacts);
        const selectedContactsCount = GoogleContactsList.getSelectedContactsCount(selectedContacts);
        const contactsDisplay = searchQuery ? searchFilterList : contactList;
        return (
            <div className="google-contacts-list">
                <div className="google-contacts-list__actions">
                    <div className="flex flex-align-center">
                        <Checkbox 
                            label={l('SELECTALL')}
                            name={'google-contacts-select-all'}
                            id={'google-contacts-select-all'}
                            checked={isSelectAll}
                            onChange={this.onToggleAll} />
                        <Button disabled={!isEnableImport} btnClassName="btn-primary btn-l" className="google-contacts-list__actions__import-btn" onClick={this.onClickImport}>
                            {`${l('IMPORTDATA')} (${selectedContactsCount})`}
                        </Button>
                        {isSaving && <Fragment>
                            <Spinner />
                            <div>Adding <span className="font-bold">{addedContactsCount}</span> of <span className="font-bold">{selectedContactsToAdd}</span> contacts...</div>
                        </Fragment>}
                    </div>
                    <div className="google-contacts-list__search-bar">
                        <input placeholder={l('SEARCH')} onChange={this.onChangeSearch}/>
                        <i className="pe-7s-search"/>
                    </div>
                </div>
                {isFetching && <Spinner />}
                {contactsDisplay.length > 0 && <Fragment>
                    <div className="google-contacts-list__disclaimer">*{l('GOOGLE_CONTACTS_NOTE')}</div>
                    <div className="google-contacts-list__contacts">
                    {contactsDisplay.map(contact => {
                        return (
                            <Checkbox 
                                key={contact.emailId}
                                renderLabel={ () => this.renderContactLabel(contact) }
                                name={contact.name}
                                id={contact.emailId}
                                onChange={this.contactSelect}
                                checked={selectedContacts[contact.emailId]}/>
                        );
                    })}
                </div>
                </Fragment>
                }
                
            </div>
        );
    }

    static getContactList(contacts) {
        let filteredContacts = [];
        let emailIds = {};
        contacts.forEach(contact => {
            if(contact.gd$email && contact.title.$t) {
                const email = GoogleContactsList.getPrimaryContactInfo(contact.gd$email).address;
                if(!emailIds[email]) {
                    emailIds[email] = 1;
                    filteredContacts.push({
                        mobileNumber : GoogleContactsList.getPrimaryContactInfo(contact.gd$phoneNumber).$t,
                        emailId : email,
                        name : contact.title.$t
                    });
                }
            }
        });
        return filteredContacts;
    }

    static getPrimaryContactInfo(info) {
        if(!info) {
            return '';
        }
        if(info.length === 1) {
            return info[0];
        }
        const primary = info.filter(el => el.primary === 'true');
        if(primary.length) {
            return primary[0];
        }
        return info[0];
    }

    static checkIfEnableImport(selectedContacts) {
        return Object.values(selectedContacts).indexOf(true) >= 0;
    }

    static getSelectedContactsCount(selectedContacts) {
        return Object.values(selectedContacts).filter(s => s === true).length;
    }

    contactSelect(evt) {
        this.setState({
            selectedContacts : {...this.state.selectedContacts, [evt.currentTarget.id] : evt.currentTarget.checked}
        });
    }
}

const mapStateToProps = ({userprofile}) => {
	return {
		addContacts : userprofile.response_import_contacts || {}
	};
};

export default connect(mapStateToProps)(GoogleContactsList);
