import React from 'react';
import PropTypes from 'prop-types';
import ListTabsComponent from './list-tabs';
import DropdownComponent from '../options/dropdown';

/**
 * @description Renders a dropwdown list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListTabsDropdown extends ListTabsComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list','schema__list-tabs','schema__list-tabs-dropdown']
	};

	renderLabel() {
		let className = this.getLabelClassNames();
		let {classNames, ...props} = this.props;
		if (this.props.data.value) {
			props.error = null;
		}
		return (
			<span className={className}>
				<DropdownComponent {...props} storeValue={this.onTabChange.bind(this)}/>
			</span>
		);
	}
}


