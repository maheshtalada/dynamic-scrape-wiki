import React , { Component } from 'react';
import PropTypes from 'prop-types';


class PropertyTypes extends Component {

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object,
		country: PropTypes.string,
		screenSize: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		return (
			<div className="landing-page">

			</div>
		);
	}
}

export default PropertyTypes;
