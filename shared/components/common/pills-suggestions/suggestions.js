import React, { Component } from "react";
import PropTypes from 'prop-types';
import { isEqual } from "lodash";
import { Scrollbars } from 'react-custom-scrollbars';

const MINQUESRYLENGTH = 2;
const maybeScrollSuggestionIntoView = (suggestionEl, suggestionsContainer) => {
	const containerHeight = suggestionsContainer.offsetHeight;
	const suggestionHeight = suggestionEl.offsetHeight;
	const relativeSuggestionTop =
		suggestionEl.offsetTop - suggestionsContainer.scrollTop;

	if (relativeSuggestionTop + suggestionHeight >= containerHeight) {
		suggestionsContainer.scrollTop +=
			relativeSuggestionTop - containerHeight + suggestionHeight;
	} else if (relativeSuggestionTop < 0) {
		suggestionsContainer.scrollTop += relativeSuggestionTop;
	}
};

export default class Suggestions extends Component {
	static propTypes = {
		query: PropTypes.string.isRequired,
		selectedIndex: PropTypes.number.isRequired,
		suggestions: PropTypes.array.isRequired,
		handleClick: PropTypes.func.isRequired,
		handleHover: PropTypes.func.isRequired,
		minQueryLength: PropTypes.number,
		shouldRenderSuggestions: PropTypes.func,
		defaultShowSuggestions : PropTypes.bool,
		classNames: PropTypes.object,
	};

	static defaultProps = {
		minQueryLength : MINQUESRYLENGTH,
		defaultShowSuggestions : false
	};

	shouldComponentUpdate(nextProps) {
		const { props } = this;
		const shouldRenderSuggestions =
			props.shouldRenderSuggestions || this.shouldRenderSuggestions;
		return (
			!isEqual(props.suggestions, nextProps.suggestions, nextProps.defaultShowSuggestions) ||
			shouldRenderSuggestions(nextProps.query, nextProps.minQueryLength, nextProps.defaultShowSuggestions) ||
			shouldRenderSuggestions(nextProps.query, nextProps.minQueryLength, nextProps.defaultShowSuggestions) !=
			shouldRenderSuggestions(props.query, props.minQueryLength, props.defaultShowSuggestions)
		);
	};

	componentDidUpdate(prevProps) {
		const suggestionsContainer = this.refs.suggestionsContainer;
		const { selectedIndex, classNames } = this.props;

		if (suggestionsContainer && prevProps.selectedIndex !== selectedIndex) {
			const activeSuggestion = suggestionsContainer.querySelector(
				'pills-suggestions__suggestions__activeSuggestion'
			);

			if (activeSuggestion) {
				maybeScrollSuggestionIntoView(activeSuggestion, suggestionsContainer);
			}
		}
	};

	markIt(input, query) {
		const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
		return {
			__html: input.replace(RegExp(escapedRegex, "gi"), "<mark>$&</mark>"),
		};
	};

	shouldRenderSuggestions(query, minQueryLength, defaultShowSuggestions) {
		return query.length >= minQueryLength || defaultShowSuggestions;
	};

	renderSuggestions() {
		const { suggestions, handleClick, handleHover, selectedIndex, classNames, query } = this.props;
		return suggestions.map(
			(item, i) => (
				<li
					key={i}
					onMouseDown={(e)=>handleClick(e, i)}
					onMouseOver={(e)=>handleHover(e, i)}
					className={
						i == selectedIndex ? 'pills-suggestions__suggestions__activeSuggestion' : ""
					}>
					<span dangerouslySetInnerHTML={this.markIt(item, query)} />
				</li>
			)
		);
	}

	render() {

		if(!this.shouldRenderSuggestions(this.props.query, this.props.minQueryLength, this.props.defaultShowSuggestions)) {
			return null
		}

		return (
			<div
				ref="suggestionsContainer"
				className="pills-suggestions__suggestions">
				<ul> {this.renderSuggestions()} </ul>

			</div>
		);
	};
}

