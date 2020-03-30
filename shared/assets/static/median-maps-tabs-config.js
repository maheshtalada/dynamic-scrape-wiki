import SiteConfig from '../../config';
const {mapServerEndpoints} = SiteConfig;
const ORANGE = "#7ed5ea",
	AMBER = "#62a9c5",
	LIGHT_GREEN = "#467da0",
	GREEN = "#2a517b",
	DARKER_GREEN = "#0f2557";

export default {
	"tabs": [
		{
			"key": "medianPriceTab",
			"label": "MEDIANSALEPRICETAB",
			"endpoint": mapServerEndpoints.medianprice,
			"mapSearchType": "sale-price",
			"mapDescription": "median listing prices",
			"legendBox": {
				"title": "Transaction volume",
				"note": "Transaction volume in Billions",
				"colorCodes": {
					"1": ORANGE,
					"2": AMBER,
					"3": LIGHT_GREEN,
					"4": GREEN,
					"5": DARKER_GREEN
				},
				"dataConfig": {
					"displayValueFormatter": "priceFormatter",
					"higherEndFirst": true
				},
				"legends": [
					{
						"formatter": "endRangeFormatter",
						"type": "high",
						"colorCode": ORANGE,
						"displayValue": ["sale_price_range_4"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": AMBER,
						"displayValue": ["sale_price_range_3", "sale_price_range_4"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": LIGHT_GREEN,
						"displayValue": ["sale_price_range_2", "sale_price_range_3"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": GREEN,
						"displayValue": ["sale_price_range_1", "sale_price_range_2"]
					},
					{
						"formatter": "endRangeFormatter",
						"type": "low",
						"colorCode": DARKER_GREEN,
						"displayValue": ["sale_price_range_1"]
					}
				]
			},
			"tooltip": "MEDIANSALEPRICETABTOOLTIP",
			"dataBox": {
				"body": [
					{
						"displayValue": "median",
						"displayLabel": "MEDIANLISTINGPRICE",
						"formatter": "priceFormatter"
					}
				],
				"footer": {
					"displayValue": "listingCount",
					"displayLabel": "PROPERTIESFORSALECOUNT"
				}
			},
			"defaultQueryParam": {'investmentcategories': 'all'}
		},
		{
			"label": "LEVERAGEDPURCHASE",
			"key": "cashOncashTab",
			"mapSearchType": "leveraged-purchase",
			"mapDescription": "median cash on cash potential",
			"endpoint": mapServerEndpoints.cashoncash,
			"hidden": true,
			"legendBox": {
				"title": "CASHONCASHRETURNPERCENTAGE",
				"note": "CASHONCASHLEGENDSNOTE",
				"colorCodes": {
					"1": ORANGE,
					"2": AMBER,
					"3": LIGHT_GREEN,
					"4": GREEN,
					"5": DARKER_GREEN
				},
				"dataConfig": {
					"displayValueFormatter": "percentFormatter"
				},
				"legends": [
					{
						"formatter": "endRangeFormatter",
						"type": "low",
						"colorCode": ORANGE,
						"displayValue": ["cash_on_cash_range_1"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": AMBER,
						"displayValue": ["cash_on_cash_range_1", "cash_on_cash_range_2"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": LIGHT_GREEN,
						"displayValue": ["cash_on_cash_range_2", "cash_on_cash_range_3"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": GREEN,
						"displayValue": ["cash_on_cash_range_3", "cash_on_cash_range_4"]
					},
					{
						"formatter": "endRangeFormatter",
						"type": "high",
						"colorCode": DARKER_GREEN,
						"displayValue": ["cash_on_cash_range_4"]
					}
				]
			},
			"tooltip": "CASHONCASHTABTOOLTIP",
			"dataBox": {
				"footer": {
					"displayValue": "listingCount",
					"displayLabel": "PROPERTIESFORSALECOUNT"
				}
			},
			"defaultQueryParam": {
				"purchasetype": "leveraged",
				"investmentcategories": "highcashoncash"
			}
		},
		{
			"key": "popularSearchesTab",
			"label": "POPULARSEARCHES",
			"tooltip": "POPULARSEARCHTABTOOLTIP",
			"options": [
				{
					"label": "RENTALUNIT",
					"tooltip": "TURNKEYTABTOOLTIP",
					"value": {
						"mapSearchType": "turn-key-properties",
						"mapDescription": "turn key property counts",
						"key": "turnkeyTab",
						"endpoint": mapServerEndpoints.turnkey,
						"legendBox": {
							"title": "RENTALUNIT",
							"note": "TURNKEYLEGENDNOTE",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "defaultFormatter"
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": ORANGE,
									"displayValue": ["rented_unit_count_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["rented_unit_count_range_1", "rented_unit_count_range_2"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["rented_unit_count_range_2", "rented_unit_count_range_3"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["rented_unit_count_range_3", "rented_unit_count_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": DARKER_GREEN,
									"displayValue": ["rented_unit_count_range_4"]
								}
							]
						},
						"tooltip": "TURNKEYTABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "RENTALUNIT",
									"formatter": "defaultFormatter"
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {"investmentcategories": "rentalunit"}
					}
				},
				{
					"label": "VALUEADDED",
					"tooltip": "FIXERUPPERTABTOOLTIP",
					"value": {
						"mapSearchType": "fixer-properties",
						"mapDescription": "fixer upper property counts",
						"key": "fixerUpperTab",
						"endpoint": mapServerEndpoints.fixerupper,
						"legendBox": {
							"title": "Transactions",
							"note": "# of transactions",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "defaultFormatter"
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": ORANGE,
									"displayValue": ["fixer_upper_count_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["fixer_upper_count_range_1", "fixer_upper_count_range_2"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["fixer_upper_count_range_2", "fixer_upper_count_range_3"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["fixer_upper_count_range_3", "fixer_upper_count_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": DARKER_GREEN,
									"displayValue": ["fixer_upper_count_range_4"]
								}
							]
						},
						"tooltip": "FIXERUPPERTABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "VALUEADDED",
									"formatter": "defaultFormatter"
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {"investmentcategories": "valueadded"}
					}
				}
			]
		},
		{
			"key": "demographicsTab",
			"label": "DEMOGRAPHICS",
			"tooltip": "DEMOGRAPHICSTABTOOLTIP",
			"options": [
				{
					"label": "RENTALUNITRATIO",
					"value": {
						"mapSearchType": "rental-unit-ratio",
						"mapDescription": "ratio of rental units to owner occupied units",
						"endpoint": mapServerEndpoints.rentedunits,
						"key": "rentalUnitsTab",
						"legendBox": {
							"title": "RENTALUNITRATIO",
							"note": "RENTALUNITLEGENDSNOTE",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "percentFormatter",
								"toFix": 0
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": ORANGE,
									"displayValue": ["rented_units_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["rented_units_range_1", "rented_units_range_2"],
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["rented_units_range_2", "rented_units_range_3"],
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["rented_units_range_3", "rented_units_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": DARKER_GREEN,
									"displayValue": ["rented_units_range_4"]
								}
							]
						},
						"tooltip": "RENTEDUNITTABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "RENTALUNITRATIO",
									"formatter": "percentFormatter"
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {'investmentcategories': 'all'}
					}
				},
				{
					"label": "INCOME",
					"value": {
						"mapSearchType": "income",
						"mapDescription": "median income",
						"key": "incomeTab",
						"endpoint": mapServerEndpoints.incomegrowth,
						"legendBox": {
							"title": "INCOME",
							"note": "INCOMELEGENDSNOTE",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "priceFormatter"
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": ORANGE,
									"displayValue": ["income_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["income_range_1", "income_range_2"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["income_range_2", "income_range_3"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["income_range_3", "income_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": DARKER_GREEN,
									"displayValue": ["income_range_4"]
								}
							]
						},
						"tooltip": "INCOMETABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "MEDIANINCOME",
									"formatter": "priceFormatter"
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {'investmentcategories': 'all'}
					}
				},
				{
					"label": "UNEMPLOYMENTGROWTH",
					"value": {
						"mapSearchType": "unemployment",
						"mapDescription": "unemployment rate",
						"key": "unemploymentTab",
						"endpoint": mapServerEndpoints.unemployment,
						"legendBox": {
							"title": "UNEMPLOYMENTGROWTH",
							"note": "UNEMPLOYMENTLEGENDSNOTE",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "percentFormatter",
								"toFix": 0
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": DARKER_GREEN,
									"displayValue": ["unemployment_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["unemployment_range_1", "unemployment_range_2"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["unemployment_range_2", "unemployment_range_3"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["unemployment_range_3", "unemployment_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": ORANGE,
									"displayValue": ["unemployment_range_4"]
								}
							]
						},
						"tooltip": "UNEMPLOYMENTGROWTHTABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "UNEMPLOYMENTGROWTH",
									"formatter": "percentFormatter"
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {'investmentcategories': 'all'}
					}
				},
				{
					"label": "WIDGETPOPULATIONGROWTH",
					"value": {
						"mapSearchType": "population-growth",
						"mapDescription": "population growth",
						"key": "populationGrowthTab",
						"endpoint": mapServerEndpoints.population,
						"legendBox": {
							"title": "WIDGETPOPULATIONGROWTH",
							"note": "POPULATIONLEGENDSNOTE",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "percentFormatter"
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": ORANGE,
									"displayValue": ["population_growth_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["population_growth_range_1", "population_growth_range_2"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["population_growth_range_2", "population_growth_range_3"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["population_growth_range_3", "population_growth_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": DARKER_GREEN,
									"displayValue": ["population_growth_range_4"]
								}
							]
						},
						"tooltip": "WIDGETPOPULATIONGROWTHTABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "WIDGETPOPULATIONGROWTH",
									"formatter": "percentFormatter"
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {'investmentcategories': 'all'}
					}
				},
				{
					"label": "PROPERTYCRIMETAB",
					"value": {
						"mapSearchType": "property-crime",
						"mapDescription": "property crime rate",
						"key": "propertyCrimeTab",
						"endpoint": mapServerEndpoints.propertycrime,
						"legendBox": {
							"title": "PROPERTYCRIMETAB",
							"note": "PROPERTYCRIMELEGENDSNOTE",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "numberFormatter",
								"toFix": 0
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": DARKER_GREEN,
									"displayValue": ["property_crime_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["property_crime_range_1", "property_crime_range_2"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["property_crime_range_2", "property_crime_range_3"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["property_crime_range_3", "property_crime_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": ORANGE,
									"displayValue": ["property_crime_range_4"]
								}
							]
						},
						"tooltip": "PROPERTYCRIMETABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "PROPERTYCRIMEDATA",
									"formatter": "numberFormatter",
									"toFix": 0
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {'investmentcategories': 'all'}
					}
				},
				{
					"label": "VIOLENTCRIMETAB",
					"value": {
						"mapSearchType": "violent-crime",
						"mapDescription": "violent crime rate",
						"key": "violentCrimeTab",
						"endpoint": mapServerEndpoints.violentcrime,
						"legendBox": {
							"title": "VIOLENTCRIMETAB",
							"note": "VIOLENTCRIMELEGENDSNOTE",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "numberFormatter",
								"toFix": 0
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": DARKER_GREEN,
									"displayValue": ["violent_crime_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["violent_crime_range_1", "violent_crime_range_2"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["violent_crime_range_2", "violent_crime_range_3"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["violent_crime_range_3", "violent_crime_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": ORANGE,
									"displayValue": ["violent_crime_range_4"]
								}
							]
						},
						"tooltip": "VIOLENTCRIMETABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "VIOLENTCRIMEDATA",
									"formatter": "numberFormatter",
									"toFix": 0
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {'investmentcategories': 'all'}
					}
				},
				{
					"label": "COMMUTETIME",
					"value": {
						"mapSearchType": "commute-time",
						"mapDescription": "commute time to work",
						"key": "commuteTimeTab",
						"endpoint": mapServerEndpoints.commute,
						"legendBox": {
							"title": "COMMUTETIME",
							"note": "COMMUTETIMELEGENDSNOTE",
							"colorCodes": {
								"1": ORANGE,
								"2": AMBER,
								"3": LIGHT_GREEN,
								"4": GREEN,
								"5": DARKER_GREEN
							},
							"dataConfig": {
								"displayValueFormatter": "defaultFormatter",
								"postFix": "MINUTES"
							},
							"legends": [
								{
									"formatter": "endRangeFormatter",
									"type": "low",
									"colorCode": DARKER_GREEN,
									"displayValue": ["commute_time_range_1"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": GREEN,
									"displayValue": ["commute_time_range_1", "commute_time_range_2"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": LIGHT_GREEN,
									"displayValue": ["commute_time_range_2", "commute_time_range_3"]
								},
								{
									"formatter": "rangeFormatter",
									"colorCode": AMBER,
									"displayValue": ["commute_time_range_3", "commute_time_range_4"]
								},
								{
									"formatter": "endRangeFormatter",
									"type": "high",
									"colorCode": ORANGE,
									"displayValue": ["commute_time_range_4"]
								}
							]
						},
						"tooltip": "COMMUTETIMETABTOOLTIP",
						"dataBox": {
							"body": [
								{
									"displayValue": "median",
									"displayLabel": "COMMUTETIME",
									"formatter": "defaultFormatter",
									"postFix": "MINUTES"
								}
							],
							"footer": {
								"displayValue": "listingCount",
								"displayLabel": "PROPERTIESFORSALECOUNT"
							}
						},
						"defaultQueryParam": {'investmentcategories': 'all'}
					}
				}
			]
		},
		{
			"label": "CAPRATE",
			"key": "capratePotentialTab",
			"mapDescription": "median cap rate potential",
			"mapSearchType": "cash-purchase",
			"endpoint": mapServerEndpoints.caprate,
			"legendBox": {
				"title": "CAPRATE",
				"note": "CAPRATELEGENDSNOTE",
				"colorCodes": {
					"1": ORANGE,
					"2": AMBER,
					"3": LIGHT_GREEN,
					"4": GREEN,
					"5": DARKER_GREEN
				},
				"dataConfig": {
					"displayValueFormatter": "percentFormatter"
				},
				"legends": [
					{
						"formatter": "endRangeFormatter",
						"type": "low",
						"colorCode": ORANGE,
						"displayValue": ["cap_rate_range_1"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": AMBER,
						"displayValue": ["cap_rate_range_1", "cap_rate_range_2"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": LIGHT_GREEN,
						"displayValue": ["cap_rate_range_2", "cap_rate_range_3"]
					},
					{
						"formatter": "rangeFormatter",
						"colorCode": GREEN,
						"displayValue": ["cap_rate_range_3", "cap_rate_range_4"]
					},
					{
						"formatter": "endRangeFormatter",
						"type": "high",
						"colorCode": DARKER_GREEN,
						"displayValue": ["cap_rate_range_4"]
					}
				]
			},
			"tooltip": "CAPRATETABTOOLTIP",
			"dataBox": {
				"footer": {
					"displayValue": "listingCount",
					"displayLabel": "PROPERTIESFORSALECOUNT"
				}
			},
			"defaultQueryParam": {
				"purchasetype": "cash",
				"investmentcategories": "highcashflow"
			}
		},
		{
			"key": "recommendationTab",
			"label": "RECOMMENDATIONTAB",
			"endpoint": mapServerEndpoints.recommendation,
			"mapSearchType": "market-index",
			"mapDescription": "residential market index",
			"legendBox": {
				"title": "RECOMMENDATIONTAB",
				"note": "RECOMMENDATIONLEGENDSNOTE",
				"colorCodes": {
					"1": ORANGE,
					"2": AMBER,
					"3": LIGHT_GREEN,
					"4": GREEN,
					"5": DARKER_GREEN
				},
				"legends": [
					{
						"formatter": "textFormatter",
						"colorCode": ORANGE,
						"displayValue": [1],
						"postFix": "PROPSHUBINDEX1"
					},
					{
						"formatter": "textFormatter",
						"colorCode": AMBER,
						"displayValue": [2]
					},
					{
						"formatter": "textFormatter",
						"colorCode": LIGHT_GREEN,
						"displayValue": [3]
					},
					{
						"formatter": "textFormatter",
						"colorCode": GREEN,
						"displayValue": [4]
					},
					{
						"formatter": "textFormatter",
						"colorCode": DARKER_GREEN,
						"displayValue": [5],
						"postFix": "PROPSHUBINDEX5"
					}
				]
			},
			"tooltip": "RECOMMENDATIONTABTOOLTIP",
			"dataBox": {
				"footer": {
					"displayValue": "listingCount",
					"displayLabel": "PROPERTIESFORSALECOUNT"
				}
			},
			"defaultQueryParam": {
				'investmentcategories': 'highcashflow',
				"purchasetype": "cash",
			}
		}
	].filter(tab => !tab.hidden)
};
