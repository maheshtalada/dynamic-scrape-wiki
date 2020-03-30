import React from 'react';
import Cx from 'classnames';
import { localeCurrency } from 'utils/localeUtil';

export default function({listing, country, l, className}) {
	return (
		<div className={Cx("price",className)}>
			{ listing.showrpsf ?
			<span>
				{localeCurrency(listing.rpsf.toFixed(2), '', '', country)}
				<span className="price__caprate"> {l('PERSQUAREFEET')}</span>
			</span> :
				( listing.price ? localeCurrency(listing.price.toFixed(2), '', '', country)  :
			l('PRICEUNDISCLOSED'))}
		</div>
	)
}
