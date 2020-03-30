import React, { Component } from 'react';
import { propTypes, defaultProps } from './types';
import BaseShape from './BaseShape';

class Line extends BaseShape {

	render() {
		const {
			className,
			prefixCls,
			strokeColor,
			strokeLinecap,
			strokeWidth,
			style,
			trailColor,
			trailWidth,
			...restProps
		} = this.props;
		const { percent } = this.state;
		delete restProps.gapPosition;
		const pathStyle = {
			strokeDasharray: '100px, 100px',
			strokeDashoffset: `${(100 - percent)}px`,
			transition: `stroke-dashoffset ${this.props.animationDuration}ms ${this.props.animationEasing}, stroke ${this.props.animationDuration}ms ${this.props.animationEasing}`
		};

		const center = strokeWidth / 2;
		const right = 100 - (strokeWidth / 2);
		const pathString =
			`M ${strokeLinecap === 'round' ? center : 0},${center}
           L ${strokeLinecap === 'round' ? right : 100},${center}`;
		const viewBoxString = `0 0 100 ${strokeWidth}`;

		return (
			<div className="shape-line-bar">
				<svg
					className={`${prefixCls}-line ${className}`}
					viewBox={viewBoxString}
					preserveAspectRatio="none"
					style={style}
					{...restProps}
				>
					<path
						className={`${prefixCls}-line-trail`}
						d={pathString}
						strokeLinecap={strokeLinecap}
						stroke={trailColor}
						strokeWidth={trailWidth || strokeWidth}
						fillOpacity="0"
					/>
					<path
						className={`${prefixCls}-line-path`}
						d={pathString}
						strokeLinecap={strokeLinecap}
						stroke={strokeColor}
						strokeWidth={strokeWidth}
						fillOpacity="0"
						ref={(path) => {
							this.path = path;
						}}
						style={pathStyle}
					/>
				</svg>
				<span className="shape-line-bar__text">{`${percent}%`}</span>
			</div>
		);
	}
}

Line.propTypes = propTypes;

Line.defaultProps = defaultProps;

export default Line;
