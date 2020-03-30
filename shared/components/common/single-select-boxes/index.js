import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedRadio from '../select-boxes/masked-radio';
import Cx from 'classnames';

export default class SingleSelectBoxes extends Component {

	static propTypes = {};

	static defaultProps = {
		onChange: () => {
		},
		name: undefined,
		emptyLabel : 'ANY',
		selectedBox : '',
		analyticsData : {},
		isAnyRequired : true
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedBox  : props.selectedBox,
			boxOptions : props.boxOptions
		};
	}

	getOptionValue(option) {
		return typeof option.value !== 'string' ? option.name : option.value;
	}

	renderMaskedBox() {
		const { name, min, max, analyticsData } = this.props;
		const { selectedBox , boxOptions } = this.state;
		const { l } = this.context.i18n;
		return boxOptions.map((option, index) => (<MaskedRadio
			analyticsData={analyticsData}
			onChange={(evt, val) => this.onChange(evt, val)}
			name={option.label ? l(option.label) : option.name}
			value={this.getOptionValue(option)}
			l={l}
			disable={option.isDisabled}
			selectedValue={selectedBox === this.getOptionValue(option)}
			labelPostfix={l(option.labelPostfix)}
			label={option.label ? l(option.label) : option.name}
		/>))
	}

	render() {
		const { name, emptyLabel, analyticsData, title, isAnyRequired, className} = this.props;
		const { boxOptions, selectedBox } = this.state;
		const { l } = this.context.i18n;
		return (
			
			<div className={Cx("single-select-boxes",className)}>
				{title && <div className="title">{title}</div>}
				<div className="select-boxes masked__radio">
					{isAnyRequired && <MaskedRadio
						analyticsData={analyticsData}
						onChange={(evt, val) => this.onChange(evt, val)}
						name={name}
						value={''}
						disable={false}
						selectedValue={ selectedBox === '' }
						label={l(emptyLabel)}
					/>}

					{this.renderMaskedBox()}
				</div> 
			</div>
		)
	}


	onChange(evt, val) {
		this.setState({
			selectedBox : val
		},this.props.onChange(val))
	}
}

