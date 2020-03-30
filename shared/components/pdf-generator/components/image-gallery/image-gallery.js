import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultListComponent from '../../defaultComponent';
import ImageComponent from '../image/image';

export default class ImageGalleryComponent extends DefaultListComponent {

	static defaultProps = {
		isBorderRequired :  false,

		classNames : ["pdf-schema__image-gallery"]
	};

	static propTypes = {
		imagePath : PropTypes.string,
		isBorderRequired : PropTypes.boolean,
		classNames : PropTypes.array
	}

	constructor(props) {
		super(props);
	}

	render() {
		let className = this.getClassNames();
		const { medias } = this.props.data;

		return (
			<div className={className}>
				{
					medias.map( data => <div className="pdf-schema__image-gallery__image-wrapper"> <ImageComponent data={{ value : data.uri}} awsImagePath={this.props.awsImagePath}/></div>)
				}
			</div>
		);

	}

}


