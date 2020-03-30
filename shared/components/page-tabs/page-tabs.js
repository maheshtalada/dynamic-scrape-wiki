import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabSlider from '../common/tab-slider/tab-slider';
import Cx from 'classnames';
import { sortBy, throttle } from 'lodash';

export default class PageTabs extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};
	static propTypes = {
		tabs : PropTypes.array,
		tabsConfig : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			activeTab: props.activeTab
		};
		//this.handleScroll = this.handleScroll.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			activeTab: props.activeTab
		})
	}

	componentDidMount() {
		// if(!frameworkGlobals.isServer) {
		// 	const pageTabs = this.refs.pageTabs;
		// 	this.tabsOffsetTop = pageTabs.offsetTop;
		// 	window.addEventListener('scroll',throttle(this.handleScroll,100));
		// }
	}

	componentWillUnmount() {
		//window.removeEventListener('scroll',this.handleScroll);
	}

	// handleScroll(evt) {
	// 	if(window.pageYOffset >= this.tabsOffsetTop) {
	// 		this.refs.pageTabs.classList.add('sticky');
	// 		this.refs.pageTabs.style.width = `${this.refs.pageTabs.parentElement.offsetWidth}px`;
	// 	} else {
	// 		this.refs.pageTabs.classList.remove('sticky');
	// 	}
	// }

	onTabChange(tab) {
		this.props.onChange(tab);
	}

	renderTabs() {
		const { tabsConfig, tabs } = this.props;
		const tabsToShow = tabsConfig.filter(tab => tabs.indexOf(tab.name) >= 0);
		const modifiedTabs = sortBy(tabsToShow,tab => tab.order);
		const { l } = this.context.i18n;
		const { activeTab = modifiedTabs[0].name } = this.state;
		return modifiedTabs.map(tab => {
			return (
				<div className={Cx('page-tabs__tab',tab.classes, activeTab === tab.name ? 'active' : '')}>
					<a key={tab.name} onClick={()=>{this.onTabChange(tab)}}>
						{/*{tab.iconClass && <i className={tab.iconClass}/>}*/}
						<span>{l(tab.label)}</span>
					</a>
				</div>
			)
		})
	}

	render() {
		return (
			<div ref="pageTabs" className="page-tabs" id="page-tabs">
				{<TabSlider settings={{"className" : "page-tabs__slider"}}>
					{this.renderTabs()}
				</TabSlider>}
			</div>
		)
	}

}
