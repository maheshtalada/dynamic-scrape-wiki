import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

class SmartInput extends Component {
	static propTypes = {
		label: PropTypes.string,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		type: PropTypes.string,
		icon: PropTypes.string,
		classes: PropTypes.string,
		parentClass: PropTypes.string,
		required: PropTypes.bool,
		autoFocus: PropTypes.bool,
		onClick: PropTypes.func,
		onChange: PropTypes.func,
		inputType:PropTypes.string
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	static defaultProps = {
		value: '',
		label: '',
		placeholder: '',
		type: 'text',
		icon: '',
		classes: '',
		autoFocus: false,
		required: false,
		onClick : () => {},
		onChange: () => {},
		inputType: 'text'

	};

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.state = {active: false, value: props.value};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) {
			this.setState({value: nextProps.value});
		}
	}

	toggle() {
		const {active} = this.state;
		this.setState({active: !active});
		if(this.props.onFocus) {
			this.props.onFocus();
		}
	}
	onClick() {
		this.props.onClick();
	}
	onChange(props) {
		this.setState({value: props.target.value});
		this.props.onChange(props.target.value);
	}

	render() {
		const {label = '', placeholder = '', type, icon, required, classes, parentClass, autoFocus, onKeyUp, id, inputType} = this.props;
		const {active, value} = this.state;
		const { l } = this.context.i18n;

		return (
    		<div className={Cx('input-field',parentClass)}>
    			{icon && (<i className={'icon ' + icon} />)}
				{label && (<label>{l(label)}{required && (<i>*</i>)}</label>)}
				{ inputType === 'text' ?
					<input id={id} type={type} ref="input" className={Cx('autocomplete', classes)}
						   placeholder={l(placeholder)} required={required} value={value} onClick={this.onClick}
						   onChange={this.onChange} onFocus={this.toggle} onKeyUp={onKeyUp} onBlur={this.toggle}
						   autoFocus={autoFocus}/>
					: <textarea id={id} type={type} ref="input" className={Cx('autocomplete', classes)}
								placeholder={l(placeholder)} required={required} value={value} onClick={this.onClick}
								onChange={this.onChange} onFocus={this.toggle} onKeyUp={onKeyUp} onBlur={this.toggle}
								autoFocus={autoFocus}/>
				}
				{ this.props.children }
		  	</div>
    	);
	}
}

export default (SmartInput);
