import React, { Fragment} from 'react';
import Cx from 'classnames';
import { formatArea, getDaysSince, formatDaysOnMarket } from 'utils/searchUtil';
import { getBuildingInfo, getBuildingUnitInfo, isSwimmingPool, isHOA } from 'utils/propertyUtil';
import ReactTooltip from 'react-tooltip';

export default function(props) {
    const {className, l, details, country, tooltipPlace="top", viewTypes, showBasicInfo = undefined} = props;
    const buildingInfo = getBuildingInfo(details);
    const listingArea = formatArea(details.listingArea,l,country,details.listingAreaUOM);
    const { numberOfBedRooms, numberOfWashRooms } = getBuildingUnitInfo(details);
    const lotArea = formatArea(buildingInfo.lotArea,l,country,buildingInfo.lotAreaUOM);
    return (
        <div className={Cx("main-hero-prime-info",className)}>
            <ReactTooltip id="main-hero-prime-info-tooltip" place={tooltipPlace}/>
            {listingArea && <div className="item area" data-for="main-hero-prime-info-tooltip" data-tip={l('SQUAREFOOTAGE')}>
                <i className="pe-7s-area-sqft"/>
                <div className="flex flex-align-end">
                    <span>{listingArea.formattedValue}</span>
                    <span className="uom">{listingArea.uom}</span>
                </div>
            </div>}
            {!!numberOfBedRooms && <div className="item" data-for="main-hero-prime-info-tooltip" data-tip={l('BEDROOM')}>
                <i className="pe-7s-bed-1"/>
                {`${numberOfBedRooms} Bd`}
            </div>}
            {!!numberOfWashRooms && <div className="item" data-for="main-hero-prime-info-tooltip" data-tip={l('BATHROOM')}>
                <i className="pe-7s-bathroom"/>
                {`${numberOfWashRooms} Ba`}
            </div>}
			{
				!showBasicInfo && <Fragment>
					{lotArea && <div className="item area">
						<i className="pe-7s-industrial-fenced-yard" data-for="main-hero-prime-info-tooltip" data-tip={l('LOTAREA')}/>
						<div className="flex flex-align-end">
							<span>{lotArea.formattedValue}</span>
							<span className="uom">{lotArea.uom}</span>
						</div>
					</div>}
					{!!buildingInfo.yearBuilt && <div className="item">
						<i className="pe-7s-date2" data-for="main-hero-prime-info-tooltip" data-tip={l('YEARBUILT')}/>
						{buildingInfo.yearBuilt}
					</div>
					}
					{isSwimmingPool(details) && <div className="item">
						<i className="pe-7s-swimming"/>
						{l("SWIMMINGPOOL")}
					</div>
					}
					{isHOA(details) && <div className="item">
						<i className="pe-7s-coin-icon"/>
						{l("HOA")}
					</div>
					}
					{viewTypes && details.property.viewTypes && <div className="item">
						<i className="pe-7s-binoculars-2" data-tip={l('VIEWTYPES')}/>
						<span>{details.property.viewTypes.join(", ")}</span>
					</div>}
					{details.indexTime && <div className="item">
						<i className="pe-7s-date" data-for="main-hero-prime-info-tooltip" data-tip={l('DAYSONMARKET')}/>
						{formatDaysOnMarket(getDaysSince(details.indexTime),l)}
					</div>
					}
				</Fragment>
			}

        </div>
    )
}
