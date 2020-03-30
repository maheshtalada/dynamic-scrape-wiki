import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

class CheckBox extends Component {
	static propTypes = {
		checked: PropTypes.bool,
		onChange:  PropTypes.fun
	};

	static defaultProps = {
		value: 'checked',
		checked: false,
		onChange: () => {},
		analyticsData : {
			category : "Checkbox element"
		}
	};

	static contextTypes = {
		router: PropTypes.object,
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {checked: props.checked};
	}

	componentWillReceiveProps(newProps) {
		if(newProps.checked !== this.state.checked) {
			this.setState({
				checked : newProps.checked
			});
		}
	}

	onChange(evt) {
		this.setState({
			checked : evt.target.checked
		});
		if(typeof this.props.onChange === 'function' ) {
			this.props.onChange(evt);
		}
	}

	render() {
		const {label = '', name = '', id = '', value, className='', analyticsData, renderLabel} = this.props;
		const {checked} = this.state;
		return (
			<div className={Cx("mdl-checkbox-group",className)}>
				<input data-tag-category={analyticsData.category} data-tag-action={analyticsData.action} data-tag-label={`${analyticsData.label} ${label}`} id={id} name={name} onChange={this.onChange} type="checkbox" data-automation-selector="input-checkbox" checked={checked} value={value}/>
				<label htmlFor={id}>{renderLabel ? renderLabel() : label}</label>
			</div>
		);
	}
}

export default (CheckBox);
