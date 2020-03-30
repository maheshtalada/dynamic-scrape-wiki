import React from 'react';
import { sortBy } from 'lodash';
import PropertySubMenuTabs from '../property-details/sub-menu-tabs';
import { realtorTabs as tabs } from '../../assets/static/details-page-tabs.json';


export default class SubMenuTabs extends PropertySubMenuTabs {

	constructor(props) {
		super(props);
		this.tabsData = sortBy(tabs, (o)=> {
			return o.order;
		});
		this.tabsType = 'realtor';
		this.state = {
			activeTab : this.tabsData[0].name
		};
	}

	render() {
		return super.render();
	}
}
