import React, { Fragment } from 'react';
import Cx from 'classnames';
import { getSearchResultArea } from '../../../utils/searchUtil';

export default function({listing, country, l, className, isGridTile=false, isBDBAPostfix=false}) {
	const area = getSearchResultArea(listing,country,l);
	return (
		<Fragment>
		<div className={Cx("flex flex-align-center listing-prime-info",className)}>
			{area && <div className="area flex flex-align-center">
				<i className="pe-7s-area-sqft" data-tip={l('SQUAREFOOTAGE')}/>
				<div className="flex flex-align-end">
					{area.formattedValue}
					<span className="uom">{area.uom}</span>
				</div>
			</div>}
			{!!listing.bedroom && <div className="bed flex flex-align-center">
				<i className="pe-7s-bed-1" data-tip={l('BEDROOM')}/>{listing.bedroom}{ isBDBAPostfix ? ' Bd' : ''}
			</div>}
			{!!listing.washroom && <div className="washroom flex flex-align-center">
				<i className="pe-7s-bathroom" data-tip={l('BATHROOM')}/>{listing.washroom}{ isBDBAPostfix ? ' Ba' : ''}
			</div>}
		</div>
		{!isGridTile && <div className={Cx("flex flex-align-center listing-prime-info",className)}>
			{ listing.haspool && <div className="pool flex flex-align-center">
				<i className="pe-7s-swimming" data-tip={l("SWIMMINGPOOL")}/>{l("SWIMMINGPOOL")}
			</div>}
			{ listing.hashoa && <div className="hoa flex flex-align-center">
				<i className="pe-7s-coin-icon" data-tip={l("HOA")}/>{l("HOA")}
			</div>}
		</div>}
		</Fragment>
	)
}
