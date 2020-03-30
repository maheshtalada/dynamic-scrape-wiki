import React  from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../default-component/default-component';
import Cx from 'classnames';

/**
 * @description Creates a labelless text display component
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class ContentComponent extends DefaultComponent {

	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__content']
	};

	renderLabel(label) {
		return (null);
	}

	renderValue(value) {
		const { label, data, labelInfo, l, labelPostfix } = this.props;
		let valueTooltip = this.renderTooltip();
		valueTooltip.unshift(value);

		return (
			<span className={Cx(this.getLabelToClass(label))}>
				<span className={this.getLabelClassNames()} style={{display:'inline-block'}} data-automation-selector={this.getDataId('label')}>
					{`${l(label)} ${labelInfo ? `(${l(labelInfo)})` : ''} ${labelPostfix ? `${l(labelPostfix)} ` : ''} ${ String(data.separator) === 'false' ? '' : ':'}`}
				</span>
				{value && <span className={this.getValueClassNames()} style={{ 'paddingLeft' : '5px' ,display:'inline-block'}} data-automation-selector={this.getDataId('value')}>
					<strong>{l(value)}</strong>
				</span>}
				{data && data.tooltip && this.renderTooltip()}
			</span>
		);

	}

}


