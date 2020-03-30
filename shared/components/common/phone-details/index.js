import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import { GET_CONTACT_ACTIONS } from '../../../redux/actions/application';
import { phoneNumberFormat } from '../../../utils/String';
import { buildQueryObject } from '../../../utils/searchUtil';

class PhoneDetails extends Component {
	static contextTypes = {
		i18n: PropTypes.object,
		country: PropTypes.string
	};
	static propTypes = {
		actionType: PropTypes.string,
		contactedId: PropTypes.string,
		listingId: PropTypes.string,
		dispatch: PropTypes.func,
		contextType: PropTypes.string,
		articleId : PropTypes.string,
		questionId : PropTypes.string
	};

	static defaultProps = {
		contactDetails: {},
		listingId: '',
		articleId : '',
		questionId : ''
	};

	constructor(props) {
		super(props);
		this.state = {
			isFetching: false,
			contactDetails: null
		};
	}

	componentWillReceiveProps(props) {
		const { status } = props.contactDetails;
		if(props.contactDetails) {
			this.setState({
				isFetching: props.contactDetails.isFetching,
				contactDetails: props.contactDetails
			});
		}
		if(status === 'success') {
			this.props.onActionFinished && this.props.onActionFinished('phone', false);
		}
	}

	componentDidMount() {
		const { actionType, listingId, contactedId, contextType, articleId, questionId } = this.props;
		let dataPayload = buildQueryObject({
			actiontype: actionType,
			contexttype: contextType,
			listingid : listingId,
			questionid : questionId,
			articleid : articleId
		});
		this.props.dispatch(GET_CONTACT_ACTIONS({
			dataPayload,
			paramsPayload: {
				id: contactedId
			}
		}));
	}

	render() {
		const { l } = this.context.i18n;
		const { country } = this.context;
		const { contactDetails, isFetching } = this.state;

		return (
			<div className="phone-details-modal">
				{isFetching ?
					<Spinner/>
					:
					<div className="phone-details-modal__details">
						{
							contactDetails && contactDetails.numbers &&
							contactDetails.numbers.length > 0 ? contactDetails.numbers.map(number=> {
								const numberFormat = phoneNumberFormat(number.number,number.contactNumberType,country);
								return (
									<div className="flex flex-justify-between col-md-12 col-lg-12 col-xs-12">
										<div className="label">
											<span>{l(number.contactNumberType)}</span>
										</div>
										<div className="value">
											<a className="phone" href={`tel:${numberFormat}`}>{numberFormat}</a>
										</div>
									</div>
								);
							}) :
								<div className="col-md-12 col-lg-12 col-12">
									<span>{l('NOCONTACTNUMBERSFOUND')}</span>
								</div>
						}
					</div>
				}
			</div>
		);
	}

}

export default PhoneDetails;
