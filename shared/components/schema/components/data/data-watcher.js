import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';

/**
 * @description Watch a component with a list of children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class DataWatcher extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__list__watcher']
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
				{this.props.children}
				{
					this.props.error &&
					<div className="schema__error schema__wrapper-error" key="error">{this.props.error}</div>
				}
			</div>
		);
	}

	checkChildren(props) {
		if (!props.error) {
			this.addClassName('schema__watcher-success');
		} else {
			this.removeClassName('schema__watcher-success');
		}
	}

}


