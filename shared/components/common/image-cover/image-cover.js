import React, {Component } from 'react';
import PropTypes from 'prop-types';
import ImageNotFound from '../image-not-found/image-not-found';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/*
  Description : will create cover for image with 2 options
  src -  will have image tag & source
  background -  will be background with element
 */

const SOURCE_IMG = 'src',
	  SOURCE_BG = 'bg';

export default class ImageCover extends Component {

	static propTypes = {
		source : PropTypes.string,
		imagePath : PropTypes.string,
		onClick : PropTypes.func
	};

	static contextTypes = {
		i18n : PropTypes.object
	};

	static defaultProps = {
		source : 'src',
		imagePath : '',
		onClick : () => {}
	};

	constructor(props) {
		super(props);
	}

	getImageDimensions() {
		const { imagePath } = this.props;
		var img = new Image();
		img.onload = function() {
			console.log(this.width + 'x' + this.height);
		}
		img.src = imagePath;
	}

	render() {

		const { source, imagePath, onClick, linkUrl } = this.props;
		const { l } = this.context.i18n;
		const isInvalidImagePath = imagePath.indexOf('undefined') > -1;
		const imageComp = isInvalidImagePath ? 
				<ImageNotFound textToShow={`${l('PROPERTYIMAGEMISSING')}`} classNames="image-cover__image"/> : 
			<LazyLoadImage visibleByDefault={true} src={imagePath} alt={imagePath} className="image-cover__image" />;
		const imageCompWrap = linkUrl ? <a href={linkUrl}>{imageComp}</a> : imageComp;

		return (
			<div className="image-cover" onClick={()=>{
				!isInvalidImagePath && onClick();
			}}>
				{
					source === SOURCE_BG ?
					<div className="image-cover__background">
						{imageCompWrap}
						<div className="image-cover__layer">
							{ this.props.children}
						</div>
					</div> :
					<div className="image-cover__src">
						{imageCompWrap}
					</div>
				}
			</div>
		);

	}
}
