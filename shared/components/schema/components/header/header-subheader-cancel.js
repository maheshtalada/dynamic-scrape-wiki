import React from 'react';
import PropTypes from 'prop-types';
import HeaderSubHeaderComponent from './header-subheader';

/**
 * @description Renders a smaller width version of the radio component
 */

export default class HeaderSubheaderCancelComponent extends HeaderSubHeaderComponent {
	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__header', 'schema__header__subheader', 'schema__header__subheader__cancel']
	};

	onClick(e) {
		e.preventDefault();
		if (this.props.data.listenerType) {
			this.props.fireEvent(this.props.data.listenerType, this.props.data.listenerValues);
		}
	}

	renderCancelLink() {
		return (
			<a href="" className="schema__header__subheader__cancel__link" onClick={this.onClick.bind(this)} />
		);
	}

	renderLabel() {
		const { l, label, data } = this.props;
		return (
			<div className={this.getLabelClassNames()}
				data-automation-selector={this.getDataId('label')}>
				<h1>
					{l(label)}
					{this.renderCancelLink()}
					{this.renderTooltip()}
				</h1>
				<h2>
					{l(data.value)}
				</h2>
			</div>
		);
	}
}


