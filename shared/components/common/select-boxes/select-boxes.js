import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedRadio from './masked-radio';
import { range as _range } from 'lodash';
const MAX_BOXES = 5;

export default class SelectBoxes extends Component {

	static propTypes = {};

	static defaultProps = {
		onChange: () => {
		},
		name: undefined,
		maxBoxes: 5,
		minConst : 0,
		emptyLabel : 'Any',
		analyticsData : {}
	};

	static contextTypes = {
		i18n: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedBoxes  : props.selectedBoxes &&  props.selectedBoxes.replace('-','').split(',') || []
		};

	}

	isDisabled(min, max, value) {
		//const Math.max(Math.min(max, value),min);
		if(value <= max && value >= min) {
			return false;
		}
		return true;
	}

	renderMaskedBox() {
		const { name, min, max, analyticsData } = this.props;
		const { selectedBoxes } = this.state;
		const boxes =this.getBoxesRange();
		const { l } = this.context.i18n;
		return boxes.map((key, index) => (<MaskedRadio
				analyticsData={analyticsData}
				onChange={(evt, val) => this.onChange(evt, val)}
				name={name}
				value={key}
				l={l}
				disable={this.isDisabled(min, max, key)}
				selectedValue={selectedBoxes.indexOf(String(key)) > -1}
				label={`${key}${key === boxes.length ? '+' : ''}`}
			/>))
	}

	render() {
		const { name, emptyLabel, analyticsData} = this.props;
		const { selectedBoxes } = this.state;
		return (
			<div className="select-boxes masked__radio">
				<MaskedRadio
					 onChange={(evt, val) => this.onChange(evt, val)}
					 name={name}
					 value={0}
					 disable={false}
					 selectedValue={ selectedBoxes.join(',') === '' }
					 label={emptyLabel}
					 analyticsData={analyticsData}
				 />

				{this.renderMaskedBox()}

			</div>
		)
	}

	getBoxesRange() {
		/*const { min, max } = this.props;
		const { selectedBoxes } = this.state;
		const maxConstant = min + MAX_BOXES;
		let maxNumber, minNumber;
		if(selectedBoxes.length) {
			maxNumber = Math.max(maxConstant,Math.max.apply(null,selectedBoxes)+1);
			minNumber = Math.max((maxNumber - MAX_BOXES),min);
		}else {
			minNumber = min;
			maxNumber = maxConstant;
		}
		this.maxBoxNumber = Math.min(maxNumber, max);*/
		this.maxBoxNumber = this.props.maxBoxes;
		return _range(1, this.props.maxBoxes)
	}

	onChange(evt, val) {
		const maxNumber =  (this.maxBoxNumber-1);
		let selectedBoxes  = this.state.selectedBoxes;
		let selectedValue = undefined;
		// if no selection , i.e 'any'
		if(val === this.props.minConst) {
			selectedValue = '';
			selectedBoxes=[];
		}else if(val === maxNumber) {
			//if val is max
			if(evt.target.checked) {
				selectedBoxes = [];
				selectedValue = `${String(maxNumber)}-`;
				selectedBoxes.push(String(maxNumber))
			} else {
				selectedValue = '';
				selectedBoxes=[];
			}
		}else if(evt.target.checked) {
			const deleteMax = selectedBoxes.indexOf(String(maxNumber));
			deleteMax > -1 && selectedBoxes.splice(deleteMax, 1);
			selectedBoxes.push(String(val))
			selectedValue = selectedBoxes.join(',')
		}else {
			const deleteIndex = selectedBoxes.indexOf(String(val));
			if (deleteIndex > -1) {
				selectedBoxes.splice(deleteIndex, 1);
				selectedValue = selectedBoxes.join(',')
			}
		}

		this.setState({
			selectedBoxes : selectedBoxes
		},this.props.onChange(selectedValue))

	}
}

