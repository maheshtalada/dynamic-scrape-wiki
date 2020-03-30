import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';

/**
 * @description Renders a component with a header and children
 * @prop classNames {array} Additional classnames to be added to the component
 */

export default class CardInitialsComponent extends Card {


	static propTypes = {
		classNames: PropTypes.array
	};

	static defaultProps = {
		classNames: ['schema__card', 'schema__card__initials']
	};

	renderLabel() {
		return (
			<div className="schema__card__initials__box">
				{this.getInitials(this.props.data.value || '')}
			</div>
		);
	}

	getInitials(value) {
		let wordArray = value.split(' ');

		if (wordArray.length <= 1) {
			return wordArray;
		}

		let initials = wordArray.map((word)=>{
			return word.length && word[0].toUpperCase() || '';
		});

		return initials;
	}

}


