import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

const ANIMATION_LENGTH = 250;

export default class Snackbar extends Component {
	constructor(props) {
		super(props);
		this.clearTimer = this.clearTimer.bind(this);
		this.timeoutId = null;
		this.clearTimeoutId = null;
		this.state = {
			open: false
		}
	}

	static propTypes = {
		action: PropTypes.string,
		active: PropTypes.bool.isRequired,
		className: PropTypes.string,
		onActionClick: PropTypes.func,
		onTimeout: PropTypes.func.isRequired,
		timeout: PropTypes.number
	};

	static defaultProps = {
		timeout : 2750,
		className : 'success'
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			open: nextProps.active
		});
	}

	componentDidUpdate() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}

		if (this.props.active) {
			this.timeoutId = setTimeout(this.clearTimer, this.props.timeout);
		}
	}

	componentWillUnmount() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
		if (this.clearTimeoutId) {
			clearTimeout(this.clearTimeoutId);
			this.clearTimeoutId = null;
		}
	}

	clearTimer() {
		this.timeoutId = null;
		this.setState({
			open: false
		});

		this.clearTimeoutId = setTimeout(()=>{
			this.clearTimeoutId = null;
			this.props.onTimeout();
		}, ANIMATION_LENGTH);
	}

	render() {
		const { action, active, className, children, onActionClick } = this.props;
		const { open } = this.state;
		const classes = Cx('mdl-snackbar print-hide',{
			'mdl-snackbar--active' : open
		},className);

		return (
			<div className={classes}>
				<div className="mdl-snackbar__text">
					{active && children}
				</div>
				{active && action &&
					<button className="mdl-snackbar__action" onClick={onActionClick}>
						{action}
					</button>
				}
			</div>
		)
	}
}
