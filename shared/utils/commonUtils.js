
export function BreadcrumbsMicroData(breadcrumbs, originHost) {
	const microData = {
		"@context": "http://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement" : []
	};

	if(!breadcrumbs || !breadcrumbs.length) {
		return false;
	}

	microData['itemListElement'] =  breadcrumbs.map( (breadcrumb, key) => (
		{
			"@type": "ListItem",
			"position": key + 1,
			"item": {
				"@id": breadcrumb.url ? `${originHost}${breadcrumb.url}` : '',
				"name": breadcrumb.name
			}
		}
	));
	return microData;

}


