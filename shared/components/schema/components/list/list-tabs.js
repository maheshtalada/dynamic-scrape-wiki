import React from 'react';
import PropTypes from 'prop-types';
import RadioShortComponent from '../options/radio-short';
import DefaultListComponent from '../default-component/default-list';

/**
 * @description Renders a list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListTabs extends DefaultListComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list', 'schema__list-tabs']
	};

	componentWillMount() {
		this.rebuildTabs(this.props.data.value);
	}

	onTabChange(id, value) {
		this.rebuildTabs(value);
		this.props.storeValue(id, value);
	}

	renderLabel() {
		let className = this.getLabelClassNames();
		let {classNames, ...props} = this.props;
		if (this.props.data.value) {
			props.error = null;
		}
		return (
			<span className={className}>
				<RadioShortComponent {...props} storeValue={this.onTabChange.bind(this)}/>
			</span>
		);
	}

	rebuildTabs(tabValue) {
		let tabs = this.props.root().tabs,
			tabList = [],
			tabIds = [];
		if(!tabs) {
			return;
		}
		tabs.forEach((tabChild)=>{
			if (tabChild.tabValue === tabValue) {
				tabList.push(tabChild);
				tabIds.push(tabChild.id);
			}
		});

		this.props.root().children.forEach((child)=>{
			let tabIndex = tabIds.indexOf(child.id);
			if (tabIndex === -1) {
				child.remove();
			} else {
				tabList.splice(tabIndex, 1);
				tabIds.splice(tabIndex, 1);
			}
		});

		if (tabList.length) {
			this.props.root().inject(tabList, 0, tabValue);
		}
	}

}


