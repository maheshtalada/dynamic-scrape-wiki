import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'components/common/select/select';
import BasePageAction from 'lib/BasePageAction';
import Cx from 'classnames';
import { sortBy as _sortBy } from 'lodash';

export default class PageActions extends BasePageAction {

	static propTypes = {
		actions : PropTypes.object
	};

	static defaultProps = {
		className : 'page-actions'
	};

	static contextTypes = {
		i18n : PropTypes.object,
		location : PropTypes.string,
		screenSize : PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.submitAction = undefined;
	}

	componentWillReceiveProps(newProps) {}

	render() {
		const { l } = this.context.i18n;
		const { actions } = this.props;
		const { screenSize } = this.context;
		return (
			<div className={Cx("page-actions",this.props.className)}>
				{this.props.children}
				<Select
					key="page-actions-options"
					btnClassName="btn btn-default search-results__actions-btn"
					wrapperCls="col-lg-2 cl-md-2 search-results__control actions"
					btnLabel={"ACTIONS"}
					options={_sortBy(actions,action => action.order)}
					name="property-sort"
					inputClasses="no-border"
					onChange={this.onActionClick}
				/>
			</div>
		);
	}

}

