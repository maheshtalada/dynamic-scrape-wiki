import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox/checkbox';
import Cx from 'classnames';
import uniqueId from '../../../utils/uniqueFormId';

export default class TermsConditions extends Component {

	static propTypes = {
		link : PropTypes.string.isRequired,
		linkText : PropTypes.string,
		termsTitle : PropTypes.string.isRequired,
		onTermsSelect : PropTypes.func.isRequired,
		isError : PropTypes.bool,
		classes : PropTypes.object
	};

	static defaultProps = {
		classes : ['schema__text'],
		link: 'TERMSCONDITIONSLINK',
		linkText : 'TERMSCONDITIONS',
		termsTitle : 'TERMSCONDITIONSTITLE'
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.state = {};
	}

	onChange(evt) {
		this.props.onTermsSelect && this.props.onTermsSelect(evt.target.checked);
	}

	render() {
		const { l } = this.context.i18n;
		const { linkText, termsTitle, link, isError, isAgreeTerms } = this.props;
		const errorClass = isError ? 'error-border' : '';
		return (
			<div className={Cx('terms-conditions',errorClass)}>
				<Checkbox checked={isAgreeTerms} label={<span>{l(termsTitle)}<a href={link} target="_blank">{l(linkText)}</a></span>} name="termsconditions" key="termsconditions" id={`terms-conditions-user-sign-up-${uniqueId()}`} onChange={this.onChange} />
			</div>
		);
	}
}
