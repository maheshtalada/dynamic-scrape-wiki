import React from 'react';
import PropTypes from 'prop-types';
import TableComponent from './table';


/**
 * @description Renders a horizontal list using column values
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class TableBodyComponent extends TableComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__table__body' ]
	};
}


