import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultComponent from '../../defaultComponent';

export default class ImageComponent extends DefaultComponent {

	static defaultProps = {
		isBorderRequired :  false,
		classNames : ["pdf-schema__image"],

	};

	static propTypes = {
		isBorderRequired : PropTypes.boolean,
		classNames : PropTypes.array
	}

	constructor(props) {
		super(props);
	}

	renderLabel() {
		return null;
	}

	render() {
		let className = this.getClassNames();
		const { value } = this.props.data;
		const styles = {
			border : this.props.isBorderRequired ? '1px sloid' : 'none'
		};
		return (
			<div className={className}>
				<img className="pdf-schema__image__auto-resize" src={`${this.props.awsImagePath}/${value}`} style={styles} />
			</div>
		);

	}

}


