import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

export default class TooglePanel extends Component {

	static propTypes = {
		children        : PropTypes.object,
		collapse : PropTypes.func,
		childStateParam: PropTypes.string,
		ignoreClass: PropTypes.string,
		classes : PropTypes.string
	};

	static defaultProps = {
		children: {},
		collapse: ()=> {},
		childStateParam:'',
		ignoreClass:'',
		classes:''
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		window.addEventListener('click', this.handleBodyClick);
		//window.addEventListener('touchstart', this.handleBodyClick);
	}

	componentDidMount() {
		if(this.refs.toggle.getBoundingClientRect().bottom > window.innerHeight) {
			this.setState({
				positionClass : 'position-top'
			})
		}
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleBodyClick);
		//window.removeEventListener('touchstart', this.handleBodyClick);
	}

	render() {

		const { children, classes} = this.props;
		const { positionClass = '' } = this.state;
		return (
			<div className={Cx(classes,'toggle-panel animated slideInDown',positionClass)} ref="toggle">
				{children}
			</div>
		);
	}

	handleBodyClick = (evt) => {
		const { ignoreClass } = this.props;
		if(evt.target.classList.contains(ignoreClass) ||
			evt.target.parentElement && evt.target.parentElement.classList.contains(ignoreClass) ||
			evt.target.offsetParent && evt.target.offsetParent.classList.contains(ignoreClass)) {
			return;
		}
		let toggle = this.refs.toggle;
		if (!toggle.contains(evt.target)) {
			this.props.collapse(this.props.childStateParam);
		}
	};
}
