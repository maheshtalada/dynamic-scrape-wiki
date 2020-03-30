import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from './header';

/**
 * @description Renders a smaller width version of the radio component
 */

export default class HeaderSubheaderAppendixComponent extends HeaderComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__header', 'schema__header__subheader__appendix']
	};


	toggleAppendix() {
		let componentList = this.props.tabs,
			firstChild = this.props.root().children[0];

		if (firstChild && (firstChild.type === 'list-removable' || firstChild.subtype === 'list-removable')) {
			firstChild.remove();
		} else {
			this.props.root().inject(componentList, 0, '');
		}
	}

	renderLabel() {
		const { l, label, data } = this.props;
		return (
			<div className={this.getLabelClassNames()}
				 data-automation-selector={this.getDataId('label')}>
				<h1>
					{l(label)}
					{this.renderLabelInfo()}
					{this.renderTooltip()}
				</h1>
				<a tabIndex="0" onClick={this.toggleAppendix.bind(this)}>{l(data.value)}</a>
			</div>
		);
	}
}


