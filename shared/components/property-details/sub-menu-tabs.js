import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { throttle, sortBy } from 'lodash';
import { showSectionCheck } from '../../utils/propertyUtil';
import { propertyTabs as tabs } from '../../assets/static/details-page-tabs.json';
import SlantedTabs from '../common/slanted-tabs/slanted-tabs';

export default class SubMenuTabs extends Component {

	static propTypes = {
		activeTab: PropTypes.string,
		onChange: PropTypes.func,
		details: PropTypes.object
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};


	static defaultProps = {
		onChange : () =>{}
	};

	constructor(props) {
		super(props);
		this.tabsData = sortBy(tabs, (o)=> {
			return o.order;
		});
		this.state = {
			activeTab : this.tabsData[0].name
		};
		this.tabsType = 'listing';
	}

	tabChange = (tab) => {
		this.setState({
			activeTab : tab.name
		},this.props.onChange(tab));
	}

	isTabRequired(tab, details) {
		return showSectionCheck(this.tabsType, tab.conditionalAttributes[1] ? details[tab.conditionalAttributes[1]] : details,tab.conditionalAttributes[0])
	}

	modifyTabs(tabsData) {
		const { details } = this.props;
		return tabsData.filter(tab => {
			return tab.isConditional ? this.isTabRequired(tab, details) : true;
		});
	}

	render() {

		const { activeTab } = this.state;
		this.tabsData = this.modifyTabs(this.tabsData);
		return (
			<SlantedTabs tabs={this.tabsData} slider={false} selectedTab={activeTab} onTabSelect={this.tabChange}/>
		);
	}
}
