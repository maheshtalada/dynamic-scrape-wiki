import React from 'react';
import PropTypes from 'prop-types';
import ListTabsComponent from './list-tabs';
import RadioIcon from '../options/icon-radio';

/**
 * @description Renders radio icons list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListTabsRadioIcon extends ListTabsComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list','schema__list-tabs','schema__list-tabs-radio-icon']
	};

	renderLabel() {
		let className = this.getLabelClassNames();
		let {classNames, ...props} = this.props;
		if (this.props.data.value) {
			props.error = null;
		}
		return (
			<span className={className}>
				<RadioIcon {...props} storeValue={this.onTabChange.bind(this)}/>
			</span>
		);
	}
}


