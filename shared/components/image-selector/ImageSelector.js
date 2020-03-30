import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import SlickArrow from '../common/slick-arrows/slick-arrow-next';
import Cx from 'classnames';
import { getImagePath } from 'utils/propertyUtil';
import { findIndex as _findIndex } from 'lodash';

const SLICK_SETTINGS = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesPerRow: 3,
	rows: 3,
	slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: false,
    nextArrow: <SlickArrow type="next" />,
    prevArrow: <SlickArrow type="prev" />,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
};

export default class ImageSelector extends Component {

    static propTypes = {
        selected : PropTypes.array
    };

    static defaultProps = {
        selected : []
    };

    static contextTypes = {
		awsImagePath : PropTypes.string,
		i18n : PropTypes.object,
		screenSize : PropTypes.number
	};

    constructor(props) {
        super(props);
        this.state = {
            selected : props.selected
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            selected : props.selected
        });
    }

    render() {
        const { className, onSelect, images } = this.props;
        const { awsImagePath } = this.context;
        const { selected } = this.state;
        return (
            <div className={Cx("image-selector",className)}>
                
                { images.map((image,index) => {
                    const isSelected = _findIndex(selected,{ uri : image.uri}) >= 0;
                    return (
                        <a href="" onClick={(e) => {e.preventDefault(); onSelect(image,isSelected);}} className={Cx("image-selector__image-wrap",isSelected ? 'selected': '')}>
                            {isSelected && <div className="image-selector__check-wrap flex flex-align-center flex-justify-center">
                                <i className="pe-7s-tick"/>
                            </div>}
                            <img className="" alt={`image ${index+1} of ${images.length}`} src={getImagePath(awsImagePath,image.uri)} />
                        </a>
                    );
                })}
                
            </div>
        );
    }
}