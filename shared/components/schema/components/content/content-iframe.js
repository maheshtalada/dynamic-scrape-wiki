import React  from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';

/**
 * @description Creates a labelless iframe component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ContentIframe extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__content__iframe']
	};

	renderLabel(label) {
		return (null);
	}

	renderValue(value) {
		const { label, data } = this.props;
		return (
            <iframe {...data.attr}/>
		);

	}

}
