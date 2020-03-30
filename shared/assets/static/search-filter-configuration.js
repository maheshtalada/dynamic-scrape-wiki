
const commonPropertyConfig = {
	"caprate" : {
		"label" : "CAPRATE",
		"type" : "SingleSelectBoxes",
		"component" : "SingleSelectBoxes",
		"order" : 3,
		"optionFormatter" : "capRateFacetOptions",
		"optionValues": [9,8,7,6,5],
		"active" : true,
		"filterKey" : "caprate",
		"classes" : "",
		"data" : {
			"valueHandler" : "convertRangeToValues"
		},
		"conditionalRenderHandler" : "cashPurchaseCheck",
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "Click",
			"label" : "caprate"
		}
	},
	"cashoncashreturn" : {
		"label" : "CASHONCASHRETURNPERCENTAGE",
		"type" : "SingleSelectBoxes",
		"component" : "SingleSelectBoxes",
		"order" : 3,
		"optionFormatter" : "capRateFacetOptions",
		"optionValues": [6,5,4,3,2,1],
		"active" : true,
		"filterKey" : "cashoncashreturn",
		"classes" : "",
		"data" : {
			"valueHandler" : "convertRangeToValues"
		},
		"conditionalRenderHandler" : "leveragedPurchaseCheck",
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "Click",
			"label" : "cashoncashreturn"
		}
	},
	"city" : {
		"label" : "CITY",
		"type" : "CheckboxList",
		"component" : "MultiSelect",
		"order" : 20,
		"active" : true,
		"filterKey" : "city",
		"classes" : "",
		"itemCountToShow" : 10,
		"isTranslationRequired" : false,
		"data" : {
			"valueHandler" : "cityNameFormatter"
		},
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "click",
			"label" : "city"
		}
	},
	"zipcode" : {
		"label" : "ZIPCODE",
		"type" : "CheckboxList",
		"component" : "MultiSelect",
		"order" : 21,
		"active" : true,
		"filterKey" : "zipcode",
		"classes" : "",
		"itemCountToShow" : 10,
		"isTranslationRequired" : false,
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "click",
			"label" : "zipcode"
		}
	},
	"locality" : {
		"label" : "LOCALITY",
		"type" : "CheckboxList",
		"component" : "MultiSelect",
		"order" : 22,
		"active" : true,
		"filterKey" : "locality",
		"classes" : "",
		"itemCountToShow" : 10,
		"isTranslationRequired" : false,
		"legalInfo" : {
			"siteUrl" : "https://www.zillow.com/howto/api/neighborhood-boundaries.htm",
			"imageUrl" : "https://www.zillowstatic.com/vstatic/b20c067/static/logos/Zillow_Logo_HoodsProvided_RightAligned.gif",
			"imageAlt" : "zillow"
		},
		"data" : {
			"valueHandler" : "cityNameFormatter"
		},
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "click",
			"label" : "locality"
		}
	},
	"zipcode_locality" : {
		"label" : "LOCALITY",
		"type" : "CheckboxList",
		"component" : "MultiSelect",
		"order" : 3,
		"active" : true,
		"filterKey" : "zipcode_locality",
		"classes" : "",
		"itemCountToShow" : 10,
		"isTranslationRequired" : false
	},
	"investmentcategories" : {
		"label" : "CATEGORY",
		"type" : "SelectDropdown",
		"component" : "SelectDropdown",
		"optionFormatter" : "keyCountOptions",
		"order" : 2,
		"active" : true,
		"filterKey" : "investmentcategories",
		"classes" : ""
	},
	"subtype" : {
		"label" : "PROPERTYSUBTYPE",
		"type" : "CheckboxList",
		"component" : "MultiSelect",
		"order" : 6,
		"active" : true,
		"filterKey" : "subtype",
		"classes" : "",
		"data" : {},
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "Click",
			"label" : "Property subtype"
		}
	},
	"bedroom" : {
		"label" : "BEDROOM",
		"type" : "SelectBoxes",
		"component" : "SelectBoxes",
		"order" : 7,
		"max": 7,
		"active" : true,
		"filterKey" : "bedroom",
		"classes" : "",
		"data" : {
			"valueHandler" : "convertSelectBoxValues"
		},
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "Click",
			"label" : "Bedroom"
		}
	},
	"washroom" : {
		"label" : "BATHROOM",
		"type" : "SingleSelectBoxes",
		"component" : "SingleSelectBoxes",
		"order" : 8,
		"max" : 4,
		"optionFormatter" : "washroomFacetOptions",
		"optionValues": [1,1.5,2,2.5,3,4],
		"active" : true,
		"filterKey" : "washroom",
		"classes" : "",
		"data" : {
			"valueHandler" : "convertSelectBoxValues"
		},
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "Click",
			"label" : "Bathroom"
		}
	},
	"rpsf" : {
		"label" : "RATEPERSQUAREFEET",
		"type" : "RangeSelect",
		"component" : "RangeSelect",
		"order" : 24,
		"active" : true,
		"filterKey" : "rpsf",
		"classes" : "",
		"data" : {
			"stepsCount" : 4,
			"min": 5,
			"max": 50,
			"stepSize": 10,
			"localeKey" : "currencyFormat",
			"type" : "price",
			"valueHandler" : "convertRangeToValues",
			"valueFormatter" : "priceFormatter"
		},
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "click",
			"label" : "Rate per sqft"
		}
	},
	"rentalproperty" : {
		"label" : "SHOWRENTALPROPERTY",
		"component" : "Switch",
		"order" : 23,
		"filterKey" : "rentalproperty",
		"data" : {
			"default" : "",
			"valueHandler" : "convertBooleanToYesNo"
		}
	},
	"vacationrental" : {
		"label" : "SHOWVACATIONRENTALS",
		"component" : "Switch",
		"order" : 15,
		"filterKey" : "vacationrental",
		"data" : {
			"default" : "",
			"valueHandler" : "convertBooleanToYesNo"
		}
	},
	"creationtime" : {
		"label" : "DAYSONMARKET",
		"type" : "SingleSelectBoxes",
		"component" : "SingleSelectBoxes",
		"order" : 14,
		"optionFormatter" : "daysOnMarketOptionsFormat",
		"optionValues": {
			"lowRange" : [7,30],
			"highRange" : [30,90,180]
		},
		"active" : true,
		"filterKey" : "creationtime",
		"classes" : "",
		"data" : {
			"valueHandler" : "convertRangeNumberOfDays"
		},
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "click",
			"label" : "Days on market"
		}
	},
	"constructionstatus" : {
		"label" : "CONSTRUCTIONSTATUS",
		"type" : "CheckboxList",
		"component" : "MultiSelect",
		"order" : 12,
		"active" : true,
		"filterKey" : "constructionstatus",
		"classes" : "",
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "Click",
			"label" : "Construction status"
		}
	},
	"age" : {
		"label" : "BUILDINGAGE",
		"type"  : "RangeSelect",
		"component" : "RangeSelect",
		"order" : 13,
		"active" : true,
		"filterKey" : "age",
		"classes" : "",
		"data" : {
			"stepsCount" : 5,
			"min": 0,
			"max": 50,
			"stepSize": 5,
			"valueHandler" : "convertRangeToValues"
		},
		"analyticsData" : {
			"category" : "Search filters",
			"action" : "click",
			"label" : "Building age"
		}
	},
	"propertytype" : {
		"label" : "PROPERTYTYPE",
		"type"  : "NestedCheckboxList",
		"component" : "NestedCheckboxList",
		"order" : 3,
		"active" : true,
		"filterKey" : "propertytype",
		"classes" : "",
		"data" : {
			"children" : ["subtype"]
		}
	},
	"leasetypes" : {
		"label" : "LEASETYPES",
		"type" : "CheckboxList",
		"component" : "CheckboxList",
		"order" : 19,
		"active" : true,
		"filterKey" : "leasetypes",
		"classes" : ""
	},
	"bed" : {
		"label" : "NUMBEROFBEDS",
		"type"  : "RangeSlider",
		"component" : "RangeSlider",
		"order" : 20,
		"active" : true,
		"filterKey" : "bed",
		"classes" : "",
		"data" : {
			"step": 1,
			"valueHandler" : "convertRangeToValues"
		}
	},
	"seat" : {
		"label" : "NUMBEROFSEATS",
		"type"  : "RangeSlider",
		"component" : "RangeSlider",
		"order" : 21,
		"active" : true,
		"filterKey" : "seat",
		"classes" : "",
		"data" : {
			"step": 1,
			"valueHandler" : "convertRangeToValues"
		}
	},
	"rentalcategory" : {
		"label" : "RENTALCATEGORY",
		"type" : "RadioList",
		"component" : "RadioList",
		"order" : 22,
		"active" : true,
		"filterKey" : "rentalcategory",
		"classes" : ""
	},
};

