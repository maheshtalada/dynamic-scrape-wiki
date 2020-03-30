import React, { Component } from "react";
import PropTypes from 'prop-types';

export default  class Pills extends Component {

	static PropTypes = {
		pills: PropTypes.object.isRequired,
		classNames: PropTypes.object,
		renderPill : PropTypes.func.isRequired,
		renderPills : PropTypes.func.isRequired
	};

	static defaultProps = {
		labelField: "text",
		renderPill : ()=>{},
		renderPills : ()=>{}
	};

	constructor(props) {
		super(props);
	}

	renderPills() {
		const { pills } = this.props;
		const pillElements = pills.map((pill, index) => {
			return this.props.renderPill(
				index,
				pill
			);
		});
		return this.props.renderPills(pillElements);
	}

	render() {
		return (
			<div className="pills-wrapper">
				{this.renderPills()}
			</div>
		)
	};
}

