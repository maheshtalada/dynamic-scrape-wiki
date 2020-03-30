import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageActionsIndex } from './actions/actions-index';

export default class ActionModal extends Component {

	static propTypes = {
		actionComponent : PropTypes.string
	};

	constructor(props) {
		super(props);
	}

	render() {
		const ActionComponent = PageActionsIndex[this.props.actionComponent];
		return (
			<div className="page-actions__modal">
				<ActionComponent {...this.props}/>
			</div>
		);
	}

}

