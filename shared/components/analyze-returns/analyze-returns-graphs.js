import React from 'react';
import Chart from 'components/charts';
import { formulas } from 'utils/analyze-returns-formulae';
import { calculationYears, irrCalculationYears, ANALYZE_RETURN_SCHEMA_CONSTANTS, getGraphData } from './analyze-return-graph-data';

const { CHERRYPICK_IDS,
    IRR_CHERRYPICK_ID, 
    IRR_WITH_MORTGAGE_CHERRYPICK_ID, 
    CAPRATE_GROWTH_CHERRYPICK_ID,
    CASH_ON_CASH_GROWTH_CHERRYPICK_ID,
    PURCHASE_TYPE_CASH } = ANALYZE_RETURN_SCHEMA_CONSTANTS;

export const GainGraphs = (props) => {
    const { cumulativeAppreciation = [], cumulativeCashFlow = [], principalPaid = [], rentIncrement = [], cashFlowGrowth = [], purchaseType, l, country } = props;
    let totalGainGraphData = {};
	if(principalPaid.length) {
		totalGainGraphData = getGraphData('totalGainLeverage',l,country);
		totalGainGraphData.data.datasets[2].data = principalPaid;
	} else {
		totalGainGraphData = getGraphData('totalGain',l,country);
	}
	totalGainGraphData.data.datasets[0].data = cumulativeCashFlow;
	totalGainGraphData.data.datasets[1].data = cumulativeAppreciation;

    let rentGraphData = getGraphData('rent',l,country);
    rentGraphData.data.datasets[0].data = rentIncrement;
    rentGraphData.data.datasets[1].data = cashFlowGrowth;

    return (totalGainGraphData.data &&
        <div className="charts-wrap">
            <div className="charts-wrap__wrapper">
                <Chart data = {totalGainGraphData.data}
                    graphType = {'StackedBar'}
                    width="100%"
                    height="250px"
                    title={l('TOTALGAINCHART')}
                    options = {totalGainGraphData.options}/>
            </div>
            <div className="charts-wrap__wrapper">
                <Chart data = {rentGraphData.data}
                    graphType = {'LineWithoutLayer'}
                    width="100%"
                    height="250px"
                    title={l('RENTCASHFLOWCHART')}
                    options = {rentGraphData.options}/>
            </div>
        </div>
    );
};

export const CumulativeGains = (props)=> {
	const { cumulativeAppreciation = [], cumulativeCashFlow = [], principalPaid = [], l, country } = props;
	let totalGainGraphData = {};
	if(principalPaid.length) {
		totalGainGraphData = getGraphData('totalGainLeverage',l,country);
		totalGainGraphData.data.datasets[2].data = principalPaid;
	} else {
		totalGainGraphData = getGraphData('totalGain',l,country);
	}
	totalGainGraphData.data.datasets[0].data = cumulativeCashFlow;
	totalGainGraphData.data.datasets[1].data = cumulativeAppreciation;

	return (totalGainGraphData.data &&
		<div className="charts-wrap">
			<div className="charts-wrap__wrapper">
				<Chart data = {totalGainGraphData.data}
					   graphType = {'StackedBar'}
					   width="100%"
					   height="250px"
					   enlargeChartTitle={l('TOTALGAINCHART')}
					   options = {totalGainGraphData.options}/>
			</div>
		</div>
	);
};

export const IncomeGrowth = (props)=> {
	const { rentIncrement = [], cashFlowGrowth = [], l, country } = props;

	let rentGraphData = getGraphData('rent',l,country);
	rentGraphData.data.datasets[0].data = rentIncrement;
	rentGraphData.data.datasets[1].data = cashFlowGrowth;

	return (rentGraphData.data &&
		<div className="charts-wrap">
			<div className="charts-wrap__wrapper">
				<Chart data = {rentGraphData.data}
					   graphType = {'LineWithoutLayer'}
					   width="100%"
					   height="250px"
					   enlargeChartTitle={l('RENTCASHFLOWCHART')}
					   options = {rentGraphData.options}/>
			</div>
		</div>
	);
};


