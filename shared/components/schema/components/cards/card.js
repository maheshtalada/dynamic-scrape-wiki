import React from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../default-component/default-list';

/**
 * @description Renders a component with a list of children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CardComponent extends DefaultListComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__card']
	};

	renderLabel(label) {
		const { l } = this.props;
		return (
			<span className={this.getLabelClassNames()} data-automation-selector={this.getDataId('label')}>
				{l(label)}{this.renderLabelInfo()}
			</span>
		);
	}

	checkChildren(props) {
		if (props.children && props.children.length) {
			this.addClassName('schema__card--children');
		} else {
			this.removeClassName('schema__card--children');
		}
	}
}

