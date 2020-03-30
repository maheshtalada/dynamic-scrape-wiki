import React from 'react';
import PropTypes from 'prop-types';
import { some as _some } from 'lodash';
import DefaultComponent from '../default-component/default-component';

/**
 * @description Renders a component with a list of children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class DefaultListComponent extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list']
	};

	componentWillMount() {
		this.checkChildren(this.props);
	}

	componentWillReceiveProps(props) {
		this.checkChildren(props);
	}

	renderValue() {
		let classNames = this.getValueClassNames();
		return (
			<div className={classNames}>
				{this.referenceChildren()}
			</div>
		);
	}

	getChildProps(child, index) {
		return {
			ref: 'child-' + (index++)
		};
	}

	checkChildren(props) {
		if (props.children && props.children.length) {
			this.addClassName('schema__list--children');
		} else {
			this.removeClassName('schema__list--children');
		}
	}

	referenceChildren() {
		let index = 0,
			children = React.Children.map(this.props.children, (child) => {
				if (child === null) {
					return null;
				}
				return React.cloneElement(child, this.getChildProps(child, index++));
			});
		return children;
	}

	hasValue() {
		let _hasValue = false,
			index = 0;

		if (!this.props.children.length) {
			return false;
		}
		// waiting for the refs to render before checking for the value
		if (!_some(this.refs)) {
			return true;
		}
		while (this.refs['child-' + index] && !_hasValue) {
			_hasValue = this.refs['child-' + index++].hasValue();
		}
		return _hasValue;
	}

	renderLabel(label) {
		const { l } = this.props;
		// if(!label) {
		// 	return null;
		// }
		return super.renderLabel(l(label));
	}
}


