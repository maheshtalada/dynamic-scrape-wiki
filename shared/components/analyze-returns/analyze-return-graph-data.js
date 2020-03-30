import { formatCurrency, getValueByLocale } from 'utils/localeUtil';
import moment from 'moment';

export const
	ANALYZE_RETURN_SCHEMA_CONSTANTS = {
		IRR_CHERRYPICK_ID :  {
			"salePrice": "analyzereturn.salePrice",
			"propertyAnnualAppreciationPercentage": "analyzereturn.propertyAnnualAppreciationPercentage",
			"rentIncrementPercentage": "analyzereturn.rentIncrementPercentage",
			"annualFreeCashFlow": "analyzereturn.cashflowvalue",
			"netOperatingIncome": "analyzereturn.netOperatingIncome",
			"initialInvestmentWithoutMortgage": "analyzereturn.initialInvestmentWithoutMortgage",
			"initialInvestmentWithMortgage": "analyzereturn.initialInvestmentWithMortgage",
			"downPaymentPercentage": "analyzereturn.downPaymentPercentage",
			"loanInterestRate": "analyzereturn.loanInterestRate",
			"saleClosingCost": "analyzereturn.saleClosingCost",
			"grossRentRevenue": "analyzereturn.grossRentRevenue",
			"emiCost": "analyzereturn.emiCost",
			"initialImprovementCost" : "analyzereturn.initialImprovementCost",
			 "closingCost" : "analyzereturn.closingCost",
			"totalExpenses": "analyzereturn.totalExpenses"
		},
		IRR_WITH_MORTGAGE_CHERRYPICK_ID : {
			"salePrice": "analyzereturn.salePrice",
			"propertyAnnualAppreciationPercentage": "analyzereturn.propertyAnnualAppreciationPercentage",
			"rentIncrementPercentage": "analyzereturn.rentIncrementPercentage",
			"annualFreeCashFlow": "analyzereturn.cashflowvalue",
			"initialInvestmentWithMortgage": "analyzereturn.initialInvestmentWithMortgage",
			"downPaymentPercentage": "analyzereturn.downPaymentPercentage",
			"loanInterestRate": "analyzereturn.loanInterestRate",
			"emiCost": "analyzereturn.emiCost",
			"saleClosingCost": "analyzereturn.saleClosingCost",
			"grossRentRevenue": "analyzereturn.grossRentRevenue",
			"totalExpenses": "analyzereturn.totalExpenses"
		},
		CAPRATE_GROWTH_CHERRYPICK_ID : {
			"grossRentRevenue": "analyzereturn.grossRentRevenue",
			"rentIncrementPercentage": "analyzereturn.rentIncrementPercentage",
			"salePrice": "analyzereturn.salePrice",
			"propertyAnnualAppreciationPercentage": "analyzereturn.propertyAnnualAppreciationPercentage",
			"initialImprovementCost" : "analyzereturn.initialImprovementCost",
			"closingCost" : "analyzereturn.closingCost",
			"annualFreeCashFlow": "analyzereturn.cashflowvalue",
			"emiCost": "analyzereturn.emiCost",
			"totalExpenses": "analyzereturn.totalExpenses",
			"downPaymentPercentage" : "analyzereturn.downPaymentPercentage"
		},
		CASH_ON_CASH_GROWTH_CHERRYPICK_ID : {
			"downPaymentPercentage" : "analyzereturn.downPaymentPercentage",
			"initialImprovementCost" : "analyzereturn.initialImprovementCost",
			"closingCost" : "analyzereturn.closingCost",
			"grossRentRevenue": "analyzereturn.grossRentRevenue",
			"rentIncrementPercentage": "analyzereturn.rentIncrementPercentage",
			"salePrice": "analyzereturn.salePrice",
			"propertyAnnualAppreciationPercentage": "analyzereturn.propertyAnnualAppreciationPercentage",
			"annualFreeCashFlow": "analyzereturn.cashflowvalue",
			"emiCost": "analyzereturn.emiCost",
			"totalExpenses": "analyzereturn.totalExpenses"
		},
		CHERRYPICK_IDS : {
			"purchaseType": "analyzereturn.purchaseType",
			"capRate": "analyzereturn.capRate",
			"cashOnCashReturn": "analyzereturn.cashOnCashReturn"
		},
		PURCHASE_TYPE_CASH : 'cashPurchase',
		ROI_CAPRATE_GRAPH : "CAPRATEGROWTH",
		ROI_CASHFLOW_GRAPH : "CASHONCASHGROWTH",
		ROI_IRR_GRAPH : "IRR",
		TOTAL_GAIN_CHART : "TOTALGAINCHART",
		RENT_CASH_FLOW_CHART :"RENTCASHFLOWCHART"
	},

	GRAPH_VIEW_TABS = [
		{
			'name' : 'yearly',
			'label' : 'LASTTENYEARSVIEW',
			'value' : {
				'viewtype' : 'yearly'
			}
		},
		{
			'name' : 'quarterly',
			'label' : 'LASTTHREEYEARSVIEW',
			'value' : {
				'viewtype' : 'monthly', 
				'startdate' : moment().subtract(3,'y').format('DD/MM/YYYY'),
				'enddate' : moment().format('DD/MM/YYYY')
			}
		},
		{
			'name' : 'monthly',
			'label' : 'LASTYEARVIEW',
			'value' : {
				'viewtype' : 'monthly'
			}
		},
		{
			'name' : 'custom',
			'label' : 'CUSTOMVIEW',
			'value' : {
				'viewtype' : 'monthly'
			}
		}
	],
	CUSTOM_VIEW = 'custom',
	MONTHLY_VIEW = 'monthly',
	YEARLY_VIEW = 'yearly',
	MONTHS_MAP = {
		1 : {
			short : 'Jan',
			long : 'January'
		}, 
		2 : {
			short : 'Feb',
			long : 'February'
		}, 
		3 : {
			short : 'Mar',
			long : 'March'
		}, 
		4 : {
			short : 'Apr',
			long : 'April'
		}, 
		5 : {
			short : 'May',
			long : 'May'
		}, 
		6 : {
			short : 'Jun',
			long : 'June'
		}, 
		7 : {
			short : 'Jul',
			long : 'July'
		}, 
		8 : {
			short : 'Aug',
			long : 'August'
		}, 
		9 : {
			short : 'Sep',
			long : 'September'
		}, 
		10 : {
			short : 'Oct',
			long : 'October'
		}, 
		11 : {
			short : 'Nov',
			long : 'November'
		}, 
		12 : {
			short : 'Dec',
			long : 'December'
		} 
	},
	calculationYears = [1,5,10,15,20,25,30],
	irrCalculationYears = [1,2,3,4,5,6,7,8,9,10],
	graphData = {
	'rent' : (l,country) => {

		return {
			data : {
				labels : getGraphLabels(calculationYears),
				datasets : [{
					backgroundColor: "#0b4163",
					borderColor: "#0b4163",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'end',
						anchor: 'start'
					},
					label: `${l('CUMANNUALRENT')}`
				},{
					backgroundColor: "#3778c2",
					borderColor: "#3778c2",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('ANNUALFREECASHFLOW')}`
				}]
			},
			options: getGraphOptions(country,l)
		}
	},
	'incomeExpense' : (l,country) => {

		return {
			type : 'MultiAxisBar',
			data : {
				labels : [],
				datasets : [{
					backgroundColor: "#0b4163",
					borderColor: "#0b4163",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'end',
						anchor: 'start'
					},
					label: `${l('TOTALINCOME')}`
				},{
					backgroundColor: "#0b97d6",
					borderColor: "#0b97d6",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('TOTALEXPENSES')}`
				}]
			},
			options: getGraphOptions(country,l)
		}
	},
	'incomeExpenseRatio' : (l,country) => {
		return {
			type : 'LineWithoutLayer',
			data : {
				labels : [],
				datasets : [{
					backgroundColor: "rgba(75,159,225,0.5)",
					borderColor: "rgba(75,159,225,0.7)",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					fill: true,
					dataLabels: {
						align: 'end',
						anchor: 'start'
					},
					label: `${l('INCOMEEXPENSERATIO')}`
				}]
			},
			options: getPercentageOptions(l)
		}
	},
	'expenses' : (l,country) => {

		return {
			type : 'LineWithoutLayer',
			data : {
				labels : [],
				datasets : [{
					backgroundColor: "#44c9d2",
					borderColor: "#44c9d2",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('LEASINGFEES')}`
				},{
					backgroundColor: "#0b97d5",
					borderColor: "#0b97d5",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('MANAGEMENTFEES')}`
				},{
					backgroundColor: "#0b4163",
					borderColor: "#0b4163",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('PROPERTYMAINTENANCE')}`
				},{
					backgroundColor: "#79002b",
					borderColor: "#79002b",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('OWNERASSOCIATIONFEE')}`
				},{
					backgroundColor: "#ca202d",
					borderColor: "#ca202d",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('PROPERTYTAXES')}`
				},{
					backgroundColor: "rgb(22,119,110)",
					borderColor: "rgb(22,119,110)",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('PROPERTYINSURANCE')}`
				},{
					backgroundColor: "#ff9100",
					borderColor: "#ff9100",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('OTHEREXPENSES')}`
				}]
			},
			options: {
				...getGraphOptions(country,l),
				legend : {
					position: 'right',
					onHover: function(e) {
						e.target.style.cursor = 'pointer';
					}
				}
			}
		}
	},
	'expenseBreakdown' : (l,country) => {
		return {
			type : 'Pie',
			data : {
				labels : [],
				datasets : [{
					backgroundColor: ["#30415d","#28559a","#3778c2","#4b9fe1","#63bce5","#7ed5ea","#b3dded"],
					data: []
				}]
			},
			options : {
				tooltips: {
					callbacks: {
						label: ''
					}
				},
				legend : {
					labels : {
						fontStyle : 'normal'
					},
					position: 'right',
					onClick: function(e,legendItem) {
						e.stopPropagation();
					}
				}
			}
		}
	},
	'income' : (l,country) => {

		return {
			type : 'LineWithoutLayer',
			data : {
				labels : [],
				datasets : [{
					// backgroundColor: "rgba(98,203,49,0.5)",
					// borderColor: "rgba(98,203,49,0.7)",
					backgroundColor: "rgba(40,85,154,0.5)",
					borderColor: "rgba(40,85,154,0.7)",

					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					fill: true,
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('NETOPERATINGINCOME')}`
				},
				{
					backgroundColor: "rgba(75,159,225,0.5)",
					borderColor: "rgba(75,159,225,0.7)",
					// backgroundColor: "rgba(22,119,110,0.3)",
					// borderColor: "rgb(22,119,110)",
					borderWidth: 1,
					pointRadius: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					fill: true,
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('GROSSRENTREVENUE')}`
				}]
			},
			options: {
				...getGraphOptions(country,l),
				legend : {
					position: 'bottom',
					
					labels: {
						boxWidth : 40
					}
				}
			}
		}
	},
	'equity' : (l,country) => {

		return {
			data : {
				labels : getGraphLabels(calculationYears),
				datasets : [{
					backgroundColor: "#008373",
					borderColor: "#008373",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'end',
						anchor: 'start'
					},
					label: `${l('CUMAPPRECIATION')}`
				},{
					backgroundColor: "#44c9d2",
					borderColor: "#44c9d2",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'start',
						anchor: 'end'
					},
					label: `${l('CUMPRINCIPALPAID')}`
				}]
			},
			options: getGraphOptions(country,l)
		}
	},
	'totalGainLeverage' : (l,country) => {
		return {
			data : {
				labels : getGraphLabels(calculationYears),
				datasets : [{
					backgroundColor: "#0f2557",
					borderColor: "#0f2557",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('CUMCASHFLOW')}`
				},{
					backgroundColor: "#3778c2",
					borderColor: "#3778c2",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'end',
						anchor: 'start'
					},
					label: `${l('CUMAPPRECIATION')}`
				},{
					backgroundColor: "#63bce5",
					borderColor: "#63bce5",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'start',
						anchor: 'end'
					},
					label: `${l('CUMPRINCIPALPAID')}`
				}]
			},
			options: getGraphOptions(country,l)
		}
	},
	'totalGain' : (l,country) => {
		return {
			data : {
				labels : getGraphLabels(calculationYears),
				datasets : [{
					backgroundColor: "rgba(15, 37, 87, 0.9)",
					borderColor: "rgba(15, 37, 87, 0.9)",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('CUMCASHFLOW')}`
				},{
					backgroundColor: "#3778c2",
					borderColor: "#3778c2",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'end',
						anchor: 'start'
					},
					label: `${l('CUMAPPRECIATION')}`
				}]
			},
			options: getGraphOptions(country,l)
		}
	},
	'caprateGrowth' : (l,country) => {

		return {
			data : {
				labels : getGraphLabels(calculationYears),
				datasets : [{
					backgroundColor: "#0b4163",
					borderColor: "#0b4163",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'end',
						anchor: 'start'
					},
					label: `${l('CAPRATE')}`
				}]
			},
			options: getPercentageOptions(l)
		}
	},
	'irr' : (l,country) => {

		return {
			data : {
				labels : getGraphLabels(irrCalculationYears),
				datasets : [{
					backgroundColor: "#0b4163",
					borderColor: "#0b4163",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'end',
						anchor: 'start'
					},
					label: `${l('IRR')}`
				}]
			},
			options: getPercentageOptions(l)
		}
	},
	'cashoncashGrowth' : (l,country) => {

		return {
			data : {
				labels : getGraphLabels(calculationYears),
				datasets : [{
					backgroundColor: "#0b97d6",
					borderColor: "#0b97d6",
					borderWidth: 1,
					data: [],
					dataLabels: {
						align: 'center',
						anchor: 'center'
					},
					formatter: function(value) {
						return value % 1 ? value.toFixed(2) : value;
					},
					label: `${l('CASHONCASHRETURNPERCENTAGE')}`
				}]
			},
			options: getPercentageOptions(l)
		}
	}
};

function getPercentageOptions(l) {
	return {
		tooltips: {
			callbacks: {
				label: (t,d) => {
					let xLabel,yLabel;
					xLabel = d.datasets[t.datasetIndex].label;
					yLabel = `${t.yLabel.toFixed(2)}%`;
					return xLabel + ': ' + yLabel;
				}
			},
			mode : 'label'
		},
		plugins: {
			datalabels: {
				color: 'white',
				display: false,
				font: {
					weight: 'bold'
				},
				formatter: (value) => {
					return `${value}%`;
				}
			}
		},
		scales : {
			xAxes : [{
				scaleLabel : {
					display : false,
					labelString : l('YEAR')
				},
				ticks : {
					fontColor : '#424242'
				}
			}],
			yAxes : [{
				scaleLabel : {
					display : false
				},
				ticks: {
					callback: (value) => {
						return `${value}%`
					},
					fontColor : '#424242'
				}
			}]
		},
		legend : {
			display: false
		}
	}
}

function getGraphOptions(country,l) {
	return {
		tooltips: {
			callbacks: {
				label: (t,d) => {
					return tooltipLabel(t,d,country);
				}
			}
		},
		plugins: {
			datalabels: {
				color: 'white',
				display: false,
				font: {
					weight: 'bold'
				},
				formatter: (value) => {
					return currencyFormat(value,country);
				}
			}
		},
		scales : {
			xAxes : [{
				scaleLabel : {
					display : false,
					labelString : l('YEAR')
				},
				ticks : {
					fontColor : '#424242'
				}
			}],
			yAxes : [{
				scaleLabel : {
					display : false,
					labelString : l('RATEOFRETURN')
				},
				ticks: {
					callback: (value) => {
						return currencyFormat(value,country);
					},
					fontColor : '#424242'
				}
			}]
		},
		legend : {
			position: 'bottom'
		}
	}
}

function tooltipLabel(t, d,country) {
	let xLabel,yLabel;
	const currencySymbol = getValueByLocale(country,'currencySymbol');
	const currencyFormat = getValueByLocale(country,'currencyFormat');
	xLabel = d.datasets[t.datasetIndex].label;
	yLabel = `${currencySymbol}${formatCurrency(t.yLabel,1,currencyFormat)}`;
	return xLabel + ': ' + yLabel;
}

function currencyFormat(value,country) {
	const currencySymbol = getValueByLocale(country,'currencySymbol');
	const currencyFormat = getValueByLocale(country,'currencyFormat');
	return `${currencySymbol}${formatCurrency(value,2,currencyFormat)}`
}

function getGraphLabels(calculationYears) {
	const currentYear = (new Date()).getFullYear();
	let labels = [];
	calculationYears.map(year => {
		labels.push(currentYear+year);
	});
	return labels;
}

export function getGraphData(graph,l,country) {
	return graphData[graph](l,country);
}

