import React , { Component } from 'react';
import PropTypes from 'prop-types';
import ListCompanies from '../containers/Companies/ListCompanies';

class CompanyListPage extends Component {

	constructor(props) {
		super(props);
		console.log(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		const { l } = this.context.i18n;
		return (
			<div className="company-list-page">
				<header className="depot-page__header">
				</header>
				<ListCompanies {...this.props}/>
			</div>
		);
	}

}

export default CompanyListPage;
