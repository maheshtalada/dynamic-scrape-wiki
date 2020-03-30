import React from 'react';
import PropTypes from 'prop-types';
import ListColumnsComponent from './list-columns';
import { filter } from 'lodash';

/**
 * @description Renders a horizontal list using column values
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ListColumnsNoGutterComponent extends ListColumnsComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list', 'schema__list-columns', 'schema__list-columns__no-gutter']
	};

	renderValue() {
		let classNames = this.getValueClassNames();
		let componentArray = [
			<div className={classNames}>
				{this.referenceChildren()}
			</div>
		];

		if (this.props.error) {
			componentArray.push(<div className="schema__error" key="error">{this.renderErrorMessage(this.props.error)}</div>);
		}
		return componentArray;
	}

}


