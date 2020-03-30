import React from 'react';
import PropTypes from 'prop-types';
import ListTabs from './list-tabs';

/**
 * @description Renders radio icons list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListMultiTabs extends ListTabs {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list','schema__list-tabs','schema__list-tabs-multi-select','schema__list-tabs-multi-select-radio-icon']
	};


	referenceChildren() {
		const { data } = this.props;
		let index = 0,
			children = React.Children.map(this.props.children, (child,index) => {
				child.props.classNames.length =0;
				if (child === null) {
					return null;
				}
				if((!data.value) || (data.value && data.value !== child.props.tabValue)) {
					return React.cloneElement(child, this.getChildProps(child, index++,'hidden'));
				} else {
					return React.cloneElement(child, this.getChildProps(child, index++));
				}

			});

		return children;
	}

	getChildProps(child, index, classes='') {
		return {
			ref: 'child-' + (index++),
			'classNames' : classes
		};
	}

	rebuildTabs(tabValue) {
		let tabs = this.props.root().tabs,
			tabList = [],
			tabIds = [];

		tabs.forEach((tabChild)=>{
			tabList.push(tabChild);
			tabIds.push(tabChild.id);
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


