import React from 'react';
import Cx from 'classnames';

const UNDISCLOSED = 'undisclosed';

function getCityState(address) {
	const addressComps = address.split(',');
	return addressComps.splice(addressComps.length-2).join(',').trim();
}

export default function({listing, l, className, isIcon=false,isCityStateOnly=false}) {
	const { formattedaddress } = listing;
	const address = formattedaddress === UNDISCLOSED
		? l('ADDRESSUNDISCLOSED')
		: (isCityStateOnly ? getCityState(formattedaddress) : formattedaddress)
	return (
		<div className={Cx("address flex flex-align-center",className)}>
			{isIcon && <i className="pe-7s-preferred-location"/>}
			<span className="property-item-name">{address}</span>
		</div>
	)
}
