import React from 'react';
import PropTypes from 'prop-types';
import ListTabs from './list-tabs';
import ToggleCheckBox from '../options/toggle-checkbox';
import Cx from 'classnames';


/**
 * @description Renders a list that has a link label that removes itself on click
 * @prop classNames {array} Additional classnames to be added to the component
 * @prop remove {function} function generated by component tree class that removes the component from it's parent
 */

export default class ListTabsCollapse extends ListTabs {

	static defaultProps = {
		classNames: ['schema__list','schema__list-tabs','schema__list-tabs-collapse']
	};

	static propTypes = {
		classNames: PropTypes.array
	};


	constructor(props) {
		super(props);
	}

	renderLabel() {
		return (
			<div className="clearfix schema__list__collapse__link__container">
				<ToggleCheckBox {...this.props} storeValue={this.onTabChange.bind(this)}/>
				<span>
					{this.renderTooltip()}
					{this.renderLabelInfo()}
				</span>
			</div>
		);
	}

	renderValue() {
		let classNames = this.props.data.value === 'true' ? this.getValueClassNames() : Cx('hidden',this.getValueClassNames()) ;
		return (
			<div className={classNames}>
				{this.referenceChildren()}
			</div>
		);
	}

	referenceChildren() {
		const { data } = this.props;
		let index = 0,
			children = React.Children.map(this.props.children, (child,index) => {
				child.props.classNames.length =0;
				if (child === null) {
					return null;
				}
				if((!data.value && index !== 0) || (data.value && data.value !== child.props.tabValue)) {
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
			// if (tabChild.tabValue === tabValue) {
			tabList.push(tabChild);
			tabIds.push(tabChild.id);
			// }
		});

		// console.log(tabList);

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


