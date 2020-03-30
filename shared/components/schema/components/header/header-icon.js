import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from './header';

/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class HeaderIconComponent extends HeaderComponent {

	static propTypes = {
		data: PropTypes.object
	};

	static defaultProps = {
		classNames: ['schema__header','schema__header-icon']
	};


	renderLabel() {
		const { l,label='',data } = this.props;
		return (
			<span className={this.getLabelClassNames()} data-automation-selector={this.getDataId('label')}>
				<span><i className={`icon-cob icon-${data.icon}`} /></span>
				<h1>{l(label)}</h1>
			</span>
		);
	}

}


