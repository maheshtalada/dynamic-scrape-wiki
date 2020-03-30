import React from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../default-component/default-list';

/**
 * @description Renders a component with a list of children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CardWrapperComponent extends DefaultListComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__card-wrapper']
	};

	renderLabel() {
		return (null)
	}

	renderChildren() {
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {...this.props})
		);
		return childrenWithProps;
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
