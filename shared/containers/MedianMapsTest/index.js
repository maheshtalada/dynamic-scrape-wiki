import React, {Component } from 'react';
import PropTypes from 'prop-types';
import MapFeature from 'components/map-feature-test/map-feature';
import Tabs from 'components/common/tabs/tabs';
import ReactTooltip from 'react-tooltip';
import { getMetroServed } from 'utils/mapUtils';
import { pathToUrl } from 'utils/searchUtil';
import Select from 'components/common/select/select';
import { propertysearch as shareOptions, shareViaEmailOptions } from 'assets/static/social-share-options.json';
import { sprintf } from 'utils';
import SocialShare from 'components/common/social-share-buttons/social-share-buttons';
import SiteConfig from '../../config';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { connect } from 'react-redux';
import { REQUEST_MAP_RANGE_LEGENDS } from '../../redux/actions/application';

const { mapServer } = SiteConfig;
const { tabs : medianMapTabs } = require('../../assets/static/median-maps-tabs-config').default;

class MedianMapContainer extends Component {

	// shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		pageContext: PropTypes.string,
		screenSize : PropTypes.number
	};

	static defaultProps = {};

	constructor(props) {
		super(props);
		const activeTab = MedianMapContainer.getActiveTab(medianMapTabs,props.params.maptype); 
		this.state = {
			activeTab : activeTab.tab,
			activeSubTab : activeTab.subTab,
			mapRangeLegends : props.mapRangeLegends,
			leadRealtors : props.leadRealtors,
			flatOptionIndex : activeTab.flatOptionIndex,
			showMapUsageTip : true
		};
		this.onTabChange = this.onTabChange.bind(this);
		this.onCloseMapUsageTip = this.onCloseMapUsageTip.bind(this);
	}

	componentWillReceiveProps(props) {
		const activeTab = MedianMapContainer.getActiveTab(medianMapTabs,props.params.maptype); 
		this.setState({
			activeTab : activeTab.tab,
			activeSubTab : activeTab.subTab,
			mapRangeLegends : props.mapRangeLegends,
			leadRealtors : props.leadRealtors,
			flatOptionIndex : activeTab.flatOptionIndex
		});
	}

	componentDidUpdate() {
		ReactTooltip.rebuild()
	}

	componentWillUnmount() {
		window.localStorage.setItem('hideMapUsageTip',true);
	}

	onTabChange(tab,subTab) {
		window.localStorage.setItem('hideMapUsageTip',true);
		this.setState({
			showMapUsageTip : false
		},()=>{
			this.changeRoute(tab,subTab);
		});
	}

	changeRoute(tab,subTab) {
		const { state, metro, id} = this.props.params;
		const params = {
			state,
			metro,
			id,
			maptype : subTab ? subTab.mapSearchType : tab.mapSearchType
		};
		this.context.router.push({
			pathname: pathToUrl('/residential-investment-markets/{state}/{metro}/{maptype}/map/{id}', params)
		});
	}

	onCloseMapUsageTip() {
		this.setState({
			showMapUsageTip : false
		});
		window.localStorage.setItem('hideMapUsageTip',true);
	}

	getMapTabsOptions() {
		let selectOptions = [];
		medianMapTabs.map(tab => {
			if(tab.options) {
				let groupOption = {
					title : tab.label,
					tooltip : tab.tooltip,
					options : []
				};
				tab.options.map(tabOption => {
					groupOption.options.push({
						name : tabOption.label,
						tooltip : tabOption.tooltip,
						value : tabOption.value
					});
				});
				selectOptions.push({
					group : groupOption
				});
			} else {
				selectOptions.push({
					name : tab.label,
					value : tab,
					tooltip : tab.tooltip
				})
			}
		});
		return selectOptions;
	}

	renderSelectOptions(mapFeatureConfig,metroValue) {
		return (
			<div className="mobile-tabs-wrap median-tabs-select-wrap">
				<Select btnClassName="btn btn-default" 
						options={this.getMapTabsOptions()}
						selected={this.state.flatOptionIndex}
						onChange={option => {this.onTabChange(option)}} />
				{this.renderShare(mapFeatureConfig,metroValue)}
			</div>
		)
	}

	renderShare(mapFeatureConfig,metroValue) {
		const { user, location, screenSize, dispatch } = this.props;
		const title = sprintf(shareViaEmailOptions.map.title,metroValue);
		const shareUrl = !frameworkGlobals.isServer ? window.location.href : '';
		return (
			<SocialShare
				context="Analyze market"
				emailOptions={{
					shareType : "MAP_LINK",
					title,
					description : sprintf(shareViaEmailOptions.map.description,mapFeatureConfig.mapDescription),
					link : shareUrl
				}}
				location={location}
				user={user}
				shareUrl={shareUrl}
				title = {title}
				options = {shareOptions}
				screenSize = {screenSize}
				dispatch = {dispatch}
			/>
		)
	}

	render() {
		const { activeTab, mapRangeLegends, showMapUsageTip, activeSubTab } = this.state;
		const metroServed = getMetroServed(this.props.params.id);
		const latLng = metroServed.coordinates || [];
		const mapFeatureConfig = activeSubTab ? activeSubTab.value : activeTab;
		const { i18n : {l}, screenSize } = this.context;
		return (
			<div id="median-maps-wrapper" className="median-maps-wrapper">
				{/*{screenSize > 2 ? <Tabs slider={false}
									tabs={medianMapTabs} 
									mobileTabsScreen={1} 
									selectedTab={activeTab.key} 
									selectedSubTab={activeSubTab ? activeSubTab.value.key : null}
									onTabSelect={this.onTabChange}/>:
					this.renderSelectOptions(mapFeatureConfig,metroServed.searchBarAddress) }*/}
				<div className="median-map-feature-wrap">
					<MapFeature
						key={mapFeatureConfig.key}
						lat={parseFloat(latLng[1],10)}
						lng={parseFloat(latLng[0],10)}
						tabConfig={mapFeatureConfig}
						params={this.props.params}
						metroStateCode={metroServed.stateCode}
						device={this.props.device.device}
						mapRangeLegends = {mapRangeLegends.data}
						mapServerEndPoint={`${mapServer.path}${mapFeatureConfig.endpoint}`}
						redirectUri={`/residential-investment-properties/for-sale/{state}/search/zip-code/{term}`}/>
					{screenSize > 1 && window.localStorage && window.localStorage.getItem('hideMapUsageTip') !== 'true' && showMapUsageTip && <div className="map-usage-tooltip">
						{l('MAPSEARCHUSAGEINFO')}
						<button onClick={this.onCloseMapUsageTip}><i className="pe-7s-close-3"/></button>
					</div>}
				</div>
				{/*<div className="median-maps-wrapper__share-wrap">
					<div className="metro-served-name">{metroServed.searchBarAddress}</div>
					{this.renderShare(mapFeatureConfig,metroServed.searchBarAddress)}
				</div>*/}
				<ReactTooltip place="bottom"/>
			</div>
		);
	}

	static getActiveTab(tabs,mapTypeParam) {
		// TODO Change this logic, shouldn't need this logic at all, it should directly pick up from different config. 
		// Make tabs data and map feature config separate for this purpose
		let activeTab = {
			tab : medianMapTabs[0],
			subTab : medianMapTabs[0].options ? medianMapTabs[0].options[0] : null
		};
		let index = -1;
		tabs.forEach(tab => {
			if(tab.options) {
				tab.options.forEach(subTab => {
					index++;
					if(subTab.value.mapSearchType === mapTypeParam) {
						activeTab = {
							tab : tab,
							subTab : subTab,
							flatOptionIndex : index
						};
					}
				})
			} else {
				index++;
				if(tab.mapSearchType === mapTypeParam) {
					activeTab = {
						tab : tab,
						subTab : null,
						flatOptionIndex : index
					};
				}
			}
		});
		return activeTab;
	}
}

const mapStateToProps = ({application}) => {
	return {
		mapRangeLegends : application.map_range_legends_response || {}
	}
};

export default connect(mapStateToProps)(
	connectDataFetchers(MedianMapContainer, [
		REQUEST_MAP_RANGE_LEGENDS
	], true)
);
