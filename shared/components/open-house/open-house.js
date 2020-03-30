import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatDateUtil} from '../../utils/localeUtil';
import moment from 'moment';
import { Button } from '../common/button/';
import ContactBarHandlers from '../../lib/ContactBarHandlers';

export default class OpenHouse extends ContactBarHandlers {
	constructor(props) {
		super(props);
		this.getOpenHouseDate = this.getOpenHouseDate.bind(this);
		this.onClickRsvp = this.onClickRsvp.bind(this);
		this.state = {};
	}

	static propTypes = {
		openHouseTimes: PropTypes.array,
		user: PropTypes.object,
		disableContactOptions: PropTypes.bool
	};

	static contextTypes = {
		i18n : PropTypes.object,
		country: PropTypes.string,
		assetsPath : PropTypes.string
	};

	static defaultProps = {
		disableContactOptions: false
	};

	componentWillReceiveProps(props) {
		if(props.user && props.user.user.isLogIn) {
			const {contactActiontype, stepAfterLogin} = this.state;

			ContactBarHandlers.responseHandlers[stepAfterLogin] &&
			ContactBarHandlers.responseHandlers[stepAfterLogin].call(this, {...this.contactBarData,actionType: contactActiontype});
		}
	}

	getOpenHouseDate() {
		const { l } = this.context.i18n;
		const { country } = this.context;
		const currentDay = moment().day();
		const now = moment().startOf('day');
		const closestDate = moment(this.closestDateObj.date,'DD/MM/YYYY');
		const duration = closestDate.diff(now,'days');
		const timeSpan = currentDay+duration;
		if(duration === 0) {
			return l('TODAY');
		}
		if(duration === 1) {
			return l('TOMORROW');
		}
		if(timeSpan <= 7) {
			return `${l('COMING')} ${l(closestDate.format('dddd').toUpperCase())}`;
		}
		// if(timeSpan >= 7 && timeSpan < 14) {
		// 	return `${l("COMING")} ${l(closestDate.format('dddd').toUpperCase())}`
		// }
		return this.openHouseDate = formatDateUtil(this.closestDateObj.date,country,"DD/MM/YYYY");
	}

	getClosestDate(openHouseTimes) {
		const now = moment().startOf('day').unix();
		let closestDate = Infinity;
		let closestDateObj = undefined;
		openHouseTimes.forEach(timing => {
			const date = moment(timing.date,'DD/MM/YYYY').unix();
			if(date >= now && date < closestDate) {
				closestDate = date;
				closestDateObj = timing;
			}
		});

		return closestDateObj;
	}

	onClickRsvp() {
		const { listingId, owner } = this.props;
		this.contactBarData = {
			actionType: 'RSVP',
			personId: owner.id,
			contextType: 'LISTING',
			personName: owner.name,
			listingId
		};
		this.handleEmailOption(this.contactBarData);
	}

	render() {
		const { i18n , assetsPath } = this.context;
		const { openHouseTimes, user, disableContactOptions } = this.props;
		this.closestDateObj = this.getClosestDate(openHouseTimes);
		return (
			this.closestDateObj ?
			<div className="open-house-wrapper">
				<div className="open-house-wrapper__icon">
					<img src={`${assetsPath}/images/properties/open-house-sign.png`}/>
				</div>
				<div className="open-house-wrapper__info">
					<div className="open-house-wrapper__info__date">
						{this.getOpenHouseDate()}
					</div>
					<div className="open-house-wrapper__info__time">
						<time className="start">{this.closestDateObj.startTime}</time>
						<span>{'-'}</span>
						<time className="end">{this.closestDateObj.endTime}</time>
					</div>
					{user.user && <div className="open-house-wrapper__info__rsvp-wrap">
						<Button btnClassName={`btn-default ${disableContactOptions ? 'disabled' : ''}`}
								onClick={this.onClickRsvp}
								disabled={disableContactOptions ? 'disabled' : null}>
							{i18n.l('RSVP')}
						</Button>
					</div>
					}
				</div>
			</div> :
				null
		);
	}
}
