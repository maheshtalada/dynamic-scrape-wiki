import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import PropertySubMenuTabs from '../property-details/sub-menu-tabs';
import { companyTabs as tabs } from '../../assets/static/details-page-tabs.json';


export default class SubMenuTabs extends PropertySubMenuTabs {

	constructor(props) {
		super(props);
		this.tabsData = sortBy(tabs, (o)=> {
			return o.order;
		});
		this.tabsType = 'company';
	}

	render() {
		return super.render();
	}
}
