import React from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../../defaultComponent';

/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class RootList extends DefaultListComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['pdf-schema__root-list'],
	};

	constructor(props) {
		super(props);
	}

	renderLabel() {
		return null
	}

	renderValue() {
		let className = this.getValueClassNames();
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	}

}


