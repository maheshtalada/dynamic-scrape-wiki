import React from 'react';
import DefaultComponent from '../default-component/default-component';
import Cx from 'classnames';
/**
 * @description Example component used to show mean ratio values
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CustomRatioBarComponent extends DefaultComponent {

	static defaultProps = {
		classNames: ['schema__custom-ratio-bar'],
		backgroundColors : ['#000', '#ccc']
	};

	constructor(props) {
		super(props);
	}

	renderLabel(label) {
		return (null);
	}

	renderValue(value) {
		const { label, data, l } = this.props;
		let valueTooltip = this.renderTooltip();
		valueTooltip.unshift(value);

		return (
			<div className={Cx(this.getLabelToClass(label))}>
				<span className={this.getLabelClassNames()} style={{display:'inline-block'}} data-automation-selector={this.getDataId('label')}>
					{`${l(label)} ${ String(data.separator) === 'false' ? '' : ':'}`}
				</span>
				<span className={Cx('schema__custom-ratio-bar__wrapper')} data-automation-selector={this.getDataId('value')}>
					{this.renderRatioBar(data)}
				</span>
			</div>
		);

	}

	renderRatioBar({value, backgroundColor}) {
		return (
			<div className="schema__custom-ratio-bar__bars">
				<span className="schema__custom-ratio-bar__bar" style={{width:`${value[0]}%`, backgroundColor: backgroundColor[0]}}>{`${value[0]}%`}</span>
				<span className="schema__custom-ratio-bar__bar" style={{width:`${value[1]}%`, backgroundColor: backgroundColor[1]}}>{`${value[1]}%`}</span>
			</div>
		)
	}

}


