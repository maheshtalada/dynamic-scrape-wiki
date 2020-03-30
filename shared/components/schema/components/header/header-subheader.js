import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from './header';

/**
 * @description Renders a smaller width version of the radio component
 */

export default class HeaderSubheaderComponent extends HeaderComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__header', 'schema__header__subheader']
	};

	renderLabel() {
		const { l, label, data } = this.props;
		return (
			<div className={this.getLabelClassNames()}
				data-automation-selector={this.getDataId('label')}>
				{label && <h1>
					{l(label)}
					{this.renderLabelInfo()}
					{this.renderTooltip()}
				</h1>}
				{data.value &&
					<h2>
						{l(data.value)}
					</h2>
				}
			</div>
		);
	}
}


