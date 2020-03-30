import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';
/**
 * @description: general header used across client application
 * @prop {string} text - header text
 * @prop {string} pretext - text before header
 * @example: <SectionHeader pretext="Your Business Current Account application" text="Your Application"  />
 * section-header--theme-light section-header--slim
 */

export default class ScrollFixed extends Component {

	static propTypes = {
		maxWidth: PropTypes.number,
		minWidth: PropTypes.number,
		scrollPosition: PropTypes.number,
		top: PropTypes.number,
		children: PropTypes.object,
		className: PropTypes.string
	};

	static defaultProps = {
		maxWidth: Infinity,
		minWidth: 0,
		scrollPosition:0,
		top:0,
		children: {},
		className: '',
		isWidthRequired : true
	};

	constructor(props) {
		super(props);

		this.state = {
			isActive: props.scrollPosition === 0,
			width:'inherit'
		};
	}

	componentDidMount() {
		if (!frameworkGlobals.isServer) {
			this.boundScrollHandler = this.handleScroll.bind(this);
			window.addEventListener('scroll', this.boundScrollHandler);
		}
		if(this.props.isWidthRequired) {
			this.setState({
				width : this.refs.scrolldiv.getBoundingClientRect().width
			});
		}
	}

	componentWillUnmount() {
		if (!frameworkGlobals.isServer) {
			window.removeEventListener('scroll', this.boundScrollHandler);
		}
	}

	render() {
		let style = this.getStyle();
		return (
			<div style={style} className={Cx(this.props.className, this.state.isActive && 'fixed' || '')} ref="scrolldiv">
				{this.props.children}
			</div>
		);
	}

	getStyle() {
		let style = {};
		if (this.state.isActive) {
			style = {
				position: 'fixed',
				top: this.props.top + 'px',
				zIndex: 1
			};

			if(this.props.isWidthRequired) {
				style.width = this.state.width;
			}
		}
		return style;
	}

	handleScroll(event) {
		let target = event.target,
			scrollTop = target.body.scrollTop || target.documentElement.scrollTop;
		if(this.props.scrollPosition === 0) {
			return;
		}
		if (parseInt(scrollTop, 10) > this.props.scrollPosition &&
			target.body.offsetWidth <= this.props.maxWidth &&
			target.body.offsetWidth >= this.props.minWidth) {
			if (!this.state.isActive) {
				this.setState({
					isActive: true,
					width : this.refs.scrolldiv.getBoundingClientRect().width
				});
			}
		} else if (this.state.isActive) {
			this.setState({
				isActive: false,
				width : this.refs.scrolldiv.getBoundingClientRect().width
			});
		}
	}
}


