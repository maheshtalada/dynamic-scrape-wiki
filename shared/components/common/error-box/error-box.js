import React, {Component } from 'react';
import Cx from 'classnames';
const ErrorBox = ( { errorCode, l, classNames, children=null }) => {

	return(
		<div className={Cx('error-box',classNames)}>
			{l(errorCode)}
			{children}
		</div>
	);

};

export default ErrorBox;
