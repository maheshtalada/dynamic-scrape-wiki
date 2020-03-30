import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BaseShape extends Component {

	constructor(props) {
		super(props);
		this.state = {
			percent: 0
		};
	}

	componentWillReceiveProps(props) {
		if(props.percent !== this.state.percent) {
			this.setState({percent: props.percent});
		}
	}

	componentDidMount() {
		const {percent} = this.props;
		let counter = 0;
		let i = 0;
		for (; i < percent; ++i) {
			setTimeout(() => {
				counter++;
				let percentage = Math.ceil(percent * counter / percent);
				this.setState({percent: percentage});
			}, (Math.random() * 700));
		}
		/* setTimeout(() => {
			//counter++;
			//let percentage = Math.ceil(percent * counter / percent);
			this.setState({percent: percent})
		}, 500);*/
	}
}

export default BaseShape;
