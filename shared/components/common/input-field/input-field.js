import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

class InputField extends Component {
	static propTypes = {
		label: PropTypes.string,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		type: PropTypes.string,
		icon: PropTypes.string,
		classes: PropTypes.string,
		required: PropTypes.bool,
		onChange : PropTypes.func,
		pattern : PropTypes.string,
		onBlur : PropTypes.func
	};

	static defaultProps = {
		value: '',
		label: '',
		placeholder: '',
		type: 'text',
		icon: '',
		classes: '',
		required: false,
		pattern : '',
		onChange: () => {}
	};

	static contextTypes = {
		i18n : PropTypes.object
	}

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.state = {active: false, value: props.value, isPasswordShow : false};
		this.onTogglePasswordShow = this.onTogglePasswordShow.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({value: nextProps.value});
		}
	}

	toggle() {
		const {active} = this.state;
		this.setState({active: !active});
	}

	onChange(props) {
		this.setState({value: props.target.value});
		this.props.onChange(props.target.value);
	}

	onBlur(props) {
		this.setState({
			value : props.target.value
		});
		if(this.props.onBlur) {
			this.props.onBlur(props.target.value);
		}
	}

	onTogglePasswordShow() {
		this.setState({
			isPasswordShow : !this.state.isPasswordShow,
			modifiedType : !this.state.isPasswordShow ? 'text' : 'password'
		});
	}

	render() {
		const {label = '', placeholder = '', icon, required, type, classes, pattern, id, autoFocus, autoComplete} = this.props;
		const {active, value, isPasswordShow, modifiedType} = this.state;
		const customId = id || 'mdl-input-field-' + label.replace(/[^a-z0-9]/gi, '');
		const { l } = this.context.i18n;
		return (
			<div className={Cx("mdl-input-group",classes)}>
				<input id={customId} type={modifiedType || type} required={required} autoFocus={autoFocus} autoComplete={autoComplete} onChange={this.onChange} onBlur={this.onBlur} value={value}/>
				<label htmlFor={customId}>{label}</label>
				<span className="bar"></span>
				{type === 'password' && value && <button onClick={this.onTogglePasswordShow} className="password-show-toogle-btn">{l(isPasswordShow ? 'HIDE' : 'SHOW')}</button>}
			</div>
		);
	}
}

export default (InputField);
