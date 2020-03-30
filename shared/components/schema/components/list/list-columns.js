import React from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../default-component/default-list';

/**
 * @description Renders a horizontal list using column values
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListColumnsComponent extends DefaultListComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list', 'schema__list-columns']
	};

	getChildProps(child, index) {
		let props = super.getChildProps(child, index);
		if (this.props.data && this.props.data.columns) {
			props.classNames = child.props.classNames.concat(['schema--width-' + this.props.data.columns]);
		}
		return props;
	}
}


