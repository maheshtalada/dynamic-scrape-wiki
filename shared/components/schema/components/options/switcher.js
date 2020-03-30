import React from 'react';
import DefaultComponent from '../default-component/default-component';
import Switch from '../../../common/switch/switch';

export default class SwitcherComponent extends DefaultComponent {

	constructor(props) {
		super(props);
	}

	onChange(evt) {
		const { data = {} } = this.props;
		const storeValue = data.isReverse ? String(!evt.currentTarget.checked) : String(evt.currentTarget.checked);
		this.props.storeValue(this.props.id, storeValue);
	}

	render() {
		const { l, data='', label } = this.props;

		const value = data && data.value || 'false';
		const boolValue = data.isReverse ? !this.getBoolean(value) : this.getBoolean(value);
		return (
			<div ref="bar" className="simple-switcher__wrapper">
				<span>{l(label)}</span>
				<Switch
					onChange={this.onChange.bind(this)}
					key={this.state.uniqueId}
					id={`switch${this.state.uniqueId}`}
					l={l}
					checked={boolValue}
				/>
			</div>
		);
	}


}


