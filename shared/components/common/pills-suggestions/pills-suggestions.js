import React, { Component } from "react";
import PropTypes from 'prop-types';
import Suggestions from "./suggestions";
/*import Tag from "./pills";*/

// Constants
const Keys = {
	ENTER: 13,
	TAB: 9,
	BACKSPACE: 8,
	UP_ARROW: 38,
	DOWN_ARROW: 40,
	ESCAPE: 27,
};

const DEFAULT_PLACEHOLDER = "Add new tag";

const DefaultClassNames = {
	tags: "pills-suggestions__tags",
	tagInput: "pills-suggestions__tagInput",
	tagInputField: "pills-suggestions__pill-input-field",
	selected: "ReactTags__selected",
	tag: "ReactTags__tag",
	remove: "ReactTags__remove",
	suggestions: "ReactTags__suggestions",
	activeSuggestion: "ReactTags__activeSuggestion",
};

export default class PillsSuggestions extends Component {

	static PropTypes = {
		isAddNewPill : PropTypes.bool,
		isFullPill : PropTypes.bool,
		errorClass : PropTypes.string,
		placeholder: PropTypes.string,
		suggestions: PropTypes.array,
		delimiters: PropTypes.array,
		autofocus: PropTypes.bool,
		handleDelete: PropTypes.func.isRequired,
		handleAddition: PropTypes.func.isRequired,
		handleFilterSuggestions: PropTypes.func,
		allowDeleteFromEmptyInput: PropTypes.bool,
		handleInputChange: PropTypes.func,
		handleInputBlur: PropTypes.func,
		minQueryLength: PropTypes.number,
		shouldRenderSuggestions: PropTypes.func,
		removeComponent: PropTypes.func,
		autocomplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
		name: PropTypes.string,
		id: PropTypes.string,
		maxLength: PropTypes.string,
		showOnFocus : PropTypes.bool,
		pills: PropTypes.object.isRequired,
		classNames: PropTypes.object,
		renderPill : PropTypes.func.isRequired,
		renderPills : PropTypes.func.isRequired,
		updateInputValue : PropTypes.bool
	};

	static defaultProps = {
		isAddNewPill : true,
		isFullPill : false,
		errorClass : null,
		placeholder: DEFAULT_PLACEHOLDER,
		pills: [],
		suggestions: [],
		delimiters: [Keys.ENTER, Keys.TAB],
		autofocus: false,
		showOnFocus : true,
		inline: true,
		allowDeleteFromEmptyInput: true,
		minQueryLength: 2,
		autocomplete: false,
		labelField: "text",
		renderPill : ()=>{},
		renderPills : ()=>{},
		updateInputValue : false
	};

	constructor(props) {
		super(props);

		this.state = {
			suggestions: this.props.suggestions,
			query: "",
			selectedIndex: -1,
			selectionMode: false,
			showDefaultSuggestions : false
		};

		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePaste = this.handlePaste.bind(this);
		this.resetAndFocusInput = this.resetAndFocusInput.bind(this);
		this.handleSuggestionHover = this.handleSuggestionHover.bind(this);
		this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
	}

	componentWillMount() {
		this.setState({
			classNames: { ...DefaultClassNames, ...this.props.classNames },
		});
	}

	resetAndFocusInput() {
		this.textInput.value = "";
		this.textInput.focus();
	}

	componentDidMount() {
		const { autofocus, updateInputValue, defaultInputValue } = this.props;
		if (autofocus && !updateInputValue) {
			this.resetAndFocusInput();
		}
		if(updateInputValue) {
			this.textInput.value = defaultInputValue
		}
	}

	filteredSuggestions(query, suggestions) {
		if (this.props.handleFilterSuggestions) {
			return this.props.handleFilterSuggestions(query, suggestions);
		}

		return suggestions.filter(function(item) {
			return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
		});
	}

	componentWillReceiveProps(props) {
		const suggestions = this.filteredSuggestions(
			this.state.query,
			props.suggestions
		);
		this.setState({
			showDefaultSuggestions : false,
			suggestions: suggestions,
			classNames: { ...DefaultClassNames, ...props.classNames },
		});
	}

	handleDelete(i, e) {
		this.props.handleDelete && this.props.handleDelete(i);
		this.setState({ query: "" });
		this.resetAndFocusInput();
	}

	handleChange(e) {
		if (this.props.handleInputChange) {
			this.props.handleInputChange(e.target.value.trim());
		}

		const query = e.target.value.trim();
		const suggestions = this.filteredSuggestions(query, this.props.suggestions);

		this.setState({
			query: query,
			suggestions: suggestions,
			showAddPill: query.length > 0,
			selectedIndex: 0 // always default to first on changes
		});
	}

	handleBlur(e) {
		const value = e.target.value.trim();
		if (this.props.handleInputBlur) {
			this.props.handleInputBlur(value);
			this.textInput.value = "";
		}

		this.setState({
			query: '',
			suggestions: [],
			selectedIndex: -1,
		});
	}

	handleFocus(e) {
		if(!this.props.showOnFocus){
			return;
		}
		const query = e.target.value.trim();
		let suggestions = this.props.suggestions;
		const selectedIndex = 0;

		// if(query) {
		// 	suggestions = this.filteredSuggestions(query, suggestions);
		// }
		this.setState({
			query,
			suggestions,
			selectedIndex,
			selectionMode: true,
			showDefaultSuggestions : this.props.showOnFocus
		});
	}

