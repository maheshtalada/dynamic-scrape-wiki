export const options = [
	{
		"name": "INVESTMENTPROPERTIES",
		"value": "forinvest",
		"route" : "/search/property/",
		"searchboxplaceholder": "ENTERPREFEREDLOCATION",
		"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
		"headerLabel" : "INVESTMENTPROPERTIESSEARCHHEADER",
		"searchInputLabel" : "PREFERREDLOCATIONS",
		"iconClass": "pe-7s-commercial",
		"isMapRequired" : true,
		"hidden": true
	},
	{
		"group" : {
			"title" : "HIGHCASHFLOW",
			"options" : [
				{
					"name": "CAPRATESEARCHTAB",
					"value": "for-sale-caprate",
					"locqueryrequired" : ["geo-location"],
					"defaultRoute" : "geo-location",
					"route" : {
						"geo-location" : "/residential-investment-properties/for-sale/search/geo-location/{term}",
						"zip-code" : "/residential-investment-properties/for-sale/{state}/search/zip-code/{term}",
						"city" : "/residential-investment-properties/for-sale/{state}/search/city/{term}",
						"neighborhood" : "/residential-investment-properties/for-sale/{state}/search/neighborhood/{term}"
					},
					"defaultQueryParam": {
						"purchasetype": "cash",
						"investmentcategories": "highcashflow"
					},
					"updateCookie" : {
						"cookie": "purchaseType",
						"value": "cash"
					},
					"searchboxplaceholder": "ENTERPREFEREDLOCATION",
					"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
					"headerLabel" : "HOMEFORSALESEARCHHEADER",
					"searchInputLabel" : "PREFERREDLOCATIONS",
					"isMapRequired" : true,
					"iconClass": "pe-7s-residential-2",
					"tooltip": "CAPRATESEARCHTOOLTIP",
					"mapSearchType": "cash-purchase"
				},
				{
					"name": "LEVERAGEDSEARCHTAB",
					"value": "for-sale-leveraged",
					"locqueryrequired" : ["geo-location"],
					"defaultRoute" : "geo-location",
					"route" : {
						"geo-location" : "/residential-investment-properties/for-sale/search/geo-location/{term}",
						"zip-code" : "/residential-investment-properties/for-sale/{state}/search/zip-code/{term}",
						"city" : "/residential-investment-properties/for-sale/{state}/search/city/{term}",
						"neighborhood" : "/residential-investment-properties/for-sale/{state}/search/neighborhood/{term}"
					},
					"defaultQueryParam": {
						"purchasetype": "leveraged",
						"investmentcategories": "highcashoncash"
					},
					"updateCookie" : {
						"cookie": "purchaseType",
						"value": "leveraged"
					},
					"searchboxplaceholder": "ENTERPREFEREDLOCATION",
					"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
					"headerLabel" : "HOMEFORSALESEARCHHEADER",
					"searchInputLabel" : "PREFERREDLOCATIONS",
					"isMapRequired" : true,
					"iconClass": "pe-7s-residential-2",
					"tooltip": "LEVERAGEDSEARCHTOOLTIP",
					"mapSearchType": "leveraged-purchase"
				}
			]
		}
	},
	{
		"group": {
			"title" : "POPULARSEARCHES",
			"options" : [
				{
					"name": "RENTALUNIT",
					"value": "for-sale-turnkey",
					"locqueryrequired" : ["geo-location"],
					"defaultRoute" : "geo-location",
					"route" : {
						"geo-location" : "/residential-investment-properties/for-sale/search/geo-location/{term}",
						"zip-code" : "/residential-investment-properties/for-sale/{state}/search/zip-code/{term}",
						"city" : "/residential-investment-properties/for-sale/{state}/search/city/{term}",
						"neighborhood" : "/residential-investment-properties/for-sale/{state}/search/neighborhood/{term}"
					},
					"defaultQueryParam": {
						"investmentcategories": "rentalunit"
					},
					"searchboxplaceholder": "ENTERPREFEREDLOCATION",
					"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
					"headerLabel" : "HOMEFORSALESEARCHHEADER",
					"searchInputLabel" : "PREFERREDLOCATIONS",
					"isMapRequired" : true,
					"iconClass": "pe-7s-residential-2",
					"tooltip": "TURNKEYTOOLTIP",
					"mapSearchType": "turn-key-properties"
				},
				{
					"name": "VALUEADDED",
					"value": "for-sale-fixup",
					"locqueryrequired" : ["geo-location"],
					"defaultRoute" : "geo-location",
					"route" : {
						"geo-location" : "/residential-investment-properties/for-sale/search/geo-location/{term}",
						"zip-code" : "/residential-investment-properties/for-sale/{state}/search/zip-code/{term}",
						"city" : "/residential-investment-properties/for-sale/{state}/search/city/{term}",
						"neighborhood" : "/residential-investment-properties/for-sale/{state}/search/neighborhood/{term}"
					},
					"defaultQueryParam": {
						"investmentcategories": "valueadded"
					},
					"searchboxplaceholder": "ENTERPREFEREDLOCATION",
					"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
					"headerLabel" : "HOMEFORSALESEARCHHEADER",
					"searchInputLabel" : "PREFERREDLOCATIONS",
					"isMapRequired" : true,
					"iconClass": "pe-7s-residential-2",
					"tooltip": "FIXERUPPERTOOLTIP",
					"mapSearchType": "fixer-properties"
				},
				{
					"name": "MOTIVATEDSELLER",
					"value": "for-sale-motivated-seller",
					"locqueryrequired" : ["geo-location"],
					"defaultRoute" : "geo-location",
					"route" : {
						"geo-location" : "/residential-investment-properties/for-sale/search/geo-location/{term}",
						"zip-code" : "/residential-investment-properties/for-sale/{state}/search/zip-code/{term}",
						"city" : "/residential-investment-properties/for-sale/{state}/search/city/{term}",
						"neighborhood" : "/residential-investment-properties/for-sale/{state}/search/neighborhood/{term}"
					},
					"defaultQueryParam": {
						"investmentcategories": "motivatedseller"
					},
					"searchboxplaceholder": "ENTERPREFEREDLOCATION",
					"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
					"headerLabel" : "HOMEFORSALESEARCHHEADER",
					"searchInputLabel" : "PREFERREDLOCATIONS",
					"isMapRequired" : true,
					"iconClass": "pe-7s-residential-2",
					"tooltip": "MOTIVATEDSELLER_SEARCH_TAB_TOOLTIP",
				},
				{
					"name": "OWNERFINANCED",
					"value": "for-sale-owner-financed",
					"locqueryrequired" : ["geo-location"],
					"defaultRoute" : "geo-location",
					"route" : {
						"geo-location" : "/residential-investment-properties/for-sale/search/geo-location/{term}",
						"zip-code" : "/residential-investment-properties/for-sale/{state}/search/zip-code/{term}",
						"city" : "/residential-investment-properties/for-sale/{state}/search/city/{term}",
						"neighborhood" : "/residential-investment-properties/for-sale/{state}/search/neighborhood/{term}"
					},
					"defaultQueryParam": {
						"investmentcategories": "ownerfinanced"
					},
					"searchboxplaceholder": "ENTERPREFEREDLOCATION",
					"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
					"headerLabel" : "HOMEFORSALESEARCHHEADER",
					"searchInputLabel" : "PREFERREDLOCATIONS",
					"isMapRequired" : true,
					"iconClass": "pe-7s-residential-2",
					"tooltip": "OWNERFINANCED_SEARCH_TAB_TOOLTIP",
				}
			]
		}
	},
	{
		"name": "ALLPROPERTIESFORSALE",
		"value": "for-sale",
		"locqueryrequired" : ["geo-location"],
		"defaultRoute" : "geo-location",
		"route" : {
			"geo-location" : "/residential-investment-properties/for-sale/search/geo-location/{term}",
			"zip-code" : "/residential-investment-properties/for-sale/{state}/search/zip-code/{term}",
			"city" : "/residential-investment-properties/for-sale/{state}/search/city/{term}",
			"neighborhood" : "/residential-investment-properties/for-sale/{state}/search/neighborhood/{term}"
		},
		"defaultQueryParam": {
			"investmentcategories": "all"
		},
		"searchboxplaceholder": "ENTERPREFEREDLOCATION",
		"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
		"headerLabel" : "HOMEFORSALESEARCHHEADER",
		"searchInputLabel" : "PREFERREDLOCATIONS",
		"isMapRequired" : true,
		"iconClass": "pe-7s-residential-2"
	},
	{
		"name": "PROPERTYFORLEASE",
		"value": "for-rent",
		"locqueryrequired" : ["geo-location"],
		"defaultRoute" : "geo-location",
		"route" : {
			"geo-location" : "/residential-investment-properties/for-rent/search/geo-location/{term}",
			"zip-code" : "/residential-investment-properties/for-rent/{state}/search/zip-code/{term}",
			"city" : "/residential-investment-properties/for-rent/{state}/search/city/{term}",
			"neighborhood" : "/residential-investment-properties/for-rent/{state}/search/neighborhood/{term}"
		},
		"searchboxplaceholder": "ENTERPREFEREDLOCATION",
		"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
		"headerLabel" : "FORLEASESEARCHHEADER",
		"searchInputLabel" : "PREFERREDLOCATIONS",
		"isMapRequired" : true,
		"iconClass": "pe-7s-properties",
		"hiddenOnHome": true
	},
	{
		"name": "REALTORSANDBROKERS",
		"value": "realtor",
		"route" : "/search/",
		"searchboxplaceholder": "ENTERPREFEREDLOCATION",
		"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
		"headerLabel" : "REALTORSEARCHHEADER",
		"searchInputLabel" : "PREFERREDLOCATIONS",
		"isMapRequired" : true,
		"hidden": true,
		"iconClass": "pe-7s-realtors-2"
	},
	{
		"name": "PROFESSIONAL",
		"value": "professional",
		"route" : "/search/",
		"searchboxplaceholder": "ENTERPREFEREDLOCATION",
		"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
		"headerLabel" : "PROFESSIONALSEARCHHEADER",
		"searchInputLabel" : "PREFERREDLOCATIONS",
		"isMapRequired" : true,
		"iconClass": "pe-7s-service-providers-2",
		"hidden": true
	},
	{
		"name": "CONTENT",
		"value": "content",
		"route" : "/search/",
		"searchboxplaceholder": "TYPEYOURKEYWORDS",
		"imgiconsrc" : "/static/images/landingpage/sell-rent.png",
		"headerLabel" : "CONTENTSEARCHHEADER",
		"searchInputLabel" : "ENTERCONTENTSEARCHKEYWORDS",
		"iconClass": "pe-7s-news-articles",
		"hidden": true
	}
].filter(option => !option.hidden);

export const flatOptions = (function(options){
	let ops = [];
	options.map(option => {
		if(option.group) {
			ops = [...ops,...option.group.options];
		} else {
			ops = [...ops,option];
		}
	});
	return ops;
})(options);

