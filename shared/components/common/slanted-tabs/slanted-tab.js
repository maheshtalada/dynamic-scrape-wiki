import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
import { findDOMNode } from 'react-dom';
import ReactTooltip from 'react-tooltip';
import ScrollIntoView from 'scroll-into-view';

export default class SlantedTab extends Component {

	static contextTypes = {
		i18n : PropTypes.object
	};

	static propTypes = {
		tooltipConfig : PropTypes.object
	};

	static defaultProps = {
		tooltipConfig : {}
	}

	constructor(props) {
		super(props);
		this.onTabSelected = this.onTabSelected.bind(this);
		this.onOptionSelected = this.onOptionSelected.bind(this);
		this.onShowOptions = this.onShowOptions.bind(this);
		this.onHideOptions = this.onHideOptions.bind(this);
		this.state = {
			active : props.active,
			tab : props.tab,
			activeSubTab : props.activeSubTab
		}
	}

	componentDidMount() {
		if(this.refs.activeTab) {
			ScrollIntoView(this.refs.activeTab,{
				validTarget : function(target, parentsScrolled){
					// Only scroll the first two elements that don't have the class "dontScroll"
					// Element.matches is not supported in IE11, consider using Element.prototype.msMatchesSelector if you need to support that browser
					return parentsScrolled < 2 && target !== window && !target.matches('.dontScroll');
				}
			});
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			active : props.active,
			tab : props.tab,
			activeSubTab : props.activeSubTab
		})
	}

	componentDidUpdate(){
		ReactTooltip.rebuild();
	}

	onTabSelected() {
		const { tab } = this.state;
		if(!tab.options) {
			this.props.onTabSelect(tab);
		}
	}

	onTabMouseOverToggle() {
		this.setState({
			showOptions : !this.state.showOptions
		})
	}

	onShowOptions() {
		this.setState({
			showOptions: true
		})
	}

	onHideOptions() {
		this.setState({
			showOptions: false
		})
	}

	onOptionSelected(option,index) {
		const { tab } = this.state;
		this.setState({
			optionSelected : option.label,
			showOptions: false
		},()=>{
			this.props.onTabSelect(tab,option.value);
		})
	}

	render() {
		const { tab, active, showOptions, optionSelected, activeSubTab } = this.state;
		const label = tab.label || tab.key.toUpperCase();
		const { l } = this.context.i18n;
		const { tooltipConfig } = this.props; 
		const tooltip = tab.tooltip || tooltipConfig[tab.key];
		return (
			<div ref={active ? "activeTab": "tab"} onMouseEnter={this.onShowOptions} onMouseLeave={this.onHideOptions} className={Cx("slanted-tabs__tab-wrap",{'active': active})}>
				<button className="slanted-tabs__tab-btn" onClick={this.onTabSelected} data-for={`slanted-tab-tooltip-${label}`}  data-tag-label={l(label)} data-tag-action="Tab Click" data-tag-category={`Tabs - ${this.props.context}`}>
					<span className="tab-name">{l(label)}</span>
					{tab.count !== undefined && <span className="count">{`[${tab.count}]`}</span>}
					{tooltip && <i data-tip={l(tooltip)} className="pe-7s-help1"/>}
				</button>
				{tab.options && <div className={Cx("slanted-tabs__options",{'show': showOptions})}>
					<ul>
						{tab.options.map((option,index) => {
							return (
								<li className={Cx({'active': activeSubTab === option.value.key})}>
									<button className="slanted-tabs__options__option-btn" data-tag-label={l(option.label)} data-tag-action="Tab Click" data-tag-category={`Tabs - ${this.props.context}`} onClick={()=>{this.onOptionSelected(option,index)}}>{l(option.label)}</button>
									{option.tooltip && <i className="tooltip pe-7s-help1" data-for={`slanted-tab-tooltip-${label}`} data-tip={l(option.tooltip)}/>}
								</li>
							)
						})}
					</ul>
				</div>}
				<ReactTooltip place="bottom" id={`slanted-tab-tooltip-${label}`}/>
			</div>
		)
	}
}