module.exports = {
	"property_search_facets" : {
		"for-sale" : Object.assign({},commonPropertyConfig,{
			"purchasetype": {
				"label": "PURCHASE TYPE",
				"component": "SearchPurchaseType",
				"filterKey": "purchasetype",
				"isStaticComponent" : true,
				"order": 2,
				"isAnyRequired": false,
				"options": [
					{
						"label" : "CASHPURCHASE",
						"value" : "cash"
					},
					{
						"label" : "LEVERAGEDPURCHASE",
						"value" : "leveraged"
					}
				]
			},
			"price" : {
				"label" : "PRICERANGE",
				"type" : "RangeSelect",
				"component" : "RangeSelect",
				"order" : 5,
				"active" : true,
				"filterKey" : "price",
				"classes" : "",
				"data" : {
					"stepsCount" : 10,
					"localeKey" : "currencyFormat",
					"type" : "price",
					"min" : 50000,
					"max" : 1000000,
					"stepSize": 50000,
					"valueHandler" : "convertPriceRange",
					"valueFormatter" : "priceFormatter"
				},
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "click",
					"label" : "price"
				}
			},
			"area" : {
				"label" : "SQUAREFOOTAGE",
				"type" : "RangeSelect",
				"component" : "RangeSelect",
				"order" : 9,
				"active" : true,
				"filterKey" : "area",
				"classes" : "",
				"data" : {
					"type": "area",
					"min": 1000,
					"max": 10000,
					"stepSize": 1000,
					"stepsCount": 5,
					"valueHandler" : "convertAreaRange",
					"valueFormatter" : "areaFormatter"
				},
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "click",
					"label" : "area"
				}
			},
			"radius" : {
				"label" : "DISTANCE",
				"type"  : "SliderScale",
				"component" : "SliderScale",
				"order" : 23,
				"active" : true,
				"filterKey" : "radius",
				"classes" : "",
				"data" : {
					"step": 50,
					"min" : 0,
					"minthreshold" : 2,
					"max" : 50,
					"default": 5,
					"uom" : "searchRadiusUnits"
				},
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "Click",
					"label" : "radius"
				}
			},
			"features" : {
				"label" : "EXCLUDE",
				"type"  : "Wrapper",
				"component" : "Wrapper",
				"order" : 10,
				"active" : true,
				"classes" : "exclude",
				"filterKey" : "features",
				"children" : {
					"haspool": {
						"label": "HAS_POOL",
						"type": "Checkbox",
						"component": "Checkbox",
						"optionFormatter": "booleanOptionsFormat",
						"active": true,
						"filterKey": "haspool",
						"classes": "",
						"data": {
							"valueHandler": "convertBooleanToYesNo"
						},
						"analyticsData": {
							"category": "Search filters",
							"action": "select",
							"label": "Has Pool"
						}
					},
					"hashoa": {
						"label": "HAS_HOA",
						"type": "Checkbox",
						"component": "Checkbox",
						"optionFormatter": "booleanOptionsFormat",
						"active": true,
						"filterKey": "hashoa",
						"classes": "",
						"data": {
							"valueHandler": "convertBooleanToYesNo"
						},
						"analyticsData": {
							"category": "Search filters",
							"action": "select",
							"label": "Has HOA"
						}
					}
				}
			}
		}),
		"recommend" : Object.assign({},commonPropertyConfig,{
			"guidedSearchCriteria": {
				"label": "",
				"filterKey": "guidedSearchCriteria",
				"component": "ModifyGuidedSearch",
				"isStaticComponent" : true,
				"order": 1,
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "click",
					"label" : "Refine Guided Search"
				}
			},
			"price" : {
				"label" : "PRICERANGE",
				"type" : "RangeSelect",
				"component" : "RangeSelect",
				"order" : 5,
				"active" : true,
				"filterKey" : "price",
				"classes" : "",
				"data" : {
					"stepsCount" : 10,
					"localeKey" : "currencyFormat",
					"type" : "price",
					"min" : 50000,
					"max" : 1000000,
					"stepSize": 50000,
					"valueHandler" : "convertPriceRange",
					"valueFormatter" : "priceFormatter"
				},
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "click",
					"label" : "price"
				}
			},
			"area" : {
				"label" : "SQUAREFOOTAGE",
				"type" : "RangeSelect",
				"component" : "RangeSelect",
				"order" : 12,
				"active" : true,
				"filterKey" : "area",
				"classes" : "",
				"data" : {
					"type": "area",
					"min": 1000,
					"max": 10000,
					"stepSize": 1000,
					"stepsCount": 5,
					"valueHandler" : "convertAreaRange",
					"valueFormatter" : "areaFormatter"
				},
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "click",
					"label" : "area"
				}
			}
		}),
		"for-rent" : Object.assign({},commonPropertyConfig,{
			"price" : {
				"label" : "PRICERANGE",
				"type" : "RangeSelect",
				"component" : "RangeSelect",
				"order" : 5,
				"active" : true,
				"filterKey" : "price",
				"classes" : "",
				"data" : {
					"stepsCount" : 5,
					"localeKey" : "currencyFormat",
					"type" : "price",
					"min" : 1000,
					"max" : 20000,
					"stepSize": 1000,
					"valueHandler" : "convertPriceRange",
					"valueFormatter" : "priceFormatter"
				},
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "click",
					"label" : "price"
				}
			},
			"area" : {
				"label" : "SQUAREFOOTAGE",
				"type" : "RangeSelect",
				"component" : "RangeSelect",
				"order" : 12,
				"active" : true,
				"filterKey" : "area",
				"classes" : "",
				"data" : {
					"type": "area",
					"min": 500,
					"max": 10000,
					"stepSize": 1500,
					"stepsCount": 5,
					"valueHandler" : "convertAreaRange",
					"valueFormatter" : "areaFormatter"
				},
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "click",
					"label" : "area"
				}
			},
			"radius" : {
				"label" : "DISTANCE",
				"type"  : "SliderScale",
				"component" : "SliderScale",
				"order" : 23,
				"active" : true,
				"filterKey" : "radius",
				"classes" : "",
				"data" : {
					"step": 50,
					"min" : 0,
					"minthreshold" : 2,
					"max" : 50,
					"default": 5,
					"uom" : "searchRadiusUnits"
				},
				"analyticsData" : {
					"category" : "Search filters",
					"action" : "Click",
					"label" : "radius"
				}
			}
		})
	},
	"other_services_search_facets" : {
		"professional" : {
			"radius" : {
				"label" : "DISTANCE",
				"type"  : "Slider",
				"component" : "Slider",
				"order" : 5,
				"active" : true,
				"filterKey" : "radius",
				"classes" : "",
				"data" : {
					"step": 5,
					"min" : 2,
					"max" : 100,
					"default": 5,
					"uom" : "searchRadiusUnits"
				}
			},
			"datatype": {
				"label": "TYPE",
				"type": "RadioList",
				"component" : "RadioList",
				"order" : 1,
				"active" : true,
				"filterKey" : "datatype",
				"classes" : "",
				"data" : {}
			},
			"professions": {
				"label": "PROFESSIONS",
				"type": "CheckboxList",
				"component" : "CheckboxList",
				"order" : 2,
				"active" : true,
				"filterKey" : "professions",
				"classes" : "",
				"data" : {}
			},
			"years": {
				"label": "YEARS",
				"type": "RangeSlider",
				"component" : "RangeSlider",
				"order" : 3,
				"active" : true,
				"filterKey" : "years",
				"classes" : "",
				"data" : {
					"step" : 1,
					"valueHandler" : "convertRangeToValues"
				}
			},
			"areas-locality": {
				"label": "AREAS",
				"type": "CheckboxList",
				"component" : "CheckboxList",
				"order" : 4,
				"active" : true,
				"filterKey" : "areas-locality",
				"classes" : "",
				"data" : {}
			}
		},
		"realtor" : {
			"datatype": {
				"label": "TYPE",
				"type": "RadioList",
				"component" : "RadioList",
				"order" : 1,
				"active" : true,
				"filterKey" : "datatype",
				"classes" : "",
				"data" : {}
			},
			"specialties" : {
				"label" : "SPECIALTIES",
				"type"  : "CheckboxList",
				"component" : "MultiSelect",
				"order" : 2,
				"active" : true,
				"filterKey" : "specialties",
				"classes" : "",
				"data" : {}
			},
			"radius" : {
				"label" : "DISTANCE",
				"type"  : "SliderScale",
				"component" : "SliderScale",
				"order" : 6,
				"active" : true,
				"filterKey" : "radius",
				"classes" : "",
				"data" : {
					"step": 50,
					"min" : 0,
					"minthreshold" : 2,
					"max" : 50,
					"default": 5,
					"uom" : "searchRadiusUnits"
				}
			},
			"areas-locality" : {
				"label" : "AREAS",
				"type"  : "CheckboxList",
				"component" : "MultiSelect",
				"order" : 4,
				"active" : true,
				"filterKey" : "areas-locality",
				"classes" : "",
				"data" : {}
			},
			"years" : {
				"label" : "YEARSOFEXPERIENCE",
				"type"  : "Slider",
				"component" : "Slider",
				"order" : 5,
				"active" : true,
				"filterKey" : "years",
				"classes" : "",
				"data" : {
					"step": 5,
					"min" : 1,
					"max" : 60,
					"default": 1
				}
			}
		},
		"content" : {
			"datatype": {
				"label": "TYPE",
				"type": "RadioList",
				"component" : "RadioList",
				"order" : 1,
				"active" : true,
				"filterKey" : "datatype",
				"classes" : "",
				"data" : {}
			},
			"answeredstatus": {
				"label": "ANSWEREDSTATUS",
				"type": "RadioList",
				"component" : "RadioList",
				"order" : 2,
				"active" : true,
				"filterKey" : "answeredstatus",
				"classes" : "",
				"data" : {}
			},
			"category": {
				"label": "CATEGORY",
				"type": "CheckboxList",
				"component" : "CheckboxList",
				"order" : 3,
				"active" : true,
				"filterKey" : "category",
				"classes" : "",
				"data" : {}
			}
		}
	}
};
