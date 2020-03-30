import React from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../default-component/default-list';

/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class HeaderComponent extends DefaultListComponent {


	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array,
		error: PropTypes.bool,
		validationForced: PropTypes.bool
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__header'],
		error: null,
		validationForced: false
	};

	constructor(props) {
		super(props);
	}

	renderErrorMessage() {
		const { l, error='', validationForced='' } = this.props;
		if (error && validationForced) {
			return (
				<div className="schema__error-box">
					{l('MANDATORYMESSAGE')}
				</div>
			);
		}
		return null;
	}

	renderLabel() {
		const { l, label ='' } = this.props;
		return label &&
			<span className={this.getLabelClassNames()} data-automation-selector={this.getDataId('label')}>
				<h1>{l(label)}</h1>
				{this.renderLabelInfo()}
				{this.renderTooltip()}
			</span>
	}

	renderValue() {
		let className = this.getValueClassNames();
		return (
			<div className={className}>
				{this.renderErrorMessage()}
				{this.props.children}
			</div>
		);
	}

}


