import React from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import { RangeSlider } from '../../../common/range-slider';

/**
 * @description Renders a slider component with a set of children
 * @prop data {array} Additional props for component
 */

export default class SliderComponent extends DefaultComponent {

	static propTypes = {
		label: PropTypes.string,
		classNames: PropTypes.array
	};

	static defaultProps = {
		label: '',
		classNames: ['schema__options', 'schema__slider']
	};

	constructor(props) {
		super(props);
	}

	onSliderChange(value) {
		this.props.storeValue(this.props.id, value);
	}

	renderSlider(value) {
		let className = this.getValueClassNames();
		return (
			<span className={className} data-automation-selector={this.getDataId('slider')}>
				<RangeSlider key={this.state.uniqueId}
							 title={this.props.label}
							 min={0}
							 max={this.props.data.maxValue}
							 step={this.props.data.step || ''}
							 defaultValue={this.getSliderValue(this.props.data.maxValue,value)}
							 className="slider-wrapper"
							 uom={this.props.data.uom || ''}
							 onAfterChange={this.onSliderChange.bind(this)}
					/>
				{this.props.error &&
				<div className="schema__error" key="error">{this.props.error}</div>
				}
			</span>
		);
	}

	renderReadValue(value) {
		// return super.renderValue(label);
		return null;
	}

	renderValue(value) {
		return this.props.writeMode ? this.renderSlider(value) : this.renderReadValue(value);
	}

}

