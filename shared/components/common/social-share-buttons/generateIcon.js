import React from 'react';
import PropTypes from 'prop-types';
import icons from './icons';

export default function generateShareIcon(network) {
	if (!icons[network.toLowerCase()]) {
		throw new Error('invalid network name for a social icon');
	}

	const iconConfig = icons[network.toLowerCase()];

	const Icon = (props) => {
		const {
			className,
			logoFillColor,
			size
		} = props;

		const baseStyle = {
			background: iconConfig.color
		};

		const classes = `social-icon social-icon--${network} ${className || ''}`;

		return (
			<span style={baseStyle} className="social-icon flex flex-justify-center flex-align-center">
				{/*<svg
					viewBox="0 10 60 60"
					fill={logoFillColor}
					width={size}
					height={size}
					className={classes}>
					<g>
						<path d={iconConfig.icon} />
					</g>
				</svg>*/}
				<i className={iconConfig.iconClass}/>
			</span>
		);
	};

	Icon.propTypes = {
		className: PropTypes.string,
		iconBgStyle: PropTypes.object,
		logoFillColor: PropTypes.string,
		round: PropTypes.bool,
		size: PropTypes.number
	};

	Icon.defaultProps = {
		logoFillColor: 'white',
		size: 64
	};

	return Icon;
}
