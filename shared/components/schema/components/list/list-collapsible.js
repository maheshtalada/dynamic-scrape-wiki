import React from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../default-component/default-list';

/**
 * @description Renders a list based of off a specific tab value
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListCollapsibleItem extends DefaultListComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list', 'schema__list-collapsible']
	};

	renderValue() {
		let classNames = this.getValueClassNames();
		return (
			<div className={classNames}>
				{this.props.children}
			</div>
		);
	}

}


