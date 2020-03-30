import React , { Component } from 'react';
import PropTypes from 'prop-types';
import DepotDetails from '../components/depot-details/depot-details';

class DepotPage extends Component {

	constructor(props) {
		super(props);
	}

	static contextTypes = { i18n: PropTypes.object };

	render() {
		const { l } = this.context.i18n;
		return (
			<div className="depot-page">
				<header className="depot-page__header">
					<h1 className="depot-page__header__title">{l('WELCOMETODEPOT')}</h1>
					<p className="depot-page__header__sub-title">{l('DEPOTSUBTITLE')}</p>
				</header>
				<DepotDetails/>
			</div>
		);
	}

}

export default DepotPage;
