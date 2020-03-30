import React from 'react';
import PropTypes from 'prop-types';
import ListTabsComponent from './list-tabs';
import SliderComponent from '../options/slider';

/**
 * @description Renders a dropwdown list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListTabsSliderComponent extends ListTabsComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list','schema__list-tabs','schema__list-tabs-slider']
	};

	onTabChange(id, value) {
		this.rebuildTabs(value.replace('£','').replace('>',''));
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
				<SliderComponent {...props} storeValue={this.onTabChange.bind(this)}/>
			</span>
		);
	}
}


