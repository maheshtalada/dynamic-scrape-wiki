import React from 'react';
import TextAutoSuggestion from '../text/text-auto-suggestion';
import US_STATES from 'assets/static/us-states.json';

/**
 * @description Renders a custom state suggestion component
 */

export default class CustomStateSuggestionComponent extends TextAutoSuggestion {

	constructor(props) {
        super(props);
        this.suggestions = Object.values(US_STATES);
	}

}
