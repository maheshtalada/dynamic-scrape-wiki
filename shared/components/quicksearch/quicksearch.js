import React, {Component } from 'react';
import SearchWidget from './searchwidget';

export default class QuickSearch extends Component {

	render() {
		return (
			<SearchWidget {...this.props}/>
		);
	}
}
