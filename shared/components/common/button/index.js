import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

export class Button extends Component {

	static propTypes = {
		className: PropTypes.string,
		children: PropTypes.node,
		onClick: PropTypes.func,
		btnText: PropTypes.string,
		btnClassName : PropTypes.string,
		disabled : PropTypes.string
	};

	static defaultProps = {
		onClick: () => {},
		btnText: 'Button',
		className: '',
		btnClassName: 'btn-primary'
	};

	constructor(props) {
		super(props);
		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick();
	}

	render() {

		const { btnText, className, btnClassName, ...inputProps} = this.props;
		return(
			<div className={Cx('input-field',className)}>
				<button className={Cx('btn',btnClassName)} onClick={this.handleClick} {...inputProps}>
					{ this.props.children ? this.props.children : btnText}
				</button>
			</div>
		);

	}

}


