import React from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../../../defaultComponent';

/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CustomOpenHouse extends DefaultListComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['pdf-schema__open-house'],
	};

	constructor(props) {
		super(props);
	}

	renderLabel() {
		return null
	}

	renderValue() {
		const { assetsPath } = this.props;
		let className = this.getValueClassNames();
		return (
			<div className={className}>
				<img src={`${assetsPath}/images/properties/open-house-sign.png`} className="pdf-schema__open-house__icon"/>
				<div className="pdf-schema__open-house__time">
					{this.props.children}
				</div>
			</div>
		);
	}

}


