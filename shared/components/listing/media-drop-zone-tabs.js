import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { mediaTabsConfig } from '../../assets/static/media-drop-zone-tabs.json';


export default class ListingMediaDropZoneTabs extends Component {

	static propTypes = {
		activeTab: PropTypes.number,
		onChange: PropTypes.fun
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};


	static defaultProps = {
		activeTab: 0,
		onChange : () =>{}
	};

	constructor(props) {
		super(props);
		this.state = {
			activeTab : props.activeTab
		}
	}

	tabChange = (tabId) => {
		this.setState({
			activeTab : tabId
		});
		this.props.onChange(tabId);
	}

	renderTabs() {
		const { tabsData } = this.props;
		const { activeTab } = this.state;
		const { l } = this.context.i18n;
		let tabArr = [];
		tabsData && tabsData.forEach((tab,index)=>{
			tabArr.push(<a className={`mdl-tabs__tab ${activeTab === index ? 'is-active': ''}`} onClick={()=>this.tabChange(index)}>{l(mediaTabsConfig[tab].LABEL)}</a>);
		});
		return tabArr;
	}

	render() {

		return (
			<div className="mdl-tabs__tab-bar">
				{this.renderTabs()}
			</div>

		);
	}
}
