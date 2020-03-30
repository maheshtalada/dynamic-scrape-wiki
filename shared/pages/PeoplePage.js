import React , { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListPeople from '../containers/People/ListPeople';

export default class PeoplePage extends PureComponent {

	static contextTypes = { i18n: PropTypes.object };

	render() {
		const { l } = this.context.i18n;
		return (
			<div className="company-list-page">
				<header className="depot-page__header">
				</header>
				<ListPeople {...this.props}/>
			</div>
		);
	}

}

