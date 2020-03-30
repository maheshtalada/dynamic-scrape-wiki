import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Separator from '../common/separator/separator';
import ReactTooltip from 'react-tooltip';

export default class SearchOptionTabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected : this.props.tabsInfo[0].value,
			tooltipToShow: -1
		};
		this.tabSelected = this.tabSelected.bind(this);
	}

	static propsTypes = {
		tabsInfo : PropTypes.array.required,
		onTabSelect: PropTypes.func.required
	}

	static contextTypes = {
		i18n : PropTypes.object
	}

	tabSelected(tab) {
		this.setState({
			selected: tab.value
		});
		this.props.onTabSelect(tab);
	}
	
	render() {
		const { tabsInfo } = this.props;
		const { l } = this.context.i18n;
		const { selected } = this.state;
		return (
			<div className="search-options-tabs-wrapper">
				<ul className="search-options-tabs-wrapper__tabs">
					{
						tabsInfo.map((tab,index) => {
							return (<li key={tab.value} data-tag-label={l(tab.name)} data-tag-category="Home Search Variations" data-tag-action="Search Tab Click" className={`search-options-tabs-wrapper__tabs__tab hvr-rectangle-out ${selected === tab.value ? 'active-tab' : ''}`} onClick={this.tabSelected.bind(this,tab)}>
								<span className="hvr-grow">{l(tab.name)}</span>
										{tab.tooltip && <i className="pe-7s-help1" data-for="search-option-tabs-tooltip" data-tip={l(tab.tooltip)}/>}
									</li>);
						})
					}
				</ul>
				<ReactTooltip id="search-option-tabs-tooltip"/>
			</div>
		);
	}
}
