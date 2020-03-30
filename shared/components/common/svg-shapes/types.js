import PropTypes from 'prop-types';

export const defaultProps = {
	className: '',
	percent: 0,
	prefixCls: 'shape-progress',
	strokeColor: '#2db7f5',
	strokeWidth: 1,
	style: {},
	trailColor: '#D9D9D9',
	strokeLinecap : 'inherit',
	trailWidth: 1,
	animate : true,
	animationDuration: 300,
	animationEasing: 'ease-out'
};

export const propTypes = {
	className: PropTypes.string,
	percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	prefixCls: PropTypes.string,
	strokeColor: PropTypes.string,
	strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	strokeLinecap: PropTypes.oneOf(['inherit','butt', 'round', 'square']),
	style: PropTypes.object,
	trailColor: PropTypes.string,
	trailWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	animate : PropTypes.bool,
	animationDuration: PropTypes.number,
	animationEasing: PropTypes.string
};
