import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabSlider from '../tab-slider/tab-slider';
import Cx from 'classnames';
import SlantedTab from './slanted-tab';

export default class SlantedTabs extends Component {

	static contextTypes = {
		i18n : PropTypes.object,
		pageContext : PropTypes.string,
		screenSize : PropTypes.number
	};

	static propTypes = {
		slider : PropTypes.bool,
		mobileTabsScreen : PropTypes.number
	};

	static defaultProps = {
		slider : true,
		mobileTabsScreen : 2
	};

	constructor(props) {
		super(props);
		this.onTabSelected = this.onTabSelected.bind(this);
		this.state = {
			activeTab : props.selectedTab || props.tabs[0].key,
			activeSubTab : props.selectedSubTab,
			tabs : props.tabs
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			tabs : props.tabs,
			activeTab : props.selectedTab || props.tabs[0].key,
			activeSubTab : props.selectedSubTab
		})
	}

	componentDidMount() {
		this.forceUpdate();
	}


	onTabSelected(tabValue,subTabValue) {
		this.setState({
			activeTab : tabValue
		});
		this.props.onTabSelect(tabValue,subTabValue);
	}

	renderTabs() {
		const { tabs, activeTab, activeSubTab } = this.state;
		const { pageContext } = this.context;
		return (
			tabs.map(tab => {
				return (
					<SlantedTab tooltipConfig={this.props.tooltipConfig} activeSubTab={activeSubTab} active={activeTab === tab.key} tab={tab} context={pageContext} onTabSelect={this.onTabSelected}/>
				)
			})
		)
	}

	render() {
		const { className, slider, mobileTabsScreen } = this.props;
		const { screenSize } = this.context;
		return (
			<div className={Cx("flex",screenSize > mobileTabsScreen ? "slanted-tabs-wrap flex-align-center" : "mobile-tabs-wrap")}>
			<div className={Cx("slanted-tabs",className,slider ? 'with-slider' : 'no-slider')}>
				{slider ? <TabSlider settings={{"className" : "slanted-tabs__slider"}}>
					{this.renderTabs()}
				</TabSlider> : this.renderTabs()}
			</div>
			</div>
		)
	}

}
