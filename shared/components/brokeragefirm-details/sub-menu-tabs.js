import React, {Component } from 'react';
import { sortBy, find as _find } from 'lodash';
import PropertySubMenuTabs from '../property-details/sub-menu-tabs';
import { brokerageFirmTabs as tabs } from '../../assets/static/details-page-tabs.json';


export default class SubMenuTabs extends PropertySubMenuTabs {

	constructor(props) {
		super(props);
		this.tabsData = sortBy(tabs, (o)=> {
			return o.order;
		});
		const activeTab = _find(this.tabsData,{ tabHTMLId : props.locationHash });
		this.tabsType = 'brokeragefirm';
		this.state = {
			activeTab : activeTab ? activeTab.name : this.tabsData[0].name
		};
	}

	render() {
		return super.render();
	}
}
