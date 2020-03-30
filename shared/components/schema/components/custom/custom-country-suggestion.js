import React from 'react';
import TextAutoSuggestion from '../text/text-auto-suggestion';
import COUNTRIES from 'assets/static/countries.json';

/**
 * @description Renders a custom country suggestion component
 */

export default class CustomCountrySuggestionComponent extends TextAutoSuggestion {

	constructor(props) {
        super(props);
        this.suggestions = Object.values(COUNTRIES);
	}

}
