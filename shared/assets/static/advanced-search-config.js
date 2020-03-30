const commonConfig = {
	"propertytype": {
		"label": "PROPERTYTYPESANDSUBTYPES",
		"component": "NestedMultiSelect",
		"data": {
			"children": ["subtype"]
		}
	},
	"subtype": {
		"label": "PROPERTYSUBTYPE",
		"component": "MultiSelect",
		"labelIcon": "Property-Sub-Type"
	},
	"caprate": {
		"label": "CAPRATERANGE",
		"component": "RangeSelect",
		"data": {
			"uom": "%",
			"tooltipInfo": "CAPRATERANGETOOLTIP"
		}
	},
	"leasetypes": {
		"label": "LEASETYPES",
		"component": "MultiSelect",
		"data": {
			"tooltipInfo": "LEASETYPESTOOLTIP"
		}
	},
	"bedroom": {
		"label": "BEDROOM",
		"component": "SelectBoxes",
		"labelIcon": "bed-1",
		"data": {
			"min": 1,
			"max": 6,
			"stepSize": 1
		}
	},
	"washroom": {
		"label": "BATHROOM",
		"component": "SelectBoxes",
		"labelIcon": "bathroom",
		"data": {
			"min": 1,
			"max": 6,
			"stepSize": 1
		}
	},
	"riskreturncategory": {
		"label": "INVESTEMENTCATEGORIES",
		"component": "MultiSelect",
		"data": {
			"tooltipInfo": "INVESTMENTCATEGORIESTOOLTIP"
		}
	},
	"specialties": {
		"label": "SPECIALTIES",
		"component": "MultiSelect"
	},
	"professions": {
		"label": "PROFESSIONS",
		"component": "MultiSelect"
	},
	"datatype": {
		"label": "TYPE",
		"component": "Select"
	},
	"category": {
		"label": "CATEGORY",
		"component": "MultiSelect"
	},
	"q": {
		"label": "ENTERCONTENTSEARCHKEYWORDS",
		"component": "InputField",
		"placeholder": "TYPEYOURKEYWORDS"
	}
};


module.exports = {
	"forinvest": commonConfig,
	"forsale": Object.assign({}, commonConfig, {
		"propertytype": {
			"label": "PROPERTYTYPE",
			"component": "MultiSelect",
			"disable": true,
			"defaultValue": "residential"
		},
		"price": {
			"label": "PRICERANGE",
			"component": "RangeSelect",
			"dataHandler": "getUom",
			"labelIcon": "price-range",
			"data": {
				"stepsCount": 5,
				"min": 50000,
				"max": 1000000,
				"stepSize": 50000,
				"localeKey": "currencyFormat",
				"valueFormatter": "priceFormatter"
			}
		},
		"area": {
			"label": "AREARANGE",
			"component": "RangeSelect",
			"labelIcon": "area-sqft",
			"data": {
				"min": 1000,
				"max": 10000,
				"stepSize": 1000,
				"stepsCount": 5,
				"valueFormatter" : "areaFormatter"
			}
		}
	}),
	"forlease": Object.assign({}, commonConfig, {
		"leasetypes": {
			"label": "LEASETYPES",
			"component": "MultiSelect"
		},
		"propertytype": {
			"label": "PROPERTYTYPE",
			"component": "MultiSelect",
			"disable": true,
			"defaultValue": "residential"
		},
		"price": {
			"label": "PRICERANGE",
			"component": "RangeSelect",
			"dataHandler": "getUom",
			"labelIcon": "price-range",
			"data": {
				"stepsCount": 5,
				"min": 5000,
				"max": 50000,
				"stepSize": 5000,
				"localeKey": "currencyFormat",
				"valueFormatter": "priceFormatter"
			}
		},
		"area": {
			"label": "AREARANGE",
			"component": "RangeSelect",
			"labelIcon": "area-sqft",
			"data": {
				"uom": "SQFT",
				"min": 1000,
				"max": 10000,
				"stepSize": 1000,
				"stepsCount": 5,
				"valueFormatter": "areaFormatter"
			}
		}
	}),
	"realtor": Object.assign({}, commonConfig, {
		"name": {
			"label": "SEARCHBYREALTOR",
			"component": "InputField",
			"placeholder": "SEARCHBYREALTORNAME"
		}
	}),
	"professional": Object.assign({}, commonConfig, {
		"name": {
			"label": "SEARCHBYNAME",
			"component": "InputField",
			"placeholder": "SEARCHBYPROFESSIONALNAME"
		}
	}),
	"content": commonConfig,
	"analyzereturns": Object.assign({}, commonConfig, {
		"bedroom": {
			"label": "NUMBEROFBEDROOMS",
			"component": "Select",
			"labelIcon": "bed-1"
		},
		"propertytype": {
			"label": "PROPERTYTYPE",
			"component": "MultiSelect",
			"disable": true,
			"defaultValue": "residential"
		},
		"subtype": {
			"label": "PROPERTYSUBTYPE",
			"component": "Select",
			"labelIcon": "Property-Sub-Type"
		}
	})
};
