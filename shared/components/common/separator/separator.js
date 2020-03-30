import React, {Component } from 'react';
import PropTypes from 'prop-types';
import Cx from 'classnames';

const Separator = ( { classNames, style }) => {
	return (
		<span className={Cx('separator',classNames)} style={(Object.assign({}, style))} />
	);
};

export default Separator;
