import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


export default class 	LanguageSwitch extends Component {
	static propTypes = {
		languages        : PropTypes.arrayOf(PropTypes.object),
		selectedLanguage : PropTypes.string,
		className        : PropTypes.func,
		onSelectLanguage : PropTypes.func.isRequired,
		canMenuOpen 	 : PropTypes.bool
	};

	handleSelectValueChange(lang) {
		this.props.onSelectLanguage(lang,this.props.selectedLanguage);
	}

	render() {

		const { languages } = this.props;

		return (

			<ul className="dropdown-menu hdropdown" style={{display: 'block'}}>
				{
					languages.map(lang =>
						<li key={Object.keys(lang)[0]}>
							<a onClick={this.handleSelectValueChange.bind(this,Object.keys(lang)[0])} data-tag-category="Header Links" data-tag-action="click" data-tag-label="Language" data-tag-value={lang[Object.keys(lang)[0]]}>{lang[Object.keys(lang)[0]]}</a>
						</li>
					)
				}
			</ul>
		);
	}
}
