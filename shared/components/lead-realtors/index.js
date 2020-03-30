import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '../../components/common/snackbar/snackbar';
import ReactTooltip from 'react-tooltip';
import LeadRealtor from './lead-realtor';
import RealtorInfo from '../../components/property-details/realtor-info';
import { orderBy } from 'lodash';

export default class LeadRealtors extends Component {

	static contextTypes = {
		i18n: PropTypes.object,
		awsImagePath : PropTypes.string,
		assetsPath : PropTypes.string,
		screenSize: PropTypes.number,
		pathName : PropTypes.string
	};

	static propTypes = {
		stateCode : PropTypes.string,
		leadRealtors : PropTypes.array
	};

	static defaultProps = {
		stateCode : 'TX',
		leadRealtors : []
	};

	constructor(props) {
		super(props);
		this.state = {
			leadRealtors: props.leadRealtors,
			stateCode : props.stateCode
		};
		this.onShowSnackbar = this.onShowSnackbar.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			leadRealtors: props.leadRealtors,
			stateCode : props.stateCode
		});
	}

	onShowSnackbar(msg) {
		this.setState({
			showSnackbar : true,
			snackbarMsg : msg
		})
	}

	renderLeadRealtorInfo(leadRealtors) {
		leadRealtors = orderBy(leadRealtors, 'profession', 'desc');
		return (
			leadRealtors.map(info => {
				return (
					<LeadRealtor realtorInfo={info} {...this.props} onShowSnackbar={this.onShowSnackbar}/>
				);
			})
		);
	}

	renderInvestmentSpecialists(leadRealtors,l) {
		return ( leadRealtors && leadRealtors.length > 0 &&
			<div className="lead-realtors__wrap">
				{/*<div className="lead-realtors__wrap__title">{l('CONTACTINVESTMENTSPECIALIST')}</div>*/}
				{this.renderLeadRealtorInfo(leadRealtors)}
			</div>
		);
	}

	renderLeadVendors(leadRealtors,l) {
		const vendors = leadRealtors.filter(realtor => realtor.profession !== 'realtor');
		return (vendors && vendors.length > 0 &&
			<Fragment>
				<div className="lead-realtors__wrap vendors">
					<div className="lead-realtors__wrap__title">{l('CONTACTOURLEADVENDOR')}</div>
					{this.renderLeadRealtorInfo(vendors)}
				</div>
			</Fragment>
		);
	}

	renderListingAgent(l) {
		const { owner, details, chatUserStatus, dispatch, isUserOwnerSame, location, userObj } = this.props;
		return (
			owner ? <div className="lead-realtors__wrap">
				<div className="lead-realtors__wrap__title">{l('CONTACTLISTINGAGENT')}</div>
				<RealtorInfo
					user={userObj}
					owner={owner} 
					shareWrapperPosition="bottom"
					details={details} 
					chatUserStatus={chatUserStatus} 
					dispatch={dispatch} 
					isUserOwnerSame={isUserOwnerSame}
					location={location}/>
			</div> : null
		)
	}

	renderReferrerAgent(l) {
		const { referrerAgent, details, dispatch, location, userObj } = this.props;
		return (
			referrerAgent ?
			<div className="lead-realtors__wrap">
			{/*	<div className="lead-realtors__wrap__title">{l('CONTACTREFERREDAGENT')}</div>*/}
				<RealtorInfo
					user={userObj}
					owner={referrerAgent} 
					shareWrapperPosition="bottom"
					details={details} 
					isUserOwnerSame={referrerAgent.id === userObj.user.id}
					dispatch={dispatch} 
					location={location}/>
			</div> : null
		);
	}

	render() {
		const { l } = this.context.i18n;
		const { leadRealtors, showSnackbar, snackbarMsg } = this.state;
		const { title } = this.props;
		//style={{'backgroundImage': `url(${adbackground})`}}
		return (
			<div className="lead-realtors">
				{/*<div className="lead-realtors__title-wrap">
					{title && <div className="lead-realtors__title">{l(title)}</div>}
				</div>*/}
				{this.renderReferrerAgent(l)}
				{/*{ this.renderListingAgent(l) }*/}
				{ this.renderInvestmentSpecialists(leadRealtors,l) }
				<Snackbar active={showSnackbar} onTimeout={()=>{this.setState({ showSnackbar : false})}}>
					{l(snackbarMsg)}
				</Snackbar>
				<ReactTooltip id="contact-actions-tooltips"/>
				{/*<div className="flex flex-column flex-align-center lead-realtors__site-info">
				 <p>{l('CONTACTOURLEADREALTOR')}</p>
				 </div>*/}
			</div>
		);
	}
}