	handleKeyDown(e) {
		let { query, selectedIndex, suggestions } = this.state;

		// hide suggestions menu on escape
		if (e.keyCode === Keys.ESCAPE) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				selectedIndex: -1,
				selectionMode: false,
				suggestions: [],
			});
		}

		// When one of the terminating keys is pressed, add current query to the tags.
		// If no text is typed in so far, ignore the action - so we don't end up with a terminating
		// character typed in.
		if (this.props.delimiters.indexOf(e.keyCode) !== -1 && !e.shiftKey) {
			if (e.keyCode !== Keys.TAB || (!this.props.showOnFocus && query !== "")) {
				e.preventDefault();
			}

			if (this.props.showOnFocus || query !== "") {
				if (this.state.selectionMode && this.state.selectedIndex != -1) {
					query = this.state.suggestions[this.state.selectedIndex];
				}
				this.addPill(query);
			}
		}

		// when backspace key is pressed and query is blank, delete tag
		if (
			e.keyCode === Keys.BACKSPACE &&
			query == "" &&
			this.props.allowDeleteFromEmptyInput
		) {
			this.handleDelete(this.props.pills.length - 1);
		}

		// up arrow
		if (e.keyCode === Keys.UP_ARROW) {
			e.preventDefault();

			let { selectedIndex, suggestions } = this.state;

			selectedIndex = selectedIndex <= 0
				? 0
				: selectedIndex - 1;

			this.setState({
				selectedIndex: selectedIndex,
				selectionMode: true,
			});
		}

		// down arrow
		if (e.keyCode === Keys.DOWN_ARROW) {
			console.log('down')
			e.preventDefault();
			this.setState({
				selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
				selectionMode: true,
			});
		}
	}

	handlePaste(e) {
		e.preventDefault();

		// See: http://stackoverflow.com/a/6969486/1463681
		const escapeRegex = str =>
			str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

		// Used to determine how the pasted content is split.
		const delimiterChars = escapeRegex(
			this.props.delimiters
				.map(delimiter => {
					// See: http://stackoverflow.com/a/34711175/1463681
					const chrCode = delimiter - 48 * Math.floor(delimiter / 48);
					return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
				})
				.join("")
		);

		const clipboardData = e.clipboardData || window.clipboardData;
		const string = clipboardData.getData("text");
		const regExp = new RegExp(`[${delimiterChars}]+`);
		string.split(regExp).forEach(tag => this.props.handleAddition(tag));
	}

	addPill(tag, i) {
		if (this.props.autocomplete) {
			const possibleMatches = this.filteredSuggestions(
				tag,
				this.props.suggestions
			);

			if (
				(this.props.autocomplete === 1 && possibleMatches.length === 1) ||
				(this.props.autocomplete === true && possibleMatches.length)
			) {
				tag = possibleMatches[0];
			}
		}

		// call method to add
		this.props.handleAddition(tag, i);

		// reset the state
		this.setState({
			query: "",
			selectionMode: false,
			selectedIndex: -1,
			showAddPill: false
		});
		if(this.props.updateInputValue) {
			this.textInput.value = tag;
		} else {
			this.resetAndFocusInput();
		}
	}

	handleSuggestionClick(e, i) {
		this.addPill(this.state.suggestions[i], i);
	}

	handleSuggestionHover(i, e) {
		this.setState({
			selectedIndex: i,
			selectionMode: true,
		});
	}

	renderPills() {
		const { pills, isFullPill } = this.props;
		const pillElements = pills.map((pill, index) => {
			return this.props.renderPill(
				index,
				pill,
				isFullPill
			);
		});
		return pillElements
	}

	render() {

		const  { query, selectedIndex, suggestions, showAddPill } = this.state;
		const { placeholder, maxLength, isAddNewPill, errorClass, translator } = this.props;

		return (
			<div className={`pills-suggestions${errorClass ? ' error' : ''}`}>
				<div className="pills-suggestions__suggestions-wrapper">
					<div className="pills-suggestions__input-wrapper">
					<input
						ref={input => {
							this.textInput = input;
						}}
						className={this.state.classNames.tagInputField}
						type="text"
						placeholder={placeholder}
						aria-label={placeholder}
						onBlur={this.handleBlur}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
						onPaste={isAddNewPill && this.handlePaste}
						onFocus={this.handleFocus}
						name={this.props.name}
						id={this.props.id}
						maxLength={maxLength}
					/>
					{isAddNewPill && showAddPill && <button className="btn btn-default pill-add-btn" onClick={()=>{this.addPill(this.textInput.value)}}>
						<i className="pe-7s-plus"/>
						{translator('ADD')}
					</button>
					}
					</div>
					<div className="pills-suggestions__pills-wrapper">{this.renderPills()}</div>

					<Suggestions
						query={query.trim()}
						suggestions={suggestions}
						selectedIndex={selectedIndex}
						handleClick={this.handleSuggestionClick}
						handleHover={this.handleSuggestionHover}
						minQueryLength={this.props.minQueryLength}
						defaultShowSuggestions = {this.state.showDefaultSuggestions}
						shouldRenderSuggestions={this.props.shouldRenderSuggestions}
						classNames={this.state.classNames}
					/>
				</div>
			</div>
		);
	}
}

