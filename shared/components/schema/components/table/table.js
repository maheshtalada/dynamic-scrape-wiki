import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';

/**
 * @description Renders a horizontal list using column values
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class TableComponent extends DefaultComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__table']
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


