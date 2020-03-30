import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'components/common/snackbar/snackbar';
import ReactDOM from 'react-dom';
import Loader from 'components/common/page-loader/loader';
import { REQUEST_ADD_TO_WISHLIST } from '../../redux/actions/properties';
import PageActions from 'components/page-actions/page-actions';
import { simulateClick } from 'utils/domUtils';

const SUCCESS_STATUS = 'success';

class Wishlist extends PageActions {

	static propTypes = {
		propertyId: PropTypes.string,
		isIconOnly : PropTypes.bool,
		iconClass : PropTypes.string
	};

	static defaultProps = {
		isIconOnly : true,
		iconClass : 'pe-7s-heart',
		isIconText : false,
		text : 'ADDTOWISHLIST',
		listingStatus : 'ACTIVE'
	}

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			isShowAck : false
		};
	}

	isAddedToWishlist(propertyId,wishlistId) {
		if(typeof wishlistId === 'string') {
			return propertyId === wishlistId;
		}
		if(wishlistId instanceof Array) {
			return wishlistId.indexOf(propertyId) >= 0;
		}
		return false;
	}

	componentWillReceiveProps(props) {
		const { user, addToWishlist } = props;
		if(this.isSubmitAction && user.user.isLogIn) {
			this.isSubmitAction = false;
			this.submitAction();
		}

		if(addToWishlist && addToWishlist.status === SUCCESS_STATUS && this.contactAddNotified === false){
			this.contactAddNotified = true;
			this.setState({
				isSaving: false,
				isShowAck : true
			})
		}
	}

	isListingInWishlist() {
		const { user, propertyId } = this.props;
		if(!user.user.wishListPropertyIds) {
			return false;
		}
		return user.user.wishListPropertyIds.indexOf(propertyId) >= 0;
	}

	addToWishlist() {
		const { propertyId, dispatch} = this.props;
		this.contactAddNotified = false;
		this.setState({
			isSaving : true
		},()=>{
			dispatch(REQUEST_ADD_TO_WISHLIST({
				propertylistingids: propertyId
			}));
		})

	}

	render() {
		const { l } = this.context.i18n;
		const { saveStatus, isSaving, isShowAck} = this.state;
		const isSaved = this.isListingInWishlist() || saveStatus === SUCCESS_STATUS;
		const { isIconOnly, iconClass, showLoader, isIconText, text, listingStatus } = this.props;
		const listingStatusClass = listingStatus !== 'ACTIVE' ? 'disable' : '';

		return (
			<div className={`wishlist-wrapper ${listingStatusClass}`} disabled={listingStatusClass ? 'disabled' : ''}>
				{isSaving && <Loader />}
				{!frameworkGlobals.isServer && ReactDOM.createPortal(
					<Snackbar active={isShowAck} timeout={1000} onTimeout={()=>this.setState({
						isShowAck : false
					},()=>{
						simulateClick('.page-actions .select-wrapper .select-wrapper__select-btn', '.page-actions .select-wrapper .dropdown-content');
					})}>
                    	{l('ADDEDTOWISHLIST')}
               	 	</Snackbar>,
					document.querySelector('body'),
				)}
				{/*<Snackbar active={isShowAck} onTimeout={this.hideAck}>
					{l('ADDEDTOWISHLIST')}
				</Snackbar>*/}
				<button title={l(text)} disabled={ listingStatusClass ? 'disabled' : ''} className={`wishlist-wrapper__btn ${isSaved ? 'saved' : ''}`}
						onClick={()=>!listingStatusClass && this.onActionClick(
							'addcontactform',
							{
								isLoginRequired : true,
								type : 'extraPayLoad',
								name : 'ADDTOWISHLIST',
								extraPayLoad: {...this.props},
								isPostLoginSubmit : this.addToWishlist
							}
						)}
				>
					{ <i className={`wishlist-wrapper__btn__wish-icon ${iconClass}`}/>}
					{!isIconOnly && l(text)}
					{ isIconText && <span className="wishlist-wrapper__btn__wish-text">{l(text)}</span>}
				</button>
			</div>
		);
	}
}

const mapStateToProps = ({ properties, user, application }) => {
	return {
		addToWishlist : properties.add_to_wishlist,
		user : user,
		actionSubmit : application.actionSubmit || '',
	};
};

export default connect(mapStateToProps)(Wishlist);
