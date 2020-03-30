import React, {Component } from 'react';
import PropTypes from 'prop-types';
import BaseLocationMap from '../../lib/BaseLocationMap';

export default class StreetView extends BaseLocationMap {

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			isStreetViewAvailable : true
		}
	}

	/*componentDidUpdate() {
		// A whole lotta functions here, fired after every render.
		this.props.onComponentLoad();
	}*/

	render() {
		return (
			<div className="gallery-content-wrapper" id="location-street-view">
				{this.renderStreetView()}
			</div>
		);
	}
}
