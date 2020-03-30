import React from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../default-component/default-list';

/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CustomGroupElementsComponent extends DefaultListComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__group', 'schema__group-elements']
	};

	renderLabel() {
		const { l, label='' } = this.props;
		return label && super.renderLabel(
				<span>
					{l(label)}
				</span>
			);
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