export const IrrGraph = (props) => {
    const { irrData = [], country, l, graphTitle } = props;
    let irrGraphData = getGraphData('irr',l,country);
    irrGraphData.data.datasets[0].data = irrData;
    return (irrData && 
        <Chart data = {irrGraphData.data}
                graphType = {'LineWithoutLayer'}
                width="100%"
                height="200px"
			   	enlargeChartTitle={l(graphTitle)}
                options = {irrGraphData.options}/>
    );
};

export const RoiGraph = (props) => {
    const { caprateGrowth=[], country, l, graphTitle } = props;
    let roiGraphData;
   roiGraphData = getGraphData('caprateGrowth',l,country);
	roiGraphData.data.datasets[0].data = caprateGrowth;
    return (roiGraphData.data &&
        <Chart data = {roiGraphData.data}
                graphType = {'LineWithoutLayer'}
                width="100%"
                height="200px"
			    enlargeChartTitle={l(graphTitle)}
                options = {roiGraphData.options}/>
    );
};

export const handleTotalGainsChange = (changeObject) => {
    let cumulativeAppreciation = [], cumulativeCashFlow = [], principalPaid = [], irrSplitted, rentIncrement=[], cashFlowGrowth=[];
    const purchaseType = changeObject.modifiedValues[CHERRYPICK_IDS['purchaseType']] || changeObject.initialValues[CHERRYPICK_IDS['purchaseType']];
    calculationYears.map(year => {
		irrSplitted = formulas['internalRateOfReturnSplitted']({cherrypickids : IRR_CHERRYPICK_ID,getDataByID : changeObject.componentTreeObject.getDataByID},Number(year));
		principalPaid.push(irrSplitted.principalPaidAmount);
		cumulativeAppreciation.push(irrSplitted.cumulativeAppreciation);
        cumulativeCashFlow.push(irrSplitted.cumulativeCashFlow);
        rentIncrement.push(irrSplitted.rentIncrement);
        cashFlowGrowth.push(irrSplitted.cashFlowGrowth);
    });

    // if aum of all principalPaid is '0'
	// then send empty principalPaid array
	const totprincipalPaid = principalPaid.reduce((sum , cur ) => sum+cur);

    return {
        cumulativeAppreciation,
        cumulativeCashFlow,
        principalPaid : !totprincipalPaid && [] || principalPaid ,
        rentIncrement,
        cashFlowGrowth,
        purchaseType
    };
};

export const handleRoiGraphData = (changeObject) => {
    const purchaseType = changeObject.modifiedValues[CHERRYPICK_IDS['purchaseType']] || changeObject.initialValues[CHERRYPICK_IDS['purchaseType']];
    let formula, cherryPicksIds;
	formula = 'capRateGrowth';
	cherryPicksIds = CAPRATE_GROWTH_CHERRYPICK_ID;
    const data = calculationYears.map(year => {
        return formulas[formula]({cherrypickids : cherryPicksIds,getDataByID : changeObject.componentTreeObject.getDataByID},Number(year));
    });

    return {
        caprateGrowth : data
    };
};

export const handleIrrDataChange = (changeObject) => {
   // const purchaseType = changeObject.modifiedValues[CHERRYPICK_IDS['purchaseType']] || changeObject.initialValues[CHERRYPICK_IDS['purchaseType']];
    //const irrCherry = purchaseType === PURCHASE_TYPE_CASH ? IRR_CHERRYPICK_ID : IRR_WITH_MORTGAGE_CHERRYPICK_ID;
    //console.log(irrCherry, 'IRR_CHERRYPICK_ID',IRR_CHERRYPICK_ID, 'IRR_WITH_MORTGAGE_CHERRYPICK_ID', IRR_WITH_MORTGAGE_CHERRYPICK_ID);
    const irrData = irrCalculationYears.map(year => {
        return formulas['internalRateOfReturn']({
            cherrypickids: IRR_CHERRYPICK_ID,
            getDataByID: changeObject.componentTreeObject.getDataByID
        }, Number(year));
    });
    return {
        irrData
    };
};

